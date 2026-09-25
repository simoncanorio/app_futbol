import { useState, useEffect } from 'react';
import { type Match, type Team, type Player, db } from '../../db/db';
import { Play, Pause, SkipForward, Volume2, VolumeX, Shield, RefreshCw, AlertTriangle, Trophy } from 'lucide-react';
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
  awayPlayers,
  onFinish,
  onClose
}: LiveMatchEngineProps) {
  const [minute, setMinute] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [homeScore, setHomeScore] = useState(match.homeScore || 0);
  const [awayScore, setAwayScore] = useState(match.awayScore || 0);

  const [homeTactic, setHomeTactic] = useState<'Tiki-Taka' | 'Gegenpress' | 'Autobús' | 'Equilibrada'>('Equilibrada');
  const [awayTactic] = useState<'Tiki-Taka' | 'Gegenpress' | 'Autobús' | 'Equilibrada'>('Equilibrada');
  
  const [events, setEvents] = useState<Required<Match>['events']>(match.events || []);

  // 3D pitch coordinates (x%, y%, z-height px)
  const [ballPos, setBallPos] = useState<{ x: number; y: number; z: number }>({ x: 50, y: 50, z: 0 });
  const [momentum, setMomentum] = useState<number>(50); // 0 (Away dom) to 100 (Home dom)
  const [weather] = useState<'Soleado' | 'Lluvia' | 'Noche'>('Soleado');

  const [showSubModal, setShowSubModal] = useState(false);
  const [selectedStarter, setSelectedStarter] = useState<Player | null>(null);

  const starters = homePlayers.filter(p => p.lineupStatus === 'starter' || !p.lineupStatus).slice(0, 11);
  const bench = homePlayers.filter(p => p.lineupStatus === 'bench' || !starters.includes(p));

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
    } catch (err) {
      console.warn('Audio not available:', err);
    }
  };

  useEffect(() => {
    playSynthSound('whistle');
  }, []);

  useEffect(() => {
    if (!isPlaying || minute >= 90) return;

    const intervalMs = Math.max(120, 1000 / speed);
    const timer = setInterval(() => {
      setMinute(prev => {
        const nextMin = prev + 1;

        // Tactical AI calculation
        let homeTacticalBonus = 0;
        let awayTacticalBonus = 0;

        if (homeTactic === 'Tiki-Taka') homeTacticalBonus += 4;
        if (homeTactic === 'Gegenpress') homeTacticalBonus += 6;
        if (homeTactic === 'Autobús') homeTacticalBonus -= 4;

        if (awayTactic === 'Tiki-Taka') awayTacticalBonus += 4;
        if (awayTactic === 'Gegenpress') awayTacticalBonus += 6;

        // Overall difference factor
        const ovrDiff = (homeTeam.overall + homeTacticalBonus) - (awayTeam.overall + awayTacticalBonus);
        
        // Home advantage (+3 OVR equivalent)
        const totalBonus = ovrDiff + 3;

        // Realistic goal chances per minute
        const baseHomeChance = Math.max(0.012, 0.026 + totalBonus * 0.0015);
        const baseAwayChance = Math.max(0.012, 0.026 - totalBonus * 0.0015);

        // Football Randomness ("tinte random")
        const rand = Math.random();
        const luckFactor = (Math.random() - 0.5) * 0.01;

        // Ball movement animation coordinates with Z height
        if (rand < 0.35) {
          // Home Attack
          setBallPos({
            x: 65 + Math.random() * 28,
            y: 20 + Math.random() * 60,
            z: Math.random() > 0.6 ? 25 + Math.random() * 30 : 0
          });
          setMomentum(prevM => Math.min(95, prevM + 2));
        } else if (rand < 0.70) {
          // Away Attack
          setBallPos({
            x: 8 + Math.random() * 28,
            y: 20 + Math.random() * 60,
            z: Math.random() > 0.6 ? 25 + Math.random() * 30 : 0
          });
          setMomentum(prevM => Math.max(5, prevM - 2));
        } else {
          // Midfield duel
          setBallPos({
            x: 40 + Math.random() * 20,
            y: 25 + Math.random() * 50,
            z: 0
          });
        }

        // Random goal events with realistic player rating weighting
        if (rand < baseHomeChance + luckFactor && Math.random() < 0.48) {
          // Home Goal!
          const strikers = starters.filter(p => p.position === 'DEL' || p.position === 'MED');
          const scorer = strikers.length > 0 ? strikers[Math.floor(Math.random() * strikers.length)] : starters[0];
          
          setHomeScore(s => s + 1);
          setBallPos({ x: 95, y: 50, z: 15 });
          playSynthSound('cheer');
          setEvents(evs => [
            ...evs,
            { type: 'goal', playerId: scorer?.id || 0, teamId: homeTeam.id!, minute: nextMin }
          ]);
        } else if (rand > 1 - (baseAwayChance - luckFactor) && Math.random() < 0.48) {
          // Away Goal!
          const strikers = awayPlayers.filter(p => p.position === 'DEL' || p.position === 'MED');
          const scorer = strikers.length > 0 ? strikers[Math.floor(Math.random() * strikers.length)] : awayPlayers[0];
          
          setAwayScore(s => s + 1);
          setBallPos({ x: 5, y: 50, z: 15 });
          playSynthSound('cheer');
          setEvents(evs => [
            ...evs,
            { type: 'goal', playerId: scorer?.id || 0, teamId: awayTeam.id!, minute: nextMin }
          ]);
        } else if (Math.random() < 0.01) {
          // Shot off the post/bar (tinte random!)
          playSynthSound('post');
        }

        if (nextMin >= 90) {
          playSynthSound('whistle');
          setIsPlaying(false);
        }
        return nextMin;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, minute, speed, homeTactic, awayTactic, homeTeam, awayTeam]);

  const handleInstantSim = () => {
    let finalH = homeScore;
    let finalA = awayScore;
    const newEvs = [...events];

    for (let m = minute + 1; m <= 90; m++) {
      if (Math.random() < 0.028) {
        finalH++;
        const scorer = starters[Math.floor(Math.random() * starters.length)];
        newEvs.push({ type: 'goal', playerId: scorer?.id || 0, teamId: homeTeam.id!, minute: m });
      } else if (Math.random() < 0.025) {
        finalA++;
        const scorer = awayPlayers[Math.floor(Math.random() * awayPlayers.length)];
        newEvs.push({ type: 'goal', playerId: scorer?.id || 0, teamId: awayTeam.id!, minute: m });
      }
    }

    setHomeScore(finalH);
    setAwayScore(finalA);
    setEvents(newEvs);
    setMinute(90);
    setIsPlaying(false);
    playSynthSound('whistle');
  };

  const handleSubstitute = async (sub: Player) => {
    if (!selectedStarter) return;

    selectedStarter.lineupStatus = 'bench';
    sub.lineupStatus = 'starter';

    await db.players.put(selectedStarter);
    await db.players.put(sub);

    setSelectedStarter(null);
    setShowSubModal(false);
  };

  return (
    <div className="live-match-modal-overlay">
      <div className="live-match-modal glass-panel">
        {/* Match Header */}
        <div className="live-match-header">
          <div className="team-badge-box">
            <Shield size={28} color={homeTeam.kit?.primaryColor || '#ef4444'} />
            <div>
              <h2>{homeTeam.name}</h2>
              <span className="team-sub">OVR {homeTeam.overall} • {homeTactic}</span>
            </div>
          </div>

          <div className="score-board">
            <div className="score-digits">{homeScore} - {awayScore}</div>
            <div className="time-badge">{minute}' <span className="weather-tag">☀️ {weather}</span></div>
          </div>

          <div className="team-badge-box align-right">
            <div>
              <h2>{awayTeam.name}</h2>
              <span className="team-sub">OVR {awayTeam.overall} • {awayTactic}</span>
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

              {/* 3D Home & Away Player Tokens */}
              <div className="players-3d-layer">
                {/* Home Team Formation (Red/User) */}
                <div className="player-3d home" style={{ left: '8%', top: '50%' }}>GK</div>
                <div className="player-3d home" style={{ left: '26%', top: '22%' }}>DEF</div>
                <div className="player-3d home" style={{ left: '24%', top: '42%' }}>DEF</div>
                <div className="player-3d home" style={{ left: '24%', top: '60%' }}>DEF</div>
                <div className="player-3d home" style={{ left: '26%', top: '80%' }}>DEF</div>
                <div className="player-3d home" style={{ left: '52%', top: '30%' }}>MED</div>
                <div className="player-3d home" style={{ left: '50%', top: '50%' }}>MED</div>
                <div className="player-3d home" style={{ left: '52%', top: '70%' }}>MED</div>
                <div className="player-3d home" style={{ left: '76%', top: '24%' }}>DEL</div>
                <div className="player-3d home" style={{ left: '79%', top: '50%' }}>DEL</div>
                <div className="player-3d home" style={{ left: '76%', top: '76%' }}>DEL</div>

                {/* Away Team Formation (Blue/AI) */}
                <div className="player-3d away" style={{ left: '92%', top: '50%' }}>GK</div>
                <div className="player-3d away" style={{ left: '74%', top: '22%' }}>DEF</div>
                <div className="player-3d away" style={{ left: '76%', top: '42%' }}>DEF</div>
                <div className="player-3d away" style={{ left: '76%', top: '60%' }}>DEF</div>
                <div className="player-3d away" style={{ left: '74%', top: '80%' }}>DEF</div>
                <div className="player-3d away" style={{ left: '48%', top: '32%' }}>MED</div>
                <div className="player-3d away" style={{ left: '50%', top: '52%' }}>MED</div>
                <div className="player-3d away" style={{ left: '48%', top: '72%' }}>MED</div>
                <div className="player-3d away" style={{ left: '24%', top: '25%' }}>DEL</div>
                <div className="player-3d away" style={{ left: '21%', top: '50%' }}>DEL</div>
                <div className="player-3d away" style={{ left: '24%', top: '75%' }}>DEL</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Possession Momentum Bar */}
        <div className="momentum-wrapper">
          <span>Dominio {homeTeam.name} ({momentum}%)</span>
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
            <select value={homeTactic} onChange={e => setHomeTactic(e.target.value as any)} className="bb-select">
              <option value="Equilibrada">Equilibrada</option>
              <option value="Tiki-Taka">Tiki-Taka (Posesión)</option>
              <option value="Gegenpress">Gegenpressing (Presión Alta)</option>
              <option value="Autobús">Autobús (Defensiva)</option>
            </select>
          </div>

          <button className="sub-trigger-btn" onClick={() => setShowSubModal(true)}>
            <RefreshCw size={16} /> Sustituciones
          </button>
        </div>

        {/* Live Commentary Feed */}
        <div className="live-event-feed">
          <h3>Comentarios y Eventos en Vivo</h3>
          <div className="events-scroll">
            {events.length === 0 ? (
              <p className="no-events">Minuto {minute}': El colegiado da inicio a las acciones en el terreno de juego.</p>
            ) : (
              events.map((ev, idx) => (
                <div key={idx} className="event-item">
                  <span className="event-min">{ev.minute}'</span>
                  <span className="event-desc">
                    ⚽ ¡GOOOOOOL DE {ev.teamId === homeTeam.id ? homeTeam.name : awayTeam.name}!
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="live-modal-footer">
          {minute >= 90 ? (
            <button className="create-btn" onClick={() => onFinish(homeScore, awayScore, events)}>
              Guardar Resultado y Finalizar
            </button>
          ) : (
            <button className="settings-btn" onClick={onClose}>
              Cerrar (Continuar en segundo plano)
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
