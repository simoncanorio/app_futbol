import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';

export function LeagueLeaders() {
  const { leagueId } = useParams();
  const [players, setPlayers] = useState<(Player & { teamObj?: Team })[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      
      const teamMap = new Map<number, Team>();
      allTeams.forEach(t => teamMap.set(t.id!, t));
      
      const p = allPlayers.map(pl => ({
        ...pl,
        teamObj: pl.teamId ? teamMap.get(pl.teamId) : undefined
      }));
      
      setPlayers(p);
    }
    load();
  }, [leagueId]);

  const LeaderBoard = ({ title, data, valueKey, isFloat = false }: { title: string, data: any[], valueKey: (p: any) => number, isFloat?: boolean }) => {
    const sorted = [...data].sort((a, b) => valueKey(b) - valueKey(a)).slice(0, 10);
    return (
      <div style={{flex: 1, minWidth: '300px', marginBottom: '2rem'}}>
        <h3 style={{borderBottom: '2px solid #e67e22', paddingBottom: '0.5rem'}}>{title}</h3>
        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
          <tbody>
            {sorted.map((p, idx) => (
              <tr key={p.id} style={{borderBottom: '1px solid #333', background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}}>
                <td style={{padding: '6px 4px', width: '20px', color: '#888'}}>{idx + 1}</td>
                <td style={{padding: '6px 4px', fontWeight: 'bold', color: '#3b82f6'}}>{p.name}</td>
                <td style={{padding: '6px 4px', color: '#aaa'}}>{p.teamObj?.name.substring(0, 3).toUpperCase() || 'FA'}</td>
                <td style={{padding: '6px 4px', color: '#aaa'}}>{p.position}</td>
                <td style={{padding: '6px 4px', textAlign: 'right', fontWeight: 'bold'}}>
                  {isFloat ? valueKey(p).toFixed(1) : valueKey(p)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Líderes de la Liga (League Leaders)</h1>
      </div>
      
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem'}}>
        <LeaderBoard 
          title="Goleadores (Gls)" 
          data={players.filter(p => p.stats?.goals > 0)} 
          valueKey={p => p.stats?.goals || 0} 
        />
        <LeaderBoard 
          title="Asistencias (Ast)" 
          data={players.filter(p => p.stats?.assists > 0)} 
          valueKey={p => p.stats?.assists || 0} 
        />
        <LeaderBoard 
          title="Vallas Invictas (CS)" 
          data={players.filter(p => p.position === 'POR' && p.stats?.cleanSheets)} 
          valueKey={p => p.stats?.cleanSheets || 0} 
        />
        <LeaderBoard 
          title="Mejor Valoración (OVR)" 
          data={players} 
          valueKey={p => p.overall} 
        />
        <LeaderBoard 
          title="Mayor Potencial (POT)" 
          data={players} 
          valueKey={p => p.potential} 
        />
        <LeaderBoard 
          title="Tarjetas Amarillas (YC)" 
          data={players.filter(p => p.stats?.yellowCards > 0)} 
          valueKey={p => p.stats?.yellowCards || 0} 
        />
      </div>
    </div>
  );
}
