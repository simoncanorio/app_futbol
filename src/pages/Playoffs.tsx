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
  const [clKnockoutMatches, setClKnockoutMatches] = useState<Match[]>([]);
  const [teamsMap, setTeamsMap] = useState<Map<number, Team>>(new Map());
  const [activeTab, setActiveTab] = useState<'champions' | 'cup'>('champions');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      if (!lid) return;

      const localTeams = await db.teams.where('leagueId').equals(lid).toArray();
      const tMap = new Map<number, Team>();
      localTeams.forEach(t => tMap.set(t.id!, t));
      setTeamsMap(tMap);

      const playedChampMatches = await db.matches.where('leagueId').equals(lid).filter(m => m.type === 'continental' && m.isPlayed).toArray();
      const allCup = await db.matches.where('leagueId').equals(lid).filter(m => m.type === 'cup').toArray();
      const allClKnockouts = await db.matches.where('leagueId').equals(lid).filter(m => m.type === 'continental' && m.week >= 31).toArray();
      
      setCupMatches(allCup);
      setClKnockoutMatches(allClKnockouts);

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

      const clList: { id: string | number; name: string; overall: number; country: string; pts: number; gd: number; played: number; wins: number; draws: number; losses: number; gf: number; ga: number }[] = [];

      localTeams.forEach((t) => {
        const st = statsMap.get(t.id!) || { pts: 0, gf: 0, ga: 0, played: 0, wins: 0, draws: 0, losses: 0 };
        const gd = st.gf - st.ga;
        clList.push({ id: t.id!, name: t.name, overall: t.overall, country: t.domesticLeague || 'Local', pts: st.pts, gd, played: st.played, wins: st.wins, draws: st.draws, losses: st.losses, gf: st.gf, ga: st.ga });
      });

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
    load();
  }, [leagueId]);

  const getTeamName = (id: number) => teamsMap.get(id)?.name || championsTeams.find(c => c.id === id)?.name || `Equipo #${id}`;

  const getStageName = (week: number) => {
    if (week <= 8) return '16avos de Final';
    if (week <= 15) return 'Octavos de Final';
    if (week <= 22) return 'Cuartos de Final';
    if (week <= 29) return 'Semifinales';
    return 'Gran Final de Copa';
  };

  const octavosClMatches = clKnockoutMatches.filter(m => m.week === 31);
  const cuartosClMatches = clKnockoutMatches.filter(m => m.week === 33);
  const semisClMatches = clKnockoutMatches.filter(m => m.week === 35);
  const finalClMatches = clKnockoutMatches.filter(m => m.week === 38);

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
                        <td><strong>{tm.name}</strong> <small style={{ color: '#94a3b8' }}>({tm.country.replace(' FC', '')})</small></td>
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
                  <h4 style={{ color: '#38bdf8', margin: '0 0 0.5rem 0' }}>🏆 Octavos de Final (Semana 31)</h4>
                  {octavosClMatches.length > 0 ? (
                    octavosClMatches.map(m => (
                      <div key={m.id} className="bracket-match" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '4px' }}>
                        <span style={{ fontWeight: m.isPlayed && m.homeScore > m.awayScore ? 'bold' : 'normal', color: m.isPlayed && m.homeScore > m.awayScore ? '#10b981' : '#f8fafc' }}>
                          {getTeamName(m.homeTeamId)}
                        </span>
                        <strong style={{ color: '#eab308' }}>
                          {m.isPlayed ? `${m.homeScore} - ${m.awayScore}` : 'vs'}
                        </strong>
                        <span style={{ fontWeight: m.isPlayed && m.awayScore > m.homeScore ? 'bold' : 'normal', color: m.isPlayed && m.awayScore > m.homeScore ? '#10b981' : '#f8fafc' }}>
                          {getTeamName(m.awayTeamId)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Se disputan en Semana 31 tras la Fase de Liga</div>
                  )}
                </div>

                <div className="bracket-round">
                  <h4 style={{ color: '#f59e0b', margin: '0 0 0.5rem 0' }}>🔥 Cuartos & Semifinales (Semanas 33 - 35)</h4>
                  {[...cuartosClMatches, ...semisClMatches].length > 0 ? (
                    [...cuartosClMatches, ...semisClMatches].map(m => (
                      <div key={m.id} className="bracket-match" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '4px' }}>
                        <span>{getTeamName(m.homeTeamId)}</span>
                        <strong style={{ color: '#f59e0b' }}>{m.isPlayed ? `${m.homeScore} - ${m.awayScore}` : 'vs'}</strong>
                        <span>{getTeamName(m.awayTeamId)}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Se disputan progresivamente tras los Octavos</div>
                  )}
                </div>

                <div className="bracket-round" style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #eab308' }}>
                  <h4 style={{ color: '#eab308', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Flame size={18} /> Gran Final de UEFA Champions League (Semana 38)
                  </h4>
                  {finalClMatches.length > 0 && finalClMatches[0].isPlayed ? (
                    <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#10b981', fontSize: '1rem' }}>
                      🏆 Campeón: {getTeamName(finalClMatches[0].homeScore > finalClMatches[0].awayScore ? finalClMatches[0].homeTeamId : finalClMatches[0].awayTeamId)} ({finalClMatches[0].homeScore} - {finalClMatches[0].awayScore})
                    </div>
                  ) : (
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#f1f5f9' }}>
                      Semana 38 • Estadio Wembley / Santiago Bernabéu
                    </p>
                  )}
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
                  <th>Fase / Semana</th>
                  <th>Partido de Copa</th>
                  <th>Resultado</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {cupMatches.map(m => {
                  const homeName = getTeamName(m.homeTeamId);
                  const awayName = getTeamName(m.awayTeamId);
                  return (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 'bold', color: '#38bdf8' }}>{getStageName(m.week)} (Sem. {m.week})</td>
                      <td><strong>{homeName}</strong> vs <strong>{awayName}</strong></td>
                      <td>
                        <strong style={{ color: m.isPlayed ? '#eab308' : '#cbd5e1' }}>
                          {m.isPlayed ? `${m.homeScore} - ${m.awayScore}` : 'Pendiente'}
                        </strong>
                      </td>
                      <td>{m.isPlayed ? <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Jugado</span> : <span style={{ color: '#f59e0b' }}>⏳ Programado</span>}</td>
                    </tr>
                  );
                })}
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
