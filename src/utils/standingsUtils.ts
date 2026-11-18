import { type Team, type Match } from '../db/db';

export const SECOND_DIVISION_CLUBS: Record<string, { name: string; overall: number; budget: number; pri: string; sec: string }[]> = {
  'LaLiga': [
    { name: 'Real Zaragoza', overall: 74, budget: 24000000, pri: '#ffffff', sec: '#0033a0' },
    { name: 'Sporting de Gijón', overall: 74, budget: 23000000, pri: '#e30613', sec: '#ffffff' },
    { name: 'Racing de Santander', overall: 75, budget: 25000000, pri: '#00843d', sec: '#ffffff' },
    { name: 'UD Almería', overall: 75, budget: 28000000, pri: '#e30613', sec: '#ffffff' },
    { name: 'Granada CF', overall: 74, budget: 26000000, pri: '#a6192e', sec: '#ffffff' },
    { name: 'Elche CF', overall: 74, budget: 24000000, pri: '#ffffff', sec: '#00843d' },
    { name: 'Deportivo La Coruña', overall: 74, budget: 25000000, pri: '#0033a0', sec: '#ffffff' },
    { name: 'Málaga CF', overall: 73, budget: 23000000, pri: '#38bdf8', sec: '#ffffff' }
  ],
  'Premier League': [
    { name: 'Leeds United', overall: 77, budget: 55000000, pri: '#ffffff', sec: '#ffdd00' },
    { name: 'Burnley FC', overall: 76, budget: 50000000, pri: '#6c1d45', sec: '#99d6ea' },
    { name: 'Sheffield United', overall: 75, budget: 48000000, pri: '#ee2737', sec: '#ffffff' },
    { name: 'Sunderland AFC', overall: 75, budget: 46000000, pri: '#eb172b', sec: '#ffffff' },
    { name: 'Middlesbrough FC', overall: 74, budget: 42000000, pri: '#e11b22', sec: '#ffffff' },
    { name: 'Coventry City', overall: 74, budget: 40000000, pri: '#59cbe8', sec: '#ffffff' }
  ],
  'Serie A': [
    { name: 'US Sassuolo', overall: 75, budget: 32000000, pri: '#00a651', sec: '#000000' },
    { name: 'UC Sampdoria', overall: 74, budget: 30000000, pri: '#0055b8', sec: '#ffffff' },
    { name: 'Palermo FC', overall: 75, budget: 35000000, pri: '#f7b5cd', sec: '#000000' },
    { name: 'Empoli FC', overall: 74, budget: 28000000, pri: '#0057b8', sec: '#ffffff' },
    { name: 'AC Monza', overall: 74, budget: 30000000, pri: '#e30613', sec: '#ffffff' },
    { name: 'Venezia FC', overall: 73, budget: 26000000, pri: '#000000', sec: '#f97316' }
  ],
  'Bundesliga': [
    { name: 'FC Schalke 04', overall: 75, budget: 36000000, pri: '#004d9d', sec: '#ffffff' },
    { name: 'Hertha BSC', overall: 74, budget: 34000000, pri: '#005ca9', sec: '#ffffff' },
    { name: 'Fortuna Düsseldorf', overall: 74, budget: 30000000, pri: '#da291c', sec: '#ffffff' },
    { name: '1. FC Kaiserslautern', overall: 73, budget: 28000000, pri: '#c8102e', sec: '#ffffff' },
    { name: 'Hannover 96', overall: 74, budget: 30000000, pri: '#12711c', sec: '#ffffff' }
  ],
  'Ligue 1': [
    { name: 'AS Saint-Étienne', overall: 75, budget: 32000000, pri: '#00843d', sec: '#ffffff' },
    { name: 'Girondins de Bordeaux', overall: 74, budget: 28000000, pri: '#001a4b', sec: '#ffffff' },
    { name: 'SM Caen', overall: 73, budget: 24000000, pri: '#002b66', sec: '#e30613' },
    { name: 'SC Bastia', overall: 72, budget: 22000000, pri: '#0055a5', sec: '#ffffff' }
  ],
  'Liga Profesional': [
    { name: 'Colón de Santa Fe', overall: 72, budget: 22000000, pri: '#e30613', sec: '#000000' },
    { name: 'Unión de Santa Fe', overall: 72, budget: 22000000, pri: '#e30613', sec: '#ffffff' },
    { name: 'Gimnasia y Esgrima LP', overall: 72, budget: 23000000, pri: '#ffffff', sec: '#00205b' },
    { name: 'CA Tigre', overall: 72, budget: 22000000, pri: '#00205b', sec: '#e30613' },
    { name: 'CA Platense', overall: 71, budget: 20000000, pri: '#634735', sec: '#ffffff' }
  ]
};

export function sortStandingsWithTiebreakers(
  teams: Team[],
  playedLeagueMatches?: Match[],
  leagueName?: string
): Team[] {
  const usesH2HFirst =
    !leagueName ||
    leagueName.includes('LaLiga') ||
    leagueName.includes('Serie A') ||
    leagueName.includes('Champions');

  // Pre-build H2H lookup if matches are provided
  const h2hMap = new Map<string, { ptsA: number; ptsB: number; gdA: number }>();
  if (playedLeagueMatches && playedLeagueMatches.length > 0) {
    for (const m of playedLeagueMatches) {
      if (!m.isPlayed || m.type !== 'league') continue;
      const minId = Math.min(m.homeTeamId, m.awayTeamId);
      const maxId = Math.max(m.homeTeamId, m.awayTeamId);
      const key = `${minId}_${maxId}`;
      const rec = h2hMap.get(key) || { ptsA: 0, ptsB: 0, gdA: 0 };

      const homeIsMin = m.homeTeamId === minId;
      const diff = m.homeScore - m.awayScore;
      rec.gdA += homeIsMin ? diff : -diff;

      if (m.homeScore > m.awayScore) {
        if (homeIsMin) rec.ptsA += 3;
        else rec.ptsB += 3;
      } else if (m.awayScore > m.homeScore) {
        if (homeIsMin) rec.ptsB += 3;
        else rec.ptsA += 3;
      } else {
        rec.ptsA += 1;
        rec.ptsB += 1;
      }
      h2hMap.set(key, rec);
    }
  }

  return [...teams].sort((a, b) => {
    const ptsA = a.wins * 3 + a.draws;
    const ptsB = b.wins * 3 + b.draws;
    if (ptsB !== ptsA) return ptsB - ptsA;

    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;

    if (usesH2HFirst && a.id && b.id && h2hMap.size > 0) {
      const minId = Math.min(a.id, b.id);
      const maxId = Math.max(a.id, b.id);
      const rec = h2hMap.get(`${minId}_${maxId}`);
      if (rec) {
        const aIsMin = a.id === minId;
        const h2hPtsA = aIsMin ? rec.ptsA : rec.ptsB;
        const h2hPtsB = aIsMin ? rec.ptsB : rec.ptsA;
        if (h2hPtsB !== h2hPtsA) return h2hPtsB - h2hPtsA;

        const h2hGdA = aIsMin ? rec.gdA : -rec.gdA;
        if (h2hGdA !== 0) return -h2hGdA;
      }
    }

    return gdB - gdA || b.goalsFor - a.goalsFor || b.overall - a.overall;
  });
}
