import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  leagueId: number;
  isOpen: boolean;
}

export function Sidebar({ leagueId, isOpen }: SidebarProps) {
  return (
    <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-nav">
        <div className="nav-group">
          <Link to={`/`} className="nav-item">Switch League</Link>
          <Link to={`/l/${leagueId}`} className="nav-item">Dashboard</Link>
        </div>
        
        <div className="nav-group">
          <div className="nav-group-title">
            <span style={{fontSize:'8px', marginRight:'4px'}}>▼</span> LIGA
          </div>
          <Link to={`/l/${leagueId}/standings`} className="nav-item">Clasificación</Link>
          <Link to={`/l/${leagueId}/playoffs`} className="nav-item">Fases Finales</Link>
          <Link to={`/l/${leagueId}/daily_schedule`} className="nav-item">Calendario Diario</Link>
          <Link to={`/l/${leagueId}/finances`} className="nav-item">Finanzas de Liga</Link>
          <Link to={`/l/${leagueId}/history`} className="nav-item">Historia</Link>
          <Link to={`/l/${leagueId}/power_rankings`} className="nav-item">Power Rankings</Link>
          <Link to={`/l/${leagueId}/transactions`} className="nav-item">Traspasos</Link>
          <Link to={`/l/${leagueId}/notes`} className="nav-item">Notas</Link>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">
            <span style={{fontSize:'8px', marginRight:'4px'}}>▼</span> EQUIPO
          </div>
          <Link to={`/l/${leagueId}/roster`} className="nav-item">Plantilla</Link>
          <Link to={`/l/${leagueId}/tactics`} className="nav-item">Alineación</Link>
          <Link to={`/l/${leagueId}/youth_academy`} className="nav-item">Filial</Link>
          <Link to={`/l/${leagueId}/schedule`} className="nav-item">Calendario</Link>
          <Link to={`/l/${leagueId}/finances`} className="nav-item">Finanzas</Link>
          <Link to={`/l/${leagueId}/history`} className="nav-item">Historia</Link>
          <Link to={`/l/${leagueId}/gm_history`} className="nav-item">Historia del Mánager</Link>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">
            <span style={{fontSize:'8px', marginRight:'4px'}}>▼</span> JUGADORES
          </div>
          <Link to={`/l/${leagueId}/free_agents`} className="nav-item">Agentes Libres</Link>
          <Link to={`/l/${leagueId}/trades`} className="nav-item">Transferencias</Link>
          <Link to={`/l/${leagueId}/compare_players`} className="nav-item">Comparar Jugadores</Link>
          <Link to={`/l/${leagueId}/watch_list`} className="nav-item">Preselección</Link>
          <Link to={`/l/${leagueId}/hall_of_fame`} className="nav-item">Salón de la Fama</Link>
          <Link to={`/l/${leagueId}/draft`} className="nav-item">Draft de Canteranos</Link>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">
            <span style={{fontSize:'8px', marginRight:'4px'}}>▼</span> ESTADÍSTICAS
          </div>
          <Link to="#" className="nav-item">Registro de Partidos</Link>
          <Link to="#" className="nav-item">Líderes de la Liga</Link>
          <Link to="#" className="nav-item">Valoraciones</Link>
          <Link to="#" className="nav-item">Estadísticas Propias</Link>
          <Link to="#" className="nav-item">Biografías</Link>
          <Link to="#" className="nav-item">Gráficos de Jugadores</Link>
          <Link to="#" className="nav-item">Búsqueda Avanzada</Link>
          <Link to="#" className="nav-item">Estadísticas de Equipo</Link>
          <Link to="#" className="nav-item">Gráficos de Equipo</Link>
          <Link to="#" className="nav-item">Estadísticas de Liga</Link>
          <Link to="#" className="nav-item">Lesiones</Link>
          <Link to="#" className="nav-item">Hitos Estadísticos</Link>
          <Link to="#" className="nav-item">Premios</Link>
        </div>
        
        <div className="nav-group">
          <div className="nav-group-title">
            <span style={{fontSize:'8px', marginRight:'4px'}}>▼</span> SOCIALES
          </div>
          <Link to="#" className="nav-item">Noticias</Link>
          <Link to="#" className="nav-item">Redes Sociales</Link>
          <Link to="#" className="nav-item">Prensa</Link>
          <Link to="#" className="nav-item">Relaciones Institucionales</Link>
        </div>
      </div>
    </div>
  );
}
