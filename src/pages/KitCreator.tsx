import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team } from '../db/db';
import { Palette, CheckCircle2 } from 'lucide-react';

export function KitCreator() {
  const { leagueId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);

  const [primaryColor, setPrimaryColor] = useState('#ef4444');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [pattern, setPattern] = useState<'solid' | 'stripes' | 'hoop' | 'diagonal'>('stripes');

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
    alert('¡Diseño de uniforme y escudo guardado para tu equipo!');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Diseñador de Camisetas & Escudo (Kit Creator)</h1>
        <p style={{ color: '#94a3b8' }}>Personaliza los colores principales, secundarios y patrones del uniforme de tu club.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Controls */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3><Palette size={20} /> Personalizar Indumentaria</h3>

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
              style={{ marginTop: '0.4rem' }}
            >
              <option value="solid">Liso (Solido)</option>
              <option value="stripes">Baston Verticales (Stripes)</option>
              <option value="hoop">Franja Horizontal (Hoops)</option>
              <option value="diagonal">Franja Diagonal (Band)</option>
            </select>
          </div>

          <button className="tm-btn-primary" onClick={handleSaveKit} style={{ width: '100%', padding: '0.8rem' }}>
            <CheckCircle2 size={16} /> Guardar Diseño de Uniforme
          </button>
        </div>

        {/* SVG Jersey Preview */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3>Vista Previa del Uniforme</h3>
          <div style={{ margin: '1.5rem 0' }}>
            <svg width="220" height="260" viewBox="0 0 220 260">
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

          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{team?.name || 'Tu Equipo'} • Temporada Histórica</p>
        </div>
      </div>
    </div>
  );
}
