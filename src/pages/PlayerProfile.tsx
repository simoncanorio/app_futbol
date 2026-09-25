import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League } from '../db/db';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export function PlayerProfile() {
  const { leagueId, playerId } = useParams();
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

  const radarData = [
    { subject: 'Ritmo (PAC)', A: player.attributes?.pace || 70, fullMark: 100 },
    { subject: 'Tiro (SHO)', A: player.attributes?.shooting || 70, fullMark: 100 },
    { subject: 'Pase (PAS)', A: player.attributes?.passing || 70, fullMark: 100 },
    { subject: 'Regate (DRI)', A: player.attributes?.dribbling || 70, fullMark: 100 },
    { subject: 'Defensa (DEF)', A: player.attributes?.defending || 70, fullMark: 100 },
    { subject: 'Físico (PHY)', A: player.attributes?.physical || 70, fullMark: 100 },
  ];

  return (
    <div className="page-container" style={{maxWidth: '1200px', margin: '0 auto'}}>
      {/* HEADER SECTION */}
      <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px', padding: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div style={{ width: '120px', height: '150px', background: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
            {player.isOnLoan && <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>🔄 Jugador Cedido en préstamo</div>}
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

      {/* SPIDER CHART & ATTRIBUTES SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', color: '#e67e22' }}>Atributos Principales</h3>
          <div className="standings-content" style={{ overflowX: 'auto' }}>
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
        </div>

        <div className="glass-panel" style={{ padding: '1rem', height: '260px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: '#38bdf8' }}>Perfil Táctico (Spider Chart)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
              <Radar name={player.name} dataKey="A" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* STATS SECTION */}
      <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', color: '#3b82f6', display: 'flex', justifyContent: 'space-between' }}>
        <span>Estadísticas de Temporada</span>
      </h3>
      <div className="standings-content" style={{ overflowX: 'auto' }}>
        <table className="table-container bb-table" style={{minWidth: '1000px'}}>
          <thead>
            <tr>
              <th>Temporada</th>
              <th>Equipo</th>
              <th>PJ</th>
              <th>Gls</th>
              <th>xG</th>
              <th>Ast</th>
              <th>xA</th>
              <th>Tir</th>
              <th>Pases%</th>
              <th>Reg</th>
              <th>Duel</th>
              <th>TA</th>
              <th>TR</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(player.historicalStats || {}).map(([s, stats]) => {
               const passPct = stats.passesAttempted > 0 ? Math.round((stats.passesCompleted / stats.passesAttempted)*100) : 0;
               return (
                <tr key={`hist-${s}`}>
                  <td style={{color: '#888'}}>{s}</td>
                  <td style={{color: '#888'}}>-</td>
                  <td>{stats.gamesPlayed}</td>
                  <td style={{ fontWeight: 'bold' }}>{stats.goals}</td>
                  <td style={{color: '#888'}}>{stats.xG.toFixed(2)}</td>
                  <td>{stats.assists}</td>
                  <td style={{color: '#888'}}>{stats.xA.toFixed(2)}</td>
                  <td>{stats.shotsTotal}</td>
                  <td>{stats.passesCompleted}/{stats.passesAttempted} ({passPct}%)</td>
                  <td>{stats.dribblesCompleted}</td>
                  <td>{stats.duelsWon}</td>
                  <td>{stats.yellowCards}</td>
                  <td>{stats.redCards}</td>
                </tr>
               )
            })}
            
            {/* CURRENT SEASON */}
            <tr style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <td>{league?.season}</td>
              <td>{team ? <Link to={`/l/${leagueId}/team/${team.id}`} style={{color: '#3b82f6', textDecoration: 'none'}}>{team.name.substring(0,3).toUpperCase()}</Link> : 'FA'}</td>
              <td>{player.stats?.gamesPlayed || 0}</td>
              <td style={{ fontWeight: 'bold' }}>{player.stats?.goals || 0}</td>
              <td style={{color: '#888'}}>{player.stats?.xG?.toFixed(2) || '0.00'}</td>
              <td>{player.stats?.assists || 0}</td>
              <td style={{color: '#888'}}>{player.stats?.xA?.toFixed(2) || '0.00'}</td>
              <td>{player.stats?.shotsTotal || 0}</td>
              <td>{player.stats?.passesCompleted || 0}/{player.stats?.passesAttempted || 0}</td>
              <td>{player.stats?.dribblesCompleted || 0}</td>
              <td>{player.stats?.duelsWon || 0}</td>
              <td>{player.stats?.yellowCards || 0}</td>
              <td>{player.stats?.redCards || 0}</td>
            </tr>
            
            {/* CAREER TOTAL */}
            {(() => {
               let cGP = player.stats?.gamesPlayed || 0;
               let cGls = player.stats?.goals || 0;
               let cxG = player.stats?.xG || 0;
               let cAst = player.stats?.assists || 0;
               let cxA = player.stats?.xA || 0;
               let cSht = player.stats?.shotsTotal || 0;
               
               Object.values(player.historicalStats || {}).forEach(hs => {
                 cGP += hs.gamesPlayed; cGls += hs.goals; cxG += hs.xG;
                 cAst += hs.assists; cxA += hs.xA; cSht += hs.shotsTotal;
               });
               
               return (
                <tr style={{ fontWeight: 'bold', background: 'rgba(255,255,255,0.05)' }}>
                  <td colSpan={2}>Carrera Total</td>
                  <td>{cGP}</td>
                  <td style={{ color: '#e67e22' }}>{cGls}</td>
                  <td style={{color: '#888'}}>{cxG.toFixed(2)}</td>
                  <td>{cAst}</td>
                  <td style={{color: '#888'}}>{cxA.toFixed(2)}</td>
                  <td>{cSht}</td>
                  <td colSpan={5}></td>
                </tr>
               );
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
