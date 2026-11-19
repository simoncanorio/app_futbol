import {
  db,
  type Team,
  type Match,
  type Player,
  type MatchEvent,
  type MatchTeamStats,
  getDetailedAttributes,
  getSpecificPosition
} from '../db/db';
import { calculateTeamChemistry, getPairKey } from '../utils/chemistryUtils';
import { FORMATIONS, getPositionalPenalty, assignSpecialistsForSquad } from '../utils/lineupUtils';
import { processTeamWeeklyFinances } from './valuationEngine';

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function hasPlayStyle(p: Player, keyword: string): boolean {
  if (!p.playStyles || p.playStyles.length === 0) return false;
  const kw = keyword.toLowerCase();
  return p.playStyles.some(ps => ps.toLowerCase().includes(kw));
}

function pickWeightedPlayer<T>(players: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) return players[Math.floor(Math.random() * players.length)];
  let r = Math.random() * total;
  for (let i = 0; i < players.length; i++) {
    r -= weights[i];
    if (r <= 0) return players[i];
  }
  return players[players.length - 1];
}

interface ActiveSlotPlayer {
  player: Player;
  slotId: string;
  slotType: 'POR' | 'DEF' | 'MED' | 'DEL';
  slotLabel: string;
  positionalPenalty: number;
  inMatchYellows: number;
  sentOff: boolean;
  subbedInMinute: number;
  subbedOutMinute: number | null;
  inMatchFatigue: number;
  matchStats: {
    goals: number;
    assists: number;
    xG: number;
    xA: number;
    shots: number;
    shotsOnTarget: number;
    keyPasses: number;
    passesAttempted: number;
    passesCompleted: number;
    dribblesCompleted: number;
    tackles: number;
    interceptions: number;
    clearances: number;
    blocks: number;
    saves: number;
    duelsWon: number;
    duelsLost: number;
    errors: number;
    fouls: number;
  };
}

interface TacticalProfile {
  possessionBias: number;
  shortPassBonus: number;
  longBallRate: number;
  crossRate: number;
  dribbleRate: number;
  pressIntensity: number;
  counterBonus: number;
  defensiveSolidness: number;
  highLineVulnerability: number;
  fatigueMultiplier: number;
}

function computeTacticalProfile(team: Team, oppTeam: Team, scoreDiff: number, minute: number): TacticalProfile {
  const style = team.tacticalStyle || 'Tiki-Taka (Posesión)';
  const oppStyle = oppTeam.tacticalStyle || 'Tiki-Taka (Posesión)';
  let mentality = team.mentality || 'Equilibrada';
  let pressLine = team.pressLine || 'Media';
  const tempo = team.passingTempo || 'Mixto';

  // Dynamic in-match AI adjustments in final 25 minutes
  if (minute >= 65 && scoreDiff < 0) {
    mentality = minute >= 78 ? 'Ataque Total' : 'Ofensiva';
    pressLine = 'Alta';
  } else if (minute >= 75 && scoreDiff === 1 && oppTeam.overall >= team.overall) {
    mentality = 'Defensiva';
    pressLine = 'Bloque Bajo';
  }

  const p: TacticalProfile = {
    possessionBias: 0,
    shortPassBonus: 0,
    longBallRate: 0.16,
    crossRate: 0.35,
    dribbleRate: 0.22,
    pressIntensity: 0,
    counterBonus: 0,
    defensiveSolidness: 0,
    highLineVulnerability: 0,
    fatigueMultiplier: 1.0
  };

  if (style.includes('Tiki-Taka')) {
    p.possessionBias += 14;
    p.shortPassBonus += 10;
    p.longBallRate = 0.08;
    if (oppStyle.includes('Autobús') || oppStyle.includes('Bloque Bajo')) p.shortPassBonus += 5;
    if (oppStyle.includes('Gegenpressing')) p.possessionBias -= 4;
  } else if (style.includes('Gegenpressing')) {
    p.possessionBias += 6;
    p.pressIntensity += 14;
    p.highLineVulnerability += 8;
    p.fatigueMultiplier = 1.25;
    if (oppStyle.includes('Tiki-Taka') || oppStyle.includes('Bandas')) p.pressIntensity += 5;
  } else if (style.includes('Contraataque')) {
    p.possessionBias -= 10;
    p.counterBonus += 14;
    p.defensiveSolidness += 6;
    p.longBallRate = 0.25;
    p.dribbleRate = 0.28;
    if (oppStyle.includes('Gegenpressing') || oppStyle.includes('Posición')) p.counterBonus += 6;
  } else if (style.includes('Autobús')) {
    p.possessionBias -= 18;
    p.defensiveSolidness += 15;
    p.longBallRate = 0.32;
    p.fatigueMultiplier = 0.85;
  } else if (style.includes('Bandas')) {
    p.possessionBias += 3;
    p.crossRate = 0.58;
    p.dribbleRate = 0.26;
    if (oppStyle.includes('Bloque Bajo')) p.shortPassBonus += 5;
  } else if (style.includes('Directo')) {
    p.possessionBias -= 10;
    p.longBallRate = 0.42;
    p.crossRate = 0.45;
    if (oppStyle.includes('Gegenpressing')) p.shortPassBonus += 5;
  } else if (style.includes('Posición')) {
    p.possessionBias += 11;
    p.shortPassBonus += 8;
    p.dribbleRate = 0.25;
  } else if (style.includes('Bloque Bajo')) {
    p.possessionBias -= 12;
    p.defensiveSolidness += 12;
    p.counterBonus += 6;
  }

  // Mentality adjustments
  if (mentality === 'Ultra-Defensiva') {
    p.defensiveSolidness += 10;
    p.possessionBias -= 8;
  } else if (mentality === 'Defensiva') {
    p.defensiveSolidness += 5;
    p.possessionBias -= 4;
  } else if (mentality === 'Ofensiva') {
    p.possessionBias += 4;
    p.highLineVulnerability += 4;
  } else if (mentality === 'Ataque Total') {
    p.possessionBias += 8;
    p.pressIntensity += 6;
    p.highLineVulnerability += 10;
    p.fatigueMultiplier *= 1.15;
  }

  // Press line
  if (pressLine.includes('Alta')) {
    p.pressIntensity += 7;
    p.highLineVulnerability += 5;
    p.fatigueMultiplier *= 1.1;
  } else if (pressLine.includes('Bajo')) {
    p.defensiveSolidness += 6;
    p.pressIntensity -= 6;
  }

  // Tempo
  if (tempo === 'Corto') {
    p.shortPassBonus += 4;
    p.longBallRate = Math.max(0.05, p.longBallRate - 0.06);
  } else if (tempo === 'Directo') {
    p.longBallRate = Math.min(0.5, p.longBallRate + 0.12);
    p.counterBonus += 4;
  }

  return p;
}

function buildMatchSheet(allPlayers: Player[], team: Team): {
  onPitch: ActiveSlotPlayer[];
  bench: Player[];
  specialists: ReturnType<typeof assignSpecialistsForSquad>;
} {
  const formationKey = team.formation || '4-3-3';
  const slots = FORMATIONS[formationKey] || FORMATIONS['4-3-3'];

  const seniorHealthy = allPlayers.filter(p => p.lineupStatus !== 'youth' && !p.isInjured && !p.cards?.suspended);
  const pool = seniorHealthy.length >= 11 ? seniorHealthy : allPlayers.filter(p => p.lineupStatus !== 'youth');
  const fallbackPool = pool.length >= 11 ? pool : allPlayers;

  const configuredStarters = fallbackPool.filter(p => p.lineupStatus === 'starter');
  const usedIds = new Set<number>();
  const onPitch: ActiveSlotPlayer[] = [];

  for (const slot of slots) {
    // 1. Try exact pitchPosition starter
    let chosen = configuredStarters.find(p => p.pitchPosition === slot.id && !usedIds.has(p.id!));
    // 2. Try any remaining starter matching slotType
    if (!chosen) {
      chosen = configuredStarters.find(p => p.position === slot.slotType && !usedIds.has(p.id!));
    }
    // 3. Pick best available from pool for this slot
    if (!chosen) {
      const candidates = fallbackPool.filter(p => !usedIds.has(p.id!));
      candidates.sort((a, b) => {
        const penA = getPositionalPenalty(a.position, slot.slotType, slot.label, getSpecificPosition(a), a.secondaryPositions);
        const penB = getPositionalPenalty(b.position, slot.slotType, slot.label, getSpecificPosition(b), b.secondaryPositions);
        return (b.overall - penB * 1.4) - (a.overall - penA * 1.4);
      });
      chosen = candidates[0];
    }

    if (chosen) {
      usedIds.add(chosen.id!);
      const spec = getSpecificPosition(chosen);
      const pen = getPositionalPenalty(chosen.position, slot.slotType, slot.label, spec, chosen.secondaryPositions);
      onPitch.push({
        player: chosen,
        slotId: slot.id,
        slotType: slot.slotType,
        slotLabel: slot.label,
        positionalPenalty: pen,
        inMatchYellows: 0,
        sentOff: false,
        subbedInMinute: 0,
        subbedOutMinute: null,
        inMatchFatigue: chosen.fatigue || 0,
        matchStats: {
          goals: 0, assists: 0, xG: 0, xA: 0, shots: 0, shotsOnTarget: 0,
          keyPasses: 0, passesAttempted: 0, passesCompleted: 0, dribblesCompleted: 0,
          tackles: 0, interceptions: 0, clearances: 0, blocks: 0, saves: 0,
          duelsWon: 0, duelsLost: 0, errors: 0, fouls: 0
        }
      });
    }
  }

  const bench = fallbackPool
    .filter(p => !usedIds.has(p.id!))
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 7);

  const specialists = assignSpecialistsForSquad(
    onPitch.map(o => o.player),
    team
  );

  return { onPitch, bench, specialists };
}

function getEffectiveSubAttr(ap: ActiveSlotPlayer, attrVal: number, chemBonus: number): number {
  let v = attrVal - ap.positionalPenalty * 0.85 + chemBonus;
  const fat = ap.inMatchFatigue;
  if (fat > 45) {
    v *= 1 - ((fat - 45) / 100) * 0.28;
  }
  if (ap.player.unhappy) v *= 0.90;
  else if ((ap.player.morale || 80) >= 88) v *= 1.04;
  else if ((ap.player.morale || 80) < 45) v *= 0.93;
  return clamp(v, 25, 99);
}

export async function simulateMatch(
  leagueId: number,
  homeTeam: Team,
  awayTeam: Team,
  week: number,
  type: 'league' | 'cup' | 'continental' | 'europa',
  persistPlayerStats = true
): Promise<Match & { updatedPlayers?: Player[] }> {
  const homeAll = await db.players.where('teamId').equals(homeTeam.id!).toArray();
  const awayAll = await db.players.where('teamId').equals(awayTeam.id!).toArray();

  const homeSheet = buildMatchSheet(homeAll, homeTeam);
  const awaySheet = buildMatchSheet(awayAll, awayTeam);

  const homeParticipants = new Map<number, ActiveSlotPlayer>();
  const awayParticipants = new Map<number, ActiveSlotPlayer>();
  homeSheet.onPitch.forEach(ap => homeParticipants.set(ap.player.id!, ap));
  awaySheet.onPitch.forEach(ap => awayParticipants.set(ap.player.id!, ap));

  const homeChem = calculateTeamChemistry(homeSheet.onPitch.map(x => x.player), homeTeam).score;
  const awayChem = calculateTeamChemistry(awaySheet.onPitch.map(x => x.player), awayTeam).score;

  // Weather generation
  const weatherRoll = Math.random();
  const weather: MatchTeamStats['weather'] =
    weatherRoll < 0.62 ? 'Soleado' :
    weatherRoll < 0.82 ? 'Noche' :
    weatherRoll < 0.94 ? 'Lluvia' : 'Viento';

  const rainPassPenalty = weather === 'Lluvia' ? -4 : 0;
  const windLongBallPenalty = weather === 'Viento' ? -5 : 0;

  let homeScore = 0;
  let awayScore = 0;
  const events: MatchEvent[] = [];

  const matchStats: MatchTeamStats = {
    homePossession: 50,
    awayPossession: 50,
    homeXG: 0,
    awayXG: 0,
    homeShots: 0,
    awayShots: 0,
    homeShotsOnTarget: 0,
    awayShotsOnTarget: 0,
    homeBigChances: 0,
    awayBigChances: 0,
    homePassesAttempted: 0,
    homePassesCompleted: 0,
    awayPassesAttempted: 0,
    awayPassesCompleted: 0,
    homeCorners: 0,
    awayCorners: 0,
    homeFouls: 0,
    awayFouls: 0,
    homeOffsides: 0,
    awayOffsides: 0,
    homeSaves: 0,
    awaySaves: 0,
    weather,
    attendance: Math.min(
      (homeTeam.attendance || 45000) + ((homeTeam.facilities?.stadiumLevel || 1) - 1) * 8000,
      Math.round((homeTeam.attendance || 42000) * (0.85 + ((homeTeam.hype || 60) / 100) * 0.3))
    ),
    shotsMap: []
  };

  let homePossessionTicks = 0;
  let awayPossessionTicks = 0;
  let homeSubsUsed = 0;
  let awaySubsUsed = 0;

  type Zone = 'build_up' | 'mid_center' | 'mid_flank' | 'final_third' | 'box';
  let possessionIsHome = Math.random() < 0.54; // slight kickoff/home edge
  let currentZone: Zone = 'mid_center';
  let isCounterAttack = false;

  const trySubstitution = (
    isHomeSide: boolean,
    minute: number,
    forcedTarget?: ActiveSlotPlayer,
    forcedBenchPlayer?: Player
  ) => {
    const subsUsed = isHomeSide ? homeSubsUsed : awaySubsUsed;
    if (subsUsed >= 5) return;
    const sheet = isHomeSide ? homeSheet : awaySheet;
    const participants = isHomeSide ? homeParticipants : awayParticipants;
    const teamId = isHomeSide ? homeTeam.id! : awayTeam.id!;

    const activeField = sheet.onPitch.filter(
      ap => !ap.sentOff && ap.subbedOutMinute === null && ap.slotType !== 'POR'
    );
    if (activeField.length === 0 || sheet.bench.length === 0) return;

    let subInPlayer: Player | undefined = forcedBenchPlayer;
    let target: ActiveSlotPlayer | undefined = forcedTarget;

    if (subInPlayer) {
      // Planned substitution: pick the best matching starter on pitch (who wasn't just subbed in)
      const eligibleTargets = activeField.filter(ap => ap.subbedInMinute === null);
      const targetPool = eligibleTargets.length > 0 ? eligibleTargets : activeField;
      const subSpec = getSpecificPosition(subInPlayer);
      target =
        target ||
        [...targetPool].sort((a, b) => {
          const penA = getPositionalPenalty(subInPlayer!.position, a.slotType, a.slotLabel, subSpec, subInPlayer!.secondaryPositions);
          const penB = getPositionalPenalty(subInPlayer!.position, b.slotType, b.slotLabel, subSpec, subInPlayer!.secondaryPositions);
          if (penA !== penB) return penA - penB;
          return (b.inMatchFatigue + b.inMatchYellows * 18) - (a.inMatchFatigue + a.inMatchYellows * 18);
        })[0];
    } else {
      target =
        target ||
        activeField
          .filter(ap => ap.inMatchFatigue > 62 || ap.inMatchYellows >= 1)
          .sort((a, b) => (b.inMatchFatigue + b.inMatchYellows * 18) - (a.inMatchFatigue + a.inMatchYellows * 18))[0];

      if (!target) return;

      // Only pick bench players set to Auto (0 or undefined), skipping those with -1 (Do not sub) or >0 (Scheduled minute)
      const autoEligibleBench = sheet.bench.filter(
        b => b.position !== 'POR' && (!b.plannedSubMinutes || b.plannedSubMinutes === 0)
      );
      if (autoEligibleBench.length === 0) return;

      subInPlayer =
        autoEligibleBench.find(b => b.position === target!.slotType) ||
        autoEligibleBench.sort((a, b) => {
          const penA = getPositionalPenalty(a.position, target!.slotType, target!.slotLabel, getSpecificPosition(a), a.secondaryPositions);
          const penB = getPositionalPenalty(b.position, target!.slotType, target!.slotLabel, getSpecificPosition(b), b.secondaryPositions);
          return penA - penB || b.overall - a.overall;
        })[0];
    }

    if (!target || !subInPlayer || subInPlayer.position === 'POR') return;
    const benchIdx = sheet.bench.findIndex(b => b.id === subInPlayer!.id);
    if (benchIdx < 0) return;

    sheet.bench.splice(benchIdx, 1);
    target.subbedOutMinute = minute;

    const spec = getSpecificPosition(subInPlayer);
    const pen = getPositionalPenalty(subInPlayer.position, target.slotType, target.slotLabel, spec, subInPlayer.secondaryPositions);
    const newActive: ActiveSlotPlayer = {
      player: subInPlayer,
      slotId: target.slotId,
      slotType: target.slotType,
      slotLabel: target.slotLabel,
      positionalPenalty: pen,
      inMatchYellows: 0,
      sentOff: false,
      subbedInMinute: minute,
      subbedOutMinute: null,
      inMatchFatigue: subInPlayer.fatigue || 0,
      matchStats: {
        goals: 0, assists: 0, xG: 0, xA: 0, shots: 0, shotsOnTarget: 0,
        keyPasses: 0, passesAttempted: 0, passesCompleted: 0, dribblesCompleted: 0,
        tackles: 0, interceptions: 0, clearances: 0, blocks: 0, saves: 0,
        duelsWon: 0, duelsLost: 0, errors: 0, fouls: 0
      }
    };

    const idxOnPitch = sheet.onPitch.indexOf(target);
    if (idxOnPitch >= 0) sheet.onPitch[idxOnPitch] = newActive;
    participants.set(subInPlayer.id!, newActive);

    if (isHomeSide) homeSubsUsed++;
    else awaySubsUsed++;

    const isPlanned = forcedBenchPlayer && forcedBenchPlayer.plannedSubMinutes && forcedBenchPlayer.plannedSubMinutes > 0;
    events.push({
      type: 'substitution',
      playerId: subInPlayer.id!,
      playerName: subInPlayer.name,
      subOutId: target.player.id!,
      subOutName: target.player.name,
      teamId,
      minute,
      description: isPlanned
        ? `🔄 Cambio Programado (${forcedBenchPlayer!.plannedSubMinutes} min): Entra ${subInPlayer.name} por ${target.player.name}`
        : `🔄 Cambio: Entra ${subInPlayer.name} por ${target.player.name}`
    });
  };

  const simulateMinuteStep = (minute: number) => {
    // 1. Check user/team scheduled substitutions (plannedSubMinutes > 0 -> enters at 90 - plannedSubMinutes)
    const homePlanned = homeSheet.bench.filter(
      b => b.plannedSubMinutes && b.plannedSubMinutes > 0 && Math.max(1, 90 - b.plannedSubMinutes) === minute
    );
    for (const bp of homePlanned) {
      trySubstitution(true, minute, undefined, bp);
    }

    const awayPlanned = awaySheet.bench.filter(
      b => b.plannedSubMinutes && b.plannedSubMinutes > 0 && Math.max(1, 90 - b.plannedSubMinutes) === minute
    );
    for (const bp of awayPlanned) {
      trySubstitution(false, minute, undefined, bp);
    }

    // 2. Check automatic AI tactical substitution windows
    if ([60, 68, 76, 83].includes(minute)) {
      if (Math.random() < 0.75) trySubstitution(true, minute);
      if (Math.random() < 0.75) trySubstitution(false, minute);
    }

    const homeTac = computeTacticalProfile(homeTeam, awayTeam, homeScore - awayScore, minute);
    const awayTac = computeTacticalProfile(awayTeam, homeTeam, awayScore - homeScore, minute);

    // Count active non-sent-off players
    const homeActive = homeSheet.onPitch.filter(ap => !ap.sentOff && ap.subbedOutMinute === null);
    const awayActive = awaySheet.onPitch.filter(ap => !ap.sentOff && ap.subbedOutMinute === null);

    // Fatigue tick per minute
    for (const ap of homeActive) {
      const stamina = getDetailedAttributes(ap.player).stamina;
      const relentlessFactor = hasPlayStyle(ap.player, 'relentless') ? 0.62 : 1.0;
      const drain = (0.13 * (110 - stamina * 0.55) / 60) * homeTac.fatigueMultiplier * relentlessFactor;
      ap.inMatchFatigue = Math.min(100, ap.inMatchFatigue + drain);
    }
    for (const ap of awayActive) {
      const stamina = getDetailedAttributes(ap.player).stamina;
      const relentlessFactor = hasPlayStyle(ap.player, 'relentless') ? 0.62 : 1.0;
      const drain = (0.13 * (110 - stamina * 0.55) / 60) * awayTac.fatigueMultiplier * relentlessFactor;
      ap.inMatchFatigue = Math.min(100, ap.inMatchFatigue + drain);
    }

    // 4 micro-phases per minute (~360 possessions/actions per match -> realistic ~450-550 passes per team, 10-16 shots)
    for (let phase = 0; phase < 4; phase++) {
      const isHomeAtk = possessionIsHome;
      const atkTeam = isHomeAtk ? homeTeam : awayTeam;
      const defTeam = isHomeAtk ? awayTeam : homeTeam;
      const atkSheet = isHomeAtk ? homeSheet : awaySheet;
      const defSheet = isHomeAtk ? awaySheet : homeSheet;
      const atkActive = isHomeAtk ? homeActive : awayActive;
      const defActive = isHomeAtk ? awayActive : homeActive;
      const atkTac = isHomeAtk ? homeTac : awayTac;
      const defTac = isHomeAtk ? awayTac : homeTac;

      if (atkActive.length === 0 || defActive.length === 0) continue;

      if (isHomeAtk) homePossessionTicks++;
      else awayPossessionTicks++;

      const manDiff = atkActive.length - defActive.length;
      const homeAdvBonus = isHomeAtk ? 2.2 : -0.8;
      const chemScore = isHomeAtk ? homeChem : awayChem;
      const defChemScore = isHomeAtk ? awayChem : homeChem;
      const atkChemBonus = (chemScore - 60) * 0.12 + manDiff * 4.5 + homeAdvBonus;
      const defChemBonus = (defChemScore - 60) * 0.12 - manDiff * 4.5;

      // Role-weighted ball carrier selection based on currentZone and individual tacticalRole
      const outfieldAtk = atkActive.filter(ap => ap.slotType !== 'POR');
      const carrierPool = outfieldAtk.length > 0 ? outfieldAtk : atkActive;
      const hasFalse9 = carrierPool.some(ap => ap.player.tacticalRole?.includes('Falso 9'));
      const carrierWeights = carrierPool.map(ap => {
        const spec = getSpecificPosition(ap.player);
        const role = ap.player.tacticalRole || '';
        if (currentZone === 'build_up') {
          let w = ap.slotType === 'DEF' ? 5 : spec === 'MCD' ? 4.5 : ap.slotType === 'MED' ? 2.5 : 0.4;
          if (role.includes('Salida') || role.includes('Organizador')) w += 2;
          return w;
        }
        if (currentZone === 'mid_center') {
          let w = ap.slotType === 'MED' ? 5.5 : ['LI', 'LD', 'CAD', 'CAI'].includes(spec) ? 2.5 : ap.slotType === 'DEF' ? 1.5 : 1.8;
          if (role.includes('Invertido') || role.includes('Organizador') || role.includes('Todocampista')) w += 2.5;
          return w;
        }
        if (currentZone === 'mid_flank') {
          let w = ['EI', 'ED', 'MI', 'MD', 'LI', 'LD', 'CAD', 'CAI'].includes(spec) ? 5.5 : ap.slotType === 'MED' ? 3 : 1.2;
          if (role.includes('Carrilero') || role.includes('Banda')) w += 2;
          return w;
        }
        if (currentZone === 'final_third') {
          let w = ['MCO', 'EI', 'ED', 'SD'].includes(spec) ? 5.5 : ap.slotType === 'MED' ? 4 : ap.slotType === 'DEL' ? 4.2 : 1.2;
          if (role.includes('Falso 9') || role.includes('Enganche')) w += 3.2;
          return w;
        }
        // box
        let w = ap.slotType === 'DEL' ? 6.5 : ['MCO', 'EI', 'ED'].includes(spec) ? 4.5 : ap.slotType === 'MED' ? 2.2 : 0.6;
        if (role.includes('Interior') && hasFalse9) w += 2.8;
        if (role.includes('Todocampista')) w += 1.5;
        return w;
      });

      const atkEntry = pickWeightedPlayer(carrierPool, carrierWeights);
      const atkPlayer = atkEntry.player;
      const atkDet = getDetailedAttributes(atkPlayer);

      // Defender selection based on zone
      const outfieldDef = defActive.filter(ap => ap.slotType !== 'POR');
      const defPool = outfieldDef.length > 0 ? outfieldDef : defActive;
      const defWeights = defPool.map(ap => {
        const spec = getSpecificPosition(ap.player);
        if (currentZone === 'build_up') return ap.slotType === 'DEL' ? 4.5 : ap.slotType === 'MED' ? 3 : 0.8;
        if (currentZone === 'mid_center' || currentZone === 'mid_flank') {
          return spec === 'MCD' ? 5.5 : ap.slotType === 'MED' ? 4.5 : ap.slotType === 'DEF' ? 3 : 1.2;
        }
        return spec === 'DFC' ? 6 : ap.slotType === 'DEF' ? 5 : spec === 'MCD' ? 4 : 1;
      });
      const defEntry = pickWeightedPlayer(defPool, defWeights);
      const defPlayer = defEntry.player;
      const defDet = getDetailedAttributes(defPlayer);

      atkPlayer.stats.touches++;

      // Helper to record pass attempt & completion
      const recordPass = (completed: boolean, isOwnHalf: boolean, isLongBall = false, isChipped = false) => {
        atkPlayer.stats.passesAttempted++;
        atkEntry.matchStats.passesAttempted++;
        if (isHomeAtk) matchStats.homePassesAttempted++;
        else matchStats.awayPassesAttempted++;

        if (isOwnHalf) atkPlayer.stats.ownHalfPassesAttempted++;
        else atkPlayer.stats.oppHalfPassesAttempted++;

        if (isLongBall) atkPlayer.stats.longBallsAttempted++;
        if (isChipped) atkPlayer.stats.chippedPassesAttempted++;

        if (completed) {
          atkPlayer.stats.passesCompleted++;
          atkEntry.matchStats.passesCompleted++;
          if (isHomeAtk) matchStats.homePassesCompleted++;
          else matchStats.awayPassesCompleted++;

          if (isOwnHalf) atkPlayer.stats.ownHalfPassesCompleted++;
          else atkPlayer.stats.oppHalfPassesCompleted++;
          if (isLongBall) atkPlayer.stats.longBallsCompleted++;
          if (isChipped) atkPlayer.stats.chippedPassesCompleted++;
        }
      };

      // Helper to resolve a shot on goal
      const resolveShot = (
        shooterEntry: ActiveSlotPlayer,
        assisterEntry: ActiveSlotPlayer | null,
        shotType: 'open_box' | 'long_shot' | 'header' | 'free_kick' | 'penalty',
        baseXG: number
      ) => {
        const shooter = shooterEntry.player;
        const sDet = getDetailedAttributes(shooter);
        const gkEntry = defActive.find(ap => ap.slotType === 'POR') || defActive[0];
        const gk = gkEntry.player;
        const gkDet = getDetailedAttributes(gk);

        const clampedXG = clamp(baseXG, 0.02, 0.88);
        shooter.stats.shotsTotal++;
        shooter.stats.xG += clampedXG;
        shooterEntry.matchStats.shots++;
        shooterEntry.matchStats.xG += clampedXG;

        // Compute spatial shot coordinates (x: 0-100, y: 0-100)
        const distFromGoal = shotType === 'penalty' ? 11 : shotType === 'long_shot' || shotType === 'free_kick' ? 22 + Math.random() * 10 : 6 + Math.random() * 12;
        const shotX = isHomeAtk ? Math.round(98 - distFromGoal) : Math.round(2 + distFromGoal);
        const shotY = shotType === 'penalty' ? 50 : Math.round(26 + Math.random() * 48);

        if (isHomeAtk) {
          matchStats.homeShots++;
          matchStats.homeXG = parseFloat((matchStats.homeXG + clampedXG).toFixed(2));
          if (clampedXG >= 0.28) matchStats.homeBigChances++;
        } else {
          matchStats.awayShots++;
          matchStats.awayXG = parseFloat((matchStats.awayXG + clampedXG).toFixed(2));
          if (clampedXG >= 0.28) matchStats.awayBigChances++;
        }

        if (shotType === 'penalty') {
          shooter.stats.penaltiesAttempted++;
        } else if (shotType === 'free_kick') {
          shooter.stats.freeKickAttempts++;
        }

        // Check if blocked by defender (for non-penalty shots)
        if (shotType !== 'penalty' && Math.random() < (shotType === 'long_shot' ? 0.24 : 0.14)) {
          defPlayer.stats.shotsBlocked++;
          defEntry.matchStats.blocks++;
          matchStats.shotsMap?.push({
            x: shotX, y: shotY, xG: parseFloat(clampedXG.toFixed(2)),
            isGoal: false, isOnTarget: false, teamId: atkTeam.id!, playerName: shooter.name, minute
          });
          // 45% of blocked shots go out for a corner!
          if (Math.random() < 0.45) {
            if (isHomeAtk) matchStats.homeCorners++;
            else matchStats.awayCorners++;
          }
          possessionIsHome = !isHomeAtk;
          currentZone = 'build_up';
          isCounterAttack = false;
          return;
        }

        // Compute effective shooting skill vs GK save skill
        let shootSkill = 70;
        if (shotType === 'penalty') {
          shootSkill = getEffectiveSubAttr(shooterEntry, sDet.penalties * 0.65 + sDet.composure * 0.35, atkChemBonus);
        } else if (shotType === 'free_kick') {
          shootSkill = getEffectiveSubAttr(shooterEntry, sDet.freeKickAccuracy * 0.6 + sDet.curve * 0.25 + sDet.shotPower * 0.15, atkChemBonus);
        } else if (shotType === 'header') {
          shootSkill = getEffectiveSubAttr(shooterEntry, sDet.headingAccuracy * 0.6 + sDet.jumping * 0.25 + sDet.positioning * 0.15, atkChemBonus);
          if (hasPlayStyle(shooter, 'header') || hasPlayStyle(shooter, 'aerial')) shootSkill += 6;
        } else if (shotType === 'long_shot') {
          shootSkill = getEffectiveSubAttr(shooterEntry, sDet.longShots * 0.55 + sDet.shotPower * 0.3 + sDet.composure * 0.15, atkChemBonus);
          if (hasPlayStyle(shooter, 'finesse') || hasPlayStyle(shooter, 'power shot')) shootSkill += 5;
        } else {
          shootSkill = getEffectiveSubAttr(shooterEntry, sDet.finishing * 0.55 + sDet.composure * 0.25 + sDet.positioning * 0.2, atkChemBonus);
          if (hasPlayStyle(shooter, 'finesse') || hasPlayStyle(shooter, 'low driven')) shootSkill += 5;
        }

        const gkSkill = getEffectiveSubAttr(
          gkEntry,
          gkDet.gkReflexes * 0.4 + gkDet.gkDiving * 0.35 + gkDet.gkPositioning * 0.25,
          defChemBonus
        );

        // On-target check
        const onTargetProb = clamp(
          (shotType === 'penalty' ? 0.88 : 0.36 + clampedXG * 0.55) + (shootSkill - 72) * 0.005,
          0.22,
          0.92
        );

        if (Math.random() > onTargetProb) {
          matchStats.shotsMap?.push({
            x: shotX, y: shotY, xG: parseFloat(clampedXG.toFixed(2)),
            isGoal: false, isOnTarget: false, teamId: atkTeam.id!, playerName: shooter.name, minute
          });
          // Off target or woodwork
          if (Math.random() < 0.08 && phase === 0) {
            events.push({
              type: 'woodwork',
              playerId: shooter.id!,
              playerName: shooter.name,
              teamId: atkTeam.id!,
              minute,
              description: `💥 ¡Al palo! Disparo de ${shooter.name} que se estrella en la madera.`
            });
          }
          if (clampedXG >= 0.28) shooter.stats.bigChancesMissed++;
          if (shotType === 'penalty') {
            events.push({
              type: 'missed_penalty',
              playerId: shooter.id!,
              playerName: shooter.name,
              teamId: atkTeam.id!,
              minute,
              description: `❌ ¡Penalti fallado por ${shooter.name}!`
            });
          }
          possessionIsHome = !isHomeAtk;
          currentZone = 'build_up';
          isCounterAttack = false;
          return;
        }

        // Shot is on target!
        shooter.stats.shotsOnTarget++;
        shooterEntry.matchStats.shotsOnTarget++;
        const xGOT = clamp(clampedXG * (1.1 + (shootSkill - 70) * 0.008), 0.05, 0.96);
        shooter.stats.xGOT = (shooter.stats.xGOT || 0) + xGOT;

        if (isHomeAtk) matchStats.homeShotsOnTarget++;
        else matchStats.awayShotsOnTarget++;

        // Goal conversion probability given shot is on target
        const goalProb = clamp(
          (clampedXG / onTargetProb) * (1 + (shootSkill - gkSkill) * 0.014),
          0.08,
          shotType === 'penalty' ? 0.84 : 0.78
        );

        const isGoalScored = Math.random() < goalProb;
        matchStats.shotsMap?.push({
          x: shotX, y: shotY, xG: parseFloat(clampedXG.toFixed(2)),
          isGoal: isGoalScored, isOnTarget: true, teamId: atkTeam.id!, playerName: shooter.name, minute
        });

        if (isGoalScored) {
          // GOAL!
          shooter.stats.goals++;
          shooterEntry.matchStats.goals++;
          gk.stats.goalsConceded = (gk.stats.goalsConceded || 0) + 1;

          if (shotType === 'penalty') {
            shooter.stats.penaltiesScored++;
            shooter.stats.goalsInsideBox++;
          } else if (shotType === 'free_kick') {
            shooter.stats.freeKickGoals++;
            shooter.stats.goalsOutsideBox++;
          } else if (shotType === 'header') {
            shooter.stats.headerGoals++;
            shooter.stats.goalsInsideBox++;
          } else if (shotType === 'long_shot') {
            shooter.stats.goalsOutsideBox++;
          } else {
            shooter.stats.goalsInsideBox++;
          }

          // Foot tracking for non-headers
          if (shotType !== 'header') {
            const prefLeft = shooter.bio?.preferredFoot === 'Left';
            const weakFootRating = shooter.bio?.weakFoot || 3;
            const usesPreferred = Math.random() < (0.88 - (weakFootRating - 1) * 0.06);
            const scoredWithLeft = usesPreferred ? prefLeft : !prefLeft;
            if (scoredWithLeft) shooter.stats.leftFootGoals++;
            else shooter.stats.rightFootGoals++;
          }

          if (assisterEntry && assisterEntry.player.id !== shooter.id && shotType !== 'penalty' && shotType !== 'free_kick') {
            assisterEntry.player.stats.assists++;
            assisterEntry.matchStats.assists++;
          }

          if (isHomeAtk) homeScore++;
          else awayScore++;

          const validAssist = assisterEntry && assisterEntry.player.id !== shooter.id && shotType !== 'penalty' && shotType !== 'free_kick';
          events.push({
            type: 'goal',
            subType: shotType === 'penalty' ? 'penalty' : shotType === 'free_kick' ? 'free_kick' : shotType === 'header' ? 'header' : isCounterAttack ? 'counter' : 'open_play',
            playerId: shooter.id!,
            playerName: shooter.name,
            teamId: atkTeam.id!,
            assistId: validAssist ? assisterEntry!.player.id : undefined,
            assistName: validAssist ? assisterEntry!.player.name : undefined,
            minute,
            xG: parseFloat(clampedXG.toFixed(2)),
            description: `⚽ ¡GOL de ${shooter.name} (${atkTeam.name})!${validAssist ? ` Asistencia de ${assisterEntry!.player.name}.` : ''}${shotType === 'penalty' ? ' (Penalti)' : shotType === 'free_kick' ? ' (Tiro Libre)' : shotType === 'header' ? ' (Cabeza)' : ''}`
          });

          possessionIsHome = !isHomeAtk;
          currentZone = 'mid_center';
          isCounterAttack = false;
        } else {
          // Saved by Goalkeeper!
          gk.stats.saves = (gk.stats.saves || 0) + 1;
          gkEntry.matchStats.saves++;
          if (isHomeAtk) matchStats.awaySaves++;
          else matchStats.homeSaves++;

          if (clampedXG >= 0.28) shooter.stats.bigChancesMissed++;
          if (shotType === 'penalty') {
            events.push({
              type: 'missed_penalty',
              playerId: shooter.id!,
              playerName: shooter.name,
              teamId: atkTeam.id!,
              minute,
              description: `🧤 ¡Paradón de ${gk.name} para detener el penalti de ${shooter.name}!`
            });
          }

          // Parried out for a corner 35% of the time!
          if (Math.random() < 0.35) {
            if (isHomeAtk) matchStats.homeCorners++;
            else matchStats.awayCorners++;
            // Immediate corner kick resolution using team's setPieceRoutine!
            const cornerTakerId = atkSheet.specialists.cornerTakerId;
            const cornerTakerEntry = atkActive.find(ap => ap.player.id === cornerTakerId) || atkEntry;
            const spRoutine = atkTeam.setPieceRoutine || { cornerStyle: 'primer_palo', boxesPlayers: 5, freeKickStyle: 'colocado_barrera' };
            const isShortCorner = spRoutine.cornerStyle === 'en_corto' && Math.random() < 0.65;
            if (!isShortCorner) cornerTakerEntry.player.stats.crossesAttempted++;

            const boxMenBonus = ((spRoutine.boxesPlayers || 5) - 5) * 0.04;
            const styleXGMod = spRoutine.cornerStyle === 'bloqueo_portero' || spRoutine.cornerStyle === 'segundo_palo' ? 0.03 : 0;

            const aerialTargets = atkActive.filter(ap => ap.slotType !== 'POR' && ap.player.id !== cornerTakerEntry.player.id);
            if (aerialTargets.length > 0 && Math.random() < (0.32 + boxMenBonus)) {
              if (!isShortCorner) cornerTakerEntry.player.stats.crossesCompleted++;
              cornerTakerEntry.player.stats.keyPasses++;
              cornerTakerEntry.player.stats.xA += 0.09 + styleXGMod;
              cornerTakerEntry.matchStats.keyPasses++;
              cornerTakerEntry.matchStats.xA += 0.09 + styleXGMod;

              const headerTarget = pickWeightedPlayer(
                aerialTargets,
                aerialTargets.map(ap => {
                  const d = getDetailedAttributes(ap.player);
                  return isShortCorner
                    ? d.finishing * 0.5 + d.ballControl * 0.5
                    : d.headingAccuracy * 0.5 + d.jumping * 0.5 + (ap.slotLabel === 'DFC' || ap.slotLabel === 'DC' ? 30 : 0);
                })
              );

              if (!isShortCorner) {
                headerTarget.player.stats.aerialDuelsWon++;
                defPlayer.stats.aerialDuelsLost++;
              }
              headerTarget.player.stats.duelsWon++;
              headerTarget.matchStats.duelsWon++;
              defPlayer.stats.duelsLost++;
              defEntry.matchStats.duelsLost++;

              resolveShot(headerTarget, cornerTakerEntry, isShortCorner ? 'open_box' : 'header', 0.11 + styleXGMod + Math.random() * 0.12);
              return;
            } else {
              defPlayer.stats.clearances++;
              defPlayer.stats.aerialDuelsWon++;
              defPlayer.stats.duelsWon++;
              defEntry.matchStats.clearances++;
              defEntry.matchStats.duelsWon++;
              // If attacking team sent 6+ players into the box, clearance triggers a dangerous counter-attack!
              if ((spRoutine.boxesPlayers || 5) >= 6) {
                possessionIsHome = !isHomeAtk;
                currentZone = 'final_third';
                isCounterAttack = true;
                return;
              }
            }
          }

          possessionIsHome = !isHomeAtk;
          currentZone = 'build_up';
          isCounterAttack = false;
        }
      };

      // ZONE 1 & 2: BUILD UP & MIDFIELD
      if (currentZone === 'build_up' || currentZone === 'mid_center' || currentZone === 'mid_flank') {
        const isOwnHalf = currentZone === 'build_up';
        const wantsDribble = Math.random() < atkTac.dribbleRate;

        if (!wantsDribble) {
          // Pass action (short pass or long ball)
          const isLong = Math.random() < atkTac.longBallRate;
          const passAttr = isLong
            ? atkDet.longPassing * 0.65 + atkDet.vision * 0.35 + windLongBallPenalty
            : atkDet.shortPassing * 0.65 + atkDet.vision * 0.2 + atkDet.ballControl * 0.15 + rainPassPenalty;

          const effPass = getEffectiveSubAttr(atkEntry, passAttr, atkChemBonus) + atkTac.shortPassBonus +
            (hasPlayStyle(atkPlayer, 'tiki taka') || hasPlayStyle(atkPlayer, 'pinged') || hasPlayStyle(atkPlayer, 'long ball') ? 6 : 0);

          const effIntercept = getEffectiveSubAttr(
            defEntry,
            defDet.interceptions * 0.6 + defDet.defAwareness * 0.4,
            defChemBonus
          ) + defTac.pressIntensity * 0.7 + (hasPlayStyle(defPlayer, 'intercept') || hasPlayStyle(defPlayer, 'anticipate') ? 6 : 0);

          const successThreshold = isLong ? 0.62 : 0.83;
          const passProb = clamp(successThreshold + (effPass - effIntercept) * 0.0055, 0.42, 0.95);

          if (Math.random() < passProb) {
            recordPass(true, isOwnHalf, isLong, false);
            if (currentZone === 'build_up') {
              currentZone = isLong ? 'final_third' : (Math.random() < atkTac.crossRate ? 'mid_flank' : 'mid_center');
            } else {
              currentZone = Math.random() < atkTac.crossRate ? 'final_third' : 'final_third';
            }
          } else {
            // Pass intercepted!
            recordPass(false, isOwnHalf, isLong, false);
            atkPlayer.stats.possessionLost++;
            defPlayer.stats.interceptions++;
            defPlayer.stats.ballsRecovered++;
            defEntry.matchStats.interceptions++;

            if (isOwnHalf) {
              // High turnover in build-up! Gegenpressing!
              defPlayer.stats.possessionWonFinalThird++;
              if (Math.random() < 0.25) {
                atkPlayer.stats.errorsLeadingToShot++;
                atkEntry.matchStats.errors++;
              }
              possessionIsHome = !isHomeAtk;
              currentZone = 'box';
              isCounterAttack = true;
            } else {
              possessionIsHome = !isHomeAtk;
              currentZone = Math.random() < 0.35 + defTac.counterBonus * 0.015 ? 'final_third' : 'mid_center';
              isCounterAttack = currentZone === 'final_third';
            }
          }
        } else {
          // Dribble / 1v1 Ground Duel
          atkPlayer.stats.dribblesAttempted++;
          const effDrib = getEffectiveSubAttr(
            atkEntry,
            atkDet.ballControl * 0.45 + atkDet.agility * 0.25 + atkDet.acceleration * 0.3,
            atkChemBonus
          ) + (hasPlayStyle(atkPlayer, 'quick step') || hasPlayStyle(atkPlayer, 'technical') || hasPlayStyle(atkPlayer, 'rapid') ? 6 : 0);

          const effTackle = getEffectiveSubAttr(
            defEntry,
            defDet.standingTackle * 0.5 + defDet.defAwareness * 0.25 + defDet.strength * 0.25,
            defChemBonus
          ) + (hasPlayStyle(defPlayer, 'jockey') || hasPlayStyle(defPlayer, 'anticipate') || hasPlayStyle(defPlayer, 'bruiser') ? 6 : 0);

          const dribWinProb = clamp(0.50 + (effDrib - effTackle) * 0.007, 0.22, 0.80);

          if (Math.random() < dribWinProb) {
            atkPlayer.stats.dribblesCompleted++;
            atkPlayer.stats.duelsWon++;
            atkPlayer.stats.groundDuelsWon++;
            atkEntry.matchStats.dribblesCompleted++;
            atkEntry.matchStats.duelsWon++;

            defPlayer.stats.duelsLost++;
            defPlayer.stats.groundDuelsLost++;
            defPlayer.stats.dribbledPast++;
            defEntry.matchStats.duelsLost++;

            currentZone = currentZone === 'build_up' ? 'mid_center' : 'final_third';
          } else {
            // Tackle or Foul!
            const foulChance = clamp(0.16 + (defDet.aggression - defDet.standingTackle) * 0.002, 0.08, 0.28);
            if (Math.random() < foulChance) {
              defPlayer.stats.foulsCommitted++;
              defEntry.matchStats.fouls++;
              atkPlayer.stats.foulsReceived++;
              if (isHomeAtk) matchStats.awayFouls++;
              else matchStats.homeFouls++;

              // Card check
              const cardChance = currentZone === 'mid_center' ? 0.13 : 0.09;
              if (Math.random() < cardChance) {
                if (!defPlayer.cards) defPlayer.cards = { yellow: 0, red: 0, suspended: false, seasonYellows: 0 };
                if (defEntry.inMatchYellows >= 1) {
                  // Second yellow -> Red card!
                  defEntry.inMatchYellows++;
                  defEntry.sentOff = true;
                  defEntry.subbedOutMinute = minute;
                  defPlayer.stats.secondYellowCards++;
                  defPlayer.stats.redCards++;
                  defPlayer.cards.red++;
                  defPlayer.cards.suspended = true;
                  events.push({
                    type: 'red_card',
                    subType: 'second_yellow',
                    playerId: defPlayer.id!,
                    playerName: defPlayer.name,
                    teamId: defTeam.id!,
                    minute,
                    description: `🟨🟥 ¡Expulsado ${defPlayer.name} (${defTeam.name}) por doble amarilla!`
                  });
                } else if (Math.random() < 0.03) {
                  // Straight red card
                  defEntry.sentOff = true;
                  defEntry.subbedOutMinute = minute;
                  defPlayer.stats.redCards++;
                  defPlayer.cards.red++;
                  defPlayer.cards.suspended = true;
                  events.push({
                    type: 'red_card',
                    playerId: defPlayer.id!,
                    playerName: defPlayer.name,
                    teamId: defTeam.id!,
                    minute,
                    description: `🟥 ¡Tarjeta Roja directa para ${defPlayer.name} (${defTeam.name}) por entrada dura!`
                  });
                } else {
                  defEntry.inMatchYellows++;
                  defPlayer.stats.yellowCards++;
                  defPlayer.cards.seasonYellows = (defPlayer.cards.seasonYellows || 0) + 1;
                  defPlayer.cards.yellow = defPlayer.cards.seasonYellows;
                  if (defPlayer.cards.seasonYellows % 5 === 0) {
                    defPlayer.cards.suspended = true; // 5-yellow accumulation suspension for next match
                  }
                  events.push({
                    type: 'yellow_card',
                    playerId: defPlayer.id!,
                    playerName: defPlayer.name,
                    teamId: defTeam.id!,
                    minute,
                    description: `🟨 Tarjeta amarilla para ${defPlayer.name} (${defTeam.name}).`
                  });
                }
              }
              currentZone = 'final_third';
            } else {
              // Clean tackle!
              atkPlayer.stats.possessionLost++;
              atkPlayer.stats.duelsLost++;
              atkPlayer.stats.groundDuelsLost++;
              atkEntry.matchStats.duelsLost++;

              defPlayer.stats.tackles++;
              defPlayer.stats.duelsWon++;
              defPlayer.stats.groundDuelsWon++;
              defPlayer.stats.ballsRecovered++;
              defEntry.matchStats.tackles++;
              defEntry.matchStats.duelsWon++;

              possessionIsHome = !isHomeAtk;
              currentZone = Math.random() < 0.30 ? 'final_third' : 'mid_center';
              isCounterAttack = currentZone === 'final_third';
            }
          }
        }
      } else {
        // ZONE 3 & 4: FINAL THIRD & PENALTY BOX
        const actionRoll = Math.random();

        if (actionRoll < atkTac.crossRate * 0.65 && currentZone === 'final_third') {
          // Cross into the box!
          atkPlayer.stats.crossesAttempted++;
          recordPass(false, false, false, false); // will update if completed below

          const effCross = getEffectiveSubAttr(
            atkEntry,
            atkDet.crossing * 0.65 + atkDet.curve * 0.2 + atkDet.vision * 0.15,
            atkChemBonus
          ) + (hasPlayStyle(atkPlayer, 'whipped') ? 7 : 0);

          const effDefHead = getEffectiveSubAttr(
            defEntry,
            defDet.headingAccuracy * 0.45 + defDet.jumping * 0.35 + defDet.defAwareness * 0.2,
            defChemBonus
          ) + defTac.defensiveSolidness * 0.4;

          if (Math.random() < clamp(0.32 + (effCross - effDefHead) * 0.005, 0.16, 0.55)) {
            // Cross completed! Fix pass completion counter
            atkPlayer.stats.passesCompleted++;
            atkPlayer.stats.oppHalfPassesCompleted++;
            atkEntry.matchStats.passesCompleted++;
            if (isHomeAtk) matchStats.homePassesCompleted++;
            else matchStats.awayPassesCompleted++;

            atkPlayer.stats.crossesCompleted++;
            atkPlayer.stats.keyPasses++;
            atkEntry.matchStats.keyPasses++;

            const boxTargets = outfieldAtk.filter(ap => ap.player.id !== atkPlayer.id);
            const receiver = boxTargets.length > 0
              ? pickWeightedPlayer(boxTargets, boxTargets.map(ap => ap.slotType === 'DEL' ? 6 : 2))
              : atkEntry;

            const crossXG = 0.14 + Math.random() * 0.22;
            atkPlayer.stats.xA += crossXG;
            atkEntry.matchStats.xA += crossXG;
            if (crossXG >= 0.28) atkPlayer.stats.bigChancesCreated++;

            // Aerial duel in the box
            receiver.player.stats.aerialDuelsWon++;
            receiver.player.stats.duelsWon++;
            receiver.matchStats.duelsWon++;
            defPlayer.stats.aerialDuelsLost++;
            defPlayer.stats.duelsLost++;
            defEntry.matchStats.duelsLost++;

            resolveShot(receiver, atkEntry, Math.random() < 0.68 ? 'header' : 'open_box', crossXG);
          } else {
            // Cross cleared by defender
            atkPlayer.stats.possessionLost++;
            defPlayer.stats.clearances++;
            defPlayer.stats.aerialDuelsWon++;
            defPlayer.stats.duelsWon++;
            defEntry.matchStats.clearances++;
            defEntry.matchStats.duelsWon++;

            if (Math.random() < 0.30) {
              if (isHomeAtk) matchStats.homeCorners++;
              else matchStats.awayCorners++;
            }
            possessionIsHome = !isHomeAtk;
            currentZone = 'build_up';
            isCounterAttack = false;
          }
        } else if (actionRoll < 0.72 && currentZone === 'final_third') {
          // Incisive Through Ball / Chipped Pass into Box
          const isChipped = Math.random() < 0.28;
          const effVision = getEffectiveSubAttr(
            atkEntry,
            atkDet.vision * 0.55 + atkDet.shortPassing * 0.45,
            atkChemBonus
          ) + atkTac.shortPassBonus * 0.6 + (hasPlayStyle(atkPlayer, 'incisive') || hasPlayStyle(atkPlayer, 'inventive') ? 7 : 0);

          const effDefAware = getEffectiveSubAttr(
            defEntry,
            defDet.defAwareness * 0.55 + defDet.interceptions * 0.45,
            defChemBonus
          ) + defTac.defensiveSolidness * 0.6 - defTac.highLineVulnerability * 0.5;

          const boxTargets = outfieldAtk.filter(ap => ap.player.id !== atkPlayer.id);
          const receiver = boxTargets.length > 0
            ? pickWeightedPlayer(boxTargets, boxTargets.map(ap => ap.slotType === 'DEL' ? 6.5 : ap.slotLabel === 'MCO' ? 4 : 1.5))
            : atkEntry;

          // Offside check (higher if defense plays high line)
          if (Math.random() < (0.07 + (defTac.highLineVulnerability > 5 ? 0.04 : 0))) {
            receiver.player.stats.offsides++;
            if (isHomeAtk) matchStats.homeOffsides++;
            else matchStats.awayOffsides++;
            possessionIsHome = !isHomeAtk;
            currentZone = 'build_up';
            isCounterAttack = false;
            continue;
          }

          if (Math.random() < clamp(0.36 + (effVision - effDefAware) * 0.006, 0.18, 0.64)) {
            recordPass(true, false, false, isChipped);
            atkPlayer.stats.keyPasses++;
            atkEntry.matchStats.keyPasses++;

            const chanceXG = (isCounterAttack ? 0.28 : 0.18) + Math.random() * 0.28;
            atkPlayer.stats.xA += chanceXG;
            atkEntry.matchStats.xA += chanceXG;
            if (chanceXG >= 0.28) atkPlayer.stats.bigChancesCreated++;

            resolveShot(receiver, atkEntry, 'open_box', chanceXG);
          } else {
            // Intercepted or cleared at the edge of the box
            recordPass(false, false, false, isChipped);
            atkPlayer.stats.possessionLost++;
            if (Math.random() < 0.5) {
              defPlayer.stats.interceptions++;
              defEntry.matchStats.interceptions++;
            } else {
              defPlayer.stats.clearances++;
              defEntry.matchStats.clearances++;
            }
            defPlayer.stats.ballsRecovered++;
            possessionIsHome = !isHomeAtk;
            currentZone = 'build_up';
            isCounterAttack = false;
          }
        } else {
          // Dribble into Box or Direct Shot!
          if (Math.random() < 0.28) {
            // Direct dribble in box/final third -> check foul (Penalty or Direct Free Kick!)
            atkPlayer.stats.dribblesAttempted++;
            const effDrib = getEffectiveSubAttr(atkEntry, atkDet.ballControl * 0.5 + atkDet.agility * 0.5, atkChemBonus);
            const effTackle = getEffectiveSubAttr(defEntry, defDet.standingTackle * 0.6 + defDet.defAwareness * 0.4, defChemBonus);

            if (Math.random() < clamp(0.45 + (effDrib - effTackle) * 0.006, 0.20, 0.72)) {
              atkPlayer.stats.dribblesCompleted++;
              atkPlayer.stats.duelsWon++;
              atkPlayer.stats.groundDuelsWon++;
              atkEntry.matchStats.dribblesCompleted++;
              atkEntry.matchStats.duelsWon++;
              defPlayer.stats.dribbledPast++;
              defPlayer.stats.duelsLost++;
              defPlayer.stats.groundDuelsLost++;
              defEntry.matchStats.duelsLost++;

              resolveShot(atkEntry, null, 'open_box', 0.22 + Math.random() * 0.22);
            } else if (Math.random() < 0.15) {
              // Foul in final third or penalty box!
              defPlayer.stats.foulsCommitted++;
              defEntry.matchStats.fouls++;
              atkPlayer.stats.foulsReceived++;
              if (isHomeAtk) matchStats.awayFouls++;
              else matchStats.homeFouls++;

              const isPenalty = currentZone === 'box' || Math.random() < 0.22;
              if (isPenalty) {
                atkPlayer.stats.penaltiesWon++;
                defPlayer.stats.penaltiesConceded++;
                const penTakerId = atkSheet.specialists.penaltyTakerId;
                const penTaker = atkActive.find(ap => ap.player.id === penTakerId) || atkEntry;
                resolveShot(penTaker, null, 'penalty', 0.78);
              } else {
                // Direct Free Kick!
                const fkTakerId = atkSheet.specialists.freeKickTakerId;
                const fkTaker = atkActive.find(ap => ap.player.id === fkTakerId) || atkEntry;
                resolveShot(fkTaker, null, 'free_kick', 0.08 + Math.random() * 0.06);
              }
            } else {
              // Clean tackle in final third
              atkPlayer.stats.possessionLost++;
              atkPlayer.stats.duelsLost++;
              atkPlayer.stats.groundDuelsLost++;
              defPlayer.stats.tackles++;
              defPlayer.stats.duelsWon++;
              defPlayer.stats.groundDuelsWon++;
              defPlayer.stats.ballsRecovered++;
              defEntry.matchStats.tackles++;
              defEntry.matchStats.duelsWon++;
              possessionIsHome = !isHomeAtk;
              currentZone = 'build_up';
              isCounterAttack = false;
            }
          } else {
            // Direct shot from outside or edge of box
            const isInsideBox = currentZone === 'box' || Math.random() < 0.35;
            resolveShot(
              atkEntry,
              null,
              isInsideBox ? 'open_box' : 'long_shot',
              isInsideBox ? 0.12 + Math.random() * 0.14 : 0.03 + Math.random() * 0.05
            );
          }
        }
      }
    }
  };

  // Simulate 90 regulation minutes
  for (let minute = 1; minute <= 90; minute++) {
    // Only trigger ~38% of minutes for active highlight phases so totals match real 90-min football (~24-28 total shots, ~2.6-2.9 goals/match)
    if (Math.random() < 0.38) {
      simulateMinuteStep(minute);
    } else {
      // Passive midfield circulation minute (keeps pass/possession counts realistic)
      for (const ap of homeSheet.onPitch.filter(x => !x.sentOff && x.subbedOutMinute === null && x.slotType !== 'POR')) {
        if (Math.random() < 0.32) {
          ap.player.stats.touches++;
          ap.player.stats.passesAttempted++;
          ap.player.stats.ownHalfPassesAttempted++;
          ap.matchStats.passesAttempted++;
          matchStats.homePassesAttempted++;
          if (Math.random() < 0.88) {
            ap.player.stats.passesCompleted++;
            ap.player.stats.ownHalfPassesCompleted++;
            ap.matchStats.passesCompleted++;
            matchStats.homePassesCompleted++;
          }
        }
      }
      for (const ap of awaySheet.onPitch.filter(x => !x.sentOff && x.subbedOutMinute === null && x.slotType !== 'POR')) {
        if (Math.random() < 0.30) {
          ap.player.stats.touches++;
          ap.player.stats.passesAttempted++;
          ap.player.stats.ownHalfPassesAttempted++;
          ap.matchStats.passesAttempted++;
          matchStats.awayPassesAttempted++;
          if (Math.random() < 0.87) {
            ap.player.stats.passesCompleted++;
            ap.player.stats.ownHalfPassesCompleted++;
            ap.matchStats.passesCompleted++;
            matchStats.awayPassesCompleted++;
          }
        }
      }
      if ([60, 68, 76, 83].includes(minute)) {
        if (Math.random() < 0.70) trySubstitution(true, minute);
        if (Math.random() < 0.70) trySubstitution(false, minute);
      }
    }
  }

  // Knockout tie resolution (Extra Time & Penalty Shootout if tied in Cup/UCL/UEL Knockouts)
  const isKnockoutMatch =
    type === 'cup' ||
    ((type === 'continental' || type === 'europa') && week >= 31);

  if (isKnockoutMatch && homeScore === awayScore) {
    // 30 minutes Extra Time
    for (let etMin = 91; etMin <= 120; etMin++) {
      if (Math.random() < 0.32) simulateMinuteStep(etMin);
    }
    // If still tied after 120', run 5-kick + Sudden Death Penalty Shootout!
    if (homeScore === awayScore) {
      const homeTakers = [...homeSheet.onPitch]
        .filter(x => !x.sentOff && x.subbedOutMinute === null)
        .sort((a, b) => getDetailedAttributes(b.player).penalties - getDetailedAttributes(a.player).penalties);
      const awayTakers = [...awaySheet.onPitch]
        .filter(x => !x.sentOff && x.subbedOutMinute === null)
        .sort((a, b) => getDetailedAttributes(b.player).penalties - getDetailedAttributes(a.player).penalties);

      const homeGk = homeSheet.onPitch.find(x => x.slotType === 'POR')?.player || homeAll[0];
      const awayGk = awaySheet.onPitch.find(x => x.slotType === 'POR')?.player || awayAll[0];
      const hGkReflex = getDetailedAttributes(homeGk).gkReflexes;
      const aGkReflex = getDetailedAttributes(awayGk).gkReflexes;

      let hPens = 0;
      let aPens = 0;
      const kicks: { teamId: number; playerName: string; scored: boolean; round: number }[] = [];

      for (let round = 1; round <= 10; round++) {
        const hTaker = homeTakers[(round - 1) % Math.max(1, homeTakers.length)]?.player;
        const aTaker = awayTakers[(round - 1) % Math.max(1, awayTakers.length)]?.player;

        if (hTaker) {
          const hPenSkill = getDetailedAttributes(hTaker).penalties * 0.65 + getDetailedAttributes(hTaker).composure * 0.35;
          const hScored = Math.random() < clamp(0.76 + (hPenSkill - aGkReflex) * 0.004, 0.55, 0.92);
          if (hScored) hPens++;
          kicks.push({ teamId: homeTeam.id!, playerName: hTaker.name, scored: hScored, round });
        }

        // Check early clinch in regulation 5 kicks before away kick
        if (round <= 5) {
          const hRemaining = 5 - round;
          const aRemaining = 5 - (round - 1);
          if (hPens > aPens + aRemaining || aPens > hPens + hRemaining) break;
        }

        if (aTaker) {
          const aPenSkill = getDetailedAttributes(aTaker).penalties * 0.65 + getDetailedAttributes(aTaker).composure * 0.35;
          const aScored = Math.random() < clamp(0.75 + (aPenSkill - hGkReflex) * 0.004, 0.55, 0.92);
          if (aScored) aPens++;
          kicks.push({ teamId: awayTeam.id!, playerName: aTaker.name, scored: aScored, round });
        }

        if (round <= 5) {
          const remaining = 5 - round;
          if (Math.abs(hPens - aPens) > remaining) break;
        } else if (hPens !== aPens) {
          break; // Sudden death decided!
        }
      }

      if (hPens === aPens) {
        if (Math.random() < 0.52) hPens++;
        else aPens++;
      }

      matchStats.penaltyShootout = {
        homePenalties: hPens,
        awayPenalties: aPens,
        kicks
      };

      const winnerIsHome = hPens > aPens;
      const decider = winnerIsHome ? homeTakers[0]?.player : awayTakers[0]?.player;
      if (winnerIsHome) homeScore += 1;
      else awayScore += 1;

      events.push({
        type: 'goal',
        subType: 'penalty',
        playerId: decider?.id || 1,
        playerName: decider?.name || 'Especialista',
        teamId: winnerIsHome ? homeTeam.id! : awayTeam.id!,
        minute: 120,
        description: `🏆 ¡Tanda de Penaltis (${hPens}-${aPens})! ${winnerIsHome ? homeTeam.name : awayTeam.name} avanza tras el lanzamiento decisivo de ${decider?.name || 'su especialista'}.`
      });
    }
  }

  // Finalize Possession %
  const totalTicks = Math.max(1, homePossessionTicks + awayPossessionTicks);
  const homeTacFinal = computeTacticalProfile(homeTeam, awayTeam, 0, 45);
  const awayTacFinal = computeTacticalProfile(awayTeam, homeTeam, 0, 45);
  const rawHomePoss = (homePossessionTicks / totalTicks) * 100 + (homeTacFinal.possessionBias - awayTacFinal.possessionBias) * 0.35;
  matchStats.homePossession = clamp(Math.round(rawHomePoss), 28, 72);
  matchStats.awayPossession = 100 - matchStats.homePossession;

  // Clean sheets
  if (awayScore === 0) {
    const homeGk = homeSheet.onPitch.find(ap => ap.slotType === 'POR');
    if (homeGk) homeGk.player.stats.cleanSheets++;
  }
  if (homeScore === 0) {
    const awayGk = awaySheet.onPitch.find(ap => ap.slotType === 'POR');
    if (awayGk) awayGk.player.stats.cleanSheets++;
  }

  // Compute Player Match Ratings (4.0 - 10.0), Minutes Played, Fatigue, Injuries & MVP
  const allParticipated = [
    ...Array.from(homeParticipants.values()),
    ...Array.from(awayParticipants.values())
  ];

  const playerRatings: Record<number, number> = {};
  let bestRating = -1;
  let mvpEntry: ActiveSlotPlayer | null = null;

  for (const ap of allParticipated) {
    const p = ap.player;
    const isHome = p.teamId === homeTeam.id;
    const teamGoalsConceded = isHome ? awayScore : homeScore;
    const teamWon = isHome ? homeScore > awayScore : awayScore > homeScore;

    const endMin = ap.subbedOutMinute ?? 90;
    const mins = Math.max(1, endMin - ap.subbedInMinute);
    p.stats.gamesPlayed++;
    p.stats.minutesPlayed += mins;
    p.stats.xG = parseFloat((p.stats.xG || 0).toFixed(2));
    p.stats.xA = parseFloat((p.stats.xA || 0).toFixed(2));
    p.stats.xGOT = parseFloat((p.stats.xGOT || 0).toFixed(2));

    // Calculate 0-10 Match Rating
    const ms = ap.matchStats;
    let rating = 6.5;
    rating += ms.goals * 1.15;
    rating += ms.assists * 0.75;
    rating += ms.keyPasses * 0.22;
    rating += ms.dribblesCompleted * 0.14;
    rating += ms.tackles * 0.18;
    rating += ms.interceptions * 0.16;
    rating += ms.blocks * 0.18;
    rating += ms.saves * 0.28;
    if (ap.slotType === 'POR' || ap.slotType === 'DEF') {
      if (teamGoalsConceded === 0 && mins >= 60) rating += 0.55;
      else rating -= Math.min(1.2, teamGoalsConceded * 0.25);
    }
    if (teamWon) rating += 0.2;
    if (ap.inMatchYellows > 0) rating -= 0.25;
    if (ap.sentOff) rating -= 1.6;
    rating -= ms.errors * 0.6;

    const finalRating = parseFloat(clamp(rating, 4.2, 10.0).toFixed(1));
    if (p.id) playerRatings[p.id] = finalRating;

    // Rolling match ratings & averageRating
    const prevRatings = p.stats.matchRatings || [];
    const prevCount = Math.max(0, p.stats.gamesPlayed - 1);
    const prevAvg = p.stats.averageRating || finalRating;
    p.stats.averageRating = parseFloat((((prevAvg * prevCount) + finalRating) / p.stats.gamesPlayed).toFixed(2));
    p.stats.matchRatings = [...prevRatings.slice(-4), finalRating];

    if (finalRating > bestRating) {
      bestRating = finalRating;
      mvpEntry = ap;
    }

    // Apply post-match fatigue & injury check
    p.fatigue = Math.round(clamp(ap.inMatchFatigue, 0, 100));

    const team = isHome ? homeTeam : awayTeam;
    const healthLevel = team.healthExpense || 50;
    const injuryProne = p.injuryProne || 35;
    const fatFactor = (p.fatigue || 0) / 100;
    const injuryChance = Math.max(0.003, 0.006 + fatFactor * 0.02 + (injuryProne / 100) * 0.015 - (healthLevel / 100) * 0.015);

    if (!p.isInjured && Math.random() < injuryChance) {
      p.isInjured = true;
      p.injuryWeeks = Math.floor(Math.random() * 5) + 1;
      const types = ['Esguince de tobillo', 'Desgarro isquiotibial', 'Sobrecarga muscular', 'Distensión de ligamento', 'Contusión articular'];
      p.injuryType = types[Math.floor(Math.random() * types.length)];
      events.push({
        type: 'injury',
        playerId: p.id!,
        playerName: p.name,
        teamId: team.id!,
        minute: Math.min(90, Math.max(15, endMin)),
        description: `🏥 ${p.name} sufre una lesión (${p.injuryType}, ${p.injuryWeeks} sem).`
      });
    }
  }

  if (mvpEntry && mvpEntry.player.id) {
    mvpEntry.player.stats.manOfTheMatch = (mvpEntry.player.stats.manOfTheMatch || 0) + 1;
    matchStats.mvpPlayerId = mvpEntry.player.id;
    matchStats.mvpPlayerName = mvpEntry.player.name;
  }
  matchStats.playerRatings = playerRatings;

  events.sort((a, b) => a.minute - b.minute);

  const updatedPlayers = allParticipated.map(ap => ap.player);
  if (persistPlayerStats) {
    await db.players.bulkPut(updatedPlayers);
  }

  return {
    leagueId,
    homeTeamId: homeTeam.id!,
    awayTeamId: awayTeam.id!,
    homeScore,
    awayScore,
    week,
    isPlayed: true,
    type,
    events,
    stats: matchStats,
    updatedPlayers
  };
}

export async function applyMatchOutcomeToDatabase(
  leagueId: number,
  matchRecord: Match,
  simResult: Pick<Match, 'homeScore' | 'awayScore' | 'events' | 'stats'>,
  homeTeam: Team,
  awayTeam: Team
): Promise<void> {
  // 1. Update Match record
  matchRecord.homeScore = simResult.homeScore;
  matchRecord.awayScore = simResult.awayScore;
  matchRecord.isPlayed = true;
  matchRecord.events = simResult.events;
  matchRecord.stats = simResult.stats;
  await db.matches.put(matchRecord);

  const homeWon = simResult.homeScore > simResult.awayScore;
  const awayWon = simResult.awayScore > simResult.homeScore;
  const isDraw = simResult.homeScore === simResult.awayScore;
  const compType = matchRecord.type || 'league';

  // 2. Update Domestic League Standings ONLY for 'league' matches!
  if (compType === 'league') {
    if (homeWon) {
      homeTeam.wins++;
      awayTeam.losses++;
      homeTeam.form = [...(homeTeam.form || []).slice(-4), 'W'];
      awayTeam.form = [...(awayTeam.form || []).slice(-4), 'L'];
    } else if (awayWon) {
      awayTeam.wins++;
      homeTeam.losses++;
      awayTeam.form = [...(awayTeam.form || []).slice(-4), 'W'];
      homeTeam.form = [...(homeTeam.form || []).slice(-4), 'L'];
    } else {
      homeTeam.draws++;
      awayTeam.draws++;
      homeTeam.form = [...(homeTeam.form || []).slice(-4), 'D'];
      awayTeam.form = [...(awayTeam.form || []).slice(-4), 'D'];
    }
    homeTeam.goalsFor += simResult.homeScore;
    homeTeam.goalsAgainst += simResult.awayScore;
    awayTeam.goalsFor += simResult.awayScore;
    awayTeam.goalsAgainst += simResult.homeScore;
  }

  // 3. Update Hype & Dynamic Elo Rating for all official matches
  const homeElo = homeTeam.eloRating || (1300 + homeTeam.overall * 8);
  const awayElo = awayTeam.eloRating || (1300 + awayTeam.overall * 8);
  const expectedHome = 1 / (1 + Math.pow(10, (awayElo - (homeElo + 35)) / 400));
  const actualHome = homeWon ? 1 : isDraw ? 0.5 : 0;
  const kFactor = compType === 'continental' ? 28 : 20;

  homeTeam.eloRating = Math.round(homeElo + kFactor * (actualHome - expectedHome));
  awayTeam.eloRating = Math.round(awayElo + kFactor * ((1 - actualHome) - (1 - expectedHome)));

  if (homeWon) {
    homeTeam.hype = Math.min(100, (homeTeam.hype || 55) + 2);
    awayTeam.hype = Math.max(10, (awayTeam.hype || 55) - 1);
  } else if (awayWon) {
    awayTeam.hype = Math.min(100, (awayTeam.hype || 55) + 3);
    homeTeam.hype = Math.max(10, (homeTeam.hype || 55) - 2);
  }

  // 4. Process Weekly Finances & Starter Partnerships for both clubs
  const [homePlayers, awayPlayers] = await Promise.all([
    db.players.where('teamId').equals(homeTeam.id!).toArray(),
    db.players.where('teamId').equals(awayTeam.id!).toArray()
  ]);

  const updateStarterPartnerships = (t: Team, squad: Player[]) => {
    const st = squad.filter(p => p.lineupStatus === 'starter' && p.id);
    if (!t.partnerships) t.partnerships = {};
    for (let i = 0; i < st.length; i++) {
      for (let j = i + 1; j < st.length; j++) {
        if (st[i].position === st[j].position || (st[i].position === 'MED' && st[j].position === 'DEL')) {
          const k = getPairKey(st[i].id!, st[j].id!);
          t.partnerships[k] = (t.partnerships[k] || 0) + 1;
        }
      }
    }
  };

  updateStarterPartnerships(homeTeam, homePlayers);
  updateStarterPartnerships(awayTeam, awayPlayers);

  processTeamWeeklyFinances(homeTeam, homePlayers, {
    isHome: true,
    won: homeWon,
    drew: isDraw,
    opponentOverall: awayTeam.overall,
    opponentName: awayTeam.name,
    competitionType: compType
  });

  processTeamWeeklyFinances(awayTeam, awayPlayers, {
    isHome: false,
    won: awayWon,
    drew: isDraw,
    opponentOverall: homeTeam.overall,
    opponentName: homeTeam.name,
    competitionType: compType
  });

  await db.teams.bulkPut([homeTeam, awayTeam]);
}
