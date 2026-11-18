import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, formatMoney } from '../db/db';
import { PlayerAvatar } from '../components/common/PlayerAvatar';
import { calculatePlayerMarketValue } from '../engine/valuationEngine';

export function ComparePlayers() {
  const { leagueId } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [player1Id, setPlayer1Id] = useState<number | ''>('');
  const [player2Id, setPlayer2Id] = useState<number | ''>('');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      setPlayers(allPlayers.sort((a,b) => b.overall - a.overall || a.name.localeCompare(b.name)));
    }
    load();
  }, [leagueId]);

  const p1 = players.find(p => p.id === player1Id);
  const p2 = players.find(p => p.id === player2Id);

  const StatRow = ({ label, val1, val2, higherIsBetter = true, isFloat = false }: { label: string, val1: number, val2: number, higherIsBetter?: boolean, isFloat?: boolean }) => {
    const p1Better = higherIsBetter ? val1 > val2 : val1 < val2;
    const p2Better = higherIsBetter ? val2 > val1 : val2 < val1;
    
    return (
      <tr style={{borderBottom: '1px solid #333'}}>
        <td style={{textAlign: 'center', width: '40%', padding: '6px 0', color: p1Better ? '#4ade80' : 'inherit', fontWeight: p1Better ? 'bold' : 'normal'}}>{isFloat ? val1.toFixed(1) : val1}</td>
        <td style={{textAlign: 'center', width: '20%', padding: '6px 0', fontWeight: 'bold', background: '#111', fontSize: '12px'}}>{label}</td>
        <td style={{textAlign: 'center', width: '40%', padding: '6px 0', color: p2Better ? '#4ade80' : 'inherit', fontWeight: p2Better ? 'bold' : 'normal'}}>{isFloat ? val2.toFixed(1) : val2}</td>
      </tr>
    );
  };

  const TextRow = ({ label, val1, val2 }: { label: string, val1: string | number, val2: string | number }) => (
    <tr style={{borderBottom: '1px solid #333'}}>
      <td style={{textAlign: 'center', width: '40%', padding: '6px 0'}}>{val1}</td>
      <td style={{textAlign: 'center', width: '20%', padding: '6px 0', fontWeight: 'bold', background: '#111', fontSize: '12px'}}>{label}</td>
      <td style={{textAlign: 'center', width: '40%', padding: '6px 0'}}>{val2}</td>
    </tr>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Comparar Jugadores</h1>
      </div>
      
      <div style={{display: 'flex', gap: '2rem', marginBottom: '2rem'}}>
        <div style={{flex: 1}}>
          <select 
            value={player1Id} 
            onChange={e => setPlayer1Id(e.target.value ? Number(e.target.value) : '')}
            style={{width: '100%', padding: '10px', background: '#1a1a2e', color: 'white', border: '1px solid #444', borderRadius: '6px'}}
          >
            <option value="">-- Selecciona Jugador 1 --</option>
            {players.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.specificPosition || p.position} · OVR {p.overall})</option>
            ))}
          </select>
        </div>
        <div style={{flex: 1}}>
          <select 
            value={player2Id} 
            onChange={e => setPlayer2Id(e.target.value ? Number(e.target.value) : '')}
            style={{width: '100%', padding: '10px', background: '#1a1a2e', color: 'white', border: '1px solid #444', borderRadius: '6px'}}
          >
            <option value="">-- Selecciona Jugador 2 --</option>
            {players.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.specificPosition || p.position} · OVR {p.overall})</option>
            ))}
          </select>
        </div>
      </div>

      {(p1 || p2) && (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '100%', maxWidth: '860px', background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden'}}>
            
            {/* Cabeceras (Siluetas/Nombres) */}
            <div style={{display: 'flex', padding: '1.8rem 0', background: '#111', borderBottom: '2px solid #e67e22'}}>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
                {p1 ? (
                  <div style={{ marginBottom: '0.8rem' }}><PlayerAvatar player={p1} size={90} /></div>
                ) : (
                  <div style={{width: '90px', height: '90px', background: '#222', borderRadius: '50%', border: '2px solid #444', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666'}}>?</div>
                )}
                <h3 style={{margin: 0, color: '#e67e22'}}>{p1 ? p1.name : '-'}</h3>
                <small style={{color: '#94a3b8'}}>{p1 ? `${p1.specificPosition || p1.position} · ${p1.bio?.country || 'INT'}` : ''}</small>
              </div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
                {p2 ? (
                  <div style={{ marginBottom: '0.8rem' }}><PlayerAvatar player={p2} size={90} /></div>
                ) : (
                  <div style={{width: '90px', height: '90px', background: '#222', borderRadius: '50%', border: '2px solid #444', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666'}}>?</div>
                )}
                <h3 style={{margin: 0, color: '#e67e22'}}>{p2 ? p2.name : '-'}</h3>
                <small style={{color: '#94a3b8'}}>{p2 ? `${p2.specificPosition || p2.position} · ${p2.bio?.country || 'INT'}` : ''}</small>
              </div>
            </div>

            {/* Tabla Comparativa Horizontal */}
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <tbody>
                <tr>
                  <td colSpan={3} style={{background: '#0f0f1a', padding: '8px', fontWeight: 'bold', fontSize: '12px', color: '#38bdf8'}}>
                    ▼ PERFIL & VALORACIÓN DE MERCADO
                  </td>
                </tr>
                <TextRow label="Edad" val1={p1 ? p1.age : '-'} val2={p2 ? p2.age : '-'} />
                <TextRow label="Posición" val1={p1 ? (p1.specificPosition || p1.position) : '-'} val2={p2 ? (p2.specificPosition || p2.position) : '-'} />
                <TextRow label="Valor Mercado" val1={p1 ? formatMoney(calculatePlayerMarketValue(p1)) : '-'} val2={p2 ? formatMoney(calculatePlayerMarketValue(p2)) : '-'} />
                <TextRow label="Salario Anual" val1={p1 ? `${formatMoney(p1.contract)}/año` : '-'} val2={p2 ? `${formatMoney(p2.contract)}/año` : '-'} />
                <TextRow label="Pie / Pierna Mala" val1={p1 ? `${p1.bio?.preferredFoot || 'Right'} (${p1.bio?.weakFoot || 3}★)` : '-'} val2={p2 ? `${p2.bio?.preferredFoot || 'Right'} (${p2.bio?.weakFoot || 3}★)` : '-'} />

                <tr>
                  <td colSpan={3} style={{background: '#0f0f1a', padding: '8px', fontWeight: 'bold', fontSize: '12px', color: '#f59e0b'}}>
                    ▼ VALORACIÓN & ATRIBUTOS BASE (EA FC 26)
                  </td>
                </tr>
                <StatRow label="OVR (Media)" val1={p1 ? p1.overall : 0} val2={p2 ? p2.overall : 0} />
                <StatRow label="POT (Potencial)" val1={p1 ? p1.potential : 0} val2={p2 ? p2.potential : 0} />
                <StatRow label="PAC (Ritmo)" val1={p1?.attributes?.pace || 0} val2={p2?.attributes?.pace || 0} />
                <StatRow label="SHO (Tiro)" val1={p1?.attributes?.shooting || 0} val2={p2?.attributes?.shooting || 0} />
                <StatRow label="PAS (Pase)" val1={p1?.attributes?.passing || 0} val2={p2?.attributes?.passing || 0} />
                <StatRow label="DRI (Regate)" val1={p1?.attributes?.dribbling || 0} val2={p2?.attributes?.dribbling || 0} />
                <StatRow label="DEF (Defensa)" val1={p1?.attributes?.defending || 0} val2={p2?.attributes?.defending || 0} />
                <StatRow label="PHY (Físico)" val1={p1?.attributes?.physical || 0} val2={p2?.attributes?.physical || 0} />

                <tr>
                  <td colSpan={3} style={{background: '#0f0f1a', padding: '8px', fontWeight: 'bold', fontSize: '12px', color: '#a855f7'}}>
                    ▼ SUB-ATRIBUTOS TÉCNICOS CLAVE
                  </td>
                </tr>
                <StatRow label="Definición" val1={p1?.detailedAttributes?.finishing || 0} val2={p2?.detailedAttributes?.finishing || 0} />
                <StatRow label="Visión" val1={p1?.detailedAttributes?.vision || 0} val2={p2?.detailedAttributes?.vision || 0} />
                <StatRow label="Pase Corto" val1={p1?.detailedAttributes?.shortPassing || 0} val2={p2?.detailedAttributes?.shortPassing || 0} />
                <StatRow label="Control Balón" val1={p1?.detailedAttributes?.ballControl || 0} val2={p2?.detailedAttributes?.ballControl || 0} />
                <StatRow label="Entrada Limpia" val1={p1?.detailedAttributes?.standingTackle || 0} val2={p2?.detailedAttributes?.standingTackle || 0} />
                <StatRow label="Resistencia" val1={p1?.detailedAttributes?.stamina || 0} val2={p2?.detailedAttributes?.stamina || 0} />
                
                <tr>
                  <td colSpan={3} style={{background: '#0f0f1a', padding: '8px', fontWeight: 'bold', fontSize: '12px', color: '#10b981'}}>
                    ▼ ESTADÍSTICAS AVANZADAS (TEMPORADA)
                  </td>
                </tr>
                <StatRow label="Partidos (PJ)" val1={p1?.stats?.gamesPlayed || 0} val2={p2?.stats?.gamesPlayed || 0} />
                <StatRow label="Goles" val1={p1?.stats?.goals || 0} val2={p2?.stats?.goals || 0} />
                <StatRow label="Expected Goals (xG)" val1={p1?.stats?.xG || 0} val2={p2?.stats?.xG || 0} isFloat />
                <StatRow label="Asistencias" val1={p1?.stats?.assists || 0} val2={p2?.stats?.assists || 0} />
                <StatRow label="Expected Assists (xA)" val1={p1?.stats?.xA || 0} val2={p2?.stats?.xA || 0} isFloat />
                <StatRow label="Pases Clave" val1={p1?.stats?.keyPasses || 0} val2={p2?.stats?.keyPasses || 0} />
                <StatRow label="Regates Exitosos" val1={p1?.stats?.dribblesCompleted || 0} val2={p2?.stats?.dribblesCompleted || 0} />
                <StatRow label="Entradas + Intercep." val1={(p1?.stats?.tackles || 0) + (p1?.stats?.interceptions || 0)} val2={(p2?.stats?.tackles || 0) + (p2?.stats?.interceptions || 0)} />
                <StatRow label="Nota Media" val1={p1?.stats?.averageRating || 0} val2={p2?.stats?.averageRating || 0} isFloat />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
