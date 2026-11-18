import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League, getSpecificPosition, formatMoney } from '../db/db';
import { PlayerAvatar } from '../components/common/PlayerAvatar';

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
              <th>Nombre</th>
              <th>Pos</th>
              <th>Club</th>
              <th>Edad</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>Pie / PM / Filig.</th>
              <th>Salario</th>
              <th>País</th>
              <th>PlayStyles</th>
            </tr>
          </thead>
          <tbody>
            {visiblePlayers.map(p => {
              const isMyTeam = league && p.teamId === league.userTeamId;
              return (
                <tr key={p.id}>
                  <td style={{fontWeight: 'bold'}}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <PlayerAvatar player={p} size={24} />
                      <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: isMyTeam ? '#3b82f6' : '#e67e22', textDecoration: 'none'}}>
                        {p.name}
                      </Link>
                    </div>
                  </td>
                  <td>{getSpecificPosition(p)}</td>
                  <td>{p.teamObj?.name.substring(0,3).toUpperCase() || 'FA'}</td>
                  <td>{p.age}</td>
                  <td>{p.bio?.height ? `${p.bio.height} cm` : '-'}</td>
                  <td>{p.bio?.weight ? `${p.bio.weight} kg` : '-'}</td>
                  <td>{p.bio?.preferredFoot === 'Left' ? 'Izq' : 'Der'} ({p.bio?.weakFoot || 3}★ / {p.bio?.skillMoves || 3}★)</td>
                  <td>{formatMoney(p.contract)}</td>
                  <td>{p.bio?.country || '-'}</td>
                  <td style={{ fontSize: '0.72rem', color: '#7dd3fc' }}>
                    {p.playStyles && p.playStyles.length > 0 ? p.playStyles.slice(0, 3).join(', ') : '-'}
                  </td>
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
