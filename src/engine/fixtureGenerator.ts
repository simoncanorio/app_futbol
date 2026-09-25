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

  // Leg 1
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

  // Leg 2
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

  // League fixtures
  for (const domLeague in leaguesMap) {
    const domTeams = leaguesMap[domLeague];
    const fixtures = createDoubleRoundRobinFixtures(domTeams, leagueId);
    allFixtures.push(...fixtures);
  }

  // Cup Fixtures (Copa Nacional - Weeks 10, 20, 30)
  const cupWeeks = [10, 20, 30];
  for (const domLeague in leaguesMap) {
    const domTeams = leaguesMap[domLeague];
    if (domTeams.length >= 4) {
      domTeams.sort((a, b) => b.overall - a.overall);
      cupWeeks.forEach((w, idx) => {
        const homeT = domTeams[idx % domTeams.length];
        const awayT = domTeams[(idx + 2) % domTeams.length];
        if (homeT && awayT && homeT.id !== awayT.id) {
          allFixtures.push({
            leagueId,
            homeTeamId: homeT.id!,
            awayTeamId: awayT.id!,
            homeScore: 0,
            awayScore: 0,
            week: w,
            isPlayed: false,
            type: 'cup',
            events: []
          });
        }
      });
    }
  }

  // Continental Champions League Fixtures (Weeks 6, 12, 18, 24, 28, 34)
  const champWeeks = [6, 12, 18, 24, 28, 34];
  const topTeams = [...teams].sort((a, b) => b.overall - a.overall).slice(0, 8);
  if (topTeams.length >= 4) {
    champWeeks.forEach((w, idx) => {
      const homeT = topTeams[idx % topTeams.length];
      const awayT = topTeams[(idx + 1) % topTeams.length];
      if (homeT && awayT && homeT.id !== awayT.id) {
        allFixtures.push({
          leagueId,
          homeTeamId: homeT.id!,
          awayTeamId: awayT.id!,
          homeScore: 0,
          awayScore: 0,
          week: w,
          isPlayed: false,
          type: 'continental',
          events: []
        });
      }
    });
  }

  await db.matches.bulkAdd(allFixtures as any);
}
