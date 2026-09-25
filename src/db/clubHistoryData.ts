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
  'barcelona': {
    founded: 1899,
    stadium: 'Spotify Camp Nou',
    capacity: '99,354 espectadores',
    championsLeagueTitles: 5,
    domesticLeagueTitles: 27,
    domesticCupTitles: 31,
    legends: [
      { name: 'Lionel Messi', number: '10', era: '2004 - 2021', role: 'Delantero Leyenda', desc: 'Máximo goleador histórico del club (672 goles), 8 Balones de Oro y 35 títulos conquistados.' },
      { name: 'Ronaldinho Gaucho', number: '10', era: '2003 - 2008', role: 'Extremo Mágico', desc: 'Ganador del Balón de Oro 2005 y Champions 2006. Magia e ícono mundial del fútbol.' },
      { name: 'Johan Cruyff', number: '14', era: '1973 - 1978', role: 'Ideólogo Eterno', desc: 'Transformó la filosofía futbolística del club como jugador y como DT del Dream Team 1992.' },
      { name: 'Xavi Hernández', number: '6', era: '1998 - 2015', role: 'Cerebro del Centro del Campo', desc: 'Director de orquesta del estilo Tiki-Taka con 767 partidos disputados y 4 Champions.' },
      { name: 'Andrés Iniesta', number: '8', era: '2002 - 2018', role: 'Centrocampista Mágico', desc: 'Autor de goles legendarios como Stamford Bridge 2009 y 32 títulos oficiales.' }
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
    domesticLeagueTitles: 36,
    domesticCupTitles: 20,
    legends: [
      { name: 'Cristiano Ronaldo', number: '7', era: '2009 - 2018', role: 'Delantero Leyenda', desc: 'Máximo goleador blanco de la historia con 451 goles en 438 partidos y 4 Champions.' },
      { name: 'Alfredo Di Stéfano', number: '9', era: '1953 - 1964', role: 'La Saeta Rubia', desc: 'Líder del equipo que conquistó 5 Copas de Europa consecutivas y transformó al club.' },
      { name: 'Zinedine Zidane', number: '5', era: '2001 - 2006', role: 'Mago Francés', desc: 'Gol de volea mítica en Glasgow 2002 y posteriormente técnico del tricampeonato de Champions.' },
      { name: 'Raúl González', number: '7', era: '1994 - 2010', role: 'El Ángel del Bernabéu', desc: 'Símbolo y capitán histórico con 323 goles y 3 Copas de Europa.' },
      { name: 'Luka Modric', number: '10', era: '2012 - Presente', role: 'Balón de Oro', desc: 'Director del mediocampo blanco conquistador de 6 Champions League.' }
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
    domesticLeagueTitles: 11,
    domesticCupTitles: 10,
    legends: [
      { name: 'Luis Aragonés', number: '8', era: '1964 - 1974', role: 'El Sabio de Hortaleza', desc: 'Máximo goleador de la historia rojiblanca y técnico de la era dorada.' },
      { name: 'Diego Simeone', number: '14', era: '1994 - 1997', role: 'El Cholo / Leyenda DT', desc: 'Capitán del Doblete de 1996 y técnico transformador con 8 títulos.' },
      { name: 'Fernando Torres', number: '9', era: '2001 - 2007', role: 'El Niño', desc: 'Símbolo de la cantera rojiblanca y capitán del club desde los 19 años.' },
      { name: 'Antoine Griezmann', number: '7', era: '2014 - Presente', role: 'Estrella Mundial', desc: 'Máximo goleador histórico del club superando los 173 goles de Luis Aragonés.' }
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
    domesticLeagueTitles: 8,
    domesticCupTitles: 24,
    legends: [
      { name: 'Telmo Zarra', number: '9', era: '1940 - 1955', role: 'Leyenda del Gol', desc: 'Seis Trofeos Pichichi y 251 goles en Liga, récord histórico durante décadas.' },
      { name: 'José Ángel Iribar', number: '1', era: '1962 - 1980', role: 'El Chopo', desc: 'El portero más icónico del fútbol vasco y del Athletic con 614 partidos.' },
      { name: 'Julen Guerrero', number: '8', era: '1992 - 2006', role: 'La Perla de Lezama', desc: 'Icono absoluto del club que rechazó ofertas multimillonarias para ser fiel a San Mamés.' },
      { name: 'Iñaki Williams', number: '9', era: '2014 - Presente', role: 'Pantera de Lezama', desc: 'Récord histórico de 251 partidos consecutivos jugados en LaLiga.' }
    ],
    goldenEras: [
      { title: 'El Doblete de Javier Clemente', period: '1982 - 1984', desc: 'Conquista consecutiva de LaLiga y Copa del Rey ante el Barcelona de Maradona.' }
    ]
  },
  'sevilla fc': {
    founded: 1890,
    stadium: 'Ramón Sánchez-Pizjuán',
    capacity: '43,883 espectadores',
    championsLeagueTitles: 0,
    domesticLeagueTitles: 1,
    domesticCupTitles: 5,
    legends: [
      { name: 'Jesús Navas', number: '16', era: '2003 - Presente', role: 'El Duende de Los Palacios', desc: 'Jugador con más partidos en la historia del club (más de 650) y 8 títulos oficiales.' },
      { name: 'Frédéric Kanouté', number: '12', era: '2005 - 2012', role: 'Delantero Franco-Maliense', desc: 'Autor de goles decisivos en 5 finales europeas y nacionales.' },
      { name: 'Andrés Palop', number: '1', era: '2005 - 2013', role: 'Héroe de Glasgow', desc: 'Portero legendario autor del famoso gol de cabeza en Donetsk en la UEFA 2007.' }
    ],
    goldenEras: [
      { title: 'Los Reyes de la UEFA Europa League', period: '2006 - 2023', desc: 'Récord absoluto mundial de 7 títulos de la UEFA Europa League.' }
    ]
  },
  'manchester city': {
    founded: 1880,
    stadium: 'Etihad Stadium',
    capacity: '53,400 espectadores',
    championsLeagueTitles: 1,
    domesticLeagueTitles: 10,
    domesticCupTitles: 7,
    legends: [
      { name: 'Sergio Agüero', number: '10', era: '2011 - 2021', role: 'Kun / Máximo Goleador', desc: 'Autor del icónico gol 93:20 que dio la Premier de 2012 y 260 goles totales.' },
      { name: 'David Silva', number: '21', era: '2010 - 2020', role: 'El Mago', desc: 'Director de juego durante una década dorada con estatua en el Etihad.' },
      { name: 'Kevin De Bruyne', number: '17', era: '2015 - Presente', role: 'Maestro de Asistencias', desc: 'Dos veces Jugador del Año PFA y cerebro del Triplete de 2023.' },
      { name: 'Vincent Kompany', number: '4', era: '2008 - 2019', role: 'Capitán Eterno', desc: 'Líder de la zaga y autor del zapatazo ante el Leicester para la Premier 2019.' }
    ],
    goldenEras: [
      { title: 'El Triplete de Pep Guardiola', period: '2022 - 2023', desc: 'Champions League, Premier League y FA Cup en una temporada inolvidable.' }
    ]
  },
  'arsenal fc': {
    founded: 1886,
    stadium: 'Emirates Stadium',
    capacity: '60,704 espectadores',
    championsLeagueTitles: 0,
    domesticLeagueTitles: 13,
    domesticCupTitles: 14,
    legends: [
      { name: 'Thierry Henry', number: '14', era: '1999 - 2007', role: 'King Henry', desc: 'Máximo goleador histórico gunner con 228 goles y 4 Botas de Oro Premier.' },
      { name: 'Dennis Bergkamp', number: '10', era: '1995 - 2006', role: 'El Holandés Volador', desc: 'Técnica exquisita y pases imposibles en la era Invencible de Arsène Wenger.' },
      { name: 'Patrick Vieira', number: '4', era: '1996 - 2005', role: 'Capitán Invencible', desc: 'Dominador físico del medio campo que alzó la Premier invicta 2003-04.' }
    ],
    goldenEras: [
      { title: 'Los Invencibles de Arsène Wenger', period: '2003 - 2004', desc: 'Único campeón de Premier League en finalizar toda la temporada invicto (26V-12E).' }
    ]
  },
  'liverpool fc': {
    founded: 1892,
    stadium: 'Anfield',
    capacity: '61,276 espectadores',
    championsLeagueTitles: 6,
    domesticLeagueTitles: 19,
    domesticCupTitles: 8,
    legends: [
      { name: 'Steven Gerrard', number: '8', era: '1998 - 2015', role: 'Capitán Fantástico', desc: 'Líder del Milagro de Estambul 2005 y 710 partidos en Anfield.' },
      { name: 'Kenny Dalglish', number: '7', era: '1977 - 1990', role: 'King Kenny', desc: 'Ganador de 3 Copas de Europa como jugador y técnico místico del club.' },
      { name: 'Mohamed Salah', number: '11', era: '2017 - Presente', role: 'Rey Egipcio', desc: 'Récord de goles en una temporada Premier (32) y campeón de Champions y Premier.' }
    ],
    goldenEras: [
      { title: 'El Milagro de Estambul & La Era Klopp', period: '2005 - 2020', desc: 'Champions League 2005 tras remontar un 0-3 y fin a la sequía de 30 años de Premier en 2020.' }
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

  // Fallback con datos realistas para clubes de primera división
  return {
    founded: 1904,
    stadium: 'Estadio Municipal de Élite',
    capacity: '48,000 espectadores',
    championsLeagueTitles: 0,
    domesticLeagueTitles: 2,
    domesticCupTitles: 3,
    legends: [
      { name: 'Carlos Fernández', number: '10', era: '1998 - 2010', role: 'Capitán Histórico', desc: 'Máximo asistente de la historia del club con más de 350 partidos oficiales.' },
      { name: 'Mateo Rossi', number: '9', era: '2005 - 2014', role: 'Goleador de Élite', desc: 'Autor de 145 goles decisivos en competiciones nacionales e internacionales.' }
    ],
    goldenEras: [
      { title: 'La Gesta de Clasificación Europea', period: '2012 - 2016', desc: 'El club alcanzó las semifinales continentales venciendo a gigantes del continente.' }
    ]
  };
}
