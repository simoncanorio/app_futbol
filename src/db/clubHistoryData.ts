export interface RealClubHistory {
  founded: number;
  stadium: string;
  capacity: string;
  championsLeagueTitles: number;
  domesticLeagueTitles: number;
  domesticCupTitles: number;
  legends: { name: string; number: string; era: string; role: string; desc: string }[];
  goldenEras: { title: string; period: string; desc: string }[];
}

export const REAL_CLUB_HISTORIES: Record<string, RealClubHistory> = {
  'catalunya': {
    founded: 1899,
    stadium: 'Spotify Camp Nou',
    capacity: '99,354 espectadores',
    championsLeagueTitles: 5,
    domesticLeagueTitles: 27,
    domesticCupTitles: 31,
    legends: [
      { name: 'Ronaldinho', number: '10', era: '2003 - 2008', role: 'Extremo / Delantero', desc: 'Ganador del Balón de Oro y Champions 2006. Magia pura y ovacionado en el Bernabéu.' },
      { name: 'Lionel Messi', number: '10', era: '2004 - 2021', role: 'Delantero Leyenda', desc: 'Máximo goleador de la historia del club (672 goles) y 35 títulos conquistados.' },
      { name: 'Johan Cruyff', number: '14', era: '1973 - 1978', role: 'Ideólogo / Leyenda', desc: 'Transformó la identidad del club como jugador y como entrenador del Dream Team 1992.' },
      { name: 'Xavi Hernández', number: '6', era: '1998 - 2015', role: 'Cerebro del Centro del Campo', desc: 'Director de orquesta del tiki-taka y ganador de 4 Champions League.' },
      { name: 'Andrés Iniesta', number: '8', era: '2002 - 2018', role: 'Centrocampista Mágico', desc: 'Autor de noches épicas como Stamford Bridge 2009 y 32 títulos acumulados.' }
    ],
    goldenEras: [
      { title: 'El Sextete Histórico de Pep Guardiola', period: '2008 - 2009', desc: 'Único club en lograr los 6 títulos posibles en un solo año natural con fútbol de ensueño.' },
      { title: 'Tridente MSN & Triplete Berlín', period: '2014 - 2015', desc: 'Messi, Suárez y Neymar lideraron al equipo a su segundo triplete con 122 goles.' }
    ]
  },
  'madrid': {
    founded: 1902,
    stadium: 'Santiago Bernabéu',
    capacity: '84,000 espectadores',
    championsLeagueTitles: 15,
    domesticLeagueTitles: 36,
    domesticCupTitles: 20,
    legends: [
      { name: 'Cristiano Ronaldo', number: '7', era: '2009 - 2018', role: 'Delantero Leyenda', desc: 'Máximo goleador de la historia blanca con 451 goles en 438 partidos y 4 Champions.' },
      { name: 'Alfredo Di Stéfano', number: '9', era: '1953 - 1964', role: 'La Saeta Rubia', desc: 'Líder del equipo que conquistó las primeras 5 Copas de Europa consecutivas.' },
      { name: 'Zinedine Zidane', number: '5', era: '2001 - 2006', role: 'Mago Francés', desc: 'Autor de la volea de Glasgow en 2002 y posterior técnico del tricampeonato de Champions.' },
      { name: 'Raúl González', number: '7', era: '1994 - 2010', role: 'El Ángel del Madrid', desc: 'Símbolo y capitán histórico con 323 goles y 3 Copas de Europa.' },
      { name: 'Luka Modric', number: '10', era: '2012 - Presente', role: 'Balón de Oro', desc: 'Director del centro del campo en la era de las 6 Champions League.' }
    ],
    goldenEras: [
      { title: 'Las 5 Copas de Europa Consecutivas', period: '1956 - 1960', desc: 'Di Stéfano, Puskás y Gento dominaron el fútbol continental de manera imbatible.' },
      { title: 'Tricampeonato de Champions Zidane', period: '2016 - 2018', desc: 'Primer club en la era moderna en ganar tres Champions League consecutivas.' }
    ]
  },
  'river': {
    founded: 1901,
    stadium: 'Más Monumental',
    capacity: '84,567 espectadores',
    championsLeagueTitles: 4,
    domesticLeagueTitles: 38,
    domesticCupTitles: 15,
    legends: [
      { name: 'Enzo Francescoli', number: '10', era: '1983 - 1997', role: 'El Príncipe', desc: 'Campeón de la Copa Libertadores 1996 e ídolo máximo de generaciones.' },
      { name: 'Marcelo Gallardo', number: '10', era: '2014 - 2022', role: 'Muñeco / DT Leyenda', desc: 'Ganó 14 títulos como técnico, incluyendo las libertadores 2015 y la histórica final de Madrid 2018.' },
      { name: 'Ariel Ortega', number: '10', era: '1991 - 2012', role: 'El Burrito', desc: 'Gambeta endiablada y símbolo del fútbol exquisito del club.' }
    ],
    goldenEras: [
      { title: 'La Gloria Eterna de Madrid 2018', period: '2018', desc: 'Conquista de la Copa Libertadores en el Bernabéu venciendo al clásico rival.' }
    ]
  },
  'boca': {
    founded: 1905,
    stadium: 'Alberto J. Armando (La Bombonera)',
    capacity: '54,000 espectadores',
    championsLeagueTitles: 6,
    domesticLeagueTitles: 35,
    domesticCupTitles: 17,
    legends: [
      { name: 'Juan Román Riquelme', number: '10', era: '1996 - 2014', role: 'El Último Diez', desc: 'Ganador de 3 Copas Libertadores y la gesta del Tokio 2000 ante el Real Madrid.' },
      { name: 'Diego Armando Maradona', number: '10', era: '1981 - 1997', role: 'D10S', desc: 'Campeón de Liga 1981 e ícono eterno de la hinchada xeneize.' },
      { name: 'Martín Palermo', number: '9', era: '1997 - 2011', role: 'El Titán', desc: 'Máximo goleador histórico con 236 tantos y doblete en Japón ante el Real Madrid.' }
    ],
    goldenEras: [
      { title: 'La Era Dorada de Carlos Bianchi', period: '1998 - 2003', desc: 'Conquista de 3 Libertadores y 2 Copas Intercontinentales (Real Madrid y Milan).' }
    ]
  }
};

export function getClubHistory(teamName: string): RealClubHistory {
  const name = teamName.toLowerCase();
  if (name.includes('catalunya') || name.includes('barca') || name.includes('barcelona')) {
    return REAL_CLUB_HISTORIES['catalunya'];
  }
  if (name.includes('madrid') || name.includes('real')) {
    return REAL_CLUB_HISTORIES['madrid'];
  }
  if (name.includes('river')) {
    return REAL_CLUB_HISTORIES['river'];
  }
  if (name.includes('boca')) {
    return REAL_CLUB_HISTORIES['boca'];
  }

  // Generic realistic club fallback
  return {
    founded: 1905,
    stadium: `${teamName} Stadium`,
    capacity: '55,000 espectadores',
    championsLeagueTitles: 1,
    domesticLeagueTitles: 8,
    domesticCupTitles: 6,
    legends: [
      { name: 'Capitán Histórico', number: '10', era: '2010 - 2020', role: 'Líder del Club', desc: 'Máximo referente institucional con más de 300 partidos oficiales.' }
    ],
    goldenEras: [
      { title: 'Ascenso y Título Nacional', period: '2015 - 2018', desc: 'Época dorada de clasificaciones internacionales y títulos locales.' }
    ]
  };
}
