import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';
import { Shield, Settings, Sliders, Award, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import './Tactics.css';

interface PitchSlot {
  id: string;
  top: string;
  left: string;
  label: string;
}

const FORMATIONS: Record<string, PitchSlot[]> = {
  '4-3-3': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR' },
    { id: 'LB', top: '65%', left: '15%', label: 'LI' },
    { id: 'CB1', top: '70%', left: '35%', label: 'DFC' },
    { id: 'CB2', top: '70%', left: '65%', label: 'DFC' },
    { id: 'RB', top: '65%', left: '85%', label: 'LD' },
    { id: 'CM1', top: '45%', left: '30%', label: 'MC' },
    { id: 'CDM', top: '50%', left: '50%', label: 'MCD' },
    { id: 'CM2', top: '45%', left: '70%', label: 'MC' },
    { id: 'LW', top: '25%', left: '20%', label: 'EI' },
    { id: 'ST', top: '15%', left: '50%', label: 'DC' },
    { id: 'RW', top: '25%', left: '80%', label: 'ED' },
  ],
  '4-4-2': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR' },
    { id: 'LB', top: '65%', left: '15%', label: 'LI' },
    { id: 'CB1', top: '70%', left: '35%', label: 'DFC' },
    { id: 'CB2', top: '70%', left: '65%', label: 'DFC' },
    { id: 'RB', top: '65%', left: '85%', label: 'LD' },
    { id: 'LM', top: '45%', left: '15%', label: 'MI' },
    { id: 'CM1', top: '45%', left: '40%', label: 'MC' },
    { id: 'CM2', top: '45%', left: '60%', label: 'MC' },
    { id: 'RM', top: '45%', left: '85%', label: 'MD' },
    { id: 'ST1', top: '18%', left: '38%', label: 'DC' },
    { id: 'ST2', top: '18%', left: '62%', label: 'DC' },
  ],
  '4-2-3-1': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR' },
    { id: 'LB', top: '65%', left: '15%', label: 'LI' },
    { id: 'CB1', top: '70%', left: '35%', label: 'DFC' },
    { id: 'CB2', top: '70%', left: '65%', label: 'DFC' },
    { id: 'RB', top: '65%', left: '85%', label: 'LD' },
    { id: 'CDM1', top: '52%', left: '38%', label: 'MCD' },
    { id: 'CDM2', top: '52%', left: '62%', label: 'MCD' },
    { id: 'LAM', top: '32%', left: '22%', label: 'MCO' },
    { id: 'CAM', top: '30%', left: '50%', label: 'MCO' },
    { id: 'RAM', top: '32%', left: '78%', label: 'MCO' },
    { id: 'ST', top: '15%', left: '50%', label: 'DC' },
  ],
  '3-5-2': [
    { id: 'GK', top: '85%', left: '50%', label: 'POR' },
    { id: 'CB1', top: '72%', left: '25%', label: 'DFC' },
    { id: 'CB2', top: '74%', left: '50%', label: 'DFC' },
    { id: 'CB3', top: '72%', left: '75%', label: 'DFC' },
    { id: 'LWB', top: '45%', left: '12%', label: 'CAD' },
    { id: 'CM1', top: '48%', left: '35%', label: 'MC' },
    { id: 'CAM', top: '38%', left: '50%', label: 'MCO' },
    { id: 'CM2', top: '48%', left: '65%', label: 'MC' },
    { id: 'RWB', top: '45%', left: '88%', label: 'CAD' },
    { id: 'ST1', top: '18%', left: '38%', label: 'DC' },
    { id: 'ST2', top: '18%', left: '62%', label: 'DC' },
  ]
};

export interface TacticalStyle {
  name: string;
  description: string;
  pros: string;
  cons: string;
  possessionBonus: number;
}

const TACTICAL_STYLES: TacticalStyle[] = [
  {
    name: 'Tiki-Taka (Posesión)',
    description: 'Control de balón mediante pases cortos en triangulación y paciencia.',
    pros: 'Alta posesión (+15%), reduce ocasiones rivales.',
    cons: 'Vulnerable a contraataques veloces.',
    possessionBonus: 15
  },
  {
    name: 'Gegenpressing (Presión Alta)',
    description: 'Presión asfixiante inmediata tras perder el balón para forzar errores rivales.',
    pros: 'Recuperaciones rápidas en campo rival y ocasiones claras.',
    cons: 'Mayor desgaste físico de los jugadores.',
    possessionBonus: 5
  },
  {
    name: 'Contraataque Veloz',
    description: 'Bloque defensivo compacto y transiciones vertiginosas por bandas.',
    pros: 'Letal con delanteros veloces contra defensas adelantadas.',
    cons: 'Menor posesión de balón (40%).',
    possessionBonus: -10
  },
  {
    name: 'Autobús (Catenaccio)',
    description: 'Defensa férrea dentro del área propia minimizando espacios.',
    pros: 'Excelente para mantener ventajas o empates contra equipos superiores.',
    cons: 'Casi nula presencia ofensiva.',
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

  const currentSlots = FORMATIONS[selectedFormation] || FORMATIONS['4-3-3'];

  return (
    <div className="page-container tactics-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Sistema Táctico & Pizarra de Estrategia</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Configura la alineación titular, esquemas tácticos, mentalidad y lanzadores de balón parado.</p>
        </div>
        {team && (
          <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Shield color="#38bdf8" size={20} />
            <span>OVR Promedio: <strong style={{ color: '#10b981' }}>{team.overall}</strong></span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="tm-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`tm-tab ${activeTab === 'pitch' ? 'active' : ''}`}
          onClick={() => setActiveTab('pitch')}
        >
          <Sliders size={16} /> Pizarra & Formación
        </button>
        <button
          className={`tm-tab ${activeTab === 'styles' ? 'active' : ''}`}
          onClick={() => setActiveTab('styles')}
        >
          <Zap size={16} /> Estilos Tácticos & Instrucciones
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
                        className="player-token"
                        draggable
                        onDragStart={e => handleDragStart(e, occupant.id!)}
                      >
                        <div className="token-ovr">{occupant.overall}</div>
                        <div className="token-name">{occupant.name.split(' ').pop()}</div>
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
                onClick={() => setSelectedStyle(st.name)}
              >
                <div className="style-header">
                  <h3>{st.name}</h3>
                  {selectedStyle === st.name && <CheckCircle color="#10b981" size={20} />}
                </div>
                <p className="style-desc">{st.description}</p>
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
