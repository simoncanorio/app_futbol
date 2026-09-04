import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type League } from '../db/db';

export function Roster() {
  const { leagueId, teamId } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamName, setTeamName] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player, direction: 'asc' | 'desc' }>({ key: 'overall', direction: 'desc' });

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(l) {
         const targetTeamId = teamId ? Number(teamId) : l.userTeamId;
         if (targetTeamId) {
           const p = await db.players.where('teamId').equals(targetTeamId).toArray();
           const t = await db.teams.get(targetTeamId);
           setPlayers(p);
           if (t) setTeamName(t.name);
         }
      }
    }
    load();
  }, [leagueId, teamId]);

  const toggleWatch = async (p: Player) => {
    p.isWatched = !p.isWatched;
    await db.players.put(p);
    setPlayers([...players]);
  };

  const getPosColor = (pos: string) => {
    switch(pos) {
      case 'GK': return '#eab308';
      case 'DEF': return '#3b82f6';
      case 'MED': return '#10b981';
      case 'DEL': return '#ef4444';
      default: return 'white';
    }
  }

  const handleSort = (key: keyof Player) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = [...players].sort((a, b) => {
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    if (sortConfig.key === 'stats') {
      aVal = (a.stats?.goals || 0) + (a.stats?.assists || 0);
      bVal = (b.stats?.goals || 0) + (b.stats?.assists || 0);
    }
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="page-content">
      <h1 style={{marginBottom: 0}}>Plantilla</h1>
      {teamName && <h3 style={{marginTop: 0, color: '#aaa'}}>{teamName}</h3>}
      <div className="glass-panel" style={{marginTop: '1.5rem', overflow: 'hidden'}}>
        <table className="table-container">
          <thead>
            <tr>
              <th></th>
              <th onClick={() => handleSort('position')} style={{cursor: 'pointer'}}>Pos {sortConfig.key === 'position' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('name')} style={{cursor: 'pointer'}}>Nombre {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('age')} style={{cursor: 'pointer'}}>Edad {sortConfig.key === 'age' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('overall')} style={{cursor: 'pointer'}}>OVR {sortConfig.key === 'overall' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('potential')} style={{cursor: 'pointer'}}>POT {sortConfig.key === 'potential' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('contract')} style={{cursor: 'pointer'}}>Salario {sortConfig.key === 'contract' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map(p => (
              <tr key={p.id}>
                <td style={{textAlign: 'center', cursor: 'pointer', width: '30px'}} onClick={() => toggleWatch(p)}>
                  <span style={{color: p.isWatched ? '#e67e22' : '#555', fontSize: '18px'}}>★</span>
                </td>
                <td style={{color: getPosColor(p.position), fontWeight: 'bold'}}>{p.position}</td>
                <td>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold'}}>
                    {p.name}
                  </Link>
                </td>
                <td>{p.age}</td>
                <td><strong>{p.overall}</strong></td>
                <td>{p.potential}</td>
                <td>${(p.contract / 1000000).toFixed(2)}M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
