import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League, formatMoney, isTransferWindowOpen } from '../db/db';
import { DollarSign, ArrowLeftRight, CheckCircle2, XCircle, FileText, Lock } from 'lucide-react';

export function Trades() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | ''>('');
  const [roster, setRoster] = useState<Player[]>([]);
  const [wageBudget, setWageBudget] = useState(0);
  const [currentWageBill, setCurrentWageBill] = useState(0);
  const [allowOffWindowTransfers, setAllowOffWindowTransfers] = useState(false);

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

  const loadTeamFinancials = async (lid: number, uTeamId: number) => {
    const myPlayers = await db.players.where('teamId').equals(uTeamId).toArray();
    const totalWages = myPlayers.reduce((sum, p) => sum + (p.contract || 0), 0);
    setCurrentWageBill(totalWages);

    const uTeam = await db.teams.get(uTeamId);
    if (uTeam) {
      setUserTeam(uTeam);
      const allowedWage = Math.max(totalWages + 15000000, Math.round(uTeam.budget * 0.4 + totalWages * 1.2));
      setWageBudget(allowedWage);
    }
  };

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);

      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      if (l.userTeamId) {
        await loadTeamFinancials(lid, l.userTeamId);
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

  const windowIsOpen = league ? (isTransferWindowOpen(league.currentWeek) || allowOffWindowTransfers) : false;

  const handleProposeOffer = async () => {
    if (!negotiatingPlayer || !userTeam || !league) return;

    if (!windowIsOpen) {
      setAiStatus({ status: 'rejected', msg: '🔒 El mercado de traspasos está cerrado (Semanas 1-4 Verano / 19-22 Invierno). Activa "Permitir Traspasos Libres" si deseas operar fuera de ventana.' });
      return;
    }

    const sellerTeam = teams.find(t => t.id === negotiatingPlayer.teamId);

    // Player Personality & Ambition check (Task 3 & 12)
    if (sellerTeam && (negotiatingPlayer.personality === 'Ambicioso' || negotiatingPlayer.overall >= 84)) {
      if (userTeam.overall < sellerTeam.overall - 4 && !negotiatingPlayer.isTransferListed) {
        setAiStatus({ status: 'rejected', msg: `¡${negotiatingPlayer.name} es un jugador ambicioso y rechaza negociar con un club de menor estatus!` });
        return;
      }
    }

    if (negotiatingPlayer.personality === 'Leal' && !negotiatingPlayer.isTransferListed && Math.random() < 0.75) {
      setAiStatus({ status: 'rejected', msg: `¡${negotiatingPlayer.name} es leal a su club actual y no desea escuchar ofertas en este momento!` });
      return;
    }

    const baseValue = negotiatingPlayer.contract * 8;
    
    let diffMultiplier = 1.1;
    if (league.difficulty === 'Hard') diffMultiplier = 1.35;
    if (league.difficulty === 'Insane') diffMultiplier = 1.6;

    let targetRequired = baseValue * diffMultiplier;
    targetRequired -= (sellOnPercent * 0.01) * baseValue * 0.5;

    if (tradeType === 'transfer') {
      if (offerAmount > userTeam.budget) {
        setAiStatus({ status: 'rejected', msg: `¡Tu presupuesto de fichajes (${formatMoney(userTeam.budget)}) es insuficiente para cubrir la oferta de ${formatMoney(offerAmount)}!` });
        return;
      }

      if (offerAmount >= targetRequired) {
        setStep('player_contract');
        setAiStatus({ status: 'accepted', msg: `¡Acuerdo alcanzado con el club! Personalidad: ${negotiatingPlayer.personality || 'Pragmático'}. Ahora negocia las condiciones salariales.` });
      } else if (offerAmount >= targetRequired * 0.8) {
        const counter = Math.round(targetRequired);
        setAiStatus({
          status: 'counter',
          msg: `El club rival rechaza los ${formatMoney(offerAmount)} pero exige una contraoferta de ${formatMoney(counter)}.`,
          counterFee: counter
        });
      } else {
        setAiStatus({ status: 'rejected', msg: `Oferta por el traspaso muy baja. Exigen al menos ${formatMoney(targetRequired)}.` });
      }
    } else {
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

    const askingWage = negotiatingPlayer.personality === 'Avaricioso' ? negotiatingPlayer.contract * 1.3 : negotiatingPlayer.contract;
    if (playerWage < askingWage * 0.9) {
      setAiStatus({ status: 'rejected', msg: `${negotiatingPlayer.name} (Personalidad: ${negotiatingPlayer.personality || 'Pragmático'}) considera insuficiente el salario. Exige al menos ${formatMoney(askingWage)}/año.` });
      return;
    }

    if (offerAmount + signingBonus > userTeam.budget) {
      setAiStatus({ status: 'rejected', msg: `Presupuesto de traspaso insuficiente: Necesitas ${formatMoney(offerAmount + signingBonus)} (Traspaso + Prima) pero tienes ${formatMoney(userTeam.budget)} en caja.` });
      return;
    }

    const availableWageMargin = wageBudget - currentWageBill;
    if (playerWage > availableWageMargin) {
      setAiStatus({ status: 'rejected', msg: `Límite salarial excedido: Este contrato (${formatMoney(playerWage)}/año) supera tu margen salarial disponible (${formatMoney(availableWageMargin)}/año).` });
      return;
    }

    // Transfer execution
    const prevTeamId = negotiatingPlayer.teamId;
    negotiatingPlayer.teamId = userTeam.id!;
    negotiatingPlayer.contract = playerWage;
    negotiatingPlayer.contractYears = contractYears;
    negotiatingPlayer.contractEndSeason = league.season + contractYears;
    negotiatingPlayer.isTransferListed = false;
    negotiatingPlayer.lineupStatus = 'reserve';

    if (tradeType === 'loan') {
      negotiatingPlayer.isOnLoan = true;
      negotiatingPlayer.loanedFromTeamId = Number(selectedTeamId);
      negotiatingPlayer.buyOptionFee = buyOptionFee;
    }

    await db.players.put(negotiatingPlayer);

    // Update budget and local states
    const newBudget = userTeam.budget - (offerAmount + signingBonus);
    userTeam.budget = newBudget;
    await db.teams.put(userTeam);
    setUserTeam({ ...userTeam, budget: newBudget });
    setCurrentWageBill(prev => prev + playerWage);

    // Record Transaction
    await db.transactions.add({
      leagueId: league.id!,
      type: tradeType === 'loan' ? 'loan' : 'transfer',
      playerId: negotiatingPlayer.id!,
      fromTeamId: Number(selectedTeamId) || prevTeamId || 0,
      toTeamId: userTeam.id!,
      amount: offerAmount,
      season: league.season,
      week: league.currentWeek,
      date: Date.now(),
      sellOnFeePercent: sellOnPercent,
      buyOptionPrice: buyOptionFee
    });

    setAiStatus({ status: 'accepted', msg: `¡Fichaje completado con éxito! ${negotiatingPlayer.name} se une a la plantilla de ${userTeam.name} por ${contractYears} temporadas.` });
    setRoster(r => r.filter(x => x.id !== negotiatingPlayer.id));
  };

  const wageMargin = wageBudget - currentWageBill;
  const selectedTeam = teams.find(t => t.id === Number(selectedTeamId));

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Centro de Traspasos & Negociaciones Avanzadas</h1>
        <p style={{ color: '#94a3b8' }}>Negocia el precio del traspaso con el club rival y posteriormente el contrato personal con el jugador.</p>
      </div>

      {/* Transfer Window Status Banner */}
      {league && (
        <div style={{
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          background: windowIsOpen
            ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.05))'
            : 'linear-gradient(90deg, rgba(239, 68, 68, 0.15), rgba(185, 28, 28, 0.05))',
          border: `1px solid ${windowIsOpen ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>{windowIsOpen ? '🟢' : '🔒'}</span>
            <div>
              <strong style={{ color: windowIsOpen ? '#34d399' : '#f87171', fontSize: '1.05rem' }}>
                {windowIsOpen ? 'Mercado de Traspasos ABIERTO' : 'Mercado de Traspasos CERRADO'}
              </strong>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
                Semana {league.currentWeek} de 38 • {isTransferWindowOpen(league.currentWeek) ? 'Periodo oficial reglamentario activo' : 'Periodos de mercado: Semanas 1 a 4 (Verano) y 19 a 22 (Invierno)'}
              </div>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <input
              type="checkbox"
              checked={allowOffWindowTransfers}
              onChange={e => setAllowOffWindowTransfers(e.target.checked)}
              style={{ accentColor: '#38bdf8', width: '16px', height: '16px' }}
            />
            <span>Permitir fichajes todo el año (Modo Director Deportivo)</span>
          </label>
        </div>
      )}

      {/* Financial Health KPIs */}
      {userTeam && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid #10b981' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
              💰 Presupuesto de Traspasos (Caja)
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
              ${(userTeam.budget / 1_000_000).toFixed(2)}M
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              Fondos líquidos para pagos de traspasos y primas
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid #38bdf8' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
              📋 Masa Salarial Actual
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>
              ${(currentWageBill / 1_000_000).toFixed(2)}M / año
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              Total comprometido en nóminas de jugadores
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem', borderLeft: `4px solid ${wageMargin >= 0 ? '#fbbf24' : '#ef4444'}` }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
              ⚖️ Margen Salarial Disponible
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: wageMargin >= 0 ? '#fbbf24' : '#ef4444' }}>
              ${(wageMargin / 1_000_000).toFixed(2)}M / año
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              Límite salarial: ${(wageBudget / 1_000_000).toFixed(2)}M
            </div>
          </div>
        </div>
      )}

      <div className="glass-panel" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <label style={{ fontWeight: 'bold' }}>Seleccionar Club Rival: </label>
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

        {selectedTeam && (
          <Link
            to={`/l/${leagueId}/team/${selectedTeam.id}`}
            style={{
              color: '#38bdf8',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🏟️ Ver Plantilla de {selectedTeam.name} ➡️
          </Link>
        )}
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
                <th>Cláusula Rescisión</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {roster.map(p => {
                const clause = p.releaseClause || Math.round(p.contract * 12);
                return (
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
                    <td style={{ color: '#f59e0b', fontWeight: 'bold' }}>${(clause / 1_000_000).toFixed(1)}M</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button className="tm-btn-primary" onClick={() => handleOpenNegotiation(p)} style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
                          <ArrowLeftRight size={14} /> Negociar
                        </button>
                        <button 
                          className="tm-btn-primary" 
                          onClick={() => {
                            setNegotiatingPlayer(p);
                            setTradeType('transfer');
                            setOfferAmount(clause);
                            setPlayerWage(p.contract || 2000000);
                            setContractYears(3);
                            setSigningBonus(Math.round((p.contract || 2000000) * 0.15));
                            setStep('player_contract');
                            setAiStatus({
                              status: 'accepted',
                              msg: `🔥 ¡Cláusula de Rescisión abonada (${formatMoney(clause)})! El club no puede impedir el fichaje. Negocia las condiciones salariales con ${p.name}.`
                            });
                          }} 
                          style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', background: '#dc2626' }}
                        >
                          🔥 Cláusula
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {roster.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem' }}>Sin jugadores disponibles.</td></tr>
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

            {/* Financial Impact Breakdown Card */}
            {userTeam && (
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '0.8rem 1rem',
                marginBottom: '1rem',
                fontSize: '0.82rem'
              }}>
                <div style={{ fontWeight: 'bold', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                  📊 Resumen de Impacto Financiero
                </div>
                {step === 'club_fee' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>Presupuesto de Caja: <strong style={{ color: '#10b981' }}>{formatMoney(userTeam.budget)}</strong></div>
                    <div>Oferta de Traspaso: <strong style={{ color: '#ef4444' }}>-{formatMoney(offerAmount)}</strong></div>
                    <div style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '4px' }}>
                      Caja Estimada Restante: <strong style={{ color: (userTeam.budget - offerAmount) >= 0 ? '#38bdf8' : '#ef4444' }}>
                        {formatMoney(userTeam.budget - offerAmount)}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>Margen Salarial: <strong style={{ color: '#fbbf24' }}>{formatMoney(wageMargin)}/año</strong></div>
                    <div>Salario Propuesto: <strong style={{ color: '#38bdf8' }}>{formatMoney(playerWage)}/año</strong></div>
                    <div>Prima de Fichaje: <strong style={{ color: '#ef4444' }}>-{formatMoney(signingBonus)}</strong></div>
                    <div>Margen Tras Fichaje: <strong style={{ color: (wageMargin - playerWage) >= 0 ? '#10b981' : '#ef4444' }}>
                      {formatMoney(wageMargin - playerWage)}/año
                    </strong></div>
                  </div>
                )}
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
