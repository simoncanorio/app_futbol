import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type League, type Team, getInitialPlayerStats } from '../db/db';
import { FileText, CheckCircle2, XCircle } from 'lucide-react';

export function Draft() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [prospects, setProspects] = useState<Player[]>([]);

  // Contract negotiation state
  const [negotiatingPlayer, setNegotiatingPlayer] = useState<Player | null>(null);
  const [offeredWage, setOfferedWage] = useState(120000);
  const [offeredYears, setOfferedYears] = useState(3);
  const [signingBonus, setSigningBonus] = useState(20000);
  const [statusMsg, setStatusMsg] = useState<{ type: 'accepted' | 'rejected' | 'idle'; msg: string }>({ type: 'idle', msg: '' });

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);
      
      if(l.userTeamId) {
        const userTeam = await db.teams.get(l.userTeamId);
        setTeam(userTeam || null);
      }
      
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      let draftProspects = allPlayers.filter(p => p.isDraftProspect && p.draftYear === l.season);
      
      if (draftProspects.length === 0) {
        draftProspects = await generateProspects(lid, l.season);
      }
      
      setProspects(draftProspects.sort((a, b) => b.potential - a.potential));
    }
    load();
  }, [leagueId]);

  const generateProspects = async (lid: number, year: number): Promise<Player[]> => {
    const firstNames = ['Carlos', 'Miguel', 'David', 'Jorge', 'Luis', 'Juan', 'Diego', 'Jose', 'Manuel', 'Pablo'];
    const lastNames = ['García', 'Martínez', 'López', 'González', 'Pérez', 'Rodríguez', 'Sánchez', 'Ramírez', 'Cruz', 'Flores'];
    const positions: ('POR' | 'DEF' | 'MED' | 'DEL')[] = ['POR', 'DEF', 'DEF', 'MED', 'MED', 'DEL'];
    
    const newProspects: Player[] = [];
    for(let i=0; i<20; i++) {
      const pot = 60 + Math.floor(Math.random() * 35);
      const p: Player = {
        leagueId: lid,
        teamId: null,
        name: `${firstNames[Math.floor(Math.random()*firstNames.length)]} ${lastNames[Math.floor(Math.random()*lastNames.length)]}`,
        age: 16 + Math.floor(Math.random() * 3),
        overall: 35 + Math.floor(Math.random() * 20),
        potential: pot,
        position: positions[Math.floor(Math.random()*positions.length)],
        contract: 80000 + Math.floor(pot * 1500),
        contractYears: 3,
        contractEndSeason: year + 3,
        stats: getInitialPlayerStats(),
        isDraftProspect: true,
        draftYear: year
      };
      newProspects.push(p);
    }
    
    await db.players.bulkAdd(newProspects);
    const all = await db.players.where('leagueId').equals(lid).toArray();
    return all.filter(p => p.isDraftProspect && p.draftYear === year);
  };

  const handleOpenNegotiation = (p: Player) => {
    setNegotiatingPlayer(p);
    setOfferedWage(p.contract || 100000);
    setOfferedYears(3);
    setSigningBonus(30000);
    setStatusMsg({ type: 'idle', msg: '' });
  };

  const handleProposeContract = async () => {
    if (!negotiatingPlayer || !team || !league) return;

    if (signingBonus > team.budget) {
      setStatusMsg({ type: 'rejected', msg: 'Presupuesto del club insuficiente para cubrir la prima de incorporación.' });
      return;
    }

    const asking = negotiatingPlayer.contract;
    if (offeredWage >= asking * 0.85) {
      // Contract agreed!
      negotiatingPlayer.teamId = team.id!;
      negotiatingPlayer.isDraftProspect = false;
      negotiatingPlayer.lineupStatus = 'youth';
      negotiatingPlayer.contract = offeredWage;
      negotiatingPlayer.contractYears = offeredYears;
      negotiatingPlayer.contractEndSeason = league.season + offeredYears;
      negotiatingPlayer.recruitedYear = league.season;
      await db.players.put(negotiatingPlayer);

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

      setStatusMsg({ type: 'accepted', msg: `¡${negotiatingPlayer.name} ha firmado su primer contrato profesional! Unce a tu Filial por ${offeredYears} años.` });
      setProspects(prospects.filter(pr => pr.id !== negotiatingPlayer.id));
    } else {
      setStatusMsg({ type: 'rejected', msg: `El joven canterano considera insuficiente la oferta salarial. Pide al menos $${(asking/1000).toFixed(0)}k/año.` });
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Canteranos (Promesas Libres)</h1>
        <p style={{color: '#94a3b8'}}>
          Año de reclutamiento: {league?.season}. Explora los jóvenes talentos y negocia un contrato juvenil para incorporarlos a tu Filial.
        </p>
      </div>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>#</th>
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
            {prospects.map((p, index) => (
              <tr key={p.id}>
                <td style={{color: '#888'}}>{index + 1}</td>
                <td style={{fontWeight: 'bold'}}>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#f59e0b', textDecoration: 'none'}}>
                    {p.name}
                  </Link>
                </td>
                <td style={{ color: '#38bdf8', fontWeight: 'bold' }}>{p.position}</td>
                <td>{p.age}</td>
                <td>{p.overall}</td>
                <td><strong>{p.potential}</strong></td>
                <td>${(p.contract / 1000).toFixed(0)}k / año</td>
                <td>
                  <button className="tm-btn-primary" onClick={() => handleOpenNegotiation(p)} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: '#f59e0b' }}>
                    <FileText size={14} /> Negociar Contrato
                  </button>
                </td>
              </tr>
            ))}
            {prospects.length === 0 && (
              <tr><td colSpan={8} style={{textAlign: 'center', padding: '2rem'}}>No hay candidatos disponibles este año.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Youth Contract Negotiation Modal */}
      {negotiatingPlayer && (
        <div className="tm-modal-overlay">
          <div className="tm-modal glass-panel" style={{ maxWidth: '550px' }}>
            <button className="tm-modal-close" onClick={() => setNegotiatingPlayer(null)}>✕</button>

            <h2>Negociación de Contrato Canterano</h2>
            <p className="tm-modal-sub">
              {negotiatingPlayer.name} ({negotiatingPlayer.position}) | POT {negotiatingPlayer.potential} | Pretensión: ${(negotiatingPlayer.contract / 1000).toFixed(0)}k / año
            </p>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Salario Juvenil Ofrecido ($/año):</label>
              <input
                type="number"
                value={offeredWage}
                onChange={e => setOfferedWage(Number(e.target.value))}
                className="bb-input"
              />
              <p className="form-help">En miles: ${(offeredWage / 1000).toFixed(0)}k / año</p>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Duración del Contrato (Años):</label>
              <select
                value={offeredYears}
                onChange={e => setOfferedYears(Number(e.target.value))}
                className="bb-select"
              >
                <option value={2}>2 Años</option>
                <option value={3}>3 Años</option>
                <option value={4}>4 Años</option>
                <option value={5}>5 Años</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label>Prima de Firma / Formación ($):</label>
              <input
                type="number"
                value={signingBonus}
                onChange={e => setSigningBonus(Number(e.target.value))}
                className="bb-input"
              />
              <p className="form-help">Pago único de incorporación: ${(signingBonus / 1000).toFixed(0)}k</p>
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
                <button className="tm-btn-primary" onClick={handleProposeContract} style={{ background: '#f59e0b' }}>
                  Firmar Canterano
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
