import { type Player, type Team } from '../db/db';

const RIVALRY_GROUPS: { name: string; keywords: [string[], string[]]; intensity: number }[] = [
  { name: 'El Clásico', keywords: [['real madrid'], ['barcelona', 'barca', 'blaugrana']], intensity: 2.5 },
  { name: 'Derbi Madrileño', keywords: [['real madrid'], ['atletico', 'atlético']], intensity: 1.85 },
  { name: 'Derbi Vasco', keywords: [['athletic'], ['real sociedad']], intensity: 1.9 },
  { name: 'El Gran Derbi', keywords: [['betis'], ['sevilla']], intensity: 2.0 },
  { name: 'Derbi Barcelonés', keywords: [['barcelona', 'barca'], ['espanyol']], intensity: 1.75 },
  { name: 'Superclásico Argentino', keywords: [['river plate'], ['boca juniors']], intensity: 2.6 },
  { name: 'Clásico de Avellaneda', keywords: [['racing club'], ['independiente']], intensity: 2.2 },
  { name: 'Clásico Rosarino', keywords: [['rosario central'], ['newell']], intensity: 2.3 },
  { name: 'North London Derby', keywords: [['arsenal'], ['tottenham', 'spurs']], intensity: 2.2 },
  { name: 'North West Derby', keywords: [['liverpool'], ['manchester united', 'man utd']], intensity: 2.3 },
  { name: 'Manchester Derby', keywords: [['manchester city', 'man city'], ['manchester united', 'man utd']], intensity: 2.1 },
  { name: 'Merseyside Derby', keywords: [['liverpool'], ['everton']], intensity: 2.0 },
  { name: 'Derby della Madonnina', keywords: [['inter'], ['ac milan', 'milano']], intensity: 2.1 },
  { name: "Derby d'Italia", keywords: [['inter'], ['juventus']], intensity: 2.0 },
  { name: 'Derby della Capitale', keywords: [['roma'], ['lazio']], intensity: 2.3 },
  { name: 'Der Klassiker', keywords: [['bayern'], ['dortmund']], intensity: 1.85 },
  { name: 'Le Classique', keywords: [['paris saint-germain', 'psg'], ['marseille']], intensity: 2.1 },
  { name: 'Clássico de Lisboa', keywords: [['benfica'], ['sporting']], intensity: 2.0 },
  { name: 'O Clássico', keywords: [['benfica'], ['porto']], intensity: 2.1 }
];

export function getRivalryMultiplier(clubA?: string, clubB?: string): {
  multiplier: number;
  isHistoricRivalry: boolean;
  rivalryName?: string;
} {
  if (!clubA || !clubB) return { multiplier: 1.0, isHistoricRivalry: false };
  const a = clubA.toLowerCase();
  const b = clubB.toLowerCase();
  if (a === b) return { multiplier: 1.0, isHistoricRivalry: false };

  for (const r of RIVALRY_GROUPS) {
    const [side1, side2] = r.keywords;
    const aIn1 = side1.some(k => a.includes(k));
    const bIn2 = side2.some(k => b.includes(k));
    const aIn2 = side2.some(k => a.includes(k));
    const bIn1 = side1.some(k => b.includes(k));

    if ((aIn1 && bIn2) || (aIn2 && bIn1)) {
      return {
        multiplier: r.intensity,
        isHistoricRivalry: true,
        rivalryName: r.name
      };
    }
  }

  return { multiplier: 1.0, isHistoricRivalry: false };
}

export function calculatePlayerMarketValue(p: Partial<Player>): number {
  const ovr = p.overall || 70;
  const pot = p.potential || ovr;
  const age = p.age || 25;
  const pos = p.position || 'MED';

  // Exponential base value from OVR
  // 65 -> ~0.8M, 70 -> ~2.5M, 75 -> ~8M, 80 -> ~24M, 85 -> ~62M, 90 -> ~145M, 92 -> ~185M
  let baseValue = Math.pow(1.245, ovr - 58) * 180_000;

  // Potential surplus premium for young players
  const potGap = Math.max(0, pot - ovr);
  if (age <= 21) {
    baseValue *= 1.25 + Math.min(0.85, potGap * 0.055);
  } else if (age <= 24) {
    baseValue *= 1.12 + Math.min(0.45, potGap * 0.035);
  } else if (age >= 30 && age <= 32) {
    baseValue *= 0.72;
  } else if (age === 33) {
    baseValue *= 0.52;
  } else if (age >= 34) {
    baseValue *= Math.max(0.2, 0.38 - (age - 34) * 0.08);
  }

  // Positional market premium
  if (pos === 'DEL') baseValue *= 1.16;
  else if (pos === 'MED') baseValue *= 1.06;
  else if (pos === 'POR') baseValue *= 0.84;

  // Current season performance / form modifier
  const gp = p.stats?.gamesPlayed || 0;
  if (gp >= 4) {
    const gPerGame = ((p.stats?.goals || 0) + (p.stats?.assists || 0) * 0.7) / gp;
    const avgRat = p.stats?.averageRating || 6.8;
    let formMod = 1.0;
    if (pos === 'DEL' || pos === 'MED') {
      formMod += Math.min(0.25, gPerGame * 0.22);
    }
    if (avgRat > 7.2) {
      formMod += Math.min(0.18, (avgRat - 7.2) * 0.15);
    } else if (avgRat > 0 && avgRat < 6.4) {
      formMod -= 0.1;
    }
    baseValue *= formMod;
  }

  // Round to clean increments
  const clamped = Math.max(150_000, Math.min(240_000_000, baseValue));
  if (clamped >= 10_000_000) return Math.round(clamped / 500_000) * 500_000;
  if (clamped >= 1_000_000) return Math.round(clamped / 100_000) * 100_000;
  return Math.round(clamped / 25_000) * 25_000;
}

export function calculateExpectedAnnualWage(p: Partial<Player>, teamPrestige = 75): number {
  const mv = calculatePlayerMarketValue(p);
  const ovr = p.overall || 70;
  const age = p.age || 25;

  // Older stars have lower market value due to age, but still command high wages based on OVR
  const ovrWageFloor =
    ovr >= 90 ? 15_000_000 :
    ovr >= 87 ? 10_500_000 :
    ovr >= 84 ? 6_800_000 :
    ovr >= 80 ? 3_600_000 :
    ovr >= 76 ? 1_800_000 :
    ovr >= 72 ? 950_000 :
    ovr >= 68 ? 500_000 : 250_000;

  let wage = Math.max(ovrWageFloor, mv * (age <= 21 ? 0.055 : 0.08));

  if (p.personality === 'Avaricioso') wage *= 1.22;
  else if (p.personality === 'Leal') wage *= 0.92;

  const prestigeMod = 0.85 + Math.max(0, (teamPrestige - 60) / 100) * 0.35;
  wage *= prestigeMod;

  return Math.max(150_000, Math.round(wage / 50_000) * 50_000);
}

export function calculateTransferAskingPrice(
  player: Player,
  sellerTeam?: Team,
  buyerTeam?: Team,
  difficulty: 'Normal' | 'Hard' | 'Insane' = 'Normal'
): {
  marketValue: number;
  askingPrice: number;
  rivalryMultiplier: number;
  rivalryName?: string;
} {
  const marketValue = calculatePlayerMarketValue(player);
  let price = marketValue;

  // Contract years impact
  const yearsLeft = player.contractYears ?? 2;
  if (yearsLeft <= 1) price *= 0.68; // Entering final year of contract
  else if (yearsLeft >= 4) price *= 1.18;

  // Starter & Squad importance
  if (player.lineupStatus === 'starter') price *= 1.18;

  // Transfer listed or unhappy discount
  if (player.isTransferListed) price *= 0.72;
  else if (player.unhappy || player.transferRequest) price *= 0.80;

  // League & Club financial power
  if (sellerTeam?.domesticLeague === 'Premier League') price *= 1.18;
  if (buyerTeam && buyerTeam.budget > 150_000_000) price *= 1.08; // "Rich buyer tax"

  // Difficulty factor
  const diffMod = difficulty === 'Insane' ? 1.28 : difficulty === 'Hard' ? 1.14 : 1.0;
  price *= diffMod;

  // Rivalry check
  const rivalry = getRivalryMultiplier(sellerTeam?.name, buyerTeam?.name);
  price *= rivalry.multiplier;

  // Cap at release clause if player has one
  const clause = player.releaseClause || Math.round(marketValue * 3.2);
  const finalAsking = Math.min(clause, Math.max(200_000, Math.round(price / 100_000) * 100_000));

  return {
    marketValue,
    askingPrice: finalAsking,
    rivalryMultiplier: rivalry.multiplier,
    rivalryName: rivalry.rivalryName
  };
}

export function processTeamWeeklyFinances(
  team: Team,
  squad: Player[],
  matchContext?: {
    isHome: boolean;
    won: boolean;
    drew: boolean;
    opponentOverall: number;
    opponentName?: string;
    competitionType: 'league' | 'cup' | 'continental' | 'europa';
  }
): { revenueDelta: number; expenseDelta: number; netDelta: number; attendance: number } {
  let weeklyRevenue = 0;
  let actualAttendance = 0;

  // 1. Weekly Broadcast & Merchandising trickle (every team earns this weekly across 38 weeks)
  const prestige = team.prestige || 70;
  const weeklyBroadcastAndMerch = Math.round(((40_000_000 + team.overall * 750_000 + prestige * 250_000) / 38));
  weeklyRevenue += weeklyBroadcastAndMerch;

  // 2. Matchday Gate Receipts & Competition Bonuses
  if (matchContext) {
    if (matchContext.isHome) {
      const hypeFactor = 0.75 + ((team.hype || 55) / 100) * 0.45;
      const rivalry = getRivalryMultiplier(team.name, matchContext.opponentName);
      const bigMatchBoost =
        rivalry.isHistoricRivalry ? 1.25 :
        matchContext.competitionType === 'continental' ? 1.22 :
        matchContext.opponentOverall >= 84 ? 1.15 : 1.0;

      // Ticket price elasticity: overpriced tickets reduce attendance if hype is low
      const fairTicketPrice = Math.max(35, (team.overall - 50) * 2.5);
      const priceElasticity = team.ticketPrice > fairTicketPrice * 1.4 ? 0.82 : 1.0;

      const maxStadiumCap = (team.attendance || 42000) + ((team.facilities?.stadiumLevel || 1) - 1) * 8000;
      actualAttendance = Math.min(
        maxStadiumCap,
        Math.round((team.attendance || 40000) * hypeFactor * bigMatchBoost * priceElasticity)
      );
      weeklyRevenue += actualAttendance * (team.ticketPrice || 55);
    }

    // UEFA / Cup Match Performance Bonuses
    if (matchContext.competitionType === 'continental') {
      if (matchContext.won) weeklyRevenue += 2_100_000;
      else if (matchContext.drew) weeklyRevenue += 700_000;
    } else if (matchContext.competitionType === 'europa') {
      if (matchContext.won) weeklyRevenue += 630_000;
      else if (matchContext.drew) weeklyRevenue += 210_000;
    } else if (matchContext.competitionType === 'cup' && matchContext.won) {
      weeklyRevenue += 450_000;
    }

    // Sponsor Win Bonuses (from all 4 commercial slots!)
    if (matchContext.won) {
      const sponsorWinBonus =
        (team.mainSponsor?.bonusPerWin || 0) +
        (team.sleeveSponsor?.bonusPerWin || 0) +
        (team.stadiumSponsor?.bonusPerWin || 0) +
        (team.digitalSponsor?.bonusPerWin || 0);
      weeklyRevenue += sponsorWinBonus;
    }
  }

  // 3. Weekly Expenses: Player Wages (1/38th of annual payroll) + Department Operating Costs + Bank Loan Installment
  const annualPayroll = squad.reduce((sum, p) => sum + (p.contract || 0), 0);
  const weeklyPayroll = Math.round(annualPayroll / 38);

  const deptWeeklyCost =
    ((team.scoutingExpense || 50) +
      (team.coachingExpense || 50) +
      (team.healthExpense || 50) +
      (team.facilitiesExpense || 50)) * 3200;

  let loanPayment = 0;
  if (team.bankLoan && team.bankLoan.weeksRemaining > 0) {
    loanPayment = team.bankLoan.weeklyPayment;
    team.bankLoan.weeksRemaining = Math.max(0, team.bankLoan.weeksRemaining - 1);
    if (team.bankLoan.weeksRemaining === 0) {
      team.bankLoan = undefined;
    }
  }

  const weeklyExpenses = weeklyPayroll + deptWeeklyCost + loanPayment;
  const netDelta = weeklyRevenue - weeklyExpenses;

  team.revenue = (team.revenue || 0) + weeklyRevenue;
  team.profit = (team.profit || 0) + netDelta;
  team.budget = Math.max(0, (team.budget || 0) + netDelta);

  return {
    revenueDelta: weeklyRevenue,
    expenseDelta: weeklyExpenses,
    netDelta,
    attendance: actualAttendance
  };
}

export function calculateSquadFFPAmortization(squad: Player[]): {
  annualWageBill: number;
  annualTransferAmortization: number;
  totalSquadCostFFP: number;
} {
  let annualWageBill = 0;
  let annualTransferAmortization = 0;

  for (const p of squad) {
    annualWageBill += p.contract || 0;
    // Estimate book value amortization over contract length for non-youth players
    if (p.lineupStatus !== 'youth') {
      const mv = calculatePlayerMarketValue(p);
      const years = Math.max(1, p.contractYears || 3);
      annualTransferAmortization += Math.round((mv * 0.35) / years);
    }
  }

  return {
    annualWageBill,
    annualTransferAmortization,
    totalSquadCostFFP: annualWageBill + annualTransferAmortization
  };
}
