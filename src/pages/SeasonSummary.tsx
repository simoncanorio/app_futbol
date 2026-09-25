import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, type League, type Team, type Player } from '../db/db';
import { startNextSeason } from '../engine/gameLoop';
import { Trophy, Award, Shield, CheckCircle, AlertTriangle, ArrowRight, Play, Loader } from 'lucide-react';
import './SeasonSummary.css';

export function SeasonSummary() {
  const { leagueId } = useParams();
  const navigate = useNavigate();

  const [league, setLeague] = useState<League | null>(null);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [standings, setStandings] = useState<Team[]>([]);
  const [topScorer, setTopScorer] = useState<Player | null>(null);
  const [topAssister, setTopAssister] = useState<Player | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      if (!lid) return;
      const l = await db.leagues.get(lid);
      if (!l) return;
      setLeague(l);

      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      allTeams.sort((a, b) => {
        const ptsA = a.wins * 3 + a.draws;
        const ptsB = b.wins * 3 + b.draws;
        const gdA = a.goalsFor - a.goalsAgainst;
        const gdB = b.goalsFor - b.goalsAgainst;
        return ptsB - ptsA || gdB - gdA;
      });
      setStandings(allTeams);

      if (l.userTeamId) {
        const uTeam = allTeams.find(t => t.id === l.userTeamId);
        setUserTeam(uTeam || null);
      }

      // Fetch top scorer & assister across the league
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const sortedScorers = [...allPlayers].sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0));
      const sortedAssisters = [...allPlayers].sort((a, b) => (b.stats?.assists || 0) - (a.stats?.assists || 0));

      if (sortedScorers.length > 0) setTopScorer(sortedScorers[0]);
      if (sortedAssisters.length > 0) setTopAssister(sortedAssisters[0]);

      setLoading(false);
    }
    load();
  }, [leagueId]);

  const handleStartNewSeason = async () => {
    if (!leagueId) return;
    setIsAdvancing(true);
    try {
      await startNextSeason(Number(leagueId));
      window.location.href = `/l/${leagueId}/daily_schedule`;
    } catch (err) {
      console.error(err);
      alert('Error al avanzar de temporada.');
    } finally {
      setIsAdvancing(false);
    }
  };

  if (loading || !league || !userTeam) {
    return <div className="page-container" style={{ padding: '3rem', textAlign: 'center' }}>Cargando resumen de temporada...</div>;
  }

  const champion = standings[0] || userTeam;
  const runnerUp = standings[1] || userTeam;
  const teamRank = standings.findIndex(t => t.id === userTeam.id) + 1;
  const pts = userTeam.wins * 3 + userTeam.draws;

  // Evaluation criteria based on rank
  let evalTitle = '¡Temporada Histórica!';
  let evalClass = 'excellent';
  let evalMessage = `¡Excelente trabajo Mánager! La Junta Directiva y la afición están eufóricas con el rendimiento demostrado. Has llevado a ${userTeam.name} a luchar en lo más alto del fútbol continental. Tu reputación como técnico ha aumentado significativamente.`;

  if (teamRank > 3 && teamRank <= 7) {
    evalTitle = 'Objetivos Cumplidos';
    evalClass = 'good';
    evalMessage = `Buen trabajo durante esta temporada. El equipo ha mostrado solidez táctica y ha alcanzado los puestos de clasificación europea. Con un par de refuerzos clave el próximo año podremos luchar por el título.`;
  } else if (teamRank > 7 && teamRank <= 14) {
    evalTitle = 'Rendimiento Aceptable';
    evalClass = 'neutral';
    evalMessage = `La temporada ha sido irregular pero se han mantenido los objetivos mínimos de permanencia. La directiva espera ver un crecimiento en el juego colectivo y mejores resultados financieros la próxima temporada.`;
  } else if (teamRank > 14) {
    evalTitle = 'Temporada Preocupante';
    evalClass = 'bad';
    evalMessage = `Rendimiento por debajo de las expectativas del club. Estuvimos cerca de la zona peligrosa y la Directiva exige una reestructuración inmediata de la plantilla para evitar consecuencias la próxima temporada.`;
  }

  return (
    <div className="page-container summary-page">
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', margin: 0 }}>
          🏆 Resumen Oficial & Carta del Presidente
        </h1>
        <p style={{ color: '#94a3b8', margin: '4px 0 0 0' }}>
          Final de la Temporada {league.season} • Evaluación de Rendimiento del Mánager
        </p>
      </div>

      {/* 1. Letter from Owner / President */}
      <div className="glass-panel owner-letter-card">
        <div className="owner-avatar">
          <Shield size={36} color={userTeam.kit?.primaryColor || '#38bdf8'} />
          <span className="owner-title">Presidencia</span>
        </div>

        <div className="owner-content">
          <div className="owner-header">
            <div>
              <h3>Comunicado Oficial de la Junta Directiva de {userTeam.name}</h3>
              <p className="owner-subtitle">De: El Presidente del Club | Para: Director Técnico</p>
            </div>
            <div className={`eval-badge ${evalClass}`}>
              {evalTitle}
            </div>
          </div>

          <p className="owner-body-text">{evalMessage}</p>

          <div className="owner-stats-pills">
            <span>Posición Final: <strong>{teamRank}º en la Liga</strong></span>
            <span>Puntos Conseguidos: <strong>{pts} PTS ({userTeam.wins}V-{userTeam.draws}E-{userTeam.losses}D)</strong></span>
            <span>Balance Financiero: <strong style={{ color: userTeam.profit >= 0 ? '#10b981' : '#ef4444' }}>€{(userTeam.profit / 1_000_000).toFixed(1)}M</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Season Awards & Winners */}
      <div className="glass-panel awards-summary-card">
        <h3><Trophy size={22} color="#eab308" /> Cuadro de Honor & Premios de la Temporada {league.season}</h3>

        <div className="awards-grid">
          {/* Champion */}
          <div className="award-box gold">
            <Trophy size={32} />
            <span className="award-title">Campeón de Liga</span>
            <strong>{champion.name}</strong>
            <small>{champion.wins * 3 + champion.draws} PTS • {champion.wins} Victoriado</small>
          </div>

          {/* Subcampeon */}
          <div className="award-box silver">
            <Award size={32} />
            <span className="award-title">Subcampeón</span>
            <strong>{runnerUp.name}</strong>
            <small>{runnerUp.wins * 3 + runnerUp.draws} PTS</small>
          </div>

          {/* User Team */}
          <div className="award-box blue">
            <Shield size={32} />
            <span className="award-title">Tu Equipo ({userTeam.name})</span>
            <strong>{teamRank}º Clasificado</strong>
            <small>{pts} PTS • {userTeam.goalsFor} Goles A Favor</small>
          </div>

          {/* Pichichi / Top Scorer */}
          <div className="award-box green">
            <Award size={32} />
            <span className="award-title">Pichichi (Goleador)</span>
            <strong>{topScorer?.name || 'Desconocido'}</strong>
            <small>{topScorer?.stats?.goals || 0} Goles anotados</small>
          </div>

          {/* Top Assister */}
          <div className="award-box purple">
            <Award size={32} />
            <span className="award-title">Máximo Asistente</span>
            <strong>{topAssister?.name || 'Desconocido'}</strong>
            <small>{topAssister?.stats?.assists || 0} Asistencias</small>
          </div>
        </div>
      </div>

      {/* 3. Primary Action Button to Start New Season */}
      <div className="glass-panel next-season-action-card">
        <div>
          <h3 style={{ margin: 0, color: '#f8fafc' }}>¿Listo para el desafío de la Temporada {league.season + 1}?</h3>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
            Se actualizarán las edades de la plantilla, presupuestos anuales y el nuevo calendario oficial de 38 jornadas.
          </p>
        </div>

        <button
          className="btn-start-next-season"
          onClick={handleStartNewSeason}
          disabled={isAdvancing}
        >
          {isAdvancing ? (
            <><Loader size={18} className="spinner" /> Generando nueva temporada...</>
          ) : (
            <><Play size={18} fill="currentColor" /> Avanzar e Iniciar Temporada {league.season + 1} <ArrowRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  );
}
