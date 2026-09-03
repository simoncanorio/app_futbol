import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';

export function Trades() {
  const { leagueId } = useParams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | ''>('');
  const [roster, setRoster] = useState<Player[]>([]);
  
  // Modal state
  const [negotiatingPlayer, setNegotiatingPlayer] = useState<Player | null>(null);
  const [offerAmount, setOfferAmount] = useState(0);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      
      const l = await db.leagues.get(lid);
      // Filter out user's own team
      if(l && l.userTeamId) {
        setTeams(allTeams.filter(t => t.id !== l.userTeamId));
      } else {
        setTeams(allTeams);
      }
    }
    load();
  }, [leagueId]);

  useEffect(() => {
    async function loadRoster() {
      if(selectedTeamId === '') {
        setRoster([]);
        return;
      }
      const p = await db.players.where('teamId').equals(Number(selectedTeamId)).toArray();
      setRoster(p.sort((a,b) => b.overall - a.overall));
    }
    loadRoster();
  }, [selectedTeamId]);

  const handleNegotiate = (p: Player) => {
    setNegotiatingPlayer(p);
    setOfferAmount(p.contract); // Default offer is their value
  };

  const handlePropose = () => {
    if(!negotiatingPlayer) return;
    
    // Simplificación: Acepta si ofreces más del 120% de su contrato (valor)
    const required = negotiatingPlayer.contract * 1.2;
    if(offerAmount >= required) {
      alert(`¡Oferta aceptada! El club ha aceptado vender a ${negotiatingPlayer.name}. (Funcionalidad de traspaso completa pendiente en MVP)`);
    } else {
      alert(`Oferta rechazada. El club considera que la oferta por ${negotiatingPlayer.name} es insuficiente.`);
    }
    setNegotiatingPlayer(null);
  };

  return (
    <div className="page-container relative">
      <div className="page-header">
        <h1>Transferencias (Traspasos)</h1>
      </div>
      
      <div className="glass-panel" style={{marginBottom: '2rem'}}>
        <label style={{marginRight: '1rem', fontWeight: 'bold'}}>Buscar Equipo: </label>
        <select 
          value={selectedTeamId} 
          onChange={e => setSelectedTeamId(e.target.value ? Number(e.target.value) : '')}
          style={{padding: '8px', background: '#1a1a2e', color: 'white', border: '1px solid #444', borderRadius: '4px', minWidth: '250px'}}
        >
          <option value="">-- Selecciona un equipo --</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {selectedTeamId !== '' && (
        <div className="standings-content" style={{overflowX: 'auto'}}>
          <table className="table-container bb-table">
            <thead>
              <tr>
                <th>Age</th>
                <th>Name</th>
                <th>Position</th>
                <th>OVR</th>
                <th>POT</th>
                <th>Transfer Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roster.map(p => (
                <tr key={p.id}>
                  <td>{p.age}</td>
                  <td style={{fontWeight: 'bold', color: '#3b82f6'}}>{p.name}</td>
                  <td>{p.position}</td>
                  <td>{p.overall}</td>
                  <td>{p.potential}</td>
                  <td>${(p.contract / 1000000).toFixed(2)}M</td>
                  <td>
                    <button onClick={() => handleNegotiate(p)} style={{background: 'transparent', color: '#aaa', border: '1px solid #444', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer'}}>
                      Negotiate
                    </button>
                  </td>
                </tr>
              ))}
              {roster.length === 0 && (
                <tr><td colSpan={7} style={{textAlign: 'center', padding: '2rem'}}>Sin jugadores.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Negociación */}
      {negotiatingPlayer && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
          <div style={{background: '#1a1a2e', border: '1px solid #444', borderRadius: '8px', padding: '2rem', width: '400px'}}>
            <h2>Negociar por {negotiatingPlayer.name}</h2>
            <p style={{fontSize: '14px', color: '#ccc', marginBottom: '1rem'}}>
              Valor estimado: ${(negotiatingPlayer.contract/1000000).toFixed(2)}M
            </p>
            
            <div style={{marginBottom: '2rem'}}>
              <label style={{display: 'block', marginBottom: '8px'}}>Tu oferta económica ($):</label>
              <input 
                type="number" 
                value={offerAmount} 
                onChange={e => setOfferAmount(Number(e.target.value))}
                style={{width: '100%', padding: '8px', background: '#0f0f1a', color: 'white', border: '1px solid #444', borderRadius: '4px'}}
              />
            </div>
            
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
              <button onClick={() => setNegotiatingPlayer(null)} style={{background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer'}}>Cancelar</button>
              <button onClick={handlePropose} style={{background: '#e67e22', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>Proponer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
