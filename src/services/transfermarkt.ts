// Service to interact with Transfermarkt API & Offline Real Dataset
import { OFFLINE_CLUBS, OFFLINE_PLAYERS, type OfflinePlayer } from './transfermarktData';

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
    this.apiBase = customBaseUrl || localStorage.getItem('tm_api_base') || DEFAULT_API_BASE;
  }

  public getApiBase(): string {
    return this.apiBase;
  }

  public isOfflineMode(): boolean {
    return this.isUsingOfflineFallback;
  }

  public setApiBase(url: string) {
    this.apiBase = url.replace(/\/$/, '');
    localStorage.setItem('tm_api_base', this.apiBase);
  }

  private async fetchJson<T>(endpoint: string): Promise<T> {
    const directUrl = `${this.apiBase}${endpoint}`;
    
    // Attempt 1: Direct fetch
    try {
      const res = await fetch(directUrl, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        this.isUsingOfflineFallback = false;
        return (await res.json()) as T;
      }
    } catch (e) {
      console.warn('Direct Transfermarkt fetch failed, trying CORS proxy...', e);
    }

    // Attempt 2: CORS proxy
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(directUrl)}`;
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        this.isUsingOfflineFallback = false;
        return (await res.json()) as T;
      }
    } catch (e) {
      console.warn('CORS proxy fetch failed, switching to rich offline real dataset fallback.', e);
    }

    this.isUsingOfflineFallback = true;
    throw new Error('API Unavailable');
  }

  // 1. Obtener clubes de una competición
  async getCompetitionClubs(competitionId: string, seasonId = '2024'): Promise<TMCompetitionClubsResponse> {
    try {
      return await this.fetchJson<TMCompetitionClubsResponse>(`/competitions/${competitionId}/clubs?season_id=${seasonId}`);
    } catch {
      // Offline fallback
      let clubs = OFFLINE_CLUBS;
      if (competitionId === 'ES1') {
        clubs = OFFLINE_CLUBS.filter(c => c.country === 'España');
      } else if (competitionId === 'GB1') {
        clubs = OFFLINE_CLUBS.filter(c => c.country === 'Inglaterra');
      }
      return {
        id: competitionId,
        name: competitionId === 'ES1' ? 'LaLiga FC' : 'Premier League',
        seasonId,
        clubs: clubs.map(c => ({ id: c.id, name: c.name }))
      };
    }
  }

  // 2. Obtener jugadores de un club
  async getClubPlayers(clubId: string, seasonId = '2024'): Promise<TMClubPlayersResponse> {
    try {
      return await this.fetchJson<TMClubPlayersResponse>(`/clubs/${clubId}/players?season_id=${seasonId}`);
    } catch {
      const players = OFFLINE_PLAYERS.filter(p => p.club.id === clubId);
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
  }

  // 3. Buscar jugadores por nombre
  async searchPlayers(name: string, page = 1): Promise<TMPlayerSearchResponse> {
    const q = name.toLowerCase().trim();
    try {
      const res = await this.fetchJson<TMPlayerSearchResponse>(`/players/search/${encodeURIComponent(name)}?page_number=${page}`);
      if (res.results && res.results.length > 0) return res;
    } catch {
      // Ignore network failure and proceed to offline match
    }

    const filtered = OFFLINE_PLAYERS.filter(p => p.name.toLowerCase().includes(q) || p.position.toLowerCase().includes(q) || p.club.name.toLowerCase().includes(q));
    const results: TMPlayerSearchResult[] = (filtered.length > 0 ? filtered : OFFLINE_PLAYERS).map(p => ({
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
    const q = name.toLowerCase().trim();
    try {
      const res = await this.fetchJson<TMClubSearchResponse>(`/clubs/search/${encodeURIComponent(name)}?page_number=${page}`);
      if (res.results && res.results.length > 0) return res;
    } catch {
      // Ignore network failure and fallback
    }

    const filtered = OFFLINE_CLUBS.filter(c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q));
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
