import { useState, useEffect, useRef } from 'react';
import { type Match, type Team, type Player, type MatchEvent, type MatchTeamStats, db } from '../../db/db';
import { simulateMatch, applyMatchOutcomeToDatabase } from '../../engine/matchEngine';
import { Play, Pause, SkipForward, Volume2, VolumeX, Shield, RefreshCw } from 'lucide-react';
import './LiveMatchEngine.css';

interface LiveMatchEngineProps {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
  homePlayers: Player[];
  awayPlayers: Player[];
  onFinish: (finalHomeScore: number, finalAwayScore: number, events: Match['events']) => void;
  onClose: () => void;
}

export function LiveMatchEngine({
  match,
  homeTeam,
  awayTeam,
  homePlayers,
  onFinish,
  onClose
}: LiveMatchEngineProps) {
  const [minute, setMinute] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const [homeTactic, setHomeTactic] = useState<string>(homeTeam.tacticalStyle || 'Tiki-Taka (Posesión)');
  const [awayTactic] = useState<string>(awayTeam.tacticalStyle || 'Equilibrada');

  const [visibleEvents, setVisibleEvents] = useState<MatchEvent[]>([]);
  const [ballPos, setBallPos] = useState<{ x: number; y: number; z: number }>({ x: 50, y: 50, z: 0 });
  const [momentum, setMomentum] = useState<number>(50);
  const [weather, setWeather] = useState<'Soleado' | 'Lluvia' | 'Noche' | 'Viento'>('Soleado');

  const [showSubModal, setShowSubModal] = useState(false);
  const [selectedStarter, setSelectedStarter] = useState<Player | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Store pre-computed deep engine result
  const simResultRef = useRef<(Match & { updatedPlayers?: Player[] }) | null>(null);
  const [fullStats, setFullStats] = useState<MatchTeamStats | null>(null);

  const starters = homePlayers.filter(p => p.lineupStatus === 'starter' || !p.lineupStatus).slice(0, 11);
  const bench = homePlayers.filter(p => p.lineupStatus === 'bench' || (!starters.includes(p) && p.lineupStatus !== 'youth'));

  const playSynthSound = (type: 'whistle' | 'cheer' | 'kick' | 'post') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'whistle') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'cheer') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.7);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      } else if (type === 'kick') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'post') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // ignore audio errors
    }
  };

  useEffect(() => {
    let mounted = true;
    playSynthSound('whistle');

    async function initSimulation() {
      const res = await simulateMatch(
        match.leagueId,
        { ...homeTeam, tacticalStyle: homeTactic },
        awayTeam,
        match.week,
        match.type || 'league',
        false // Do not persist until match finishes
      );
      if (!mounted) return;
      simResultRef.current = res;
      if (res.stats) {
        setFullStats(res.stats);
        setWeather(res.stats.weather || 'Soleado');
        setMomentum(res.stats.homePossession);
      }
    }

    initSimulation();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!isPlaying || minute >= 90) return;

    const intervalMs = Math.max(110, 900 / speed);
    const timer = setInterval(() => {
      setMinute(prev => {
        const nextMin = prev + 1;
        const sim = simResultRef.current;

        if (sim && sim.events) {
          const minEvents = sim.events.filter(ev => ev.minute === nextMin);
          if (minEvents.length > 0) {
            setVisibleEvents(curr => [...curr, ...minEvents]);

            for (const ev of minEvents) {
              if (ev.type === 'goal') {
                if (ev.teamId === homeTeam.id) {
                  setHomeScore(s => s + 1);
                  setBallPos({ x: 94, y: 50, z: 16 });
                } else {
                  setAwayScore(s => s + 1);
                  setBallPos({ x: 6, y: 50, z: 16 });
                }
                playSynthSound('cheer');
              } else if (ev.type === 'woodwork' || ev.type === 'missed_penalty') {
                playSynthSound('post');
              } else if (ev.type === 'red_card' || ev.type === 'yellow_card') {
                playSynthSound('whistle');
              }
            }
          } else {
            // Normal ball movement animation
            const rand = Math.random();
            const homeBias = (fullStats?.homePossession || 50) / 100;
            if (rand < homeBias * 0.7) {
              setBallPos({
                x: 60 + Math.random() * 30,
                y: 20 + Math.random() * 60,
                z: Math.random() > 0.65 ? 20 + Math.random() * 25 : 0
              });
            } else if (rand < 0.72) {
              setBallPos({
                x: 10 + Math.random() * 30,
                y: 20 + Math.random() * 60,
                z: Math.random() > 0.65 ? 20 + Math.random() * 25 : 0
              });
            } else {
              setBallPos({
                x: 40 + Math.random() * 20,
                y: 25 + Math.random() * 50,
                z: 0
              });
            }
          }
        }

        if (nextMin >= 90) {
          // Also include any stoppage / extra-time events (>90')
          if (sim && sim.events) {
            const extraEvs = sim.events.filter(ev => ev.minute > 90);
            if (extraEvs.length > 0) {
              setVisibleEvents(sim.events);
            }
            setHomeScore(sim.homeScore);
            setAwayScore(sim.awayScore);
          }
          playSynthSound('whistle');
          setIsPlaying(false);
        }
        return nextMin;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, minute, speed, homeTeam.id, fullStats]);

  const handleInstantSim = () => {
    const sim = simResultRef.current;
    if (sim) {
      setHomeScore(sim.homeScore);
      setAwayScore(sim.awayScore);
      setVisibleEvents(sim.events || []);
    }
    setMinute(90);
    setIsPlaying(false);
    playSynthSound('whistle');
  };

  const handleSubstitute = async (sub: Player) => {
    if (!selectedStarter) return;

    selectedStarter.lineupStatus = 'bench';
    sub.lineupStatus = 'starter';
    sub.pitchPosition = selectedStarter.pitchPosition;
    selectedStarter.pitchPosition = undefined;

    await db.players.put(selectedStarter);
    await db.players.put(sub);

    setVisibleEvents(evs => [
      ...evs,
      {
        type: 'substitution',
        playerId: sub.id!,
        playerName: sub.name,
        subOutId: selectedStarter.id!,
        subOutName: selectedStarter.name,
        teamId: homeTeam.id!,
        minute: Math.max(1, minute),
        description: `🔄 Cambio táctico: Entra ${sub.name} por ${selectedStarter.name}`
      }
    ]);

    setSelectedStarter(null);
    setShowSubModal(false);
  };

  const handleSaveAndFinish = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const sim = simResultRef.current;
      if (sim) {
        if (sim.updatedPlayers && sim.updatedPlayers.length > 0) {
          await db.players.bulkPut(sim.updatedPlayers);
        }
        await applyMatchOutcomeToDatabase(
          match.leagueId,
          match,
          {
            homeScore: sim.homeScore,
            awayScore: sim.awayScore,
            events: visibleEvents.length > 0 ? visibleEvents : sim.events,
            stats: sim.stats
          },
          homeTeam,
          awayTeam
        );
        onFinish(sim.homeScore, sim.awayScore, visibleEvents.length > 0 ? visibleEvents : sim.events);
      } else {
        onFinish(homeScore, awayScore, visibleEvents);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const progressRatio = Math.min(1, minute / 90);
  const liveHomeXG = ((fullStats?.homeXG || 0) * progressRatio).toFixed(2);
  const liveAwayXG = ((fullStats?.awayXG || 0) * progressRatio).toFixed(2);
  const liveHomeShots = Math.round((fullStats?.homeShots || 0) * progressRatio);
  const liveAwayShots = Math.round((fullStats?.awayShots || 0) * progressRatio);

  // Dynamic 22-player spatial shifting based on ballPos & tactical block height
  const ballShiftX = (ballPos.x - 50) * 0.28; // -14 to +14
  const ballShiftY = (ballPos.y - 50) * 0.16; // -8 to +8
  const homeBlockOffset = homeTactic.includes('Gegenpressing') ? 6 : homeTactic.includes('Autobús') ? -8 : 0;

  const homeBaseCoords = [
    { role: 'GK', x: 7, y: 50, xFactor: 0.15, yFactor: 0.15 },
    { role: 'LI', x: 26, y: 20, xFactor: 0.85, yFactor: 0.7 },
    { role: 'DFC', x: 23, y: 40, xFactor: 0.65, yFactor: 0.5 },
    { role: 'DFC', x: 23, y: 60, xFactor: 0.65, yFactor: 0.5 },
    { role: 'LD', x: 26, y: 80, xFactor: 0.85, yFactor: 0.7 },
    { role: 'MC', x: 50, y: 28, xFactor: 1.0, yFactor: 0.85 },
    { role: 'MCD', x: 44, y: 50, xFactor: 0.85, yFactor: 0.75 },
    { role: 'MC', x: 50, y: 72, xFactor: 1.0, yFactor: 0.85 },
    { role: 'EI', x: 74, y: 22, xFactor: 1.05, yFactor: 0.9 },
    { role: 'DC', x: 78, y: 50, xFactor: 0.95, yFactor: 0.75 },
    { role: 'ED', x: 74, y: 78, xFactor: 1.05, yFactor: 0.9 }
  ];

  const awayBaseCoords = [
    { role: 'GK', x: 93, y: 50, xFactor: 0.15, yFactor: 0.15 },
    { role: 'LD', x: 74, y: 20, xFactor: 0.85, yFactor: 0.7 },
    { role: 'DFC', x: 77, y: 40, xFactor: 0.65, yFactor: 0.5 },
    { role: 'DFC', x: 77, y: 60, xFactor: 0.65, yFactor: 0.5 },
    { role: 'LI', x: 74, y: 80, xFactor: 0.85, yFactor: 0.7 },
    { role: 'MC', x: 50, y: 30, xFactor: 1.0, yFactor: 0.85 },
    { role: 'MCD', x: 56, y: 50, xFactor: 0.85, yFactor: 0.75 },
    { role: 'MC', x: 50, y: 70, xFactor: 1.0, yFactor: 0.85 },
    { role: 'ED', x: 26, y: 24, xFactor: 1.05, yFactor: 0.9 },
    { role: 'DC', x: 22, y: 50, xFactor: 0.95, yFactor: 0.75 },
    { role: 'EI', x: 26, y: 76, xFactor: 1.05, yFactor: 0.9 }
  ];

  const visibleShots = (fullStats?.shotsMap || []).filter(s => s.minute <= minute);

  return (
    <div className="live-match-modal-overlay">
      <div className="live-match-modal glass-panel">
        {/* Match Header */}
        <div className="live-match-header">
          <div className="team-badge-box">
            <Shield size={28} color={homeTeam.kit?.primaryColor || '#ef4444'} />
            <div>
              <h2>{homeTeam.name}</h2>
              <span className="team-sub">OVR {homeTeam.overall} • xG {liveHomeXG} ({liveHomeShots} tiros)</span>
            </div>
          </div>

          <div className="score-board">
            <div className="score-digits">{homeScore} - {awayScore}</div>
            <div className="time-badge">{minute}' <span className="weather-tag">☀️ {weather}</span></div>
          </div>

          <div className="team-badge-box align-right">
            <div>
              <h2>{awayTeam.name}</h2>
              <span className="team-sub">OVR {awayTeam.overall} • xG {liveAwayXG} ({liveAwayShots} tiros)</span>
            </div>
            <Shield size={28} color={awayTeam.kit?.primaryColor || '#3b82f6'} />
          </div>
        </div>

        {/* 3D Isometric Pitch */}
        <div className="pitch-3d-wrapper">
          <div className="pitch-3d-field">
            <div className="pitch-3d-grass">
              <div className="pitch-lines">
                <div className="halfway-line" />
                <div className="center-circle" />
                <div className="penalty-area left" />
                <div className="penalty-area right" />
                <div className="goal-net left" />
                <div className="goal-net right" />
              </div>

              {/* xG Shot Map Dots */}
              {visibleShots.map((sh, idx) => {
                const sz = Math.round(7 + sh.xG * 14);
                return (
                  <div
                    key={idx}
                    title={`${sh.minute}' ${sh.playerName} (xG: ${sh.xG}) ${sh.isGoal ? '⚽ GOL' : sh.isOnTarget ? 'A puerta' : 'Fuera/Bloqueado'}`}
                    style={{
                      position: 'absolute',
                      left: `${sh.x}%`,
                      top: `${sh.y}%`,
                      width: `${sz}px`,
                      height: `${sz}px`,
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: sh.isGoal ? '#10b981' : sh.teamId === homeTeam.id ? 'rgba(239, 68, 68, 0.65)' : 'rgba(56, 189, 248, 0.65)',
                      border: sh.isGoal ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.6)',
                      boxShadow: sh.isGoal ? '0 0 8px #10b981' : 'none',
                      zIndex: 2,
                      pointerEvents: 'auto'
                    }}
                  />
                );
              })}

              {/* 3D Ball with height arc */}
              <div
                className="ball-3d"
                style={{
                  left: `${ballPos.x}%`,
                  top: `${ballPos.y}%`,
                  transform: `translate3d(-50%, -50%, ${ballPos.z}px)`
                }}
              >
                <div className="ball-shadow" style={{ opacity: 1 - ballPos.z / 60 }} />
              </div>

              {/* 3D Home & Away Player Tokens (Dynamic 2D Positioning) */}
              <div className="players-3d-layer">
                {homeBaseCoords.map((pos, idx) => {
                  const px = Math.max(5, Math.min(92, pos.x + (ballShiftX + homeBlockOffset) * pos.xFactor));
                  const py = Math.max(10, Math.min(90, pos.y + ballShiftY * pos.yFactor));
                  return (
                    <div
                      key={`h-${idx}`}
                      className="player-3d home"
                      style={{ left: `${px}%`, top: `${py}%`, transition: 'left 0.45s ease, top 0.45s ease' }}
                    >
                      {pos.role}
                    </div>
                  );
                })}

                {awayBaseCoords.map((pos, idx) => {
                  const px = Math.max(8, Math.min(95, pos.x + ballShiftX * pos.xFactor));
                  const py = Math.max(10, Math.min(90, pos.y + ballShiftY * pos.yFactor));
                  return (
                    <div
                      key={`a-${idx}`}
                      className="player-3d away"
                      style={{ left: `${px}%`, top: `${py}%`, transition: 'left 0.45s ease, top 0.45s ease' }}
                    >
                      {pos.role}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Possession Momentum Bar */}
        <div className="momentum-wrapper">
          <span>Posesión {homeTeam.name} ({momentum}%)</span>
          <div className="momentum-bar">
            <div className="momentum-fill" style={{ width: `${momentum}%` }} />
          </div>
          <span>{awayTeam.name} ({100 - momentum}%)</span>
        </div>

        {/* Interactive Controls Bar */}
        <div className="live-controls-bar">
          <div className="controls-group">
            <button className="ctrl-btn" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button className={`ctrl-btn ${speed === 2 ? 'active' : ''}`} onClick={() => setSpeed(2)}>
              2x
            </button>
            <button className={`ctrl-btn ${speed === 5 ? 'active' : ''}`} onClick={() => setSpeed(5)}>
              5x
            </button>
            <button className="ctrl-btn instant" onClick={handleInstantSim} disabled={minute >= 90}>
              <SkipForward size={16} /> Finalizar
            </button>
            <button className="ctrl-btn" onClick={() => setSoundEnabled(!soundEnabled)} title="Sonido del partido">
              {soundEnabled ? <Volume2 size={16} color="#38bdf8" /> : <VolumeX size={16} color="#64748b" />}
            </button>
          </div>

          <div className="tactic-selector">
            <span>Ajuste Táctico:</span>
            <select
              value={homeTactic}
              onChange={async e => {
                setHomeTactic(e.target.value);
                homeTeam.tacticalStyle = e.target.value;
                await db.teams.put(homeTeam);
              }}
              className="bb-select"
            >
              <option value="Tiki-Taka (Posesión)">Tiki-Taka (Posesión)</option>
              <option value="Gegenpressing (Presión Alta)">Gegenpressing (Presión Alta)</option>
              <option value="Contraataque Veloz">Contraataque Veloz</option>
              <option value="Autobús (Catenaccio)">Autobús (Defensiva)</option>
              <option value="Juego por las Bandas (Centros)">Juego por las Bandas</option>
              <option value="Fútbol Directo (Balón Largo)">Fútbol Directo</option>
            </select>
          </div>

          <button className="sub-trigger-btn" onClick={() => setShowSubModal(true)}>
            <RefreshCw size={16} /> Sustituciones
          </button>
        </div>

        {/* Live Commentary Feed */}
        <div className="live-event-feed">
          <h3>Comentarios, xG & Eventos en Vivo {minute >= 90 && fullStats?.mvpPlayerName ? `• ⭐ MVP: ${fullStats.mvpPlayerName}` : ''}</h3>
          <div className="events-scroll">
            {visibleEvents.length === 0 ? (
              <p className="no-events">Minuto {minute}': El colegiado da inicio a las acciones en el terreno de juego.</p>
            ) : (
              visibleEvents.map((ev, idx) => (
                <div key={idx} className="event-item">
                  <span className="event-min">{ev.minute}'</span>
                  <span className="event-desc">
                    {ev.description || (
                      ev.type === 'goal'
                        ? `⚽ ¡GOOOOL de ${ev.playerName || (ev.teamId === homeTeam.id ? homeTeam.name : awayTeam.name)}!`
                        : ev.type === 'yellow_card'
                        ? `🟨 Amarilla para ${ev.playerName || 'jugador'}`
                        : ev.type === 'red_card'
                        ? `🟥 ¡Expulsado ${ev.playerName || 'jugador'}!`
                        : `Evento del partido`
                    )}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="live-modal-footer">
          {minute >= 90 ? (
            <button className="create-btn" onClick={handleSaveAndFinish} disabled={isSaving}>
              {isSaving ? 'Guardando Estadísticas...' : 'Guardar Resultado y Finalizar'}
            </button>
          ) : (
            <button className="settings-btn" onClick={onClose}>
              Cerrar (Cancelar simulación en vivo)
            </button>
          )}
        </div>
      </div>

      {/* Substitution Modal */}
      {showSubModal && (
        <div className="sub-modal-overlay">
          <div className="sub-modal glass-panel">
            <h3>Sustituciones en Vivo</h3>
            <p>Selecciona un titular a reemplazar:</p>

            <div className="sub-players-list">
              {starters.map(st => (
                <div
                  key={st.id}
                  className={`sub-player-item ${selectedStarter?.id === st.id ? 'selected' : ''}`}
                  onClick={() => setSelectedStarter(st)}
                >
                  <span>{st.position} - {st.name} (OVR {st.overall})</span>
                </div>
              ))}
            </div>

            {selectedStarter && (
              <>
                <p style={{ marginTop: '1rem' }}>Elegir sustituto de la banca para {selectedStarter.name}:</p>
                <div className="sub-players-list">
                  {bench.map(bn => (
                    <div
                      key={bn.id}
                      className="sub-player-item bench-item"
                      onClick={() => handleSubstitute(bn)}
                    >
                      <span>🔄 Entra: {bn.position} - {bn.name} (OVR {bn.overall})</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button className="settings-btn" onClick={() => setShowSubModal(false)} style={{ marginTop: '1rem' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
