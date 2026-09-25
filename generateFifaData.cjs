const fs = require('fs');
const readline = require('readline');

// Mapping of EA FC CSV 'Team' field to our rich club definitions
const teamConfigs = [
  // --- LALIGA EA SPORTS ---
  {
    csvNames: ['Real Madrid'],
    name: 'Real Madrid',
    aliases: ['real madrid', 'madrid', 'los blancos', 'rm'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 250000000,
    primaryColor: '#ffffff',
    secondaryColor: '#f59e0b',
    pattern: 'solid'
  },
  {
    csvNames: ['FC Barcelona'],
    name: 'FC Barcelona',
    aliases: ['fc barcelona', 'barcelona', 'barca', 'blaugrana', 'fcb'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 150000000,
    primaryColor: '#004d98',
    secondaryColor: '#a50044',
    pattern: 'stripes'
  },
  {
    csvNames: ['Atlético de Madrid', 'Atlético Madrid'],
    name: 'Atlético de Madrid',
    aliases: ['atlético de madrid', 'atletico de madrid', 'atletico madrid', 'atleti', 'colchoneros', 'atm'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 120000000,
    primaryColor: '#cb3524',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['Athletic Club'],
    name: 'Athletic Club',
    aliases: ['athletic club', 'athletic club de bilbao', 'bilbao', 'athletic'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 70000000,
    primaryColor: '#ee2524',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['Real Sociedad'],
    name: 'Real Sociedad',
    aliases: ['real sociedad', 'la real', 'sociedad'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 65000000,
    primaryColor: '#0067b1',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['Real Betis'],
    name: 'Real Betis',
    aliases: ['real betis', 'betis', 'real betis balompié', 'beticos'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 55000000,
    primaryColor: '#0bb364',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['Villarreal CF'],
    name: 'Villarreal CF',
    aliases: ['villarreal cf', 'villarreal', 'submarino amarillo'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 60000000,
    primaryColor: '#ffe600',
    secondaryColor: '#00519e',
    pattern: 'solid'
  },
  {
    csvNames: ['Valencia CF'],
    name: 'Valencia CF',
    aliases: ['valencia cf', 'valencia', 'los che'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 50000000,
    primaryColor: '#ffffff',
    secondaryColor: '#000000',
    pattern: 'solid'
  },
  {
    csvNames: ['Sevilla FC'],
    name: 'Sevilla FC',
    aliases: ['sevilla fc', 'sevilla', 'palangana'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 55000000,
    primaryColor: '#ffffff',
    secondaryColor: '#d4001f',
    pattern: 'solid'
  },
  {
    csvNames: ['Girona FC'],
    name: 'Girona FC',
    aliases: ['girona fc', 'girona', 'gironins'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 50000000,
    primaryColor: '#d62718',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['CA Osasuna'],
    name: 'CA Osasuna',
    aliases: ['ca osasuna', 'osasuna', 'rojillos'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 35000000,
    primaryColor: '#c8102e',
    secondaryColor: '#00205b',
    pattern: 'solid'
  },
  {
    csvNames: ['Celta', 'RC Celta'],
    name: 'Celta de Vigo',
    aliases: ['celta', 'celta de vigo', 'rc celta', 'celestes'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 35000000,
    primaryColor: '#87ceeb',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['Rayo Vallecano'],
    name: 'Rayo Vallecano',
    aliases: ['rayo vallecano', 'rayo', 'franjirrojos'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 30000000,
    primaryColor: '#ffffff',
    secondaryColor: '#de002b',
    pattern: 'diagonal'
  },
  {
    csvNames: ['RCD Mallorca'],
    name: 'RCD Mallorca',
    aliases: ['rcd mallorca', 'mallorca', 'bermellones'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 32000000,
    primaryColor: '#e20613',
    secondaryColor: '#000000',
    pattern: 'solid'
  },
  {
    csvNames: ['Getafe CF'],
    name: 'Getafe CF',
    aliases: ['getafe cf', 'getafe', 'azulones'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 30000000,
    primaryColor: '#00529f',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['D. Alavés', 'Deportivo Alavés'],
    name: 'Deportivo Alavés',
    aliases: ['d. alavés', 'deportivo alavés', 'alaves', 'babazorros'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 28000000,
    primaryColor: '#0055b8',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['RCD Espanyol'],
    name: 'RCD Espanyol',
    aliases: ['rcd espanyol', 'espanyol', 'pericos'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 30000000,
    primaryColor: '#007fc8',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['UD Las Palmas'],
    name: 'UD Las Palmas',
    aliases: ['ud las palmas', 'las palmas', 'pío-pío'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 28000000,
    primaryColor: '#f4ce14',
    secondaryColor: '#004fa3',
    pattern: 'solid'
  },
  {
    csvNames: ['CD Leganés'],
    name: 'CD Leganés',
    aliases: ['cd leganés', 'leganes', 'pepineros'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 26000000,
    primaryColor: '#005ba6',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['R. Valladolid CF'],
    name: 'Real Valladolid',
    aliases: ['r. valladolid cf', 'real valladolid', 'valladolid', 'pucela'],
    domesticLeague: 'LaLiga',
    country: 'España',
    budget: 27000000,
    primaryColor: '#5a2d82',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },

  // --- PREMIER LEAGUE ---
  {
    csvNames: ['Manchester City'],
    name: 'Manchester City',
    aliases: ['manchester city', 'man city', 'city', 'citizens', 'mcfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 260000000,
    primaryColor: '#6cabdd',
    secondaryColor: '#1c2c5b',
    pattern: 'solid'
  },
  {
    csvNames: ['Arsenal'],
    name: 'Arsenal FC',
    aliases: ['arsenal', 'arsenal fc', 'gunners', 'afc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 180000000,
    primaryColor: '#ef0107',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['Liverpool'],
    name: 'Liverpool FC',
    aliases: ['liverpool', 'liverpool fc', 'reds', 'lfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 190000000,
    primaryColor: '#c8102e',
    secondaryColor: '#00b2a9',
    pattern: 'solid'
  },
  {
    csvNames: ['Chelsea'],
    name: 'Chelsea FC',
    aliases: ['chelsea', 'chelsea fc', 'blues', 'cfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 200000000,
    primaryColor: '#034694',
    secondaryColor: '#ee242c',
    pattern: 'solid'
  },
  {
    csvNames: ['Man Utd', 'Manchester United', 'Manchester Utd'],
    name: 'Manchester United',
    aliases: ['man utd', 'manchester united', 'red devils', 'mufc', 'united'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 190000000,
    primaryColor: '#da291c',
    secondaryColor: '#fbe122',
    pattern: 'solid'
  },
  {
    csvNames: ['Spurs', 'Tottenham Hotspur'],
    name: 'Tottenham Hotspur',
    aliases: ['spurs', 'tottenham', 'tottenham hotspur', 'thfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 140000000,
    primaryColor: '#132257',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['Newcastle Utd', 'Newcastle United'],
    name: 'Newcastle United',
    aliases: ['newcastle utd', 'newcastle united', 'magpies', 'nufc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 160000000,
    primaryColor: '#241f20',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['Aston Villa'],
    name: 'Aston Villa',
    aliases: ['aston villa', 'villa', 'villans', 'avfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 110000000,
    primaryColor: '#95bfe5',
    secondaryColor: '#670e36',
    pattern: 'solid'
  },
  {
    csvNames: ['Brighton'],
    name: 'Brighton & Hove Albion',
    aliases: ['brighton', 'brighton & hove albion', 'seagulls', 'bha'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 95000000,
    primaryColor: '#0057b8',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['West Ham'],
    name: 'West Ham United',
    aliases: ['west ham', 'west ham united', 'hammers', 'whufc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 85000000,
    primaryColor: '#7a263a',
    secondaryColor: '#1bb1e7',
    pattern: 'solid'
  },
  {
    csvNames: ['Everton'],
    name: 'Everton FC',
    aliases: ['everton', 'everton fc', 'toffees', 'efc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 70000000,
    primaryColor: '#003399',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['Fulham'],
    name: 'Fulham FC',
    aliases: ['fulham', 'fulham fc', 'cottagers', 'ffc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 65000000,
    primaryColor: '#ffffff',
    secondaryColor: '#000000',
    pattern: 'solid'
  },
  {
    csvNames: ['Wolves'],
    name: 'Wolverhampton Wanderers',
    aliases: ['wolves', 'wolverhampton', 'wolverhampton wanderers', 'wwfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 65000000,
    primaryColor: '#fdb913',
    secondaryColor: '#231f20',
    pattern: 'solid'
  },
  {
    csvNames: ['Brentford'],
    name: 'Brentford FC',
    aliases: ['brentford', 'brentford fc', 'bees', 'bfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 65000000,
    primaryColor: '#e30613',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['Crystal Palace'],
    name: 'Crystal Palace',
    aliases: ['crystal palace', 'palace', 'eagles', 'cpfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 60000000,
    primaryColor: '#1b458f',
    secondaryColor: '#c4122e',
    pattern: 'stripes'
  },
  {
    csvNames: ['AFC Bournemouth'],
    name: 'AFC Bournemouth',
    aliases: ['afc bournemouth', 'bournemouth', 'cherries'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 55000000,
    primaryColor: '#da291c',
    secondaryColor: '#000000',
    pattern: 'stripes'
  },
  {
    csvNames: ["Nott'm Forest"],
    name: 'Nottingham Forest',
    aliases: ["nott'm forest", 'nottingham forest', 'forest', 'tricky trees'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 65000000,
    primaryColor: '#dd0000',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['Leicester City'],
    name: 'Leicester City',
    aliases: ['leicester city', 'leicester', 'foxes', 'lcfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 60000000,
    primaryColor: '#0053a0',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['Ipswich'],
    name: 'Ipswich Town',
    aliases: ['ipswich town', 'ipswich', 'tractor boys', 'itfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 45000000,
    primaryColor: '#003399',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['Southampton'],
    name: 'Southampton FC',
    aliases: ['southampton fc', 'southampton', 'saints', 'sfc'],
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    budget: 50000000,
    primaryColor: '#d4001f',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },

  // --- SERIE A ---
  {
    csvNames: ['Juventus'],
    name: 'Juventus',
    aliases: ['juventus', 'juve', 'bianconeri'],
    domesticLeague: 'Serie A',
    country: 'Italia',
    budget: 130000000,
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    pattern: 'stripes'
  },
  {
    csvNames: ['Lombardia FC', 'Inter'],
    name: 'Inter',
    aliases: ['inter', 'inter de milan', 'internazionale', 'nerazzurri', 'lombardia fc'],
    domesticLeague: 'Serie A',
    country: 'Italia',
    budget: 120000000,
    primaryColor: '#0066b2',
    secondaryColor: '#000000',
    pattern: 'stripes'
  },
  {
    csvNames: ['Milano FC', 'Milan'],
    name: 'AC Milan',
    aliases: ['ac milan', 'milan', 'rossoneri', 'milano fc'],
    domesticLeague: 'Serie A',
    country: 'Italia',
    budget: 110000000,
    primaryColor: '#fb090b',
    secondaryColor: '#000000',
    pattern: 'stripes'
  },
  {
    csvNames: ['SSC Napoli'],
    name: 'Napoli',
    aliases: ['napoli', 'ssc napoli', 'partenopei'],
    domesticLeague: 'Serie A',
    country: 'Italia',
    budget: 95000000,
    primaryColor: '#0080ff',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['AS Roma'],
    name: 'AS Roma',
    aliases: ['as roma', 'roma', 'giallorossi'],
    domesticLeague: 'Serie A',
    country: 'Italia',
    budget: 75000000,
    primaryColor: '#8e1f2f',
    secondaryColor: '#f0bc42',
    pattern: 'solid'
  },
  {
    csvNames: ['Latium'],
    name: 'Lazio',
    aliases: ['lazio', 'ss lazio', 'biancocelesti', 'latium'],
    domesticLeague: 'Serie A',
    country: 'Italia',
    budget: 65000000,
    primaryColor: '#87ceeb',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['Bergamo Calcio', 'Atalanta'],
    name: 'Atalanta',
    aliases: ['atalanta', 'bergamo calcio', 'dea'],
    domesticLeague: 'Serie A',
    country: 'Italia',
    budget: 70000000,
    primaryColor: '#1e3d59',
    secondaryColor: '#000000',
    pattern: 'stripes'
  },
  {
    csvNames: ['Fiorentina'],
    name: 'Fiorentina',
    aliases: ['fiorentina', 'viola'],
    domesticLeague: 'Serie A',
    country: 'Italia',
    budget: 50000000,
    primaryColor: '#4c2682',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },

  // --- BUNDESLIGA ---
  {
    csvNames: ['FC Bayern München', 'FC Bayern'],
    name: 'Bayern München',
    aliases: ['bayern münchen', 'bayern', 'fc bayern', 'bavarians'],
    domesticLeague: 'Bundesliga',
    country: 'Alemania',
    budget: 200000000,
    primaryColor: '#dc052d',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['Borussia Dortmund'],
    name: 'Borussia Dortmund',
    aliases: ['borussia dortmund', 'dortmund', 'bvb'],
    domesticLeague: 'Bundesliga',
    country: 'Alemania',
    budget: 110000000,
    primaryColor: '#fde100',
    secondaryColor: '#000000',
    pattern: 'solid'
  },
  {
    csvNames: ['Leverkusen', 'Bayer 04 Leverkusen'],
    name: 'Bayer 04 Leverkusen',
    aliases: ['bayer 04 leverkusen', 'leverkusen', 'werkself'],
    domesticLeague: 'Bundesliga',
    country: 'Alemania',
    budget: 95000000,
    primaryColor: '#e32221',
    secondaryColor: '#000000',
    pattern: 'solid'
  },
  {
    csvNames: ['RB Leipzig'],
    name: 'RB Leipzig',
    aliases: ['rb leipzig', 'leipzig', 'die roten bullen'],
    domesticLeague: 'Bundesliga',
    country: 'Alemania',
    budget: 90000000,
    primaryColor: '#ffffff',
    secondaryColor: '#dd0741',
    pattern: 'solid'
  },
  {
    csvNames: ['Frankfurt', 'Eintracht Frankfurt'],
    name: 'Eintracht Frankfurt',
    aliases: ['eintracht frankfurt', 'frankfurt', 'adler'],
    domesticLeague: 'Bundesliga',
    country: 'Alemania',
    budget: 65000000,
    primaryColor: '#e1000f',
    secondaryColor: '#000000',
    pattern: 'solid'
  },

  // --- LIGUE 1 ---
  {
    csvNames: ['Paris SG'],
    name: 'Paris SG',
    aliases: ['paris sg', 'paris saint-germain', 'psg'],
    domesticLeague: 'Ligue 1',
    country: 'Francia',
    budget: 250000000,
    primaryColor: '#004170',
    secondaryColor: '#da291c',
    pattern: 'solid'
  },
  {
    csvNames: ['OM', 'Olympique de Marseille'],
    name: 'Olympique de Marseille',
    aliases: ['olympique de marseille', 'marseille', 'om'],
    domesticLeague: 'Ligue 1',
    country: 'Francia',
    budget: 75000000,
    primaryColor: '#2faee0',
    secondaryColor: '#ffffff',
    pattern: 'solid'
  },
  {
    csvNames: ['OL', 'Olympique Lyonnais'],
    name: 'Olympique Lyonnais',
    aliases: ['olympique lyonnais', 'lyon', 'ol'],
    domesticLeague: 'Ligue 1',
    country: 'Francia',
    budget: 70000000,
    primaryColor: '#ffffff',
    secondaryColor: '#da291c',
    pattern: 'stripes'
  },
  {
    csvNames: ['AS Monaco'],
    name: 'AS Monaco',
    aliases: ['as monaco', 'monaco', 'asm'],
    domesticLeague: 'Ligue 1',
    country: 'Francia',
    budget: 75000000,
    primaryColor: '#e20613',
    secondaryColor: '#ffffff',
    pattern: 'diagonal'
  },
  {
    csvNames: ['LOSC Lille', 'LOSC'],
    name: 'LOSC Lille',
    aliases: ['losc lille', 'lille', 'losc', 'dogues'],
    domesticLeague: 'Ligue 1',
    country: 'Francia',
    budget: 60000000,
    primaryColor: '#e01e2b',
    secondaryColor: '#122649',
    pattern: 'solid'
  }
];

// Build fast lookup by CSV Team name
const csvMap = new Map();
teamConfigs.forEach(cfg => {
  cfg.squad = [];
  cfg.csvNames.forEach(cn => csvMap.set(cn.toLowerCase(), cfg));
});

function parseCSVLine(text) {
  let ret = [''];
  let i = 0;
  let p = '', s = true;
  for (let l in text) {
    l = text[l];
    if ('"' === l) {
      s = !s;
      if ('"' === p) {
        ret[i] += '"';
        l = '-';
      } else if (p === '') {
        l = '-';
      }
    } else if (s && ',' === l) {
      l = ret[++i] = '';
    } else {
      ret[i] += l;
    }
    p = l;
  }
  return ret;
}

function mapPosition(pos) {
  const p = pos ? pos.toUpperCase().trim() : 'CM';
  if (p === 'GK') return 'POR';
  if (['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(p)) return 'DEF';
  if (['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(p)) return 'MED';
  if (['LW', 'RW', 'ST', 'CF'].includes(p)) return 'DEL';
  return 'MED';
}

function mapSpecificPosition(pos) {
  const p = pos ? pos.toUpperCase().trim() : 'CM';
  if (p === 'GK') return 'POR';
  if (p === 'CB') return 'DFC';
  if (p === 'LB') return 'LI';
  if (p === 'RB') return 'LD';
  if (p === 'LWB') return 'CAI';
  if (p === 'RWB') return 'CAD';
  if (p === 'CDM') return 'MCD';
  if (p === 'CM') return 'MC';
  if (p === 'CAM') return 'MCO';
  if (p === 'LM') return 'MI';
  if (p === 'RM') return 'MD';
  if (p === 'LW') return 'EI';
  if (p === 'RW') return 'ED';
  if (p === 'ST' || p === 'CF') return 'DC';
  return 'MC';
}

function calculateMarketValue(ovr, age) {
  let base = Math.pow(10, (ovr - 60) / 10) * 1000000;
  if (age < 23) base *= 1.5;
  if (age > 30) base *= 0.6;
  return Math.max(300000, Math.round(base));
}

function calculatePotential(ovr, age) {
  if (age <= 20) return Math.min(99, ovr + Math.floor(Math.random() * 8) + 6);
  if (age <= 23) return Math.min(99, ovr + Math.floor(Math.random() * 6) + 3);
  if (age <= 26) return Math.min(99, ovr + Math.floor(Math.random() * 4) + 1);
  return Math.max(ovr, Math.min(99, ovr + Math.floor(Math.random() * 2)));
}

async function processLineByLine() {
  console.log('Reading temp_eafc/EAFC26-Men.csv...');
  const fileStream = fs.createReadStream('temp_eafc/EAFC26-Men.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let isFirstLine = true;
  let headers = [];
  let rowCount = 0;

  for await (const line of rl) {
    if (isFirstLine) {
      headers = parseCSVLine(line).map(h => h.trim());
      isFirstLine = false;
      continue;
    }

    rowCount++;
    const row = parseCSVLine(line);
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });

    const eaTeam = (obj['Team'] || '').trim();
    const config = csvMap.get(eaTeam.toLowerCase());

    if (config) {
      const pos = mapPosition(obj['Position']);
      const specPos = mapSpecificPosition(obj['Position']);
      const ovr = parseInt(obj['OVR']) || 75;
      const age = parseInt(obj['Age']) || 25;
      const pot = calculatePotential(ovr, age);

      config.squad.push({
        name: obj['Name'] || 'Desconocido',
        age,
        overall: ovr,
        potential: pot,
        position: pos,
        specificPosition: specPos,
        marketValue: calculateMarketValue(ovr, age),
        country: obj['Nation'] || 'España',
        attributes: {
          pace: parseInt(obj['PAC']) || 60,
          shooting: parseInt(obj['SHO']) || 55,
          passing: parseInt(obj['PAS']) || 60,
          dribbling: parseInt(obj['DRI']) || 60,
          defending: parseInt(obj['DEF']) || 55,
          physical: parseInt(obj['PHY']) || 60
        }
      });
    }
  }

  console.log(`Processed ${rowCount} rows.`);

  const finalTeams = [];
  teamConfigs.forEach(cfg => {
    if (cfg.squad.length > 0) {
      // Sort squad by overall descending
      cfg.squad.sort((a, b) => b.overall - a.overall);
      const top11 = cfg.squad.slice(0, 11);
      const sum = top11.reduce((acc, p) => acc + p.overall, 0);
      const avg = Math.round(sum / top11.length);

      finalTeams.push({
        name: cfg.name,
        aliases: cfg.aliases,
        domesticLeague: cfg.domesticLeague,
        country: cfg.country,
        overall: avg,
        budget: cfg.budget,
        primaryColor: cfg.primaryColor,
        secondaryColor: cfg.secondaryColor,
        pattern: cfg.pattern,
        squad: cfg.squad
      });
      console.log(`✔ [${cfg.name}] squad size: ${cfg.squad.length}, top 11 ovr: ${avg}`);
    } else {
      console.warn(`⚠ Warning: No players found for ${cfg.name}`);
    }
  });

  const outputContent = `export interface FIFAPlayerData {
  name: string;
  age: number;
  overall: number;
  potential: number;
  position: 'POR' | 'DEF' | 'MED' | 'DEL';
  specificPosition: 'POR' | 'DFC' | 'LI' | 'LD' | 'CAD' | 'CAI' | 'MCD' | 'MC' | 'MCO' | 'MI' | 'MD' | 'EI' | 'ED' | 'DC' | 'SD';
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
}

export interface FIFAClubData {
  name: string;
  aliases: string[];
  domesticLeague: 'LaLiga' | 'Premier League' | 'Serie A' | 'Ligue 1' | 'Bundesliga';
  country: string;
  overall: number;
  budget: number;
  primaryColor: string;
  secondaryColor: string;
  pattern: 'solid' | 'stripes' | 'hoop' | 'diagonal';
  squad: FIFAPlayerData[];
}

export const EA_FC_DATABASE: FIFAClubData[] = ${JSON.stringify(finalTeams, null, 2)};
`;

  fs.writeFileSync('src/services/fifaData.ts', outputContent);
  console.log(`Successfully generated src/services/fifaData.ts with ${finalTeams.length} clubs and thousands of real players!`);
}

processLineByLine();
