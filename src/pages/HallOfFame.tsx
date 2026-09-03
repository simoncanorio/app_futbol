import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player } from '../db/db';

export function HallOfFame() {
  const { leagueId } = useParams();
  const [hofPlayers, setHofPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      setHofPlayers(allPlayers.filter(p => p.isHallOfFame).sort((a,b) => b.overall - a.overall)); // Sort by overall for now
    }
    load();
  }, [leagueId]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Salón de la Fama (Hall of Fame)</h1>
      </div>
      
      <p style={{marginBottom: '2rem', color: '#ccc', fontSize: '13px'}}>
        Los jugadores son elegibles para ser incluidos en el Salón de la Fama después de que se retiran. 
        Los miembros del Salón de la Fama que jugaron para tu equipo se destacan en <span style={{color: '#3b82f6'}}>azul</span>. 
        Los miembros del Salón de la Fama que se retiraron con tu equipo se destacan en <span style={{color: '#28a745'}}>verde</span>.
        Los miembros del Salón de la Fama que jugaron la mayor parte de su carrera con tu equipo se destacan en <span style={{color: '#dc3545'}}>rojo</span>.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th rowSpan={2}>Name</th>
              <th rowSpan={2}>Pos</th>
              <th rowSpan={2}>Peak Ovr</th>
              <th colSpan={3} style={{textAlign: 'center', borderBottom: '1px solid #444'}}>Career Stats</th>
            </tr>
            <tr>
              <th>Gls</th>
              <th>Ast</th>
              <th>Salario Promedio</th>
            </tr>
          </thead>
          <tbody>
            {hofPlayers.map(p => (
              <tr key={p.id}>
                <td style={{fontWeight: 'bold', color: '#e67e22'}}>{p.name}</td>
                <td>{p.position}</td>
                <td>{p.overall}</td>
                <td>{p.stats?.goals || 0}</td>
                <td>{p.stats?.assists || 0}</td>
                <td>${(p.contract / 1000000).toFixed(2)}M</td>
              </tr>
            ))}
            {hofPlayers.length === 0 && (
              <tr><td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Aún no hay leyendas en el Salón de la Fama.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
