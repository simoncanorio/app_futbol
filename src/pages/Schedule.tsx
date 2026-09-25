import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Match, type Team } from '../db/db';

export function Schedule() {
  const { leagueId } = useParams();
  const [matches, setMatches] = useState<(Match & { homeName: string; awayName: string })[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      if (!lid) return;

      const m = await db.matches.where('leagueId').equals(lid).toArray();
      const teams = await db.teams.where('leagueId').equals(lid).toArray();
      const teamMap = new Map(teams.map(t => [t.id!, t.name]));
      
      const enriched = m.map(match => ({
        ...match,
        homeName: teamMap.get(match.homeTeamId) || 'Local FC',
        awayName: teamMap.get(match.awayTeamId) || 'Visitante FC'
      }));
      setMatches(enriched); 
    }
    load();
  }, [leagueId]);

  const completedMatches = matches.filter(m => m.isPlayed).reverse();
  const upcomingMatches = matches.filter(m => !m.isPlayed);

  const getCompBadge = (type?: string) => {
    if (type === 'cup') return <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid #c084fc', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>🏆 COPA</span>;
    if (type === 'continental') return <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>🌟 CHAMPIONS</span>;
    return <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>⚽ LIGA</span>;
  };

  return (
    <div className="page-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <h1>Próximos Partidos Programados</h1>
        <div className="glass-panel" style={{ marginTop: '1rem', overflow: 'hidden' }}>
          <table className="table-container bb-table">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Competición</th>
                <th>Encuentro</th>
              </tr>
            </thead>
            <tbody>
              {upcomingMatches.slice(0, 15).map(m => (
                <tr key={m.id}>
                  <td><strong>Jornada {m.week}</strong></td>
                  <td>{getCompBadge(m.type)}</td>
                  <td>
                    <Link to={`/l/${leagueId}/team/${m.homeTeamId}`} style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>
                      {m.homeName}
                    </Link>
                    {' vs '}
                    <Link to={`/l/${leagueId}/team/${m.awayTeamId}`} style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>
                      {m.awayName}
                    </Link>
                  </td>
                </tr>
              ))}
              {upcomingMatches.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>No hay próximos partidos.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h1>Resultados Recientes</h1>
        <div className="glass-panel" style={{ marginTop: '1rem', overflow: 'hidden' }}>
          <table className="table-container bb-table">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Competición</th>
                <th>Local</th>
                <th>Res.</th>
                <th>Visitante</th>
              </tr>
            </thead>
            <tbody>
              {completedMatches.slice(0, 15).map(m => (
                <tr key={m.id}>
                  <td><strong>Jornada {m.week}</strong></td>
                  <td>{getCompBadge(m.type)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to={`/l/${leagueId}/team/${m.homeTeamId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {m.homeName}
                    </Link>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#10b981' }}>{m.homeScore} - {m.awayScore}</td>
                  <td>
                    <Link to={`/l/${leagueId}/team/${m.awayTeamId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {m.awayName}
                    </Link>
                  </td>
                </tr>
              ))}
              {completedMatches.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No hay partidos jugados.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
