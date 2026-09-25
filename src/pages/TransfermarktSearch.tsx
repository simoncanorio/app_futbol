import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db, getInitialPlayerStats, type Player, type Team } from '../db/db';
import {
  tmService,
  mapTMPositionToDB,
  mapMarketValueToOVR,
  type TMPlayerSearchResult,
  type TMClubSearchResult,
  type TMMarketValuePoint
} from '../services/transfermarkt';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Globe, UserPlus, DollarSign, Activity, AlertCircle, Settings, Award, Tag, ArrowLeftRight } from 'lucide-react';
import './TransfermarktSearch.css';

export function TransfermarktSearch() {
  const { leagueId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'transfer_list' | 'players' | 'clubs'>('transfer_list');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [playerResults, setPlayerResults] = useState<TMPlayerSearchResult[]>([]);
  const [clubResults, setClubResults] = useState<TMClubSearchResult[]>([]);
  const [transferListedPlayers, setTransferListedPlayers] = useState<(Player & { teamName?: string })[]>([]);

  // Selected player for detail modal / market value timeline
  const [selectedPlayer, setSelectedPlayer] = useState<TMPlayerSearchResult | null>(null);
  const [marketHistory, setMarketHistory] = useState<TMMarketValuePoint[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Api base modal
  const [showConfig, setShowConfig] = useState(false);
  const [apiBaseInput, setApiBaseInput] = useState(tmService.getApiBase());

  useEffect(() => {
    async function loadTransferList() {
      const lid = Number(leagueId);
      if (!lid) return;
      
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const teams = await db.teams.where('leagueId').equals(lid).toArray();
      const teamMap = new Map<number, string>(teams.map(t => [t.id!, t.name]));

      const listed = allPlayers
        .filter(p => p.isTransferListed || p.isLoanListed)
        .map(p => ({ ...p, teamName: p.teamId ? teamMap.get(p.teamId) : 'Sin Club' }));

      setTransferListedPlayers(listed.sort((a, b) => b.overall - a.overall));
    }

    loadTransferList();

    if (!query && activeTab === 'players') {
      setQuery('Vinicius');
      tmService.searchPlayers('Vinicius').then(res => setPlayerResults(res.results || []));
    }
  }, [leagueId, activeTab]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (activeTab === 'players') {
        const res = await tmService.searchPlayers(query);
        setPlayerResults(res.results || []);
      } else if (activeTab === 'clubs') {
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

  const handleSignPlayer = async (p: TMPlayerSearchResult) => {
    const lid = Number(leagueId);
    if (!lid) {
      alert('Debes estar dentro de una liga activa para fichar jugadores.');
      return;
    }

    const league = await db.leagues.get(lid);
    if (!league || !league.userTeamId) {
      alert('No tienes un equipo asignado en esta liga.');
      return;
    }

    const ovr = mapMarketValueToOVR(p.marketValue);
    const pot = Math.min(99, ovr + 5);
    const fee = p.marketValue ? Math.max(1000000, p.marketValue) : 5000000;

    const userTeam = await db.teams.get(league.userTeamId);
    if (userTeam && userTeam.budget < fee) {
      alert('Presupuesto de fichajes insuficiente para acometer esta compra.');
      return;
    }

    const newPlayer: Player = {
      leagueId: lid,
      teamId: league.userTeamId,
      name: p.name,
      age: p.age || 24,
      overall: ovr,
      potential: pot,
      position: mapTMPositionToDB(p.position),
      contract: Math.max(500000, Math.floor(fee * 0.08)),
      contractYears: 3,
      contractEndSeason: league.season + 3,
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
    if (userTeam) {
      userTeam.budget -= fee;
      await db.teams.put(userTeam);
    }

    alert(`¡${p.name} (OVR ${ovr}) ha sido fichado por ${userTeam?.name || 'tu equipo'} por €${(fee/1000000).toFixed(1)}M!`);
    navigate(`/l/${lid}/roster`);
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
          <h1><Globe className="tm-icon-title" /> Transfermarkt Live Hub</h1>
          <p>Mercado de fichajes oficial, lista de transferibles de la liga y buscador de estrellas internacionales.</p>
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
          className={`tm-tab ${activeTab === 'transfer_list' ? 'active' : ''}`}
          onClick={() => setActiveTab('transfer_list')}
        >
          <Tag size={16} /> Transferibles en Liga ({transferListedPlayers.length})
        </button>
        <button
          className={`tm-tab ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          <Search size={16} /> Mercado Internacional Reales
        </button>
        <button
          className={`tm-tab ${activeTab === 'clubs' ? 'active' : ''}`}
          onClick={() => setActiveTab('clubs')}
        >
          <Award size={16} /> Clubes Reales
        </button>
      </div>

      {/* Transfer List Tab */}
      {activeTab === 'transfer_list' && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <h3><Tag size={20} color="#ef4444" /> Jugadores Declarados Transferibles o Cedibles</h3>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
            Listado de futbolistas colocados en lista de transferencias por sus respectivos clubes en la liga.
          </p>

          <table className="table-container bb-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Nombre</th>
                <th>Club Actual</th>
                <th>Edad</th>
                <th>OVR</th>
                <th>POT</th>
                <th>Valor / Salario</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {transferListedPlayers.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 'bold', color: '#38bdf8' }}>{p.position}</td>
                  <td style={{ fontWeight: 'bold' }}>
                    <Link to={`/l/${leagueId}/player/${p.id}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                      {p.name}
                    </Link>
                  </td>
                  <td>{p.teamName}</td>
                  <td>{p.age}</td>
                  <td><strong>{p.overall}</strong></td>
                  <td>{p.potential}</td>
                  <td>${(p.contract / 1000000).toFixed(2)}M / año</td>
                  <td>
                    <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      En Venta
                    </span>
                  </td>
                  <td>
                    <button className="tm-btn-primary" onClick={() => navigate(`/l/${leagueId}/trades`)} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
                      <ArrowLeftRight size={14} /> Negociar Fichaje
                    </button>
                  </td>
                </tr>
              ))}
              {transferListedPlayers.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem' }}>No hay jugadores transferibles en este momento. Puedes poner a tus jugadores en venta desde la pestaña Plantilla.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Search Bar for Real Players and Clubs */}
      {activeTab !== 'transfer_list' && (
        <form className="tm-search-bar" onSubmit={handleSearch} style={{ marginTop: '1.5rem' }}>
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
      )}

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
                  <button className="tm-btn-primary" onClick={() => handleSignPlayer(p)} style={{ width: '100%' }}>
                    <UserPlus size={14} /> Negociar Fichaje
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
              <button className="tm-btn-primary" style={{ width: '100%' }} onClick={() => { handleSignPlayer(selectedPlayer); setSelectedPlayer(null); }}>
                Negociar Fichaje para mi Equipo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
