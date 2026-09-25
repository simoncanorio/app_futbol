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
  { id: '418', name: 'Real Madrid', country: 'España', squad: 24, marketValue: 1350000000 },
  { id: '131', name: 'FC Barcelona', country: 'España', squad: 25, marketValue: 980000000 },
  { id: '13', name: 'Atlético de Madrid', country: 'España', squad: 23, marketValue: 510000000 },
  { id: '281', name: 'Manchester City', country: 'Inglaterra', squad: 24, marketValue: 1260000000 },
  { id: '31', name: 'Liverpool FC', country: 'Inglaterra', squad: 25, marketValue: 920000000 },
  { id: '11', name: 'Arsenal FC', country: 'Inglaterra', squad: 24, marketValue: 1150000000 },
  { id: '985', name: 'Manchester United', country: 'Inglaterra', squad: 26, marketValue: 750000000 },
  { id: '27', name: 'Bayern München', country: 'Alemania', squad: 24, marketValue: 940000000 },
  { id: '583', name: 'Paris Saint-Germain', country: 'Francia', squad: 25, marketValue: 890000000 },
  { id: '46', name: 'Inter de Milán', country: 'Italia', squad: 25, marketValue: 670000000 },
  { id: '506', name: 'Juventus FC', country: 'Italia', squad: 24, marketValue: 590000000 },
  { id: '209', name: 'River Plate', country: 'Argentina', squad: 28, marketValue: 120000000 },
  { id: '189', name: 'Boca Juniors', country: 'Argentina', squad: 29, marketValue: 95000000 }
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
