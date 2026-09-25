import { type Player, type Team } from '../db/db';

export interface ChemistryResult {
  score: number; // 0 to 100
  label: 'Excelente' | 'Buena' | 'Aceptable' | 'Baja' | 'Tóxica';
  color: string;
  details: {
    nationalityBonus: number;
    moraleBonus: number;
    unhappyPenalty: number;
    cohesionBonus: number;
  };
}

export function calculateTeamChemistry(starters: Player[], team?: Team): ChemistryResult {
  if (!starters || starters.length === 0) {
    return {
      score: 50,
      label: 'Aceptable',
      color: '#eab308',
      details: { nationalityBonus: 0, moraleBonus: 25, unhappyPenalty: 0, cohesionBonus: 25 }
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
      nationalityMatches += (count - 1) * 6; // pairs give synergy
    }
  });
  const nationalityBonus = Math.min(30, nationalityMatches);

  // 2. Average Morale (0 - 35 points)
  const avgMorale = starters.reduce((acc, p) => acc + (p.morale ?? 80), 0) / starters.length;
  const moraleBonus = Math.round((avgMorale / 100) * 35);

  // 3. Unhappy / Transfer Demanding penalties
  const unhappyCount = starters.filter(p => p.unhappy || p.transferRequest).length;
  const unhappyPenalty = unhappyCount * 8; // -8 per unhappy starter

  // 4. Tactical Style & Prestige Cohesion (15 - 35 points)
  const baseCohesion = team?.tacticalStyle ? 25 : 15;
  const boardBonus = ((team?.boardConfidence ?? 80) / 100) * 10;
  const cohesionBonus = Math.round(baseCohesion + boardBonus);

  // Final score bounded between 10 and 100
  const rawScore = nationalityBonus + moraleBonus + cohesionBonus - unhappyPenalty;
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
      cohesionBonus
    }
  };
}
