import { type Player, type Team } from '../db/db';

export interface TacticalPartnership {
  zoneName: string;
  player1Name: string;
  player2Name: string;
  matchesTogether: number;
  synergyBonus: number;
}

export interface ChemistryResult {
  score: number; // 0 to 100
  label: 'Excelente' | 'Buena' | 'Aceptable' | 'Baja' | 'Tóxica';
  color: string;
  details: {
    nationalityBonus: number;
    moraleBonus: number;
    unhappyPenalty: number;
    cohesionBonus: number;
    partnershipBonus: number;
  };
  activePartnerships: TacticalPartnership[];
}

export function getPairKey(id1: number, id2: number): string {
  return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
}

export function calculateTeamChemistry(starters: Player[], team?: Team): ChemistryResult {
  if (!starters || starters.length === 0) {
    return {
      score: 50,
      label: 'Aceptable',
      color: '#eab308',
      details: { nationalityBonus: 0, moraleBonus: 25, unhappyPenalty: 0, cohesionBonus: 25, partnershipBonus: 0 },
      activePartnerships: []
    };
  }

  // 1. Nationality synergy: count repeated countries among starters
  const countryCounts: Record<string, number> = {};
  starters.forEach(p => {
    const country = p.bio?.country || 'España';
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  let nationalityMatches = 0;
  Object.values(countryCounts).forEach(count => {
    if (count > 1) {
      nationalityMatches += (count - 1) * 5;
    }
  });
  const nationalityBonus = Math.min(26, nationalityMatches);

  // 2. Average Morale (0 - 32 points)
  const avgMorale = starters.reduce((acc, p) => acc + (p.morale ?? 80), 0) / starters.length;
  const moraleBonus = Math.round((avgMorale / 100) * 32);

  // 3. Unhappy / Transfer Demanding penalties
  const unhappyCount = starters.filter(p => p.unhappy || p.transferRequest).length;
  const unhappyPenalty = unhappyCount * 8;

  // 4. Tactical Style & Prestige Cohesion (15 - 30 points)
  const baseCohesion = team?.tacticalStyle ? 22 : 14;
  const boardBonus = ((team?.boardConfidence ?? 80) / 100) * 8;
  const cohesionBonus = Math.round(baseCohesion + boardBonus);

  // 5. Dynamic On-Pitch Partnerships (Center-Back Duo, Midfield Pivot, Flank Duos, Strike Partnership)
  const activePartnerships: TacticalPartnership[] = [];
  const pMap = team?.partnerships || {};

  const checkZonePair = (zoneName: string, p1?: Player, p2?: Player) => {
    if (!p1?.id || !p2?.id || p1.id === p2.id) return;
    const key = getPairKey(p1.id, p2.id);
    const sharedGames = pMap[key] || Math.min(p1.stats?.gamesPlayed || 0, p2.stats?.gamesPlayed || 0);
    const sameCountry = p1.bio?.country && p1.bio.country === p2.bio?.country;
    const bonus = Math.min(5, Math.floor(sharedGames / 3) + (sameCountry ? 2 : 1));
    if (sharedGames >= 2 || sameCountry) {
      activePartnerships.push({
        zoneName,
        player1Name: p1.name,
        player2Name: p2.name,
        matchesTogether: sharedGames,
        synergyBonus: bonus
      });
    }
  };

  const cbs = starters.filter(p => p.pitchPosition?.startsWith('CB') || p.specificPosition === 'DFC');
  if (cbs.length >= 2) checkZonePair('Pareja de Centrales', cbs[0], cbs[1]);

  const mids = starters.filter(p => p.position === 'MED');
  if (mids.length >= 2) checkZonePair('Sociedad de Mediocampo', mids[0], mids[1]);

  const leftSide = starters.filter(p => ['LB', 'LWB', 'LW', 'LM', 'LAM'].includes(p.pitchPosition || '') || ['LI', 'EI', 'MI'].includes(p.specificPosition || ''));
  if (leftSide.length >= 2) checkZonePair('Tándem Banda Izquierda', leftSide[0], leftSide[1]);

  const rightSide = starters.filter(p => ['RB', 'RWB', 'RW', 'RM', 'RAM'].includes(p.pitchPosition || '') || ['LD', 'ED', 'MD'].includes(p.specificPosition || ''));
  if (rightSide.length >= 2) checkZonePair('Tándem Banda Derecha', rightSide[0], rightSide[1]);

  const fwds = starters.filter(p => p.position === 'DEL');
  if (fwds.length >= 2) checkZonePair('Dupla de Ataque', fwds[0], fwds[1]);

  const partnershipBonus = Math.min(14, activePartnerships.reduce((sum, ap) => sum + ap.synergyBonus, 0));

  // Final score bounded between 10 and 100
  const rawScore = nationalityBonus + moraleBonus + cohesionBonus + partnershipBonus - unhappyPenalty;
  const score = Math.max(10, Math.min(100, Math.round(rawScore)));

  let label: ChemistryResult['label'] = 'Aceptable';
  let color = '#eab308';

  if (score >= 85) {
    label = 'Excelente';
    color = '#10b981';
  } else if (score >= 70) {
    label = 'Buena';
    color = '#38bdf8';
  } else if (score >= 50) {
    label = 'Aceptable';
    color = '#eab308';
  } else if (score >= 35) {
    label = 'Baja';
    color = '#f97316';
  } else {
    label = 'Tóxica';
    color = '#ef4444';
  }

  return {
    score,
    label,
    color,
    details: {
      nationalityBonus,
      moraleBonus,
      unhappyPenalty,
      cohesionBonus,
      partnershipBonus
    },
    activePartnerships
  };
}
