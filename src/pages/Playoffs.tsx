import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team } from '../db/db';
import { Trophy, Globe, Award, Shield, CheckCircle } from 'lucide-react';
import './Playoffs.css';

export function Playoffs() {
  const { leagueId } = useParams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTab, setActiveTab] = useState<'champions' | 'cup'>('champions');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      if (!lid) return;
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      setTeams(allTeams.sort((a, b) => b.overall - a.overall));
    }
    load();
  }, [leagueId]);

  const tName = (idx: number, defaultName: string) => teams[idx]?.name || defaultName;
  const tOvr = (idx: number, defaultOvr: number) => teams[idx]?.overall || defaultOvr;

  return (
    <div className="page-container playoffs-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Competiciones Internacionales & Copas Nacionales</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Formato oficial de Champions League (Fase de Liga + Eliminatorias) y Copa del Rey / FA Cup.</p>
        </div>
      </div>

      {/* Competition Tabs */}
      <div className="tm-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`tm-tab ${activeTab === 'champions' ? 'active' : ''}`}
          onClick={() => setActiveTab('champions')}
        >
          <Globe size={16} /> UEFA Champions League 2026
        </button>
        <button
          className={`tm-tab ${activeTab === 'cup' ? 'active' : ''}`}
          onClick={() => setActiveTab('cup')}
        >
          <Trophy size={16} /> Copa Nacional del Rey / FA Cup
        </button>
      </div>

      {activeTab === 'champions' ? (
        <div className="champions-container">
          {/* Header Trophy Banner */}
          <div className="glass-panel comp-banner">
            <Award size={36} color="#eab308" />
            <div>
              <h3>UEFA Champions League • Temporada 2026</h3>
              <p>Fase de Liga de 36 equipos y Fase Eliminatoria Directa a Doble Partido (Ida y Vuelta).</p>
            </div>
            <div className="prize-badge">
              <span>Premio Campeón</span>
              <strong>€85,000,000</strong>
            </div>
          </div>

          {/* Phase 1: League Phase Table Snippet */}
          <div className="champions-grid">
            <div className="glass-panel league-phase-card">
              <h3>Fase de Liga Champions (Top 8 Pasan a Cuartos Directo)</h3>
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Club</th>
                    <th>PJ</th>
                    <th>DG</th>
                    <th>PTS</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.slice(0, 8).map((tm, idx) => (
                    <tr key={tm.id}>
                      <td style={{ color: '#eab308', fontWeight: 'bold' }}>{idx + 1}</td>
                      <td><strong>{tm.name}</strong></td>
                      <td>8</td>
                      <td>+{12 - idx * 2}</td>
                      <td style={{ color: '#eab308', fontWeight: 'bold' }}>{24 - idx * 2}</td>
                      <td><span className="status-badge-green"><CheckCircle size={12} /> Clasificado</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Knockout Bracket */}
            <div className="glass-panel bracket-card">
              <h3>Fase Eliminatoria (Ida y Vuelta)</h3>

              <div className="bracket-wrapper">
                {/* Quarterfinals */}
                <div className="bracket-column">
                  <h4>Cuartos de Final (Ida y Vuelta)</h4>

                  <div className="bracket-matchup">
                    <div className="matchup-row winner">
                      <span>{tName(0, 'Real Madrid')} (OVR {tOvr(0, 88)})</span>
                      <strong>3 - 1 (Global: 4-2)</strong>
                    </div>
                    <div className="matchup-row">
                      <span>{tName(7, 'Arsenal')}</span>
                      <strong>1 - 1</strong>
                    </div>
                  </div>

                  <div className="bracket-matchup">
                    <div className="matchup-row winner">
                      <span>{tName(1, 'FC Barcelona')} (OVR {tOvr(1, 87)})</span>
                      <strong>2 - 0 (Global: 3-1)</strong>
                    </div>
                    <div className="matchup-row">
                      <span>{tName(6, 'Inter de Milán')}</span>
                      <strong>1 - 1</strong>
                    </div>
                  </div>
                </div>

                {/* Semifinals & Neutral Final */}
                <div className="bracket-column">
                  <h4>Semifinales & Gran Final</h4>

                  <div className="bracket-matchup final-matchup">
                    <div className="matchup-row winner">
                      <span>{tName(0, 'Real Madrid')}</span>
                      <strong>2 - 1 (Ida)</strong>
                    </div>
                    <div className="matchup-row">
                      <span>{tName(1, 'FC Barcelona')}</span>
                      <strong>1 - 1 (Vuelta)</strong>
                    </div>
                    <div className="final-tag">🏆 Gran Final: Estadi Olímpic / Allianz Arena</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cup-container">
          <div className="glass-panel comp-banner">
            <Trophy size={36} color="#38bdf8" />
            <div>
              <h3>Copa Nacional Doméstica 2026</h3>
              <p>Eliminatoria directa a partido único con prórroga y penaltis.</p>
            </div>
            <div className="prize-badge">
              <span>Premio Campeón</span>
              <strong>€25,000,000</strong>
            </div>
          </div>

          <div className="glass-panel bracket-card">
            <h3>Cuadro del Torneo de Copa</h3>

            <div className="bracket-wrapper">
              <div className="bracket-column">
                <h4>Semifinales</h4>
                <div className="bracket-matchup">
                  <div className="matchup-row winner">
                    <span>{tName(0, 'Local FC')}</span>
                    <strong>3</strong>
                  </div>
                  <div className="matchup-row">
                    <span>{tName(3, 'Rival FC')}</span>
                    <strong>1</strong>
                  </div>
                </div>
                <div className="bracket-matchup">
                  <div className="matchup-row winner">
                    <span>{tName(2, 'Atlético')}</span>
                    <strong>2 (P)</strong>
                  </div>
                  <div className="matchup-row">
                    <span>{tName(4, 'Sevilla')}</span>
                    <strong>2</strong>
                  </div>
                </div>
              </div>

              <div className="bracket-column">
                <h4>Gran Final de Copa</h4>
                <div className="bracket-matchup final-matchup">
                  <div className="matchup-row winner">
                    <span>👑 {tName(0, 'Campeón Copa')}</span>
                    <strong style={{ color: '#10b981' }}>2</strong>
                  </div>
                  <div className="matchup-row">
                    <span>{tName(2, 'Atlético')}</span>
                    <strong>0</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
