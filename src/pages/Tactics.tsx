import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';
import { autoSelectLineupForTeam } from '../utils/lineupUtils';
import { Shield, Sliders, Award, CheckCircle, Zap, AlertTriangle, Info, Sparkles } from 'lucide-react';
import './Tactics.css';

interface PitchSlot {
  id: string;
  top: string;
  left: string;
  label: string;
  slotType: 'POR' | 'DEF' | 'MED' | 'DEL';
}

const FORMATIONS: Record<string, PitchSlot[]> = {
  '4-3-3': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR', slotType: 'POR' },
    { id: 'LB', top: '65%', left: '15%', label: 'LI', slotType: 'DEF' },
    { id: 'CB1', top: '70%', left: '35%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB2', top: '70%', left: '65%', label: 'DFC', slotType: 'DEF' },
    { id: 'RB', top: '65%', left: '85%', label: 'LD', slotType: 'DEF' },
    { id: 'CM1', top: '45%', left: '30%', label: 'MC', slotType: 'MED' },
    { id: 'CDM', top: '50%', left: '50%', label: 'MCD', slotType: 'MED' },
    { id: 'CM2', top: '45%', left: '70%', label: 'MC', slotType: 'MED' },
    { id: 'LW', top: '25%', left: '20%', label: 'EI', slotType: 'DEL' },
    { id: 'ST', top: '15%', left: '50%', label: 'DC', slotType: 'DEL' },
    { id: 'RW', top: '25%', left: '80%', label: 'ED', slotType: 'DEL' },
  ],
  '4-4-2': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR', slotType: 'POR' },
    { id: 'LB', top: '65%', left: '15%', label: 'LI', slotType: 'DEF' },
    { id: 'CB1', top: '70%', left: '35%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB2', top: '70%', left: '65%', label: 'DFC', slotType: 'DEF' },
    { id: 'RB', top: '65%', left: '85%', label: 'LD', slotType: 'DEF' },
    { id: 'LM', top: '45%', left: '15%', label: 'MI', slotType: 'MED' },
    { id: 'CM1', top: '45%', left: '40%', label: 'MC', slotType: 'MED' },
    { id: 'CM2', top: '45%', left: '60%', label: 'MC', slotType: 'MED' },
    { id: 'RM', top: '45%', left: '85%', label: 'MD', slotType: 'MED' },
    { id: 'ST1', top: '18%', left: '38%', label: 'DC', slotType: 'DEL' },
    { id: 'ST2', top: '18%', left: '62%', label: 'DC', slotType: 'DEL' },
  ],
  '4-2-3-1': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR', slotType: 'POR' },
    { id: 'LB', top: '65%', left: '15%', label: 'LI', slotType: 'DEF' },
    { id: 'CB1', top: '70%', left: '35%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB2', top: '70%', left: '65%', label: 'DFC', slotType: 'DEF' },
    { id: 'RB', top: '65%', left: '85%', label: 'LD', slotType: 'DEF' },
    { id: 'CDM1', top: '52%', left: '38%', label: 'MCD', slotType: 'MED' },
    { id: 'CDM2', top: '52%', left: '62%', label: 'MCD', slotType: 'MED' },
    { id: 'LAM', top: '32%', left: '22%', label: 'MCO', slotType: 'MED' },
    { id: 'CAM', top: '30%', left: '50%', label: 'MCO', slotType: 'MED' },
    { id: 'RAM', top: '32%', left: '78%', label: 'MCO', slotType: 'MED' },
    { id: 'ST', top: '15%', left: '50%', label: 'DC', slotType: 'DEL' },
  ],
  '3-5-2': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR', slotType: 'POR' },
    { id: 'CB1', top: '72%', left: '25%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB2', top: '74%', left: '50%', label: 'DFC', slotType: 'DEF' },
    { id: 'CB3', top: '72%', left: '75%', label: 'DFC', slotType: 'DEF' },
    { id: 'LWB', top: '45%', left: '12%', label: 'CAD', slotType: 'DEF' },
    { id: 'CM1', top: '48%', left: '35%', label: 'MC', slotType: 'MED' },
    { id: 'CAM', top: '38%', left: '50%', label: 'MCO', slotType: 'MED' },
    { id: 'CM2', top: '48%', left: '65%', label: 'MC', slotType: 'MED' },
    { id: 'RWB', top: '45%', left: '88%', label: 'CAD', slotType: 'DEF' },
    { id: 'ST1', top: '18%', left: '38%', label: 'DC', slotType: 'DEL' },
    { id: 'ST2', top: '18%', left: '62%', label: 'DC', slotType: 'DEL' },
  ]
};

export function getPositionalPenalty(playerPos: string, slotType: 'POR' | 'DEF' | 'MED' | 'DEL', slotLabel: string): number {
  if (playerPos === slotType) {
    // Specific position sub-check for strikers on wing
    if (playerPos === 'DEL' && (slotLabel === 'EI' || slotLabel === 'ED')) return 4; // Minor penalty for pure ST on wing
    return 0;
  }
  
  if (playerPos === 'POR' || slotType === 'POR') return 40; // Extreme penalty for Goalkeeper out of net

  if (playerPos === 'DEL') {
    if (slotType === 'MED') return 10;
    if (slotType === 'DEF') return 22;
  }
  if (playerPos === 'MED') {
    if (slotType === 'DEL') return 6;
    if (slotType === 'DEF') return 12;
  }
  if (playerPos === 'DEF') {
    if (slotType === 'MED') return 8;
    if (slotType === 'DEL') return 24;
  }

  return 10;
}

export interface TacticalStyle {
  name: string;
  description: string;
  pros: string;
  cons: string;
  bestAgainst: string;
  vulnerableTo: string;
  possessionBonus: number;
}

const TACTICAL_STYLES: TacticalStyle[] = [
  {
    name: 'Tiki-Taka (Posesión)',
    description: 'Control de balón mediante pases cortos en triangulación y paciencia infinita.',
    pros: 'Alta posesión (+15%), desgasta al rival y minimiza sus llegadas.',
    cons: 'Vulnerable a contraataques verticales veloces.',
    bestAgainst: 'Autobús (Catenaccio)',
    vulnerableTo: 'Gegenpressing (Presión Alta)',
    possessionBonus: 15
  },
  {
    name: 'Gegenpressing (Presión Alta)',
    description: 'Presión asfixiante inmediata tras pérdida para ahogar la salida rival.',
    pros: 'Recuperaciones rápidas en campo contrario y ocasiones muy claras.',
    cons: 'Exige un físico impecable. Deja espacios a la espalda.',
    bestAgainst: 'Tiki-Taka (Posesión)',
    vulnerableTo: 'Contraataque Veloz',
    possessionBonus: 5
  },
  {
    name: 'Contraataque Veloz',
    description: 'Bloque defensivo replegado y salidas fulgurantes al espacio.',
    pros: 'Letal con atacantes veloces contra líneas defensivas adelantadas.',
    cons: 'Poca posesión de balón (35-40%).',
    bestAgainst: 'Gegenpressing (Presión Alta)',
    vulnerableTo: 'Autobús (Catenaccio)',
    possessionBonus: -10
  },
  {
    name: 'Autobús (Catenaccio)',
    description: 'Muralla defensiva en área propia sacrificando la posesión.',
    pros: 'Cierra todos los caminos al gol en partidos decisivos.',
    cons: 'Genera muy poco peligro en ataque.',
    bestAgainst: 'Contraataque Veloz',
    vulnerableTo: 'Tiki-Taka (Posesión)',
    possessionBonus: -20
  }
];

export function Tactics() {
  const { leagueId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeTab, setActiveTab] = useState<'pitch' | 'styles' | 'roles'>('pitch');

  const [selectedFormation, setSelectedFormation] = useState<string>('4-3-3');
  const [selectedStyle, setSelectedStyle] = useState<string>('Tiki-Taka (Posesión)');
  const [mentality, setMentality] = useState<string>('Ofensiva');
  const [pressLine, setPressLine] = useState<string>('Alta');
  const [passingTempo, setPassingTempo] = useState<string>('Corto');

  // Role assignments
  const [captainId, setCaptainId] = useState<number | null>(null);
  const [penaltyTakerId, setPenaltyTakerId] = useState<number | null>(null);
  const [freeKickTakerId, setFreeKickTakerId] = useState<number | null>(null);

  const [draggedPlayerId, setDraggedPlayerId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if (l && l.userTeamId) {
        const uTeam = await db.teams.get(l.userTeamId);
        setTeam(uTeam || null);

        const p = await db.players.where('teamId').equals(l.userTeamId).toArray();
        setPlayers(p);

        if (p.length > 0) {
          const sorted = [...p].sort((a, b) => b.overall - a.overall);
          setCaptainId(sorted[0].id || null);
          setPenaltyTakerId(sorted[0].id || null);
          setFreeKickTakerId(sorted[1]?.id || sorted[0].id || null);
        }
      }
    }
    load();
  }, [leagueId]);

  const currentSlots = FORMATIONS[selectedFormation] || FORMATIONS['4-3-3'];
  const starters = players.filter(p => p.lineupStatus === 'starter');
  const bench = players.filter(p => p.lineupStatus !== 'starter');

  // Calculate effective team overall taking positional penalties into account (Task 5)
  let totalEffectiveOvr = 0;
  let starterCount = 0;

  starters.forEach(p => {
    const slot = currentSlots.find(s => s.id === p.pitchPosition);
    const penalty = slot ? getPositionalPenalty(p.position, slot.slotType, slot.label) : 0;
    totalEffectiveOvr += Math.max(35, p.overall - penalty);
    starterCount++;
  });

  const effectiveTeamOvr = starterCount > 0 ? Math.round(totalEffectiveOvr / starterCount) : (team?.overall || 75);

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

  const handleSaveTacticalStyle = async (styleName: string) => {
    setSelectedStyle(styleName);
    if (team) {
      team.overall = effectiveTeamOvr;
      await db.teams.put(team);
    }
  };

  const handleAutoLineup = async () => {
    if (!team) return;
    const updated = await autoSelectLineupForTeam(team.id!);
    setPlayers([...updated]);
    alert('⚡ ¡Alineación de 11 titulares configurada automáticamente con los mejores jugadores!');
  };

  return (
    <div className="page-container tactics-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Sistema Táctico & Pizarra de Estrategia</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Configura la alineación titular, esquemas tácticos, penalizaciones por posición y lanzadores.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="tm-btn-primary" onClick={handleAutoLineup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#3b82f6', padding: '0.6rem 1.2rem', fontWeight: 'bold' }}>
            <Sparkles size={16} /> Auto-Alinear (11 Titulares)
          </button>
          {team && (
            <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Shield color="#38bdf8" size={20} />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Media Ajustada Once:</span>
                <strong style={{ color: effectiveTeamOvr < team.overall ? '#ef4444' : '#10b981', fontSize: '1.1rem' }}>
                  {effectiveTeamOvr} OVR {effectiveTeamOvr < team.overall ? `( Penalización Táctica )` : ''}
                </strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="tm-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`tm-tab ${activeTab === 'pitch' ? 'active' : ''}`}
          onClick={() => setActiveTab('pitch')}
        >
          <Sliders size={16} /> Alineación & Campo (Penalizaciones)
        </button>
        <button
          className={`tm-tab ${activeTab === 'styles' ? 'active' : ''}`}
          onClick={() => setActiveTab('styles')}
        >
          <Zap size={16} /> Estilos Tácticos & Matriz de Contras
        </button>
        <button
          className={`tm-tab ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <Award size={16} /> Especialistas & Capitán
        </button>
      </div>

      {activeTab === 'pitch' && (
        <div className="tactics-pitch-layout">
          {/* Pitch Container */}
          <div className="tactics-pitch-container glass-panel">
            <div className="formation-bar">
              <span style={{ fontWeight: 'bold' }}>Esquema Táctico:</span>
              <select
                value={selectedFormation}
                onChange={e => setSelectedFormation(e.target.value)}
                className="bb-select"
              >
                {Object.keys(FORMATIONS).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div className="football-pitch">
              {currentSlots.map(slot => {
                const occupant = starters.find(p => p.pitchPosition === slot.id);
                const penalty = occupant ? getPositionalPenalty(occupant.position, slot.slotType, slot.label) : 0;
                const effectiveOvr = occupant ? Math.max(35, occupant.overall - penalty) : 0;

                return (
                  <div
                    key={slot.id}
                    className="pitch-slot"
                    style={{ top: slot.top, left: slot.left }}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => handleDropToPitch(e, slot.id)}
                  >
                    <div className="slot-label">{slot.label}</div>
                    {occupant ? (
                      <div
                        className={`player-token ${penalty > 0 ? 'out-of-position' : ''}`}
                        draggable
                        onDragStart={e => handleDragStart(e, occupant.id!)}
                      >
                        <div className="token-ovr">
                          {effectiveOvr}
                          {penalty > 0 && <AlertTriangle size={10} color="#ef4444" style={{ marginLeft: 2 }} />}
                        </div>
                        <div className="token-name">{occupant.name.split(' ').pop()}</div>
                        {penalty > 0 && <span className="penalty-tag">-{penalty}</span>}
                      </div>
                    ) : (
                      <div className="slot-empty">+ Arrastrar</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Squad Bench */}
          <div
            className="tactics-squad-container glass-panel"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDropToBench}
          >
            <div className="squad-header">
              <h3>Banquillo y Suplentes ({bench.length})</h3>
              <span className="drag-hint">Arrastra un jugador a una posición</span>
            </div>

            <div className="table-responsive">
              <table className="dash-table squad-table">
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Nombre</th>
                    <th>OVR</th>
                    <th>POT</th>
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
                      <td className="col-pos">{p.position}</td>
                      <td style={{ color: '#ffffff', fontWeight: 'bold' }}>{p.name}</td>
                      <td className="col-ovr">{p.overall}</td>
                      <td className="col-pot">{p.potential}</td>
                    </tr>
                  ))}
                  {bench.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No hay suplentes en la banca</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'styles' && (
        <div className="styles-layout">
          <div className="styles-grid">
            {TACTICAL_STYLES.map(st => (
              <div
                key={st.name}
                className={`style-card glass-panel ${selectedStyle === st.name ? 'selected' : ''}`}
                onClick={() => handleSaveTacticalStyle(st.name)}
              >
                <div className="style-header">
                  <h3>{st.name}</h3>
                  {selectedStyle === st.name && <CheckCircle color="#10b981" size={20} />}
                </div>
                <p className="style-desc">{st.description}</p>
                
                <div className="style-matrix-box">
                  <span className="matrix-item beat">⚡ Efectivo contra: <strong>{st.bestAgainst}</strong></span>
                  <span className="matrix-item weak">⚠️ Vulnerable ante: <strong>{st.vulnerableTo}</strong></span>
                </div>

                <div className="style-pros-cons">
                  <span className="pro">✔️ {st.pros}</span>
                  <span className="con">⚠️ {st.cons}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel instructions-panel">
            <h3>Instrucciones de Juego Avanzadas</h3>
            <div className="inst-grid">
              <div className="form-group">
                <label>Mentalidad Colectiva:</label>
                <select value={mentality} onChange={e => setMentality(e.target.value)} className="bb-select">
                  <option value="Ultra-Defensiva">Ultra-Defensiva</option>
                  <option value="Defensiva">Defensiva</option>
                  <option value="Equilibrada">Equilibrada</option>
                  <option value="Ofensiva">Ofensiva</option>
                  <option value="Ataque Total">Ataque Total</option>
                </select>
              </div>

              <div className="form-group">
                <label>Línea de Presión Defensiva:</label>
                <select value={pressLine} onChange={e => setPressLine(e.target.value)} className="bb-select">
                  <option value="Bloque Bajo">Bloque Bajo (Esperar)</option>
                  <option value="Media">Media Distancia</option>
                  <option value="Alta">Presión Alta (Gegenpress)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ritmo de Pase:</label>
                <select value={passingTempo} onChange={e => setPassingTempo(e.target.value)} className="bb-select">
                  <option value="Corto">Corto y Paciente</option>
                  <option value="Mixto">Mixto</option>
                  <option value="Directo">Directo y Rápido</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="roles-layout glass-panel">
          <h3>Asignación de Especialistas & Capitanes</h3>
          <p style={{ color: '#94a3b8' }}>Elige los líderes del equipo para partidos oficiales.</p>

          <div className="roles-grid">
            <div className="form-group">
              <label>Capitán del Equipo:</label>
              <select
                value={captainId || ''}
                onChange={e => setCaptainId(Number(e.target.value))}
                className="bb-select"
              >
                {players.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (OVR {p.overall} - {p.position})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Lanzador Principal de Penaltis:</label>
              <select
                value={penaltyTakerId || ''}
                onChange={e => setPenaltyTakerId(Number(e.target.value))}
                className="bb-select"
              >
                {players.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (OVR {p.overall} - {p.position})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Lanzador de Faltas Directas:</label>
              <select
                value={freeKickTakerId || ''}
                onChange={e => setFreeKickTakerId(Number(e.target.value))}
                className="bb-select"
              >
                {players.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (OVR {p.overall} - {p.position})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
