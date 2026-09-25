import Dexie, { type Table } from 'dexie';

export interface League {
  id?: number;
  name: string;
  season: number;
  currentWeek: number;
  difficulty: 'Normal' | 'Hard' | 'Insane';
  createdAt: number;
  lastPlayedAt: number;
  userTeamId: number | null;
  startPeriod?: 'preseason' | 'winter_window' | 'final_stretch';
  managerReputation?: number;
}

export interface AdvancedPlayerStats {
  gamesPlayed: number;
  minutesPlayed: number;

  // Ataque
  goals: number;
  xG: number;
  shotsTotal: number;
  shotsOnTarget: number;
  bigChancesMissed: number;
  penaltiesScored: number;
  penaltiesAttempted: number;
  freeKickGoals: number;
  freeKickAttempts: number;
  goalsInsideBox: number;
  goalsOutsideBox: number;
  headerGoals: number;
  leftFootGoals: number;
  rightFootGoals: number;
  penaltiesWon: number;

  // Pases
  assists: number;
  xA: number;
  touches: number;
  bigChancesCreated: number;
  keyPasses: number;
  passesAttempted: number;
  passesCompleted: number;
  ownHalfPassesAttempted: number;
  ownHalfPassesCompleted: number;
  oppHalfPassesAttempted: number;
  oppHalfPassesCompleted: number;
  longBallsAttempted: number;
  longBallsCompleted: number;
  chippedPassesAttempted: number;
  chippedPassesCompleted: number;
  crossesAttempted: number;
  crossesCompleted: number;

  // Defensa
  cleanSheets: number;
  interceptions: number;
  tackles: number;
  possessionWonFinalThird: number;
  ballsRecovered: number;
  dribbledPast: number;
  clearances: number;
  shotsBlocked: number;
  errorsLeadingToShot: number;
  errorsLeadingToGoal: number;
  penaltiesConceded: number;

  // Otros
  dribblesAttempted: number;
  dribblesCompleted: number;
  duelsWon: number;
  duelsLost: number;
  groundDuelsWon: number;
  groundDuelsLost: number;
  aerialDuelsWon: number;
  aerialDuelsLost: number;
  possessionLost: number;
  foulsCommitted: number;
  foulsReceived: number;
  offsides: number;

  // Tarjetas
  yellowCards: number;
  secondYellowCards: number;
  redCards: number;
}

export function getInitialPlayerStats(): AdvancedPlayerStats {
  return {
    gamesPlayed: 0, minutesPlayed: 0,
    goals: 0, xG: 0, shotsTotal: 0, shotsOnTarget: 0, bigChancesMissed: 0,
    penaltiesScored: 0, penaltiesAttempted: 0, freeKickGoals: 0, freeKickAttempts: 0,
    goalsInsideBox: 0, goalsOutsideBox: 0, headerGoals: 0, leftFootGoals: 0, rightFootGoals: 0, penaltiesWon: 0,
    assists: 0, xA: 0, touches: 0, bigChancesCreated: 0, keyPasses: 0,
    passesAttempted: 0, passesCompleted: 0, ownHalfPassesAttempted: 0, ownHalfPassesCompleted: 0,
    oppHalfPassesAttempted: 0, oppHalfPassesCompleted: 0, longBallsAttempted: 0, longBallsCompleted: 0,
    chippedPassesAttempted: 0, chippedPassesCompleted: 0, crossesAttempted: 0, crossesCompleted: 0,
    cleanSheets: 0, interceptions: 0, tackles: 0, possessionWonFinalThird: 0, ballsRecovered: 0,
    dribbledPast: 0, clearances: 0, shotsBlocked: 0, errorsLeadingToShot: 0, errorsLeadingToGoal: 0, penaltiesConceded: 0,
    dribblesAttempted: 0, dribblesCompleted: 0, duelsWon: 0, duelsLost: 0, groundDuelsWon: 0, groundDuelsLost: 0,
    aerialDuelsWon: 0, aerialDuelsLost: 0, possessionLost: 0, foulsCommitted: 0, foulsReceived: 0, offsides: 0,
    yellowCards: 0, secondYellowCards: 0, redCards: 0
  };
}

export interface Player {
  id?: number;
  leagueId: number;
  teamId: number | null;
  name: string;
  age: number;
  overall: number;
  potential: number;
  position: 'POR' | 'DEF' | 'MED' | 'DEL';
  specificPosition?: 'POR' | 'DFC' | 'LI' | 'LD' | 'CAD' | 'CAI' | 'MCD' | 'MC' | 'MCO' | 'MI' | 'MD' | 'EI' | 'ED' | 'DC' | 'SD';
  contract: number;
  stats: AdvancedPlayerStats;
  historicalStats?: Record<number, AdvancedPlayerStats>; // season -> stats

  attributes?: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  bio?: {
    height: number;
    weight: number;
    country: string;
  };
  lineupStatus?: 'starter' | 'bench' | 'reserve' | 'youth';
  pitchPosition?: string;
  isHallOfFame?: boolean;
  isWatched?: boolean;
  isDraftProspect?: boolean;
  draftYear?: number;
  recruitedYear?: number;
  
  // Scouting & Loans & Contracts
  isScouted?: boolean;
  isOnLoan?: boolean;
  loanedFromTeamId?: number;
  buyOptionFee?: number;
  contractYears?: number;
  contractEndSeason?: number;
  isTransferListed?: boolean;
  isLoanListed?: boolean;
  askingTransferFee?: number;

  // New Features: Personality, Fatigue, Injury Proneness, Morale, Release Clause
  personality?: 'Avaricioso' | 'Ambicioso' | 'Leal' | 'Pragmático';
  fatigue?: number; // 0 to 100%
  injuryProne?: number; // 1 to 100
  isInjured?: boolean;
  injuryWeeks?: number;
  developmentType?: 'early_bloomer' | 'normal' | 'late_bloomer' | 'bust';
  morale?: number; // 0 to 100% (High = happy, Low = wants to leave!)
  unhappy?: boolean;
  transferRequest?: boolean;
  injuryType?: string;
  cards?: { yellow: number; red: number; suspended: boolean };
  releaseClause?: number; // Cláusula de rescisión obligatoria
}

export interface Team {
  id?: number;
  leagueId: number;
  name: string;
  domesticLeague: string; // 'LaLiga' o 'Premier League'
  overall: number; 
  prestige?: number; // 0 to 100 (Club Prestige Rating)
  tacticalStyle?: string; // e.g. Tiki-Taka, Gegenpressing, Contraataque
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  budget: number;
  population: number;
  attendance: number;
  ticketPrice: number;
  revenue: number;
  profit: number;
  scoutingExpense?: number;
  coachingExpense?: number;
  healthExpense?: number;
  facilitiesExpense?: number;
  hype?: number;
  boardConfidence?: number; // 0 to 100
  seasonObjective?: string;
  facilities?: {
    stadiumLevel: number; // 1 to 5
    youthLevel: number; // 1 to 5
    trainingLevel: number; // 1 to 5
  };
  mainSponsor?: {
    name: string;
    payoutPerSeason: number;
    bonusPerWin: number;
  };
  kit?: {
    primaryColor: string;
    secondaryColor: string;
    pattern: 'solid' | 'stripes' | 'hoop' | 'diagonal';
  };
  trainingFocus?: 'balance' | 'attacking' | 'defending' | 'physical' | 'technical' | 'recovery';
  teamChemistry?: number; // 0 to 100
}

export interface Match {
  id?: number;
  leagueId: number;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
  week: number;
  isPlayed: boolean;
  type: 'league' | 'cup' | 'continental' | 'europa';
  events?: {
    type: 'goal' | 'yellow_card' | 'red_card';
    playerId: number;
    teamId: number;
    assistId?: number;
    minute: number;
  }[];
}

export interface SeasonHistory {
  id?: number;
  leagueId: number;
  season: number;
  domesticLeague: string;
  championId: number;
  runnerUpId: number;
  mvpId: number;
  topScorerId: number;
  bestKeeperId: number;
  goldenBoyId: number;
}

export interface Transaction {
  id?: number;
  leagueId: number;
  type: 'transfer' | 'loan' | 'loan_buy' | 'release' | 'sign';
  playerId: number;
  fromTeamId?: number; // null if signed from free agency
  toTeamId?: number; // null if released
  amount: number;
  season: number;
  week: number;
  date: number;
  sellOnFeePercent?: number;
  buyOptionPrice?: number;
}

export interface Note {
  id?: number;
  leagueId: number;
  entityType: 'player' | 'team' | 'general';
  entityId?: number;
  text: string;
  createdAt: number;
}

export interface ScoutMission {
  id?: number;
  leagueId: number;
  region: 'Sudamérica' | 'Europa' | 'África' | 'Asia';
  scoutName: string;
  durationWeeks: number;
  startWeek: number;
  isCompleted: boolean;
  discoveredPlayerIds?: number[];
}

export interface GMHistoryEntry {
  id?: number;
  leagueId: number;
  season: number;
  teamId: number;
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  leaguePosition?: number;
  titleWon?: string;
}

export class FootballDB extends Dexie {
  leagues!: Table<League, number>;
  players!: Table<Player, number>;
  teams!: Table<Team, number>;
  matches!: Table<Match, number>;
  history!: Table<SeasonHistory, number>;
  transactions!: Table<Transaction, number>;
  notes!: Table<Note, number>;
  scoutMissions!: Table<ScoutMission, number>;
  gmHistory!: Table<GMHistoryEntry, number>;

  constructor() {
    super('FootballGM_DB_v2'); 
    this.version(2).stores({
      leagues: '++id, lastPlayedAt',
      players: '++id, leagueId, teamId, overall',
      teams: '++id, leagueId, domesticLeague, name, wins',
      matches: '++id, leagueId, week, type',
      history: '++id, leagueId, domesticLeague, season'
    });
    this.version(3).stores({
      transactions: '++id, leagueId, season, fromTeamId, toTeamId',
      notes: '++id, leagueId, entityType, entityId'
    });
    this.version(5).stores({
      scoutMissions: '++id, leagueId, region, isCompleted'
    });
    this.version(6).stores({
      gmHistory: '++id, leagueId, season, teamId'
    });
  }
}

export const db = new FootballDB();

export function getSpecificPosition(p: Partial<Player>): string {
  if (p.specificPosition) return p.specificPosition;
  if (p.pitchPosition) return p.pitchPosition;
  
  if (p.position === 'POR') return 'POR';
  if (p.position === 'DEF') {
    const pace = p.attributes?.pace || 70;
    return pace > 78 ? 'LI' : 'DFC';
  }
  if (p.position === 'MED') {
    const passing = p.attributes?.passing || 70;
    const shooting = p.attributes?.shooting || 70;
    if (shooting > 78) return 'MCO';
    if (passing > 82) return 'MC';
    return 'MCD';
  }
  if (p.position === 'DEL') {
    const pace = p.attributes?.pace || 75;
    return pace > 88 ? 'EI' : 'DC';
  }
  return p.position || 'MC';
}

export function formatMoney(val: number): string {
  if (!val || isNaN(val)) return '$0';
  const abs = Math.abs(val);
  const sign = val < 0 ? '-' : '';
  if (abs >= 1000000000) return `${sign}$${(abs / 1000000000).toFixed(2)}B`;
  if (abs >= 1000000) return `${sign}$${(abs / 1000000).toFixed(1)}M`;
  if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(0)}k`;
  return `${sign}$${abs}`;
}

export function isTransferWindowOpen(week: number): boolean {
  // Summer window: weeks 1-4, Winter window: weeks 19-22
  return (week >= 1 && week <= 4) || (week >= 19 && week <= 22);
}
