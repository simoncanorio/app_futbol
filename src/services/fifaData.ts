export interface FIFAPlayerData {
  name: string;
  age: number;
  overall: number;
  potential: number;
  position: 'POR' | 'DEF' | 'MED' | 'DEL';
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
      { name: 'Kylian Mbappé', age: 25, overall: 91, potential: 94, position: 'DEL', marketValue: 180000000, country: 'Francia', attributes: { pace: 97, shooting: 90, passing: 80, dribbling: 92, defending: 36, physical: 78 } },
      { name: 'Jude Bellingham', age: 21, overall: 90, potential: 94, position: 'MED', marketValue: 180000000, country: 'Inglaterra', attributes: { pace: 80, shooting: 86, passing: 85, dribbling: 88, defending: 78, physical: 86 } },
      { name: 'Vinícius Jr', age: 24, overall: 90, potential: 94, position: 'DEL', marketValue: 180000000, country: 'Brasil', attributes: { pace: 95, shooting: 84, passing: 81, dribbling: 91, defending: 29, physical: 69 } },
      { name: 'Thibaut Courtois', age: 32, overall: 89, potential: 89, position: 'POR', marketValue: 45000000, country: 'Bélgica', attributes: { pace: 45, shooting: 20, passing: 65, dribbling: 40, defending: 89, physical: 78 } },
      { name: 'Federico Valverde', age: 26, overall: 88, potential: 90, position: 'MED', marketValue: 130000000, country: 'Uruguay', attributes: { pace: 88, shooting: 82, passing: 84, dribbling: 84, defending: 80, physical: 84 } },
      { name: 'Antonio Rüdiger', age: 31, overall: 87, potential: 87, position: 'DEF', marketValue: 25000000, country: 'Alemania', attributes: { pace: 82, shooting: 54, passing: 71, dribbling: 68, defending: 86, physical: 86 } },
      { name: 'Rodrygo Goes', age: 23, overall: 86, potential: 91, position: 'DEL', marketValue: 110000000, country: 'Brasil', attributes: { pace: 89, shooting: 82, passing: 79, dribbling: 87, defending: 32, physical: 65 } },
      { name: 'Luka Modric', age: 38, overall: 86, potential: 86, position: 'MED', marketValue: 6000000, country: 'Croacia', attributes: { pace: 68, shooting: 75, passing: 89, dribbling: 86, defending: 72, physical: 64 } },
      { name: 'Dani Carvajal', age: 32, overall: 86, potential: 86, position: 'DEF', marketValue: 12000000, country: 'España', attributes: { pace: 80, shooting: 60, passing: 78, dribbling: 80, defending: 83, physical: 82 } },
      { name: 'Aurélien Tchouaméni', age: 24, overall: 85, potential: 89, position: 'MED', marketValue: 90000000, country: 'Francia', attributes: { pace: 75, shooting: 71, passing: 79, dribbling: 78, defending: 83, physical: 84 } },
      { name: 'Éder Militão', age: 26, overall: 85, potential: 88, position: 'DEF', marketValue: 60000000, country: 'Brasil', attributes: { pace: 83, shooting: 50, passing: 70, dribbling: 70, defending: 85, physical: 82 } },
      { name: 'Eduardo Camavinga', age: 21, overall: 83, potential: 89, position: 'MED', marketValue: 100000000, country: 'Francia', attributes: { pace: 80, shooting: 68, passing: 81, dribbling: 84, defending: 80, physical: 80 } },
      { name: 'Brahim Díaz', age: 25, overall: 82, potential: 85, position: 'DEL', marketValue: 40000000, country: 'Marruecos', attributes: { pace: 84, shooting: 76, passing: 78, dribbling: 85, defending: 35, physical: 58 } },
      { name: 'Ferland Mendy', age: 29, overall: 82, potential: 82, position: 'DEF', marketValue: 22000000, country: 'Francia', attributes: { pace: 86, shooting: 62, passing: 74, dribbling: 78, defending: 80, physical: 82 } },
      { name: 'Andriy Lunin', age: 25, overall: 81, potential: 85, position: 'POR', marketValue: 25000000, country: 'Ucrania', attributes: { pace: 45, shooting: 20, passing: 60, dribbling: 35, defending: 81, physical: 72 } },
      { name: 'Arda Güler', age: 19, overall: 78, potential: 89, position: 'MED', marketValue: 45000000, country: 'Turquía', attributes: { pace: 76, shooting: 74, passing: 80, dribbling: 82, defending: 50, physical: 58 } },
      { name: 'Endrick Felipe', age: 18, overall: 77, potential: 91, position: 'DEL', marketValue: 60000000, country: 'Brasil', attributes: { pace: 89, shooting: 77, passing: 65, dribbling: 78, defending: 30, physical: 76 } },
      { name: 'Lucas Vázquez', age: 33, overall: 81, potential: 81, position: 'DEF', marketValue: 5000000, country: 'España', attributes: { pace: 80, shooting: 72, passing: 78, dribbling: 79, defending: 74, physical: 70 } },
      { name: 'Fran García', age: 25, overall: 79, potential: 82, position: 'DEF', marketValue: 15000000, country: 'España', attributes: { pace: 88, shooting: 58, passing: 70, dribbling: 75, defending: 73, physical: 72 } },
      { name: 'Dani Ceballos', age: 28, overall: 79, potential: 79, position: 'MED', marketValue: 10000000, country: 'España', attributes: { pace: 68, shooting: 70, passing: 81, dribbling: 82, defending: 70, physical: 66 } }
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
      { name: 'Robert Lewandowski', age: 36, overall: 88, potential: 88, position: 'DEL', marketValue: 15000000, country: 'Polonia', attributes: { pace: 72, shooting: 90, passing: 79, dribbling: 85, defending: 44, physical: 81 } },
      { name: 'Marc-André ter Stegen', age: 32, overall: 89, potential: 89, position: 'POR', marketValue: 28000000, country: 'Alemania', attributes: { pace: 45, shooting: 20, passing: 85, dribbling: 45, defending: 89, physical: 78 } },
      { name: 'Frenkie de Jong', age: 27, overall: 87, potential: 89, position: 'MED', marketValue: 70000000, country: 'Países Bajos', attributes: { pace: 82, shooting: 69, passing: 86, dribbling: 88, defending: 77, physical: 78 } },
      { name: 'Pedri González', age: 21, overall: 86, potential: 90, position: 'MED', marketValue: 80000000, country: 'España', attributes: { pace: 78, shooting: 70, passing: 87, dribbling: 88, defending: 68, physical: 64 } },
      { name: 'Dani Olmo', age: 26, overall: 85, potential: 87, position: 'MED', marketValue: 60000000, country: 'España', attributes: { pace: 78, shooting: 80, passing: 84, dribbling: 85, defending: 55, physical: 68 } },
      { name: 'Ronald Araújo', age: 25, overall: 85, potential: 89, position: 'DEF', marketValue: 70000000, country: 'Uruguay', attributes: { pace: 83, shooting: 50, passing: 65, dribbling: 62, defending: 86, physical: 86 } },
      { name: 'Jules Koundé', age: 25, overall: 85, potential: 88, position: 'DEF', marketValue: 55000000, country: 'Francia', attributes: { pace: 82, shooting: 52, passing: 75, dribbling: 74, defending: 85, physical: 78 } },
      { name: 'Raphinha', age: 27, overall: 84, potential: 85, position: 'DEL', marketValue: 60000000, country: 'Brasil', attributes: { pace: 90, shooting: 82, passing: 81, dribbling: 85, defending: 50, physical: 73 } },
      { name: 'Gavi Paez', age: 20, overall: 83, potential: 89, position: 'MED', marketValue: 90000000, country: 'España', attributes: { pace: 78, shooting: 68, passing: 80, dribbling: 84, defending: 76, physical: 80 } },
      { name: 'Lamine Yamal', age: 17, overall: 82, potential: 93, position: 'DEL', marketValue: 150000000, country: 'España', attributes: { pace: 91, shooting: 78, passing: 81, dribbling: 87, defending: 35, physical: 56 } },
      { name: 'Andreas Christensen', age: 28, overall: 83, potential: 84, position: 'DEF', marketValue: 30000000, country: 'Dinamarca', attributes: { pace: 68, shooting: 50, passing: 74, dribbling: 72, defending: 84, physical: 77 } },
      { name: 'Alejandro Balde', age: 20, overall: 81, potential: 89, position: 'DEF', marketValue: 40000000, country: 'España', attributes: { pace: 91, shooting: 55, passing: 73, dribbling: 80, defending: 76, physical: 70 } },
      { name: 'Ferran Torres', age: 24, overall: 80, potential: 84, position: 'DEL', marketValue: 30000000, country: 'España', attributes: { pace: 82, shooting: 78, passing: 75, dribbling: 80, defending: 45, physical: 68 } },
      { name: 'Iñigo Martínez', age: 33, overall: 80, potential: 80, position: 'DEF', marketValue: 5000000, country: 'España', attributes: { pace: 65, shooting: 55, passing: 72, dribbling: 66, defending: 81, physical: 78 } },
      { name: 'Fermín López', age: 21, overall: 78, potential: 86, position: 'MED', marketValue: 30000000, country: 'España', attributes: { pace: 78, shooting: 76, passing: 76, dribbling: 80, defending: 62, physical: 70 } },
      { name: 'Pau Cubarsí', age: 17, overall: 75, potential: 88, position: 'DEF', marketValue: 40000000, country: 'España', attributes: { pace: 72, shooting: 40, passing: 78, dribbling: 72, defending: 77, physical: 72 } },
      { name: 'Marc Casadó', age: 20, overall: 74, potential: 84, position: 'MED', marketValue: 15000000, country: 'España', attributes: { pace: 72, shooting: 60, passing: 76, dribbling: 74, defending: 75, physical: 72 } },
      { name: 'Ansu Fati', age: 21, overall: 77, potential: 85, position: 'DEL', marketValue: 15000000, country: 'España', attributes: { pace: 84, shooting: 76, passing: 72, dribbling: 80, defending: 30, physical: 58 } },
      { name: 'Wojciech Szczęsny', age: 34, overall: 83, potential: 83, position: 'POR', marketValue: 3000000, country: 'Polonia', attributes: { pace: 45, shooting: 20, passing: 60, dribbling: 35, defending: 83, physical: 75 } },
      { name: 'Eric García', age: 23, overall: 78, potential: 82, position: 'DEF', marketValue: 18000000, country: 'España', attributes: { pace: 68, shooting: 48, passing: 76, dribbling: 70, defending: 78, physical: 72 } }
    ]
  },
  {
    name: 'Atlético de Madrid',
    domesticLeague: 'LaLiga',
    country: 'España',
    overall: 85,
    budget: 90000000,
    primaryColor: '#dc2626',
    secondaryColor: '#ffffff',
    pattern: 'stripes',
    squad: [
      { name: 'Antoine Griezmann', age: 33, overall: 88, potential: 88, position: 'DEL', marketValue: 25000000, country: 'Francia', attributes: { pace: 78, shooting: 87, passing: 87, dribbling: 87, defending: 58, physical: 72 } },
      { name: 'Jan Oblak', age: 31, overall: 88, potential: 88, position: 'POR', marketValue: 28000000, country: 'Eslovenia', attributes: { pace: 45, shooting: 20, passing: 60, dribbling: 40, defending: 88, physical: 80 } },
      { name: 'Julián Álvarez', age: 24, overall: 84, potential: 88, position: 'DEL', marketValue: 75000000, country: 'Argentina', attributes: { pace: 84, shooting: 84, passing: 78, dribbling: 82, defending: 55, physical: 78 } },
      { name: 'Rodrigo De Paul', age: 30, overall: 84, potential: 84, position: 'MED', marketValue: 30000000, country: 'Argentina', attributes: { pace: 76, shooting: 78, passing: 83, dribbling: 82, defending: 77, physical: 82 } },
      { name: 'Koke Resurrección', age: 32, overall: 83, potential: 83, position: 'MED', marketValue: 12000000, country: 'España', attributes: { pace: 62, shooting: 72, passing: 85, dribbling: 78, defending: 78, physical: 76 } },
      { name: 'Marcos Llorente', age: 29, overall: 83, potential: 83, position: 'MED', marketValue: 30000000, country: 'España', attributes: { pace: 88, shooting: 78, passing: 78, dribbling: 80, defending: 78, physical: 82 } },
      { name: 'Robin Le Normand', age: 27, overall: 82, potential: 84, position: 'DEF', marketValue: 40000000, country: 'España', attributes: { pace: 70, shooting: 45, passing: 68, dribbling: 64, defending: 83, physical: 82 } },
      { name: 'Conor Gallagher', age: 24, overall: 81, potential: 85, position: 'MED', marketValue: 50000000, country: 'Inglaterra', attributes: { pace: 78, shooting: 75, passing: 78, dribbling: 78, defending: 77, physical: 84 } },
      { name: 'Alexander Sørloth', age: 28, overall: 81, potential: 81, position: 'DEL', marketValue: 25000000, country: 'Noruega', attributes: { pace: 78, shooting: 82, passing: 68, dribbling: 74, defending: 38, physical: 86 } },
      { name: 'Jose María Giménez', age: 29, overall: 82, potential: 82, position: 'DEF', marketValue: 22000000, country: 'Uruguay', attributes: { pace: 68, shooting: 45, passing: 62, dribbling: 60, defending: 84, physical: 84 } },
      { name: 'Samuel Lino', age: 24, overall: 81, potential: 85, position: 'DEL', marketValue: 30000000, country: 'Brasil', attributes: { pace: 88, shooting: 76, passing: 75, dribbling: 84, defending: 65, physical: 72 } },
      { name: 'Nahuel Molina', age: 26, overall: 80, potential: 82, position: 'DEF', marketValue: 28000000, country: 'Argentina', attributes: { pace: 84, shooting: 68, passing: 75, dribbling: 78, defending: 75, physical: 74 } },
      { name: 'Axel Witsel', age: 35, overall: 80, potential: 80, position: 'DEF', marketValue: 3000000, country: 'Bélgica', attributes: { pace: 50, shooting: 65, passing: 78, dribbling: 74, defending: 81, physical: 76 } },
      { name: 'Pablo Barrios', age: 21, overall: 77, potential: 85, position: 'MED', marketValue: 30000000, country: 'España', attributes: { pace: 75, shooting: 68, passing: 78, dribbling: 80, defending: 72, physical: 72 } },
      { name: 'Reinildo Mandava', age: 30, overall: 79, potential: 79, position: 'DEF', marketValue: 12000000, country: 'Mozambique', attributes: { pace: 80, shooting: 45, passing: 65, dribbling: 70, defending: 81, physical: 82 } },
      { name: 'Ángel Correa', age: 29, overall: 80, potential: 80, position: 'DEL', marketValue: 18000000, country: 'Argentina', attributes: { pace: 82, shooting: 78, passing: 76, dribbling: 84, defending: 50, physical: 72 } },
      { name: 'César Azpilicueta', age: 35, overall: 78, potential: 78, position: 'DEF', marketValue: 2500000, country: 'España', attributes: { pace: 60, shooting: 55, passing: 72, dribbling: 70, defending: 80, physical: 74 } },
      { name: 'Juan Musso', age: 30, overall: 78, potential: 78, position: 'POR', marketValue: 5000000, country: 'Argentina', attributes: { pace: 45, shooting: 20, passing: 55, dribbling: 35, defending: 78, physical: 74 } },
      { name: 'Rodrigo Riquelme', age: 24, overall: 78, potential: 83, position: 'MED', marketValue: 22000000, country: 'España', attributes: { pace: 82, shooting: 74, passing: 76, dribbling: 82, defending: 48, physical: 64 } },
      { name: 'Javi Galán', age: 29, overall: 77, potential: 77, position: 'DEF', marketValue: 7000000, country: 'España', attributes: { pace: 80, shooting: 55, passing: 72, dribbling: 78, defending: 74, physical: 72 } }
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
      { name: 'Erling Haaland', age: 24, overall: 91, potential: 93, position: 'DEL', marketValue: 200000000, country: 'Noruega', attributes: { pace: 89, shooting: 93, passing: 70, dribbling: 80, defending: 45, physical: 88 } },
      { name: 'Rodri Hernández', age: 28, overall: 91, potential: 91, position: 'MED', marketValue: 130000000, country: 'España', attributes: { pace: 66, shooting: 80, passing: 87, dribbling: 84, defending: 87, physical: 85 } },
      { name: 'Kevin De Bruyne', age: 33, overall: 90, potential: 90, position: 'MED', marketValue: 50000000, country: 'Bélgica', attributes: { pace: 72, shooting: 88, passing: 94, dribbling: 87, defending: 65, physical: 75 } },
      { name: 'Phil Foden', age: 24, overall: 88, potential: 92, position: 'MED', marketValue: 150000000, country: 'Inglaterra', attributes: { pace: 86, shooting: 85, passing: 87, dribbling: 90, defending: 58, physical: 68 } },
      { name: 'Rúben Dias', age: 27, overall: 88, potential: 89, position: 'DEF', marketValue: 80000000, country: 'Portugal', attributes: { pace: 65, shooting: 40, passing: 72, dribbling: 68, defending: 89, physical: 87 } },
      { name: 'Bernardo Silva', age: 30, overall: 88, potential: 88, position: 'MED', marketValue: 70000000, country: 'Portugal', attributes: { pace: 76, shooting: 78, passing: 86, dribbling: 92, defending: 68, physical: 68 } },
      { name: 'Ederson Moraes', age: 31, overall: 88, potential: 88, position: 'POR', marketValue: 35000000, country: 'Brasil', attributes: { pace: 60, shooting: 30, passing: 90, dribbling: 60, defending: 88, physical: 78 } },
      { name: 'Ilkay Gündogan', age: 33, overall: 85, potential: 85, position: 'MED', marketValue: 12000000, country: 'Alemania', attributes: { pace: 65, shooting: 80, passing: 86, dribbling: 85, defending: 74, physical: 72 } },
      { name: 'John Stones', age: 30, overall: 85, potential: 85, position: 'DEF', marketValue: 38000000, country: 'Inglaterra', attributes: { pace: 72, shooting: 60, passing: 80, dribbling: 78, defending: 85, physical: 78 } },
      { name: 'Manuel Akanji', age: 29, overall: 84, potential: 84, position: 'DEF', marketValue: 45000000, country: 'Suiza', attributes: { pace: 78, shooting: 50, passing: 74, dribbling: 74, defending: 84, physical: 82 } },
      { name: 'Kyle Walker', age: 34, overall: 84, potential: 84, position: 'DEF', marketValue: 13000000, country: 'Inglaterra', attributes: { pace: 90, shooting: 64, passing: 76, dribbling: 77, defending: 82, physical: 82 } },
      { name: 'Jack Grealish', age: 29, overall: 84, potential: 84, position: 'DEL', marketValue: 55000000, country: 'Inglaterra', attributes: { pace: 76, shooting: 76, passing: 83, dribbling: 87, defending: 52, physical: 74 } },
      { name: 'Joško Gvardiol', age: 22, overall: 83, potential: 89, position: 'DEF', marketValue: 75000000, country: 'Croacia', attributes: { pace: 80, shooting: 62, passing: 76, dribbling: 78, defending: 83, physical: 84 } },
      { name: 'Nathan Aké', age: 29, overall: 82, potential: 82, position: 'DEF', marketValue: 40000000, country: 'Países Bajos', attributes: { pace: 74, shooting: 55, passing: 74, dribbling: 72, defending: 83, physical: 78 } },
      { name: 'Mateo Kovačić', age: 30, overall: 82, potential: 82, position: 'MED', marketValue: 30000000, country: 'Croacia', attributes: { pace: 74, shooting: 68, passing: 82, dribbling: 87, defending: 74, physical: 74 } },
      { name: 'Jérémy Doku', age: 22, overall: 81, potential: 87, position: 'DEL', marketValue: 65000000, country: 'Bélgica', attributes: { pace: 93, shooting: 72, passing: 74, dribbling: 88, defending: 32, physical: 66 } },
      { name: 'Savinho', age: 20, overall: 80, potential: 88, position: 'DEL', marketValue: 50000000, country: 'Brasil', attributes: { pace: 88, shooting: 74, passing: 76, dribbling: 85, defending: 35, physical: 60 } },
      { name: 'Matheus Nunes', age: 26, overall: 79, potential: 82, position: 'MED', marketValue: 35000000, country: 'Portugal', attributes: { pace: 82, shooting: 70, passing: 76, dribbling: 82, defending: 72, physical: 78 } },
      { name: 'Stefan Ortega', age: 31, overall: 79, potential: 79, position: 'POR', marketValue: 9000000, country: 'Alemania', attributes: { pace: 45, shooting: 20, passing: 75, dribbling: 40, defending: 79, physical: 74 } },
      { name: 'Rico Lewis', age: 19, overall: 76, potential: 86, position: 'DEF', marketValue: 38000000, country: 'Inglaterra', attributes: { pace: 78, shooting: 60, passing: 76, dribbling: 78, defending: 74, physical: 64 } }
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
      { name: 'Martin Ødegaard', age: 25, overall: 89, potential: 91, position: 'MED', marketValue: 110000000, country: 'Noruega', attributes: { pace: 76, shooting: 82, passing: 90, dribbling: 89, defending: 64, physical: 66 } },
      { name: 'Bukayo Saka', age: 23, overall: 87, potential: 90, position: 'DEL', marketValue: 140000000, country: 'Inglaterra', attributes: { pace: 86, shooting: 83, passing: 83, dribbling: 87, defending: 65, physical: 74 } },
      { name: 'Declan Rice', age: 25, overall: 87, potential: 90, position: 'MED', marketValue: 120000000, country: 'Inglaterra', attributes: { pace: 74, shooting: 74, passing: 83, dribbling: 80, defending: 86, physical: 86 } },
      { name: 'William Saliba', age: 23, overall: 87, potential: 91, position: 'DEF', marketValue: 80000000, country: 'Francia', attributes: { pace: 82, shooting: 40, passing: 74, dribbling: 72, defending: 87, physical: 84 } },
      { name: 'Gabriel Magalhães', age: 26, overall: 86, potential: 88, position: 'DEF', marketValue: 75000000, country: 'Brasil', attributes: { pace: 70, shooting: 45, passing: 68, dribbling: 64, defending: 87, physical: 86 } },
      { name: 'Kai Havertz', age: 25, overall: 82, potential: 85, position: 'DEL', marketValue: 75000000, country: 'Alemania', attributes: { pace: 78, shooting: 78, passing: 79, dribbling: 81, defending: 55, physical: 78 } },
      { name: 'Gabriel Martinelli', age: 23, overall: 83, potential: 87, position: 'DEL', marketValue: 60000000, country: 'Brasil', attributes: { pace: 89, shooting: 78, passing: 75, dribbling: 84, defending: 45, physical: 72 } },
      { name: 'David Raya', age: 29, overall: 83, potential: 84, position: 'POR', marketValue: 35000000, country: 'España', attributes: { pace: 45, shooting: 20, passing: 80, dribbling: 40, defending: 83, physical: 76 } },
      { name: 'Ben White', age: 26, overall: 83, potential: 85, position: 'DEF', marketValue: 55000000, country: 'Inglaterra', attributes: { pace: 76, shooting: 55, passing: 76, dribbling: 76, defending: 83, physical: 78 } },
      { name: 'Gabriel Jesus', age: 27, overall: 82, potential: 83, position: 'DEL', marketValue: 45000000, country: 'Brasil', attributes: { pace: 82, shooting: 80, passing: 75, dribbling: 85, defending: 40, physical: 74 } },
      { name: 'Leandro Trossard', age: 29, overall: 81, potential: 81, position: 'DEL', marketValue: 35000000, country: 'Bélgica', attributes: { pace: 78, shooting: 82, passing: 80, dribbling: 84, defending: 42, physical: 66 } },
      { name: 'Thomas Partey', age: 31, overall: 83, potential: 83, position: 'MED', marketValue: 18000000, country: 'Ghana', attributes: { pace: 65, shooting: 74, passing: 81, dribbling: 80, defending: 82, physical: 82 } },
      { name: 'Jurriën Timber', age: 23, overall: 80, potential: 86, position: 'DEF', marketValue: 38000000, country: 'Países Bajos', attributes: { pace: 80, shooting: 50, passing: 75, dribbling: 78, defending: 80, physical: 76 } },
      { name: 'Riccardo Calafiori', age: 22, overall: 79, potential: 86, position: 'DEF', marketValue: 45000000, country: 'Italia', attributes: { pace: 76, shooting: 58, passing: 74, dribbling: 74, defending: 80, physical: 80 } },
      { name: 'Oleksandr Zinchenko', age: 27, overall: 80, potential: 81, position: 'DEF', marketValue: 35000000, country: 'Ucrania', attributes: { pace: 72, shooting: 66, passing: 83, dribbling: 82, defending: 76, physical: 68 } },
      { name: 'Jorginho Frello', age: 32, overall: 82, potential: 82, position: 'MED', marketValue: 12000000, country: 'Italia', attributes: { pace: 52, shooting: 68, passing: 86, dribbling: 78, defending: 74, physical: 65 } },
      { name: 'Takehiro Tomiyasu', age: 25, overall: 79, potential: 81, position: 'DEF', marketValue: 30000000, country: 'Japón', attributes: { pace: 74, shooting: 48, passing: 70, dribbling: 70, defending: 81, physical: 78 } },
      { name: 'Jakub Kiwior', age: 24, overall: 78, potential: 83, position: 'DEF', marketValue: 30000000, country: 'Polonia', attributes: { pace: 74, shooting: 45, passing: 70, dribbling: 68, defending: 78, physical: 78 } },
      { name: 'Neto Murara', age: 35, overall: 78, potential: 78, position: 'POR', marketValue: 2500000, country: 'Brasil', attributes: { pace: 45, shooting: 20, passing: 60, dribbling: 35, defending: 78, physical: 72 } },
      { name: 'Ethan Nwaneri', age: 17, overall: 70, potential: 88, position: 'MED', marketValue: 12000000, country: 'Inglaterra', attributes: { pace: 76, shooting: 70, passing: 74, dribbling: 76, defending: 45, physical: 60 } }
    ]
  }
];
