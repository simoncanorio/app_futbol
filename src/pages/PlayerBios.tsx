import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team, type League } from '../db/db';

export function PlayerBios() {
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
      
      setPlayers(p.sort((a, b) => a.name.localeCompare(b.name)));
    }
    load();
  }, [leagueId]);

  const visiblePlayers = players.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Biografías (Player Bios)</h1>
      </div>
      
      <p style={{color: '#ccc', marginBottom: '1rem', fontSize: '13px'}}>
        Los jugadores de tu equipo se destacan en <span style={{color: '#3b82f6'}}>azul</span>.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Pos</th>
              <th>Team</th>
              <th>Age</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Contract</th>
              <th>Country</th>
              <th>Draft/Recruited</th>
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
                  <td>{p.bio?.height ? `${p.bio.height} cm` : '-'}</td>
                  <td>{p.bio?.weight ? `${p.bio.weight} kg` : '-'}</td>
                  <td>${(p.contract / 1000000).toFixed(2)}M</td>
                  <td>{p.bio?.country || '-'}</td>
                  <td>{p.recruitedYear || p.draftYear || '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        
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
      </div>
    </div>
  );
}
