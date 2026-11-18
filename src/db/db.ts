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

  // Valoración & Portería Avanzada
  saves?: number;
  goalsConceded?: number;
  xGOT?: number;
  averageRating?: number;
  matchRatings?: number[];
  manOfTheMatch?: number;
}

export interface DetailedPlayerAttributes {
  acceleration: number;
  sprintSpeed: number;
  positioning: number;
  finishing: number;
  shotPower: number;
  longShots: number;
  volleys: number;
  penalties: number;
  vision: number;
  crossing: number;
  freeKickAccuracy: number;
  shortPassing: number;
  longPassing: number;
  curve: number;
  agility: number;
  balance: number;
  reactions: number;
  ballControl: number;
  composure: number;
  interceptions: number;
  headingAccuracy: number;
  defAwareness: number;
  standingTackle: number;
  slidingTackle: number;
  jumping: number;
  stamina: number;
  strength: number;
  aggression: number;
  gkDiving: number;
  gkHandling: number;
  gkKicking: number;
  gkPositioning: number;
  gkReflexes: number;
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
    yellowCards: 0, secondYellowCards: 0, redCards: 0,
    saves: 0, goalsConceded: 0, xGOT: 0, averageRating: 0, matchRatings: [], manOfTheMatch: 0
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
  secondaryPositions?: string[];
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
  detailedAttributes?: DetailedPlayerAttributes;
  playStyles?: string[];
  bio?: {
    height: number;
    weight: number;
    country: string;
    preferredFoot?: 'Left' | 'Right';
    weakFoot?: number;
    skillMoves?: number;
    workRate?: string;
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
  cards?: { yellow: number; red: number; suspended: boolean; seasonYellows?: number };
  releaseClause?: number; // Cláusula de rescisión obligatoria
  mentorId?: number; // Id of veteran player mentoring this prospect
  loanBuyObligation?: boolean; // If true, loan has mandatory purchase clause
  tacticalRole?: string; // e.g. 'Falso 9', 'Lateral Invertido', 'Organizador Adelantado', 'Extremo Interior', 'Todocampista'
  squadRole?: 'Estrella' | 'Titular' | 'Rotación' | 'Promesa';
  internationalCaps?: number;
  internationalGoals?: number;
}

export interface Team {
  id?: number;
  leagueId: number;
  name: string;
  domesticLeague: string; // 'LaLiga' o 'Premier League'
  divisionLevel?: 1 | 2; // 1 = Primera División, 2 = Segunda División (Pool de Ascenso)
  overall: number; 
  prestige?: number; // 0 to 100 (Club Prestige Rating)
  eloRating?: number; // Dynamic club Elo rating (base 1500 - 2100)
  formation?: string; // '4-3-3', '4-4-2', '4-2-3-1', '3-5-2'
  tacticalStyle?: string; // e.g. Tiki-Taka, Gegenpressing, Contraataque
  mentality?: 'Ultra-Defensiva' | 'Defensiva' | 'Equilibrada' | 'Ofensiva' | 'Ataque Total' | string;
  pressLine?: 'Bloque Bajo' | 'Media' | 'Alta' | string;
  passingTempo?: 'Corto' | 'Mixto' | 'Directo' | string;
  captainId?: number | null;
  penaltyTakerId?: number | null;
  freeKickTakerId?: number | null;
  cornerTakerId?: number | null;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  form?: ('W' | 'D' | 'L')[];
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
  sleeveSponsor?: {
    name: string;
    payoutPerSeason: number;
    bonusPerWin: number;
  };
  stadiumSponsor?: {
    name: string;
    payoutPerSeason: number;
    bonusPerWin: number;
  };
  digitalSponsor?: {
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
  bankLoan?: {
    principal: number;
    weeklyPayment: number;
    weeksRemaining: number;
  };
  lastActionWeeks?: {
    board?: number;
    fans?: number;
    pepTalk?: number;
  };
  coach?: {
    name: string;
    tacticalStyle: string;
    formation: string;
    reputation: number;
  };
  setPieceRoutine?: {
    cornerStyle: 'primer_palo' | 'segundo_palo' | 'en_corto' | 'bloqueo_portero';
    boxesPlayers: number; // 3 to 7 players attacking the box
    freeKickStyle: 'directo_potencia' | 'colocado_barrera' | 'jugada_ensayada';
  };
  partnerships?: Record<string, number>; // "minId_maxId" -> shared games played together
}

export interface MatchEvent {
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'injury' | 'missed_penalty' | 'woodwork';
  subType?: 'open_play' | 'penalty' | 'free_kick' | 'header' | 'long_shot' | 'counter' | 'second_yellow';
  playerId: number;
  playerName?: string;
  teamId: number;
  assistId?: number;
  assistName?: string;
  subOutId?: number;
  subOutName?: string;
  minute: number;
  xG?: number;
  description?: string;
}

export interface ShotTelemetry {
  x: number;
  y: number;
  xG: number;
  isGoal: boolean;
  isOnTarget: boolean;
  teamId: number;
  playerName: string;
  minute: number;
}

export interface MatchTeamStats {
  homePossession: number;
  awayPossession: number;
  homeXG: number;
  awayXG: number;
  homeShots: number;
  awayShots: number;
  homeShotsOnTarget: number;
  awayShotsOnTarget: number;
  homeBigChances: number;
  awayBigChances: number;
  homePassesAttempted: number;
  homePassesCompleted: number;
  awayPassesAttempted: number;
  awayPassesCompleted: number;
  homeCorners: number;
  awayCorners: number;
  homeFouls: number;
  awayFouls: number;
  homeOffsides: number;
  awayOffsides: number;
  homeSaves: number;
  awaySaves: number;
  mvpPlayerId?: number;
  mvpPlayerName?: string;
  playerRatings?: Record<number, number>;
  weather?: 'Soleado' | 'Lluvia' | 'Noche' | 'Viento';
  attendance?: number;
  shotsMap?: ShotTelemetry[];
  penaltyShootout?: {
    homePenalties: number;
    awayPenalties: number;
    kicks: { teamId: number; playerName: string; scored: boolean; round: number }[];
  };
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
  leg?: 1 | 2;
  aggregateWinnerId?: number;
  events?: MatchEvent[];
  stats?: MatchTeamStats;
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
  cupChampionId?: number;
  championsLeagueChampionId?: number;
  europaLeagueChampionId?: number;
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

export interface TransferOffer {
  id?: number;
  leagueId: number;
  playerId: number;
  playerName: string;
  playerPosition: string;
  playerOverall: number;
  fromAiTeamId: number;
  fromAiTeamName: string;
  toUserTeamId: number;
  offerType: 'transfer' | 'loan' | 'release_clause';
  amount: number;
  wageOffered: number;
  week: number;
  season: number;
  status: 'pending' | 'accepted' | 'rejected' | 'clause_paid';
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
  transferOffers!: Table<TransferOffer, number>;

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
    this.version(7).stores({
      transferOffers: '++id, leagueId, toUserTeamId, playerId, status'
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

export function getDetailedAttributes(p: Partial<Player>): DetailedPlayerAttributes {
  if (p.detailedAttributes) return p.detailedAttributes;
  const ovr = p.overall || 72;
  const pos = p.position || 'MED';
  const spec = getSpecificPosition(p);
  const pac = p.attributes?.pace ?? ovr;
  const sho = p.attributes?.shooting ?? (pos === 'DEL' ? ovr : pos === 'MED' ? ovr - 5 : ovr - 18);
  const pas = p.attributes?.passing ?? (pos === 'MED' ? ovr + 2 : ovr - 4);
  const dri = p.attributes?.dribbling ?? (pos === 'DEL' || pos === 'MED' ? ovr : ovr - 8);
  const def = p.attributes?.defending ?? (pos === 'DEF' ? ovr + 2 : pos === 'MED' ? ovr - 8 : ovr - 28);
  const phy = p.attributes?.physical ?? ovr - 2;

  const isWinger = ['EI', 'ED', 'MI', 'MD', 'CAD', 'CAI'].includes(spec);
  const isStriker = ['DC', 'SD'].includes(spec);
  const isPlaymaker = ['MCO', 'MC'].includes(spec);
  const isCenterBack = spec === 'DFC';
  const isGK = pos === 'POR';

  return {
    acceleration: Math.min(99, isWinger ? pac + 2 : pac),
    sprintSpeed: Math.min(99, pac),
    positioning: Math.min(99, isStriker ? sho + 3 : sho),
    finishing: Math.min(99, isStriker ? sho + 3 : sho - 1),
    shotPower: Math.min(99, Math.round((sho * 0.7) + (phy * 0.3))),
    longShots: Math.min(99, isPlaymaker ? sho + 2 : sho - 2),
    volleys: Math.min(99, sho - 2),
    penalties: Math.min(99, isStriker ? sho + 2 : sho - 3),
    vision: Math.min(99, isPlaymaker ? pas + 3 : pas),
    crossing: Math.min(99, isWinger || ['LI', 'LD'].includes(spec) ? pas + 3 : pas - 4),
    freeKickAccuracy: Math.min(99, isPlaymaker ? pas + 1 : pas - 5),
    shortPassing: Math.min(99, pas + 2),
    longPassing: Math.min(99, isPlaymaker || spec === 'MCD' ? pas + 1 : pas - 3),
    curve: Math.min(99, Math.round((pas + dri) / 2) - 2),
    agility: Math.min(99, isWinger ? dri + 3 : isCenterBack ? dri - 8 : dri),
    balance: Math.min(99, dri - 1),
    reactions: Math.min(99, ovr + 1),
    ballControl: Math.min(99, dri + 1),
    composure: Math.min(99, ovr),
    interceptions: Math.min(99, spec === 'MCD' ? def + 3 : def),
    headingAccuracy: Math.min(99, isCenterBack || isStriker ? Math.max(def, sho, phy) : Math.round((def + phy) / 2) - 5),
    defAwareness: Math.min(99, def + 1),
    standingTackle: Math.min(99, def + 1),
    slidingTackle: Math.min(99, def - 2),
    jumping: Math.min(99, phy),
    stamina: Math.min(99, phy + 2),
    strength: Math.min(99, isCenterBack ? phy + 4 : phy),
    aggression: Math.min(99, phy - 2),
    gkDiving: isGK ? Math.min(99, ovr + 1) : 14,
    gkHandling: isGK ? Math.min(99, ovr - 1) : 14,
    gkKicking: isGK ? Math.min(99, pas) : 14,
    gkPositioning: isGK ? Math.min(99, ovr) : 14,
    gkReflexes: isGK ? Math.min(99, ovr + 2) : 14
  };
}
