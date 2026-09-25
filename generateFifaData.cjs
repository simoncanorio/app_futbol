const fs = require('fs');
const readline = require('readline');
const path = require('path');

const espTeams = ['Real Madrid', 'FC Barcelona', 'Atlético de Madrid', 'Valencia CF', 'Sevilla FC', 'Athletic Club de Bilbao', 'Real Betis', 'Villarreal CF', 'Real Sociedad', 'Celta de Vigo'];
const engTeams = ['Manchester City', 'Arsenal', 'Liverpool', 'Chelsea', 'Manchester United', 'Tottenham Hotspur', 'Newcastle United', 'Aston Villa', 'Everton', 'West Ham United'];
const itaTeams = ['Juventus', 'Inter', 'AC Milan', 'Napoli', 'AS Roma', 'Lazio', 'Atalanta', 'Fiorentina'];
const fraTeams = ['Paris SG', 'Olympique de Marseille', 'Olympique Lyonnais', 'AS Monaco', 'LOSC Lille'];
const gerTeams = ['Bayern München', 'Borussia Dortmund', 'Bayer 04 Leverkusen', 'RB Leipzig', 'Eintracht Frankfurt'];

// Create mapping from our names to EA FC names
const teamNameMapping = {
  'Real Madrid': 'Real Madrid',
  'FC Barcelona': 'FC Barcelona',
  'Atlético de Madrid': 'Atlético Madrid',
  'Valencia CF': 'Valencia CF',
  'Sevilla FC': 'Sevilla FC',
  'Athletic Club': 'Athletic Club',
  'Real Betis': 'Real Betis',
  'Villarreal CF': 'Villarreal CF',
  'Real Sociedad': 'Real Sociedad',
  'Celta de Vigo': 'RC Celta',
  'Manchester City': 'Manchester City',
  'Arsenal FC': 'Arsenal',
  'Liverpool FC': 'Liverpool',
  'Chelsea FC': 'Chelsea',
  'Manchester United': 'Manchester Utd',
  'Tottenham Hotspur': 'Spurs',
  'Newcastle United': 'Newcastle Utd',
  'Aston Villa': 'Aston Villa',
  'Everton FC': 'Everton',
  'West Ham United': 'West Ham',
  'Juventus': 'Juventus',
  'Inter': 'Inter',
  'AC Milan': 'Milan',
  'Napoli': 'Napoli',
  'AS Roma': 'Roma',
  'Lazio': 'Lazio',
  'Atalanta': 'Atalanta',
  'Fiorentina': 'Fiorentina',
  'Paris SG': 'Paris SG',
  'Olympique de Marseille': 'OM',
  'Olympique Lyonnais': 'OL',
  'AS Monaco': 'AS Monaco',
  'LOSC Lille': 'LOSC',
  'Bayern München': 'FC Bayern',
  'Borussia Dortmund': 'Borussia Dortmund',
  'Bayer 04 Leverkusen': 'Bayer 04 Leverkusen',
  'RB Leipzig': 'RB Leipzig',
  'Eintracht Frankfurt': 'Eintracht Frankfurt'
};

const teamsData = {};

Object.keys(teamNameMapping).forEach(t => {
  const isEsp = espTeams.includes(t) || t === 'Athletic Club' || t === 'Atlético de Madrid' || t === 'Celta de Vigo';
  const isEng = engTeams.includes(t) || t === 'Arsenal FC' || t === 'Liverpool FC' || t === 'Chelsea FC' || t === 'Everton FC';
  const isIta = itaTeams.includes(t);
  const isFra = fraTeams.includes(t);
  const isGer = gerTeams.includes(t);

  let league = 'Premier League';
  let country = 'Inglaterra';
  if (isEsp) { league = 'LaLiga'; country = 'España'; }
  else if (isIta) { league = 'Serie A'; country = 'Italia'; }
  else if (isFra) { league = 'Ligue 1'; country = 'Francia'; }
  else if (isGer) { league = 'Bundesliga'; country = 'Alemania'; }

  teamsData[teamNameMapping[t]] = {
    name: t,
    domesticLeague: league,
    country: country,
    overall: 80,
    budget: 100000000,
    primaryColor: isEsp ? '#ef4444' : (isIta ? '#0284c7' : '#3b82f6'),
    secondaryColor: '#ffffff',
    pattern: 'solid',
    squad: []
  };
});

async function processLineByLine() {
  const fileStream = fs.createReadStream('temp_eafc/EAFC26-Men.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let isFirstLine = true;
  let headers = [];

  for await (const line of rl) {
    if (isFirstLine) {
      // Use regex to split CSV properly handling quotes
      headers = parseCSVLine(line);
      isFirstLine = false;
      continue;
    }

    const row = parseCSVLine(line);
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = row[index];
    });

    const eaTeam = obj['Team'];
    
    // Some manual fixes for team names based on what we might see
    let matchedEaTeam = eaTeam;
    if (eaTeam === 'Tottenham Hotspur') matchedEaTeam = 'Spurs';
    if (eaTeam === 'Manchester United') matchedEaTeam = 'Manchester Utd';
    if (eaTeam === 'Newcastle United') matchedEaTeam = 'Newcastle Utd';
    if (eaTeam === 'Athletic Club de Bilbao') matchedEaTeam = 'Athletic Club';
    if (eaTeam === 'Milan') matchedEaTeam = 'Milan';
    if (eaTeam === 'Bayern München' || eaTeam === 'FC Bayern München') matchedEaTeam = 'FC Bayern';
    if (eaTeam === 'Olympique de Marseille') matchedEaTeam = 'OM';
    if (eaTeam === 'Olympique Lyonnais') matchedEaTeam = 'OL';
    if (eaTeam === 'Lille OSC' || eaTeam === 'LOSC Lille') matchedEaTeam = 'LOSC';

    if (teamsData[matchedEaTeam]) {
      const pos = mapPosition(obj['Position']);
      const specPos = mapSpecificPosition(obj['Position']);
      
      teamsData[matchedEaTeam].squad.push({
        name: obj['Name'],
        age: parseInt(obj['Age']) || 25,
        overall: parseInt(obj['OVR']) || 75,
        potential: parseInt(obj['OVR']) + Math.floor(Math.random() * 5), // Assuming potential is not directly available, or maybe it is
        position: pos,
        specificPosition: specPos,
        marketValue: calculateMarketValue(parseInt(obj['OVR']) || 75, parseInt(obj['Age']) || 25),
        country: obj['Nation'] || 'Unknown',
        attributes: {
          pace: parseInt(obj['PAC']) || 50,
          shooting: parseInt(obj['SHO']) || 50,
          passing: parseInt(obj['PAS']) || 50,
          dribbling: parseInt(obj['DRI']) || 50,
          defending: parseInt(obj['DEF']) || 50,
          physical: parseInt(obj['PHY']) || 50
        }
      });
    }
  }

  // Calculate team overalls based on top 11
  const finalTeams = [];
  Object.keys(teamsData).forEach(eaTeamName => {
    const team = teamsData[eaTeamName];
    if (team.squad.length > 0) {
      team.squad.sort((a, b) => b.overall - a.overall);
      const top11 = team.squad.slice(0, 11);
      const sum = top11.reduce((acc, p) => acc + p.overall, 0);
      team.overall = Math.round(sum / top11.length);
      finalTeams.push(team);
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
  console.log('Successfully generated src/services/fifaData.ts with EA FC data');
}

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
  const p = pos ? pos.toUpperCase() : 'CM';
  if (p === 'GK') return 'POR';
  if (['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(p)) return 'DEF';
  if (['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(p)) return 'MED';
  if (['LW', 'RW', 'ST', 'CF'].includes(p)) return 'DEL';
  return 'MED';
}

function mapSpecificPosition(pos) {
  const p = pos ? pos.toUpperCase() : 'CM';
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
  return Math.round(base);
}

processLineByLine();
