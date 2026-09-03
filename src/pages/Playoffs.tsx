import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team, type League } from '../db/db';
import './Playoffs.css';

export function Playoffs() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      setTeams(allTeams);
    }
    load();
  }, [leagueId]);

  // Mockup data for brackets
  const t = (index: number) => teams[index]?.name || `Equipo ${index}`;
  const ovr = (index: number) => teams[index]?.overall || 0;

  return (
    <div className="page-container playoffs-page">
      <div className="page-header">
        <h1>Fases Finales (Copas)</h1>
        <p style={{marginLeft: 'auto', color: '#aaa', fontSize: '0.9rem'}}>Copa Nacional - Cuartos de Final</p>
      </div>

      <div className="bracket-container">
        {/* Lado Izquierdo */}
        <div className="bracket-side">
          <h2 className="bracket-title">Llave A</h2>
          
          <div className="matchup">
            <div className="matchup-team">
              <span className="seed">1</span> 
              <span className="name">{t(0)}</span>
              <span className="score">2</span>
            </div>
            <div className="matchup-team">
              <span className="seed">8</span> 
              <span className="name">{t(1)}</span>
              <span className="score">0</span>
            </div>
            <div className="best-of">Partido Único</div>
          </div>

          <div className="matchup">
            <div className="matchup-team">
              <span className="seed">4</span> 
              <span className="name">{t(2)}</span>
              <span className="score">1</span>
            </div>
            <div className="matchup-team">
              <span className="seed">5</span> 
              <span className="name">{t(3)}</span>
              <span className="score">1 (P)</span>
            </div>
            <div className="best-of">Partido Único</div>
          </div>
        </div>

        {/* Lado Derecho */}
        <div className="bracket-side">
          <h2 className="bracket-title">Llave B</h2>
          
          <div className="matchup">
            <div className="matchup-team">
              <span className="seed">2</span> 
              <span className="name">{t(4)}</span>
              <span className="score">3</span>
            </div>
            <div className="matchup-team">
              <span className="seed">7</span> 
              <span className="name">{t(5)}</span>
              <span className="score">1</span>
            </div>
            <div className="best-of">Partido Único</div>
          </div>

          <div className="matchup">
            <div className="matchup-team">
              <span className="seed">3</span> 
              <span className="name">{t(6)}</span>
              <span className="score">0</span>
            </div>
            <div className="matchup-team">
              <span className="seed">6</span> 
              <span className="name">{t(7)}</span>
              <span className="score">2</span>
            </div>
            <div className="best-of">Partido Único</div>
          </div>
        </div>
      </div>
      
      <p style={{textAlign: 'center', color: '#888', marginTop: '2rem'}}>
        *Nota: La simulación de Copa en tiempo real se implementará en la próxima actualización del motor.
      </p>
    </div>
  );
}
