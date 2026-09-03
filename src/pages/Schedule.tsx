import React, { useEffect, useState } from 'react';
import { db, type Match, type Team } from '../db/db';

export function Schedule() {
  const [matches, setMatches] = useState<(Match & {homeName: string, awayName: string})[]>([]);

  useEffect(() => {
    async function load() {
      const m = await db.matches.toArray();
      const teams = await db.teams.toArray();
      const teamMap = new Map(teams.map(t => [t.id, t.name]));
      
      const enriched = m.map(match => ({
        ...match,
        homeName: teamMap.get(match.homeTeamId) || 'Unknown',
        awayName: teamMap.get(match.awayTeamId) || 'Unknown'
      }));
      setMatches(enriched); 
    }
    load();
  }, []);

  const completedMatches = matches.filter(m => m.isPlayed || (m.homeScore !== undefined && m.homeScore !== 0)).reverse();
  const upcomingMatches = matches.filter(m => !m.isPlayed && m.homeScore === 0 && m.awayScore === 0);

  return (
    <div className="page-content" style={{display: 'flex', gap: '2rem'}}>
      <div style={{flex: 1}}>
        <h1>Próximos Partidos</h1>
        <div className="glass-panel" style={{marginTop: '1rem', overflow: 'hidden'}}>
          <table className="table-container">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Encuentro</th>
              </tr>
            </thead>
            <tbody>
              {upcomingMatches.slice(0, 10).map(m => (
                <tr key={m.id}>
                  <td>{m.week}</td>
                  <td>{m.homeName} vs {m.awayName}</td>
                </tr>
              ))}
              {upcomingMatches.length === 0 && <tr><td colSpan={2} style={{textAlign: 'center', padding: '2rem'}}>No hay próximos partidos.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{flex: 1}}>
        <h1>Resultados</h1>
        <div className="glass-panel" style={{marginTop: '1rem', overflow: 'hidden'}}>
          <table className="table-container">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Local</th>
                <th>Res.</th>
                <th>Visitante</th>
              </tr>
            </thead>
            <tbody>
              {completedMatches.map(m => (
                <tr key={m.id}>
                  <td>{m.week}</td>
                  <td style={{textAlign: 'right'}}>{m.homeName}</td>
                  <td style={{textAlign: 'center', fontWeight: 'bold', color: 'var(--accent-green)'}}>{m.homeScore} - {m.awayScore}</td>
                  <td>{m.awayName}</td>
                </tr>
              ))}
              {completedMatches.length === 0 && <tr><td colSpan={4} style={{textAlign: 'center', padding: '2rem'}}>No hay partidos jugados.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
