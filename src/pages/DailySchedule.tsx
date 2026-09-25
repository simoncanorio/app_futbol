import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Match, type Team, type Player, type League } from '../db/db';
import { advanceWeek } from '../engine/gameLoop';
import { LiveMatchEngine } from '../components/match/LiveMatchEngine';
import { Play, CheckCircle, Calendar, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import './DailySchedule.css';

interface MatchView extends Match {
  homeTeam: Team;
  awayTeam: Team;
}

export function DailySchedule() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [selectedJornada, setSelectedJornada] = useState<number>(1);
  const [maxJornadas, setMaxJornadas] = useState<number>(38);
  const [matches, setMatches] = useState<MatchView[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchView | null>(null);
  const [viewingPlayedSummary, setViewingPlayedSummary] = useState<MatchView | null>(null);
  const [homePlayers, setHomePlayers] = useState<Player[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const lid = Number(leagueId);
    if (!lid) return;

    const l = await db.leagues.get(lid);
    if (!l) return;
    setLeague(l);
    setSelectedJornada(l.currentWeek);

    // Calculate total matchdays from teams count
    const teams = await db.teams.where('leagueId').equals(lid).toArray();
    const teamMap = new Map(teams.map(t => [t.id!, t]));

    const numTeams = teams.length;
    const computedMax = numTeams > 1 ? (numTeams % 2 === 0 ? (numTeams - 1) * 2 : numTeams * 2) : 38;
    setMaxJornadas(computedMax);

    // Load fixtures for current selected week
    const weekMatches = await db.matches
      .where('leagueId')
      .equals(lid)
      .filter(m => m.week === (selectedJornada || l.currentWeek))
      .toArray();

    const views: MatchView[] = weekMatches.map(m => ({
      ...m,
      homeTeam: teamMap.get(m.homeTeamId) || { name: 'Equipo Local', overall: 75 } as Team,
      awayTeam: teamMap.get(m.awayTeamId) || { name: 'Equipo Visitante', overall: 75 } as Team
    }));

    setMatches(views);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [leagueId]);

  useEffect(() => {
    async function loadWeekMatches() {
      const lid = Number(leagueId);
      if (!lid) return;

      const weekMatches = await db.matches
        .where('leagueId')
        .equals(lid)
        .filter(m => m.week === selectedJornada)
        .toArray();

      const teams = await db.teams.where('leagueId').equals(lid).toArray();
      const teamMap = new Map(teams.map(t => [t.id!, t]));

      const views: MatchView[] = weekMatches.map(m => ({
        ...m,
        homeTeam: teamMap.get(m.homeTeamId) || { name: 'Equipo Local', overall: 75 } as Team,
        awayTeam: teamMap.get(m.awayTeamId) || { name: 'Equipo Visitante', overall: 75 } as Team
      }));

      setMatches(views);
    }
    loadWeekMatches();
  }, [selectedJornada, leagueId]);

  const handleMatchClick = async (m: MatchView) => {
    if (m.isPlayed) {
      // Unplayed restriction rule: If already played, show match summary modal instead of live 3D sim!
      setViewingPlayedSummary(m);
    } else {
      // Unplayed match: Launch 3D live match engine!
      setSelectedMatch(m);
      const hPlayers = await db.players.where('teamId').equals(m.homeTeamId).toArray();
      const aPlayers = await db.players.where('teamId').equals(m.awayTeamId).toArray();
      setHomePlayers(hPlayers);
      setAwayPlayers(aPlayers);
    }
  };

  const handleFinishMatch = async (homeScore: number, awayScore: number, events: Match['events']) => {
    if (!selectedMatch) return;

    selectedMatch.homeScore = homeScore;
    selectedMatch.awayScore = awayScore;
    selectedMatch.isPlayed = true;
    selectedMatch.events = events;

    await db.matches.put(selectedMatch);
    setSelectedMatch(null);
    loadData();
  };

  const handleSimulateWeek = async () => {
    if (!leagueId) return;
    await advanceWeek(Number(leagueId));
    loadData();
  };

  return (
    <div className="page-container ds-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Calendario Diario de Partidos & Simulación 3D</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Partidos distribuidos por jornadas oficiales (Jornada 1 a 38).</p>
        </div>
        <button className="play-btn-lg" onClick={handleSimulateWeek}>
          Simular Jornada {league?.currentWeek}
        </button>
      </div>

      {/* Jornada Navigation Selector */}
      <div className="jornada-bar glass-panel">
        <button
          className="jornada-nav-btn"
          disabled={selectedJornada <= 1}
          onClick={() => setSelectedJornada(j => Math.max(1, j - 1))}
        >
          <ChevronLeft size={18} /> Anterior
        </button>

        <div className="jornada-select-wrapper">
          <Calendar size={18} color="#38bdf8" />
          <select
            value={selectedJornada}
            onChange={e => setSelectedJornada(Number(e.target.value))}
            className="bb-select jornada-select"
          >
            {Array.from({ length: maxJornadas }, (_, i) => i + 1).map(j => (
              <option key={j} value={j}>
                Jornada {j} {j === league?.currentWeek ? '(Jornada Actual)' : ''}
              </option>
            ))}
          </select>
        </div>

        <button
          className="jornada-nav-btn"
          disabled={selectedJornada >= maxJornadas}
          onClick={() => setSelectedJornada(j => Math.min(maxJornadas, j + 1))}
        >
          Siguiente <ChevronRight size={18} />
        </button>
      </div>

      {/* Fixture Match Cards Grid */}
      <div className="ds-grid">
        {matches.map(m => (
          <div
            key={m.id}
            className={`match-card glass-panel ${m.isPlayed ? 'match-played' : 'match-pending'}`}
            onClick={() => handleMatchClick(m)}
          >
            <div style={{ position: 'absolute', top: '-10px', left: '15px' }}>
              {m.type === 'cup' ? (
                <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid #c084fc', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                  🏆 COPA NACIONAL
                </span>
              ) : m.type === 'continental' ? (
                <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                  🌟 CHAMPIONS LEAGUE
                </span>
              ) : (
                <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                  ⚽ LIGA
                </span>
              )}
            </div>

            <div className="mc-left" style={{ marginTop: '0.5rem' }}>
              <div className="mc-team">
                <div className="mc-team-info">
                  <span className={`mc-name ${m.isPlayed && m.homeScore > m.awayScore ? 'winner' : ''}`}>
                    {m.homeTeam.name}
                  </span>
                  <span className="mc-ovr">OVR {m.homeTeam.overall}</span>
                </div>
                <div className="mc-score">{m.isPlayed ? m.homeScore : '-'}</div>
              </div>

              <div className="mc-team">
                <div className="mc-team-info">
                  <span className={`mc-name ${m.isPlayed && m.awayScore > m.homeScore ? 'winner' : ''}`}>
                    {m.awayTeam.name}
                  </span>
                  <span className="mc-ovr">OVR {m.awayTeam.overall}</span>
                </div>
                <div className="mc-score">{m.isPlayed ? m.awayScore : '-'}</div>
              </div>
            </div>

            <div className="mc-right">
              {m.isPlayed ? (
                <span className="status-badge played">
                  <CheckCircle size={14} /> Finalizado
                </span>
              ) : (
                <button className="tm-btn-primary play-3d-btn">
                  <Play size={14} /> Ver en 3D
                </button>
              )}
            </div>
          </div>
        ))}

        {!loading && matches.length === 0 && (
          <div className="ds-empty glass-panel">
            <Trophy size={32} color="#94a3b8" />
            <p>No se encontraron partidos programados para la Jornada {selectedJornada}.</p>
          </div>
        )}
      </div>

      {/* 3D Live Engine Modal (Only for Unplayed matches) */}
      {selectedMatch && (
        <LiveMatchEngine
          match={selectedMatch}
          homeTeam={selectedMatch.homeTeam}
          awayTeam={selectedMatch.awayTeam}
          homePlayers={homePlayers}
          awayPlayers={awayPlayers}
          onFinish={handleFinishMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}

      {/* Played Match Recap Summary Modal */}
      {viewingPlayedSummary && (
        <div className="tm-modal-overlay" onClick={() => setViewingPlayedSummary(null)}>
          <div className="tm-modal glass-panel" onClick={e => e.stopPropagation()}>
            <button className="tm-modal-close" onClick={() => setViewingPlayedSummary(null)}>✕</button>
            <h2>Resumen Oficial del Partido</h2>
            <p className="tm-modal-sub">
              Jornada {viewingPlayedSummary.week} • Encuentro Finalizado
            </p>

            <div className="recap-header">
              <div className="recap-team">
                <h3>{viewingPlayedSummary.homeTeam.name}</h3>
                <span className="score-lg">{viewingPlayedSummary.homeScore}</span>
              </div>
              <span className="vs-divider">VS</span>
              <div className="recap-team">
                <span className="score-lg">{viewingPlayedSummary.awayScore}</span>
                <h3>{viewingPlayedSummary.awayTeam.name}</h3>
              </div>
            </div>

            <div className="recap-events">
              <h4>Goles y Eventos Destacados</h4>
              {viewingPlayedSummary.events && viewingPlayedSummary.events.length > 0 ? (
                viewingPlayedSummary.events.map((ev, idx) => (
                  <div key={idx} className="recap-event-item">
                    <span className="min">{ev.minute}'</span>
                    <span>⚽ Gol anotado por jugador ID #{ev.playerId}</span>
                  </div>
                ))
              ) : (
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Partido disputado sin incidencias de gol registradas.</p>
              )}
            </div>

            <div className="tm-modal-actions">
              <button className="settings-btn" onClick={() => setViewingPlayedSummary(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
