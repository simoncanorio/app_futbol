import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player } from '../db/db';

export function WatchList() {
  const { leagueId } = useParams();
  const [watchedPlayers, setWatchedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      setWatchedPlayers(allPlayers.filter(p => p.isWatched));
    }
    load();
  }, [leagueId]);

  const toggleWatch = async (p: Player) => {
    p.isWatched = false; // we are in the watch list, so clicking removes it
    await db.players.put(p);
    setWatchedPlayers(watchedPlayers.filter(wp => wp.id !== p.id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Preselección (Watch List)</h1>
      </div>
      
      <p style={{marginBottom: '2rem', color: '#ccc'}}>
        Haz clic en el icono de estrella ★ para eliminar o agregar a un jugador de esta lista.<br/>
        En otras páginas, puedes encontrar el icono de estrella junto al nombre de un jugador.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Pos</th>
              <th>Age</th>
              <th>OVR</th>
              <th>POT</th>
              <th>Salary</th>
              <th>Team ID</th>
            </tr>
          </thead>
          <tbody>
            {watchedPlayers.map(p => (
              <tr key={p.id}>
                <td style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => toggleWatch(p)}>
                  <span style={{color: '#e67e22', fontSize: '18px'}}>★</span>
                </td>
                <td style={{fontWeight: 'bold'}}>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#3b82f6', textDecoration: 'none'}}>
                    {p.name}
                  </Link>
                </td>
                <td>{p.position}</td>
                <td>{p.age}</td>
                <td>{p.overall}</td>
                <td>{p.potential}</td>
                <td>${(p.contract / 1000000).toFixed(2)}M</td>
                <td>{p.teamId ? `Team ${p.teamId}` : 'Free Agent'}</td>
              </tr>
            ))}
            {watchedPlayers.length === 0 && (
              <tr><td colSpan={8} style={{textAlign: 'center', padding: '2rem'}}>Tu preselección está vacía.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
