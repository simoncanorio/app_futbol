import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type League, type Team, formatMoney } from '../db/db';
import { DollarSign, CheckCircle2, XCircle, FileText } from 'lucide-react';

export function FreeAgents() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [freeAgents, setFreeAgents] = useState<Player[]>([]);
  const [teamPlayersCount, setTeamPlayersCount] = useState(0);
  const [teamPayroll, setTeamPayroll] = useState(0);

  // Contract negotiation state
  const [negotiatingPlayer, setNegotiatingPlayer] = useState<Player | null>(null);
  const [offeredWage, setOfferedWage] = useState(0);
  const [offeredYears, setOfferedYears] = useState(3);
  const [signingBonus, setSigningBonus] = useState(0);
  const [statusMsg, setStatusMsg] = useState<{ type: 'accepted' | 'rejected' | 'idle'; msg: string }>({ type: 'idle', msg: '' });

  const MAX_ROSTER = 25;

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);
      
      if(l.userTeamId) {
        const userTeam = await db.teams.get(l.userTeamId);
        setTeam(userTeam || null);
        
        const teamRoster = await db.players.where('teamId').equals(l.userTeamId).toArray();
        setTeamPlayersCount(teamRoster.length);
        const payroll = teamRoster.reduce((sum, p) => sum + p.contract, 0);
        setTeamPayroll(payroll);
      }
      
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const fa = allPlayers.filter(p => !p.teamId).sort((a, b) => b.overall - a.overall);
      setFreeAgents(fa);
    }
    load();
  }, [leagueId]);

  const toggleWatch = async (p: Player) => {
    p.isWatched = !p.isWatched;
    await db.players.put(p);
    setFreeAgents([...freeAgents]);
  };

  const handleOpenNegotiation = (p: Player) => {
    setNegotiatingPlayer(p);
    setOfferedWage(p.contract || Math.max(500000, p.overall * 100000));
    setOfferedYears(3);
    setSigningBonus(Math.round(p.contract * 0.1));
    setStatusMsg({ type: 'idle', msg: '' });
  };

  const handleProposeContract = async () => {
    if (!negotiatingPlayer || !team || !league) return;

    if (teamPlayersCount >= MAX_ROSTER) {
      setStatusMsg({ type: 'rejected', msg: 'Plantilla llena. Tienes 25/25 jugadores.' });
      return;
    }

    const wageBudget = Math.max(60000000, Math.round((team.revenue || 80000000) * 0.7));
    if (teamPayroll + offeredWage > wageBudget + 20000000) {
      setStatusMsg({ type: 'rejected', msg: 'Exceso sobre el presupuesto salarial del club. La directiva bloquea el fichaje.' });
      return;
    }

    if (signingBonus > team.budget) {
      setStatusMsg({ type: 'rejected', msg: 'Presupuesto de fichajes insuficiente para la prima de fichaje.' });
      return;
    }

    const askingWage = negotiatingPlayer.contract;
    if (offeredWage >= askingWage * 0.9) {
      // Accepted!
      negotiatingPlayer.teamId = team.id!;
      negotiatingPlayer.contract = offeredWage;
      negotiatingPlayer.contractYears = offeredYears;
      negotiatingPlayer.contractEndSeason = league.season + offeredYears;
      negotiatingPlayer.lineupStatus = 'reserve';
      await db.players.put(negotiatingPlayer);

      // Deduct signing bonus from budget
      if (signingBonus > 0) {
        team.budget -= signingBonus;
        await db.teams.put(team);
      }

      await db.transactions.add({
        leagueId: league.id!,
        type: 'sign',
        playerId: negotiatingPlayer.id!,
        toTeamId: team.id!,
        amount: signingBonus,
        season: league.season,
        week: league.currentWeek,
        date: Date.now()
      });

      setStatusMsg({ type: 'accepted', msg: `¡${negotiatingPlayer.name} ha aceptado la oferta! Contrato firmado por ${offeredYears} años a $${(offeredWage/1000000).toFixed(2)}M/año.` });
      setFreeAgents(freeAgents.filter(fa => fa.id !== negotiatingPlayer.id));
      setTeamPlayersCount(c => c + 1);
      setTeamPayroll(c => c + offeredWage);
    } else {
      setStatusMsg({ type: 'rejected', msg: `Oferta salarial insuficiente. ${negotiatingPlayer.name} solicita al menos $${(askingWage/1000000).toFixed(2)}M/año.` });
    }
  };

  const wageBudget = Math.max(60000000, Math.round((team?.revenue || 80000000) * 0.7));

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Agentes Libres & Negociación de Contratos</h1>
        <p style={{ color: '#94a3b8' }}>Incorpora jugadores libres acordando salario anual, años de contrato y prima de fichaje.</p>
      </div>

      {/* Financial Overview */}
      <div className="glass-panel" style={{ padding: '1.2rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Cupos de Plantilla:</span>
          <strong style={{ marginLeft: '0.5rem', color: teamPlayersCount >= MAX_ROSTER ? '#ef4444' : '#10b981' }}>{teamPlayersCount} / {MAX_ROSTER}</strong>
        </div>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Masa Salarial Actual:</span>
          <strong style={{ marginLeft: '0.5rem', color: '#38bdf8' }}>${(teamPayroll/1000000).toFixed(2)}M / año</strong>
        </div>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Presupuesto Fichajes:</span>
          <strong style={{ marginLeft: '0.5rem', color: '#10b981' }}>${((team?.budget || 0)/1000000).toFixed(2)}M</strong>
        </div>
      </div>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>★</th>
              <th>Nombre</th>
              <th>Pos</th>
              <th>Edad</th>
              <th>OVR</th>
              <th>POT</th>
              <th>Pretensión Salarial</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {freeAgents.map(p => (
              <tr key={p.id}>
                <td style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => toggleWatch(p)}>
                  <span style={{color: p.isWatched ? '#f59e0b' : '#475569', fontSize: '18px'}}>★</span>
                </td>
                <td style={{fontWeight: 'bold'}}>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#38bdf8', textDecoration: 'none'}}>
                    {p.name}
                  </Link>
                </td>
                <td style={{ color: '#38bdf8', fontWeight: 'bold' }}>{p.position}</td>
                <td>{p.age}</td>
                <td><strong>{p.overall}</strong></td>
                <td>{p.potential}</td>
                <td>${(p.contract / 1000000).toFixed(2)}M / año</td>
                <td>
                  <button className="tm-btn-primary" onClick={() => handleOpenNegotiation(p)} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
                    <FileText size={14} /> Negociar Contrato
                  </button>
                </td>
              </tr>
            ))}
            {freeAgents.length === 0 && (
              <tr><td colSpan={8} style={{textAlign: 'center', padding: '2rem'}}>No hay agentes libres disponibles.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Contract Negotiation Modal */}
      {negotiatingPlayer && (
        <div className="tm-modal-overlay">
          <div className="tm-modal glass-panel" style={{ maxWidth: '550px' }}>
            <button className="tm-modal-close" onClick={() => setNegotiatingPlayer(null)}>✕</button>
            
            <h2>Negociar Contrato con {negotiatingPlayer.name}</h2>
            <p className="tm-modal-sub">
              {negotiatingPlayer.position} | OVR {negotiatingPlayer.overall} | Pretensión: ${(negotiatingPlayer.contract / 1000000).toFixed(2)}M / año
            </p>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Salario Anual Ofrecido ($):</label>
              <input
                type="number"
                value={offeredWage}
                onChange={e => setOfferedWage(Number(e.target.value))}
                className="bb-input"
              />
              <p className="form-help">En millones: ${(offeredWage / 1000000).toFixed(2)}M / año</p>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Duración del Contrato (Años):</label>
              <select
                value={offeredYears}
                onChange={e => setOfferedYears(Number(e.target.value))}
                className="bb-select"
              >
                <option value={1}>1 Año</option>
                <option value={2}>2 Años</option>
                <option value={3}>3 Años</option>
                <option value={4}>4 Años</option>
                <option value={5}>5 Años</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label>Prima de Fichaje al Jugador ($):</label>
              <input
                type="number"
                value={signingBonus}
                onChange={e => setSigningBonus(Number(e.target.value))}
                className="bb-input"
              />
              <p className="form-help">Pago único en efectivo: ${(signingBonus / 1000000).toFixed(2)}M</p>
            </div>

            {statusMsg.type !== 'idle' && (
              <div style={{
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                background: statusMsg.type === 'accepted' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${statusMsg.type === 'accepted' ? '#10b981' : '#ef4444'}`
              }}>
                {statusMsg.type === 'accepted' ? <CheckCircle2 color="#10b981" /> : <XCircle color="#ef4444" />}
                <p style={{ margin: 0, fontWeight: 600, color: '#ffffff' }}>{statusMsg.msg}</p>
              </div>
            )}

            <div className="tm-modal-actions">
              <button className="settings-btn" onClick={() => setNegotiatingPlayer(null)}>
                {statusMsg.type === 'accepted' ? 'Cerrar' : 'Cancelar'}
              </button>
              {statusMsg.type !== 'accepted' && (
                <button className="tm-btn-primary" onClick={handleProposeContract}>
                  Ofrecer Contrato
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
