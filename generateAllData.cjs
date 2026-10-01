const fs = require('fs');
const readline = require('readline');

// Target club configurations with aliases, colors, budgets, and domestic league assignments
const clubMappings = [
  // --- LALIGA EA SPORTS (20) ---
  { csvNames: ['Real Madrid'], name: 'Real Madrid', league: 'LaLiga', country: 'España', budget: 250000000, pri: '#ffffff', sec: '#f59e0b', pat: 'solid', aliases: ['real madrid', 'madrid', 'los blancos', 'rm'] },
  { csvNames: ['FC Barcelona'], name: 'FC Barcelona', league: 'LaLiga', country: 'España', budget: 160000000, pri: '#004d98', sec: '#a50044', pat: 'stripes', aliases: ['fc barcelona', 'barcelona', 'barca', 'blaugrana', 'fcb'] },
  { csvNames: ['Atlético de Madrid', 'Atlético Madrid'], name: 'Atlético de Madrid', league: 'LaLiga', country: 'España', budget: 130000000, pri: '#cb3524', sec: '#ffffff', pat: 'stripes', aliases: ['atlético de madrid', 'atletico de madrid', 'atletico madrid', 'atleti', 'colchoneros', 'atm'] },
  { csvNames: ['Athletic Club'], name: 'Athletic Club', league: 'LaLiga', country: 'España', budget: 70000000, pri: '#ee2524', sec: '#ffffff', pat: 'stripes', aliases: ['athletic club', 'athletic', 'bilbao'] },
  { csvNames: ['Real Sociedad'], name: 'Real Sociedad', league: 'LaLiga', country: 'España', budget: 65000000, pri: '#0067b1', sec: '#ffffff', pat: 'stripes', aliases: ['real sociedad', 'la real', 'sociedad'] },
  { csvNames: ['Real Betis'], name: 'Real Betis', league: 'LaLiga', country: 'España', budget: 55000000, pri: '#0bb364', sec: '#ffffff', pat: 'stripes', aliases: ['real betis', 'betis', 'beticos'] },
  { csvNames: ['Villarreal CF'], name: 'Villarreal CF', league: 'LaLiga', country: 'España', budget: 60000000, pri: '#ffe600', sec: '#00519e', pat: 'solid', aliases: ['villarreal cf', 'villarreal', 'submarino amarillo'] },
  { csvNames: ['Valencia CF'], name: 'Valencia CF', league: 'LaLiga', country: 'España', budget: 50000000, pri: '#ffffff', sec: '#000000', pat: 'solid', aliases: ['valencia cf', 'valencia', 'los che'] },
  { csvNames: ['Sevilla FC'], name: 'Sevilla FC', league: 'LaLiga', country: 'España', budget: 55000000, pri: '#ffffff', sec: '#d4001f', pat: 'solid', aliases: ['sevilla fc', 'sevilla'] },
  { csvNames: ['Girona FC'], name: 'Girona FC', league: 'LaLiga', country: 'España', budget: 50000000, pri: '#d62718', sec: '#ffffff', pat: 'stripes', aliases: ['girona fc', 'girona'] },
  { csvNames: ['CA Osasuna'], name: 'CA Osasuna', league: 'LaLiga', country: 'España', budget: 35000000, pri: '#c8102e', sec: '#00205b', pat: 'solid', aliases: ['ca osasuna', 'osasuna', 'rojillos'] },
  { csvNames: ['Celta', 'RC Celta'], name: 'Celta de Vigo', league: 'LaLiga', country: 'España', budget: 35000000, pri: '#87ceeb', sec: '#ffffff', pat: 'solid', aliases: ['celta', 'celta de vigo', 'rc celta'] },
  { csvNames: ['Rayo Vallecano'], name: 'Rayo Vallecano', league: 'LaLiga', country: 'España', budget: 30000000, pri: '#ffffff', sec: '#de002b', pat: 'diagonal', aliases: ['rayo vallecano', 'rayo', 'franjirrojos'] },
  { csvNames: ['RCD Mallorca'], name: 'RCD Mallorca', league: 'LaLiga', country: 'España', budget: 32000000, pri: '#e20613', sec: '#000000', pat: 'solid', aliases: ['rcd mallorca', 'mallorca'] },
  { csvNames: ['Getafe CF'], name: 'Getafe CF', league: 'LaLiga', country: 'España', budget: 30000000, pri: '#00529f', sec: '#ffffff', pat: 'solid', aliases: ['getafe cf', 'getafe'] },
  { csvNames: ['D. Alavés', 'Deportivo Alavés'], name: 'Deportivo Alavés', league: 'LaLiga', country: 'España', budget: 28000000, pri: '#0055b8', sec: '#ffffff', pat: 'stripes', aliases: ['d. alavés', 'deportivo alavés', 'alaves'] },
  { csvNames: ['RCD Espanyol'], name: 'RCD Espanyol', league: 'LaLiga', country: 'España', budget: 30000000, pri: '#007fc8', sec: '#ffffff', pat: 'stripes', aliases: ['rcd espanyol', 'espanyol'] },
  { csvNames: ['UD Las Palmas'], name: 'UD Las Palmas', league: 'LaLiga', country: 'España', budget: 28000000, pri: '#f4ce14', sec: '#004fa3', pat: 'solid', aliases: ['ud las palmas', 'las palmas'] },
  { csvNames: ['CD Leganés'], name: 'CD Leganés', league: 'LaLiga', country: 'España', budget: 26000000, pri: '#005ba6', sec: '#ffffff', pat: 'stripes', aliases: ['cd leganés', 'leganes'] },
  { csvNames: ['R. Valladolid CF', 'Real Valladolid'], name: 'Real Valladolid', league: 'LaLiga', country: 'España', budget: 27000000, pri: '#5a2d82', sec: '#ffffff', pat: 'stripes', aliases: ['real valladolid', 'valladolid', 'pucela', 'r. valladolid cf'] },

  // --- PREMIER LEAGUE (20) ---
  { csvNames: ['Manchester City'], name: 'Manchester City', league: 'Premier League', country: 'Inglaterra', budget: 260000000, pri: '#6cabdd', sec: '#1c2c5b', pat: 'solid', aliases: ['manchester city', 'man city', 'city', 'citizens', 'mcfc'] },
  { csvNames: ['Arsenal'], name: 'Arsenal FC', league: 'Premier League', country: 'Inglaterra', budget: 180000000, pri: '#ef0107', sec: '#ffffff', pat: 'solid', aliases: ['arsenal', 'arsenal fc', 'gunners', 'afc'] },
  { csvNames: ['Liverpool'], name: 'Liverpool FC', league: 'Premier League', country: 'Inglaterra', budget: 190000000, pri: '#c8102e', sec: '#00b2a9', pat: 'solid', aliases: ['liverpool', 'liverpool fc', 'reds', 'lfc'] },
  { csvNames: ['Chelsea'], name: 'Chelsea FC', league: 'Premier League', country: 'Inglaterra', budget: 200000000, pri: '#034694', sec: '#ee242c', pat: 'solid', aliases: ['chelsea', 'chelsea fc', 'blues', 'cfc'] },
  { csvNames: ['Man Utd', 'Manchester United'], name: 'Manchester United', league: 'Premier League', country: 'Inglaterra', budget: 190000000, pri: '#da291c', sec: '#fbe122', pat: 'solid', aliases: ['man utd', 'manchester united', 'red devils', 'mufc', 'united'] },
  { csvNames: ['Spurs', 'Tottenham Hotspur'], name: 'Tottenham Hotspur', league: 'Premier League', country: 'Inglaterra', budget: 140000000, pri: '#132257', sec: '#ffffff', pat: 'solid', aliases: ['spurs', 'tottenham', 'tottenham hotspur', 'thfc'] },
  { csvNames: ['Newcastle Utd', 'Newcastle United'], name: 'Newcastle United', league: 'Premier League', country: 'Inglaterra', budget: 160000000, pri: '#241f20', sec: '#ffffff', pat: 'stripes', aliases: ['newcastle utd', 'newcastle united', 'magpies', 'nufc'] },
  { csvNames: ['Aston Villa'], name: 'Aston Villa', league: 'Premier League', country: 'Inglaterra', budget: 110000000, pri: '#95bfe5', sec: '#670e36', pat: 'solid', aliases: ['aston villa', 'villa', 'villans', 'avfc'] },
  { csvNames: ['Brighton'], name: 'Brighton & Hove Albion', league: 'Premier League', country: 'Inglaterra', budget: 95000000, pri: '#0057b8', sec: '#ffffff', pat: 'stripes', aliases: ['brighton', 'brighton & hove albion', 'seagulls', 'bha'] },
  { csvNames: ['West Ham'], name: 'West Ham United', league: 'Premier League', country: 'Inglaterra', budget: 85000000, pri: '#7a263a', sec: '#1bb1e7', pat: 'solid', aliases: ['west ham', 'west ham united', 'hammers', 'whufc'] },
  { csvNames: ['Everton'], name: 'Everton FC', league: 'Premier League', country: 'Inglaterra', budget: 70000000, pri: '#003399', sec: '#ffffff', pat: 'solid', aliases: ['everton', 'everton fc', 'toffees', 'efc'] },
  { csvNames: ['Fulham'], name: 'Fulham FC', league: 'Premier League', country: 'Inglaterra', budget: 65000000, pri: '#ffffff', sec: '#000000', pat: 'solid', aliases: ['fulham', 'fulham fc', 'cottagers', 'ffc'] },
  { csvNames: ['Wolves'], name: 'Wolverhampton Wanderers', league: 'Premier League', country: 'Inglaterra', budget: 65000000, pri: '#fdb913', sec: '#231f20', pat: 'solid', aliases: ['wolves', 'wolverhampton', 'wolverhampton wanderers', 'wwfc'] },
  { csvNames: ['Brentford'], name: 'Brentford FC', league: 'Premier League', country: 'Inglaterra', budget: 65000000, pri: '#e30613', sec: '#ffffff', pat: 'stripes', aliases: ['brentford', 'brentford fc', 'bees', 'bfc'] },
  { csvNames: ['Crystal Palace'], name: 'Crystal Palace', league: 'Premier League', country: 'Inglaterra', budget: 60000000, pri: '#1b458f', sec: '#c4122e', pat: 'stripes', aliases: ['crystal palace', 'palace', 'eagles', 'cpfc'] },
  { csvNames: ['AFC Bournemouth'], name: 'AFC Bournemouth', league: 'Premier League', country: 'Inglaterra', budget: 55000000, pri: '#da291c', sec: '#000000', pat: 'stripes', aliases: ['afc bournemouth', 'bournemouth', 'cherries'] },
  { csvNames: ["Nott'm Forest"], name: 'Nottingham Forest', league: 'Premier League', country: 'Inglaterra', budget: 65000000, pri: '#dd0000', sec: '#ffffff', pat: 'solid', aliases: ["nott'm forest", 'nottingham forest', 'forest', 'tricky trees'] },
  { csvNames: ['Leicester City'], name: 'Leicester City', league: 'Premier League', country: 'Inglaterra', budget: 60000000, pri: '#0053a0', sec: '#ffffff', pat: 'solid', aliases: ['leicester city', 'leicester', 'foxes', 'lcfc'] },
  { csvNames: ['Ipswich'], name: 'Ipswich Town', league: 'Premier League', country: 'Inglaterra', budget: 45000000, pri: '#003399', sec: '#ffffff', pat: 'solid', aliases: ['ipswich town', 'ipswich', 'tractor boys', 'itfc'] },
  { csvNames: ['Southampton'], name: 'Southampton FC', league: 'Premier League', country: 'Inglaterra', budget: 50000000, pri: '#d4001f', sec: '#ffffff', pat: 'stripes', aliases: ['southampton fc', 'southampton', 'saints', 'sfc'] },

  // --- SERIE A (20) ---
  { csvNames: ['Juventus'], name: 'Juventus', league: 'Serie A', country: 'Italia', budget: 130000000, pri: '#000000', sec: '#ffffff', pat: 'stripes', aliases: ['juventus', 'juve', 'bianconeri'] },
  { csvNames: ['Lombardia FC', 'Inter'], name: 'Inter', league: 'Serie A', country: 'Italia', budget: 120000000, pri: '#0066b2', sec: '#000000', pat: 'stripes', aliases: ['inter', 'inter de milan', 'internazionale', 'nerazzurri', 'lombardia fc', 'lombardia'] },
  { csvNames: ['Milano FC', 'Milan'], name: 'AC Milan', league: 'Serie A', country: 'Italia', budget: 110000000, pri: '#fb090b', sec: '#000000', pat: 'stripes', aliases: ['ac milan', 'milan', 'rossoneri', 'milano fc', 'milano'] },
  { csvNames: ['SSC Napoli'], name: 'Napoli', league: 'Serie A', country: 'Italia', budget: 95000000, pri: '#0080ff', sec: '#ffffff', pat: 'solid', aliases: ['napoli', 'ssc napoli', 'partenopei'] },
  { csvNames: ['AS Roma'], name: 'AS Roma', league: 'Serie A', country: 'Italia', budget: 75000000, pri: '#8e1f2f', sec: '#f0bc42', pat: 'solid', aliases: ['as roma', 'roma', 'giallorossi'] },
  { csvNames: ['Latium'], name: 'Lazio', league: 'Serie A', country: 'Italia', budget: 65000000, pri: '#87ceeb', sec: '#ffffff', pat: 'solid', aliases: ['lazio', 'ss lazio', 'biancocelesti', 'latium'] },
  { csvNames: ['Bergamo Calcio', 'Atalanta'], name: 'Atalanta', league: 'Serie A', country: 'Italia', budget: 70000000, pri: '#1e3d59', sec: '#000000', pat: 'stripes', aliases: ['atalanta', 'bergamo calcio', 'dea', 'bergamo'] },
  { csvNames: ['Fiorentina'], name: 'Fiorentina', league: 'Serie A', country: 'Italia', budget: 50000000, pri: '#4c2682', sec: '#ffffff', pat: 'solid', aliases: ['fiorentina', 'viola'] },
  { csvNames: ['Bologna'], name: 'Bologna', league: 'Serie A', country: 'Italia', budget: 50000000, pri: '#1a2e5a', sec: '#a6192e', pat: 'stripes', aliases: ['bologna', 'rossoblu'] },
  { csvNames: ['Torino'], name: 'Torino', league: 'Serie A', country: 'Italia', budget: 45000000, pri: '#8a151b', sec: '#ffffff', pat: 'solid', aliases: ['torino', 'granata'] },
  { csvNames: ['Udinese'], name: 'Udinese', league: 'Serie A', country: 'Italia', budget: 40000000, pri: '#000000', sec: '#ffffff', pat: 'stripes', aliases: ['udinese', 'bianconeri friulani'] },
  { csvNames: ['Genoa'], name: 'Genoa', league: 'Serie A', country: 'Italia', budget: 40000000, pri: '#a21d22', sec: '#0d2240', pat: 'stripes', aliases: ['genoa', 'grifone'] },
  { csvNames: ['Como'], name: 'Como 1907', league: 'Serie A', country: 'Italia', budget: 45000000, pri: '#00438c', sec: '#ffffff', pat: 'solid', aliases: ['como', 'como 1907'] },
  { csvNames: ['Parma'], name: 'Parma Calcio', league: 'Serie A', country: 'Italia', budget: 35000000, pri: '#ffe600', sec: '#003399', pat: 'solid', aliases: ['parma', 'parma calcio', 'crociati'] },
  { csvNames: ['Cagliari'], name: 'Cagliari', league: 'Serie A', country: 'Italia', budget: 35000000, pri: '#b8122a', sec: '#002554', pat: 'stripes', aliases: ['cagliari', 'isolani'] },
  { csvNames: ['Lecce'], name: 'Lecce', league: 'Serie A', country: 'Italia', budget: 30000000, pri: '#fed100', sec: '#da291c', pat: 'stripes', aliases: ['lecce', 'salentini'] },
  { csvNames: ['Sassuolo'], name: 'Sassuolo', league: 'Serie A', country: 'Italia', budget: 35000000, pri: '#00a651', sec: '#000000', pat: 'stripes', aliases: ['sassuolo', 'neroverdi'] },
  { csvNames: ['Hellas Verona'], name: 'Hellas Verona', league: 'Serie A', country: 'Italia', budget: 32000000, pri: '#002b66', sec: '#ffdd00', pat: 'solid', aliases: ['hellas verona', 'verona', 'scaligeri'] },
  { csvNames: ['Cremonese'], name: 'Cremonese', league: 'Serie A', country: 'Italia', budget: 28000000, pri: '#808285', sec: '#da291c', pat: 'stripes', aliases: ['cremonese', 'grigiorossi'] },
  { csvNames: ['Pisa'], name: 'Pisa SC', league: 'Serie A', country: 'Italia', budget: 28000000, pri: '#000000', sec: '#0055b8', pat: 'stripes', aliases: ['pisa', 'pisa sc', 'nerazzurri toscani'] },

  // --- BUNDESLIGA (18) ---
  { csvNames: ['FC Bayern München', 'FC Bayern'], name: 'Bayern München', league: 'Bundesliga', country: 'Alemania', budget: 200000000, pri: '#dc052d', sec: '#ffffff', pat: 'solid', aliases: ['bayern münchen', 'bayern', 'fc bayern', 'bavarians'] },
  { csvNames: ['Borussia Dortmund'], name: 'Borussia Dortmund', league: 'Bundesliga', country: 'Alemania', budget: 110000000, pri: '#fde100', sec: '#000000', pat: 'solid', aliases: ['borussia dortmund', 'dortmund', 'bvb'] },
  { csvNames: ['Leverkusen', 'Bayer 04 Leverkusen'], name: 'Bayer 04 Leverkusen', league: 'Bundesliga', country: 'Alemania', budget: 100000000, pri: '#e32221', sec: '#000000', pat: 'solid', aliases: ['bayer 04 leverkusen', 'leverkusen', 'werkself'] },
  { csvNames: ['RB Leipzig'], name: 'RB Leipzig', league: 'Bundesliga', country: 'Alemania', budget: 90000000, pri: '#ffffff', sec: '#dd0741', pat: 'solid', aliases: ['rb leipzig', 'leipzig', 'die roten bullen'] },
  { csvNames: ['Frankfurt', 'Eintracht Frankfurt'], name: 'Eintracht Frankfurt', league: 'Bundesliga', country: 'Alemania', budget: 65000000, pri: '#e1000f', sec: '#000000', pat: 'solid', aliases: ['eintracht frankfurt', 'frankfurt', 'adler'] },
  { csvNames: ['VfB Stuttgart'], name: 'VfB Stuttgart', league: 'Bundesliga', country: 'Alemania', budget: 60000000, pri: '#ffffff', sec: '#e32219', pat: 'solid', aliases: ['vfb stuttgart', 'stuttgart', 'die schwaben'] },
  { csvNames: ['SC Freiburg'], name: 'SC Freiburg', league: 'Bundesliga', country: 'Alemania', budget: 50000000, pri: '#000000', sec: '#ffffff', pat: 'stripes', aliases: ['sc freiburg', 'freiburg', 'breisgau-brasilianer'] },
  { csvNames: ['TSG Hoffenheim'], name: 'TSG Hoffenheim', league: 'Bundesliga', country: 'Alemania', budget: 50000000, pri: '#1961b5', sec: '#ffffff', pat: 'solid', aliases: ['tsg hoffenheim', 'hoffenheim'] },
  { csvNames: ['SV Werder Bremen'], name: 'Werder Bremen', league: 'Bundesliga', country: 'Alemania', budget: 45000000, pri: '#1d9053', sec: '#ffffff', pat: 'solid', aliases: ['sv werder bremen', 'werder bremen', 'bremen'] },
  { csvNames: ['FC Augsburg'], name: 'FC Augsburg', league: 'Bundesliga', country: 'Alemania', budget: 40000000, pri: '#ba3733', sec: '#00623e', pat: 'solid', aliases: ['fc augsburg', 'augsburg', 'fuggerstädter'] },
  { csvNames: ['1. FSV Mainz 05'], name: 'Mainz 05', league: 'Bundesliga', country: 'Alemania', budget: 40000000, pri: '#c8102e', sec: '#ffffff', pat: 'solid', aliases: ['1. fsv mainz 05', 'mainz 05', 'mainz', 'die nullfünfer'] },
  { csvNames: ['Union Berlin'], name: 'Union Berlin', league: 'Bundesliga', country: 'Alemania', budget: 45000000, pri: '#ee1d23', sec: '#ffffff', pat: 'solid', aliases: ['union berlin', 'eisern union'] },
  { csvNames: ['VfL Wolfsburg'], name: 'VfL Wolfsburg', league: 'Bundesliga', country: 'Alemania', budget: 55000000, pri: '#65b32e', sec: '#ffffff', pat: 'solid', aliases: ['vfl wolfsburg', 'wolfsburg', 'wölfe'] },
  { csvNames: ["M'gladbach", 'Borussia Mönchengladbach'], name: 'Borussia Mönchengladbach', league: 'Bundesliga', country: 'Alemania', budget: 50000000, pri: '#ffffff', sec: '#009a49', pat: 'stripes', aliases: ["m'gladbach", 'borussia mönchengladbach', 'gladbach', 'foals'] },
  { csvNames: ['FC St. Pauli'], name: 'FC St. Pauli', league: 'Bundesliga', country: 'Alemania', budget: 35000000, pri: '#634735', sec: '#ffffff', pat: 'solid', aliases: ['fc st. pauli', 'st. pauli', 'kiezkicker'] },
  { csvNames: ['Heidenheim', '1. FC Heidenheim'], name: '1. FC Heidenheim', league: 'Bundesliga', country: 'Alemania', budget: 35000000, pri: '#e30613', sec: '#003a70', pat: 'solid', aliases: ['heidenheim', '1. fc heidenheim'] },
  { csvNames: ['1. FC Köln'], name: '1. FC Köln', league: 'Bundesliga', country: 'Alemania', budget: 40000000, pri: '#ed1c24', sec: '#ffffff', pat: 'solid', aliases: ['1. fc köln', 'köln', 'cologne', 'geißböcke'] },
  { csvNames: ['Hamburger SV'], name: 'Hamburger SV', league: 'Bundesliga', country: 'Alemania', budget: 45000000, pri: '#005ca9', sec: '#ffffff', pat: 'solid', aliases: ['hamburger sv', 'hamburg', 'hsv', 'rothosen'] },

  // --- LIGUE 1 (18) ---
  { csvNames: ['Paris SG'], name: 'Paris Saint-Germain', league: 'Ligue 1', country: 'Francia', budget: 250000000, pri: '#004170', sec: '#da291c', pat: 'solid', aliases: ['paris sg', 'paris saint-germain', 'psg'] },
  { csvNames: ['OM', 'Olympique de Marseille'], name: 'Olympique de Marseille', league: 'Ligue 1', country: 'Francia', budget: 75000000, pri: '#2faee0', sec: '#ffffff', pat: 'solid', aliases: ['olympique de marseille', 'marseille', 'om'] },
  { csvNames: ['OL', 'Olympique Lyonnais'], name: 'Olympique Lyonnais', league: 'Ligue 1', country: 'Francia', budget: 70000000, pri: '#ffffff', sec: '#da291c', pat: 'stripes', aliases: ['olympique lyonnais', 'lyon', 'ol'] },
  { csvNames: ['AS Monaco'], name: 'AS Monaco', league: 'Ligue 1', country: 'Francia', budget: 75000000, pri: '#e20613', sec: '#ffffff', pat: 'diagonal', aliases: ['as monaco', 'monaco', 'asm'] },
  { csvNames: ['LOSC Lille', 'LOSC'], name: 'LOSC Lille', league: 'Ligue 1', country: 'Francia', budget: 60000000, pri: '#e01e2b', sec: '#122649', pat: 'solid', aliases: ['losc lille', 'lille', 'losc', 'dogues'] },
  { csvNames: ['RC Lens'], name: 'RC Lens', league: 'Ligue 1', country: 'Francia', budget: 50000000, pri: '#e20613', sec: '#ffd100', pat: 'stripes', aliases: ['rc lens', 'lens', 'sang et or'] },
  { csvNames: ['Stade Rennais FC', 'Stade Rennais'], name: 'Stade Rennais', league: 'Ligue 1', country: 'Francia', budget: 55000000, pri: '#e30613', sec: '#000000', pat: 'solid', aliases: ['stade rennais fc', 'stade rennais', 'rennes'] },
  { csvNames: ['OGC Nice'], name: 'OGC Nice', league: 'Ligue 1', country: 'Francia', budget: 55000000, pri: '#da291c', sec: '#000000', pat: 'stripes', aliases: ['ogc nice', 'nice', 'aiglons'] },
  { csvNames: ['Stade Brestois 29', 'Stade Brestois'], name: 'Stade Brestois', league: 'Ligue 1', country: 'Francia', budget: 40000000, pri: '#e30613', sec: '#ffffff', pat: 'solid', aliases: ['stade brestois 29', 'stade brestois', 'brest'] },
  { csvNames: ['Strasbourg', 'RC Strasbourg'], name: 'RC Strasbourg', league: 'Ligue 1', country: 'Francia', budget: 45000000, pri: '#0072bb', sec: '#ffffff', pat: 'solid', aliases: ['strasbourg', 'rc strasbourg', 'racing'] },
  { csvNames: ['Toulouse FC'], name: 'Toulouse FC', league: 'Ligue 1', country: 'Francia', budget: 35000000, pri: '#4f2d7f', sec: '#ffffff', pat: 'solid', aliases: ['toulouse fc', 'toulouse', 'téfécé'] },
  { csvNames: ['FC Nantes'], name: 'FC Nantes', league: 'Ligue 1', country: 'Francia', budget: 35000000, pri: '#ffea00', sec: '#00843d', pat: 'solid', aliases: ['fc nantes', 'nantes', 'canaris'] },
  { csvNames: ['Paris FC'], name: 'Paris FC', league: 'Ligue 1', country: 'Francia', budget: 45000000, pri: '#002554', sec: '#ffffff', pat: 'solid', aliases: ['paris fc'] },
  { csvNames: ['AJ Auxerre'], name: 'AJ Auxerre', league: 'Ligue 1', country: 'Francia', budget: 30000000, pri: '#0055a5', sec: '#ffffff', pat: 'solid', aliases: ['aj auxerre', 'auxerre', 'aja'] },
  { csvNames: ['Havre AC', 'Le Havre AC'], name: 'Le Havre AC', league: 'Ligue 1', country: 'Francia', budget: 28000000, pri: '#87ceeb', sec: '#00205b', pat: 'stripes', aliases: ['havre ac', 'le havre ac', 'le havre'] },
  { csvNames: ['Angers SCO'], name: 'Angers SCO', league: 'Ligue 1', country: 'Francia', budget: 28000000, pri: '#000000', sec: '#ffffff', pat: 'stripes', aliases: ['angers sco', 'angers'] },
  { csvNames: ['FC Lorient'], name: 'FC Lorient', league: 'Ligue 1', country: 'Francia', budget: 30000000, pri: '#f26522', sec: '#000000', pat: 'solid', aliases: ['fc lorient', 'lorient', 'merlus'] },
  { csvNames: ['FC Metz'], name: 'FC Metz', league: 'Ligue 1', country: 'Francia', budget: 28000000, pri: '#8a1538', sec: '#ffffff', pat: 'solid', aliases: ['fc metz', 'metz', 'grenats'] },

  // --- LPF ARGENTINA (16) ---
  { csvNames: ['River Plate'], name: 'River Plate', league: 'Liga Profesional', country: 'Argentina', budget: 70000000, pri: '#ffffff', sec: '#ee1c25', pat: 'diagonal', aliases: ['river plate', 'river', 'millonario', 'carp'] },
  { csvNames: ['Boca Juniors'], name: 'Boca Juniors', league: 'Liga Profesional', country: 'Argentina', budget: 65000000, pri: '#0033a0', sec: '#ffc72c', pat: 'solid', aliases: ['boca juniors', 'boca', 'xeneize', 'cabj'] },
  { csvNames: ['Racing Club'], name: 'Racing Club', league: 'Liga Profesional', country: 'Argentina', budget: 45000000, pri: '#87ceeb', sec: '#ffffff', pat: 'stripes', aliases: ['racing club', 'racing', 'la academia'] },
  { csvNames: ['Independiente'], name: 'Independiente', league: 'Liga Profesional', country: 'Argentina', budget: 40000000, pri: '#e30613', sec: '#ffffff', pat: 'solid', aliases: ['independiente', 'rojo', 'rey de copas', 'cai'] },
  { csvNames: ['San Lorenzo'], name: 'San Lorenzo', league: 'Liga Profesional', country: 'Argentina', budget: 35000000, pri: '#00205b', sec: '#c8102e', pat: 'stripes', aliases: ['san lorenzo', 'cuervo', 'ciclón', 'casla'] },
  { csvNames: ['Vélez Sarsfield'], name: 'Vélez Sarsfield', league: 'Liga Profesional', country: 'Argentina', budget: 35000000, pri: '#003399', sec: '#ffffff', pat: 'solid', aliases: ['vélez sarsfield', 'velez sarsfield', 'velez', 'fortín'] },
  { csvNames: ['Estudiantes'], name: 'Estudiantes de La Plata', league: 'Liga Profesional', country: 'Argentina', budget: 35000000, pri: '#e30613', sec: '#ffffff', pat: 'stripes', aliases: ['estudiantes', 'estudiantes de la plata', 'pincha', 'edlp'] },
  { csvNames: ['Lanús'], name: 'Lanús', league: 'Liga Profesional', country: 'Argentina', budget: 30000000, pri: '#800020', sec: '#ffffff', pat: 'solid', aliases: ['lanús', 'lanus', 'granate'] },
  { csvNames: ['Rosario Central'], name: 'Rosario Central', league: 'Liga Profesional', country: 'Argentina', budget: 32000000, pri: '#002b66', sec: '#ffdd00', pat: 'stripes', aliases: ['rosario central', 'central', 'canalla'] },
  { csvNames: ["Newell's"], name: "Newell's Old Boys", league: 'Liga Profesional', country: 'Argentina', budget: 30000000, pri: '#e30613', sec: '#000000', pat: 'stripes', aliases: ["newell's", "newell's old boys", 'newells', 'lepra', 'nob'] },
  { csvNames: ['Talleres'], name: 'Talleres de Córdoba', league: 'Liga Profesional', country: 'Argentina', budget: 35000000, pri: '#00205b', sec: '#ffffff', pat: 'stripes', aliases: ['talleres', 'talleres de córdoba', 'matador'] },
  { csvNames: ['Argentinos Jrs.'], name: 'Argentinos Juniors', league: 'Liga Profesional', country: 'Argentina', budget: 28000000, pri: '#da291c', sec: '#ffffff', pat: 'solid', aliases: ['argentinos jrs.', 'argentinos juniors', 'bicho'] },
  { csvNames: ['Defensa'], name: 'Defensa y Justicia', league: 'Liga Profesional', country: 'Argentina', budget: 25000000, pri: '#007a3d', sec: '#ffc72c', pat: 'solid', aliases: ['defensa', 'defensa y justicia', 'halcón'] },
  { csvNames: ['Huracán'], name: 'Huracán', league: 'Liga Profesional', country: 'Argentina', budget: 26000000, pri: '#ffffff', sec: '#da291c', pat: 'solid', aliases: ['huracán', 'huracan', 'globo'] },
  { csvNames: ['Godoy Cruz'], name: 'Godoy Cruz', league: 'Liga Profesional', country: 'Argentina', budget: 25000000, pri: '#003399', sec: '#ffffff', pat: 'stripes', aliases: ['godoy cruz', 'tomba'] },
  { csvNames: ['Belgrano'], name: 'Belgrano de Córdoba', league: 'Liga Profesional', country: 'Argentina', budget: 26000000, pri: '#87ceeb', sec: '#000000', pat: 'solid', aliases: ['belgrano', 'belgrano de córdoba', 'pirata'] },

  // --- ÍCONOS MUNDIALES (7) ---
  { csvNames: ['Inter Miami CF'], name: 'Inter Miami CF', league: 'MLS', country: 'Estados Unidos', budget: 90000000, pri: '#f7b5cd', sec: '#231f20', pat: 'solid', aliases: ['inter miami cf', 'inter miami', 'miami', 'herons'] },
  { csvNames: ['Al Nassr'], name: 'Al Nassr', league: 'Saudi Pro League', country: 'Arabia Saudita', budget: 140000000, pri: '#fbee21', sec: '#002f6c', pat: 'solid', aliases: ['al nassr', 'nassr', 'cr7 team'] },
  { csvNames: ['Al Hilal'], name: 'Al Hilal', league: 'Saudi Pro League', country: 'Arabia Saudita', budget: 150000000, pri: '#002f6c', sec: '#ffffff', pat: 'solid', aliases: ['al hilal', 'hilal', 'blue waves'] },
  { csvNames: ['Al Ittihad'], name: 'Al Ittihad', league: 'Saudi Pro League', country: 'Arabia Saudita', budget: 120000000, pri: '#fbee21', sec: '#000000', pat: 'stripes', aliases: ['al ittihad', 'ittihad', 'tigers'] },
  { csvNames: ['Sporting CP'], name: 'Sporting CP', league: 'Liga Portugal', country: 'Portugal', budget: 70000000, pri: '#006633', sec: '#ffffff', pat: 'stripes', aliases: ['sporting cp', 'sporting', 'leões'] },
  { csvNames: ['SL Benfica'], name: 'SL Benfica', league: 'Liga Portugal', country: 'Portugal', budget: 75000000, pri: '#e30613', sec: '#ffffff', pat: 'solid', aliases: ['sl benfica', 'benfica', 'águilas'] },
  { csvNames: ['FC Porto'], name: 'FC Porto', league: 'Liga Portugal', country: 'Portugal', budget: 70000000, pri: '#003399', sec: '#ffffff', pat: 'stripes', aliases: ['fc porto', 'porto', 'dragões'] }
];

const csvMap = new Map();
clubMappings.forEach(cfg => {
  cfg.squad = [];
  cfg.csvNames.forEach(cn => csvMap.set(cn.toLowerCase(), cfg));
});

function parseCSVLine(text) {
  let ret = [''];
  let i = 0;
  let p = '', s = true;
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
  return Math.max(400000, Math.round(base));
}

function calculatePotential(ovr, age) {
  if (age <= 20) return Math.min(99, ovr + Math.floor(Math.random() * 8) + 6);
  if (age <= 23) return Math.min(99, ovr + Math.floor(Math.random() * 6) + 3);
  if (age <= 26) return Math.min(99, ovr + Math.floor(Math.random() * 4) + 1);
  return Math.max(ovr, Math.min(99, ovr + Math.floor(Math.random() * 2)));
}

async function processAll() {
  console.log('Reading temp_eafc/EAFC26-Men.csv for all 119 clubs...');
  const fileStream = fs.createReadStream('temp_eafc/EAFC26-Men.csv');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let isFirstLine = true;
  let headers = [];
  let rowCount = 0;
  const allParsedPlayers = [];

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

    const ovr = parseInt(obj['OVR']) || 72;
    const age = parseInt(obj['Age']) || 25;
    const pos = mapPosition(obj['Position']);
    const specPos = mapSpecificPosition(obj['Position']);
    const pot = calculatePotential(ovr, age);
    const mv = calculateMarketValue(ovr, age);
    const playerName = obj['Name'] || 'Desconocido';
    const nation = obj['Nation'] || 'España';

    const playerData = {
      name: playerName,
      age,
      overall: ovr,
      potential: pot,
      position: pos,
      specificPosition: specPos,
      marketValue: mv,
      country: nation,
      attributes: {
        pace: parseInt(obj['PAC']) || 60,
        shooting: parseInt(obj['SHO']) || 55,
        passing: parseInt(obj['PAS']) || 60,
        dribbling: parseInt(obj['DRI']) || 60,
        defending: parseInt(obj['DEF']) || 55,
        physical: parseInt(obj['PHY']) || 60
      }
    };

    if (config) {
      config.squad.push(playerData);
    }

    // Keep top players for offline Transfermarkt search
    if (ovr >= 78 || mv >= 15000000) {
      allParsedPlayers.push({
        id: obj['ID'] || `ea-${rowCount}`,
        name: playerName,
        position: `${pos} (${specPos})`,
        age,
        nationalities: [nation],
        club: { id: config ? config.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'club', name: config ? config.name : eaTeam },
        marketValue: mv
      });
    }
  }

  console.log(`Processed ${rowCount} rows from EAFC26.`);

  const finalTeams = [];
  clubMappings.forEach(cfg => {
    if (cfg.squad.length > 0) {
      cfg.squad.sort((a, b) => b.overall - a.overall);
      // Keep up to 26 players per club for optimal roster balance
      const topSquad = cfg.squad.slice(0, 26);
      const top11 = topSquad.slice(0, 11);
      const sum = top11.reduce((acc, p) => acc + p.overall, 0);
      const avg = Math.round(sum / top11.length);

      finalTeams.push({
        name: cfg.name,
        aliases: cfg.aliases,
        domesticLeague: cfg.league,
        country: cfg.country,
        overall: avg,
        budget: cfg.budget,
        primaryColor: cfg.pri,
        secondaryColor: cfg.sec,
        pattern: cfg.pat,
        squad: topSquad
      });
      console.log(`✔ [${cfg.name}] squad: ${topSquad.length}, top11 ovr: ${avg}`);
    } else {
      console.warn(`⚠ Warning: No players found for ${cfg.name}`);
    }
  });

  const fifaOutput = `export interface FIFAPlayerData {
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
  domesticLeague: string;
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

  fs.writeFileSync('src/services/fifaData.ts', fifaOutput);
  console.log(`Successfully generated src/services/fifaData.ts with ${finalTeams.length} clubs!`);

  // Now build rich OFFLINE_CLUBS and OFFLINE_PLAYERS for Transfermarkt
  const offlineClubs = finalTeams.map((t, idx) => ({
    id: String(idx + 100),
    name: t.name,
    country: t.country,
    squad: t.squad.length,
    marketValue: t.budget * 4
  }));

  // Sort top players by market value descending
  allParsedPlayers.sort((a, b) => b.marketValue - a.marketValue);
  const top1000Players = allParsedPlayers.slice(0, 1200).map(p => ({
    ...p,
    height: 180,
    marketValueHistory: [
      { date: '2022', marketValue: Math.round(p.marketValue * 0.65), clubName: p.club.name },
      { date: '2024', marketValue: Math.round(p.marketValue * 0.85), clubName: p.club.name },
      { date: '2026', marketValue: p.marketValue, clubName: p.club.name }
    ]
  }));

  const tmDataOutput = `export interface OfflinePlayer {
  id: string;
  name: string;
  position: string;
  age: number;
  nationalities: string[];
  club: { id: string; name: string };
  marketValue: number;
  height?: number;
  marketValueHistory?: { date: string; marketValue: number; clubName: string }[];
}

export interface OfflineClub {
  id: string;
  name: string;
  country: string;
  squad: number;
  marketValue: number;
}

export const OFFLINE_CLUBS: OfflineClub[] = ${JSON.stringify(offlineClubs, null, 2)};

export const OFFLINE_PLAYERS: OfflinePlayer[] = ${JSON.stringify(top1000Players, null, 2)};
`;

  fs.writeFileSync('src/services/transfermarktData.ts', tmDataOutput);
  console.log(`Successfully generated src/services/transfermarktData.ts with ${offlineClubs.length} clubs and ${top1000Players.length} elite players!`);
}

processAll().catch(console.error);
