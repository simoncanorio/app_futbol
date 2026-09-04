import { db } from '../db/db';
import { simulateMatch } from './matchEngine';

export async function getLeagueMaxWeeks(leagueId: number) {
  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();
  const leaguesMap: Record<string, typeof allTeams> = {};
  for(const t of allTeams) {
    if(!leaguesMap[t.domesticLeague]) leaguesMap[t.domesticLeague] = [];
    leaguesMap[t.domesticLeague].push(t);
  }
  let maxWeeks = 0;
  for(const domLeague in leaguesMap) {
    const numTeams = leaguesMap[domLeague].length;
    const weeks = (numTeams - 1) * 2;
    if (weeks > maxWeeks) maxWeeks = weeks;
  }
  return maxWeeks;
}

export async function advanceWeek(leagueId: number) {
  const league = await db.leagues.get(leagueId);
  if (!league) return;

  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();
  
  // Agrupar por domesticLeague
  const leaguesMap: Record<string, typeof allTeams> = {};
  for(const t of allTeams) {
    if(!leaguesMap[t.domesticLeague]) leaguesMap[t.domesticLeague] = [];
    leaguesMap[t.domesticLeague].push(t);
  }

  const maxWeeks = await getLeagueMaxWeeks(leagueId);

  // If we already finished the season
  if (league.currentWeek > maxWeeks) {
    await endSeason(leagueId, league.season, allTeams);
    return;
  }

  const matchesToSave = [];
  
  // Simular partidos para cada liga doméstica
  for(const domLeague in leaguesMap) {
    const teams = leaguesMap[domLeague];
    
    // Algoritmo de emparejamiento muy simple para el MVP:
    // Solo elegimos pares aleatorios o el i vs i+1 de momento, rotándolos.
    // En un juego completo usaríamos un array de emparejamientos Round-Robin.
    // Para simplificar, emparejamos (i + currentWeek) % N
    const n = teams.length;
    const played = new Set<number>();
    
    for(let i=0; i < n; i++) {
      if (played.has(i)) continue;
      
      // Pick opponent based on current week to avoid playing the same team
      let opp = (i + league.currentWeek) % n;
      if (opp === i) opp = (opp + 1) % n;
      
      // Find next available opp
      while (played.has(opp) && played.size < n) {
         opp = (opp + 1) % n;
         if (opp === i) opp = (opp + 1) % n;
      }
      
      if (!played.has(opp)) {
         played.add(i);
         played.add(opp);
         
         const home = teams[i];
         const away = teams[opp];
         
         const match = await simulateMatch(leagueId, home, away, league.currentWeek, 'league');
         
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

         // Simular ingresos y asistencia
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

         matchesToSave.push(match);
      }
    }
  }
  
  await db.matches.bulkAdd(matchesToSave);
  await db.teams.bulkPut(allTeams); 
  await db.leagues.update(leagueId, { currentWeek: league.currentWeek + 1, lastPlayedAt: Date.now() });
}

async function endSeason(leagueId: number, currentSeason: number, allTeams: any[]) {
  // 1. Resetear estadísticas de equipo
  for (const t of allTeams) {
    t.wins = 0;
    t.draws = 0;
    t.losses = 0;
    t.goalsFor = 0;
    t.goalsAgainst = 0;
    // Opcional: Reiniciar hype un poco hacia 50
    if (t.hype) {
       t.hype = Math.floor((t.hype + 50) / 2);
    }
  }
  await db.teams.bulkPut(allTeams);

  // 2. Resetear estadísticas estacionales de jugadores
  const allPlayers = await db.players.where('leagueId').equals(leagueId).toArray();
  for (const p of allPlayers) {
    if (p.stats) {
      p.stats.goals = 0;
      p.stats.assists = 0;
      p.stats.gamesPlayed = 0;
      p.stats.yellowCards = 0;
      p.stats.redCards = 0;
      p.stats.cleanSheets = 0;
    }
    // Opcional: Progresión de edad y potencial aquí
    p.age += 1;
    if (p.age < 28 && p.overall < p.potential) {
      p.overall += Math.floor(Math.random() * 3);
    } else if (p.age > 32) {
      p.overall -= Math.floor(Math.random() * 3);
      p.potential = p.overall;
    }
  }
  await db.players.bulkPut(allPlayers);

  // 3. Avanzar el año de la liga y volver a la Jornada 1
  await db.leagues.update(leagueId, { season: currentSeason + 1, currentWeek: 1, lastPlayedAt: Date.now() });
}
