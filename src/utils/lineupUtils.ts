import { db, type Player, type Team, getSpecificPosition, getDetailedAttributes } from '../db/db';
import { calculateTeamChemistry } from './chemistryUtils';

export interface PitchSlot {
  id: string;
  top: string;
  left: string;
  label: string;
  slotType: 'POR' | 'DEF' | 'MED' | 'DEL';
}

export const FORMATIONS: Record<string, PitchSlot[]> = {
  '4-3-3': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR', slotType: 'POR' },
    { id: 'LB', top: '65%', left: '15%', label: 'LI', slotType: 'DEF' },
    { id: 'CB1', top: '70%', left: '35%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB2', top: '70%', left: '65%', label: 'DFC', slotType: 'DEF' },
    { id: 'RB', top: '65%', left: '85%', label: 'LD', slotType: 'DEF' },
    { id: 'CM1', top: '45%', left: '30%', label: 'MC', slotType: 'MED' },
    { id: 'CDM', top: '50%', left: '50%', label: 'MCD', slotType: 'MED' },
    { id: 'CM2', top: '45%', left: '70%', label: 'MC', slotType: 'MED' },
    { id: 'LW', top: '25%', left: '20%', label: 'EI', slotType: 'DEL' },
    { id: 'ST', top: '15%', left: '50%', label: 'DC', slotType: 'DEL' },
    { id: 'RW', top: '25%', left: '80%', label: 'ED', slotType: 'DEL' },
  ],
  '4-4-2': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR', slotType: 'POR' },
    { id: 'LB', top: '65%', left: '15%', label: 'LI', slotType: 'DEF' },
    { id: 'CB1', top: '70%', left: '35%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB2', top: '70%', left: '65%', label: 'DFC', slotType: 'DEF' },
    { id: 'RB', top: '65%', left: '85%', label: 'LD', slotType: 'DEF' },
    { id: 'LM', top: '45%', left: '15%', label: 'MI', slotType: 'MED' },
    { id: 'CM1', top: '45%', left: '40%', label: 'MC', slotType: 'MED' },
    { id: 'CM2', top: '45%', left: '60%', label: 'MC', slotType: 'MED' },
    { id: 'RM', top: '45%', left: '85%', label: 'MD', slotType: 'MED' },
    { id: 'ST1', top: '18%', left: '38%', label: 'DC', slotType: 'DEL' },
    { id: 'ST2', top: '18%', left: '62%', label: 'DC', slotType: 'DEL' },
  ],
  '4-2-3-1': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR', slotType: 'POR' },
    { id: 'LB', top: '65%', left: '15%', label: 'LI', slotType: 'DEF' },
    { id: 'CB1', top: '70%', left: '35%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB2', top: '70%', left: '65%', label: 'DFC', slotType: 'DEF' },
    { id: 'RB', top: '65%', left: '85%', label: 'LD', slotType: 'DEF' },
    { id: 'CDM1', top: '52%', left: '38%', label: 'MCD', slotType: 'MED' },
    { id: 'CDM2', top: '52%', left: '62%', label: 'MCD', slotType: 'MED' },
    { id: 'LAM', top: '32%', left: '22%', label: 'MCO', slotType: 'MED' },
    { id: 'CAM', top: '30%', left: '50%', label: 'MCO', slotType: 'MED' },
    { id: 'RAM', top: '32%', left: '78%', label: 'MCO', slotType: 'MED' },
    { id: 'ST', top: '15%', left: '50%', label: 'DC', slotType: 'DEL' },
  ],
  '3-5-2': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR', slotType: 'POR' },
    { id: 'CB1', top: '72%', left: '25%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB2', top: '74%', left: '50%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB3', top: '72%', left: '75%', label: 'DFC', slotType: 'DEF' },
    { id: 'LWB', top: '45%', left: '12%', label: 'CAI', slotType: 'DEF' },
    { id: 'CM1', top: '48%', left: '35%', label: 'MC', slotType: 'MED' },
    { id: 'CAM', top: '38%', left: '50%', label: 'MCO', slotType: 'MED' },
    { id: 'CM2', top: '48%', left: '65%', label: 'MC', slotType: 'MED' },
    { id: 'RWB', top: '45%', left: '88%', label: 'CAD', slotType: 'DEF' },
    { id: 'ST1', top: '18%', left: '38%', label: 'DC', slotType: 'DEL' },
    { id: 'ST2', top: '18%', left: '62%', label: 'DC', slotType: 'DEL' },
  ]
};

export function getPositionalPenalty(
  playerPos: string,
  slotType: 'POR' | 'DEF' | 'MED' | 'DEL',
  slotLabel: string,
  specificPos?: string,
  secondaryPositions?: string[]
): number {
  const spec = (specificPos || '').toUpperCase();
  const label = (slotLabel || '').toUpperCase();
  const secList = (secondaryPositions || []).map(s => s.toUpperCase());

  // Goalkeeper check
  if (spec === 'POR' || label === 'POR' || playerPos === 'POR' || slotType === 'POR') {
    if ((spec === 'POR' || playerPos === 'POR') && (label === 'POR' || slotType === 'POR')) return 0;
    return 35;
  }

  // Exact match on specific position or secondary position
  if (spec && (spec === label || secList.includes(label))) {
    return 0;
  }

  // Winger versatility: EI, ED, MI, MD can play across flanks and forward slots
  if ((spec === 'EI' || spec === 'ED' || secList.includes('EI') || secList.includes('ED')) && (slotType === 'DEL' || label === 'MI' || label === 'MD' || label === 'MCO')) {
    return 0;
  }

  // Pure Strikers on wing get minimal penalty
  if (spec === 'DC' && (label === 'EI' || label === 'ED')) {
    return 2;
  }

  // Midfielders playing in MED slots
  if (playerPos === 'MED' && slotType === 'MED') {
    return 0;
  }

  // Defenders playing in DEF slots
  if (playerPos === 'DEF' && slotType === 'DEF') {
    if ((spec === 'LI' && label === 'LD') || (spec === 'LD' && label === 'LI')) return 2;
    if ((spec === 'LI' && label === 'CAI') || (spec === 'LD' && label === 'CAD')) return 0;
    return 0;
  }

  if (playerPos === slotType) return 0;

  if (playerPos === 'DEL' && slotType === 'MED') return 6;
  if (playerPos === 'MED' && slotType === 'DEL') return 3;
  if (playerPos === 'MED' && slotType === 'DEF') return 8;
  if (playerPos === 'DEF' && slotType === 'MED') return 6;

  return 10;
}

export function assignSpecialistsForSquad(players: Player[], team?: Team): {
  captainId: number | null;
  penaltyTakerId: number | null;
  freeKickTakerId: number | null;
  cornerTakerId: number | null;
} {
  const active = players.filter(p => p.lineupStatus === 'starter');
  const pool = active.length >= 8 ? active : players.filter(p => p.lineupStatus !== 'youth');
  if (pool.length === 0) {
    return { captainId: null, penaltyTakerId: null, freeKickTakerId: null, cornerTakerId: null };
  }

  // Captain: highest OVR + experience (age >= 25 bonus) + Loyal/Ambitious bonus
  const byCaptainScore = [...pool].sort((a, b) => {
    const scoreA = a.overall + (a.age >= 26 ? 4 : 0) + (a.personality === 'Leal' ? 3 : 0);
    const scoreB = b.overall + (b.age >= 26 ? 4 : 0) + (b.personality === 'Leal' ? 3 : 0);
    return scoreB - scoreA;
  });

  // Penalty taker: highest penalties + finishing + composure
  const byPenalty = [...pool].filter(p => p.position !== 'POR').sort((a, b) => {
    const da = getDetailedAttributes(a);
    const dbAttr = getDetailedAttributes(b);
    return (dbAttr.penalties * 0.55 + dbAttr.finishing * 0.25 + dbAttr.composure * 0.2) -
           (da.penalties * 0.55 + da.finishing * 0.25 + da.composure * 0.2);
  });

  // Free kick taker: highest freeKickAccuracy + curve + shotPower
  const byFreeKick = [...pool].filter(p => p.position !== 'POR').sort((a, b) => {
    const da = getDetailedAttributes(a);
    const dbAttr = getDetailedAttributes(b);
    return (dbAttr.freeKickAccuracy * 0.55 + dbAttr.curve * 0.25 + dbAttr.shotPower * 0.2) -
           (da.freeKickAccuracy * 0.55 + da.curve * 0.25 + da.shotPower * 0.2);
  });

  // Corner taker: highest crossing + curve + vision
  const byCorner = [...pool].filter(p => p.position !== 'POR').sort((a, b) => {
    const da = getDetailedAttributes(a);
    const dbAttr = getDetailedAttributes(b);
    return (dbAttr.crossing * 0.5 + dbAttr.curve * 0.3 + dbAttr.vision * 0.2) -
           (da.crossing * 0.5 + da.curve * 0.3 + da.vision * 0.2);
  });

  return {
    captainId: (team?.captainId && pool.some(p => p.id === team.captainId)) ? team.captainId : (byCaptainScore[0]?.id || null),
    penaltyTakerId: (team?.penaltyTakerId && pool.some(p => p.id === team.penaltyTakerId)) ? team.penaltyTakerId : (byPenalty[0]?.id || null),
    freeKickTakerId: (team?.freeKickTakerId && pool.some(p => p.id === team.freeKickTakerId)) ? team.freeKickTakerId : (byFreeKick[0]?.id || null),
    cornerTakerId: (team?.cornerTakerId && pool.some(p => p.id === team.cornerTakerId)) ? team.cornerTakerId : (byCorner[0]?.id || null)
  };
}

export async function autoSelectLineupForTeam(teamId: number, customFormation?: string): Promise<Player[]> {
  const players = await db.players.where('teamId').equals(teamId).toArray();
  if (players.length === 0) return [];

  const team = await db.teams.get(teamId);
  const formationKey = customFormation || team?.formation || '4-3-3';
  const slots = FORMATIONS[formationKey] || FORMATIONS['4-3-3'];

  // Reset non-youth players
  for (const p of players) {
    if (p.lineupStatus !== 'youth') {
      p.lineupStatus = 'reserve';
      p.pitchPosition = undefined;
    }
  }

  // Prefer available (not injured, not suspended, not exhausted) players
  const seniorPool = players.filter(p => p.lineupStatus !== 'youth');
  const availablePool = seniorPool.filter(p => !p.isInjured && !p.cards?.suspended);
  const candidatePool = availablePool.length >= 11 ? availablePool : seniorPool;

  const usedIds = new Set<number>();

  // Greedily assign best fit player for each slot
  for (const slot of slots) {
    let bestPlayer: Player | null = null;
    let bestScore = -999;

    for (const p of candidatePool) {
      if (usedIds.has(p.id!)) continue;
      const spec = getSpecificPosition(p);
      const penalty = getPositionalPenalty(p.position, slot.slotType, slot.label, spec, p.secondaryPositions);
      const fatiguePenalty = (p.fatigue || 0) > 75 ? ((p.fatigue || 0) - 75) * 0.25 : 0;
      const exactSpecBonus = spec === slot.label ? 3.5 : (p.secondaryPositions?.includes(slot.label) ? 2 : 0);
      const score = p.overall - penalty * 1.4 - fatiguePenalty + exactSpecBonus;

      if (score > bestScore) {
        bestScore = score;
        bestPlayer = p;
      }
    }

    if (bestPlayer) {
      bestPlayer.lineupStatus = 'starter';
      bestPlayer.pitchPosition = slot.id;
      usedIds.add(bestPlayer.id!);
    }
  }

  // Set next 7 best remaining healthy players as bench
  const remainingNonStarters = seniorPool
    .filter(p => p.lineupStatus !== 'starter')
    .sort((a, b) => {
      const availA = (!a.isInjured && !a.cards?.suspended) ? 1 : 0;
      const availB = (!b.isInjured && !b.cards?.suspended) ? 1 : 0;
      return availB - availA || b.overall - a.overall;
    });

  // Ensure at least 1 backup GK on bench if available
  const backupGK = remainingNonStarters.find(p => p.position === 'POR');
  const benchIds = new Set<number>();
  if (backupGK && backupGK.id) {
    backupGK.lineupStatus = 'bench';
    benchIds.add(backupGK.id);
  }

  for (const p of remainingNonStarters) {
    if (benchIds.size >= 7) break;
    if (p.id && !benchIds.has(p.id)) {
      p.lineupStatus = 'bench';
      benchIds.add(p.id);
    }
  }

  await db.players.bulkPut(players);

  // Update team overall, chemistry, and specialists
  if (team) {
    const starters = players.filter(p => p.lineupStatus === 'starter');
    if (starters.length > 0) {
      const avgOvr = Math.round(starters.reduce((sum, p) => sum + p.overall, 0) / starters.length);
      team.overall = avgOvr;
    }
    team.formation = formationKey;
    team.teamChemistry = calculateTeamChemistry(starters, team).score;
    const specs = assignSpecialistsForSquad(players, team);
    team.captainId = specs.captainId;
    team.penaltyTakerId = specs.penaltyTakerId;
    team.freeKickTakerId = specs.freeKickTakerId;
    team.cornerTakerId = specs.cornerTakerId;
    await db.teams.put(team);
  }

  return players;
}

export async function checkLineupReady(teamId: number): Promise<boolean> {
  const players = await db.players.where('teamId').equals(teamId).toArray();
  const starters = players.filter(p => p.lineupStatus === 'starter' && !p.isInjured && !p.cards?.suspended);
  return starters.length === 11;
}
