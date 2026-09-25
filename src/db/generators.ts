import { db, getInitialPlayerStats } from './db';
import { tmService, mapTMPositionToDB, mapMarketValueToOVR } from '../services/transfermarkt';
import { EA_FC_DATABASE, type FIFAClubData } from '../services/fifaData';

const firstNames = ['Juan', 'Carlos', 'Luis', 'Pedro', 'Miguel', 'David', 'Jorge', 'Jose', 'Diego', 'Mateo', 'Lucas', 'Martin', 'Leo', 'Hugo', 'Daniel'];
const lastNames = ['Garcia', 'Martinez', 'Lopez', 'Sanchez', 'Perez', 'Gomez', 'Rodriguez', 'Fernandez', 'Ruiz', 'Diaz', 'Alvarez', 'Romero', 'Torres'];
const countries = ['España', 'Argentina', 'Brasil', 'Francia', 'Inglaterra', 'Alemania', 'Italia', 'Portugal', 'Uruguay', 'Colombia'];

export const espTeams = ['Real Madrid', 'FC Barcelona', 'Atlético de Madrid', 'Valencia CF', 'Sevilla FC', 'Athletic Club', 'Real Betis', 'Villarreal CF', 'Real Sociedad', 'Celta de Vigo'];
export const engTeams = ['Manchester City', 'Arsenal FC', 'Liverpool FC', 'Chelsea FC', 'Manchester United', 'Tottenham Hotspur', 'Newcastle United', 'Aston Villa', 'Everton FC', 'West Ham United'];
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

  const createdTeamIds: number[] = [];

  for (const tname of teamNames) {
    const isEsp = espTeams.includes(tname);
    const fifaMatch = EA_FC_DATABASE.find(c => c.name.toLowerCase() === tname.toLowerCase());

    const pop = randomInt(1000000, 12000000);
    const teamId = await db.teams.add({
      leagueId,
      domesticLeague: isEsp ? 'LaLiga' : 'Premier League',
      name: tname,
      overall: fifaMatch ? fifaMatch.overall : randomInt(76, 85),
      wins: startPeriod === 'preseason' ? 0 : randomInt(4, 14),
      draws: startPeriod === 'preseason' ? 0 : randomInt(2, 6),
      losses: startPeriod === 'preseason' ? 0 : randomInt(3, 10),
      goalsFor: startPeriod === 'preseason' ? 0 : randomInt(15, 40),
      goalsAgainst: startPeriod === 'preseason' ? 0 : randomInt(15, 40),
      budget: fifaMatch ? fifaMatch.budget : randomInt(40, 160) * 1000000,
      population: pop,
      attendance: randomInt(25000, 80000),
      ticketPrice: randomInt(40, 140),
      revenue: 0,
      profit: 0,
      kit: fifaMatch ? { primaryColor: fifaMatch.primaryColor, secondaryColor: fifaMatch.secondaryColor, pattern: fifaMatch.pattern } : { primaryColor: isEsp ? '#ef4444' : '#3b82f6', secondaryColor: '#ffffff', pattern: 'solid' }
    }) as number;

    createdTeamIds.push(teamId);

    const players = [];
    if (fifaMatch && fifaMatch.squad.length > 0) {
      // Use EA FC Database
      for (const fp of fifaMatch.squad) {
        players.push({
          leagueId,
          teamId,
          name: fp.name,
          age: fp.age,
          overall: fp.overall,
          potential: fp.potential,
          position: fp.position,
          specificPosition: fp.specificPosition || (fp.position === 'POR' ? 'POR' : fp.position === 'DEF' ? 'DFC' : fp.position === 'MED' ? 'MC' : 'DC'),
          contract: Math.max(500000, Math.floor(fp.marketValue * 0.07)),
          contractYears: randomInt(2, 5),
          contractEndSeason: startYear + randomInt(2, 5),
          stats: getInitialPlayerStats(),
          attributes: fp.attributes,
          bio: {
            height: randomInt(172, 192),
            weight: randomInt(68, 88),
            country: fp.country
          }
        });
      }
    } else {
      // Procedural generation fallback with realistic OVRs
      const positions: ('POR' | 'DEF' | 'MED' | 'DEL')[] = ['POR', 'DEF', 'DEF', 'DEF', 'DEF', 'MED', 'MED', 'MED', 'MED', 'DEL', 'DEL', 'POR', 'DEF', 'DEF', 'MED', 'MED', 'DEL', 'DEL', 'MED', 'DEF'];
      const specificPositions: ('POR' | 'DFC' | 'LI' | 'LD' | 'MCD' | 'MC' | 'MCO' | 'EI' | 'ED' | 'DC')[] = [
        'POR', 'LI', 'DFC', 'DFC', 'LD', 'MCD', 'MC', 'MCO', 'MI' as any, 'EI', 'DC',
        'POR', 'DFC', 'LD', 'MC', 'MCO', 'ED', 'DC', 'MC', 'LI'
      ];
      for (let i = 0; i < 20; i++) {
        const overall = randomInt(70, 88);
        const potential = Math.min(99, overall + randomInt(0, 10));
        players.push({
          leagueId,
          teamId,
          name: randomName(),
          age: randomInt(17, 34),
          overall,
          potential,
          position: positions[i],
          specificPosition: specificPositions[i],
          contract: randomInt(1000000, 6000000),
          contractYears: randomInt(2, 4),
          contractEndSeason: startYear + randomInt(2, 4),
          stats: getInitialPlayerStats(),
          attributes: {
            pace: randomInt(50, 95),
            shooting: randomInt(40, 92),
            passing: randomInt(50, 94),
            dribbling: randomInt(50, 94),
            defending: randomInt(35, 90),
            physical: randomInt(50, 90)
          },
          bio: {
            height: randomInt(168, 195),
            weight: randomInt(62, 90),
            country: countries[Math.floor(Math.random() * countries.length)]
          }
        });
      }
    }

    await db.players.bulkAdd(players);
  }

  const targetIndex = userTeamIndex >= 0 && userTeamIndex < createdTeamIds.length ? userTeamIndex : 0;
  await db.leagues.update(leagueId, { userTeamId: createdTeamIds[targetIndex] });

  // Generate 38 matchdays double round-robin schedule + Copa + Champions fixtures
  const { generateLeagueFixtures } = await import('../engine/fixtureGenerator');
  await generateLeagueFixtures(leagueId);

  return leagueId;
}

export async function createRealLeagueFromTransfermarkt(
  leagueName: string,
  competitionId: string = 'ES1',
  difficulty: 'Normal' | 'Hard' | 'Insane' = 'Normal',
  userTeamIndex: number = 0,
  startYear: number = 2026,
  startPeriod: 'preseason' | 'winter_window' | 'final_stretch' = 'preseason',
  onProgress?: (msg: string) => void
): Promise<number> {
  let initialWeek = 1;
  if (startPeriod === 'winter_window') initialWeek = 19;
  if (startPeriod === 'final_stretch') initialWeek = 30;

  if (onProgress) onProgress(`Conectando a EA FC / Transfermarkt Database (${startYear})...`);

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
      throw new Error(`No se encontraron clubes en la API. Usando base de datos EA FC.`);
    }

    if (onProgress) onProgress(`Cargando ${clubs.length} clubes reales...`);
    const createdTeamIds: number[] = [];

    for (let i = 0; i < clubs.length; i++) {
      const club = clubs[i];
      if (onProgress) onProgress(`[${i + 1}/${clubs.length}] Cargando plantilla de ${club.name}...`);

      const fifaMatch = EA_FC_DATABASE.find(c => c.name.toLowerCase().includes(club.name.toLowerCase()) || club.name.toLowerCase().includes(c.name.toLowerCase()));

      const pop = randomInt(1000000, 15000000);
      const teamId = await db.teams.add({
        leagueId,
        domesticLeague: compData.name || 'LaLiga',
        name: club.name,
        overall: fifaMatch ? fifaMatch.overall : 78,
        wins: startPeriod === 'preseason' ? 0 : randomInt(4, 14),
        draws: startPeriod === 'preseason' ? 0 : randomInt(2, 6),
        losses: startPeriod === 'preseason' ? 0 : randomInt(3, 10),
        goalsFor: startPeriod === 'preseason' ? 0 : randomInt(15, 40),
        goalsAgainst: startPeriod === 'preseason' ? 0 : randomInt(15, 40),
        budget: fifaMatch ? fifaMatch.budget : randomInt(30, 200) * 1000000,
        population: pop,
        attendance: randomInt(25000, 75000),
        ticketPrice: randomInt(40, 120),
        revenue: 0,
        profit: 0,
        kit: fifaMatch ? { primaryColor: fifaMatch.primaryColor, secondaryColor: fifaMatch.secondaryColor, pattern: fifaMatch.pattern } : { primaryColor: i % 2 === 0 ? '#ef4444' : '#3b82f6', secondaryColor: '#ffffff', pattern: 'solid' as const }
      }) as number;

      createdTeamIds.push(teamId);

      const dbPlayers: any[] = [];
      if (fifaMatch && fifaMatch.squad.length > 0) {
        for (const fp of fifaMatch.squad) {
          dbPlayers.push({
            leagueId,
            teamId,
            name: fp.name,
            age: fp.age,
            overall: fp.overall,
            potential: fp.potential,
            position: fp.position,
            specificPosition: fp.specificPosition || (fp.position === 'POR' ? 'POR' : fp.position === 'DEF' ? 'DFC' : fp.position === 'MED' ? 'MC' : 'DC'),
            contract: Math.max(500000, Math.floor(fp.marketValue * 0.07)),
            contractYears: randomInt(2, 5),
            contractEndSeason: startYear + randomInt(2, 5),
            stats: getInitialPlayerStats(),
            attributes: fp.attributes,
            bio: {
              height: randomInt(172, 192),
              weight: randomInt(68, 88),
              country: fp.country
            }
          });
        }
      } else {
        const positions: ('POR' | 'DEF' | 'MED' | 'DEL')[] = ['POR', 'DEF', 'DEF', 'DEF', 'DEF', 'MED', 'MED', 'MED', 'MED', 'DEL', 'DEL', 'POR', 'DEF', 'DEF', 'MED', 'MED', 'DEL', 'DEL', 'MED', 'DEF'];
        const specificPositions: ('POR' | 'DFC' | 'LI' | 'LD' | 'MCD' | 'MC' | 'MCO' | 'EI' | 'ED' | 'DC')[] = [
          'POR', 'LI', 'DFC', 'DFC', 'LD', 'MCD', 'MC', 'MCO', 'MI' as any, 'EI', 'DC',
          'POR', 'DFC', 'LD', 'MC', 'MCO', 'ED', 'DC', 'MC', 'LI'
        ];
        for (let j = 0; j < 20; j++) {
          const overall = randomInt(72, 85);
          const potential = Math.min(99, overall + randomInt(0, 10));
          dbPlayers.push({
            leagueId,
            teamId,
            name: randomName(),
            age: randomInt(17, 34),
            overall,
            potential,
            position: positions[j],
            specificPosition: specificPositions[j],
            contract: randomInt(1000000, 5000000),
            contractYears: randomInt(2, 4),
            contractEndSeason: startYear + randomInt(2, 4),
            stats: getInitialPlayerStats(),
            attributes: {
              pace: randomInt(55, 92),
              shooting: randomInt(45, 90),
              passing: randomInt(55, 92),
              dribbling: randomInt(55, 92),
              defending: randomInt(40, 88),
              physical: randomInt(55, 88)
            },
            bio: {
              height: randomInt(170, 194),
              weight: randomInt(65, 88),
              country: countries[Math.floor(Math.random() * countries.length)]
            }
          });
        }
      }

      await db.players.bulkAdd(dbPlayers);
    }

    const selectedTeamId = userTeamIndex >= 0 && userTeamIndex < createdTeamIds.length ? createdTeamIds[userTeamIndex] : createdTeamIds[0];
    await db.leagues.update(leagueId, { userTeamId: selectedTeamId });

    const { generateLeagueFixtures } = await import('../engine/fixtureGenerator');
    await generateLeagueFixtures(leagueId);

    return leagueId;
  } catch (err: any) {
    console.warn('Fallback to local FIFA Database creation:', err);
    return createNewLeague(leagueName, difficulty, userTeamIndex, startYear, startPeriod);
  }
}
