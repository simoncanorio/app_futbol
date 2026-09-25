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

  // 2. Cup Fixtures (Initial Round: Week 8)
  for (const domLeague in leaguesMap) {
    const domTeams = [...leaguesMap[domLeague]];
    // Shuffle teams for realistic draw
    for (let i = domTeams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [domTeams[i], domTeams[j]] = [domTeams[j], domTeams[i]];
    }
    for (let i = 0; i < domTeams.length - 1; i += 2) {
      if (domTeams[i] && domTeams[i + 1]) {
        allFixtures.push({
          leagueId,
          homeTeamId: domTeams[i].id!,
          awayTeamId: domTeams[i + 1].id!,
          homeScore: 0,
          awayScore: 0,
          week: 8,
          isPlayed: false,
          type: 'cup',
          events: []
        });
      }
    }
  }

  // 3. UEFA Champions League Fixtures (League Phase: Weeks 4, 9, 14, 19, 24, 27)
  const topTeams = [...teams].sort((a, b) => b.overall - a.overall);
  const clMatchWeeks = [4, 9, 14, 19, 24, 27];
  clMatchWeeks.forEach((weekNum, idx) => {
    for (let i = 0; i < topTeams.length - 1; i += 2) {
      const homeT = topTeams[(i + idx) % topTeams.length];
      const awayT = topTeams[(i + idx + 1) % topTeams.length];
      if (homeT && awayT && homeT.id !== awayT.id) {
        allFixtures.push({
          leagueId,
          homeTeamId: homeT.id!,
          awayTeamId: awayT.id!,
          homeScore: 0,
          awayScore: 0,
          week: weekNum,
          isPlayed: false,
          type: 'continental',
          events: []
        });
      }
    }
  });

  await db.matches.bulkAdd(allFixtures as any);
}
