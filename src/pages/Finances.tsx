import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team, type Player, formatMoney } from '../db/db';
import { DollarSign, ShieldCheck, Award, HelpCircle, TrendingUp, TrendingDown, PieChart, Building } from 'lucide-react';

export function Finances() {
  const { leagueId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);
  
  const [scouting, setScouting] = useState(50);
  const [coaching, setCoaching] = useState(50);
  const [health, setHealth] = useState(50);
  const [facilities, setFacilities] = useState(50);
  const [ticketPrice, setTicketPrice] = useState(50);

  const [sponsorTab, setSponsorTab] = useState<'shirt' | 'sleeve' | 'stadium' | 'digital'>('shirt');

  const shirtSponsors = [
    { name: 'Fly Emirates Global', payout: 38000000, bonus: 3000000, color: '#ef4444', desc: 'Patrocinador oficial de aviación de élite.' },
    { name: 'Spotify Music', payout: 35000000, bonus: 2800000, color: '#10b981', desc: 'Sponsor tecnológico y cultural de camisetas.' },
    { name: 'Qatar Airways', payout: 40000000, bonus: 3500000, color: '#8b5cf6', desc: 'Contrato multimillonario internacional.' },
    { name: 'Adidas Global Football', payout: 42000000, bonus: 4000000, color: '#38bdf8', desc: 'Patrocinio técnico y marca deportiva global.' },
    { name: 'Nike Elite Sports', payout: 45000000, bonus: 4500000, color: '#f59e0b', desc: 'Acuerdo de patrocinio número 1 del mundo.' },
    { name: 'Red Bull Energy', payout: 32000000, bonus: 2800000, color: '#ec4899', desc: 'Impulso joven de rendimiento y marketing.' },
    { name: 'Etihad Airways', payout: 37000000, bonus: 3200000, color: '#06b6d4', desc: 'Patrocinio premium con prima por trofeo.' },
    { name: 'TeamViewer Digital', payout: 28000000, bonus: 2000000, color: '#6366f1', desc: 'Sponsor de innovación tecnológica.' }
  ];

  const sleeveSponsors = [
    { name: 'Snapdragon Qualcomm', payout: 20000000, bonus: 1800000, color: '#f97316', desc: 'Potencia tecnológica en la manga de juego.' },
    { name: 'Visit Rwanda Tourism', payout: 18000000, bonus: 1500000, color: '#14b8a6', desc: 'Promoción turística y visibilidad global.' },
    { name: 'Hyundai Mobility', payout: 16000000, bonus: 1200000, color: '#0284c7', desc: 'Automoción y movilidad internacional.' },
    { name: 'Bitget Crypto Exchange', payout: 17000000, bonus: 1600000, color: '#06b6d4', desc: 'Fintech e innovación en divisas digitales.' },
    { name: 'Pirelli Motorsport', payout: 15000000, bonus: 1000000, color: '#eab308', desc: 'Firma mítica del automovilismo y rendimiento.' },
    { name: 'OKX Web3 Wallet', payout: 19000000, bonus: 1700000, color: '#64748b', desc: 'Plataforma líder en el ecosistema digital.' }
  ];

  const stadiumSponsors = [
    { name: 'Allianz Arena Partner', payout: 28000000, bonus: 2500000, color: '#2563eb', desc: 'Naming rights oficiales del estadio del club.' },
    { name: 'Civitas Metropolitan', payout: 25000000, bonus: 2000000, color: '#dc2626', desc: 'Desarrollo urbanístico e instalaciones.' },
    { name: 'Spotify Music Stadium', payout: 27000000, bonus: 2400000, color: '#10b981', desc: 'Naming rights con conciertos y eventos exclusivos.' },
    { name: 'Emirates Park Ground', payout: 29000000, bonus: 2600000, color: '#b91c1c', desc: 'Presencia internacional en la sede del equipo.' },
    { name: 'Mercedes-Benz Dome', payout: 30000000, bonus: 3000000, color: '#94a3b8', desc: 'Máximo estándar arquitectónico de marca automotriz.' }
  ];

  const digitalSponsors = [
    { name: 'EA SPORTS FC Partner', payout: 18000000, bonus: 1500000, color: '#22c55e', desc: 'Socio oficial de videojuegos de fútbol.' },
    { name: 'Sony PlayStation Gaming', payout: 19000000, bonus: 1600000, color: '#3b82f6', desc: 'Entretenimiento interactivo en tribunas y redes.' },
    { name: 'Google Pixel AI', payout: 17000000, bonus: 1400000, color: '#ea4335', desc: 'Innovación en análisis de datos y cámara del club.' },
    { name: 'Paramount+ Streaming', payout: 16000000, bonus: 1200000, color: '#0ea5e9', desc: 'Transmisión de documentales y contenido exclusivo.' }
  ];

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if (!l) return;
      
      if (l.userTeamId) {
        const userTeam = await db.teams.get(l.userTeamId);
        if (userTeam) {
          setTeam(userTeam);
          setScouting(Math.min(100, userTeam.scoutingExpense || 50));
          setCoaching(Math.min(100, userTeam.coachingExpense || 50));
          setHealth(Math.min(100, userTeam.healthExpense || 50));
          setFacilities(Math.min(100, userTeam.facilitiesExpense || 50));
          setTicketPrice(userTeam.ticketPrice || 50);

          const players = await db.players.where('teamId').equals(userTeam.id!).toArray();
          setTeamPlayers(players);
        }
      }
    }
    load();
  }, [leagueId]);

  const saveFinances = async () => {
    if (team) {
      team.scoutingExpense = scouting;
      team.coachingExpense = coaching;
      team.healthExpense = health;
      team.facilitiesExpense = facilities;
      team.ticketPrice = ticketPrice;
      await db.teams.put(team);
      alert('¡Ajustes de instalaciones y precio de entradas guardados con éxito!');
    }
  };

  const handleSelectSponsor = async (slot: 'shirt' | 'sleeve' | 'stadium' | 'digital', s: { name: string; payout: number; bonus: number }) => {
    if (!team) return;
    const sponsorObj = {
      name: s.name,
      payoutPerSeason: s.payout,
      bonusPerWin: s.bonus
    };

    if (slot === 'shirt') team.mainSponsor = sponsorObj;
    else if (slot === 'sleeve') team.sleeveSponsor = sponsorObj;
    else if (slot === 'stadium') team.stadiumSponsor = sponsorObj;
    else if (slot === 'digital') team.digitalSponsor = sponsorObj;

    team.budget += s.payout;
    await db.teams.put(team);
    setTeam({ ...team });
    alert(`¡Acuerdo firmado con ${s.name}! Se han transferido ${formatMoney(s.payout)} directamente al presupuesto del club.`);
  };

  const handleUpgradeFacility = async (type: 'stadium' | 'youth' | 'training' | 'medical') => {
    if (!team) return;
    const currentFacilities = team.facilities || { stadiumLevel: 1, youthLevel: 1, trainingLevel: 1 };
    let currentLevel = 1;
    let cost = 10000000;
    let title = '';

    if (type === 'stadium') {
      currentLevel = currentFacilities.stadiumLevel || 1;
      cost = currentLevel * 15000000;
      title = 'Estadio';
    } else if (type === 'youth') {
      currentLevel = currentFacilities.youthLevel || 1;
      cost = currentLevel * 8000000;
      title = 'Academia de Cantera';
    } else if (type === 'training') {
      currentLevel = currentFacilities.trainingLevel || 1;
      cost = currentLevel * 8000000;
      title = 'Centro de Entrenamiento';
    } else if (type === 'medical') {
      currentLevel = Math.min(5, Math.floor((team.healthExpense || 50) / 20) + 1);
      cost = currentLevel * 6000000;
      title = 'Servicios Médicos';
    }

    if (currentLevel >= 5) {
      alert(`¡${title} ya ha alcanzado el nivel máximo (Nivel 5)!`);
      return;
    }

    if (team.budget < cost) {
      alert(`Presupuesto insuficiente. Necesitas ${formatMoney(cost)} para mejorar ${title}.`);
      return;
    }

    team.budget -= cost;
    if (!team.facilities) team.facilities = { stadiumLevel: 1, youthLevel: 1, trainingLevel: 1 };

    if (type === 'stadium') {
      team.facilities.stadiumLevel = currentLevel + 1;
      team.attendance = (team.attendance || 45000) + 10000;
      team.population = (team.population || 500000) + 100000;
      team.prestige = Math.min(100, (team.prestige || 70) + 2);
    } else if (type === 'youth') {
      team.facilities.youthLevel = currentLevel + 1;
      team.scoutingExpense = Math.min(100, (team.scoutingExpense || 50) + 10);
    } else if (type === 'training') {
      team.facilities.trainingLevel = currentLevel + 1;
      team.coachingExpense = Math.min(100, (team.coachingExpense || 50) + 10);
    } else if (type === 'medical') {
      team.healthExpense = Math.min(100, (team.healthExpense || 50) + 15);
    }

    await db.teams.put(team);
    setTeam({ ...team });
    alert(`¡Mejora completada! ${title} ascendió a Nivel ${currentLevel + 1}.`);
  };

  const formatMoney = (val: number) => {
    if (val >= 1000000 || val <= -1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000 || val <= -1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  // Calculations
  const totalPayrollAnnual = teamPlayers.reduce((sum, p) => sum + p.contract, 0);
  const weeklyFacilitiesCost = (scouting + coaching + health + facilities) * 12000;
  const annualFacilitiesCost = weeklyFacilitiesCost * 52;
  const annualStadiumMaintenance = Math.round((facilities / 100) * 12000000 + 4000000);
  const annualStaffAndMedical = Math.round(((coaching + health) / 200) * 15000000 + 3000000);
  const annualScoutingCost = Math.round((scouting / 100) * 8000000 + 2000000);
  const annualTaxesAndOps = Math.round((totalPayrollAnnual + annualFacilitiesCost) * 0.12);

  const totalAnnualLosses = totalPayrollAnnual + annualFacilitiesCost + annualStadiumMaintenance + annualStaffAndMedical + annualScoutingCost + annualTaxesAndOps;

  // Incomes (All 4 commercial sponsorship slots combined)
  const sponsorIncome = 
    (team?.mainSponsor ? team.mainSponsor.payoutPerSeason : 0) +
    (team?.sleeveSponsor ? team.sleeveSponsor.payoutPerSeason : 0) +
    (team?.stadiumSponsor ? team.stadiumSponsor.payoutPerSeason : 0) +
    (team?.digitalSponsor ? team.digitalSponsor.payoutPerSeason : 0);

  const estimatedMatchDayIncome = team ? Math.round(team.attendance * ticketPrice * 19) : 0;
  const tvRightsIncome = Math.round(45000000 + (team?.overall || 80) * 800000);
  const merchIncome = Math.round(15000000 + (team?.overall || 80) * 400000);
  const totalAnnualIncomes = sponsorIncome + estimatedMatchDayIncome + tvRightsIncome + merchIncome;

  const netProfit = totalAnnualIncomes - totalAnnualLosses;

  // Wage budget limit = 70% of estimated annual revenue or $120M
  const wageBudget = Math.max(60000000, Math.round(totalAnnualIncomes * 0.7));
  const wageUsagePct = Math.min(100, Math.round((totalPayrollAnnual / wageBudget) * 100));

  // Stacked Bar Percentages for Expenses
  const expPayrollPct = Math.round((totalPayrollAnnual / totalAnnualLosses) * 100);
  const expFacilitiesPct = Math.round((annualFacilitiesCost / totalAnnualLosses) * 100);
  const expStadiumPct = Math.round((annualStadiumMaintenance / totalAnnualLosses) * 100);
  const expStaffPct = Math.round((annualStaffAndMedical / totalAnnualLosses) * 100);
  const expScoutPct = Math.round((annualScoutingCost / totalAnnualLosses) * 100);
  const expTaxPct = Math.max(1, 100 - (expPayrollPct + expFacilitiesPct + expStadiumPct + expStaffPct + expScoutPct));

  // Stacked Bar Percentages for Incomes
  const incSponsorPct = Math.round((sponsorIncome / totalAnnualIncomes) * 100) || 20;
  const incMatchPct = Math.round((estimatedMatchDayIncome / totalAnnualIncomes) * 100) || 30;
  const incTvPct = Math.round((tvRightsIncome / totalAnnualIncomes) * 100) || 35;
  const incMerchPct = Math.max(1, 100 - (incSponsorPct + incMatchPct + incTvPct));

  // Active sponsor for the selected tab
  const currentSlotSponsor = 
    sponsorTab === 'shirt' ? team?.mainSponsor :
    sponsorTab === 'sleeve' ? team?.sleeveSponsor :
    sponsorTab === 'stadium' ? team?.stadiumSponsor : team?.digitalSponsor;

  const currentTabList = 
    sponsorTab === 'shirt' ? shirtSponsors :
    sponsorTab === 'sleeve' ? sleeveSponsors :
    sponsorTab === 'stadium' ? stadiumSponsors : digitalSponsors;

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="page-header" style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.2)', paddingBottom: '1rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#f8fafc' }}>
          <Building color="#10b981" size={28} /> Finanzas del Club & Patrocinios Múltiples
        </h1>
        <p style={{ color: '#94a3b8' }}>Balance financiero completo, acuerdos de patrocinio en 4 categorías comerciales y gestión de instalaciones.</p>
      </div>

      {/* Wage Budget & Multi-Sponsor Header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', margin: '0 0 0.5rem 0' }}>
            <ShieldCheck size={20} color="#10b981" /> Control de Fair Play Financiero (Límite Salarial)
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Masa salarial de la plantilla vs límite reglamentario (70% de ingresos totales).</p>
          
          <div style={{ marginTop: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem', color: '#e2e8f0' }}>
              <span>Masa Salarial: <strong style={{ color: '#38bdf8' }}>{formatMoney(totalPayrollAnnual)}/año</strong></span>
              <span>Límite Permitido: <strong style={{ color: '#10b981' }}>{formatMoney(wageBudget)}/año</strong></span>
            </div>
            <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.08)', borderRadius: '7px', overflow: 'hidden' }}>
              <div style={{ width: `${wageUsagePct}%`, height: '100%', background: wageUsagePct > 90 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #059669, #10b981)', transition: 'width 0.4s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              <span>Uso del presupuesto salarial: <strong>{wageUsagePct}%</strong></span>
              <span>{wageUsagePct <= 90 ? '✅ Fair Play Cumplido' : wageUsagePct <= 100 ? '⚠️ Al límite del tope' : '🚨 Infracción de Fair Play'}</span>
            </div>
          </div>
        </div>

        {/* Multi-Sponsor Management Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(251, 191, 36, 0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', margin: 0 }}>
              <Award size={20} color="#fbbf24" /> Gestión de Patrocinios del Club
            </h3>
            <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '3px 8px', borderRadius: '6px' }}>
              Total: {formatMoney(sponsorIncome)}/año
            </span>
          </div>

          {/* Sponsor Slot Tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[
              { id: 'shirt', label: '👕 Camiseta', active: !!team?.mainSponsor },
              { id: 'sleeve', label: '🦾 Manga', active: !!team?.sleeveSponsor },
              { id: 'stadium', label: '🏟️ Estadio', active: !!team?.stadiumSponsor },
              { id: 'digital', label: '💻 Digital', active: !!team?.digitalSponsor }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSponsorTab(tab.id as any)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: sponsorTab === tab.id ? '1px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)',
                  background: sponsorTab === tab.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255,255,255,0.04)',
                  color: sponsorTab === tab.id ? '#fbbf24' : '#94a3b8'
                }}
              >
                {tab.label} {tab.active ? '✔' : ''}
              </button>
            ))}
          </div>

          {/* Currently Signed Sponsor in this slot */}
          {currentSlotSponsor && (
            <div style={{
              background: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '8px',
              padding: '0.8rem 1rem',
              marginBottom: '0.8rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Contrato Activo
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>
                  +{formatMoney(currentSlotSponsor.payoutPerSeason)}/año
                </span>
              </div>
              <h4 style={{ margin: '4px 0', color: '#ffffff', fontSize: '1rem' }}>{currentSlotSponsor.name}</h4>
              <small style={{ color: '#94a3b8' }}>Primado por victoria: +{formatMoney(currentSlotSponsor.bonusPerWin)}</small>
            </div>
          )}

          {/* Catalog of Sponsors to Sign */}
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
            {currentSlotSponsor ? 'Elige otro patrocinador para reemplazar el actual:' : 'Elige y firma un patrocinador para este espacio:'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '160px', overflowY: 'auto', paddingRight: '0.3rem' }}>
            {currentTabList.map((s, idx) => {
              const isCurrent = currentSlotSponsor?.name === s.name;
              return (
                <div
                  key={idx}
                  style={{
                    background: isCurrent ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.04)',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    borderLeft: `4px solid ${s.color}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 'bold', color: '#f1f5f9', fontSize: '0.85rem' }}>{s.name}</span>
                    <small style={{ display: 'block', color: '#94a3b8', fontSize: '0.72rem' }}>
                      {formatMoney(s.payout)}/año • +{formatMoney(s.bonus)} por victoria
                    </small>
                  </div>
                  <button
                    disabled={isCurrent}
                    onClick={() => handleSelectSponsor(sponsorTab, s)}
                    className="tm-btn-primary"
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.3rem 0.7rem',
                      background: isCurrent ? 'rgba(255,255,255,0.1)' : '#10b981',
                      color: isCurrent ? '#94a3b8' : '#022c22',
                      fontWeight: 'bold',
                      cursor: isCurrent ? 'default' : 'pointer'
                    }}
                  >
                    {isCurrent ? 'Activo' : 'Firmar'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stacked Bar Chart for Revenue vs Expenses Breakdown */}
      <div className="glass-panel" style={{ padding: '1.8rem', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#38bdf8', marginTop: 0 }}>
          <PieChart size={22} color="#38bdf8" /> Desglose Gráfico de Ingresos vs Pérdidas (Barra Apilada)
        </h3>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Visualización interactiva en tiempo real de todos los flujos monetarios anuales de la entidad.</p>

        {/* Stacked Bar - Incomes */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={18} color="#10b981" /> Total Ingresos Anuales: {formatMoney(totalAnnualIncomes)}
            </span>
            <small style={{ color: '#94a3b8' }}>Patrocinio, Taquillas, Derechos TV, Merchandising</small>
          </div>
          <div style={{ display: 'flex', height: '24px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div title={`Patrocinio Camiseta: ${formatMoney(sponsorIncome)} (${incSponsorPct}%)`} style={{ width: `${incSponsorPct}%`, background: '#38bdf8', transition: 'width 0.4s' }} />
            <div title={`Venta de Entradas Taquilla: ${formatMoney(estimatedMatchDayIncome)} (${incMatchPct}%)`} style={{ width: `${incMatchPct}%`, background: '#10b981', transition: 'width 0.4s' }} />
            <div title={`Derechos de Televisión: ${formatMoney(tvRightsIncome)} (${incTvPct}%)`} style={{ width: `${incTvPct}%`, background: '#8b5cf6', transition: 'width 0.4s' }} />
            <div title={`Merchandising & Tienda: ${formatMoney(merchIncome)} (${incMerchPct}%)`} style={{ width: `${incMerchPct}%`, background: '#f59e0b', transition: 'width 0.4s' }} />
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.6rem', fontSize: '0.78rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#38bdf8' }}>■ Patrocinio ({incSponsorPct}%)</span>
            <span style={{ color: '#10b981' }}>■ Entradas Taquilla ({incMatchPct}%)</span>
            <span style={{ color: '#8b5cf6' }}>■ Derechos TV ({incTvPct}%)</span>
            <span style={{ color: '#f59e0b' }}>■ Merchandising ({incMerchPct}%)</span>
          </div>
        </div>

        {/* Stacked Bar - Expenses */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingDown size={18} color="#ef4444" /> Total Pérdidas y Gastos Anuales: {formatMoney(totalAnnualLosses)}
            </span>
            <small style={{ color: '#94a3b8' }}>Salarios, Mantenimiento, Staff, Ojeo, Impuestos</small>
          </div>
          <div style={{ display: 'flex', height: '24px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <div title={`Masa Salarial Jugadores: ${formatMoney(totalPayrollAnnual)} (${expPayrollPct}%)`} style={{ width: `${expPayrollPct}%`, background: '#ef4444', transition: 'width 0.4s' }} />
            <div title={`Mantenimiento Instalaciones: ${formatMoney(annualFacilitiesCost)} (${expFacilitiesPct}%)`} style={{ width: `${expFacilitiesPct}%`, background: '#f97316', transition: 'width 0.4s' }} />
            <div title={`Gastos de Estadio & Terreno: ${formatMoney(annualStadiumMaintenance)} (${expStadiumPct}%)`} style={{ width: `${expStadiumPct}%`, background: '#eab308', transition: 'width 0.4s' }} />
            <div title={`Cuerpo Técnico & Servicios Médicos: ${formatMoney(annualStaffAndMedical)} (${expStaffPct}%)`} style={{ width: `${expStaffPct}%`, background: '#ec4899', transition: 'width 0.4s' }} />
            <div title={`Red de Ojeo & Cantera: ${formatMoney(annualScoutingCost)} (${expScoutPct}%)`} style={{ width: `${expScoutPct}%`, background: '#a855f7', transition: 'width 0.4s' }} />
            <div title={`Impuestos y Logística: ${formatMoney(annualTaxesAndOps)} (${expTaxPct}%)`} style={{ width: `${expTaxPct}%`, background: '#64748b', transition: 'width 0.4s' }} />
          </div>
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.6rem', fontSize: '0.78rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#ef4444' }}>■ Masa Salarial ({expPayrollPct}%)</span>
            <span style={{ color: '#f97316' }}>■ Instalaciones ({expFacilitiesPct}%)</span>
            <span style={{ color: '#eab308' }}>■ Estadio ({expStadiumPct}%)</span>
            <span style={{ color: '#ec4899' }}>■ Staff & Médico ({expStaffPct}%)</span>
            <span style={{ color: '#a855f7' }}>■ Ojeo & Cantera ({expScoutPct}%)</span>
            <span style={{ color: '#94a3b8' }}>■ Impuestos & Logística ({expTaxPct}%)</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Balance Panel with Hover Tooltips */}
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
           <div className="glass-panel" style={{ padding: '1.4rem', position: 'relative', background: 'rgba(15, 23, 42, 0.85)' }} title={`Ingresos Anuales: ${formatMoney(totalAnnualIncomes)}`}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ margin: 0, color: '#10b981' }}>Ingresos Brutos Anuales</h3>
               <HelpCircle size={16} color="#94a3b8" />
             </div>
             <div style={{ height: '10px', background: '#10b981', width: '100%', margin: '12px 0', borderRadius: '5px' }}></div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
               <strong style={{ color: '#10b981' }}>{formatMoney(totalAnnualIncomes)}</strong>
               <span style={{ color: '#94a3b8' }}>Entradas, TV y Sponsors</span>
             </div>
           </div>

           <div className="glass-panel" style={{ padding: '1.4rem', position: 'relative', background: 'rgba(15, 23, 42, 0.85)' }} title={`Pérdidas y Gastos Anuales Totales: ${formatMoney(totalAnnualLosses)}`}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ margin: 0, color: '#ef4444' }}>Pérdidas & Gastos Anuales Totales</h3>
               <HelpCircle size={16} color="#94a3b8" />
             </div>
             <div style={{ height: '10px', background: '#ef4444', width: '100%', margin: '12px 0', borderRadius: '5px' }}></div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
               <strong style={{ color: '#ef4444' }}>-{formatMoney(totalAnnualLosses)}</strong>
               <span style={{ color: '#94a3b8' }}>Incluye salarios, estadio y staff</span>
             </div>
           </div>

           <div className="glass-panel" style={{ padding: '1.4rem', position: 'relative', background: 'rgba(15, 23, 42, 0.85)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ margin: 0, color: netProfit >= 0 ? '#34d399' : '#f87171' }}>Resultado Neto Estimado</h3>
               <HelpCircle size={16} color="#38bdf8" />
             </div>
             <div style={{ height: '10px', background: netProfit >= 0 ? '#10b981' : '#ef4444', width: '100%', margin: '12px 0', borderRadius: '5px' }}></div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
               <strong style={{ color: netProfit >= 0 ? '#34d399' : '#f87171' }}>{formatMoney(netProfit)}</strong>
               <span style={{ color: '#94a3b8' }}>{netProfit >= 0 ? '🟢 Superávit positivo' : '🔴 Déficit económico'}</span>
             </div>
           </div>

           <div className="glass-panel" style={{ padding: '1.4rem', position: 'relative', background: 'rgba(15, 23, 42, 0.85)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ margin: 0, color: '#38bdf8' }}>Efectivo / Caja Disponible para Fichajes</h3>
               <HelpCircle size={16} color="#38bdf8" />
             </div>
             <div style={{ height: '10px', background: '#38bdf8', width: '100%', margin: '12px 0', borderRadius: '5px' }}></div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
               <strong style={{ color: '#38bdf8' }}>{formatMoney(team?.budget || 0)}</strong>
               <span style={{ color: '#94a3b8' }}>Dinero líquido en banco</span>
             </div>
           </div>
        </div>

        {/* Expense Sliders Controls (0 - 100) */}
        <div style={{ flex: 1, minWidth: '320px', background: 'rgba(15, 23, 42, 0.85)' }} className="glass-panel">
           <h3 style={{ color: '#f8fafc', marginTop: 0 }}>Ajustes de Inversión en Instalaciones (0 - 100)</h3>
           <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Los niveles de inversión incrementan el rendimiento del equipo pero aumentan las pérdidas semanales.</p>
           
           <div style={{ marginTop: '1.2rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <label style={{ color: '#e2e8f0', fontWeight: 'bold' }}>Red de Ojeo y Scouting</label>
               <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{scouting} / 100</span>
             </div>
             <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.3rem' }}>
               <input type="range" min="0" max="100" value={scouting} onChange={e => setScouting(Number(e.target.value))} style={{ flex: 1, accentColor: '#10b981' }} />
             </div>
             <small style={{ color: '#94a3b8' }}>Mayor velocidad y precisión al descubrir canteranos de nivel.</small>
           </div>
           
           <div style={{ marginTop: '1.2rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <label style={{ color: '#e2e8f0', fontWeight: 'bold' }}>Cuerpo Técnico y Entrenadores</label>
               <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{coaching} / 100</span>
             </div>
             <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.3rem' }}>
               <input type="range" min="0" max="100" value={coaching} onChange={e => setCoaching(Number(e.target.value))} style={{ flex: 1, accentColor: '#10b981' }} />
             </div>
             <small style={{ color: '#94a3b8' }}>Incrementa el porcentaje de victorias en simulación de partidos.</small>
           </div>

           <div style={{ marginTop: '1.2rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <label style={{ color: '#e2e8f0', fontWeight: 'bold' }}>Servicios Médicos & Fisioterapia</label>
               <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{health} / 100</span>
             </div>
             <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.3rem' }}>
               <input type="range" min="0" max="100" value={health} onChange={e => setHealth(Number(e.target.value))} style={{ flex: 1, accentColor: '#10b981' }} />
             </div>
             <small style={{ color: '#94a3b8' }}>Reduce lesiones y acelera la recuperación de resistencia.</small>
           </div>

           <div style={{ marginTop: '1.2rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <label style={{ color: '#e2e8f0', fontWeight: 'bold' }}>Calidad de Estadio & Césped</label>
               <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{facilities} / 100</span>
             </div>
             <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.3rem' }}>
               <input type="range" min="0" max="100" value={facilities} onChange={e => setFacilities(Number(e.target.value))} style={{ flex: 1, accentColor: '#10b981' }} />
             </div>
             <small style={{ color: '#94a3b8' }}>Atrae más público y maximiza recaudación en taquilla.</small>
           </div>

           <hr style={{ margin: '1.5rem 0', borderColor: 'rgba(255,255,255,0.1)' }} />

           <h3 style={{ color: '#f8fafc' }}>Precio de Entradas por Partido</h3>
           <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.8rem' }}>
             <DollarSign size={20} color="#10b981" />
             <input type="number" value={ticketPrice} onChange={e => setTicketPrice(Number(e.target.value))} className="bb-input" style={{ width: '120px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(16,185,129,0.3)', padding: '0.5rem', borderRadius: '6px' }} />
             <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Recaudación estimada por jornada local: <strong style={{ color: '#10b981' }}>{formatMoney(estimatedMatchDayIncome / 19)}</strong></span>
           </div>

           <button className="tm-btn-primary" style={{ marginTop: '1.5rem', width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, #059669, #10b981)', color: '#022c22', fontWeight: 'bold', fontSize: '0.95rem' }} onClick={saveFinances}>
             Guardar Ajustes Financieros
           </button>
        </div>
      </div>

      {/* Stadium & Club Facilities Expansion Section */}
      <div className="glass-panel" style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(15, 23, 42, 0.85)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
              <Building color="#38bdf8" /> Infraestructuras & Expansión del Estadio
            </h3>
            <p style={{ margin: '0.3rem 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
              Invierte el presupuesto del club para ampliar el aforo del estadio y modernizar los complejos deportivos.
            </p>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            Presupuesto disponible: <strong style={{ color: '#eab308' }}>{formatMoney(team?.budget || 0)}</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
          {/* Stadium */}
          {(() => {
            const lvl = team?.facilities?.stadiumLevel || 1;
            const nextCost = lvl * 15000000;
            return (
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.2rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#38bdf8', fontSize: '1rem' }}>🏟️ Estadio del Club</strong>
                  <span style={{ background: '#0284c7', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Nivel {lvl}/5</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 0.8rem 0' }}>
                  Capacidad actual: <strong style={{ color: '#f1f5f9' }}>{(team?.attendance || 45000).toLocaleString()} espectadores</strong>.
                </p>
                <button
                  onClick={() => handleUpgradeFacility('stadium')}
                  disabled={lvl >= 5}
                  className="tm-btn-primary"
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem', background: lvl >= 5 ? '#475569' : '#0284c7', fontWeight: 'bold' }}
                >
                  {lvl >= 5 ? 'Nivel Máximo (5/5)' : `Ampliar Aforo (+10k) • ${formatMoney(nextCost)}`}
                </button>
              </div>
            );
          })()}

          {/* Youth Facility */}
          {(() => {
            const lvl = team?.facilities?.youthLevel || 1;
            const nextCost = lvl * 8000000;
            return (
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.2rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#10b981', fontSize: '1rem' }}>🎓 Academia de Cantera</strong>
                  <span style={{ background: '#059669', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Nivel {lvl}/5</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 0.8rem 0' }}>
                  Aumenta la tasa de crecimiento y el potencial de los jóvenes canteranos.
                </p>
                <button
                  onClick={() => handleUpgradeFacility('youth')}
                  disabled={lvl >= 5}
                  className="tm-btn-primary"
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem', background: lvl >= 5 ? '#475569' : '#059669', fontWeight: 'bold' }}
                >
                  {lvl >= 5 ? 'Nivel Máximo (5/5)' : `Mejorar Cantera • ${formatMoney(nextCost)}`}
                </button>
              </div>
            );
          })()}

          {/* Training Facility */}
          {(() => {
            const lvl = team?.facilities?.trainingLevel || 1;
            const nextCost = lvl * 8000000;
            return (
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.2rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#f59e0b', fontSize: '1rem' }}>🏋️ Complejo Deportivo</strong>
                  <span style={{ background: '#d97706', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Nivel {lvl}/5</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 0.8rem 0' }}>
                  Acelera las ganancias de OVR y rendimiento físico de la plantilla.
                </p>
                <button
                  onClick={() => handleUpgradeFacility('training')}
                  disabled={lvl >= 5}
                  className="tm-btn-primary"
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem', background: lvl >= 5 ? '#475569' : '#d97706', fontWeight: 'bold' }}
                >
                  {lvl >= 5 ? 'Nivel Máximo (5/5)' : `Modernizar Gimnasio • ${formatMoney(nextCost)}`}
                </button>
              </div>
            );
          })()}

          {/* Medical Facility */}
          {(() => {
            const lvl = Math.min(5, Math.floor((team?.healthExpense || 50) / 20) + 1);
            const nextCost = lvl * 6000000;
            return (
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1.2rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#ec4899', fontSize: '1rem' }}>🏥 Centro Médico</strong>
                  <span style={{ background: '#db2777', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Nivel {lvl}/5</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 0.8rem 0' }}>
                  Acelera la recuperación de jugadores lesionados al doble de velocidad.
                </p>
                <button
                  onClick={() => handleUpgradeFacility('medical')}
                  disabled={lvl >= 5}
                  className="tm-btn-primary"
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem', background: lvl >= 5 ? '#475569' : '#db2777', fontWeight: 'bold' }}
                >
                  {lvl >= 5 ? 'Nivel Máximo (5/5)' : `Mejorar Clínica • ${formatMoney(nextCost)}`}
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
