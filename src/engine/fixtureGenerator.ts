import { db, type Team, type Match } from '../db/db';

export function createDoubleRoundRobinFixtures(teams: Team[], leagueId: number): Omit<Match, 'id'>[] {
  if (teams.length < 2) return [];

  const teamList = [...teams];
  if (teamList.length % 2 !== 0) {
    teamList.push({ id: -1, name: 'BYE' } as any);
  }

  const n = teamList.length;
  const half = n / 2;
  const numRounds = n - 1;
  const fixtures: Omit<Match, 'id'>[] = [];
  const roundList: { homeId: number; awayId: number }[][] = [];

  const teamIndices = teamList.map((_, i) => i);

  for (let round = 0; round < numRounds; round++) {
    const roundFixtures: { homeId: number; awayId: number }[] = [];

    for (let i = 0; i < half; i++) {
      const teamA = teamList[teamIndices[i]];
      const teamB = teamList[teamIndices[n - 1 - i]];

      if (teamA.id !== -1 && teamB.id !== -1) {
        if (round % 2 === 0) {
          roundFixtures.push({ homeId: teamA.id!, awayId: teamB.id! });
        } else {
          roundFixtures.push({ homeId: teamB.id!, awayId: teamA.id! });
        }
      }
    }
    roundList.push(roundFixtures);
    teamIndices.splice(1, 0, teamIndices.pop()!);
  }

  // Leg 1 (Jornadas 1 a 19)
  for (let r = 0; r < roundList.length; r++) {
    const weekNum = r + 1;
    for (const match of roundList[r]) {
      fixtures.push({
        leagueId,
        homeTeamId: match.homeId,
        awayTeamId: match.awayId,
        homeScore: 0,
        awayScore: 0,
        week: weekNum,
        isPlayed: false,
        type: 'league',
        events: []
      });
    }
  }

  // Leg 2 (Jornadas 20 a 38)
  for (let r = 0; r < roundList.length; r++) {
    const weekNum = numRounds + r + 1;
    for (const match of roundList[r]) {
      fixtures.push({
        leagueId,
        homeTeamId: match.awayId,
        awayTeamId: match.homeId,
        homeScore: 0,
        awayScore: 0,
        week: weekNum,
        isPlayed: false,
        type: 'league',
        events: []
      });
    }
  }

  return fixtures;
}

export async function generateLeagueFixtures(leagueId: number) {
  const teams = await db.teams.where('leagueId').equals(leagueId).toArray();
  if (teams.length === 0) return;

  const leaguesMap: Record<string, Team[]> = {};
  for (const t of teams) {
    if (!leaguesMap[t.domesticLeague]) leaguesMap[t.domesticLeague] = [];
    leaguesMap[t.domesticLeague].push(t);
  }

  const allFixtures: Omit<Match, 'id'>[] = [];

  // 1. League fixtures (38 jornadas)
  for (const domLeague in leaguesMap) {
    const domTeams = leaguesMap[domLeague];
    const fixtures = createDoubleRoundRobinFixtures(domTeams, leagueId);
    allFixtures.push(...fixtures);
  }

  // 2. Cup Fixtures (Copa Nacional / Copa del Rey - Distributed Knockout Schedule)
  // 16avos (Semana 8), 8vos (Semana 15), 4tos (Semana 22), Semifinales (Semana 29), Final (Semana 36)
  const cupSchedule = [
    { week: 8, roundName: '16avos de Final' },
    { week: 15, roundName: 'Octavos de Final' },
    { week: 22, roundName: 'Cuartos de Final' },
    { week: 29, roundName: 'Semifinales' },
    { week: 36, roundName: 'Gran Final de Copa' }
  ];

  for (const domLeague in leaguesMap) {
    const domTeams = [...leaguesMap[domLeague]];
    if (domTeams.length >= 4) {
      domTeams.sort((a, b) => b.overall - a.overall);
      cupSchedule.forEach((stage, idx) => {
        const homeT = domTeams[idx % domTeams.length];
        const awayT = domTeams[(idx + 3) % domTeams.length];
        if (homeT && awayT && homeT.id !== awayT.id) {
          allFixtures.push({
            leagueId,
            homeTeamId: homeT.id!,
            awayTeamId: awayT.id!,
            homeScore: 0,
            awayScore: 0,
            week: stage.week,
            isPlayed: false,
            type: 'cup',
            events: []
          });
        }
      });
    }
  }

  // 3. UEFA Champions League Fixtures
  // Fase de Liga (Semanas 4, 9, 14, 19, 24, 27) + Knockout Playoffs (8vos W31, 4tos W33, Semis W35, Final W38)
  const championsLeagueSchedule = [
    { week: 4, roundName: 'Fase de Liga - Jornada 1' },
    { week: 9, roundName: 'Fase de Liga - Jornada 2' },
    { week: 14, roundName: 'Fase de Liga - Jornada 3' },
    { week: 19, roundName: 'Fase de Liga - Jornada 4' },
    { week: 24, roundName: 'Fase de Liga - Jornada 5' },
    { week: 27, roundName: 'Fase de Liga - Jornada 6' },
    { week: 31, roundName: 'Champions League - Octavos de Final' },
    { week: 33, roundName: 'Champions League - Cuartos de Final' },
    { week: 35, roundName: 'Champions League - Semifinales' },
    { week: 38, roundName: 'Gran Final de Champions League' }
  ];

  const topTeams = [...teams].sort((a, b) => b.overall - a.overall).slice(0, 10);
  if (topTeams.length >= 4) {
    championsLeagueSchedule.forEach((stage, idx) => {
      const homeT = topTeams[idx % topTeams.length];
      const awayT = topTeams[(idx + 2) % topTeams.length];
      if (homeT && awayT && homeT.id !== awayT.id) {
        allFixtures.push({
          leagueId,
          homeTeamId: homeT.id!,
          awayTeamId: awayT.id!,
          homeScore: 0,
          awayScore: 0,
          week: stage.week,
          isPlayed: false,
          type: 'continental',
          events: []
        });
      }
    });
  }

  await db.matches.bulkAdd(allFixtures as any);
}
