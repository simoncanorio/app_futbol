import { OFFLINE_CLUBS, OFFLINE_PLAYERS, type OfflinePlayer } from './transfermarktData';
import { EA_FC_DATABASE } from './fifaData';

const DEFAULT_API_BASE = 'https://transfermarkt-api.fly.dev';

export interface TMCompetitionClub {
  id: string;
  name: string;
}

export interface TMCompetitionClubsResponse {
  id: string;
  name: string;
  seasonId: string;
  clubs: TMCompetitionClub[];
}

export interface TMClubPlayer {
  id: string;
  name: string;
  position: string;
  dateOfBirth?: string;
  age?: number;
  nationality: string[];
  currentClub?: string;
  height?: number;
  foot?: string;
  joinedOn?: string;
  joined?: string;
  signedFrom?: string;
  contract?: string;
  marketValue?: number;
  status?: string;
}

export interface TMClubPlayersResponse {
  id: string;
  players: TMClubPlayer[];
}

export interface TMPlayerSearchResult {
  id: string;
  name: string;
  position: string;
  club?: { id: string; name: string };
  age?: number;
  nationalities: string[];
  marketValue?: number;
}

export interface TMPlayerSearchResponse {
  query: string;
  pageNumber: number;
  lastPageNumber: number;
  results: TMPlayerSearchResult[];
}

export interface TMClubSearchResult {
  id: string;
  url?: string;
  name: string;
  country?: string;
  squad?: number;
  marketValue?: number;
}

export interface TMClubSearchResponse {
  query: string;
  pageNumber: number;
  lastPageNumber: number;
  results: TMClubSearchResult[];
}

export interface TMMarketValuePoint {
  age: number;
  date: string;
  clubId: string;
  clubName: string;
  marketValue?: number;
}

export interface TMPlayerMarketValueResponse {
  id: string;
  marketValue?: number;
  marketValueHistory: TMMarketValuePoint[];
  ranking?: Record<string, number>;
}

export interface TMPlayerProfile {
  id: string;
  name: string;
  fullName?: string;
  imageUrl?: string;
  dateOfBirth?: string;
  age?: number;
  height?: number;
  citizenship?: string[];
  position?: { main?: string; other?: string[] };
  foot?: string;
  shirtNumber?: string;
  club?: { id?: string; name: string; joined?: string; contractExpires?: string };
  marketValue?: number;
}

export class TransfermarktService {
  private apiBase: string;
  private isUsingOfflineFallback: boolean = false;

  constructor(customBaseUrl?: string) {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('tm_api_base') : null;
    this.apiBase = customBaseUrl || saved || DEFAULT_API_BASE;
  }

  public getApiBase(): string {
    return this.apiBase;
  }

  public isOfflineMode(): boolean {
    return this.isUsingOfflineFallback;
  }

  public setApiBase(url: string) {
    this.apiBase = url.replace(/\/$/, '');
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tm_api_base', this.apiBase);
    }
  }


  private async fetchJson<T>(endpoint: string): Promise<T> {
    if (this.isUsingOfflineFallback) {
      throw new Error('API Offline Mode');
    }
    const directUrl = `${this.apiBase}${endpoint}`;
    
    // Attempt 1: Direct fetch with short timeout
    try {
      const res = await fetch(directUrl, { signal: AbortSignal.timeout(1200) });
      if (res.ok) {
        this.isUsingOfflineFallback = false;
        return (await res.json()) as T;
      }
    } catch {
      // direct fetch failed
    }

    // Attempt 2: CORS proxy
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(directUrl)}`;
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        this.isUsingOfflineFallback = false;
        return (await res.json()) as T;
      }
    } catch {
      // proxy failed
    }

    this.isUsingOfflineFallback = true;
    throw new Error('API Unavailable');
  }

  // 1. Obtener clubes de una competición
  async getCompetitionClubs(competitionId: string, seasonId = '2024'): Promise<TMCompetitionClubsResponse> {
    if (!this.isUsingOfflineFallback) {
      try {
        return await this.fetchJson<TMCompetitionClubsResponse>(`/competitions/${competitionId}/clubs?season_id=${seasonId}`);
      } catch {
        // Fallback to rich offline dataset
      }
    }

    let clubs = OFFLINE_CLUBS;
    let compName = 'LaLiga EA Sports';

    if (competitionId === 'ES1') {
      clubs = OFFLINE_CLUBS.filter(c => c.country === 'España');
      compName = 'LaLiga EA Sports';
    } else if (competitionId === 'GB1') {
      clubs = OFFLINE_CLUBS.filter(c => c.country === 'Inglaterra');
      compName = 'Premier League';
    } else if (competitionId === 'IT1') {
      clubs = OFFLINE_CLUBS.filter(c => c.country === 'Italia');
      compName = 'Serie A';
    } else if (competitionId === 'L1') {
      clubs = OFFLINE_CLUBS.filter(c => c.country === 'Alemania');
      compName = 'Bundesliga';
    } else if (competitionId === 'FR1') {
      clubs = OFFLINE_CLUBS.filter(c => c.country === 'Francia');
      compName = 'Ligue 1';
    } else if (competitionId === 'AR1N') {
      clubs = OFFLINE_CLUBS.filter(c => c.country === 'Argentina');
      compName = 'Liga Profesional Argentina';
    } else if (competitionId === 'WORLD') {
      clubs = OFFLINE_CLUBS;
      compName = 'Superliga Mundial';
    }

    return {
      id: competitionId,
      name: compName,
      seasonId,
      clubs: clubs.map(c => ({ id: c.id, name: c.name }))
    };
  }

  // 2. Obtener jugadores de un club
  async getClubPlayers(clubId: string, seasonId = '2024'): Promise<TMClubPlayersResponse> {
    if (!this.isUsingOfflineFallback) {
      try {
        return await this.fetchJson<TMClubPlayersResponse>(`/clubs/${clubId}/players?season_id=${seasonId}`);
      } catch {
        // Fallback
      }
    }

    // Try finding by club id in OFFLINE_PLAYERS or in EA_FC_DATABASE
    let players = OFFLINE_PLAYERS.filter(p => p.club.id === clubId);
    if (players.length === 0) {
      // Match by club name
      const targetClub = OFFLINE_CLUBS.find(c => c.id === clubId);
      if (targetClub) {
        const fc = EA_FC_DATABASE.find(c => c.name.toLowerCase() === targetClub.name.toLowerCase() || (c.aliases && c.aliases.includes(targetClub.name.toLowerCase())));
        if (fc && fc.squad) {
          return {
            id: clubId,
            players: fc.squad.map((p, idx) => ({
              id: `${clubId}-${idx}`,
              name: p.name,
              position: p.position,
              age: p.age,
              nationality: [p.country],
              marketValue: p.marketValue
            }))
          };
        }
      }
    }

    return {
      id: clubId,
      players: players.map(p => ({
        id: p.id,
        name: p.name,
        position: p.position,
        age: p.age,
        nationality: p.nationalities,
        marketValue: p.marketValue
      }))
    };
  }

  // 3. Buscar jugadores por nombre
  async searchPlayers(name: string, page = 1): Promise<TMPlayerSearchResponse> {
    const normalize = (s: string) => s ? s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : '';
    const q = normalize(name);

    if (!this.isUsingOfflineFallback) {
      try {
        const res = await this.fetchJson<TMPlayerSearchResponse>(`/players/search/${encodeURIComponent(name)}?page_number=${page}`);
        if (res.results && res.results.length > 0) return res;
      } catch {
        // Fallback to rich offline search
      }
    }

    const aliasMap: Record<string, string> = {
      'vinicius': 'vini',
      'cr7': 'cristiano ronaldo',
      'dibu': 'martinez',
      'fideo': 'di maria',
      'leo': 'messi'
    };
    const altQ = aliasMap[q];

    let filtered = OFFLINE_PLAYERS.filter(p => {
      const pName = normalize(p.name);
      return pName.includes(q) || (altQ && pName.includes(altQ)) ||
        normalize(p.position).includes(q) || 
        normalize(p.club.name).includes(q) ||
        (p.nationalities && p.nationalities.some(n => normalize(n).includes(q)));
    });

    // Also search across all players in EA_FC_DATABASE
    if (filtered.length <= 2 && q.length >= 2) {
      const extraMatches: OfflinePlayer[] = [];
      for (const club of EA_FC_DATABASE) {
        for (const p of club.squad) {
          const pName = normalize(p.name);
          if (pName.includes(q) || (altQ && pName.includes(altQ)) || normalize(p.country).includes(q)) {
            extraMatches.push({
              id: `fc-${club.name}-${p.name}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
              name: p.name,
              position: `${p.position} (${p.specificPosition})`,
              age: p.age,
              nationalities: [p.country],
              club: { id: club.name.toLowerCase().replace(/[^a-z0-9]/g, '-'), name: club.name },
              marketValue: p.marketValue,
              height: 180,
              marketValueHistory: [
                { date: '2024', marketValue: Math.round(p.marketValue * 0.8), clubName: club.name },
                { date: '2026', marketValue: p.marketValue, clubName: club.name }
              ]
            });
            if (extraMatches.length >= 30) break;
          }
        }
        if (extraMatches.length >= 30) break;
      }
      filtered = [...filtered, ...extraMatches.filter(em => !filtered.some(f => f.name === em.name))];
    }


    const results: TMPlayerSearchResult[] = (filtered.length > 0 ? filtered : OFFLINE_PLAYERS.slice(0, 20)).map(p => ({
      id: p.id,
      name: p.name,
      position: p.position,
      club: p.club,
      age: p.age,
      nationalities: p.nationalities,
      marketValue: p.marketValue
    }));

    return {
      query: name,
      pageNumber: 1,
      lastPageNumber: 1,
      results
    };
  }

  // 4. Buscar clubes por nombre
  async searchClubs(name: string, page = 1): Promise<TMClubSearchResponse> {
    const normalize = (s: string) => s ? s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : '';
    const q = normalize(name);

    if (!this.isUsingOfflineFallback) {
      try {
        const res = await this.fetchJson<TMClubSearchResponse>(`/clubs/search/${encodeURIComponent(name)}?page_number=${page}`);
        if (res.results && res.results.length > 0) return res;
      } catch {
        // Fallback
      }
    }

    const filtered = OFFLINE_CLUBS.filter(c => normalize(c.name).includes(q) || normalize(c.country).includes(q));
    const results: TMClubSearchResult[] = (filtered.length > 0 ? filtered : OFFLINE_CLUBS).map(c => ({
      id: c.id,
      name: c.name,
      country: c.country,
      squad: c.squad,
      marketValue: c.marketValue
    }));

    return {
      query: name,
      pageNumber: 1,
      lastPageNumber: 1,
      results
    };
  }



  // 5. Perfil de jugador
  async getPlayerProfile(playerId: string): Promise<TMPlayerProfile> {
    try {
      return await this.fetchJson<TMPlayerProfile>(`/players/${playerId}/profile`);
    } catch {
      const p = OFFLINE_PLAYERS.find(x => x.id === playerId) || OFFLINE_PLAYERS[0];
      return {
        id: p.id,
        name: p.name,
        age: p.age,
        citizenship: p.nationalities,
        marketValue: p.marketValue,
        club: p.club
      };
    }
  }

  // 6. Historial de valor de mercado
  async getPlayerMarketValue(playerId: string): Promise<TMPlayerMarketValueResponse> {
    try {
      return await this.fetchJson<TMPlayerMarketValueResponse>(`/players/${playerId}/market_value`);
    } catch {
      const p = OFFLINE_PLAYERS.find(x => x.id === playerId);
      const history: TMMarketValuePoint[] = (p?.marketValueHistory || [
        { date: '2022', marketValue: (p?.marketValue || 50000000) * 0.6, clubName: p?.club.name || 'Club' },
        { date: '2024', marketValue: (p?.marketValue || 50000000) * 0.85, clubName: p?.club.name || 'Club' },
        { date: '2026', marketValue: p?.marketValue || 50000000, clubName: p?.club.name || 'Club' }
      ]).map(h => ({
        age: (p?.age || 24) - 2,
        date: h.date,
        clubId: p?.club.id || '1',
        clubName: h.clubName,
        marketValue: h.marketValue
      }));

      return {
        id: playerId,
        marketValue: p?.marketValue || 50000000,
        marketValueHistory: history
      };
    }
  }
}

export const tmService = new TransfermarktService();

export function mapTMPositionToDB(positionStr: string): 'POR' | 'DEF' | 'MED' | 'DEL' {
  const p = (positionStr || '').toLowerCase();
  if (p.includes('goalkeeper') || p.includes('keeper') || p.includes('portero')) return 'POR';
  if (p.includes('back') || p.includes('defender') || p.includes('defensa') || p.includes('centre-back')) return 'DEF';
  if (p.includes('midfield') || p.includes('centrocampista') || p.includes('winger')) {
    if (p.includes('winger') || p.includes('extremo')) return 'DEL';
    return 'MED';
  }
  if (p.includes('forward') || p.includes('striker') || p.includes('delantero') || p.includes('attack')) return 'DEL';
  return 'MED';
}

export function mapMarketValueToOVR(marketValueEur?: number): number {
  if (!marketValueEur || marketValueEur <= 0) return 65;
  if (marketValueEur >= 150_000_000) return 92 + Math.min(3, Math.floor((marketValueEur - 150_000_000) / 20_000_000));
  if (marketValueEur >= 100_000_000) return 89 + Math.floor((marketValueEur - 100_000_000) / 17_000_000);
  if (marketValueEur >= 50_000_000) return 85 + Math.floor((marketValueEur - 50_000_000) / 12_500_000);
  if (marketValueEur >= 20_000_000) return 80 + Math.floor((marketValueEur - 20_000_000) / 6_000_000);
  if (marketValueEur >= 5_000_000) return 74 + Math.floor((marketValueEur - 5_000_000) / 3_000_000);
  if (marketValueEur >= 1_000_000) return 68 + Math.floor((marketValueEur - 1_000_000) / 800_000);
  return 55 + Math.floor(marketValueEur / 100_000);
}
