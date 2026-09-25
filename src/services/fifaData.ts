export interface FIFAPlayerData {
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
  domesticLeague: 'LaLiga' | 'Premier League';
  country: string;
  overall: number;
  budget: number;
  primaryColor: string;
  secondaryColor: string;
  pattern: 'solid' | 'stripes' | 'hoop' | 'diagonal';
  squad: FIFAPlayerData[];
}

export const EA_FC_DATABASE: FIFAClubData[] = [
  // --- LALIGA ---
  {
    name: 'Real Madrid',
    domesticLeague: 'LaLiga',
    country: 'España',
    overall: 88,
    budget: 180000000,
    primaryColor: '#ffffff',
    secondaryColor: '#f59e0b',
    pattern: 'solid',
    squad: [
      { name: 'Kylian Mbappé', age: 25, overall: 91, potential: 94, position: 'DEL', specificPosition: 'DC', marketValue: 180000000, country: 'Francia', attributes: { pace: 97, shooting: 90, passing: 80, dribbling: 92, defending: 36, physical: 78 } },
      { name: 'Jude Bellingham', age: 21, overall: 90, potential: 94, position: 'MED', specificPosition: 'MCO', marketValue: 180000000, country: 'Inglaterra', attributes: { pace: 80, shooting: 86, passing: 85, dribbling: 88, defending: 78, physical: 86 } },
      { name: 'Vinícius Jr', age: 24, overall: 90, potential: 94, position: 'DEL', specificPosition: 'EI', marketValue: 180000000, country: 'Brasil', attributes: { pace: 95, shooting: 84, passing: 81, dribbling: 91, defending: 29, physical: 69 } },
      { name: 'Thibaut Courtois', age: 32, overall: 89, potential: 89, position: 'POR', specificPosition: 'POR', marketValue: 45000000, country: 'Bélgica', attributes: { pace: 45, shooting: 20, passing: 65, dribbling: 40, defending: 89, physical: 78 } },
      { name: 'Federico Valverde', age: 26, overall: 88, potential: 90, position: 'MED', specificPosition: 'MC', marketValue: 130000000, country: 'Uruguay', attributes: { pace: 88, shooting: 82, passing: 84, dribbling: 84, defending: 80, physical: 84 } },
      { name: 'Antonio Rüdiger', age: 31, overall: 87, potential: 87, position: 'DEF', specificPosition: 'DFC', marketValue: 25000000, country: 'Alemania', attributes: { pace: 82, shooting: 54, passing: 71, dribbling: 68, defending: 86, physical: 86 } },
      { name: 'Rodrygo Goes', age: 23, overall: 86, potential: 91, position: 'DEL', specificPosition: 'ED', marketValue: 110000000, country: 'Brasil', attributes: { pace: 89, shooting: 82, passing: 79, dribbling: 87, defending: 32, physical: 65 } },
      { name: 'Luka Modric', age: 38, overall: 86, potential: 86, position: 'MED', specificPosition: 'MC', marketValue: 6000000, country: 'Croacia', attributes: { pace: 68, shooting: 75, passing: 89, dribbling: 86, defending: 72, physical: 64 } },
      { name: 'Dani Carvajal', age: 32, overall: 86, potential: 86, position: 'DEF', specificPosition: 'LD', marketValue: 12000000, country: 'España', attributes: { pace: 80, shooting: 60, passing: 78, dribbling: 80, defending: 83, physical: 82 } },
      { name: 'Aurélien Tchouaméni', age: 24, overall: 85, potential: 89, position: 'MED', specificPosition: 'MCD', marketValue: 90000000, country: 'Francia', attributes: { pace: 75, shooting: 71, passing: 79, dribbling: 78, defending: 83, physical: 84 } },
      { name: 'Éder Militão', age: 26, overall: 85, potential: 88, position: 'DEF', specificPosition: 'DFC', marketValue: 60000000, country: 'Brasil', attributes: { pace: 83, shooting: 50, passing: 70, dribbling: 70, defending: 85, physical: 82 } },
      { name: 'Eduardo Camavinga', age: 21, overall: 83, potential: 89, position: 'MED', specificPosition: 'MC', marketValue: 100000000, country: 'Francia', attributes: { pace: 80, shooting: 68, passing: 81, dribbling: 84, defending: 80, physical: 80 } },
      { name: 'Brahim Díaz', age: 25, overall: 82, potential: 85, position: 'MED', specificPosition: 'MCO', marketValue: 40000000, country: 'Marruecos', attributes: { pace: 84, shooting: 76, passing: 78, dribbling: 85, defending: 35, physical: 58 } },
      { name: 'Ferland Mendy', age: 29, overall: 82, potential: 82, position: 'DEF', specificPosition: 'LI', marketValue: 22000000, country: 'Francia', attributes: { pace: 86, shooting: 62, passing: 74, dribbling: 78, defending: 80, physical: 82 } },
      { name: 'Andriy Lunin', age: 25, overall: 81, potential: 85, position: 'POR', specificPosition: 'POR', marketValue: 25000000, country: 'Ucrania', attributes: { pace: 45, shooting: 20, passing: 60, dribbling: 35, defending: 81, physical: 72 } },
      { name: 'Arda Güler', age: 19, overall: 78, potential: 89, position: 'MED', specificPosition: 'MCO', marketValue: 45000000, country: 'Turquía', attributes: { pace: 76, shooting: 74, passing: 80, dribbling: 82, defending: 50, physical: 58 } },
      { name: 'Endrick Felipe', age: 18, overall: 77, potential: 91, position: 'DEL', specificPosition: 'DC', marketValue: 60000000, country: 'Brasil', attributes: { pace: 89, shooting: 77, passing: 65, dribbling: 78, defending: 30, physical: 76 } },
      { name: 'Lucas Vázquez', age: 33, overall: 81, potential: 81, position: 'DEF', specificPosition: 'LD', marketValue: 5000000, country: 'España', attributes: { pace: 80, shooting: 72, passing: 78, dribbling: 79, defending: 74, physical: 70 } },
      { name: 'Fran García', age: 25, overall: 79, potential: 82, position: 'DEF', specificPosition: 'LI', marketValue: 15000000, country: 'España', attributes: { pace: 88, shooting: 58, passing: 70, dribbling: 75, defending: 73, physical: 72 } },
      { name: 'Dani Ceballos', age: 28, overall: 79, potential: 79, position: 'MED', specificPosition: 'MC', marketValue: 10000000, country: 'España', attributes: { pace: 68, shooting: 70, passing: 81, dribbling: 82, defending: 70, physical: 66 } }
    ]
  },
  {
    name: 'FC Barcelona',
    domesticLeague: 'LaLiga',
    country: 'España',
    overall: 86,
    budget: 110000000,
    primaryColor: '#1e3a8a',
    secondaryColor: '#991b1b',
    pattern: 'stripes',
    squad: [
      { name: 'Robert Lewandowski', age: 36, overall: 88, potential: 88, position: 'DEL', specificPosition: 'DC', marketValue: 15000000, country: 'Polonia', attributes: { pace: 72, shooting: 90, passing: 79, dribbling: 85, defending: 44, physical: 81 } },
      { name: 'Marc-André ter Stegen', age: 32, overall: 89, potential: 89, position: 'POR', specificPosition: 'POR', marketValue: 28000000, country: 'Alemania', attributes: { pace: 45, shooting: 20, passing: 85, dribbling: 45, defending: 89, physical: 78 } },
      { name: 'Frenkie de Jong', age: 27, overall: 87, potential: 89, position: 'MED', specificPosition: 'MC', marketValue: 70000000, country: 'Países Bajos', attributes: { pace: 82, shooting: 69, passing: 86, dribbling: 88, defending: 77, physical: 78 } },
      { name: 'Pedri González', age: 21, overall: 86, potential: 90, position: 'MED', specificPosition: 'MC', marketValue: 80000000, country: 'España', attributes: { pace: 78, shooting: 70, passing: 87, dribbling: 88, defending: 68, physical: 64 } },
      { name: 'Dani Olmo', age: 26, overall: 85, potential: 87, position: 'MED', specificPosition: 'MCO', marketValue: 60000000, country: 'España', attributes: { pace: 78, shooting: 80, passing: 84, dribbling: 85, defending: 55, physical: 68 } },
      { name: 'Ronald Araújo', age: 25, overall: 85, potential: 89, position: 'DEF', specificPosition: 'DFC', marketValue: 70000000, country: 'Uruguay', attributes: { pace: 83, shooting: 50, passing: 65, dribbling: 62, defending: 86, physical: 86 } },
      { name: 'Jules Koundé', age: 25, overall: 85, potential: 88, position: 'DEF', specificPosition: 'LD', marketValue: 55000000, country: 'Francia', attributes: { pace: 82, shooting: 52, passing: 75, dribbling: 74, defending: 85, physical: 78 } },
      { name: 'Raphinha', age: 27, overall: 84, potential: 85, position: 'DEL', specificPosition: 'EI', marketValue: 60000000, country: 'Brasil', attributes: { pace: 90, shooting: 82, passing: 81, dribbling: 85, defending: 50, physical: 73 } },
      { name: 'Gavi Paez', age: 20, overall: 83, potential: 89, position: 'MED', specificPosition: 'MC', marketValue: 90000000, country: 'España', attributes: { pace: 78, shooting: 68, passing: 80, dribbling: 84, defending: 76, physical: 80 } },
      { name: 'Lamine Yamal', age: 17, overall: 82, potential: 93, position: 'DEL', specificPosition: 'ED', marketValue: 150000000, country: 'España', attributes: { pace: 91, shooting: 78, passing: 81, dribbling: 87, defending: 35, physical: 56 } },
      { name: 'Andreas Christensen', age: 28, overall: 83, potential: 84, position: 'DEF', specificPosition: 'DFC', marketValue: 30000000, country: 'Dinamarca', attributes: { pace: 68, shooting: 50, passing: 74, dribbling: 72, defending: 84, physical: 77 } },
      { name: 'Alejandro Balde', age: 20, overall: 81, potential: 89, position: 'DEF', specificPosition: 'LI', marketValue: 40000000, country: 'España', attributes: { pace: 91, shooting: 55, passing: 73, dribbling: 80, defending: 76, physical: 70 } },
      { name: 'Ferran Torres', age: 24, overall: 80, potential: 84, position: 'DEL', specificPosition: 'DC', marketValue: 30000000, country: 'España', attributes: { pace: 82, shooting: 78, passing: 75, dribbling: 80, defending: 45, physical: 68 } },
      { name: 'Iñigo Martínez', age: 33, overall: 80, potential: 80, position: 'DEF', specificPosition: 'DFC', marketValue: 5000000, country: 'España', attributes: { pace: 65, shooting: 55, passing: 72, dribbling: 66, defending: 81, physical: 78 } },
      { name: 'Fermín López', age: 21, overall: 78, potential: 86, position: 'MED', specificPosition: 'MCO', marketValue: 30000000, country: 'España', attributes: { pace: 78, shooting: 76, passing: 76, dribbling: 80, defending: 62, physical: 70 } },
      { name: 'Pau Cubarsí', age: 17, overall: 75, potential: 88, position: 'DEF', specificPosition: 'DFC', marketValue: 40000000, country: 'España', attributes: { pace: 72, shooting: 40, passing: 78, dribbling: 72, defending: 77, physical: 72 } },
      { name: 'Marc Casadó', age: 20, overall: 74, potential: 84, position: 'MED', specificPosition: 'MCD', marketValue: 15000000, country: 'España', attributes: { pace: 72, shooting: 60, passing: 76, dribbling: 74, defending: 75, physical: 72 } },
      { name: 'Ansu Fati', age: 21, overall: 77, potential: 85, position: 'DEL', specificPosition: 'EI', marketValue: 15000000, country: 'España', attributes: { pace: 84, shooting: 76, passing: 72, dribbling: 80, defending: 30, physical: 58 } },
      { name: 'Wojciech Szczęsny', age: 34, overall: 83, potential: 83, position: 'POR', specificPosition: 'POR', marketValue: 3000000, country: 'Polonia', attributes: { pace: 45, shooting: 20, passing: 60, dribbling: 35, defending: 83, physical: 75 } },
      { name: 'Eric García', age: 23, overall: 78, potential: 82, position: 'DEF', specificPosition: 'DFC', marketValue: 18000000, country: 'España', attributes: { pace: 68, shooting: 48, passing: 76, dribbling: 70, defending: 78, physical: 72 } }
    ]
  },
  {
    name: 'Atlético de Madrid',
    domesticLeague: 'LaLiga',
    country: 'España',
    overall: 84,
    budget: 90000000,
    primaryColor: '#dc2626',
    secondaryColor: '#1e40af',
    pattern: 'stripes',
    squad: [
      { name: 'Antoine Griezmann', age: 33, overall: 88, potential: 88, position: 'DEL', specificPosition: 'SD', marketValue: 25000000, country: 'Francia', attributes: { pace: 78, shooting: 88, passing: 86, dribbling: 87, defending: 58, physical: 72 } },
      { name: 'Julián Álvarez', age: 24, overall: 84, potential: 88, position: 'DEL', specificPosition: 'DC', marketValue: 75000000, country: 'Argentina', attributes: { pace: 85, shooting: 84, passing: 78, dribbling: 83, defending: 55, physical: 78 } },
      { name: 'Jan Oblak', age: 31, overall: 88, potential: 88, position: 'POR', specificPosition: 'POR', marketValue: 28000000, country: 'Eslovenia', attributes: { pace: 45, shooting: 20, passing: 62, dribbling: 40, defending: 88, physical: 78 } },
      { name: 'Conor Gallagher', age: 24, overall: 82, potential: 86, position: 'MED', specificPosition: 'MC', marketValue: 50000000, country: 'Inglaterra', attributes: { pace: 78, shooting: 75, passing: 78, dribbling: 79, defending: 79, physical: 84 } },
      { name: 'Robin Le Normand', age: 27, overall: 83, potential: 85, position: 'DEF', specificPosition: 'DFC', marketValue: 40000000, country: 'España', attributes: { pace: 72, shooting: 45, passing: 68, dribbling: 65, defending: 84, physical: 82 } },
      { name: 'Koke Resurrección', age: 32, overall: 82, potential: 82, position: 'MED', specificPosition: 'MCD', marketValue: 12000000, country: 'España', attributes: { pace: 62, shooting: 72, passing: 84, dribbling: 78, defending: 78, physical: 75 } },
      { name: 'Rodrigo De Paul', age: 30, overall: 84, potential: 84, position: 'MED', specificPosition: 'MC', marketValue: 30000000, country: 'Argentina', attributes: { pace: 78, shooting: 76, passing: 83, dribbling: 82, defending: 75, physical: 82 } },
      { name: 'Marcos Llorente', age: 29, overall: 83, potential: 83, position: 'DEF', specificPosition: 'LD', marketValue: 30000000, country: 'España', attributes: { pace: 89, shooting: 78, passing: 78, dribbling: 80, defending: 78, physical: 82 } },
      { name: 'Alexander Sørloth', age: 28, overall: 82, potential: 82, position: 'DEL', specificPosition: 'DC', marketValue: 25000000, country: 'Noruega', attributes: { pace: 80, shooting: 82, passing: 68, dribbling: 72, defending: 38, physical: 86 } },
      { name: 'Samuel Lino', age: 24, overall: 81, potential: 85, position: 'MED', specificPosition: 'MI', marketValue: 30000000, country: 'Brasil', attributes: { pace: 88, shooting: 76, passing: 75, dribbling: 84, defending: 62, physical: 70 } },
      { name: 'José María Giménez', age: 29, overall: 82, potential: 82, position: 'DEF', specificPosition: 'DFC', marketValue: 22000000, country: 'Uruguay', attributes: { pace: 70, shooting: 45, passing: 60, dribbling: 60, defending: 84, physical: 84 } },
      { name: 'Axel Witsel', age: 35, overall: 80, potential: 80, position: 'DEF', specificPosition: 'DFC', marketValue: 4000000, country: 'Bélgica', attributes: { pace: 55, shooting: 65, passing: 78, dribbling: 74, defending: 81, physical: 76 } },
      { name: 'Reinildo Mandava', age: 30, overall: 79, potential: 79, position: 'DEF', specificPosition: 'LI', marketValue: 9000000, country: 'Mozambique', attributes: { pace: 82, shooting: 48, passing: 65, dribbling: 70, defending: 81, physical: 80 } },
      { name: 'Pablo Barrios', age: 21, overall: 77, potential: 85, position: 'MED', specificPosition: 'MC', marketValue: 30000000, country: 'España', attributes: { pace: 76, shooting: 70, passing: 78, dribbling: 79, defending: 72, physical: 72 } },
      { name: 'Angel Correa', age: 29, overall: 80, potential: 80, position: 'DEL', specificPosition: 'ED', marketValue: 18000000, country: 'Argentina', attributes: { pace: 84, shooting: 78, passing: 74, dribbling: 85, defending: 45, physical: 68 } }
    ]
  },
  {
    name: 'Athletic Club',
    domesticLeague: 'LaLiga',
    country: 'España',
    overall: 82,
    budget: 50000000,
    primaryColor: '#ef4444',
    secondaryColor: '#ffffff',
    pattern: 'stripes',
    squad: [
      { name: 'Nico Williams', age: 22, overall: 85, potential: 89, position: 'DEL', specificPosition: 'EI', marketValue: 70000000, country: 'España', attributes: { pace: 93, shooting: 78, passing: 79, dribbling: 87, defending: 38, physical: 68 } },
      { name: 'Unai Simón', age: 27, overall: 85, potential: 87, position: 'POR', specificPosition: 'POR', marketValue: 30000000, country: 'España', attributes: { pace: 45, shooting: 20, passing: 72, dribbling: 40, defending: 85, physical: 76 } },
      { name: 'Iñaki Williams', age: 30, overall: 82, potential: 82, position: 'DEL', specificPosition: 'ED', marketValue: 25000000, country: 'Ghana', attributes: { pace: 93, shooting: 78, passing: 74, dribbling: 80, defending: 45, physical: 82 } },
      { name: 'Oihan Sancet', age: 24, overall: 82, potential: 86, position: 'MED', specificPosition: 'MCO', marketValue: 35000000, country: 'España', attributes: { pace: 76, shooting: 80, passing: 81, dribbling: 82, defending: 65, physical: 78 } },
      { name: 'Dani Vivian', age: 25, overall: 81, potential: 85, position: 'DEF', specificPosition: 'DFC', marketValue: 30000000, country: 'España', attributes: { pace: 78, shooting: 40, passing: 65, dribbling: 62, defending: 82, physical: 84 } },
      { name: 'Aitor Paredes', age: 24, overall: 78, potential: 83, position: 'DEF', specificPosition: 'DFC', marketValue: 20000000, country: 'España', attributes: { pace: 72, shooting: 40, passing: 65, dribbling: 62, defending: 79, physical: 80 } },
      { name: 'Yuri Berchiche', age: 34, overall: 78, potential: 78, position: 'DEF', specificPosition: 'LI', marketValue: 2000000, country: 'España', attributes: { pace: 78, shooting: 68, passing: 72, dribbling: 74, defending: 78, physical: 80 } },
      { name: 'Óscar de Marcos', age: 35, overall: 77, potential: 77, position: 'DEF', specificPosition: 'LD', marketValue: 1500000, country: 'España', attributes: { pace: 76, shooting: 65, passing: 74, dribbling: 75, defending: 76, physical: 74 } },
      { name: 'Beñat Prados', age: 23, overall: 77, potential: 83, position: 'MED', specificPosition: 'MCD', marketValue: 18000000, country: 'España', attributes: { pace: 74, shooting: 62, passing: 76, dribbling: 76, defending: 77, physical: 75 } },
      { name: 'Gorka Guruzeta', age: 27, overall: 79, potential: 81, position: 'DEL', specificPosition: 'DC', marketValue: 18000000, country: 'España', attributes: { pace: 76, shooting: 80, passing: 70, dribbling: 75, defending: 40, physical: 76 } },
      { name: 'Álex Berenguer', age: 29, overall: 78, potential: 78, position: 'MED', specificPosition: 'MI', marketValue: 12000000, country: 'España', attributes: { pace: 80, shooting: 76, passing: 76, dribbling: 80, defending: 50, physical: 68 } }
    ]
  },
  {
    name: 'Sevilla FC',
    domesticLeague: 'LaLiga',
    country: 'España',
    overall: 80,
    budget: 45000000,
    primaryColor: '#ffffff',
    secondaryColor: '#ef4444',
    pattern: 'solid',
    squad: [
      { name: 'Loïc Badé', age: 24, overall: 80, potential: 85, position: 'DEF', specificPosition: 'DFC', marketValue: 20000000, country: 'Francia', attributes: { pace: 75, shooting: 40, passing: 65, dribbling: 65, defending: 81, physical: 82 } },
      { name: 'Saúl Ñíguez', age: 29, overall: 79, potential: 79, position: 'MED', specificPosition: 'MC', marketValue: 7500000, country: 'España', attributes: { pace: 74, shooting: 74, passing: 78, dribbling: 78, defending: 76, physical: 78 } },
      { name: 'Suso Fernández', age: 30, overall: 79, potential: 79, position: 'MED', specificPosition: 'MD', marketValue: 6000000, country: 'España', attributes: { pace: 70, shooting: 78, passing: 82, dribbling: 83, defending: 40, physical: 60 } },
      { name: 'Djibril Sow', age: 27, overall: 78, potential: 79, position: 'MED', specificPosition: 'MC', marketValue: 9000000, country: 'Suiza', attributes: { pace: 76, shooting: 68, passing: 77, dribbling: 77, defending: 76, physical: 76 } },
      { name: 'Isaac Romero', age: 24, overall: 77, potential: 83, position: 'DEL', specificPosition: 'DC', marketValue: 18000000, country: 'España', attributes: { pace: 82, shooting: 78, passing: 68, dribbling: 76, defending: 45, physical: 78 } },
      { name: 'Orjan Nyland', age: 33, overall: 77, potential: 77, position: 'POR', specificPosition: 'POR', marketValue: 2000000, country: 'Noruega', attributes: { pace: 45, shooting: 20, passing: 60, dribbling: 35, defending: 77, physical: 72 } },
      { name: 'Adrià Pedrosa', age: 26, overall: 76, potential: 78, position: 'DEF', specificPosition: 'LI', marketValue: 6000000, country: 'España', attributes: { pace: 84, shooting: 60, passing: 70, dribbling: 74, defending: 73, physical: 70 } },
      { name: 'Jesús Navas', age: 38, overall: 78, potential: 78, position: 'DEF', specificPosition: 'LD', marketValue: 2000000, country: 'España', attributes: { pace: 78, shooting: 65, passing: 78, dribbling: 78, defending: 74, physical: 65 } }
    ]
  },

  // --- PREMIER LEAGUE ---
  {
    name: 'Manchester City',
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    overall: 89,
    budget: 220000000,
    primaryColor: '#38bdf8',
    secondaryColor: '#ffffff',
    pattern: 'solid',
    squad: [
      { name: 'Erling Haaland', age: 24, overall: 91, potential: 94, position: 'DEL', specificPosition: 'DC', marketValue: 200000000, country: 'Noruega', attributes: { pace: 89, shooting: 93, passing: 70, dribbling: 80, defending: 45, physical: 88 } },
      { name: 'Rodri Hernández', age: 28, overall: 91, potential: 91, position: 'MED', specificPosition: 'MCD', marketValue: 130000000, country: 'España', attributes: { pace: 66, shooting: 80, passing: 86, dribbling: 84, defending: 87, physical: 85 } },
      { name: 'Kevin De Bruyne', age: 33, overall: 90, potential: 90, position: 'MED', specificPosition: 'MCO', marketValue: 50000000, country: 'Bélgica', attributes: { pace: 72, shooting: 88, passing: 94, dribbling: 87, defending: 65, physical: 75 } },
      { name: 'Phil Foden', age: 24, overall: 88, potential: 91, position: 'MED', specificPosition: 'MCO', marketValue: 150000000, country: 'Inglaterra', attributes: { pace: 86, shooting: 85, passing: 87, dribbling: 90, defending: 58, physical: 65 } },
      { name: 'Ruben Dias', age: 27, overall: 88, potential: 89, position: 'DEF', specificPosition: 'DFC', marketValue: 80000000, country: 'Portugal', attributes: { pace: 65, shooting: 40, passing: 72, dribbling: 68, defending: 89, physical: 87 } },
      { name: 'Ederson Moraes', age: 31, overall: 88, potential: 88, position: 'POR', specificPosition: 'POR', marketValue: 35000000, country: 'Brasil', attributes: { pace: 60, shooting: 30, passing: 91, dribbling: 65, defending: 88, physical: 78 } },
      { name: 'Bernardo Silva', age: 30, overall: 88, potential: 88, position: 'MED', specificPosition: 'MC', marketValue: 70000000, country: 'Portugal', attributes: { pace: 77, shooting: 78, passing: 86, dribbling: 92, defending: 68, physical: 68 } },
      { name: 'Kyle Walker', age: 34, overall: 84, potential: 84, position: 'DEF', specificPosition: 'LD', marketValue: 13000000, country: 'Inglaterra', attributes: { pace: 90, shooting: 63, passing: 76, dribbling: 78, defending: 81, physical: 82 } },
      { name: 'Josko Gvardiol', age: 22, overall: 83, potential: 88, position: 'DEF', specificPosition: 'LI', marketValue: 75000000, country: 'Croacia', attributes: { pace: 80, shooting: 60, passing: 76, dribbling: 78, defending: 84, physical: 84 } },
      { name: 'Jeremy Doku', age: 22, overall: 81, potential: 87, position: 'DEL', specificPosition: 'EI', marketValue: 65000000, country: 'Bélgica', attributes: { pace: 94, shooting: 72, passing: 75, dribbling: 89, defending: 35, physical: 65 } },
      { name: 'Savinho Moreira', age: 20, overall: 82, potential: 88, position: 'DEL', specificPosition: 'ED', marketValue: 50000000, country: 'Brasil', attributes: { pace: 90, shooting: 76, passing: 78, dribbling: 86, defending: 35, physical: 60 } },
      { name: 'Mateo Kovacic', age: 30, overall: 83, potential: 83, position: 'MED', specificPosition: 'MC', marketValue: 30000000, country: 'Croacia', attributes: { pace: 76, shooting: 68, passing: 84, dribbling: 86, defending: 76, physical: 72 } },
      { name: 'Nathan Aké', age: 29, overall: 82, potential: 82, position: 'DEF', specificPosition: 'DFC', marketValue: 40000000, country: 'Países Bajos', attributes: { pace: 76, shooting: 50, passing: 74, dribbling: 72, defending: 83, physical: 80 } },
      { name: 'Manuel Akanji', age: 29, overall: 82, potential: 83, position: 'DEF', specificPosition: 'DFC', marketValue: 45000000, country: 'Suiza', attributes: { pace: 80, shooting: 50, passing: 76, dribbling: 74, defending: 83, physical: 82 } },
      { name: 'Stefan Ortega', age: 31, overall: 80, potential: 80, position: 'POR', specificPosition: 'POR', marketValue: 9000000, country: 'Alemania', attributes: { pace: 45, shooting: 20, passing: 78, dribbling: 45, defending: 80, physical: 74 } }
    ]
  },
  {
    name: 'Arsenal FC',
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    overall: 87,
    budget: 160000000,
    primaryColor: '#dc2626',
    secondaryColor: '#ffffff',
    pattern: 'solid',
    squad: [
      { name: 'Bukayo Saka', age: 23, overall: 87, potential: 90, position: 'DEL', specificPosition: 'ED', marketValue: 140000000, country: 'Inglaterra', attributes: { pace: 88, shooting: 83, passing: 83, dribbling: 88, defending: 60, physical: 74 } },
      { name: 'Martin Ødegaard', age: 25, overall: 89, potential: 91, position: 'MED', specificPosition: 'MCO', marketValue: 110000000, country: 'Noruega', attributes: { pace: 76, shooting: 82, passing: 89, dribbling: 88, defending: 62, physical: 68 } },
      { name: 'Declan Rice', age: 25, overall: 87, potential: 90, position: 'MED', specificPosition: 'MCD', marketValue: 120000000, country: 'Inglaterra', attributes: { pace: 78, shooting: 74, passing: 83, dribbling: 81, defending: 86, physical: 86 } },
      { name: 'William Saliba', age: 23, overall: 87, potential: 91, position: 'DEF', specificPosition: 'DFC', marketValue: 80000000, country: 'Francia', attributes: { pace: 82, shooting: 40, passing: 74, dribbling: 74, defending: 88, physical: 84 } },
      { name: 'Gabriel Magalhães', age: 26, overall: 86, potential: 88, position: 'DEF', specificPosition: 'DFC', marketValue: 75000000, country: 'Brasil', attributes: { pace: 72, shooting: 50, passing: 68, dribbling: 65, defending: 87, physical: 86 } },
      { name: 'David Raya', age: 29, overall: 85, potential: 86, position: 'POR', specificPosition: 'POR', marketValue: 35000000, country: 'España', attributes: { pace: 45, shooting: 20, passing: 82, dribbling: 45, defending: 85, physical: 76 } },
      { name: 'Kai Havertz', age: 25, overall: 83, potential: 86, position: 'DEL', specificPosition: 'DC', marketValue: 75000000, country: 'Alemania', attributes: { pace: 80, shooting: 80, passing: 79, dribbling: 82, defending: 55, physical: 78 } },
      { name: 'Gabriel Martinelli', age: 23, overall: 83, potential: 87, position: 'DEL', specificPosition: 'EI', marketValue: 60000000, country: 'Brasil', attributes: { pace: 89, shooting: 78, passing: 76, dribbling: 85, defending: 45, physical: 72 } },
      { name: 'Ben White', age: 26, overall: 83, potential: 85, position: 'DEF', specificPosition: 'LD', marketValue: 55000000, country: 'Inglaterra', attributes: { pace: 78, shooting: 55, passing: 77, dribbling: 76, defending: 83, physical: 78 } },
      { name: 'Jurrien Timber', age: 23, overall: 81, potential: 86, position: 'DEF', specificPosition: 'LI', marketValue: 40000000, country: 'Países Bajos', attributes: { pace: 82, shooting: 55, passing: 76, dribbling: 78, defending: 82, physical: 78 } },
      { name: 'Mikel Merino', age: 28, overall: 83, potential: 84, position: 'MED', specificPosition: 'MC', marketValue: 50000000, country: 'España', attributes: { pace: 72, shooting: 76, passing: 80, dribbling: 80, defending: 81, physical: 84 } },
      { name: 'Riccardo Calafiori', age: 22, overall: 81, potential: 87, position: 'DEF', specificPosition: 'LI', marketValue: 45000000, country: 'Italia', attributes: { pace: 78, shooting: 60, passing: 76, dribbling: 78, defending: 82, physical: 80 } },
      { name: 'Leandro Trossard', age: 29, overall: 82, potential: 82, position: 'DEL', specificPosition: 'EI', marketValue: 35000000, country: 'Bélgica', attributes: { pace: 80, shooting: 82, passing: 80, dribbling: 84, defending: 45, physical: 66 } }
    ]
  },
  {
    name: 'Liverpool FC',
    domesticLeague: 'Premier League',
    country: 'Inglaterra',
    overall: 87,
    budget: 150000000,
    primaryColor: '#dc2626',
    secondaryColor: '#ffffff',
    pattern: 'solid',
    squad: [
      { name: 'Mohamed Salah', age: 32, overall: 89, potential: 89, position: 'DEL', specificPosition: 'ED', marketValue: 55000000, country: 'Egipto', attributes: { pace: 89, shooting: 88, passing: 82, dribbling: 88, defending: 45, physical: 75 } },
      { name: 'Virgil van Dijk', age: 33, overall: 89, potential: 89, position: 'DEF', specificPosition: 'DFC', marketValue: 30000000, country: 'Países Bajos', attributes: { pace: 78, shooting: 60, passing: 72, dribbling: 72, defending: 90, physical: 88 } },
      { name: 'Alisson Becker', age: 31, overall: 89, potential: 89, position: 'POR', specificPosition: 'POR', marketValue: 28000000, country: 'Brasil', attributes: { pace: 45, shooting: 20, passing: 85, dribbling: 45, defending: 89, physical: 78 } },
      { name: 'Trent Alexander-Arnold', age: 25, overall: 86, potential: 88, position: 'DEF', specificPosition: 'LD', marketValue: 70000000, country: 'Inglaterra', attributes: { pace: 76, shooting: 78, passing: 90, dribbling: 80, defending: 76, physical: 72 } },
      { name: 'Alexis Mac Allister', age: 25, overall: 86, potential: 88, position: 'MED', specificPosition: 'MC', marketValue: 75000000, country: 'Argentina', attributes: { pace: 76, shooting: 80, passing: 85, dribbling: 84, defending: 78, physical: 78 } },
      { name: 'Dominik Szoboszlai', age: 23, overall: 83, potential: 87, position: 'MED', specificPosition: 'MCO', marketValue: 75000000, country: 'Hungría', attributes: { pace: 84, shooting: 84, passing: 84, dribbling: 82, defending: 65, physical: 78 } },
      { name: 'Luis Díaz', age: 27, overall: 84, potential: 85, position: 'DEL', specificPosition: 'EI', marketValue: 80000000, country: 'Colombia', attributes: { pace: 91, shooting: 80, passing: 76, dribbling: 87, defending: 45, physical: 74 } },
      { name: 'Darwin Núñez', age: 25, overall: 82, potential: 85, position: 'DEL', specificPosition: 'DC', marketValue: 65000000, country: 'Uruguay', attributes: { pace: 90, shooting: 80, passing: 70, dribbling: 78, defending: 42, physical: 84 } },
      { name: 'Cody Gakpo', age: 25, overall: 83, potential: 86, position: 'DEL', specificPosition: 'EI', marketValue: 55000000, country: 'Países Bajos', attributes: { pace: 85, shooting: 82, passing: 78, dribbling: 84, defending: 45, physical: 78 } },
      { name: 'Ibrahima Konaté', age: 25, overall: 83, potential: 87, position: 'DEF', specificPosition: 'DFC', marketValue: 45000000, country: 'Francia', attributes: { pace: 78, shooting: 40, passing: 65, dribbling: 65, defending: 84, physical: 86 } },
      { name: 'Andrew Robertson', age: 30, overall: 84, potential: 84, position: 'DEF', specificPosition: 'LI', marketValue: 30000000, country: 'Escocia', attributes: { pace: 82, shooting: 62, passing: 81, dribbling: 78, defending: 81, physical: 76 } },
      { name: 'Ryan Gravenberch', age: 22, overall: 81, potential: 87, position: 'MED', specificPosition: 'MCD', marketValue: 40000000, country: 'Países Bajos', attributes: { pace: 78, shooting: 72, passing: 80, dribbling: 84, defending: 76, physical: 80 } },
      { name: 'Diogo Jota', age: 27, overall: 83, potential: 84, position: 'DEL', specificPosition: 'DC', marketValue: 50000000, country: 'Portugal', attributes: { pace: 84, shooting: 83, passing: 76, dribbling: 83, defending: 55, physical: 76 } }
    ]
  }
];
