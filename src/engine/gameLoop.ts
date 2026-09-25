import { db, getInitialPlayerStats, isTransferWindowOpen } from '../db/db';
import { simulateMatch } from './matchEngine';
import { generateLeagueFixtures } from './fixtureGenerator';
import { processAITransfers } from './aiTransfers';
import { autoSelectLineupForTeam, checkLineupReady } from '../utils/lineupUtils';

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

  // Enforce mandatory lineup: if user team lacks 11 starters, auto-select
  if (league.userTeamId) {
    const isReady = await checkLineupReady(league.userTeamId);
    if (!isReady) {
      await autoSelectLineupForTeam(league.userTeamId);
    }
  }

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

  // Update Player Fatigue, Morale & Injury Recovery (Task 1 & 13)
  const allPlayers = await db.players.where('leagueId').equals(leagueId).toArray();
  for (const p of allPlayers) {
    if (p.isInjured) {
      p.injuryWeeks = (p.injuryWeeks || 1) - 1;
      if (p.injuryWeeks <= 0) {
        p.isInjured = false;
        p.injuryWeeks = 0;
      }
    }

    if (p.lineupStatus === 'starter') {
      p.fatigue = Math.min(100, (p.fatigue || 0) + 12);
      p.morale = Math.min(100, (p.morale || 85) + 3);
      if (p.morale >= 50) p.unhappy = false;
      
      // Injury risk if fatigue high & injuryProne
      const baseRisk = (p.fatigue / 100) * 0.04 + ((p.injuryProne || 30) / 100) * 0.03;
      if (Math.random() < baseRisk && !p.isInjured) {
        p.isInjured = true;
        p.injuryWeeks = Math.floor(Math.random() * 4) + 1;
      }
    } else if (p.lineupStatus === 'bench') {
      p.fatigue = Math.max(0, (p.fatigue || 0) - 22);
      p.morale = Math.max(10, (p.morale || 85) - 2);
    } else {
      // Reserve / Youth
      p.fatigue = Math.max(0, (p.fatigue || 0) - 25);
      p.morale = Math.max(0, (p.morale || 85) - 4);
    }

    if ((p.morale || 85) < 35) {
      p.unhappy = true;
    }
  }
  await db.players.bulkPut(allPlayers);

  // AI Club Transfers ONLY during open transfer windows (Task 11: Weeks 1-4, 19-22)
  if (isTransferWindowOpen(league.currentWeek)) {
    await processAITransfers(league, allTeams);
  }

  await db.teams.bulkPut(allTeams);
  await db.leagues.update(leagueId, { currentWeek: league.currentWeek + 1, lastPlayedAt: Date.now() });
}

export async function startNextSeason(leagueId: number) {
  const league = await db.leagues.get(leagueId);
  if (!league) return;

  const allTeams = await db.teams.where('leagueId').equals(leagueId).toArray();

  // Record GM History for user team before resetting
  if (league.userTeamId) {
    const userTeam = allTeams.find(t => t.id === league.userTeamId);
    if (userTeam) {
      const domTeams = allTeams.filter(t => t.domesticLeague === userTeam.domesticLeague);
      domTeams.sort((a, b) => (b.wins * 3 + b.draws) - (a.wins * 3 + a.draws) || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));
      const pos = domTeams.findIndex(t => t.id === userTeam.id) + 1;
      const isChamp = pos === 1;

      await db.gmHistory.add({
        leagueId: league.id!,
        season: league.season,
        teamId: userTeam.id!,
        teamName: userTeam.name,
        wins: userTeam.wins,
        draws: userTeam.draws,
        losses: userTeam.losses,
        goalsFor: userTeam.goalsFor,
        goalsAgainst: userTeam.goalsAgainst,
        leaguePosition: pos > 0 ? pos : undefined,
        titleWon: isChamp ? userTeam.domesticLeague : undefined
      });
    }
  }

  // 1. Reset team W-D-L and goals stats & Update Prestige (Task 1)
  const domMap: Record<string, typeof allTeams> = {};
  allTeams.forEach(t => {
    if (!domMap[t.domesticLeague]) domMap[t.domesticLeague] = [];
    domMap[t.domesticLeague].push(t);
  });

  for (const leagueName in domMap) {
    const sorted = domMap[leagueName].sort((a, b) => (b.wins * 3 + b.draws) - (a.wins * 3 + a.draws) || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));
    sorted.forEach((t, rankIdx) => {
      let prestige = t.prestige || 70;
      if (rankIdx === 0) prestige = Math.min(100, prestige + 2); // Liga winner
      else if (rankIdx >= sorted.length - 3) prestige = Math.max(20, prestige - 20); // Relegated
      t.prestige = prestige;

      t.wins = 0;
      t.draws = 0;
      t.losses = 0;
      t.goalsFor = 0;
      t.goalsAgainst = 0;
      if (t.hype) t.hype = Math.floor((t.hype + 50) / 2);
    });
  }
  await db.teams.bulkPut(allTeams);

  // 2. Non-linear Dynamic Player Evolution / Devolution (Task 1)
  const allPlayers = await db.players.where('leagueId').equals(leagueId).toArray();
  for (const p of allPlayers) {
    if (p.stats) {
      if (!p.historicalStats) p.historicalStats = {};
      p.historicalStats[league.season] = { ...p.stats };
    }

    p.age += 1;
    const gamesPlayed = p.stats?.gamesPlayed || 0;

    // Dynamic Growth Engine
    if (p.age <= 23) {
      if (p.developmentType === 'early_bloomer' || p.developmentType === 'normal') {
        const growth = gamesPlayed > 15 ? Math.floor(Math.random() * 4) + 2 : Math.floor(Math.random() * 2) + 1;
        p.overall = Math.min(p.potential, p.overall + growth);
      } else if (p.developmentType === 'bust') {
        // Busts don't reach potential if not playing
        if (gamesPlayed < 10) p.potential = Math.max(p.overall, p.potential - 3);
        else p.overall = Math.min(p.potential, p.overall + 1);
      }
    } else if (p.age >= 24 && p.age <= 28) {
      // Late bloomers explode here (e.g. Raphinha)
      if (p.developmentType === 'late_bloomer' && gamesPlayed > 15) {
        const growth = Math.floor(Math.random() * 4) + 2;
        p.overall = Math.min(92, p.overall + growth);
        p.potential = Math.max(p.potential, p.overall);
      } else if (p.overall < p.potential && gamesPlayed > 12) {
        p.overall += 1;
      }
    } else if (p.age >= 31) {
      // Physical devolution for veterans
      const decline = Math.floor(Math.random() * 3) + 1;
      p.overall = Math.max(45, p.overall - decline);
      p.potential = p.overall;
      if (p.attributes) {
        p.attributes.pace = Math.max(40, p.attributes.pace - (decline + 2));
        p.attributes.physical = Math.max(45, p.attributes.physical - decline);
      }
    }

    // Reset seasonal stats & fatigue
    p.stats = getInitialPlayerStats();
    p.fatigue = 0;

    // Decrement contract years
    if (p.contractYears !== undefined && p.contractYears > 0) {
      p.contractYears -= 1;
      if (p.contractYears === 0) {
        p.teamId = null;
        p.lineupStatus = 'reserve';
        p.pitchPosition = undefined;
      }
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
