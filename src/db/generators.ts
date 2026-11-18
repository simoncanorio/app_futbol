import { db, getInitialPlayerStats, getDetailedAttributes } from './db';
import { tmService } from '../services/transfermarkt';
import { EA_FC_DATABASE, type FIFAClubData } from '../services/fifaData';
import type { HistoricalClub } from '../services/historicalData';
import { generateLeagueFixtures } from '../engine/fixtureGenerator';
import { autoSelectLineupForTeam } from '../utils/lineupUtils';
import { advanceWeek } from '../engine/gameLoop';

const firstNames = ['Juan', 'Carlos', 'Luis', 'Pedro', 'Miguel', 'David', 'Jorge', 'Jose', 'Diego', 'Mateo', 'Lucas', 'Martin', 'Leo', 'Hugo', 'Daniel'];
const lastNames = ['Garcia', 'Martinez', 'Lopez', 'Sanchez', 'Perez', 'Gomez', 'Rodriguez', 'Fernandez', 'Ruiz', 'Diaz', 'Alvarez', 'Romero', 'Torres'];
const countries = ['España', 'Argentina', 'Brasil', 'Francia', 'Inglaterra', 'Alemania', 'Italia', 'Portugal', 'Uruguay', 'Colombia'];
const personalities: ('Avaricioso' | 'Ambicioso' | 'Leal' | 'Pragmático')[] = ['Pragmático', 'Ambicioso', 'Leal', 'Avaricioso'];
const devTypes: ('early_bloomer' | 'normal' | 'late_bloomer' | 'bust')[] = ['early_bloomer', 'normal', 'normal', 'late_bloomer'];

export const espTeams = EA_FC_DATABASE.filter(c => c.domesticLeague === 'LaLiga').map(c => c.name);
export const engTeams = EA_FC_DATABASE.filter(c => c.domesticLeague === 'Premier League').map(c => c.name);
export const itaTeams = EA_FC_DATABASE.filter(c => c.domesticLeague === 'Serie A').map(c => c.name);
export const gerTeams = EA_FC_DATABASE.filter(c => c.domesticLeague === 'Bundesliga').map(c => c.name);
export const fraTeams = EA_FC_DATABASE.filter(c => c.domesticLeague === 'Ligue 1').map(c => c.name);
export const argTeams = EA_FC_DATABASE.filter(c => c.domesticLeague === 'Liga Profesional').map(c => c.name);
export const worldTeams = [
  'Real Madrid', 'Manchester City', 'FC Barcelona', 'Liverpool FC', 'Arsenal FC',
  'Bayern München', 'Paris Saint-Germain', 'Inter', 'Juventus', 'Atlético de Madrid',
  'Bayer 04 Leverkusen', 'Borussia Dortmund', 'Chelsea FC', 'AC Milan', 'Napoli',
  'Sporting CP', 'SL Benfica', 'River Plate', 'Boca Juniors', 'Inter Miami CF', 'Al Nassr'
];
export const teamNames = [...espTeams, ...engTeams];

export function getLeagueTeamNames(competitionId?: string): string[] {
  if (competitionId === 'GB1') return engTeams.length > 0 ? engTeams : ['Manchester City', 'Arsenal FC', 'Liverpool FC', 'Chelsea FC'];
  if (competitionId === 'IT1') return itaTeams.length > 0 ? itaTeams : ['Juventus', 'Inter', 'AC Milan', 'Napoli'];
  if (competitionId === 'L1') return gerTeams.length > 0 ? gerTeams : ['Bayern München', 'Borussia Dortmund', 'Bayer 04 Leverkusen', 'RB Leipzig'];
  if (competitionId === 'FR1') return fraTeams.length > 0 ? fraTeams : ['Paris Saint-Germain', 'Olympique de Marseille', 'Olympique Lyonnais', 'AS Monaco'];
  if (competitionId === 'AR1N') return argTeams.length > 0 ? argTeams : ['River Plate', 'Boca Juniors', 'Racing Club', 'Independiente'];
  if (competitionId === 'WORLD') return worldTeams;
  return espTeams.length > 0 ? espTeams : ['Real Madrid', 'FC Barcelona', 'Atlético de Madrid', 'Athletic Club'];
}

function getClubTacticalIdentity(clubName: string): {
  formation: string;
  tacticalStyle: string;
  mentality: string;
  pressLine: string;
  passingTempo: string;
  coachName: string;
  coachRep: number;
} {
  const n = clubName.toLowerCase();
  const realCoaches: Record<string, { name: string; rep: number }> = {
    'real madrid': { name: 'Carlo Ancelotti', rep: 96 },
    'barcelona': { name: 'Hansi Flick', rep: 92 },
    'atletico': { name: 'Diego Simeone', rep: 91 },
    'atlético': { name: 'Diego Simeone', rep: 91 },
    'manchester city': { name: 'Pep Guardiola', rep: 98 },
    'arsenal': { name: 'Mikel Arteta', rep: 90 },
    'liverpool': { name: 'Arne Slot', rep: 89 },
    'chelsea': { name: 'Enzo Maresca', rep: 84 },
    'manchester united': { name: 'Rúben Amorim', rep: 86 },
    'tottenham': { name: 'Ange Postecoglou', rep: 83 },
    'aston villa': { name: 'Unai Emery', rep: 88 },
    'newcastle': { name: 'Eddie Howe', rep: 84 },
    'bayern': { name: 'Vincent Kompany', rep: 85 },
    'leverkusen': { name: 'Xabi Alonso', rep: 93 },
    'dortmund': { name: 'Niko Kovač', rep: 83 },
    'leipzig': { name: 'Marco Rose', rep: 82 },
    'paris saint': { name: 'Luis Enrique', rep: 91 },
    'marseille': { name: 'Roberto De Zerbi', rep: 85 },
    'monaco': { name: 'Adi Hütter', rep: 81 },
    'inter': { name: 'Simone Inzaghi', rep: 92 },
    'milan': { name: 'Sérgio Conceição', rep: 85 },
    'juventus': { name: 'Thiago Motta', rep: 84 },
    'napoli': { name: 'Antonio Conte', rep: 91 },
    'atalanta': { name: 'Gian Piero Gasperini', rep: 88 },
    'roma': { name: 'Claudio Ranieri', rep: 85 },
    'athletic': { name: 'Ernesto Valverde', rep: 86 },
    'real sociedad': { name: 'Imanol Alguacil', rep: 83 },
    'villarreal': { name: 'Marcelino García Toral', rep: 84 },
    'betis': { name: 'Manuel Pellegrini', rep: 85 },
    'girona': { name: 'Míchel Sánchez', rep: 83 },
    'river': { name: 'Marcelo Gallardo', rep: 89 },
    'boca': { name: 'Fernando Gago', rep: 80 },
    'racing': { name: 'Gustavo Costas', rep: 82 },
    'independiente': { name: 'Julio Vaccari', rep: 78 }
  };

  let matchedCoach = { name: '', rep: 78 };
  for (const key in realCoaches) {
    if (n.includes(key)) {
      matchedCoach = realCoaches[key];
      break;
    }
  }
  if (!matchedCoach.name) {
    const fallbackCoaches = [
      'José Bordalás', 'Andoni Iraola', 'Marco Silva', 'Oliver Glasner', 'Sebastián Beccacece',
      'Eduardo Coudet', 'Vincenzo Italiano', 'Dino Toppmöller', 'Franck Haise', 'Carlos Corberán',
      'Raffaele Palladino', 'Fabián Hürzeler', 'Kieran McKenna', 'Quique Sánchez Flores', 'Jagoba Arrasate'
    ];
    matchedCoach = { name: fallbackCoaches[clubName.length % fallbackCoaches.length], rep: 77 };
  }

  if (n.includes('barcelona') || n.includes('manchester city') || n.includes('arsenal') || n.includes('paris saint')) {
    return { formation: '4-3-3', tacticalStyle: 'Tiki-Taka (Posesión)', mentality: 'Ofensiva', pressLine: 'Alta', passingTempo: 'Corto', coachName: matchedCoach.name, coachRep: matchedCoach.rep };
  }
  if (n.includes('liverpool') || n.includes('bayern') || n.includes('dortmund') || n.includes('leverkusen') || n.includes('athletic') || n.includes('river')) {
    return { formation: '4-2-3-1', tacticalStyle: 'Gegenpressing (Presión Alta)', mentality: 'Ofensiva', pressLine: 'Alta', passingTempo: 'Directo', coachName: matchedCoach.name, coachRep: matchedCoach.rep };
  }
  if (n.includes('real madrid')) {
    return { formation: '4-3-3', tacticalStyle: 'Contraataque Veloz', mentality: 'Ofensiva', pressLine: 'Media', passingTempo: 'Directo', coachName: matchedCoach.name, coachRep: matchedCoach.rep };
  }
  if (n.includes('inter') || n.includes('atalanta')) {
    return { formation: '3-5-2', tacticalStyle: 'Juego de Posición (Juego de Autor)', mentality: 'Equilibrada', pressLine: 'Media', passingTempo: 'Mixto', coachName: matchedCoach.name, coachRep: matchedCoach.rep };
  }
  if (n.includes('atletico') || n.includes('atlético') || n.includes('getafe') || n.includes('boca') || n.includes('juventus') || n.includes('napoli')) {
    return { formation: '4-4-2', tacticalStyle: 'Bloque Bajo y Presión Zonal', mentality: 'Defensiva', pressLine: 'Bloque Bajo', passingTempo: 'Directo', coachName: matchedCoach.name, coachRep: matchedCoach.rep };
  }
  const styles = [
    { formation: '4-3-3', tacticalStyle: 'Juego por las Bandas (Centros)', mentality: 'Equilibrada', pressLine: 'Media', passingTempo: 'Mixto', coachName: matchedCoach.name, coachRep: matchedCoach.rep },
    { formation: '4-2-3-1', tacticalStyle: 'Juego de Posición (Juego de Autor)', mentality: 'Equilibrada', pressLine: 'Media', passingTempo: 'Corto', coachName: matchedCoach.name, coachRep: matchedCoach.rep },
    { formation: '4-4-2', tacticalStyle: 'Contraataque Veloz', mentality: 'Equilibrada', pressLine: 'Bloque Bajo', passingTempo: 'Directo', coachName: matchedCoach.name, coachRep: matchedCoach.rep }
  ];
  return styles[clubName.length % styles.length];
}

export function findFifaClub(teamName: string): FIFAClubData | undefined {
  if (!teamName) return undefined;
  const clean = (s: string) => s.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, ' ')
    .trim();

  const target = clean(teamName);

  // 1. Direct name match or exact alias match
  for (const c of EA_FC_DATABASE) {
    if (clean(c.name) === target) return c;
    if (c.aliases && c.aliases.some(a => clean(a) === target)) return c;
  }

  // 2. Substring match
  for (const c of EA_FC_DATABASE) {
    const cClean = clean(c.name);
    if (cClean.includes(target) || target.includes(cClean)) return c;
    if (c.aliases && c.aliases.some(a => {
      const aClean = clean(a);
      return aClean.includes(target) || target.includes(aClean);
    })) return c;
  }

  // 3. Word match
  const targetWords = target.split(/\s+/).filter(w => w.length >= 4);
  if (targetWords.length > 0) {
    for (const c of EA_FC_DATABASE) {
      const cClean = clean(c.name);
      if (targetWords.some(tw => cClean.includes(tw))) return c;
      if (c.aliases && c.aliases.some(a => {
        const aClean = clean(a);
        return targetWords.some(tw => aClean.includes(tw));
      })) return c;
    }
  }

  return undefined;
}

export async function findHistoricalClub(teamName: string, year: number): Promise<HistoricalClub | undefined> {
  const { HISTORICAL_ERAS_DATABASE } = await import('../services/historicalData');
  const clubs = HISTORICAL_ERAS_DATABASE[year];
  if (!clubs || clubs.length === 0) return undefined;

  const clean = (s: string) => s.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, ' ')
    .trim();

  const target = clean(teamName);

  for (const c of clubs) {
    if (clean(c.name) === target) return c;
  }

  for (const c of clubs) {
    const cClean = clean(c.name);
    if (target.includes('barcelona') && !target.includes('espanyol') && cClean.includes('espanyol')) continue;
    if (cClean.includes(target) || target.includes(cClean)) return c;
  }

  const targetWords = target.split(/\s+/).filter(w => w.length >= 4 && !['club', 'futbol', 'real', 'city'].includes(w));
  if (targetWords.length > 0) {
    for (const c of clubs) {
      const cClean = clean(c.name);
      if (target.includes('barcelona') && !target.includes('espanyol') && cClean.includes('espanyol')) continue;
      if (targetWords.some(tw => cClean.includes(tw))) return c;
    }
  }

  return undefined;
}

function randomName() {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function createNewLeague(
  name: string,
  difficulty: 'Normal' | 'Hard' | 'Insane',
  userTeamIndex: number = -1,
  startYear: number = 2026,
  startPeriod: 'preseason' | 'winter_window' | 'final_stretch' = 'preseason',
  competitionId: string = 'ES1',
  onProgress?: (msg: string) => void
): Promise<number> {
  let targetStartWeek = 1;
  if (startPeriod === 'winter_window') targetStartWeek = 19;
  if (startPeriod === 'final_stretch') targetStartWeek = 30;

  const leagueId = await db.leagues.add({
    name,
    season: startYear,
    currentWeek: 1,
    difficulty,
    createdAt: Date.now(),
    lastPlayedAt: Date.now(),
    userTeamId: null,
    startPeriod,
    managerReputation: 60
  });

  const createdTeamIds: number[] = [];
  const targetTeams = getLeagueTeamNames(competitionId);

  for (const tname of targetTeams) {
    const histMatch = startYear !== 2026 ? await findHistoricalClub(tname, startYear) : undefined;
    const fifaMatch = findFifaClub(tname);
    const isEsp = espTeams.includes(tname);
    const nameLow = tname.toLowerCase();
    let initialPrestige = 70;
    if (nameLow.includes('madrid') && nameLow.includes('real')) initialPrestige = 98;
    else if (nameLow.includes('barca') || nameLow.includes('barcelona') || nameLow.includes('catalunya')) initialPrestige = 95;
    else if (nameLow.includes('manchester city')) initialPrestige = 96;
    else if (nameLow.includes('liverpool') || nameLow.includes('arsenal')) initialPrestige = 91;
    else if (nameLow.includes('atlético') || nameLow.includes('atletico')) initialPrestige = 88;
    else if (nameLow.includes('bayern')) initialPrestige = 95;
    else if (nameLow.includes('paris') || nameLow.includes('psg')) initialPrestige = 92;
    else if (nameLow.includes('inter') || nameLow.includes('juventus') || nameLow.includes('milan')) initialPrestige = 90;
    else if (nameLow.includes('river') || nameLow.includes('boca')) initialPrestige = 86;
    else {
      const baseOvr = histMatch ? histMatch.overall : (fifaMatch ? fifaMatch.overall : 78);
      initialPrestige = Math.min(86, Math.max(52, Math.round((baseOvr - 60) * 2.8)));
    }

    let domesticLeague = 'LaLiga';
    if (competitionId === 'WORLD') {
      domesticLeague = 'Superliga Mundial';
    } else if (fifaMatch && fifaMatch.domesticLeague) {
      domesticLeague = fifaMatch.domesticLeague;
    } else if (espTeams.includes(tname)) domesticLeague = 'LaLiga';
    else if (engTeams.includes(tname)) domesticLeague = 'Premier League';
    else if (itaTeams.includes(tname)) domesticLeague = 'Serie A';
    else if (fraTeams.includes(tname)) domesticLeague = 'Ligue 1';
    else if (gerTeams.includes(tname)) domesticLeague = 'Bundesliga';
    else if (argTeams.includes(tname)) domesticLeague = 'Liga Profesional';

    const tacId = getClubTacticalIdentity(tname);
    const baseOvr = histMatch ? histMatch.overall : (fifaMatch ? fifaMatch.overall : randomInt(76, 85));
    const pop = randomInt(1000000, 12000000);

    const teamId = await db.teams.add({
      leagueId,
      domesticLeague,
      name: tname,
      overall: baseOvr,
      prestige: initialPrestige,
      eloRating: 1300 + baseOvr * 8,
      formation: tacId.formation,
      tacticalStyle: tacId.tacticalStyle,
      mentality: tacId.mentality,
      pressLine: tacId.pressLine,
      passingTempo: tacId.passingTempo,
      coach: {
        name: tacId.coachName,
        tacticalStyle: tacId.tacticalStyle,
        formation: tacId.formation,
        reputation: tacId.coachRep
      },
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      form: [],
      budget: fifaMatch ? fifaMatch.budget : randomInt(40, 160) * 1000000,
      population: pop,
      attendance: randomInt(28000, 78000),
      ticketPrice: randomInt(45, 125),
      revenue: 0,
      profit: 0,
      hype: Math.min(95, initialPrestige),
      boardConfidence: 90,
      facilities: {
        stadiumLevel: initialPrestige >= 90 ? 4 : initialPrestige >= 80 ? 3 : 2,
        youthLevel: initialPrestige >= 88 ? 4 : initialPrestige >= 78 ? 3 : 2,
        trainingLevel: initialPrestige >= 90 ? 4 : initialPrestige >= 80 ? 3 : 2
      },
      kit: fifaMatch
        ? { primaryColor: fifaMatch.primaryColor, secondaryColor: fifaMatch.secondaryColor, pattern: fifaMatch.pattern }
        : { primaryColor: isEsp ? '#ef4444' : '#3b82f6', secondaryColor: '#ffffff', pattern: 'solid' }
    }) as number;

    createdTeamIds.push(teamId);

    const players: any[] = [];
    if (histMatch && histMatch.squad && histMatch.squad.length >= 11) {
      for (const hp of histMatch.squad) {
        const isEliteStar = hp.overall >= 89 || hp.marketValue >= 80000000;
        const clause = isEliteStar ? 1000000000 : Math.max(15000000, Math.round(hp.marketValue * randomInt(3, 4)));
        const specPos = (hp.specificPosition || (hp.position === 'POR' ? 'POR' : hp.position === 'DEF' ? 'DFC' : hp.position === 'MED' ? 'MC' : 'DC')) as any;
        const cYears = randomInt(2, 5);

        const pObj: any = {
          leagueId,
          teamId,
          name: hp.name,
          age: hp.age,
          overall: hp.overall,
          potential: hp.potential,
          position: hp.position,
          specificPosition: specPos,
          contract: Math.max(400000, Math.floor(hp.marketValue * 0.075)),
          contractYears: cYears,
          contractEndSeason: startYear + cYears,
          releaseClause: clause,
          morale: randomInt(82, 95),
          fatigue: 0,
          injuryProne: randomInt(15, 55),
          personality: personalities[Math.floor(Math.random() * personalities.length)],
          developmentType: devTypes[Math.floor(Math.random() * devTypes.length)],
          unhappy: false,
          stats: getInitialPlayerStats(),
          attributes: hp.attributes,
          bio: {
            height: randomInt(172, 191),
            weight: randomInt(68, 86),
            country: hp.country,
            preferredFoot: Math.random() < 0.24 ? 'Left' : 'Right',
            weakFoot: randomInt(3, 5),
            skillMoves: hp.position === 'DEL' || hp.position === 'MED' ? randomInt(3, 5) : randomInt(2, 3)
          }
        };
        pObj.detailedAttributes = getDetailedAttributes(pObj);
        players.push(pObj);
      }
    } else if (fifaMatch && fifaMatch.squad.length > 0) {
      for (const fp of fifaMatch.squad) {
        const isEliteStar = fp.overall >= 89 || fp.marketValue >= 100000000;
        const clause = isEliteStar ? 1000000000 : Math.round(fp.marketValue * randomInt(3, 4));
        const cYears = randomInt(2, 5);

        const pObj: any = {
          leagueId,
          teamId,
          name: fp.name,
          age: fp.age,
          overall: fp.overall,
          potential: fp.potential,
          position: fp.position,
          specificPosition: fp.specificPosition || (fp.position === 'POR' ? 'POR' : fp.position === 'DEF' ? 'DFC' : fp.position === 'MED' ? 'MC' : 'DC'),
          secondaryPositions: fp.secondaryPositions,
          contract: Math.max(400000, Math.floor(fp.marketValue * 0.075)),
          contractYears: cYears,
          contractEndSeason: startYear + cYears,
          releaseClause: clause,
          morale: randomInt(82, 95),
          fatigue: 0,
          injuryProne: randomInt(15, 55),
          personality: personalities[Math.floor(Math.random() * personalities.length)],
          developmentType: devTypes[Math.floor(Math.random() * devTypes.length)],
          unhappy: false,
          stats: getInitialPlayerStats(),
          attributes: fp.attributes,
          detailedAttributes: fp.detailedAttributes,
          playStyles: fp.playStyles,
          bio: {
            height: fp.height || randomInt(174, 190),
            weight: fp.weight || randomInt(68, 86),
            country: fp.country,
            preferredFoot: fp.preferredFoot || 'Right',
            weakFoot: fp.weakFoot || 3,
            skillMoves: fp.skillMoves || 3
          }
        };
        if (!pObj.detailedAttributes) pObj.detailedAttributes = getDetailedAttributes(pObj);
        players.push(pObj);
      }
    } else {
      const positions: ('POR' | 'DEF' | 'MED' | 'DEL')[] = ['POR', 'DEF', 'DEF', 'DEF', 'DEF', 'MED', 'MED', 'MED', 'MED', 'DEL', 'DEL', 'POR', 'DEF', 'DEF', 'MED', 'MED', 'DEL', 'DEL', 'MED', 'DEF'];
      const specificPositions: ('POR' | 'DFC' | 'LI' | 'LD' | 'MCD' | 'MC' | 'MCO' | 'EI' | 'ED' | 'DC')[] = [
        'POR', 'LI', 'DFC', 'DFC', 'LD', 'MCD', 'MC', 'MCO', 'MI' as any, 'EI', 'DC',
        'POR', 'DFC', 'LD', 'MC', 'MCO', 'ED', 'DC', 'MC', 'LI'
      ];
      for (let i = 0; i < 20; i++) {
        const overall = randomInt(70, 86);
        const potential = Math.min(99, overall + randomInt(1, 10));
        const cYears = randomInt(2, 4);
        const pObj: any = {
          leagueId,
          teamId,
          name: randomName(),
          age: randomInt(18, 33),
          overall,
          potential,
          position: positions[i],
          specificPosition: specificPositions[i],
          contract: randomInt(900000, 5500000),
          contractYears: cYears,
          contractEndSeason: startYear + cYears,
          releaseClause: randomInt(15, 80) * 1000000,
          morale: randomInt(80, 95),
          fatigue: 0,
          injuryProne: randomInt(15, 55),
          personality: personalities[Math.floor(Math.random() * personalities.length)],
          developmentType: devTypes[Math.floor(Math.random() * devTypes.length)],
          unhappy: false,
          stats: getInitialPlayerStats(),
          attributes: {
            pace: randomInt(55, 92),
            shooting: randomInt(45, 90),
            passing: randomInt(55, 90),
            dribbling: randomInt(55, 90),
            defending: randomInt(40, 88),
            physical: randomInt(55, 88)
          },
          bio: {
            height: randomInt(170, 194),
            weight: randomInt(64, 88),
            country: countries[Math.floor(Math.random() * countries.length)],
            preferredFoot: Math.random() < 0.25 ? 'Left' : 'Right',
            weakFoot: randomInt(2, 5),
            skillMoves: randomInt(2, 5)
          }
        };
        pObj.detailedAttributes = getDetailedAttributes(pObj);
        players.push(pObj);
      }
    }

    // Pregenerate 5 Youth Academy (Filial) prospects for every team
    const youthProspects: any[] = [];
    const youthPositions: ('POR' | 'DEF' | 'MED' | 'DEL')[] = ['POR', 'DEF', 'MED', 'MED', 'DEL'];
    const youthSpecific: ('POR' | 'DFC' | 'MC' | 'MCO' | 'EI')[] = ['POR', 'DFC', 'MC', 'MCO', 'EI'];

    for (let y = 0; y < 5; y++) {
      const ovr = randomInt(62, 73);
      const pot = Math.min(96, ovr + randomInt(13, 22));
      const cYears = randomInt(3, 5);
      const ypObj: any = {
        leagueId,
        teamId,
        name: `${randomName()} (Canterano)`,
        age: randomInt(16, 18),
        overall: ovr,
        potential: pot,
        position: youthPositions[y],
        specificPosition: youthSpecific[y],
        contract: randomInt(250000, 750000),
        contractYears: cYears,
        contractEndSeason: startYear + cYears,
        lineupStatus: 'youth',
        personality: personalities[Math.floor(Math.random() * personalities.length)],
        developmentType: devTypes[Math.floor(Math.random() * devTypes.length)],
        fatigue: 0,
        morale: 92,
        injuryProne: randomInt(10, 50),
        stats: getInitialPlayerStats(),
        attributes: {
          pace: randomInt(62, 90),
          shooting: randomInt(50, 84),
          passing: randomInt(55, 86),
          dribbling: randomInt(60, 88),
          defending: randomInt(40, 80),
          physical: randomInt(50, 82)
        },
        bio: {
          height: randomInt(169, 191),
          weight: randomInt(62, 84),
          country: countries[Math.floor(Math.random() * countries.length)],
          preferredFoot: Math.random() < 0.25 ? 'Left' : 'Right',
          weakFoot: randomInt(2, 4),
          skillMoves: randomInt(2, 4)
        }
      };
      ypObj.detailedAttributes = getDetailedAttributes(ypObj);
      youthProspects.push(ypObj);
    }

    await db.players.bulkAdd([...players, ...youthProspects]);
    await autoSelectLineupForTeam(teamId, tacId.formation);
  }

  const targetIndex = userTeamIndex >= 0 && userTeamIndex < createdTeamIds.length ? userTeamIndex : 0;
  await db.leagues.update(leagueId, { userTeamId: createdTeamIds[targetIndex] });

  // Generate 38 matchdays double round-robin schedule + Copa + Champions fixtures
  await generateLeagueFixtures(leagueId);

  // If starting in Winter Window (Week 19) or Final Stretch (Week 30), simulate earlier matchdays so standings & stats are real!
  if (targetStartWeek > 1) {
    for (let w = 1; w < targetStartWeek; w++) {
      if (onProgress) {
        onProgress(`Simulando historial de temporada hasta Jornada ${targetStartWeek} (${w}/${targetStartWeek - 1})...`);
      }
      await advanceWeek(leagueId);
    }
  }

  return leagueId;
}

export async function createRealLeagueFromTransfermarkt(
  leagueName: string,
  competitionId: string = 'ES1',
  difficulty: 'Normal' | 'Hard' | 'Insane' = 'Normal',
  userTeamIndex: number = 0,
  startYear: number = 2026,
  startPeriod: 'preseason' | 'winter_window' | 'final_stretch' = 'preseason',
  onProgress?: (msg: string) => void
): Promise<number> {
  if (onProgress) onProgress(`Conectando a EA FC 26 / Transfermarkt Database (${startYear})...`);

  try {
    // Check if local EA FC / Historical database covers this competition cleanly
    const compData = await tmService.getCompetitionClubs(competitionId, String(startYear));
    const clubs = compData.clubs || [];

    if (clubs.length === 0) {
      return createNewLeague(leagueName, difficulty, userTeamIndex, startYear, startPeriod, competitionId, onProgress);
    }

    let targetStartWeek = 1;
    if (startPeriod === 'winter_window') targetStartWeek = 19;
    if (startPeriod === 'final_stretch') targetStartWeek = 30;

    const leagueId = await db.leagues.add({
      name: leagueName,
      season: startYear,
      currentWeek: 1,
      difficulty,
      createdAt: Date.now(),
      lastPlayedAt: Date.now(),
      userTeamId: null,
      startPeriod,
      managerReputation: 60
    });

    if (onProgress) onProgress(`Cargando ${clubs.length} clubes reales...`);
    const createdTeamIds: number[] = [];

    for (let i = 0; i < clubs.length; i++) {
      const club = clubs[i];
      if (onProgress) onProgress(`[${i + 1}/${clubs.length}] Configurando plantilla y táctica de ${club.name}...`);

      const histMatch = startYear !== 2026 ? await findHistoricalClub(club.name, startYear) : undefined;
      const fifaMatch = findFifaClub(club.name);
      const tacId = getClubTacticalIdentity(club.name);
      const baseOvr = histMatch ? histMatch.overall : (fifaMatch ? fifaMatch.overall : 78);
      const nameLow = club.name.toLowerCase();
      let initialPrestige = Math.min(98, Math.max(55, Math.round((baseOvr - 60) * 2.8)));
      if (nameLow.includes('real madrid')) initialPrestige = 98;
      else if (nameLow.includes('barcelona') || nameLow.includes('manchester city') || nameLow.includes('bayern')) initialPrestige = 95;

      const pop = randomInt(1000000, 15000000);
      const teamId = await db.teams.add({
        leagueId,
        domesticLeague: competitionId === 'WORLD' ? 'Superliga Mundial' : (compData.name || 'LaLiga'),
        name: club.name,
        overall: baseOvr,
        prestige: initialPrestige,
        eloRating: 1300 + baseOvr * 8,
        formation: tacId.formation,
        tacticalStyle: tacId.tacticalStyle,
        mentality: tacId.mentality,
        pressLine: tacId.pressLine,
        passingTempo: tacId.passingTempo,
        coach: {
          name: tacId.coachName,
          tacticalStyle: tacId.tacticalStyle,
          formation: tacId.formation,
          reputation: tacId.coachRep
        },
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        form: [],
        budget: fifaMatch ? fifaMatch.budget : randomInt(30, 180) * 1000000,
        population: pop,
        attendance: randomInt(28000, 76000),
        ticketPrice: randomInt(45, 120),
        revenue: 0,
        profit: 0,
        hype: Math.min(95, initialPrestige),
        boardConfidence: 90,
        facilities: {
          stadiumLevel: initialPrestige >= 90 ? 4 : initialPrestige >= 80 ? 3 : 2,
          youthLevel: initialPrestige >= 88 ? 4 : initialPrestige >= 78 ? 3 : 2,
          trainingLevel: initialPrestige >= 90 ? 4 : initialPrestige >= 80 ? 3 : 2
        },
        kit: fifaMatch
          ? { primaryColor: fifaMatch.primaryColor, secondaryColor: fifaMatch.secondaryColor, pattern: fifaMatch.pattern }
          : { primaryColor: i % 2 === 0 ? '#ef4444' : '#3b82f6', secondaryColor: '#ffffff', pattern: 'solid' as const }
      }) as number;

      createdTeamIds.push(teamId);

      const dbPlayers: any[] = [];
      if (histMatch && histMatch.squad && histMatch.squad.length >= 11) {
        for (const hp of histMatch.squad) {
          const isEliteStar = hp.overall >= 89 || hp.marketValue >= 80000000;
          const clause = isEliteStar ? 1000000000 : Math.max(15000000, Math.round(hp.marketValue * randomInt(3, 4)));
          const cYears = randomInt(2, 5);
          const pObj: any = {
            leagueId,
            teamId,
            name: hp.name,
            age: hp.age,
            overall: hp.overall,
            potential: hp.potential,
            position: hp.position,
            specificPosition: (hp.specificPosition || (hp.position === 'POR' ? 'POR' : hp.position === 'DEF' ? 'DFC' : hp.position === 'MED' ? 'MC' : 'DC')) as any,
            contract: Math.max(400000, Math.floor(hp.marketValue * 0.075)),
            contractYears: cYears,
            contractEndSeason: startYear + cYears,
            releaseClause: clause,
            morale: randomInt(82, 95),
            fatigue: 0,
            injuryProne: randomInt(15, 55),
            personality: personalities[Math.floor(Math.random() * personalities.length)],
            developmentType: devTypes[Math.floor(Math.random() * devTypes.length)],
            unhappy: false,
            stats: getInitialPlayerStats(),
            attributes: hp.attributes,
            bio: {
              height: randomInt(172, 191),
              weight: randomInt(68, 86),
              country: hp.country,
              preferredFoot: Math.random() < 0.24 ? 'Left' : 'Right',
              weakFoot: randomInt(3, 5),
              skillMoves: randomInt(3, 5)
            }
          };
          pObj.detailedAttributes = getDetailedAttributes(pObj);
          dbPlayers.push(pObj);
        }
      } else if (fifaMatch && fifaMatch.squad.length > 0) {
        for (const fp of fifaMatch.squad) {
          const isEliteStar = fp.overall >= 89 || fp.marketValue >= 100000000;
          const clause = isEliteStar ? 1000000000 : Math.round(fp.marketValue * randomInt(3, 4));
          const cYears = randomInt(2, 5);
          const pObj: any = {
            leagueId,
            teamId,
            name: fp.name,
            age: fp.age,
            overall: fp.overall,
            potential: fp.potential,
            position: fp.position,
            specificPosition: fp.specificPosition || (fp.position === 'POR' ? 'POR' : fp.position === 'DEF' ? 'DFC' : fp.position === 'MED' ? 'MC' : 'DC'),
            secondaryPositions: fp.secondaryPositions,
            contract: Math.max(400000, Math.floor(fp.marketValue * 0.075)),
            contractYears: cYears,
            contractEndSeason: startYear + cYears,
            releaseClause: clause,
            morale: randomInt(82, 95),
            fatigue: 0,
            injuryProne: randomInt(15, 55),
            personality: personalities[Math.floor(Math.random() * personalities.length)],
            developmentType: devTypes[Math.floor(Math.random() * devTypes.length)],
            unhappy: false,
            stats: getInitialPlayerStats(),
            attributes: fp.attributes,
            detailedAttributes: fp.detailedAttributes,
            playStyles: fp.playStyles,
            bio: {
              height: fp.height || randomInt(174, 190),
              weight: fp.weight || randomInt(68, 86),
              country: fp.country,
              preferredFoot: fp.preferredFoot || 'Right',
              weakFoot: fp.weakFoot || 3,
              skillMoves: fp.skillMoves || 3
            }
          };
          if (!pObj.detailedAttributes) pObj.detailedAttributes = getDetailedAttributes(pObj);
          dbPlayers.push(pObj);
        }
      } else {
        const positions: ('POR' | 'DEF' | 'MED' | 'DEL')[] = ['POR', 'DEF', 'DEF', 'DEF', 'DEF', 'MED', 'MED', 'MED', 'MED', 'DEL', 'DEL', 'POR', 'DEF', 'DEF', 'MED', 'MED', 'DEL', 'DEL', 'MED', 'DEF'];
        const specificPositions: ('POR' | 'DFC' | 'LI' | 'LD' | 'MCD' | 'MC' | 'MCO' | 'EI' | 'ED' | 'DC')[] = [
          'POR', 'LI', 'DFC', 'DFC', 'LD', 'MCD', 'MC', 'MCO', 'MI' as any, 'EI', 'DC',
          'POR', 'DFC', 'LD', 'MC', 'MCO', 'ED', 'DC', 'MC', 'LI'
        ];
        for (let j = 0; j < 20; j++) {
          const overall = randomInt(72, 85);
          const potential = Math.min(99, overall + randomInt(1, 10));
          const cYears = randomInt(2, 4);
          const pObj: any = {
            leagueId,
            teamId,
            name: randomName(),
            age: randomInt(18, 33),
            overall,
            potential,
            position: positions[j],
            specificPosition: specificPositions[j],
            contract: randomInt(1000000, 5000000),
            contractYears: cYears,
            contractEndSeason: startYear + cYears,
            stats: getInitialPlayerStats(),
            attributes: {
              pace: randomInt(55, 92),
              shooting: randomInt(45, 90),
              passing: randomInt(55, 92),
              dribbling: randomInt(55, 92),
              defending: randomInt(40, 88),
              physical: randomInt(55, 88)
            },
            bio: {
              height: randomInt(170, 194),
              weight: randomInt(65, 88),
              country: countries[Math.floor(Math.random() * countries.length)],
              preferredFoot: Math.random() < 0.25 ? 'Left' : 'Right',
              weakFoot: 3,
              skillMoves: 3
            }
          };
          pObj.detailedAttributes = getDetailedAttributes(pObj);
          dbPlayers.push(pObj);
        }
      }

      // Pregenerate 5 Filial prospects
      const youthPositions: ('POR' | 'DEF' | 'MED' | 'DEL')[] = ['POR', 'DEF', 'MED', 'MED', 'DEL'];
      const youthSpecific: ('POR' | 'DFC' | 'MC' | 'MCO' | 'EI')[] = ['POR', 'DFC', 'MC', 'MCO', 'EI'];

      for (let y = 0; y < 5; y++) {
        const ovr = randomInt(62, 73);
        const pot = Math.min(96, ovr + randomInt(13, 22));
        const cYears = randomInt(3, 5);
        const ypObj: any = {
          leagueId,
          teamId,
          name: `${randomName()} (Canterano)`,
          age: randomInt(16, 18),
          overall: ovr,
          potential: pot,
          position: youthPositions[y],
          specificPosition: youthSpecific[y],
          contract: randomInt(250000, 750000),
          contractYears: cYears,
          contractEndSeason: startYear + cYears,
          lineupStatus: 'youth',
          personality: personalities[Math.floor(Math.random() * personalities.length)],
          developmentType: devTypes[Math.floor(Math.random() * devTypes.length)],
          fatigue: 0,
          morale: 92,
          injuryProne: randomInt(10, 50),
          stats: getInitialPlayerStats(),
          attributes: {
            pace: randomInt(62, 90),
            shooting: randomInt(50, 84),
            passing: randomInt(55, 86),
            dribbling: randomInt(60, 88),
            defending: randomInt(40, 80),
            physical: randomInt(50, 82)
          },
          bio: {
            height: randomInt(169, 191),
            weight: randomInt(62, 84),
            country: countries[Math.floor(Math.random() * countries.length)],
            preferredFoot: Math.random() < 0.25 ? 'Left' : 'Right',
            weakFoot: 3,
            skillMoves: 3
          }
        };
        ypObj.detailedAttributes = getDetailedAttributes(ypObj);
        dbPlayers.push(ypObj);
      }

      await db.players.bulkAdd(dbPlayers);
      await autoSelectLineupForTeam(teamId, tacId.formation);
    }

    const selectedTeamId = userTeamIndex >= 0 && userTeamIndex < createdTeamIds.length ? createdTeamIds[userTeamIndex] : createdTeamIds[0];
    await db.leagues.update(leagueId, { userTeamId: selectedTeamId });

    await generateLeagueFixtures(leagueId);

    // Simulate earlier weeks if starting in Winter Window or Final Stretch
    if (targetStartWeek > 1) {
      for (let w = 1; w < targetStartWeek; w++) {
        if (onProgress) {
          onProgress(`Simulando historial de temporada hasta Jornada ${targetStartWeek} (${w}/${targetStartWeek - 1})...`);
        }
        await advanceWeek(leagueId);
      }
    }

    return leagueId;
  } catch (err: any) {
    console.warn('Fallback to local FIFA Database creation:', err);
    return createNewLeague(leagueName, difficulty, userTeamIndex, startYear, startPeriod, competitionId, onProgress);
  }
}
