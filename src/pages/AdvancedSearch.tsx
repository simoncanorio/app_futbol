import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';

export function AdvancedSearch() {
  const { leagueId } = useParams();
  const [players, setPlayers] = useState<(Player & { teamObj?: Team })[]>([]);
  
  // Filters
  const [posFilter, setPosFilter] = useState<string>('ALL');
  const [minAge, setMinAge] = useState<number>(15);
  const [maxAge, setMaxAge] = useState<number>(45);
  const [minOvr, setMinOvr] = useState<number>(0);
  const [maxOvr, setMaxOvr] = useState<number>(99);
  
  // Columns
  const [showBio, setShowBio] = useState(false);
  const [showRatings, setShowRatings] = useState(true);
  const [showStats, setShowStats] = useState(true);

  // Pagination
  const [page, setPage] = useState(0);
  const pageSize = 50;

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      const teamMap = new Map<number, Team>();
      allTeams.forEach(t => teamMap.set(t.id!, t));
      
      const p = allPlayers.map(pl => ({
        ...pl,
        teamObj: pl.teamId ? teamMap.get(pl.teamId) : undefined
      }));
      setPlayers(p);
    }
    load();
  }, [leagueId]);

  // Apply filters
  let filtered = players.filter(p => p.age >= minAge && p.age <= maxAge && p.overall >= minOvr && p.overall <= maxOvr);
  if (posFilter !== 'ALL') {
    filtered = filtered.filter(p => p.position === posFilter);
  }
  
  filtered.sort((a,b) => b.overall - a.overall);

  const visiblePlayers = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Búsqueda Avanzada (Advanced Player Search)</h1>
      </div>
      
      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem', background: '#1a1a2e', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333'}}>
        <div style={{flex: 1, minWidth: '300px'}}>
          <h3 style={{marginTop: 0, color: '#e67e22', borderBottom: '1px solid #333', paddingBottom: '0.5rem'}}>Filtros</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div>
              <label style={{display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '4px'}}>Posición</label>
              <select value={posFilter} onChange={e => {setPosFilter(e.target.value); setPage(0);}} style={{width: '100%', background: '#222', color: 'white', border: '1px solid #444', padding: '6px', borderRadius: '4px'}}>
                <option value="ALL">Todas</option>
                <option value="POR">Porteros (POR)</option>
                <option value="DEF">Defensores (DEF)</option>
                <option value="MED">Medios (MED)</option>
                <option value="DEL">Delanteros (DEL)</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '4px'}}>Rango de Edad</label>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <input type="number" value={minAge} onChange={e => {setMinAge(Number(e.target.value)); setPage(0);}} style={{width: '100%', background: '#222', color: 'white', border: '1px solid #444', padding: '6px', borderRadius: '4px'}} />
                <span style={{lineHeight: '30px'}}>-</span>
                <input type="number" value={maxAge} onChange={e => {setMaxAge(Number(e.target.value)); setPage(0);}} style={{width: '100%', background: '#222', color: 'white', border: '1px solid #444', padding: '6px', borderRadius: '4px'}} />
              </div>
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '4px'}}>Rango de Valoración (OVR)</label>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <input type="number" value={minOvr} onChange={e => {setMinOvr(Number(e.target.value)); setPage(0);}} style={{width: '100%', background: '#222', color: 'white', border: '1px solid #444', padding: '6px', borderRadius: '4px'}} />
                <span style={{lineHeight: '30px'}}>-</span>
                <input type="number" value={maxOvr} onChange={e => {setMaxOvr(Number(e.target.value)); setPage(0);}} style={{width: '100%', background: '#222', color: 'white', border: '1px solid #444', padding: '6px', borderRadius: '4px'}} />
              </div>
            </div>
          </div>
        </div>

        <div style={{flex: 1, minWidth: '300px'}}>
          <h3 style={{marginTop: 0, color: '#3b82f6', borderBottom: '1px solid #333', paddingBottom: '0.5rem'}}>Columnas Adicionales</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input type="checkbox" checked={showBio} onChange={e => setShowBio(e.target.checked)} />
              Biografía (Altura, Peso, País)
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input type="checkbox" checked={showRatings} onChange={e => setShowRatings(e.target.checked)} />
              Atributos (PAC, SHO, PAS, DRI, DEF, PHY)
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input type="checkbox" checked={showStats} onChange={e => setShowStats(e.target.checked)} />
              Estadísticas Propias (Goles, Asistencias, Amarillas)
            </label>
          </div>
        </div>
      </div>

      <div style={{fontSize: '13px', color: '#aaa', marginBottom: '0.5rem'}}>{filtered.length} resultados encontrados</div>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Pos</th>
              <th>Team</th>
              <th>Age</th>
              <th>OVR</th>
              <th>POT</th>
              {showBio && <><th>Height</th><th>Weight</th><th>Country</th></>}
              {showRatings && <><th>PAC</th><th>SHO</th><th>PAS</th><th>DRI</th><th>DEF</th><th>PHY</th></>}
              {showStats && <><th>GP</th><th>Gls</th><th>Ast</th><th>YC</th><th>CS</th></>}
            </tr>
          </thead>
          <tbody>
            {visiblePlayers.map(p => (
              <tr key={p.id}>
                <td style={{fontWeight: 'bold'}}>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#3b82f6', textDecoration: 'none'}}>
                    {p.name}
                  </Link>
                </td>
                <td>{p.position}</td>
                <td>
                  {p.teamObj ? (
                    <Link to={`/l/${leagueId}/team/${p.teamObj.id}`} style={{color: '#e67e22', textDecoration: 'none'}}>
                      {p.teamObj.name.substring(0,3).toUpperCase()}
                    </Link>
                  ) : 'FA'}
                </td>
                <td>{p.age}</td>
                <td style={{fontWeight: 'bold', color: '#3b82f6'}}>{p.overall}</td>
                <td>{p.potential}</td>
                
                {showBio && (
                  <>
                    <td>{p.bio?.height ? `${p.bio.height} cm` : '-'}</td>
                    <td>{p.bio?.weight ? `${p.bio.weight} kg` : '-'}</td>
                    <td>{p.bio?.country || '-'}</td>
                  </>
                )}
                
                {showRatings && (
                  <>
                    <td>{p.attributes?.pace || '-'}</td>
                    <td>{p.attributes?.shooting || '-'}</td>
                    <td>{p.attributes?.passing || '-'}</td>
                    <td>{p.attributes?.dribbling || '-'}</td>
                    <td>{p.attributes?.defending || '-'}</td>
                    <td>{p.attributes?.physical || '-'}</td>
                  </>
                )}
                
                {showStats && (
                  <>
                    <td>{p.stats?.gamesPlayed || 0}</td>
                    <td style={{color: '#e67e22'}}>{p.stats?.goals || 0}</td>
                    <td>{p.stats?.assists || 0}</td>
                    <td>{p.stats?.yellowCards || 0}</td>
                    <td>{p.position === 'POR' ? (p.stats?.cleanSheets || 0) : '-'}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {filtered.length > pageSize && (
          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem'}}>
             <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={{padding: '4px 12px', background: '#111', color: 'white', border: '1px solid #444', cursor: page === 0 ? 'not-allowed' : 'pointer'}}>Anterior</button>
             <span style={{padding: '4px 0'}}>Página {page + 1} de {Math.ceil(filtered.length / pageSize)}</span>
             <button disabled={(page + 1) * pageSize >= filtered.length} onClick={() => setPage(p => p + 1)} style={{padding: '4px 12px', background: '#111', color: 'white', border: '1px solid #444', cursor: (page + 1) * pageSize >= filtered.length ? 'not-allowed' : 'pointer'}}>Siguiente</button>
          </div>
        )}
      </div>
    </div>
  );
}
