import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type SeasonHistory, type League, type Team, type Player } from '../db/db';
import { getClubHistory, type RealClubHistory } from '../db/clubHistoryData';
import { Trophy, Award, Shield, Star, Calendar, Landmark, CheckCircle } from 'lucide-react';
import './History.css';

export function History() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [history, setHistory] = useState<SeasonHistory[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubHistory, setClubHistory] = useState<RealClubHistory | null>(null);
  const [retiredJerseys, setRetiredJerseys] = useState<number[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if (!l) return;
      setLeague(l);

      if (l.userTeamId) {
        const userTeam = await db.teams.get(l.userTeamId);
        setTeam(userTeam || null);

        if (userTeam) {
          const ch = getClubHistory(userTeam.name);
          setClubHistory(ch);
        }

        const hist = await db.history.where('leagueId').equals(lid).reverse().toArray();
        setHistory(hist);

        const p = await db.players.where('teamId').equals(l.userTeamId).toArray();
        setPlayers(p.sort((a, b) => b.overall - a.overall));
      }
    }
    load();
  }, [leagueId]);

  const handleRetireJersey = (playerId: number) => {
    if (retiredJerseys.includes(playerId)) {
      setRetiredJerseys(r => r.filter(id => id !== playerId));
    } else {
      setRetiredJerseys(r => [...r, playerId]);
      alert('¡Dorsal retirado en honor a la trayectoria del jugador!');
    }
  };

  if (!team || !clubHistory) return <div style={{ padding: '2rem' }}>Cargando historia del club...</div>;

  return (
    <div className="page-container history-page">
      {/* Hero Header */}
      <div className="history-hero glass-panel">
        <div className="hero-left">
          <Shield size={44} color="#38bdf8" />
          <div>
            <h1>Historia & Legado de {team.name}</h1>
            <p className="hero-sub">
              Fundado en {clubHistory.founded} • Estadio: <strong>{clubHistory.stadium}</strong> ({clubHistory.capacity})
            </p>
          </div>
        </div>

        <div className="hero-right">
          <div className="history-badge">
            <Trophy size={20} color="#eab308" />
            <div>
              <span>Champions League</span>
              <strong>{clubHistory.championsLeagueTitles} Títulos</strong>
            </div>
          </div>

          <div className="history-badge">
            <Award size={20} color="#38bdf8" />
            <div>
              <span>Ligas Domésticas</span>
              <strong>{clubHistory.domesticLeagueTitles} Títulos</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Trophy Cabinet Row */}
      <div className="glass-panel trophy-cabinet-section">
        <h3><Trophy size={20} color="#eab308" /> Vitrina de Trofeos Oficial</h3>
        <div className="trophies-grid">
          {Array.from({ length: clubHistory.championsLeagueTitles }).map((_, i) => (
            <div key={`ucl-${i}`} className="trophy-item gold">
              <Trophy size={28} />
              <span>Champions</span>
              <small>Continental</small>
            </div>
          ))}

          {Array.from({ length: Math.min(12, clubHistory.domesticLeagueTitles) }).map((_, i) => (
            <div key={`league-${i}`} className="trophy-item blue">
              <Award size={24} />
              <span>Liga Nº{i + 1}</span>
              <small>Nacional</small>
            </div>
          ))}

          {Array.from({ length: Math.min(8, clubHistory.domesticCupTitles) }).map((_, i) => (
            <div key={`cup-${i}`} className="trophy-item green">
              <Landmark size={24} />
              <span>Copa Rey/FA</span>
              <small>Nacional</small>
            </div>
          ))}
        </div>
      </div>

      {/* Legends & Golden Eras Grid */}
      <div className="history-grid">
        {/* Legends Wall */}
        <div className="glass-panel legends-card">
          <h3><Star size={20} color="#eab308" /> Salón de Leyendas Históricas</h3>
          <div className="legends-list">
            {clubHistory.legends.map((leg, idx) => (
              <div key={idx} className="legend-item">
                <div className="legend-num">{leg.number}</div>
                <div className="legend-info">
                  <div className="legend-top">
                    <strong>{leg.name}</strong>
                    <span className="legend-era">{leg.era}</span>
                  </div>
                  <span className="legend-role">{leg.role}</span>
                  <p className="legend-desc">{leg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Eras & Season Stats */}
        <div className="history-right-col">
          <div className="glass-panel eras-card">
            <h3><Calendar size={20} color="#a855f7" /> Épocas Doradas del Club</h3>
            {clubHistory.goldenEras.map((era, idx) => (
              <div key={idx} className="era-item">
                <div className="era-header">
                  <strong>{era.title}</strong>
                  <span className="era-period">{era.period}</span>
                </div>
                <p className="era-desc">{era.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel stats-history-card">
            <h3>Récord de Temporadas Recientes</h3>
            <div className="seasons-history-list">
              <div>
                <strong>2026 (Actual):</strong> {team.wins} Ganados - {team.draws} Empatados - {team.losses} Perdidos
              </div>
              {history.map(h => (
                <div key={h.id}>
                  <strong>Temporada {h.season}:</strong> {h.championId === team.id ? '🏆 Campeón' : 'Participante'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Squad Wall & Jersey Retirement */}
      <div className="glass-panel retire-jersey-section">
        <h3>Wall of Fame & Retiro de Camisetas de la Plantilla Actual</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
          Consagra a los referentes de la plantilla actual retirando su dorsal institucional.
        </p>

        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Dorsal</th>
                <th>Nombre</th>
                <th>Pos</th>
                <th>OVR</th>
                <th>Goles</th>
                <th>Asist</th>
                <th>Estado Legado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, idx) => {
                const isRetired = retiredJerseys.includes(p.id!);
                return (
                  <tr key={p.id} className={isRetired ? 'row-retired' : ''}>
                    <td style={{ fontWeight: '800', color: '#38bdf8' }}>#{idx + 1}</td>
                    <td><strong>{p.name}</strong></td>
                    <td className="col-pos">{p.position}</td>
                    <td className="col-ovr">{p.overall}</td>
                    <td>{p.stats?.goals || 0}</td>
                    <td>{p.stats?.assists || 0}</td>
                    <td>
                      {isRetired ? (
                        <span className="retired-tag">🏆 Dorsal Retirado</span>
                      ) : (
                        <span className="active-tag">En Activo</span>
                      )}
                    </td>
                    <td>
                      <button
                        className={isRetired ? 'btn-unretire' : 'btn-retire'}
                        onClick={() => handleRetireJersey(p.id!)}
                      >
                        {isRetired ? 'Restaurar Dorsal' : 'Retirar Dorsal'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
