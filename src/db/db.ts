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
  stats: { 
    goals: number; 
    assists: number; 
    gamesPlayed?: number; 
    yellowCards?: number; 
    redCards?: number; 
    cleanSheets?: number;
  };
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
