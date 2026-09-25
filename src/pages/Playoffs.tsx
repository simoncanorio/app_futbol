import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team, type Match } from '../db/db';
import { OFFLINE_CLUBS } from '../services/transfermarktData';
import { Trophy, Globe, Award, CheckCircle, Flame } from 'lucide-react';
import './Playoffs.css';

export function Playoffs() {
  const { leagueId } = useParams();
  const [championsTeams, setChampionsTeams] = useState<{ id: string | number; name: string; overall: number; country: string; pts: number; gd: number; played: number; wins: number; draws: number; losses: number; gf: number; ga: number }[]>([]);
  const [cupMatches, setCupMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState<'champions' | 'cup'>('champions');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      if (!lid) return;

      const localTeams = await db.teams.where('leagueId').equals(lid).toArray();
      constPlayedMatches();

      async function constPlayedMatches() {
        const playedChampMatches = await db.matches.where('leagueId').equals(lid).filter(m => m.type === 'continental' && m.isPlayed).toArray();
        const playedCup = await db.matches.where('leagueId').equals(lid).filter(m => m.type === 'cup').toArray();
        setCupMatches(playedCup);

        const statsMap = new Map<number, { pts: number; gf: number; ga: number; played: number; wins: number; draws: number; losses: number }>();
        localTeams.forEach(t => {
          statsMap.set(t.id!, { pts: 0, gf: 0, ga: 0, played: 0, wins: 0, draws: 0, losses: 0 });
        });

        playedChampMatches.forEach(m => {
          const homeStats = statsMap.get(m.homeTeamId) || { pts: 0, gf: 0, ga: 0, played: 0, wins: 0, draws: 0, losses: 0 };
          const awayStats = statsMap.get(m.awayTeamId) || { pts: 0, gf: 0, ga: 0, played: 0, wins: 0, draws: 0, losses: 0 };

          homeStats.played++;
          awayStats.played++;
          homeStats.gf += m.homeScore;
          homeStats.ga += m.awayScore;
          awayStats.gf += m.awayScore;
          awayStats.ga += m.homeScore;

          if (m.homeScore > m.awayScore) {
            homeStats.pts += 3;
            homeStats.wins++;
            awayStats.losses++;
          } else if (m.awayScore > m.homeScore) {
            awayStats.pts += 3;
            awayStats.wins++;
            homeStats.losses++;
          } else {
            homeStats.pts += 1;
            awayStats.pts += 1;
            homeStats.draws++;
            awayStats.draws++;
          }

          statsMap.set(m.homeTeamId, homeStats);
          statsMap.set(m.awayTeamId, awayStats);
        });

        // Build 36-team Champions League qualified clubs list combining local DB & top European clubs
        const clList: { id: string | number; name: string; overall: number; country: string; pts: number; gd: number; played: number; wins: number; draws: number; losses: number; gf: number; ga: number }[] = [];

        localTeams.forEach((t) => {
          const st = statsMap.get(t.id!) || { pts: 0, gf: 0, ga: 0, played: 0, wins: 0, draws: 0, losses: 0 };
          const gd = st.gf - st.ga;
          clList.push({ id: t.id!, name: t.name, overall: t.overall, country: t.domesticLeague || 'Local', pts: st.pts, gd, played: st.played, wins: st.wins, draws: st.draws, losses: st.losses, gf: st.gf, ga: st.ga });
        });

        // Add top European champions if local list < 36
        OFFLINE_CLUBS.forEach((c, i) => {
          if (!clList.find(x => x.name.toLowerCase().includes(c.name.toLowerCase()))) {
            const ovr = c.marketValue >= 1_000_000_000 ? 88 : (c.marketValue >= 600_000_000 ? 84 : 79);
            const pts = Math.max(0, 16 - i * 2);
            const gd = Math.max(-5, 10 - i * 2);
            clList.push({ id: c.id, name: c.name, overall: ovr, country: c.country, pts, gd, played: 6, wins: Math.floor(pts / 3), draws: pts % 3, losses: Math.max(0, 6 - Math.floor(pts / 3)), gf: Math.max(0, 10 + gd), ga: 10 });
          }
        });

        clList.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.overall - a.overall);
        setChampionsTeams(clList.slice(0, 36));
      }
    }
    load();
  }, [leagueId]);

  const cTeam = (idx: number, fallback: string) => championsTeams[idx]?.name || fallback;

  return (
    <div className="page-container playoffs-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Competiciones Internacionales & Copas Nacionales</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Formato oficial de Champions League (Fase de Liga de 36 Equipos + Eliminatorias) y Copa Nacional del Rey / FA Cup.</p>
        </div>
      </div>

      {/* Competition Tabs */}
      <div className="tm-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`tm-tab ${activeTab === 'champions' ? 'active' : ''}`}
          onClick={() => setActiveTab('champions')}
        >
          <Globe size={16} /> UEFA Champions League (Fase de Liga Real)
        </button>
        <button
          className={`tm-tab ${activeTab === 'cup' ? 'active' : ''}`}
          onClick={() => setActiveTab('cup')}
        >
          <Trophy size={16} /> Copa Nacional del Rey / FA Cup
        </button>
      </div>

      {activeTab === 'champions' ? (
        <div className="champions-container">
          {/* Header Trophy Banner */}
          <div className="glass-panel comp-banner">
            <Award size={36} color="#eab308" />
            <div>
              <h3>UEFA Champions League • Temporada Real 2026/27</h3>
              <p>Fase de Liga Única de 36 Clubes. Los 8 primeros clasifican directo a Octavos; del 9 al 24 juegan Playoffs Play-in.</p>
            </div>
            <div className="prize-badge">
              <span>Premio Campeón</span>
              <strong>€85,000,000</strong>
            </div>
          </div>

          {/* Phase 1: League Phase Table */}
          <div className="champions-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.5rem' }}>
            <div className="glass-panel league-phase-card">
              <h3>Tabla de Posiciones Fase de Liga de Champions</h3>
              <div className="table-responsive" style={{ maxHeight: '460px', overflowY: 'auto' }}>
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Club</th>
                      <th>PJ</th>
                      <th>PG</th>
                      <th>PE</th>
                      <th>PP</th>
                      <th>DG</th>
                      <th>PTS</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {championsTeams.map((tm, idx) => (
                      <tr key={tm.id || idx} style={{ background: idx < 8 ? 'rgba(234, 179, 8, 0.06)' : idx < 24 ? 'rgba(56, 189, 248, 0.04)' : 'transparent' }}>
                        <td style={{ color: idx < 8 ? '#eab308' : idx < 24 ? '#38bdf8' : '#94a3b8', fontWeight: 'bold' }}>{idx + 1}</td>
                        <td><strong>{tm.name}</strong> <small style={{ color: '#94a3b8' }}>({tm.country})</small></td>
                        <td>{tm.played}</td>
                        <td>{tm.wins}</td>
                        <td>{tm.draws}</td>
                        <td>{tm.losses}</td>
                        <td style={{ color: tm.gd >= 0 ? '#10b981' : '#ef4444' }}>{tm.gd > 0 ? `+${tm.gd}` : tm.gd}</td>
                        <td style={{ color: '#eab308', fontWeight: 'bold' }}>{tm.pts}</td>
                        <td>
                          {idx < 8 ? (
                            <span className="status-badge-green"><CheckCircle size={12} /> Octavos Directo</span>
                          ) : idx < 24 ? (
                            <span className="status-badge-blue">Playoffs Play-in</span>
                          ) : (
                            <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Eliminado</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Phase 2: Elimination Bracket */}
            <div className="glass-panel playoff-bracket-card">
              <h3>Cuadro de Eliminatorias Directas</h3>
              <div className="bracket-tree" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="bracket-round">
                  <h4 style={{ color: '#38bdf8', margin: '0 0 0.5rem 0' }}>🏆 Octavos de Final</h4>
                  <div className="bracket-match">
                    <span>1. {cTeam(0, 'Real Madrid')}</span>
                    <strong style={{ color: '#10b981' }}>vs</strong>
                    <span>{cTeam(15, 'PSG')}</span>
                  </div>
                  <div className="bracket-match">
                    <span>2. {cTeam(1, 'FC Barcelona')}</span>
                    <strong style={{ color: '#10b981' }}>vs</strong>
                    <span>{cTeam(14, 'Bayern Múnich')}</span>
                  </div>
                  <div className="bracket-match">
                    <span>3. {cTeam(2, 'Manchester City')}</span>
                    <strong style={{ color: '#10b981' }}>vs</strong>
                    <span>{cTeam(13, 'Inter Múnich')}</span>
                  </div>
                  <div className="bracket-match">
                    <span>4. {cTeam(3, 'Arsenal FC')}</span>
                    <strong style={{ color: '#10b981' }}>vs</strong>
                    <span>{cTeam(12, 'Juventus')}</span>
                  </div>
                </div>

                <div className="bracket-round">
                  <h4 style={{ color: '#f59e0b', margin: '0 0 0.5rem 0' }}>🔥 Cuartos & Semifinales</h4>
                  <div className="bracket-match">
                    <span>Ganador 1</span>
                    <strong style={{ color: '#f59e0b' }}>vs</strong>
                    <span>Ganador 2</span>
                  </div>
                  <div className="bracket-match">
                    <span>Ganador 3</span>
                    <strong style={{ color: '#f59e0b' }}>vs</strong>
                    <span>Ganador 4</span>
                  </div>
                </div>

                <div className="bracket-round" style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #eab308' }}>
                  <h4 style={{ color: '#eab308', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Flame size={18} /> Gran Final de UEFA Champions League
                  </h4>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#f1f5f9' }}>
                    Semana 38 • Estadio Wembley / Santiago Bernabéu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3><Trophy size={20} color="#eab308" /> Partidos y Eliminatorias de Copa Nacional</h3>
          <p style={{ color: '#94a3b8' }}>Encuentros de Copa distribuidos a lo largo del año (16avos, 8vos, 4tos, Semis y Final).</p>
          <div className="table-responsive">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Semana</th>
                  <th>Partido de Copa</th>
                  <th>Resultado</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {cupMatches.map(m => (
                  <tr key={m.id}>
                    <td>Semana {m.week}</td>
                    <td>Equipo #{m.homeTeamId} vs Equipo #{m.awayTeamId}</td>
                    <td><strong>{m.isPlayed ? `${m.homeScore} - ${m.awayScore}` : 'Pendiente'}</strong></td>
                    <td>{m.isPlayed ? '✅ Jugado' : '⏳ Programado'}</td>
                  </tr>
                ))}
                {cupMatches.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No hay partidos de copa registrados aún.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
