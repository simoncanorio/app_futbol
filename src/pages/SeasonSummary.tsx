import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type League, type Team } from '../db/db';

export function SeasonSummary() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [previousSeason, setPreviousSeason] = useState<number>(0);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if (!l) return;
      setLeague(l);
      
      if (l.userTeamId) {
        const t = await db.teams.get(l.userTeamId);
        setUserTeam(t || null);
      }
      
      // La liga ya avanzó el año, por lo que el resumen es de la temporada anterior
      setPreviousSeason(l.season - 1);
    }
    load();
  }, [leagueId]);

  if (!league || !userTeam) return <div className="page-container"><p>Cargando evaluación...</p></div>;

  // Evaluación muy simple: si el hype (popularidad) mejoró o empeoró, o las finanzas
  const isGood = userTeam.hype ? userTeam.hype >= 50 : true;
  const evaluation = isGood ? 'Excelente!' : 'Decepcionante.';
  const message = isGood ? 'Sigue así. Has cumplido nuestras expectativas.' : 'Esperamos mejores resultados la próxima temporada, o habrá consecuencias.';

  return (
    <div className="page-container" style={{maxWidth: '800px', margin: '0 auto', paddingTop: '40px'}}>
      <div className="page-header" style={{borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px'}}>
        <h1 style={{fontSize: '24px'}}>Evaluación Anual de Rendimiento <span style={{fontSize: '14px', color: '#888'}}>↗</span></h1>
      </div>
      
      <div style={{color: '#ddd', fontSize: '15px', lineHeight: '1.6'}}>
        <p style={{marginBottom: '10px'}}><strong>De:</strong> El Dueño, {previousSeason}</p>
        <p style={{marginBottom: '10px'}}>Este año: {isGood ? 'Bueno.' : 'Malo.'}</p>
        <p style={{marginBottom: '20px'}}>Global: {evaluation}</p>
        <p style={{marginBottom: '40px'}}>{message}</p>
        
        <div style={{height: '300px', width: '100%', background: '#1a1a2e', borderRadius: '8px', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', flexDirection: 'column'}}>
           {/* Gráfico Placeholder */}
           <div style={{color: '#888', marginBottom: '20px'}}>[ Gráfico de Progreso Anual ]</div>
           <div style={{display: 'flex', gap: '20px', color: '#555', fontSize: '13px'}}>
             <span style={{color: '#ef4444'}}>— Éxito en Liga</span>
             <span style={{color: '#3b82f6'}}>— Éxito en Copa</span>
             <span style={{color: '#10b981'}}>— Finanzas</span>
           </div>
        </div>
        
        <div style={{display: 'flex', gap: '20px', fontSize: '14px', borderTop: '1px solid #333', paddingTop: '10px'}}>
          <Link to={`/l/${leagueId}/history`} style={{color: '#e67e22', textDecoration: 'none'}}>Historia de la Liga</Link>
          <Link to={`/l/${leagueId}`} style={{color: '#e67e22', textDecoration: 'none'}}>Bandeja de Entrada</Link>
        </div>
      </div>
    </div>
  );
}
