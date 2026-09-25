import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player } from '../db/db';
import { CustomModal } from '../components/common/CustomModal';

export function YouthAcademy() {
  const { leagueId } = useParams();
  const [youthPlayers, setYouthPlayers] = useState<Player[]>([]);
  const [promotingPlayer, setPromotingPlayer] = useState<Player | null>(null);

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

  const confirmPromote = async () => {
    if (!promotingPlayer) return;
    const p = promotingPlayer;
    p.lineupStatus = 'reserve';
    await db.players.put(p);
    setYouthPlayers(youthPlayers.filter(yp => yp.id !== p.id));
    setPromotingPlayer(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Filial (Youth Academy)</h1>
      </div>
      
      <p style={{color: '#94a3b8', marginBottom: '2rem'}}>
        Estos son los jugadores en desarrollo de tu equipo filial. Puedes promocionarlos al primer equipo cuando consideres que están preparados.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Pos</th>
              <th>Edad</th>
              <th>OVR</th>
              <th>POT</th>
              <th>Reclutado En</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {youthPlayers.map(p => (
              <tr key={p.id}>
                <td style={{fontWeight: 'bold'}}>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#4ade80', textDecoration: 'none'}}>
                    {p.name}
                  </Link>
                </td>
                <td>{p.position}</td>
                <td>{p.age}</td>
                <td>{p.overall}</td>
                <td style={{fontWeight: 'bold'}}>{p.potential}</td>
                <td>{p.recruitedYear ? `Temp. ${p.recruitedYear}` : '-'}</td>
                <td>
                  <button
                    onClick={() => setPromotingPlayer(p)}
                    className="tm-btn-primary"
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                  >
                    ⬆️ Promocionar al 1º Equipo
                  </button>
                </td>
              </tr>
            ))}
            {youthPlayers.length === 0 && (
              <tr><td colSpan={7} style={{textAlign: 'center', padding: '2rem'}}>Tu equipo filial no tiene canteranos en desarrollo en este momento.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {promotingPlayer && (
        <CustomModal
          isOpen={true}
          title="Promoción de Canterano"
          message={`¿Subir a ${promotingPlayer.name} (OVR ${promotingPlayer.overall} / POT ${promotingPlayer.potential}) al Primer Equipo? Pasará a estar disponible en la Plantilla.`}
          confirmText="Sí, Subir al Primer Equipo"
          cancelText="Cancelar"
          onConfirm={confirmPromote}
          onCancel={() => setPromotingPlayer(null)}
        />
      )}
    </div>
  );
}
