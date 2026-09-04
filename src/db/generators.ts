import { db } from './db';

const firstNames = ['Juan', 'Carlos', 'Luis', 'Pedro', 'Miguel', 'David', 'Jorge', 'Jose', 'Diego', 'Mateo', 'Lucas', 'Martin', 'Leo', 'Hugo', 'Daniel'];
const lastNames = ['Garcia', 'Martinez', 'Lopez', 'Sanchez', 'Perez', 'Gomez', 'Rodriguez', 'Fernandez', 'Ruiz', 'Diaz', 'Alvarez', 'Romero', 'Torres'];
const countries = ['España', 'Argentina', 'Brasil', 'Francia', 'Inglaterra', 'Alemania', 'Italia', 'Portugal', 'Uruguay', 'Colombia'];

export const espTeams = ['Madrid FC', 'Catalunya', 'Atletico', 'Valencia', 'Sevilla FC', 'Bilbao', 'Betis', 'Villarreal', 'Sociedad', 'Celta'];
export const engTeams = ['London United', 'London City', 'Manchester Red', 'Manchester Blue', 'Liverpool FC', 'North London', 'Newcastle', 'Aston', 'Everton', 'West Ham'];
export const teamNames = [...espTeams, ...engTeams];

function randomName() {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function createNewLeague(name: string, difficulty: 'Normal' | 'Hard' | 'Insane', userTeamIndex: number = -1): Promise<number> {
  const leagueId = await db.leagues.add({
    name,
    season: 2026,
    currentWeek: 1,
    difficulty,
    createdAt: Date.now(),
    lastPlayedAt: Date.now(),
    userTeamId: null 
  });

  const teams = [];
  
  // Crear equipos de LaLiga
  for (const tname of espTeams) {
    const pop = randomInt(1000000, 10000000);
    teams.push({ 
      leagueId, 
      domesticLeague: 'LaLiga',
      name: tname, 
      overall: 0,
      wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, 
      budget: randomInt(20, 150) * 1000000,
      population: pop,
      attendance: randomInt(20000, 80000),
      ticketPrice: randomInt(30, 120),
      revenue: 0,
      profit: 0
    });
  }

  // Crear equipos de Premier
  for (const tname of engTeams) {
    const pop = randomInt(1000000, 15000000);
    teams.push({ 
      leagueId, 
      domesticLeague: 'Premier League',
      name: tname, 
      overall: 0,
      wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, 
      budget: randomInt(50, 250) * 1000000,
      population: pop,
      attendance: randomInt(25000, 75000),
      ticketPrice: randomInt(50, 150),
      revenue: 0,
      profit: 0
    });
  }

  const teamIds = await db.teams.bulkAdd(teams, { allKeys: true }) as number[];

  const players = [];
  for (const teamId of teamIds) {
    const positions = ['POR', 'DEF', 'DEF', 'DEF', 'DEF', 'MED', 'MED', 'MED', 'MED', 'DEL', 'DEL', 'POR', 'DEF', 'DEF', 'MED', 'MED', 'DEL', 'DEL', 'MED', 'DEF'];
    let teamTotalOverall = 0;
    
    for (let i = 0; i < 20; i++) {
      const overall = randomInt(50, 90);
      const potential = Math.min(99, overall + randomInt(0, 15));
      teamTotalOverall += overall;
      players.push({
        leagueId,
        teamId,
        name: randomName(),
        age: randomInt(16, 35),
        overall,
        potential,
        position: positions[i] as any,
        contract: randomInt(500, 5000) * 1000,
        stats: { goals: 0, assists: 0, gamesPlayed: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
        attributes: {
          pace: randomInt(40, 99),
          shooting: randomInt(30, 99),
          passing: randomInt(40, 99),
          dribbling: randomInt(40, 99),
          defending: randomInt(20, 99),
          physical: randomInt(50, 99)
        },
        bio: {
          height: randomInt(165, 198),
          weight: randomInt(60, 95),
          country: countries[Math.floor(Math.random() * countries.length)]
        }
      });
    }
    
    await db.teams.update(teamId, { overall: Math.floor(teamTotalOverall / 20) });
  }
  await db.players.bulkAdd(players);

  // Set user team
  const targetIndex = userTeamIndex >= 0 && userTeamIndex < teamIds.length ? userTeamIndex : randomInt(0, teamIds.length - 1);
  await db.leagues.update(leagueId, { userTeamId: teamIds[targetIndex] });
  return leagueId;
}
