import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team } from '../db/db';
import { Palette, CheckCircle2, Sparkles } from 'lucide-react';

export function KitCreator() {
  const { leagueId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);

  const [primaryColor, setPrimaryColor] = useState('#ef4444');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [pattern, setPattern] = useState<'solid' | 'stripes' | 'hoop' | 'diagonal'>('stripes');

  const presets = [
    { name: 'Blanco Galáctico', primary: '#ffffff', secondary: '#f59e0b', pattern: 'solid' as const },
    { name: 'Blaugrana', primary: '#1e3a8a', secondary: '#991b1b', pattern: 'stripes' as const },
    { name: 'Rojiblanco', primary: '#dc2626', secondary: '#ffffff', pattern: 'stripes' as const },
    { name: 'Verdiblanco', primary: '#15803d', secondary: '#ffffff', pattern: 'stripes' as const },
    { name: 'Azul y Oro', primary: '#1d4ed8', secondary: '#f59e0b', pattern: 'hoop' as const },
    { name: 'Banda Roja', primary: '#ffffff', secondary: '#dc2626', pattern: 'diagonal' as const },
    { name: 'Sky Blue', primary: '#0ea5e9', secondary: '#ffffff', pattern: 'solid' as const },
    { name: 'Nero-Azurri', primary: '#0f172a', secondary: '#2563eb', pattern: 'stripes' as const }
  ];

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if (l && l.userTeamId) {
        const uTeam = await db.teams.get(l.userTeamId);
        if (uTeam) {
          setTeam(uTeam);
          if (uTeam.kit) {
            setPrimaryColor(uTeam.kit.primaryColor || '#ef4444');
            setSecondaryColor(uTeam.kit.secondaryColor || '#ffffff');
            setPattern(uTeam.kit.pattern || 'stripes');
          }
        }
      }
    }
    load();
  }, [leagueId]);

  const handleSaveKit = async () => {
    if (!team) return;
    team.kit = {
      primaryColor,
      secondaryColor,
      pattern
    };
    await db.teams.put(team);
    alert(`¡Diseño de uniforme guardado exitosamente para ${team.name}!`);
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setPattern(preset.pattern);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Diseñador de Camisetas & Escudo (Kit Creator)</h1>
        <p style={{ color: '#94a3b8' }}>Personaliza los colores principales, secundarios y patrones del uniforme oficial de tu club.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Controls */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3><Palette size={20} /> Personalizar Indumentaria</h3>

          <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Plantillas Rápidas (Presets)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(p)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#ffffff',
                    padding: '0.4rem 0.7rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: p.primary, border: '1px solid #fff', display: 'inline-block' }} />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label>Color Principal (Camiseta)</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.4rem' }}>
              <input
                type="color"
                value={primaryColor}
                onChange={e => setPrimaryColor(e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 600 }}>{primaryColor}</span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label>Color Secundario / Detalles</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.4rem' }}>
              <input
                type="color"
                value={secondaryColor}
                onChange={e => setSecondaryColor(e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 600 }}>{secondaryColor}</span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Patrón de Diseño</label>
            <select
              value={pattern}
              onChange={e => setPattern(e.target.value as any)}
              className="bb-select"
              style={{ marginTop: '0.4rem', width: '100%' }}
            >
              <option value="solid">Liso (Sólido)</option>
              <option value="stripes">Bastones Verticales (Stripes)</option>
              <option value="hoop">Franja Horizontal (Hoops)</option>
              <option value="diagonal">Franja Diagonal (Band)</option>
            </select>
          </div>

          <button className="tm-btn-primary" onClick={handleSaveKit} style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', fontWeight: 'bold' }}>
            <CheckCircle2 size={18} /> Guardar Diseño de Uniforme
          </button>
        </div>

        {/* SVG Jersey Preview */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3>Vista Previa en Tiempo Real</h3>
          <div style={{ margin: '1.5rem 0' }}>
            <svg width="240" height="280" viewBox="0 0 220 260">
              <defs>
                <clipPath id="jerseyClip">
                  <path d="M 50,40 L 80,10 L 140,10 L 170,40 L 210,80 L 180,120 L 160,100 L 160,250 L 60,250 L 60,100 L 40,120 L 10,80 Z" />
                </clipPath>
              </defs>

              {/* Base Jersey */}
              <path
                d="M 50,40 L 80,10 L 140,10 L 170,40 L 210,80 L 180,120 L 160,100 L 160,250 L 60,250 L 60,100 L 40,120 L 10,80 Z"
                fill={primaryColor}
                stroke="#ffffff"
                strokeWidth="3"
              />

              {/* Pattern overlays inside clip path */}
              <g clipPath="url(#jerseyClip)">
                {pattern === 'stripes' && (
                  <>
                    <rect x="75" y="0" width="20" height="260" fill={secondaryColor} />
                    <rect x="125" y="0" width="20" height="260" fill={secondaryColor} />
                  </>
                )}
                {pattern === 'hoop' && (
                  <rect x="0" y="120" width="220" height="40" fill={secondaryColor} />
                )}
                {pattern === 'diagonal' && (
                  <polygon points="0,0 40,0 220,220 220,260 180,260 0,40" fill={secondaryColor} />
                )}
              </g>

              {/* Collar */}
              <path d="M 80,10 Q 110,40 140,10" fill="none" stroke={secondaryColor} strokeWidth="5" />
            </svg>
          </div>

          <p style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>{team?.name || 'Tu Equipo'}</p>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem' }}>Uniforme Titular • Temporada Histórica</p>
        </div>
      </div>
    </div>
  );
}
