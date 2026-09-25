import { db, getInitialPlayerStats } from '../db/db';
import { simulateMatch } from './matchEngine';
import { generateLeagueFixtures } from './fixtureGenerator';
import { processAITransfers } from './aiTransfers';

export async function getLeagueMaxWeeks(leagueId: number) {
  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();
  const leaguesMap: Record<string, typeof allTeams> = {};
  for (const t of allTeams) {
    if (!leaguesMap[t.domesticLeague]) leaguesMap[t.domesticLeague] = [];
    leaguesMap[t.domesticLeague].push(t);
  }
  let maxWeeks = 0;
  for (const domLeague in leaguesMap) {
    const numTeams = leaguesMap[domLeague].length;
    const weeks = (numTeams - 1) * 2;
    if (weeks > maxWeeks) maxWeeks = weeks;
  }
  return maxWeeks || 38;
}

export async function advanceWeek(leagueId: number) {
  const league = await db.leagues.get(leagueId);
  if (!league) return;

  const maxWeeks = await getLeagueMaxWeeks(leagueId);

  // If season finished, trigger startNextSeason
  if (league.currentWeek > maxWeeks) {
    await startNextSeason(leagueId);
    return;
  }

  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();

  // Check if fixtures exist for this league
  let currentMatches = await db.matches
    .where('leagueId')
    .equals(leagueId)
    .filter(m => m.week === league.currentWeek && !m.isPlayed)
    .toArray();

  if (currentMatches.length === 0) {
    const totalMatchesCount = await db.matches.where('leagueId').equals(leagueId).count();
    if (totalMatchesCount === 0) {
      await generateLeagueFixtures(leagueId);
      currentMatches = await db.matches
        .where('leagueId')
        .equals(leagueId)
        .filter(m => m.week === league.currentWeek && !m.isPlayed)
        .toArray();
    }
  }

  const teamMap = new Map(allTeams.map(t => [t.id!, t]));

  // Simulate scheduled matches for this matchday
  for (const m of currentMatches) {
    const home = teamMap.get(m.homeTeamId);
    const away = teamMap.get(m.awayTeamId);
    if (!home || !away) continue;

    const simRes = await simulateMatch(leagueId, home, away, league.currentWeek, m.type || 'league');
    
    // Update match record
    m.homeScore = simRes.homeScore;
    m.awayScore = simRes.awayScore;
    m.isPlayed = true;
    m.events = simRes.events;
    await db.matches.put(m);

    // Update team stats
    if (m.homeScore > m.awayScore) {
      home.wins++; away.losses++;
      home.hype = Math.min(100, (home.hype || 50) + 2);
      away.hype = Math.max(0, (away.hype || 50) - 1);
    } else if (m.awayScore > m.homeScore) {
      away.wins++; home.losses++;
      away.hype = Math.min(100, (away.hype || 50) + 2);
      home.hype = Math.max(0, (home.hype || 50) - 1);
    } else {
      home.draws++; away.draws++;
    }

    home.goalsFor += m.homeScore; home.goalsAgainst += m.awayScore;
    away.goalsFor += m.awayScore; away.goalsAgainst += m.homeScore;

    // Financial revenue
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
  }

  // AI Club Transfers during transfer window (weeks 1-5, 18-22)
  if (league.currentWeek <= 5 || (league.currentWeek >= 18 && league.currentWeek <= 22)) {
    await processAITransfers(league, allTeams);
  }

  await db.teams.bulkPut(allTeams);
  await db.leagues.update(leagueId, { currentWeek: league.currentWeek + 1, lastPlayedAt: Date.now() });
}

export async function startNextSeason(leagueId: number) {
  const league = await db.leagues.get(leagueId);
  if (!league) return;

  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();

  // 1. Reset team W-D-L and goals stats
  for (const t of allTeams) {
    t.wins = 0;
    t.draws = 0;
    t.losses = 0;
    t.goalsFor = 0;
    t.goalsAgainst = 0;
    if (t.hype) t.hype = Math.floor((t.hype + 50) / 2);
  }
  await db.teams.bulkPut(allTeams);

  // 2. Reset player seasonal stats and advance age
  const allPlayers = await db.players.where('leagueId').equals(leagueId).toArray();
  for (const p of allPlayers) {
    if (p.stats) {
      if (!p.historicalStats) p.historicalStats = {};
      p.historicalStats[league.season] = { ...p.stats };
      p.stats = getInitialPlayerStats();
    }
    p.age += 1;
    if (p.age < 28 && p.overall < p.potential) {
      p.overall += Math.floor(Math.random() * 3);
    } else if (p.age > 32) {
      p.overall -= Math.floor(Math.random() * 3);
      p.potential = p.overall;
    }
  }
  await db.players.bulkPut(allPlayers);

  // 3. Clear old matches and generate fresh 38-matchday schedule for new season
  await db.matches.where('leagueId').equals(leagueId).delete();
  await generateLeagueFixtures(leagueId);

  // 4. Update league season (+1 year) and reset currentWeek to 1
  await db.leagues.update(leagueId, {
    season: league.season + 1,
    currentWeek: 1,
    lastPlayedAt: Date.now()
  });
}
