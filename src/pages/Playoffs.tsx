import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team } from '../db/db';
import { OFFLINE_CLUBS } from '../services/transfermarktData';
import { Trophy, Globe, Award, CheckCircle } from 'lucide-react';
import './Playoffs.css';

export function Playoffs() {
  const { leagueId } = useParams();
  const [championsTeams, setChampionsTeams] = useState<{ id: string | number; name: string; overall: number; country: string; pts: number; gd: number }[]>([]);
  const [activeTab, setActiveTab] = useState<'champions' | 'cup'>('champions');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      if (!lid) return;

      const localTeams = await db.teams.where('leagueId').equals(lid).toArray();
      localTeams.sort((a, b) => b.overall - a.overall);

      // Build 36-team Champions League qualified clubs list combining local DB & top European clubs
      const clList: { id: string | number; name: string; overall: number; country: string; pts: number; gd: number }[] = [];

      localTeams.forEach((t, i) => {
        const pts = Math.max(6, 24 - i * 2);
        const gd = Math.max(-5, 14 - i * 2);
        clList.push({ id: t.id!, name: t.name, overall: t.overall, country: t.domesticLeague || 'Local', pts, gd });
      });

      // Add top European champions if local list < 36
      OFFLINE_CLUBS.forEach((c, i) => {
        if (!clList.find(x => x.name.toLowerCase().includes(c.name.toLowerCase()))) {
          const ovr = c.marketValue >= 1_000_000_000 ? 88 : (c.marketValue >= 600_000_000 ? 84 : 79);
          const pts = Math.max(6, 22 - i * 2);
          const gd = Math.max(-5, 12 - i * 2);
          clList.push({ id: c.id, name: c.name, overall: ovr, country: c.country, pts, gd });
        }
      });

      clList.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.overall - a.overall);
      setChampionsTeams(clList.slice(0, 36));
    }
    load();
  }, [leagueId]);

  const cTeam = (idx: number, fallback: string) => championsTeams[idx]?.name || fallback;
  const cOvr = (idx: number, fallback: number) => championsTeams[idx]?.overall || fallback;

  return (
    <div className="page-container playoffs-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Competiciones Internacionales & Copas Nacionales</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Formato oficial de Champions League (Fase de Liga de 36 Equipos + Eliminatorias) y Copa Nacional.</p>
        </div>
      </div>

      {/* Competition Tabs */}
      <div className="tm-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`tm-tab ${activeTab === 'champions' ? 'active' : ''}`}
          onClick={() => setActiveTab('champions')}
        >
          <Globe size={16} /> UEFA Champions League (36 Equipos Clasificados)
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
              <h3>UEFA Champions League • Temporada 2026/27</h3>
              <p>Clasifican los mejores clubes de España, Inglaterra, Italia, Alemania y Francia en Fase de Liga Única.</p>
            </div>
            <div className="prize-badge">
              <span>Premio Campeón</span>
              <strong>€85,000,000</strong>
            </div>
          </div>

          {/* Phase 1: League Phase Table Snippet */}
          <div className="champions-grid">
            <div className="glass-panel league-phase-card">
              <h3>Tabla de Posiciones Fase de Liga (Top 8 a Octavos Directo)</h3>
              <div className="table-responsive" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Club</th>
                      <th>País</th>
                      <th>OVR</th>
                      <th>PTS</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {championsTeams.slice(0, 16).map((tm, idx) => (
                      <tr key={tm.id || idx}>
                        <td style={{ color: idx < 8 ? '#eab308' : '#38bdf8', fontWeight: 'bold' }}>{idx + 1}</td>
                        <td><strong>{tm.name}</strong></td>
                        <td>{tm.country}</td>
                        <td><span className="col-ovr">{tm.overall}</span></td>
                        <td style={{ color: '#eab308', fontWeight: 'bold' }}>{tm.pts}</td>
                        <td>
                          {idx < 8 ? (
                            <span className="status-badge-green"><CheckCircle size={12} /> Octavos Directo</span>
                          ) : (
                            <span className="status-badge-blue">Playoffs Play-in</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Knockout Bracket */}
            <div className="glass-panel bracket-card">
              <h3>Fase Eliminatoria UEFA Champions League</h3>

              <div className="bracket-wrapper">
                {/* Quarterfinals */}
                <div className="bracket-column">
                  <h4>Cuartos de Final (Ida y Vuelta)</h4>

                  <div className="bracket-matchup">
                    <div className="matchup-row winner">
                      <span>{cTeam(0, 'Real Madrid')} (OVR {cOvr(0, 88)})</span>
                      <strong>3 - 1 (Global: 4-2)</strong>
                    </div>
                    <div className="matchup-row">
                      <span>{cTeam(7, 'Arsenal FC')}</span>
                      <strong>1 - 1</strong>
                    </div>
                  </div>

                  <div className="bracket-matchup">
                    <div className="matchup-row winner">
                      <span>{cTeam(1, 'FC Barcelona')} (OVR {cOvr(1, 87)})</span>
                      <strong>2 - 0 (Global: 3-1)</strong>
                    </div>
                    <div className="matchup-row">
                      <span>{cTeam(6, 'Inter de Milán')}</span>
                      <strong>1 - 1</strong>
                    </div>
                  </div>

                  <div className="bracket-matchup">
                    <div className="matchup-row winner">
                      <span>{cTeam(2, 'Manchester City')} (OVR {cOvr(2, 88)})</span>
                      <strong>2 - 1 (Global: 4-2)</strong>
                    </div>
                    <div className="matchup-row">
                      <span>{cTeam(5, 'Bayern München')}</span>
                      <strong>1 - 1</strong>
                    </div>
                  </div>
                </div>

                {/* Semifinals & Neutral Final */}
                <div className="bracket-column">
                  <h4>Semifinales & Gran Final</h4>

                  <div className="bracket-matchup final-matchup">
                    <div className="matchup-row winner">
                      <span>{cTeam(0, 'Real Madrid')}</span>
                      <strong>2 - 1 (Ida)</strong>
                    </div>
                    <div className="matchup-row">
                      <span>{cTeam(1, 'FC Barcelona')}</span>
                      <strong>1 - 1 (Vuelta)</strong>
                    </div>
                    <div className="final-tag">🏆 Gran Final: Allianz Arena / Wembley Stadium</div>
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
                    <span>{cTeam(0, 'Local FC')}</span>
                    <strong>3</strong>
                  </div>
                  <div className="matchup-row">
                    <span>{cTeam(3, 'Rival FC')}</span>
                    <strong>1</strong>
                  </div>
                </div>
                <div className="bracket-matchup">
                  <div className="matchup-row winner">
                    <span>{cTeam(2, 'Atlético de Madrid')}</span>
                    <strong>2 (P)</strong>
                  </div>
                  <div className="matchup-row">
                    <span>{cTeam(4, 'Sevilla FC')}</span>
                    <strong>2</strong>
                  </div>
                </div>
              </div>

              <div className="bracket-column">
                <h4>Gran Final de Copa</h4>
                <div className="bracket-matchup final-matchup">
                  <div className="matchup-row winner">
                    <span>👑 {cTeam(0, 'Campeón Copa')}</span>
                    <strong style={{ color: '#10b981' }}>2</strong>
                  </div>
                  <div className="matchup-row">
                    <span>{cTeam(2, 'Atlético de Madrid')}</span>
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
