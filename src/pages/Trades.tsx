import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League } from '../db/db';
import { DollarSign, ArrowLeftRight, CheckCircle2, XCircle, FileText } from 'lucide-react';

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
  const [step, setStep] = useState<'club_fee' | 'player_contract'>('club_fee');
  const [tradeType, setTradeType] = useState<'transfer' | 'loan'>('transfer');
  const [offerAmount, setOfferAmount] = useState(0);
  const [sellOnPercent, setSellOnPercent] = useState(10);
  const [buyOptionFee, setBuyOptionFee] = useState(0);

  // Step 2 Player contract terms
  const [playerWage, setPlayerWage] = useState(0);
  const [contractYears, setContractYears] = useState(3);
  const [signingBonus, setSigningBonus] = useState(0);

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
    setStep('club_fee');
    setTradeType('transfer');
    setOfferAmount(Math.max(1000000, p.contract * 10));
    setSellOnPercent(10);
    setBuyOptionFee(Math.max(2000000, Math.floor(p.contract * 12)));
    setPlayerWage(p.contract || 2000000);
    setContractYears(3);
    setSigningBonus(Math.round((p.contract || 2000000) * 0.15));
    setAiStatus({ status: 'idle', msg: '' });
  };

  const handleProposeOffer = async () => {
    if (!negotiatingPlayer || !userTeam || !league) return;

    const baseValue = negotiatingPlayer.contract * 8;
    
    let diffMultiplier = 1.1;
    if (league.difficulty === 'Hard') diffMultiplier = 1.35;
    if (league.difficulty === 'Insane') diffMultiplier = 1.6;

    let targetRequired = baseValue * diffMultiplier;
    targetRequired -= (sellOnPercent * 0.01) * baseValue * 0.5;

    if (tradeType === 'transfer') {
      if (offerAmount > userTeam.budget) {
        setAiStatus({ status: 'rejected', msg: '¡Tu presupuesto no es suficiente para cubrir el precio del traspaso!' });
        return;
      }

      if (offerAmount >= targetRequired) {
        // AI Club Accepts! Move to Step 2: Player Contract Negotiation
        setStep('player_contract');
        setAiStatus({ status: 'accepted', msg: `¡Acuerdo alcanzado con el club! Ahora negocia las condiciones personales con ${negotiatingPlayer.name}.` });
      } else if (offerAmount >= targetRequired * 0.8) {
        const counter = Math.round(targetRequired);
        setAiStatus({
          status: 'counter',
          msg: `El club rival rechaza los $${(offerAmount/1000000).toFixed(2)}M pero exige una contraoferta.`,
          counterFee: counter
        });
      } else {
        setAiStatus({ status: 'rejected', msg: `Oferta por el traspaso muy baja. Exigen al menos $${(targetRequired/1000000).toFixed(2)}M.` });
      }
    } else {
      // Loan with buy option
      if (buyOptionFee >= targetRequired * 0.9) {
        setStep('player_contract');
        setAiStatus({ status: 'accepted', msg: `¡Cesión aceptada por el club rival! Procede a negociar el contrato con ${negotiatingPlayer.name}.` });
      } else {
        setAiStatus({ status: 'rejected', msg: 'Opción de compra rechazada. Exigen un valor de opción más alto.' });
      }
    }
  };

  const handleFinalizePlayerContract = async () => {
    if (!negotiatingPlayer || !userTeam || !league) return;

    const askingWage = negotiatingPlayer.contract;
    if (playerWage < askingWage * 0.9) {
      setAiStatus({ status: 'rejected', msg: `${negotiatingPlayer.name} considera insuficiente el salario. Pide al menos $${(askingWage/1000000).toFixed(2)}M/año.` });
      return;
    }

    if (offerAmount + signingBonus > userTeam.budget) {
      setAiStatus({ status: 'rejected', msg: 'Presupuesto total insuficiente para cubrir el traspaso y la prima de fichaje.' });
      return;
    }

    // Transfer execution
    negotiatingPlayer.teamId = userTeam.id!;
    negotiatingPlayer.contract = playerWage;
    negotiatingPlayer.contractYears = contractYears;
    negotiatingPlayer.contractEndSeason = league.season + contractYears;
    negotiatingPlayer.isTransferListed = false;

    if (tradeType === 'loan') {
      negotiatingPlayer.isOnLoan = true;
      negotiatingPlayer.loanedFromTeamId = Number(selectedTeamId);
      negotiatingPlayer.buyOptionFee = buyOptionFee;
    }

    await db.players.put(negotiatingPlayer);

    // Update budget
    userTeam.budget -= (offerAmount + signingBonus);
    await db.teams.put(userTeam);

    // Record Transaction
    await db.transactions.add({
      leagueId: league.id!,
      type: tradeType === 'loan' ? 'loan' : 'transfer',
      playerId: negotiatingPlayer.id!,
      fromTeamId: Number(selectedTeamId),
      toTeamId: userTeam.id!,
      amount: offerAmount,
      season: league.season,
      week: league.currentWeek,
      date: Date.now(),
      sellOnFeePercent: sellOnPercent,
      buyOptionPrice: buyOptionFee
    });

    setAiStatus({ status: 'accepted', msg: `¡Fichaje completado! ${negotiatingPlayer.name} firma con ${userTeam.name} por ${contractYears} años.` });
    setRoster(r => r.filter(x => x.id !== negotiatingPlayer.id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Centro de Traspasos & Negociaciones Avanzadas</h1>
        <p style={{ color: '#94a3b8' }}>Negocia el precio del traspaso con el club rival y posteriormente el contrato personal con el jugador.</p>
      </div>

      {userTeam && (
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <DollarSign color="#10b981" size={20} />
            <span>Presupuesto de Fichajes: <strong>${(userTeam.budget / 1_000_000).toFixed(2)}M</strong></span>
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
                <th>Salario Anual</th>
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

            <h2>{step === 'club_fee' ? 'Paso 1: Negociación con el Club Rival' : 'Paso 2: Contrato Personal del Jugador'}</h2>
            <p className="tm-modal-sub">
              {negotiatingPlayer.name} ({negotiatingPlayer.position}) | OVR {negotiatingPlayer.overall} | Pretensión: ${(negotiatingPlayer.contract / 1_000_000).toFixed(2)}M/año
            </p>

            {step === 'club_fee' ? (
              <>
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
                      <label>Oferta Económica de Traspaso al Club ($):</label>
                      <input
                        type="number"
                        value={offerAmount}
                        onChange={e => setOfferAmount(Number(e.target.value))}
                        className="bb-input"
                      />
                      <p className="form-help">Monto ofrecido al club rival: ${(offerAmount / 1_000_000).toFixed(2)}M</p>
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
                    <p className="form-help">Opción a ejercer al final de temporada: ${(buyOptionFee / 1_000_000).toFixed(2)}M</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Salario Anual Ofrecido ($/año):</label>
                  <input
                    type="number"
                    value={playerWage}
                    onChange={e => setPlayerWage(Number(e.target.value))}
                    className="bb-input"
                  />
                  <p className="form-help">En millones: ${(playerWage / 1_000_000).toFixed(2)}M / año</p>
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Duración del Contrato (Años):</label>
                  <select
                    value={contractYears}
                    onChange={e => setContractYears(Number(e.target.value))}
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
                  <p className="form-help">Pago único en efectivo: ${(signingBonus / 1_000_000).toFixed(2)}M</p>
                </div>
              </>
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
                Cancelar
              </button>
              {step === 'club_fee' ? (
                <button className="tm-btn-primary" onClick={handleProposeOffer}>
                  Acordar con el Club
                </button>
              ) : (
                <button className="tm-btn-primary" onClick={handleFinalizePlayerContract}>
                  Firmar Contrato y Fichar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
