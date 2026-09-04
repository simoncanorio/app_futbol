import { db, type Team, type Match, type Player } from '../db/db';

export async function simulateMatch(leagueId: number, homeTeam: Team, awayTeam: Team, week: number, type: 'league' | 'cup'): Promise<Match> {
  const homeAdvantage = 3;
  const homeChance = homeTeam.overall + homeAdvantage;
  const awayChance = awayTeam.overall;
  
  const total = homeChance + awayChance;
  
  let homeScore = 0;
  let awayScore = 0;
  
  const events: any[] = [];
  
  // Load players for both teams
  const homePlayers = await db.players.where('teamId').equals(homeTeam.id!).toArray();
  const awayPlayers = await db.players.where('teamId').equals(awayTeam.id!).toArray();
  
  // Basic lineup selection (just grab top 11) for stat tracking
  const homeLineup = homePlayers.sort((a,b) => b.overall - a.overall).slice(0, 11);
  const awayLineup = awayPlayers.sort((a,b) => b.overall - a.overall).slice(0, 11);
  
  // Track games played
  for (const p of [...homeLineup, ...awayLineup]) {
    p.stats.gamesPlayed = (p.stats.gamesPlayed || 0) + 1;
  }
  
  const pickRandomPlayer = (players: Player[]) => {
    if(players.length === 0) return null;
    return players[Math.floor(Math.random() * players.length)];
  };

  const processGoal = (teamId: number, scoringTeamPlayers: Player[], minute: number) => {
    const scorer = pickRandomPlayer(scoringTeamPlayers.filter(p => p.position === 'DEL' || p.position === 'MED')) || pickRandomPlayer(scoringTeamPlayers);
    const assister = Math.random() > 0.3 ? pickRandomPlayer(scoringTeamPlayers.filter(p => p.id !== scorer?.id)) : null;
    
    if (scorer) {
      scorer.stats.goals = (scorer.stats.goals || 0) + 1;
      events.push({ type: 'goal', playerId: scorer.id!, teamId, assistId: assister?.id, minute });
    }
    if (assister) {
      assister.stats.assists = (assister.stats.assists || 0) + 1;
    }
  };

  for(let i = 0; i < 90; i += 10) {
     const roll = Math.random() * total;
     if(roll < homeChance * 0.05) {
       homeScore++;
       processGoal(homeTeam.id!, homeLineup, i + Math.floor(Math.random()*9));
     } else if(roll > total - (awayChance * 0.05)) {
       awayScore++;
       processGoal(awayTeam.id!, awayLineup, i + Math.floor(Math.random()*9));
     }
     
     // Random cards
     if (Math.random() < 0.1) {
        const teamId = Math.random() > 0.5 ? homeTeam.id! : awayTeam.id!;
        const players = teamId === homeTeam.id ? homeLineup : awayLineup;
        const player = pickRandomPlayer(players);
        if (player) {
          player.stats.yellowCards = (player.stats.yellowCards || 0) + 1;
          events.push({ type: 'yellow_card', playerId: player.id!, teamId, minute: i });
        }
     }
  }
  
  // Track clean sheets
  if (awayScore === 0) {
    const homeGk = homeLineup.find(p => p.position === 'POR');
    if (homeGk) homeGk.stats.cleanSheets = (homeGk.stats.cleanSheets || 0) + 1;
  }
  if (homeScore === 0) {
    const awayGk = awayLineup.find(p => p.position === 'POR');
    if (awayGk) awayGk.stats.cleanSheets = (awayGk.stats.cleanSheets || 0) + 1;
  }
  
  // Save updated players
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
