import { useState, useMemo } from 'react';
import { type Player, type Team, db } from '../../db/db';
import { PlayerAvatar } from './PlayerAvatar';
import { Briefcase, AlertTriangle, CheckCircle, ShieldAlert, Award, FileText, X } from 'lucide-react';
import './ContractNegotiationModal.css';

interface ContractNegotiationModalProps {
  player: Player;
  userTeam: Team;
  isOpen: boolean;
  mode?: 'signing' | 'renewal' | 'loan';
  transferFeeAgreed?: number;
  onSuccess: (updatedPlayer: Player, costDetails: { wage: number; bonus: number; fee: number; isLoan: boolean }) => void;
  onClose: () => void;
}

const AGENT_NAMES = [
  'Jorge Mendes', 'Jonathan Barnett', 'Kia Joorabchian', 'Giuliano Bertolucci',
  'Alejandro Camaño', 'Fernando Felicevich', 'Pini Zahavi', 'Wasserman Group'
];

export function ContractNegotiationModal({
  player,
  userTeam,
  isOpen,
  mode = 'renewal',
  transferFeeAgreed = 0,
  onSuccess,
  onClose
}: ContractNegotiationModalProps) {
  if (!isOpen) return null;

  // Expected salary baseline from player's overall rating & market value
  const baseSalary = useMemo(() => {
    if (player.overall >= 90) return 18000000;
    if (player.overall >= 86) return 10000000;
    if (player.overall >= 82) return 5000000;
    if (player.overall >= 78) return 2500000;
    if (player.overall >= 74) return 1200000;
    return 600000;
  }, [player.overall]);

  const [dealType, setDealType] = useState<'permanent' | 'loan'>(mode === 'loan' ? 'loan' : 'permanent');

  // Sliders state
  const [offeredWage, setOfferedWage] = useState<number>(Math.max(player.contract || baseSalary, baseSalary));
  const [signingBonus, setSigningBonus] = useState<number>(Math.round(baseSalary * 0.25));
  const [contractYears, setContractYears] = useState<number>(3);
  const [releaseClause, setReleaseClause] = useState<number>(
    player.releaseClause || (player.overall >= 88 ? 500000000 : player.overall >= 82 ? 150000000 : 50000000)
  );

  // Loan specific state
  const [loanCoveragePct, setLoanCoveragePct] = useState<number>(100);
  const [buyOptionType, setBuyOptionType] = useState<'none' | 'optional' | 'obligation'>('optional');
  const [buyOptionFee, setBuyOptionFee] = useState<number>(Math.round(baseSalary * 5));

  // Agent State
  const agentName = useMemo(() => {
    const idx = (player.id || 7) % AGENT_NAMES.length;
    return AGENT_NAMES[idx];
  }, [player.id]);

  const agentPersonality = useMemo(() => {
    if (player.personality === 'Avaricioso') return 'Codicioso (Exige primas altas)';
    if (player.personality === 'Ambicioso') return 'Exigente (Busca contratos largos y estrellas)';
    if (player.personality === 'Leal') return 'Flexible (Prioriza estabilidad deportiva)';
    return 'Pragmático (Negociador razonable)';
  }, [player.personality]);

  const [patience, setPatience] = useState<number>(100);
  const [agentSpeech, setAgentSpeech] = useState<string>(
    mode === 'loan'
      ? `Buenas tardes. Represento a ${player.name}. Estamos dispuestos a escuchar vuestra propuesta de cesión siempre que las condiciones de minutos y salario sean adecuadas.`
      : `Buenas tardes. Como representante de ${player.name}, esperamos una propuesta a la altura del rendimiento y proyección de mi cliente.`
  );
  const [negotiationStatus, setNegotiationStatus] = useState<'idle' | 'counter' | 'agreed' | 'rejected'>('idle');

  // Financial Fair Play (FFP) Check
  // Rule: Wage Bill should not exceed 70% of club annual turnover/budget
  const currentBudget = userTeam.budget || 50000000;
  const estimatedAnnualTurnover = Math.max(currentBudget * 0.9, 40000000);
  const effectiveAnnualWage = dealType === 'loan' ? Math.round(offeredWage * (loanCoveragePct / 100)) : offeredWage;
  const ffpWageRatio = Math.round((effectiveAnnualWage / estimatedAnnualTurnover) * 100);
  const isFfpBreach = ffpWageRatio > 35; // Warning if single player takes > 35% of total turnover limit

  // Handle Proposal submission
  const handleSubmitOffer = () => {
    if (patience <= 0) return;

    // Wage assessment
    const targetWage = baseSalary * (player.personality === 'Avaricioso' ? 1.15 : 1.0);
    const targetBonus = (baseSalary * 0.25) * (player.personality === 'Avaricioso' ? 1.3 : 1.0);

    const wageRatio = offeredWage / targetWage;
    const bonusRatio = signingBonus / Math.max(1, targetBonus);

    if (dealType === 'loan') {
      if (loanCoveragePct < 50) {
        setPatience(p => Math.max(0, p - 30));
        setNegotiationStatus('rejected');
        setAgentSpeech('Un club de vuestro calibre no puede pedirnos pagar la mayor parte de la ficha. Mínimo 50% de salario.');
        return;
      }
      setNegotiationStatus('agreed');
      setAgentSpeech('¡Aceptado! La cesión satisface los intereses de mi cliente y del club.');
      return;
    }

    if (wageRatio >= 0.95 && bonusRatio >= 0.85) {
      // Complete agreement!
      setNegotiationStatus('agreed');
      setAgentSpeech('¡Excelente! Las condiciones económicas y deportivas satisfacen plenamente a mi representado. ¡Hay trato!');
    } else if (wageRatio >= 0.80) {
      // Counter-offer
      const counterWage = Math.round(targetWage * 0.98);
      const counterBonus = Math.round(targetBonus * 0.95);
      setPatience(p => Math.max(0, p - 20));
      setNegotiationStatus('counter');
      setOfferedWage(counterWage);
      setSigningBonus(counterBonus);
      setAgentSpeech(`Nos parece un poco bajo, pero estamos dispuestos a firmar si subís a ${counterWage.toLocaleString()} € anuales con ${counterBonus.toLocaleString()} € de prima de fichaje.`);
    } else {
      // Heavy rejection
      const newPatience = Math.max(0, patience - 35);
      setPatience(newPatience);
      if (newPatience <= 0) {
        setNegotiationStatus('rejected');
        setAgentSpeech('Esta propuesta es inaceptable y una falta de respeto. Damos por concluidas las negociaciones.');
      } else {
        setNegotiationStatus('counter');
        setAgentSpeech('Mi representado merece mucho más respeto económico. Vuestra oferta está lejísimos de sus pretensiones.');
      }
    }
  };

  const handleFinalizeSigning = async () => {
    try {
      const isLoan = dealType === 'loan';
      const actualWage = isLoan ? Math.round(offeredWage * (loanCoveragePct / 100)) : offeredWage;
      const initialBonus = isLoan ? 0 : signingBonus;
      const totalInitialCost = initialBonus + transferFeeAgreed;

      // Deduct from budget
      const newBudget = Math.max(0, currentBudget - totalInitialCost);
      await db.teams.update(userTeam.id!, { budget: newBudget });

      // Update Player
      const currentYear = 2026;
      const updatedPlayer: Player = {
        ...player,
        teamId: userTeam.id!,
        contract: actualWage,
        contractYears,
        contractEndSeason: currentYear + contractYears,
        releaseClause,
        isOnLoan: isLoan,
        loanedFromTeamId: isLoan ? (player.teamId || undefined) : undefined,
        buyOptionFee: isLoan && buyOptionType !== 'none' ? buyOptionFee : undefined,
        loanBuyObligation: isLoan && buyOptionType === 'obligation',
        morale: Math.min(100, (player.morale || 80) + 12),
        unhappy: false
      };

      await db.players.put(updatedPlayer);

      // Add to transactions log
      await db.transactions.add({
        leagueId: userTeam.leagueId,
        date: Date.now(),
        type: isLoan ? 'loan' : (mode === 'renewal' ? 'contract_renewal' : 'buy'),
        playerName: player.name,
        fromTeamName: player.teamId ? (await db.teams.get(player.teamId))?.name || 'Club anterior' : 'Agente Libre',
        toTeamName: userTeam.name,
        amount: totalInitialCost
      } as any);

      onSuccess(updatedPlayer, {
        wage: actualWage,
        bonus: initialBonus,
        fee: transferFeeAgreed,
        isLoan
      });
      onClose();
    } catch (err) {
      console.error('Error signing player:', err);
    }
  };

  return (
    <div className="contract-modal-backdrop">
      <div className="contract-modal-card">
        {/* Header */}
        <div className="contract-header">
          <h2>
            <Briefcase size={22} color="#38bdf8" />
            Negociación de Contrato: {player.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="contract-header-badge">
              OVR {player.overall} • {player.specificPosition || player.position}
            </span>
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="contract-body">
          {/* Agent Persona Banner */}
          <div className="agent-persona-banner">
            <div className="agent-avatar-circle">
              👔
            </div>
            <div className="agent-meta">
              <div className="agent-name-title">
                <strong>{agentName}</strong>
                <span className="agent-personality-tag">{agentPersonality}</span>
              </div>
              <div className="patience-container">
                <span className="patience-label">Paciencia del agente:</span>
                <div className="patience-bar-track">
                  <div
                    className="patience-bar-fill"
                    style={{
                      width: `${patience}%`,
                      backgroundColor: patience > 60 ? '#10b981' : patience > 30 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.78rem', color: patience > 40 ? '#cbd5e1' : '#f87171', fontWeight: 600 }}>
                  {patience}%
                </span>
              </div>
            </div>
          </div>

          {/* Agent Speech Bubble */}
          <div className="agent-speech-bubble">
            "{agentSpeech}"
          </div>

          {/* FFP Financial Status */}
          {isFfpBreach ? (
            <div className="ffp-warning-box">
              <ShieldAlert size={20} />
              <span>
                <strong>Alerta Fair Play Financiero (FFP):</strong> Este contrato consume una cuota muy elevada ({ffpWageRatio}%) de la masa salarial permitida por la liga.
              </span>
            </div>
          ) : (
            <div className="ffp-safe-box">
              <CheckCircle size={18} />
              <span>
                <strong>Dentro de los límites del FFP:</strong> Presupuesto disponible del club: €{(currentBudget / 1000000).toFixed(1)}M.
              </span>
            </div>
          )}

          {/* Deal Mode Switcher */}
          {mode !== 'renewal' && (
            <div className="mode-tab-bar">
              <button
                className={`mode-tab ${dealType === 'permanent' ? 'active' : ''}`}
                onClick={() => setDealType('permanent')}
              >
                Fichaje Permanente
              </button>
              <button
                className={`mode-tab ${dealType === 'loan' ? 'active' : ''}`}
                onClick={() => setDealType('loan')}
              >
                Cesión (Préstamo con Opción)
              </button>
            </div>
          )}

          {/* Contract Parameters Grid */}
          <div className="negotiation-grid">
            {/* Salario Anual */}
            <div className="param-card">
              <div className="param-label">
                <span>Salario Anual Bruto</span>
                <span>Objetivo agente: €{(baseSalary / 1000000).toFixed(2)}M</span>
              </div>
              <div className="param-value-display">
                €{(offeredWage / 1000000).toFixed(2)}M / año
              </div>
              <input
                type="range"
                className="param-slider"
                min={Math.round(baseSalary * 0.4)}
                max={Math.round(baseSalary * 2.2)}
                step={100000}
                value={offeredWage}
                onChange={e => setOfferedWage(Number(e.target.value))}
                disabled={negotiationStatus === 'agreed' || patience <= 0}
              />
              <span className="param-hint">
                Equivale a aprox. €{Math.round(offeredWage / 52).toLocaleString()} a la semana.
              </span>
            </div>

            {dealType === 'permanent' ? (
              <>
                {/* Prima de Fichaje */}
                <div className="param-card">
                  <div className="param-label">
                    <span>Prima de Fichaje / Renovación</span>
                    <span>Pago único inmediato</span>
                  </div>
                  <div className="param-value-display">
                    €{(signingBonus / 1000000).toFixed(2)}M
                  </div>
                  <input
                    type="range"
                    className="param-slider"
                    min={0}
                    max={Math.round(baseSalary * 1.5)}
                    step={100000}
                    value={signingBonus}
                    onChange={e => setSigningBonus(Number(e.target.value))}
                    disabled={negotiationStatus === 'agreed' || patience <= 0}
                  />
                  <span className="param-hint">
                    Aumentar la prima ayuda a convencer a agentes codiciosos con salarios más contenidos.
                  </span>
                </div>

                {/* Años de Contrato */}
                <div className="param-card">
                  <div className="param-label">
                    <span>Duración del Contrato</span>
                    <span>1 a 5 temporadas</span>
                  </div>
                  <div className="param-value-display">
                    {contractYears} {contractYears === 1 ? 'temporada' : 'temporadas'}
                  </div>
                  <input
                    type="range"
                    className="param-slider"
                    min={1}
                    max={5}
                    step={1}
                    value={contractYears}
                    onChange={e => setContractYears(Number(e.target.value))}
                    disabled={negotiationStatus === 'agreed' || patience <= 0}
                  />
                  <span className="param-hint">Hasta junio de {2026 + contractYears}.</span>
                </div>

                {/* Cláusula de Rescisión */}
                <div className="param-card">
                  <div className="param-label">
                    <span>Cláusula de Rescisión</span>
                    <span>Blindaje ante otros clubes</span>
                  </div>
                  <div className="param-value-display">
                    €{(releaseClause / 1000000).toFixed(0)}M
                  </div>
                  <input
                    type="range"
                    className="param-slider"
                    min={20000000}
                    max={1000000000}
                    step={10000000}
                    value={releaseClause}
                    onChange={e => setReleaseClause(Number(e.target.value))}
                    disabled={negotiationStatus === 'agreed' || patience <= 0}
                  />
                  <span className="param-hint">
                    Una cláusula excesiva puede requerir un salario superior para ser aceptada.
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* Cesión: % Salario cubierto */}
                <div className="param-card">
                  <div className="param-label">
                    <span>Cobertura Salarial de tu Club</span>
                    <span>Porcentaje asumido</span>
                  </div>
                  <div className="param-value-display">
                    {loanCoveragePct}% (€{(effectiveAnnualWage / 1000000).toFixed(2)}M)
                  </div>
                  <input
                    type="range"
                    className="param-slider"
                    min={30}
                    max={100}
                    step={10}
                    value={loanCoveragePct}
                    onChange={e => setLoanCoveragePct(Number(e.target.value))}
                    disabled={negotiationStatus === 'agreed' || patience <= 0}
                  />
                  <span className="param-hint">El resto lo asume el club propietario.</span>
                </div>

                {/* Tipo de Opción de Compra */}
                <div className="param-card">
                  <div className="param-label">
                    <span>Cláusula de Compra al Finalizar</span>
                    <span>Condición de traspaso</span>
                  </div>
                  <select
                    value={buyOptionType}
                    onChange={e => setBuyOptionType(e.target.value as any)}
                    className="bb-select"
                    style={{ marginTop: '0.25rem', padding: '0.5rem', borderRadius: '0.5rem', background: '#0f172a', color: '#fff', border: '1px solid #334155' }}
                    disabled={negotiationStatus === 'agreed' || patience <= 0}
                  >
                    <option value="none">Sin opción de compra (Cesión pura)</option>
                    <option value="optional">Opción de compra voluntaria</option>
                    <option value="obligation">Opción de compra obligatoria</option>
                  </select>
                  {buyOptionType !== 'none' && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Precio acordado de compra: €{(buyOptionFee / 1000000).toFixed(1)}M</span>
                      <input
                        type="range"
                        className="param-slider"
                        min={1000000}
                        max={80000000}
                        step={1000000}
                        value={buyOptionFee}
                        onChange={e => setBuyOptionFee(Number(e.target.value))}
                        disabled={negotiationStatus === 'agreed' || patience <= 0}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="contract-footer">
          <button className="btn-secondary" onClick={onClose}>
            {negotiationStatus === 'agreed' ? 'Cerrar' : 'Cancelar Negociación'}
          </button>

          {negotiationStatus === 'agreed' ? (
            <button className="btn-primary btn-sign" onClick={handleFinalizeSigning}>
              <CheckCircle size={18} /> Firmar Contrato Oficial
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={handleSubmitOffer}
              disabled={patience <= 0}
            >
              <FileText size={18} /> Presentar Oferta Formal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
