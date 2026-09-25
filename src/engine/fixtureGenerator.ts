import { db, type Team, type Match } from '../db/db';

export function createDoubleRoundRobinFixtures(teams: Team[], leagueId: number): Omit<Match, 'id'>[] {
  if (teams.length < 2) return [];

  // Clone team list
  const teamList = [...teams];
  // If odd number of teams, add a dummy team (null)
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
        // Alternate home/away based on round for fairness
        if (round % 2 === 0) {
          roundFixtures.push({ homeId: teamA.id!, awayId: teamB.id! });
        } else {
          roundFixtures.push({ homeId: teamB.id!, awayId: teamA.id! });
        }
      }
    }
    roundList.push(roundFixtures);

    // Rotate indices clockwise, keeping position 0 fixed
    teamIndices.splice(1, 0, teamIndices.pop()!);
  }

  // First half of season (Leg 1: Rounds 1..N-1)
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

  // Second half of season (Leg 2: Rounds N..2(N-1) - reversed home/away)
  for (let r = 0; r < roundList.length; r++) {
    const weekNum = numRounds + r + 1;
    for (const match of roundList[r]) {
      fixtures.push({
        leagueId,
        homeTeamId: match.awayId, // swapped home/away
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

  // Group by domestic league
  const leaguesMap: Record<string, Team[]> = {};
  for (const t of teams) {
    if (!leaguesMap[t.domesticLeague]) leaguesMap[t.domesticLeague] = [];
    leaguesMap[t.domesticLeague].push(t);
  }

  const allFixtures: Omit<Match, 'id'>[] = [];

  for (const domLeague in leaguesMap) {
    const domTeams = leaguesMap[domLeague];
    const fixtures = createDoubleRoundRobinFixtures(domTeams, leagueId);
    allFixtures.push(...fixtures);
  }

  await db.matches.bulkAdd(allFixtures as any);
}
