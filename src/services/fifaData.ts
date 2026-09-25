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
  domesticLeague: 'LaLiga' | 'Premier League' | 'Serie A' | 'Ligue 1' | 'Bundesliga';
  country: string;
  overall: number;
  budget: number;
  primaryColor: string;
  secondaryColor: string;
  pattern: 'solid' | 'stripes' | 'hoop' | 'diagonal';
  squad: FIFAPlayerData[];
}

export const EA_FC_DATABASE: FIFAClubData[] = [
  {
    "name": "Real Madrid",
    "domesticLeague": "LaLiga",
    "country": "España",
    "overall": 87,
    "budget": 100000000,
    "primaryColor": "#ef4444",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Kylian Mbappé",
        "age": 27,
        "overall": 91,
        "potential": 95,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 1258925412,
        "country": "France",
        "attributes": {
          "pace": 97,
          "shooting": 90,
          "passing": 81,
          "dribbling": 92,
          "defending": 37,
          "physical": 76
        }
      },
      {
        "name": "Jude Bellingham",
        "age": 22,
        "overall": 90,
        "potential": 92,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 1500000000,
        "country": "England",
        "attributes": {
          "pace": 80,
          "shooting": 86,
          "passing": 83,
          "dribbling": 90,
          "defending": 78,
          "physical": 85
        }
      },
      {
        "name": "Federico Valverde",
        "age": 27,
        "overall": 89,
        "potential": 91,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 794328235,
        "country": "Uruguay",
        "attributes": {
          "pace": 88,
          "shooting": 84,
          "passing": 84,
          "dribbling": 84,
          "defending": 83,
          "physical": 85
        }
      },
      {
        "name": "Vini Jr.",
        "age": 25,
        "overall": 89,
        "potential": 91,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 794328235,
        "country": "Brazil",
        "attributes": {
          "pace": 95,
          "shooting": 84,
          "passing": 81,
          "dribbling": 91,
          "defending": 29,
          "physical": 69
        }
      },
      {
        "name": "Thibaut Courtois",
        "age": 33,
        "overall": 89,
        "potential": 92,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 476596941,
        "country": "Belgium",
        "attributes": {
          "pace": 85,
          "shooting": 89,
          "passing": 76,
          "dribbling": 90,
          "defending": 46,
          "physical": 88
        }
      },
      {
        "name": "Antonio Rüdiger",
        "age": 33,
        "overall": 86,
        "potential": 90,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 238864302,
        "country": "Germany",
        "attributes": {
          "pace": 79,
          "shooting": 55,
          "passing": 72,
          "dribbling": 70,
          "defending": 84,
          "physical": 86
        }
      },
      {
        "name": "Trent Alexander-Arnold",
        "age": 27,
        "overall": 86,
        "potential": 86,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 398107171,
        "country": "England",
        "attributes": {
          "pace": 76,
          "shooting": 72,
          "passing": 89,
          "dribbling": 80,
          "defending": 80,
          "physical": 74
        }
      },
      {
        "name": "Carvajal",
        "age": 34,
        "overall": 85,
        "potential": 89,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 189736660,
        "country": "Spain",
        "attributes": {
          "pace": 80,
          "shooting": 58,
          "passing": 79,
          "dribbling": 81,
          "defending": 81,
          "physical": 79
        }
      },
      {
        "name": "Rodrygo",
        "age": 25,
        "overall": 85,
        "potential": 85,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 316227766,
        "country": "Brazil",
        "attributes": {
          "pace": 88,
          "shooting": 80,
          "passing": 79,
          "dribbling": 87,
          "defending": 31,
          "physical": 64
        }
      },
      {
        "name": "Aurélien Tchouaméni",
        "age": 26,
        "overall": 84,
        "potential": 87,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 251188643,
        "country": "France",
        "attributes": {
          "pace": 71,
          "shooting": 69,
          "passing": 79,
          "dribbling": 78,
          "defending": 81,
          "physical": 82
        }
      },
      {
        "name": "Éder Militão",
        "age": 28,
        "overall": 84,
        "potential": 88,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 251188643,
        "country": "Brazil",
        "attributes": {
          "pace": 82,
          "shooting": 50,
          "passing": 69,
          "dribbling": 71,
          "defending": 85,
          "physical": 82
        }
      },
      {
        "name": "Eduardo Camavinga",
        "age": 23,
        "overall": 83,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 199526231,
        "country": "France",
        "attributes": {
          "pace": 80,
          "shooting": 68,
          "passing": 81,
          "dribbling": 84,
          "defending": 78,
          "physical": 80
        }
      },
      {
        "name": "David Alaba",
        "age": 33,
        "overall": 82,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 95093592,
        "country": "Austria",
        "attributes": {
          "pace": 68,
          "shooting": 71,
          "passing": 82,
          "dribbling": 79,
          "defending": 82,
          "physical": 75
        }
      },
      {
        "name": "Dean Huijsen",
        "age": 20,
        "overall": 82,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 237733979,
        "country": "Spain",
        "attributes": {
          "pace": 71,
          "shooting": 55,
          "passing": 73,
          "dribbling": 74,
          "defending": 82,
          "physical": 76
        }
      },
      {
        "name": "Brahim",
        "age": 26,
        "overall": 82,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 158489319,
        "country": "Morocco",
        "attributes": {
          "pace": 82,
          "shooting": 74,
          "passing": 79,
          "dribbling": 85,
          "defending": 31,
          "physical": 58
        }
      },
      {
        "name": "Ferland Mendy",
        "age": 30,
        "overall": 81,
        "potential": 85,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 125892541,
        "country": "France",
        "attributes": {
          "pace": 85,
          "shooting": 64,
          "passing": 74,
          "dribbling": 75,
          "defending": 78,
          "physical": 84
        }
      },
      {
        "name": "Andriy Lunin",
        "age": 27,
        "overall": 81,
        "potential": 83,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 125892541,
        "country": "Ukraine",
        "attributes": {
          "pace": 80,
          "shooting": 78,
          "passing": 79,
          "dribbling": 82,
          "defending": 37,
          "physical": 80
        }
      },
      {
        "name": "Dani Ceballos",
        "age": 29,
        "overall": 81,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 125892541,
        "country": "Spain",
        "attributes": {
          "pace": 61,
          "shooting": 71,
          "passing": 80,
          "dribbling": 82,
          "defending": 72,
          "physical": 67
        }
      },
      {
        "name": "Arda Güler",
        "age": 21,
        "overall": 81,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 188838812,
        "country": "Turkey",
        "attributes": {
          "pace": 70,
          "shooting": 77,
          "passing": 83,
          "dribbling": 83,
          "defending": 52,
          "physical": 50
        }
      },
      {
        "name": "Álvaro Carreras",
        "age": 23,
        "overall": 80,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 100000000,
        "country": "Spain",
        "attributes": {
          "pace": 85,
          "shooting": 65,
          "passing": 75,
          "dribbling": 79,
          "defending": 73,
          "physical": 80
        }
      },
      {
        "name": "Fran García",
        "age": 26,
        "overall": 79,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 79432823,
        "country": "Spain",
        "attributes": {
          "pace": 89,
          "shooting": 50,
          "passing": 70,
          "dribbling": 78,
          "defending": 72,
          "physical": 71
        }
      },
      {
        "name": "Franco Mastantuono",
        "age": 18,
        "overall": 77,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 75178085,
        "country": "Argentina",
        "attributes": {
          "pace": 74,
          "shooting": 71,
          "passing": 75,
          "dribbling": 80,
          "defending": 50,
          "physical": 63
        }
      },
      {
        "name": "Endrick",
        "age": 19,
        "overall": 77,
        "potential": 79,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 75178085,
        "country": "Brazil",
        "attributes": {
          "pace": 87,
          "shooting": 77,
          "passing": 62,
          "dribbling": 78,
          "defending": 30,
          "physical": 68
        }
      },
      {
        "name": "Asencio",
        "age": 23,
        "overall": 77,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 50118723,
        "country": "Spain",
        "attributes": {
          "pace": 74,
          "shooting": 37,
          "passing": 55,
          "dribbling": 71,
          "defending": 78,
          "physical": 76
        }
      },
      {
        "name": "Gonzalo",
        "age": 22,
        "overall": 69,
        "potential": 72,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 11914924,
        "country": "Spain",
        "attributes": {
          "pace": 68,
          "shooting": 69,
          "passing": 61,
          "dribbling": 68,
          "defending": 45,
          "physical": 69
        }
      },
      {
        "name": "Fran González",
        "age": 20,
        "overall": 63,
        "potential": 63,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 2992893,
        "country": "Spain",
        "attributes": {
          "pace": 62,
          "shooting": 61,
          "passing": 60,
          "dribbling": 64,
          "defending": 17,
          "physical": 63
        }
      }
    ]
  },
  {
    "name": "FC Barcelona",
    "domesticLeague": "LaLiga",
    "country": "España",
    "overall": 86,
    "budget": 100000000,
    "primaryColor": "#ef4444",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Raphinha",
        "age": 29,
        "overall": 89,
        "potential": 90,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 794328235,
        "country": "Brazil",
        "attributes": {
          "pace": 91,
          "shooting": 84,
          "passing": 85,
          "dribbling": 87,
          "defending": 53,
          "physical": 75
        }
      },
      {
        "name": "Lamine Yamal",
        "age": 18,
        "overall": 89,
        "potential": 91,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 1191492352,
        "country": "Spain",
        "attributes": {
          "pace": 85,
          "shooting": 81,
          "passing": 86,
          "dribbling": 90,
          "defending": 23,
          "physical": 53
        }
      },
      {
        "name": "Pedri",
        "age": 23,
        "overall": 89,
        "potential": 91,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 794328235,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 73,
          "passing": 85,
          "dribbling": 91,
          "defending": 78,
          "physical": 77
        }
      },
      {
        "name": "Robert Lewandowski",
        "age": 37,
        "overall": 88,
        "potential": 90,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 378574407,
        "country": "Poland",
        "attributes": {
          "pace": 74,
          "shooting": 89,
          "passing": 79,
          "dribbling": 85,
          "defending": 44,
          "physical": 84
        }
      },
      {
        "name": "Frenkie de Jong",
        "age": 28,
        "overall": 87,
        "potential": 91,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 501187234,
        "country": "Holland",
        "attributes": {
          "pace": 82,
          "shooting": 71,
          "passing": 85,
          "dribbling": 87,
          "defending": 78,
          "physical": 77
        }
      },
      {
        "name": "Jules Koundé",
        "age": 27,
        "overall": 87,
        "potential": 89,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 501187234,
        "country": "France",
        "attributes": {
          "pace": 84,
          "shooting": 47,
          "passing": 74,
          "dribbling": 79,
          "defending": 86,
          "physical": 84
        }
      },
      {
        "name": "Marc-André ter Stegen",
        "age": 33,
        "overall": 86,
        "potential": 90,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 238864302,
        "country": "Germany",
        "attributes": {
          "pace": 84,
          "shooting": 84,
          "passing": 89,
          "dribbling": 85,
          "defending": 47,
          "physical": 84
        }
      },
      {
        "name": "Dani Olmo",
        "age": 27,
        "overall": 85,
        "potential": 85,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 316227766,
        "country": "Spain",
        "attributes": {
          "pace": 73,
          "shooting": 79,
          "passing": 83,
          "dribbling": 87,
          "defending": 50,
          "physical": 56
        }
      },
      {
        "name": "Wojciech Szczęsny",
        "age": 35,
        "overall": 84,
        "potential": 84,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 150713186,
        "country": "Poland",
        "attributes": {
          "pace": 82,
          "shooting": 83,
          "passing": 75,
          "dribbling": 84,
          "defending": 48,
          "physical": 84
        }
      },
      {
        "name": "Joan García",
        "age": 24,
        "overall": 83,
        "potential": 87,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 199526231,
        "country": "Spain",
        "attributes": {
          "pace": 81,
          "shooting": 82,
          "passing": 77,
          "dribbling": 86,
          "defending": 46,
          "physical": 83
        }
      },
      {
        "name": "Gavi",
        "age": 21,
        "overall": 83,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 299289347,
        "country": "Spain",
        "attributes": {
          "pace": 76,
          "shooting": 66,
          "passing": 78,
          "dribbling": 85,
          "defending": 68,
          "physical": 70
        }
      },
      {
        "name": "Balde",
        "age": 22,
        "overall": 83,
        "potential": 87,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 299289347,
        "country": "Spain",
        "attributes": {
          "pace": 91,
          "shooting": 50,
          "passing": 75,
          "dribbling": 79,
          "defending": 78,
          "physical": 67
        }
      },
      {
        "name": "Ferran Torres",
        "age": 26,
        "overall": 83,
        "potential": 86,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 199526231,
        "country": "Spain",
        "attributes": {
          "pace": 83,
          "shooting": 81,
          "passing": 79,
          "dribbling": 83,
          "defending": 35,
          "physical": 68
        }
      },
      {
        "name": "Ronald Araujo",
        "age": 27,
        "overall": 83,
        "potential": 85,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 199526231,
        "country": "Uruguay",
        "attributes": {
          "pace": 80,
          "shooting": 53,
          "passing": 63,
          "dribbling": 61,
          "defending": 81,
          "physical": 83
        }
      },
      {
        "name": "Pau Cubarsí",
        "age": 19,
        "overall": 82,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 237733979,
        "country": "Spain",
        "attributes": {
          "pace": 70,
          "shooting": 42,
          "passing": 66,
          "dribbling": 77,
          "defending": 84,
          "physical": 76
        }
      },
      {
        "name": "Fermín",
        "age": 22,
        "overall": 80,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 150000000,
        "country": "Spain",
        "attributes": {
          "pace": 74,
          "shooting": 75,
          "passing": 75,
          "dribbling": 82,
          "defending": 62,
          "physical": 55
        }
      },
      {
        "name": "Marcus Rashford",
        "age": 28,
        "overall": 80,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 100000000,
        "country": "England",
        "attributes": {
          "pace": 87,
          "shooting": 82,
          "passing": 77,
          "dribbling": 80,
          "defending": 33,
          "physical": 63
        }
      },
      {
        "name": "Andreas Christensen",
        "age": 29,
        "overall": 80,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 100000000,
        "country": "Denmark",
        "attributes": {
          "pace": 64,
          "shooting": 32,
          "passing": 67,
          "dribbling": 70,
          "defending": 81,
          "physical": 74
        }
      },
      {
        "name": "Marc Casadó",
        "age": 22,
        "overall": 79,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 119149235,
        "country": "Spain",
        "attributes": {
          "pace": 57,
          "shooting": 64,
          "passing": 72,
          "dribbling": 80,
          "defending": 77,
          "physical": 62
        }
      },
      {
        "name": "Eric García",
        "age": 25,
        "overall": 79,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "Spain",
        "attributes": {
          "pace": 63,
          "shooting": 48,
          "passing": 70,
          "dribbling": 71,
          "defending": 80,
          "physical": 73
        }
      },
      {
        "name": "Gerard Martín",
        "age": 24,
        "overall": 74,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 25118864,
        "country": "Spain",
        "attributes": {
          "pace": 71,
          "shooting": 52,
          "passing": 70,
          "dribbling": 69,
          "defending": 72,
          "physical": 68
        }
      },
      {
        "name": "Marc Bernal",
        "age": 18,
        "overall": 73,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 29928935,
        "country": "Spain",
        "attributes": {
          "pace": 61,
          "shooting": 53,
          "passing": 71,
          "dribbling": 74,
          "defending": 70,
          "physical": 63
        }
      },
      {
        "name": "Roony Bardghji",
        "age": 20,
        "overall": 69,
        "potential": 70,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 11914924,
        "country": "Sweden",
        "attributes": {
          "pace": 73,
          "shooting": 68,
          "passing": 63,
          "dribbling": 74,
          "defending": 25,
          "physical": 53
        }
      }
    ]
  },
  {
    "name": "Valencia CF",
    "domesticLeague": "LaLiga",
    "country": "España",
    "overall": 77,
    "budget": 100000000,
    "primaryColor": "#ef4444",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Gayà",
        "age": 30,
        "overall": 81,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 125892541,
        "country": "Spain",
        "attributes": {
          "pace": 80,
          "shooting": 61,
          "passing": 76,
          "dribbling": 77,
          "defending": 77,
          "physical": 72
        }
      },
      {
        "name": "Stole Dimitrievski",
        "age": 32,
        "overall": 79,
        "potential": 79,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 47659694,
        "country": "North Macedonia",
        "attributes": {
          "pace": 79,
          "shooting": 78,
          "passing": 74,
          "dribbling": 78,
          "defending": 36,
          "physical": 77
        }
      },
      {
        "name": "Luis Rioja",
        "age": 32,
        "overall": 78,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 37857441,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 76,
          "passing": 74,
          "dribbling": 79,
          "defending": 53,
          "physical": 56
        }
      },
      {
        "name": "Hugo Duro",
        "age": 26,
        "overall": 78,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 63095734,
        "country": "Spain",
        "attributes": {
          "pace": 71,
          "shooting": 78,
          "passing": 68,
          "dribbling": 75,
          "defending": 47,
          "physical": 75
        }
      },
      {
        "name": "Diego López",
        "age": 23,
        "overall": 78,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 63095734,
        "country": "Spain",
        "attributes": {
          "pace": 81,
          "shooting": 75,
          "passing": 72,
          "dribbling": 76,
          "defending": 37,
          "physical": 62
        }
      },
      {
        "name": "Javi Guerra",
        "age": 22,
        "overall": 77,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 75178085,
        "country": "Spain",
        "attributes": {
          "pace": 74,
          "shooting": 73,
          "passing": 75,
          "dribbling": 76,
          "defending": 73,
          "physical": 70
        }
      },
      {
        "name": "Pepelu",
        "age": 27,
        "overall": 77,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 50118723,
        "country": "Spain",
        "attributes": {
          "pace": 64,
          "shooting": 70,
          "passing": 78,
          "dribbling": 74,
          "defending": 73,
          "physical": 78
        }
      },
      {
        "name": "Thierry Correia",
        "age": 27,
        "overall": 76,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 39810717,
        "country": "Portugal",
        "attributes": {
          "pace": 90,
          "shooting": 50,
          "passing": 69,
          "dribbling": 75,
          "defending": 71,
          "physical": 70
        }
      },
      {
        "name": "Lucas Beltrán",
        "age": 25,
        "overall": 76,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 39810717,
        "country": "Argentina",
        "attributes": {
          "pace": 71,
          "shooting": 76,
          "passing": 68,
          "dribbling": 77,
          "defending": 46,
          "physical": 74
        }
      },
      {
        "name": "Agirrezabala",
        "age": 25,
        "overall": 76,
        "potential": 79,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 39810717,
        "country": "Spain",
        "attributes": {
          "pace": 76,
          "shooting": 74,
          "passing": 78,
          "dribbling": 75,
          "defending": 32,
          "physical": 77
        }
      },
      {
        "name": "Baptiste Santamaria",
        "age": 31,
        "overall": 76,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 23886430,
        "country": "France",
        "attributes": {
          "pace": 42,
          "shooting": 67,
          "passing": 73,
          "dribbling": 74,
          "defending": 72,
          "physical": 75
        }
      },
      {
        "name": "Dani Raba",
        "age": 30,
        "overall": 76,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 39810717,
        "country": "Spain",
        "attributes": {
          "pace": 71,
          "shooting": 72,
          "passing": 75,
          "dribbling": 74,
          "defending": 40,
          "physical": 64
        }
      },
      {
        "name": "Mouctar Diakhaby",
        "age": 29,
        "overall": 76,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 39810717,
        "country": "Guinea",
        "attributes": {
          "pace": 62,
          "shooting": 39,
          "passing": 55,
          "dribbling": 59,
          "defending": 77,
          "physical": 76
        }
      },
      {
        "name": "Filip Ugrinić",
        "age": 27,
        "overall": 75,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 31622777,
        "country": "Switzerland",
        "attributes": {
          "pace": 77,
          "shooting": 73,
          "passing": 74,
          "dribbling": 75,
          "defending": 69,
          "physical": 85
        }
      },
      {
        "name": "André Almeida",
        "age": 25,
        "overall": 75,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 31622777,
        "country": "Portugal",
        "attributes": {
          "pace": 69,
          "shooting": 66,
          "passing": 75,
          "dribbling": 77,
          "defending": 67,
          "physical": 63
        }
      },
      {
        "name": "Arnaut Danjuma",
        "age": 29,
        "overall": 75,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 31622777,
        "country": "Holland",
        "attributes": {
          "pace": 83,
          "shooting": 73,
          "passing": 71,
          "dribbling": 76,
          "defending": 44,
          "physical": 67
        }
      },
      {
        "name": "César Tárrega",
        "age": 24,
        "overall": 75,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 31622777,
        "country": "Spain",
        "attributes": {
          "pace": 63,
          "shooting": 45,
          "passing": 59,
          "dribbling": 67,
          "defending": 75,
          "physical": 80
        }
      },
      {
        "name": "Copete",
        "age": 26,
        "overall": 75,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 31622777,
        "country": "Spain",
        "attributes": {
          "pace": 50,
          "shooting": 33,
          "passing": 54,
          "dribbling": 57,
          "defending": 77,
          "physical": 70
        }
      },
      {
        "name": "Dimitri Foulquier",
        "age": 33,
        "overall": 74,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 15071319,
        "country": "France",
        "attributes": {
          "pace": 73,
          "shooting": 59,
          "passing": 66,
          "dribbling": 68,
          "defending": 72,
          "physical": 74
        }
      },
      {
        "name": "Largie Ramazani",
        "age": 25,
        "overall": 74,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 25118864,
        "country": "Belgium",
        "attributes": {
          "pace": 89,
          "shooting": 69,
          "passing": 67,
          "dribbling": 76,
          "defending": 41,
          "physical": 64
        }
      },
      {
        "name": "Eray Cömert",
        "age": 28,
        "overall": 72,
        "potential": 73,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 15848932,
        "country": "Switzerland",
        "attributes": {
          "pace": 66,
          "shooting": 49,
          "passing": 61,
          "dribbling": 55,
          "defending": 72,
          "physical": 76
        }
      },
      {
        "name": "Jesús Vázquez",
        "age": 23,
        "overall": 70,
        "potential": 73,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 10000000,
        "country": "Spain",
        "attributes": {
          "pace": 69,
          "shooting": 50,
          "passing": 65,
          "dribbling": 66,
          "defending": 68,
          "physical": 62
        }
      },
      {
        "name": "Cristian Rivero",
        "age": 28,
        "overall": 65,
        "potential": 68,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 3162278,
        "country": "Spain",
        "attributes": {
          "pace": 65,
          "shooting": 62,
          "passing": 63,
          "dribbling": 66,
          "defending": 27,
          "physical": 62
        }
      },
      {
        "name": "Víctor Fernández",
        "age": 18,
        "overall": 60,
        "potential": 63,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 1500000,
        "country": "Spain",
        "attributes": {
          "pace": 68,
          "shooting": 55,
          "passing": 55,
          "dribbling": 69,
          "defending": 34,
          "physical": 41
        }
      }
    ]
  },
  {
    "name": "Sevilla FC",
    "domesticLeague": "LaLiga",
    "country": "España",
    "overall": 76,
    "budget": 100000000,
    "primaryColor": "#ef4444",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Chidera Ejuke",
        "age": 28,
        "overall": 78,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 63095734,
        "country": "Nigeria",
        "attributes": {
          "pace": 90,
          "shooting": 69,
          "passing": 71,
          "dribbling": 82,
          "defending": 37,
          "physical": 63
        }
      },
      {
        "name": "Nemanja Gudelj",
        "age": 34,
        "overall": 77,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 30071234,
        "country": "Serbia",
        "attributes": {
          "pace": 46,
          "shooting": 73,
          "passing": 78,
          "dribbling": 69,
          "defending": 76,
          "physical": 84
        }
      },
      {
        "name": "Djibril Sow",
        "age": 29,
        "overall": 76,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 39810717,
        "country": "Switzerland",
        "attributes": {
          "pace": 78,
          "shooting": 69,
          "passing": 73,
          "dribbling": 76,
          "defending": 74,
          "physical": 78
        }
      },
      {
        "name": "Carmona",
        "age": 24,
        "overall": 76,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 39810717,
        "country": "Spain",
        "attributes": {
          "pace": 80,
          "shooting": 65,
          "passing": 69,
          "dribbling": 73,
          "defending": 73,
          "physical": 67
        }
      },
      {
        "name": "Ørjan Nyland",
        "age": 35,
        "overall": 76,
        "potential": 76,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 23886430,
        "country": "Norway",
        "attributes": {
          "pace": 76,
          "shooting": 75,
          "passing": 77,
          "dribbling": 75,
          "defending": 47,
          "physical": 74
        }
      },
      {
        "name": "Batista Mendy",
        "age": 26,
        "overall": 76,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 39810717,
        "country": "France",
        "attributes": {
          "pace": 69,
          "shooting": 61,
          "passing": 67,
          "dribbling": 70,
          "defending": 74,
          "physical": 83
        }
      },
      {
        "name": "Joan Jordán",
        "age": 31,
        "overall": 76,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 23886430,
        "country": "Spain",
        "attributes": {
          "pace": 48,
          "shooting": 74,
          "passing": 77,
          "dribbling": 74,
          "defending": 68,
          "physical": 75
        }
      },
      {
        "name": "Alexis Sánchez",
        "age": 37,
        "overall": 76,
        "potential": 77,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 23886430,
        "country": "Chile",
        "attributes": {
          "pace": 68,
          "shooting": 78,
          "passing": 78,
          "dribbling": 81,
          "defending": 48,
          "physical": 59
        }
      },
      {
        "name": "Alfon",
        "age": 26,
        "overall": 76,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 39810717,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 71,
          "passing": 71,
          "dribbling": 77,
          "defending": 32,
          "physical": 67
        }
      },
      {
        "name": "Juanlu Sánchez",
        "age": 22,
        "overall": 75,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 47434165,
        "country": "Spain",
        "attributes": {
          "pace": 71,
          "shooting": 67,
          "passing": 71,
          "dribbling": 75,
          "defending": 71,
          "physical": 65
        }
      },
      {
        "name": "Ruben Vargas",
        "age": 27,
        "overall": 75,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 31622777,
        "country": "Switzerland",
        "attributes": {
          "pace": 84,
          "shooting": 70,
          "passing": 69,
          "dribbling": 78,
          "defending": 54,
          "physical": 64
        }
      },
      {
        "name": "Lucien Agoumé",
        "age": 24,
        "overall": 75,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 31622777,
        "country": "France",
        "attributes": {
          "pace": 67,
          "shooting": 54,
          "passing": 70,
          "dribbling": 73,
          "defending": 72,
          "physical": 75
        }
      },
      {
        "name": "Marcão",
        "age": 29,
        "overall": 75,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 31622777,
        "country": "Brazil",
        "attributes": {
          "pace": 59,
          "shooting": 36,
          "passing": 59,
          "dribbling": 68,
          "defending": 73,
          "physical": 81
        }
      },
      {
        "name": "Kike Salas",
        "age": 23,
        "overall": 75,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 31622777,
        "country": "Spain",
        "attributes": {
          "pace": 66,
          "shooting": 27,
          "passing": 60,
          "dribbling": 62,
          "defending": 76,
          "physical": 76
        }
      },
      {
        "name": "Gabriel Suazo",
        "age": 28,
        "overall": 74,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 25118864,
        "country": "Chile",
        "attributes": {
          "pace": 68,
          "shooting": 59,
          "passing": 69,
          "dribbling": 71,
          "defending": 70,
          "physical": 75
        }
      },
      {
        "name": "Álvaro",
        "age": 27,
        "overall": 74,
        "potential": 74,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 25118864,
        "country": "Spain",
        "attributes": {
          "pace": 75,
          "shooting": 71,
          "passing": 68,
          "dribbling": 76,
          "defending": 47,
          "physical": 73
        }
      },
      {
        "name": "Isaac",
        "age": 25,
        "overall": 74,
        "potential": 76,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 25118864,
        "country": "Spain",
        "attributes": {
          "pace": 78,
          "shooting": 72,
          "passing": 68,
          "dribbling": 73,
          "defending": 23,
          "physical": 71
        }
      },
      {
        "name": "Adnan Januzaj",
        "age": 31,
        "overall": 74,
        "potential": 74,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 15071319,
        "country": "Belgium",
        "attributes": {
          "pace": 70,
          "shooting": 69,
          "passing": 76,
          "dribbling": 78,
          "defending": 30,
          "physical": 54
        }
      },
      {
        "name": "Akor Jerome Adams",
        "age": 26,
        "overall": 73,
        "potential": 77,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 19952623,
        "country": "Nigeria",
        "attributes": {
          "pace": 77,
          "shooting": 72,
          "passing": 56,
          "dribbling": 70,
          "defending": 29,
          "physical": 75
        }
      },
      {
        "name": "Peque",
        "age": 23,
        "overall": 73,
        "potential": 73,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 19952623,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 71,
          "passing": 69,
          "dribbling": 74,
          "defending": 35,
          "physical": 51
        }
      },
      {
        "name": "Odysseas Vlachodimos",
        "age": 31,
        "overall": 72,
        "potential": 74,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 9509359,
        "country": "Greece",
        "attributes": {
          "pace": 73,
          "shooting": 72,
          "passing": 66,
          "dribbling": 71,
          "defending": 42,
          "physical": 72
        }
      },
      {
        "name": "Tanguy Nianzou",
        "age": 23,
        "overall": 72,
        "potential": 72,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 15848932,
        "country": "France",
        "attributes": {
          "pace": 62,
          "shooting": 37,
          "passing": 56,
          "dribbling": 63,
          "defending": 71,
          "physical": 75
        }
      },
      {
        "name": "Manu Bueno",
        "age": 21,
        "overall": 65,
        "potential": 69,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 4743416,
        "country": "Spain",
        "attributes": {
          "pace": 53,
          "shooting": 60,
          "passing": 59,
          "dribbling": 65,
          "defending": 62,
          "physical": 56
        }
      },
      {
        "name": "Alberto Flores",
        "age": 22,
        "overall": 65,
        "potential": 66,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 4743416,
        "country": "Spain",
        "attributes": {
          "pace": 65,
          "shooting": 66,
          "passing": 63,
          "dribbling": 64,
          "defending": 30,
          "physical": 63
        }
      },
      {
        "name": "Andrés Castrín",
        "age": 23,
        "overall": 60,
        "potential": 60,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 1000000,
        "country": "Spain",
        "attributes": {
          "pace": 52,
          "shooting": 31,
          "passing": 39,
          "dribbling": 42,
          "defending": 63,
          "physical": 57
        }
      }
    ]
  },
  {
    "name": "Athletic Club",
    "domesticLeague": "LaLiga",
    "country": "España",
    "overall": 82,
    "budget": 100000000,
    "primaryColor": "#ef4444",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Nico Williams",
        "age": 23,
        "overall": 86,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 398107171,
        "country": "Spain",
        "attributes": {
          "pace": 93,
          "shooting": 76,
          "passing": 80,
          "dribbling": 87,
          "defending": 36,
          "physical": 66
        }
      },
      {
        "name": "Unai Simón",
        "age": 28,
        "overall": 85,
        "potential": 86,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 316227766,
        "country": "Spain",
        "attributes": {
          "pace": 84,
          "shooting": 80,
          "passing": 76,
          "dribbling": 85,
          "defending": 49,
          "physical": 84
        }
      },
      {
        "name": "Sancet",
        "age": 25,
        "overall": 84,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 251188643,
        "country": "Spain",
        "attributes": {
          "pace": 76,
          "shooting": 83,
          "passing": 80,
          "dribbling": 85,
          "defending": 70,
          "physical": 82
        }
      },
      {
        "name": "Vivian",
        "age": 26,
        "overall": 84,
        "potential": 86,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 251188643,
        "country": "Spain",
        "attributes": {
          "pace": 79,
          "shooting": 50,
          "passing": 63,
          "dribbling": 72,
          "defending": 84,
          "physical": 83
        }
      },
      {
        "name": "Iñaki Williams",
        "age": 31,
        "overall": 83,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 119715739,
        "country": "Ghana",
        "attributes": {
          "pace": 94,
          "shooting": 81,
          "passing": 74,
          "dribbling": 80,
          "defending": 45,
          "physical": 84
        }
      },
      {
        "name": "Álex Berenguer",
        "age": 30,
        "overall": 82,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 158489319,
        "country": "Spain",
        "attributes": {
          "pace": 84,
          "shooting": 77,
          "passing": 79,
          "dribbling": 84,
          "defending": 65,
          "physical": 69
        }
      },
      {
        "name": "Ruiz de Galarreta",
        "age": 32,
        "overall": 80,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 60000000,
        "country": "Spain",
        "attributes": {
          "pace": 69,
          "shooting": 65,
          "passing": 77,
          "dribbling": 79,
          "defending": 76,
          "physical": 76
        }
      },
      {
        "name": "Yuri Berchiche",
        "age": 36,
        "overall": 79,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 47659694,
        "country": "Spain",
        "attributes": {
          "pace": 79,
          "shooting": 68,
          "passing": 74,
          "dribbling": 75,
          "defending": 77,
          "physical": 82
        }
      },
      {
        "name": "Guruzeta",
        "age": 29,
        "overall": 79,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 79432823,
        "country": "Spain",
        "attributes": {
          "pace": 73,
          "shooting": 78,
          "passing": 72,
          "dribbling": 78,
          "defending": 51,
          "physical": 78
        }
      },
      {
        "name": "Jauregizar",
        "age": 22,
        "overall": 78,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 94643602,
        "country": "Spain",
        "attributes": {
          "pace": 71,
          "shooting": 70,
          "passing": 75,
          "dribbling": 79,
          "defending": 72,
          "physical": 75
        }
      },
      {
        "name": "Beñat Prados",
        "age": 25,
        "overall": 78,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 63095734,
        "country": "Spain",
        "attributes": {
          "pace": 68,
          "shooting": 61,
          "passing": 72,
          "dribbling": 75,
          "defending": 76,
          "physical": 77
        }
      },
      {
        "name": "Aitor Paredes",
        "age": 25,
        "overall": 78,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 63095734,
        "country": "Spain",
        "attributes": {
          "pace": 68,
          "shooting": 39,
          "passing": 51,
          "dribbling": 56,
          "defending": 79,
          "physical": 75
        }
      },
      {
        "name": "Gorosabel",
        "age": 29,
        "overall": 77,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 50118723,
        "country": "Spain",
        "attributes": {
          "pace": 78,
          "shooting": 48,
          "passing": 70,
          "dribbling": 73,
          "defending": 74,
          "physical": 67
        }
      },
      {
        "name": "Areso",
        "age": 26,
        "overall": 76,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 39810717,
        "country": "Spain",
        "attributes": {
          "pace": 76,
          "shooting": 46,
          "passing": 70,
          "dribbling": 72,
          "defending": 71,
          "physical": 73
        }
      },
      {
        "name": "Lekue",
        "age": 32,
        "overall": 75,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 18973666,
        "country": "Spain",
        "attributes": {
          "pace": 79,
          "shooting": 62,
          "passing": 70,
          "dribbling": 71,
          "defending": 71,
          "physical": 74
        }
      },
      {
        "name": "Vesga",
        "age": 32,
        "overall": 74,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 15071319,
        "country": "Spain",
        "attributes": {
          "pace": 40,
          "shooting": 74,
          "passing": 69,
          "dribbling": 64,
          "defending": 73,
          "physical": 78
        }
      },
      {
        "name": "Robert Navarro",
        "age": 23,
        "overall": 74,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 25118864,
        "country": "Spain",
        "attributes": {
          "pace": 74,
          "shooting": 69,
          "passing": 70,
          "dribbling": 77,
          "defending": 34,
          "physical": 63
        }
      },
      {
        "name": "Adama Boiro",
        "age": 23,
        "overall": 73,
        "potential": 73,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 19952623,
        "country": "Senegal",
        "attributes": {
          "pace": 75,
          "shooting": 58,
          "passing": 65,
          "dribbling": 69,
          "defending": 70,
          "physical": 73
        }
      },
      {
        "name": "Unai Gómez",
        "age": 22,
        "overall": 73,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 29928935,
        "country": "Spain",
        "attributes": {
          "pace": 67,
          "shooting": 66,
          "passing": 72,
          "dribbling": 74,
          "defending": 39,
          "physical": 65
        }
      },
      {
        "name": "Maroan Sannadi",
        "age": 25,
        "overall": 73,
        "potential": 77,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 19952623,
        "country": "Morocco",
        "attributes": {
          "pace": 69,
          "shooting": 71,
          "passing": 59,
          "dribbling": 68,
          "defending": 33,
          "physical": 81
        }
      },
      {
        "name": "Izeta",
        "age": 26,
        "overall": 71,
        "potential": 74,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 12589254,
        "country": "Spain",
        "attributes": {
          "pace": 68,
          "shooting": 72,
          "passing": 62,
          "dribbling": 67,
          "defending": 25,
          "physical": 76
        }
      },
      {
        "name": "Nico Serrano",
        "age": 23,
        "overall": 70,
        "potential": 71,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 10000000,
        "country": "Spain",
        "attributes": {
          "pace": 83,
          "shooting": 63,
          "passing": 63,
          "dribbling": 75,
          "defending": 24,
          "physical": 52
        }
      },
      {
        "name": "Egiluz",
        "age": 24,
        "overall": 70,
        "potential": 71,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 10000000,
        "country": "Spain",
        "attributes": {
          "pace": 58,
          "shooting": 40,
          "passing": 46,
          "dribbling": 46,
          "defending": 71,
          "physical": 73
        }
      },
      {
        "name": "Álex Padilla",
        "age": 22,
        "overall": 68,
        "potential": 68,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 9464360,
        "country": "Mexico",
        "attributes": {
          "pace": 70,
          "shooting": 67,
          "passing": 63,
          "dribbling": 71,
          "defending": 34,
          "physical": 67
        }
      }
    ]
  },
  {
    "name": "Real Betis",
    "domesticLeague": "LaLiga",
    "country": "España",
    "overall": 80,
    "budget": 100000000,
    "primaryColor": "#ef4444",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Isco",
        "age": 33,
        "overall": 84,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 150713186,
        "country": "Spain",
        "attributes": {
          "pace": 66,
          "shooting": 79,
          "passing": 85,
          "dribbling": 85,
          "defending": 59,
          "physical": 60
        }
      },
      {
        "name": "Giovani Lo Celso",
        "age": 29,
        "overall": 82,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 158489319,
        "country": "Argentina",
        "attributes": {
          "pace": 68,
          "shooting": 81,
          "passing": 82,
          "dribbling": 84,
          "defending": 68,
          "physical": 71
        }
      },
      {
        "name": "Antony",
        "age": 26,
        "overall": 81,
        "potential": 84,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 125892541,
        "country": "Brazil",
        "attributes": {
          "pace": 84,
          "shooting": 78,
          "passing": 78,
          "dribbling": 83,
          "defending": 43,
          "physical": 70
        }
      },
      {
        "name": "Diego Llorente",
        "age": 32,
        "overall": 80,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 60000000,
        "country": "Spain",
        "attributes": {
          "pace": 64,
          "shooting": 41,
          "passing": 63,
          "dribbling": 69,
          "defending": 81,
          "physical": 76
        }
      },
      {
        "name": "Pablo Fornals",
        "age": 30,
        "overall": 79,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 79432823,
        "country": "Spain",
        "attributes": {
          "pace": 65,
          "shooting": 75,
          "passing": 80,
          "dribbling": 80,
          "defending": 73,
          "physical": 71
        }
      },
      {
        "name": "Pau López",
        "age": 31,
        "overall": 79,
        "potential": 79,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 47659694,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 77,
          "passing": 78,
          "dribbling": 79,
          "defending": 48,
          "physical": 79
        }
      },
      {
        "name": "Álvaro Valles",
        "age": 28,
        "overall": 79,
        "potential": 81,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 79432823,
        "country": "Spain",
        "attributes": {
          "pace": 78,
          "shooting": 78,
          "passing": 78,
          "dribbling": 80,
          "defending": 41,
          "physical": 80
        }
      },
      {
        "name": "Marc Bartra",
        "age": 35,
        "overall": 79,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 47659694,
        "country": "Spain",
        "attributes": {
          "pace": 64,
          "shooting": 59,
          "passing": 70,
          "dribbling": 71,
          "defending": 80,
          "physical": 75
        }
      },
      {
        "name": "Sofyan Amrabat",
        "age": 29,
        "overall": 78,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 63095734,
        "country": "Morocco",
        "attributes": {
          "pace": 61,
          "shooting": 70,
          "passing": 73,
          "dribbling": 74,
          "defending": 75,
          "physical": 82
        }
      },
      {
        "name": "Cucho",
        "age": 26,
        "overall": 78,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 63095734,
        "country": "Colombia",
        "attributes": {
          "pace": 81,
          "shooting": 77,
          "passing": 75,
          "dribbling": 81,
          "defending": 42,
          "physical": 78
        }
      },
      {
        "name": "Marc Roca",
        "age": 29,
        "overall": 78,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 63095734,
        "country": "Spain",
        "attributes": {
          "pace": 59,
          "shooting": 66,
          "passing": 75,
          "dribbling": 74,
          "defending": 75,
          "physical": 75
        }
      },
      {
        "name": "Natan",
        "age": 25,
        "overall": 78,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 63095734,
        "country": "Brazil",
        "attributes": {
          "pace": 56,
          "shooting": 33,
          "passing": 55,
          "dribbling": 66,
          "defending": 79,
          "physical": 77
        }
      },
      {
        "name": "Aitor Ruibal",
        "age": 30,
        "overall": 77,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 50118723,
        "country": "Spain",
        "attributes": {
          "pace": 82,
          "shooting": 74,
          "passing": 73,
          "dribbling": 76,
          "defending": 72,
          "physical": 69
        }
      },
      {
        "name": "Riquelme",
        "age": 26,
        "overall": 77,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 50118723,
        "country": "Spain",
        "attributes": {
          "pace": 84,
          "shooting": 73,
          "passing": 74,
          "dribbling": 78,
          "defending": 50,
          "physical": 59
        }
      },
      {
        "name": "Altimira",
        "age": 24,
        "overall": 77,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 50118723,
        "country": "Spain",
        "attributes": {
          "pace": 60,
          "shooting": 63,
          "passing": 70,
          "dribbling": 72,
          "defending": 75,
          "physical": 72
        }
      },
      {
        "name": "Cédric Bakambu",
        "age": 34,
        "overall": 77,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 30071234,
        "country": "Congo DR",
        "attributes": {
          "pace": 78,
          "shooting": 78,
          "passing": 68,
          "dribbling": 72,
          "defending": 40,
          "physical": 68
        }
      },
      {
        "name": "Abdessamad Ezzalzouli",
        "age": 24,
        "overall": 77,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 50118723,
        "country": "Morocco",
        "attributes": {
          "pace": 87,
          "shooting": 69,
          "passing": 70,
          "dribbling": 81,
          "defending": 29,
          "physical": 63
        }
      },
      {
        "name": "Valentín Gómez",
        "age": 22,
        "overall": 76,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 59716076,
        "country": "Argentina",
        "attributes": {
          "pace": 80,
          "shooting": 32,
          "passing": 64,
          "dribbling": 71,
          "defending": 76,
          "physical": 75
        }
      },
      {
        "name": "Nelson Deossa",
        "age": 26,
        "overall": 75,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 31622777,
        "country": "Colombia",
        "attributes": {
          "pace": 75,
          "shooting": 76,
          "passing": 72,
          "dribbling": 74,
          "defending": 72,
          "physical": 80
        }
      },
      {
        "name": "Junior Firpo",
        "age": 29,
        "overall": 75,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 31622777,
        "country": "Dominican Republic",
        "attributes": {
          "pace": 74,
          "shooting": 61,
          "passing": 72,
          "dribbling": 72,
          "defending": 72,
          "physical": 75
        }
      },
      {
        "name": "Ezequiel Ávila",
        "age": 32,
        "overall": 74,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 15071319,
        "country": "Argentina",
        "attributes": {
          "pace": 74,
          "shooting": 76,
          "passing": 69,
          "dribbling": 75,
          "defending": 52,
          "physical": 84
        }
      },
      {
        "name": "Ricardo Rodríguez",
        "age": 33,
        "overall": 74,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 15071319,
        "country": "Switzerland",
        "attributes": {
          "pace": 66,
          "shooting": 69,
          "passing": 78,
          "dribbling": 74,
          "defending": 70,
          "physical": 72
        }
      },
      {
        "name": "Héctor Bellerín",
        "age": 31,
        "overall": 74,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 15071319,
        "country": "Spain",
        "attributes": {
          "pace": 78,
          "shooting": 51,
          "passing": 68,
          "dribbling": 75,
          "defending": 69,
          "physical": 64
        }
      },
      {
        "name": "Adrián",
        "age": 39,
        "overall": 73,
        "potential": 75,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 11971574,
        "country": "Spain",
        "attributes": {
          "pace": 68,
          "shooting": 76,
          "passing": 72,
          "dribbling": 68,
          "defending": 43,
          "physical": 75
        }
      },
      {
        "name": "Ángel Ortiz",
        "age": 21,
        "overall": 68,
        "potential": 69,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 9464360,
        "country": "Spain",
        "attributes": {
          "pace": 72,
          "shooting": 48,
          "passing": 64,
          "dribbling": 68,
          "defending": 63,
          "physical": 60
        }
      },
      {
        "name": "Pablo García",
        "age": 19,
        "overall": 66,
        "potential": 66,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 5971608,
        "country": "Spain",
        "attributes": {
          "pace": 75,
          "shooting": 65,
          "passing": 64,
          "dribbling": 67,
          "defending": 35,
          "physical": 61
        }
      },
      {
        "name": "Dani Pérez",
        "age": 20,
        "overall": 63,
        "potential": 67,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 2992893,
        "country": "Spain",
        "attributes": {
          "pace": 56,
          "shooting": 54,
          "passing": 64,
          "dribbling": 68,
          "defending": 53,
          "physical": 45
        }
      }
    ]
  },
  {
    "name": "Villarreal CF",
    "domesticLeague": "LaLiga",
    "country": "España",
    "overall": 80,
    "budget": 100000000,
    "primaryColor": "#ef4444",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Ayoze",
        "age": 32,
        "overall": 83,
        "potential": 87,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 119715739,
        "country": "Spain",
        "attributes": {
          "pace": 86,
          "shooting": 83,
          "passing": 80,
          "dribbling": 83,
          "defending": 59,
          "physical": 67
        }
      },
      {
        "name": "Thomas Partey",
        "age": 32,
        "overall": 83,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 119715739,
        "country": "Ghana",
        "attributes": {
          "pace": 59,
          "shooting": 71,
          "passing": 80,
          "dribbling": 77,
          "defending": 80,
          "physical": 82
        }
      },
      {
        "name": "Parejo",
        "age": 36,
        "overall": 82,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 95093592,
        "country": "Spain",
        "attributes": {
          "pace": 39,
          "shooting": 80,
          "passing": 87,
          "dribbling": 78,
          "defending": 74,
          "physical": 67
        }
      },
      {
        "name": "Gerard Moreno",
        "age": 33,
        "overall": 81,
        "potential": 84,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 75535525,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 82,
          "passing": 77,
          "dribbling": 80,
          "defending": 46,
          "physical": 71
        }
      },
      {
        "name": "Nicolas Pépé",
        "age": 30,
        "overall": 80,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 100000000,
        "country": "Côte d'Ivoire",
        "attributes": {
          "pace": 88,
          "shooting": 77,
          "passing": 76,
          "dribbling": 82,
          "defending": 36,
          "physical": 67
        }
      },
      {
        "name": "Sergi Cardona",
        "age": 26,
        "overall": 79,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 79432823,
        "country": "Spain",
        "attributes": {
          "pace": 82,
          "shooting": 56,
          "passing": 71,
          "dribbling": 75,
          "defending": 75,
          "physical": 75
        }
      },
      {
        "name": "Moleiro",
        "age": 22,
        "overall": 79,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 119149235,
        "country": "Spain",
        "attributes": {
          "pace": 83,
          "shooting": 70,
          "passing": 75,
          "dribbling": 81,
          "defending": 51,
          "physical": 65
        }
      },
      {
        "name": "Juan Foyth",
        "age": 28,
        "overall": 79,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "Argentina",
        "attributes": {
          "pace": 68,
          "shooting": 47,
          "passing": 71,
          "dribbling": 71,
          "defending": 80,
          "physical": 76
        }
      },
      {
        "name": "Pape Gueye",
        "age": 27,
        "overall": 78,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 63095734,
        "country": "Senegal",
        "attributes": {
          "pace": 67,
          "shooting": 65,
          "passing": 75,
          "dribbling": 75,
          "defending": 76,
          "physical": 79
        }
      },
      {
        "name": "Santi Comesaña",
        "age": 29,
        "overall": 78,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 63095734,
        "country": "Spain",
        "attributes": {
          "pace": 55,
          "shooting": 72,
          "passing": 72,
          "dribbling": 75,
          "defending": 77,
          "physical": 75
        }
      },
      {
        "name": "Georges Mikautadze",
        "age": 25,
        "overall": 77,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 50118723,
        "country": "Georgia",
        "attributes": {
          "pace": 81,
          "shooting": 80,
          "passing": 73,
          "dribbling": 80,
          "defending": 40,
          "physical": 70
        }
      },
      {
        "name": "Diego Conde",
        "age": 27,
        "overall": 77,
        "potential": 77,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 50118723,
        "country": "Spain",
        "attributes": {
          "pace": 75,
          "shooting": 75,
          "passing": 68,
          "dribbling": 79,
          "defending": 43,
          "physical": 76
        }
      },
      {
        "name": "Luiz Júnior",
        "age": 25,
        "overall": 77,
        "potential": 80,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 50118723,
        "country": "Brazil",
        "attributes": {
          "pace": 77,
          "shooting": 77,
          "passing": 71,
          "dribbling": 77,
          "defending": 30,
          "physical": 77
        }
      },
      {
        "name": "Manor Solomon",
        "age": 26,
        "overall": 77,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 50118723,
        "country": "Israel",
        "attributes": {
          "pace": 83,
          "shooting": 73,
          "passing": 73,
          "dribbling": 80,
          "defending": 43,
          "physical": 45
        }
      },
      {
        "name": "Logan Costa",
        "age": 25,
        "overall": 77,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 50118723,
        "country": "Cape Verde Islands",
        "attributes": {
          "pace": 60,
          "shooting": 40,
          "passing": 59,
          "dribbling": 67,
          "defending": 77,
          "physical": 78
        }
      },
      {
        "name": "Renato Veiga",
        "age": 22,
        "overall": 76,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 59716076,
        "country": "Portugal",
        "attributes": {
          "pace": 73,
          "shooting": 60,
          "passing": 73,
          "dribbling": 72,
          "defending": 75,
          "physical": 82
        }
      },
      {
        "name": "Pedraza",
        "age": 29,
        "overall": 75,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 31622777,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 71,
          "passing": 72,
          "dribbling": 73,
          "defending": 73,
          "physical": 71
        }
      },
      {
        "name": "Tajon Buchanan",
        "age": 27,
        "overall": 74,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 25118864,
        "country": "Canada",
        "attributes": {
          "pace": 90,
          "shooting": 65,
          "passing": 66,
          "dribbling": 74,
          "defending": 67,
          "physical": 73
        }
      },
      {
        "name": "Arnau Tenas",
        "age": 24,
        "overall": 74,
        "potential": 78,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 25118864,
        "country": "Spain",
        "attributes": {
          "pace": 73,
          "shooting": 70,
          "passing": 81,
          "dribbling": 77,
          "defending": 52,
          "physical": 72
        }
      },
      {
        "name": "Ilias Akhomach",
        "age": 21,
        "overall": 74,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 37678296,
        "country": "Morocco",
        "attributes": {
          "pace": 78,
          "shooting": 72,
          "passing": 68,
          "dribbling": 76,
          "defending": 28,
          "physical": 57
        }
      },
      {
        "name": "Santiago Mouriño",
        "age": 24,
        "overall": 74,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 25118864,
        "country": "Uruguay",
        "attributes": {
          "pace": 67,
          "shooting": 36,
          "passing": 56,
          "dribbling": 64,
          "defending": 73,
          "physical": 77
        }
      },
      {
        "name": "Altimira",
        "age": 25,
        "overall": 72,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 15848932,
        "country": "Spain",
        "attributes": {
          "pace": 73,
          "shooting": 57,
          "passing": 67,
          "dribbling": 73,
          "defending": 67,
          "physical": 66
        }
      },
      {
        "name": "Willy Kambwala",
        "age": 21,
        "overall": 72,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 23773398,
        "country": "France",
        "attributes": {
          "pace": 66,
          "shooting": 30,
          "passing": 56,
          "dribbling": 64,
          "defending": 71,
          "physical": 71
        }
      },
      {
        "name": "Tani Oluwaseyi",
        "age": 25,
        "overall": 70,
        "potential": 72,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 10000000,
        "country": "Canada",
        "attributes": {
          "pace": 85,
          "shooting": 71,
          "passing": 54,
          "dribbling": 66,
          "defending": 31,
          "physical": 67
        }
      },
      {
        "name": "Pau Navarro",
        "age": 20,
        "overall": 70,
        "potential": 71,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 15000000,
        "country": "Spain",
        "attributes": {
          "pace": 58,
          "shooting": 40,
          "passing": 57,
          "dribbling": 66,
          "defending": 73,
          "physical": 63
        }
      },
      {
        "name": "Rafa Marín",
        "age": 23,
        "overall": 70,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 10000000,
        "country": "Spain",
        "attributes": {
          "pace": 67,
          "shooting": 28,
          "passing": 58,
          "dribbling": 57,
          "defending": 71,
          "physical": 68
        }
      },
      {
        "name": "Pau Cabanes",
        "age": 21,
        "overall": 65,
        "potential": 67,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 4743416,
        "country": "Spain",
        "attributes": {
          "pace": 63,
          "shooting": 69,
          "passing": 53,
          "dribbling": 67,
          "defending": 25,
          "physical": 48
        }
      },
      {
        "name": "Rubén Gómez",
        "age": 24,
        "overall": 63,
        "potential": 67,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 1995262,
        "country": "Spain",
        "attributes": {
          "pace": 63,
          "shooting": 62,
          "passing": 61,
          "dribbling": 61,
          "defending": 29,
          "physical": 63
        }
      }
    ]
  },
  {
    "name": "Real Sociedad",
    "domesticLeague": "LaLiga",
    "country": "España",
    "overall": 80,
    "budget": 100000000,
    "primaryColor": "#ef4444",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Álex Remiro",
        "age": 31,
        "overall": 83,
        "potential": 83,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 119715739,
        "country": "Spain",
        "attributes": {
          "pace": 83,
          "shooting": 78,
          "passing": 80,
          "dribbling": 84,
          "defending": 45,
          "physical": 84
        }
      },
      {
        "name": "Oyarzabal",
        "age": 28,
        "overall": 82,
        "potential": 85,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 158489319,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 83,
          "passing": 81,
          "dribbling": 82,
          "defending": 42,
          "physical": 65
        }
      },
      {
        "name": "Takefusa Kubo",
        "age": 24,
        "overall": 82,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 158489319,
        "country": "Japan",
        "attributes": {
          "pace": 86,
          "shooting": 77,
          "passing": 78,
          "dribbling": 85,
          "defending": 40,
          "physical": 64
        }
      },
      {
        "name": "Yangel Herrera",
        "age": 28,
        "overall": 81,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 125892541,
        "country": "Venezuela",
        "attributes": {
          "pace": 65,
          "shooting": 76,
          "passing": 77,
          "dribbling": 79,
          "defending": 80,
          "physical": 81
        }
      },
      {
        "name": "Brais Méndez",
        "age": 29,
        "overall": 81,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 125892541,
        "country": "Spain",
        "attributes": {
          "pace": 70,
          "shooting": 80,
          "passing": 82,
          "dribbling": 81,
          "defending": 65,
          "physical": 73
        }
      },
      {
        "name": "Sergio Gómez",
        "age": 25,
        "overall": 79,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 79432823,
        "country": "Spain",
        "attributes": {
          "pace": 73,
          "shooting": 74,
          "passing": 80,
          "dribbling": 79,
          "defending": 71,
          "physical": 65
        }
      },
      {
        "name": "Luka Sučić",
        "age": 23,
        "overall": 78,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 63095734,
        "country": "Croatia",
        "attributes": {
          "pace": 76,
          "shooting": 76,
          "passing": 78,
          "dribbling": 77,
          "defending": 68,
          "physical": 72
        }
      },
      {
        "name": "Zubeldia",
        "age": 29,
        "overall": 78,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 63095734,
        "country": "Spain",
        "attributes": {
          "pace": 76,
          "shooting": 63,
          "passing": 73,
          "dribbling": 72,
          "defending": 78,
          "physical": 81
        }
      },
      {
        "name": "Carlos Soler",
        "age": 29,
        "overall": 77,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 50118723,
        "country": "Spain",
        "attributes": {
          "pace": 70,
          "shooting": 75,
          "passing": 78,
          "dribbling": 78,
          "defending": 69,
          "physical": 68
        }
      },
      {
        "name": "Jon Mikel Aramburu",
        "age": 23,
        "overall": 77,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 50118723,
        "country": "Venezuela",
        "attributes": {
          "pace": 69,
          "shooting": 48,
          "passing": 70,
          "dribbling": 72,
          "defending": 76,
          "physical": 72
        }
      },
      {
        "name": "Barrenetxea",
        "age": 24,
        "overall": 77,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 50118723,
        "country": "Spain",
        "attributes": {
          "pace": 81,
          "shooting": 72,
          "passing": 72,
          "dribbling": 78,
          "defending": 29,
          "physical": 68
        }
      },
      {
        "name": "Umar Sadiq",
        "age": 29,
        "overall": 77,
        "potential": 77,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 50118723,
        "country": "Nigeria",
        "attributes": {
          "pace": 82,
          "shooting": 76,
          "passing": 62,
          "dribbling": 71,
          "defending": 30,
          "physical": 76
        }
      },
      {
        "name": "Aritz Elustondo",
        "age": 32,
        "overall": 77,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 30071234,
        "country": "Spain",
        "attributes": {
          "pace": 62,
          "shooting": 39,
          "passing": 63,
          "dribbling": 60,
          "defending": 76,
          "physical": 76
        }
      },
      {
        "name": "Aihen Muñoz",
        "age": 28,
        "overall": 75,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 31622777,
        "country": "Spain",
        "attributes": {
          "pace": 75,
          "shooting": 54,
          "passing": 70,
          "dribbling": 73,
          "defending": 72,
          "physical": 70
        }
      },
      {
        "name": "Gonçalo Guedes",
        "age": 29,
        "overall": 75,
        "potential": 77,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 31622777,
        "country": "Portugal",
        "attributes": {
          "pace": 76,
          "shooting": 76,
          "passing": 70,
          "dribbling": 78,
          "defending": 37,
          "physical": 66
        }
      },
      {
        "name": "Arsen Zakharyan",
        "age": 22,
        "overall": 74,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 37678296,
        "country": "Russia",
        "attributes": {
          "pace": 78,
          "shooting": 71,
          "passing": 74,
          "dribbling": 72,
          "defending": 53,
          "physical": 59
        }
      },
      {
        "name": "Odriozola",
        "age": 30,
        "overall": 74,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 25118864,
        "country": "Spain",
        "attributes": {
          "pace": 72,
          "shooting": 55,
          "passing": 69,
          "dribbling": 74,
          "defending": 71,
          "physical": 63
        }
      },
      {
        "name": "Orri Óskarsson",
        "age": 21,
        "overall": 74,
        "potential": 75,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 37678296,
        "country": "Iceland",
        "attributes": {
          "pace": 74,
          "shooting": 73,
          "passing": 63,
          "dribbling": 70,
          "defending": 31,
          "physical": 74
        }
      },
      {
        "name": "Duje Ćaleta-Car",
        "age": 29,
        "overall": 74,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 25118864,
        "country": "Croatia",
        "attributes": {
          "pace": 58,
          "shooting": 39,
          "passing": 55,
          "dribbling": 59,
          "defending": 74,
          "physical": 76
        }
      },
      {
        "name": "Gorrotxa",
        "age": 24,
        "overall": 73,
        "potential": 73,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 19952623,
        "country": "Spain",
        "attributes": {
          "pace": 72,
          "shooting": 59,
          "passing": 66,
          "dribbling": 69,
          "defending": 71,
          "physical": 79
        }
      },
      {
        "name": "Turrientes",
        "age": 24,
        "overall": 73,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 19952623,
        "country": "Spain",
        "attributes": {
          "pace": 65,
          "shooting": 62,
          "passing": 72,
          "dribbling": 72,
          "defending": 68,
          "physical": 66
        }
      },
      {
        "name": "Pablo Marín",
        "age": 22,
        "overall": 73,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 29928935,
        "country": "Spain",
        "attributes": {
          "pace": 67,
          "shooting": 68,
          "passing": 71,
          "dribbling": 73,
          "defending": 64,
          "physical": 59
        }
      },
      {
        "name": "Unai Marrero",
        "age": 24,
        "overall": 69,
        "potential": 69,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 7943282,
        "country": "Spain",
        "attributes": {
          "pace": 70,
          "shooting": 67,
          "passing": 61,
          "dribbling": 71,
          "defending": 25,
          "physical": 66
        }
      },
      {
        "name": "Jon Martín",
        "age": 19,
        "overall": 68,
        "potential": 68,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 9464360,
        "country": "Spain",
        "attributes": {
          "pace": 65,
          "shooting": 26,
          "passing": 48,
          "dribbling": 60,
          "defending": 70,
          "physical": 65
        }
      },
      {
        "name": "Karrikaburu",
        "age": 23,
        "overall": 67,
        "potential": 70,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 5011872,
        "country": "Spain",
        "attributes": {
          "pace": 71,
          "shooting": 65,
          "passing": 50,
          "dribbling": 66,
          "defending": 27,
          "physical": 63
        }
      }
    ]
  },
  {
    "name": "Manchester City",
    "domesticLeague": "Premier League",
    "country": "Inglaterra",
    "overall": 86,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Rodri",
        "age": 29,
        "overall": 90,
        "potential": 90,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 1000000000,
        "country": "Spain",
        "attributes": {
          "pace": 65,
          "shooting": 80,
          "passing": 86,
          "dribbling": 84,
          "defending": 86,
          "physical": 85
        }
      },
      {
        "name": "Erling Haaland",
        "age": 25,
        "overall": 90,
        "potential": 90,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 1000000000,
        "country": "Norway",
        "attributes": {
          "pace": 86,
          "shooting": 91,
          "passing": 70,
          "dribbling": 80,
          "defending": 45,
          "physical": 88
        }
      },
      {
        "name": "Gianluigi Donnarumma",
        "age": 27,
        "overall": 89,
        "potential": 89,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 794328235,
        "country": "Italy",
        "attributes": {
          "pace": 90,
          "shooting": 83,
          "passing": 70,
          "dribbling": 90,
          "defending": 52,
          "physical": 87
        }
      },
      {
        "name": "Rúben Dias",
        "age": 28,
        "overall": 86,
        "potential": 87,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 398107171,
        "country": "Portugal",
        "attributes": {
          "pace": 59,
          "shooting": 39,
          "passing": 69,
          "dribbling": 69,
          "defending": 86,
          "physical": 84
        }
      },
      {
        "name": "Tijjani Reijnders",
        "age": 27,
        "overall": 86,
        "potential": 90,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 398107171,
        "country": "Holland",
        "attributes": {
          "pace": 79,
          "shooting": 79,
          "passing": 82,
          "dribbling": 85,
          "defending": 77,
          "physical": 77
        }
      },
      {
        "name": "Phil Foden",
        "age": 25,
        "overall": 85,
        "potential": 89,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 316227766,
        "country": "England",
        "attributes": {
          "pace": 81,
          "shooting": 81,
          "passing": 82,
          "dribbling": 89,
          "defending": 57,
          "physical": 57
        }
      },
      {
        "name": "Joško Gvardiol",
        "age": 24,
        "overall": 84,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 251188643,
        "country": "Croatia",
        "attributes": {
          "pace": 78,
          "shooting": 71,
          "passing": 75,
          "dribbling": 78,
          "defending": 84,
          "physical": 82
        }
      },
      {
        "name": "Bernardo Silva",
        "age": 31,
        "overall": 84,
        "potential": 87,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 150713186,
        "country": "Portugal",
        "attributes": {
          "pace": 61,
          "shooting": 78,
          "passing": 83,
          "dribbling": 89,
          "defending": 71,
          "physical": 65
        }
      },
      {
        "name": "Omar Marmoush",
        "age": 27,
        "overall": 84,
        "potential": 88,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 251188643,
        "country": "Egypt",
        "attributes": {
          "pace": 89,
          "shooting": 85,
          "passing": 76,
          "dribbling": 86,
          "defending": 34,
          "physical": 71
        }
      },
      {
        "name": "Mateo Kovačić",
        "age": 31,
        "overall": 83,
        "potential": 87,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 119715739,
        "country": "Croatia",
        "attributes": {
          "pace": 67,
          "shooting": 74,
          "passing": 81,
          "dribbling": 83,
          "defending": 73,
          "physical": 72
        }
      },
      {
        "name": "Nathan Aké",
        "age": 31,
        "overall": 83,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 119715739,
        "country": "Holland",
        "attributes": {
          "pace": 72,
          "shooting": 53,
          "passing": 72,
          "dribbling": 75,
          "defending": 84,
          "physical": 74
        }
      },
      {
        "name": "John Stones",
        "age": 31,
        "overall": 82,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 95093592,
        "country": "England",
        "attributes": {
          "pace": 64,
          "shooting": 58,
          "passing": 74,
          "dribbling": 75,
          "defending": 84,
          "physical": 72
        }
      },
      {
        "name": "Savinho",
        "age": 21,
        "overall": 82,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 237733979,
        "country": "Brazil",
        "attributes": {
          "pace": 87,
          "shooting": 71,
          "passing": 78,
          "dribbling": 86,
          "defending": 30,
          "physical": 53
        }
      },
      {
        "name": "Rayan Aït-Nouri",
        "age": 24,
        "overall": 81,
        "potential": 85,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 125892541,
        "country": "Algeria",
        "attributes": {
          "pace": 84,
          "shooting": 53,
          "passing": 76,
          "dribbling": 84,
          "defending": 77,
          "physical": 70
        }
      },
      {
        "name": "Rayan Cherki",
        "age": 22,
        "overall": 81,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 188838812,
        "country": "France",
        "attributes": {
          "pace": 75,
          "shooting": 75,
          "passing": 80,
          "dribbling": 88,
          "defending": 21,
          "physical": 65
        }
      },
      {
        "name": "Jérémy Doku",
        "age": 23,
        "overall": 80,
        "potential": 81,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 100000000,
        "country": "Belgium",
        "attributes": {
          "pace": 91,
          "shooting": 71,
          "passing": 72,
          "dribbling": 87,
          "defending": 32,
          "physical": 68
        }
      },
      {
        "name": "Matheus Nunes",
        "age": 27,
        "overall": 79,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 79432823,
        "country": "Portugal",
        "attributes": {
          "pace": 85,
          "shooting": 70,
          "passing": 76,
          "dribbling": 79,
          "defending": 73,
          "physical": 76
        }
      },
      {
        "name": "Stefan Ortega",
        "age": 33,
        "overall": 79,
        "potential": 82,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 47659694,
        "country": "Germany",
        "attributes": {
          "pace": 78,
          "shooting": 77,
          "passing": 85,
          "dribbling": 81,
          "defending": 52,
          "physical": 78
        }
      },
      {
        "name": "Nico González",
        "age": 24,
        "overall": 79,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 79432823,
        "country": "Spain",
        "attributes": {
          "pace": 67,
          "shooting": 70,
          "passing": 77,
          "dribbling": 77,
          "defending": 74,
          "physical": 80
        }
      },
      {
        "name": "Rico Lewis",
        "age": 21,
        "overall": 77,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 75178085,
        "country": "England",
        "attributes": {
          "pace": 76,
          "shooting": 54,
          "passing": 74,
          "dribbling": 79,
          "defending": 73,
          "physical": 58
        }
      },
      {
        "name": "Abdukodir Khusanov",
        "age": 22,
        "overall": 77,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 75178085,
        "country": "Uzbekistan",
        "attributes": {
          "pace": 85,
          "shooting": 39,
          "passing": 59,
          "dribbling": 64,
          "defending": 77,
          "physical": 76
        }
      },
      {
        "name": "James Trafford",
        "age": 23,
        "overall": 76,
        "potential": 78,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 39810717,
        "country": "England",
        "attributes": {
          "pace": 77,
          "shooting": 74,
          "passing": 72,
          "dribbling": 78,
          "defending": 53,
          "physical": 74
        }
      },
      {
        "name": "Kalvin Phillips",
        "age": 30,
        "overall": 74,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 25118864,
        "country": "England",
        "attributes": {
          "pace": 54,
          "shooting": 65,
          "passing": 73,
          "dribbling": 70,
          "defending": 72,
          "physical": 70
        }
      },
      {
        "name": "Nico O'Reilly",
        "age": 21,
        "overall": 73,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 29928935,
        "country": "England",
        "attributes": {
          "pace": 73,
          "shooting": 66,
          "passing": 72,
          "dribbling": 73,
          "defending": 69,
          "physical": 70
        }
      },
      {
        "name": "Oscar Bobb",
        "age": 22,
        "overall": 72,
        "potential": 75,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 23773398,
        "country": "Norway",
        "attributes": {
          "pace": 79,
          "shooting": 65,
          "passing": 71,
          "dribbling": 77,
          "defending": 33,
          "physical": 41
        }
      },
      {
        "name": "Marcus Bettinelli",
        "age": 33,
        "overall": 70,
        "potential": 74,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 6000000,
        "country": "England",
        "attributes": {
          "pace": 70,
          "shooting": 70,
          "passing": 69,
          "dribbling": 71,
          "defending": 30,
          "physical": 71
        }
      }
    ]
  },
  {
    "name": "Arsenal FC",
    "domesticLeague": "Premier League",
    "country": "Inglaterra",
    "overall": 86,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Gabriel",
        "age": 28,
        "overall": 88,
        "potential": 92,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 630957344,
        "country": "Brazil",
        "attributes": {
          "pace": 64,
          "shooting": 44,
          "passing": 64,
          "dribbling": 65,
          "defending": 88,
          "physical": 84
        }
      },
      {
        "name": "Bukayo Saka",
        "age": 24,
        "overall": 88,
        "potential": 88,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 630957344,
        "country": "England",
        "attributes": {
          "pace": 84,
          "shooting": 82,
          "passing": 85,
          "dribbling": 88,
          "defending": 60,
          "physical": 73
        }
      },
      {
        "name": "Declan Rice",
        "age": 27,
        "overall": 87,
        "potential": 87,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 501187234,
        "country": "England",
        "attributes": {
          "pace": 72,
          "shooting": 73,
          "passing": 84,
          "dribbling": 80,
          "defending": 83,
          "physical": 83
        }
      },
      {
        "name": "William Saliba",
        "age": 25,
        "overall": 87,
        "potential": 87,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 501187234,
        "country": "France",
        "attributes": {
          "pace": 77,
          "shooting": 39,
          "passing": 68,
          "dribbling": 72,
          "defending": 87,
          "physical": 83
        }
      },
      {
        "name": "Martin Ødegaard",
        "age": 27,
        "overall": 87,
        "potential": 88,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 501187234,
        "country": "Norway",
        "attributes": {
          "pace": 68,
          "shooting": 79,
          "passing": 88,
          "dribbling": 87,
          "defending": 67,
          "physical": 65
        }
      },
      {
        "name": "David Raya",
        "age": 30,
        "overall": 87,
        "potential": 87,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 501187234,
        "country": "Spain",
        "attributes": {
          "pace": 86,
          "shooting": 84,
          "passing": 87,
          "dribbling": 87,
          "defending": 62,
          "physical": 85
        }
      },
      {
        "name": "Viktor Gyökeres",
        "age": 27,
        "overall": 87,
        "potential": 91,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 501187234,
        "country": "Sweden",
        "attributes": {
          "pace": 90,
          "shooting": 86,
          "passing": 73,
          "dribbling": 81,
          "defending": 36,
          "physical": 91
        }
      },
      {
        "name": "Mikel Merino",
        "age": 29,
        "overall": 83,
        "potential": 85,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 199526231,
        "country": "Spain",
        "attributes": {
          "pace": 63,
          "shooting": 79,
          "passing": 80,
          "dribbling": 80,
          "defending": 81,
          "physical": 80
        }
      },
      {
        "name": "Zubimendi",
        "age": 27,
        "overall": 83,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 199526231,
        "country": "Spain",
        "attributes": {
          "pace": 66,
          "shooting": 67,
          "passing": 79,
          "dribbling": 79,
          "defending": 80,
          "physical": 73
        }
      },
      {
        "name": "Eberechi Eze",
        "age": 27,
        "overall": 83,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 199526231,
        "country": "England",
        "attributes": {
          "pace": 74,
          "shooting": 80,
          "passing": 81,
          "dribbling": 87,
          "defending": 50,
          "physical": 68
        }
      },
      {
        "name": "Piero Hincapié",
        "age": 24,
        "overall": 83,
        "potential": 87,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 199526231,
        "country": "Ecuador",
        "attributes": {
          "pace": 84,
          "shooting": 41,
          "passing": 65,
          "dribbling": 72,
          "defending": 84,
          "physical": 82
        }
      },
      {
        "name": "Leandro Trossard",
        "age": 31,
        "overall": 83,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 119715739,
        "country": "Belgium",
        "attributes": {
          "pace": 80,
          "shooting": 81,
          "passing": 80,
          "dribbling": 85,
          "defending": 30,
          "physical": 60
        }
      },
      {
        "name": "Benjamin White",
        "age": 28,
        "overall": 83,
        "potential": 86,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 199526231,
        "country": "England",
        "attributes": {
          "pace": 70,
          "shooting": 35,
          "passing": 75,
          "dribbling": 75,
          "defending": 83,
          "physical": 78
        }
      },
      {
        "name": "Jurriën Timber",
        "age": 24,
        "overall": 82,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 158489319,
        "country": "Holland",
        "attributes": {
          "pace": 76,
          "shooting": 48,
          "passing": 72,
          "dribbling": 77,
          "defending": 82,
          "physical": 80
        }
      },
      {
        "name": "Kai Havertz",
        "age": 26,
        "overall": 82,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 158489319,
        "country": "Germany",
        "attributes": {
          "pace": 72,
          "shooting": 79,
          "passing": 78,
          "dribbling": 81,
          "defending": 48,
          "physical": 74
        }
      },
      {
        "name": "Gabriel Martinelli",
        "age": 24,
        "overall": 81,
        "potential": 82,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 125892541,
        "country": "Brazil",
        "attributes": {
          "pace": 90,
          "shooting": 77,
          "passing": 75,
          "dribbling": 83,
          "defending": 46,
          "physical": 72
        }
      },
      {
        "name": "Noni Madueke",
        "age": 24,
        "overall": 80,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 100000000,
        "country": "England",
        "attributes": {
          "pace": 88,
          "shooting": 75,
          "passing": 74,
          "dribbling": 83,
          "defending": 45,
          "physical": 69
        }
      },
      {
        "name": "Gabriel Jesus",
        "age": 28,
        "overall": 80,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 100000000,
        "country": "Brazil",
        "attributes": {
          "pace": 81,
          "shooting": 79,
          "passing": 74,
          "dribbling": 86,
          "defending": 39,
          "physical": 71
        }
      },
      {
        "name": "Christian Nørgaard",
        "age": 32,
        "overall": 80,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 60000000,
        "country": "Denmark",
        "attributes": {
          "pace": 49,
          "shooting": 65,
          "passing": 74,
          "dribbling": 71,
          "defending": 79,
          "physical": 79
        }
      },
      {
        "name": "Kepa",
        "age": 31,
        "overall": 79,
        "potential": 80,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 47659694,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 78,
          "passing": 82,
          "dribbling": 81,
          "defending": 40,
          "physical": 77
        }
      },
      {
        "name": "Myles Lewis-Skelly",
        "age": 19,
        "overall": 78,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 94643602,
        "country": "England",
        "attributes": {
          "pace": 76,
          "shooting": 60,
          "passing": 74,
          "dribbling": 77,
          "defending": 75,
          "physical": 78
        }
      },
      {
        "name": "Riccardo Calafiori",
        "age": 23,
        "overall": 78,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 63095734,
        "country": "Italy",
        "attributes": {
          "pace": 72,
          "shooting": 66,
          "passing": 71,
          "dribbling": 75,
          "defending": 77,
          "physical": 77
        }
      },
      {
        "name": "Mosquera",
        "age": 21,
        "overall": 77,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 75178085,
        "country": "Spain",
        "attributes": {
          "pace": 74,
          "shooting": 46,
          "passing": 60,
          "dribbling": 56,
          "defending": 78,
          "physical": 76
        }
      },
      {
        "name": "Ethan Nwaneri",
        "age": 19,
        "overall": 76,
        "potential": 79,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 59716076,
        "country": "England",
        "attributes": {
          "pace": 82,
          "shooting": 70,
          "passing": 74,
          "dribbling": 78,
          "defending": 50,
          "physical": 54
        }
      }
    ]
  },
  {
    "name": "Liverpool FC",
    "domesticLeague": "Premier League",
    "country": "Inglaterra",
    "overall": 87,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Mohamed Salah",
        "age": 33,
        "overall": 91,
        "potential": 93,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 755355247,
        "country": "Egypt",
        "attributes": {
          "pace": 89,
          "shooting": 88,
          "passing": 86,
          "dribbling": 90,
          "defending": 45,
          "physical": 76
        }
      },
      {
        "name": "Virgil van Dijk",
        "age": 34,
        "overall": 90,
        "potential": 91,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 600000000,
        "country": "Holland",
        "attributes": {
          "pace": 73,
          "shooting": 60,
          "passing": 72,
          "dribbling": 72,
          "defending": 90,
          "physical": 87
        }
      },
      {
        "name": "Alisson",
        "age": 33,
        "overall": 89,
        "potential": 90,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 476596941,
        "country": "Brazil",
        "attributes": {
          "pace": 86,
          "shooting": 85,
          "passing": 86,
          "dribbling": 89,
          "defending": 56,
          "physical": 90
        }
      },
      {
        "name": "Florian Wirtz",
        "age": 22,
        "overall": 89,
        "potential": 90,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 1191492352,
        "country": "Germany",
        "attributes": {
          "pace": 80,
          "shooting": 82,
          "passing": 88,
          "dribbling": 90,
          "defending": 54,
          "physical": 67
        }
      },
      {
        "name": "Alexander Isak",
        "age": 26,
        "overall": 88,
        "potential": 91,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 630957344,
        "country": "Sweden",
        "attributes": {
          "pace": 83,
          "shooting": 89,
          "passing": 73,
          "dribbling": 85,
          "defending": 39,
          "physical": 76
        }
      },
      {
        "name": "Alexis Mac Allister",
        "age": 27,
        "overall": 87,
        "potential": 87,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 501187234,
        "country": "Argentina",
        "attributes": {
          "pace": 66,
          "shooting": 82,
          "passing": 85,
          "dribbling": 85,
          "defending": 78,
          "physical": 76
        }
      },
      {
        "name": "Ibrahima Konaté",
        "age": 26,
        "overall": 86,
        "potential": 88,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 398107171,
        "country": "France",
        "attributes": {
          "pace": 77,
          "shooting": 34,
          "passing": 63,
          "dribbling": 69,
          "defending": 86,
          "physical": 85
        }
      },
      {
        "name": "Ryan Gravenberch",
        "age": 23,
        "overall": 85,
        "potential": 88,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 316227766,
        "country": "Holland",
        "attributes": {
          "pace": 76,
          "shooting": 76,
          "passing": 81,
          "dribbling": 85,
          "defending": 81,
          "physical": 81
        }
      },
      {
        "name": "Giorgi Mamardashvili",
        "age": 25,
        "overall": 84,
        "potential": 86,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 251188643,
        "country": "Georgia",
        "attributes": {
          "pace": 84,
          "shooting": 81,
          "passing": 72,
          "dribbling": 84,
          "defending": 48,
          "physical": 84
        }
      },
      {
        "name": "Cody Gakpo",
        "age": 26,
        "overall": 84,
        "potential": 87,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 251188643,
        "country": "Holland",
        "attributes": {
          "pace": 83,
          "shooting": 82,
          "passing": 80,
          "dribbling": 83,
          "defending": 47,
          "physical": 74
        }
      },
      {
        "name": "Dominik Szoboszlai",
        "age": 25,
        "overall": 83,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 199526231,
        "country": "Hungary",
        "attributes": {
          "pace": 79,
          "shooting": 82,
          "passing": 84,
          "dribbling": 82,
          "defending": 67,
          "physical": 76
        }
      },
      {
        "name": "Jeremie Frimpong",
        "age": 25,
        "overall": 83,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 199526231,
        "country": "Holland",
        "attributes": {
          "pace": 94,
          "shooting": 62,
          "passing": 74,
          "dribbling": 84,
          "defending": 72,
          "physical": 63
        }
      },
      {
        "name": "Hugo Ekitiké",
        "age": 23,
        "overall": 83,
        "potential": 84,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 199526231,
        "country": "France",
        "attributes": {
          "pace": 86,
          "shooting": 78,
          "passing": 69,
          "dribbling": 85,
          "defending": 33,
          "physical": 73
        }
      },
      {
        "name": "Milos Kerkez",
        "age": 22,
        "overall": 82,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 237733979,
        "country": "Hungary",
        "attributes": {
          "pace": 87,
          "shooting": 59,
          "passing": 75,
          "dribbling": 78,
          "defending": 77,
          "physical": 80
        }
      },
      {
        "name": "Andrew Robertson",
        "age": 32,
        "overall": 82,
        "potential": 86,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 95093592,
        "country": "Scotland",
        "attributes": {
          "pace": 74,
          "shooting": 61,
          "passing": 80,
          "dribbling": 77,
          "defending": 79,
          "physical": 75
        }
      },
      {
        "name": "Federico Chiesa",
        "age": 28,
        "overall": 81,
        "potential": 85,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 125892541,
        "country": "Italy",
        "attributes": {
          "pace": 87,
          "shooting": 80,
          "passing": 75,
          "dribbling": 83,
          "defending": 44,
          "physical": 68
        }
      },
      {
        "name": "Curtis Jones",
        "age": 25,
        "overall": 80,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 100000000,
        "country": "England",
        "attributes": {
          "pace": 74,
          "shooting": 74,
          "passing": 76,
          "dribbling": 82,
          "defending": 72,
          "physical": 76
        }
      },
      {
        "name": "Wataru Endo",
        "age": 33,
        "overall": 79,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 47659694,
        "country": "Japan",
        "attributes": {
          "pace": 58,
          "shooting": 68,
          "passing": 71,
          "dribbling": 77,
          "defending": 79,
          "physical": 73
        }
      },
      {
        "name": "Joe Gomez",
        "age": 28,
        "overall": 79,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "England",
        "attributes": {
          "pace": 74,
          "shooting": 29,
          "passing": 70,
          "dribbling": 71,
          "defending": 79,
          "physical": 73
        }
      },
      {
        "name": "Conor Bradley",
        "age": 22,
        "overall": 78,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 94643602,
        "country": "Northern Ireland",
        "attributes": {
          "pace": 80,
          "shooting": 61,
          "passing": 70,
          "dribbling": 75,
          "defending": 75,
          "physical": 74
        }
      },
      {
        "name": "Stefan Bajcetic",
        "age": 21,
        "overall": 73,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 29928935,
        "country": "Spain",
        "attributes": {
          "pace": 74,
          "shooting": 52,
          "passing": 67,
          "dribbling": 73,
          "defending": 71,
          "physical": 71
        }
      },
      {
        "name": "Freddie Woodman",
        "age": 29,
        "overall": 71,
        "potential": 72,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 12589254,
        "country": "England",
        "attributes": {
          "pace": 72,
          "shooting": 69,
          "passing": 62,
          "dribbling": 71,
          "defending": 47,
          "physical": 68
        }
      },
      {
        "name": "Giovanni Leoni",
        "age": 19,
        "overall": 69,
        "potential": 69,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 11914924,
        "country": "Italy",
        "attributes": {
          "pace": 53,
          "shooting": 27,
          "passing": 42,
          "dribbling": 52,
          "defending": 71,
          "physical": 68
        }
      },
      {
        "name": "Rio Ngumoha",
        "age": 17,
        "overall": 68,
        "potential": 71,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 9464360,
        "country": "England",
        "attributes": {
          "pace": 90,
          "shooting": 64,
          "passing": 59,
          "dribbling": 72,
          "defending": 35,
          "physical": 53
        }
      },
      {
        "name": "Calvin Ramsay",
        "age": 22,
        "overall": 65,
        "potential": 66,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 4743416,
        "country": "Scotland",
        "attributes": {
          "pace": 76,
          "shooting": 46,
          "passing": 61,
          "dribbling": 64,
          "defending": 58,
          "physical": 64
        }
      },
      {
        "name": "Ármin Pécsi",
        "age": 21,
        "overall": 64,
        "potential": 67,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 3767830,
        "country": "Hungary",
        "attributes": {
          "pace": 64,
          "shooting": 62,
          "passing": 63,
          "dribbling": 67,
          "defending": 51,
          "physical": 63
        }
      },
      {
        "name": "Trey Nyoni",
        "age": 18,
        "overall": 64,
        "potential": 65,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 3767830,
        "country": "England",
        "attributes": {
          "pace": 67,
          "shooting": 54,
          "passing": 61,
          "dribbling": 69,
          "defending": 52,
          "physical": 52
        }
      },
      {
        "name": "Rhys Williams",
        "age": 25,
        "overall": 61,
        "potential": 64,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 1258925,
        "country": "England",
        "attributes": {
          "pace": 64,
          "shooting": 35,
          "passing": 48,
          "dribbling": 52,
          "defending": 60,
          "physical": 65
        }
      }
    ]
  },
  {
    "name": "Chelsea FC",
    "domesticLeague": "Premier League",
    "country": "Inglaterra",
    "overall": 82,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Cole Palmer",
        "age": 23,
        "overall": 87,
        "potential": 91,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 501187234,
        "country": "England",
        "attributes": {
          "pace": 75,
          "shooting": 83,
          "passing": 87,
          "dribbling": 87,
          "defending": 50,
          "physical": 65
        }
      },
      {
        "name": "Moisés Caicedo",
        "age": 24,
        "overall": 87,
        "potential": 87,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 501187234,
        "country": "Ecuador",
        "attributes": {
          "pace": 71,
          "shooting": 64,
          "passing": 78,
          "dribbling": 81,
          "defending": 84,
          "physical": 82
        }
      },
      {
        "name": "Marc Cucurella",
        "age": 27,
        "overall": 84,
        "potential": 88,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 251188643,
        "country": "Spain",
        "attributes": {
          "pace": 75,
          "shooting": 64,
          "passing": 79,
          "dribbling": 80,
          "defending": 82,
          "physical": 79
        }
      },
      {
        "name": "Enzo Fernández",
        "age": 25,
        "overall": 84,
        "potential": 88,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 251188643,
        "country": "Argentina",
        "attributes": {
          "pace": 68,
          "shooting": 75,
          "passing": 85,
          "dribbling": 81,
          "defending": 73,
          "physical": 75
        }
      },
      {
        "name": "Reece James",
        "age": 26,
        "overall": 81,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 125892541,
        "country": "England",
        "attributes": {
          "pace": 76,
          "shooting": 71,
          "passing": 82,
          "dribbling": 77,
          "defending": 81,
          "physical": 81
        }
      },
      {
        "name": "Andrey Santos",
        "age": 21,
        "overall": 80,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 150000000,
        "country": "Brazil",
        "attributes": {
          "pace": 74,
          "shooting": 69,
          "passing": 74,
          "dribbling": 78,
          "defending": 77,
          "physical": 80
        }
      },
      {
        "name": "Pedro Neto",
        "age": 26,
        "overall": 80,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 100000000,
        "country": "Portugal",
        "attributes": {
          "pace": 91,
          "shooting": 76,
          "passing": 74,
          "dribbling": 82,
          "defending": 40,
          "physical": 68
        }
      },
      {
        "name": "Levi Colwill",
        "age": 23,
        "overall": 80,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 100000000,
        "country": "England",
        "attributes": {
          "pace": 70,
          "shooting": 43,
          "passing": 71,
          "dribbling": 72,
          "defending": 81,
          "physical": 80
        }
      },
      {
        "name": "Malo Gusto",
        "age": 22,
        "overall": 79,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 119149235,
        "country": "France",
        "attributes": {
          "pace": 84,
          "shooting": 45,
          "passing": 75,
          "dribbling": 78,
          "defending": 73,
          "physical": 74
        }
      },
      {
        "name": "Trevoh Chalobah",
        "age": 26,
        "overall": 79,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "England",
        "attributes": {
          "pace": 66,
          "shooting": 53,
          "passing": 69,
          "dribbling": 70,
          "defending": 80,
          "physical": 78
        }
      },
      {
        "name": "João Pedro",
        "age": 24,
        "overall": 79,
        "potential": 79,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 79432823,
        "country": "Brazil",
        "attributes": {
          "pace": 78,
          "shooting": 78,
          "passing": 72,
          "dribbling": 81,
          "defending": 37,
          "physical": 70
        }
      },
      {
        "name": "Wesley Fofana",
        "age": 25,
        "overall": 79,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "France",
        "attributes": {
          "pace": 74,
          "shooting": 41,
          "passing": 62,
          "dribbling": 71,
          "defending": 80,
          "physical": 78
        }
      },
      {
        "name": "Robert Sánchez",
        "age": 28,
        "overall": 78,
        "potential": 79,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 63095734,
        "country": "Spain",
        "attributes": {
          "pace": 79,
          "shooting": 77,
          "passing": 75,
          "dribbling": 79,
          "defending": 59,
          "physical": 77
        }
      },
      {
        "name": "Romeo Lavia",
        "age": 22,
        "overall": 78,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 94643602,
        "country": "Belgium",
        "attributes": {
          "pace": 69,
          "shooting": 52,
          "passing": 72,
          "dribbling": 77,
          "defending": 77,
          "physical": 75
        }
      },
      {
        "name": "Jorrel Hato",
        "age": 20,
        "overall": 78,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 94643602,
        "country": "Holland",
        "attributes": {
          "pace": 85,
          "shooting": 41,
          "passing": 70,
          "dribbling": 74,
          "defending": 75,
          "physical": 73
        }
      },
      {
        "name": "Estêvão",
        "age": 18,
        "overall": 78,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 94643602,
        "country": "Brazil",
        "attributes": {
          "pace": 90,
          "shooting": 74,
          "passing": 73,
          "dribbling": 82,
          "defending": 33,
          "physical": 57
        }
      },
      {
        "name": "Liam Delap",
        "age": 23,
        "overall": 78,
        "potential": 81,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 63095734,
        "country": "England",
        "attributes": {
          "pace": 79,
          "shooting": 80,
          "passing": 60,
          "dribbling": 76,
          "defending": 30,
          "physical": 81
        }
      },
      {
        "name": "Raheem Sterling",
        "age": 31,
        "overall": 78,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 37857441,
        "country": "England",
        "attributes": {
          "pace": 82,
          "shooting": 74,
          "passing": 74,
          "dribbling": 82,
          "defending": 42,
          "physical": 48
        }
      },
      {
        "name": "Jamie Gittens",
        "age": 21,
        "overall": 78,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 94643602,
        "country": "England",
        "attributes": {
          "pace": 92,
          "shooting": 73,
          "passing": 66,
          "dribbling": 84,
          "defending": 27,
          "physical": 59
        }
      },
      {
        "name": "Tosin Adarabioyo",
        "age": 28,
        "overall": 78,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 63095734,
        "country": "England",
        "attributes": {
          "pace": 70,
          "shooting": 46,
          "passing": 63,
          "dribbling": 64,
          "defending": 78,
          "physical": 79
        }
      },
      {
        "name": "Filip Jörgensen",
        "age": 23,
        "overall": 77,
        "potential": 77,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 50118723,
        "country": "Denmark",
        "attributes": {
          "pace": 77,
          "shooting": 76,
          "passing": 72,
          "dribbling": 78,
          "defending": 45,
          "physical": 77
        }
      },
      {
        "name": "Alejandro Garnacho",
        "age": 21,
        "overall": 77,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 75178085,
        "country": "Argentina",
        "attributes": {
          "pace": 86,
          "shooting": 77,
          "passing": 72,
          "dribbling": 80,
          "defending": 37,
          "physical": 58
        }
      },
      {
        "name": "Axel Disasi",
        "age": 28,
        "overall": 77,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 50118723,
        "country": "France",
        "attributes": {
          "pace": 56,
          "shooting": 48,
          "passing": 60,
          "dribbling": 58,
          "defending": 77,
          "physical": 79
        }
      },
      {
        "name": "Benoît Badiashile",
        "age": 25,
        "overall": 76,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 39810717,
        "country": "France",
        "attributes": {
          "pace": 60,
          "shooting": 45,
          "passing": 64,
          "dribbling": 62,
          "defending": 76,
          "physical": 77
        }
      },
      {
        "name": "Dário Essugo",
        "age": 21,
        "overall": 75,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 47434165,
        "country": "Portugal",
        "attributes": {
          "pace": 76,
          "shooting": 58,
          "passing": 64,
          "dribbling": 73,
          "defending": 74,
          "physical": 81
        }
      },
      {
        "name": "Facundo Buonanotte",
        "age": 21,
        "overall": 75,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 47434165,
        "country": "Argentina",
        "attributes": {
          "pace": 75,
          "shooting": 70,
          "passing": 73,
          "dribbling": 76,
          "defending": 30,
          "physical": 53
        }
      },
      {
        "name": "Marc Guiu",
        "age": 20,
        "overall": 71,
        "potential": 74,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 18883881,
        "country": "Spain",
        "attributes": {
          "pace": 76,
          "shooting": 70,
          "passing": 55,
          "dribbling": 69,
          "defending": 36,
          "physical": 75
        }
      },
      {
        "name": "Tyrique George",
        "age": 20,
        "overall": 71,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 18883881,
        "country": "England",
        "attributes": {
          "pace": 79,
          "shooting": 66,
          "passing": 66,
          "dribbling": 73,
          "defending": 36,
          "physical": 55
        }
      },
      {
        "name": "Josh Acheampong",
        "age": 19,
        "overall": 70,
        "potential": 70,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 15000000,
        "country": "England",
        "attributes": {
          "pace": 76,
          "shooting": 50,
          "passing": 65,
          "dribbling": 69,
          "defending": 66,
          "physical": 73
        }
      },
      {
        "name": "Gabriel Slonina",
        "age": 21,
        "overall": 68,
        "potential": 71,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 9464360,
        "country": "United States",
        "attributes": {
          "pace": 70,
          "shooting": 64,
          "passing": 63,
          "dribbling": 70,
          "defending": 45,
          "physical": 65
        }
      }
    ]
  },
  {
    "name": "Tottenham Hotspur",
    "domesticLeague": "Premier League",
    "country": "Inglaterra",
    "overall": 82,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Xavi Simons",
        "age": 22,
        "overall": 84,
        "potential": 85,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 376782965,
        "country": "Holland",
        "attributes": {
          "pace": 77,
          "shooting": 77,
          "passing": 80,
          "dribbling": 87,
          "defending": 61,
          "physical": 70
        }
      },
      {
        "name": "James Maddison",
        "age": 29,
        "overall": 84,
        "potential": 88,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 251188643,
        "country": "England",
        "attributes": {
          "pace": 67,
          "shooting": 81,
          "passing": 86,
          "dribbling": 85,
          "defending": 58,
          "physical": 64
        }
      },
      {
        "name": "Dejan Kulusevski",
        "age": 25,
        "overall": 83,
        "potential": 85,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 199526231,
        "country": "Sweden",
        "attributes": {
          "pace": 74,
          "shooting": 79,
          "passing": 84,
          "dribbling": 85,
          "defending": 62,
          "physical": 81
        }
      },
      {
        "name": "Palhinha",
        "age": 30,
        "overall": 83,
        "potential": 87,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 199526231,
        "country": "Portugal",
        "attributes": {
          "pace": 56,
          "shooting": 68,
          "passing": 70,
          "dribbling": 72,
          "defending": 84,
          "physical": 85
        }
      },
      {
        "name": "Pedro Porro",
        "age": 26,
        "overall": 82,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 158489319,
        "country": "Spain",
        "attributes": {
          "pace": 78,
          "shooting": 73,
          "passing": 81,
          "dribbling": 80,
          "defending": 77,
          "physical": 76
        }
      },
      {
        "name": "Guglielmo Vicario",
        "age": 29,
        "overall": 82,
        "potential": 84,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 158489319,
        "country": "Italy",
        "attributes": {
          "pace": 83,
          "shooting": 78,
          "passing": 78,
          "dribbling": 84,
          "defending": 52,
          "physical": 80
        }
      },
      {
        "name": "Micky van de Ven",
        "age": 24,
        "overall": 82,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 158489319,
        "country": "Holland",
        "attributes": {
          "pace": 90,
          "shooting": 49,
          "passing": 64,
          "dribbling": 72,
          "defending": 82,
          "physical": 80
        }
      },
      {
        "name": "Cristian Romero",
        "age": 27,
        "overall": 82,
        "potential": 85,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 158489319,
        "country": "Argentina",
        "attributes": {
          "pace": 66,
          "shooting": 48,
          "passing": 62,
          "dribbling": 65,
          "defending": 83,
          "physical": 81
        }
      },
      {
        "name": "Randal Kolo Muani",
        "age": 27,
        "overall": 81,
        "potential": 82,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 125892541,
        "country": "France",
        "attributes": {
          "pace": 90,
          "shooting": 79,
          "passing": 71,
          "dribbling": 80,
          "defending": 38,
          "physical": 65
        }
      },
      {
        "name": "Destiny Udogie",
        "age": 23,
        "overall": 80,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 100000000,
        "country": "Italy",
        "attributes": {
          "pace": 88,
          "shooting": 64,
          "passing": 73,
          "dribbling": 78,
          "defending": 76,
          "physical": 79
        }
      },
      {
        "name": "Mohammed Kudus",
        "age": 25,
        "overall": 80,
        "potential": 84,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 100000000,
        "country": "Ghana",
        "attributes": {
          "pace": 89,
          "shooting": 76,
          "passing": 72,
          "dribbling": 86,
          "defending": 60,
          "physical": 74
        }
      },
      {
        "name": "Rodrigo Bentancur",
        "age": 28,
        "overall": 80,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 100000000,
        "country": "Uruguay",
        "attributes": {
          "pace": 64,
          "shooting": 68,
          "passing": 78,
          "dribbling": 79,
          "defending": 78,
          "physical": 72
        }
      },
      {
        "name": "Dominic Solanke",
        "age": 28,
        "overall": 80,
        "potential": 84,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 100000000,
        "country": "England",
        "attributes": {
          "pace": 71,
          "shooting": 80,
          "passing": 66,
          "dribbling": 77,
          "defending": 42,
          "physical": 83
        }
      },
      {
        "name": "Pape Matar Sarr",
        "age": 23,
        "overall": 79,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 79432823,
        "country": "Senegal",
        "attributes": {
          "pace": 68,
          "shooting": 66,
          "passing": 76,
          "dribbling": 78,
          "defending": 77,
          "physical": 76
        }
      },
      {
        "name": "Brennan Johnson",
        "age": 24,
        "overall": 79,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 79432823,
        "country": "Wales",
        "attributes": {
          "pace": 86,
          "shooting": 76,
          "passing": 72,
          "dribbling": 78,
          "defending": 43,
          "physical": 59
        }
      },
      {
        "name": "Kevin Danso",
        "age": 27,
        "overall": 79,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "Austria",
        "attributes": {
          "pace": 73,
          "shooting": 32,
          "passing": 57,
          "dribbling": 62,
          "defending": 78,
          "physical": 83
        }
      },
      {
        "name": "Yves Bissouma",
        "age": 29,
        "overall": 78,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 63095734,
        "country": "Mali",
        "attributes": {
          "pace": 66,
          "shooting": 66,
          "passing": 74,
          "dribbling": 79,
          "defending": 76,
          "physical": 74
        }
      },
      {
        "name": "Richarlison",
        "age": 28,
        "overall": 78,
        "potential": 79,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 63095734,
        "country": "Brazil",
        "attributes": {
          "pace": 76,
          "shooting": 78,
          "passing": 72,
          "dribbling": 78,
          "defending": 53,
          "physical": 75
        }
      },
      {
        "name": "Djed Spence",
        "age": 25,
        "overall": 78,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 63095734,
        "country": "England",
        "attributes": {
          "pace": 88,
          "shooting": 44,
          "passing": 71,
          "dribbling": 79,
          "defending": 74,
          "physical": 72
        }
      },
      {
        "name": "Lucas Bergvall",
        "age": 20,
        "overall": 77,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 75178085,
        "country": "Sweden",
        "attributes": {
          "pace": 75,
          "shooting": 63,
          "passing": 76,
          "dribbling": 77,
          "defending": 71,
          "physical": 73
        }
      },
      {
        "name": "Mathys Tel",
        "age": 20,
        "overall": 77,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 75178085,
        "country": "France",
        "attributes": {
          "pace": 86,
          "shooting": 80,
          "passing": 67,
          "dribbling": 78,
          "defending": 29,
          "physical": 64
        }
      },
      {
        "name": "Archie Gray",
        "age": 20,
        "overall": 75,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 47434165,
        "country": "England",
        "attributes": {
          "pace": 71,
          "shooting": 60,
          "passing": 71,
          "dribbling": 73,
          "defending": 73,
          "physical": 73
        }
      },
      {
        "name": "Antonín Kinský",
        "age": 23,
        "overall": 75,
        "potential": 79,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 31622777,
        "country": "Czech Republic",
        "attributes": {
          "pace": 76,
          "shooting": 76,
          "passing": 76,
          "dribbling": 75,
          "defending": 25,
          "physical": 74
        }
      },
      {
        "name": "Ben Davies",
        "age": 32,
        "overall": 75,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 18973666,
        "country": "Wales",
        "attributes": {
          "pace": 53,
          "shooting": 58,
          "passing": 71,
          "dribbling": 71,
          "defending": 77,
          "physical": 68
        }
      },
      {
        "name": "Wilson Odobert",
        "age": 21,
        "overall": 75,
        "potential": 78,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 47434165,
        "country": "France",
        "attributes": {
          "pace": 86,
          "shooting": 70,
          "passing": 68,
          "dribbling": 78,
          "defending": 30,
          "physical": 49
        }
      },
      {
        "name": "Radu Drăgușin",
        "age": 24,
        "overall": 75,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 31622777,
        "country": "Romania",
        "attributes": {
          "pace": 67,
          "shooting": 37,
          "passing": 53,
          "dribbling": 65,
          "defending": 75,
          "physical": 74
        }
      },
      {
        "name": "Kota Takai",
        "age": 21,
        "overall": 72,
        "potential": 73,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 23773398,
        "country": "Japan",
        "attributes": {
          "pace": 66,
          "shooting": 32,
          "passing": 55,
          "dribbling": 62,
          "defending": 72,
          "physical": 69
        }
      },
      {
        "name": "Brandon Austin",
        "age": 27,
        "overall": 67,
        "potential": 69,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 5011872,
        "country": "England",
        "attributes": {
          "pace": 69,
          "shooting": 65,
          "passing": 64,
          "dribbling": 66,
          "defending": 41,
          "physical": 65
        }
      },
      {
        "name": "Dane Scarlett",
        "age": 22,
        "overall": 65,
        "potential": 68,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 4743416,
        "country": "England",
        "attributes": {
          "pace": 75,
          "shooting": 63,
          "passing": 52,
          "dribbling": 66,
          "defending": 23,
          "physical": 63
        }
      }
    ]
  },
  {
    "name": "Newcastle United",
    "domesticLeague": "Premier League",
    "country": "Inglaterra",
    "overall": 82,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Bruno Guimarães",
        "age": 28,
        "overall": 86,
        "potential": 90,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 398107171,
        "country": "Brazil",
        "attributes": {
          "pace": 66,
          "shooting": 75,
          "passing": 84,
          "dribbling": 84,
          "defending": 79,
          "physical": 81
        }
      },
      {
        "name": "Sandro Tonali",
        "age": 25,
        "overall": 86,
        "potential": 89,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 398107171,
        "country": "Italy",
        "attributes": {
          "pace": 79,
          "shooting": 74,
          "passing": 82,
          "dribbling": 80,
          "defending": 81,
          "physical": 83
        }
      },
      {
        "name": "Anthony Gordon",
        "age": 25,
        "overall": 83,
        "potential": 86,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 199526231,
        "country": "England",
        "attributes": {
          "pace": 91,
          "shooting": 79,
          "passing": 78,
          "dribbling": 83,
          "defending": 50,
          "physical": 71
        }
      },
      {
        "name": "Joelinton",
        "age": 29,
        "overall": 82,
        "potential": 85,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 158489319,
        "country": "Brazil",
        "attributes": {
          "pace": 74,
          "shooting": 73,
          "passing": 77,
          "dribbling": 81,
          "defending": 82,
          "physical": 90
        }
      },
      {
        "name": "Fabian Schär",
        "age": 34,
        "overall": 82,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 95093592,
        "country": "Switzerland",
        "attributes": {
          "pace": 51,
          "shooting": 68,
          "passing": 76,
          "dribbling": 73,
          "defending": 84,
          "physical": 80
        }
      },
      {
        "name": "Yoane Wissa",
        "age": 29,
        "overall": 82,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 158489319,
        "country": "Congo DR",
        "attributes": {
          "pace": 85,
          "shooting": 82,
          "passing": 70,
          "dribbling": 80,
          "defending": 31,
          "physical": 71
        }
      },
      {
        "name": "Sven Botman",
        "age": 26,
        "overall": 82,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 158489319,
        "country": "Holland",
        "attributes": {
          "pace": 56,
          "shooting": 37,
          "passing": 62,
          "dribbling": 65,
          "defending": 83,
          "physical": 82
        }
      },
      {
        "name": "Jacob Murphy",
        "age": 31,
        "overall": 81,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 75535525,
        "country": "England",
        "attributes": {
          "pace": 82,
          "shooting": 77,
          "passing": 78,
          "dribbling": 80,
          "defending": 61,
          "physical": 70
        }
      },
      {
        "name": "Nick Pope",
        "age": 33,
        "overall": 81,
        "potential": 85,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 75535525,
        "country": "England",
        "attributes": {
          "pace": 81,
          "shooting": 81,
          "passing": 68,
          "dribbling": 82,
          "defending": 49,
          "physical": 78
        }
      },
      {
        "name": "Anthony Elanga",
        "age": 23,
        "overall": 81,
        "potential": 85,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 125892541,
        "country": "Sweden",
        "attributes": {
          "pace": 92,
          "shooting": 72,
          "passing": 76,
          "dribbling": 82,
          "defending": 39,
          "physical": 70
        }
      },
      {
        "name": "Kieran Trippier",
        "age": 35,
        "overall": 80,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 60000000,
        "country": "England",
        "attributes": {
          "pace": 66,
          "shooting": 65,
          "passing": 83,
          "dribbling": 77,
          "defending": 80,
          "physical": 71
        }
      },
      {
        "name": "Lewis Hall",
        "age": 21,
        "overall": 80,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 150000000,
        "country": "England",
        "attributes": {
          "pace": 77,
          "shooting": 62,
          "passing": 78,
          "dribbling": 79,
          "defending": 77,
          "physical": 64
        }
      },
      {
        "name": "Tino Livramento",
        "age": 23,
        "overall": 80,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 100000000,
        "country": "England",
        "attributes": {
          "pace": 82,
          "shooting": 51,
          "passing": 72,
          "dribbling": 78,
          "defending": 76,
          "physical": 74
        }
      },
      {
        "name": "Harvey Barnes",
        "age": 28,
        "overall": 80,
        "potential": 82,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 100000000,
        "country": "England",
        "attributes": {
          "pace": 83,
          "shooting": 80,
          "passing": 75,
          "dribbling": 81,
          "defending": 43,
          "physical": 68
        }
      },
      {
        "name": "Nick Woltemade",
        "age": 24,
        "overall": 79,
        "potential": 82,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 79432823,
        "country": "Germany",
        "attributes": {
          "pace": 67,
          "shooting": 78,
          "passing": 65,
          "dribbling": 79,
          "defending": 41,
          "physical": 74
        }
      },
      {
        "name": "Dan Burn",
        "age": 33,
        "overall": 79,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 47659694,
        "country": "England",
        "attributes": {
          "pace": 42,
          "shooting": 36,
          "passing": 67,
          "dribbling": 64,
          "defending": 79,
          "physical": 85
        }
      },
      {
        "name": "Jacob Ramsey",
        "age": 24,
        "overall": 78,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 63095734,
        "country": "England",
        "attributes": {
          "pace": 77,
          "shooting": 75,
          "passing": 73,
          "dribbling": 80,
          "defending": 68,
          "physical": 72
        }
      },
      {
        "name": "Malick Thiaw",
        "age": 24,
        "overall": 78,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 63095734,
        "country": "Germany",
        "attributes": {
          "pace": 72,
          "shooting": 47,
          "passing": 69,
          "dribbling": 72,
          "defending": 78,
          "physical": 80
        }
      },
      {
        "name": "Aaron Ramsdale",
        "age": 27,
        "overall": 77,
        "potential": 80,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 50118723,
        "country": "England",
        "attributes": {
          "pace": 77,
          "shooting": 76,
          "passing": 80,
          "dribbling": 79,
          "defending": 48,
          "physical": 74
        }
      },
      {
        "name": "Joe Willock",
        "age": 26,
        "overall": 76,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 39810717,
        "country": "England",
        "attributes": {
          "pace": 75,
          "shooting": 72,
          "passing": 73,
          "dribbling": 79,
          "defending": 72,
          "physical": 68
        }
      },
      {
        "name": "Emil Krafth",
        "age": 31,
        "overall": 73,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 11971574,
        "country": "Sweden",
        "attributes": {
          "pace": 53,
          "shooting": 59,
          "passing": 69,
          "dribbling": 70,
          "defending": 74,
          "physical": 67
        }
      },
      {
        "name": "Jamaal Lascelles",
        "age": 32,
        "overall": 73,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 11971574,
        "country": "England",
        "attributes": {
          "pace": 37,
          "shooting": 35,
          "passing": 51,
          "dribbling": 50,
          "defending": 74,
          "physical": 71
        }
      },
      {
        "name": "Lewis Miley",
        "age": 19,
        "overall": 72,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 23773398,
        "country": "England",
        "attributes": {
          "pace": 65,
          "shooting": 61,
          "passing": 72,
          "dribbling": 73,
          "defending": 64,
          "physical": 66
        }
      },
      {
        "name": "John Ruddy",
        "age": 39,
        "overall": 68,
        "potential": 70,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 3785744,
        "country": "England",
        "attributes": {
          "pace": 66,
          "shooting": 69,
          "passing": 66,
          "dribbling": 67,
          "defending": 35,
          "physical": 68
        }
      },
      {
        "name": "William Osula",
        "age": 22,
        "overall": 68,
        "potential": 69,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 9464360,
        "country": "Denmark",
        "attributes": {
          "pace": 73,
          "shooting": 66,
          "passing": 53,
          "dribbling": 68,
          "defending": 24,
          "physical": 63
        }
      },
      {
        "name": "Harrison Ashby",
        "age": 24,
        "overall": 64,
        "potential": 67,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 2511886,
        "country": "Scotland",
        "attributes": {
          "pace": 75,
          "shooting": 44,
          "passing": 56,
          "dribbling": 60,
          "defending": 57,
          "physical": 62
        }
      },
      {
        "name": "Alex Murphy",
        "age": 21,
        "overall": 64,
        "potential": 64,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 3767830,
        "country": "Republic of Ireland",
        "attributes": {
          "pace": 64,
          "shooting": 41,
          "passing": 53,
          "dribbling": 57,
          "defending": 63,
          "physical": 71
        }
      },
      {
        "name": "Mark Gillespie",
        "age": 34,
        "overall": 62,
        "potential": 62,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 950936,
        "country": "England",
        "attributes": {
          "pace": 63,
          "shooting": 61,
          "passing": 60,
          "dribbling": 64,
          "defending": 32,
          "physical": 61
        }
      }
    ]
  },
  {
    "name": "Aston Villa",
    "domesticLeague": "Premier League",
    "country": "Inglaterra",
    "overall": 82,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Emiliano Martínez",
        "age": 33,
        "overall": 85,
        "potential": 86,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 189736660,
        "country": "Argentina",
        "attributes": {
          "pace": 83,
          "shooting": 82,
          "passing": 82,
          "dribbling": 85,
          "defending": 56,
          "physical": 85
        }
      },
      {
        "name": "Youri Tielemans",
        "age": 28,
        "overall": 85,
        "potential": 85,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 316227766,
        "country": "Belgium",
        "attributes": {
          "pace": 54,
          "shooting": 79,
          "passing": 85,
          "dribbling": 80,
          "defending": 75,
          "physical": 72
        }
      },
      {
        "name": "Ollie Watkins",
        "age": 30,
        "overall": 84,
        "potential": 87,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 251188643,
        "country": "England",
        "attributes": {
          "pace": 77,
          "shooting": 83,
          "passing": 73,
          "dribbling": 80,
          "defending": 50,
          "physical": 80
        }
      },
      {
        "name": "Boubacar Kamara",
        "age": 26,
        "overall": 83,
        "potential": 85,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 199526231,
        "country": "France",
        "attributes": {
          "pace": 64,
          "shooting": 55,
          "passing": 74,
          "dribbling": 75,
          "defending": 83,
          "physical": 80
        }
      },
      {
        "name": "Morgan Rogers",
        "age": 23,
        "overall": 82,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 158489319,
        "country": "England",
        "attributes": {
          "pace": 77,
          "shooting": 77,
          "passing": 79,
          "dribbling": 84,
          "defending": 67,
          "physical": 79
        }
      },
      {
        "name": "Ezri Konsa",
        "age": 28,
        "overall": 82,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 158489319,
        "country": "England",
        "attributes": {
          "pace": 75,
          "shooting": 53,
          "passing": 71,
          "dribbling": 75,
          "defending": 84,
          "physical": 78
        }
      },
      {
        "name": "John McGinn",
        "age": 31,
        "overall": 81,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 75535525,
        "country": "Scotland",
        "attributes": {
          "pace": 69,
          "shooting": 77,
          "passing": 78,
          "dribbling": 80,
          "defending": 77,
          "physical": 83
        }
      },
      {
        "name": "Lucas Digne",
        "age": 32,
        "overall": 80,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 60000000,
        "country": "France",
        "attributes": {
          "pace": 69,
          "shooting": 68,
          "passing": 79,
          "dribbling": 76,
          "defending": 77,
          "physical": 74
        }
      },
      {
        "name": "Jadon Sancho",
        "age": 26,
        "overall": 80,
        "potential": 82,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 100000000,
        "country": "England",
        "attributes": {
          "pace": 79,
          "shooting": 73,
          "passing": 77,
          "dribbling": 87,
          "defending": 35,
          "physical": 58
        }
      },
      {
        "name": "Pau Torres",
        "age": 29,
        "overall": 80,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 100000000,
        "country": "Spain",
        "attributes": {
          "pace": 67,
          "shooting": 41,
          "passing": 75,
          "dribbling": 69,
          "defending": 82,
          "physical": 73
        }
      },
      {
        "name": "Ian Maatsen",
        "age": 24,
        "overall": 79,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 79432823,
        "country": "Holland",
        "attributes": {
          "pace": 87,
          "shooting": 65,
          "passing": 75,
          "dribbling": 81,
          "defending": 73,
          "physical": 63
        }
      },
      {
        "name": "Amadou Onana",
        "age": 24,
        "overall": 79,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 79432823,
        "country": "Belgium",
        "attributes": {
          "pace": 74,
          "shooting": 62,
          "passing": 72,
          "dribbling": 73,
          "defending": 78,
          "physical": 81
        }
      },
      {
        "name": "Matty Cash",
        "age": 28,
        "overall": 79,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 79432823,
        "country": "Poland",
        "attributes": {
          "pace": 75,
          "shooting": 66,
          "passing": 71,
          "dribbling": 75,
          "defending": 75,
          "physical": 76
        }
      },
      {
        "name": "Evann Guessand",
        "age": 24,
        "overall": 79,
        "potential": 79,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 79432823,
        "country": "Côte d'Ivoire",
        "attributes": {
          "pace": 83,
          "shooting": 76,
          "passing": 73,
          "dribbling": 79,
          "defending": 36,
          "physical": 77
        }
      },
      {
        "name": "Donyell Malen",
        "age": 27,
        "overall": 79,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 79432823,
        "country": "Holland",
        "attributes": {
          "pace": 86,
          "shooting": 78,
          "passing": 72,
          "dribbling": 82,
          "defending": 35,
          "physical": 67
        }
      },
      {
        "name": "Marco Bizot",
        "age": 35,
        "overall": 78,
        "potential": 80,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 37857441,
        "country": "Holland",
        "attributes": {
          "pace": 78,
          "shooting": 75,
          "passing": 72,
          "dribbling": 78,
          "defending": 46,
          "physical": 79
        }
      },
      {
        "name": "Harvey Elliott",
        "age": 22,
        "overall": 78,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 94643602,
        "country": "England",
        "attributes": {
          "pace": 72,
          "shooting": 70,
          "passing": 77,
          "dribbling": 81,
          "defending": 53,
          "physical": 50
        }
      },
      {
        "name": "Tyrone Mings",
        "age": 33,
        "overall": 78,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 37857441,
        "country": "England",
        "attributes": {
          "pace": 58,
          "shooting": 44,
          "passing": 67,
          "dribbling": 64,
          "defending": 78,
          "physical": 76
        }
      },
      {
        "name": "Emiliano Buendía",
        "age": 29,
        "overall": 77,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 50118723,
        "country": "Argentina",
        "attributes": {
          "pace": 66,
          "shooting": 74,
          "passing": 78,
          "dribbling": 81,
          "defending": 66,
          "physical": 66
        }
      },
      {
        "name": "Ross Barkley",
        "age": 32,
        "overall": 77,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 30071234,
        "country": "England",
        "attributes": {
          "pace": 53,
          "shooting": 77,
          "passing": 78,
          "dribbling": 76,
          "defending": 64,
          "physical": 68
        }
      },
      {
        "name": "Andrés García",
        "age": 23,
        "overall": 73,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 19952623,
        "country": "Spain",
        "attributes": {
          "pace": 77,
          "shooting": 64,
          "passing": 69,
          "dribbling": 73,
          "defending": 68,
          "physical": 66
        }
      },
      {
        "name": "Lamare Bogarde",
        "age": 22,
        "overall": 71,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 18883881,
        "country": "Holland",
        "attributes": {
          "pace": 67,
          "shooting": 48,
          "passing": 65,
          "dribbling": 67,
          "defending": 69,
          "physical": 69
        }
      }
    ]
  },
  {
    "name": "Everton FC",
    "domesticLeague": "Premier League",
    "country": "Inglaterra",
    "overall": 79,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Jordan Pickford",
        "age": 32,
        "overall": 84,
        "potential": 86,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 150713186,
        "country": "England",
        "attributes": {
          "pace": 84,
          "shooting": 78,
          "passing": 88,
          "dribbling": 87,
          "defending": 53,
          "physical": 81
        }
      },
      {
        "name": "Jack Grealish",
        "age": 30,
        "overall": 80,
        "potential": 84,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 100000000,
        "country": "England",
        "attributes": {
          "pace": 72,
          "shooting": 76,
          "passing": 80,
          "dribbling": 85,
          "defending": 53,
          "physical": 67
        }
      },
      {
        "name": "James Tarkowski",
        "age": 33,
        "overall": 80,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 60000000,
        "country": "England",
        "attributes": {
          "pace": 45,
          "shooting": 47,
          "passing": 64,
          "dribbling": 59,
          "defending": 81,
          "physical": 82
        }
      },
      {
        "name": "Iliman Ndiaye",
        "age": 26,
        "overall": 79,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 79432823,
        "country": "Senegal",
        "attributes": {
          "pace": 84,
          "shooting": 76,
          "passing": 70,
          "dribbling": 84,
          "defending": 40,
          "physical": 63
        }
      },
      {
        "name": "Idrissa Gueye",
        "age": 36,
        "overall": 79,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 47659694,
        "country": "Senegal",
        "attributes": {
          "pace": 60,
          "shooting": 59,
          "passing": 70,
          "dribbling": 73,
          "defending": 80,
          "physical": 70
        }
      },
      {
        "name": "Jarrad Branthwaite",
        "age": 23,
        "overall": 79,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "England",
        "attributes": {
          "pace": 71,
          "shooting": 39,
          "passing": 58,
          "dribbling": 60,
          "defending": 80,
          "physical": 78
        }
      },
      {
        "name": "Dwight McNeil",
        "age": 26,
        "overall": 78,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 63095734,
        "country": "England",
        "attributes": {
          "pace": 67,
          "shooting": 76,
          "passing": 79,
          "dribbling": 79,
          "defending": 55,
          "physical": 68
        }
      },
      {
        "name": "Vitaliy Mykolenko",
        "age": 26,
        "overall": 78,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 63095734,
        "country": "Ukraine",
        "attributes": {
          "pace": 74,
          "shooting": 55,
          "passing": 71,
          "dribbling": 71,
          "defending": 77,
          "physical": 71
        }
      },
      {
        "name": "Kiernan Dewsbury-Hall",
        "age": 27,
        "overall": 77,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 50118723,
        "country": "England",
        "attributes": {
          "pace": 66,
          "shooting": 72,
          "passing": 77,
          "dribbling": 78,
          "defending": 70,
          "physical": 71
        }
      },
      {
        "name": "Thierno Barry",
        "age": 23,
        "overall": 77,
        "potential": 81,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 50118723,
        "country": "France",
        "attributes": {
          "pace": 80,
          "shooting": 75,
          "passing": 65,
          "dribbling": 75,
          "defending": 25,
          "physical": 73
        }
      },
      {
        "name": "James Garner",
        "age": 25,
        "overall": 76,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 39810717,
        "country": "England",
        "attributes": {
          "pace": 58,
          "shooting": 65,
          "passing": 78,
          "dribbling": 72,
          "defending": 71,
          "physical": 70
        }
      },
      {
        "name": "Jake O'Brien",
        "age": 24,
        "overall": 76,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 39810717,
        "country": "Republic of Ireland",
        "attributes": {
          "pace": 77,
          "shooting": 49,
          "passing": 64,
          "dribbling": 61,
          "defending": 75,
          "physical": 79
        }
      },
      {
        "name": "Beto",
        "age": 28,
        "overall": 76,
        "potential": 76,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 39810717,
        "country": "Guinea-Bissau",
        "attributes": {
          "pace": 74,
          "shooting": 77,
          "passing": 58,
          "dribbling": 68,
          "defending": 25,
          "physical": 82
        }
      },
      {
        "name": "Carlos Alcaraz",
        "age": 23,
        "overall": 75,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 31622777,
        "country": "Argentina",
        "attributes": {
          "pace": 80,
          "shooting": 71,
          "passing": 71,
          "dribbling": 78,
          "defending": 46,
          "physical": 65
        }
      },
      {
        "name": "Merlin Röhl",
        "age": 23,
        "overall": 74,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 25118864,
        "country": "Germany",
        "attributes": {
          "pace": 81,
          "shooting": 65,
          "passing": 68,
          "dribbling": 75,
          "defending": 63,
          "physical": 71
        }
      },
      {
        "name": "Tim Iroegbunam",
        "age": 22,
        "overall": 74,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 37678296,
        "country": "England",
        "attributes": {
          "pace": 65,
          "shooting": 58,
          "passing": 67,
          "dribbling": 73,
          "defending": 72,
          "physical": 72
        }
      },
      {
        "name": "Tyler Dibling",
        "age": 20,
        "overall": 74,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 37678296,
        "country": "England",
        "attributes": {
          "pace": 77,
          "shooting": 67,
          "passing": 70,
          "dribbling": 77,
          "defending": 38,
          "physical": 66
        }
      },
      {
        "name": "Michael Keane",
        "age": 33,
        "overall": 73,
        "potential": 73,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 11971574,
        "country": "England",
        "attributes": {
          "pace": 40,
          "shooting": 49,
          "passing": 62,
          "dribbling": 58,
          "defending": 73,
          "physical": 74
        }
      },
      {
        "name": "Mark Travers",
        "age": 26,
        "overall": 72,
        "potential": 76,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 15848932,
        "country": "Republic of Ireland",
        "attributes": {
          "pace": 73,
          "shooting": 69,
          "passing": 69,
          "dribbling": 74,
          "defending": 40,
          "physical": 72
        }
      },
      {
        "name": "Nathan Patterson",
        "age": 24,
        "overall": 71,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 12589254,
        "country": "Scotland",
        "attributes": {
          "pace": 71,
          "shooting": 46,
          "passing": 63,
          "dribbling": 70,
          "defending": 70,
          "physical": 69
        }
      },
      {
        "name": "Séamus Coleman",
        "age": 37,
        "overall": 70,
        "potential": 71,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 6000000,
        "country": "Republic of Ireland",
        "attributes": {
          "pace": 51,
          "shooting": 65,
          "passing": 70,
          "dribbling": 70,
          "defending": 74,
          "physical": 61
        }
      },
      {
        "name": "Adam Aznou",
        "age": 19,
        "overall": 66,
        "potential": 68,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 5971608,
        "country": "Morocco",
        "attributes": {
          "pace": 80,
          "shooting": 52,
          "passing": 61,
          "dribbling": 72,
          "defending": 59,
          "physical": 51
        }
      },
      {
        "name": "Tom King",
        "age": 31,
        "overall": 64,
        "potential": 64,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 1507132,
        "country": "Wales",
        "attributes": {
          "pace": 64,
          "shooting": 63,
          "passing": 61,
          "dribbling": 64,
          "defending": 42,
          "physical": 63
        }
      },
      {
        "name": "Harry Tyrer",
        "age": 24,
        "overall": 64,
        "potential": 66,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 2511886,
        "country": "England",
        "attributes": {
          "pace": 65,
          "shooting": 61,
          "passing": 62,
          "dribbling": 65,
          "defending": 16,
          "physical": 62
        }
      }
    ]
  },
  {
    "name": "West Ham United",
    "domesticLeague": "Premier League",
    "country": "Inglaterra",
    "overall": 79,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Jarrod Bowen",
        "age": 29,
        "overall": 83,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 199526231,
        "country": "England",
        "attributes": {
          "pace": 76,
          "shooting": 81,
          "passing": 78,
          "dribbling": 82,
          "defending": 46,
          "physical": 70
        }
      },
      {
        "name": "Lucas Paquetá",
        "age": 28,
        "overall": 80,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 100000000,
        "country": "Brazil",
        "attributes": {
          "pace": 68,
          "shooting": 78,
          "passing": 78,
          "dribbling": 84,
          "defending": 69,
          "physical": 75
        }
      },
      {
        "name": "Aaron Wan-Bissaka",
        "age": 28,
        "overall": 80,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 100000000,
        "country": "Congo DR",
        "attributes": {
          "pace": 80,
          "shooting": 51,
          "passing": 69,
          "dribbling": 77,
          "defending": 78,
          "physical": 73
        }
      },
      {
        "name": "Niclas Füllkrug",
        "age": 33,
        "overall": 79,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 47659694,
        "country": "Germany",
        "attributes": {
          "pace": 57,
          "shooting": 82,
          "passing": 71,
          "dribbling": 73,
          "defending": 43,
          "physical": 77
        }
      },
      {
        "name": "Tomáš Souček",
        "age": 31,
        "overall": 78,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 37857441,
        "country": "Czech Republic",
        "attributes": {
          "pace": 45,
          "shooting": 72,
          "passing": 71,
          "dribbling": 68,
          "defending": 78,
          "physical": 82
        }
      },
      {
        "name": "Jean-Clair Todibo",
        "age": 26,
        "overall": 78,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 63095734,
        "country": "France",
        "attributes": {
          "pace": 75,
          "shooting": 47,
          "passing": 63,
          "dribbling": 69,
          "defending": 79,
          "physical": 73
        }
      },
      {
        "name": "Callum Wilson",
        "age": 34,
        "overall": 78,
        "potential": 82,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 37857441,
        "country": "England",
        "attributes": {
          "pace": 73,
          "shooting": 79,
          "passing": 67,
          "dribbling": 76,
          "defending": 42,
          "physical": 65
        }
      },
      {
        "name": "Alphonse Areola",
        "age": 33,
        "overall": 77,
        "potential": 78,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 30071234,
        "country": "France",
        "attributes": {
          "pace": 78,
          "shooting": 75,
          "passing": 74,
          "dribbling": 78,
          "defending": 55,
          "physical": 76
        }
      },
      {
        "name": "James Ward-Prowse",
        "age": 31,
        "overall": 77,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 30071234,
        "country": "England",
        "attributes": {
          "pace": 42,
          "shooting": 74,
          "passing": 83,
          "dribbling": 74,
          "defending": 66,
          "physical": 64
        }
      },
      {
        "name": "Guido Rodríguez",
        "age": 31,
        "overall": 77,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 30071234,
        "country": "Argentina",
        "attributes": {
          "pace": 45,
          "shooting": 58,
          "passing": 70,
          "dribbling": 69,
          "defending": 77,
          "physical": 75
        }
      },
      {
        "name": "Maximilian Kilman",
        "age": 28,
        "overall": 77,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 50118723,
        "country": "England",
        "attributes": {
          "pace": 60,
          "shooting": 42,
          "passing": 66,
          "dribbling": 64,
          "defending": 77,
          "physical": 79
        }
      },
      {
        "name": "Mads Hermansen",
        "age": 25,
        "overall": 76,
        "potential": 80,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 39810717,
        "country": "Denmark",
        "attributes": {
          "pace": 76,
          "shooting": 75,
          "passing": 76,
          "dribbling": 77,
          "defending": 50,
          "physical": 76
        }
      },
      {
        "name": "Mateus Fernandes",
        "age": 21,
        "overall": 76,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 59716076,
        "country": "Portugal",
        "attributes": {
          "pace": 70,
          "shooting": 69,
          "passing": 74,
          "dribbling": 79,
          "defending": 59,
          "physical": 66
        }
      },
      {
        "name": "Konstantinos Mavropanos",
        "age": 28,
        "overall": 76,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 39810717,
        "country": "Greece",
        "attributes": {
          "pace": 71,
          "shooting": 56,
          "passing": 54,
          "dribbling": 59,
          "defending": 77,
          "physical": 79
        }
      },
      {
        "name": "Crysencio Summerville",
        "age": 24,
        "overall": 76,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 39810717,
        "country": "Holland",
        "attributes": {
          "pace": 89,
          "shooting": 71,
          "passing": 67,
          "dribbling": 80,
          "defending": 35,
          "physical": 54
        }
      },
      {
        "name": "Igor",
        "age": 28,
        "overall": 76,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 39810717,
        "country": "Brazil",
        "attributes": {
          "pace": 64,
          "shooting": 37,
          "passing": 57,
          "dribbling": 58,
          "defending": 75,
          "physical": 83
        }
      },
      {
        "name": "El Hadji Malick Diouf",
        "age": 21,
        "overall": 75,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 47434165,
        "country": "Senegal",
        "attributes": {
          "pace": 80,
          "shooting": 67,
          "passing": 68,
          "dribbling": 74,
          "defending": 70,
          "physical": 77
        }
      },
      {
        "name": "Kyle Walker-Peters",
        "age": 28,
        "overall": 75,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 31622777,
        "country": "England",
        "attributes": {
          "pace": 76,
          "shooting": 47,
          "passing": 68,
          "dribbling": 76,
          "defending": 71,
          "physical": 64
        }
      },
      {
        "name": "Soungoutou Magassa",
        "age": 22,
        "overall": 73,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 29928935,
        "country": "France",
        "attributes": {
          "pace": 54,
          "shooting": 49,
          "passing": 66,
          "dribbling": 64,
          "defending": 72,
          "physical": 74
        }
      },
      {
        "name": "Luis Guilherme",
        "age": 20,
        "overall": 71,
        "potential": 71,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 18883881,
        "country": "Brazil",
        "attributes": {
          "pace": 76,
          "shooting": 62,
          "passing": 64,
          "dribbling": 75,
          "defending": 33,
          "physical": 58
        }
      },
      {
        "name": "Andy Irving",
        "age": 25,
        "overall": 70,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 10000000,
        "country": "Scotland",
        "attributes": {
          "pace": 54,
          "shooting": 71,
          "passing": 71,
          "dribbling": 71,
          "defending": 63,
          "physical": 71
        }
      },
      {
        "name": "Freddie Potts",
        "age": 22,
        "overall": 70,
        "potential": 72,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 15000000,
        "country": "England",
        "attributes": {
          "pace": 66,
          "shooting": 55,
          "passing": 69,
          "dribbling": 70,
          "defending": 66,
          "physical": 71
        }
      },
      {
        "name": "Oliver Scarles",
        "age": 20,
        "overall": 70,
        "potential": 72,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 15000000,
        "country": "England",
        "attributes": {
          "pace": 72,
          "shooting": 48,
          "passing": 64,
          "dribbling": 67,
          "defending": 67,
          "physical": 64
        }
      },
      {
        "name": "George Earthy",
        "age": 21,
        "overall": 67,
        "potential": 69,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 7517809,
        "country": "England",
        "attributes": {
          "pace": 68,
          "shooting": 60,
          "passing": 64,
          "dribbling": 68,
          "defending": 44,
          "physical": 56
        }
      },
      {
        "name": "Callum Marshall",
        "age": 21,
        "overall": 66,
        "potential": 68,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 5971608,
        "country": "Northern Ireland",
        "attributes": {
          "pace": 69,
          "shooting": 66,
          "passing": 55,
          "dribbling": 64,
          "defending": 42,
          "physical": 76
        }
      },
      {
        "name": "Krisztián Hegyi",
        "age": 23,
        "overall": 59,
        "potential": 61,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 794328,
        "country": "Hungary",
        "attributes": {
          "pace": 60,
          "shooting": 57,
          "passing": 58,
          "dribbling": 60,
          "defending": 25,
          "physical": 58
        }
      }
    ]
  },
  {
    "name": "Juventus",
    "domesticLeague": "Serie A",
    "country": "Italia",
    "overall": 82,
    "budget": 100000000,
    "primaryColor": "#0284c7",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Bremer",
        "age": 29,
        "overall": 85,
        "potential": 86,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 316227766,
        "country": "Brazil",
        "attributes": {
          "pace": 82,
          "shooting": 50,
          "passing": 58,
          "dribbling": 66,
          "defending": 86,
          "physical": 80
        }
      },
      {
        "name": "Manuel Locatelli",
        "age": 28,
        "overall": 84,
        "potential": 87,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 251188643,
        "country": "Italy",
        "attributes": {
          "pace": 63,
          "shooting": 69,
          "passing": 80,
          "dribbling": 76,
          "defending": 81,
          "physical": 78
        }
      },
      {
        "name": "Loïs Openda",
        "age": 26,
        "overall": 83,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 199526231,
        "country": "Belgium",
        "attributes": {
          "pace": 95,
          "shooting": 81,
          "passing": 69,
          "dribbling": 81,
          "defending": 31,
          "physical": 80
        }
      },
      {
        "name": "Jonathan David",
        "age": 26,
        "overall": 82,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 158489319,
        "country": "Canada",
        "attributes": {
          "pace": 81,
          "shooting": 82,
          "passing": 71,
          "dribbling": 80,
          "defending": 34,
          "physical": 78
        }
      },
      {
        "name": "Dušan Vlahović",
        "age": 26,
        "overall": 82,
        "potential": 86,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 158489319,
        "country": "Serbia",
        "attributes": {
          "pace": 78,
          "shooting": 84,
          "passing": 69,
          "dribbling": 77,
          "defending": 29,
          "physical": 82
        }
      },
      {
        "name": "Khéphren Thuram",
        "age": 25,
        "overall": 81,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 125892541,
        "country": "France",
        "attributes": {
          "pace": 78,
          "shooting": 76,
          "passing": 77,
          "dribbling": 80,
          "defending": 81,
          "physical": 81
        }
      },
      {
        "name": "Filip Kostić",
        "age": 33,
        "overall": 81,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 75535525,
        "country": "Serbia",
        "attributes": {
          "pace": 82,
          "shooting": 76,
          "passing": 81,
          "dribbling": 80,
          "defending": 70,
          "physical": 77
        }
      },
      {
        "name": "Michele Di Gregorio",
        "age": 28,
        "overall": 81,
        "potential": 83,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 125892541,
        "country": "Italy",
        "attributes": {
          "pace": 82,
          "shooting": 78,
          "passing": 79,
          "dribbling": 85,
          "defending": 56,
          "physical": 83
        }
      },
      {
        "name": "Teun Koopmeiners",
        "age": 28,
        "overall": 81,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 125892541,
        "country": "Holland",
        "attributes": {
          "pace": 70,
          "shooting": 79,
          "passing": 83,
          "dribbling": 78,
          "defending": 75,
          "physical": 75
        }
      },
      {
        "name": "Pierre Kalulu",
        "age": 25,
        "overall": 80,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 100000000,
        "country": "France",
        "attributes": {
          "pace": 80,
          "shooting": 53,
          "passing": 68,
          "dribbling": 70,
          "defending": 81,
          "physical": 76
        }
      },
      {
        "name": "Federico Gatti",
        "age": 27,
        "overall": 80,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 100000000,
        "country": "Italy",
        "attributes": {
          "pace": 76,
          "shooting": 42,
          "passing": 53,
          "dribbling": 65,
          "defending": 81,
          "physical": 80
        }
      },
      {
        "name": "Andrea Cambiaso",
        "age": 26,
        "overall": 79,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 79432823,
        "country": "Italy",
        "attributes": {
          "pace": 78,
          "shooting": 70,
          "passing": 77,
          "dribbling": 79,
          "defending": 75,
          "physical": 70
        }
      },
      {
        "name": "Kenan Yıldız",
        "age": 20,
        "overall": 79,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 119149235,
        "country": "Turkey",
        "attributes": {
          "pace": 84,
          "shooting": 78,
          "passing": 74,
          "dribbling": 83,
          "defending": 35,
          "physical": 66
        }
      },
      {
        "name": "Edon Zhegrova",
        "age": 27,
        "overall": 79,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 79432823,
        "country": "Kosovo",
        "attributes": {
          "pace": 84,
          "shooting": 71,
          "passing": 76,
          "dribbling": 85,
          "defending": 25,
          "physical": 62
        }
      },
      {
        "name": "Francisco Conceição",
        "age": 23,
        "overall": 79,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 79432823,
        "country": "Portugal",
        "attributes": {
          "pace": 87,
          "shooting": 68,
          "passing": 73,
          "dribbling": 85,
          "defending": 36,
          "physical": 50
        }
      },
      {
        "name": "Arkadiusz Milik",
        "age": 32,
        "overall": 79,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 47659694,
        "country": "Poland",
        "attributes": {
          "pace": 50,
          "shooting": 82,
          "passing": 72,
          "dribbling": 77,
          "defending": 40,
          "physical": 67
        }
      },
      {
        "name": "Weston McKennie",
        "age": 27,
        "overall": 78,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 63095734,
        "country": "United States",
        "attributes": {
          "pace": 77,
          "shooting": 71,
          "passing": 77,
          "dribbling": 77,
          "defending": 80,
          "physical": 80
        }
      },
      {
        "name": "Mattia Perin",
        "age": 33,
        "overall": 78,
        "potential": 79,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 37857441,
        "country": "Italy",
        "attributes": {
          "pace": 78,
          "shooting": 78,
          "passing": 71,
          "dribbling": 78,
          "defending": 57,
          "physical": 79
        }
      },
      {
        "name": "João Mário",
        "age": 26,
        "overall": 77,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 50118723,
        "country": "Portugal",
        "attributes": {
          "pace": 84,
          "shooting": 63,
          "passing": 71,
          "dribbling": 77,
          "defending": 69,
          "physical": 67
        }
      },
      {
        "name": "Daniele Rugani",
        "age": 31,
        "overall": 75,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 18973666,
        "country": "Italy",
        "attributes": {
          "pace": 34,
          "shooting": 40,
          "passing": 54,
          "dribbling": 60,
          "defending": 78,
          "physical": 70
        }
      },
      {
        "name": "Fabio Miretti",
        "age": 22,
        "overall": 74,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 37678296,
        "country": "Italy",
        "attributes": {
          "pace": 73,
          "shooting": 60,
          "passing": 75,
          "dribbling": 76,
          "defending": 66,
          "physical": 68
        }
      },
      {
        "name": "Lloyd Kelly",
        "age": 27,
        "overall": 74,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 25118864,
        "country": "England",
        "attributes": {
          "pace": 67,
          "shooting": 40,
          "passing": 65,
          "dribbling": 67,
          "defending": 73,
          "physical": 79
        }
      },
      {
        "name": "Juan David Cabal",
        "age": 25,
        "overall": 74,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 25118864,
        "country": "Colombia",
        "attributes": {
          "pace": 72,
          "shooting": 38,
          "passing": 69,
          "dribbling": 65,
          "defending": 74,
          "physical": 69
        }
      },
      {
        "name": "Carlo Pinsoglio",
        "age": 36,
        "overall": 69,
        "potential": 70,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 4765969,
        "country": "Italy",
        "attributes": {
          "pace": 70,
          "shooting": 70,
          "passing": 62,
          "dribbling": 70,
          "defending": 42,
          "physical": 69
        }
      },
      {
        "name": "Jonas Rouhi",
        "age": 22,
        "overall": 66,
        "potential": 70,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 5971608,
        "country": "Sweden",
        "attributes": {
          "pace": 64,
          "shooting": 43,
          "passing": 59,
          "dribbling": 63,
          "defending": 66,
          "physical": 53
        }
      },
      {
        "name": "Vasilije Adžić",
        "age": 19,
        "overall": 62,
        "potential": 65,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 2377340,
        "country": "Montenegro",
        "attributes": {
          "pace": 67,
          "shooting": 55,
          "passing": 54,
          "dribbling": 66,
          "defending": 35,
          "physical": 51
        }
      }
    ]
  },
  {
    "name": "Fiorentina",
    "domesticLeague": "Serie A",
    "country": "Italia",
    "overall": 79,
    "budget": 100000000,
    "primaryColor": "#0284c7",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "De Gea",
        "age": 35,
        "overall": 85,
        "potential": 86,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 189736660,
        "country": "Spain",
        "attributes": {
          "pace": 85,
          "shooting": 78,
          "passing": 71,
          "dribbling": 87,
          "defending": 46,
          "physical": 84
        }
      },
      {
        "name": "Moise Kean",
        "age": 26,
        "overall": 83,
        "potential": 85,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 199526231,
        "country": "Italy",
        "attributes": {
          "pace": 86,
          "shooting": 82,
          "passing": 58,
          "dribbling": 81,
          "defending": 40,
          "physical": 74
        }
      },
      {
        "name": "Edin Džeko",
        "age": 40,
        "overall": 81,
        "potential": 84,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 75535525,
        "country": "Bosnia and Herzegovina",
        "attributes": {
          "pace": 55,
          "shooting": 82,
          "passing": 74,
          "dribbling": 77,
          "defending": 40,
          "physical": 72
        }
      },
      {
        "name": "Robin Gosens",
        "age": 31,
        "overall": 80,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 60000000,
        "country": "Germany",
        "attributes": {
          "pace": 72,
          "shooting": 74,
          "passing": 73,
          "dribbling": 76,
          "defending": 77,
          "physical": 77
        }
      },
      {
        "name": "Albert Guðmundsson",
        "age": 28,
        "overall": 79,
        "potential": 79,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 79432823,
        "country": "Iceland",
        "attributes": {
          "pace": 87,
          "shooting": 79,
          "passing": 70,
          "dribbling": 83,
          "defending": 37,
          "physical": 69
        }
      },
      {
        "name": "Dodô",
        "age": 27,
        "overall": 78,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 63095734,
        "country": "Brazil",
        "attributes": {
          "pace": 86,
          "shooting": 59,
          "passing": 74,
          "dribbling": 79,
          "defending": 72,
          "physical": 69
        }
      },
      {
        "name": "Nicolò Fagioli",
        "age": 25,
        "overall": 77,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 50118723,
        "country": "Italy",
        "attributes": {
          "pace": 74,
          "shooting": 65,
          "passing": 78,
          "dribbling": 79,
          "defending": 70,
          "physical": 63
        }
      },
      {
        "name": "Rolando Mandragora",
        "age": 28,
        "overall": 77,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 50118723,
        "country": "Italy",
        "attributes": {
          "pace": 46,
          "shooting": 73,
          "passing": 76,
          "dribbling": 75,
          "defending": 75,
          "physical": 70
        }
      },
      {
        "name": "Luca Ranieri",
        "age": 26,
        "overall": 76,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 39810717,
        "country": "Italy",
        "attributes": {
          "pace": 68,
          "shooting": 41,
          "passing": 59,
          "dribbling": 69,
          "defending": 79,
          "physical": 66
        }
      },
      {
        "name": "Fabiano Parisi",
        "age": 25,
        "overall": 75,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 31622777,
        "country": "Italy",
        "attributes": {
          "pace": 75,
          "shooting": 67,
          "passing": 70,
          "dribbling": 76,
          "defending": 72,
          "physical": 67
        }
      },
      {
        "name": "Hans Nicolussi Caviglia",
        "age": 25,
        "overall": 75,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 31622777,
        "country": "Italy",
        "attributes": {
          "pace": 66,
          "shooting": 68,
          "passing": 77,
          "dribbling": 75,
          "defending": 69,
          "physical": 70
        }
      },
      {
        "name": "Roberto Piccoli",
        "age": 25,
        "overall": 75,
        "potential": 79,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 31622777,
        "country": "Italy",
        "attributes": {
          "pace": 73,
          "shooting": 75,
          "passing": 55,
          "dribbling": 67,
          "defending": 34,
          "physical": 79
        }
      },
      {
        "name": "Simon Sohm",
        "age": 24,
        "overall": 74,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 25118864,
        "country": "Switzerland",
        "attributes": {
          "pace": 75,
          "shooting": 69,
          "passing": 70,
          "dribbling": 71,
          "defending": 70,
          "physical": 80
        }
      },
      {
        "name": "Marin Pongračić",
        "age": 28,
        "overall": 74,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 25118864,
        "country": "Croatia",
        "attributes": {
          "pace": 61,
          "shooting": 26,
          "passing": 52,
          "dribbling": 62,
          "defending": 74,
          "physical": 76
        }
      },
      {
        "name": "Pablo Marí",
        "age": 32,
        "overall": 74,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 15071319,
        "country": "Spain",
        "attributes": {
          "pace": 52,
          "shooting": 40,
          "passing": 49,
          "dribbling": 53,
          "defending": 76,
          "physical": 74
        }
      },
      {
        "name": "Pietro Comuzzo",
        "age": 21,
        "overall": 74,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 37678296,
        "country": "Italy",
        "attributes": {
          "pace": 57,
          "shooting": 27,
          "passing": 50,
          "dribbling": 57,
          "defending": 77,
          "physical": 68
        }
      },
      {
        "name": "Abdelhamid Sabiri",
        "age": 29,
        "overall": 73,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 19952623,
        "country": "Morocco",
        "attributes": {
          "pace": 59,
          "shooting": 71,
          "passing": 71,
          "dribbling": 75,
          "defending": 59,
          "physical": 74
        }
      },
      {
        "name": "Tariq Lamptey",
        "age": 25,
        "overall": 73,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 19952623,
        "country": "Ghana",
        "attributes": {
          "pace": 84,
          "shooting": 44,
          "passing": 66,
          "dribbling": 76,
          "defending": 69,
          "physical": 49
        }
      },
      {
        "name": "Amir Richardson",
        "age": 24,
        "overall": 72,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 15848932,
        "country": "Morocco",
        "attributes": {
          "pace": 73,
          "shooting": 64,
          "passing": 68,
          "dribbling": 72,
          "defending": 67,
          "physical": 70
        }
      },
      {
        "name": "Jacopo Fazzini",
        "age": 23,
        "overall": 72,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 15848932,
        "country": "Italy",
        "attributes": {
          "pace": 68,
          "shooting": 68,
          "passing": 71,
          "dribbling": 75,
          "defending": 60,
          "physical": 61
        }
      },
      {
        "name": "Mattia Viti",
        "age": 24,
        "overall": 72,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 15848932,
        "country": "Italy",
        "attributes": {
          "pace": 66,
          "shooting": 35,
          "passing": 50,
          "dribbling": 53,
          "defending": 74,
          "physical": 69
        }
      },
      {
        "name": "Cher Ndour",
        "age": 21,
        "overall": 70,
        "potential": 73,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 15000000,
        "country": "Italy",
        "attributes": {
          "pace": 55,
          "shooting": 62,
          "passing": 69,
          "dribbling": 71,
          "defending": 58,
          "physical": 69
        }
      },
      {
        "name": "Luca Lezzerini",
        "age": 31,
        "overall": 69,
        "potential": 69,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 4765969,
        "country": "Italy",
        "attributes": {
          "pace": 70,
          "shooting": 67,
          "passing": 62,
          "dribbling": 71,
          "defending": 48,
          "physical": 70
        }
      },
      {
        "name": "Tommaso Martinelli",
        "age": 20,
        "overall": 68,
        "potential": 71,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 9464360,
        "country": "Italy",
        "attributes": {
          "pace": 69,
          "shooting": 67,
          "passing": 64,
          "dribbling": 70,
          "defending": 23,
          "physical": 69
        }
      },
      {
        "name": "Niccolò Fortini",
        "age": 20,
        "overall": 67,
        "potential": 70,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 7517809,
        "country": "Italy",
        "attributes": {
          "pace": 71,
          "shooting": 55,
          "passing": 62,
          "dribbling": 69,
          "defending": 56,
          "physical": 63
        }
      }
    ]
  },
  {
    "name": "Paris SG",
    "domesticLeague": "Ligue 1",
    "country": "Francia",
    "overall": 87,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Ousmane Dembélé",
        "age": 28,
        "overall": 90,
        "potential": 93,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 1000000000,
        "country": "France",
        "attributes": {
          "pace": 91,
          "shooting": 88,
          "passing": 83,
          "dribbling": 93,
          "defending": 50,
          "physical": 69
        }
      },
      {
        "name": "Achraf Hakimi",
        "age": 27,
        "overall": 89,
        "potential": 90,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 794328235,
        "country": "Morocco",
        "attributes": {
          "pace": 92,
          "shooting": 79,
          "passing": 82,
          "dribbling": 83,
          "defending": 82,
          "physical": 79
        }
      },
      {
        "name": "Vitinha",
        "age": 26,
        "overall": 89,
        "potential": 92,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 794328235,
        "country": "Portugal",
        "attributes": {
          "pace": 72,
          "shooting": 80,
          "passing": 86,
          "dribbling": 90,
          "defending": 75,
          "physical": 70
        }
      },
      {
        "name": "Khvicha Kvaratskhelia",
        "age": 25,
        "overall": 87,
        "potential": 87,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 501187234,
        "country": "Georgia",
        "attributes": {
          "pace": 86,
          "shooting": 80,
          "passing": 83,
          "dribbling": 88,
          "defending": 58,
          "physical": 78
        }
      },
      {
        "name": "Marquinhos",
        "age": 31,
        "overall": 87,
        "potential": 90,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 300712340,
        "country": "Brazil",
        "attributes": {
          "pace": 78,
          "shooting": 56,
          "passing": 75,
          "dribbling": 74,
          "defending": 89,
          "physical": 80
        }
      },
      {
        "name": "Nuno Mendes",
        "age": 23,
        "overall": 86,
        "potential": 88,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 398107171,
        "country": "Portugal",
        "attributes": {
          "pace": 95,
          "shooting": 65,
          "passing": 76,
          "dribbling": 82,
          "defending": 80,
          "physical": 77
        }
      },
      {
        "name": "Willian Pacho",
        "age": 24,
        "overall": 86,
        "potential": 88,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 398107171,
        "country": "Ecuador",
        "attributes": {
          "pace": 80,
          "shooting": 34,
          "passing": 62,
          "dribbling": 62,
          "defending": 86,
          "physical": 86
        }
      },
      {
        "name": "João Neves",
        "age": 21,
        "overall": 85,
        "potential": 88,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 474341649,
        "country": "Portugal",
        "attributes": {
          "pace": 74,
          "shooting": 69,
          "passing": 80,
          "dribbling": 84,
          "defending": 82,
          "physical": 83
        }
      },
      {
        "name": "Désiré Doué",
        "age": 20,
        "overall": 85,
        "potential": 88,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 474341649,
        "country": "France",
        "attributes": {
          "pace": 83,
          "shooting": 80,
          "passing": 77,
          "dribbling": 90,
          "defending": 55,
          "physical": 74
        }
      },
      {
        "name": "Fabián Ruiz",
        "age": 29,
        "overall": 85,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 316227766,
        "country": "Spain",
        "attributes": {
          "pace": 61,
          "shooting": 77,
          "passing": 80,
          "dribbling": 81,
          "defending": 75,
          "physical": 72
        }
      },
      {
        "name": "Bradley Barcola",
        "age": 23,
        "overall": 84,
        "potential": 88,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 251188643,
        "country": "France",
        "attributes": {
          "pace": 90,
          "shooting": 77,
          "passing": 78,
          "dribbling": 84,
          "defending": 39,
          "physical": 66
        }
      },
      {
        "name": "Lucas Chevalier",
        "age": 24,
        "overall": 83,
        "potential": 86,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 199526231,
        "country": "France",
        "attributes": {
          "pace": 84,
          "shooting": 79,
          "passing": 73,
          "dribbling": 86,
          "defending": 50,
          "physical": 80
        }
      },
      {
        "name": "Lucas Hernández",
        "age": 30,
        "overall": 81,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 125892541,
        "country": "France",
        "attributes": {
          "pace": 71,
          "shooting": 54,
          "passing": 72,
          "dribbling": 70,
          "defending": 82,
          "physical": 77
        }
      },
      {
        "name": "Warren Zaïre-Emery",
        "age": 20,
        "overall": 80,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 150000000,
        "country": "France",
        "attributes": {
          "pace": 79,
          "shooting": 68,
          "passing": 76,
          "dribbling": 79,
          "defending": 75,
          "physical": 79
        }
      },
      {
        "name": "Gonçalo Ramos",
        "age": 24,
        "overall": 80,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 100000000,
        "country": "Portugal",
        "attributes": {
          "pace": 73,
          "shooting": 79,
          "passing": 64,
          "dribbling": 77,
          "defending": 48,
          "physical": 79
        }
      },
      {
        "name": "Lee Kang In",
        "age": 25,
        "overall": 79,
        "potential": 82,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 79432823,
        "country": "Korea Republic",
        "attributes": {
          "pace": 72,
          "shooting": 75,
          "passing": 80,
          "dribbling": 82,
          "defending": 50,
          "physical": 64
        }
      },
      {
        "name": "Illia Zabarnyi",
        "age": 23,
        "overall": 79,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "Ukraine",
        "attributes": {
          "pace": 80,
          "shooting": 37,
          "passing": 64,
          "dribbling": 64,
          "defending": 80,
          "physical": 78
        }
      },
      {
        "name": "Matvey Safonov",
        "age": 27,
        "overall": 78,
        "potential": 78,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 63095734,
        "country": "Russia",
        "attributes": {
          "pace": 79,
          "shooting": 74,
          "passing": 75,
          "dribbling": 80,
          "defending": 44,
          "physical": 77
        }
      },
      {
        "name": "Lucas Beraldo",
        "age": 22,
        "overall": 78,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 94643602,
        "country": "Brazil",
        "attributes": {
          "pace": 66,
          "shooting": 38,
          "passing": 66,
          "dribbling": 68,
          "defending": 79,
          "physical": 75
        }
      },
      {
        "name": "Senny Mayulu",
        "age": 19,
        "overall": 75,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 47434165,
        "country": "France",
        "attributes": {
          "pace": 75,
          "shooting": 68,
          "passing": 73,
          "dribbling": 78,
          "defending": 57,
          "physical": 55
        }
      },
      {
        "name": "Ibrahim Mbaye",
        "age": 18,
        "overall": 66,
        "potential": 66,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 5971608,
        "country": "France",
        "attributes": {
          "pace": 77,
          "shooting": 59,
          "passing": 59,
          "dribbling": 70,
          "defending": 25,
          "physical": 45
        }
      },
      {
        "name": "Noham Kamara",
        "age": 19,
        "overall": 62,
        "potential": 63,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 2377340,
        "country": "France",
        "attributes": {
          "pace": 63,
          "shooting": 44,
          "passing": 56,
          "dribbling": 58,
          "defending": 63,
          "physical": 55
        }
      },
      {
        "name": "Renato Marin",
        "age": 19,
        "overall": 62,
        "potential": 62,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 2377340,
        "country": "Italy",
        "attributes": {
          "pace": 63,
          "shooting": 61,
          "passing": 65,
          "dribbling": 61,
          "defending": 24,
          "physical": 60
        }
      }
    ]
  },
  {
    "name": "Olympique de Marseille",
    "domesticLeague": "Ligue 1",
    "country": "Francia",
    "overall": 81,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Benjamin Pavard",
        "age": 30,
        "overall": 84,
        "potential": 88,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 251188643,
        "country": "France",
        "attributes": {
          "pace": 75,
          "shooting": 67,
          "passing": 76,
          "dribbling": 75,
          "defending": 86,
          "physical": 79
        }
      },
      {
        "name": "Gerónimo Rulli",
        "age": 33,
        "overall": 82,
        "potential": 83,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 95093592,
        "country": "Argentina",
        "attributes": {
          "pace": 82,
          "shooting": 77,
          "passing": 80,
          "dribbling": 83,
          "defending": 54,
          "physical": 81
        }
      },
      {
        "name": "Pierre-Emile Højbjerg",
        "age": 30,
        "overall": 82,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 158489319,
        "country": "Denmark",
        "attributes": {
          "pace": 49,
          "shooting": 73,
          "passing": 78,
          "dribbling": 74,
          "defending": 78,
          "physical": 80
        }
      },
      {
        "name": "Mason Greenwood",
        "age": 24,
        "overall": 82,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 158489319,
        "country": "England",
        "attributes": {
          "pace": 83,
          "shooting": 83,
          "passing": 77,
          "dribbling": 83,
          "defending": 37,
          "physical": 63
        }
      },
      {
        "name": "Leonardo Balerdi",
        "age": 27,
        "overall": 81,
        "potential": 85,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 125892541,
        "country": "Argentina",
        "attributes": {
          "pace": 77,
          "shooting": 46,
          "passing": 65,
          "dribbling": 69,
          "defending": 82,
          "physical": 79
        }
      },
      {
        "name": "Pierre-Emerick Aubameyang",
        "age": 36,
        "overall": 81,
        "potential": 81,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 75535525,
        "country": "Gabon",
        "attributes": {
          "pace": 82,
          "shooting": 83,
          "passing": 72,
          "dribbling": 78,
          "defending": 36,
          "physical": 63
        }
      },
      {
        "name": "Nayef Aguerd",
        "age": 30,
        "overall": 81,
        "potential": 85,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 125892541,
        "country": "Morocco",
        "attributes": {
          "pace": 72,
          "shooting": 50,
          "passing": 67,
          "dribbling": 65,
          "defending": 82,
          "physical": 77
        }
      },
      {
        "name": "Igor Paixão",
        "age": 25,
        "overall": 80,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 100000000,
        "country": "Brazil",
        "attributes": {
          "pace": 83,
          "shooting": 80,
          "passing": 75,
          "dribbling": 81,
          "defending": 32,
          "physical": 70
        }
      },
      {
        "name": "Amine Gouiri",
        "age": 26,
        "overall": 79,
        "potential": 79,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 79432823,
        "country": "Algeria",
        "attributes": {
          "pace": 77,
          "shooting": 82,
          "passing": 76,
          "dribbling": 80,
          "defending": 45,
          "physical": 71
        }
      },
      {
        "name": "Facundo Medina",
        "age": 26,
        "overall": 79,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "Argentina",
        "attributes": {
          "pace": 74,
          "shooting": 44,
          "passing": 70,
          "dribbling": 72,
          "defending": 79,
          "physical": 81
        }
      },
      {
        "name": "Matt O'Riley",
        "age": 25,
        "overall": 78,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 63095734,
        "country": "Denmark",
        "attributes": {
          "pace": 68,
          "shooting": 78,
          "passing": 79,
          "dribbling": 76,
          "defending": 67,
          "physical": 73
        }
      },
      {
        "name": "Geoffrey Kondogbia",
        "age": 33,
        "overall": 78,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 37857441,
        "country": "Central African Republic",
        "attributes": {
          "pace": 65,
          "shooting": 69,
          "passing": 73,
          "dribbling": 71,
          "defending": 78,
          "physical": 81
        }
      },
      {
        "name": "Timothy Weah",
        "age": 26,
        "overall": 77,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 50118723,
        "country": "United States",
        "attributes": {
          "pace": 87,
          "shooting": 75,
          "passing": 72,
          "dribbling": 78,
          "defending": 68,
          "physical": 65
        }
      },
      {
        "name": "Emerson",
        "age": 31,
        "overall": 77,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 30071234,
        "country": "Italy",
        "attributes": {
          "pace": 69,
          "shooting": 63,
          "passing": 75,
          "dribbling": 76,
          "defending": 74,
          "physical": 65
        }
      },
      {
        "name": "Hamed Junior Traoré",
        "age": 26,
        "overall": 77,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 50118723,
        "country": "Côte d'Ivoire",
        "attributes": {
          "pace": 78,
          "shooting": 70,
          "passing": 72,
          "dribbling": 80,
          "defending": 57,
          "physical": 61
        }
      },
      {
        "name": "Arthur Vermeeren",
        "age": 21,
        "overall": 77,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 75178085,
        "country": "Belgium",
        "attributes": {
          "pace": 70,
          "shooting": 55,
          "passing": 77,
          "dribbling": 79,
          "defending": 68,
          "physical": 66
        }
      },
      {
        "name": "Angel Gomes",
        "age": 25,
        "overall": 76,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 39810717,
        "country": "England",
        "attributes": {
          "pace": 69,
          "shooting": 70,
          "passing": 75,
          "dribbling": 79,
          "defending": 72,
          "physical": 67
        }
      },
      {
        "name": "Amir Murillo",
        "age": 30,
        "overall": 76,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 39810717,
        "country": "Panama",
        "attributes": {
          "pace": 84,
          "shooting": 57,
          "passing": 70,
          "dribbling": 71,
          "defending": 70,
          "physical": 76
        }
      },
      {
        "name": "Ulisses Garcia",
        "age": 30,
        "overall": 75,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 31622777,
        "country": "Switzerland",
        "attributes": {
          "pace": 79,
          "shooting": 49,
          "passing": 66,
          "dribbling": 71,
          "defending": 70,
          "physical": 74
        }
      },
      {
        "name": "Amine Harit",
        "age": 28,
        "overall": 75,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 31622777,
        "country": "Morocco",
        "attributes": {
          "pace": 75,
          "shooting": 64,
          "passing": 73,
          "dribbling": 79,
          "defending": 59,
          "physical": 57
        }
      },
      {
        "name": "Neal Maupay",
        "age": 29,
        "overall": 75,
        "potential": 78,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 31622777,
        "country": "France",
        "attributes": {
          "pace": 67,
          "shooting": 76,
          "passing": 68,
          "dribbling": 75,
          "defending": 42,
          "physical": 71
        }
      },
      {
        "name": "CJ Egan-Riley",
        "age": 23,
        "overall": 75,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 31622777,
        "country": "England",
        "attributes": {
          "pace": 76,
          "shooting": 32,
          "passing": 61,
          "dribbling": 67,
          "defending": 75,
          "physical": 78
        }
      },
      {
        "name": "Rubén Blanco",
        "age": 30,
        "overall": 73,
        "potential": 77,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 19952623,
        "country": "Spain",
        "attributes": {
          "pace": 76,
          "shooting": 72,
          "passing": 73,
          "dribbling": 74,
          "defending": 53,
          "physical": 70
        }
      },
      {
        "name": "Jeffrey de Lange",
        "age": 28,
        "overall": 73,
        "potential": 75,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 19952623,
        "country": "Holland",
        "attributes": {
          "pace": 73,
          "shooting": 69,
          "passing": 74,
          "dribbling": 73,
          "defending": 56,
          "physical": 73
        }
      },
      {
        "name": "Pol Lirola",
        "age": 28,
        "overall": 73,
        "potential": 76,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 19952623,
        "country": "Spain",
        "attributes": {
          "pace": 72,
          "shooting": 61,
          "passing": 69,
          "dribbling": 69,
          "defending": 69,
          "physical": 66
        }
      },
      {
        "name": "Bilal Nadir",
        "age": 22,
        "overall": 71,
        "potential": 72,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 18883881,
        "country": "Morocco",
        "attributes": {
          "pace": 56,
          "shooting": 64,
          "passing": 68,
          "dribbling": 73,
          "defending": 59,
          "physical": 65
        }
      },
      {
        "name": "François Mughe",
        "age": 21,
        "overall": 63,
        "potential": 66,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 2992893,
        "country": "Cameroon",
        "attributes": {
          "pace": 87,
          "shooting": 59,
          "passing": 56,
          "dribbling": 64,
          "defending": 35,
          "physical": 54
        }
      },
      {
        "name": "Robinio Vaz",
        "age": 19,
        "overall": 63,
        "potential": 64,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 2992893,
        "country": "France",
        "attributes": {
          "pace": 79,
          "shooting": 60,
          "passing": 54,
          "dribbling": 64,
          "defending": 28,
          "physical": 55
        }
      },
      {
        "name": "Darryl Bakola",
        "age": 18,
        "overall": 62,
        "potential": 62,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 2377340,
        "country": "France",
        "attributes": {
          "pace": 64,
          "shooting": 55,
          "passing": 59,
          "dribbling": 67,
          "defending": 51,
          "physical": 66
        }
      },
      {
        "name": "Keyliane Abdallah",
        "age": 19,
        "overall": 62,
        "potential": 62,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 2377340,
        "country": "France",
        "attributes": {
          "pace": 76,
          "shooting": 56,
          "passing": 57,
          "dribbling": 64,
          "defending": 25,
          "physical": 45
        }
      },
      {
        "name": "Yanis Sellami",
        "age": 19,
        "overall": 61,
        "potential": 61,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 1888388,
        "country": "Algeria",
        "attributes": {
          "pace": 56,
          "shooting": 51,
          "passing": 65,
          "dribbling": 66,
          "defending": 45,
          "physical": 46
        }
      },
      {
        "name": "Théo Vermot",
        "age": 29,
        "overall": 59,
        "potential": 59,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 794328,
        "country": "France",
        "attributes": {
          "pace": 62,
          "shooting": 54,
          "passing": 61,
          "dribbling": 64,
          "defending": 24,
          "physical": 56
        }
      }
    ]
  },
  {
    "name": "Olympique Lyonnais",
    "domesticLeague": "Ligue 1",
    "country": "Francia",
    "overall": 77,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Corentin Tolisso",
        "age": 31,
        "overall": 81,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 75535525,
        "country": "France",
        "attributes": {
          "pace": 68,
          "shooting": 78,
          "passing": 78,
          "dribbling": 76,
          "defending": 77,
          "physical": 79
        }
      },
      {
        "name": "Nicolás Tagliafico",
        "age": 33,
        "overall": 78,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 37857441,
        "country": "Argentina",
        "attributes": {
          "pace": 67,
          "shooting": 56,
          "passing": 70,
          "dribbling": 76,
          "defending": 77,
          "physical": 76
        }
      },
      {
        "name": "Dominik Greif",
        "age": 28,
        "overall": 78,
        "potential": 82,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 63095734,
        "country": "Slovakia",
        "attributes": {
          "pace": 77,
          "shooting": 76,
          "passing": 78,
          "dribbling": 77,
          "defending": 24,
          "physical": 77
        }
      },
      {
        "name": "Malick Fofana",
        "age": 21,
        "overall": 78,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 94643602,
        "country": "Belgium",
        "attributes": {
          "pace": 86,
          "shooting": 69,
          "passing": 70,
          "dribbling": 82,
          "defending": 40,
          "physical": 48
        }
      },
      {
        "name": "Clinton Mata",
        "age": 33,
        "overall": 77,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 30071234,
        "country": "Angola",
        "attributes": {
          "pace": 79,
          "shooting": 61,
          "passing": 68,
          "dribbling": 74,
          "defending": 77,
          "physical": 78
        }
      },
      {
        "name": "Ainsley Maitland-Niles",
        "age": 28,
        "overall": 77,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 50118723,
        "country": "England",
        "attributes": {
          "pace": 77,
          "shooting": 65,
          "passing": 73,
          "dribbling": 76,
          "defending": 72,
          "physical": 74
        }
      },
      {
        "name": "Orel Mangala",
        "age": 28,
        "overall": 77,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 50118723,
        "country": "Belgium",
        "attributes": {
          "pace": 68,
          "shooting": 58,
          "passing": 72,
          "dribbling": 79,
          "defending": 72,
          "physical": 73
        }
      },
      {
        "name": "Moussa Niakhaté",
        "age": 30,
        "overall": 77,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 50118723,
        "country": "Senegal",
        "attributes": {
          "pace": 68,
          "shooting": 48,
          "passing": 63,
          "dribbling": 64,
          "defending": 77,
          "physical": 80
        }
      },
      {
        "name": "Pavel Šulc",
        "age": 25,
        "overall": 77,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 50118723,
        "country": "Czech Republic",
        "attributes": {
          "pace": 71,
          "shooting": 73,
          "passing": 74,
          "dribbling": 77,
          "defending": 39,
          "physical": 64
        }
      },
      {
        "name": "Tanner Tessmann",
        "age": 24,
        "overall": 75,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 31622777,
        "country": "United States",
        "attributes": {
          "pace": 57,
          "shooting": 63,
          "passing": 71,
          "dribbling": 71,
          "defending": 71,
          "physical": 78
        }
      },
      {
        "name": "Ernest Nuamah",
        "age": 22,
        "overall": 75,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 47434165,
        "country": "Ghana",
        "attributes": {
          "pace": 82,
          "shooting": 70,
          "passing": 69,
          "dribbling": 78,
          "defending": 24,
          "physical": 58
        }
      },
      {
        "name": "Abner Vinícius",
        "age": 25,
        "overall": 74,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 25118864,
        "country": "Brazil",
        "attributes": {
          "pace": 79,
          "shooting": 58,
          "passing": 72,
          "dribbling": 74,
          "defending": 68,
          "physical": 65
        }
      },
      {
        "name": "Martín Satriano",
        "age": 25,
        "overall": 74,
        "potential": 76,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 25118864,
        "country": "Uruguay",
        "attributes": {
          "pace": 63,
          "shooting": 74,
          "passing": 62,
          "dribbling": 72,
          "defending": 34,
          "physical": 69
        }
      },
      {
        "name": "Rémy Descamps",
        "age": 29,
        "overall": 73,
        "potential": 77,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 19952623,
        "country": "France",
        "attributes": {
          "pace": 74,
          "shooting": 68,
          "passing": 65,
          "dribbling": 76,
          "defending": 43,
          "physical": 73
        }
      },
      {
        "name": "Tyler Morton",
        "age": 23,
        "overall": 72,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 15848932,
        "country": "England",
        "attributes": {
          "pace": 64,
          "shooting": 59,
          "passing": 74,
          "dribbling": 73,
          "defending": 66,
          "physical": 65
        }
      },
      {
        "name": "Adam Karabec",
        "age": 22,
        "overall": 71,
        "potential": 72,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 18883881,
        "country": "Czech Republic",
        "attributes": {
          "pace": 73,
          "shooting": 65,
          "passing": 69,
          "dribbling": 74,
          "defending": 34,
          "physical": 64
        }
      },
      {
        "name": "Afonso Moreira",
        "age": 21,
        "overall": 67,
        "potential": 68,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 7517809,
        "country": "Portugal",
        "attributes": {
          "pace": 81,
          "shooting": 59,
          "passing": 61,
          "dribbling": 73,
          "defending": 42,
          "physical": 52
        }
      },
      {
        "name": "Ruben Kluivert",
        "age": 24,
        "overall": 67,
        "potential": 71,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 5011872,
        "country": "Holland",
        "attributes": {
          "pace": 71,
          "shooting": 31,
          "passing": 53,
          "dribbling": 56,
          "defending": 67,
          "physical": 69
        }
      },
      {
        "name": "Achraf Laâziri",
        "age": 22,
        "overall": 65,
        "potential": 66,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 4743416,
        "country": "Morocco",
        "attributes": {
          "pace": 74,
          "shooting": 48,
          "passing": 61,
          "dribbling": 66,
          "defending": 58,
          "physical": 55
        }
      },
      {
        "name": "Lassine Diarra",
        "age": 23,
        "overall": 64,
        "potential": 65,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 2511886,
        "country": "Mali",
        "attributes": {
          "pace": 65,
          "shooting": 60,
          "passing": 58,
          "dribbling": 66,
          "defending": 34,
          "physical": 63
        }
      },
      {
        "name": "Khalis Merah",
        "age": 19,
        "overall": 64,
        "potential": 67,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 3767830,
        "country": "France",
        "attributes": {
          "pace": 63,
          "shooting": 51,
          "passing": 65,
          "dribbling": 71,
          "defending": 53,
          "physical": 42
        }
      },
      {
        "name": "Enzo Molebe",
        "age": 18,
        "overall": 64,
        "potential": 64,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 3767830,
        "country": "France",
        "attributes": {
          "pace": 78,
          "shooting": 63,
          "passing": 50,
          "dribbling": 71,
          "defending": 19,
          "physical": 60
        }
      },
      {
        "name": "Alejandro Gomes Rodríguez",
        "age": 18,
        "overall": 62,
        "potential": 65,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 2377340,
        "country": "England",
        "attributes": {
          "pace": 70,
          "shooting": 60,
          "passing": 44,
          "dribbling": 63,
          "defending": 20,
          "physical": 57
        }
      }
    ]
  },
  {
    "name": "AS Monaco",
    "domesticLeague": "Ligue 1",
    "country": "Francia",
    "overall": 79,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Denis Zakaria",
        "age": 29,
        "overall": 82,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 158489319,
        "country": "Switzerland",
        "attributes": {
          "pace": 80,
          "shooting": 67,
          "passing": 74,
          "dribbling": 77,
          "defending": 80,
          "physical": 85
        }
      },
      {
        "name": "Lukáš Hrádecký",
        "age": 36,
        "overall": 81,
        "potential": 83,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 75535525,
        "country": "Finland",
        "attributes": {
          "pace": 83,
          "shooting": 79,
          "passing": 64,
          "dribbling": 83,
          "defending": 40,
          "physical": 81
        }
      },
      {
        "name": "Maghnes Akliouche",
        "age": 24,
        "overall": 80,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 100000000,
        "country": "France",
        "attributes": {
          "pace": 74,
          "shooting": 70,
          "passing": 78,
          "dribbling": 83,
          "defending": 48,
          "physical": 62
        }
      },
      {
        "name": "Paul Pogba",
        "age": 33,
        "overall": 79,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 47659694,
        "country": "France",
        "attributes": {
          "pace": 64,
          "shooting": 76,
          "passing": 81,
          "dribbling": 83,
          "defending": 60,
          "physical": 78
        }
      },
      {
        "name": "Alexandr Golovin",
        "age": 29,
        "overall": 79,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 79432823,
        "country": "Russia",
        "attributes": {
          "pace": 73,
          "shooting": 76,
          "passing": 79,
          "dribbling": 82,
          "defending": 61,
          "physical": 66
        }
      },
      {
        "name": "Eric Dier",
        "age": 32,
        "overall": 79,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 47659694,
        "country": "England",
        "attributes": {
          "pace": 54,
          "shooting": 62,
          "passing": 67,
          "dribbling": 62,
          "defending": 80,
          "physical": 82
        }
      },
      {
        "name": "Thilo Kehrer",
        "age": 29,
        "overall": 79,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 79432823,
        "country": "Germany",
        "attributes": {
          "pace": 69,
          "shooting": 44,
          "passing": 66,
          "dribbling": 66,
          "defending": 80,
          "physical": 77
        }
      },
      {
        "name": "Takumi Minamino",
        "age": 31,
        "overall": 78,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 37857441,
        "country": "Japan",
        "attributes": {
          "pace": 77,
          "shooting": 74,
          "passing": 75,
          "dribbling": 81,
          "defending": 40,
          "physical": 64
        }
      },
      {
        "name": "Mika Biereth",
        "age": 23,
        "overall": 78,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 63095734,
        "country": "Denmark",
        "attributes": {
          "pace": 75,
          "shooting": 78,
          "passing": 63,
          "dribbling": 72,
          "defending": 31,
          "physical": 76
        }
      },
      {
        "name": "Lamine Camara",
        "age": 22,
        "overall": 77,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 75178085,
        "country": "Senegal",
        "attributes": {
          "pace": 79,
          "shooting": 66,
          "passing": 78,
          "dribbling": 77,
          "defending": 71,
          "physical": 69
        }
      },
      {
        "name": "Vanderson",
        "age": 24,
        "overall": 77,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 50118723,
        "country": "Brazil",
        "attributes": {
          "pace": 78,
          "shooting": 62,
          "passing": 74,
          "dribbling": 77,
          "defending": 72,
          "physical": 71
        }
      },
      {
        "name": "Caio Henrique",
        "age": 28,
        "overall": 77,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 50118723,
        "country": "Brazil",
        "attributes": {
          "pace": 78,
          "shooting": 58,
          "passing": 77,
          "dribbling": 77,
          "defending": 72,
          "physical": 66
        }
      },
      {
        "name": "Philipp Köhn",
        "age": 28,
        "overall": 77,
        "potential": 79,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 50118723,
        "country": "Switzerland",
        "attributes": {
          "pace": 78,
          "shooting": 74,
          "passing": 69,
          "dribbling": 78,
          "defending": 46,
          "physical": 75
        }
      },
      {
        "name": "Folarin Balogun",
        "age": 24,
        "overall": 77,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 50118723,
        "country": "United States",
        "attributes": {
          "pace": 84,
          "shooting": 77,
          "passing": 62,
          "dribbling": 77,
          "defending": 23,
          "physical": 68
        }
      },
      {
        "name": "Jordan Teze",
        "age": 26,
        "overall": 76,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 39810717,
        "country": "Holland",
        "attributes": {
          "pace": 77,
          "shooting": 49,
          "passing": 69,
          "dribbling": 69,
          "defending": 76,
          "physical": 77
        }
      },
      {
        "name": "Mohammed Salisu",
        "age": 26,
        "overall": 76,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 39810717,
        "country": "Ghana",
        "attributes": {
          "pace": 59,
          "shooting": 36,
          "passing": 50,
          "dribbling": 54,
          "defending": 77,
          "physical": 80
        }
      },
      {
        "name": "Ansu Fati",
        "age": 23,
        "overall": 75,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 31622777,
        "country": "Spain",
        "attributes": {
          "pace": 81,
          "shooting": 72,
          "passing": 72,
          "dribbling": 78,
          "defending": 30,
          "physical": 53
        }
      },
      {
        "name": "Christian Mawissa",
        "age": 20,
        "overall": 75,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 47434165,
        "country": "France",
        "attributes": {
          "pace": 79,
          "shooting": 31,
          "passing": 57,
          "dribbling": 64,
          "defending": 75,
          "physical": 74
        }
      },
      {
        "name": "Krépin Diatta",
        "age": 27,
        "overall": 74,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 25118864,
        "country": "Senegal",
        "attributes": {
          "pace": 88,
          "shooting": 69,
          "passing": 67,
          "dribbling": 76,
          "defending": 57,
          "physical": 67
        }
      },
      {
        "name": "Kassoum Ouattara",
        "age": 21,
        "overall": 72,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 23773398,
        "country": "France",
        "attributes": {
          "pace": 77,
          "shooting": 44,
          "passing": 65,
          "dribbling": 69,
          "defending": 66,
          "physical": 68
        }
      },
      {
        "name": "George Ilenikhena",
        "age": 19,
        "overall": 72,
        "potential": 75,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 23773398,
        "country": "Nigeria",
        "attributes": {
          "pace": 79,
          "shooting": 71,
          "passing": 56,
          "dribbling": 71,
          "defending": 26,
          "physical": 62
        }
      },
      {
        "name": "Stanis Idumbo",
        "age": 20,
        "overall": 67,
        "potential": 69,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 7517809,
        "country": "Belgium",
        "attributes": {
          "pace": 78,
          "shooting": 61,
          "passing": 61,
          "dribbling": 69,
          "defending": 27,
          "physical": 56
        }
      },
      {
        "name": "Paris Brunner",
        "age": 20,
        "overall": 66,
        "potential": 68,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 5971608,
        "country": "Germany",
        "attributes": {
          "pace": 67,
          "shooting": 67,
          "passing": 54,
          "dribbling": 68,
          "defending": 27,
          "physical": 59
        }
      },
      {
        "name": "Yann Lienard",
        "age": 23,
        "overall": 65,
        "potential": 65,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 3162278,
        "country": "France",
        "attributes": {
          "pace": 65,
          "shooting": 61,
          "passing": 60,
          "dribbling": 66,
          "defending": 23,
          "physical": 63
        }
      },
      {
        "name": "Mamadou Coulibaly",
        "age": 21,
        "overall": 64,
        "potential": 66,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 3767830,
        "country": "France",
        "attributes": {
          "pace": 59,
          "shooting": 53,
          "passing": 61,
          "dribbling": 64,
          "defending": 59,
          "physical": 54
        }
      },
      {
        "name": "Lucas Michal",
        "age": 20,
        "overall": 64,
        "potential": 64,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 3767830,
        "country": "France",
        "attributes": {
          "pace": 74,
          "shooting": 58,
          "passing": 58,
          "dribbling": 68,
          "defending": 23,
          "physical": 37
        }
      },
      {
        "name": "Aladji Bamba",
        "age": 19,
        "overall": 63,
        "potential": 66,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 2992893,
        "country": "France",
        "attributes": {
          "pace": 60,
          "shooting": 53,
          "passing": 59,
          "dribbling": 59,
          "defending": 59,
          "physical": 66
        }
      }
    ]
  },
  {
    "name": "LOSC Lille",
    "domesticLeague": "Ligue 1",
    "country": "Francia",
    "overall": 77,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Benjamin André",
        "age": 35,
        "overall": 80,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 60000000,
        "country": "France",
        "attributes": {
          "pace": 55,
          "shooting": 64,
          "passing": 73,
          "dribbling": 76,
          "defending": 79,
          "physical": 83
        }
      },
      {
        "name": "Alexsandro",
        "age": 26,
        "overall": 80,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 100000000,
        "country": "Brazil",
        "attributes": {
          "pace": 66,
          "shooting": 40,
          "passing": 63,
          "dribbling": 59,
          "defending": 80,
          "physical": 81
        }
      },
      {
        "name": "Olivier Giroud",
        "age": 39,
        "overall": 79,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 47659694,
        "country": "France",
        "attributes": {
          "pace": 48,
          "shooting": 80,
          "passing": 71,
          "dribbling": 73,
          "defending": 41,
          "physical": 79
        }
      },
      {
        "name": "Hákon Arnar Haraldsson",
        "age": 22,
        "overall": 78,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 94643602,
        "country": "Iceland",
        "attributes": {
          "pace": 77,
          "shooting": 67,
          "passing": 75,
          "dribbling": 81,
          "defending": 57,
          "physical": 69
        }
      },
      {
        "name": "Tiago Santos",
        "age": 23,
        "overall": 77,
        "potential": 77,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 50118723,
        "country": "Portugal",
        "attributes": {
          "pace": 83,
          "shooting": 56,
          "passing": 71,
          "dribbling": 77,
          "defending": 71,
          "physical": 65
        }
      },
      {
        "name": "Nabil Bentaleb",
        "age": 31,
        "overall": 77,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 30071234,
        "country": "Algeria",
        "attributes": {
          "pace": 50,
          "shooting": 72,
          "passing": 77,
          "dribbling": 79,
          "defending": 71,
          "physical": 73
        }
      },
      {
        "name": "Berke Özer",
        "age": 25,
        "overall": 77,
        "potential": 79,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 50118723,
        "country": "Turkey",
        "attributes": {
          "pace": 77,
          "shooting": 73,
          "passing": 70,
          "dribbling": 79,
          "defending": 44,
          "physical": 76
        }
      },
      {
        "name": "Thomas Meunier",
        "age": 34,
        "overall": 76,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 23886430,
        "country": "Belgium",
        "attributes": {
          "pace": 63,
          "shooting": 74,
          "passing": 72,
          "dribbling": 71,
          "defending": 75,
          "physical": 81
        }
      },
      {
        "name": "Osame Sahraoui",
        "age": 24,
        "overall": 76,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 39810717,
        "country": "Morocco",
        "attributes": {
          "pace": 83,
          "shooting": 63,
          "passing": 68,
          "dribbling": 82,
          "defending": 45,
          "physical": 54
        }
      },
      {
        "name": "Ayyoub Bouaddi",
        "age": 18,
        "overall": 75,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 47434165,
        "country": "France",
        "attributes": {
          "pace": 75,
          "shooting": 58,
          "passing": 72,
          "dribbling": 75,
          "defending": 67,
          "physical": 71
        }
      },
      {
        "name": "Félix Correia",
        "age": 25,
        "overall": 75,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 31622777,
        "country": "Portugal",
        "attributes": {
          "pace": 84,
          "shooting": 69,
          "passing": 68,
          "dribbling": 76,
          "defending": 42,
          "physical": 64
        }
      },
      {
        "name": "André Gomes",
        "age": 32,
        "overall": 75,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 18973666,
        "country": "Portugal",
        "attributes": {
          "pace": 41,
          "shooting": 66,
          "passing": 75,
          "dribbling": 73,
          "defending": 70,
          "physical": 74
        }
      },
      {
        "name": "Matias Fernandez-Pardo",
        "age": 21,
        "overall": 75,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 47434165,
        "country": "Spain",
        "attributes": {
          "pace": 87,
          "shooting": 71,
          "passing": 68,
          "dribbling": 76,
          "defending": 39,
          "physical": 57
        }
      },
      {
        "name": "Aïssa Mandi",
        "age": 34,
        "overall": 75,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 18973666,
        "country": "Algeria",
        "attributes": {
          "pace": 57,
          "shooting": 46,
          "passing": 71,
          "dribbling": 67,
          "defending": 75,
          "physical": 73
        }
      },
      {
        "name": "Romain Perraud",
        "age": 28,
        "overall": 74,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 25118864,
        "country": "France",
        "attributes": {
          "pace": 72,
          "shooting": 75,
          "passing": 76,
          "dribbling": 75,
          "defending": 68,
          "physical": 71
        }
      },
      {
        "name": "Ngal'ayel Mukau",
        "age": 21,
        "overall": 74,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 37678296,
        "country": "Congo DR",
        "attributes": {
          "pace": 69,
          "shooting": 57,
          "passing": 65,
          "dribbling": 71,
          "defending": 70,
          "physical": 75
        }
      },
      {
        "name": "Arnaud Bodart",
        "age": 28,
        "overall": 73,
        "potential": 76,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 19952623,
        "country": "Belgium",
        "attributes": {
          "pace": 76,
          "shooting": 70,
          "passing": 68,
          "dribbling": 73,
          "defending": 55,
          "physical": 73
        }
      },
      {
        "name": "Hamza Igamane",
        "age": 23,
        "overall": 73,
        "potential": 74,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 19952623,
        "country": "Morocco",
        "attributes": {
          "pace": 80,
          "shooting": 72,
          "passing": 63,
          "dribbling": 74,
          "defending": 34,
          "physical": 70
        }
      },
      {
        "name": "Calvin Verdonk",
        "age": 28,
        "overall": 71,
        "potential": 74,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 12589254,
        "country": "Indonesia",
        "attributes": {
          "pace": 76,
          "shooting": 58,
          "passing": 66,
          "dribbling": 66,
          "defending": 68,
          "physical": 74
        }
      },
      {
        "name": "Ugo Raghouber",
        "age": 22,
        "overall": 69,
        "potential": 70,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 11914924,
        "country": "France",
        "attributes": {
          "pace": 72,
          "shooting": 60,
          "passing": 62,
          "dribbling": 71,
          "defending": 65,
          "physical": 69
        }
      },
      {
        "name": "Ethan Mbappé",
        "age": 19,
        "overall": 69,
        "potential": 72,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 11914924,
        "country": "France",
        "attributes": {
          "pace": 73,
          "shooting": 60,
          "passing": 68,
          "dribbling": 71,
          "defending": 59,
          "physical": 54
        }
      },
      {
        "name": "Marius Broholm",
        "age": 21,
        "overall": 69,
        "potential": 70,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 11914924,
        "country": "Norway",
        "attributes": {
          "pace": 75,
          "shooting": 63,
          "passing": 64,
          "dribbling": 68,
          "defending": 49,
          "physical": 56
        }
      },
      {
        "name": "Marc-Aurèle Caillard",
        "age": 31,
        "overall": 67,
        "potential": 69,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 3007123,
        "country": "France",
        "attributes": {
          "pace": 67,
          "shooting": 66,
          "passing": 65,
          "dribbling": 68,
          "defending": 44,
          "physical": 68
        }
      },
      {
        "name": "Nathan Ngoy",
        "age": 22,
        "overall": 67,
        "potential": 67,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 7517809,
        "country": "Belgium",
        "attributes": {
          "pace": 78,
          "shooting": 44,
          "passing": 49,
          "dribbling": 67,
          "defending": 65,
          "physical": 74
        }
      },
      {
        "name": "Ousmane Touré",
        "age": 21,
        "overall": 64,
        "potential": 67,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 3767830,
        "country": "France",
        "attributes": {
          "pace": 71,
          "shooting": 26,
          "passing": 49,
          "dribbling": 57,
          "defending": 65,
          "physical": 64
        }
      },
      {
        "name": "Trévis Dago",
        "age": 21,
        "overall": 63,
        "potential": 67,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 2992893,
        "country": "France",
        "attributes": {
          "pace": 74,
          "shooting": 64,
          "passing": 46,
          "dribbling": 63,
          "defending": 18,
          "physical": 59
        }
      },
      {
        "name": "Rafael Fernandes",
        "age": 23,
        "overall": 63,
        "potential": 65,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 1995262,
        "country": "Portugal",
        "attributes": {
          "pace": 48,
          "shooting": 37,
          "passing": 49,
          "dribbling": 47,
          "defending": 63,
          "physical": 64
        }
      }
    ]
  },
  {
    "name": "Bayern München",
    "domesticLeague": "Bundesliga",
    "country": "Alemania",
    "overall": 86,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Joshua Kimmich",
        "age": 31,
        "overall": 89,
        "potential": 92,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 476596941,
        "country": "Germany",
        "attributes": {
          "pace": 72,
          "shooting": 74,
          "passing": 89,
          "dribbling": 84,
          "defending": 83,
          "physical": 79
        }
      },
      {
        "name": "Harry Kane",
        "age": 32,
        "overall": 89,
        "potential": 91,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 476596941,
        "country": "England",
        "attributes": {
          "pace": 64,
          "shooting": 92,
          "passing": 83,
          "dribbling": 82,
          "defending": 48,
          "physical": 82
        }
      },
      {
        "name": "Jamal Musiala",
        "age": 23,
        "overall": 88,
        "potential": 90,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 630957344,
        "country": "Germany",
        "attributes": {
          "pace": 80,
          "shooting": 82,
          "passing": 80,
          "dribbling": 90,
          "defending": 66,
          "physical": 65
        }
      },
      {
        "name": "Jonathan Tah",
        "age": 30,
        "overall": 87,
        "potential": 90,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 501187234,
        "country": "Germany",
        "attributes": {
          "pace": 63,
          "shooting": 38,
          "passing": 60,
          "dribbling": 63,
          "defending": 87,
          "physical": 86
        }
      },
      {
        "name": "Michael Olise",
        "age": 24,
        "overall": 86,
        "potential": 88,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 398107171,
        "country": "France",
        "attributes": {
          "pace": 78,
          "shooting": 80,
          "passing": 84,
          "dribbling": 87,
          "defending": 50,
          "physical": 66
        }
      },
      {
        "name": "Luis Díaz",
        "age": 29,
        "overall": 85,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 316227766,
        "country": "Colombia",
        "attributes": {
          "pace": 88,
          "shooting": 81,
          "passing": 76,
          "dribbling": 87,
          "defending": 45,
          "physical": 75
        }
      },
      {
        "name": "Dayot Upamecano",
        "age": 27,
        "overall": 85,
        "potential": 89,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 316227766,
        "country": "France",
        "attributes": {
          "pace": 77,
          "shooting": 45,
          "passing": 64,
          "dribbling": 73,
          "defending": 84,
          "physical": 84
        }
      },
      {
        "name": "Alphonso Davies",
        "age": 25,
        "overall": 84,
        "potential": 88,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 251188643,
        "country": "Canada",
        "attributes": {
          "pace": 94,
          "shooting": 66,
          "passing": 78,
          "dribbling": 85,
          "defending": 74,
          "physical": 76
        }
      },
      {
        "name": "Manuel Neuer",
        "age": 40,
        "overall": 84,
        "potential": 87,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 150713186,
        "country": "Germany",
        "attributes": {
          "pace": 81,
          "shooting": 81,
          "passing": 90,
          "dribbling": 81,
          "defending": 31,
          "physical": 86
        }
      },
      {
        "name": "Leon Goretzka",
        "age": 31,
        "overall": 82,
        "potential": 84,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 95093592,
        "country": "Germany",
        "attributes": {
          "pace": 77,
          "shooting": 78,
          "passing": 80,
          "dribbling": 80,
          "defending": 80,
          "physical": 82
        }
      },
      {
        "name": "Konrad Laimer",
        "age": 28,
        "overall": 82,
        "potential": 85,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 158489319,
        "country": "Austria",
        "attributes": {
          "pace": 82,
          "shooting": 69,
          "passing": 76,
          "dribbling": 75,
          "defending": 81,
          "physical": 76
        }
      },
      {
        "name": "Serge Gnabry",
        "age": 30,
        "overall": 82,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 158489319,
        "country": "Germany",
        "attributes": {
          "pace": 79,
          "shooting": 83,
          "passing": 78,
          "dribbling": 84,
          "defending": 43,
          "physical": 66
        }
      },
      {
        "name": "Kim Min Jae",
        "age": 29,
        "overall": 82,
        "potential": 86,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 158489319,
        "country": "Korea Republic",
        "attributes": {
          "pace": 73,
          "shooting": 33,
          "passing": 58,
          "dribbling": 63,
          "defending": 83,
          "physical": 84
        }
      },
      {
        "name": "Raphaël Guerreiro",
        "age": 32,
        "overall": 80,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 60000000,
        "country": "Portugal",
        "attributes": {
          "pace": 69,
          "shooting": 78,
          "passing": 85,
          "dribbling": 88,
          "defending": 74,
          "physical": 54
        }
      },
      {
        "name": "Nicolas Jackson",
        "age": 24,
        "overall": 80,
        "potential": 81,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 100000000,
        "country": "Senegal",
        "attributes": {
          "pace": 82,
          "shooting": 77,
          "passing": 69,
          "dribbling": 79,
          "defending": 40,
          "physical": 77
        }
      },
      {
        "name": "Aleksandar Pavlović",
        "age": 21,
        "overall": 79,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 119149235,
        "country": "Germany",
        "attributes": {
          "pace": 62,
          "shooting": 64,
          "passing": 79,
          "dribbling": 78,
          "defending": 76,
          "physical": 71
        }
      },
      {
        "name": "Hiroki Ito",
        "age": 26,
        "overall": 78,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 63095734,
        "country": "Japan",
        "attributes": {
          "pace": 74,
          "shooting": 57,
          "passing": 71,
          "dribbling": 72,
          "defending": 80,
          "physical": 72
        }
      },
      {
        "name": "Josip Stanišić",
        "age": 26,
        "overall": 78,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 63095734,
        "country": "Croatia",
        "attributes": {
          "pace": 73,
          "shooting": 44,
          "passing": 65,
          "dribbling": 69,
          "defending": 79,
          "physical": 74
        }
      },
      {
        "name": "Sacha Boey",
        "age": 25,
        "overall": 77,
        "potential": 81,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 50118723,
        "country": "France",
        "attributes": {
          "pace": 71,
          "shooting": 55,
          "passing": 66,
          "dribbling": 75,
          "defending": 76,
          "physical": 77
        }
      },
      {
        "name": "Tom Bischof",
        "age": 20,
        "overall": 76,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 59716076,
        "country": "Germany",
        "attributes": {
          "pace": 58,
          "shooting": 67,
          "passing": 79,
          "dribbling": 79,
          "defending": 60,
          "physical": 60
        }
      },
      {
        "name": "Jonas Urbig",
        "age": 22,
        "overall": 74,
        "potential": 76,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 37678296,
        "country": "Germany",
        "attributes": {
          "pace": 74,
          "shooting": 70,
          "passing": 79,
          "dribbling": 76,
          "defending": 32,
          "physical": 74
        }
      },
      {
        "name": "Sven Ulreich",
        "age": 37,
        "overall": 73,
        "potential": 73,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 11971574,
        "country": "Germany",
        "attributes": {
          "pace": 74,
          "shooting": 69,
          "passing": 62,
          "dribbling": 76,
          "defending": 41,
          "physical": 73
        }
      },
      {
        "name": "Lennart Karl",
        "age": 18,
        "overall": 63,
        "potential": 65,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 2992893,
        "country": "Germany",
        "attributes": {
          "pace": 69,
          "shooting": 58,
          "passing": 60,
          "dribbling": 69,
          "defending": 34,
          "physical": 37
        }
      },
      {
        "name": "David Santos Daiber",
        "age": 19,
        "overall": 59,
        "potential": 63,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 1191492,
        "country": "Portugal",
        "attributes": {
          "pace": 61,
          "shooting": 49,
          "passing": 58,
          "dribbling": 59,
          "defending": 58,
          "physical": 43
        }
      },
      {
        "name": "Leon Klanac",
        "age": 19,
        "overall": 56,
        "potential": 59,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 597161,
        "country": "Germany",
        "attributes": {
          "pace": 59,
          "shooting": 58,
          "passing": 54,
          "dribbling": 60,
          "defending": 27,
          "physical": 49
        }
      }
    ]
  },
  {
    "name": "Borussia Dortmund",
    "domesticLeague": "Bundesliga",
    "country": "Alemania",
    "overall": 83,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Serhou Guirassy",
        "age": 30,
        "overall": 87,
        "potential": 89,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 501187234,
        "country": "Guinea",
        "attributes": {
          "pace": 72,
          "shooting": 88,
          "passing": 76,
          "dribbling": 83,
          "defending": 45,
          "physical": 83
        }
      },
      {
        "name": "Gregor Kobel",
        "age": 28,
        "overall": 86,
        "potential": 87,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 398107171,
        "country": "Switzerland",
        "attributes": {
          "pace": 87,
          "shooting": 83,
          "passing": 64,
          "dribbling": 87,
          "defending": 44,
          "physical": 86
        }
      },
      {
        "name": "Nico Schlotterbeck",
        "age": 26,
        "overall": 85,
        "potential": 86,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 316227766,
        "country": "Germany",
        "attributes": {
          "pace": 74,
          "shooting": 60,
          "passing": 75,
          "dribbling": 73,
          "defending": 85,
          "physical": 82
        }
      },
      {
        "name": "Julian Brandt",
        "age": 29,
        "overall": 83,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 199526231,
        "country": "Germany",
        "attributes": {
          "pace": 74,
          "shooting": 78,
          "passing": 83,
          "dribbling": 84,
          "defending": 44,
          "physical": 70
        }
      },
      {
        "name": "Felix Nmecha",
        "age": 25,
        "overall": 82,
        "potential": 86,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 158489319,
        "country": "Germany",
        "attributes": {
          "pace": 82,
          "shooting": 74,
          "passing": 73,
          "dribbling": 81,
          "defending": 80,
          "physical": 86
        }
      },
      {
        "name": "Emre Can",
        "age": 32,
        "overall": 82,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 95093592,
        "country": "Germany",
        "attributes": {
          "pace": 77,
          "shooting": 76,
          "passing": 72,
          "dribbling": 74,
          "defending": 82,
          "physical": 84
        }
      },
      {
        "name": "Waldemar Anton",
        "age": 29,
        "overall": 82,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 158489319,
        "country": "Germany",
        "attributes": {
          "pace": 69,
          "shooting": 47,
          "passing": 67,
          "dribbling": 66,
          "defending": 84,
          "physical": 84
        }
      },
      {
        "name": "Karim Adeyemi",
        "age": 24,
        "overall": 81,
        "potential": 83,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 125892541,
        "country": "Germany",
        "attributes": {
          "pace": 96,
          "shooting": 76,
          "passing": 72,
          "dribbling": 82,
          "defending": 36,
          "physical": 69
        }
      },
      {
        "name": "Niklas Süle",
        "age": 30,
        "overall": 81,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 125892541,
        "country": "Germany",
        "attributes": {
          "pace": 61,
          "shooting": 51,
          "passing": 68,
          "dribbling": 67,
          "defending": 81,
          "physical": 79
        }
      },
      {
        "name": "Marcel Sabitzer",
        "age": 32,
        "overall": 80,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 60000000,
        "country": "Austria",
        "attributes": {
          "pace": 74,
          "shooting": 80,
          "passing": 80,
          "dribbling": 80,
          "defending": 76,
          "physical": 76
        }
      },
      {
        "name": "Pascal Groß",
        "age": 34,
        "overall": 80,
        "potential": 82,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 60000000,
        "country": "Germany",
        "attributes": {
          "pace": 48,
          "shooting": 75,
          "passing": 84,
          "dribbling": 79,
          "defending": 72,
          "physical": 76
        }
      },
      {
        "name": "Ramy Bensebaini",
        "age": 30,
        "overall": 79,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 79432823,
        "country": "Algeria",
        "attributes": {
          "pace": 73,
          "shooting": 70,
          "passing": 70,
          "dribbling": 77,
          "defending": 78,
          "physical": 79
        }
      },
      {
        "name": "Julian Ryerson",
        "age": 28,
        "overall": 79,
        "potential": 83,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 79432823,
        "country": "Norway",
        "attributes": {
          "pace": 74,
          "shooting": 63,
          "passing": 71,
          "dribbling": 76,
          "defending": 77,
          "physical": 82
        }
      },
      {
        "name": "Maximilian Beier",
        "age": 23,
        "overall": 79,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 79432823,
        "country": "Germany",
        "attributes": {
          "pace": 86,
          "shooting": 79,
          "passing": 68,
          "dribbling": 80,
          "defending": 43,
          "physical": 62
        }
      },
      {
        "name": "Fábio Silva",
        "age": 23,
        "overall": 79,
        "potential": 83,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 79432823,
        "country": "Portugal",
        "attributes": {
          "pace": 81,
          "shooting": 77,
          "passing": 64,
          "dribbling": 79,
          "defending": 32,
          "physical": 79
        }
      },
      {
        "name": "Daniel Svensson",
        "age": 24,
        "overall": 77,
        "potential": 79,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 50118723,
        "country": "Sweden",
        "attributes": {
          "pace": 77,
          "shooting": 56,
          "passing": 75,
          "dribbling": 76,
          "defending": 73,
          "physical": 74
        }
      },
      {
        "name": "Yan Couto",
        "age": 23,
        "overall": 77,
        "potential": 78,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 50118723,
        "country": "Brazil",
        "attributes": {
          "pace": 78,
          "shooting": 61,
          "passing": 77,
          "dribbling": 83,
          "defending": 69,
          "physical": 61
        }
      },
      {
        "name": "Carney Chukwuemeka",
        "age": 22,
        "overall": 76,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 59716076,
        "country": "England",
        "attributes": {
          "pace": 74,
          "shooting": 66,
          "passing": 74,
          "dribbling": 79,
          "defending": 57,
          "physical": 66
        }
      },
      {
        "name": "Salih Özcan",
        "age": 28,
        "overall": 75,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 31622777,
        "country": "Turkey",
        "attributes": {
          "pace": 70,
          "shooting": 59,
          "passing": 68,
          "dribbling": 73,
          "defending": 75,
          "physical": 79
        }
      },
      {
        "name": "Alexander Meyer",
        "age": 34,
        "overall": 75,
        "potential": 78,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 18973666,
        "country": "Germany",
        "attributes": {
          "pace": 72,
          "shooting": 71,
          "passing": 79,
          "dribbling": 76,
          "defending": 41,
          "physical": 74
        }
      },
      {
        "name": "Jobe Bellingham",
        "age": 20,
        "overall": 74,
        "potential": 75,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 37678296,
        "country": "England",
        "attributes": {
          "pace": 70,
          "shooting": 68,
          "passing": 71,
          "dribbling": 74,
          "defending": 72,
          "physical": 78
        }
      },
      {
        "name": "Julien Duranville",
        "age": 19,
        "overall": 72,
        "potential": 74,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 23773398,
        "country": "Belgium",
        "attributes": {
          "pace": 88,
          "shooting": 61,
          "passing": 63,
          "dribbling": 82,
          "defending": 26,
          "physical": 49
        }
      },
      {
        "name": "Patrick Drewes",
        "age": 33,
        "overall": 71,
        "potential": 72,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 7553552,
        "country": "Germany",
        "attributes": {
          "pace": 73,
          "shooting": 70,
          "passing": 67,
          "dribbling": 70,
          "defending": 30,
          "physical": 71
        }
      },
      {
        "name": "Aaron Anselmino",
        "age": 20,
        "overall": 70,
        "potential": 70,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 15000000,
        "country": "Argentina",
        "attributes": {
          "pace": 67,
          "shooting": 45,
          "passing": 62,
          "dribbling": 63,
          "defending": 70,
          "physical": 72
        }
      },
      {
        "name": "Cole Campbell",
        "age": 20,
        "overall": 67,
        "potential": 69,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 7517809,
        "country": "United States",
        "attributes": {
          "pace": 89,
          "shooting": 57,
          "passing": 59,
          "dribbling": 71,
          "defending": 26,
          "physical": 42
        }
      },
      {
        "name": "Almugera Kabar",
        "age": 19,
        "overall": 64,
        "potential": 67,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 3767830,
        "country": "Germany",
        "attributes": {
          "pace": 77,
          "shooting": 41,
          "passing": 60,
          "dribbling": 63,
          "defending": 58,
          "physical": 70
        }
      },
      {
        "name": "Silas Ostrzinski",
        "age": 22,
        "overall": 63,
        "potential": 65,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 2992893,
        "country": "Germany",
        "attributes": {
          "pace": 65,
          "shooting": 60,
          "passing": 59,
          "dribbling": 65,
          "defending": 29,
          "physical": 62
        }
      },
      {
        "name": "Filippo Mane",
        "age": 21,
        "overall": 62,
        "potential": 66,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 2377340,
        "country": "Italy",
        "attributes": {
          "pace": 68,
          "shooting": 25,
          "passing": 43,
          "dribbling": 55,
          "defending": 62,
          "physical": 61
        }
      }
    ]
  },
  {
    "name": "RB Leipzig",
    "domesticLeague": "Bundesliga",
    "country": "Alemania",
    "overall": 80,
    "budget": 100000000,
    "primaryColor": "#3b82f6",
    "secondaryColor": "#ffffff",
    "pattern": "solid",
    "squad": [
      {
        "name": "Péter Gulácsi",
        "age": 35,
        "overall": 85,
        "potential": 87,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 189736660,
        "country": "Hungary",
        "attributes": {
          "pace": 83,
          "shooting": 83,
          "passing": 74,
          "dribbling": 84,
          "defending": 43,
          "physical": 87
        }
      },
      {
        "name": "Willi Orban",
        "age": 33,
        "overall": 84,
        "potential": 85,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 150713186,
        "country": "Hungary",
        "attributes": {
          "pace": 57,
          "shooting": 40,
          "passing": 56,
          "dribbling": 56,
          "defending": 86,
          "physical": 83
        }
      },
      {
        "name": "David Raum",
        "age": 27,
        "overall": 82,
        "potential": 84,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 158489319,
        "country": "Germany",
        "attributes": {
          "pace": 86,
          "shooting": 61,
          "passing": 80,
          "dribbling": 79,
          "defending": 74,
          "physical": 78
        }
      },
      {
        "name": "Xaver Schlager",
        "age": 28,
        "overall": 80,
        "potential": 81,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 100000000,
        "country": "Austria",
        "attributes": {
          "pace": 69,
          "shooting": 70,
          "passing": 74,
          "dribbling": 78,
          "defending": 75,
          "physical": 78
        }
      },
      {
        "name": "Benjamin Henrichs",
        "age": 29,
        "overall": 80,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 100000000,
        "country": "Germany",
        "attributes": {
          "pace": 73,
          "shooting": 54,
          "passing": 76,
          "dribbling": 78,
          "defending": 78,
          "physical": 74
        }
      },
      {
        "name": "Castello Lukeba",
        "age": 23,
        "overall": 80,
        "potential": 82,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 100000000,
        "country": "France",
        "attributes": {
          "pace": 72,
          "shooting": 43,
          "passing": 68,
          "dribbling": 73,
          "defending": 81,
          "physical": 75
        }
      },
      {
        "name": "Ridle Baku",
        "age": 27,
        "overall": 78,
        "potential": 79,
        "position": "MED",
        "specificPosition": "MD",
        "marketValue": 63095734,
        "country": "Germany",
        "attributes": {
          "pace": 81,
          "shooting": 72,
          "passing": 73,
          "dribbling": 81,
          "defending": 71,
          "physical": 75
        }
      },
      {
        "name": "Lukas Klostermann",
        "age": 29,
        "overall": 78,
        "potential": 80,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 63095734,
        "country": "Germany",
        "attributes": {
          "pace": 82,
          "shooting": 50,
          "passing": 64,
          "dribbling": 70,
          "defending": 80,
          "physical": 75
        }
      },
      {
        "name": "Johan Bakayoko",
        "age": 22,
        "overall": 78,
        "potential": 78,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 94643602,
        "country": "Belgium",
        "attributes": {
          "pace": 85,
          "shooting": 72,
          "passing": 70,
          "dribbling": 81,
          "defending": 33,
          "physical": 63
        }
      },
      {
        "name": "Nicolas Seiwald",
        "age": 24,
        "overall": 77,
        "potential": 77,
        "position": "MED",
        "specificPosition": "MCD",
        "marketValue": 50118723,
        "country": "Austria",
        "attributes": {
          "pace": 72,
          "shooting": 62,
          "passing": 74,
          "dribbling": 74,
          "defending": 74,
          "physical": 76
        }
      },
      {
        "name": "Amadou Haidara",
        "age": 28,
        "overall": 77,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 50118723,
        "country": "Mali",
        "attributes": {
          "pace": 63,
          "shooting": 70,
          "passing": 77,
          "dribbling": 79,
          "defending": 73,
          "physical": 69
        }
      },
      {
        "name": "Kevin Kampl",
        "age": 35,
        "overall": 77,
        "potential": 78,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 30071234,
        "country": "Slovenia",
        "attributes": {
          "pace": 66,
          "shooting": 66,
          "passing": 79,
          "dribbling": 81,
          "defending": 64,
          "physical": 56
        }
      },
      {
        "name": "Timo Werner",
        "age": 30,
        "overall": 77,
        "potential": 80,
        "position": "DEL",
        "specificPosition": "EI",
        "marketValue": 50118723,
        "country": "Germany",
        "attributes": {
          "pace": 91,
          "shooting": 74,
          "passing": 68,
          "dribbling": 77,
          "defending": 35,
          "physical": 66
        }
      },
      {
        "name": "Christoph Baumgartner",
        "age": 26,
        "overall": 77,
        "potential": 80,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 50118723,
        "country": "Austria",
        "attributes": {
          "pace": 74,
          "shooting": 72,
          "passing": 72,
          "dribbling": 79,
          "defending": 47,
          "physical": 63
        }
      },
      {
        "name": "Maarten Vandevoordt",
        "age": 24,
        "overall": 76,
        "potential": 76,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 39810717,
        "country": "Belgium",
        "attributes": {
          "pace": 78,
          "shooting": 75,
          "passing": 75,
          "dribbling": 77,
          "defending": 40,
          "physical": 74
        }
      },
      {
        "name": "Antonio Nusa",
        "age": 20,
        "overall": 76,
        "potential": 76,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 59716076,
        "country": "Norway",
        "attributes": {
          "pace": 89,
          "shooting": 72,
          "passing": 68,
          "dribbling": 81,
          "defending": 41,
          "physical": 63
        }
      },
      {
        "name": "Rômulo",
        "age": 24,
        "overall": 76,
        "potential": 79,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 39810717,
        "country": "Brazil",
        "attributes": {
          "pace": 82,
          "shooting": 75,
          "passing": 63,
          "dribbling": 75,
          "defending": 35,
          "physical": 78
        }
      },
      {
        "name": "El Chadaille Bitshiabu",
        "age": 20,
        "overall": 75,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "DFC",
        "marketValue": 47434165,
        "country": "France",
        "attributes": {
          "pace": 72,
          "shooting": 36,
          "passing": 60,
          "dribbling": 56,
          "defending": 74,
          "physical": 79
        }
      },
      {
        "name": "Conrad Harder",
        "age": 20,
        "overall": 74,
        "potential": 75,
        "position": "DEL",
        "specificPosition": "DC",
        "marketValue": 37678296,
        "country": "Denmark",
        "attributes": {
          "pace": 75,
          "shooting": 76,
          "passing": 66,
          "dribbling": 71,
          "defending": 28,
          "physical": 76
        }
      },
      {
        "name": "Kosta Nedeljković",
        "age": 20,
        "overall": 72,
        "potential": 75,
        "position": "DEF",
        "specificPosition": "LD",
        "marketValue": 23773398,
        "country": "Serbia",
        "attributes": {
          "pace": 81,
          "shooting": 44,
          "passing": 65,
          "dribbling": 69,
          "defending": 68,
          "physical": 67
        }
      },
      {
        "name": "Andrija Maksimović",
        "age": 18,
        "overall": 71,
        "potential": 74,
        "position": "DEL",
        "specificPosition": "ED",
        "marketValue": 18883881,
        "country": "Serbia",
        "attributes": {
          "pace": 71,
          "shooting": 70,
          "passing": 72,
          "dribbling": 70,
          "defending": 37,
          "physical": 59
        }
      },
      {
        "name": "Ezechiel Banzuzi",
        "age": 21,
        "overall": 70,
        "potential": 71,
        "position": "MED",
        "specificPosition": "MC",
        "marketValue": 15000000,
        "country": "Holland",
        "attributes": {
          "pace": 66,
          "shooting": 61,
          "passing": 64,
          "dribbling": 68,
          "defending": 61,
          "physical": 72
        }
      },
      {
        "name": "Leopold Zingerle",
        "age": 31,
        "overall": 69,
        "potential": 70,
        "position": "POR",
        "specificPosition": "POR",
        "marketValue": 4765969,
        "country": "Germany",
        "attributes": {
          "pace": 70,
          "shooting": 66,
          "passing": 66,
          "dribbling": 71,
          "defending": 42,
          "physical": 68
        }
      },
      {
        "name": "Max Finkgräfe",
        "age": 22,
        "overall": 69,
        "potential": 72,
        "position": "DEF",
        "specificPosition": "LI",
        "marketValue": 11914924,
        "country": "Germany",
        "attributes": {
          "pace": 75,
          "shooting": 43,
          "passing": 61,
          "dribbling": 73,
          "defending": 64,
          "physical": 65
        }
      },
      {
        "name": "Assan Ouédraogo",
        "age": 19,
        "overall": 69,
        "potential": 72,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 11914924,
        "country": "Germany",
        "attributes": {
          "pace": 76,
          "shooting": 56,
          "passing": 60,
          "dribbling": 76,
          "defending": 45,
          "physical": 67
        }
      },
      {
        "name": "Tidiam Gomis",
        "age": 19,
        "overall": 68,
        "potential": 70,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 9464360,
        "country": "France",
        "attributes": {
          "pace": 85,
          "shooting": 55,
          "passing": 59,
          "dribbling": 73,
          "defending": 30,
          "physical": 54
        }
      },
      {
        "name": "Yan Diomande",
        "age": 19,
        "overall": 66,
        "potential": 70,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 5971608,
        "country": "Côte d'Ivoire",
        "attributes": {
          "pace": 71,
          "shooting": 61,
          "passing": 62,
          "dribbling": 64,
          "defending": 25,
          "physical": 49
        }
      },
      {
        "name": "Viggo Gebel",
        "age": 18,
        "overall": 63,
        "potential": 65,
        "position": "MED",
        "specificPosition": "MCO",
        "marketValue": 2992893,
        "country": "Germany",
        "attributes": {
          "pace": 72,
          "shooting": 57,
          "passing": 61,
          "dribbling": 69,
          "defending": 43,
          "physical": 47
        }
      },
      {
        "name": "Joyeux Masanka Bungi",
        "age": 19,
        "overall": 61,
        "potential": 64,
        "position": "MED",
        "specificPosition": "MI",
        "marketValue": 1888388,
        "country": "Belgium",
        "attributes": {
          "pace": 67,
          "shooting": 51,
          "passing": 61,
          "dribbling": 58,
          "defending": 50,
          "physical": 61
        }
      }
    ]
  }
];
