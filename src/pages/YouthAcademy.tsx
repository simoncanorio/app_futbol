import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player } from '../db/db';

export function YouthAcademy() {
  const { leagueId } = useParams();
  const [youthPlayers, setYouthPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l || !l.userTeamId) return;
      
      const p = await db.players.where('teamId').equals(l.userTeamId).toArray();
      // Filtrar los del filial
      const youth = p.filter(player => player.lineupStatus === 'youth');
      setYouthPlayers(youth.sort((a, b) => b.potential - a.potential));
    }
    load();
  }, [leagueId]);

  const handlePromote = async (p: Player) => {
    if(window.confirm(`¿Subir a ${p.name} al Primer Equipo?`)) {
      p.lineupStatus = 'reserve';
      await db.players.put(p);
      setYouthPlayers(youthPlayers.filter(yp => yp.id !== p.id));
      alert(`${p.name} ahora es parte del Primer Equipo y lo encontrarás en la Plantilla.`);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Filial (Youth Academy)</h1>
      </div>
      
      <p style={{color: '#ccc', marginBottom: '2rem'}}>
        Estos son los jugadores en desarrollo de tu equipo filial. Puedes subir a los jugadores al primer equipo cuando consideres que están listos.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Pos</th>
              <th>Age</th>
              <th>OVR</th>
              <th>POT</th>
              <th>Reclutado En</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {youthPlayers.map(p => (
              <tr key={p.id}>
                <td style={{fontWeight: 'bold', color: '#4ade80'}}>{p.name}</td>
                <td>{p.position}</td>
                <td>{p.age}</td>
                <td>{p.overall}</td>
                <td style={{fontWeight: 'bold'}}>{p.potential}</td>
                <td>{p.recruitedYear ? `Temp. ${p.recruitedYear}` : '-'}</td>
                <td>
                  <button onClick={() => handlePromote(p)} style={{background: 'transparent', color: '#aaa', border: '1px solid #444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px'}}>
                    Subir al Primer Equipo
                  </button>
                </td>
              </tr>
            ))}
            {youthPlayers.length === 0 && (
              <tr><td colSpan={7} style={{textAlign: 'center', padding: '2rem'}}>Tu filial está vacío. Visita el Draft de Canteranos.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
