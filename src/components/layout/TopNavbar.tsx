import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, ChevronDown, Home, Menu } from 'lucide-react';
import { advanceWeek } from '../../engine/gameLoop';
import './TopNavbar.css';

interface TopNavbarProps {
  leagueId?: number;
  season?: number;
  onRefresh?: () => void;
  onToggleSidebar?: () => void;
}

export function TopNavbar({ leagueId, season, onRefresh, onToggleSidebar }: TopNavbarProps) {
  const navigate = useNavigate();
  const [playOpen, setPlayOpen] = useState(false);

  const handleAdvance = async (weeks: number) => {
    if (!leagueId) return;
    setPlayOpen(false);
    for(let i=0; i<weeks; i++){
      await advanceWeek(leagueId);
    }
    if (onRefresh) onRefresh();
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
            <button className="play-btn" onClick={() => setPlayOpen(!playOpen)}>
              <Play size={16} fill="currentColor" /> Play <ChevronDown size={14} />
            </button>
            {playOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleAdvance(1)}>Avanzar 1 Semana</button>
                <button onClick={() => handleAdvance(4)}>Avanzar 1 Mes</button>
              </div>
            )}
            <div className="status-text">
              Temporada {season} - Inactivo
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
              <Link to={`/l/${leagueId}/draft`}>Draft de Canteranos</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <span className="nav-link">Estadísticas <ChevronDown size={14} /></span>
            <div className="nav-dropdown-content">
              <Link to="#">Registro de Partidos</Link>
              <Link to="#">Líderes de la Liga</Link>
              <Link to="#">Valoraciones</Link>
              <Link to="#">Estadísticas Propias</Link>
              <Link to="#">Biografías</Link>
              <Link to="#">Gráficos de Jugadores</Link>
              <Link to="#">Búsqueda Avanzada</Link>
              <Link to="#">Estadísticas de Equipo</Link>
              <Link to="#">Gráficos de Equipo</Link>
              <Link to="#">Estadísticas de Liga</Link>
              <Link to="#">Lesiones</Link>
              <Link to="#">Hitos Estadísticos</Link>
              <Link to="#">Premios</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <span className="nav-link">Sociales <ChevronDown size={14} /></span>
            <div className="nav-dropdown-content">
              <Link to="#">Noticias</Link>
              <Link to="#">Redes Sociales</Link>
              <Link to="#">Prensa</Link>
              <Link to="#">Relaciones Institucionales</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
