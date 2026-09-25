import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League, formatMoney, getInitialPlayerStats } from '../db/db';
import { CustomModal } from '../components/common/CustomModal';
import { Sparkles, Dumbbell, Shield, Target, Zap, HeartPulse, Search, UserPlus, ArrowUpRight, Award } from 'lucide-react';

interface TrainingRegimeOption {
  id: 'balance' | 'attacking' | 'defending' | 'physical' | 'technical' | 'recovery';
  title: string;
  icon: any;
  color: string;
  desc: string;
  effect: string;
}

const REGIMES: TrainingRegimeOption[] = [
  {
    id: 'balance',
    title: 'Equilibrado',
    icon: Sparkles,
    color: '#38bdf8',
    desc: 'Sesión integral sin foco excesivo. Mantiene la forma física y la cohesión de la plantilla.',
    effect: 'Desarrollo estándar semanal de todos los atributos y recuperación regular.'
  },
  {
    id: 'attacking',
    title: 'Definición & Ataque',
    icon: Target,
    color: '#f43f5e',
    desc: 'Finalización en el área, transiciones ofensivas rápidas y disparos de media distancia.',
    effect: '+Probabilidad de progresión en Tiro, Velocidad y OVR para delanteros y mediapuntas.'
  },
  {
    id: 'defending',
    title: 'Solidez Defensiva & Táctica',
    icon: Shield,
    color: '#3b82f6',
    desc: 'Línea de contención, marcaje en zona, anticipación y salidas desde atrás con balón jugado.',
    effect: '+Probabilidad de mejora en Defensa y entrada limpia para centrales, laterales y porteros.'
  },
  {
    id: 'technical',
    title: 'Tiki-Taka & Posesión',
    icon: Zap,
    color: '#10b981',
    desc: 'Rondos a un toque, visión de juego, pases entre líneas y control orientado bajo presión.',
    effect: '+Probabilidad de aumento en Pases, Visión y Dribling para el mediocampo.'
  },
  {
    id: 'physical',
    title: 'Potencia & Acondicionamiento',
    icon: Dumbbell,
    color: '#eab308',
    desc: 'Gimnasio intensivo, resistencia aeróbica y duelos cuerpo a cuerpo.',
    effect: '+Probabilidad de aumento en Físico y Agresividad. Mayor desgaste semanal (+fatiga).'
  },
  {
    id: 'recovery',
    title: 'Spa & Recuperación Activa',
    icon: HeartPulse,
    color: '#a855f7',
    desc: 'Sesión de hidroterapia, masaje muscular y descanso regenerativo.',
    effect: 'Recupera hasta un -25% extra de fatiga en toda la plantilla y reduce riesgo de lesiones.'
  }
];

const FIRST_NAMES = ['Mateo', 'Lucas', 'Julian', 'Santiago', 'Nicolas', 'Alejandro', 'Enzo', 'Thiago', 'Gabriel', 'Maxi', 'Gavi', 'Lamine', 'Fermin', 'Marc', 'Pau'];
const LAST_NAMES = ['Navarro', 'Silva', 'Molina', 'Rios', 'Delgado', 'Cabrera', 'Romero', 'Sosa', 'Herrera', 'Castillo', 'Vidal', 'Guerrero', 'Montes', 'Campos'];
const COUNTRIES = ['España', 'Argentina', 'Brasil', 'Francia', 'Portugal', 'Uruguay', 'Colombia', 'Italia'];

export function YouthAcademy() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [youthPlayers, setYouthPlayers] = useState<Player[]>([]);
  const [promotingPlayer, setPromotingPlayer] = useState<Player | null>(null);
  const [isScouting, setIsScouting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const loadData = async () => {
    const lid = Number(leagueId);
    if (!lid) return;
    const l = await db.leagues.get(lid);
    if (!l || !l.userTeamId) return;
    setLeague(l);

    const userTeam = await db.teams.get(l.userTeamId);
    if (userTeam) setTeam(userTeam);

    const p = await db.players.where('teamId').equals(l.userTeamId).toArray();
    const youth = p.filter(player => player.lineupStatus === 'youth');
    setYouthPlayers(youth.sort((a, b) => b.potential - a.potential));
  };

  useEffect(() => {
    loadData();
  }, [leagueId]);

  const handleSelectRegime = async (regimeId: TrainingRegimeOption['id']) => {
    if (!team) return;
    team.trainingFocus = regimeId;
    await db.teams.put(team);
    setTeam({ ...team });
    setStatusMsg({
      text: `¡Plan de entrenamiento cambiado a "${REGIMES.find(r => r.id === regimeId)?.title}"! Tendrá efecto en cada jornada simulada.`,
      type: 'success'
    });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const [trialCandidates, setTrialCandidates] = useState<Player[] | null>(null);
  const [signedCandidateIndices, setSignedCandidateIndices] = useState<number[]>([]);

  const handleScoutTrials = async () => {
    if (!team || !league) return;
    const cost = 500000;
    if (team.budget < cost) {
      setStatusMsg({ text: 'Fondos insuficientes. Necesitas al menos $500k en el presupuesto del club para realizar pruebas.', type: 'error' });
      return;
    }

    setIsScouting(true);
    team.budget -= cost;
    await db.teams.put(team);

    // Generate 4 fresh random youth prospects with varying positions and potential
    const positions: Array<'POR' | 'DEF' | 'MED' | 'DEL'> = ['POR', 'DEF', 'MED', 'DEL'];
    const specMap: Record<string, Array<'POR' | 'DFC' | 'LI' | 'LD' | 'MCD' | 'MC' | 'MCO' | 'EI' | 'ED' | 'DC'>> = {
      POR: ['POR'],
      DEF: ['DFC', 'LI', 'LD'],
      MED: ['MCD', 'MC', 'MCO'],
      DEL: ['DC', 'EI', 'ED']
    };

    const candidates: Player[] = [];
    for (let i = 0; i < 4; i++) {
      const pos = positions[i % positions.length];
      const specList = specMap[pos];
      const spec = specList[Math.floor(Math.random() * specList.length)];
      const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      const name = `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`;
      const overall = 58 + Math.floor(Math.random() * 14); // 58-71
      const potential = Math.min(96, overall + 14 + Math.floor(Math.random() * 16)); // 72-96

      candidates.push({
        leagueId: league.id!,
        teamId: team.id!,
        name: `${name} (Canterano)`,
        age: 15 + Math.floor(Math.random() * 4), // 15-18
        overall,
        potential,
        position: pos,
        specificPosition: spec,
        contract: 15000,
        contractYears: 4,
        lineupStatus: 'youth',
        recruitedYear: league.season,
        stats: getInitialPlayerStats(),
        bio: {
          country,
          height: 170 + Math.floor(Math.random() * 20),
          weight: 62 + Math.floor(Math.random() * 22)
        },
        attributes: {
          pace: overall + Math.floor(Math.random() * 12) - 6,
          shooting: pos === 'DEL' ? overall + 6 : overall - 8,
          passing: pos === 'MED' ? overall + 6 : overall - 6,
          dribbling: overall + Math.floor(Math.random() * 8) - 2,
          defending: pos === 'DEF' ? overall + 8 : pos === 'POR' ? 40 : 45,
          physical: overall - 2 + Math.floor(Math.random() * 10)
        },
        morale: 95,
        fatigue: 0,
        isInjured: false
      });
    }

    setSignedCandidateIndices([]);
    setTrialCandidates(candidates);
    setIsScouting(false);
  };

  const handleSignCandidate = async (index: number) => {
    if (!trialCandidates || !trialCandidates[index]) return;
    const playerToSign = trialCandidates[index];
    await db.players.add(playerToSign);
    setSignedCandidateIndices(prev => [...prev, index]);
    await loadData();
    setStatusMsg({
      text: `¡Fichaje completado! ${playerToSign.name} ha firmado con la cantera del club.`,
      type: 'success'
    });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleSignAllCandidates = async () => {
    if (!trialCandidates) return;
    const unsigned = trialCandidates.filter((_, idx) => !signedCandidateIndices.includes(idx));
    if (unsigned.length > 0) {
      await db.players.bulkAdd(unsigned);
      setSignedCandidateIndices(trialCandidates.map((_, idx) => idx));
      await loadData();
      setStatusMsg({
        text: `¡Has incorporado a todos los ${unsigned.length} canteranos a tu filial!`,
        type: 'success'
      });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  const confirmPromote = async () => {
    if (!promotingPlayer) return;
    promotingPlayer.lineupStatus = 'reserve';
    await db.players.put(promotingPlayer);
    setYouthPlayers(youthPlayers.filter(yp => yp.id !== promotingPlayer.id));
    setPromotingPlayer(null);
    setStatusMsg({
      text: `¡${promotingPlayer.name} ha sido promocionado al Primer Equipo y ya está disponible en Plantilla y Tácticas!`,
      type: 'success'
    });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const activeRegime = REGIMES.find(r => r.id === (team?.trainingFocus || 'balance')) || REGIMES[0];

  return (
    <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
            <Award color="#38bdf8" /> Cantera & Centro de Alto Rendimiento
          </h1>
          <p style={{ color: '#94a3b8', margin: '0.4rem 0 0 0' }}>
            Desarrolla promesas juveniles, planifica el entrenamiento semanal y nutre al primer equipo de talento de élite.
          </p>
        </div>

        <button
          onClick={handleScoutTrials}
          disabled={isScouting}
          className="tm-btn-primary"
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            padding: '0.75rem 1.4rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            borderRadius: '10px',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
            cursor: isScouting ? 'not-allowed' : 'pointer'
          }}
        >
          <Search size={18} />
          {isScouting ? 'Ojeando...' : 'Realizar Pruebas Juveniles (-$500k)'}
        </button>
      </div>

      {statusMsg && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          backgroundColor: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${statusMsg.type === 'success' ? '#10b981' : '#ef4444'}`,
          color: statusMsg.type === 'success' ? '#34d399' : '#f87171',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {statusMsg.type === 'success' ? '✅' : '⚠️'} {statusMsg.text}
        </div>
      )}

      {/* Training Regimes Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#f1f5f9', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Dumbbell color="#a855f7" size={20} /> Plan de Entrenamiento Semanal
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Selecciona el enfoque táctico para las sesiones de entrenamiento de tu club.
            </span>
          </div>

          <div style={{
            background: 'rgba(30, 41, 59, 0.8)',
            padding: '0.4rem 0.9rem',
            borderRadius: '20px',
            border: `1px solid ${activeRegime.color}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Régimen Activo:</span>
            <strong style={{ color: activeRegime.color, fontSize: '0.85rem' }}>{activeRegime.title}</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {REGIMES.map(regime => {
            const Icon = regime.icon;
            const isSelected = (team?.trainingFocus || 'balance') === regime.id;
            return (
              <div
                key={regime.id}
                onClick={() => handleSelectRegime(regime.id)}
                style={{
                  background: isSelected ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.65)',
                  border: isSelected ? `2px solid ${regime.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? `0 8px 24px -6px ${regime.color}40` : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: regime.color,
                    color: '#0f172a',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    ACTIVO
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: `${regime.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon color={regime.color} size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', color: isSelected ? '#ffffff' : '#e2e8f0' }}>
                      {regime.title}
                    </h3>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
                  {regime.desc}
                </p>

                <div style={{
                  fontSize: '0.75rem',
                  color: regime.color,
                  background: `${regime.color}15`,
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontWeight: 500
                }}>
                  ⚡ {regime.effect}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Youth Academy Squad Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#f1f5f9', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserPlus color="#38bdf8" size={20} /> Promesas en el Filial ({youthPlayers.length})
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Los canteranos progresan automáticamente según su potencial y las sesiones de entrenamiento.
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Presupuesto disponible: <strong style={{ color: '#eab308' }}>{formatMoney(team?.budget || 0)}</strong>
          </div>
        </div>

        <div className="standings-content glass-panel" style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <table className="table-container bb-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(15, 23, 42, 0.8)' }}>
                <th style={{ padding: '12px' }}>Jugador</th>
                <th style={{ padding: '12px' }}>Nacionalidad</th>
                <th style={{ padding: '12px' }}>Posición</th>
                <th style={{ padding: '12px' }}>Edad</th>
                <th style={{ padding: '12px' }}>OVR Actual</th>
                <th style={{ padding: '12px' }}>Potencial</th>
                <th style={{ padding: '12px' }}>Progresión</th>
                <th style={{ padding: '12px' }}>Reclutado</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {youthPlayers.map(p => {
                const growth = p.potential - p.overall;
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>
                      <Link to={`/l/${leagueId}/player/${p.id}`} style={{ color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {p.name}
                        <ArrowUpRight size={14} color="#94a3b8" />
                      </Link>
                    </td>
                    <td style={{ padding: '12px', color: '#cbd5e1' }}>{p.bio?.country || 'España'}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        backgroundColor: p.position === 'DEL' ? 'rgba(239, 68, 68, 0.2)' :
                                         p.position === 'MED' ? 'rgba(16, 185, 129, 0.2)' :
                                         p.position === 'DEF' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                        color: p.position === 'DEL' ? '#f87171' :
                               p.position === 'MED' ? '#34d399' :
                               p.position === 'DEF' ? '#60a5fa' : '#fde047'
                      }}>
                        {p.specificPosition || p.position}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#cbd5e1' }}>{p.age} años</td>
                    <td style={{ padding: '12px', fontWeight: 'bold', fontSize: '1rem', color: '#f1f5f9' }}>{p.overall}</td>
                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: p.potential >= 88 ? '#fbbf24' : '#38bdf8', fontSize: '1rem' }}>
                        {p.potential}
                      </strong>
                      {p.potential >= 90 && <span style={{ marginLeft: '4px' }}>🌟</span>}
                    </td>
                    <td style={{ padding: '12px', minWidth: '130px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          flex: 1,
                          height: '6px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${(p.overall / p.potential) * 100}%`,
                            height: '100%',
                            background: p.potential >= 88 ? 'linear-gradient(90deg, #38bdf8, #fbbf24)' : '#38bdf8',
                            borderRadius: '3px'
                          }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>+{growth}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', color: '#94a3b8', fontSize: '0.85rem' }}>
                      {p.recruitedYear ? `Temp. ${p.recruitedYear}` : 'Inicial'}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => setPromotingPlayer(p)}
                        className="tm-btn-primary"
                        style={{
                          padding: '6px 12px',
                          fontSize: '0.78rem',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        ⬆️ Subir al 1º Equipo
                      </button>
                    </td>
                  </tr>
                );
              })}
              {youthPlayers.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Tu equipo filial no tiene canteranos en este momento.</p>
                    <button
                      onClick={handleScoutTrials}
                      disabled={isScouting}
                      className="tm-btn-primary"
                      style={{ padding: '8px 16px', background: '#0284c7', fontWeight: 'bold' }}
                    >
                      🔎 Realizar Pruebas Juveniles (-$500k)
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {promotingPlayer && (
        <CustomModal
          isOpen={true}
          title="Promoción de Canterano al Primer Equipo"
          message={`¿Deseas ascender a ${promotingPlayer.name} (OVR ${promotingPlayer.overall} / POT ${promotingPlayer.potential}) al Primer Equipo? Pasará a formar parte de la plantilla principal y podrás alinearlo en el próximo partido.`}
          confirmText="Sí, Subir al Primer Equipo"
          cancelText="Cancelar"
          onConfirm={confirmPromote}
          onCancel={() => setPromotingPlayer(null)}
        />
      )}

      {trialCandidates && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #1e293b, #0f172a)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '920px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(15, 23, 42, 0.6)'
            }}>
              <div>
                <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🌟</span> Candidatos de las Pruebas Juveniles
                </h3>
                <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
                  Nuestros ojeadores han evaluado a estos jóvenes talentos. Selecciona a quiénes deseas fichar para el filial.
                </p>
              </div>
              <button
                onClick={() => setTrialCandidates(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {/* Candidates Grid */}
            <div style={{
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {trialCandidates.map((candidate, idx) => {
                const isSigned = signedCandidateIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    style={{
                      background: isSigned ? 'rgba(16, 185, 129, 0.08)' : 'rgba(30, 41, 59, 0.7)',
                      border: isSigned ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '1.2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      {/* Top Bar: Position & Nationality */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          backgroundColor: candidate.position === 'DEL' ? 'rgba(239, 68, 68, 0.25)' :
                                           candidate.position === 'MED' ? 'rgba(16, 185, 129, 0.25)' :
                                           candidate.position === 'DEF' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(234, 179, 8, 0.25)',
                          color: candidate.position === 'DEL' ? '#f87171' :
                                 candidate.position === 'MED' ? '#34d399' :
                                 candidate.position === 'DEF' ? '#60a5fa' : '#fde047'
                        }}>
                          {candidate.specificPosition || candidate.position}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                          {candidate.bio?.country || 'Internacional'} • {candidate.age} años
                        </span>
                      </div>

                      {/* Name & OVR / Pot */}
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#f1f5f9', fontSize: '1.05rem' }}>
                        {candidate.name}
                      </h4>

                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          textAlign: 'center',
                          flex: 1
                        }}>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>OVR Actual</div>
                          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#38bdf8' }}>{candidate.overall}</div>
                        </div>

                        <div style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          textAlign: 'center',
                          flex: 1
                        }}>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Potencial</div>
                          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: candidate.potential >= 88 ? '#fbbf24' : '#34d399' }}>
                            {candidate.potential} {candidate.potential >= 90 ? '🌟' : ''}
                          </div>
                        </div>
                      </div>

                      {/* Key Attributes Mini Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '6px',
                        background: 'rgba(15, 23, 42, 0.4)',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ color: '#cbd5e1' }}>Ritmo: <strong style={{ color: '#fff' }}>{candidate.attributes?.pace || 60}</strong></div>
                        <div style={{ color: '#cbd5e1' }}>Tiro: <strong style={{ color: '#fff' }}>{candidate.attributes?.shooting || 60}</strong></div>
                        <div style={{ color: '#cbd5e1' }}>Pase: <strong style={{ color: '#fff' }}>{candidate.attributes?.passing || 60}</strong></div>
                        <div style={{ color: '#cbd5e1' }}>Regate: <strong style={{ color: '#fff' }}>{candidate.attributes?.dribbling || 60}</strong></div>
                        <div style={{ color: '#cbd5e1' }}>Defensa: <strong style={{ color: '#fff' }}>{candidate.attributes?.defending || 60}</strong></div>
                        <div style={{ color: '#cbd5e1' }}>Físico: <strong style={{ color: '#fff' }}>{candidate.attributes?.physical || 60}</strong></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleSignCandidate(idx)}
                      disabled={isSigned}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        cursor: isSigned ? 'default' : 'pointer',
                        background: isSigned
                          ? 'rgba(16, 185, 129, 0.2)'
                          : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                        color: isSigned ? '#10b981' : '#ffffff',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isSigned ? '✔ Fichado para el Filial' : '✍️ Fichar Canterano'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(15, 23, 42, 0.6)'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Fichados: {signedCandidateIndices.length} de {trialCandidates.length}
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {signedCandidateIndices.length < trialCandidates.length && (
                  <button
                    onClick={handleSignAllCandidates}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(16, 185, 129, 0.5)',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    🌟 Fichar a Todos
                  </button>
                )}
                <button
                  onClick={() => setTrialCandidates(null)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#334155',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Finalizar Pruebas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
