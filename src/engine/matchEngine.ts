import { db, type Team, type Match, type Player } from '../db/db';
import { calculateTeamChemistry } from '../utils/chemistryUtils';

// Helper to get a random item from array
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to get a random player, weighted by position (simple implementation)
function pickWeighted(players: Player[], positions: string[]): Player | null {
  const filtered = players.filter(p => positions.includes(p.position));
  if (filtered.length > 0) return pickRandom(filtered);
  return pickRandom(players) || null;
}

export async function simulateMatch(leagueId: number, homeTeam: Team, awayTeam: Team, week: number, type: 'league' | 'cup' | 'continental' | 'europa'): Promise<Match> {
  let homeScore = 0;
  let awayScore = 0;
  const events: any[] = [];
  
  const homePlayers = await db.players.where('teamId').equals(homeTeam.id!).toArray();
  const awayPlayers = await db.players.where('teamId').equals(awayTeam.id!).toArray();
  
  // Very simple lineup: 1 POR, 4 DEF, 4 MED, 2 DEL
  const getLineup = (allPlayers: Player[]) => {
    // Filter out injured and suspended players if possible
    let players = allPlayers.filter(p => !p.isInjured && !p.cards?.suspended);
    if (players.length < 11) players = allPlayers; // Fallback to everyone if not enough healthy players

    const por = players.filter(p => p.position === 'POR').sort((a,b)=>b.overall-a.overall).slice(0, 1);
    const def = players.filter(p => p.position === 'DEF').sort((a,b)=>b.overall-a.overall).slice(0, 4);
    const med = players.filter(p => p.position === 'MED').sort((a,b)=>b.overall-a.overall).slice(0, 4);
    const del = players.filter(p => p.position === 'DEL').sort((a,b)=>b.overall-a.overall).slice(0, 2);
    let lineup = [...por, ...def, ...med, ...del];
    
    // Fill if missing
    if(lineup.length < 11) {
      const rest = players.filter(p => !lineup.find(l => l.id === p.id)).sort((a,b)=>b.overall-a.overall);
      lineup = [...lineup, ...rest.slice(0, 11 - lineup.length)];
    }
    return lineup;
  };
  
  const homeLineup = getLineup(homePlayers);
  const awayLineup = getLineup(awayPlayers);
  
  const homeChem = calculateTeamChemistry(homeLineup, homeTeam).score;
  const awayChem = calculateTeamChemistry(awayLineup, awayTeam).score;

  for (const p of [...homeLineup, ...awayLineup]) {
    p.stats.gamesPlayed++;
    p.stats.minutesPlayed += 90; // simplified
  }

  const state = {
    possessionTeam: Math.random() > 0.5 ? homeTeam : awayTeam,
    zone: 'mid', // 'own', 'mid', 'opp', 'box'
  };

  const getOpponent = (team: Team) => team.id === homeTeam.id ? awayTeam : homeTeam;
  const getLineupByTeam = (team: Team) => team.id === homeTeam.id ? homeLineup : awayLineup;

  for (let minute = 1; minute <= 90; minute++) {
    const attackingTeam = state.possessionTeam;
    const defendingTeam = getOpponent(attackingTeam);
    const atkLineup = getLineupByTeam(attackingTeam);
    const defLineup = getLineupByTeam(defendingTeam);
    const atkChem = attackingTeam.id === homeTeam.id ? homeChem : awayChem;
    const chemBonus = (atkChem - 50) * 0.1;

    const atkPlayer = pickRandom(atkLineup.filter(p => p.position !== 'POR')) || atkLineup[0];
    const defPlayer = pickRandom(defLineup.filter(p => p.position !== 'POR')) || defLineup[0];

    const rawAtkAtts = atkPlayer.attributes || { pace: 50, shooting: 50, passing: 50, dribbling: 50, defending: 50, physical: 50 };
    const rawDefAtts = defPlayer.attributes || { pace: 50, shooting: 50, passing: 50, dribbling: 50, defending: 50, physical: 50 };

    const getEff = (p: Player, atts: any, stat: string) => {
        let v = (atts as any)[stat] || 50;
        const fat = p.fatigue || 0;
        if (fat > 40) v -= v * ((fat - 40) / 60) * 0.3; // Up to 30% penalty for fatigue
        if (p.unhappy) v *= 0.85;
        else if ((p.morale || 80) > 85) v *= 1.05;
        else if ((p.morale || 80) < 40) v *= 0.90;
        return v;
    };

    const atkAtts = {
      pace: getEff(atkPlayer, rawAtkAtts, 'pace'),
      shooting: getEff(atkPlayer, rawAtkAtts, 'shooting'),
      passing: getEff(atkPlayer, rawAtkAtts, 'passing'),
      dribbling: getEff(atkPlayer, rawAtkAtts, 'dribbling'),
      defending: getEff(atkPlayer, rawAtkAtts, 'defending'),
      physical: getEff(atkPlayer, rawAtkAtts, 'physical')
    };
    
    const defAtts = {
      pace: getEff(defPlayer, rawDefAtts, 'pace'),
      shooting: getEff(defPlayer, rawDefAtts, 'shooting'),
      passing: getEff(defPlayer, rawDefAtts, 'passing'),
      dribbling: getEff(defPlayer, rawDefAtts, 'dribbling'),
      defending: getEff(defPlayer, rawDefAtts, 'defending'),
      physical: getEff(defPlayer, rawDefAtts, 'physical')
    };

    // Tactical Style Modifiers
    const atkStyle = attackingTeam.tacticalStyle || 'Tiki-Taka (Posesión)';
    const defStyle = defendingTeam.tacticalStyle || 'Tiki-Taka (Posesión)';

    let passBonus = atkStyle.includes('Tiki-Taka') || atkStyle.includes('Posición') ? 12 : 0;
    let defBonus = defStyle.includes('Gegenpressing') || defStyle.includes('Autobús') ? 12 : 0;

    // Action choice
    if (state.zone === 'own' || state.zone === 'mid') {
      // Pass or Dribble
      atkPlayer.stats.touches++;
      if (Math.random() > (atkStyle.includes('Directo') ? 0.4 : 0.2)) { // Pass
        atkPlayer.stats.passesAttempted++;
        if (state.zone === 'own') atkPlayer.stats.ownHalfPassesAttempted++;
        else atkPlayer.stats.oppHalfPassesAttempted++;
        
        // Pass success depends on passing vs opponent interception
        const passRoll = Math.random() * 100 + (atkAtts.passing * 0.5) + passBonus + chemBonus;
        const defRoll = Math.random() * 100 + (defAtts.defending * 0.3) + defBonus;
        
        if (passRoll > defRoll) {
          atkPlayer.stats.passesCompleted++;
          if (state.zone === 'own') {
            atkPlayer.stats.ownHalfPassesCompleted++;
            state.zone = 'mid';
          } else {
            atkPlayer.stats.oppHalfPassesCompleted++;
            state.zone = 'opp';
          }
        } else {
          // Intercepted
          atkPlayer.stats.possessionLost++;
          defPlayer.stats.interceptions++;
          defPlayer.stats.ballsRecovered++;
          state.possessionTeam = defendingTeam;
        }
      } else { // Dribble / Duel
        atkPlayer.stats.dribblesAttempted++;
        const duelRoll = Math.random() * 100 + (atkAtts.dribbling * 0.5 + atkAtts.pace * 0.5);
        const tackleRoll = Math.random() * 100 + (defAtts.defending * 0.5 + defAtts.physical * 0.5);
        
        if (duelRoll > tackleRoll) {
          atkPlayer.stats.dribblesCompleted++;
          atkPlayer.stats.duelsWon++;
          atkPlayer.stats.groundDuelsWon++;
          defPlayer.stats.duelsLost++;
          defPlayer.stats.groundDuelsLost++;
          defPlayer.stats.dribbledPast++;
          state.zone = state.zone === 'own' ? 'mid' : 'opp';
        } else {
          atkPlayer.stats.possessionLost++;
          atkPlayer.stats.duelsLost++;
          atkPlayer.stats.groundDuelsLost++;
          defPlayer.stats.tackles++;
          defPlayer.stats.duelsWon++;
          defPlayer.stats.groundDuelsWon++;
          defPlayer.stats.ballsRecovered++;
          
          // Foul check
          if (Math.random() < 0.2) {
             defPlayer.stats.foulsCommitted++;
             atkPlayer.stats.foulsReceived++;
             state.possessionTeam = attackingTeam; // free kick
             
             // Card check
             if (Math.random() < 0.1) {
                if (!defPlayer.cards) defPlayer.cards = { yellow: 0, red: 0, suspended: false };
                
                // Straight red or second yellow
                if (Math.random() < 0.05 || defPlayer.cards.yellow >= 1) {
                   defPlayer.stats.redCards++;
                   defPlayer.cards.red++;
                   defPlayer.cards.suspended = true;
                   events.push({ type: 'red_card', playerId: defPlayer.id!, teamId: defendingTeam.id!, minute });
                } else {
                   defPlayer.stats.yellowCards++;
                   defPlayer.cards.yellow++;
                   events.push({ type: 'yellow_card', playerId: defPlayer.id!, teamId: defendingTeam.id!, minute });
                }
             }
          } else {
             state.possessionTeam = defendingTeam;
          }
        }
      }
    } else if (state.zone === 'opp' || state.zone === 'box') {
      atkPlayer.stats.touches++;
      // Create chance or shoot
      if (Math.random() > 0.4 && state.zone === 'opp') {
         // Cross or Through Ball (Key Pass)
         const isCross = Math.random() > 0.5;
         if (isCross) atkPlayer.stats.crossesAttempted++;
         
         const passRoll = Math.random() * 100 + (atkAtts.passing * 0.6);
         const defRoll = Math.random() * 100 + (defAtts.defending * 0.4);
         
         if (passRoll > defRoll) {
            if (isCross) atkPlayer.stats.crossesCompleted++;
            atkPlayer.stats.keyPasses++;
            atkPlayer.stats.xA += 0.15;
            state.zone = 'box';
            
            // Receiver shoots
            const receiver = pickWeighted(atkLineup, ['DEL', 'MED']) || atkPlayer;
            const xG = 0.2 + (Math.random() * 0.3); // big chance
            receiver.stats.shotsTotal++;
            receiver.stats.xG += xG;
            if (xG > 0.3) {
              atkPlayer.stats.bigChancesCreated++;
            }
            
            const gk = defLineup.find(p => p.position === 'POR') || defLineup[0];
            const rawGkAtts = gk.attributes || { pace: 50, shooting: 50, passing: 50, dribbling: 50, defending: 50, physical: 50 };
            const gkDef = getEff(gk, rawGkAtts, 'defending') || gk.overall;
            const receiverShooting = getEff(receiver, receiver.attributes || { shooting: 50 }, 'shooting') || receiver.overall;

            const shootRoll = Math.random() * 100 + (receiverShooting * 0.6);
            const saveRoll = Math.random() * 100 + (gkDef * 0.6);
            
            if (shootRoll > saveRoll) { // Shot on target
               receiver.stats.shotsOnTarget++;
               if (shootRoll > saveRoll + 20) { // Goal
                  receiver.stats.goals++;
                  receiver.stats.goalsInsideBox++;
                  if (isCross) receiver.stats.headerGoals++;
                  atkPlayer.stats.assists++;
                  if (attackingTeam.id === homeTeam.id) homeScore++; else awayScore++;
                  events.push({ type: 'goal', playerId: receiver.id!, teamId: attackingTeam.id!, assistId: atkPlayer.id, minute });
                  state.zone = 'mid';
                  state.possessionTeam = defendingTeam;
               } else {
                  // Saved
                  state.possessionTeam = defendingTeam;
                  state.zone = 'own';
                  if (xG > 0.3) receiver.stats.bigChancesMissed++;
               }
            } else {
               // Missed completely or blocked
               if (Math.random() > 0.5) {
                 defPlayer.stats.shotsBlocked++;
               }
               state.possessionTeam = defendingTeam;
               state.zone = 'own';
               if (xG > 0.3) receiver.stats.bigChancesMissed++;
            }
         } else {
            // Cleared or intercepted
            atkPlayer.stats.possessionLost++;
            defPlayer.stats.clearances++;
            state.possessionTeam = defendingTeam;
            state.zone = 'own';
         }
      } else {
         // Shoot directly
         const xG = state.zone === 'box' ? 0.15 : 0.05;
         atkPlayer.stats.shotsTotal++;
         atkPlayer.stats.xG += xG;
         
         const gk = defLineup.find(p => p.position === 'POR') || defLineup[0];
         const rawGkAtts = gk.attributes || { pace: 50, shooting: 50, passing: 50, dribbling: 50, defending: 50, physical: 50 };
         const gkDef = getEff(gk, rawGkAtts, 'defending') || gk.overall;
         
         const shootRoll = Math.random() * 100 + (atkAtts.shooting * 0.6);
         const saveRoll = Math.random() * 100 + (gkDef * 0.6);
         
         if (shootRoll > saveRoll) {
            atkPlayer.stats.shotsOnTarget++;
            if (shootRoll > saveRoll + 25) { // Goal
               atkPlayer.stats.goals++;
               if (state.zone === 'box') atkPlayer.stats.goalsInsideBox++;
               else atkPlayer.stats.goalsOutsideBox++;
               if (attackingTeam.id === homeTeam.id) homeScore++; else awayScore++;
               events.push({ type: 'goal', playerId: atkPlayer.id!, teamId: attackingTeam.id!, minute });
               state.zone = 'mid';
               state.possessionTeam = defendingTeam;
            } else {
               state.possessionTeam = defendingTeam;
               state.zone = 'own';
            }
         } else {
            state.possessionTeam = defendingTeam;
            state.zone = 'own';
         }
      }
    }
  }

  // Final updates (clean sheets & penalty shootout for knockouts)
  if ((type === 'cup' || type === 'continental' || type === 'europa') && homeScore === awayScore) {
    // Decide winner by penalty shootout / extra time
    const homeAdv = homeTeam.overall + (homeTeam.prestige || 50) * 0.2 + Math.random() * 15;
    const awayAdv = awayTeam.overall + (awayTeam.prestige || 50) * 0.2 + Math.random() * 15;
    if (homeAdv >= awayAdv) {
      homeScore += 1;
      events.push({ type: 'goal', playerId: homeLineup[0]?.id || 1, teamId: homeTeam.id!, minute: 120 });
    } else {
      awayScore += 1;
      events.push({ type: 'goal', playerId: awayLineup[0]?.id || 1, teamId: awayTeam.id!, minute: 120 });
    }
  }

  if (awayScore === 0) {
    const homeGk = homeLineup.find(p => p.position === 'POR');
    if (homeGk) homeGk.stats.cleanSheets++;
  }
  if (homeScore === 0) {
    const awayGk = awayLineup.find(p => p.position === 'POR');
    if (awayGk) awayGk.stats.cleanSheets++;
  }

  // Cap stats properly and apply Fatigue, Injuries, Cards
  [...homeLineup, ...awayLineup].forEach(p => {
    p.stats.xA = parseFloat(p.stats.xA.toFixed(2));
    p.stats.xG = parseFloat(p.stats.xG.toFixed(2));
    
    // Fatigue increase (Base 5-15% per game)
    const currentFatigue = p.fatigue || 0;
    p.fatigue = Math.min(100, currentFatigue + 5 + Math.random() * 10);
    
    // Injury Check
    const team = p.teamId === homeTeam.id ? homeTeam : awayTeam;
    const healthLevel = team.healthExpense || 50; 
    const injuryProne = p.injuryProne || 50;
    const fatigueFactor = p.fatigue / 100;
    
    const injuryChance = 0.01 + (fatigueFactor * 0.03) + (injuryProne / 100 * 0.02) - (healthLevel / 100 * 0.02);
    
    if (!p.isInjured && Math.random() < Math.max(0.005, injuryChance)) {
       p.isInjured = true;
       p.injuryWeeks = Math.floor(Math.random() * 6) + 1; // 1 to 6 weeks
       const types = ['Esguince de tobillo', 'Desgarro muscular', 'Sobrecarga', 'Lesión de rodilla', 'Fractura menor'];
       p.injuryType = types[Math.floor(Math.random() * types.length)];
    }
  });

  await db.players.bulkPut([...homeLineup, ...awayLineup]);

  return {
    leagueId,
    homeTeamId: homeTeam.id!,
    awayTeamId: awayTeam.id!,
    homeScore,
    awayScore,
    week,
    isPlayed: true,
    type,
    events
  };
}
