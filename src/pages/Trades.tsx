import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League } from '../db/db';
import { DollarSign, ShieldAlert, ArrowLeftRight, CheckCircle2, XCircle, Star } from 'lucide-react';

export function Trades() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | ''>('');
  const [roster, setRoster] = useState<Player[]>([]);

  const toggleWatch = async (p: Player) => {
    p.isWatched = !p.isWatched;
    await db.players.put(p);
    setRoster([...roster]);
  };
  
  // Negotiation Modal
  const [negotiatingPlayer, setNegotiatingPlayer] = useState<Player | null>(null);
  const [tradeType, setTradeType] = useState<'transfer' | 'loan'>('transfer');
  const [offerAmount, setOfferAmount] = useState(0);
  const [sellOnPercent, setSellOnPercent] = useState(10);
  const [buyOptionFee, setBuyOptionFee] = useState(0);

  const [aiStatus, setAiStatus] = useState<{ status: 'idle' | 'accepted' | 'rejected' | 'counter'; msg: string; counterFee?: number }>({ status: 'idle', msg: '' });

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);

      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      if (l.userTeamId) {
        const uTeam = await db.teams.get(l.userTeamId);
        setUserTeam(uTeam || null);
        setTeams(allTeams.filter(t => t.id !== l.userTeamId));
      } else {
        setTeams(allTeams);
      }
    }
    load();
  }, [leagueId]);

  useEffect(() => {
    async function loadRoster() {
      if(selectedTeamId === '') {
        setRoster([]);
        return;
      }
      const p = await db.players.where('teamId').equals(Number(selectedTeamId)).toArray();
      setRoster(p.sort((a,b) => b.overall - a.overall));
    }
    loadRoster();
  }, [selectedTeamId]);

  const handleOpenNegotiation = (p: Player) => {
    setNegotiatingPlayer(p);
    setTradeType('transfer');
    setOfferAmount(Math.max(1000000, p.contract));
    setSellOnPercent(10);
    setBuyOptionFee(Math.max(2000000, Math.floor(p.contract * 1.3)));
    setAiStatus({ status: 'idle', msg: '' });
  };

  const handleProposeOffer = async () => {
    if (!negotiatingPlayer || !userTeam || !league) return;

    const baseValue = negotiatingPlayer.contract;
    
    // Difficulty modifier
    let diffMultiplier = 1.1;
    if (league.difficulty === 'Hard') diffMultiplier = 1.35;
    if (league.difficulty === 'Insane') diffMultiplier = 1.6;

    let targetRequired = baseValue * diffMultiplier;
    
    // Sell-on bonus offset
    targetRequired -= (sellOnPercent * 0.01) * baseValue * 0.5;

    if (tradeType === 'transfer') {
      if (offerAmount > userTeam.budget) {
        setAiStatus({ status: 'rejected', msg: '¡Tu presupuesto no es suficiente para cubrir esta oferta!' });
        return;
      }

      if (offerAmount >= targetRequired) {
        // AI Accepts!
        negotiatingPlayer.teamId = userTeam.id!;
        await db.players.put(negotiatingPlayer);

        // Update budget
        userTeam.budget -= offerAmount;
        await db.teams.put(userTeam);

        // Record Transaction
        await db.transactions.add({
          leagueId: league.id!,
          type: 'transfer',
          playerId: negotiatingPlayer.id!,
          fromTeamId: Number(selectedTeamId),
          toTeamId: userTeam.id!,
          amount: offerAmount,
          season: league.season,
          week: league.currentWeek,
          date: Date.now(),
          sellOnFeePercent: sellOnPercent
        });

        setAiStatus({ status: 'accepted', msg: `¡Oferta aceptada! ${negotiatingPlayer.name} se une a ${userTeam.name} por $${(offerAmount/1000000).toFixed(2)}M.` });
        setRoster(r => r.filter(x => x.id !== negotiatingPlayer.id));
      } else if (offerAmount >= targetRequired * 0.8) {
        // Counter offer
        const counter = Math.round(targetRequired);
        setAiStatus({
          status: 'counter',
          msg: `El club rival rechaza los $${(offerAmount/1000000).toFixed(2)}M pero enviaron una contraoferta.`,
          counterFee: counter
        });
      } else {
        setAiStatus({ status: 'rejected', msg: `Oferta muy baja. El club considera que ${negotiatingPlayer.name} vale al menos $${(targetRequired/1000000).toFixed(2)}M.` });
      }
    } else {
      // Loan with buy option
      if (buyOptionFee >= targetRequired * 0.9) {
        negotiatingPlayer.teamId = userTeam.id!;
        negotiatingPlayer.isOnLoan = true;
        negotiatingPlayer.loanedFromTeamId = Number(selectedTeamId);
        negotiatingPlayer.buyOptionFee = buyOptionFee;

        await db.players.put(negotiatingPlayer);

        await db.transactions.add({
          leagueId: league.id!,
          type: 'loan',
          playerId: negotiatingPlayer.id!,
          fromTeamId: Number(selectedTeamId),
          toTeamId: userTeam.id!,
          amount: 0,
          season: league.season,
          week: league.currentWeek,
          date: Date.now(),
          buyOptionPrice: buyOptionFee
        });

        setAiStatus({ status: 'accepted', msg: `¡Cesión acordada! ${negotiatingPlayer.name} llega cedido a ${userTeam.name} con opción de compra por $${(buyOptionFee/1000000).toFixed(2)}M.` });
        setRoster(r => r.filter(x => x.id !== negotiatingPlayer.id));
      } else {
        setAiStatus({ status: 'rejected', msg: 'Opción de compra rechazada. Exigen un valor de opción más alto.' });
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Centro de Traspasos & Negociaciones Avanzadas</h1>
        <p style={{ color: '#94a3b8' }}>Negocia traspasos definitivos o cesiones con cláusulas y opciones de compra.</p>
      </div>

      {userTeam && (
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <DollarSign color="#10b981" size={20} />
            <span>Presupuesto Disponible: <strong>${(userTeam.budget / 1_000_000).toFixed(2)}M</strong></span>
          </div>
        </div>
      )}

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <label style={{ marginRight: '1rem', fontWeight: 'bold' }}>Seleccionar Club Rival: </label>
        <select 
          value={selectedTeamId} 
          onChange={e => setSelectedTeamId(e.target.value ? Number(e.target.value) : '')}
          className="bb-select"
          style={{ minWidth: '280px' }}
        >
          <option value="">-- Elige un equipo --</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name} (OVR {t.overall})</option>
          ))}
        </select>
      </div>

      {selectedTeamId !== '' && (
        <div className="standings-content" style={{ overflowX: 'auto' }}>
          <table className="table-container bb-table">
            <thead>
              <tr>
                <th title="Preseleccionar / Seguir">★</th>
                <th>Pos</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>OVR</th>
                <th>POT</th>
                <th>Valor Estimado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {roster.map(p => (
                <tr key={p.id}>
                  <td style={{ textAlign: 'center', cursor: 'pointer', width: '30px' }} onClick={() => toggleWatch(p)}>
                    <span style={{ color: p.isWatched ? '#f59e0b' : '#475569', fontSize: '18px' }}>★</span>
                  </td>
                  <td style={{ fontWeight: 'bold', color: '#38bdf8' }}>{p.position}</td>
                  <td style={{ fontWeight: 'bold' }}>
                    <Link to={`/l/${leagueId}/player/${p.id}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                      {p.name}
                    </Link>
                  </td>
                  <td>{p.age}</td>
                  <td><strong>{p.overall}</strong></td>
                  <td>{p.potential}</td>
                  <td>${(p.contract / 1_000_000).toFixed(2)}M</td>
                  <td>
                    <button className="tm-btn-primary" onClick={() => handleOpenNegotiation(p)} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
                      <ArrowLeftRight size={14} /> Negociar
                    </button>
                  </td>
                </tr>
              ))}
              {roster.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>Sin jugadores disponibles.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Negotiation Modal */}
      {negotiatingPlayer && (
        <div className="tm-modal-overlay">
          <div className="tm-modal glass-panel" style={{ maxWidth: '550px' }}>
            <button className="tm-modal-close" onClick={() => setNegotiatingPlayer(null)}>✕</button>

            <h2>Negociación por {negotiatingPlayer.name}</h2>
            <p className="tm-modal-sub">
              {negotiatingPlayer.position} | OVR {negotiatingPlayer.overall} | Valor Base: ${(negotiatingPlayer.contract / 1_000_000).toFixed(2)}M
            </p>

            <div className="tm-tabs" style={{ marginBottom: '1rem' }}>
              <button
                className={`tm-tab ${tradeType === 'transfer' ? 'active' : ''}`}
                onClick={() => setTradeType('transfer')}
              >
                Traspaso Definitivo
              </button>
              <button
                className={`tm-tab ${tradeType === 'loan' ? 'active' : ''}`}
                onClick={() => setTradeType('loan')}
              >
                Cesión con Opción
              </button>
            </div>

            {tradeType === 'transfer' ? (
              <>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Oferta Económica Base ($):</label>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={e => setOfferAmount(Number(e.target.value))}
                    className="bb-input"
                  />
                  <p className="form-help">En millones: ${(offerAmount / 1_000_000).toFixed(2)}M</p>
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Cláusula de Futura Venta (%):</label>
                  <select
                    value={sellOnPercent}
                    onChange={e => setSellOnPercent(Number(e.target.value))}
                    className="bb-select"
                  >
                    <option value={0}>0%</option>
                    <option value={10}>10%</option>
                    <option value={15}>15%</option>
                    <option value={20}>20%</option>
                  </select>
                </div>
              </>
            ) : (
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Precio Opción de Compra ($):</label>
                <input
                  type="number"
                  value={buyOptionFee}
                  onChange={e => setBuyOptionFee(Number(e.target.value))}
                  className="bb-input"
                />
                <p className="form-help">Precio a pagar al finalizar la temporada: ${(buyOptionFee / 1_000_000).toFixed(2)}M</p>
              </div>
            )}

            {/* AI Status response */}
            {aiStatus.status !== 'idle' && (
              <div style={{
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                background: aiStatus.status === 'accepted' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${aiStatus.status === 'accepted' ? '#10b981' : '#ef4444'}`
              }}>
                {aiStatus.status === 'accepted' ? <CheckCircle2 color="#10b981" /> : <XCircle color="#ef4444" />}
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: '#ffffff' }}>{aiStatus.msg}</p>
                  {aiStatus.counterFee && (
                    <button
                      className="tm-btn-primary"
                      onClick={() => { setOfferAmount(aiStatus.counterFee!); setAiStatus({ status: 'idle', msg: '' }); }}
                      style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}
                    >
                      Aceptar Contraoferta de ${(aiStatus.counterFee / 1_000_000).toFixed(2)}M
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="tm-modal-actions">
              <button className="settings-btn" onClick={() => setNegotiatingPlayer(null)}>
                {aiStatus.status === 'accepted' ? 'Cerrar' : 'Cancelar'}
              </button>
              {aiStatus.status !== 'accepted' && (
                <button className="tm-btn-primary" onClick={handleProposeOffer}>
                  Enviar Oferta
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
