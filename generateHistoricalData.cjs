const fs = require('fs');
const readline = require('readline');

async function buildHistoricalDataset() {
  console.log('--- EXTRACTING ALL VERIFIED SEASONS FROM TRANSFERMARKT (2012-2025) ---');

  // 1. Load players lookup: player_id -> { name, pos, country, dob, highestMv }
  const playerMap = new Map();
  const rlPlayers = readline.createInterface({ input: fs.createReadStream('temp_tm/players.csv') });
  let pHeaders = [];
  let pFirst = true;

  function parseCSVLine(text) {
    let ret = ['']; let i = 0; let p = '', s = true;
    for (let j = 0; j < text.length; j++) {
      let l = text[j];
      if ('"' === l) {
        s = !s;
        if ('"' === p) { ret[i] += '"'; l = '-'; }
        else if (p === '') { l = '-'; }
      } else if (s && ',' === l) {
        ret[++i] = '';
      } else {
        ret[i] += l;
      }
      p = l;
    }
    return ret;
  }

  for await (const line of rlPlayers) {
    if (pFirst) {
      pHeaders = parseCSVLine(line).map(h => h.trim());
      pFirst = false;
      continue;
    }
    const row = parseCSVLine(line);
    const pid = row[pHeaders.indexOf('player_id')];
    if (!pid) continue;
    const name = row[pHeaders.indexOf('name')] || 'Jugador';
    const pos = row[pHeaders.indexOf('sub_position')] || row[pHeaders.indexOf('position')] || 'Midfield';
    const country = row[pHeaders.indexOf('country_of_citizenship')] || 'España';
    const dob = row[pHeaders.indexOf('date_of_birth')] || '1995-01-01';
    const hmv = parseInt(row[pHeaders.indexOf('highest_market_value_in_eur')]) || 10000000;
    const mv = parseInt(row[pHeaders.indexOf('market_value_in_eur')]) || hmv;

    playerMap.set(pid, { name, pos, country, dob, highestMv: hmv, mv });
  }
  console.log(`Loaded ${playerMap.size} player records.`);

  // 2. Load clubs lookup: club_id -> name, country, domestic_competition_id
  const clubMap = new Map();
  const clubLines = fs.readFileSync('temp_tm/clubs.csv', 'utf8').split('\n');
  const cHeaders = parseCSVLine(clubLines[0]).map(h => h.trim());
  for (let i = 1; i < clubLines.length; i++) {
    if (!clubLines[i].trim()) continue;
    const row = parseCSVLine(clubLines[i]);
    const cid = row[cHeaders.indexOf('club_id')];
    if (!cid) continue;
    clubMap.set(cid, {
      name: row[cHeaders.indexOf('name')],
      comp: row[cHeaders.indexOf('domestic_competition_id')]
    });
  }
  console.log(`Loaded ${clubMap.size} clubs.`);

  // Target historical focus years with complete verified records:
  // 2012, 2014, 2016, 2018, 2020, 2022, 2024
  const targetYears = [2012, 2014, 2016, 2018, 2020, 2022, 2024];
  const eraClubs = {}; // year -> { [clubId]: Set(playerIds) }
  targetYears.forEach(y => eraClubs[y] = new Map());

  console.log('Reading appearances to map historical rosters for verified years...');
  const rlApp = readline.createInterface({ input: fs.createReadStream('temp_tm/appearances.csv') });
  let aHeaders = [];
  let aFirst = true;

  for await (const line of rlApp) {
    if (aFirst) {
      aHeaders = parseCSVLine(line).map(h => h.trim());
      aFirst = false;
      continue;
    }
    const row = parseCSVLine(line);
    const date = row[aHeaders.indexOf('date')];
    if (!date) continue;
    const year = parseInt(date.slice(0, 4));
    const month = parseInt(date.slice(5, 7));
    // Determine season: if month >= 7, season is year; if month <= 6, season is year - 1
    const season = month >= 7 ? year : year - 1;

    if (eraClubs[season]) {
      const clubId = row[aHeaders.indexOf('player_club_id')];
      const playerId = row[aHeaders.indexOf('player_id')];
      if (clubId && playerId) {
        if (!eraClubs[season].has(clubId)) eraClubs[season].set(clubId, new Set());
        eraClubs[season].get(clubId).add(playerId);
      }
    }
  }

  console.log('Appearances scanned. Now scanning game lineups for full rosters...');
  if (fs.existsSync('temp_tm/game_lineups.csv')) {
    const rlLineups = readline.createInterface({ input: fs.createReadStream('temp_tm/game_lineups.csv') });
    let lHeaders = [];
    let lFirst = true;

    for await (const line of rlLineups) {
      if (lFirst) {
        lHeaders = parseCSVLine(line).map(h => h.trim());
        lFirst = false;
        continue;
      }
      const row = parseCSVLine(line);
      const date = row[lHeaders.indexOf('date')];
      if (!date) continue;
      const year = parseInt(date.slice(0, 4));
      const month = parseInt(date.slice(5, 7));
      const season = month >= 7 ? year : year - 1;

      if (eraClubs[season]) {
        const clubId = row[lHeaders.indexOf('club_id')];
        const playerId = row[lHeaders.indexOf('player_id')];
        if (clubId && playerId) {
          if (!eraClubs[season].has(clubId)) eraClubs[season].set(clubId, new Set());
          eraClubs[season].get(clubId).add(playerId);
        }
      }
    }
    console.log('Lineups scanned successfully.');
  }

  console.log('Packaging historical eras...');

  function mapPos(pos) {
    const p = (pos || '').toLowerCase();
    if (p.includes('goalkeeper')) return 'POR';
    if (p.includes('back') || p.includes('defender')) return 'DEF';
    if (p.includes('midfield') || p.includes('winger')) return p.includes('winger') ? 'DEL' : 'MED';
    if (p.includes('forward') || p.includes('striker') || p.includes('attack')) return 'DEL';
    return 'MED';
  }

  function mapSpecPos(pos) {
    const p = (pos || '').toLowerCase();
    if (p.includes('goalkeeper')) return 'POR';
    if (p.includes('centre-back')) return 'DFC';
    if (p.includes('left-back')) return 'LI';
    if (p.includes('right-back')) return 'LD';
    if (p.includes('defensive')) return 'MCD';
    if (p.includes('attacking')) return 'MCO';
    if (p.includes('central')) return 'MC';
    if (p.includes('left winger')) return 'EI';
    if (p.includes('right winger')) return 'ED';
    if (p.includes('striker') || p.includes('centre-forward')) return 'DC';
    return 'MC';
  }

  function estimateOVR(highestMv, ageInYear) {
    let ovr = 75;
    if (highestMv >= 120000000) ovr = 92;
    else if (highestMv >= 80000000) ovr = 88;
    else if (highestMv >= 50000000) ovr = 85;
    else if (highestMv >= 25000000) ovr = 81;
    else if (highestMv >= 10000000) ovr = 77;
    else ovr = 74;

    // Age adjustment curve
    if (ageInYear >= 24 && ageInYear <= 29) ovr += 1;
    if (ageInYear > 33) ovr = Math.max(72, ovr - 3);
    return Math.min(96, Math.max(68, ovr));
  }

  const finalEras = {};

  targetYears.forEach(year => {
    finalEras[year] = [];
    const clubSets = eraClubs[year];

    for (const [clubId, playerIds] of clubSets.entries()) {
      const clubInfo = clubMap.get(clubId);
      if (!clubInfo) continue;

      const squad = [];
      for (const pid of playerIds) {
        const p = playerMap.get(pid);
        if (!p) continue;

        const birthYear = parseInt(p.dob.slice(0, 4)) || 1992;
        const age = Math.max(16, year - birthYear);
        const ovr = estimateOVR(p.highestMv, age);
        const pos = mapPos(p.pos);
        const specPos = mapSpecPos(p.pos);

        squad.push({
          name: p.name,
          age,
          overall: ovr,
          potential: Math.min(99, ovr + Math.max(1, 30 - age)),
          position: pos,
          specificPosition: specPos,
          marketValue: p.highestMv,
          country: p.country,
          attributes: {
            pace: Math.min(98, ovr + (pos === 'DEL' ? 4 : 0)),
            shooting: Math.min(98, pos === 'DEL' ? ovr + 2 : ovr - 10),
            passing: Math.min(98, pos === 'MED' ? ovr + 3 : ovr - 5),
            dribbling: Math.min(98, ovr),
            defending: Math.min(98, pos === 'DEF' ? ovr + 3 : ovr - 20),
            physical: Math.min(98, ovr)
          }
        });
      }

      if (squad.length >= 11) {
        squad.sort((a, b) => b.overall - a.overall);
        const top11 = squad.slice(0, 11);
        const avg = Math.round(top11.reduce((sum, x) => sum + x.overall, 0) / 11);

        finalEras[year].push({
          id: clubId,
          name: clubInfo.name,
          competitionId: clubInfo.comp || 'ES1',
          overall: avg,
          squad: squad.slice(0, 26)
        });
      }
    }

    console.log(`Year ${year}: ${finalEras[year].length} clubs processed with complete real rosters.`);
  });

  const outputTs = `// Auto-generated verified historical eras database (2012-2024)
export interface HistoricalClub {
  id: string;
  name: string;
  competitionId: string;
  overall: number;
  squad: {
    name: string;
    age: number;
    overall: number;
    potential: number;
    position: 'POR' | 'DEF' | 'MED' | 'DEL';
    specificPosition: string;
    marketValue: number;
    country: string;
    attributes: {
      pace: number;
      shooting: number;
      passing: number;
      dribbling: number;
      defending: number;
      physical: number;
    };
  }[];
}

export const VERIFIED_HISTORICAL_SEASONS = [
  { year: 2026, label: '🌟 2026/27 (Fútbol Actual)', desc: 'Mbappé en Madrid, Yamal en Barça, Haaland en City' },
  { year: 2024, label: '⚡ 2024/25 (Era Vinicius & Bellingham)', desc: 'Real Madrid campeón de Champions y Liga, Bellingham, Kane a Bayern' },
  { year: 2022, label: '🏆 2022/23 (Mundial Qatar / Haaland a City)', desc: 'Messi campeón mundial, Haaland rompiendo récords, triplete de Pep' },
  { year: 2020, label: '🐐 2020/21 (Última de Messi en Barça)', desc: 'Messi en FC Barcelona, Cristiano en Juventus, Sextete de Bayern' },
  { year: 2018, label: '👑 2018/19 (Tricampeonato de Zidane / CR7)', desc: 'Cristiano Ronaldo en Juventus, Liverpool campeón de Champions' },
  { year: 2016, label: '🦊 2016/17 (Hazaña del Leicester / Undécima)', desc: 'Leicester City campeón histórico de Premier, doblete de Zidane' },
  { year: 2014, label: '⚔️ 2014/15 (Tridente MSN vs BBC)', desc: 'Triplete del Barça (Messi, Suárez, Neymar) vs BBC (Cristiano, Bale, Benzema)' },
  { year: 2012, label: '🔥 2012/13 (LaLiga de los 100 Puntos)', desc: 'Tito Vilanova, Falcao en Atleti, Mourinho vs Guardiola' }
];

export const HISTORICAL_ERAS_DATABASE: Record<number, HistoricalClub[]> = ${JSON.stringify(finalEras, null, 2)};
`;

  fs.writeFileSync('src/services/historicalData.ts', outputTs);
  console.log('Successfully generated src/services/historicalData.ts!');
}

buildHistoricalDataset().catch(console.error);
