import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';

export function Awards() {
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

  // Calculations for Awards
  // MVP: Weight goals heavily, then assists, then OVR
  const getMVPScore = (p: Player) => ((p.stats?.goals || 0) * 3) + ((p.stats?.assists || 0) * 1.5) + (p.overall * 0.1);
  const mvpCandidates = [...players].sort((a, b) => getMVPScore(b) - getMVPScore(a)).slice(0, 10);

  // Best Defender
  const defCandidates = [...players].filter(p => p.position === 'DEF')
                                   .sort((a, b) => (b.overall * 0.5 + (b.attributes?.defending || 0)) - (a.overall * 0.5 + (a.attributes?.defending || 0)))
                                   .slice(0, 10);

  // Best GK
  const gkCandidates = [...players].filter(p => p.position === 'POR')
                                   .sort((a, b) => ((b.stats?.cleanSheets || 0) * 2 + b.overall) - ((a.stats?.cleanSheets || 0) * 2 + a.overall))
                                   .slice(0, 10);

  // Golden Boy (U-21)
  const youthCandidates = [...players].filter(p => p.age <= 21)
                                      .sort((a, b) => getMVPScore(b) - getMVPScore(a))
                                      .slice(0, 10);

  const AwardGrid = ({ title, candidates }: { title: string, candidates: any[] }) => (
    <div style={{ flex: '1 1 calc(50% - 1rem)', minWidth: '400px', background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px', padding: '1rem' }}>
      <h3 style={{ borderBottom: '2px solid #eab308', paddingBottom: '0.5rem', marginTop: 0 }}>{title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ color: '#888', borderBottom: '1px solid #333' }}>
            <th style={{ textAlign: 'left', padding: '4px' }}>#</th>
            <th style={{ textAlign: 'left', padding: '4px' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '4px' }}>Team</th>
            <th style={{ textAlign: 'center', padding: '4px' }}>Age</th>
            <th style={{ textAlign: 'center', padding: '4px' }}>OVR</th>
            <th style={{ textAlign: 'center', padding: '4px' }}>Gls</th>
            <th style={{ textAlign: 'center', padding: '4px' }}>Ast</th>
            <th style={{ textAlign: 'center', padding: '4px' }}>CS</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((p, idx) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #222', background: idx === 0 ? 'rgba(234, 179, 8, 0.1)' : 'transparent' }}>
              <td style={{ padding: '6px 4px', color: idx === 0 ? '#eab308' : '#888', fontWeight: idx === 0 ? 'bold' : 'normal' }}>{idx + 1}</td>
              <td style={{ padding: '6px 4px', fontWeight: 'bold', color: idx === 0 ? '#eab308' : '#3b82f6' }}>{p.name}</td>
              <td style={{ padding: '6px 4px', color: '#aaa' }}>{p.teamObj?.name.substring(0,3).toUpperCase() || 'FA'}</td>
              <td style={{ padding: '6px 4px', textAlign: 'center', color: '#aaa' }}>{p.age}</td>
              <td style={{ padding: '6px 4px', textAlign: 'center', fontWeight: 'bold' }}>{p.overall}</td>
              <td style={{ padding: '6px 4px', textAlign: 'center' }}>{p.stats?.goals || 0}</td>
              <td style={{ padding: '6px 4px', textAlign: 'center' }}>{p.stats?.assists || 0}</td>
              <td style={{ padding: '6px 4px', textAlign: 'center' }}>{p.position === 'POR' ? (p.stats?.cleanSheets || 0) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Premios de la Temporada (Award Races)</h1>
      </div>
      
      <p style={{ color: '#ccc', marginBottom: '2rem' }}>Los favoritos actuales para llevarse los galardones al final de la temporada.</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <AwardGrid title="Balón de Oro (Mejor Jugador)" candidates={mvpCandidates} />
        <AwardGrid title="Mejor Defensor (Defensor del Año)" candidates={defCandidates} />
        <AwardGrid title="Guante de Oro (Mejor Portero)" candidates={gkCandidates} />
        <AwardGrid title="Golden Boy (Mejor Jugador Sub-21)" candidates={youthCandidates} />
      </div>
    </div>
  );
}
