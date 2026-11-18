import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db, type Player, type Team, type League, getSpecificPosition, formatMoney } from '../db/db';
import { calculatePlayerMarketValue, calculateExpectedAnnualWage } from '../engine/valuationEngine';
import { Tag, RefreshCw, AlertOctagon, CheckCircle2, XCircle, FileText, ArrowLeftRight } from 'lucide-react';
import { CustomModal } from '../components/common/CustomModal';
import { PlayerAvatar } from '../components/common/PlayerAvatar';

export function Roster() {
  const { leagueId, teamId } = useParams();
  const navigate = useNavigate();
  const [league, setLeague] = useState<League | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
  const [isUserTeam, setIsUserTeam] = useState(false);
  const [squadFilter, setSquadFilter] = useState<'senior' | 'youth' | 'all'>('senior');
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
  };

  const handleRoleChange = async (p: Player, newRole: Player['squadRole']) => {
    p.squadRole = newRole;
    await db.players.put(p);
    setPlayers([...players]);
  };

  const handleOpenRenew = (p: Player) => {
    setRenewingPlayer(p);
    const expectedWage = calculateExpectedAnnualWage(p, team?.prestige || 75);
    const targetOffer = Math.max(Math.round(p.contract * 1.12), expectedWage);
    setRenewSalary(targetOffer);
    setRenewYears(3);
    setRenewBonus(Math.round(targetOffer * 0.1));
    setRenewStatus({ type: 'idle', msg: '' });
  };

  const handleExecuteRenewal = async () => {
    if (!renewingPlayer || !team || !league) return;

    const expectedWage = calculateExpectedAnnualWage(renewingPlayer, team.prestige || 75);
    const askingSalary = Math.max(Math.round(renewingPlayer.contract * 1.05), Math.round(expectedWage * 0.92));

    if (renewBonus > team.budget) {
      setRenewStatus({ type: 'rejected', msg: 'Presupuesto insuficiente para cubrir la prima de renovación.' });
      return;
    }

    if (renewSalary >= askingSalary * 0.95) {
      renewingPlayer.contract = renewSalary;
      renewingPlayer.contractYears = renewYears;
      renewingPlayer.contractEndSeason = league.season + renewYears;
      renewingPlayer.morale = Math.min(100, (renewingPlayer.morale || 80) + 10);
      renewingPlayer.unhappy = false;
      await db.players.put(renewingPlayer);

      if (renewBonus > 0) {
        team.budget -= renewBonus;
        await db.teams.put(team);
      }

      await db.transactions.add({
        leagueId: league.id!,
        type: 'sign',
        playerId: renewingPlayer.id!,
        fromTeamId: team.id!,
        toTeamId: team.id!,
        amount: renewSalary,
        season: league.season,
        week: league.currentWeek,
        date: Date.now()
      });

      setRenewStatus({ type: 'accepted', msg: `¡Contrato renovado con éxito! ${renewingPlayer.name} extiende por ${renewYears} años a ${formatMoney(renewSalary)}/año.` });
      setPlayers([...players]);
    } else {
      setRenewStatus({ type: 'rejected', msg: `El jugador considera insuficiente el salario ofrecido. Exige al menos ${formatMoney(askingSalary)}/año acorde a su nivel (${renewingPlayer.overall} OVR).` });
    }
  };

  const [terminatingPlayer, setTerminatingPlayer] = useState<Player | null>(null);

  const executeTerminateContract = async () => {
    if (!terminatingPlayer || !team || !league) return;
    const p = terminatingPlayer;
    const severanceFee = Math.round(p.contract * 0.5);

    if (team.budget < severanceFee) {
      alert('Presupuesto insuficiente para abonar la indemnización de rescisión.');
      return;
    }

    p.teamId = null;
    p.lineupStatus = 'reserve';
    p.pitchPosition = undefined;
    await db.players.put(p);

    team.budget -= severanceFee;
    await db.teams.put(team);

    await db.transactions.add({
      leagueId: league.id!,
      type: 'release',
      playerId: p.id!,
      fromTeamId: team.id!,
      amount: severanceFee,
      season: league.season,
      week: league.currentWeek,
      date: Date.now()
    });

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

  const seniorPlayers = players.filter(p => p.lineupStatus !== 'youth');
  const youthPlayers = players.filter(p => p.lineupStatus === 'youth');
  const filteredByTab = squadFilter === 'senior' ? seniorPlayers : squadFilter === 'youth' ? youthPlayers : players;

  const sortedPlayers = [...filteredByTab].sort((a, b) => {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{marginBottom: 0}}>Plantilla Oficial</h1>
          {team && (
            <h3 style={{marginTop: 0, color: '#94a3b8'}}>
              {team.name} • {seniorPlayers.length} Fichas Primer Equipo ({youthPlayers.length} en Filial)
              {team.coach?.name ? ` • DT: ${team.coach.name}` : ''}
            </h3>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[
            { id: 'senior', label: `Primer Equipo (${seniorPlayers.length})` },
            { id: 'youth', label: `Cantera / Filial (${youthPlayers.length})` },
            { id: 'all', label: `Todos (${players.length})` }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSquadFilter(t.id as any)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: squadFilter === t.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                background: squadFilter === t.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)',
                color: squadFilter === t.id ? '#38bdf8' : '#94a3b8',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {team && (
          <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Presupuesto Fichajes:</span>
              <strong style={{ display: 'block', color: '#10b981' }}>{formatMoney(team.budget)}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Masa Salarial Primer Equipo:</span>
              <strong style={{ display: 'block', color: '#38bdf8' }}>{formatMoney(seniorPlayers.reduce((a,b)=>a+b.contract,0))}/año</strong>
            </div>
          </div>
        )}
      </div>

      <div className="glass-panel" style={{marginTop: '1.5rem', overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>★</th>
              <th onClick={() => handleSort('position')} style={{cursor: 'pointer'}}>Pos</th>
              <th onClick={() => handleSort('name')} style={{cursor: 'pointer'}}>Nombre</th>
              <th onClick={() => handleSort('age')} style={{cursor: 'pointer'}}>Edad</th>
              <th onClick={() => handleSort('overall')} style={{cursor: 'pointer'}}>OVR</th>
              <th onClick={() => handleSort('potential')} style={{cursor: 'pointer'}}>POT</th>
              <th>Valor Mercado</th>
              <th onClick={() => handleSort('contract')} style={{cursor: 'pointer'}}>Salario</th>
              <th>Contrato</th>
              <th>Rol / Moral</th>
              <th>Estado</th>
              <th>Acciones</th>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlayerAvatar player={p} size={26} />
                    <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold'}}>
                      {p.name}
                    </Link>
                    {p.isInjured && <span title={`Lesionado: ${p.injuryType || 'Desconocido'} (${p.injuryWeeks} sem)`} style={{marginLeft:'5px', fontSize: '1.1rem'}}>🏥</span>}
                    {p.cards?.suspended && <span title="Suspendido" style={{marginLeft:'5px', fontSize: '1.1rem'}}>🟥</span>}
                    {p.isOnLoan && <span title="Cedido en préstamo" style={{marginLeft:'5px', fontSize: '0.72rem', color: '#fbbf24', fontWeight: 'bold'}}>🔄 Cedido</span>}
                  </div>
                </td>
                <td>{p.age}</td>
                <td><strong>{p.overall}</strong></td>
                <td>{(isUserTeam || p.isScouted) ? p.potential : `${Math.max(50, p.potential - 4)}-${Math.min(99, p.potential + 4)}`}</td>
                <td style={{ color: '#10b981', fontWeight: 600 }}>{formatMoney(calculatePlayerMarketValue(p))}</td>
                <td>{formatMoney(p.contract)}</td>
                <td>
                  <span style={{ color: (p.contractYears || 2) <= 1 ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                    {p.contractYears ? `${p.contractYears} ${p.contractYears === 1 ? 'Año' : 'Años'}` : '2 Años'}
                  </span>
                </td>
                <td>
                  {isUserTeam ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <select
                        value={p.squadRole || (p.overall >= 85 ? 'Estrella' : p.overall >= 79 ? 'Titular' : p.age <= 20 ? 'Promesa' : 'Rotación')}
                        onChange={e => handleRoleChange(p, e.target.value as any)}
                        style={{ background: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px', padding: '2px 4px', fontSize: '0.72rem' }}
                      >
                        <option value="Estrella">⭐ Estrella</option>
                        <option value="Titular">🟢 Titular</option>
                        <option value="Rotación">🔄 Rotación</option>
                        <option value="Promesa">🌱 Promesa</option>
                      </select>
                      <span style={{ fontSize: '0.72rem', color: (p.morale || 80) >= 75 ? '#10b981' : (p.morale || 80) >= 45 ? '#f59e0b' : '#ef4444', fontWeight: 'bold' }}>
                        {p.morale || 80}%
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {p.squadRole || (p.overall >= 85 ? 'Estrella' : 'Titular')} ({p.morale || 80}%)
                    </span>
                  )}
                </td>
                <td>
                  {p.isTransferListed ? (
                    <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 'bold' }}>
                      Transferible
                    </span>
                  ) : (
                    <span style={{ color: '#64748b', fontSize: '0.72rem' }}>En Plantilla</span>
                  )}
                </td>
                <td>
                  {isUserTeam ? (
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
                  ) : (
                    <button
                      onClick={() => navigate(`/l/${leagueId}/trades?playerId=${p.id}`)}
                      style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <ArrowLeftRight size={12} /> Negociar Fichaje
                    </button>
                  )}
                </td>
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
          message={`¿Rescindir el contrato de ${terminatingPlayer.name}? Se abonará una indemnización por despido de ${formatMoney(Math.round(terminatingPlayer.contract * 0.5))} en efectivo.`}
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
