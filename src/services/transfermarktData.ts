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
  {
    "id": "100",
    "name": "Real Madrid",
    "country": "España",
    "squad": 26,
    "marketValue": 1000000000
  },
  {
    "id": "101",
    "name": "FC Barcelona",
    "country": "España",
    "squad": 23,
    "marketValue": 640000000
  },
  {
    "id": "102",
    "name": "Atlético de Madrid",
    "country": "España",
    "squad": 24,
    "marketValue": 520000000
  },
  {
    "id": "103",
    "name": "Athletic Club",
    "country": "España",
    "squad": 24,
    "marketValue": 280000000
  },
  {
    "id": "104",
    "name": "Real Sociedad",
    "country": "España",
    "squad": 25,
    "marketValue": 260000000
  },
  {
    "id": "105",
    "name": "Real Betis",
    "country": "España",
    "squad": 26,
    "marketValue": 220000000
  },
  {
    "id": "106",
    "name": "Villarreal CF",
    "country": "España",
    "squad": 26,
    "marketValue": 240000000
  },
  {
    "id": "107",
    "name": "Valencia CF",
    "country": "España",
    "squad": 24,
    "marketValue": 200000000
  },
  {
    "id": "108",
    "name": "Sevilla FC",
    "country": "España",
    "squad": 25,
    "marketValue": 220000000
  },
  {
    "id": "109",
    "name": "Girona FC",
    "country": "España",
    "squad": 25,
    "marketValue": 200000000
  },
  {
    "id": "110",
    "name": "CA Osasuna",
    "country": "España",
    "squad": 24,
    "marketValue": 140000000
  },
  {
    "id": "111",
    "name": "Celta de Vigo",
    "country": "España",
    "squad": 26,
    "marketValue": 140000000
  },
  {
    "id": "112",
    "name": "Rayo Vallecano",
    "country": "España",
    "squad": 25,
    "marketValue": 120000000
  },
  {
    "id": "113",
    "name": "RCD Mallorca",
    "country": "España",
    "squad": 24,
    "marketValue": 128000000
  },
  {
    "id": "114",
    "name": "Getafe CF",
    "country": "España",
    "squad": 22,
    "marketValue": 120000000
  },
  {
    "id": "115",
    "name": "Deportivo Alavés",
    "country": "España",
    "squad": 22,
    "marketValue": 112000000
  },
  {
    "id": "116",
    "name": "RCD Espanyol",
    "country": "España",
    "squad": 25,
    "marketValue": 120000000
  },
  {
    "id": "117",
    "name": "UD Las Palmas",
    "country": "España",
    "squad": 26,
    "marketValue": 112000000
  },
  {
    "id": "118",
    "name": "CD Leganés",
    "country": "España",
    "squad": 24,
    "marketValue": 104000000
  },
  {
    "id": "119",
    "name": "Real Valladolid",
    "country": "España",
    "squad": 21,
    "marketValue": 108000000
  },
  {
    "id": "120",
    "name": "Manchester City",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 1040000000
  },
  {
    "id": "121",
    "name": "Arsenal FC",
    "country": "Inglaterra",
    "squad": 24,
    "marketValue": 720000000
  },
  {
    "id": "122",
    "name": "Liverpool FC",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 760000000
  },
  {
    "id": "123",
    "name": "Chelsea FC",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 800000000
  },
  {
    "id": "124",
    "name": "Manchester United",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 760000000
  },
  {
    "id": "125",
    "name": "Tottenham Hotspur",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 560000000
  },
  {
    "id": "126",
    "name": "Newcastle United",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 640000000
  },
  {
    "id": "127",
    "name": "Aston Villa",
    "country": "Inglaterra",
    "squad": 22,
    "marketValue": 440000000
  },
  {
    "id": "128",
    "name": "Brighton & Hove Albion",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 380000000
  },
  {
    "id": "129",
    "name": "West Ham United",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 340000000
  },
  {
    "id": "130",
    "name": "Everton FC",
    "country": "Inglaterra",
    "squad": 24,
    "marketValue": 280000000
  },
  {
    "id": "131",
    "name": "Fulham FC",
    "country": "Inglaterra",
    "squad": 24,
    "marketValue": 260000000
  },
  {
    "id": "132",
    "name": "Wolverhampton Wanderers",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 260000000
  },
  {
    "id": "133",
    "name": "Brentford FC",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 260000000
  },
  {
    "id": "134",
    "name": "Crystal Palace",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 240000000
  },
  {
    "id": "135",
    "name": "AFC Bournemouth",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 220000000
  },
  {
    "id": "136",
    "name": "Nottingham Forest",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 260000000
  },
  {
    "id": "137",
    "name": "Leicester City",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 240000000
  },
  {
    "id": "138",
    "name": "Ipswich Town",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 180000000
  },
  {
    "id": "139",
    "name": "Southampton FC",
    "country": "Inglaterra",
    "squad": 26,
    "marketValue": 200000000
  },
  {
    "id": "140",
    "name": "Juventus",
    "country": "Italia",
    "squad": 26,
    "marketValue": 520000000
  },
  {
    "id": "141",
    "name": "Inter",
    "country": "Italia",
    "squad": 25,
    "marketValue": 480000000
  },
  {
    "id": "142",
    "name": "AC Milan",
    "country": "Italia",
    "squad": 23,
    "marketValue": 440000000
  },
  {
    "id": "143",
    "name": "Napoli",
    "country": "Italia",
    "squad": 26,
    "marketValue": 380000000
  },
  {
    "id": "144",
    "name": "AS Roma",
    "country": "Italia",
    "squad": 26,
    "marketValue": 300000000
  },
  {
    "id": "145",
    "name": "Lazio",
    "country": "Italia",
    "squad": 26,
    "marketValue": 260000000
  },
  {
    "id": "146",
    "name": "Atalanta",
    "country": "Italia",
    "squad": 25,
    "marketValue": 280000000
  },
  {
    "id": "147",
    "name": "Fiorentina",
    "country": "Italia",
    "squad": 25,
    "marketValue": 200000000
  },
  {
    "id": "148",
    "name": "Bologna",
    "country": "Italia",
    "squad": 26,
    "marketValue": 200000000
  },
  {
    "id": "149",
    "name": "Torino",
    "country": "Italia",
    "squad": 26,
    "marketValue": 180000000
  },
  {
    "id": "150",
    "name": "Udinese",
    "country": "Italia",
    "squad": 26,
    "marketValue": 160000000
  },
  {
    "id": "151",
    "name": "Genoa",
    "country": "Italia",
    "squad": 26,
    "marketValue": 160000000
  },
  {
    "id": "152",
    "name": "Como 1907",
    "country": "Italia",
    "squad": 26,
    "marketValue": 180000000
  },
  {
    "id": "153",
    "name": "Parma Calcio",
    "country": "Italia",
    "squad": 26,
    "marketValue": 140000000
  },
  {
    "id": "154",
    "name": "Cagliari",
    "country": "Italia",
    "squad": 26,
    "marketValue": 140000000
  },
  {
    "id": "155",
    "name": "Lecce",
    "country": "Italia",
    "squad": 26,
    "marketValue": 120000000
  },
  {
    "id": "156",
    "name": "Sassuolo",
    "country": "Italia",
    "squad": 26,
    "marketValue": 140000000
  },
  {
    "id": "157",
    "name": "Hellas Verona",
    "country": "Italia",
    "squad": 24,
    "marketValue": 128000000
  },
  {
    "id": "158",
    "name": "Cremonese",
    "country": "Italia",
    "squad": 26,
    "marketValue": 112000000
  },
  {
    "id": "159",
    "name": "Pisa SC",
    "country": "Italia",
    "squad": 26,
    "marketValue": 112000000
  },
  {
    "id": "160",
    "name": "Bayern München",
    "country": "Alemania",
    "squad": 25,
    "marketValue": 800000000
  },
  {
    "id": "161",
    "name": "Borussia Dortmund",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 440000000
  },
  {
    "id": "162",
    "name": "Bayer 04 Leverkusen",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 400000000
  },
  {
    "id": "163",
    "name": "RB Leipzig",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 360000000
  },
  {
    "id": "164",
    "name": "Eintracht Frankfurt",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 260000000
  },
  {
    "id": "165",
    "name": "VfB Stuttgart",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 240000000
  },
  {
    "id": "166",
    "name": "SC Freiburg",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 200000000
  },
  {
    "id": "167",
    "name": "TSG Hoffenheim",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 200000000
  },
  {
    "id": "168",
    "name": "Werder Bremen",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 180000000
  },
  {
    "id": "169",
    "name": "FC Augsburg",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 160000000
  },
  {
    "id": "170",
    "name": "Mainz 05",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 160000000
  },
  {
    "id": "171",
    "name": "Union Berlin",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 180000000
  },
  {
    "id": "172",
    "name": "VfL Wolfsburg",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 220000000
  },
  {
    "id": "173",
    "name": "Borussia Mönchengladbach",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 200000000
  },
  {
    "id": "174",
    "name": "FC St. Pauli",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 140000000
  },
  {
    "id": "175",
    "name": "1. FC Heidenheim",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 140000000
  },
  {
    "id": "176",
    "name": "1. FC Köln",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 160000000
  },
  {
    "id": "177",
    "name": "Hamburger SV",
    "country": "Alemania",
    "squad": 26,
    "marketValue": 180000000
  },
  {
    "id": "178",
    "name": "Paris Saint-Germain",
    "country": "Francia",
    "squad": 23,
    "marketValue": 1000000000
  },
  {
    "id": "179",
    "name": "Olympique de Marseille",
    "country": "Francia",
    "squad": 26,
    "marketValue": 300000000
  },
  {
    "id": "180",
    "name": "Olympique Lyonnais",
    "country": "Francia",
    "squad": 23,
    "marketValue": 280000000
  },
  {
    "id": "181",
    "name": "AS Monaco",
    "country": "Francia",
    "squad": 26,
    "marketValue": 300000000
  },
  {
    "id": "182",
    "name": "LOSC Lille",
    "country": "Francia",
    "squad": 26,
    "marketValue": 240000000
  },
  {
    "id": "183",
    "name": "RC Lens",
    "country": "Francia",
    "squad": 26,
    "marketValue": 200000000
  },
  {
    "id": "184",
    "name": "Stade Rennais",
    "country": "Francia",
    "squad": 23,
    "marketValue": 220000000
  },
  {
    "id": "185",
    "name": "OGC Nice",
    "country": "Francia",
    "squad": 26,
    "marketValue": 220000000
  },
  {
    "id": "186",
    "name": "Stade Brestois",
    "country": "Francia",
    "squad": 22,
    "marketValue": 160000000
  },
  {
    "id": "187",
    "name": "RC Strasbourg",
    "country": "Francia",
    "squad": 26,
    "marketValue": 180000000
  },
  {
    "id": "188",
    "name": "Toulouse FC",
    "country": "Francia",
    "squad": 22,
    "marketValue": 140000000
  },
  {
    "id": "189",
    "name": "FC Nantes",
    "country": "Francia",
    "squad": 26,
    "marketValue": 140000000
  },
  {
    "id": "190",
    "name": "Paris FC",
    "country": "Francia",
    "squad": 26,
    "marketValue": 180000000
  },
  {
    "id": "191",
    "name": "AJ Auxerre",
    "country": "Francia",
    "squad": 23,
    "marketValue": 120000000
  },
  {
    "id": "192",
    "name": "Le Havre AC",
    "country": "Francia",
    "squad": 26,
    "marketValue": 112000000
  },
  {
    "id": "193",
    "name": "Angers SCO",
    "country": "Francia",
    "squad": 23,
    "marketValue": 112000000
  },
  {
    "id": "194",
    "name": "FC Lorient",
    "country": "Francia",
    "squad": 23,
    "marketValue": 120000000
  },
  {
    "id": "195",
    "name": "FC Metz",
    "country": "Francia",
    "squad": 25,
    "marketValue": 112000000
  },
  {
    "id": "196",
    "name": "River Plate",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 280000000
  },
  {
    "id": "197",
    "name": "Boca Juniors",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 260000000
  },
  {
    "id": "198",
    "name": "Racing Club",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 180000000
  },
  {
    "id": "199",
    "name": "Independiente",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 160000000
  },
  {
    "id": "200",
    "name": "San Lorenzo",
    "country": "Argentina",
    "squad": 24,
    "marketValue": 140000000
  },
  {
    "id": "201",
    "name": "Vélez Sarsfield",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 140000000
  },
  {
    "id": "202",
    "name": "Estudiantes de La Plata",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 140000000
  },
  {
    "id": "203",
    "name": "Lanús",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 120000000
  },
  {
    "id": "204",
    "name": "Rosario Central",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 128000000
  },
  {
    "id": "205",
    "name": "Newell's Old Boys",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 120000000
  },
  {
    "id": "206",
    "name": "Talleres de Córdoba",
    "country": "Argentina",
    "squad": 25,
    "marketValue": 140000000
  },
  {
    "id": "207",
    "name": "Argentinos Juniors",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 112000000
  },
  {
    "id": "208",
    "name": "Defensa y Justicia",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 100000000
  },
  {
    "id": "209",
    "name": "Huracán",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 104000000
  },
  {
    "id": "210",
    "name": "Godoy Cruz",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 100000000
  },
  {
    "id": "211",
    "name": "Belgrano de Córdoba",
    "country": "Argentina",
    "squad": 26,
    "marketValue": 104000000
  },
  {
    "id": "212",
    "name": "Inter Miami CF",
    "country": "Estados Unidos",
    "squad": 25,
    "marketValue": 360000000
  },
  {
    "id": "213",
    "name": "Al Nassr",
    "country": "Arabia Saudita",
    "squad": 26,
    "marketValue": 560000000
  },
  {
    "id": "214",
    "name": "Al Hilal",
    "country": "Arabia Saudita",
    "squad": 26,
    "marketValue": 600000000
  },
  {
    "id": "215",
    "name": "Al Ittihad",
    "country": "Arabia Saudita",
    "squad": 26,
    "marketValue": 480000000
  },
  {
    "id": "216",
    "name": "Sporting CP",
    "country": "Portugal",
    "squad": 26,
    "marketValue": 280000000
  },
  {
    "id": "217",
    "name": "SL Benfica",
    "country": "Portugal",
    "squad": 26,
    "marketValue": 300000000
  },
  {
    "id": "218",
    "name": "FC Porto",
    "country": "Portugal",
    "squad": 26,
    "marketValue": 280000000
  }
];

export const OFFLINE_PLAYERS: OfflinePlayer[] = [
  {
    "id": "252371",
    "name": "Jude Bellingham",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 1500000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 975000000,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 1275000000,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 1500000000,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "231747",
    "name": "Kylian Mbappé",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 1258925412,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 818301518,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 1070086600,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 1258925412,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "277643",
    "name": "Lamine Yamal",
    "position": "MED (MD)",
    "age": 18,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 1191492352,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 774470029,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 1012768499,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 1191492352,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "256630",
    "name": "Florian Wirtz",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 1191492352,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 774470029,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 1012768499,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 1191492352,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "231443",
    "name": "Ousmane Dembélé",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 1000000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 650000000,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 850000000,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 1000000000,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "231866",
    "name": "Rodri",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 1000000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 650000000,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 850000000,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 1000000000,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "239085",
    "name": "Erling Haaland",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Norway"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 1000000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 650000000,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 850000000,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 1000000000,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "233419",
    "name": "Raphinha",
    "position": "MED (MI)",
    "age": 29,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 794328235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 516313353,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 675179000,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 794328235,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "235212",
    "name": "Achraf Hakimi",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 794328235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 516313353,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 675179000,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 794328235,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "255253",
    "name": "Vitinha",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 794328235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 516313353,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 675179000,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 794328235,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "230621",
    "name": "Gianluigi Donnarumma",
    "position": "POR (POR)",
    "age": 27,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 794328235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 516313353,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 675179000,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 794328235,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "251854",
    "name": "Pedri",
    "position": "MED (MC)",
    "age": 23,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 794328235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 516313353,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 675179000,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 794328235,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "239053",
    "name": "Federico Valverde",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 794328235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 516313353,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 675179000,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 794328235,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "238794",
    "name": "Vini Jr.",
    "position": "DEL (EI)",
    "age": 25,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 794328235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 516313353,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 675179000,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 794328235,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "209331",
    "name": "Mohamed Salah",
    "position": "MED (MD)",
    "age": 33,
    "nationalities": [
      "Egypt"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 755355247,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 490980911,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 642051960,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 755355247,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "231478",
    "name": "Lautaro Martínez",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 630957344,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 410122274,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 536313742,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 630957344,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "233731",
    "name": "Alexander Isak",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 630957344,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 410122274,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 536313742,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 630957344,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "256790",
    "name": "Jamal Musiala",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 630957344,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 410122274,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 536313742,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 630957344,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "232580",
    "name": "Gabriel",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 630957344,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 410122274,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 536313742,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 630957344,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "246669",
    "name": "Bukayo Saka",
    "position": "DEL (ED)",
    "age": 24,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 630957344,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 410122274,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 536313742,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 630957344,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "203376",
    "name": "Virgil van Dijk",
    "position": "DEF (DFC)",
    "age": 34,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 600000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 390000000,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 510000000,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 600000000,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "257534",
    "name": "Cole Palmer",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "247635",
    "name": "Khvicha Kvaratskhelia",
    "position": "DEL (EI)",
    "age": 25,
    "nationalities": [
      "Georgia"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "237383",
    "name": "Alessandro Bastoni",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "215441",
    "name": "Serhou Guirassy",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "Guinea"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "228702",
    "name": "Frenkie de Jong",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "256079",
    "name": "Moisés Caicedo",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Ecuador"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "234378",
    "name": "Declan Rice",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "241486",
    "name": "Jules Koundé",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "243715",
    "name": "William Saliba",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "246191",
    "name": "Julián Alvarez",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "213331",
    "name": "Jonathan Tah",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "239837",
    "name": "Alexis Mac Allister",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "215698",
    "name": "Mike Maignan",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "222665",
    "name": "Martin Ødegaard",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Norway"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "220901",
    "name": "David Raya",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "241651",
    "name": "Viktor Gyökeres",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "224232",
    "name": "Nicolò Barella",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "232293",
    "name": "Victor Osimhen",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 501187234,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 325771702,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 426009149,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 501187234,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "212622",
    "name": "Joshua Kimmich",
    "position": "MED (MCD)",
    "age": 31,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 476596941,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 309788012,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 405107400,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 476596941,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "212831",
    "name": "Alisson",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 476596941,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 309788012,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 405107400,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 476596941,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "202126",
    "name": "Harry Kane",
    "position": "DEL (DC)",
    "age": 32,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 476596941,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 309788012,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 405107400,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 476596941,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "192119",
    "name": "Thibaut Courtois",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 476596941,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 309788012,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 405107400,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 476596941,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "272834",
    "name": "João Neves",
    "position": "MED (MC)",
    "age": 21,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 474341649,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 308322072,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 403190402,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 474341649,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "271421",
    "name": "Désiré Doué",
    "position": "DEL (ED)",
    "age": 20,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 474341649,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 308322072,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 403190402,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 474341649,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "252145",
    "name": "Nuno Mendes",
    "position": "DEF (LI)",
    "age": 23,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "247827",
    "name": "Michael Olise",
    "position": "MED (MD)",
    "age": 24,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "231281",
    "name": "Trent Alexander-Arnold",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "239818",
    "name": "Rúben Dias",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "247851",
    "name": "Bruno Guimarães",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "256196",
    "name": "Willian Pacho",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Ecuador"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "237678",
    "name": "Ibrahima Konaté",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "241096",
    "name": "Sandro Tonali",
    "position": "MED (MCD)",
    "age": 25,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "256516",
    "name": "Nico Williams",
    "position": "MED (MI)",
    "age": 23,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "240638",
    "name": "Tijjani Reijnders",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "235073",
    "name": "Gregor Kobel",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 398107171,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 258769661,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 338391095,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 398107171,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "188545",
    "name": "Robert Lewandowski",
    "position": "DEL (DC)",
    "age": 37,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 378574407,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 246073365,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 321788246,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 378574407,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "200389",
    "name": "Jan Oblak",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Slovenia"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 378574407,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 246073365,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 321788246,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 378574407,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "245367",
    "name": "Xavi Simons",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 376782965,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 244908927,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 320265520,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 376782965,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "226268",
    "name": "Federico Dimarco",
    "position": "DEF (LI)",
    "age": 28,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "237238",
    "name": "Scott McTominay",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Scotland"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "246104",
    "name": "Ryan Gravenberch",
    "position": "MED (MCD)",
    "age": 23,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "243014",
    "name": "Bryan Mbeumo",
    "position": "DEL (ED)",
    "age": 26,
    "nationalities": [
      "Cameroon"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "230869",
    "name": "Unai Simón",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "228093",
    "name": "Marcus Thuram",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "241084",
    "name": "Luis Díaz",
    "position": "MED (MI)",
    "age": 29,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "247819",
    "name": "Nico Schlotterbeck",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "237692",
    "name": "Phil Foden",
    "position": "DEL (ED)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "226271",
    "name": "Fabián Ruiz",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "216393",
    "name": "Youri Tielemans",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "243812",
    "name": "Rodrygo",
    "position": "DEL (ED)",
    "age": 25,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "244260",
    "name": "Dani Olmo",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "229558",
    "name": "Dayot Upamecano",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "234236",
    "name": "Patrik Schick",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "Czech Republic"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "239580",
    "name": "Bremer",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 316227766,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 205548048,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 268793601,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 316227766,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "192985",
    "name": "Kevin De Bruyne",
    "position": "MED (MC)",
    "age": 34,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 300712340,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 195463021,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 255605489,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 300712340,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "207865",
    "name": "Marquinhos",
    "position": "DEF (DFC)",
    "age": 31,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 300712340,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 195463021,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 255605489,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 300712340,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "177683",
    "name": "Yann Sommer",
    "position": "POR (POR)",
    "age": 37,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 300712340,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 195463021,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 255605489,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 300712340,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "212198",
    "name": "Bruno Fernandes",
    "position": "MED (MCO)",
    "age": 31,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 300712340,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 195463021,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 255605489,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 300712340,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "264240",
    "name": "Gavi",
    "position": "MED (MC)",
    "age": 21,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 299289347,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 194538076,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 254395945,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 299289347,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "263578",
    "name": "Balde",
    "position": "DEF (LI)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 299289347,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 194538076,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 254395945,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 299289347,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "232656",
    "name": "Theo Hernández",
    "position": "DEF (LI)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "244675",
    "name": "Sancet",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "234396",
    "name": "Alphonso Davies",
    "position": "DEF (LI)",
    "age": 25,
    "nationalities": [
      "Canada"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "233096",
    "name": "Denzel Dumfries",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "251517",
    "name": "Joško Gvardiol",
    "position": "DEF (LI)",
    "age": 24,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "241637",
    "name": "Aurélien Tchouaméni",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "239231",
    "name": "Marc Cucurella",
    "position": "DEF (LI)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "210035",
    "name": "Grimaldo",
    "position": "MED (MI)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "226851",
    "name": "Benjamin Pavard",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "247090",
    "name": "Enzo Fernández",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "257279",
    "name": "Álex Baena",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "220502",
    "name": "Mattia Zaccagni",
    "position": "MED (MI)",
    "age": 30,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "262621",
    "name": "Giorgi Mamardashvili",
    "position": "POR (POR)",
    "age": 25,
    "nationalities": [
      "Georgia"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "231521",
    "name": "Exequiel Palacios",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "224293",
    "name": "Rúben Neves",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "242516",
    "name": "Cody Gakpo",
    "position": "MED (MI)",
    "age": 26,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "222077",
    "name": "Manuel Locatelli",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "227796",
    "name": "Christian Pulisic",
    "position": "DEL (ED)",
    "age": 27,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "234577",
    "name": "Diogo Costa",
    "position": "POR (POR)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "221697",
    "name": "Ollie Watkins",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "220697",
    "name": "James Maddison",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "252154",
    "name": "Marco Carnesecchi",
    "position": "POR (POR)",
    "age": 25,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "256675",
    "name": "Omar Marmoush",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Egypt"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "241721",
    "name": "Rafael Leão",
    "position": "DEL (EI)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "240130",
    "name": "Éder Militão",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "264652",
    "name": "Bradley Barcola",
    "position": "DEL (EI)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "241852",
    "name": "Moussa Diaby",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "al-ittihad",
      "name": "Al Ittihad"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Al Ittihad"
      }
    ]
  },
  {
    "id": "248550",
    "name": "Vivian",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "230899",
    "name": "Ademola Lookman",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "216549",
    "name": "Alexander Sørloth",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "Norway"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 251188643,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 163272618,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 213510347,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 251188643,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "205452",
    "name": "Antonio Rüdiger",
    "position": "DEF (DFC)",
    "age": 33,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 238864302,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 155261796,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 203034657,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 238864302,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "211110",
    "name": "Paulo Dybala",
    "position": "MED (MCO)",
    "age": 32,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 238864302,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 155261796,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 203034657,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 238864302,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "208128",
    "name": "Hakan Çalhanoğlu",
    "position": "MED (MCD)",
    "age": 32,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 238864302,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 155261796,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 203034657,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 238864302,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "158023",
    "name": "Lionel Messi",
    "position": "DEL (ED)",
    "age": 38,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "inter-miami-cf",
      "name": "Inter Miami CF"
    },
    "marketValue": 238864302,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 155261796,
        "clubName": "Inter Miami CF"
      },
      {
        "date": "2024",
        "marketValue": 203034657,
        "clubName": "Inter Miami CF"
      },
      {
        "date": "2026",
        "marketValue": 238864302,
        "clubName": "Inter Miami CF"
      }
    ]
  },
  {
    "id": "192448",
    "name": "Marc-André ter Stegen",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 238864302,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 155261796,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 203034657,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 238864302,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "260908",
    "name": "Milos Kerkez",
    "position": "DEF (LI)",
    "age": 22,
    "nationalities": [
      "Hungary"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 237733979,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 154527086,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 202073882,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 237733979,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "272449",
    "name": "Pablo Barrios",
    "position": "MED (MC)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 237733979,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 154527086,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 202073882,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 237733979,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "278349",
    "name": "Dean Huijsen",
    "position": "DEF (DFC)",
    "age": 20,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 237733979,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 154527086,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 202073882,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 237733979,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "278046",
    "name": "Pau Cubarsí",
    "position": "DEF (DFC)",
    "age": 19,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 237733979,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 154527086,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 202073882,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 237733979,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "270409",
    "name": "Savinho",
    "position": "DEL (ED)",
    "age": 21,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 237733979,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 154527086,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 202073882,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 237733979,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "210008",
    "name": "Adrien Rabiot",
    "position": "MED (MCO)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "248243",
    "name": "Eduardo Camavinga",
    "position": "MED (MC)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "236772",
    "name": "Dominik Szoboszlai",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Hungary"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "223959",
    "name": "Lucas Torreira",
    "position": "MED (MCD)",
    "age": 30,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "244669",
    "name": "Morten Hjulmand",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "247394",
    "name": "Dejan Kulusevski",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "225193",
    "name": "Mikel Merino",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "240950",
    "name": "Pedro Gonçalves",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "259532",
    "name": "Joan García",
    "position": "POR (POR)",
    "age": 24,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "247103",
    "name": "Dávid Hancko",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Slovakia"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "242964",
    "name": "Anthony Gordon",
    "position": "DEL (EI)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "251752",
    "name": "Lucas Chevalier",
    "position": "POR (POR)",
    "age": 24,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "228813",
    "name": "Aleix García",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "253149",
    "name": "Jeremie Frimpong",
    "position": "DEF (LD)",
    "age": 25,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "240243",
    "name": "Matheus Cunha",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "248148",
    "name": "Zubimendi",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "235794",
    "name": "Eberechi Eze",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "243580",
    "name": "Loïs Openda",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "229391",
    "name": "Palhinha",
    "position": "MED (MCD)",
    "age": 30,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "212194",
    "name": "Julian Brandt",
    "position": "MED (MCO)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "224371",
    "name": "Jarrod Bowen",
    "position": "MED (MD)",
    "age": 29,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "278016",
    "name": "Murillo",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "236987",
    "name": "Boubacar Kamara",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "241461",
    "name": "Ferran Torres",
    "position": "DEL (EI)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "250959",
    "name": "Angelo Stiller",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "256197",
    "name": "Piero Hincapié",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Ecuador"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "242458",
    "name": "Artem Dovbyk",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "257289",
    "name": "Hugo Ekitiké",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "236610",
    "name": "Moise Kean",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "fiorentina",
      "name": "Fiorentina"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Fiorentina"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Fiorentina"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Fiorentina"
      }
    ]
  },
  {
    "id": "253163",
    "name": "Ronald Araujo",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "213345",
    "name": "Kingsley Coman",
    "position": "MED (MI)",
    "age": 29,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "al-nassr",
      "name": "Al Nassr"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Al Nassr"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Al Nassr"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Al Nassr"
      }
    ]
  },
  {
    "id": "231936",
    "name": "Benjamin White",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "241850",
    "name": "Mateo Retegui",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "club",
      "name": "Al Qadsiah"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Al Qadsiah"
      }
    ]
  },
  {
    "id": "229582",
    "name": "Gianluca Mancini",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "238095",
    "name": "Nikola Milenković",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "233486",
    "name": "Robin Le Normand",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 199526231,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 129692050,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 169597296,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 199526231,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "210257",
    "name": "Ederson",
    "position": "POR (POR)",
    "age": 32,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "202811",
    "name": "Emiliano Martínez",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "194765",
    "name": "Antoine Griezmann",
    "position": "DEL (DC)",
    "age": 35,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "215914",
    "name": "N'Golo Kanté",
    "position": "MED (MCD)",
    "age": 35,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "al-ittihad",
      "name": "Al Ittihad"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Al Ittihad"
      }
    ]
  },
  {
    "id": "204963",
    "name": "Carvajal",
    "position": "DEF (LD)",
    "age": 34,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "185122",
    "name": "Péter Gulácsi",
    "position": "POR (POR)",
    "age": 35,
    "nationalities": [
      "Hungary"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "193080",
    "name": "De Gea",
    "position": "POR (POR)",
    "age": 35,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fiorentina",
      "name": "Fiorentina"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Fiorentina"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Fiorentina"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Fiorentina"
      }
    ]
  },
  {
    "id": "200104",
    "name": "Heung Min Son",
    "position": "DEL (EI)",
    "age": 33,
    "nationalities": [
      "Korea Republic"
    ],
    "club": {
      "id": "club",
      "name": "LAFC"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "LAFC"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "LAFC"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "LAFC"
      }
    ]
  },
  {
    "id": "199503",
    "name": "Granit Xhaka",
    "position": "MED (MCD)",
    "age": 33,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "club",
      "name": "Sunderland"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Sunderland"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Sunderland"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Sunderland"
      }
    ]
  },
  {
    "id": "165153",
    "name": "Karim Benzema",
    "position": "DEL (DC)",
    "age": 38,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "al-ittihad",
      "name": "Al Ittihad"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Al Ittihad"
      }
    ]
  },
  {
    "id": "204525",
    "name": "Iñigo Martínez",
    "position": "DEF (DFC)",
    "age": 34,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "al-nassr",
      "name": "Al Nassr"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Al Nassr"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Al Nassr"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Al Nassr"
      }
    ]
  },
  {
    "id": "20801",
    "name": "Cristiano Ronaldo",
    "position": "DEL (DC)",
    "age": 41,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "al-nassr",
      "name": "Al Nassr"
    },
    "marketValue": 189736660,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 123328829,
        "clubName": "Al Nassr"
      },
      {
        "date": "2024",
        "marketValue": 161276161,
        "clubName": "Al Nassr"
      },
      {
        "date": "2026",
        "marketValue": 189736660,
        "clubName": "Al Nassr"
      }
    ]
  },
  {
    "id": "272500",
    "name": "Carlos Baleba",
    "position": "MED (MCD)",
    "age": 22,
    "nationalities": [
      "Cameroon"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 188838812,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 122745228,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 160512990,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 188838812,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "264309",
    "name": "Arda Güler",
    "position": "MED (MD)",
    "age": 21,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 188838812,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 122745228,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 160512990,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 188838812,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "251570",
    "name": "Rayan Cherki",
    "position": "DEL (ED)",
    "age": 22,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 188838812,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 122745228,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 160512990,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 188838812,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "223334",
    "name": "Joelinton",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "246863",
    "name": "Felix Nmecha",
    "position": "MED (MCD)",
    "age": 25,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "227236",
    "name": "André-Franck Zambo Anguissa",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Cameroon"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "266866",
    "name": "Éderson",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "243245",
    "name": "Orkun Kökçü",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Beşiktaş"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Beşiktaş"
      }
    ]
  },
  {
    "id": "243576",
    "name": "Pedro Porro",
    "position": "DEF (LD)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "229261",
    "name": "Denis Zakaria",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "260247",
    "name": "Morgan Rogers",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "230872",
    "name": "Mile Svilar",
    "position": "POR (POR)",
    "age": 26,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "256853",
    "name": "Malik Tillman",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "225375",
    "name": "Konrad Laimer",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "236496",
    "name": "Mattéo Guendouzi",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "225201",
    "name": "Álex Berenguer",
    "position": "MED (MI)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "236703",
    "name": "David Raum",
    "position": "DEF (LI)",
    "age": 27,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "240091",
    "name": "Guglielmo Vicario",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "226226",
    "name": "Giovani Lo Celso",
    "position": "MED (MCO)",
    "age": 29,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "236015",
    "name": "Morgan Gibbs-White",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "227647",
    "name": "Maximilian Mittelstädt",
    "position": "DEF (LI)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "225116",
    "name": "Alex Meret",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "220793",
    "name": "Davinson Sánchez",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "222737",
    "name": "Malcom",
    "position": "MED (MCO)",
    "age": 29,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "229348",
    "name": "Antonee Robinson",
    "position": "DEF (LI)",
    "age": 28,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "255565",
    "name": "Kaoru Mitoma",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "229188",
    "name": "Vangelis Pavlidis",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "233556",
    "name": "Riccardo Orsolini",
    "position": "MED (MD)",
    "age": 29,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "bologna",
      "name": "Bologna"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Bologna"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Bologna"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Bologna"
      }
    ]
  },
  {
    "id": "264453",
    "name": "Micky van de Ven",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "222492",
    "name": "Leroy Sané",
    "position": "MED (MD)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "227678",
    "name": "Ezri Konsa",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "251470",
    "name": "Charles De Ketelaere",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "251805",
    "name": "Jurriën Timber",
    "position": "DEF (LD)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "244778",
    "name": "Trincão",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "206113",
    "name": "Serge Gnabry",
    "position": "MED (MI)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "244257",
    "name": "Jonathan Burkardt",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "213648",
    "name": "Pierre-Emile Højbjerg",
    "position": "MED (MCD)",
    "age": 30,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "235790",
    "name": "Kai Havertz",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "230142",
    "name": "Oyarzabal",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "237681",
    "name": "Takefusa Kubo",
    "position": "MED (MD)",
    "age": 24,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "236461",
    "name": "Jean-Philippe Mateta",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "229237",
    "name": "Manuel Akanji",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "243630",
    "name": "Jonathan David",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Canada"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "246147",
    "name": "Mason Greenwood",
    "position": "MED (MD)",
    "age": 24,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "231416",
    "name": "Dodi Lukébakio",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "232639",
    "name": "Ritsu Doan",
    "position": "MED (MD)",
    "age": 27,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "234824",
    "name": "Yoane Wissa",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Congo DR"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "246430",
    "name": "Dušan Vlahović",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "229476",
    "name": "Waldemar Anton",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "235243",
    "name": "Matthijs de Ligt",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "235410",
    "name": "Youssef En-Nesyri",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "241159",
    "name": "Marc Guéhi",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "231410",
    "name": "Brahim",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "243241",
    "name": "Alessandro Buongiorno",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "232488",
    "name": "Cristian Romero",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "236532",
    "name": "Robin Koch",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "247257",
    "name": "Ibañez",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Al Ahli"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Al Ahli"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Al Ahli"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Al Ahli"
      }
    ]
  },
  {
    "id": "237086",
    "name": "Kim Min Jae",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Korea Republic"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "251809",
    "name": "Sven Botman",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 158489319,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 103018057,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 134715921,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 158489319,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "226161",
    "name": "Marcos Llorente",
    "position": "DEF (LD)",
    "age": 31,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "212616",
    "name": "Rodrigo De Paul",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "inter-miami-cf",
      "name": "Inter Miami CF"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Inter Miami CF"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Inter Miami CF"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Inter Miami CF"
      }
    ]
  },
  {
    "id": "210514",
    "name": "João Cancelo",
    "position": "DEF (LD)",
    "age": 31,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "204935",
    "name": "Jordan Pickford",
    "position": "POR (POR)",
    "age": 32,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "223848",
    "name": "Sergej Milinković-Savić",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "186153",
    "name": "Wojciech Szczęsny",
    "position": "POR (POR)",
    "age": 35,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "167495",
    "name": "Manuel Neuer",
    "position": "POR (POR)",
    "age": 40,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "218667",
    "name": "Bernardo Silva",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "192505",
    "name": "Romelu Lukaku",
    "position": "DEL (DC)",
    "age": 32,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "197781",
    "name": "Isco",
    "position": "MED (MCO)",
    "age": 33,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "204485",
    "name": "Riyad Mahrez",
    "position": "MED (MD)",
    "age": 35,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "club",
      "name": "Al Ahli"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Al Ahli"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Al Ahli"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Al Ahli"
      }
    ]
  },
  {
    "id": "199845",
    "name": "Francesco Acerbi",
    "position": "DEF (DFC)",
    "age": 38,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "198176",
    "name": "Stefan de Vrij",
    "position": "DEF (DFC)",
    "age": 34,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "204638",
    "name": "Willi Orban",
    "position": "DEF (DFC)",
    "age": 33,
    "nationalities": [
      "Hungary"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 150713186,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97963571,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 128106208,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 150713186,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "270673",
    "name": "Warren Zaïre-Emery",
    "position": "MED (MC)",
    "age": 20,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 150000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97500000,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 127500000,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 150000000,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "273018",
    "name": "Andrey Santos",
    "position": "MED (MC)",
    "age": 21,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 150000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97500000,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 127500000,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 150000000,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "266127",
    "name": "Lewis Hall",
    "position": "DEF (LI)",
    "age": 21,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 150000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97500000,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 127500000,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 150000000,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "260592",
    "name": "Benjamin Šeško",
    "position": "DEL (DC)",
    "age": 22,
    "nationalities": [
      "Slovenia"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 150000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97500000,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 127500000,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 150000000,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "277179",
    "name": "Fermín",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 150000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97500000,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 127500000,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 150000000,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "270531",
    "name": "Ousmane Diomande",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 150000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 97500000,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 127500000,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 150000000,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "247246",
    "name": "Khéphren Thuram",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "238216",
    "name": "Conor Gallagher",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "238074",
    "name": "Reece James",
    "position": "DEF (LD)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "239807",
    "name": "Davide Frattesi",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "235840",
    "name": "Michele Di Gregorio",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "258648",
    "name": "Carlos Augusto",
    "position": "DEF (LI)",
    "age": 27,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "261865",
    "name": "Miguel Gutiérrez",
    "position": "DEF (LI)",
    "age": 24,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "228618",
    "name": "Ferland Mendy",
    "position": "DEF (LI)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "240679",
    "name": "Teun Koopmeiners",
    "position": "MED (MCO)",
    "age": 28,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "234060",
    "name": "Yangel Herrera",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Venezuela"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "233306",
    "name": "Dean Henderson",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "237646",
    "name": "Daniel Muñoz",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "235944",
    "name": "Brais Méndez",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "259516",
    "name": "Johnny Cardoso",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "223885",
    "name": "Alexander Nübel",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "245630",
    "name": "Youssouf Fofana",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "242641",
    "name": "Rayan Aït-Nouri",
    "position": "DEF (LI)",
    "age": 24,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "211688",
    "name": "Gayà",
    "position": "DEF (LI)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "251566",
    "name": "Gabriel Martinelli",
    "position": "DEL (EI)",
    "age": 24,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "253396",
    "name": "Giuliano Simeone",
    "position": "MED (MD)",
    "age": 23,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "225309",
    "name": "Nadiem Amiri",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "mainz-05",
      "name": "Mainz 05"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Mainz 05"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Mainz 05"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Mainz 05"
      }
    ]
  },
  {
    "id": "212228",
    "name": "Ivan Toney",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "club",
      "name": "Al Ahli"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Al Ahli"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Al Ahli"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Al Ahli"
      }
    ]
  },
  {
    "id": "235805",
    "name": "Federico Chiesa",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "239301",
    "name": "Lisandro Martínez",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "239482",
    "name": "Galeno",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Al Ahli"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Al Ahli"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Al Ahli"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Al Ahli"
      }
    ]
  },
  {
    "id": "243952",
    "name": "Andriy Lunin",
    "position": "POR (POR)",
    "age": 27,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "255475",
    "name": "Antony",
    "position": "DEL (ED)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "230670",
    "name": "Lucas Perri",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "222509",
    "name": "Dani Ceballos",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "247263",
    "name": "Edmond Tapsoba",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Burkina Faso"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "251852",
    "name": "Karim Adeyemi",
    "position": "MED (MD)",
    "age": 24,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "257470",
    "name": "Anthony Elanga",
    "position": "DEL (ED)",
    "age": 23,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "236632",
    "name": "David Neres",
    "position": "DEL (EI)",
    "age": 29,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "236403",
    "name": "Evan Ndicka",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "210676",
    "name": "Wladimiro Falcone",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "lecce",
      "name": "Lecce"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Lecce"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Lecce"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Lecce"
      }
    ]
  },
  {
    "id": "220814",
    "name": "Lucas Hernández",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "237679",
    "name": "Randal Kolo Muani",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "257179",
    "name": "Gonçalo Inácio",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "242835",
    "name": "Leonardo Balerdi",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "232411",
    "name": "Christopher Nkunku",
    "position": "MED (MCO)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "243854",
    "name": "Mohamed Simakan",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "al-nassr",
      "name": "Al Nassr"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Al Nassr"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Al Nassr"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Al Nassr"
      }
    ]
  },
  {
    "id": "214096",
    "name": "Tim Kleindienst",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-m-nchengladbach",
      "name": "Borussia Mönchengladbach"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Borussia Mönchengladbach"
      }
    ]
  },
  {
    "id": "231652",
    "name": "Simon Banza",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Congo DR"
    ],
    "club": {
      "id": "club",
      "name": "SC Braga"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "SC Braga"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "SC Braga"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "SC Braga"
      }
    ]
  },
  {
    "id": "244749",
    "name": "Nayef Aguerd",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "247679",
    "name": "Victor Boniface",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "werder-bremen",
      "name": "Werder Bremen"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Werder Bremen"
      }
    ]
  },
  {
    "id": "232756",
    "name": "Fikayo Tomori",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "212190",
    "name": "Niklas Süle",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 125892541,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 81830152,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 107008660,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 125892541,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "192883",
    "name": "Henrikh Mkhitaryan",
    "position": "MED (MC)",
    "age": 37,
    "nationalities": [
      "Armenia"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "217870",
    "name": "Giovanni Di Lorenzo",
    "position": "DEF (LD)",
    "age": 32,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "215590",
    "name": "Ayoze",
    "position": "DEL (DC)",
    "age": 32,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "216201",
    "name": "Iñaki Williams",
    "position": "MED (MD)",
    "age": 31,
    "nationalities": [
      "Ghana"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "227127",
    "name": "Álex Remiro",
    "position": "POR (POR)",
    "age": 31,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "207410",
    "name": "Mateo Kovačić",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "209989",
    "name": "Thomas Partey",
    "position": "MED (MCD)",
    "age": 32,
    "nationalities": [
      "Ghana"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "216435",
    "name": "Stanislav Lobotka",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Slovakia"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "177003",
    "name": "Luka Modrić",
    "position": "MED (MC)",
    "age": 40,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "208722",
    "name": "Sadio Mané",
    "position": "MED (MI)",
    "age": 33,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "al-nassr",
      "name": "Al Nassr"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Al Nassr"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Al Nassr"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Al Nassr"
      }
    ]
  },
  {
    "id": "193698",
    "name": "Oliver Baumann",
    "position": "POR (POR)",
    "age": 35,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "tsg-hoffenheim",
      "name": "TSG Hoffenheim"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "TSG Hoffenheim"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "TSG Hoffenheim"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "TSG Hoffenheim"
      }
    ]
  },
  {
    "id": "199641",
    "name": "Matz Sels",
    "position": "POR (POR)",
    "age": 34,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "186942",
    "name": "İlkay Gündoğan",
    "position": "MED (MC)",
    "age": 35,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "208920",
    "name": "Nathan Aké",
    "position": "DEF (DFC)",
    "age": 31,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "192629",
    "name": "Iago Aspas",
    "position": "DEL (ED)",
    "age": 38,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "207421",
    "name": "Leandro Trossard",
    "position": "DEL (EI)",
    "age": 31,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "216460",
    "name": "José María Giménez",
    "position": "DEF (DFC)",
    "age": 31,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "244263",
    "name": "Amir Rrahmani",
    "position": "DEF (DFC)",
    "age": 32,
    "nationalities": [
      "Kosovo"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 119715739,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77815230,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 101758378,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 119715739,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "275298",
    "name": "Aleksandar Pavlović",
    "position": "MED (MCD)",
    "age": 21,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "259307",
    "name": "Malo Gusto",
    "position": "DEF (LD)",
    "age": 22,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "260815",
    "name": "Arnau Martínez",
    "position": "DEF (LD)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "259240",
    "name": "Adam Wharton",
    "position": "MED (MCD)",
    "age": 22,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "264388",
    "name": "Moleiro",
    "position": "MED (MI)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "277846",
    "name": "Nico Paz",
    "position": "MED (MCO)",
    "age": 21,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "como-1907",
      "name": "Como 1907"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "Como 1907"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "Como 1907"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "Como 1907"
      }
    ]
  },
  {
    "id": "277954",
    "name": "Kenan Yıldız",
    "position": "MED (MCO)",
    "age": 20,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "247172",
    "name": "Jhon Durán",
    "position": "DEL (DC)",
    "age": 22,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "272600",
    "name": "Marc Casadó",
    "position": "MED (MCD)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "277581",
    "name": "Samu",
    "position": "DEL (DC)",
    "age": 21,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "277797",
    "name": "Marcos Leonardo",
    "position": "DEL (DC)",
    "age": 22,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 119149235,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 77447003,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 101276850,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 119149235,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "263205",
    "name": "Barış Alper Yılmaz",
    "position": "MED (MI)",
    "age": 25,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "213666",
    "name": "Ruben Loftus-Cheek",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "230938",
    "name": "Franck Yannick Kessié",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "club",
      "name": "Al Ahli"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Al Ahli"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Al Ahli"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Al Ahli"
      }
    ]
  },
  {
    "id": "251806",
    "name": "Quinten Timber",
    "position": "MED (MC)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Feyenoord"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Feyenoord"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Feyenoord"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Feyenoord"
      }
    ]
  },
  {
    "id": "226753",
    "name": "André Onana",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Cameroon"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "231913",
    "name": "Fredrik Aursnes",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Norway"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "226754",
    "name": "Ismaël Bennacer",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "club",
      "name": "Dinamo Zagreb"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Dinamo Zagreb"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Dinamo Zagreb"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Dinamo Zagreb"
      }
    ]
  },
  {
    "id": "228251",
    "name": "Lorenzo Pellegrini",
    "position": "MED (MCO)",
    "age": 29,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "251479",
    "name": "Maxim De Cuyper",
    "position": "DEF (LI)",
    "age": 25,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "259583",
    "name": "Destiny Udogie",
    "position": "DEF (LI)",
    "age": 23,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "245155",
    "name": "Mohammed Kudus",
    "position": "DEL (ED)",
    "age": 25,
    "nationalities": [
      "Ghana"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "268889",
    "name": "Álvaro Carreras",
    "position": "DEF (LI)",
    "age": 23,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "270571",
    "name": "Gabriel Sara",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "232665",
    "name": "Mauro Arambarri",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "getafe-cf",
      "name": "Getafe CF"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Getafe CF"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Getafe CF"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Getafe CF"
      }
    ]
  },
  {
    "id": "242434",
    "name": "Curtis Jones",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "254243",
    "name": "Elliot Anderson",
    "position": "MED (MCD)",
    "age": 23,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "233927",
    "name": "Lucas Paquetá",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "259694",
    "name": "Mingueza",
    "position": "DEF (LD)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "224656",
    "name": "Ola Aina",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "236499",
    "name": "Douglas Luiz",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "259913",
    "name": "Georgiy Sudakov",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "236401",
    "name": "Noussair Mazraoui",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "252802",
    "name": "Wilfried Singo",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "226300",
    "name": "Uğurcan Çakır",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "233195",
    "name": "Xaver Schlager",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "250753",
    "name": "Anatoliy Trubin",
    "position": "POR (POR)",
    "age": 24,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "225126",
    "name": "Ellyes Skhiri",
    "position": "MED (MCD)",
    "age": 30,
    "nationalities": [
      "Tunisia"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "227535",
    "name": "Rodrigo Bentancur",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "213655",
    "name": "Alex Iwobi",
    "position": "MED (MI)",
    "age": 29,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "241508",
    "name": "Mikkel Damsgaard",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "264697",
    "name": "Mohamed Amoura",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "73562",
    "name": "Bento",
    "position": "POR (POR)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "al-nassr",
      "name": "Al Nassr"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Al Nassr"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Al Nassr"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Al Nassr"
      }
    ]
  },
  {
    "id": "220876",
    "name": "Franck Honorat",
    "position": "MED (MD)",
    "age": 29,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "borussia-m-nchengladbach",
      "name": "Borussia Mönchengladbach"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Borussia Mönchengladbach"
      }
    ]
  },
  {
    "id": "234579",
    "name": "Julian Quiñones",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Mexico"
    ],
    "club": {
      "id": "club",
      "name": "Al Qadsiah"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Al Qadsiah"
      }
    ]
  },
  {
    "id": "254796",
    "name": "Noni Madueke",
    "position": "DEL (ED)",
    "age": 24,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "206517",
    "name": "Jack Grealish",
    "position": "DEL (EI)",
    "age": 30,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "228579",
    "name": "Benjamin Henrichs",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "262118",
    "name": "Tino Livramento",
    "position": "DEF (LD)",
    "age": 23,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "239380",
    "name": "Noa Lang",
    "position": "DEL (EI)",
    "age": 26,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "269626",
    "name": "Đorđe Petrović",
    "position": "POR (POR)",
    "age": 26,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "238616",
    "name": "Pedro Neto",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "241236",
    "name": "Antoine Semenyo",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Ghana"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "225953",
    "name": "Steven Bergwijn",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "al-ittihad",
      "name": "Al Ittihad"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Al Ittihad"
      }
    ]
  },
  {
    "id": "230666",
    "name": "Gabriel Jesus",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "234742",
    "name": "Harvey Barnes",
    "position": "DEL (EI)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "229880",
    "name": "Aaron Wan-Bissaka",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Congo DR"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "255654",
    "name": "Pierre Kalulu",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "237712",
    "name": "Valentin Castellanos",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "226110",
    "name": "Nicolas Pépé",
    "position": "MED (MD)",
    "age": 30,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "246242",
    "name": "Boulaye Dia",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "229668",
    "name": "Mario Hermoso",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "238900",
    "name": "Ermedin Demirović",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Bosnia and Herzegovina"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "241727",
    "name": "Predrag Rajković",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "al-ittihad",
      "name": "Al Ittihad"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Al Ittihad"
      }
    ]
  },
  {
    "id": "259197",
    "name": "Nicolas Jackson",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "231677",
    "name": "Marcus Rashford",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "256948",
    "name": "Christos Tzolis",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "club",
      "name": "Club Brugge"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Club Brugge"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Club Brugge"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Club Brugge"
      }
    ]
  },
  {
    "id": "246420",
    "name": "Jérémy Doku",
    "position": "DEL (EI)",
    "age": 23,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "271400",
    "name": "Igor Paixão",
    "position": "MED (MI)",
    "age": 25,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "235149",
    "name": "Jerdy Schouten",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "256903",
    "name": "Gonçalo Ramos",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "225539",
    "name": "Dominic Solanke",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "243593",
    "name": "Armand Laurienté",
    "position": "DEL (EI)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "sassuolo",
      "name": "Sassuolo"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Sassuolo"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Sassuolo"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Sassuolo"
      }
    ]
  },
  {
    "id": "262859",
    "name": "Levi Colwill",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "264862",
    "name": "Maghnes Akliouche",
    "position": "MED (MD)",
    "age": 24,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "220834",
    "name": "Marco Asensio",
    "position": "DEL (ED)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "258580",
    "name": "Kerem Aktürkoğlu",
    "position": "DEL (EI)",
    "age": 27,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "258908",
    "name": "Jan Paul van Hecke",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "244176",
    "name": "Deniz Undav",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "246172",
    "name": "Samuel Chukwueze",
    "position": "DEL (ED)",
    "age": 26,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "262138",
    "name": "Castello Lukeba",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "256612",
    "name": "Evanilson",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "257278",
    "name": "Arthur Theate",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "233049",
    "name": "Jadon Sancho",
    "position": "DEL (EI)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "241464",
    "name": "Pau Torres",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "242816",
    "name": "Riqui Puig",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "club",
      "name": "LA Galaxy"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "LA Galaxy"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "LA Galaxy"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "LA Galaxy"
      }
    ]
  },
  {
    "id": "246875",
    "name": "Odilon Kossounou",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "234569",
    "name": "Florentino",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "club",
      "name": "Burnley"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Burnley"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Burnley"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Burnley"
      }
    ]
  },
  {
    "id": "259377",
    "name": "Yeremy Pino",
    "position": "MED (MD)",
    "age": 23,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "266872",
    "name": "Federico Gatti",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "220440",
    "name": "Clément Lenglet",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "269493",
    "name": "Alexsandro",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "losc-lille",
      "name": "LOSC Lille"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "LOSC Lille"
      }
    ]
  },
  {
    "id": "213661",
    "name": "Andreas Christensen",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 100000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 65000000,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 85000000,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 100000000,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "209658",
    "name": "Leon Goretzka",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "208333",
    "name": "Emre Can",
    "position": "DEF (DFC)",
    "age": 32,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "210411",
    "name": "Otávio",
    "position": "MED (MCO)",
    "age": 31,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "club",
      "name": "Al Qadsiah"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Al Qadsiah"
      }
    ]
  },
  {
    "id": "210602",
    "name": "Salem Al Dawsari",
    "position": "MED (MI)",
    "age": 34,
    "nationalities": [
      "Saudi Arabia"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "197445",
    "name": "David Alaba",
    "position": "DEF (DFC)",
    "age": 33,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "215316",
    "name": "Gerónimo Rulli",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "224987",
    "name": "Ivan Provedel",
    "position": "POR (POR)",
    "age": 32,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "192984",
    "name": "Koen Casteels",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "club",
      "name": "Al Qadsiah"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Al Qadsiah"
      }
    ]
  },
  {
    "id": "216267",
    "name": "Andrew Robertson",
    "position": "DEF (LI)",
    "age": 32,
    "nationalities": [
      "Scotland"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "209981",
    "name": "Yassine Bounou",
    "position": "POR (POR)",
    "age": 34,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "209499",
    "name": "Fabinho",
    "position": "MED (MCD)",
    "age": 32,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "al-ittihad",
      "name": "Al Ittihad"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Al Ittihad"
      }
    ]
  },
  {
    "id": "210047",
    "name": "Fabian Schär",
    "position": "DEF (DFC)",
    "age": 34,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "216547",
    "name": "Rafa",
    "position": "MED (MCO)",
    "age": 32,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "club",
      "name": "Beşiktaş"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Beşiktaş"
      }
    ]
  },
  {
    "id": "183898",
    "name": "Ángel Di María",
    "position": "DEL (ED)",
    "age": 38,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "rosario-central",
      "name": "Rosario Central"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Rosario Central"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Rosario Central"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Rosario Central"
      }
    ]
  },
  {
    "id": "192318",
    "name": "Mario Götze",
    "position": "MED (MC)",
    "age": 33,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "210935",
    "name": "Domenico Berardi",
    "position": "DEL (ED)",
    "age": 31,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "sassuolo",
      "name": "Sassuolo"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Sassuolo"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Sassuolo"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Sassuolo"
      }
    ]
  },
  {
    "id": "203574",
    "name": "John Stones",
    "position": "DEF (DFC)",
    "age": 31,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "189513",
    "name": "Parejo",
    "position": "MED (MC)",
    "age": 36,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "201024",
    "name": "Kalidou Koulibaly",
    "position": "DEF (DFC)",
    "age": 34,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "215333",
    "name": "Duván Zapata",
    "position": "DEL (DC)",
    "age": 35,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "torino",
      "name": "Torino"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Torino"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Torino"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Torino"
      }
    ]
  },
  {
    "id": "192366",
    "name": "Nicolás Otamendi",
    "position": "DEF (DFC)",
    "age": 38,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "200724",
    "name": "Nacho Fernández",
    "position": "DEF (DFC)",
    "age": 36,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "club",
      "name": "Al Qadsiah"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Al Qadsiah"
      }
    ]
  },
  {
    "id": "207862",
    "name": "Matthias Ginter",
    "position": "DEF (DFC)",
    "age": 32,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "sc-freiburg",
      "name": "SC Freiburg"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "SC Freiburg"
      }
    ]
  },
  {
    "id": "212218",
    "name": "Aymeric Laporte",
    "position": "DEF (DFC)",
    "age": 31,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "al-nassr",
      "name": "Al Nassr"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Al Nassr"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Al Nassr"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Al Nassr"
      }
    ]
  },
  {
    "id": "188335",
    "name": "Ante Budimir",
    "position": "DEL (DC)",
    "age": 34,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "ca-osasuna",
      "name": "CA Osasuna"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "CA Osasuna"
      }
    ]
  },
  {
    "id": "192123",
    "name": "Chris Wood",
    "position": "DEL (DC)",
    "age": 34,
    "nationalities": [
      "New Zealand"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "210413",
    "name": "Alessio Romagnoli",
    "position": "DEF (DFC)",
    "age": 31,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 95093592,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61810835,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 80829553,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 95093592,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "268896",
    "name": "Hugo Larsson",
    "position": "MED (MC)",
    "age": 21,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "279604",
    "name": "Jauregizar",
    "position": "MED (MC)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "278773",
    "name": "Myles Lewis-Skelly",
    "position": "DEF (LI)",
    "age": 19,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "264298",
    "name": "Conor Bradley",
    "position": "DEF (LD)",
    "age": 22,
    "nationalities": [
      "Northern Ireland"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "254262",
    "name": "Zeno Debast",
    "position": "MED (MCD)",
    "age": 22,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "265526",
    "name": "Guillaume Restes",
    "position": "POR (POR)",
    "age": 21,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "toulouse-fc",
      "name": "Toulouse FC"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Toulouse FC"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Toulouse FC"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Toulouse FC"
      }
    ]
  },
  {
    "id": "262088",
    "name": "Hákon Arnar Haraldsson",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "Iceland"
    ],
    "club": {
      "id": "losc-lille",
      "name": "LOSC Lille"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "LOSC Lille"
      }
    ]
  },
  {
    "id": "263620",
    "name": "Romeo Lavia",
    "position": "MED (MCD)",
    "age": 22,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "272978",
    "name": "Jorrel Hato",
    "position": "DEF (LI)",
    "age": 20,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "76687",
    "name": "Estêvão",
    "position": "MED (MD)",
    "age": 18,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "270086",
    "name": "António Silva",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "265450",
    "name": "Johan Bakayoko",
    "position": "DEL (ED)",
    "age": 22,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "265695",
    "name": "Matías Soulé",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "246174",
    "name": "Harvey Elliott",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "266032",
    "name": "Jamie Gittens",
    "position": "MED (MI)",
    "age": 21,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "256420",
    "name": "Malick Fofana",
    "position": "MED (MI)",
    "age": 21,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "olympique-lyonnais",
      "name": "Olympique Lyonnais"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Olympique Lyonnais"
      }
    ]
  },
  {
    "id": "279709",
    "name": "Lucas Beraldo",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "269087",
    "name": "Leny Yoro",
    "position": "DEF (DFC)",
    "age": 20,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 94643602,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 61518341,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 80447062,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 94643602,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "262881",
    "name": "Richard Ríos",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "246321",
    "name": "Daizen Maeda",
    "position": "DEL (EI)",
    "age": 28,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "club",
      "name": "Celtic"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Celtic"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Celtic"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Celtic"
      }
    ]
  },
  {
    "id": "250723",
    "name": "Kouadio Manu Koné",
    "position": "MED (MC)",
    "age": 24,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "251377",
    "name": "Rodrigo Zalazar",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "club",
      "name": "SC Braga"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "SC Braga"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "SC Braga"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "SC Braga"
      }
    ]
  },
  {
    "id": "253124",
    "name": "Matheus Nunes",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "234574",
    "name": "Diogo Dalot",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "248165",
    "name": "Andrei Rațiu",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "Romania"
    ],
    "club": {
      "id": "rayo-vallecano",
      "name": "Rayo Vallecano"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Rayo Vallecano"
      }
    ]
  },
  {
    "id": "251804",
    "name": "Sergiño Dest",
    "position": "DEF (LD)",
    "age": 25,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "258966",
    "name": "Andrea Cambiaso",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "224196",
    "name": "Ramy Bensebaini",
    "position": "DEF (LI)",
    "age": 30,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "235152",
    "name": "Ferdi Kadıoğlu",
    "position": "DEF (LD)",
    "age": 26,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "242087",
    "name": "Hidemasa Morita",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "253072",
    "name": "Darwin Núñez",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "255069",
    "name": "Nico González",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "226456",
    "name": "Pablo Fornals",
    "position": "MED (MCD)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "233084",
    "name": "Nahuel Molina",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "248465",
    "name": "Ian Maatsen",
    "position": "DEF (LI)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "252552",
    "name": "Konstantinos Tzolakis",
    "position": "POR (POR)",
    "age": 23,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "club",
      "name": "Olympiacos FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Olympiacos FC"
      }
    ]
  },
  {
    "id": "220651",
    "name": "Angeliño",
    "position": "DEF (LI)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "224836",
    "name": "Vanja Milinković-Savić",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "229891",
    "name": "Julian Ryerson",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Norway"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "234505",
    "name": "Evander",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "FC Cincinnati"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "FC Cincinnati"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "FC Cincinnati"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "FC Cincinnati"
      }
    ]
  },
  {
    "id": "257191",
    "name": "Anton Stach",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "241811",
    "name": "Sergio Gómez",
    "position": "MED (MI)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "257980",
    "name": "Dan Ndoye",
    "position": "MED (MI)",
    "age": 25,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "259868",
    "name": "Pape Matar Sarr",
    "position": "MED (MC)",
    "age": 23,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "255001",
    "name": "Nicolò Rovella",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "257057",
    "name": "Amadou Onana",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "227174",
    "name": "Matty Cash",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "241509",
    "name": "Mauro Júnior",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "259480",
    "name": "Ismael Saibari",
    "position": "MED (MCO)",
    "age": 24,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "225663",
    "name": "Alexandr Golovin",
    "position": "MED (MI)",
    "age": 29,
    "nationalities": [
      "Russia"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "233301",
    "name": "Rasmus Kristensen",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "268804",
    "name": "Mario Gila",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "232999",
    "name": "Tyler Adams",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "237819",
    "name": "Nicolás Domínguez",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "237942",
    "name": "Pervis Estupiñán",
    "position": "DEF (LI)",
    "age": 28,
    "nationalities": [
      "Ecuador"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "246657",
    "name": "Álvaro Valles",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "260599",
    "name": "Alan Varela",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "224294",
    "name": "Lewis Cook",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "241095",
    "name": "Nikola Vlašić",
    "position": "MED (MCO)",
    "age": 28,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "torino",
      "name": "Torino"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Torino"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Torino"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Torino"
      }
    ]
  },
  {
    "id": "262402",
    "name": "Sergi Cardona",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "228383",
    "name": "Kamil Grabara",
    "position": "POR (POR)",
    "age": 27,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "240913",
    "name": "Caoimhin Kelleher",
    "position": "POR (POR)",
    "age": 27,
    "nationalities": [
      "Republic of Ireland"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "242664",
    "name": "Alexis Saelemaekers",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "240753",
    "name": "Amine Gouiri",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "205988",
    "name": "Luke Shaw",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "227186",
    "name": "Augusto Batalla",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "rayo-vallecano",
      "name": "Rayo Vallecano"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Rayo Vallecano"
      }
    ]
  },
  {
    "id": "231184",
    "name": "Guruzeta",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "246606",
    "name": "Fran García",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "253306",
    "name": "Manuel Ugarte",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "73078",
    "name": "Kaishū Sano",
    "position": "MED (MCD)",
    "age": 25,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "mainz-05",
      "name": "Mainz 05"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Mainz 05"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Mainz 05"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Mainz 05"
      }
    ]
  },
  {
    "id": "238004",
    "name": "Albert Guðmundsson",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Iceland"
    ],
    "club": {
      "id": "fiorentina",
      "name": "Fiorentina"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Fiorentina"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Fiorentina"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Fiorentina"
      }
    ]
  },
  {
    "id": "242444",
    "name": "João Félix",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "al-nassr",
      "name": "Al Nassr"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Al Nassr"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Al Nassr"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Al Nassr"
      }
    ]
  },
  {
    "id": "225863",
    "name": "Olivier Boscagli",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "228092",
    "name": "Sander Berge",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Norway"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "245371",
    "name": "Thiago Almada",
    "position": "MED (MCO)",
    "age": 24,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "258444",
    "name": "Evann Guessand",
    "position": "DEL (ED)",
    "age": 24,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "243780",
    "name": "Lee Kang In",
    "position": "DEL (ED)",
    "age": 25,
    "nationalities": [
      "Korea Republic"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "254088",
    "name": "Amad",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "236920",
    "name": "Justin Kluivert",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "231447",
    "name": "Donyell Malen",
    "position": "MED (MD)",
    "age": 27,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "235353",
    "name": "Ismaïla Sarr",
    "position": "MED (MCO)",
    "age": 28,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "236804",
    "name": "Facundo Medina",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "245152",
    "name": "Santiago Giménez",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Mexico"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "253109",
    "name": "Joey Veerman",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "236786",
    "name": "Martin Terrier",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "223671",
    "name": "Stefan Posch",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "como-1907",
      "name": "Como 1907"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Como 1907"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Como 1907"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Como 1907"
      }
    ]
  },
  {
    "id": "254117",
    "name": "Maximilian Beier",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "258575",
    "name": "Emmanuel Agbadou",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "wolverhampton-wanderers",
      "name": "Wolverhampton Wanderers"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Wolverhampton Wanderers"
      }
    ]
  },
  {
    "id": "229906",
    "name": "Leon Bailey",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "Jamaica"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "244369",
    "name": "Viktor Tsygankov",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "261188",
    "name": "Iliman Ndiaye",
    "position": "MED (MI)",
    "age": 26,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "226166",
    "name": "Nordi Mukiele",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "club",
      "name": "Sunderland"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Sunderland"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Sunderland"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Sunderland"
      }
    ]
  },
  {
    "id": "230918",
    "name": "Trevoh Chalobah",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "252042",
    "name": "João Pedro",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "244067",
    "name": "Maxence Lacroix",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "251421",
    "name": "Brennan Johnson",
    "position": "DEL (ED)",
    "age": 24,
    "nationalities": [
      "Wales"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "237221",
    "name": "Juan Foyth",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "238186",
    "name": "Marcin Bułka",
    "position": "POR (POR)",
    "age": 26,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "club",
      "name": "Neom"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Neom"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Neom"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Neom"
      }
    ]
  },
  {
    "id": "246565",
    "name": "Bafodé Diakité",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "252037",
    "name": "Fábio Silva",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "248695",
    "name": "Wesley Fofana",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "245037",
    "name": "Eric García",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-barcelona",
      "name": "FC Barcelona"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "FC Barcelona"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "FC Barcelona"
      }
    ]
  },
  {
    "id": "254022",
    "name": "Nick Woltemade",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "228174",
    "name": "Cameron Carter-Vickers",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "club",
      "name": "Celtic"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Celtic"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Celtic"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Celtic"
      }
    ]
  },
  {
    "id": "239763",
    "name": "Edon Zhegrova",
    "position": "MED (MD)",
    "age": 27,
    "nationalities": [
      "Kosovo"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "258781",
    "name": "Illia Zabarnyi",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "226229",
    "name": "Thilo Kehrer",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "261050",
    "name": "Francisco Conceição",
    "position": "MED (MD)",
    "age": 23,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "225100",
    "name": "Joe Gomez",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "258911",
    "name": "Toluwalase Arokodare",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "wolverhampton-wanderers",
      "name": "Wolverhampton Wanderers"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Wolverhampton Wanderers"
      }
    ]
  },
  {
    "id": "226710",
    "name": "Gianluca Scamacca",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "247649",
    "name": "Jarrad Branthwaite",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "237985",
    "name": "Kevin Danso",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "231366",
    "name": "Philipp Lienhart",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "sc-freiburg",
      "name": "SC Freiburg"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "SC Freiburg"
      }
    ]
  },
  {
    "id": "248484",
    "name": "Nathan Collins",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Republic of Ireland"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 79432823,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 51631335,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 67517900,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 79432823,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "208574",
    "name": "Filip Kostić",
    "position": "MED (MI)",
    "age": 33,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "202648",
    "name": "Sergi Darder",
    "position": "MED (MI)",
    "age": 32,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rcd-mallorca",
      "name": "RCD Mallorca"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "RCD Mallorca"
      }
    ]
  },
  {
    "id": "210881",
    "name": "John McGinn",
    "position": "MED (MI)",
    "age": 31,
    "nationalities": [
      "Scotland"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "181458",
    "name": "Ivan Perišić",
    "position": "DEL (ED)",
    "age": 37,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "219683",
    "name": "Corentin Tolisso",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "olympique-lyonnais",
      "name": "Olympique Lyonnais"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Olympique Lyonnais"
      }
    ]
  },
  {
    "id": "208418",
    "name": "Yannick Carrasco",
    "position": "DEL (EI)",
    "age": 32,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "club",
      "name": "Al Shabab"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Al Shabab"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Al Shabab"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Al Shabab"
      }
    ]
  },
  {
    "id": "208461",
    "name": "Marten de Roon",
    "position": "MED (MC)",
    "age": 35,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "216352",
    "name": "Marcelo Brozović",
    "position": "MED (MCD)",
    "age": 33,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "al-nassr",
      "name": "Al Nassr"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Al Nassr"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Al Nassr"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Al Nassr"
      }
    ]
  },
  {
    "id": "206085",
    "name": "Jacob Murphy",
    "position": "DEL (ED)",
    "age": 31,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "193747",
    "name": "Koke",
    "position": "MED (MC)",
    "age": 34,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "212242",
    "name": "Robert Andrich",
    "position": "MED (MCD)",
    "age": 31,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "188943",
    "name": "Kevin Trapp",
    "position": "POR (POR)",
    "age": 35,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "paris-fc",
      "name": "Paris FC"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Paris FC"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Paris FC"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Paris FC"
      }
    ]
  },
  {
    "id": "212523",
    "name": "Anderson Talisca",
    "position": "MED (MCO)",
    "age": 32,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "203841",
    "name": "Nick Pope",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "223952",
    "name": "David Soria",
    "position": "POR (POR)",
    "age": 32,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "getafe-cf",
      "name": "Getafe CF"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Getafe CF"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Getafe CF"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Getafe CF"
      }
    ]
  },
  {
    "id": "184392",
    "name": "Matteo Darmian",
    "position": "DEF (LD)",
    "age": 36,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "216409",
    "name": "Matteo Politano",
    "position": "DEL (ED)",
    "age": 32,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "202024",
    "name": "Remo Freuler",
    "position": "MED (MCD)",
    "age": 33,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "bologna",
      "name": "Bologna"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Bologna"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Bologna"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Bologna"
      }
    ]
  },
  {
    "id": "213516",
    "name": "Ricardo Horta",
    "position": "MED (MCO)",
    "age": 31,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "club",
      "name": "SC Braga"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "SC Braga"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "SC Braga"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "SC Braga"
      }
    ]
  },
  {
    "id": "208093",
    "name": "Gerard Moreno",
    "position": "DEL (DC)",
    "age": 33,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "210385",
    "name": "Rui Silva",
    "position": "POR (POR)",
    "age": 32,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "190941",
    "name": "Lukáš Hrádecký",
    "position": "POR (POR)",
    "age": 36,
    "nationalities": [
      "Finland"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "232498",
    "name": "Isi",
    "position": "MED (MCO)",
    "age": 31,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rayo-vallecano",
      "name": "Rayo Vallecano"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Rayo Vallecano"
      }
    ]
  },
  {
    "id": "201153",
    "name": "Morata",
    "position": "DEL (DC)",
    "age": 33,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "como-1907",
      "name": "Como 1907"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Como 1907"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Como 1907"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Como 1907"
      }
    ]
  },
  {
    "id": "216354",
    "name": "Andrej Kramarić",
    "position": "MED (MCO)",
    "age": 34,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "tsg-hoffenheim",
      "name": "TSG Hoffenheim"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "TSG Hoffenheim"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "TSG Hoffenheim"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "TSG Hoffenheim"
      }
    ]
  },
  {
    "id": "200888",
    "name": "Danilo Pereira",
    "position": "DEF (DFC)",
    "age": 34,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "al-ittihad",
      "name": "Al Ittihad"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Al Ittihad"
      }
    ]
  },
  {
    "id": "188567",
    "name": "Pierre-Emerick Aubameyang",
    "position": "DEL (DC)",
    "age": 36,
    "nationalities": [
      "Gabon"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "201399",
    "name": "Mauro Icardi",
    "position": "DEL (DC)",
    "age": 33,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "180930",
    "name": "Edin Džeko",
    "position": "DEL (DC)",
    "age": 40,
    "nationalities": [
      "Bosnia and Herzegovina"
    ],
    "club": {
      "id": "fiorentina",
      "name": "Fiorentina"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Fiorentina"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Fiorentina"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Fiorentina"
      }
    ]
  },
  {
    "id": "232363",
    "name": "Milan Škriniar",
    "position": "DEF (DFC)",
    "age": 31,
    "nationalities": [
      "Slovakia"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "228805",
    "name": "Raíllo",
    "position": "DEF (DFC)",
    "age": 34,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rcd-mallorca",
      "name": "RCD Mallorca"
    },
    "marketValue": 75535525,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 49098091,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2024",
        "marketValue": 64205196,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2026",
        "marketValue": 75535525,
        "clubName": "RCD Mallorca"
      }
    ]
  },
  {
    "id": "80170",
    "name": "Wesley",
    "position": "DEF (LD)",
    "age": 22,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "266436",
    "name": "Javi Guerra",
    "position": "MED (MC)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "275138",
    "name": "Lamine Camara",
    "position": "MED (MC)",
    "age": 22,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "269136",
    "name": "Kobbie Mainoo",
    "position": "MED (MC)",
    "age": 20,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "270039",
    "name": "Diego Moreira",
    "position": "MED (MI)",
    "age": 21,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "rc-strasbourg",
      "name": "RC Strasbourg"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "RC Strasbourg"
      }
    ]
  },
  {
    "id": "272926",
    "name": "Lucas Bergvall",
    "position": "MED (MC)",
    "age": 20,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "264293",
    "name": "Habib Diarra",
    "position": "MED (MC)",
    "age": 22,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "club",
      "name": "Sunderland"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Sunderland"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Sunderland"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Sunderland"
      }
    ]
  },
  {
    "id": "271800",
    "name": "Yankuba Minteh",
    "position": "MED (MD)",
    "age": 21,
    "nationalities": [
      "Gambia"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "269859",
    "name": "Arthur Vermeeren",
    "position": "MED (MC)",
    "age": 21,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "271574",
    "name": "Rico Lewis",
    "position": "DEF (LD)",
    "age": 21,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "261654",
    "name": "Omar El Hilali",
    "position": "DEF (LD)",
    "age": 22,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "rcd-espanyol",
      "name": "RCD Espanyol"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "RCD Espanyol"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "RCD Espanyol"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "RCD Espanyol"
      }
    ]
  },
  {
    "id": "279173",
    "name": "Franco Mastantuono",
    "position": "MED (MCO)",
    "age": 18,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "268438",
    "name": "Alejandro Garnacho",
    "position": "MED (MCO)",
    "age": 21,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "269701",
    "name": "Nathaniel Brown",
    "position": "DEF (LI)",
    "age": 22,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "268421",
    "name": "Mathys Tel",
    "position": "DEL (DC)",
    "age": 20,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "272505",
    "name": "Endrick",
    "position": "DEL (DC)",
    "age": 19,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "277031",
    "name": "Abdukodir Khusanov",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Uzbekistan"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "264846",
    "name": "Mosquera",
    "position": "DEF (DFC)",
    "age": 21,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "270077",
    "name": "Konstantinos Koulierakis",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "273752",
    "name": "Wouter Goes",
    "position": "DEF (DFC)",
    "age": 21,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "AZ"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "AZ"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "AZ"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "AZ"
      }
    ]
  },
  {
    "id": "265188",
    "name": "Giorgio Scalvini",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 75178085,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 48865755,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 63901372,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 75178085,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "238744",
    "name": "Weston McKennie",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "245235",
    "name": "Alexander Bah",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "251530",
    "name": "Nuno Tavares",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "240709",
    "name": "Ridle Baku",
    "position": "MED (MD)",
    "age": 27,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "253727",
    "name": "Lukáš Provod",
    "position": "MED (MCO)",
    "age": 29,
    "nationalities": [
      "Czech Republic"
    ],
    "club": {
      "id": "club",
      "name": "Slavia Praha"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Slavia Praha"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Slavia Praha"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Slavia Praha"
      }
    ]
  },
  {
    "id": "256688",
    "name": "Cameron Puertas",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "werder-bremen",
      "name": "Werder Bremen"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Werder Bremen"
      }
    ]
  },
  {
    "id": "242280",
    "name": "Lewis Ferguson",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "Scotland"
    ],
    "club": {
      "id": "bologna",
      "name": "Bologna"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Bologna"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Bologna"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Bologna"
      }
    ]
  },
  {
    "id": "244374",
    "name": "Mykola Shaparenko",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "club",
      "name": "Dynamo Kyiv"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Dynamo Kyiv"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Dynamo Kyiv"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Dynamo Kyiv"
      }
    ]
  },
  {
    "id": "255009",
    "name": "Kenneth Taylor",
    "position": "MED (MC)",
    "age": 23,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Ajax"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Ajax"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Ajax"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Ajax"
      }
    ]
  },
  {
    "id": "258775",
    "name": "Luka Sučić",
    "position": "MED (MC)",
    "age": 23,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "228789",
    "name": "Robert Sánchez",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "231340",
    "name": "Gonzalo Montiel",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "river-plate",
      "name": "River Plate"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "River Plate"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "River Plate"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "River Plate"
      }
    ]
  },
  {
    "id": "232244",
    "name": "Santiago Ascacíbar",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "estudiantes-de-la-plata",
      "name": "Estudiantes de La Plata"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Estudiantes de La Plata"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Estudiantes de La Plata"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Estudiantes de La Plata"
      }
    ]
  },
  {
    "id": "243631",
    "name": "Mahdi Camara",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "stade-rennais",
      "name": "Stade Rennais"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Stade Rennais"
      }
    ]
  },
  {
    "id": "246923",
    "name": "Jacob Ramsey",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "233738",
    "name": "Zubeldia",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "258498",
    "name": "Bart Verbruggen",
    "position": "POR (POR)",
    "age": 23,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "256632",
    "name": "Luis Henrique",
    "position": "MED (MD)",
    "age": 24,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "232711",
    "name": "Jens Stage",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "werder-bremen",
      "name": "Werder Bremen"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Werder Bremen"
      }
    ]
  },
  {
    "id": "240734",
    "name": "Matt O'Riley",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "243686",
    "name": "Chiquinho",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "club",
      "name": "Olympiacos FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Olympiacos FC"
      }
    ]
  },
  {
    "id": "251573",
    "name": "Renan Lodi",
    "position": "DEF (LI)",
    "age": 27,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "al-hilal",
      "name": "Al Hilal"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Al Hilal"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Al Hilal"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Al Hilal"
      }
    ]
  },
  {
    "id": "235467",
    "name": "Marcelino Moreno",
    "position": "MED (MCO)",
    "age": 30,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "lan-s",
      "name": "Lanús"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Lanús"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Lanús"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Lanús"
      }
    ]
  },
  {
    "id": "234112",
    "name": "Dodô",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "fiorentina",
      "name": "Fiorentina"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Fiorentina"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Fiorentina"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Fiorentina"
      }
    ]
  },
  {
    "id": "251615",
    "name": "Francisco Moura",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "256107",
    "name": "Alistair Johnston",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "Canada"
    ],
    "club": {
      "id": "club",
      "name": "Celtic"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Celtic"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Celtic"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Celtic"
      }
    ]
  },
  {
    "id": "266097",
    "name": "Geny Catamo",
    "position": "MED (MD)",
    "age": 25,
    "nationalities": [
      "Mozambique"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "243627",
    "name": "Yacine Adli",
    "position": "MED (MCD)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "251988",
    "name": "Andrea Colpani",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "club",
      "name": "Monza"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Monza"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Monza"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Monza"
      }
    ]
  },
  {
    "id": "257711",
    "name": "Riccardo Calafiori",
    "position": "DEF (LI)",
    "age": 23,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "241707",
    "name": "Pape Gueye",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "252064",
    "name": "Ladislav Krejčí",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Czech Republic"
    ],
    "club": {
      "id": "wolverhampton-wanderers",
      "name": "Wolverhampton Wanderers"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Wolverhampton Wanderers"
      }
    ]
  },
  {
    "id": "252143",
    "name": "Daniel Bragança",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "254909",
    "name": "Oscar Dorley",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "Liberia"
    ],
    "club": {
      "id": "club",
      "name": "Slavia Praha"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Slavia Praha"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Slavia Praha"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Slavia Praha"
      }
    ]
  },
  {
    "id": "225403",
    "name": "İrfan Can Kahveci",
    "position": "DEL (ED)",
    "age": 30,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "235973",
    "name": "Sebastian Szymański",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "244261",
    "name": "Lovro Majer",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "224158",
    "name": "Sofyan Amrabat",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "228413",
    "name": "Emil Audero",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "Indonesia"
    ],
    "club": {
      "id": "cremonese",
      "name": "Cremonese"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Cremonese"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Cremonese"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Cremonese"
      }
    ]
  },
  {
    "id": "229659",
    "name": "Bryan Heynen",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "club",
      "name": "KRC Genk"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "KRC Genk"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "KRC Genk"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "KRC Genk"
      }
    ]
  },
  {
    "id": "234171",
    "name": "Roland Sallai",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "Hungary"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "235633",
    "name": "Yehvann Diouf",
    "position": "POR (POR)",
    "age": 26,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "236480",
    "name": "Yves Bissouma",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Mali"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "248793",
    "name": "Mats Wieffer",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "220746",
    "name": "Andrija Živković",
    "position": "MED (MD)",
    "age": 29,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "club",
      "name": "PAOK FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "PAOK FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "PAOK FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "PAOK FC"
      }
    ]
  },
  {
    "id": "236699",
    "name": "Saša Lukić",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "237034",
    "name": "Cucho",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "247229",
    "name": "Raoul Bellanova",
    "position": "MED (MD)",
    "age": 25,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "262842",
    "name": "Martin Baturina",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "como-1907",
      "name": "Como 1907"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Como 1907"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Como 1907"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Como 1907"
      }
    ]
  },
  {
    "id": "231943",
    "name": "Richarlison",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "239977",
    "name": "Nicolas Kühn",
    "position": "DEL (ED)",
    "age": 26,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "como-1907",
      "name": "Como 1907"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Como 1907"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Como 1907"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Como 1907"
      }
    ]
  },
  {
    "id": "241187",
    "name": "Lutsharel Geertruida",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Sunderland"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Sunderland"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Sunderland"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Sunderland"
      }
    ]
  },
  {
    "id": "253473",
    "name": "Samuele Ricci",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "259233",
    "name": "Ilaix Moriba",
    "position": "MED (MC)",
    "age": 23,
    "nationalities": [
      "Guinea"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "255971",
    "name": "Santiago Hezze",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "club",
      "name": "Olympiacos FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Olympiacos FC"
      }
    ]
  },
  {
    "id": "244622",
    "name": "Puado",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rcd-espanyol",
      "name": "RCD Espanyol"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "RCD Espanyol"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "RCD Espanyol"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "RCD Espanyol"
      }
    ]
  },
  {
    "id": "262925",
    "name": "Adem Zorgane",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "club",
      "name": "R. Union St.-G."
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "R. Union St.-G."
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "R. Union St.-G."
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "R. Union St.-G."
      }
    ]
  },
  {
    "id": "240225",
    "name": "Matvey Safonov",
    "position": "POR (POR)",
    "age": 27,
    "nationalities": [
      "Russia"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "263617",
    "name": "Beñat Prados",
    "position": "MED (MCD)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "234678",
    "name": "Joakim Mæhle",
    "position": "DEF (LI)",
    "age": 28,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "243702",
    "name": "Djed Spence",
    "position": "DEF (LD)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "221342",
    "name": "Pablo Maffeo",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "rcd-mallorca",
      "name": "RCD Mallorca"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "RCD Mallorca"
      }
    ]
  },
  {
    "id": "234205",
    "name": "Hiroki Ito",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "235781",
    "name": "Santi Comesaña",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "240740",
    "name": "Callum Hudson-Odoi",
    "position": "MED (MI)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "247495",
    "name": "Moncayola",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "ca-osasuna",
      "name": "CA Osasuna"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "CA Osasuna"
      }
    ]
  },
  {
    "id": "235945",
    "name": "Marc Roca",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "243282",
    "name": "Dwight McNeil",
    "position": "MED (MI)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "254548",
    "name": "Melvin Bard",
    "position": "DEF (LI)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "236636",
    "name": "Anthony Caci",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "mainz-05",
      "name": "Mainz 05"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Mainz 05"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Mainz 05"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Mainz 05"
      }
    ]
  },
  {
    "id": "241602",
    "name": "Jhon Arias",
    "position": "DEL (ED)",
    "age": 28,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "wolverhampton-wanderers",
      "name": "Wolverhampton Wanderers"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Wolverhampton Wanderers"
      }
    ]
  },
  {
    "id": "255223",
    "name": "Amine Adli",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "252935",
    "name": "Leonardo Fernández",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "club",
      "name": "Peñarol"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Peñarol"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Peñarol"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Peñarol"
      }
    ]
  },
  {
    "id": "222331",
    "name": "Lukas Klostermann",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "235844",
    "name": "Edson Álvarez",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Mexico"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "235997",
    "name": "Fran Beltrán",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "239892",
    "name": "Yunus Akgün",
    "position": "MED (MD)",
    "age": 25,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "255566",
    "name": "Samú Costa",
    "position": "MED (MCD)",
    "age": 25,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "rcd-mallorca",
      "name": "RCD Mallorca"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "RCD Mallorca"
      }
    ]
  },
  {
    "id": "238896",
    "name": "Pepê",
    "position": "MED (MCO)",
    "age": 29,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "241436",
    "name": "Calvin Bassey",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "273463",
    "name": "João Gomes",
    "position": "MED (MCD)",
    "age": 25,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "wolverhampton-wanderers",
      "name": "Wolverhampton Wanderers"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Wolverhampton Wanderers"
      }
    ]
  },
  {
    "id": "228881",
    "name": "Davide Calabria",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "club",
      "name": "Panathinaikos"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Panathinaikos"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Panathinaikos"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Panathinaikos"
      }
    ]
  },
  {
    "id": "239701",
    "name": "Romano Schmid",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "werder-bremen",
      "name": "Werder Bremen"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Werder Bremen"
      }
    ]
  },
  {
    "id": "244380",
    "name": "Vitaliy Mykolenko",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "252259",
    "name": "Enzo Millot",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "club",
      "name": "Al Ahli"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Al Ahli"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Al Ahli"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Al Ahli"
      }
    ]
  },
  {
    "id": "234200",
    "name": "Aschraf El Mahdioui",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Al Taawoun"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Al Taawoun"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Al Taawoun"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Al Taawoun"
      }
    ]
  },
  {
    "id": "244728",
    "name": "Sem Steijn",
    "position": "MED (MCO)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Feyenoord"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Feyenoord"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Feyenoord"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Feyenoord"
      }
    ]
  },
  {
    "id": "256261",
    "name": "Malick Thiaw",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "222028",
    "name": "Julian Weigl",
    "position": "MED (MCD)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "club",
      "name": "Al Qadsiah"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Al Qadsiah"
      }
    ]
  },
  {
    "id": "227055",
    "name": "Gelson Martins",
    "position": "MED (MD)",
    "age": 30,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "club",
      "name": "Olympiacos FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Olympiacos FC"
      }
    ]
  },
  {
    "id": "208919",
    "name": "Ryan Gauld",
    "position": "DEL (EI)",
    "age": 30,
    "nationalities": [
      "Scotland"
    ],
    "club": {
      "id": "club",
      "name": "Whitecaps FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Whitecaps FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Whitecaps FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Whitecaps FC"
      }
    ]
  },
  {
    "id": "237328",
    "name": "Nathan Tella",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "74866",
    "name": "André",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "wolverhampton-wanderers",
      "name": "Wolverhampton Wanderers"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Wolverhampton Wanderers"
      }
    ]
  },
  {
    "id": "240690",
    "name": "Nico Gonzalez",
    "position": "MED (MD)",
    "age": 27,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "242238",
    "name": "Oumar Solet",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "udinese",
      "name": "Udinese"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Udinese"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Udinese"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Udinese"
      }
    ]
  },
  {
    "id": "243032",
    "name": "Hugo Duro",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "252308",
    "name": "Ali Al Musrati",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Libya"
    ],
    "club": {
      "id": "hellas-verona",
      "name": "Hellas Verona"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Hellas Verona"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Hellas Verona"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Hellas Verona"
      }
    ]
  },
  {
    "id": "264348",
    "name": "Soufiane Rahimi",
    "position": "MED (MI)",
    "age": 29,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "club",
      "name": "Al Ain FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Al Ain FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Al Ain FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Al Ain FC"
      }
    ]
  },
  {
    "id": "221992",
    "name": "Hirving Lozano",
    "position": "DEL (EI)",
    "age": 30,
    "nationalities": [
      "Mexico"
    ],
    "club": {
      "id": "club",
      "name": "San Diego FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "San Diego FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "San Diego FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "San Diego FC"
      }
    ]
  },
  {
    "id": "260926",
    "name": "Kevin Schade",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "238050",
    "name": "Chidera Ejuke",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "sevilla-fc",
      "name": "Sevilla FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Sevilla FC"
      }
    ]
  },
  {
    "id": "240716",
    "name": "Mathías Olivera",
    "position": "DEF (LI)",
    "age": 28,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "243057",
    "name": "Neco Williams",
    "position": "DEF (LI)",
    "age": 24,
    "nationalities": [
      "Wales"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "243559",
    "name": "De Frutos",
    "position": "MED (MD)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rayo-vallecano",
      "name": "Rayo Vallecano"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Rayo Vallecano"
      }
    ]
  },
  {
    "id": "242374",
    "name": "Musa Barrow",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Gambia"
    ],
    "club": {
      "id": "club",
      "name": "Al Taawoun"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Al Taawoun"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Al Taawoun"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Al Taawoun"
      }
    ]
  },
  {
    "id": "250789",
    "name": "Dilane Bakwa",
    "position": "MED (MD)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "240359",
    "name": "Omar Alderete",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Paraguay"
    ],
    "club": {
      "id": "club",
      "name": "Sunderland"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Sunderland"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Sunderland"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Sunderland"
      }
    ]
  },
  {
    "id": "256958",
    "name": "Fábio Vieira",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "hamburger-sv",
      "name": "Hamburger SV"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Hamburger SV"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Hamburger SV"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Hamburger SV"
      }
    ]
  },
  {
    "id": "263139",
    "name": "Dominik Greif",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Slovakia"
    ],
    "club": {
      "id": "olympique-lyonnais",
      "name": "Olympique Lyonnais"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Olympique Lyonnais"
      }
    ]
  },
  {
    "id": "266096",
    "name": "Tomás Araújo",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "227562",
    "name": "Lukáš Haraslín",
    "position": "DEL (EI)",
    "age": 29,
    "nationalities": [
      "Slovakia"
    ],
    "club": {
      "id": "club",
      "name": "Sparta Praha"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Sparta Praha"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Sparta Praha"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Sparta Praha"
      }
    ]
  },
  {
    "id": "240988",
    "name": "Denis Vavro",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Slovakia"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "245388",
    "name": "Jean-Clair Todibo",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "259031",
    "name": "Liam Delap",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "237055",
    "name": "Oleksandr Zubkov",
    "position": "MED (MD)",
    "age": 29,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "club",
      "name": "Trabzonspor"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Trabzonspor"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Trabzonspor"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Trabzonspor"
      }
    ]
  },
  {
    "id": "257075",
    "name": "Paul Nebel",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "mainz-05",
      "name": "Mainz 05"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Mainz 05"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Mainz 05"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Mainz 05"
      }
    ]
  },
  {
    "id": "250955",
    "name": "Josip Stanišić",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "254803",
    "name": "Senne Lammens",
    "position": "POR (POR)",
    "age": 23,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "240947",
    "name": "Tyrick Mitchell",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "258437",
    "name": "Emanuel Emegha",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "rc-strasbourg",
      "name": "RC Strasbourg"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "RC Strasbourg"
      }
    ]
  },
  {
    "id": "264238",
    "name": "Diego López",
    "position": "MED (MI)",
    "age": 23,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "238756",
    "name": "Jørgen Strand Larsen",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Norway"
    ],
    "club": {
      "id": "wolverhampton-wanderers",
      "name": "Wolverhampton Wanderers"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Wolverhampton Wanderers"
      }
    ]
  },
  {
    "id": "253444",
    "name": "Arnaud Kalimuendo",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "256325",
    "name": "Josip Šutalo",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "club",
      "name": "Ajax"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Ajax"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Ajax"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Ajax"
      }
    ]
  },
  {
    "id": "222104",
    "name": "Tosin Adarabioyo",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "241522",
    "name": "Jonas Wind",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "253002",
    "name": "Giacomo Raspadori",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "270050",
    "name": "Mika Biereth",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "236506",
    "name": "Marcos Senesi",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "214092",
    "name": "Aleksey Miranchuk",
    "position": "MED (MCO)",
    "age": 30,
    "nationalities": [
      "Russia"
    ],
    "club": {
      "id": "club",
      "name": "Atlanta United"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Atlanta United"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Atlanta United"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Atlanta United"
      }
    ]
  },
  {
    "id": "224221",
    "name": "Joachim Andersen",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "232658",
    "name": "Danilho Doekhi",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "union-berlin",
      "name": "Union Berlin"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Union Berlin"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Union Berlin"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Union Berlin"
      }
    ]
  },
  {
    "id": "244767",
    "name": "Carlos Vicente",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "deportivo-alav-s",
      "name": "Deportivo Alavés"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Deportivo Alavés"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Deportivo Alavés"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Deportivo Alavés"
      }
    ]
  },
  {
    "id": "235949",
    "name": "Gabriel Strefezza",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Olympiacos FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Olympiacos FC"
      }
    ]
  },
  {
    "id": "246785",
    "name": "Bryan Gil",
    "position": "MED (MI)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "220821",
    "name": "Carl Starfelt",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "255106",
    "name": "Loïc Badé",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "262394",
    "name": "Sam Beukema",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "238160",
    "name": "Merih Demiral",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Al Ahli"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Al Ahli"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Al Ahli"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Al Ahli"
      }
    ]
  },
  {
    "id": "234575",
    "name": "Diogo Leite",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "union-berlin",
      "name": "Union Berlin"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Union Berlin"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Union Berlin"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Union Berlin"
      }
    ]
  },
  {
    "id": "259066",
    "name": "Flavien-Enzo Boyomo",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Cameroon"
    ],
    "club": {
      "id": "ca-osasuna",
      "name": "CA Osasuna"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "CA Osasuna"
      }
    ]
  },
  {
    "id": "260697",
    "name": "Isak Hien",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "259524",
    "name": "Aitor Paredes",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "277537",
    "name": "Natan",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "240277",
    "name": "Matteo Gabbia",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "239340",
    "name": "Julian Chabot",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 63095734,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 41012227,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 53631374,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 63095734,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "204923",
    "name": "Marcel Sabitzer",
    "position": "MED (MCD)",
    "age": 32,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "209297",
    "name": "Fred",
    "position": "MED (MC)",
    "age": 33,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "204883",
    "name": "Brice Samba",
    "position": "POR (POR)",
    "age": 31,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "stade-rennais",
      "name": "Stade Rennais"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Stade Rennais"
      }
    ]
  },
  {
    "id": "239093",
    "name": "Jonathan Clauss",
    "position": "DEF (LD)",
    "age": 33,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "192563",
    "name": "Bernd Leno",
    "position": "POR (POR)",
    "age": 34,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "223697",
    "name": "Robin Gosens",
    "position": "DEF (LI)",
    "age": 31,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "fiorentina",
      "name": "Fiorentina"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Fiorentina"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Fiorentina"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Fiorentina"
      }
    ]
  },
  {
    "id": "209889",
    "name": "Raphaël Guerreiro",
    "position": "DEF (LI)",
    "age": 32,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "223273",
    "name": "Mario Pašalić",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "241671",
    "name": "Dominik Livaković",
    "position": "POR (POR)",
    "age": 31,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "200458",
    "name": "Lucas Digne",
    "position": "DEF (LI)",
    "age": 32,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "210406",
    "name": "Piotr Zieliński",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "186345",
    "name": "Kieran Trippier",
    "position": "DEF (LD)",
    "age": 35,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "205157",
    "name": "Ruiz de Galarreta",
    "position": "MED (MCD)",
    "age": 32,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "208268",
    "name": "Bryan Cristante",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "231591",
    "name": "Javi Galán",
    "position": "DEF (LI)",
    "age": 31,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "201269",
    "name": "Frederik Rønnow",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "union-berlin",
      "name": "Union Berlin"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Union Berlin"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Union Berlin"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Union Berlin"
      }
    ]
  },
  {
    "id": "190765",
    "name": "Pascal Groß",
    "position": "MED (MCD)",
    "age": 34,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "190674",
    "name": "Benjamin André",
    "position": "MED (MCD)",
    "age": 35,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "losc-lille",
      "name": "LOSC Lille"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "LOSC Lille"
      }
    ]
  },
  {
    "id": "234642",
    "name": "Édouard Mendy",
    "position": "POR (POR)",
    "age": 34,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "club",
      "name": "Al Ahli"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Al Ahli"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Al Ahli"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Al Ahli"
      }
    ]
  },
  {
    "id": "243586",
    "name": "Ayoub El Kaabi",
    "position": "DEL (DC)",
    "age": 32,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "club",
      "name": "Olympiacos FC"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Olympiacos FC"
      }
    ]
  },
  {
    "id": "200155",
    "name": "Hans Vanaken",
    "position": "MED (MCO)",
    "age": 33,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "club",
      "name": "Club Brugge"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Club Brugge"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Club Brugge"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Club Brugge"
      }
    ]
  },
  {
    "id": "203980",
    "name": "Konstantinos Fortounis",
    "position": "MED (MCO)",
    "age": 33,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "club",
      "name": "Al Khaleej"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Al Khaleej"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Al Khaleej"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Al Khaleej"
      }
    ]
  },
  {
    "id": "189596",
    "name": "Thomas Müller",
    "position": "MED (MCO)",
    "age": 36,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "club",
      "name": "Whitecaps FC"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Whitecaps FC"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Whitecaps FC"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Whitecaps FC"
      }
    ]
  },
  {
    "id": "212096",
    "name": "Vincenzo Grifo",
    "position": "MED (MI)",
    "age": 32,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "sc-freiburg",
      "name": "SC Freiburg"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "SC Freiburg"
      }
    ]
  },
  {
    "id": "210697",
    "name": "Christian Nørgaard",
    "position": "MED (MCD)",
    "age": 32,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "216447",
    "name": "Álvaro García",
    "position": "MED (MI)",
    "age": 33,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rayo-vallecano",
      "name": "Rayo Vallecano"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Rayo Vallecano"
      }
    ]
  },
  {
    "id": "200145",
    "name": "Casemiro",
    "position": "MED (MCD)",
    "age": 34,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "229905",
    "name": "Abdülkerim Bardakcı",
    "position": "DEF (DFC)",
    "age": 31,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "224179",
    "name": "Borja Iglesias",
    "position": "DEL (DC)",
    "age": 33,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "189511",
    "name": "Sergio Busquets",
    "position": "MED (MCD)",
    "age": 37,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "inter-miami-cf",
      "name": "Inter Miami CF"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Inter Miami CF"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Inter Miami CF"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Inter Miami CF"
      }
    ]
  },
  {
    "id": "212602",
    "name": "Diego Llorente",
    "position": "DEF (DFC)",
    "age": 32,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "203263",
    "name": "Harry Maguire",
    "position": "DEF (DFC)",
    "age": 33,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "202695",
    "name": "James Tarkowski",
    "position": "DEF (DFC)",
    "age": 33,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "189881",
    "name": "Chris Smalling",
    "position": "DEF (DFC)",
    "age": 36,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "club",
      "name": "Al Fayha"
    },
    "marketValue": 60000000,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 39000000,
        "clubName": "Al Fayha"
      },
      {
        "date": "2024",
        "marketValue": 51000000,
        "clubName": "Al Fayha"
      },
      {
        "date": "2026",
        "marketValue": 60000000,
        "clubName": "Al Fayha"
      }
    ]
  },
  {
    "id": "273906",
    "name": "Renato Veiga",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "73374",
    "name": "Chrisantus Uche",
    "position": "DEL (DC)",
    "age": 22,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "267680",
    "name": "Abdul Fatawu",
    "position": "MED (MD)",
    "age": 22,
    "nationalities": [
      "Ghana"
    ],
    "club": {
      "id": "leicester-city",
      "name": "Leicester City"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Leicester City"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Leicester City"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Leicester City"
      }
    ]
  },
  {
    "id": "270857",
    "name": "Mateus Fernandes",
    "position": "MED (MCO)",
    "age": 21,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "259356",
    "name": "Carney Chukwuemeka",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "263828",
    "name": "Roger Fernandes",
    "position": "MED (MD)",
    "age": 20,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "al-ittihad",
      "name": "Al Ittihad"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Al Ittihad"
      }
    ]
  },
  {
    "id": "262863",
    "name": "Antonio Nusa",
    "position": "MED (MI)",
    "age": 20,
    "nationalities": [
      "Norway"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "264869",
    "name": "Félix Lemaréchal",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "rc-strasbourg",
      "name": "RC Strasbourg"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "RC Strasbourg"
      }
    ]
  },
  {
    "id": "266331",
    "name": "Hugo Álvarez",
    "position": "MED (MI)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "259565",
    "name": "Yoan Bonny",
    "position": "DEL (DC)",
    "age": 22,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "271807",
    "name": "Ethan Nwaneri",
    "position": "DEL (ED)",
    "age": 19,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "279044",
    "name": "Geovany Quenda",
    "position": "MED (MD)",
    "age": 18,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "275324",
    "name": "Assane Diao",
    "position": "MED (MI)",
    "age": 20,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "como-1907",
      "name": "Como 1907"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Como 1907"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Como 1907"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Como 1907"
      }
    ]
  },
  {
    "id": "263765",
    "name": "Tom Bischof",
    "position": "MED (MC)",
    "age": 20,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "279027",
    "name": "Javi Rodríguez",
    "position": "DEF (LD)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "267861",
    "name": "Santiago Castro",
    "position": "DEL (DC)",
    "age": 21,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "bologna",
      "name": "Bologna"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Bologna"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Bologna"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Bologna"
      }
    ]
  },
  {
    "id": "267860",
    "name": "Valentín Gómez",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "257504",
    "name": "Bilal El Khannouss",
    "position": "MED (MCO)",
    "age": 21,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "272781",
    "name": "Eliesse Ben Seghir",
    "position": "MED (MI)",
    "age": 21,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "bayer-04-leverkusen",
      "name": "Bayer 04 Leverkusen"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Bayer 04 Leverkusen"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Bayer 04 Leverkusen"
      }
    ]
  },
  {
    "id": "274288",
    "name": "Oscar Gloukh",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "Israel"
    ],
    "club": {
      "id": "club",
      "name": "Ajax"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "Ajax"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "Ajax"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "Ajax"
      }
    ]
  },
  {
    "id": "257090",
    "name": "Ismaël Doukouré",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "rc-strasbourg",
      "name": "RC Strasbourg"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "RC Strasbourg"
      }
    ]
  },
  {
    "id": "271032",
    "name": "Matte Smets",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "club",
      "name": "KRC Genk"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "KRC Genk"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "KRC Genk"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "KRC Genk"
      }
    ]
  },
  {
    "id": "256476",
    "name": "Mohamed-Ali Cho",
    "position": "DEL (EI)",
    "age": 22,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "72997",
    "name": "Rodrigo Mora",
    "position": "MED (MCO)",
    "age": 18,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "275507",
    "name": "Mamadou Sarr",
    "position": "DEF (DFC)",
    "age": 20,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "rc-strasbourg",
      "name": "RC Strasbourg"
    },
    "marketValue": 59716076,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 38815449,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2024",
        "marketValue": 50758665,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2026",
        "marketValue": 59716076,
        "clubName": "RC Strasbourg"
      }
    ]
  },
  {
    "id": "241867",
    "name": "Aitor Ruibal",
    "position": "DEF (LD)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "224574",
    "name": "Orbelín Pineda",
    "position": "MED (MCO)",
    "age": 30,
    "nationalities": [
      "Mexico"
    ],
    "club": {
      "id": "club",
      "name": "AEK Athens"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AEK Athens"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AEK Athens"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AEK Athens"
      }
    ]
  },
  {
    "id": "234741",
    "name": "Gustavo Hamer",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Sheffield Utd"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Sheffield Utd"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Sheffield Utd"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Sheffield Utd"
      }
    ]
  },
  {
    "id": "241496",
    "name": "Timothy Weah",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "216320",
    "name": "Seko Fofana",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "stade-rennais",
      "name": "Stade Rennais"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Stade Rennais"
      }
    ]
  },
  {
    "id": "257186",
    "name": "Ardon Jashari",
    "position": "MED (MCD)",
    "age": 23,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "272951",
    "name": "Kevin Castaño",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "river-plate",
      "name": "River Plate"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "River Plate"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "River Plate"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "River Plate"
      }
    ]
  },
  {
    "id": "236822",
    "name": "Gabriel Gudmundsson",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "245637",
    "name": "Georginio Rutter",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "253157",
    "name": "Hicham Boudaoui",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "236830",
    "name": "Zaydou Youssouf",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "Comoros"
    ],
    "club": {
      "id": "club",
      "name": "Al Fateh"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Al Fateh"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Al Fateh"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Al Fateh"
      }
    ]
  },
  {
    "id": "235663",
    "name": "Guus Til",
    "position": "MED (MCO)",
    "age": 28,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "233965",
    "name": "Alessio Castro-Montes",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "1--fc-k-ln",
      "name": "1. FC Köln"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "1. FC Köln"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "1. FC Köln"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "1. FC Köln"
      }
    ]
  },
  {
    "id": "234153",
    "name": "Carlos Soler",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "257919",
    "name": "Rocco Reitz",
    "position": "MED (MC)",
    "age": 23,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-m-nchengladbach",
      "name": "Borussia Mönchengladbach"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Borussia Mönchengladbach"
      }
    ]
  },
  {
    "id": "222227",
    "name": "Patrick Berg",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Norway"
    ],
    "club": {
      "id": "club",
      "name": "FK Bodø/Glimt"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "FK Bodø/Glimt"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "FK Bodø/Glimt"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "FK Bodø/Glimt"
      }
    ]
  },
  {
    "id": "225782",
    "name": "Ainsley Maitland-Niles",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "olympique-lyonnais",
      "name": "Olympique Lyonnais"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Olympique Lyonnais"
      }
    ]
  },
  {
    "id": "230786",
    "name": "Pepelu",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "236477",
    "name": "Alexis Claude-Maurice",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "fc-augsburg",
      "name": "FC Augsburg"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "FC Augsburg"
      }
    ]
  },
  {
    "id": "245253",
    "name": "Leandro Barreiro",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "Luxembourg"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "258371",
    "name": "Pep Chavarría",
    "position": "DEF (LI)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rayo-vallecano",
      "name": "Rayo Vallecano"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Rayo Vallecano"
      }
    ]
  },
  {
    "id": "226491",
    "name": "Kieran Tierney",
    "position": "DEF (LI)",
    "age": 28,
    "nationalities": [
      "Scotland"
    ],
    "club": {
      "id": "club",
      "name": "Celtic"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Celtic"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Celtic"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Celtic"
      }
    ]
  },
  {
    "id": "242818",
    "name": "Finn Dahmen",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "fc-augsburg",
      "name": "FC Augsburg"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "FC Augsburg"
      }
    ]
  },
  {
    "id": "221125",
    "name": "Sebastián Driussi",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "river-plate",
      "name": "River Plate"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "River Plate"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "River Plate"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "River Plate"
      }
    ]
  },
  {
    "id": "233934",
    "name": "Aaron Ramsdale",
    "position": "POR (POR)",
    "age": 27,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "237386",
    "name": "Kiernan Dewsbury-Hall",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "263781",
    "name": "Vanderson",
    "position": "DEF (LD)",
    "age": 24,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "246646",
    "name": "Maxence Caqueret",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "como-1907",
      "name": "Como 1907"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Como 1907"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Como 1907"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Como 1907"
      }
    ]
  },
  {
    "id": "254817",
    "name": "Maximiliano Araújo",
    "position": "MED (MI)",
    "age": 26,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "213565",
    "name": "Thomas Lemar",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "239810",
    "name": "Nicolas Raskin",
    "position": "MED (MCD)",
    "age": 25,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "club",
      "name": "Rangers"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Rangers"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Rangers"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Rangers"
      }
    ]
  },
  {
    "id": "257876",
    "name": "Nicolas Seiwald",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "262659",
    "name": "Noah Atubolu",
    "position": "POR (POR)",
    "age": 23,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "sc-freiburg",
      "name": "SC Freiburg"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "SC Freiburg"
      }
    ]
  },
  {
    "id": "271121",
    "name": "Quilindschy Hartman",
    "position": "DEF (LI)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Burnley"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Burnley"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Burnley"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Burnley"
      }
    ]
  },
  {
    "id": "226162",
    "name": "Emiliano Buendía",
    "position": "MED (MCO)",
    "age": 29,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "aston-villa",
      "name": "Aston Villa"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Aston Villa"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Aston Villa"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Aston Villa"
      }
    ]
  },
  {
    "id": "232223",
    "name": "Kostas Tsimikas",
    "position": "DEF (LI)",
    "age": 29,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "238463",
    "name": "Amadou Haidara",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Mali"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "257290",
    "name": "João Mário",
    "position": "DEF (LD)",
    "age": 26,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "259716",
    "name": "Daniel Svensson",
    "position": "DEF (LI)",
    "age": 24,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "262880",
    "name": "Raphael Onyedika",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "club",
      "name": "Club Brugge"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Club Brugge"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Club Brugge"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Club Brugge"
      }
    ]
  },
  {
    "id": "224041",
    "name": "Marvin Schwäbe",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "1--fc-k-ln",
      "name": "1. FC Köln"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "1. FC Köln"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "1. FC Köln"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "1. FC Köln"
      }
    ]
  },
  {
    "id": "222357",
    "name": "Breel Embolo",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "stade-rennais",
      "name": "Stade Rennais"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Stade Rennais"
      }
    ]
  },
  {
    "id": "228708",
    "name": "Lucas Martínez Quarta",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "river-plate",
      "name": "River Plate"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "River Plate"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "River Plate"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "River Plate"
      }
    ]
  },
  {
    "id": "229528",
    "name": "Mykola Matviienko",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "club",
      "name": "Shakhtar Donetsk"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Shakhtar Donetsk"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Shakhtar Donetsk"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Shakhtar Donetsk"
      }
    ]
  },
  {
    "id": "241390",
    "name": "Eljif Elmas",
    "position": "MED (MI)",
    "age": 26,
    "nationalities": [
      "North Macedonia"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "242380",
    "name": "Stephen Eustáquio",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Canada"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "246928",
    "name": "Iván Martín",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "259075",
    "name": "Yan Couto",
    "position": "DEF (LD)",
    "age": 23,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "borussia-dortmund",
      "name": "Borussia Dortmund"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Borussia Dortmund"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Borussia Dortmund"
      }
    ]
  },
  {
    "id": "260823",
    "name": "Nicolò Fagioli",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "fiorentina",
      "name": "Fiorentina"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Fiorentina"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Fiorentina"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Fiorentina"
      }
    ]
  },
  {
    "id": "264001",
    "name": "Oğuz Aydın",
    "position": "DEL (EI)",
    "age": 25,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "232440",
    "name": "Caio Henrique",
    "position": "DEF (LI)",
    "age": 28,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "232730",
    "name": "Daichi Kamada",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "252144",
    "name": "Eduardo Quaresma",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "254566",
    "name": "Patrick Wimmer",
    "position": "MED (MCO)",
    "age": 24,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "260466",
    "name": "İsmail Yüksek",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "234730",
    "name": "Valentin Rosier",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "ca-osasuna",
      "name": "CA Osasuna"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "CA Osasuna"
      }
    ]
  },
  {
    "id": "229984",
    "name": "Ben Chilwell",
    "position": "DEF (LI)",
    "age": 29,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "rc-strasbourg",
      "name": "RC Strasbourg"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RC Strasbourg"
      }
    ]
  },
  {
    "id": "231102",
    "name": "Ludovic Blas",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "stade-rennais",
      "name": "Stade Rennais"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Stade Rennais"
      }
    ]
  },
  {
    "id": "246267",
    "name": "Dominik Kotarski",
    "position": "POR (POR)",
    "age": 26,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "club",
      "name": "F.C. København"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "F.C. København"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "F.C. København"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "F.C. København"
      }
    ]
  },
  {
    "id": "234906",
    "name": "Houssem Aouar",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "al-ittihad",
      "name": "Al Ittihad"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Al Ittihad"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Al Ittihad"
      }
    ]
  },
  {
    "id": "255074",
    "name": "Artem Bondarenko",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "club",
      "name": "Shakhtar Donetsk"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Shakhtar Donetsk"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Shakhtar Donetsk"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Shakhtar Donetsk"
      }
    ]
  },
  {
    "id": "257540",
    "name": "Ansgar Knauff",
    "position": "MED (MD)",
    "age": 24,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "258466",
    "name": "Leo Román",
    "position": "POR (POR)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rcd-mallorca",
      "name": "RCD Mallorca"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RCD Mallorca"
      }
    ]
  },
  {
    "id": "258485",
    "name": "Filip Jörgensen",
    "position": "POR (POR)",
    "age": 23,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "227813",
    "name": "Oleksandr Zinchenko",
    "position": "DEF (LI)",
    "age": 29,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "254551",
    "name": "Georges Mikautadze",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Georgia"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "259521",
    "name": "Terrats",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rcd-espanyol",
      "name": "RCD Espanyol"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RCD Espanyol"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RCD Espanyol"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RCD Espanyol"
      }
    ]
  },
  {
    "id": "224241",
    "name": "Nick Olij",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "229723",
    "name": "Mathias Jensen",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "233064",
    "name": "Mason Mount",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "262745",
    "name": "Neil El Aynaoui",
    "position": "MED (MC)",
    "age": 24,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "270559",
    "name": "Tiago Santos",
    "position": "DEF (LD)",
    "age": 23,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "losc-lille",
      "name": "LOSC Lille"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "LOSC Lille"
      }
    ]
  },
  {
    "id": "233152",
    "name": "Ko Itakura",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "club",
      "name": "Ajax"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Ajax"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Ajax"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Ajax"
      }
    ]
  },
  {
    "id": "234078",
    "name": "Orel Mangala",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "olympique-lyonnais",
      "name": "Olympique Lyonnais"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Olympique Lyonnais"
      }
    ]
  },
  {
    "id": "235173",
    "name": "Ibrahim Sangaré",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "241856",
    "name": "Manu Morlanes",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rcd-mallorca",
      "name": "RCD Mallorca"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RCD Mallorca"
      }
    ]
  },
  {
    "id": "256769",
    "name": "Adrien Truffert",
    "position": "DEF (LI)",
    "age": 24,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "270633",
    "name": "Ryan Flamingo",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "258937",
    "name": "Aimar Oroz",
    "position": "MED (MC)",
    "age": 24,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "ca-osasuna",
      "name": "CA Osasuna"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "CA Osasuna"
      }
    ]
  },
  {
    "id": "228819",
    "name": "Matías Vargas",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "club",
      "name": "Al Fateh"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Al Fateh"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Al Fateh"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Al Fateh"
      }
    ]
  },
  {
    "id": "239364",
    "name": "Philipp Köhn",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "240017",
    "name": "Andreas Skov Olsen",
    "position": "DEL (ED)",
    "age": 26,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "248266",
    "name": "Sacha Boey",
    "position": "DEF (LD)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "bayern-m-nchen",
      "name": "Bayern München"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Bayern München"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Bayern München"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Bayern München"
      }
    ]
  },
  {
    "id": "239254",
    "name": "Berke Özer",
    "position": "POR (POR)",
    "age": 25,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "losc-lille",
      "name": "LOSC Lille"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "LOSC Lille"
      }
    ]
  },
  {
    "id": "244889",
    "name": "Charles Vanhoutte",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "226093",
    "name": "Ché Adams",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Scotland"
    ],
    "club": {
      "id": "torino",
      "name": "Torino"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Torino"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Torino"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Torino"
      }
    ]
  },
  {
    "id": "240787",
    "name": "Hamed Junior Traoré",
    "position": "MED (MI)",
    "age": 26,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "250961",
    "name": "Joshua Zirkzee",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "manchester-united",
      "name": "Manchester United"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Manchester United"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Manchester United"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Manchester United"
      }
    ]
  },
  {
    "id": "252324",
    "name": "Riquelme",
    "position": "MED (MI)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "241854",
    "name": "Perr Schuurs",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "torino",
      "name": "Torino"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Torino"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Torino"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Torino"
      }
    ]
  },
  {
    "id": "245158",
    "name": "Luis Javier Suárez",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "241925",
    "name": "Chris Führich",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "246871",
    "name": "Enzo Barrenechea",
    "position": "MED (MC)",
    "age": 24,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "258534",
    "name": "Diego Conde",
    "position": "POR (POR)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "225439",
    "name": "Rolando Mandragora",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "fiorentina",
      "name": "Fiorentina"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Fiorentina"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Fiorentina"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Fiorentina"
      }
    ]
  },
  {
    "id": "234468",
    "name": "Emanuel Reynoso",
    "position": "MED (MCO)",
    "age": 30,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "talleres-de-c-rdoba",
      "name": "Talleres de Córdoba"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Talleres de Córdoba"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Talleres de Córdoba"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Talleres de Córdoba"
      }
    ]
  },
  {
    "id": "236918",
    "name": "Anders Dreyer",
    "position": "DEL (ED)",
    "age": 27,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "club",
      "name": "San Diego FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "San Diego FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "San Diego FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "San Diego FC"
      }
    ]
  },
  {
    "id": "246618",
    "name": "Adam Hložek",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "Czech Republic"
    ],
    "club": {
      "id": "tsg-hoffenheim",
      "name": "TSG Hoffenheim"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "TSG Hoffenheim"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "TSG Hoffenheim"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "TSG Hoffenheim"
      }
    ]
  },
  {
    "id": "265552",
    "name": "Dango Ouattara",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Burkina Faso"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "255533",
    "name": "Youssouf Ndayishimiye",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Burundi"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "225085",
    "name": "Jonathan Bamba",
    "position": "MED (MI)",
    "age": 30,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "club",
      "name": "Chicago Fire FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Chicago Fire FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Chicago Fire FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Chicago Fire FC"
      }
    ]
  },
  {
    "id": "228010",
    "name": "Hwang In Beom",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Korea Republic"
    ],
    "club": {
      "id": "club",
      "name": "Feyenoord"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Feyenoord"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Feyenoord"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Feyenoord"
      }
    ]
  },
  {
    "id": "233630",
    "name": "Hugo Cuypers",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "club",
      "name": "Chicago Fire FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Chicago Fire FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Chicago Fire FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Chicago Fire FC"
      }
    ]
  },
  {
    "id": "275208",
    "name": "Guéla Doué",
    "position": "DEF (LD)",
    "age": 23,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "rc-strasbourg",
      "name": "RC Strasbourg"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RC Strasbourg"
      }
    ]
  },
  {
    "id": "240273",
    "name": "Emile Smith Rowe",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "276471",
    "name": "Altimira",
    "position": "MED (MCD)",
    "age": 24,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "212188",
    "name": "Timo Werner",
    "position": "DEL (EI)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "258715",
    "name": "Benedict Hollerbach",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "mainz-05",
      "name": "Mainz 05"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Mainz 05"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Mainz 05"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Mainz 05"
      }
    ]
  },
  {
    "id": "216820",
    "name": "Moses Simon",
    "position": "MED (MI)",
    "age": 30,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "paris-fc",
      "name": "Paris FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Paris FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Paris FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Paris FC"
      }
    ]
  },
  {
    "id": "241049",
    "name": "Gorosabel",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "258885",
    "name": "Luiz Júnior",
    "position": "POR (POR)",
    "age": 25,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "216266",
    "name": "Kenny Tete",
    "position": "DEF (LD)",
    "age": 30,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "235413",
    "name": "Radosław Majecki",
    "position": "POR (POR)",
    "age": 26,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "stade-brestois",
      "name": "Stade Brestois"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Stade Brestois"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Stade Brestois"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Stade Brestois"
      }
    ]
  },
  {
    "id": "235662",
    "name": "Abdul Mumin",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Ghana"
    ],
    "club": {
      "id": "rayo-vallecano",
      "name": "Rayo Vallecano"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Rayo Vallecano"
      }
    ]
  },
  {
    "id": "237595",
    "name": "Marco Friedl",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "werder-bremen",
      "name": "Werder Bremen"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Werder Bremen"
      }
    ]
  },
  {
    "id": "211300",
    "name": "Anthony Martial",
    "position": "DEL (EI)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "club",
      "name": "AEK Athens"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AEK Athens"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AEK Athens"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AEK Athens"
      }
    ]
  },
  {
    "id": "220621",
    "name": "Saïd Benrahma",
    "position": "DEL (EI)",
    "age": 30,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "club",
      "name": "Neom"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Neom"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Neom"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Neom"
      }
    ]
  },
  {
    "id": "242187",
    "name": "Christoph Baumgartner",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "242619",
    "name": "Cheick Doucouré",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "Mali"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "259848",
    "name": "Jon Mikel Aramburu",
    "position": "DEF (LD)",
    "age": 23,
    "nationalities": [
      "Venezuela"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "216860",
    "name": "Václav Černý",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "Czech Republic"
    ],
    "club": {
      "id": "club",
      "name": "Beşiktaş"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Beşiktaş"
      }
    ]
  },
  {
    "id": "244238",
    "name": "Jaka Bijol",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Slovenia"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "245977",
    "name": "Kiril Despodov",
    "position": "DEL (ED)",
    "age": 29,
    "nationalities": [
      "Bulgaria"
    ],
    "club": {
      "id": "club",
      "name": "PAOK FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "PAOK FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "PAOK FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "PAOK FC"
      }
    ]
  },
  {
    "id": "234570",
    "name": "Jota",
    "position": "DEL (EI)",
    "age": 27,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "club",
      "name": "Celtic"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Celtic"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Celtic"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Celtic"
      }
    ]
  },
  {
    "id": "235642",
    "name": "Ryan Yates",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "206516",
    "name": "Will Hughes",
    "position": "MED (MCD)",
    "age": 30,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "258015",
    "name": "Fotis Ioannidis",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "262956",
    "name": "Nikola Vasilj",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Bosnia and Herzegovina"
    ],
    "club": {
      "id": "fc-st--pauli",
      "name": "FC St. Pauli"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "FC St. Pauli"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "FC St. Pauli"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "FC St. Pauli"
      }
    ]
  },
  {
    "id": "241985",
    "name": "Pep Biel",
    "position": "MED (MCO)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "club",
      "name": "Charlotte FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Charlotte FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Charlotte FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Charlotte FC"
      }
    ]
  },
  {
    "id": "247641",
    "name": "Tetê",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Panathinaikos"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Panathinaikos"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Panathinaikos"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Panathinaikos"
      }
    ]
  },
  {
    "id": "259633",
    "name": "Giannis Konstantelias",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "club",
      "name": "PAOK FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "PAOK FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "PAOK FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "PAOK FC"
      }
    ]
  },
  {
    "id": "223197",
    "name": "Enes Ünal",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "231352",
    "name": "Tammy Abraham",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "club",
      "name": "Beşiktaş"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Beşiktaş"
      }
    ]
  },
  {
    "id": "225859",
    "name": "Moussa Niakhaté",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "olympique-lyonnais",
      "name": "Olympique Lyonnais"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Olympique Lyonnais"
      }
    ]
  },
  {
    "id": "246672",
    "name": "Barrenetxea",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "239367",
    "name": "Robin Hack",
    "position": "MED (MI)",
    "age": 27,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "borussia-m-nchengladbach",
      "name": "Borussia Mönchengladbach"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Borussia Mönchengladbach"
      }
    ]
  },
  {
    "id": "264432",
    "name": "Abdessamad Ezzalzouli",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "247050",
    "name": "Pavel Šulc",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Czech Republic"
    ],
    "club": {
      "id": "olympique-lyonnais",
      "name": "Olympique Lyonnais"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Olympique Lyonnais"
      }
    ]
  },
  {
    "id": "231627",
    "name": "Umar Sadiq",
    "position": "DEL (DC)",
    "age": 29,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "real-sociedad",
      "name": "Real Sociedad"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Real Sociedad"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Real Sociedad"
      }
    ]
  },
  {
    "id": "246791",
    "name": "Manor Solomon",
    "position": "MED (MI)",
    "age": 26,
    "nationalities": [
      "Israel"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "232119",
    "name": "Çağlar Söyüncü",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "79402",
    "name": "Igor Jesus",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "228635",
    "name": "Borja Mayoral",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "getafe-cf",
      "name": "Getafe CF"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Getafe CF"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Getafe CF"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Getafe CF"
      }
    ]
  },
  {
    "id": "251810",
    "name": "Brian Brobbey",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Sunderland"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Sunderland"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Sunderland"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Sunderland"
      }
    ]
  },
  {
    "id": "276295",
    "name": "Thierno Barry",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "226777",
    "name": "Cyle Larin",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "Canada"
    ],
    "club": {
      "id": "club",
      "name": "Feyenoord"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Feyenoord"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Feyenoord"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Feyenoord"
      }
    ]
  },
  {
    "id": "228687",
    "name": "Kasper Dolberg",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "club",
      "name": "Ajax"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Ajax"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Ajax"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Ajax"
      }
    ]
  },
  {
    "id": "237254",
    "name": "Kévin Denkey",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Togo"
    ],
    "club": {
      "id": "club",
      "name": "FC Cincinnati"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "FC Cincinnati"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "FC Cincinnati"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "FC Cincinnati"
      }
    ]
  },
  {
    "id": "75605",
    "name": "Asencio",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-madrid",
      "name": "Real Madrid"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Real Madrid"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Real Madrid"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Real Madrid"
      }
    ]
  },
  {
    "id": "221491",
    "name": "Nico Elvedi",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "borussia-m-nchengladbach",
      "name": "Borussia Mönchengladbach"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Borussia Mönchengladbach"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Borussia Mönchengladbach"
      }
    ]
  },
  {
    "id": "242453",
    "name": "Sepp van den Berg",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "247463",
    "name": "Folarin Balogun",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "245336",
    "name": "Maximilian Kilman",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "265693",
    "name": "Jakub Kiwior",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "226766",
    "name": "Daniel Podence",
    "position": "DEL (ED)",
    "age": 30,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "club",
      "name": "Olympiacos FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Olympiacos FC"
      }
    ]
  },
  {
    "id": "234986",
    "name": "Panagiotis Retsos",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "club",
      "name": "Olympiacos FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Olympiacos FC"
      }
    ]
  },
  {
    "id": "219585",
    "name": "Martin Valjent",
    "position": "DEF (DFC)",
    "age": 30,
    "nationalities": [
      "Slovakia"
    ],
    "club": {
      "id": "rcd-mallorca",
      "name": "RCD Mallorca"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RCD Mallorca"
      }
    ]
  },
  {
    "id": "271916",
    "name": "Bryan Zaragoza",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "243923",
    "name": "Logan Costa",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Cape Verde Islands"
    ],
    "club": {
      "id": "villarreal-cf",
      "name": "Villarreal CF"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Villarreal CF"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Villarreal CF"
      }
    ]
  },
  {
    "id": "229942",
    "name": "Axel Disasi",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "258432",
    "name": "Chrislain Matsima",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "fc-augsburg",
      "name": "FC Augsburg"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "FC Augsburg"
      }
    ]
  },
  {
    "id": "250954",
    "name": "Chris Richards",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "245426",
    "name": "Marash Kumbulla",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Albania"
    ],
    "club": {
      "id": "rcd-mallorca",
      "name": "RCD Mallorca"
    },
    "marketValue": 50118723,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 32577170,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2024",
        "marketValue": 42600915,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2026",
        "marketValue": 50118723,
        "clubName": "RCD Mallorca"
      }
    ]
  },
  {
    "id": "211093",
    "name": "Callum McGregor",
    "position": "MED (MCD)",
    "age": 32,
    "nationalities": [
      "Scotland"
    ],
    "club": {
      "id": "club",
      "name": "Celtic"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Celtic"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Celtic"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Celtic"
      }
    ]
  },
  {
    "id": "212811",
    "name": "Mario Lemina",
    "position": "MED (MCD)",
    "age": 32,
    "nationalities": [
      "Gabon"
    ],
    "club": {
      "id": "club",
      "name": "Galatasaray"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Galatasaray"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Galatasaray"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Galatasaray"
      }
    ]
  },
  {
    "id": "227890",
    "name": "Nuno Santos",
    "position": "MED (MI)",
    "age": 31,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "183512",
    "name": "Yuri Berchiche",
    "position": "DEF (LI)",
    "age": 36,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "200159",
    "name": "Stefan Ortega",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "205186",
    "name": "Paulo Gazzaniga",
    "position": "POR (POR)",
    "age": 34,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "188377",
    "name": "Kyle Walker",
    "position": "DEF (LD)",
    "age": 35,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "club",
      "name": "Burnley"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Burnley"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Burnley"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Burnley"
      }
    ]
  },
  {
    "id": "212091",
    "name": "Rodinei",
    "position": "DEF (LD)",
    "age": 34,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "Olympiacos FC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Olympiacos FC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Olympiacos FC"
      }
    ]
  },
  {
    "id": "206511",
    "name": "Maximilian Arnold",
    "position": "MED (MCD)",
    "age": 31,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "216150",
    "name": "Davide Zappacosta",
    "position": "MED (MI)",
    "age": 33,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "242201",
    "name": "Luis Milla",
    "position": "MED (MC)",
    "age": 31,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "getafe-cf",
      "name": "Getafe CF"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Getafe CF"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Getafe CF"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Getafe CF"
      }
    ]
  },
  {
    "id": "213884",
    "name": "Ryan Christie",
    "position": "MED (MCD)",
    "age": 31,
    "nationalities": [
      "Scotland"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "183711",
    "name": "Jordan Henderson",
    "position": "MED (MCD)",
    "age": 35,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "192638",
    "name": "Marcos Alonso",
    "position": "DEF (DFC)",
    "age": 35,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "celta-de-vigo",
      "name": "Celta de Vigo"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Celta de Vigo"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Celta de Vigo"
      }
    ]
  },
  {
    "id": "195864",
    "name": "Paul Pogba",
    "position": "MED (MC)",
    "age": 33,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "199987",
    "name": "Jasper Cillessen",
    "position": "POR (POR)",
    "age": 36,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "N.E.C. Nijmegen"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "N.E.C. Nijmegen"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "N.E.C. Nijmegen"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "N.E.C. Nijmegen"
      }
    ]
  },
  {
    "id": "219789",
    "name": "Hamari Traoré",
    "position": "DEF (LD)",
    "age": 34,
    "nationalities": [
      "Mali"
    ],
    "club": {
      "id": "paris-fc",
      "name": "Paris FC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Paris FC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Paris FC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Paris FC"
      }
    ]
  },
  {
    "id": "221087",
    "name": "Pau López",
    "position": "POR (POR)",
    "age": 31,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "163587",
    "name": "Kasper Schmeichel",
    "position": "POR (POR)",
    "age": 39,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "club",
      "name": "Celtic"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Celtic"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Celtic"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Celtic"
      }
    ]
  },
  {
    "id": "214979",
    "name": "Juan Musso",
    "position": "POR (POR)",
    "age": 31,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "atl-tico-de-madrid",
      "name": "Atlético de Madrid"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Atlético de Madrid"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Atlético de Madrid"
      }
    ]
  },
  {
    "id": "224003",
    "name": "Sergio Herrera",
    "position": "POR (POR)",
    "age": 32,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "ca-osasuna",
      "name": "CA Osasuna"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "CA Osasuna"
      }
    ]
  },
  {
    "id": "189908",
    "name": "Łukasz Skorupski",
    "position": "POR (POR)",
    "age": 34,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "bologna",
      "name": "Bologna"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Bologna"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Bologna"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Bologna"
      }
    ]
  },
  {
    "id": "206585",
    "name": "Kepa",
    "position": "POR (POR)",
    "age": 31,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "arsenal-fc",
      "name": "Arsenal FC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Arsenal FC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Arsenal FC"
      }
    ]
  },
  {
    "id": "223874",
    "name": "Valentin Rongier",
    "position": "MED (MCD)",
    "age": 31,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "stade-rennais",
      "name": "Stade Rennais"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Stade Rennais"
      }
    ]
  },
  {
    "id": "225951",
    "name": "Denis Bouanga",
    "position": "DEL (EI)",
    "age": 31,
    "nationalities": [
      "Gabon"
    ],
    "club": {
      "id": "club",
      "name": "LAFC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "LAFC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "LAFC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "LAFC"
      }
    ]
  },
  {
    "id": "236045",
    "name": "Reinildo",
    "position": "DEF (LI)",
    "age": 32,
    "nationalities": [
      "Mozambique"
    ],
    "club": {
      "id": "club",
      "name": "Sunderland"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Sunderland"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Sunderland"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Sunderland"
      }
    ]
  },
  {
    "id": "226376",
    "name": "Kaku",
    "position": "MED (MCO)",
    "age": 31,
    "nationalities": [
      "Paraguay"
    ],
    "club": {
      "id": "club",
      "name": "Al Ain FC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Al Ain FC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Al Ain FC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Al Ain FC"
      }
    ]
  },
  {
    "id": "227290",
    "name": "Marko Dmitrović",
    "position": "POR (POR)",
    "age": 34,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "rcd-espanyol",
      "name": "RCD Espanyol"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "RCD Espanyol"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "RCD Espanyol"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "RCD Espanyol"
      }
    ]
  },
  {
    "id": "205855",
    "name": "Marko Livaja",
    "position": "DEL (DC)",
    "age": 32,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "club",
      "name": "Hajduk Split"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Hajduk Split"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Hajduk Split"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Hajduk Split"
      }
    ]
  },
  {
    "id": "232487",
    "name": "Wataru Endo",
    "position": "MED (MCD)",
    "age": 33,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "liverpool-fc",
      "name": "Liverpool FC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Liverpool FC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Liverpool FC"
      }
    ]
  },
  {
    "id": "182494",
    "name": "Fernando Muslera",
    "position": "POR (POR)",
    "age": 39,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "estudiantes-de-la-plata",
      "name": "Estudiantes de La Plata"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Estudiantes de La Plata"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Estudiantes de La Plata"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Estudiantes de La Plata"
      }
    ]
  },
  {
    "id": "215223",
    "name": "Walter Benítez",
    "position": "POR (POR)",
    "age": 33,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "crystal-palace",
      "name": "Crystal Palace"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Crystal Palace"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Crystal Palace"
      }
    ]
  },
  {
    "id": "207993",
    "name": "Sead Kolašinac",
    "position": "DEF (DFC)",
    "age": 32,
    "nationalities": [
      "Bosnia and Herzegovina"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "211348",
    "name": "Stole Dimitrievski",
    "position": "POR (POR)",
    "age": 32,
    "nationalities": [
      "North Macedonia"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "215270",
    "name": "Lucas Zelarayán",
    "position": "MED (MCO)",
    "age": 33,
    "nationalities": [
      "Armenia"
    ],
    "club": {
      "id": "belgrano-de-c-rdoba",
      "name": "Belgrano de Córdoba"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Belgrano de Córdoba"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Belgrano de Córdoba"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Belgrano de Córdoba"
      }
    ]
  },
  {
    "id": "190813",
    "name": "Stephan El Shaarawy",
    "position": "MED (MI)",
    "age": 33,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "198141",
    "name": "Marc Bartra",
    "position": "DEF (DFC)",
    "age": 35,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "real-betis",
      "name": "Real Betis"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Real Betis"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Real Betis"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Real Betis"
      }
    ]
  },
  {
    "id": "193301",
    "name": "Alexandre Lacazette",
    "position": "DEL (DC)",
    "age": 34,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "club",
      "name": "Neom"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Neom"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Neom"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Neom"
      }
    ]
  },
  {
    "id": "210021",
    "name": "Hany Mukhtar",
    "position": "MED (MCO)",
    "age": 31,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "club",
      "name": "Nashville SC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Nashville SC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Nashville SC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Nashville SC"
      }
    ]
  },
  {
    "id": "188350",
    "name": "Marco Reus",
    "position": "MED (MCO)",
    "age": 36,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "club",
      "name": "LA Galaxy"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "LA Galaxy"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "LA Galaxy"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "LA Galaxy"
      }
    ]
  },
  {
    "id": "193474",
    "name": "Idrissa Gueye",
    "position": "MED (MCD)",
    "age": 36,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "199422",
    "name": "Jordy Clasie",
    "position": "MED (MCD)",
    "age": 34,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "AZ"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "AZ"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "AZ"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "AZ"
      }
    ]
  },
  {
    "id": "202335",
    "name": "Eric Dier",
    "position": "DEF (DFC)",
    "age": 32,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "205431",
    "name": "Niclas Füllkrug",
    "position": "DEL (DC)",
    "age": 33,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "176580",
    "name": "Luis Suárez",
    "position": "DEL (DC)",
    "age": 39,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "inter-miami-cf",
      "name": "Inter Miami CF"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Inter Miami CF"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Inter Miami CF"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Inter Miami CF"
      }
    ]
  },
  {
    "id": "210930",
    "name": "Carles Gil",
    "position": "MED (MCO)",
    "age": 33,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "club",
      "name": "New England"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "New England"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "New England"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "New England"
      }
    ]
  },
  {
    "id": "213761",
    "name": "Abderrazak Hamdallah",
    "position": "DEL (DC)",
    "age": 35,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "club",
      "name": "Al Shabab"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Al Shabab"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Al Shabab"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Al Shabab"
      }
    ]
  },
  {
    "id": "208448",
    "name": "Emil Forsberg",
    "position": "MED (MCO)",
    "age": 34,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "club",
      "name": "Red Bulls"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Red Bulls"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Red Bulls"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Red Bulls"
      }
    ]
  },
  {
    "id": "178509",
    "name": "Olivier Giroud",
    "position": "DEL (DC)",
    "age": 39,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "losc-lille",
      "name": "LOSC Lille"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "LOSC Lille"
      }
    ]
  },
  {
    "id": "197655",
    "name": "Sebastián Coates",
    "position": "DEF (DFC)",
    "age": 35,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "club",
      "name": "Nacional"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Nacional"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Nacional"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Nacional"
      }
    ]
  },
  {
    "id": "205175",
    "name": "Arkadiusz Milik",
    "position": "DEL (DC)",
    "age": 32,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "juventus",
      "name": "Juventus"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Juventus"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Juventus"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Juventus"
      }
    ]
  },
  {
    "id": "208165",
    "name": "Berat Djimsiti",
    "position": "DEF (DFC)",
    "age": 33,
    "nationalities": [
      "Albania"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "223710",
    "name": "Vedat Muriqi",
    "position": "DEL (DC)",
    "age": 31,
    "nationalities": [
      "Kosovo"
    ],
    "club": {
      "id": "rcd-mallorca",
      "name": "RCD Mallorca"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "RCD Mallorca"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "RCD Mallorca"
      }
    ]
  },
  {
    "id": "243976",
    "name": "Catena",
    "position": "DEF (DFC)",
    "age": 31,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "ca-osasuna",
      "name": "CA Osasuna"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "CA Osasuna"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "CA Osasuna"
      }
    ]
  },
  {
    "id": "198032",
    "name": "Dan Burn",
    "position": "DEF (DFC)",
    "age": 33,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 47659694,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30978801,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 40510740,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 47659694,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "268534",
    "name": "Andy Diouf",
    "position": "MED (MC)",
    "age": 22,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "272874",
    "name": "Arne Engels",
    "position": "MED (MC)",
    "age": 22,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "club",
      "name": "Celtic"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Celtic"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Celtic"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Celtic"
      }
    ]
  },
  {
    "id": "274915",
    "name": "El Hadji Malick Diouf",
    "position": "DEF (LI)",
    "age": 21,
    "nationalities": [
      "Senegal"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "261530",
    "name": "Dário Essugo",
    "position": "MED (MCD)",
    "age": 21,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "277283",
    "name": "Jack Hinshelwood",
    "position": "MED (MCD)",
    "age": 20,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "270208",
    "name": "Archie Gray",
    "position": "MED (MCD)",
    "age": 20,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "257400",
    "name": "Yasin Ayari",
    "position": "MED (MC)",
    "age": 22,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "brighton---hove-albion",
      "name": "Brighton & Hove Albion"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Brighton & Hove Albion"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Brighton & Hove Albion"
      }
    ]
  },
  {
    "id": "264174",
    "name": "Juanlu Sánchez",
    "position": "DEF (LD)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "sevilla-fc",
      "name": "Sevilla FC"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Sevilla FC"
      }
    ]
  },
  {
    "id": "271266",
    "name": "Givairo Read",
    "position": "DEF (LD)",
    "age": 19,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Feyenoord"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Feyenoord"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Feyenoord"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Feyenoord"
      }
    ]
  },
  {
    "id": "278901",
    "name": "Ayyoub Bouaddi",
    "position": "MED (MC)",
    "age": 18,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "losc-lille",
      "name": "LOSC Lille"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "LOSC Lille"
      }
    ]
  },
  {
    "id": "260145",
    "name": "Omari Hutchinson",
    "position": "MED (MCO)",
    "age": 22,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "nottingham-forest",
      "name": "Nottingham Forest"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Nottingham Forest"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Nottingham Forest"
      }
    ]
  },
  {
    "id": "263824",
    "name": "Musab Al Juwair",
    "position": "MED (MC)",
    "age": 22,
    "nationalities": [
      "Saudi Arabia"
    ],
    "club": {
      "id": "club",
      "name": "Al Qadsiah"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Al Qadsiah"
      }
    ]
  },
  {
    "id": "271464",
    "name": "Yáser Asprilla",
    "position": "MED (MD)",
    "age": 22,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "72093",
    "name": "Martim Fernandes",
    "position": "DEF (LD)",
    "age": 20,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "269728",
    "name": "Jean-Mattéo Bahoya",
    "position": "MED (MI)",
    "age": 20,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "263370",
    "name": "Valentín Barco",
    "position": "DEF (LI)",
    "age": 21,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "rc-strasbourg",
      "name": "RC Strasbourg"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "RC Strasbourg"
      }
    ]
  },
  {
    "id": "70004",
    "name": "Senny Mayulu",
    "position": "MED (MC)",
    "age": 19,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "paris-saint-germain",
      "name": "Paris Saint-Germain"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Paris Saint-Germain"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Paris Saint-Germain"
      }
    ]
  },
  {
    "id": "262657",
    "name": "Lucas Stassin",
    "position": "DEL (DC)",
    "age": 21,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "club",
      "name": "AS Saint-Étienne"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "AS Saint-Étienne"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "AS Saint-Étienne"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "AS Saint-Étienne"
      }
    ]
  },
  {
    "id": "266500",
    "name": "Jonathan Rowe",
    "position": "MED (MI)",
    "age": 22,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "bologna",
      "name": "Bologna"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Bologna"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Bologna"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Bologna"
      }
    ]
  },
  {
    "id": "276048",
    "name": "Matias Fernandez-Pardo",
    "position": "MED (MI)",
    "age": 21,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "losc-lille",
      "name": "LOSC Lille"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "LOSC Lille"
      }
    ]
  },
  {
    "id": "274209",
    "name": "Carlos Álvarez",
    "position": "MED (MD)",
    "age": 22,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "club",
      "name": "Levante UD"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Levante UD"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Levante UD"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Levante UD"
      }
    ]
  },
  {
    "id": "74896",
    "name": "Franjo Ivanović",
    "position": "DEL (DC)",
    "age": 22,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "sl-benfica",
      "name": "SL Benfica"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "SL Benfica"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "SL Benfica"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "SL Benfica"
      }
    ]
  },
  {
    "id": "270465",
    "name": "Badredine Bouanani",
    "position": "DEL (ED)",
    "age": 21,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "268763",
    "name": "Ernest Nuamah",
    "position": "MED (MD)",
    "age": 22,
    "nationalities": [
      "Ghana"
    ],
    "club": {
      "id": "olympique-lyonnais",
      "name": "Olympique Lyonnais"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Olympique Lyonnais"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Olympique Lyonnais"
      }
    ]
  },
  {
    "id": "270579",
    "name": "Wilson Odobert",
    "position": "DEL (EI)",
    "age": 21,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "tottenham-hotspur",
      "name": "Tottenham Hotspur"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Tottenham Hotspur"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Tottenham Hotspur"
      }
    ]
  },
  {
    "id": "272785",
    "name": "Christian Mawissa",
    "position": "DEF (DFC)",
    "age": 20,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "263193",
    "name": "El Chadaille Bitshiabu",
    "position": "DEF (DFC)",
    "age": 20,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "269495",
    "name": "Facundo Buonanotte",
    "position": "MED (MD)",
    "age": 21,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "278903",
    "name": "Jérémy Jacquet",
    "position": "DEF (DFC)",
    "age": 20,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "stade-rennais",
      "name": "Stade Rennais"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Stade Rennais"
      }
    ]
  },
  {
    "id": "268611",
    "name": "Joel Ordoñez",
    "position": "DEF (DFC)",
    "age": 21,
    "nationalities": [
      "Ecuador"
    ],
    "club": {
      "id": "club",
      "name": "Club Brugge"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Club Brugge"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Club Brugge"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Club Brugge"
      }
    ]
  },
  {
    "id": "265576",
    "name": "Leopold Querfeld",
    "position": "DEF (DFC)",
    "age": 22,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "union-berlin",
      "name": "Union Berlin"
    },
    "marketValue": 47434165,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 30832207,
        "clubName": "Union Berlin"
      },
      {
        "date": "2024",
        "marketValue": 40319040,
        "clubName": "Union Berlin"
      },
      {
        "date": "2026",
        "marketValue": 47434165,
        "clubName": "Union Berlin"
      }
    ]
  },
  {
    "id": "229752",
    "name": "Djibril Sow",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "sevilla-fc",
      "name": "Sevilla FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Sevilla FC"
      }
    ]
  },
  {
    "id": "258746",
    "name": "Malcom Braida",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "boca-juniors",
      "name": "Boca Juniors"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Boca Juniors"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Boca Juniors"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Boca Juniors"
      }
    ]
  },
  {
    "id": "230965",
    "name": "Nahitan Nández",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "club",
      "name": "Al Qadsiah"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Al Qadsiah"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Al Qadsiah"
      }
    ]
  },
  {
    "id": "236441",
    "name": "Fabricio Bustos",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "river-plate",
      "name": "River Plate"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "River Plate"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "River Plate"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "River Plate"
      }
    ]
  },
  {
    "id": "227884",
    "name": "Bright Osayi-Samuel",
    "position": "DEF (LD)",
    "age": 28,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "club",
      "name": "Birmingham City"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Birmingham City"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Birmingham City"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Birmingham City"
      }
    ]
  },
  {
    "id": "229167",
    "name": "Milot Rashica",
    "position": "MED (MD)",
    "age": 29,
    "nationalities": [
      "Kosovo"
    ],
    "club": {
      "id": "club",
      "name": "Beşiktaş"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Beşiktaş"
      }
    ]
  },
  {
    "id": "237329",
    "name": "Joe Willock",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "newcastle-united",
      "name": "Newcastle United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Newcastle United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Newcastle United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Newcastle United"
      }
    ]
  },
  {
    "id": "222464",
    "name": "Sivera",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "deportivo-alav-s",
      "name": "Deportivo Alavés"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Deportivo Alavés"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Deportivo Alavés"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Deportivo Alavés"
      }
    ]
  },
  {
    "id": "226853",
    "name": "Jeremiah St. Juste",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "sporting-cp",
      "name": "Sporting CP"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Sporting CP"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Sporting CP"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Sporting CP"
      }
    ]
  },
  {
    "id": "222390",
    "name": "Unai López",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "rayo-vallecano",
      "name": "Rayo Vallecano"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Rayo Vallecano"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Rayo Vallecano"
      }
    ]
  },
  {
    "id": "230065",
    "name": "Suat Serdar",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "hellas-verona",
      "name": "Hellas Verona"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Hellas Verona"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Hellas Verona"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Hellas Verona"
      }
    ]
  },
  {
    "id": "238067",
    "name": "Nicolò Zaniolo",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "udinese",
      "name": "Udinese"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Udinese"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Udinese"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Udinese"
      }
    ]
  },
  {
    "id": "240987",
    "name": "Michael Cooper",
    "position": "POR (POR)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "club",
      "name": "Sheffield Utd"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Sheffield Utd"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Sheffield Utd"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Sheffield Utd"
      }
    ]
  },
  {
    "id": "228946",
    "name": "Mattias Svanberg",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "235432",
    "name": "Marshall Munetsi",
    "position": "MED (MC)",
    "age": 29,
    "nationalities": [
      "Zimbabwe"
    ],
    "club": {
      "id": "wolverhampton-wanderers",
      "name": "Wolverhampton Wanderers"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Wolverhampton Wanderers"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Wolverhampton Wanderers"
      }
    ]
  },
  {
    "id": "240507",
    "name": "Angel Gomes",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "255742",
    "name": "Reo Hatate",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "club",
      "name": "Celtic"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Celtic"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Celtic"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Celtic"
      }
    ]
  },
  {
    "id": "236764",
    "name": "Ao Tanaka",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "244205",
    "name": "Maximiliano Salas",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "river-plate",
      "name": "River Plate"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "River Plate"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "River Plate"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "River Plate"
      }
    ]
  },
  {
    "id": "259788",
    "name": "Juan Portillo",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "river-plate",
      "name": "River Plate"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "River Plate"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "River Plate"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "River Plate"
      }
    ]
  },
  {
    "id": "246158",
    "name": "Mads Hermansen",
    "position": "POR (POR)",
    "age": 25,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "251011",
    "name": "Kirian",
    "position": "MED (MC)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "ud-las-palmas",
      "name": "UD Las Palmas"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "UD Las Palmas"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "UD Las Palmas"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "UD Las Palmas"
      }
    ]
  },
  {
    "id": "225149",
    "name": "Jean Butez",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "como-1907",
      "name": "Como 1907"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Como 1907"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Como 1907"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Como 1907"
      }
    ]
  },
  {
    "id": "239978",
    "name": "Dennis Man",
    "position": "MED (MD)",
    "age": 27,
    "nationalities": [
      "Romania"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "240915",
    "name": "Juan Miranda",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "bologna",
      "name": "Bologna"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Bologna"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Bologna"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Bologna"
      }
    ]
  },
  {
    "id": "258683",
    "name": "Ivan Ilić",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "torino",
      "name": "Torino"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Torino"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Torino"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Torino"
      }
    ]
  },
  {
    "id": "237841",
    "name": "Amir Murillo",
    "position": "DEF (LD)",
    "age": 30,
    "nationalities": [
      "Panama"
    ],
    "club": {
      "id": "olympique-de-marseille",
      "name": "Olympique de Marseille"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Olympique de Marseille"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Olympique de Marseille"
      }
    ]
  },
  {
    "id": "239613",
    "name": "Matteo Pessina",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "club",
      "name": "Monza"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Monza"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Monza"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Monza"
      }
    ]
  },
  {
    "id": "242633",
    "name": "Morten Frendrup",
    "position": "MED (MC)",
    "age": 24,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "genoa",
      "name": "Genoa"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Genoa"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Genoa"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Genoa"
      }
    ]
  },
  {
    "id": "263063",
    "name": "James Trafford",
    "position": "POR (POR)",
    "age": 23,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "manchester-city",
      "name": "Manchester City"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Manchester City"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Manchester City"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Manchester City"
      }
    ]
  },
  {
    "id": "226790",
    "name": "Wilfred Ndidi",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Nigeria"
    ],
    "club": {
      "id": "club",
      "name": "Beşiktaş"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Beşiktaş"
      }
    ]
  },
  {
    "id": "232104",
    "name": "Daniel James",
    "position": "MED (MD)",
    "age": 28,
    "nationalities": [
      "Wales"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "243606",
    "name": "Keane Lewis-Potter",
    "position": "DEF (LI)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "245597",
    "name": "Víctor Gómez",
    "position": "DEF (LD)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "club",
      "name": "SC Braga"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "SC Braga"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "SC Braga"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "SC Braga"
      }
    ]
  },
  {
    "id": "264172",
    "name": "Carmona",
    "position": "DEF (LD)",
    "age": 24,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "sevilla-fc",
      "name": "Sevilla FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Sevilla FC"
      }
    ]
  },
  {
    "id": "211147",
    "name": "Valentino Lazaro",
    "position": "MED (MD)",
    "age": 30,
    "nationalities": [
      "Austria"
    ],
    "club": {
      "id": "torino",
      "name": "Torino"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Torino"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Torino"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Torino"
      }
    ]
  },
  {
    "id": "213956",
    "name": "Adama Traoré",
    "position": "MED (MD)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "235167",
    "name": "Vitaly Janelt",
    "position": "MED (MC)",
    "age": 27,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "246685",
    "name": "Leif Davis",
    "position": "DEF (LI)",
    "age": 26,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "ipswich-town",
      "name": "Ipswich Town"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Ipswich Town"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Ipswich Town"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Ipswich Town"
      }
    ]
  },
  {
    "id": "258729",
    "name": "Gabri Veiga",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "fc-porto",
      "name": "FC Porto"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "FC Porto"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "FC Porto"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "FC Porto"
      }
    ]
  },
  {
    "id": "275353",
    "name": "Zakaria El Ouahdi",
    "position": "DEF (LD)",
    "age": 24,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "club",
      "name": "KRC Genk"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "KRC Genk"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "KRC Genk"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "KRC Genk"
      }
    ]
  },
  {
    "id": "240451",
    "name": "Jan-Niklas Beste",
    "position": "MED (MI)",
    "age": 27,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "sc-freiburg",
      "name": "SC Freiburg"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "SC Freiburg"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "SC Freiburg"
      }
    ]
  },
  {
    "id": "247832",
    "name": "Thierry Correia",
    "position": "DEF (LD)",
    "age": 27,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "237477",
    "name": "Marcus Tavernier",
    "position": "MED (MI)",
    "age": 27,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "244114",
    "name": "Batista Mendy",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "sevilla-fc",
      "name": "Sevilla FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Sevilla FC"
      }
    ]
  },
  {
    "id": "242577",
    "name": "Romain Faivre",
    "position": "MED (MD)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "afc-bournemouth",
      "name": "AFC Bournemouth"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "AFC Bournemouth"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "AFC Bournemouth"
      }
    ]
  },
  {
    "id": "245461",
    "name": "Facundo Colidio",
    "position": "DEL (DC)",
    "age": 26,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "river-plate",
      "name": "River Plate"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "River Plate"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "River Plate"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "River Plate"
      }
    ]
  },
  {
    "id": "255303",
    "name": "Elia Caprile",
    "position": "POR (POR)",
    "age": 24,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "cagliari",
      "name": "Cagliari"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Cagliari"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Cagliari"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Cagliari"
      }
    ]
  },
  {
    "id": "257889",
    "name": "Kristijan Jakić",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "fc-augsburg",
      "name": "FC Augsburg"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "FC Augsburg"
      }
    ]
  },
  {
    "id": "241736",
    "name": "Yann Aurel Bisseck",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "inter",
      "name": "Inter"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Inter"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Inter"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Inter"
      }
    ]
  },
  {
    "id": "223686",
    "name": "Timon Wellenreuther",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "club",
      "name": "Feyenoord"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Feyenoord"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Feyenoord"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Feyenoord"
      }
    ]
  },
  {
    "id": "261616",
    "name": "Quentin Merlin",
    "position": "DEF (LI)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "stade-rennais",
      "name": "Stade Rennais"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Stade Rennais"
      }
    ]
  },
  {
    "id": "261659",
    "name": "Senne Lynen",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "werder-bremen",
      "name": "Werder Bremen"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Werder Bremen"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Werder Bremen"
      }
    ]
  },
  {
    "id": "224490",
    "name": "Zeki Çelik",
    "position": "DEF (LD)",
    "age": 29,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "as-roma",
      "name": "AS Roma"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "AS Roma"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "AS Roma"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "AS Roma"
      }
    ]
  },
  {
    "id": "262113",
    "name": "Nicola Zalewski",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "atalanta",
      "name": "Atalanta"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Atalanta"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Atalanta"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Atalanta"
      }
    ]
  },
  {
    "id": "221363",
    "name": "Donny van de Beek",
    "position": "MED (MCO)",
    "age": 28,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "227370",
    "name": "Michael Zetterer",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "eintracht-frankfurt",
      "name": "Eintracht Frankfurt"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Eintracht Frankfurt"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Eintracht Frankfurt"
      }
    ]
  },
  {
    "id": "242879",
    "name": "Maarten Vandevoordt",
    "position": "POR (POR)",
    "age": 24,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "246297",
    "name": "Himad Abdelli",
    "position": "MED (MCO)",
    "age": 26,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "angers-sco",
      "name": "Angers SCO"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Angers SCO"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Angers SCO"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Angers SCO"
      }
    ]
  },
  {
    "id": "215502",
    "name": "Bartłomiej Drągowski",
    "position": "POR (POR)",
    "age": 28,
    "nationalities": [
      "Poland"
    ],
    "club": {
      "id": "club",
      "name": "Panathinaikos"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Panathinaikos"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Panathinaikos"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Panathinaikos"
      }
    ]
  },
  {
    "id": "258168",
    "name": "Jayden Oosterwolde",
    "position": "DEF (LI)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Fenerbahçe"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Fenerbahçe"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Fenerbahçe"
      }
    ]
  },
  {
    "id": "236457",
    "name": "Dimitris Giannoulis",
    "position": "DEF (LI)",
    "age": 30,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "fc-augsburg",
      "name": "FC Augsburg"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "FC Augsburg"
      }
    ]
  },
  {
    "id": "245211",
    "name": "Jordan Teze",
    "position": "DEF (LD)",
    "age": 26,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "as-monaco",
      "name": "AS Monaco"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "AS Monaco"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "AS Monaco"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "AS Monaco"
      }
    ]
  },
  {
    "id": "242914",
    "name": "Keito Nakamura",
    "position": "MED (MI)",
    "age": 25,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "club",
      "name": "Stade de Reims"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Stade de Reims"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Stade de Reims"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Stade de Reims"
      }
    ]
  },
  {
    "id": "265650",
    "name": "Saúl Coco",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Equatorial Guinea"
    ],
    "club": {
      "id": "torino",
      "name": "Torino"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Torino"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Torino"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Torino"
      }
    ]
  },
  {
    "id": "274536",
    "name": "Moïse Bombito",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Canada"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "215363",
    "name": "Lorenzo Montipò",
    "position": "POR (POR)",
    "age": 30,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "hellas-verona",
      "name": "Hellas Verona"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Hellas Verona"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Hellas Verona"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Hellas Verona"
      }
    ]
  },
  {
    "id": "231612",
    "name": "Romain Del Castillo",
    "position": "DEL (ED)",
    "age": 30,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "stade-brestois",
      "name": "Stade Brestois"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Stade Brestois"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Stade Brestois"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Stade Brestois"
      }
    ]
  },
  {
    "id": "234671",
    "name": "Jens Odgaard",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "bologna",
      "name": "Bologna"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Bologna"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Bologna"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Bologna"
      }
    ]
  },
  {
    "id": "243657",
    "name": "James Garner",
    "position": "MED (MCD)",
    "age": 25,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "257073",
    "name": "Tiago Tomás",
    "position": "DEL (EI)",
    "age": 23,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "262929",
    "name": "Vinicius Souza",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "vfl-wolfsburg",
      "name": "VfL Wolfsburg"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "VfL Wolfsburg"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "VfL Wolfsburg"
      }
    ]
  },
  {
    "id": "221909",
    "name": "Jindřich Staněk",
    "position": "POR (POR)",
    "age": 29,
    "nationalities": [
      "Czech Republic"
    ],
    "club": {
      "id": "club",
      "name": "Slavia Praha"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Slavia Praha"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Slavia Praha"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Slavia Praha"
      }
    ]
  },
  {
    "id": "228941",
    "name": "André Silva",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "Portugal"
    ],
    "club": {
      "id": "club",
      "name": "Elche CF"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Elche CF"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Elche CF"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Elche CF"
      }
    ]
  },
  {
    "id": "242179",
    "name": "Yahia Fofana",
    "position": "POR (POR)",
    "age": 25,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "club",
      "name": "Çaykur Rizespor"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Çaykur Rizespor"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Çaykur Rizespor"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Çaykur Rizespor"
      }
    ]
  },
  {
    "id": "242530",
    "name": "Noah Okafor",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "246139",
    "name": "Iñaki Peña",
    "position": "POR (POR)",
    "age": 27,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "club",
      "name": "Elche CF"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Elche CF"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Elche CF"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Elche CF"
      }
    ]
  },
  {
    "id": "222501",
    "name": "Timothy Castagne",
    "position": "DEF (LD)",
    "age": 30,
    "nationalities": [
      "Belgium"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "228151",
    "name": "Josh Cullen",
    "position": "MED (MCD)",
    "age": 29,
    "nationalities": [
      "Republic of Ireland"
    ],
    "club": {
      "id": "club",
      "name": "Burnley"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Burnley"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Burnley"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Burnley"
      }
    ]
  },
  {
    "id": "231089",
    "name": "Ibrahima Sissoko",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Mali"
    ],
    "club": {
      "id": "club",
      "name": "VfL Bochum 1848"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "VfL Bochum 1848"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "VfL Bochum 1848"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "VfL Bochum 1848"
      }
    ]
  },
  {
    "id": "246258",
    "name": "Lucas Beltrán",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "260574",
    "name": "Lorenz Assignon",
    "position": "DEF (LD)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "vfb-stuttgart",
      "name": "VfB Stuttgart"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "VfB Stuttgart"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "VfB Stuttgart"
      }
    ]
  },
  {
    "id": "263880",
    "name": "Agirrezabala",
    "position": "POR (POR)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "244797",
    "name": "Petar Musa",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Croatia"
    ],
    "club": {
      "id": "club",
      "name": "FC Dallas"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "FC Dallas"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "FC Dallas"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "FC Dallas"
      }
    ]
  },
  {
    "id": "246033",
    "name": "Santiago Sosa",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "racing-club",
      "name": "Racing Club"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Racing Club"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Racing Club"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Racing Club"
      }
    ]
  },
  {
    "id": "220969",
    "name": "Niclas Eliasson",
    "position": "MED (MD)",
    "age": 30,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "club",
      "name": "AEK Athens"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "AEK Athens"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "AEK Athens"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "AEK Athens"
      }
    ]
  },
  {
    "id": "224422",
    "name": "Jérémie Boga",
    "position": "DEL (EI)",
    "age": 29,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "241162",
    "name": "Joseph Paintsil",
    "position": "MED (MI)",
    "age": 28,
    "nationalities": [
      "Ghana"
    ],
    "club": {
      "id": "club",
      "name": "LA Galaxy"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "LA Galaxy"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "LA Galaxy"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "LA Galaxy"
      }
    ]
  },
  {
    "id": "255125",
    "name": "Azzedine Ounahi",
    "position": "MED (MC)",
    "age": 25,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "73398",
    "name": "Rômulo",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "rb-leipzig",
      "name": "RB Leipzig"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "RB Leipzig"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "RB Leipzig"
      }
    ]
  },
  {
    "id": "224030",
    "name": "Maxime Lopez",
    "position": "MED (MC)",
    "age": 28,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "paris-fc",
      "name": "Paris FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Paris FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Paris FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Paris FC"
      }
    ]
  },
  {
    "id": "239614",
    "name": "Areso",
    "position": "DEF (LD)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "athletic-club",
      "name": "Athletic Club"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Athletic Club"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Athletic Club"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Athletic Club"
      }
    ]
  },
  {
    "id": "240953",
    "name": "Nahuel Tenaglia",
    "position": "DEF (LD)",
    "age": 30,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "deportivo-alav-s",
      "name": "Deportivo Alavés"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Deportivo Alavés"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Deportivo Alavés"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Deportivo Alavés"
      }
    ]
  },
  {
    "id": "244892",
    "name": "Sofiane Diop",
    "position": "DEL (EI)",
    "age": 25,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "ogc-nice",
      "name": "OGC Nice"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "OGC Nice"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "OGC Nice"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "OGC Nice"
      }
    ]
  },
  {
    "id": "245209",
    "name": "Michal Sadílek",
    "position": "MED (MCD)",
    "age": 26,
    "nationalities": [
      "Czech Republic"
    ],
    "club": {
      "id": "club",
      "name": "Slavia Praha"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Slavia Praha"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Slavia Praha"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Slavia Praha"
      }
    ]
  },
  {
    "id": "264422",
    "name": "Matthis Abline",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "fc-nantes",
      "name": "FC Nantes"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "FC Nantes"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "FC Nantes"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "FC Nantes"
      }
    ]
  },
  {
    "id": "70822",
    "name": "Gabriel Pec",
    "position": "MED (MD)",
    "age": 25,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "club",
      "name": "LA Galaxy"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "LA Galaxy"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "LA Galaxy"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "LA Galaxy"
      }
    ]
  },
  {
    "id": "230084",
    "name": "Lukas Nmecha",
    "position": "DEL (DC)",
    "age": 27,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "220710",
    "name": "Harry Wilson",
    "position": "MED (MD)",
    "age": 29,
    "nationalities": [
      "Wales"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "233230",
    "name": "Kevin Mac Allister",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Argentina"
    ],
    "club": {
      "id": "club",
      "name": "R. Union St.-G."
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "R. Union St.-G."
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "R. Union St.-G."
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "R. Union St.-G."
      }
    ]
  },
  {
    "id": "235735",
    "name": "Ethan Ampadu",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "Wales"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "224494",
    "name": "Rico Henry",
    "position": "DEF (LI)",
    "age": 28,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "brentford-fc",
      "name": "Brentford FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Brentford FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Brentford FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Brentford FC"
      }
    ]
  },
  {
    "id": "253510",
    "name": "Jake O'Brien",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Republic of Ireland"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "236593",
    "name": "Calvin Stengs",
    "position": "MED (MCO)",
    "age": 27,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "pisa-sc",
      "name": "Pisa SC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Pisa SC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Pisa SC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Pisa SC"
      }
    ]
  },
  {
    "id": "259399",
    "name": "Rasmus Højlund",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "251223",
    "name": "Ricardo Pepi",
    "position": "DEL (DC)",
    "age": 23,
    "nationalities": [
      "United States"
    ],
    "club": {
      "id": "club",
      "name": "PSV"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "PSV"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "PSV"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "PSV"
      }
    ]
  },
  {
    "id": "256942",
    "name": "Eric Martel",
    "position": "MED (MCD)",
    "age": 23,
    "nationalities": [
      "Germany"
    ],
    "club": {
      "id": "1--fc-k-ln",
      "name": "1. FC Köln"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "1. FC Köln"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "1. FC Köln"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "1. FC Köln"
      }
    ]
  },
  {
    "id": "240663",
    "name": "Miguel Ángel Merentiel",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "Uruguay"
    ],
    "club": {
      "id": "boca-juniors",
      "name": "Boca Juniors"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Boca Juniors"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Boca Juniors"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Boca Juniors"
      }
    ]
  },
  {
    "id": "235889",
    "name": "Cengiz Ünder",
    "position": "DEL (ED)",
    "age": 28,
    "nationalities": [
      "Turkey"
    ],
    "club": {
      "id": "club",
      "name": "Beşiktaş"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Beşiktaş"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Beşiktaş"
      }
    ]
  },
  {
    "id": "239356",
    "name": "Azor Matusiwa",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "ipswich-town",
      "name": "Ipswich Town"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Ipswich Town"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Ipswich Town"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Ipswich Town"
      }
    ]
  },
  {
    "id": "234239",
    "name": "Gauthier Hein",
    "position": "MED (MCO)",
    "age": 29,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "fc-metz",
      "name": "FC Metz"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "FC Metz"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "FC Metz"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "FC Metz"
      }
    ]
  },
  {
    "id": "242971",
    "name": "Carlos Palacios",
    "position": "MED (MCO)",
    "age": 25,
    "nationalities": [
      "Chile"
    ],
    "club": {
      "id": "boca-juniors",
      "name": "Boca Juniors"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Boca Juniors"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Boca Juniors"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Boca Juniors"
      }
    ]
  },
  {
    "id": "246350",
    "name": "Enzo Le Fée",
    "position": "MED (MC)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "club",
      "name": "Sunderland"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Sunderland"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Sunderland"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Sunderland"
      }
    ]
  },
  {
    "id": "261307",
    "name": "Veljko Birmančević",
    "position": "DEL (ED)",
    "age": 28,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "club",
      "name": "Sparta Praha"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Sparta Praha"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Sparta Praha"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Sparta Praha"
      }
    ]
  },
  {
    "id": "241463",
    "name": "Dani Raba",
    "position": "MED (MD)",
    "age": 30,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "valencia-cf",
      "name": "Valencia CF"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Valencia CF"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Valencia CF"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Valencia CF"
      }
    ]
  },
  {
    "id": "242000",
    "name": "Konstantinos Mavropanos",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Greece"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "251954",
    "name": "Crysencio Summerville",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "west-ham-united",
      "name": "West Ham United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "West Ham United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "West Ham United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "West Ham United"
      }
    ]
  },
  {
    "id": "70571",
    "name": "Kevin",
    "position": "DEL (EI)",
    "age": 23,
    "nationalities": [
      "Brazil"
    ],
    "club": {
      "id": "fulham-fc",
      "name": "Fulham FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Fulham FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Fulham FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Fulham FC"
      }
    ]
  },
  {
    "id": "234612",
    "name": "Jonathan Ikoné",
    "position": "MED (MD)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "paris-fc",
      "name": "Paris FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Paris FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Paris FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Paris FC"
      }
    ]
  },
  {
    "id": "243034",
    "name": "Alfon",
    "position": "MED (MD)",
    "age": 26,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "sevilla-fc",
      "name": "Sevilla FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Sevilla FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Sevilla FC"
      }
    ]
  },
  {
    "id": "246548",
    "name": "Osame Sahraoui",
    "position": "MED (MI)",
    "age": 24,
    "nationalities": [
      "Morocco"
    ],
    "club": {
      "id": "losc-lille",
      "name": "LOSC Lille"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "LOSC Lille"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "LOSC Lille"
      }
    ]
  },
  {
    "id": "238230",
    "name": "Jaminton Campaz",
    "position": "MED (MI)",
    "age": 25,
    "nationalities": [
      "Colombia"
    ],
    "club": {
      "id": "rosario-central",
      "name": "Rosario Central"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Rosario Central"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Rosario Central"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Rosario Central"
      }
    ]
  },
  {
    "id": "248729",
    "name": "Gustav Isaksen",
    "position": "MED (MD)",
    "age": 24,
    "nationalities": [
      "Denmark"
    ],
    "club": {
      "id": "lazio",
      "name": "Lazio"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Lazio"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Lazio"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Lazio"
      }
    ]
  },
  {
    "id": "262042",
    "name": "Maxime Estève",
    "position": "DEF (DFC)",
    "age": 23,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "club",
      "name": "Burnley"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Burnley"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Burnley"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Burnley"
      }
    ]
  },
  {
    "id": "232432",
    "name": "Luka Jović",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "club",
      "name": "AEK Athens"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "AEK Athens"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "AEK Athens"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "AEK Athens"
      }
    ]
  },
  {
    "id": "232873",
    "name": "Koki Machida",
    "position": "DEF (DFC)",
    "age": 28,
    "nationalities": [
      "Japan"
    ],
    "club": {
      "id": "tsg-hoffenheim",
      "name": "TSG Hoffenheim"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "TSG Hoffenheim"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "TSG Hoffenheim"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "TSG Hoffenheim"
      }
    ]
  },
  {
    "id": "260779",
    "name": "Simon Adingra",
    "position": "MED (MD)",
    "age": 24,
    "nationalities": [
      "Côte d'Ivoire"
    ],
    "club": {
      "id": "club",
      "name": "Sunderland"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Sunderland"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Sunderland"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Sunderland"
      }
    ]
  },
  {
    "id": "220534",
    "name": "Sebastiano Luperto",
    "position": "DEF (DFC)",
    "age": 29,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "cagliari",
      "name": "Cagliari"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Cagliari"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Cagliari"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Cagliari"
      }
    ]
  },
  {
    "id": "240458",
    "name": "Ander Guevara",
    "position": "MED (MCD)",
    "age": 28,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "deportivo-alav-s",
      "name": "Deportivo Alavés"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Deportivo Alavés"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Deportivo Alavés"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Deportivo Alavés"
      }
    ]
  },
  {
    "id": "251380",
    "name": "Lilian Brassier",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "stade-rennais",
      "name": "Stade Rennais"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Stade Rennais"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Stade Rennais"
      }
    ]
  },
  {
    "id": "213418",
    "name": "Chuba Akpom",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "ipswich-town",
      "name": "Ipswich Town"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Ipswich Town"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Ipswich Town"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Ipswich Town"
      }
    ]
  },
  {
    "id": "219932",
    "name": "Antonio Sanabria",
    "position": "DEL (DC)",
    "age": 30,
    "nationalities": [
      "Paraguay"
    ],
    "club": {
      "id": "cremonese",
      "name": "Cremonese"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Cremonese"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Cremonese"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Cremonese"
      }
    ]
  },
  {
    "id": "239360",
    "name": "Pascal Struijk",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Holland"
    ],
    "club": {
      "id": "club",
      "name": "Leeds United"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Leeds United"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Leeds United"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Leeds United"
      }
    ]
  },
  {
    "id": "254840",
    "name": "Strahinja Pavlović",
    "position": "DEF (DFC)",
    "age": 24,
    "nationalities": [
      "Serbia"
    ],
    "club": {
      "id": "ac-milan",
      "name": "AC Milan"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "AC Milan"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "AC Milan"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "AC Milan"
      }
    ]
  },
  {
    "id": "240453",
    "name": "Sikou Niakaté",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Mali"
    ],
    "club": {
      "id": "club",
      "name": "SC Braga"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "SC Braga"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "SC Braga"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "SC Braga"
      }
    ]
  },
  {
    "id": "256782",
    "name": "Sebastian Nanasi",
    "position": "MED (MCO)",
    "age": 23,
    "nationalities": [
      "Sweden"
    ],
    "club": {
      "id": "rc-strasbourg",
      "name": "RC Strasbourg"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "RC Strasbourg"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "RC Strasbourg"
      }
    ]
  },
  {
    "id": "236369",
    "name": "Cédric Zesiger",
    "position": "DEF (DFC)",
    "age": 27,
    "nationalities": [
      "Switzerland"
    ],
    "club": {
      "id": "fc-augsburg",
      "name": "FC Augsburg"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "FC Augsburg"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "FC Augsburg"
      }
    ]
  },
  {
    "id": "242578",
    "name": "Benoît Badiashile",
    "position": "DEF (DFC)",
    "age": 25,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "chelsea-fc",
      "name": "Chelsea FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Chelsea FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Chelsea FC"
      }
    ]
  },
  {
    "id": "251892",
    "name": "Beto",
    "position": "DEL (DC)",
    "age": 28,
    "nationalities": [
      "Guinea-Bissau"
    ],
    "club": {
      "id": "everton-fc",
      "name": "Everton FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Everton FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Everton FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Everton FC"
      }
    ]
  },
  {
    "id": "243604",
    "name": "Juan Cruz",
    "position": "MED (MD)",
    "age": 25,
    "nationalities": [
      "Spain"
    ],
    "club": {
      "id": "cd-legan-s",
      "name": "CD Leganés"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "CD Leganés"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "CD Leganés"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "CD Leganés"
      }
    ]
  },
  {
    "id": "268474",
    "name": "Lorenzo Lucca",
    "position": "DEL (DC)",
    "age": 25,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "napoli",
      "name": "Napoli"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Napoli"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Napoli"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Napoli"
      }
    ]
  },
  {
    "id": "271541",
    "name": "Vladyslav Vanat",
    "position": "DEL (DC)",
    "age": 24,
    "nationalities": [
      "Ukraine"
    ],
    "club": {
      "id": "girona-fc",
      "name": "Girona FC"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Girona FC"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Girona FC"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Girona FC"
      }
    ]
  },
  {
    "id": "235619",
    "name": "Marcus Edwards",
    "position": "MED (MD)",
    "age": 27,
    "nationalities": [
      "England"
    ],
    "club": {
      "id": "club",
      "name": "Burnley"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Burnley"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Burnley"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Burnley"
      }
    ]
  },
  {
    "id": "240777",
    "name": "Luca Ranieri",
    "position": "DEF (DFC)",
    "age": 26,
    "nationalities": [
      "Italy"
    ],
    "club": {
      "id": "fiorentina",
      "name": "Fiorentina"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Fiorentina"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Fiorentina"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Fiorentina"
      }
    ]
  },
  {
    "id": "244480",
    "name": "Hugo Magnetti",
    "position": "MED (MCD)",
    "age": 27,
    "nationalities": [
      "France"
    ],
    "club": {
      "id": "stade-brestois",
      "name": "Stade Brestois"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Stade Brestois"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Stade Brestois"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Stade Brestois"
      }
    ]
  },
  {
    "id": "70726",
    "name": "Anis Hadj-Moussa",
    "position": "DEL (ED)",
    "age": 24,
    "nationalities": [
      "Algeria"
    ],
    "club": {
      "id": "club",
      "name": "Feyenoord"
    },
    "marketValue": 39810717,
    "height": 180,
    "marketValueHistory": [
      {
        "date": "2022",
        "marketValue": 25876966,
        "clubName": "Feyenoord"
      },
      {
        "date": "2024",
        "marketValue": 33839109,
        "clubName": "Feyenoord"
      },
      {
        "date": "2026",
        "marketValue": 39810717,
        "clubName": "Feyenoord"
      }
    ]
  }
];
