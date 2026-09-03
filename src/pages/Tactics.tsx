import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player } from '../db/db';
import './Tactics.css';

interface PitchSlot {
  id: string;
  top: string;
  left: string;
  label: string;
}

const FORMATION_433: PitchSlot[] = [
  { id: 'GK', top: '85%', left: '50%', label: 'GK' },
  { id: 'LB', top: '65%', left: '15%', label: 'LB' },
  { id: 'CB1', top: '70%', left: '35%', label: 'CB' },
  { id: 'CB2', top: '70%', left: '65%', label: 'CB' },
  { id: 'RB', top: '65%', left: '85%', label: 'RB' },
  { id: 'CM1', top: '45%', left: '30%', label: 'CM' },
  { id: 'CDM', top: '50%', left: '50%', label: 'CDM' },
  { id: 'CM2', top: '45%', left: '70%', label: 'CM' },
  { id: 'LW', top: '25%', left: '20%', label: 'LW' },
  { id: 'ST', top: '15%', left: '50%', label: 'ST' },
  { id: 'RW', top: '25%', left: '80%', label: 'RW' },
];

export function Tactics() {
  const { leagueId } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [draggedPlayerId, setDraggedPlayerId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if (l && l.userTeamId) {
        const p = await db.players.where('teamId').equals(l.userTeamId).toArray();
        setPlayers(p);
      }
    }
    load();
  }, [leagueId]);

  const starters = players.filter(p => p.lineupStatus === 'starter');
  const bench = players.filter(p => p.lineupStatus !== 'starter');

  const handleDragStart = (e: React.DragEvent, playerId: number) => {
    setDraggedPlayerId(playerId);
    e.dataTransfer.setData('playerId', playerId.toString());
  };

  const handleDropToPitch = async (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    if (!draggedPlayerId) return;

    const newPlayers = [...players];
    const draggedPlayer = newPlayers.find(p => p.id === draggedPlayerId);
    if (!draggedPlayer) return;

    // Si ya hay alguien en el slot, mandarlo al banquillo
    const existingPlayer = newPlayers.find(p => p.lineupStatus === 'starter' && p.pitchPosition === slotId);
    
    if (existingPlayer) {
      existingPlayer.lineupStatus = 'bench';
      existingPlayer.pitchPosition = undefined;
      await db.players.put(existingPlayer);
    }

    draggedPlayer.lineupStatus = 'starter';
    draggedPlayer.pitchPosition = slotId;
    await db.players.put(draggedPlayer);

    setPlayers(newPlayers);
    setDraggedPlayerId(null);
  };

  const handleDropToBench = async (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedPlayerId) return;

    const newPlayers = [...players];
    const draggedPlayer = newPlayers.find(p => p.id === draggedPlayerId);
    if (!draggedPlayer) return;

    draggedPlayer.lineupStatus = 'bench';
    draggedPlayer.pitchPosition = undefined;
    await db.players.put(draggedPlayer);

    setPlayers(newPlayers);
    setDraggedPlayerId(null);
  };

  return (
    <div className="page-container tactics-page">
      <div className="page-header">
        <h1>Tácticas</h1>
      </div>

      <div className="tactics-layout">
        <div className="tactics-pitch-container">
          <div className="football-pitch">
            {FORMATION_433.map(slot => {
              const occupant = starters.find(p => p.pitchPosition === slot.id);
              return (
                <div 
                  key={slot.id} 
                  className="pitch-slot"
                  style={{ top: slot.top, left: slot.left }}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => handleDropToPitch(e, slot.id)}
                >
                  <div className="slot-label">{slot.label}</div>
                  {occupant && (
                    <div 
                      className="player-token"
                      draggable
                      onDragStart={e => handleDragStart(e, occupant.id!)}
                    >
                      <div className="token-ovr">{occupant.overall}</div>
                      <div className="token-name">{occupant.name.split(' ').pop()}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="tactics-squad-container" onDragOver={e => e.preventDefault()} onDrop={handleDropToBench}>
          <div className="squad-header">
            <h3>Banquillo y Reservas</h3>
            <span className="drag-hint">Arrastra para mover</span>
          </div>
          
          <table className="table-container squad-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Nombre</th>
                <th>OVR</th>
              </tr>
            </thead>
            <tbody>
              {bench.map(p => (
                <tr 
                  key={p.id}
                  draggable
                  onDragStart={e => handleDragStart(e, p.id!)}
                  className="draggable-row"
                >
                  <td style={{fontWeight:'bold'}}>{p.position}</td>
                  <td>{p.name}</td>
                  <td><strong>{p.overall}</strong></td>
                </tr>
              ))}
              {bench.length === 0 && (
                <tr>
                  <td colSpan={3} style={{textAlign:'center'}}>No hay suplentes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
