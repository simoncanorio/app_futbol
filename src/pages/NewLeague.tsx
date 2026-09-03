import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewLeague, teamNames } from '../db/generators';
import './NewLeague.css';

export function NewLeague() {
  const navigate = useNavigate();
  const [leagueName, setLeagueName] = useState('Liga 1');
  const [difficulty, setDifficulty] = useState<'Normal' | 'Hard' | 'Insane'>('Normal');
  const [teamIndex, setTeamIndex] = useState<number>(-1); // -1 = Random

  const handleCreate = async () => {
    const id = await createNewLeague(leagueName, difficulty, teamIndex);
    navigate(`/l/${id}`);
  };

  return (
    <div className="new-league-page">
      <div className="nl-header">
        <h1>Nueva Liga (Jugadores Ficticios)</h1>
      </div>
      
      <div className="nl-container">
        <div className="nl-form">
          <div className="form-group">
            <label>Nombre de la liga</label>
            <input 
              type="text" 
              value={leagueName} 
              onChange={e => setLeagueName(e.target.value)} 
              className="bb-input"
            />
          </div>

          <div className="form-group">
            <label>Temporada de inicio</label>
            <div className="select-row">
              <select className="bb-select" disabled>
                <option>2026</option>
              </select>
              <select className="bb-select" disabled>
                <option>Pretemporada</option>
              </select>
            </div>
            <p className="form-help">2026 en el juego representa la temporada 2026-27.</p>
          </div>

          <div className="form-group">
            <label>Elige tu equipo</label>
            <div className="select-row">
              <select 
                className="bb-select" 
                value={teamIndex} 
                onChange={e => setTeamIndex(Number(e.target.value))}
              >
                <option value={-1}>Aleatorio (Cualquiera)</option>
                {teamNames.map((name, idx) => (
                  <option key={idx} value={idx}>{name}</option>
                ))}
              </select>
              <button className="random-btn" onClick={() => setTeamIndex(-1)}>Random</button>
            </div>
            <p className="form-help">Elige con qué club comenzarás tu carrera como mánager.</p>
          </div>

          <div className="form-group">
            <label>Dificultad</label>
            <select 
              className="bb-select" 
              value={difficulty} 
              onChange={e => setDifficulty(e.target.value as any)}
            >
              <option value="Normal">Normal</option>
              <option value="Hard">Hard (Difícil)</option>
              <option value="Insane">Insane (Locura)</option>
            </select>
            <p className="form-help">
              Incrementar la dificultad hace que los equipos rivales sean más reacios a traspasar jugadores contigo, menos propensos a firmar contratos, y más difícil generar ingresos.
            </p>
          </div>

          <div className="nl-actions">
            <button className="create-btn" onClick={handleCreate}>Crear Liga</button>
            <button className="settings-btn" disabled>Ajustes Personalizados</button>
          </div>
        </div>

        <div className="nl-info">
          <div className="info-box">
            <h3>Comienza tu carrera desde cero</h3>
            <p>Los equipos, plantillas de jugadores y presupuestos iniciales se generan de forma procedural en el momento que creas la liga basándose en datos equilibrados.</p>
          </div>
          <div className="info-box">
            <h3>Observa la evolución de la liga</h3>
            <p>Con el paso de los años verás a jóvenes promesas de la cantera ascender a estrellas mundiales, mientras los veteranos sufren el declive físico. Lucha por ganar el título de liga o sufre peleando el descenso.</p>
          </div>
          <div className="info-box">
            <h3>Cada partida es única</h3>
            <p>Las promesas generadas ('Regens') siempre tendrán diferentes curvas de potencial. Podrás ver cómo carreras prometedoras se truncan por lesiones, o cómo nuevas combinaciones de jugadores generan dinastías imbatibles a lo largo de las décadas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
