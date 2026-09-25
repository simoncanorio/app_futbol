import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League, getSpecificPosition } from '../db/db';
import { Tag, RefreshCw, AlertOctagon, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { CustomModal } from '../components/common/CustomModal';

export function Roster() {
  const { leagueId, teamId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
  const [isUserTeam, setIsUserTeam] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player, direction: 'asc' | 'desc' }>({ key: 'overall', direction: 'desc' });

  // Renewal Modal
  const [renewingPlayer, setRenewingPlayer] = useState<Player | null>(null);
  const [renewSalary, setRenewSalary] = useState(0);
  const [renewYears, setRenewYears] = useState(3);
  const [renewBonus, setRenewBonus] = useState(0);
  const [renewStatus, setRenewStatus] = useState<{ type: 'accepted' | 'rejected' | 'idle'; msg: string }>({ type: 'idle', msg: '' });

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(l) {
         setLeague(l);
         const targetTeamId = teamId ? Number(teamId) : l.userTeamId;
         if (targetTeamId) {
           const p = await db.players.where('teamId').equals(targetTeamId).toArray();
           const t = await db.teams.get(targetTeamId);
           setPlayers(p);
           if (t) setTeam(t);
           setIsUserTeam(l.userTeamId === targetTeamId);
         }
      }
    }
    load();
  }, [leagueId, teamId]);

  const toggleWatch = async (p: Player) => {
    p.isWatched = !p.isWatched;
    await db.players.put(p);
    setPlayers([...players]);
  };

  const toggleTransferListed = async (p: Player) => {
    p.isTransferListed = !p.isTransferListed;
    await db.players.put(p);
    setPlayers([...players]);
    alert(p.isTransferListed ? `${p.name} ha sido colocado en la Lista de Traspasos.` : `${p.name} ha sido retirado de la Lista de Traspasos.`);
  };

  const handleOpenRenew = (p: Player) => {
    setRenewingPlayer(p);
    setRenewSalary(Math.round(p.contract * 1.15));
    setRenewYears(3);
    setRenewBonus(Math.round(p.contract * 0.1));
    setRenewStatus({ type: 'idle', msg: '' });
  };

  const handleExecuteRenewal = async () => {
    if (!renewingPlayer || !team || !league) return;

    const askingSalary = renewingPlayer.contract * 1.05;
    if (renewSalary >= askingSalary * 0.95) {
      renewingPlayer.contract = renewSalary;
      renewingPlayer.contractYears = renewYears;
      renewingPlayer.contractEndSeason = league.season + renewYears;
      await db.players.put(renewingPlayer);

      if (renewBonus > 0) {
        team.budget -= renewBonus;
        await db.teams.put(team);
      }

      setRenewStatus({ type: 'accepted', msg: `¡Contrato renovado con éxito! ${renewingPlayer.name} extiende por ${renewYears} años a $${(renewSalary/1000000).toFixed(2)}M/año.` });
      setPlayers([...players]);
    } else {
      setRenewStatus({ type: 'rejected', msg: `El jugador considera insuficiente el salario ofrecido. Exige al menos $${(askingSalary/1000000).toFixed(2)}M/año.` });
    }
  };

  const [terminatingPlayer, setTerminatingPlayer] = useState<Player | null>(null);

  const executeTerminateContract = async () => {
    if (!terminatingPlayer || !team) return;
    const p = terminatingPlayer;
    const severanceFee = Math.round(p.contract * 0.5);

    if (team.budget < severanceFee) {
      setRenewStatus({ type: 'rejected', msg: 'Presupuesto insuficiente para abonar la indemnización de rescisión.' });
      return;
    }

    p.teamId = null;
    p.lineupStatus = 'reserve';
    await db.players.put(p);

    team.budget -= severanceFee;
    await db.teams.put(team);

    setPlayers(players.filter(x => x.id !== p.id));
    setTerminatingPlayer(null);
  };

  const getPosColor = (pos: string) => {
    switch(pos) {
      case 'POR': return '#eab308';
      case 'DEF': return '#3b82f6';
      case 'MED': return '#10b981';
      case 'DEL': return '#ef4444';
      default: return 'white';
    }
  };

  const handleSort = (key: keyof Player) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = [...players].sort((a, b) => {
    let aVal: any = a[sortConfig.key];
    let bVal: any = b[sortConfig.key];
    if (sortConfig.key === 'stats') {
      aVal = (a.stats?.goals || 0) + (a.stats?.assists || 0);
      bVal = (b.stats?.goals || 0) + (b.stats?.assists || 0);
    }
    
    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="page-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{marginBottom: 0}}>Plantilla Oficial</h1>
          {team && <h3 style={{marginTop: 0, color: '#94a3b8'}}>{team.name} ({players.length} Jugadores)</h3>}
        </div>

        {isUserTeam && team && (
          <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Presupuesto Fichajes:</span>
              <strong style={{ display: 'block', color: '#10b981' }}>${(team.budget/1000000).toFixed(2)}M</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Masa Salarial Anual:</span>
              <strong style={{ display: 'block', color: '#38bdf8' }}>${(players.reduce((a,b)=>a+b.contract,0)/1000000).toFixed(2)}M/año</strong>
            </div>
          </div>
        )}
      </div>

      <div className="glass-panel" style={{marginTop: '1.5rem', overflow: 'hidden'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>★</th>
              <th onClick={() => handleSort('position')} style={{cursor: 'pointer'}}>Pos</th>
              <th onClick={() => handleSort('name')} style={{cursor: 'pointer'}}>Nombre</th>
              <th onClick={() => handleSort('age')} style={{cursor: 'pointer'}}>Edad</th>
              <th onClick={() => handleSort('overall')} style={{cursor: 'pointer'}}>OVR</th>
              <th onClick={() => handleSort('potential')} style={{cursor: 'pointer'}}>POT</th>
              <th onClick={() => handleSort('contract')} style={{cursor: 'pointer'}}>Salario Anual</th>
              <th>Contrato</th>
              <th>Lista Traspaso</th>
              {isUserTeam && <th>Acciones de Gestión</th>}
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map(p => (
              <tr key={p.id}>
                <td style={{textAlign: 'center', cursor: 'pointer', width: '30px'}} onClick={() => toggleWatch(p)}>
                  <span style={{color: p.isWatched ? '#f59e0b' : '#475569', fontSize: '18px'}}>★</span>
                </td>
                <td style={{color: getPosColor(p.position), fontWeight: 'bold'}}>[{getSpecificPosition(p)}]</td>
                <td>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold'}}>
                    {p.name}
                  </Link>
                  {p.isInjured && <span title={`Lesionado: ${p.injuryType || 'Desconocido'} (${p.injuryWeeks} sem)`} style={{marginLeft:'5px', fontSize: '1.1rem'}}>🏥</span>}
                  {p.cards?.suspended && <span title="Suspendido (Roja)" style={{marginLeft:'5px', fontSize: '1.1rem'}}>🟥</span>}
                </td>
                <td>{p.age}</td>
                <td><strong>{p.overall}</strong></td>
                <td>{p.potential}</td>
                <td>${(p.contract / 1000000).toFixed(2)}M</td>
                <td>
                  <span style={{ color: (p.contractYears || 2) <= 1 ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                    {p.contractYears ? `${p.contractYears} ${p.contractYears === 1 ? 'Año' : 'Años'}` : '2 Años'}
                  </span>
                </td>
                <td>
                  {p.isTransferListed ? (
                    <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Transferible
                    </span>
                  ) : (
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>No Transferible</span>
                  )}
                </td>
                {isUserTeam && (
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => toggleTransferListed(p)}
                        style={{
                          background: p.isTransferListed ? '#dc2626' : 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Tag size={12} /> {p.isTransferListed ? 'Quitar Lista' : 'Transferible'}
                      </button>
                      <button
                        onClick={() => handleOpenRenew(p)}
                        style={{ background: '#3b82f6', color: '#ffffff', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        <RefreshCw size={12} /> Renovar
                      </button>
                      <button
                        onClick={() => setTerminatingPlayer(p)}
                        style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '3px 6px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                        title="Rescindir contrato pagando indemnización"
                      >
                        Rescindir
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contract Termination Confirmation Modal */}
      {terminatingPlayer && (
        <CustomModal
          isOpen={true}
          title="Rescisión de Contrato"
          message={`¿Rescindir el contrato de ${terminatingPlayer.name}? Se abonará una indemnización de indemnización de $${((terminatingPlayer.contract * 0.5) / 1000000).toFixed(2)}M en efectivo.`}
          confirmText="Sí, Rescindir Contrato"
          cancelText="Cancelar"
          type="danger"
          onConfirm={executeTerminateContract}
          onCancel={() => setTerminatingPlayer(null)}
        />
      )}

      {/* Renewal Modal */}
      {renewingPlayer && (
        <div className="tm-modal-overlay">
          <div className="tm-modal glass-panel" style={{ maxWidth: '520px' }}>
            <button className="tm-modal-close" onClick={() => setRenewingPlayer(null)}>✕</button>

            <h2>Renovar Contrato de {renewingPlayer.name}</h2>
            <p className="tm-modal-sub">
              {renewingPlayer.position} | OVR {renewingPlayer.overall} | Contrato Actual: ${(renewingPlayer.contract/1000000).toFixed(2)}M/año ({renewingPlayer.contractYears || 2} años restantes)
            </p>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Nuevo Salario Anual Ofrecido ($/año):</label>
              <input
                type="number"
                value={renewSalary}
                onChange={e => setRenewSalary(Number(e.target.value))}
                className="bb-input"
              />
              <p className="form-help">En millones: ${(renewSalary / 1000000).toFixed(2)}M / año</p>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Años de Extensión de Contrato:</label>
              <select
                value={renewYears}
                onChange={e => setRenewYears(Number(e.target.value))}
                className="bb-select"
              >
                <option value={2}>2 Años</option>
                <option value={3}>3 Años</option>
                <option value={4}>4 Años</option>
                <option value={5}>5 Años</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label>Prima de Renovación al Jugador ($):</label>
              <input
                type="number"
                value={renewBonus}
                onChange={e => setRenewBonus(Number(e.target.value))}
                className="bb-input"
              />
              <p className="form-help">Bono de fidelidad en efectivo: ${(renewBonus / 1000000).toFixed(2)}M</p>
            </div>

            {renewStatus.type !== 'idle' && (
              <div style={{
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                background: renewStatus.type === 'accepted' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${renewStatus.type === 'accepted' ? '#10b981' : '#ef4444'}`
              }}>
                {renewStatus.type === 'accepted' ? <CheckCircle2 color="#10b981" /> : <XCircle color="#ef4444" />}
                <p style={{ margin: 0, fontWeight: 600, color: '#ffffff' }}>{renewStatus.msg}</p>
              </div>
            )}

            <div className="tm-modal-actions">
              <button className="settings-btn" onClick={() => setRenewingPlayer(null)}>
                {renewStatus.type === 'accepted' ? 'Cerrar' : 'Cancelar'}
              </button>
              {renewStatus.type !== 'accepted' && (
                <button className="tm-btn-primary" onClick={handleExecuteRenewal}>
                  Firmar Renovación
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
