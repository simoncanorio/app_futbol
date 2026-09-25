export interface OfflinePlayer {
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

export const OFFLINE_CLUBS: OfflineClub[] = [
  // LaLiga España (20 Equipos)
  { id: '418', name: 'Real Madrid', country: 'España', squad: 24, marketValue: 1350000000 },
  { id: '131', name: 'FC Barcelona', country: 'España', squad: 25, marketValue: 980000000 },
  { id: '13', name: 'Atlético de Madrid', country: 'España', squad: 23, marketValue: 510000000 },
  { id: '621', name: 'Athletic Club', country: 'España', squad: 24, marketValue: 340000000 },
  { id: '681', name: 'Real Sociedad', country: 'España', squad: 25, marketValue: 420000000 },
  { id: '150', name: 'Real Betis', country: 'España', squad: 24, marketValue: 210000000 },
  { id: '1050', name: 'Villarreal CF', country: 'España', squad: 24, marketValue: 240000000 },
  { id: '1049', name: 'Valencia CF', country: 'España', squad: 23, marketValue: 250000000 },
  { id: '940', name: 'Celta de Vigo', country: 'España', squad: 24, marketValue: 120000000 },
  { id: '368', name: 'Sevilla FC', country: 'España', squad: 25, marketValue: 180000000 },
  { id: '12321', name: 'Girona FC', country: 'España', squad: 24, marketValue: 210000000 },
  { id: '331', name: 'CA Osasuna', country: 'España', squad: 24, marketValue: 110000000 },
  { id: '367', name: 'Rayo Vallecano', country: 'España', squad: 23, marketValue: 85000000 },
  { id: '237', name: 'RCD Mallorca', country: 'España', squad: 24, marketValue: 95000000 },
  { id: '3709', name: 'Getafe CF', country: 'España', squad: 23, marketValue: 70000000 },
  { id: '1108', name: 'Deportivo Alavés', country: 'España', squad: 24, marketValue: 80000000 },
  { id: '472', name: 'UD Las Palmas', country: 'España', squad: 24, marketValue: 75000000 },
  { id: '714', name: 'RCD Espanyol', country: 'España', squad: 24, marketValue: 65000000 },
  { id: '1533', name: 'Real Valladolid', country: 'España', squad: 24, marketValue: 55000000 },
  { id: '1244', name: 'CD Leganés', country: 'España', squad: 24, marketValue: 50000000 },

  // Premier League Inglaterra (20 Equipos)
  { id: '281', name: 'Manchester City', country: 'Inglaterra', squad: 24, marketValue: 1260000000 },
  { id: '31', name: 'Liverpool FC', country: 'Inglaterra', squad: 25, marketValue: 920000000 },
  { id: '11', name: 'Arsenal FC', country: 'Inglaterra', squad: 24, marketValue: 1150000000 },
  { id: '631', name: 'Chelsea FC', country: 'Inglaterra', squad: 28, marketValue: 950000000 },
  { id: '985', name: 'Manchester United', country: 'Inglaterra', squad: 26, marketValue: 750000000 },
  { id: '148', name: 'Tottenham Hotspur', country: 'Inglaterra', squad: 25, marketValue: 780000000 },
  { id: '762', name: 'Newcastle United', country: 'Inglaterra', squad: 25, marketValue: 650000000 },
  { id: '405', name: 'Aston Villa', country: 'Inglaterra', squad: 25, marketValue: 610000000 },
  { id: '1237', name: 'Brighton & Hove Albion', country: 'Inglaterra', squad: 26, marketValue: 540000000 },
  { id: '379', name: 'West Ham United', country: 'Inglaterra', squad: 24, marketValue: 450000000 },
  { id: '29', name: 'Everton FC', country: 'Inglaterra', squad: 24, marketValue: 320000000 },
  { id: '931', name: 'Fulham FC', country: 'Inglaterra', squad: 24, marketValue: 340000000 },
  { id: '543', name: 'Wolverhampton Wanderers', country: 'Inglaterra', squad: 24, marketValue: 310000000 },
  { id: '1148', name: 'Brentford FC', country: 'Inglaterra', squad: 25, marketValue: 410000000 },
  { id: '873', name: 'Crystal Palace', country: 'Inglaterra', squad: 24, marketValue: 390000000 },
  { id: '989', name: 'AFC Bournemouth', country: 'Inglaterra', squad: 24, marketValue: 350000000 },
  { id: '703', name: 'Nottingham Forest', country: 'Inglaterra', squad: 26, marketValue: 420000000 },
  { id: '1003', name: 'Leicester City', country: 'Inglaterra', squad: 25, marketValue: 280000000 },
  { id: '603', name: 'Ipswich Town', country: 'Inglaterra', squad: 24, marketValue: 160000000 },
  { id: '350', name: 'Southampton FC', country: 'Inglaterra', squad: 25, marketValue: 240000000 }
];

export const OFFLINE_PLAYERS: OfflinePlayer[] = [
  {
    id: 'mbappe-1',
    name: 'Kylian Mbappé',
    position: 'Delantero Centro / Extremo',
    age: 27,
    nationalities: ['Francia'],
    club: { id: '418', name: 'Real Madrid' },
    marketValue: 180000000,
    height: 178,
    marketValueHistory: [
      { date: '2020', marketValue: 180000000, clubName: 'PSG' },
      { date: '2022', marketValue: 160000000, clubName: 'PSG' },
      { date: '2024', marketValue: 180000000, clubName: 'Real Madrid' }
    ]
  },
  {
    id: 'vinicius-1',
    name: 'Vinicius Jr',
    position: 'Extremo Izquierdo',
    age: 25,
    nationalities: ['Brasil'],
    club: { id: '418', name: 'Real Madrid' },
    marketValue: 200000000,
    height: 176,
    marketValueHistory: [
      { date: '2021', marketValue: 50000000, clubName: 'Real Madrid' },
      { date: '2023', marketValue: 150000000, clubName: 'Real Madrid' },
      { date: '2025', marketValue: 200000000, clubName: 'Real Madrid' }
    ]
  },
  {
    id: 'bellingham-1',
    name: 'Jude Bellingham',
    position: 'Centrocampista Ofensivo',
    age: 22,
    nationalities: ['Inglaterra'],
    club: { id: '418', name: 'Real Madrid' },
    marketValue: 180000000,
    height: 186,
    marketValueHistory: [
      { date: '2021', marketValue: 55000000, clubName: 'Borussia Dortmund' },
      { date: '2023', marketValue: 120000000, clubName: 'Real Madrid' },
      { date: '2025', marketValue: 180000000, clubName: 'Real Madrid' }
    ]
  },
  {
    id: 'yamal-1',
    name: 'Lamine Yamal',
    position: 'Extremo Derecho',
    age: 18,
    nationalities: ['España'],
    club: { id: '131', name: 'FC Barcelona' },
    marketValue: 180000000,
    height: 180,
    marketValueHistory: [
      { date: '2023', marketValue: 25000000, clubName: 'FC Barcelona' },
      { date: '2024', marketValue: 120000000, clubName: 'FC Barcelona' },
      { date: '2026', marketValue: 180000000, clubName: 'FC Barcelona' }
    ]
  },
  {
    id: 'haaland-1',
    name: 'Erling Haaland',
    position: 'Delantero Centro',
    age: 25,
    nationalities: ['Noruega'],
    club: { id: '281', name: 'Manchester City' },
    marketValue: 200000000,
    height: 194,
    marketValueHistory: [
      { date: '2021', marketValue: 130000000, clubName: 'Borussia Dortmund' },
      { date: '2023', marketValue: 180000000, clubName: 'Manchester City' },
      { date: '2025', marketValue: 200000000, clubName: 'Manchester City' }
    ]
  },
  {
    id: 'pedri-1',
    name: 'Pedri',
    position: 'Centrocampista',
    age: 23,
    nationalities: ['España'],
    club: { id: '131', name: 'FC Barcelona' },
    marketValue: 100000000,
    height: 174
  },
  {
    id: 'rodri-1',
    name: 'Rodri',
    position: 'Pivote Defensivo',
    age: 29,
    nationalities: ['España'],
    club: { id: '281', name: 'Manchester City' },
    marketValue: 130000000,
    height: 191
  },
  {
    id: 'salah-1',
    name: 'Mohamed Salah',
    position: 'Extremo Derecho',
    age: 33,
    nationalities: ['Egipto'],
    club: { id: '31', name: 'Liverpool FC' },
    marketValue: 55000000,
    height: 175
  },
  {
    id: 'kane-1',
    name: 'Harry Kane',
    position: 'Delantero Centro',
    age: 32,
    nationalities: ['Inglaterra'],
    club: { id: '27', name: 'Bayern München' },
    marketValue: 90000000,
    height: 188
  },
  {
    id: 'musiala-1',
    name: 'Jamal Musiala',
    position: 'Media Punta',
    age: 23,
    nationalities: ['Alemania'],
    club: { id: '27', name: 'Bayern München' },
    marketValue: 140000000,
    height: 184
  },
  {
    id: 'valverde-1',
    name: 'Federico Valverde',
    position: 'Centrocampista',
    age: 27,
    nationalities: ['Uruguay'],
    club: { id: '418', name: 'Real Madrid' },
    marketValue: 130000000,
    height: 182
  },
  {
    id: 'martinez-1',
    name: 'Lautaro Martínez',
    position: 'Delantero Centro',
    age: 28,
    nationalities: ['Argentina'],
    club: { id: '46', name: 'Inter de Milán' },
    marketValue: 110000000,
    height: 174
  },
  {
    id: 'alvarez-1',
    name: 'Julián Álvarez',
    position: 'Delantero',
    age: 26,
    nationalities: ['Argentina'],
    club: { id: '13', name: 'Atlético de Madrid' },
    marketValue: 90000000,
    height: 170
  },
  {
    id: 'palmer-1',
    name: 'Cole Palmer',
    position: 'Centrocampista Ofensivo',
    age: 23,
    nationalities: ['Inglaterra'],
    club: { id: '631', name: 'Chelsea FC' },
    marketValue: 110000000,
    height: 189
  }
];
