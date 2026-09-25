import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewLeague, createRealLeagueFromTransfermarkt, teamNames } from '../db/generators';
import { Globe, Cpu, Calendar, Sun, Snowflake, Flame, Star } from 'lucide-react';
import './NewLeague.css';

export function NewLeague() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'procedural' | 'transfermarkt'>('transfermarkt');
  const [leagueName, setLeagueName] = useState('LaLiga EA Sports');
  const [difficulty, setDifficulty] = useState<'Normal' | 'Hard' | 'Insane'>('Normal');
  const [teamIndex, setTeamIndex] = useState<number>(-1);

  // Transfermarkt & Era Selection
  const [competitionId, setCompetitionId] = useState('ES1');
  const [startYear, setStartYear] = useState<number>(2026);
  const [customYearInput, setCustomYearInput] = useState('2026');

  // Start Period Selection
  const [startPeriod, setStartPeriod] = useState<'preseason' | 'winter_window' | 'final_stretch'>('preseason');

  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const competitionsList = [
    { id: 'ES1', name: 'LaLiga (España)' },
    { id: 'GB1', name: 'Premier League (Inglaterra)' },
    { id: 'IT1', name: 'Serie A (Italia)' },
    { id: 'L1', name: 'Bundesliga (Alemania)' },
    { id: 'FR1', name: 'Ligue 1 (Francia)' },
    { id: 'AR1N', name: 'Liga Profesional (Argentina)' }
  ];

  const erasPresets = [
    { year: 2026, label: '🌟 2026/27 (Fútbol Actual)', desc: 'Mbappé en Madrid, Yamal en Barcelona, Haaland' },
    { year: 2020, label: '🐐 2020/21 (Última de Messi en Barça)', desc: 'Messi en FC Barcelona, CR7 en Juventus, Neymar/Mbappé' },
    { year: 2014, label: '⚡ 2014/15 (MSN vs BBC)', desc: 'Triplete del Barça (Messi, Suárez, Neymar) vs BBC Madrid' },
    { year: 2006, label: '💎 2006/07 (Messi Joven / Ronaldinho)', desc: 'Messi con 19 años en el Barça, Ronaldinho, Henry, Rooney' }
  ];

  const handleCreate = async () => {
    setIsGenerating(true);
    try {
      if (mode === 'procedural') {
        const id = await createNewLeague(leagueName, difficulty, teamIndex, startYear, startPeriod);
        navigate(`/l/${id}`);
      } else {
        const selectedComp = competitionsList.find(c => c.id === competitionId);
        const finalName = leagueName || selectedComp?.name || 'Liga Transfermarkt';
        const id = await createRealLeagueFromTransfermarkt(
          finalName,
          difficulty,
          competitionId,
          startYear,
          startPeriod,
          (msg) => setStatusMsg(msg)
        );
        navigate(`/l/${id}`);
      }
    } catch (err: any) {
      console.error(err);
      alert('Ocurrió un error al crear la liga: ' + (err?.message || err));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="new-league-page">
      <div className="nl-header">
        <h1>Nueva Liga de Fútbol Histórica o Actual</h1>
        <p>Elige la era histórica, el periodo de inicio de la temporada y el formato de datos.</p>
      </div>

      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        <button
          className={`tm-tab ${mode === 'transfermarkt' ? 'active' : ''}`}
          onClick={() => { setMode('transfermarkt'); setLeagueName('LaLiga Santander'); }}
          style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}
        >
          <Globe size={18} /> Real Sync (Transfermarkt API)
        </button>
        <button
          className={`tm-tab ${mode === 'procedural' ? 'active' : ''}`}
          onClick={() => { setMode('procedural'); setLeagueName('Liga Ficticia'); }}
          style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}
        >
          <Cpu size={18} /> Procedural (Jugadores Ficticios)
        </button>
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

          {/* Era / Season Year Selection */}
          <div className="form-group">
            <label><Calendar size={16} /> Selecciona la Era / Temporada Histórica</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              {erasPresets.map(era => (
                <div
                  key={era.year}
                  onClick={() => { setStartYear(era.year); setCustomYearInput(String(era.year)); }}
                  style={{
                    padding: '0.8rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: startYear === era.year ? 'rgba(59, 130, 246, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                    border: `1px solid ${startYear === era.year ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: startYear === era.year ? '#38bdf8' : '#ffffff' }}>{era.label}</div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{era.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.8rem' }}>
              <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>Año personalizado:</span>
              <input
                type="number"
                value={customYearInput}
                onChange={e => {
                  setCustomYearInput(e.target.value);
                  const y = Number(e.target.value);
                  if (y >= 1990 && y <= 2026) setStartYear(y);
                }}
                className="bb-input"
                style={{ width: '100px' }}
                placeholder="2011"
              />
            </div>
          </div>

          {/* Starting Period Selection */}
          <div className="form-group">
            <label><Star size={16} /> Punto de Inicio de la Temporada</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginTop: '0.5rem' }}>
              <div
                onClick={() => setStartPeriod('preseason')}
                style={{
                  padding: '0.8rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: startPeriod === 'preseason' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                  border: `1px solid ${startPeriod === 'preseason' ? '#10b981' : 'rgba(255,255,255,0.1)'}`
                }}
              >
                <Sun size={20} color="#10b981" />
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.3rem' }}>Pretemporada</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Semana 1</div>
              </div>

              <div
                onClick={() => setStartPeriod('winter_window')}
                style={{
                  padding: '0.8rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: startPeriod === 'winter_window' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                  border: `1px solid ${startPeriod === 'winter_window' ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`
                }}
              >
                <Snowflake size={20} color="#38bdf8" />
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.3rem' }}>Mercado de Invierno</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Semana 19 (Enero)</div>
              </div>

              <div
                onClick={() => setStartPeriod('final_stretch')}
                style={{
                  padding: '0.8rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: startPeriod === 'final_stretch' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                  border: `1px solid ${startPeriod === 'final_stretch' ? '#ef4444' : 'rgba(255,255,255,0.1)'}`
                }}
              >
                <Flame size={20} color="#ef4444" />
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.3rem' }}>Tramo Final</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Semana 30 (8 fechas)</div>
              </div>
            </div>
          </div>

          {mode === 'transfermarkt' ? (
            <div className="form-group">
              <label>Competición Real</label>
              <select
                className="bb-select"
                value={competitionId}
                onChange={e => {
                  setCompetitionId(e.target.value);
                  const found = competitionsList.find(c => c.id === e.target.value);
                  if (found) setLeagueName(found.name);
                }}
              >
                {competitionsList.map(comp => (
                  <option key={comp.id} value={comp.id}>{comp.name}</option>
                ))}
              </select>
            </div>
          ) : (
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
            </div>
          )}

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
          </div>

          {isGenerating && (
            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', color: '#60a5fa', marginBottom: '1rem', fontWeight: 600 }}>
              {statusMsg || `Generando liga de la era ${startYear}... Por favor espera.`}
            </div>
          )}

          <div className="nl-actions">
            <button className="create-btn" onClick={handleCreate} disabled={isGenerating}>
              {isGenerating ? 'Creando...' : `Iniciar Liga (${startYear})`}
            </button>
          </div>
        </div>

        <div className="nl-info">
          <div className="info-box">
            <h3><Calendar size={16} /> Eras Históricas Reales</h3>
            <p>Puedes empezar en 2006 con Lionel Messi recién ascendido de la cantera del Barcelona o en 2020 en su última temporada blaugrana.</p>
          </div>
          <div className="info-box">
            <h3><Snowflake size={16} /> Periodos de la Temporada</h3>
            <p>Empieza en pretemporada, o salta directo al mercado de invierno en enero con presupuestos renovados o al tramo final a definir la liga.</p>
          </div>
          <div className="info-box">
            <h3><Globe size={16} /> Transfermarkt Historical Sync</h3>
            <p>El sistema descarga automáticamente las plantillas oficiales y valoraciones exactas registradas por Transfermarkt en cada año histórico elegido.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
