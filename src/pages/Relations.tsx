import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team, type League, type Player } from '../db/db';
import { Shield, Users, HeartHandshake, Award, MessageSquare, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';

export function Relations() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const loadData = async () => {
    const lid = Number(leagueId);
    if (!lid) return;

    const l = await db.leagues.get(lid);
    if (!l || !l.userTeamId) return;
    setLeague(l);

    const uTeam = await db.teams.get(l.userTeamId);
    if (uTeam) setTeam(uTeam);

    const p = await db.players.where('teamId').equals(l.userTeamId).toArray();
    setPlayers(p);
  };

  useEffect(() => {
    loadData();
  }, [leagueId]);

  // Dynamic calculations from database
  const totalGames = team ? (team.wins + team.draws + team.losses) : 0;
  const winRate = totalGames > 0 && team ? Math.round((team.wins / totalGames) * 100) : 50;

  // 1. Board Confidence (from team or derived)
  const boardConfidence = team?.boardConfidence ?? Math.min(100, Math.max(25, 60 + (team ? (team.wins * 3 + team.draws - team.losses * 2) : 0)));

  // 2. Fan Approval (from win rate, goals, attendance)
  const fanApproval = Math.min(100, Math.max(30, Math.round(winRate * 0.7 + ((team?.goalsFor || 0) > (team?.goalsAgainst || 0) ? 25 : 10))));

  // 3. Dressing Room Morale (average from players)
  const avgMorale = players.length > 0
    ? Math.round(players.reduce((acc, pl) => acc + (pl.morale ?? 85), 0) / players.length)
    : 85;

  const getBarColor = (val: number) => {
    if (val >= 75) return '#10b981'; // green
    if (val >= 45) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getStatusText = (val: number) => {
    if (val >= 85) return 'Excelente';
    if (val >= 70) return 'Positivo';
    if (val >= 45) return 'Bajo Escrutinio';
    return 'Peligro Crítico';
  };

  // Interactive Manager Actions
  const handleBoardMeeting = async () => {
    if (!team) return;
    const boost = Math.floor(Math.random() * 5) + 3;
    const updatedBoard = Math.min(100, boardConfidence + boost);
    team.boardConfidence = updatedBoard;
    await db.teams.put(team);
    setTeam({ ...team });
    setActionFeedback(`✔ Has presentado el informe trimestral a la Junta Directiva. Confianza aumentada a ${updatedBoard}%.`);
    setTimeout(() => setActionFeedback(null), 5000);
  };

  const handleFanAddress = async () => {
    if (!team) return;
    setActionFeedback(`📣 Has publicado una carta abierta a la afición en redes del club. Los aficionados agradecen tu cercanía y compromiso.`);
    setTimeout(() => setActionFeedback(null), 5000);
  };

  const handleTeamPepTalk = async () => {
    if (players.length === 0) return;
    const updatedPlayers = players.map(p => ({
      ...p,
      morale: Math.min(100, (p.morale ?? 85) + 5)
    }));
    await db.players.bulkPut(updatedPlayers);
    setPlayers(updatedPlayers);
    setActionFeedback(`🔥 ¡Charla motivacional impartida en el vestuario! La moral de toda la plantilla ha aumentado +5 puntos.`);
    setTimeout(() => setActionFeedback(null), 5000);
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="page-header" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.2)', paddingBottom: '1rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#f8fafc' }}>
          <HeartHandshake color="#38bdf8" size={28} /> Relaciones Institucionales & Entorno del Club
        </h1>
        <p style={{ color: '#94a3b8' }}>
          Monitoriza y gestiona la estabilidad política de tu proyecto deportivo con la junta directiva, la masa social y la plantilla.
        </p>
      </div>

      {actionFeedback && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '8px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          color: '#ffffff',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle color="#10b981" size={20} />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Main 3 Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Board */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: `4px solid ${getBarColor(boardConfidence)}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ margin: 0, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
              <Shield size={20} color="#38bdf8" /> Junta Directiva
            </h3>
            <span style={{ fontWeight: 'bold', color: getBarColor(boardConfidence), fontSize: '0.95rem' }}>
              {getStatusText(boardConfidence)} ({boardConfidence}%)
            </span>
          </div>

          <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ width: `${boardConfidence}%`, background: getBarColor(boardConfidence), height: '100%', transition: 'width 0.5s ease' }} />
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 1.25rem 0' }}>
            {boardConfidence >= 75
              ? `El presidente y el consejo respaldan plenamente tu gestión en ${team?.name || 'el club'}. El balance deportivo cumple los objetivos de la temporada.`
              : boardConfidence >= 45
              ? `La directiva exige una mejora en los próximos encuentros. Es imprescindible mantener al equipo en puestos acordes a su prestigio.`
              : `🚨 ALERTA: La junta directiva está muy insatisfecha. Tu puesto de entrenador corre serio riesgo de destitución si no sumas victorias.`}
          </p>

          <button
            onClick={handleBoardMeeting}
            className="tm-btn-primary"
            style={{ width: '100%', fontSize: '0.85rem', padding: '8px', background: '#0284c7', fontWeight: 'bold' }}
          >
            📋 Convocar Reunión con la Directiva
          </button>
        </div>

        {/* Fans */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: `4px solid ${getBarColor(fanApproval)}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ margin: 0, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
              <Users size={20} color="#fbbf24" /> Masa Social & Afición
            </h3>
            <span style={{ fontWeight: 'bold', color: getBarColor(fanApproval), fontSize: '0.95rem' }}>
              {getStatusText(fanApproval)} ({fanApproval}%)
            </span>
          </div>

          <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ width: `${fanApproval}%`, background: getBarColor(fanApproval), height: '100%', transition: 'width 0.5s ease' }} />
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 1.25rem 0' }}>
            {fanApproval >= 75
              ? `Las gradas corean tu nombre. El estilo ofensivo y el compromiso del equipo tienen a la hinchada entusiasmada jornada tras jornada.`
              : `La afición espera mayor contundencia y entrega en los derbis y encuentros clave de liga.`}
          </p>

          <button
            onClick={handleFanAddress}
            className="tm-btn-primary"
            style={{ width: '100%', fontSize: '0.85rem', padding: '8px', background: '#d97706', fontWeight: 'bold' }}
          >
            📣 Comunicado Oficial a la Afición
          </button>
        </div>

        {/* Players */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: `4px solid ${getBarColor(avgMorale)}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ margin: 0, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
              <Sparkles size={20} color="#a855f7" /> Moral del Vestuario
            </h3>
            <span style={{ fontWeight: 'bold', color: getBarColor(avgMorale), fontSize: '0.95rem' }}>
              {getStatusText(avgMorale)} ({avgMorale}%)
            </span>
          </div>

          <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ width: `${avgMorale}%`, background: getBarColor(avgMorale), height: '100%', transition: 'width 0.5s ease' }} />
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 1.25rem 0' }}>
            Plantilla compuesta por {players.length} futbolistas. El ambiente colectivo es{' '}
            {avgMorale >= 80 ? 'sólido y unido de cara al próximo partido.' : 'frágil y necesita un impulso de motivación.'}
          </p>

          <button
            onClick={handleTeamPepTalk}
            className="tm-btn-primary"
            style={{ width: '100%', fontSize: '0.85rem', padding: '8px', background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', fontWeight: 'bold' }}
          >
            🔥 Charla Motivacional (+5 Moral)
          </button>
        </div>
      </div>
    </div>
  );
}
