import { db, getInitialPlayerStats } from './db';
import { tmService, mapTMPositionToDB, mapMarketValueToOVR } from '../services/transfermarkt';

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

export async function createNewLeague(
  name: string,
  difficulty: 'Normal' | 'Hard' | 'Insane',
  userTeamIndex: number = -1,
  startYear: number = 2026,
  startPeriod: 'preseason' | 'winter_window' | 'final_stretch' = 'preseason'
): Promise<number> {
  let initialWeek = 1;
  if (startPeriod === 'winter_window') initialWeek = 19;
  if (startPeriod === 'final_stretch') initialWeek = 30;

  const leagueId = await db.leagues.add({
    name,
    season: startYear,
    currentWeek: initialWeek,
    difficulty,
    createdAt: Date.now(),
    lastPlayedAt: Date.now(),
    userTeamId: null,
    startPeriod,
    managerReputation: 60
  });

  const teams = [];
  
  for (const tname of espTeams) {
    const pop = randomInt(1000000, 10000000);
    teams.push({ 
      leagueId, 
      domesticLeague: 'LaLiga',
      name: tname, 
      overall: 0,
      wins: startPeriod === 'preseason' ? 0 : randomInt(4, 14),
      draws: startPeriod === 'preseason' ? 0 : randomInt(2, 6),
      losses: startPeriod === 'preseason' ? 0 : randomInt(3, 10),
      goalsFor: startPeriod === 'preseason' ? 0 : randomInt(15, 40),
      goalsAgainst: startPeriod === 'preseason' ? 0 : randomInt(15, 40),
      budget: randomInt(20, 150) * 1000000,
      population: pop,
      attendance: randomInt(20000, 80000),
      ticketPrice: randomInt(30, 120),
      revenue: 0,
      profit: 0,
      kit: { primaryColor: '#ef4444', secondaryColor: '#ffffff', pattern: 'stripes' as const }
    });
  }

  for (const tname of engTeams) {
    const pop = randomInt(1000000, 15000000);
    teams.push({ 
      leagueId, 
      domesticLeague: 'Premier League',
      name: tname, 
      overall: 0,
      wins: startPeriod === 'preseason' ? 0 : randomInt(5, 15),
      draws: startPeriod === 'preseason' ? 0 : randomInt(2, 6),
      losses: startPeriod === 'preseason' ? 0 : randomInt(3, 10),
      goalsFor: startPeriod === 'preseason' ? 0 : randomInt(18, 45),
      goalsAgainst: startPeriod === 'preseason' ? 0 : randomInt(15, 40),
      budget: randomInt(50, 250) * 1000000,
      population: pop,
      attendance: randomInt(25000, 75000),
      ticketPrice: randomInt(50, 150),
      revenue: 0,
      profit: 0,
      kit: { primaryColor: '#3b82f6', secondaryColor: '#ffffff', pattern: 'solid' as const }
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
        stats: getInitialPlayerStats(),
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

  const targetIndex = userTeamIndex >= 0 && userTeamIndex < teamIds.length ? userTeamIndex : randomInt(0, teamIds.length - 1);
  await db.leagues.update(leagueId, { userTeamId: teamIds[targetIndex] });

  // Generate 38 matchdays double round-robin schedule
  const { generateLeagueFixtures } = await import('../engine/fixtureGenerator');
  await generateLeagueFixtures(leagueId);

  return leagueId;
}

export async function createRealLeagueFromTransfermarkt(
  leagueName: string,
  difficulty: 'Normal' | 'Hard' | 'Insane',
  competitionId: string,
  startYear: number = 2026,
  startPeriod: 'preseason' | 'winter_window' | 'final_stretch' = 'preseason',
  onProgress?: (msg: string) => void
): Promise<number> {
  let initialWeek = 1;
  if (startPeriod === 'winter_window') initialWeek = 19;
  if (startPeriod === 'final_stretch') initialWeek = 30;

  if (onProgress) onProgress(`Conectando a Transfermarkt API para la Temporada ${startYear}...`);

  const leagueId = await db.leagues.add({
    name: leagueName,
    season: startYear,
    currentWeek: initialWeek,
    difficulty,
    createdAt: Date.now(),
    lastPlayedAt: Date.now(),
    userTeamId: null,
    startPeriod,
    managerReputation: 60
  });

  try {
    const compData = await tmService.getCompetitionClubs(competitionId, String(startYear));
    const clubs = compData.clubs || [];
    
    if (clubs.length === 0) {
      throw new Error(`No se encontraron clubes en Transfermarkt para el año ${startYear}. Intenta con otra temporada.`);
    }

    if (onProgress) onProgress(`Cargando ${clubs.length} clubes de ${compData.name || 'Transfermarkt'} (${startYear})...`);

    const createdTeamIds: number[] = [];

    for (let i = 0; i < clubs.length; i++) {
      const club = clubs[i];
      if (onProgress) onProgress(`[${i + 1}/${clubs.length}] Cargando plantilla histórica de ${club.name} (${startYear})...`);

      const pop = randomInt(1000000, 15000000);
      const teamId = await db.teams.add({
        leagueId,
        domesticLeague: compData.name || 'Real League',
        name: club.name,
        overall: 75,
        wins: startPeriod === 'preseason' ? 0 : randomInt(4, 14),
        draws: startPeriod === 'preseason' ? 0 : randomInt(2, 6),
        losses: startPeriod === 'preseason' ? 0 : randomInt(3, 10),
        goalsFor: startPeriod === 'preseason' ? 0 : randomInt(15, 40),
        goalsAgainst: startPeriod === 'preseason' ? 0 : randomInt(15, 40),
        budget: randomInt(30, 200) * 1000000,
        population: pop,
        attendance: randomInt(25000, 75000),
        ticketPrice: randomInt(40, 120),
        revenue: 0,
        profit: 0,
        kit: { primaryColor: '#10b981', secondaryColor: '#ffffff', pattern: 'solid' as const }
      }) as number;

      createdTeamIds.push(teamId);

      let squadPlayers: any[] = [];
      try {
        const squadData = await tmService.getClubPlayers(club.id, String(startYear));
        squadPlayers = squadData.players || [];
      } catch (err) {
        console.warn(`Could not fetch squad for ${club.name} in season ${startYear}, fallback to random:`, err);
      }

      const dbPlayers: any[] = [];
      let totalOvr = 0;

      if (squadPlayers.length > 0) {
        for (const tmP of squadPlayers) {
          const ovr = mapMarketValueToOVR(tmP.marketValue);
          const pot = Math.min(99, ovr + randomInt(0, 10));
          totalOvr += ovr;

          dbPlayers.push({
            leagueId,
            teamId,
            name: tmP.name,
            age: tmP.age || randomInt(18, 32),
            overall: ovr,
            potential: pot,
            position: mapTMPositionToDB(tmP.position),
            contract: (tmP.marketValue ? Math.max(500000, Math.floor(tmP.marketValue * 0.08)) : randomInt(1000000, 5000000)),
            stats: getInitialPlayerStats(),
            attributes: {
              pace: randomInt(45, 95),
              shooting: randomInt(40, 95),
              passing: randomInt(45, 95),
              dribbling: randomInt(45, 95),
              defending: randomInt(35, 95),
              physical: randomInt(50, 95)
            },
            bio: {
              height: tmP.height || randomInt(170, 190),
              weight: randomInt(65, 88),
              country: (tmP.nationality && tmP.nationality.length > 0) ? tmP.nationality[0] : 'Desconocido'
            }
          });
        }
      } else {
        const positions = ['POR', 'DEF', 'DEF', 'DEF', 'DEF', 'MED', 'MED', 'MED', 'MED', 'DEL', 'DEL', 'POR', 'DEF', 'MED', 'DEL'];
        for (let j = 0; j < positions.length; j++) {
          const ovr = randomInt(65, 84);
          totalOvr += ovr;
          dbPlayers.push({
            leagueId,
            teamId,
            name: randomName(),
            age: randomInt(18, 32),
            overall: ovr,
            potential: Math.min(99, ovr + randomInt(0, 10)),
            position: positions[j],
            contract: randomInt(1000000, 5000000),
            stats: getInitialPlayerStats(),
            attributes: {
              pace: randomInt(50, 90),
              shooting: randomInt(40, 90),
              passing: randomInt(50, 90),
              dribbling: randomInt(50, 90),
              defending: randomInt(40, 90),
              physical: randomInt(50, 90)
            },
            bio: {
              height: randomInt(170, 190),
              weight: randomInt(65, 85),
              country: countries[Math.floor(Math.random() * countries.length)]
            }
          });
        }
      }

      await db.players.bulkAdd(dbPlayers);

      const avgOvr = Math.round(totalOvr / Math.max(1, dbPlayers.length));
      await db.teams.update(teamId, { overall: avgOvr });
    }

    const randomTeamId = createdTeamIds[Math.floor(Math.random() * createdTeamIds.length)];
    await db.leagues.update(leagueId, { userTeamId: randomTeamId });

    // Generate 38 matchdays double round-robin schedule
    const { generateLeagueFixtures } = await import('../engine/fixtureGenerator');
    await generateLeagueFixtures(leagueId);

    return leagueId;
  } catch (err: any) {
    console.error('Error in createRealLeagueFromTransfermarkt:', err);
    throw err;
  }
}
