import { db, type Team, type Match, type Player } from '../db/db';

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

export async function simulateMatch(leagueId: number, homeTeam: Team, awayTeam: Team, week: number, type: 'league' | 'cup' | 'continental'): Promise<Match> {
  let homeScore = 0;
  let awayScore = 0;
  const events: any[] = [];
  
  const homePlayers = await db.players.where('teamId').equals(homeTeam.id!).toArray();
  const awayPlayers = await db.players.where('teamId').equals(awayTeam.id!).toArray();
  
  // Very simple lineup: 1 POR, 4 DEF, 4 MED, 2 DEL
  const getLineup = (players: Player[]) => {
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

    const atkPlayer = pickRandom(atkLineup.filter(p => p.position !== 'POR')) || atkLineup[0];
    const defPlayer = pickRandom(defLineup.filter(p => p.position !== 'POR')) || defLineup[0];

    const atkAtts = atkPlayer.attributes || { pace: 50, shooting: 50, passing: 50, dribbling: 50, defending: 50, physical: 50 };
    const defAtts = defPlayer.attributes || { pace: 50, shooting: 50, passing: 50, dribbling: 50, defending: 50, physical: 50 };

    // Action choice
    if (state.zone === 'own' || state.zone === 'mid') {
      // Pass or Dribble
      atkPlayer.stats.touches++;
      if (Math.random() > 0.2) { // Pass
        atkPlayer.stats.passesAttempted++;
        if (state.zone === 'own') atkPlayer.stats.ownHalfPassesAttempted++;
        else atkPlayer.stats.oppHalfPassesAttempted++;
        
        // Pass success depends on passing vs opponent interception
        const passRoll = Math.random() * 100 + (atkAtts.passing * 0.5);
        const defRoll = Math.random() * 100 + (defAtts.defending * 0.3);
        
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
             if (Math.random() < 0.1) {
                defPlayer.stats.yellowCards++;
                events.push({ type: 'yellow_card', playerId: defPlayer.id!, teamId: defendingTeam.id!, minute });
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
            const gkAtts = gk.attributes || defAtts;
            const shootRoll = Math.random() * 100 + ((receiver.attributes?.shooting||50) * 0.6);
            const saveRoll = Math.random() * 100 + (gkAtts.defending * 0.6);
            
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
         const gkAtts = gk.attributes || defAtts;
         const shootRoll = Math.random() * 100 + (atkAtts.shooting * 0.6);
         const saveRoll = Math.random() * 100 + (gkAtts.defending * 0.6);
         
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
  if ((type === 'cup' || type === 'continental') && homeScore === awayScore) {
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

  // Cap stats properly
  [...homeLineup, ...awayLineup].forEach(p => {
    p.stats.xA = parseFloat(p.stats.xA.toFixed(2));
    p.stats.xG = parseFloat(p.stats.xG.toFixed(2));
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
