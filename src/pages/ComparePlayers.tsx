import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player } from '../db/db';

export function ComparePlayers() {
  const { leagueId } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [player1Id, setPlayer1Id] = useState<number | ''>('');
  const [player2Id, setPlayer2Id] = useState<number | ''>('');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      setPlayers(allPlayers.sort((a,b) => a.name.localeCompare(b.name)));
    }
    load();
  }, [leagueId]);

  const p1 = players.find(p => p.id === player1Id);
  const p2 = players.find(p => p.id === player2Id);

  const StatRow = ({ label, val1, val2, higherIsBetter = true }: { label: string, val1: number, val2: number, higherIsBetter?: boolean }) => {
    const p1Better = higherIsBetter ? val1 > val2 : val1 < val2;
    const p2Better = higherIsBetter ? val2 > val1 : val2 < val1;
    
    return (
      <tr style={{borderBottom: '1px solid #333'}}>
        <td style={{textAlign: 'center', width: '40%', color: p1Better ? '#4ade80' : 'inherit', fontWeight: p1Better ? 'bold' : 'normal'}}>{val1}</td>
        <td style={{textAlign: 'center', width: '20%', fontWeight: 'bold', background: '#111', fontSize: '12px'}}>{label}</td>
        <td style={{textAlign: 'center', width: '40%', color: p2Better ? '#4ade80' : 'inherit', fontWeight: p2Better ? 'bold' : 'normal'}}>{val2}</td>
      </tr>
    );
  };

  const TextRow = ({ label, val1, val2 }: { label: string, val1: string | number, val2: string | number }) => (
    <tr style={{borderBottom: '1px solid #333'}}>
      <td style={{textAlign: 'center', width: '40%'}}>{val1}</td>
      <td style={{textAlign: 'center', width: '20%', fontWeight: 'bold', background: '#111', fontSize: '12px'}}>{label}</td>
      <td style={{textAlign: 'center', width: '40%'}}>{val2}</td>
    </tr>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Comparar Jugadores</h1>
      </div>
      
      <div style={{display: 'flex', gap: '2rem', marginBottom: '3rem'}}>
        <div style={{flex: 1}}>
          <select 
            value={player1Id} 
            onChange={e => setPlayer1Id(e.target.value ? Number(e.target.value) : '')}
            style={{width: '100%', padding: '8px', background: '#1a1a2e', color: 'white', border: '1px solid #444', borderRadius: '4px'}}
          >
            <option value="">-- Selecciona Jugador 1 --</option>
            {players.map(p => (
              <option key={p.id} value={p.id}>{p.name} (OVR: {p.overall})</option>
            ))}
          </select>
        </div>
        <div style={{flex: 1}}>
          <select 
            value={player2Id} 
            onChange={e => setPlayer2Id(e.target.value ? Number(e.target.value) : '')}
            style={{width: '100%', padding: '8px', background: '#1a1a2e', color: 'white', border: '1px solid #444', borderRadius: '4px'}}
          >
            <option value="">-- Selecciona Jugador 2 --</option>
            {players.map(p => (
              <option key={p.id} value={p.id}>{p.name} (OVR: {p.overall})</option>
            ))}
          </select>
        </div>
      </div>

      {(p1 || p2) && (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '100%', maxWidth: '800px', background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden'}}>
            
            {/* Cabeceras (Siluetas/Nombres) */}
            <div style={{display: 'flex', padding: '2rem 0', background: '#111', borderBottom: '2px solid #e67e22'}}>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
                <div style={{width: '120px', height: '150px', background: '#222', borderRadius: '60px 60px 0 0', border: '2px solid #444', marginBottom: '1rem'}}></div>
                <h3 style={{margin: 0, color: '#e67e22'}}>{p1 ? p1.name : '-'}</h3>
                <small style={{color: '#888'}}>{p1 ? 'Activo' : ''}</small>
              </div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
                <div style={{width: '120px', height: '150px', background: '#222', borderRadius: '60px 60px 0 0', border: '2px solid #444', marginBottom: '1rem'}}></div>
                <h3 style={{margin: 0, color: '#e67e22'}}>{p2 ? p2.name : '-'}</h3>
                <small style={{color: '#888'}}>{p2 ? 'Activo' : ''}</small>
              </div>
            </div>

            {/* Tabla Comparativa Horizontal */}
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <tbody>
                <tr>
                  <td colSpan={3} style={{background: '#0f0f1a', padding: '8px', fontWeight: 'bold', fontSize: '12px', color: '#888'}}>
                    <span style={{marginRight: '4px'}}>▼</span> BIO
                  </td>
                </tr>
                <TextRow label="Age" val1={p1 ? p1.age : '-'} val2={p2 ? p2.age : '-'} />
                <TextRow label="Pos" val1={p1 ? p1.position : '-'} val2={p2 ? p2.position : '-'} />
                <TextRow label="Salary" val1={p1 ? `$${(p1.contract/1000000).toFixed(2)}M` : '-'} val2={p2 ? `$${(p2.contract/1000000).toFixed(2)}M` : '-'} />

                <tr>
                  <td colSpan={3} style={{background: '#0f0f1a', padding: '8px', fontWeight: 'bold', fontSize: '12px', color: '#888'}}>
                    <span style={{marginRight: '4px'}}>▼</span> RATINGS
                  </td>
                </tr>
                <StatRow label="OVR" val1={p1 ? p1.overall : 0} val2={p2 ? p2.overall : 0} />
                <StatRow label="POT" val1={p1 ? p1.potential : 0} val2={p2 ? p2.potential : 0} />
                
                <tr>
                  <td colSpan={3} style={{background: '#0f0f1a', padding: '8px', fontWeight: 'bold', fontSize: '12px', color: '#888'}}>
                    <span style={{marginRight: '4px'}}>▼</span> STATS (Temporada)
                  </td>
                </tr>
                <StatRow label="Goals" val1={p1?.stats?.goals || 0} val2={p2?.stats?.goals || 0} />
                <StatRow label="Assists" val1={p1?.stats?.assists || 0} val2={p2?.stats?.assists || 0} />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
