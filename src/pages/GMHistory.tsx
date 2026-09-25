import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type League, type Team, type Player, type GMHistoryEntry } from '../db/db';
import { Trophy, Award, Calendar, Shield, User } from 'lucide-react';

export function GMHistory() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [gmEntries, setGmEntries] = useState<GMHistoryEntry[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);
      
      if(l.userTeamId) {
        const uTeam = await db.teams.get(l.userTeamId);
        setCurrentTeam(uTeam || null);
        
        // Fetch saved past season records
        const records = await db.gmHistory.where('leagueId').equals(lid).toArray();
        setGmEntries(records.sort((a,b) => b.season - a.season));
        
        // Managed players
        const p = await db.players.where('teamId').equals(l.userTeamId).toArray();
        setPlayers(p.sort((a,b) => b.overall - a.overall));
      }
    }
    load();
  }, [leagueId]);

  if (!league || !currentTeam) return <div className="page-container">Cargando datos de Manager...</div>;

  // Aggregate stats across past completed seasons + current active season
  const activeSeasonEntry: GMHistoryEntry = {
    season: league.season,
    leagueId: league.id!,
    teamId: currentTeam.id!,
    teamName: currentTeam.name,
    wins: currentTeam.wins,
    draws: currentTeam.draws,
    losses: currentTeam.losses,
    goalsFor: currentTeam.goalsFor,
    goalsAgainst: currentTeam.goalsAgainst
  };

  const allSeasonLogs = [activeSeasonEntry, ...gmEntries];

  const totalWins = allSeasonLogs.reduce((acc, curr) => acc + curr.wins, 0);
  const totalDraws = allSeasonLogs.reduce((acc, curr) => acc + curr.draws, 0);
  const totalLosses = allSeasonLogs.reduce((acc, curr) => acc + curr.losses, 0);
  const totalMatches = totalWins + totalDraws + totalLosses;
  const winRate = totalMatches > 0 ? ((totalWins / totalMatches) * 100).toFixed(1) : '0.0';

  // Club breakdown map
  const clubStatsMap = new Map<string, { seasons: number; wins: number; draws: number; losses: number }>();
  for (const log of allSeasonLogs) {
    if (!clubStatsMap.has(log.teamName)) {
      clubStatsMap.set(log.teamName, { seasons: 0, wins: 0, draws: 0, losses: 0 });
    }
    const c = clubStatsMap.get(log.teamName)!;
    c.seasons += 1;
    c.wins += log.wins;
    c.draws += log.draws;
    c.losses += log.losses;
  }

  const trophies = gmEntries.filter(e => e.titleWon);

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <User size={32} color="#38bdf8" />
        <div>
          <h1>Historial del Manager (GM History)</h1>
          <p style={{ color: '#94a3b8' }}>Evolución y registro histórico de tu carrera como Entrenador / Mánager General.</p>
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.2rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Partidos Dirigidos</span>
          <h2 style={{ fontSize: '2rem', margin: '0.3rem 0', color: '#38bdf8' }}>{totalMatches}</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{totalWins}V - {totalDraws}E - {totalLosses}D</span>
        </div>
        <div className="glass-panel" style={{ padding: '1.2rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>% Victoria Carrera</span>
          <h2 style={{ fontSize: '2rem', margin: '0.3rem 0', color: '#10b981' }}>{winRate}%</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Efectividad global</span>
        </div>
        <div className="glass-panel" style={{ padding: '1.2rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Temporadas Gestionadas</span>
          <h2 style={{ fontSize: '2rem', margin: '0.3rem 0', color: '#f59e0b' }}>{allSeasonLogs.length}</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Desde {gmEntries.length > 0 ? gmEntries[gmEntries.length - 1].season : league.season}</span>
        </div>
        <div className="glass-panel" style={{ padding: '1.2rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Títulos Conseguidos</span>
          <h2 style={{ fontSize: '2rem', margin: '0.3rem 0', color: '#ec4899' }}>{trophies.length}</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Campeonatos de Liga</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Main Season Records Table */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Calendar size={18} color="#38bdf8" /> Registro por Temporada
          </h3>
          <table className="table-container bb-table">
            <thead>
              <tr>
                <th>Año</th>
                <th>Club</th>
                <th>V-E-D</th>
                <th>% Vic</th>
                <th>GF-GC</th>
                <th>Posición</th>
                <th>Título</th>
              </tr>
            </thead>
            <tbody>
              {allSeasonLogs.map((log, idx) => {
                const logMatches = log.wins + log.draws + log.losses;
                const logRate = logMatches > 0 ? ((log.wins / logMatches) * 100).toFixed(1) : '0.0';
                const isCurrent = idx === 0 && log.season === league.season;

                return (
                  <tr key={log.season + '_' + log.teamName}>
                    <td style={{ fontWeight: 'bold', color: isCurrent ? '#f59e0b' : '#ffffff' }}>
                      {log.season} {isCurrent && <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>(Actual)</span>}
                    </td>
                    <td style={{ fontWeight: 'bold' }}>{log.teamName}</td>
                    <td>{log.wins}-{log.draws}-{log.losses}</td>
                    <td style={{ color: Number(logRate) >= 50 ? '#10b981' : '#ef4444' }}>{logRate}%</td>
                    <td>{log.goalsFor} - {log.goalsAgainst}</td>
                    <td>{log.leaguePosition ? `#${log.leaguePosition}` : '-'}</td>
                    <td>
                      {log.titleWon ? (
                        <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid #f59e0b' }}>
                          🏆 {log.titleWon}
                        </span>
                      ) : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Club Breakdown Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}>
              <Shield size={18} color="#10b981" /> Trayectoria por Club
            </h3>
            {Array.from(clubStatsMap.entries()).map(([clubName, cStats]) => {
              const cMatches = cStats.wins + cStats.draws + cStats.losses;
              const cRate = cMatches > 0 ? ((cStats.wins / cMatches) * 100).toFixed(1) : '0.0';
              return (
                <div key={clubName} style={{ marginBottom: '1rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontWeight: 'bold', color: '#38bdf8' }}>{clubName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                    {cStats.seasons} {cStats.seasons === 1 ? 'temporada' : 'temporadas'} | {cStats.wins}V-{cStats.draws}E-{cStats.losses}D ({cRate}%)
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-panel" style={{ padding: '1.2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}>
              <Trophy size={18} color="#f59e0b" /> Palmarés de Trofeos
            </h3>
            {trophies.length > 0 ? (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {trophies.map(t => (
                  <div key={t.id || t.season} style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', borderRadius: '8px', padding: '0.5rem 0.8rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem' }}>🏆</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#f59e0b' }}>{t.titleWon}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{t.season}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Aún no has levantado trofeos oficiales. ¡Sigue compitiendo!</p>
            )}
          </div>
        </div>
      </div>

      {/* Roster Managed */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Award size={18} color="#ec4899" /> Jugadores Bajo tu Mando ({currentTeam.name})
        </h3>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Posición</th>
              <th>OVR</th>
              <th>POT</th>
              <th>Goles</th>
              <th>Asistencias</th>
              <th>Partidos</th>
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 'bold' }}>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                    {p.name}
                  </Link>
                </td>
                <td>{p.position}</td>
                <td><strong>{p.overall}</strong></td>
                <td>{p.potential}</td>
                <td>{p.stats?.goals || 0}</td>
                <td>{p.stats?.assists || 0}</td>
                <td>{p.stats?.gamesPlayed || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
