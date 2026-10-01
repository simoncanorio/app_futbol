import { useState, useEffect } from 'react';
import { db, type Player, type Team } from '../db/db';
import { PlayerAvatar } from '../components/common/PlayerAvatar';
import { Database, UserCheck, Shield, Save, Plus, Search, Check, AlertCircle, RefreshCw } from 'lucide-react';
import './DatabaseEditor.css';

interface DatabaseEditorProps {
  currentLeagueId: number;
}

export function DatabaseEditor({ currentLeagueId }: DatabaseEditorProps) {
  const [activeTab, setActiveTab] = useState<'players' | 'teams'>('players');

  // Players state
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadData();
  }, [currentLeagueId]);

  const loadData = async () => {
    if (!currentLeagueId) return;
    const [allP, allT] = await Promise.all([
      db.players.where('leagueId').equals(currentLeagueId).toArray(),
      db.teams.where('leagueId').equals(currentLeagueId).toArray()
    ]);
    setPlayers(allP);
    setTeams(allT);
    if (allP.length > 0 && !selectedPlayer) setSelectedPlayer(allP[0]);
    if (allT.length > 0 && !selectedTeam) setSelectedTeam(allT[0]);
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredPlayers = players.filter(p => {
    const q = searchTerm.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.specificPosition && p.specificPosition.toLowerCase().includes(q));
  }).slice(0, 50);

  const filteredTeams = teams.filter(t => {
    return t.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSavePlayer = async () => {
    if (!selectedPlayer?.id) return;
    try {
      await db.players.put(selectedPlayer);
      setPlayers(prev => prev.map(p => p.id === selectedPlayer.id ? selectedPlayer : p));
      showNotification(`¡Datos de ${selectedPlayer.name} actualizados en la base de datos!`);
    } catch (err) {
      showNotification('Error al guardar jugador', 'error');
    }
  };

  const handleSaveTeam = async () => {
    if (!selectedTeam?.id) return;
    try {
      await db.teams.put(selectedTeam);
      setTeams(prev => prev.map(t => t.id === selectedTeam.id ? selectedTeam : t));
      showNotification(`¡Datos de ${selectedTeam.name} actualizados!`);
    } catch (err) {
      showNotification('Error al guardar club', 'error');
    }
  };

  const handleCreateNewPlayer = async () => {
    const newP: Player = {
      leagueId: currentLeagueId,
      teamId: selectedTeam?.id || null,
      name: 'Nuevo Jugador Editado',
      age: 20,
      overall: 80,
      potential: 90,
      position: 'DEL',
      specificPosition: 'DC',
      contract: 2000000,
      contractYears: 3,
      contractEndSeason: 2029,
      releaseClause: 80000000,
      morale: 90,
      unhappy: false,
      attributes: {
        pace: 82,
        shooting: 80,
        passing: 75,
        dribbling: 82,
        defending: 40,
        physical: 75
      },
      bio: {
        height: 182,
        weight: 76,
        country: 'España'
      },
      stats: {
        gamesPlayed: 0, minutesPlayed: 0, goals: 0, xG: 0, shotsTotal: 0, shotsOnTarget: 0,
        bigChancesMissed: 0, penaltiesScored: 0, penaltiesAttempted: 0, freeKickGoals: 0,
        freeKickAttempts: 0, goalsInsideBox: 0, goalsOutsideBox: 0, headerGoals: 0,
        leftFootGoals: 0, rightFootGoals: 0, penaltiesWon: 0, assists: 0, xA: 0, touches: 0,
        bigChancesCreated: 0, keyPasses: 0, passesAttempted: 0, passesCompleted: 0,
        ownHalfPassesAttempted: 0, ownHalfPassesCompleted: 0, oppHalfPassesAttempted: 0,
        oppHalfPassesCompleted: 0, longBallsAttempted: 0, longBallsCompleted: 0,
        chippedPassesAttempted: 0, chippedPassesCompleted: 0, crossesAttempted: 0,
        crossesCompleted: 0, cleanSheets: 0, interceptions: 0, tackles: 0,
        possessionWonFinalThird: 0, ballsRecovered: 0, dribbledPast: 0, clearances: 0,
        shotsBlocked: 0, errorsLeadingToShot: 0, errorsLeadingToGoal: 0, penaltiesConceded: 0,
        dribblesAttempted: 0, dribblesCompleted: 0, duelsWon: 0, duelsLost: 0,
        groundDuelsWon: 0, groundDuelsLost: 0, aerialDuelsWon: 0, aerialDuelsLost: 0,
        possessionLost: 0, foulsCommitted: 0, foulsReceived: 0, offsides: 0,
        yellowCards: 0, secondYellowCards: 0, redCards: 0
      }
    };

    const newId = await db.players.add(newP) as number;
    newP.id = newId;
    setPlayers(prev => [newP, ...prev]);
    setSelectedPlayer(newP);
    showNotification('¡Nuevo jugador creado e insertado en la base de datos!');
  };

  return (
    <div className="db-editor-container">
      {/* Header */}
      <div className="db-editor-header">
        <div className="db-editor-title">
          <Database size={32} color="#38bdf8" />
          <div>
            <h1>Editor en Vivo de la Base de Datos</h1>
            <span className="db-editor-subtitle">
              Modifica directamente atributos de jugadores, presupuestos, contratos y reputación de clubes.
            </span>
          </div>
        </div>

        <div className="db-editor-tabs">
          <button
            className={`db-tab-btn ${activeTab === 'players' ? 'active' : ''}`}
            onClick={() => setActiveTab('players')}
          >
            <UserCheck size={18} /> Jugadores ({players.length})
          </button>
          <button
            className={`db-tab-btn ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            <Shield size={18} /> Clubes ({teams.length})
          </button>
        </div>
      </div>

      {notification && (
        <div
          style={{
            background: notification.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            border: `1px solid ${notification.type === 'success' ? '#10b981' : '#ef4444'}`,
            padding: '0.75rem 1.25rem',
            borderRadius: '0.65rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}
        >
          {notification.type === 'success' ? <Check size={18} color="#10b981" /> : <AlertCircle size={18} color="#ef4444" />}
          {notification.message}
        </div>
      )}

      {/* Main Grid */}
      <div className="db-editor-grid">
        {/* Left Column: List & Search */}
        <div className="db-search-panel">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="db-search-input"
              placeholder={activeTab === 'players' ? 'Buscar jugador...' : 'Buscar club...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {activeTab === 'players' && (
              <button
                className="btn-primary"
                style={{ padding: '0.5rem 0.85rem' }}
                onClick={handleCreateNewPlayer}
                title="Crear Jugador"
              >
                <Plus size={18} />
              </button>
            )}
          </div>

          <div className="db-item-list">
            {activeTab === 'players' ? (
              filteredPlayers.map(p => (
                <div
                  key={p.id}
                  className={`db-item-card ${selectedPlayer?.id === p.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPlayer(p)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <PlayerAvatar player={p} size={32} />
                    <div>
                      <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem' }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {p.specificPosition || p.position} • {p.age} años
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.9rem' }}>
                    {p.overall}
                  </div>
                </div>
              ))
            ) : (
              filteredTeams.map(t => (
                <div
                  key={t.id}
                  className={`db-item-card ${selectedTeam?.id === t.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTeam(t)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Shield size={24} color={t.kit?.primaryColor || '#3b82f6'} />
                    <div>
                      <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem' }}>{t.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {t.domesticLeague}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.9rem' }}>
                    OVR {t.overall}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="db-edit-panel">
          {activeTab === 'players' && selectedPlayer ? (
            <>
              <div className="db-form-section">
                <div className="db-section-title">
                  <UserCheck size={20} /> Datos Principales
                </div>
                <div className="db-fields-grid">
                  <div className="db-field">
                    <label>Nombre del Jugador</label>
                    <input
                      type="text"
                      value={selectedPlayer.name}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, name: e.target.value })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Equipo Actual</label>
                    <select
                      value={selectedPlayer.teamId || ''}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, teamId: e.target.value ? Number(e.target.value) : null })}
                    >
                      <option value="">Agente Libre (Sin Equipo)</option>
                      {teams.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="db-field">
                    <label>Edad</label>
                    <input
                      type="number"
                      value={selectedPlayer.age}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, age: Number(e.target.value) })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Posición General</label>
                    <select
                      value={selectedPlayer.position}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, position: e.target.value as any })}
                    >
                      <option value="POR">Portero (POR)</option>
                      <option value="DEF">Defensa (DEF)</option>
                      <option value="MED">Centrocampista (MED)</option>
                      <option value="DEL">Delantero (DEL)</option>
                    </select>
                  </div>
                  <div className="db-field">
                    <label>Posición Específica</label>
                    <input
                      type="text"
                      value={selectedPlayer.specificPosition || ''}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, specificPosition: e.target.value as any })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Media Actual (OVR)</label>
                    <input
                      type="number"
                      min={40}
                      max={99}
                      value={selectedPlayer.overall}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, overall: Number(e.target.value) })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Potencial Máximo</label>
                    <input
                      type="number"
                      min={40}
                      max={99}
                      value={selectedPlayer.potential}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, potential: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              {/* Attributes Section */}
              <div className="db-form-section">
                <div className="db-section-title">
                  ⚽ Atributos EA FC
                </div>
                <div className="db-fields-grid">
                  <div className="db-field">
                    <label>Ritmo (Pace)</label>
                    <input
                      type="number"
                      min={30}
                      max={99}
                      value={selectedPlayer.attributes?.pace || 70}
                      onChange={e => setSelectedPlayer({
                        ...selectedPlayer,
                        attributes: { ...(selectedPlayer.attributes || {} as any), pace: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Tiro (Shooting)</label>
                    <input
                      type="number"
                      min={30}
                      max={99}
                      value={selectedPlayer.attributes?.shooting || 70}
                      onChange={e => setSelectedPlayer({
                        ...selectedPlayer,
                        attributes: { ...(selectedPlayer.attributes || {} as any), shooting: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Pase (Passing)</label>
                    <input
                      type="number"
                      min={30}
                      max={99}
                      value={selectedPlayer.attributes?.passing || 70}
                      onChange={e => setSelectedPlayer({
                        ...selectedPlayer,
                        attributes: { ...(selectedPlayer.attributes || {} as any), passing: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Regate (Dribbling)</label>
                    <input
                      type="number"
                      min={30}
                      max={99}
                      value={selectedPlayer.attributes?.dribbling || 70}
                      onChange={e => setSelectedPlayer({
                        ...selectedPlayer,
                        attributes: { ...(selectedPlayer.attributes || {} as any), dribbling: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Defensa (Defending)</label>
                    <input
                      type="number"
                      min={30}
                      max={99}
                      value={selectedPlayer.attributes?.defending || 70}
                      onChange={e => setSelectedPlayer({
                        ...selectedPlayer,
                        attributes: { ...(selectedPlayer.attributes || {} as any), defending: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Físico (Physical)</label>
                    <input
                      type="number"
                      min={30}
                      max={99}
                      value={selectedPlayer.attributes?.physical || 70}
                      onChange={e => setSelectedPlayer({
                        ...selectedPlayer,
                        attributes: { ...(selectedPlayer.attributes || {} as any), physical: Number(e.target.value) }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Contract & Status */}
              <div className="db-form-section">
                <div className="db-section-title">
                  💼 Contrato, Cláusula y Físico
                </div>
                <div className="db-fields-grid">
                  <div className="db-field">
                    <label>Salario Anual (€)</label>
                    <input
                      type="number"
                      step={100000}
                      value={selectedPlayer.contract}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, contract: Number(e.target.value) })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Cláusula de Rescisión (€)</label>
                    <input
                      type="number"
                      step={1000000}
                      value={selectedPlayer.releaseClause || 50000000}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, releaseClause: Number(e.target.value) })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Moral (0 - 100)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={selectedPlayer.morale || 85}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, morale: Number(e.target.value) })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Fatiga (0 - 100%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={selectedPlayer.fatigue || 0}
                      onChange={e => setSelectedPlayer({ ...selectedPlayer, fatigue: Number(e.target.value) })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Lesionado</label>
                    <select
                      value={selectedPlayer.isInjured ? 'yes' : 'no'}
                      onChange={e => setSelectedPlayer({
                        ...selectedPlayer,
                        isInjured: e.target.value === 'yes',
                        injuryWeeks: e.target.value === 'yes' ? 4 : undefined,
                        injuryType: e.target.value === 'yes' ? 'Sobrecarga muscular' : undefined
                      })}
                    >
                      <option value="no">No (En Forma)</option>
                      <option value="yes">Sí (Lesionado)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="db-actions-row">
                <button className="btn-primary" onClick={handleSavePlayer}>
                  <Save size={18} /> Guardar Cambios del Jugador
                </button>
              </div>
            </>
          ) : activeTab === 'teams' && selectedTeam ? (
            <>
              <div className="db-form-section">
                <div className="db-section-title">
                  <Shield size={20} /> Información del Club
                </div>
                <div className="db-fields-grid">
                  <div className="db-field">
                    <label>Nombre del Club</label>
                    <input
                      type="text"
                      value={selectedTeam.name}
                      onChange={e => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Liga Doméstica</label>
                    <input
                      type="text"
                      value={selectedTeam.domesticLeague}
                      onChange={e => setSelectedTeam({ ...selectedTeam, domesticLeague: e.target.value })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Presupuesto (€)</label>
                    <input
                      type="number"
                      step={1000000}
                      value={selectedTeam.budget}
                      onChange={e => setSelectedTeam({ ...selectedTeam, budget: Number(e.target.value) })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Prestigio (0 - 100)</label>
                    <input
                      type="number"
                      min={10}
                      max={100}
                      value={selectedTeam.prestige || 80}
                      onChange={e => setSelectedTeam({ ...selectedTeam, prestige: Number(e.target.value) })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Media Global (OVR)</label>
                    <input
                      type="number"
                      min={60}
                      max={95}
                      value={selectedTeam.overall}
                      onChange={e => setSelectedTeam({ ...selectedTeam, overall: Number(e.target.value) })}
                    />
                  </div>
                  <div className="db-field">
                    <label>Asistencia Media</label>
                    <input
                      type="number"
                      value={selectedTeam.attendance || 45000}
                      onChange={e => setSelectedTeam({ ...selectedTeam, attendance: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              {/* Kit Colors */}
              <div className="db-form-section">
                <div className="db-section-title">
                  🎨 Equipación y Colores
                </div>
                <div className="db-fields-grid">
                  <div className="db-field">
                    <label>Color Principal</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={selectedTeam.kit?.primaryColor || '#ef4444'}
                        onChange={e => setSelectedTeam({
                          ...selectedTeam,
                          kit: { ...(selectedTeam.kit || {} as any), primaryColor: e.target.value }
                        })}
                        style={{ width: '45px', height: '38px', padding: '0.2rem' }}
                      />
                      <input
                        type="text"
                        value={selectedTeam.kit?.primaryColor || '#ef4444'}
                        onChange={e => setSelectedTeam({
                          ...selectedTeam,
                          kit: { ...(selectedTeam.kit || {} as any), primaryColor: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <div className="db-field">
                    <label>Color Secundario</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={selectedTeam.kit?.secondaryColor || '#ffffff'}
                        onChange={e => setSelectedTeam({
                          ...selectedTeam,
                          kit: { ...(selectedTeam.kit || {} as any), secondaryColor: e.target.value }
                        })}
                        style={{ width: '45px', height: '38px', padding: '0.2rem' }}
                      />
                      <input
                        type="text"
                        value={selectedTeam.kit?.secondaryColor || '#ffffff'}
                        onChange={e => setSelectedTeam({
                          ...selectedTeam,
                          kit: { ...(selectedTeam.kit || {} as any), secondaryColor: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="db-actions-row">
                <button className="btn-primary" onClick={handleSaveTeam}>
                  <Save size={18} /> Guardar Cambios del Club
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              Selecciona un elemento de la lista para comenzar a editarlo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
