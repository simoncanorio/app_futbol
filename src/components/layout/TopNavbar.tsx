import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Play, ChevronDown, Home, Menu, Loader } from 'lucide-react';
import { advanceWeek, getLeagueMaxWeeks } from '../../engine/gameLoop';
import { db, type League } from '../../db/db';
import './TopNavbar.css';

interface TopNavbarProps {
  leagueId?: number;
  season?: number;
  onRefresh?: () => void;
  onToggleSidebar?: () => void;
}

export function TopNavbar({ leagueId, onRefresh, onToggleSidebar }: TopNavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [playOpen, setPlayOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [league, setLeague] = useState<League | null>(null);
  const [maxWeeks, setMaxWeeks] = useState<number>(0);

  React.useEffect(() => {
    if (leagueId) {
      db.leagues.get(leagueId).then(l => setLeague(l || null));
      getLeagueMaxWeeks(leagueId).then(w => setMaxWeeks(w));
    }
  }, [leagueId, location.pathname]);

  const handleAdvance = async (weeks: number | string) => {
    if (!leagueId || !league) return;
    setPlayOpen(false);
    setIsSimulating(true);
    try {
      let weeksToAdvance = 0;
      if (typeof weeks === 'number') {
        weeksToAdvance = weeks;
      } else if (weeks === 'end_season') {
        const mw = await getLeagueMaxWeeks(leagueId);
        weeksToAdvance = Math.max(0, (mw + 1) - league.currentWeek);
      } else if (weeks === 'start_cup') {
        const mw = await getLeagueMaxWeeks(leagueId);
        const cupStart = Math.floor(mw / 2);
        weeksToAdvance = Math.max(0, cupStart - league.currentWeek);
        if (weeksToAdvance <= 0) weeksToAdvance = 1;
      } else if (weeks === 'next_season') {
        weeksToAdvance = 1; // It will just trigger endSeason
      }

      for(let i=0; i<weeksToAdvance; i++){
        await advanceWeek(leagueId);
      }
      
      if (weeks === 'next_season') {
        navigate(`/l/${leagueId}/season_summary`);
      } else {
        if (onRefresh) onRefresh();
        window.location.reload();
      }
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="top-navbar">
      <div className="navbar-left">
        {leagueId && onToggleSidebar && (
          <button className="nav-toggle-btn" onClick={onToggleSidebar}>
            <Menu size={20} color="#ddd" />
          </button>
        )}
        <div className="logo" onClick={() => navigate('/')}>
          <span className="logo-icon">⚽</span> Football GM
        </div>
        
        {leagueId && (
          <div className="play-menu">
            <button
              className={`play-btn ${league?.currentWeek && maxWeeks > 0 && league.currentWeek > maxWeeks ? 'season-end-btn' : ''}`}
              onClick={() => {
                if (league?.currentWeek && maxWeeks > 0 && league.currentWeek > maxWeeks) {
                  navigate(`/l/${leagueId}/season_summary`);
                } else {
                  setPlayOpen(!playOpen);
                }
              }}
              disabled={isSimulating}
              style={league?.currentWeek && maxWeeks > 0 && league.currentWeek > maxWeeks ? { background: '#10b981', color: '#ffffff', fontWeight: 'bold' } : {}}
            >
              {isSimulating ? (
                <><Loader size={16} className="spinner" /> Simulando...</>
              ) : league?.currentWeek && maxWeeks > 0 && league.currentWeek > maxWeeks ? (
                <><Play size={16} fill="currentColor" /> Avanzar a siguiente temporada</>
              ) : (
                <><Play size={16} fill="currentColor" /> Play <ChevronDown size={14} /></>
              )}
            </button>
            {playOpen && !(league?.currentWeek && maxWeeks > 0 && league.currentWeek > maxWeeks) && (
              <div className="dropdown-menu">
                <button onClick={() => handleAdvance(1)}>Avanzar 1 Semana</button>
                <button onClick={() => handleAdvance('start_cup')}>Avanzar hasta Copa</button>
                <button onClick={() => handleAdvance('end_season')}>Avanzar hasta Fin de Temporada</button>
              </div>
            )}
            <div className="status-text">
              Temp {league?.season || 2026} - Jor. {league?.currentWeek && maxWeeks > 0 && league.currentWeek > maxWeeks ? 'FIN' : (league?.currentWeek || 1)}
            </div>
          </div>
        )}
      </div>

      {leagueId && (
        <div className="navbar-right">
          <div className="nav-dropdown" style={{display: 'flex', alignItems: 'center', padding: '0 8px'}}>
             <Link to={`/l/${leagueId}`} className="home-icon" title="Dashboard">
               <Home size={18} color="#ccc" />
             </Link>
          </div>
          <div className="nav-dropdown">
            <span className="nav-link">Liga <ChevronDown size={14} /></span>
            <div className="nav-dropdown-content">
              <Link to={`/l/${leagueId}/standings`}>Clasificación</Link>
              <Link to={`/l/${leagueId}/playoffs`}>Fases Finales</Link>
              <Link to={`/l/${leagueId}/daily_schedule`}>Calendario Diario</Link>
              <Link to={`/l/${leagueId}/finances`}>Finanzas de Liga</Link>
              <Link to={`/l/${leagueId}/history`}>Historia</Link>
              <Link to={`/l/${leagueId}/power_rankings`}>Power Rankings</Link>
              <Link to={`/l/${leagueId}/transactions`}>Traspasos</Link>
              <Link to={`/l/${leagueId}/notes`}>Notas</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <span className="nav-link">Equipo <ChevronDown size={14} /></span>
            <div className="nav-dropdown-content">
              <Link to={`/l/${leagueId}/roster`}>Plantilla</Link>
              <Link to={`/l/${leagueId}/tactics`}>Alineación</Link>
              <Link to={`/l/${leagueId}/youth_academy`}>Filial</Link>
              <Link to={`/l/${leagueId}/schedule`}>Calendario</Link>
              <Link to={`/l/${leagueId}/finances`}>Finanzas</Link>
              <Link to={`/l/${leagueId}/history`}>Historia</Link>
              <Link to={`/l/${leagueId}/gm_history`}>Historia del Mánager</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <span className="nav-link">Jugadores <ChevronDown size={14} /></span>
            <div className="nav-dropdown-content">
              <Link to={`/l/${leagueId}/free_agents`}>Agentes Libres</Link>
              <Link to={`/l/${leagueId}/trades`}>Transferencias</Link>
              <Link to={`/l/${leagueId}/compare_players`}>Comparar Jugadores</Link>
              <Link to={`/l/${leagueId}/watch_list`}>Preselección</Link>
              <Link to={`/l/${leagueId}/hall_of_fame`}>Salón de la Fama</Link>
              <Link to={`/l/${leagueId}/draft`}>Canteranos</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <span className="nav-link">Estadísticas <ChevronDown size={14} /></span>
            <div className="nav-dropdown-content">
              <Link to={`/l/${leagueId}/game_log`}>Registro de Partidos</Link>
              <Link to={`/l/${leagueId}/leaders`}>Líderes de Liga</Link>
              <Link to={`/l/${leagueId}/player_ratings`}>Valoraciones</Link>
              <Link to={`/l/${leagueId}/player_stats`}>Estadísticas Propias</Link>
              <Link to={`/l/${leagueId}/player_bios`}>Biografías</Link>
              <Link to={`/l/${leagueId}/player_graphs`}>Gráficos de Jugadores</Link>
              <Link to={`/l/${leagueId}/advanced_search`}>Búsqueda Avanzada</Link>
              <Link to={`/l/${leagueId}/team_stats`}>Estadísticas de Equipo</Link>
              <Link to={`/l/${leagueId}/team_graphs`}>Gráficos de Equipo</Link>
              <Link to={`/l/${leagueId}/league_stats`}>Estadísticas de Liga</Link>
              <Link to={`/l/${leagueId}/awards`}>Premios</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <span className="nav-link">Sociales <ChevronDown size={14} /></span>
            <div className="nav-dropdown-content right-align">
              <Link to={`/l/${leagueId}/news`}>Noticias</Link>
              <Link to={`/l/${leagueId}/social_media`}>Redes Sociales</Link>
              <Link to={`/l/${leagueId}/press`}>Prensa</Link>
              <Link to={`/l/${leagueId}/relations`}>Relaciones Institucionales</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
