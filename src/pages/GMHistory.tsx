import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type SeasonHistory, type League, type Team, type Player } from '../db/db';

export function GMHistory() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null); // To get current team for demo purposes
  const [history, setHistory] = useState<SeasonHistory[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);
      
      if(l.userTeamId) {
        const userTeam = await db.teams.get(l.userTeamId);
        setTeam(userTeam || null);
        
        // Simular historial de temporadas global
        const hist = await db.history.where('leagueId').equals(lid).reverse().toArray();
        setHistory(hist);
        
        // Todos los jugadores gestionados
        const p = await db.players.where('teamId').equals(l.userTeamId).toArray();
        setPlayers(p);
      }
    }
    load();
  }, [leagueId]);

  if (!team) return <div>Loading...</div>;

  return (
    <div className="page-container" style={{display: 'flex', gap: '2rem'}}>
      {/* Columna Izquierda */}
      <div style={{flex: '0 0 250px'}}>
        <h2>My Records</h2>
        <div style={{fontSize: '13px', lineHeight: '1.6', marginBottom: '2rem'}}>
          Record: {team.wins}-{team.losses} ({(team.wins / (team.wins + team.losses || 1)).toFixed(3)})<br/>
          Playoff Appearances: 0<br/>
          Finals Appearances: 0<br/>
          Championships: 0<br/>
          Best Record: {team.wins}-{team.losses}<br/>
          Worst Record: {team.wins}-{team.losses}
        </div>
        
        <h2>Seasons</h2>
        <div style={{fontSize: '13px', lineHeight: '1.6', color: '#888'}}>
          {history.length > 0 ? history.map(h => (
            <div key={h.id}>
              <strong style={{color: '#e67e22'}}>{h.season}:</strong> {team.wins}-{team.losses} (as {team.name})
            </div>
          )) : (
            <div>2026: {team.wins}-{team.losses}, regular season (as {team.name})</div>
          )}
        </div>
      </div>

      {/* Columna Derecha */}
      <div style={{flex: 1}}>
        <div style={{marginBottom: '2rem'}}>
           <p style={{fontSize: '13px', color: '#aaa'}}>
             This GM History page is similar to the Team History page, except it's not just for one team. It's for every team you were the GM of.
           </p>
        </div>

        <div style={{marginBottom: '3rem'}}>
           <h2>5 Championships</h2>
           <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
              {[2026, 2027, 2028, 2029, 2030].map(y => (
                <div key={y} style={{width: '60px', height: '80px', background: '#3b82f6', border: '2px solid white', borderRadius: '4px 4px 50% 50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>
                  {y}
                </div>
              ))}
           </div>
        </div>

        <div>
           <h2>Players</h2>
           <p style={{fontSize: '12px', color: '#ccc'}}>
             Players currently on your team are <span style={{color: '#28a745'}}>highlighted in green</span>. Other active players are <span style={{color: '#3b82f6'}}>highlighted in blue</span>. Players in the Hall of Fame are <span style={{color: '#dc3545'}}>highlighted in red</span>.
           </p>
           
           <table className="table-container bb-table" style={{marginTop: '1rem'}}>
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Pos</th>
                 <th>OVR</th>
                 <th>Gls</th>
                 <th>Ast</th>
                 <th>Last Season</th>
               </tr>
             </thead>
             <tbody>
               {players.map(p => (
                 <tr key={p.id} style={{background: p.isHallOfFame ? '#dc354533' : '#28a74533'}}>
                   <td>{p.name}</td>
                   <td>{p.position}</td>
                   <td>{p.overall}</td>
                   <td>{p.stats?.goals || 0}</td>
                   <td>{p.stats?.assists || 0}</td>
                   <td>2026</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
