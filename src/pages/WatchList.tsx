import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';
import { PlayerAvatar } from '../components/common/PlayerAvatar';

export function WatchList() {
  const { leagueId } = useParams();
  const [watchedPlayers, setWatchedPlayers] = useState<(Player & { teamName?: string })[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const [allPlayers, allTeams] = await Promise.all([
        db.players.where('leagueId').equals(lid).toArray(),
        db.teams.where('leagueId').equals(lid).toArray()
      ]);
      const teamMap = new Map<number, string>(allTeams.map(t => [t.id!, t.name]));
      const watched = allPlayers.filter(p => p.isWatched).map(p => ({
        ...p,
        teamName: p.teamId ? (teamMap.get(p.teamId) || 'Club') : 'Agente Libre'
      }));
      setWatchedPlayers(watched);
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
              <th>Club Actual</th>
            </tr>
          </thead>
          <tbody>
            {watchedPlayers.map(p => (
              <tr key={p.id}>
                <td style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => toggleWatch(p)}>
                  <span style={{color: '#e67e22', fontSize: '18px'}}>★</span>
                </td>
                <td style={{fontWeight: 'bold'}}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlayerAvatar player={p} size={26} />
                    <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#38bdf8', textDecoration: 'none'}}>
                      {p.name}
                    </Link>
                  </div>
                </td>
                <td>{p.position}</td>
                <td>{p.age}</td>
                <td>{p.overall}</td>
                <td>{p.potential}</td>
                <td>${(p.contract / 1000000).toFixed(2)}M</td>
                <td>{p.teamName || 'Agente Libre'}</td>
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
