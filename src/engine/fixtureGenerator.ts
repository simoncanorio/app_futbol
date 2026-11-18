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

  // Leg 1 (Jornadas 1 a numRounds)
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

  // Leg 2 (Jornadas numRounds+1 a 2*numRounds)
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

function createSwissPhaseFixtures(
  teams: Team[],
  leagueId: number,
  matchWeeks: number[],
  type: 'continental' | 'europa'
): Omit<Match, 'id'>[] {
  if (teams.length < 4) return [];
  const pool = teams.length % 2 === 0 ? [...teams] : teams.slice(0, teams.length - 1);
  const n = pool.length;
  const half = n / 2;
  const indices = pool.map((_, i) => i);
  const fixtures: Omit<Match, 'id'>[] = [];

  for (let r = 0; r < matchWeeks.length; r++) {
    const weekNum = matchWeeks[r];
    for (let i = 0; i < half; i++) {
      const tA = pool[indices[i]];
      const tB = pool[indices[n - 1 - i]];
      if (tA && tB && tA.id !== tB.id) {
        const home = r % 2 === 0 ? tA : tB;
        const away = r % 2 === 0 ? tB : tA;
        fixtures.push({
          leagueId,
          homeTeamId: home.id!,
          awayTeamId: away.id!,
          homeScore: 0,
          awayScore: 0,
          week: weekNum,
          isPlayed: false,
          type,
          events: []
        });
      }
    }
    // Berger rotation so every matchweek pairs distinct opponents
    indices.splice(1, 0, indices.pop()!);
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

  // 1. League fixtures (Double round-robin)
  for (const domLeague in leaguesMap) {
    const domTeams = leaguesMap[domLeague];
    const fixtures = createDoubleRoundRobinFixtures(domTeams, leagueId);
    allFixtures.push(...fixtures);
  }

  // 2. Cup Fixtures (Power-of-2 bracket starting Week 8 -> 15 -> 22 -> 29 -> 36)
  for (const domLeague in leaguesMap) {
    const domTeams = [...leaguesMap[domLeague]].sort((a, b) => b.overall - a.overall);
    // Select largest power of 2 <= domTeams.length (e.g. 16 for 20-team or 18-team leagues)
    const bracketSize = domTeams.length >= 16 ? 16 : domTeams.length >= 8 ? 8 : domTeams.length - (domTeams.length % 2);
    const cupPool = domTeams.slice(0, bracketSize);

    // Shuffle for realistic cup draw
    for (let i = cupPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cupPool[i], cupPool[j]] = [cupPool[j], cupPool[i]];
    }

    for (let i = 0; i < cupPool.length - 1; i += 2) {
      if (cupPool[i] && cupPool[i + 1]) {
        allFixtures.push({
          leagueId,
          homeTeamId: cupPool[i].id!,
          awayTeamId: cupPool[i + 1].id!,
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

  // 3. UEFA Champions League & Europa League (Swiss League Phase: Weeks 4, 9, 14, 19, 24, 27)
  const sortedTeams = [...teams].sort((a, b) => (b.overall + (b.prestige || 70) * 0.2) - (a.overall + (a.prestige || 70) * 0.2));
  const clMatchWeeks = [4, 9, 14, 19, 24, 27];

  const clCount = sortedTeams.length >= 32 ? 16 : sortedTeams.length >= 16 ? 8 : Math.min(8, sortedTeams.length);
  const elCount = sortedTeams.length >= 32 ? 16 : Math.max(0, Math.min(8, sortedTeams.length - clCount));

  const topTeams = sortedTeams.slice(0, clCount);
  const europaTeams = sortedTeams.slice(clCount, clCount + elCount);

  allFixtures.push(...createSwissPhaseFixtures(topTeams, leagueId, clMatchWeeks, 'continental'));
  if (europaTeams.length >= 4) {
    allFixtures.push(...createSwissPhaseFixtures(europaTeams, leagueId, clMatchWeeks, 'europa'));
  }

  await db.matches.bulkAdd(allFixtures as any);
}
