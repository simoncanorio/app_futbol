export interface RealClubHistory {
  founded: number;
  stadium: string;
  capacity: string;
  championsLeagueTitles: number;
  championsYears: number[];
  domesticLeagueTitles: number;
  leagueYears: number[];
  domesticCupTitles: number;
  cupYears: number[];
  legends: { name: string; number: string; era: string; role: string; desc: string }[];
  goldenEras: { title: string; period: string; desc: string }[];
}

export const REAL_CLUB_HISTORIES: Record<string, RealClubHistory> = {
  'barcelona': {
    founded: 1899,
    stadium: 'Spotify Camp Nou',
    capacity: '99,354 espectadores',
    championsLeagueTitles: 5,
    championsYears: [1992, 2006, 2009, 2011, 2015],
    domesticLeagueTitles: 27,
    leagueYears: [1929, 1945, 1948, 1949, 1952, 1953, 1959, 1960, 1974, 1985, 1991, 1992, 1993, 1994, 1998, 1999, 2005, 2006, 2009, 2010, 2011, 2013, 2015, 2016, 2018, 2019, 2023],
    domesticCupTitles: 31,
    cupYears: [1910, 1912, 1913, 1920, 1922, 1925, 1926, 1928, 1942, 1951, 1952, 1953, 1957, 1959, 1963, 1968, 1971, 1978, 1981, 1983, 1988, 1990, 1997, 1998, 2009, 2012, 2015, 2016, 2017, 2018, 2021],
    legends: [
      { name: 'Lionel Messi', number: '10', era: '2004 - 2021', role: 'Delantero Leyenda', desc: 'Máximo goleador histórico del club (672 goles), 8 Balones de Oro y 35 títulos conquistados.' },
      { name: 'Ronaldinho Gaucho', number: '10', era: '2003 - 2008', role: 'Extremo Mágico', desc: 'Ganador del Balón de Oro 2005 y Champions 2006. Magia e ícono mundial del fútbol.' },
      { name: 'Johan Cruyff', number: '14', era: '1973 - 1978', role: 'Ideólogo Eterno', desc: 'Transformó la filosofía futbolística del club como jugador y como DT del Dream Team 1992.' },
      { name: 'Xavi Hernández', number: '6', era: '1998 - 2015', role: 'Cerebro del Centro del Campo', desc: 'Director de orquesta del estilo Tiki-Taka con 767 partidos disputados y 4 Champions.' }
    ],
    goldenEras: [
      { title: 'El Sextete Histórico de Pep Guardiola', period: '2008 - 2009', desc: 'Único club en conquistar los 6 títulos oficiales en una sola temporada.' },
      { title: 'Tridente MSN & Triplete de Berlín', period: '2014 - 2015', desc: 'Messi, Suárez y Neymar anotaron 122 goles rumbo a la quinta Champions League.' }
    ]
  },
  'real madrid': {
    founded: 1902,
    stadium: 'Santiago Bernabéu',
    capacity: '84,000 espectadores',
    championsLeagueTitles: 15,
    championsYears: [1956, 1957, 1958, 1959, 1960, 1966, 1998, 2000, 2002, 2014, 2016, 2017, 2018, 2022, 2024],
    domesticLeagueTitles: 36,
    leagueYears: [1932, 1933, 1954, 1955, 1957, 1958, 1961, 1962, 1963, 1964, 1965, 1967, 1968, 1969, 1972, 1975, 1976, 1978, 1979, 1980, 1986, 1987, 1988, 1989, 1990, 1995, 1997, 2001, 2003, 2007, 2008, 2012, 2017, 2020, 2022, 2024],
    domesticCupTitles: 20,
    cupYears: [1905, 1906, 1907, 1908, 1917, 1934, 1936, 1946, 1947, 1962, 1970, 1974, 1975, 1980, 1982, 1989, 1993, 2011, 2014, 2023],
    legends: [
      { name: 'Cristiano Ronaldo', number: '7', era: '2009 - 2018', role: 'Delantero Leyenda', desc: 'Máximo goleador blanco de la historia con 451 goles en 438 partidos y 4 Champions.' },
      { name: 'Alfredo Di Stéfano', number: '9', era: '1953 - 1964', role: 'La Saeta Rubia', desc: 'Líder del equipo que conquistó 5 Copas de Europa consecutivas y transformó al club.' },
      { name: 'Zinedine Zidane', number: '5', era: '2001 - 2006', role: 'Mago Francés', desc: 'Gol de volea mítica en Glasgow 2002 y posteriormente técnico del tricampeonato de Champions.' },
      { name: 'Raúl González', number: '7', era: '1994 - 2010', role: 'El Ángel del Bernabéu', desc: 'Símbolo y capitán histórico con 323 goles y 3 Copas de Europa.' }
    ],
    goldenEras: [
      { title: 'Las 5 Copas de Europa Consecutivas', period: '1956 - 1960', desc: 'Dominio absoluto continental liderado por Di Stéfano, Puskás y Gento.' },
      { title: 'Tricampeonato de Champions de Zidane', period: '2016 - 2018', desc: 'Primer equipo en la era moderna en revalidar tres Champions seguidas.' }
    ]
  },
  'atlético de madrid': {
    founded: 1903,
    stadium: 'Cívitas Metropolitano',
    capacity: '70,460 espectadores',
    championsLeagueTitles: 0,
    championsYears: [],
    domesticLeagueTitles: 11,
    leagueYears: [1940, 1941, 1950, 1951, 1966, 1970, 1973, 1977, 1996, 2014, 2021],
    domesticCupTitles: 10,
    cupYears: [1960, 1961, 1965, 1972, 1976, 1985, 1991, 1992, 1996, 2013],
    legends: [
      { name: 'Luis Aragonés', number: '8', era: '1964 - 1974', role: 'El Sabio de Hortaleza', desc: 'Máximo goleador de la historia rojiblanca y técnico de la era dorada.' },
      { name: 'Diego Simeone', number: '14', era: '1994 - 1997', role: 'El Cholo / Leyenda DT', desc: 'Capitán del Doblete de 1996 y técnico transformador con 8 títulos.' }
    ],
    goldenEras: [
      { title: 'La Era Cholista & LaLiga de los 90 Puntos', period: '2013 - 2021', desc: '2 Ligas, 2 UEFA Europa League y 2 finales de Champions League conquistando el respeto europeo.' }
    ]
  },
  'athletic club': {
    founded: 1898,
    stadium: 'San Mamés',
    capacity: '53,331 espectadores',
    championsLeagueTitles: 0,
    championsYears: [],
    domesticLeagueTitles: 8,
    leagueYears: [1930, 1931, 1934, 1936, 1943, 1956, 1983, 1984],
    domesticCupTitles: 24,
    cupYears: [1903, 1904, 1910, 1911, 1914, 1915, 1916, 1921, 1923, 1930, 1931, 1932, 1933, 1943, 1944, 1945, 1950, 1955, 1956, 1969, 1973, 1984, 2024],
    legends: [
      { name: 'Telmo Zarra', number: '9', era: '1940 - 1955', role: 'Leyenda del Gol', desc: 'Seis Trofeos Pichichi y 251 goles en Liga, récord histórico durante décadas.' },
      { name: 'José Ángel Iribar', number: '1', era: '1962 - 1980', role: 'El Chopo', desc: 'El portero más icónico del fútbol vasco y del Athletic con 614 partidos.' }
    ],
    goldenEras: [
      { title: 'El Doblete de Javier Clemente', period: '1982 - 1984', desc: 'Conquista consecutiva de LaLiga y Copa del Rey ante el Barcelona de Maradona.' }
    ]
  },
  'manchester city': {
    founded: 1880,
    stadium: 'Etihad Stadium',
    capacity: '53,400 espectadores',
    championsLeagueTitles: 1,
    championsYears: [2023],
    domesticLeagueTitles: 10,
    leagueYears: [1937, 1968, 2012, 2014, 2018, 2019, 2021, 2022, 2023, 2024],
    domesticCupTitles: 7,
    cupYears: [1904, 1934, 1956, 1969, 2011, 2019, 2023],
    legends: [
      { name: 'Sergio Agüero', number: '10', era: '2011 - 2021', role: 'Kun / Máximo Goleador', desc: 'Autor del icónico gol 93:20 que dio la Premier de 2012 y 260 goles totales.' },
      { name: 'Kevin De Bruyne', number: '17', era: '2015 - Presente', role: 'Maestro de Asistencias', desc: 'Dos veces Jugador del Año PFA y cerebro del Triplete de 2023.' }
    ],
    goldenEras: [
      { title: 'El Triplete de Pep Guardiola', period: '2022 - 2023', desc: 'Champions League, Premier League y FA Cup en una temporada inolvidable.' }
    ]
  }
};

export function getClubHistory(teamName: string): RealClubHistory {
  const name = teamName.toLowerCase();
  for (const key in REAL_CLUB_HISTORIES) {
    if (name.includes(key) || key.includes(name)) {
      return REAL_CLUB_HISTORIES[key];
    }
  }

  return {
    founded: 1904,
    stadium: 'Estadio Municipal de Élite',
    capacity: '48,000 espectadores',
    championsLeagueTitles: 0,
    championsYears: [],
    domesticLeagueTitles: 2,
    leagueYears: [2018, 2022],
    domesticCupTitles: 3,
    cupYears: [2015, 2019, 2023],
    legends: [
      { name: 'Carlos Fernández', number: '10', era: '1998 - 2010', role: 'Capitán Histórico', desc: 'Máximo asistente de la historia del club con más de 350 partidos oficiales.' }
    ],
    goldenEras: [
      { title: 'La Gesta de Clasificación Europea', period: '2012 - 2016', desc: 'El club alcanzó las semifinales continentales venciendo a gigantes del continente.' }
    ]
  };
}
