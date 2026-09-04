import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team, type League } from '../db/db';

export function PlayerStats() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [players, setPlayers] = useState<(Player & { teamObj?: Team })[]>([]);
  const [page, setPage] = useState(0);
  const pageSize = 50;

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      setLeague(l || null);
      
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      
      const teamMap = new Map<number, Team>();
      allTeams.forEach(t => teamMap.set(t.id!, t));
      
      const p = allPlayers.map(pl => ({
        ...pl,
        teamObj: pl.teamId ? teamMap.get(pl.teamId) : undefined
      }));
      
      // Mostrar solo a los que hayan jugado al menos 1 partido
      const played = p.filter(pl => (pl.stats?.gamesPlayed || 0) > 0);
      setPlayers(played.sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0)));
    }
    load();
  }, [leagueId]);

  const visiblePlayers = players.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Estadísticas (Player Stats)</h1>
      </div>
      
      <p style={{color: '#ccc', marginBottom: '1rem', fontSize: '13px'}}>
        Se muestran solo los jugadores que han disputado al menos 1 partido. Los jugadores de tu equipo se destacan en <span style={{color: '#3b82f6'}}>azul</span>.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Pos</th>
              <th>Team</th>
              <th>Age</th>
              <th>GP</th>
              <th>Gls</th>
              <th>Ast</th>
              <th>YC</th>
              <th>RC</th>
              <th>CS</th>
            </tr>
          </thead>
          <tbody>
            {visiblePlayers.map(p => {
              const isMyTeam = league && p.teamId === league.userTeamId;
              return (
                <tr key={p.id}>
                  <td style={{fontWeight: 'bold', color: isMyTeam ? '#3b82f6' : '#e67e22'}}>{p.name}</td>
                  <td>{p.position}</td>
                  <td>{p.teamObj?.name.substring(0,3).toUpperCase() || 'FA'}</td>
                  <td>{p.age}</td>
                  <td>{p.stats?.gamesPlayed || 0}</td>
                  <td style={{fontWeight: 'bold'}}>{p.stats?.goals || 0}</td>
                  <td style={{fontWeight: 'bold'}}>{p.stats?.assists || 0}</td>
                  <td>{p.stats?.yellowCards || 0}</td>
                  <td>{p.stats?.redCards || 0}</td>
                  <td>{p.position === 'POR' ? (p.stats?.cleanSheets || 0) : '-'}</td>
                </tr>
              )
            })}
            {players.length === 0 && (
              <tr><td colSpan={10} style={{textAlign: 'center', padding: '2rem'}}>Nadie ha jugado partidos aún. Avanza en el calendario.</td></tr>
            )}
          </tbody>
        </table>
        
        {players.length > pageSize && (
          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem'}}>
             <button 
               disabled={page === 0} 
               onClick={() => setPage(p => p - 1)}
               style={{padding: '4px 12px', background: '#111', color: 'white', border: '1px solid #444', cursor: page === 0 ? 'not-allowed' : 'pointer'}}
             >Anterior</button>
             <span style={{padding: '4px 0'}}>Página {page + 1} de {Math.ceil(players.length / pageSize)}</span>
             <button 
               disabled={(page + 1) * pageSize >= players.length} 
               onClick={() => setPage(p => p + 1)}
               style={{padding: '4px 12px', background: '#111', color: 'white', border: '1px solid #444', cursor: (page + 1) * pageSize >= players.length ? 'not-allowed' : 'pointer'}}
             >Siguiente</button>
          </div>
        )}
      </div>
    </div>
  );
}
