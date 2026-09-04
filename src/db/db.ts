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
}

export interface Team {
  id?: number;
  leagueId: number;
  name: string;
  domesticLeague: string; // 'LaLiga' o 'Premier League'
  overall: number; 
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
  type: 'league' | 'cup';
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
}

export interface Note {
  id?: number;
  leagueId: number;
  entityType: 'player' | 'team' | 'general';
  entityId?: number;
  text: string;
  createdAt: number;
}

export class FootballDB extends Dexie {
  leagues!: Table<League, number>;
  players!: Table<Player, number>;
  teams!: Table<Team, number>;
  matches!: Table<Match, number>;
  history!: Table<SeasonHistory, number>;
  transactions!: Table<Transaction, number>;
  notes!: Table<Note, number>;

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
    this.version(4).upgrade(tx => {
      // Add defaults to existing players/teams if needed, or just let them be undefined
    });
  }
}

export const db = new FootballDB();
