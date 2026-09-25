import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type ScoutMission, type Player, type Team, type League, getInitialPlayerStats } from '../db/db';
import { Compass, Users, MapPin, CheckCircle, Clock, PlusCircle, Eye, Search, AlertCircle } from 'lucide-react';

export function ScoutingNetwork() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [missions, setMissions] = useState<ScoutMission[]>([]);
  const [scoutedPlayers, setScoutedPlayers] = useState<(Player & { isInDepthScouted?: boolean })[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<'Sudamérica' | 'Europa' | 'África' | 'Asia'>('Sudamérica');
  const [scoutName, setScoutName] = useState('Ojeador Principal');

  const loadData = async () => {
    const lid = Number(leagueId);
    if (!lid) return;

    const l = await db.leagues.get(lid);
    if (!l) return;
    setLeague(l);

    if (l.userTeamId) {
      const uTeam = await db.teams.get(l.userTeamId);
      setUserTeam(uTeam || null);
    }

    const m = await db.scoutMissions.where('leagueId').equals(lid).toArray();
    
    // Check if active missions completed based on weeks
    for (const mission of m) {
      if (!mission.isCompleted && l.currentWeek >= mission.startWeek + mission.durationWeeks) {
        mission.isCompleted = true;
        await db.scoutMissions.put(mission);
      }
    }
    setMissions(m);

    const sPlayers = await db.players.where('leagueId').equals(lid).filter(p => p.isScouted === true).toArray();
    setScoutedPlayers(sPlayers);
  };

  useEffect(() => {
    loadData();
  }, [leagueId]);

  const handleStartMission = async () => {
    if (!league || !userTeam) return;

    const cost = 500000;
    if (userTeam.budget < cost) {
      alert('Presupuesto insuficiente para enviar una misión de ojeo.');
      return;
    }

    userTeam.budget -= cost;
    await db.teams.put(userTeam);

    const durationWeeks = Math.floor(Math.random() * 3) + 4; // 4 to 6 weeks duration

    const newMission: ScoutMission = {
      leagueId: league.id!,
      region: selectedRegion,
      scoutName,
      durationWeeks,
      startWeek: league.currentWeek,
      isCompleted: false
    };

    const mId = await db.scoutMissions.add(newMission);

    // Generate 3 scouted prospects with hidden potential ranges
    const firstNames = ['Matías', 'Lucas', 'Thiago', 'Enzo', 'Gabriel', 'Sadio', 'Kenji', 'Kylian', 'Mateo', 'Joao'];
    const lastNames = ['Silva', 'Santos', 'Fernández', 'Diallo', 'Takahashi', 'Traoré', 'Gómez', 'Mendes', 'Nakamura'];
    const positions: ('POR' | 'DEF' | 'MED' | 'DEL')[] = ['DEF', 'MED', 'DEL', 'POR'];

    const newProspects: Player[] = [];
    for (let i = 0; i < 3; i++) {
      const ovr = Math.floor(58 + Math.random() * 18);
      const pot = Math.min(99, ovr + Math.floor(12 + Math.random() * 22));
      newProspects.push({
        leagueId: league.id!,
        teamId: null,
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        age: 16 + Math.floor(Math.random() * 4),
        overall: ovr,
        potential: pot,
        position: positions[Math.floor(Math.random() * positions.length)],
        contract: 300000,
        stats: getInitialPlayerStats(),
        isScouted: true,
        attributes: {
          pace: Math.floor(55 + Math.random() * 38),
          shooting: Math.floor(45 + Math.random() * 45),
          passing: Math.floor(50 + Math.random() * 40),
          dribbling: Math.floor(55 + Math.random() * 38),
          defending: Math.floor(40 + Math.random() * 45),
          physical: Math.floor(50 + Math.random() * 40)
        },
        bio: {
          height: 175 + Math.floor(Math.random() * 15),
          weight: 70 + Math.floor(Math.random() * 15),
          country: selectedRegion
        }
      });
    }

    const pIds = await db.players.bulkAdd(newProspects, { allKeys: true }) as number[];
    await db.scoutMissions.update(mId, { discoveredPlayerIds: pIds });

    alert(`¡Misión enviada a ${selectedRegion}! El ojeador tardará ${durationWeeks} semanas en regresar con los informes.`);
    loadData();
  };

  const handleInDepthScout = async (p: Player & { isInDepthScouted?: boolean }) => {
    if (!userTeam) return;

    const cost = 100000;
    if (userTeam.budget < cost) {
      alert('No dispones de presupuesto suficiente para el informe detallado.');
      return;
    }

    userTeam.budget -= cost;
    await db.teams.put(userTeam);

    p.isInDepthScouted = true;
    await db.players.put(p);

    alert(`¡Informe a profundidad completado para ${p.name}! Potencial verificado en ${p.potential} OVR.`);
    loadData();
  };

  const handleSignProspect = async (p: Player, destination: 'youth' | 'first_team') => {
    if (!userTeam) return;

    p.teamId = userTeam.id!;
    p.lineupStatus = destination === 'youth' ? 'youth' : 'bench';
    p.isScouted = false;
    await db.players.put(p);

    alert(`¡${p.name} ha sido fichado para tu ${destination === 'youth' ? 'Filial' : 'Primer Equipo'}!`);
    loadData();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Red de Ojeadores (Scouting Network)</h1>
        <p style={{ color: '#94a3b8' }}>Manda expediciones de varias semanas y realiza informes a profundidad para quitar la niebla sobre su verdadero potencial.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Left Form */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3><Compass size={18} /> Nueva Misión de Ojeo</h3>
          
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Región de Búsqueda</label>
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value as any)}
              className="bb-select"
            >
              <option value="Sudamérica">Sudamérica (Brasil, Argentina, Colombia)</option>
              <option value="Europa">Europa (Francia, Portugal, España)</option>
              <option value="África">África (Senegal, Nigeria, Costa de Marfil)</option>
              <option value="Asia">Asia (Japón, Corea del Sur)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Nombre del Ojeador</label>
            <input
              type="text"
              value={scoutName}
              onChange={e => setScoutName(e.target.value)}
              className="bb-input"
            />
          </div>

          <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Costo: <strong>$500,000</strong> | Duración: <strong>4 a 6 Jornadas</strong></p>

          <button className="tm-btn-primary" onClick={handleStartMission} style={{ width: '100%', padding: '0.7rem' }}>
            <PlusCircle size={16} /> Enviar Ojeador
          </button>
        </div>

        {/* Right Active Missions */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3><Clock size={18} /> Misiones Activas y Pasadas</h3>
          {missions.length === 0 ? (
            <p style={{ color: '#64748b' }}>No has enviado ojeadores aún.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {missions.map(m => {
                const remaining = Math.max(0, (m.startWeek + m.durationWeeks) - (league?.currentWeek || 1));
                return (
                  <div key={m.id} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.8rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#38bdf8' }}><MapPin size={14} /> {m.region}</h4>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ojeador: {m.scoutName}</span>
                    </div>
                    {m.isCompleted ? (
                      <span style={{ background: '#10b981', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                        <CheckCircle size={12} /> Completado
                      </span>
                    ) : (
                      <span style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#eab308', border: '1px solid #eab308', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                        <Clock size={12} /> En progreso (Faltan {remaining} semanas)
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Discovered Prospects Table */}
      <h2><Users size={20} /> Promesas Descubiertas por tus Ojeadores</h2>
      <div className="standings-content" style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Región</th>
              <th>Nombre</th>
              <th>Pos</th>
              <th>Edad</th>
              <th>OVR Estimado</th>
              <th>POTencial</th>
              <th>Informe Detallado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {scoutedPlayers.map(p => {
              const minPot = Math.max(50, p.potential - 8);
              const maxPot = Math.min(99, p.potential + 6);
              return (
                <tr key={p.id}>
                  <td>{p.bio?.country || 'Internacional'}</td>
                  <td>
                    <Link to={`/l/${leagueId}/player/${p.id}`} style={{ fontWeight: 'bold', color: '#ffffff', textDecoration: 'none' }}>
                      {p.name}
                    </Link>
                  </td>
                  <td style={{ color: '#38bdf8', fontWeight: 'bold' }}>{p.position}</td>
                  <td>{p.age}</td>
                  <td><strong>{p.overall}</strong></td>
                  <td>
                    {p.isInDepthScouted ? (
                      <span style={{ color: '#10b981', fontWeight: 'bold' }}>{p.potential} (Verificado)</span>
                    ) : (
                      <span style={{ color: '#eab308', fontWeight: 'bold' }}>{minPot} - {maxPot} (Estimación)</span>
                    )}
                  </td>
                  <td>
                    {p.isInDepthScouted ? (
                      <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}><CheckCircle size={12} /> Informe Completo</span>
                    ) : (
                      <button className="tm-btn-secondary" onClick={() => handleInDepthScout(p)} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
                        <Search size={12} /> Ojear a Fondo (€100k)
                      </button>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="tm-btn-primary" onClick={() => handleSignProspect(p, 'youth')} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', background: '#059669' }}>
                        Fichar Filial
                      </button>
                      <button className="tm-btn-primary" onClick={() => handleSignProspect(p, 'first_team')} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', background: '#38bdf8' }}>
                        Fichar 1º Equipo
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {scoutedPlayers.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>No hay jugadores ojeados pendientes de fichar.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
