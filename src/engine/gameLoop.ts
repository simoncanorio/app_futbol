import { db } from '../db/db';
import { simulateMatch } from './matchEngine';

export async function advanceWeek(leagueId: number) {
  const league = await db.leagues.get(leagueId);
  if (!league) return;

  const currentWeek = league.season; 
  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();
  
  // Agrupar por domesticLeague
  const leaguesMap: Record<string, typeof allTeams> = {};
  for(const t of allTeams) {
    if(!leaguesMap[t.domesticLeague]) leaguesMap[t.domesticLeague] = [];
    leaguesMap[t.domesticLeague].push(t);
  }

  const matchesToSave = [];
  
  // Simular partidos para cada liga doméstica
  for(const domLeague in leaguesMap) {
    const teams = leaguesMap[domLeague];
    
    // Algoritmo de emparejamiento muy simple para el MVP
    for(let i=0; i < teams.length; i+=2) {
      if(i+1 < teams.length) {
         const home = i % 2 === 0 ? teams[i] : teams[i+1];
         const away = i % 2 === 0 ? teams[i+1] : teams[i];
         
         const match = await simulateMatch(leagueId, home, away, currentWeek, 'league');
         
         // Update stats
         if(match.homeScore > match.awayScore) { 
           home.wins++; away.losses++; 
           home.hype = Math.min(100, (home.hype || 50) + 2);
           away.hype = Math.max(0, (away.hype || 50) - 1);
         }
         else if(match.awayScore > match.homeScore) { 
           away.wins++; home.losses++; 
           away.hype = Math.min(100, (away.hype || 50) + 2);
           home.hype = Math.max(0, (home.hype || 50) - 1);
         }
         else { 
           home.draws++; away.draws++; 
         }
         
         home.goalsFor += match.homeScore; home.goalsAgainst += match.awayScore;
         away.goalsFor += match.awayScore; away.goalsAgainst += match.homeScore;

         // Simular ingresos y asistencia básicos por partido local basados en Hype
         const hypeMultiplier = ((home.hype || 50) / 50); // 1.0 base
         const actualAttendance = Math.min(home.population * 0.01, home.attendance * hypeMultiplier); // max 1% population
         
         const weeklyRevenue = home.ticketPrice * actualAttendance;
         home.revenue += weeklyRevenue;
         
         // Gastos semanales (Salarios + Gastos variables)
         const baseExpenses = (home.scoutingExpense || 100) * 10000 + 
                              (home.coachingExpense || 100) * 10000 +
                              (home.healthExpense || 100) * 10000 +
                              (home.facilitiesExpense || 100) * 10000;
                              
         const weeklyProfit = weeklyRevenue - baseExpenses;
         home.profit += weeklyProfit;
         home.budget += weeklyProfit;

         matchesToSave.push(match);
      }
    }
  }
  
  await db.matches.bulkAdd(matchesToSave);
  await db.teams.bulkPut(allTeams); // Actualiza todos los equipos
  await db.leagues.update(leagueId, { season: currentWeek + 1, lastPlayedAt: Date.now() });
}
