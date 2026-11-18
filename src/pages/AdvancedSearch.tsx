import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db, type Player, type Team, formatMoney, getSpecificPosition } from '../db/db';
import { calculatePlayerMarketValue } from '../engine/valuationEngine';
import { ArrowLeftRight } from 'lucide-react';

export function AdvancedSearch() {
  const { leagueId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<(Player & { teamObj?: Team })[]>([]);
  
  // Filters
  const [nameQuery, setNameQuery] = useState<string>('');
  const [posFilter, setPosFilter] = useState<string>('ALL');
  const [contractFilter, setContractFilter] = useState<'ALL' | 'free' | 'expiring' | 'listed'>('ALL');
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
  if (nameQuery.trim()) {
    const q = nameQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || (p.bio?.country || '').toLowerCase().includes(q));
  }
  if (posFilter !== 'ALL') {
    filtered = filtered.filter(p => p.position === posFilter || getSpecificPosition(p) === posFilter);
  }
  if (contractFilter === 'free') {
    filtered = filtered.filter(p => !p.teamId);
  } else if (contractFilter === 'expiring') {
    filtered = filtered.filter(p => p.teamId && (p.contractYears || 2) <= 1);
  } else if (contractFilter === 'listed') {
    filtered = filtered.filter(p => p.isTransferListed || p.isLoanListed);
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
              <label style={{display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '4px'}}>Nombre / Nacionalidad</label>
              <input
                type="text"
                placeholder="Ej: Bellingham, España..."
                value={nameQuery}
                onChange={e => {setNameQuery(e.target.value); setPage(0);}}
                style={{width: '100%', background: '#222', color: 'white', border: '1px solid #444', padding: '6px', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '4px'}}>Posición</label>
              <select value={posFilter} onChange={e => {setPosFilter(e.target.value); setPage(0);}} style={{width: '100%', background: '#222', color: 'white', border: '1px solid #444', padding: '6px', borderRadius: '4px'}}>
                <option value="ALL">Todas</option>
                <option value="POR">Porteros (POR)</option>
                <option value="DEF">Defensores (DEF)</option>
                <option value="DFC">Centrales (DFC)</option>
                <option value="LI">Lateral Izq. (LI)</option>
                <option value="LD">Lateral Der. (LD)</option>
                <option value="MED">Medios (MED)</option>
                <option value="MCD">Pivotes (MCD)</option>
                <option value="MC">Mediocentros (MC)</option>
                <option value="MCO">Mediapuntas (MCO)</option>
                <option value="DEL">Delanteros (DEL)</option>
                <option value="EI">Extremo Izq. (EI)</option>
                <option value="ED">Extremo Der. (ED)</option>
                <option value="DC">Delantero Centro (DC)</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '4px'}}>Situación Contractual</label>
              <select value={contractFilter} onChange={e => {setContractFilter(e.target.value as any); setPage(0);}} style={{width: '100%', background: '#222', color: 'white', border: '1px solid #444', padding: '6px', borderRadius: '4px'}}>
                <option value="ALL">Cualquiera</option>
                <option value="free">Agente Libre (Sin Club)</option>
                <option value="expiring">Último Año de Contrato (≤ 1 año)</option>
                <option value="listed">En Lista de Traspasos / Cesión</option>
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
              Estadísticas Propias (Goles, Asistencias, xG, Nota)
            </label>
          </div>
        </div>
      </div>

      <div style={{fontSize: '13px', color: '#aaa', marginBottom: '0.5rem'}}>{filtered.length} resultados encontrados</div>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Pos</th>
              <th>Club</th>
              <th>Edad</th>
              <th>OVR</th>
              <th>POT</th>
              <th>Valor</th>
              {showBio && <><th>Altura</th><th>Peso</th><th>País</th></>}
              {showRatings && <><th>PAC</th><th>SHO</th><th>PAS</th><th>DRI</th><th>DEF</th><th>PHY</th></>}
              {showStats && <><th>PJ</th><th>Gls</th><th>Ast</th><th>xG</th><th>Nota</th></>}
              <th>Acción</th>
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
                <td>{getSpecificPosition(p)}</td>
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
                <td style={{color: '#10b981', fontWeight: 600}}>{formatMoney(calculatePlayerMarketValue(p))}</td>
                
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
                    <td style={{color: '#e67e22', fontWeight: 'bold'}}>{p.stats?.goals || 0}</td>
                    <td>{p.stats?.assists || 0}</td>
                    <td>{(p.stats?.xG || 0).toFixed(1)}</td>
                    <td style={{color: '#fbbf24', fontWeight: 'bold'}}>{p.stats?.averageRating ? p.stats.averageRating.toFixed(1) : '-'}</td>
                  </>
                )}
                <td>
                  <button
                    onClick={() => navigate(p.teamId ? `/l/${leagueId}/trades?playerId=${p.id}` : `/l/${leagueId}/player/${p.id}`)}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px 8px', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    <ArrowLeftRight size={11} /> {p.teamId ? 'Fichar' : 'Firmar'}
                  </button>
                </td>
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
