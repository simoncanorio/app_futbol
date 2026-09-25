import { db, getInitialPlayerStats, isTransferWindowOpen } from '../db/db';
import { simulateMatch } from './matchEngine';
import { generateLeagueFixtures } from './fixtureGenerator';
import { processAITransfers } from './aiTransfers';
import { autoSelectLineupForTeam, checkLineupReady } from '../utils/lineupUtils';

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

  // Enforce mandatory lineup: if user team lacks 11 starters, auto-select
  if (league.userTeamId) {
    const isReady = await checkLineupReady(league.userTeamId);
    if (!isReady) {
      await autoSelectLineupForTeam(league.userTeamId);
    }
  }

  const maxWeeks = await getLeagueMaxWeeks(leagueId);

  // If season finished, trigger startNextSeason
  if (league.currentWeek > maxWeeks) {
    await startNextSeason(leagueId);
    return;
  }

  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();

  // Check if fixtures exist for this league
  let currentMatches = await db.matches
    .where('leagueId')
    .equals(leagueId)
    .filter(m => m.week === league.currentWeek && !m.isPlayed)
    .toArray();

  if (currentMatches.length === 0) {
    const totalMatchesCount = await db.matches.where('leagueId').equals(leagueId).count();
    if (totalMatchesCount === 0) {
      await generateLeagueFixtures(leagueId);
      currentMatches = await db.matches
        .where('leagueId')
        .equals(leagueId)
        .filter(m => m.week === league.currentWeek && !m.isPlayed)
        .toArray();
    }
  }

  const teamMap = new Map(allTeams.map(t => [t.id!, t]));

  // Simulate scheduled matches for this matchday
  for (const m of currentMatches) {
    const home = teamMap.get(m.homeTeamId);
    const away = teamMap.get(m.awayTeamId);
    if (!home || !away) continue;

    const simRes = await simulateMatch(leagueId, home, away, league.currentWeek, m.type || 'league');
    
    // Update match record
    m.homeScore = simRes.homeScore;
    m.awayScore = simRes.awayScore;
    m.isPlayed = true;
    m.events = simRes.events;
    await db.matches.put(m);

    // Update team stats
    if (m.homeScore > m.awayScore) {
      home.wins++; away.losses++;
      home.hype = Math.min(100, (home.hype || 50) + 2);
      away.hype = Math.max(0, (away.hype || 50) - 1);
    } else if (m.awayScore > m.homeScore) {
      away.wins++; home.losses++;
      away.hype = Math.min(100, (away.hype || 50) + 2);
      home.hype = Math.max(0, (home.hype || 50) - 1);
    } else {
      home.draws++; away.draws++;
    }

    home.goalsFor += m.homeScore; home.goalsAgainst += m.awayScore;
    away.goalsFor += m.awayScore; away.goalsAgainst += m.homeScore;

    // Financial revenue
    const hypeMultiplier = ((home.hype || 50) / 50);
    const actualAttendance = Math.min(home.population * 0.01, home.attendance * hypeMultiplier);
    const weeklyRevenue = home.ticketPrice * actualAttendance;
    home.revenue += weeklyRevenue;

    const baseExpenses = (home.scoutingExpense || 100) * 10000 +
                         (home.coachingExpense || 100) * 10000 +
                         (home.healthExpense || 100) * 10000 +
                         (home.facilitiesExpense || 100) * 10000;

    const weeklyProfit = weeklyRevenue - baseExpenses;
    home.profit += weeklyProfit;
    home.budget += weeklyProfit;
  }

  // Update Player Fatigue, Morale & Injury Recovery (Task 1 & 13)
  const allPlayers = await db.players.where('leagueId').equals(leagueId).toArray();
  for (const p of allPlayers) {
    if (p.isInjured) {
      p.injuryWeeks = (p.injuryWeeks || 1) - 1;
      if (p.injuryWeeks <= 0) {
        p.isInjured = false;
        p.injuryWeeks = 0;
      }
    }

    if (p.lineupStatus === 'starter') {
      p.fatigue = Math.min(100, (p.fatigue || 0) + 12);
      p.morale = Math.min(100, (p.morale || 85) + 3);
      if (p.morale >= 50) p.unhappy = false;
      
      // Injury risk if fatigue high & injuryProne
      const baseRisk = (p.fatigue / 100) * 0.04 + ((p.injuryProne || 30) / 100) * 0.03;
      if (Math.random() < baseRisk && !p.isInjured) {
        p.isInjured = true;
        p.injuryWeeks = Math.floor(Math.random() * 4) + 1;
      }
    } else if (p.lineupStatus === 'bench') {
      p.fatigue = Math.max(0, (p.fatigue || 0) - 22);
      p.morale = Math.max(10, (p.morale || 85) - 2);
    } else {
      // Reserve / Youth
      p.fatigue = Math.max(0, (p.fatigue || 0) - 25);
      p.morale = Math.max(0, (p.morale || 85) - 4);
    }

    if ((p.morale || 85) < 35) {
      p.unhappy = true;
    }
  }
  await db.players.bulkPut(allPlayers);

  // AI Club Transfers ONLY during open transfer windows (Task 11: Weeks 1-4, 19-22)
  if (isTransferWindowOpen(league.currentWeek)) {
    await processAITransfers(league, allTeams);
  }

  // Process dynamic knockout progressions for Cup and Champions League
  await processKnockoutProgressions(leagueId, league.currentWeek);

  await db.teams.bulkPut(allTeams);
  await db.leagues.update(leagueId, { currentWeek: league.currentWeek + 1, lastPlayedAt: Date.now() });
}

async function processKnockoutProgressions(leagueId: number, currentWeek: number) {
  // 1. Cup Knockouts (Weeks 8 -> 15 -> 22 -> 29 -> 36 Final)
  if ([8, 15, 22, 29].includes(currentWeek)) {
    const cupMatches = await db.matches
      .where('leagueId').equals(leagueId)
      .filter(m => m.type === 'cup' && m.week === currentWeek && m.isPlayed)
      .toArray();

    if (cupMatches.length > 0) {
      const winners: number[] = cupMatches.map(m => m.homeScore > m.awayScore ? m.homeTeamId : m.awayTeamId);
      let nextWeek = 15;
      if (currentWeek === 15) nextWeek = 22;
      if (currentWeek === 22) nextWeek = 29;
      if (currentWeek === 29) nextWeek = 36; // Final de Copa

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

  // 2. Champions League Knockouts (Weeks 27 League Phase -> 31 Octavos -> 33 Cuartos -> 35 Semis -> 38 Final)
  if (currentWeek === 27) {
    const playedCL = await db.matches
      .where('leagueId').equals(leagueId)
      .filter(m => m.type === 'continental' && m.isPlayed)
      .toArray();

    const teamPointsMap = new Map<number, { pts: number; gd: number }>();
    playedCL.forEach(m => {
      const h = teamPointsMap.get(m.homeTeamId) || { pts: 0, gd: 0 };
      const a = teamPointsMap.get(m.awayTeamId) || { pts: 0, gd: 0 };
      h.gd += (m.homeScore - m.awayScore);
      a.gd += (m.awayScore - m.homeScore);
      if (m.homeScore > m.awayScore) h.pts += 3;
      else if (m.awayScore > m.homeScore) a.pts += 3;
      else { h.pts += 1; a.pts += 1; }
      teamPointsMap.set(m.homeTeamId, h);
      teamPointsMap.set(m.awayTeamId, a);
    });

    const sortedTeams = Array.from(teamPointsMap.entries())
      .sort((a, b) => b[1].pts - a[1].pts || b[1].gd - a[1].gd)
      .map(entry => entry[0]);

    const existingOctavos = await db.matches
      .where('leagueId').equals(leagueId)
      .filter(m => m.type === 'continental' && m.week === 31)
      .count();

    if (existingOctavos === 0 && sortedTeams.length >= 4) {
      const top16 = sortedTeams.slice(0, Math.min(16, sortedTeams.length));
      const nextFixtures: any[] = [];
      const n = top16.length;
      for (let i = 0; i < Math.floor(n / 2); i++) {
        nextFixtures.push({
          leagueId,
          homeTeamId: top16[i],
          awayTeamId: top16[n - 1 - i],
          homeScore: 0,
          awayScore: 0,
          week: 31,
          isPlayed: false,
          type: 'continental',
          events: []
        });
      }
      await db.matches.bulkAdd(nextFixtures);
    }
  } else if ([31, 33, 35].includes(currentWeek)) {
    const clMatches = await db.matches
      .where('leagueId').equals(leagueId)
      .filter(m => m.type === 'continental' && m.week === currentWeek && m.isPlayed)
      .toArray();

    if (clMatches.length > 0) {
      const winners: number[] = clMatches.map(m => m.homeScore > m.awayScore ? m.homeTeamId : m.awayTeamId);
      let nextWeek = 33;
      if (currentWeek === 33) nextWeek = 35;
      if (currentWeek === 35) nextWeek = 38; // Final de Champions

      const existingNextMatches = await db.matches
        .where('leagueId').equals(leagueId)
        .filter(m => m.type === 'continental' && m.week === nextWeek)
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
            type: 'continental',
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

  // Find Trophy Winners for this season
  // 1. Champions League Winner (Week 38 or latestPlayed continental)
  const clFinalMatch = await db.matches
    .where('leagueId').equals(leagueId)
    .filter(m => m.type === 'continental' && m.isPlayed)
    .reverse()
    .first();
  
  const championsLeagueWinnerId = clFinalMatch
    ? (clFinalMatch.homeScore > clFinalMatch.awayScore ? clFinalMatch.homeTeamId : clFinalMatch.awayTeamId)
    : allTeams.sort((a,b)=>b.overall-a.overall)[0]?.id;

  const championsLeagueWinner = allTeams.find(t => t.id === championsLeagueWinnerId);

  // 2. Copa Winner (Week 36 or latestPlayed cup)
  const cupFinalMatch = await db.matches
    .where('leagueId').equals(leagueId)
    .filter(m => m.type === 'cup' && m.isPlayed)
    .reverse()
    .first();

  const cupWinnerId = cupFinalMatch
    ? (cupFinalMatch.homeScore > cupFinalMatch.awayScore ? cupFinalMatch.homeTeamId : cupFinalMatch.awayTeamId)
    : allTeams.sort((a,b)=>b.overall-a.overall)[1]?.id;

  const cupWinner = allTeams.find(t => t.id === cupWinnerId);

  // 3. Liga Champion (Top of domestic standings)
  const domMap: Record<string, typeof allTeams> = {};
  allTeams.forEach(t => {
    if (!domMap[t.domesticLeague]) domMap[t.domesticLeague] = [];
    domMap[t.domesticLeague].push(t);
  });

  let leagueChampion: typeof allTeams[0] | undefined;

  for (const leagueName in domMap) {
    const sorted = domMap[leagueName].sort((a, b) => (b.wins * 3 + b.draws) - (a.wins * 3 + a.draws) || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));
    if (!leagueChampion) leagueChampion = sorted[0];

    sorted.forEach((t, rankIdx) => {
      let prestige = t.prestige || 70;
      if (rankIdx === 0) prestige = Math.min(100, prestige + 2); // Liga winner
      if (t.id === championsLeagueWinnerId) prestige = Math.min(100, prestige + 5); // UCL winner
      if (t.id === cupWinnerId) prestige = Math.min(100, prestige + 3); // Cup winner
      if (rankIdx >= sorted.length - 3) prestige = Math.max(20, prestige - 20); // Relegated

      t.prestige = prestige;
      t.wins = 0;
      t.draws = 0;
      t.losses = 0;
      t.goalsFor = 0;
      t.goalsAgainst = 0;
      if (t.hype) t.hype = Math.floor((t.hype + 50) / 2);
    });
  }
  await db.teams.bulkPut(allTeams);

  // Save Season History entry
  const allPlayers = await db.players.where('leagueId').equals(leagueId).toArray();
  const topScorer = [...allPlayers].sort((a,b)=>(b.stats?.goals||0)-(a.stats?.goals||0))[0];

  await db.history.add({
    leagueId,
    season: league.season,
    domesticLeague: leagueChampion?.domesticLeague || 'LaLiga',
    championId: leagueChampion?.id || 1,
    runnerUpId: domMap[leagueChampion?.domesticLeague || 'LaLiga']?.[1]?.id || 2,
    mvpId: topScorer?.id || 1,
    topScorerId: topScorer?.id || 1,
    bestKeeperId: 1,
    goldenBoyId: 1,
    cupChampionId: cupWinnerId,
    championsLeagueChampionId: championsLeagueWinnerId
  } as any);

  // Record GM History for user team
  if (league.userTeamId) {
    const userTeam = allTeams.find(t => t.id === league.userTeamId);
    if (userTeam) {
      const domTeams = allTeams.filter(t => t.domesticLeague === userTeam.domesticLeague);
      domTeams.sort((a, b) => (b.wins * 3 + b.draws) - (a.wins * 3 + a.draws) || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));
      const pos = domTeams.findIndex(t => t.id === userTeam.id) + 1;
      
      const titlesWon = [];
      if (pos === 1) titlesWon.push(userTeam.domesticLeague);
      if (userTeam.id === cupWinnerId) titlesWon.push('Copa del Rey / FA Cup');
      if (userTeam.id === championsLeagueWinnerId) titlesWon.push('UEFA Champions League');

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

  // 2. Dynamic Player Evolution & Contract Reduction
  for (const p of allPlayers) {
    if (p.stats) {
      if (!p.historicalStats) p.historicalStats = {};
      p.historicalStats[league.season] = { ...p.stats };
    }

    p.age += 1;
    const gamesPlayed = p.stats?.gamesPlayed || 0;

    // Dynamic Growth Engine
    if (p.age <= 23) {
      const growth = gamesPlayed > 15 ? Math.floor(Math.random() * 4) + 2 : Math.floor(Math.random() * 2) + 1;
      p.overall = Math.min(p.potential, p.overall + growth);
    } else if (p.age >= 31) {
      const decline = Math.floor(Math.random() * 3) + 1;
      p.overall = Math.max(45, p.overall - decline);
      p.potential = p.overall;
    }

    p.stats = getInitialPlayerStats();
    p.fatigue = 0;

    if (p.contractYears !== undefined && p.contractYears > 0) {
      p.contractYears -= 1;
      if (p.contractYears === 0) {
        p.teamId = null;
        p.lineupStatus = 'reserve';
        p.pitchPosition = undefined;
      }
    }
  }
  await db.players.bulkPut(allPlayers);

  // 3. Clear old matches and generate fresh 38-matchday schedule for new season
  await db.matches.where('leagueId').equals(leagueId).delete();
  await generateLeagueFixtures(leagueId);

  // 4. Update league season (+1 year) and reset currentWeek to 1
  await db.leagues.update(leagueId, {
    season: league.season + 1,
    currentWeek: 1,
    lastPlayedAt: Date.now()
  });
}
