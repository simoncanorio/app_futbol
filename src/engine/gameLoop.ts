import { db, getInitialPlayerStats, getDetailedAttributes, isTransferWindowOpen, type Player } from '../db/db';
import { simulateMatch, applyMatchOutcomeToDatabase } from './matchEngine';
import { generateLeagueFixtures } from './fixtureGenerator';
import { processAITransfers } from './aiTransfers';
import { autoSelectLineupForTeam, checkLineupReady } from '../utils/lineupUtils';
import { calculateTeamChemistry } from '../utils/chemistryUtils';
import { calculatePlayerMarketValue, calculateExpectedAnnualWage } from './valuationEngine';
import { sortStandingsWithTiebreakers, SECOND_DIVISION_CLUBS } from '../utils/standingsUtils';
import { generateRealisticYouthProspectRatings } from '../db/generators';

const REGEN_FIRST_NAMES: Record<string, string[]> = {
  'España': ['Álvaro', 'Pablo', 'Alejandro', 'Pau', 'Marc', 'Iker', 'Unai', 'Dani', 'Hugo', 'Martín', 'Fermín', 'Gavi'],
  'Argentina': ['Franco', 'Valentín', 'Enzo', 'Julián', 'Thiago', 'Lautaro', 'Mateo', 'Nicolás', 'Facundo', 'Santiago'],
  'Brasil': ['Vitor', 'Gabriel', 'Endrick', 'Lucas', 'Matheus', 'João', 'Breno', 'Kauã', 'Estevão', 'Savinho'],
  'Francia': ['Kylian', 'Warren', 'Rayan', 'Bradley', 'Mathys', 'Eduardo', 'Aurélien', 'Leny', 'Désiré', 'Lucas'],
  'Inglaterra': ['Jude', 'Cole', 'Bukayo', 'Phil', 'Kobbie', 'Trent', 'Declan', 'Ollie', 'Morgan', 'Ethan'],
  'Alemania': ['Florian', 'Jamal', 'Aleksandar', 'Maximilian', 'Kai', 'nico', 'Paul', 'Karim', 'Angelo', 'Tom'],
  'Italia': ['Alessandro', 'Nicolò', 'Sandro', 'Giorgio', 'Francesco', 'Riccardo', 'Davide', 'Lorenzo', 'Matteo', 'Samuele'],
  'Portugal': ['João', 'Gonçalo', 'Vitinha', 'Nuno', 'Rafael', 'Diogo', 'António', 'Rodrigo', 'Tiago', 'Francisco']
};

const REGEN_LAST_NAMES: Record<string, string[]> = {
  'España': ['García', 'Martínez', 'López', 'Pedri', 'Cubarsí', 'Zubimendi', 'Baena', 'Williams', 'Olmo', 'Merino'],
  'Argentina': ['Mastantuono', 'Echeverri', 'Álvarez', 'Fernández', 'Mac Allister', 'Romero', 'Paz', 'Garnacho', 'Barco', 'medina'],
  'Brasil': ['Silva', 'Santos', 'Oliveira', 'Rodrigues', 'Roque', 'Guimarães', 'Paquetá', 'reis', 'Moscardo', ' Gomes'],
  'Francia': ['Zaïre-Emery', 'Camavinga', 'Yoro', 'Barcola', 'Cherki', 'Doué', 'Tel', 'Tchouaméni', 'Saliba', 'Koundé'],
  'Inglaterra': ['Palmer', 'Mainoo', 'Saka', 'Bellingham', 'Foden', 'Nwaneri', 'Wharton', 'Gordon', 'Branthwaite', 'Guehi'],
  'Alemania': ['Wirtz', 'Musiala', 'Pavlović', 'Beier', 'Wanner', 'Schlotterbeck', 'Adeyemi', 'Stiller', 'Havertz', 'Bischof'],
  'Italia': ['Bastoni', 'Barella', 'Calafiori', 'Scalvini', 'Camarda', 'Fagioli', 'Tonali', 'Ricci', 'Udogie', 'Buongiorno'],
  'Portugal': ['Neves', 'Silva', 'Inácio', 'Ramos', 'Leão', 'Conceição', 'Mendes', 'Quenda', 'Mora', 'Dalot']
};

function generateRegenName(country: string): string {
  const firstPool = REGEN_FIRST_NAMES[country] || REGEN_FIRST_NAMES['España'];
  const lastPool = REGEN_LAST_NAMES[country] || REGEN_LAST_NAMES['España'];
  const first = firstPool[Math.floor(Math.random() * firstPool.length)];
  const last = lastPool[Math.floor(Math.random() * lastPool.length)];
  return `${first} ${last.trim()}`;
}

export async function getLeagueMaxWeeks(leagueId: number) {
  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();
  const leaguesMap: Record<string, typeof allTeams> = {};
  for (const t of allTeams) {
    if (!leaguesMap[t.domesticLeague]) leaguesMap[t.domesticLeague] = [];
    leaguesMap[t.domesticLeague].push(t);
  }
  let maxWeeks = 0;
  for (const domLeague in leaguesMap) {
    const numTeams = leaguesMap[domLeague].length;
    const weeks = (numTeams - 1) * 2;
    if (weeks > maxWeeks) maxWeeks = weeks;
  }
  return maxWeeks || 38;
}

export async function advanceWeek(leagueId: number) {
  const league = await db.leagues.get(leagueId);
  if (!league) return;

  const maxWeeks = await getLeagueMaxWeeks(leagueId);

  // If season finished, trigger startNextSeason
  if (league.currentWeek > maxWeeks) {
    await startNextSeason(leagueId);
    return;
  }

  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();

  // Ensure every team has a valid 11-player starting lineup before simulating
  for (const t of allTeams) {
    const isReady = await checkLineupReady(t.id!);
    if (!isReady) {
      await autoSelectLineupForTeam(t.id!);
    }
  }

  // Record players who are ALREADY suspended before this week's matches so they serve their 1-match ban now
  const preMatchPlayers = await db.players.where('leagueId').equals(leagueId).toArray();
  const servingSuspensionIds = new Set<number>(
    preMatchPlayers.filter(p => p.cards?.suspended && p.id).map(p => p.id!)
  );

  // Check if fixtures exist for this league
  const totalMatchesCount = await db.matches.where('leagueId').equals(leagueId).count();
  if (totalMatchesCount === 0) {
    await generateLeagueFixtures(leagueId);
  }

  const weekMatches = await db.matches
    .where('leagueId')
    .equals(leagueId)
    .filter(m => m.week === league.currentWeek)
    .toArray();

  const unplayedMatches = weekMatches.filter(m => !m.isPlayed);

  // Reload fresh teams map after autoSelectLineupForTeam
  const refreshedTeams = await db.teams.where('leagueId').equals(leagueId).toArray();
  const teamMap = new Map(refreshedTeams.map(t => [t.id!, t]));

  // Simulate all unplayed scheduled matches for this matchday
  for (const m of unplayedMatches) {
    const home = teamMap.get(m.homeTeamId);
    const away = teamMap.get(m.awayTeamId);
    if (!home || !away) continue;

    const simRes = await simulateMatch(leagueId, home, away, league.currentWeek, m.type || 'league');
    await applyMatchOutcomeToDatabase(leagueId, m, simRes, home, away);
  }

  // Board Confidence Logic for User Team (evaluates the user's match from this week)
  if (league.userTeamId) {
    const userTeam = teamMap.get(league.userTeamId);
    if (userTeam) {
      const m = weekMatches.find(cm => cm.homeTeamId === userTeam.id || cm.awayTeamId === userTeam.id);
      if (m && m.isPlayed) {
        const isHome = m.homeTeamId === userTeam.id;
        const userScore = isHome ? m.homeScore : m.awayScore;
        const oppScore = isHome ? m.awayScore : m.homeScore;

        if (userTeam.boardConfidence === undefined) userTeam.boardConfidence = 100;

        if (userScore > oppScore) {
          userTeam.boardConfidence = Math.min(100, userTeam.boardConfidence + 4);
        } else if (userScore < oppScore) {
          userTeam.boardConfidence = Math.max(0, userTeam.boardConfidence - 8);
        }
        await db.teams.put(userTeam);

        if (userTeam.boardConfidence <= 0) {
          // Record stint in gmHistory before reassigning
          const matchesPlayed = userTeam.wins + userTeam.draws + userTeam.losses;
          if (matchesPlayed > 0) {
            await db.gmHistory.add({
              season: league.season,
              leagueId: league.id!,
              teamId: userTeam.id!,
              teamName: userTeam.name,
              wins: userTeam.wins,
              draws: userTeam.draws,
              losses: userTeam.losses,
              goalsFor: userTeam.goalsFor,
              goalsAgainst: userTeam.goalsAgainst
            });
          }

          userTeam.boardConfidence = 85;
          await db.teams.put(userTeam);

          const newRep = Math.max(25, (league.managerReputation || 60) - 12);
          const otherClubs = Array.from(teamMap.values())
            .filter(t => t.id !== userTeam.id)
            .sort((a, b) => (a.prestige || 70) - (b.prestige || 70));
          const reboundClub = otherClubs[0] || userTeam;

          league.userTeamId = reboundClub.id!;
          league.managerReputation = newRep;
          await db.leagues.put(league);

          await db.notes.add({
            leagueId,
            entityType: 'team',
            entityId: reboundClub.id,
            text: `🚨 DESTITUCIÓN OFICIAL: La Junta Directiva de ${userTeam.name} rescindió tu contrato tras caer la confianza al 0%. Has firmado de urgencia con ${reboundClub.name} (puedes revisar otras ofertas en Historial del Mánager).`,
            createdAt: Date.now()
          });

          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('manager_fired'));
          }
        }
      }
    }
  }

  // Update Player Fatigue Recovery, Morale, Training Effects & Injury Recovery
  const allPlayers = await db.players.where('leagueId').equals(leagueId).toArray();
  for (const p of allPlayers) {
    const pTeam = p.teamId ? teamMap.get(p.teamId) : null;
    const trainingFocus = pTeam?.trainingFocus || 'balance';
    const trainingLevelBonus = ((pTeam?.facilities?.trainingLevel || 1) - 1) * 0.03;

    if (p.isInjured) {
      const healthSpeed = (pTeam?.healthExpense || 50) > 75 ? 2 : 1;
      p.injuryWeeks = Math.max(0, (p.injuryWeeks || 1) - healthSpeed);
      if (p.injuryWeeks <= 0) {
        p.isInjured = false;
        p.injuryWeeks = 0;
        p.injuryType = undefined;
      }
    }

    // Weekly Training Regime Effects on Fatigue and Attributes
    let extraFatigueRecovery = 0;
    const growthProb = 0.14 + trainingLevelBonus;

    if (trainingFocus === 'recovery') {
      extraFatigueRecovery = 24;
      p.morale = Math.min(100, (p.morale || 85) + 3);
    } else if (trainingFocus === 'physical') {
      extraFatigueRecovery = -6;
      if (p.attributes && Math.random() < growthProb) {
        p.attributes.physical = Math.min(99, p.attributes.physical + 1);
        if (p.detailedAttributes) {
          p.detailedAttributes.stamina = Math.min(99, p.detailedAttributes.stamina + 1);
          p.detailedAttributes.strength = Math.min(99, p.detailedAttributes.strength + 1);
        }
      }
    } else if (trainingFocus === 'attacking') {
      if (p.attributes && ['DEL', 'MED'].includes(p.position) && Math.random() < growthProb) {
        p.attributes.shooting = Math.min(99, p.attributes.shooting + 1);
        if (p.detailedAttributes) {
          p.detailedAttributes.finishing = Math.min(99, p.detailedAttributes.finishing + 1);
          p.detailedAttributes.positioning = Math.min(99, p.detailedAttributes.positioning + 1);
        }
      }
    } else if (trainingFocus === 'defending') {
      if (p.attributes && ['DEF', 'POR', 'MED'].includes(p.position) && Math.random() < growthProb) {
        p.attributes.defending = Math.min(99, p.attributes.defending + 1);
        if (p.detailedAttributes) {
          p.detailedAttributes.standingTackle = Math.min(99, p.detailedAttributes.standingTackle + 1);
          p.detailedAttributes.defAwareness = Math.min(99, p.detailedAttributes.defAwareness + 1);
        }
      }
    } else if (trainingFocus === 'technical') {
      if (p.attributes && Math.random() < growthProb) {
        p.attributes.passing = Math.min(99, p.attributes.passing + 1);
        if (p.detailedAttributes) {
          p.detailedAttributes.shortPassing = Math.min(99, p.detailedAttributes.shortPassing + 1);
          p.detailedAttributes.vision = Math.min(99, p.detailedAttributes.vision + 1);
        }
      }
    }

    // Between-match natural recovery
    if (p.lineupStatus === 'starter') {
      p.fatigue = Math.min(100, Math.max(0, (p.fatigue || 0) - 8 - extraFatigueRecovery));
      p.morale = Math.min(100, (p.morale || 85) + 2);
      if (p.morale >= 50) p.unhappy = false;
    } else if (p.lineupStatus === 'bench') {
      p.fatigue = Math.max(0, (p.fatigue || 0) - 22 - extraFatigueRecovery);
      p.morale = Math.max(15, (p.morale || 85) - 1);
    } else if (p.lineupStatus === 'youth') {
      p.fatigue = 0;
      p.morale = Math.min(100, (p.morale || 90) + 1);
      // Scale youth academy progression by youth investment (0..100), youth facilities (1..5), mentorship, and archetype
      if (league.currentWeek % 5 === 0 && p.overall < p.potential) {
        const youthInv = (pTeam?.youthExpense ?? 60) / 100;
        const devType = p.developmentType || 'normal';
        const archMod = devType === 'early_bloomer' ? 0.14 : devType === 'bust' ? -0.22 : devType === 'late_bloomer' ? -0.05 : 0;
        const youthBonus = (pTeam?.facilities?.youthLevel || 1) * 0.05 + youthInv * 0.25 + (p.mentorId ? 0.12 : 0) + archMod;
        if (Math.random() < Math.max(0.05, 0.18 + youthBonus)) {
          p.overall += 1;
          p.peakOvr = Math.max(p.peakOvr || p.overall, p.overall);
          if (p.attributes) {
            p.attributes.shooting = Math.min(p.potential, p.attributes.shooting + 1);
            p.attributes.passing = Math.min(p.potential, p.attributes.passing + 1);
            p.attributes.dribbling = Math.min(p.potential, p.attributes.dribbling + 1);
            p.attributes.defending = Math.min(p.potential, p.attributes.defending + 1);
          }
        } else if (devType === 'bust' && p.potential > p.overall + 2 && Math.random() < 0.20) {
          // Unfulfilled youth prospects ("bust") gradually lose inflated potential ceiling
          p.potential = Math.max(p.overall, p.potential - 1);
        }
      }
    } else {
      // Reserve
      p.fatigue = Math.max(0, (p.fatigue || 0) - 28 - extraFatigueRecovery);
      p.morale = Math.max(10, (p.morale || 85) - 3);
    }

    p.peakOvr = Math.max(p.peakOvr || p.overall, p.overall);

    // Mid-season dynamic progression / regression check (Weeks 12, 24, 36)
    if (!p.isRetired && p.lineupStatus !== 'youth' && [12, 24, 36].includes(league.currentWeek)) {
      const gp = p.stats?.gamesPlayed || 0;
      const avgRating = p.stats?.averageRating || 6.6;
      const devType = p.developmentType || 'normal';

      if (devType === 'late_bloomer' && p.age >= 24 && p.age <= 29 && gp >= 6 && avgRating >= 7.12) {
        // Late bloomer mid-season breakout! Can even exceed initial potential ceiling
        if (Math.random() < 0.55) {
          if (p.overall >= p.potential) p.potential = Math.min(95, p.potential + 1);
          p.overall = Math.min(p.potential, p.overall + 1);
          p.peakOvr = Math.max(p.peakOvr || p.overall, p.overall);
          if (p.teamId === league.userTeamId) {
            await db.notes.add({
              leagueId,
              entityType: 'player',
              entityId: p.id,
              text: `遅⚡ EXPLOSIÓN TARDÍA (Late Bloomer): ${p.name} (${p.age} años) alcanza la madurez futbolística y sube a ${p.overall} OVR tras brillar con media de ${avgRating.toFixed(2)}.`,
              createdAt: Date.now()
            });
          }
        }
      } else if (p.age <= 24 && p.overall < p.potential && gp >= 6 && avgRating >= 7.25 && devType !== 'bust') {
        if (Math.random() < (devType === 'early_bloomer' ? 0.60 : 0.40)) {
          p.overall = Math.min(p.potential, p.overall + 1);
          p.peakOvr = Math.max(p.peakOvr || p.overall, p.overall);
        }
      } else if (devType === 'bust' && p.age >= 20) {
        // Bust stagnates or regresses if not performing
        if (p.potential > p.overall) {
          p.potential = Math.max(p.overall, p.potential - 1);
        }
        if (avgRating < 6.45 && p.overall > 64 && Math.random() < 0.30) {
          p.overall -= 1;
        }
      } else if (p.age >= 32 && avgRating < 6.55 && gp >= 5 && Math.random() < 0.35) {
        // Veteran mid-season physical decline
        p.overall = Math.max(55, p.overall - 1);
        if (p.attributes) {
          p.attributes.pace = Math.max(30, p.attributes.pace - 1);
          p.attributes.physical = Math.max(30, p.attributes.physical - 1);
        }
      }
    }

    if ((p.morale || 85) < 35) {
      p.unhappy = true;
      p.transferRequest = true;
    }

    // Clear 1-match suspension ONLY for players who already served it this week
    if (p.id && servingSuspensionIds.has(p.id) && p.cards?.suspended) {
      p.cards.suspended = false;
      p.cards.red = 0;
    }

    // Playing Time vs Promised Squad Role Expectation Check (every 4 weeks starting Week 8)
    if (league.currentWeek >= 8 && league.currentWeek % 4 === 0 && !p.isInjured && p.lineupStatus !== 'youth') {
      const maxPossibleMins = Math.max(90, league.currentWeek * 90);
      const playedRatio = (p.stats?.minutesPlayed || 0) / maxPossibleMins;
      const role = p.squadRole || (p.overall >= 85 ? 'Estrella' : p.overall >= 79 ? 'Titular' : 'Rotación');
      const expectedRatio = role === 'Estrella' ? 0.55 : role === 'Titular' ? 0.36 : role === 'Rotación' ? 0.14 : 0.04;

      if (playedRatio < expectedRatio * 0.5) {
        p.morale = Math.max(10, (p.morale || 75) - 9);
        if (p.morale < 42) {
          p.unhappy = true;
          if (p.teamId === league.userTeamId && Math.random() < 0.35) {
            await db.notes.add({
              leagueId,
              entityType: 'player',
              entityId: p.id,
              text: `😠 QUEJA DE VESTUARIO: ${p.name} (Rol: ${role}) exige más minutos en el once titular tras disputar solo ${p.stats?.minutesPlayed || 0} min esta temporada.`,
              createdAt: Date.now()
            });
          }
        }
      }
    }
  }

  // International FIFA Break (Weeks 10, 20, 32)
  if ([10, 20, 32].includes(league.currentWeek)) {
    let userCalledUpCount = 0;
    for (const p of allPlayers) {
      if (p.overall >= 81 && !p.isInjured && p.lineupStatus !== 'youth') {
        p.internationalCaps = (p.internationalCaps || 0) + 2;
        if (['DEL', 'MED'].includes(p.position) && Math.random() < 0.35) {
          p.internationalGoals = (p.internationalGoals || 0) + 1;
        }
        p.morale = Math.min(100, (p.morale || 80) + 4);
        p.fatigue = Math.min(100, (p.fatigue || 0) + 8);
        if (p.teamId === league.userTeamId) userCalledUpCount++;

        // Small "Virus FIFA" minor injury risk (3%)
        if (Math.random() < 0.03) {
          p.isInjured = true;
          p.injuryWeeks = 2;
          p.injuryType = 'Sobrecarga en Selección Nacional (Virus FIFA)';
        }
      }
    }
    if (userCalledUpCount > 0) {
      await db.notes.add({
        leagueId,
        entityType: 'general',
        text: `🌍 PARÓN FIFA: ${userCalledUpCount} jugadores de tu plantilla fueron convocados por sus Selecciones Nacionales (+Moral y Prestigio Internacional).`,
        createdAt: Date.now()
      });
    }
  }

  await db.players.bulkPut(allPlayers);

  // AI Club Transfers ONLY during open transfer windows (Weeks 1-4, 19-22)
  const currentTeamsList = Array.from(teamMap.values());
  if (isTransferWindowOpen(league.currentWeek)) {
    await processAITransfers(league, currentTeamsList);
  }

  // Process dynamic knockout progressions for Cup, Champions League & Europa League
  await processKnockoutProgressions(leagueId, league.currentWeek);

  // Update team chemistry ratings & AI Manager Carousel (Weeks 14, 22, 30)
  const latestTeams = await db.teams.where('leagueId').equals(leagueId).toArray();
  if ([14, 22, 30].includes(league.currentWeek)) {
    await processManagerCarousel(leagueId, league.currentWeek, latestTeams, league.userTeamId);
  }
  for (const t of latestTeams) {
    const tStarters = allPlayers.filter(p => p.teamId === t.id && p.lineupStatus === 'starter');
    t.teamChemistry = calculateTeamChemistry(tStarters, t).score;
  }

  await db.teams.bulkPut(latestTeams);
  await db.leagues.update(leagueId, { currentWeek: league.currentWeek + 1, lastPlayedAt: Date.now() });
}

const FREE_AGENT_COACHES = [
  { name: 'Zinedine Zidane', tacticalStyle: 'Contraataque Veloz', formation: '4-3-3', reputation: 95 },
  { name: 'Jürgen Klopp', tacticalStyle: 'Gegenpressing (Presión Alta)', formation: '4-3-3', reputation: 96 },
  { name: 'Thomas Tuchel', tacticalStyle: 'Juego de Posición (Juego de Autor)', formation: '3-5-2', reputation: 89 },
  { name: 'Xavi Hernández', tacticalStyle: 'Tiki-Taka (Posesión)', formation: '4-3-3', reputation: 85 },
  { name: 'Massimiliano Allegri', tacticalStyle: 'Bloque Bajo y Presión Zonal', formation: '4-4-2', reputation: 87 },
  { name: 'Mauricio Pochettino', tacticalStyle: 'Gegenpressing (Presión Alta)', formation: '4-2-3-1', reputation: 84 },
  { name: 'José Mourinho', tacticalStyle: 'Bloque Bajo y Presión Zonal', formation: '4-2-3-1', reputation: 90 },
  { name: 'Julian Nagelsmann', tacticalStyle: 'Gegenpressing (Presión Alta)', formation: '4-2-3-1', reputation: 88 }
];

async function processManagerCarousel(
  leagueId: number,
  currentWeek: number,
  teams: any[],
  userTeamId: number | null
) {
  let sackingsThisWeek = 0;
  for (const t of teams) {
    if (t.id === userTeamId) continue;
    if ((t.prestige || 70) < 74) continue;
    const gp = t.wins + t.draws + t.losses;
    if (gp < 10) continue;
    const winRate = t.wins / gp;
    if (winRate < 0.30 && sackingsThisWeek < 2) {
      const oldCoach = t.coach?.name || 'su entrenador';
      const replacement = FREE_AGENT_COACHES[(t.id + currentWeek) % FREE_AGENT_COACHES.length];
      if (replacement.name === oldCoach) continue;

      t.coach = { ...replacement };
      t.formation = replacement.formation;
      t.tacticalStyle = replacement.tacticalStyle;
      await autoSelectLineupForTeam(t.id, replacement.formation);
      sackingsThisWeek++;

      await db.notes.add({
        leagueId,
        entityType: 'team',
        entityId: t.id,
        text: `👔 DESTITUCIÓN EN EL BANQUILLO: ${t.name} destituye a ${oldCoach} tras un mal arranque (${t.wins}V-${t.draws}E-${t.losses}D) y anuncia a ${replacement.name} (${replacement.formation} · ${replacement.tacticalStyle}).`,
        createdAt: Date.now()
      });
    }
  }
}

async function processKnockoutProgressions(leagueId: number, currentWeek: number) {
  // 1. Cup Knockouts (Weeks 8 -> 15 -> 22 -> 29 -> 36 Final)
  if ([8, 15, 22, 29].includes(currentWeek)) {
    const cupMatches = await db.matches
      .where('leagueId').equals(leagueId)
      .filter(m => m.type === 'cup' && m.week === currentWeek && m.isPlayed)
      .toArray();

    if (cupMatches.length > 0) {
      const winners: number[] = cupMatches.map(m => m.homeScore >= m.awayScore ? m.homeTeamId : m.awayTeamId);
      let nextWeek = 15;
      if (currentWeek === 15) nextWeek = 22;
      if (currentWeek === 22) nextWeek = 29;
      if (currentWeek === 29) nextWeek = 36;
      if (winners.length === 2) nextWeek = 36; // Jump directly to Final if only 2 winners remain

      const existingNextMatches = await db.matches
        .where('leagueId').equals(leagueId)
        .filter(m => m.type === 'cup' && m.week === nextWeek)
        .count();

      if (existingNextMatches === 0 && winners.length >= 2) {
        const nextFixtures: any[] = [];
        for (let i = 0; i < winners.length - 1; i += 2) {
          nextFixtures.push({
            leagueId,
            homeTeamId: winners[i],
            awayTeamId: winners[i + 1],
            homeScore: 0,
            awayScore: 0,
            week: nextWeek,
            isPlayed: false,
            type: 'cup',
            events: []
          });
        }
        await db.matches.bulkAdd(nextFixtures);
      }
    }
  }

  // 2. Continental and Europa League Knockouts
  await generateContinentalKnockouts(leagueId, currentWeek, 'continental');
  await generateContinentalKnockouts(leagueId, currentWeek, 'europa');
}

async function generateContinentalKnockouts(leagueId: number, currentWeek: number, type: 'continental' | 'europa') {
  // Knockouts (Weeks 27 League Phase -> 31 Octavos -> 33 Cuartos -> 35 Semis -> 38 Final)
  if (currentWeek === 27) {
    const playedCL = await db.matches
      .where('leagueId').equals(leagueId)
      .filter(m => m.type === type && m.isPlayed)
      .toArray();

    const teamPointsMap = new Map<number, { pts: number; gd: number; gf: number }>();
    playedCL.forEach(m => {
      const h = teamPointsMap.get(m.homeTeamId) || { pts: 0, gd: 0, gf: 0 };
      const a = teamPointsMap.get(m.awayTeamId) || { pts: 0, gd: 0, gf: 0 };
      h.gd += (m.homeScore - m.awayScore);
      a.gd += (m.awayScore - m.homeScore);
      h.gf += m.homeScore;
      a.gf += m.awayScore;
      if (m.homeScore > m.awayScore) h.pts += 3;
      else if (m.awayScore > m.homeScore) a.pts += 3;
      else { h.pts += 1; a.pts += 1; }
      teamPointsMap.set(m.homeTeamId, h);
      teamPointsMap.set(m.awayTeamId, a);
    });

    const sortedTeams = Array.from(teamPointsMap.entries())
      .sort((a, b) => b[1].pts - a[1].pts || b[1].gd - a[1].gd || b[1].gf - a[1].gf)
      .map(entry => entry[0]);

    const bracketSize = sortedTeams.length >= 16 ? 16 : sortedTeams.length >= 8 ? 8 : sortedTeams.length >= 4 ? 4 : 0;
    const firstKnockoutWeek = bracketSize === 16 ? 31 : bracketSize === 8 ? 33 : 35;

    const existingKnockouts = await db.matches
      .where('leagueId').equals(leagueId)
      .filter(m => m.type === type && m.week === firstKnockoutWeek)
      .count();

    if (existingKnockouts === 0 && bracketSize >= 4) {
      const qualified = sortedTeams.slice(0, bracketSize);
      const nextFixtures: any[] = [];
      for (let i = 0; i < Math.floor(bracketSize / 2); i++) {
        nextFixtures.push({
          leagueId,
          homeTeamId: qualified[i],
          awayTeamId: qualified[bracketSize - 1 - i],
          homeScore: 0,
          awayScore: 0,
          week: firstKnockoutWeek,
          isPlayed: false,
          type,
          events: []
        });
      }
      await db.matches.bulkAdd(nextFixtures);
    }
  } else if ([31, 33, 35].includes(currentWeek)) {
    const clMatches = await db.matches
      .where('leagueId').equals(leagueId)
      .filter(m => m.type === type && m.week === currentWeek && m.isPlayed)
      .toArray();

    if (clMatches.length > 0) {
      const winners: number[] = clMatches.map(m => m.homeScore >= m.awayScore ? m.homeTeamId : m.awayTeamId);
      let nextWeek = 33;
      if (currentWeek === 33) nextWeek = 35;
      if (currentWeek === 35 || winners.length === 2) nextWeek = 38; // Final

      const existingNextMatches = await db.matches
        .where('leagueId').equals(leagueId)
        .filter(m => m.type === type && m.week === nextWeek)
        .count();

      if (existingNextMatches === 0 && winners.length >= 2) {
        const nextFixtures: any[] = [];
        for (let i = 0; i < winners.length - 1; i += 2) {
          nextFixtures.push({
            leagueId,
            homeTeamId: winners[i],
            awayTeamId: winners[i + 1],
            homeScore: 0,
            awayScore: 0,
            week: nextWeek,
            isPlayed: false,
            type,
            events: []
          });
        }
        await db.matches.bulkAdd(nextFixtures);
      }
    }
  }
}

export async function startNextSeason(leagueId: number) {
  const league = await db.leagues.get(leagueId);
  if (!league) return;

  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();

  // 1. Identify Official Trophy Winners
  const clFinalMatch = await db.matches
    .where('leagueId').equals(leagueId)
    .filter(m => m.type === 'continental' && m.isPlayed)
    .reverse()
    .first();

  const championsLeagueWinnerId = clFinalMatch
    ? (clFinalMatch.homeScore >= clFinalMatch.awayScore ? clFinalMatch.homeTeamId : clFinalMatch.awayTeamId)
    : [...allTeams].sort((a, b) => b.overall - a.overall)[0]?.id;

  const elFinalMatch = await db.matches
    .where('leagueId').equals(leagueId)
    .filter(m => m.type === 'europa' && m.isPlayed)
    .reverse()
    .first();

  const europaLeagueWinnerId = elFinalMatch
    ? (elFinalMatch.homeScore >= elFinalMatch.awayScore ? elFinalMatch.homeTeamId : elFinalMatch.awayTeamId)
    : undefined;

  const cupFinalMatch = await db.matches
    .where('leagueId').equals(leagueId)
    .filter(m => m.type === 'cup' && m.isPlayed)
    .reverse()
    .first();

  const cupWinnerId = cupFinalMatch
    ? (cupFinalMatch.homeScore >= cupFinalMatch.awayScore ? cupFinalMatch.homeTeamId : cupFinalMatch.awayTeamId)
    : [...allTeams].sort((a, b) => b.overall - a.overall)[1]?.id;

  // 2. Domestic Standings, Prize Money & GM History
  const domMap: Record<string, typeof allTeams> = {};
  allTeams.forEach(t => {
    if (!domMap[t.domesticLeague]) domMap[t.domesticLeague] = [];
    domMap[t.domesticLeague].push(t);
  });

  let leagueChampion: typeof allTeams[0] | undefined;

  const playedLeagueMatches = await db.matches
    .where('leagueId')
    .equals(leagueId)
    .filter(m => m.type === 'league' && m.isPlayed)
    .toArray();

  // Record GM History BEFORE resetting team stats!
  if (league.userTeamId) {
    const userTeam = allTeams.find(t => t.id === league.userTeamId);
    if (userTeam) {
      const domTeams = sortStandingsWithTiebreakers(
        domMap[userTeam.domesticLeague] || allTeams,
        playedLeagueMatches,
        userTeam.domesticLeague
      );
      const pos = domTeams.findIndex(t => t.id === userTeam.id) + 1;

      const titlesWon = [];
      if (pos === 1) titlesWon.push(userTeam.domesticLeague);
      if (userTeam.id === cupWinnerId) titlesWon.push('Copa Nacional');
      if (userTeam.id === championsLeagueWinnerId) titlesWon.push('UEFA Champions League');
      if (userTeam.id === europaLeagueWinnerId) titlesWon.push('UEFA Europa League');

      // Update manager reputation based on season finish & titles won
      let repDelta = 0;
      if (pos === 1) repDelta += 8;
      else if (pos <= 4) repDelta += 4;
      else if (pos >= domTeams.length - 3) repDelta -= 6;
      repDelta += titlesWon.length * 4;
      league.managerReputation = Math.max(25, Math.min(100, (league.managerReputation || 60) + repDelta));
      await db.leagues.update(leagueId, { managerReputation: league.managerReputation });

      await db.gmHistory.add({
        leagueId: league.id!,
        season: league.season,
        teamId: userTeam.id!,
        teamName: userTeam.name,
        wins: userTeam.wins,
        draws: userTeam.draws,
        losses: userTeam.losses,
        goalsFor: userTeam.goalsFor,
        goalsAgainst: userTeam.goalsAgainst,
        leaguePosition: pos > 0 ? pos : undefined,
        titleWon: titlesWon.length > 0 ? titlesWon.join(' + ') : undefined
      });
    }
  }

  for (const leagueName in domMap) {
    const sorted = sortStandingsWithTiebreakers(domMap[leagueName], playedLeagueMatches, leagueName);
    if (!leagueChampion) leagueChampion = sorted[0];

    // Real Promotions & Relegations for leagues with >= 14 teams
    const secondDivPool = SECOND_DIVISION_CLUBS[leagueName] || [];
    const existingNames = new Set(sorted.map(t => t.name.toLowerCase()));
    const availablePromotions = secondDivPool.filter(c => !existingNames.has(c.name.toLowerCase()));
    const relegatedNames: string[] = [];
    const promotedNames: string[] = [];

    if (sorted.length >= 14 && availablePromotions.length > 0) {
      const bottomThree = sorted.slice(-3);
      let promoIdx = 0;
      for (const relTeam of bottomThree) {
        // If AI team is in bottom 3, replace it with a promoted Second Division club!
        if (relTeam.id !== league.userTeamId && promoIdx < availablePromotions.length) {
          const nextClub = availablePromotions[promoIdx++];
          relegatedNames.push(relTeam.name);
          promotedNames.push(nextClub.name);
          relTeam.name = nextClub.name;
          relTeam.overall = nextClub.overall;
          relTeam.budget = nextClub.budget;
          relTeam.prestige = 62;
          relTeam.kit = { primaryColor: nextClub.pri, secondaryColor: nextClub.sec, pattern: 'stripes' };
        }
      }
      if (promotedNames.length > 0) {
        await db.notes.add({
          leagueId,
          entityType: 'general',
          text: `⬆️ ASCENSOS Y DESCENSOS (${leagueName}): Descienden a 2ª División: ${relegatedNames.join(', ')}. Ascienden a 1ª División: ${promotedNames.join(', ')}.`,
          createdAt: Date.now()
        });
      }
    }

    sorted.forEach((t, rankIdx) => {
      let prestige = t.prestige || 70;
      // League finish prize money (€55M for 1st down to €12M for 20th)
      const leaguePrize = Math.max(12_000_000, Math.round(55_000_000 - rankIdx * 2_200_000));
      let trophyPrize = 0;

      if (rankIdx === 0) prestige = Math.min(100, prestige + 3);
      if (t.id === championsLeagueWinnerId) {
        prestige = Math.min(100, prestige + 5);
        trophyPrize += 50_000_000;
      }
      if (t.id === europaLeagueWinnerId) {
        prestige = Math.min(100, prestige + 3);
        trophyPrize += 20_000_000;
      }
      if (t.id === cupWinnerId) {
        prestige = Math.min(100, prestige + 2);
        trophyPrize += 12_000_000;
      }
      if (rankIdx >= sorted.length - 3) {
        prestige = Math.max(25, prestige - 8);
      }

      // Sponsor Annual Payouts
      const sponsorAnnualPayout =
        (t.mainSponsor?.payoutPerSeason || 0) +
        (t.sleeveSponsor?.payoutPerSeason || 0) +
        (t.stadiumSponsor?.payoutPerSeason || 0) +
        (t.digitalSponsor?.payoutPerSeason || 0);

      t.budget = Math.max(10_000_000, (t.budget || 30_000_000) + leaguePrize + trophyPrize + sponsorAnnualPayout);
      t.prestige = prestige;
      t.wins = 0;
      t.draws = 0;
      t.losses = 0;
      t.goalsFor = 0;
      t.goalsAgainst = 0;
      t.form = [];
      if (t.hype) t.hype = Math.floor((t.hype + 55) / 2);
    });
  }
  await db.teams.bulkPut(allTeams);

  // 3. Calculate Season Awards (MVP, Pichichi, Best GK, Golden Boy U21)
  const allPlayers = await db.players.where('leagueId').equals(leagueId).toArray();
  const getMvpScore = (p: Player) =>
    (p.stats?.goals || 0) * 3.2 +
    (p.stats?.assists || 0) * 2.0 +
    ((p.stats?.averageRating || 6.5) - 6.5) * 12 +
    (p.teamId === championsLeagueWinnerId ? 8 : 0) +
    (p.teamId === leagueChampion?.id ? 5 : 0) +
    p.overall * 0.15;

  const mvpWinner = [...allPlayers].sort((a, b) => getMvpScore(b) - getMvpScore(a))[0];
  const topScorer = [...allPlayers].sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0) || (b.stats?.assists || 0) - (a.stats?.assists || 0))[0];
  const bestKeeper = [...allPlayers]
    .filter(p => p.position === 'POR')
    .sort((a, b) => ((b.stats?.cleanSheets || 0) * 3 + (b.stats?.saves || 0) * 0.15 + b.overall * 0.4) - ((a.stats?.cleanSheets || 0) * 3 + (a.stats?.saves || 0) * 0.15 + a.overall * 0.4))[0];
  const goldenBoy = [...allPlayers]
    .filter(p => p.age <= 21)
    .sort((a, b) => getMvpScore(b) - getMvpScore(a))[0];

  await db.history.add({
    leagueId,
    season: league.season,
    domesticLeague: leagueChampion?.domesticLeague || 'LaLiga',
    championId: leagueChampion?.id || 1,
    runnerUpId: domMap[leagueChampion?.domesticLeague || 'LaLiga']?.[1]?.id || 2,
    mvpId: mvpWinner?.id || topScorer?.id || 1,
    topScorerId: topScorer?.id || 1,
    bestKeeperId: bestKeeper?.id || 1,
    goldenBoyId: goldenBoy?.id || 1,
    cupChampionId: cupWinnerId,
    championsLeagueChampionId: championsLeagueWinnerId,
    europaLeagueChampionId: europaLeagueWinnerId
  });

  const teamLookup = new Map(allTeams.map(t => [t.id!, t]));

  // 4. Dynamic Player Evolution, Attribute Scaling, Loan Returns & Contract Expiration
  for (const p of allPlayers) {
    if (p.isRetired) continue;

    p.peakOvr = Math.max(p.peakOvr || p.overall, p.overall);

    if (p.stats) {
      if (!p.historicalStats) p.historicalStats = {};
      p.historicalStats[league.season] = { ...p.stats };
    }

    const gamesPlayed = p.stats?.gamesPlayed || 0;
    const avgRating = p.stats?.averageRating || 6.7;
    p.age += 1;

    // Handle Loan Returns or Mandatory Buy Options
    if (p.isOnLoan && p.loanedFromTeamId) {
      const currentClub = p.teamId ? teamLookup.get(p.teamId) : undefined;
      const parentClub = teamLookup.get(p.loanedFromTeamId);
      const fee = p.buyOptionFee || calculatePlayerMarketValue(p);

      if (currentClub && parentClub && (p.loanBuyObligation || (gamesPlayed >= 18 && avgRating >= 7.1 && currentClub.budget >= fee * 1.3))) {
        // Exercise purchase option!
        currentClub.budget -= fee;
        parentClub.budget += fee;
        p.isOnLoan = false;
        p.loanedFromTeamId = undefined;
        p.buyOptionFee = undefined;
        p.loanBuyObligation = false;
        p.contractYears = 4;
        p.contractEndSeason = league.season + 5;
      } else {
        // Return to parent club
        p.teamId = p.loanedFromTeamId;
        p.isOnLoan = false;
        p.loanedFromTeamId = undefined;
        p.buyOptionFee = undefined;
        p.loanBuyObligation = false;
        p.lineupStatus = 'reserve';
        p.pitchPosition = undefined;
      }
    }

    // Calculate OVR growth / decline by development archetype ('early_bloomer', 'normal', 'late_bloomer', 'bust')
    let ovrDelta = 0;
    const devType = p.developmentType || 'normal';
    const formBonus = avgRating >= 7.25 && gamesPlayed >= 12 ? 1 : 0;

    if (devType === 'bust') {
      // Unfulfilled Promise ("Bust"): peak never arrives; loses potential ceiling and stagnates or regresses early
      p.potential = Math.max(p.overall, p.potential - (2 + Math.floor(Math.random() * 3)));
      if (p.age <= 21) {
        ovrDelta = Math.random() < 0.30 && gamesPlayed >= 15 ? 1 : 0;
      } else if (p.age <= 27) {
        ovrDelta = (gamesPlayed < 10 || avgRating < 6.55) && Math.random() < 0.45 ? -1 : 0;
      } else {
        ovrDelta = -(1 + Math.floor(Math.random() * 2));
      }
    } else if (devType === 'early_bloomer') {
      // Early Bloomer: explodes at 16-22, hits ceiling early (23-26), starts declining earlier (29-30)
      if (p.age <= 22) {
        const baseGrowth = gamesPlayed >= 12 ? 2 + Math.floor(Math.random() * 3) : 1 + Math.floor(Math.random() * 2);
        ovrDelta = baseGrowth + 1 + formBonus;
      } else if (p.age <= 25) {
        ovrDelta = formBonus;
      } else if (p.age >= 29 && p.age <= 31) {
        ovrDelta = -(Math.floor(Math.random() * 2) + (p.position === 'POR' ? 0 : 1));
      } else if (p.age >= 32) {
        ovrDelta = -(1 + Math.floor(Math.random() * 2));
      }
    } else if (devType === 'late_bloomer') {
      // Late Bloomer: modest at 16-22, explodes between 24 and 29 (can even exceed original potential!), holds peak until 33
      if (p.age <= 22) {
        ovrDelta = gamesPlayed >= 14 ? 1 : Math.floor(Math.random() * 2);
      } else if (p.age >= 23 && p.age <= 29) {
        const baseLate = 1 + Math.floor(Math.random() * 2) + formBonus;
        ovrDelta = baseLate;
        // Can break past initial potential ceiling during late surge!
        if (p.overall + ovrDelta > p.potential && (avgRating >= 7.05 || gamesPlayed >= 15)) {
          p.potential = Math.min(95, Math.max(p.potential, p.overall + ovrDelta));
        }
      } else if (p.age >= 30 && p.age <= 32) {
        ovrDelta = formBonus > 0 && p.overall < p.potential ? 1 : 0;
      } else if (p.age >= 34) {
        ovrDelta = -(Math.floor(Math.random() * 2) + (p.position === 'POR' ? 0 : 1));
      }
    } else {
      // Normal development curve: grows 16-25, prime 26-30, declines 31+
      if (p.age <= 21) {
        const baseGrowth = gamesPlayed >= 14 ? 2 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2);
        ovrDelta = baseGrowth + formBonus;
      } else if (p.age <= 25) {
        const baseGrowth = gamesPlayed >= 15 ? 1 + Math.floor(Math.random() * 2) : Math.floor(Math.random() * 2);
        ovrDelta = baseGrowth + formBonus;
      } else if (p.age <= 28) {
        if (formBonus > 0 && p.overall < p.potential) ovrDelta = 1;
      } else if (p.age >= 31 && p.age <= 33) {
        ovrDelta = -(Math.floor(Math.random() * 2) + (p.position === 'POR' ? 0 : 1));
      } else if (p.age >= 34) {
        ovrDelta = -(Math.floor(Math.random() * 2) + (p.position === 'POR' ? 1 : 2));
      }
    }

    const oldOvr = p.overall;
    if (ovrDelta > 0) {
      p.overall = Math.min(p.potential, p.overall + ovrDelta);
    } else if (ovrDelta < 0) {
      p.overall = Math.max(48, p.overall + ovrDelta);
      p.potential = Math.max(p.overall, p.potential + ovrDelta);
    }
    p.peakOvr = Math.max(p.peakOvr || p.overall, p.overall);

    const actualDelta = p.overall - oldOvr;
    if (actualDelta !== 0) {
      if (!p.attributes) {
        p.attributes = { pace: p.overall, shooting: p.overall - 5, passing: p.overall - 2, dribbling: p.overall - 2, defending: p.overall - 10, physical: p.overall - 3 };
      }
      // Older players lose pace/physical faster than passing/shooting
      const paceDelta = actualDelta < 0 && p.age >= 30 ? actualDelta - 1 : actualDelta;
      const techDelta = actualDelta < 0 && p.age >= 30 ? Math.min(0, actualDelta + 1) : actualDelta;

      p.attributes.pace = Math.max(30, Math.min(99, p.attributes.pace + paceDelta));
      p.attributes.physical = Math.max(30, Math.min(99, p.attributes.physical + paceDelta));
      p.attributes.shooting = Math.max(30, Math.min(99, p.attributes.shooting + techDelta));
      p.attributes.passing = Math.max(30, Math.min(99, p.attributes.passing + techDelta));
      p.attributes.dribbling = Math.max(30, Math.min(99, p.attributes.dribbling + actualDelta));
      p.attributes.defending = Math.max(30, Math.min(99, p.attributes.defending + techDelta));

      if (p.detailedAttributes) {
        for (const k of Object.keys(p.detailedAttributes) as (keyof typeof p.detailedAttributes)[]) {
          const d = (k === 'acceleration' || k === 'sprintSpeed' || k === 'stamina') ? paceDelta : techDelta;
          p.detailedAttributes[k] = Math.max(15, Math.min(99, p.detailedAttributes[k] + d));
        }
      }
    }

    p.stats = getInitialPlayerStats();
    p.fatigue = 0;
    p.cards = { yellow: 0, red: 0, suspended: false, seasonYellows: 0 };

    if (p.contractYears !== undefined && p.contractYears > 0) {
      p.contractYears -= 1;
      if (p.contractYears === 0) {
        p.teamId = null;
        p.lineupStatus = 'reserve';
        p.pitchPosition = undefined;
      }
    }
  }

  // 5. Retirements, Dynamic Hall of Fame Induction & Authentic Regens
  const retiringPlayers = allPlayers.filter(p => !p.isRetired && (p.age >= 37 || (p.age >= 35 && p.overall <= 71)));
  const playersToDelete: Player[] = [];
  const newlyInductedNames: string[] = [];

  for (const ret of retiringPlayers) {
    const careerGoals = Object.values(ret.historicalStats || {}).reduce((acc, s) => acc + (s.goals || 0), 0);
    const careerApps = Object.values(ret.historicalStats || {}).reduce((acc, s) => acc + (s.gamesPlayed || 0), 0);
    const bestOvr = ret.peakOvr || ret.overall;
    const isLegend = ret.isHallOfFame || bestOvr >= 84 || careerGoals >= 70 || careerApps >= 110;

    if (isLegend) {
      const lastClubName = ret.teamId ? (teamLookup.get(ret.teamId)?.name || 'Leyenda de Élite') : 'Leyenda del Fútbol';
      ret.isHallOfFame = true;
      ret.isRetired = true;
      ret.retiredClubName = `${lastClubName} (Retirado en ${league.season})`;
      ret.overall = bestOvr; // Preserve peak OVR for Hall of Fame display
      ret.teamId = null;
      ret.lineupStatus = 'reserve';
      ret.pitchPosition = undefined;
      newlyInductedNames.push(`${ret.name} (${bestOvr} OVR)`);
    } else {
      playersToDelete.push(ret);
    }
  }

  if (newlyInductedNames.length > 0) {
    await db.notes.add({
      leagueId,
      entityType: 'general',
      text: `🏛️ NUEVAS LEYENDAS EN EL SALÓN DE LA FAMA: Tras anunciar su retiro oficial al cierre de la temporada ${league.season}, ingresan al Salón de la Fama: ${newlyInductedNames.slice(0, 6).join(', ')}.`,
      createdAt: Date.now()
    });
  }

  const remainingPlayers = allPlayers.filter(p => !playersToDelete.includes(p));

  const devTypes: Player['developmentType'][] = ['early_bloomer', 'normal', 'normal', 'late_bloomer', 'bust'];
  const personalities: Player['personality'][] = ['Ambicioso', 'Leal', 'Pragmático', 'Avaricioso'];

  const newRegens: Player[] = retiringPlayers.map(retired => {
    const country = retired.bio?.country || 'España';
    const regenAge = 16 + Math.floor(Math.random() * 3); // 16-18
    const retiredClub = retired.teamId ? teamLookup.get(retired.teamId) : undefined;
    const youthInv = retiredClub?.youthExpense ?? 65;
    const { overall: regenOvr, potential: regenPot, developmentType: regenDevType } = generateRealisticYouthProspectRatings(youthInv);
    const pos = retired.position;
    const specPos = retired.specificPosition || (pos === 'POR' ? 'POR' : pos === 'DEF' ? 'DFC' : pos === 'MED' ? 'MC' : 'DC');

    const baseAttrs = {
      pace: Math.min(90, regenOvr + (pos === 'DEL' ? 10 : pos === 'DEF' ? 4 : 6) + Math.floor(Math.random() * 6)),
      shooting: Math.min(86, pos === 'DEL' ? regenOvr + 6 : pos === 'MED' ? regenOvr - 2 : regenOvr - 16),
      passing: Math.min(86, pos === 'MED' ? regenOvr + 6 : regenOvr - 2),
      dribbling: Math.min(88, pos === 'DEL' || pos === 'MED' ? regenOvr + 5 : regenOvr - 6),
      defending: Math.min(86, pos === 'DEF' ? regenOvr + 7 : pos === 'MED' ? regenOvr - 5 : 35),
      physical: Math.min(85, regenOvr + Math.floor(Math.random() * 6))
    };

    const tempPlayer: Partial<Player> = {
      overall: regenOvr,
      potential: regenPot,
      age: regenAge,
      position: pos,
      specificPosition: specPos,
      attributes: baseAttrs
    };

    return {
      leagueId,
      teamId: retired.teamId, // Spawns in the academy/reserves of the club where the player retired
      name: generateRegenName(country),
      age: regenAge,
      overall: regenOvr,
      potential: regenPot,
      peakOvr: regenOvr,
      position: pos,
      specificPosition: specPos,
      secondaryPositions: retired.secondaryPositions,
      contract: calculateExpectedAnnualWage(tempPlayer, 68),
      contractYears: 4,
      contractEndSeason: league.season + 5,
      releaseClause: calculatePlayerMarketValue(tempPlayer) * 3,
      lineupStatus: retired.teamId ? 'youth' : 'reserve',
      stats: getInitialPlayerStats(),
      attributes: baseAttrs,
      detailedAttributes: getDetailedAttributes(tempPlayer),
      playStyles: retired.playStyles ? retired.playStyles.slice(0, 2) : undefined,
      bio: {
        height: retired.bio?.height || (173 + Math.floor(Math.random() * 18)),
        weight: retired.bio?.weight || (67 + Math.floor(Math.random() * 16)),
        country,
        preferredFoot: retired.bio?.preferredFoot || (Math.random() < 0.25 ? 'Left' : 'Right'),
        weakFoot: retired.bio?.weakFoot || 3,
        skillMoves: retired.bio?.skillMoves || 3
      },
      developmentType: regenDevType || devTypes[Math.floor(Math.random() * devTypes.length)],
      personality: personalities[Math.floor(Math.random() * personalities.length)],
      morale: 95,
      fatigue: 0,
      isInjured: false,
      unhappy: false
    };
  });

  if (playersToDelete.length > 0) {
    await db.players.bulkDelete(playersToDelete.map(p => p.id!));
  }
  if (newRegens.length > 0) {
    await db.players.bulkAdd(newRegens);
  }

  await db.players.bulkPut(remainingPlayers);
  await db.teams.bulkPut(allTeams);

  // Re-run lineup selection for all AI teams for the new season
  for (const t of allTeams) {
    if (t.id !== league.userTeamId) {
      await autoSelectLineupForTeam(t.id!);
    }
  }

  // 6. Clear old matches and generate fresh 38-matchday schedule for new season
  await db.matches.where('leagueId').equals(leagueId).delete();
  await generateLeagueFixtures(leagueId);

  // 7. Update league season (+1 year) and reset currentWeek to 1
  await db.leagues.update(leagueId, {
    season: league.season + 1,
    currentWeek: 1,
    lastPlayedAt: Date.now()
  });
}
