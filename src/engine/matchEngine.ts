import { db, type Team, type Match } from '../db/db';

export async function simulateMatch(leagueId: number, homeTeam: Team, awayTeam: Team, week: number, type: 'league' | 'cup'): Promise<Match> {
  const homeAdvantage = 3;
  const homeChance = homeTeam.overall + homeAdvantage;
  const awayChance = awayTeam.overall;
  
  const total = homeChance + awayChance;
  
  let homeScore = 0;
  let awayScore = 0;
  
  for(let i = 0; i < 5; i++) {
     const roll = Math.random() * total;
     if(roll < homeChance * 0.4) homeScore++;
     else if(roll > total - (awayChance * 0.4)) awayScore++;
  }

  return {
    leagueId,
    homeTeamId: homeTeam.id!,
    awayTeamId: awayTeam.id!,
    homeScore,
    awayScore,
    week,
    isPlayed: true,
    type
  };
}
