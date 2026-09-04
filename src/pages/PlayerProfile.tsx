import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db, type Player, type Team, type League } from '../db/db';

export function PlayerProfile() {
  const { leagueId, playerId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [league, setLeague] = useState<League | null>(null);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const pid = Number(playerId);
      const l = await db.leagues.get(lid);
      setLeague(l || null);
      
      const p = await db.players.get(pid);
      if (p) {
        setPlayer(p);
        if (p.teamId) {
          const t = await db.teams.get(p.teamId);
          setTeam(t || null);
        }
      }
    }
    load();
  }, [leagueId, playerId]);

  if (!player) return <div className="page-container">Cargando...</div>;

  return (
    <div className="page-container" style={{maxWidth: '1200px', margin: '0 auto'}}>
      {/* HEADER SECTION */}
      <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px', padding: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div style={{ width: '120px', height: '150px', background: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {/* Mock Silhouette */}
          <div style={{ width: '60px', height: '80px', background: '#333', borderRadius: '50% 50% 0 0', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '-40px', left: '10px', width: '40px', height: '40px', background: '#333', borderRadius: '50%' }}></div>
          </div>
        </div>
        
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>{player.name}</h1>
          <div style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: '#eab308', fontWeight: 'bold' }}>{player.position}</span>, 
              {team ? (
                <Link to={`/l/${leagueId}/team/${team.id}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>{team.name}</Link>
              ) : (
                'Agente Libre'
              )}
            </div>
            <div>{player.bio?.height || 180} cm, {player.bio?.weight || 75} kg - {player.bio?.country || 'Desconocido'}</div>
            <div>Edad: {player.age}</div>
            <div>Contrato: ${(player.contract / 1000000).toFixed(2)}M/yr</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#aaa', fontSize: '12px', marginBottom: '4px' }}>Overall</div>
            <div style={{ background: '#3b82f6', color: 'white', fontWeight: 'bold', fontSize: '24px', padding: '8px 12px', borderRadius: '4px' }}>
              {player.overall}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#aaa', fontSize: '12px', marginBottom: '4px' }}>Potential</div>
            <div style={{ background: '#e67e22', color: 'white', fontWeight: 'bold', fontSize: '24px', padding: '8px 12px', borderRadius: '4px' }}>
              {player.potential}
            </div>
          </div>
        </div>
      </div>

      {/* RATINGS SECTION */}
      <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', color: '#e67e22' }}>Atributos</h3>
      <div className="standings-content" style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>PAC</th>
              <th>SHO</th>
              <th>PAS</th>
              <th>DRI</th>
              <th>DEF</th>
              <th>PHY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{player.attributes?.pace || '-'}</td>
              <td>{player.attributes?.shooting || '-'}</td>
              <td>{player.attributes?.passing || '-'}</td>
              <td>{player.attributes?.dribbling || '-'}</td>
              <td>{player.attributes?.defending || '-'}</td>
              <td>{player.attributes?.physical || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* STATS SECTION */}
      <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', color: '#3b82f6' }}>Estadísticas Totales</h3>
      <div className="standings-content" style={{ overflowX: 'auto' }}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Temporada</th>
              <th>Equipo</th>
              <th>Edad</th>
              <th>GP</th>
              <th>Gls</th>
              <th>Ast</th>
              <th>YC</th>
              <th>RC</th>
              <th>CS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{league?.season}</td>
              <td>{team ? <Link to={`/l/${leagueId}/team/${team.id}`} style={{color: '#3b82f6', textDecoration: 'none'}}>{team.name.substring(0,3).toUpperCase()}</Link> : 'FA'}</td>
              <td>{player.age}</td>
              <td>{player.stats?.gamesPlayed || 0}</td>
              <td style={{ fontWeight: 'bold' }}>{player.stats?.goals || 0}</td>
              <td>{player.stats?.assists || 0}</td>
              <td>{player.stats?.yellowCards || 0}</td>
              <td>{player.stats?.redCards || 0}</td>
              <td>{player.position === 'POR' ? (player.stats?.cleanSheets || 0) : '-'}</td>
            </tr>
            <tr style={{ fontWeight: 'bold', background: 'rgba(255,255,255,0.05)' }}>
              <td colSpan={3}>Carrera</td>
              <td>{player.stats?.gamesPlayed || 0}</td>
              <td style={{ color: '#e67e22' }}>{player.stats?.goals || 0}</td>
              <td>{player.stats?.assists || 0}</td>
              <td>{player.stats?.yellowCards || 0}</td>
              <td>{player.stats?.redCards || 0}</td>
              <td>{player.position === 'POR' ? (player.stats?.cleanSheets || 0) : '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
