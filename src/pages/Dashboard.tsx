import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type League, type Team, type Player, type Match } from '../db/db';
import { Shield, Trophy, TrendingUp, DollarSign, Users, Award, Calendar, Zap, ArrowRight, Activity } from 'lucide-react';
import './Dashboard.css';

export function Dashboard() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [standings, setStandings] = useState<Team[]>([]);
  const [starters, setStarters] = useState<Player[]>([]);
  const [nextMatch, setNextMatch] = useState<{ match: Match; opponent: Team } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if (!l) return;
      setLeague(l);

      if (l.userTeamId) {
        const t = await db.teams.get(l.userTeamId);
        setTeam(t!);

        const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
        allTeams.sort((a, b) => {
          const ptsA = a.wins * 3 + a.draws;
          const ptsB = b.wins * 3 + b.draws;
          const gdA = a.goalsFor - a.goalsAgainst;
          const gdB = b.goalsFor - b.goalsAgainst;
          return ptsB - ptsA || gdB - gdA || b.goalsFor - a.goalsFor;
        });
        setStandings(allTeams);

        const players = await db.players.where('teamId').equals(l.userTeamId).toArray();
        players.sort((a, b) => b.overall - a.overall);
        setStarters(players.slice(0, 11));

        // Load next unplayed match for user team
        const upcoming = await db.matches
          .where('leagueId')
          .equals(lid)
          .filter(m => !m.isPlayed && (m.homeTeamId === l.userTeamId || m.awayTeamId === l.userTeamId))
          .first();

        if (upcoming) {
          const oppId = upcoming.homeTeamId === l.userTeamId ? upcoming.awayTeamId : upcoming.homeTeamId;
          const opp = await db.teams.get(oppId);
          if (opp) setNextMatch({ match: upcoming, opponent: opp });
        }
      }
      setLoading(false);
    }
    load();
  }, [leagueId]);

  if (loading) {
    return (
      <div className="dash-loading-container">
        <div className="dash-spinner" />
        <p>Cargando datos del club...</p>
      </div>
    );
  }

  const teamPosition = standings.findIndex(t => t.id === team?.id) + 1;
  const totalGames = (team?.wins || 0) + (team?.draws || 0) + (team?.losses || 0);
  const winRate = totalGames > 0 ? Math.round(((team?.wins || 0) / totalGames) * 100) : 0;
  const goalDiff = (team?.goalsFor || 0) - (team?.goalsAgainst || 0);

  // Top Scorer and Top Assist in starters
  const topScorers = [...starters].sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0));
  const topAssists = [...starters].sort((a, b) => (b.stats?.assists || 0) - (a.stats?.assists || 0));

  return (
    <div className="dashboard-wrapper">
      {/* Top Banner Header */}
      <div className="dash-hero-banner glass-panel">
        <div className="dash-hero-left">
          <div className="dash-team-avatar">
            <Shield size={36} color={team?.kit?.primaryColor || '#38bdf8'} />
            <span className="dash-ovr-pill">{team?.overall || 75} OVR</span>
          </div>
          <div>
            <div className="dash-title-row">
              <h1>{team?.name}</h1>
              <span className="dash-league-tag">{team?.domesticLeague || league?.name}</span>
            </div>
            <p className="dash-sub-title">
              Temporada {league?.season || 2026} • Jornada {league?.currentWeek || 1} de 38
            </p>
          </div>
        </div>

        <div className="dash-hero-right">
          <div className="dash-hero-badge">
            <Trophy size={18} color="#eab308" />
            <div>
              <span className="lbl">Posición</span>
              <strong className="val">{teamPosition}º / {standings.length}</strong>
            </div>
          </div>

          <div className="dash-hero-badge">
            <Zap size={18} color="#38bdf8" />
            <div>
              <span className="lbl">Reputación Mánager</span>
              <strong className="val">{league?.managerReputation || 60} pts</strong>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="dash-kpi-grid">
        {/* Record KPI */}
        <div className="dash-kpi-card glass-panel">
          <div className="kpi-header">
            <span>Récord de Temporada</span>
            <TrendingUp size={16} color="#10b981" />
          </div>
          <div className="kpi-body">
            <div className="kpi-big-stat">{team?.wins}-{team?.draws}-{team?.losses}</div>
            <div className="kpi-sub-pills">
              <span className="pill win">{team?.wins}V</span>
              <span className="pill draw">{team?.draws}E</span>
              <span className="pill loss">{team?.losses}D</span>
              <span className="pct-badge">{winRate}% Victoriado</span>
            </div>
          </div>
        </div>

        {/* Goals KPI */}
        <div className="dash-kpi-card glass-panel">
          <div className="kpi-header">
            <span>Goles & Diferencia</span>
            <Activity size={16} color="#38bdf8" />
          </div>
          <div className="kpi-body">
            <div className="kpi-big-stat" style={{ color: goalDiff >= 0 ? '#10b981' : '#ef4444' }}>
              {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
            </div>
            <div className="kpi-sub-info">
              <span>⚽ A Favor: <strong>{team?.goalsFor || 0}</strong></span>
              <span>🛡️ En Contra: <strong>{team?.goalsAgainst || 0}</strong></span>
            </div>
          </div>
        </div>

        {/* Finance KPI */}
        <div className="dash-kpi-card glass-panel">
          <div className="kpi-header">
            <span>Presupuesto Fichajes</span>
            <DollarSign size={16} color="#eab308" />
          </div>
          <div className="kpi-body">
            <div className="kpi-big-stat" style={{ color: '#eab308' }}>
              €{((team?.budget || 0) / 1_000_000).toFixed(1)}M
            </div>
            <div className="kpi-sub-info">
              <span>Ganancias YTD: <strong style={{ color: '#10b981' }}>+€{((team?.profit || 0) / 1_000_000).toFixed(1)}M</strong></span>
            </div>
          </div>
        </div>

        {/* Next Match KPI */}
        <div className="dash-kpi-card glass-panel highlight-card">
          <div className="kpi-header">
            <span>Próximo Partido</span>
            <Calendar size={16} color="#a855f7" />
          </div>
          <div className="kpi-body">
            {nextMatch ? (
              <div className="next-match-box">
                <div className="opp-info">
                  <span className="vs-lbl">VS</span>
                  <strong>{nextMatch.opponent.name}</strong>
                  <span className="opp-ovr">OVR {nextMatch.opponent.overall}</span>
                </div>
                <Link to={`/l/${leagueId}/daily_schedule`} className="btn-match-play">
                  Simular Jornada {nextMatch.match.week} <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="next-match-box">
                <span>No hay próximos partidos programados.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Standings + Center Columns */}
      <div className="dash-content-grid">
        {/* Left Column: Standings Snippet */}
        <div className="dash-col-standings glass-panel">
          <div className="dash-card-header">
            <h3><Trophy size={18} color="#eab308" /> Clasificación de Liga</h3>
            <Link to={`/l/${leagueId}/standings`} className="link-arrow">Ver Todo <ArrowRight size={14} /></Link>
          </div>
          <div className="table-responsive">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Equipo</th>
                  <th>PJ</th>
                  <th>V</th>
                  <th>E</th>
                  <th>D</th>
                  <th>PTS</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((t, idx) => {
                  const pts = t.wins * 3 + t.draws;
                  const isUser = t.id === team?.id;
                  return (
                    <tr key={t.id} className={isUser ? 'row-user-team' : ''}>
                      <td className="col-rank">{idx + 1}</td>
                      <td className="col-team">
                        <Link to={`/l/${leagueId}/team/${t.id}`} className="team-link">
                          {t.name}
                        </Link>
                      </td>
                      <td>{t.wins + t.draws + t.losses}</td>
                      <td>{t.wins}</td>
                      <td>{t.draws}</td>
                      <td>{t.losses}</td>
                      <td className="col-pts">{pts}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Center/Right Column: Team Leaders, Finances, News */}
        <div className="dash-col-main">
          {/* Top Performers Widget */}
          <div className="dash-performers-grid">
            <div className="performer-card glass-panel">
              <div className="performer-header">
                <Award size={18} color="#ef4444" />
                <h4>Máximo Goleador</h4>
              </div>
              {topScorers[0] ? (
                <div className="performer-body">
                  <span className="p-pos">{topScorers[0].position}</span>
                  <div className="p-details">
                    <Link to={`/l/${leagueId}/player/${topScorers[0].id}`} className="p-name">{topScorers[0].name}</Link>
                    <span className="p-stat-val">{topScorers[0].stats?.goals || 0} Goles</span>
                  </div>
                  <span className="p-ovr">{topScorers[0].overall}</span>
                </div>
              ) : (
                <div className="performer-body">Sin datos</div>
              )}
            </div>

            <div className="performer-card glass-panel">
              <div className="performer-header">
                <Award size={18} color="#38bdf8" />
                <h4>Máximo Asistente</h4>
              </div>
              {topAssists[0] ? (
                <div className="performer-body">
                  <span className="p-pos">{topAssists[0].position}</span>
                  <div className="p-details">
                    <Link to={`/l/${leagueId}/player/${topAssists[0].id}`} className="p-name">{topAssists[0].name}</Link>
                    <span className="p-stat-val">{topAssists[0].stats?.assists || 0} Asistencias</span>
                  </div>
                  <span className="p-ovr">{topAssists[0].overall}</span>
                </div>
              ) : (
                <div className="performer-body">Sin datos</div>
              )}
            </div>
          </div>

          {/* Quick Links & News Widget */}
          <div className="dash-news-panel glass-panel">
            <div className="dash-card-header">
              <h3>📰 Titulares de la Liga & Vestuario</h3>
              <span className="news-badge-live">EN VIVO</span>
            </div>
            <div className="news-content-box">
              <div className="news-item">
                <div className="news-bullet" />
                <div>
                  <strong>Jornada {league?.currentWeek || 1} en marcha</strong>
                  <p>El cuerpo técnico prepara la estrategia para el próximo compromiso de liga.</p>
                </div>
              </div>
              <div className="news-item">
                <div className="news-bullet" />
                <div>
                  <strong>Rendimiento de Plantilla (OVR Promedio {team?.overall})</strong>
                  <p>Revisa la solidez defensiva y las tácticas activas en el panel de Alineación.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Starting XI Table Card */}
          <div className="dash-lineup-panel glass-panel">
            <div className="dash-card-header">
              <h3><Users size={18} color="#10b981" /> Once Titular del Club</h3>
              <Link to={`/l/${leagueId}/roster`} className="link-arrow">Plantilla Completa <ArrowRight size={14} /></Link>
            </div>
            <div className="table-responsive">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>OVR</th>
                    <th>POT</th>
                    <th>Salario</th>
                    <th>Goles</th>
                    <th>Asist</th>
                  </tr>
                </thead>
                <tbody>
                  {starters.map(p => (
                    <tr key={p.id}>
                      <td className="col-pos">{p.position}</td>
                      <td>
                        <Link to={`/l/${leagueId}/player/${p.id}`} className="player-link">
                          {p.name}
                        </Link>
                      </td>
                      <td>{p.age}</td>
                      <td className="col-ovr">{p.overall}</td>
                      <td className="col-pot">{p.potential}</td>
                      <td>€{(p.contract / 1000).toFixed(0)}k</td>
                      <td className="col-stat">{p.stats?.goals || 0}</td>
                      <td className="col-stat">{p.stats?.assists || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
