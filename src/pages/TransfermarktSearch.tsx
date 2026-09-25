import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, getInitialPlayerStats } from '../db/db';
import {
  tmService,
  mapTMPositionToDB,
  mapMarketValueToOVR,
  type TMPlayerSearchResult,
  type TMClubSearchResult,
  type TMMarketValuePoint
} from '../services/transfermarkt';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Globe, UserPlus, DollarSign, Activity, AlertCircle, Settings, Award } from 'lucide-react';
import './TransfermarktSearch.css';

export function TransfermarktSearch() {
  const { leagueId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'players' | 'clubs'>('players');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [playerResults, setPlayerResults] = useState<TMPlayerSearchResult[]>([]);
  const [clubResults, setClubResults] = useState<TMClubSearchResult[]>([]);

  // Selected player for detail modal / market value timeline
  const [selectedPlayer, setSelectedPlayer] = useState<TMPlayerSearchResult | null>(null);
  const [marketHistory, setMarketHistory] = useState<TMMarketValuePoint[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Api base modal
  const [showConfig, setShowConfig] = useState(false);
  const [apiBaseInput, setApiBaseInput] = useState(tmService.getApiBase());

  useEffect(() => {
    // Initial search load on mount
    if (!query) {
      setQuery(activeTab === 'players' ? 'Vinicius' : 'Real Madrid');
      tmService.searchPlayers('Vinicius').then(res => setPlayerResults(res.results || []));
    }
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (activeTab === 'players') {
        const res = await tmService.searchPlayers(query);
        setPlayerResults(res.results || []);
      } else {
        const res = await tmService.searchClubs(query);
        setClubResults(res.results || []);
      }
    } catch (err: any) {
      console.error(err);
      setError('Consultando datos reales en modo respaldo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlayer = async (p: TMPlayerSearchResult) => {
    setSelectedPlayer(p);
    setLoadingHistory(true);
    setMarketHistory([]);

    try {
      const mvData = await tmService.getPlayerMarketValue(p.id);
      setMarketHistory(mvData.marketValueHistory || []);
    } catch (err) {
      console.warn('Could not load market value history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSignPlayer = async (p: TMPlayerSearchResult, target: 'userTeam' | 'freeAgents') => {
    const lid = Number(leagueId);
    if (!lid) {
      alert('Debes estar dentro de una liga activa para fichar o importar jugadores.');
      return;
    }

    const league = await db.leagues.get(lid);
    if (!league) return;

    let targetTeamId: number | null = null;
    if (target === 'userTeam') {
      if (!league.userTeamId) {
        alert('No tienes un equipo asignado en esta liga.');
        return;
      }
      targetTeamId = league.userTeamId;
    }

    const ovr = mapMarketValueToOVR(p.marketValue);
    const pot = Math.min(99, ovr + 5);

    const newPlayer = {
      leagueId: lid,
      teamId: targetTeamId,
      name: p.name,
      age: p.age || 24,
      overall: ovr,
      potential: pot,
      position: mapTMPositionToDB(p.position),
      contract: p.marketValue ? Math.max(500000, Math.floor(p.marketValue * 0.08)) : 2000000,
      stats: getInitialPlayerStats(),
      attributes: {
        pace: Math.min(99, ovr + 2),
        shooting: Math.min(99, ovr - 1),
        passing: Math.min(99, ovr + 1),
        dribbling: Math.min(99, ovr + 3),
        defending: Math.min(99, Math.max(30, ovr - 20)),
        physical: Math.min(99, ovr)
      },
      bio: {
        height: 180,
        weight: 75,
        country: (p.nationalities && p.nationalities.length > 0) ? p.nationalities[0] : 'Desconocido'
      }
    };

    await db.players.add(newPlayer);

    if (target === 'userTeam') {
      const userTeam = await db.teams.get(league.userTeamId!);
      alert(`¡${p.name} (OVR ${ovr}) ha sido fichado por ${userTeam?.name || 'tu equipo'}!`);
      navigate(`/l/${lid}/roster`);
    } else {
      alert(`¡${p.name} (OVR ${ovr}) ha sido agregado al mercado de Agentes Libres!`);
      navigate(`/l/${lid}/free_agents`);
    }
  };

  const handleSaveApiConfig = () => {
    tmService.setApiBase(apiBaseInput);
    setShowConfig(false);
    alert(`URL de Transfermarkt API actualizada a: ${apiBaseInput}`);
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    if (amount >= 1_000_000) return `€${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `€${(amount / 1_000).toFixed(0)}K`;
    return `€${amount}`;
  };

  return (
    <div className="tm-explorer-page">
      <div className="tm-header">
        <div>
          <h1><Globe className="tm-icon-title" /> Transfermarkt Live Scout Hub</h1>
          <p>Busca e importa jugadores y clubes reales del fútbol mundial en tiempo real a tu liga.</p>
        </div>

        <button className="tm-config-btn" onClick={() => setShowConfig(!showConfig)}>
          <Settings size={18} /> API Config
        </button>
      </div>

      {showConfig && (
        <div className="tm-config-panel glass-panel">
          <h3><Settings size={16} /> Configuración de Servidor API</h3>
          <p>Puedes usar la API pública gratuita o tu propia instancia local de <code>transfermarkt-api</code> (Docker/FastAPI).</p>
          <div className="tm-config-input-group">
            <input
              type="text"
              value={apiBaseInput}
              onChange={e => setApiBaseInput(e.target.value)}
              className="bb-input"
              placeholder="https://transfermarkt-api.fly.dev"
            />
            <button className="create-btn" onClick={handleSaveApiConfig}>Guardar</button>
          </div>
          <p className="form-help">Repo original: https://github.com/felipeall/transfermarkt-api</p>
        </div>
      )}

      {/* Tabs */}
      <div className="tm-tabs">
        <button
          className={`tm-tab ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          <Search size={16} /> Buscar Jugadores Reales
        </button>
        <button
          className={`tm-tab ${activeTab === 'clubs' ? 'active' : ''}`}
          onClick={() => setActiveTab('clubs')}
        >
          <Award size={16} /> Buscar Clubes Reales
        </button>
      </div>

      {/* Search Bar */}
      <form className="tm-search-bar" onSubmit={handleSearch}>
        <div className="tm-input-wrapper">
          <Search className="tm-search-icon" size={20} />
          <input
            type="text"
            placeholder={activeTab === 'players' ? 'Ej: Vinicius, Haaland, Lamine Yamal, Bellingham...' : 'Ej: Real Madrid, Barcelona, River Plate, Boca Juniors...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="tm-search-input"
          />
        </div>
        <button type="submit" className="tm-search-btn" disabled={loading}>
          {loading ? 'Cargando...' : 'Buscar'}
        </button>
      </form>

      {error && (
        <div className="tm-error-box">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Results */}
      {activeTab === 'players' && (
        <div className="tm-results-grid">
          {playerResults.map(p => {
            const ovr = mapMarketValueToOVR(p.marketValue);
            return (
              <div key={p.id} className="tm-player-card glass-panel" onClick={() => handleSelectPlayer(p)}>
                <div className="tm-card-header">
                  <div>
                    <h3>{p.name}</h3>
                    <p className="tm-card-subtitle">{p.club?.name || 'Sin club'} • {p.position}</p>
                  </div>
                  <span className="tm-ovr-badge">{ovr}</span>
                </div>

                <div className="tm-card-body">
                  <div className="tm-info-item">
                    <DollarSign size={14} />
                    <span>Valor: <strong>{formatCurrency(p.marketValue)}</strong></span>
                  </div>
                  <div className="tm-info-item">
                    <Globe size={14} />
                    <span>Nacionalidad: {p.nationalities?.join(', ') || 'N/A'}</span>
                  </div>
                  {p.age && (
                    <div className="tm-info-item">
                      <Activity size={14} />
                      <span>Edad: {p.age} años</span>
                    </div>
                  )}
                </div>

                <div className="tm-card-actions" onClick={e => e.stopPropagation()}>
                  <button className="tm-btn-primary" onClick={() => handleSignPlayer(p, 'userTeam')}>
                    <UserPlus size={14} /> Fichar para mi Equipo
                  </button>
                  <button className="tm-btn-secondary" onClick={() => handleSignPlayer(p, 'freeAgents')}>
                    Agentes Libres
                  </button>
                </div>
              </div>
            );
          })}

          {!loading && playerResults.length === 0 && query && (
            <div className="tm-empty">No se encontraron jugadores para "{query}".</div>
          )}
        </div>
      )}

      {activeTab === 'clubs' && (
        <div className="tm-results-grid">
          {clubResults.map(c => (
            <div key={c.id} className="tm-player-card glass-panel">
              <div className="tm-card-header">
                <div>
                  <h3>{c.name}</h3>
                  <p className="tm-card-subtitle">País: {c.country || 'Internacional'}</p>
                </div>
              </div>
              <div className="tm-card-body">
                <div className="tm-info-item">
                  <DollarSign size={14} />
                  <span>Valor Plantilla: <strong>{formatCurrency(c.marketValue)}</strong></span>
                </div>
                <div className="tm-info-item">
                  <Activity size={14} />
                  <span>Jugadores: {c.squad || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}

          {!loading && clubResults.length === 0 && query && (
            <div className="tm-empty">No se encontraron clubes para "{query}".</div>
          )}
        </div>
      )}

      {/* Selected Player Detail Modal */}
      {selectedPlayer && (
        <div className="tm-modal-overlay" onClick={() => setSelectedPlayer(null)}>
          <div className="tm-modal glass-panel" onClick={e => e.stopPropagation()}>
            <button className="tm-modal-close" onClick={() => setSelectedPlayer(null)}>✕</button>

            <h2>{selectedPlayer.name}</h2>
            <p className="tm-modal-sub">
              {selectedPlayer.position} | {selectedPlayer.club?.name} | {selectedPlayer.nationalities?.join(', ')}
            </p>

            <div className="tm-modal-stats">
              <div className="tm-stat-box">
                <span className="label">Valor Actual</span>
                <span className="val">{formatCurrency(selectedPlayer.marketValue)}</span>
              </div>
              <div className="tm-stat-box">
                <span className="label">OVR Estimado</span>
                <span className="val">{mapMarketValueToOVR(selectedPlayer.marketValue)}</span>
              </div>
              <div className="tm-stat-box">
                <span className="label">Edad</span>
                <span className="val">{selectedPlayer.age || 'N/A'}</span>
              </div>
            </div>

            <h3>Histórico Valor de Mercado (Transfermarkt)</h3>
            {loadingHistory ? (
              <div className="tm-chart-loading">Cargando gráfico de valor...</div>
            ) : marketHistory.length > 0 ? (
              <div style={{ width: '100%', height: 220, marginTop: '1rem' }}>
                <ResponsiveContainer>
                  <AreaChart data={marketHistory.map(m => ({ date: m.date, value: m.marketValue ? m.marketValue / 1_000_000 : 0 }))}>
                    <defs>
                      <linearGradient id="tmColorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#888" fontSize={11} />
                    <YAxis stroke="#888" fontSize={11} unit="M€" />
                    <Tooltip formatter={(value: any) => [`€${value}M`, 'Valor de Mercado']} />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#tmColorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="tm-chart-loading">Sin historial de valor registrado.</div>
            )}

            <div className="tm-modal-actions">
              <button className="tm-btn-primary" onClick={() => { handleSignPlayer(selectedPlayer, 'userTeam'); setSelectedPlayer(null); }}>
                Fichar para mi Equipo
              </button>
              <button className="tm-btn-secondary" onClick={() => { handleSignPlayer(selectedPlayer, 'freeAgents'); setSelectedPlayer(null); }}>
                Agregar a Agentes Libres
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
