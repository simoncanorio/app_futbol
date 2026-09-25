import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League } from '../db/db';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Target, Share2, Shield, Flame, Activity, Award, CheckCircle, RefreshCw, FileText } from 'lucide-react';

export function PlayerProfile() {
  const { leagueId, playerId } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [league, setLeague] = useState<League | null>(null);
  const [activeTab, setActiveTab] = useState<'all_stats' | 'attack' | 'passing' | 'defense' | 'discipline'>('all_stats');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const pid = Number(playerId);
      const l = await db.leagues.get(lid);
      setLeague(l || null);
      
      const p = await db.players.get(pid);
      if (p) {
        setPlayer(p);
        if (p.teamId) {
          const t = await db.teams.get(p.teamId);
          setTeam(t || null);
        }
      }
    }
    load();
  }, [leagueId, playerId]);

  if (!player) return <div className="page-container">Cargando perfil del jugador...</div>;

  const s = player.stats || {};

  const radarData = [
    { subject: 'Ritmo (PAC)', A: player.attributes?.pace || 70, fullMark: 100 },
    { subject: 'Tiro (SHO)', A: player.attributes?.shooting || 70, fullMark: 100 },
    { subject: 'Pase (PAS)', A: player.attributes?.passing || 70, fullMark: 100 },
    { subject: 'Regate (DRI)', A: player.attributes?.dribbling || 70, fullMark: 100 },
    { subject: 'Defensa (DEF)', A: player.attributes?.defending || 70, fullMark: 100 },
    { subject: 'Físico (PHY)', A: player.attributes?.physical || 70, fullMark: 100 },
  ];

  const passAccuracy = (s.passesAttempted || 0) > 0 ? Math.round(((s.passesCompleted || 0) / (s.passesAttempted || 1)) * 100) : 0;
  const dribbleAccuracy = (s.dribblesAttempted || 0) > 0 ? Math.round(((s.dribblesCompleted || 0) / (s.dribblesAttempted || 1)) * 100) : 0;
  const duelWinPct = ((s.duelsWon || 0) + (s.duelsLost || 0)) > 0 ? Math.round(((s.duelsWon || 0) / ((s.duelsWon || 0) + (s.duelsLost || 1))) * 100) : 0;

  return (
    <div className="page-container" style={{maxWidth: '1200px', margin: '0 auto'}}>
      {/* HEADER SECTION */}
      <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
        <div style={{ width: '120px', height: '140px', background: '#0f172a', border: '2px solid #38bdf8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ textAlign: 'center' }}>
             <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#38bdf8' }}>{player.position}</div>
             <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{player.bio?.country || 'Internacional'}</div>
          </div>
        </div>
        
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '2.2rem' }}>{player.name}</h1>
          <div style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.7' }}>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: '#eab308', fontWeight: 'bold' }}>{player.position}</span>
              <span>•</span>
              {team ? (
                <Link to={`/l/${leagueId}/team/${team.id}`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>{team.name}</Link>
              ) : (
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Agente Libre</span>
              )}
              <span>•</span>
              <span>{player.age} Años ({player.bio?.height || 180} cm, {player.bio?.weight || 75} kg)</span>
            </div>
            <div>Salario: <strong>${(player.contract / 1000000).toFixed(2)}M/año</strong> | Contrato: <strong>{player.contractYears || 2} Años restantes</strong></div>
            {player.isTransferListed && <span style={{ color: '#ef4444', fontWeight: 'bold' }}>🏷️ Declarado Transferible</span>}
            {player.isOnLoan && <span style={{ color: '#fbbf24', fontWeight: 'bold', marginLeft: '0.5rem' }}>🔄 Cedido en préstamo</span>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'center', background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem 1.2rem', borderRadius: '10px', border: '1px solid #38bdf8' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase' }}>Overall</div>
            <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '2rem' }}>
              {player.overall}
            </div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(245, 158, 11, 0.1)', padding: '0.8rem 1.2rem', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase' }}>Potencial</div>
            <div style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '2rem' }}>
              {player.potential}
            </div>
          </div>
        </div>
      </div>

      {/* RADAR & ATTRIBUTES */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#e67e22', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={18} /> Atributos Técnicos & Físicos
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Ritmo (PAC)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#38bdf8' }}>{player.attributes?.pace || '-'}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tiro (SHO)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ef4444' }}>{player.attributes?.shooting || '-'}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Pase (PAS)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10b981' }}>{player.attributes?.passing || '-'}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Regate (DRI)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#f59e0b' }}>{player.attributes?.dribbling || '-'}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Defensa (DEF)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b5cf6' }}>{player.attributes?.defending || '-'}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Físico (PHY)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ec4899' }}>{player.attributes?.physical || '-'}</div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1rem', height: '260px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: '#38bdf8' }}>Mapa de Rendimiento Táctico</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
              <Radar name={player.name} dataKey="A" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ALL STATS CATEGORIES SECTION (Request 8) */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
          <Activity size={22} /> Todas las Categorías de Estadísticas Detalladas
        </h2>

        {/* Category Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          
          {/* Card 1: Ataque & Finalización */}
          <div className="glass-panel" style={{ padding: '1.2rem' }}>
            <h3 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
              🎯 Ataque & Finalización
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Goles Totales:</span>
                <strong>{s.goals || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Expected Goals (xG):</span>
                <strong>{s.xG?.toFixed(2) || '0.00'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Tiros Totales / A Puerta:</span>
                <strong>{s.shotsTotal || 0} / {s.shotsOnTarget || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Oportunidades Claras Falladas:</span>
                <strong>{s.bigChancesMissed || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Penaltis (Marcados/Intentados):</span>
                <strong>{s.penaltiesScored || 0} / {s.penaltiesAttempted || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Goles Dentro / Fuera del Área:</span>
                <strong>{s.goalsInsideBox || 0} / {s.goalsOutsideBox || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Goles de Cabeza / Falta:</span>
                <strong>{s.headerGoals || 0} / {s.freeKickGoals || 0}</strong>
              </div>
            </div>
          </div>

          {/* Card 2: Pase & Creación */}
          <div className="glass-panel" style={{ padding: '1.2rem' }}>
            <h3 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
              👟 Pase & Creación de Juego
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Asistencias Totales:</span>
                <strong>{s.assists || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Expected Assists (xA):</span>
                <strong>{s.xA?.toFixed(2) || '0.00'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Pases Clave (Key Passes):</span>
                <strong>{s.keyPasses || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Oportunidades Creadas:</span>
                <strong>{s.bigChancesCreated || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Precisión de Pases (%):</span>
                <strong>{s.passesCompleted || 0}/{s.passesAttempted || 0} ({passAccuracy}%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Pases Campo Propio / Rival:</span>
                <strong>{s.ownHalfPassesCompleted || 0} / {s.oppHalfPassesCompleted || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Centros / Balones Largos:</span>
                <strong>{s.crossesCompleted || 0} / {s.longBallsCompleted || 0}</strong>
              </div>
            </div>
          </div>

          {/* Card 3: Defensa & Intercepciones */}
          <div className="glass-panel" style={{ padding: '1.2rem' }}>
            <h3 style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
              🛡️ Defensa & Recuperación
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Entradas Ganadas (Tackles):</span>
                <strong>{s.tackles || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Intercepciones:</span>
                <strong>{s.interceptions || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Balones Recuperados:</span>
                <strong>{s.ballsRecovered || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Despejes Realizados:</span>
                <strong>{s.clearances || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Tiros Bloqueados:</span>
                <strong>{s.shotsBlocked || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Vallas Invictas (Clean Sheets):</span>
                <strong>{s.cleanSheets || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Errores que causaron Tiro/Gol:</span>
                <strong>{(s.errorsLeadingToShot || 0) + (s.errorsLeadingToGoal || 0)}</strong>
              </div>
            </div>
          </div>

          {/* Card 4: Duelos, Regates & Disciplina */}
          <div className="glass-panel" style={{ padding: '1.2rem' }}>
            <h3 style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
              🤼 Duelos, Regates & Disciplina
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Regates Completados:</span>
                <strong>{s.dribblesCompleted || 0} / {s.dribblesAttempted || 0} ({dribbleAccuracy}%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Duelos Ganados (%):</span>
                <strong>{s.duelsWon || 0} / {(s.duelsWon || 0) + (s.duelsLost || 0)} ({duelWinPct}%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Duelos Suelo / Aéreos Ganados:</span>
                <strong>{s.groundDuelsWon || 0} / {s.aerialDuelsWon || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Faltas Cometidas / Recibidas:</span>
                <strong>{s.foulsCommitted || 0} / {s.foulsReceived || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Tarjetas Amarillas / Rojas:</span>
                <strong>{s.yellowCards || 0} 🟨 / {s.redCards || 0} 🟥</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Posesiones Perdidas:</span>
                <strong>{s.possessionLost || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Fueras de Juego:</span>
                <strong>{s.offsides || 0}</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
