import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team, type Player } from '../db/db';
import { DollarSign, ShieldCheck, Award, Info, HelpCircle } from 'lucide-react';

export function Finances() {
  const { leagueId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);
  
  const [scouting, setScouting] = useState(50);
  const [coaching, setCoaching] = useState(50);
  const [health, setHealth] = useState(50);
  const [facilities, setFacilities] = useState(50);
  const [ticketPrice, setTicketPrice] = useState(50);

  const sponsorsList = [
    { name: 'Fly Emirates Global', payout: 25000000, bonus: 2000000 },
    { name: 'Spotify Audio', payout: 30000000, bonus: 2500000 },
    { name: 'Rakuten Digital', payout: 22000000, bonus: 1500000 },
    { name: 'Red Bull Energy', payout: 35000000, bonus: 3000000 },
  ];

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      
      if(l.userTeamId) {
        const userTeam = await db.teams.get(l.userTeamId);
        if(userTeam) {
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

  const handleSelectSponsor = async (s: typeof sponsorsList[0]) => {
    if (!team) return;
    team.mainSponsor = {
      name: s.name,
      payoutPerSeason: s.payout,
      bonusPerWin: s.bonus
    };
    team.budget += s.payout;
    await db.teams.put(team);
    setTeam({ ...team });
    alert(`¡Contrato firmado con ${s.name}! Se han ingresado $${(s.payout/1000000).toFixed(1)}M al presupuesto.`);
  };

  const formatMoney = (val: number) => {
    if(val >= 1000000 || val <= -1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if(val >= 1000 || val <= -1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const totalPayroll = teamPlayers.reduce((sum, p) => sum + p.contract, 0);
  const weeklyFacilitiesCost = (scouting + coaching + health + facilities) * 10000;
  const weeklyPayroll = Math.round(totalPayroll / 52);
  const estimatedMatchDayIncome = team ? Math.round(team.attendance * ticketPrice) : 0;
  const sponsorIncome = team?.mainSponsor ? team.mainSponsor.payoutPerSeason : 0;

  // Wage budget limit = 70% of estimated annual revenue or $120M
  const wageBudget = Math.max(60000000, Math.round((team?.revenue || 80000000) * 0.7));
  const wageUsagePct = Math.min(100, Math.round((totalPayroll / wageBudget) * 100));

  return (
    <div className="page-container" style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      <div className="page-header">
        <h1>Finanzas del Club & Instalaciones</h1>
        <p style={{ color: '#94a3b8' }}>Gestiona los niveles de inversión en instalaciones (0-100), masa salarial y patrocinios.</p>
      </div>

      {/* Wage Budget & Sponsor Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3><ShieldCheck size={20} color="#10b981" /> Control de Presupuesto Salarial (Fair Play)</h3>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Masa salarial actual de la plantilla vs Presupuesto salarial anual máximo recomendado.</p>
          
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
              <span>Masa Salarial: <strong>{formatMoney(totalPayroll)}/año</strong></span>
              <span>Límite Salarial: <strong>{formatMoney(wageBudget)}/año</strong></span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${wageUsagePct}%`, height: '100%', background: wageUsagePct > 90 ? '#ef4444' : '#10b981', transition: 'width 0.3s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>
              <span>Uso del presupuesto salarial: {wageUsagePct}%</span>
              <span>{wageUsagePct <= 100 ? '✅ Dentro del límite' : '⚠️ Exceso salarial'}</span>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3><Award size={20} color="#fbbf24" /> Patrocinador Principal de Camiseta</h3>
          {team?.mainSponsor ? (
            <div>
              <h4 style={{ color: '#38bdf8', margin: '0.5rem 0' }}>{team.mainSponsor.name}</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1' }}>
                Fijo anual: <strong>${(team.mainSponsor.payoutPerSeason/1000000).toFixed(1)}M</strong> | Bonus por victoria: <strong>${(team.mainSponsor.bonusPerWin/1000000).toFixed(1)}M</strong>
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Elige una oferta de patrocinio para obtener ingresos inmediatos:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.8rem' }}>
                {sponsorsList.map((s, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{s.name} (${(s.payout/1000000).toFixed(1)}M/año)</span>
                    <button className="tm-btn-primary" onClick={() => handleSelectSponsor(s)} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>Firmar</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div style={{display: 'flex', gap: '2rem'}}>
        {/* Balance Panel with Hover Tooltips */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem'}}>
           <div className="glass-panel" style={{ padding: '1.2rem', position: 'relative' }} title={`Desglose de Ingresos:\n• Venta de entradas por partido local: ~${formatMoney(estimatedMatchDayIncome)}\n• Patrocinador de camiseta: ${formatMoney(sponsorIncome)}\n• Premios por victorias y emisión TV`}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ margin: 0 }}>Ingresos Totales (Revenue)</h3>
               <HelpCircle size={16} color="#94a3b8" />
             </div>
             <div style={{height: '14px', background: '#10b981', width: '85%', margin: '12px 0', borderRadius: '4px'}}></div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
               <strong>{formatMoney(team?.revenue || 0)}</strong>
               <span style={{ color: '#94a3b8' }}>Pasa el ratón para ver desglose</span>
             </div>
           </div>

           <div className="glass-panel" style={{ padding: '1.2rem', position: 'relative' }} title={`Desglose de Gastos:\n• Masa Salarial Anual Plantilla: ${formatMoney(totalPayroll)} (${formatMoney(weeklyPayroll)}/semana)\n• Mantenimiento Semanal Instalaciones (0-100): ${formatMoney(weeklyFacilitiesCost)}/semana`}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ margin: 0 }}>Beneficio Neto (Net Profit)</h3>
               <HelpCircle size={16} color="#94a3b8" />
             </div>
             <div style={{height: '14px', background: (team?.profit || 0) >= 0 ? '#10b981' : '#ef4444', width: '50%', margin: '12px 0', borderRadius: '4px'}}></div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
               <strong style={{ color: (team?.profit || 0) >= 0 ? '#10b981' : '#ef4444' }}>{formatMoney(team?.profit || 0)}</strong>
               <span style={{ color: '#94a3b8' }}>Pasa el ratón para ver desglose</span>
             </div>
           </div>

           <div className="glass-panel" style={{ padding: '1.2rem', position: 'relative' }} title={`Presupuesto en Efectivo Disponible:\n• Dinero disponible para compras de jugadores y contratos.\n• Se incrementa con ventas de jugadores, victorias y entradas.`}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ margin: 0 }}>Presupuesto de Fichajes / Efectivo</h3>
               <HelpCircle size={16} color="#38bdf8" />
             </div>
             <div style={{height: '14px', background: '#38bdf8', width: '90%', margin: '12px 0', borderRadius: '4px'}}></div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
               <strong style={{ color: '#38bdf8' }}>{formatMoney(team?.budget || 0)}</strong>
               <span style={{ color: '#94a3b8' }}>Efectivo disponible</span>
             </div>
           </div>
        </div>

        {/* Expense Sliders Controls (0 - 100) */}
        <div style={{flex: 1}} className="glass-panel">
           <h3>Niveles de Inversión en Instalaciones (0 - 100)</h3>
           <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ajusta la calidad de cada área. Mayor nivel = mejores resultados pero mayor coste semanal.</p>
           
           <div style={{marginTop: '1.2rem'}}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <label>Ojeo y Red de Scouting</label>
               <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{scouting} / 100</span>
             </div>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.3rem'}}>
               <input type="range" min="0" max="100" value={scouting} onChange={e => setScouting(Number(e.target.value))} style={{ flex: 1 }} />
             </div>
             <small style={{color: '#94a3b8'}}>Mayor precisión en ojeadores y descubrimiento de jóvenes canteranos.</small>
           </div>
           
           <div style={{marginTop: '1.2rem'}}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <label>Cuerpo Técnico y Entrenadores</label>
               <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{coaching} / 100</span>
             </div>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.3rem'}}>
               <input type="range" min="0" max="100" value={coaching} onChange={e => setCoaching(Number(e.target.value))} style={{ flex: 1 }} />
             </div>
             <small style={{color: '#94a3b8'}}>Aumenta la probabilidad de victoria en partidos y acelera crecimiento de jugadores.</small>
           </div>

           <div style={{marginTop: '1.2rem'}}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <label>Servicios Médicos y Fisioterapia</label>
               <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{health} / 100</span>
             </div>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.3rem'}}>
               <input type="range" min="0" max="100" value={health} onChange={e => setHealth(Number(e.target.value))} style={{ flex: 1 }} />
             </div>
             <small style={{color: '#94a3b8'}}>Previene lesiones graves y recupera el físico del equipo entre jornadas.</small>
           </div>

           <div style={{marginTop: '1.2rem'}}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <label>Instalaciones del Estadio & Afición</label>
               <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{facilities} / 100</span>
             </div>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.3rem'}}>
               <input type="range" min="0" max="100" value={facilities} onChange={e => setFacilities(Number(e.target.value))} style={{ flex: 1 }} />
             </div>
             <small style={{color: '#94a3b8'}}>Incremente el aforo y las ganancias por venta de entradas.</small>
           </div>

           <hr style={{margin: '1.5rem 0', borderColor: 'rgba(255,255,255,0.1)'}} />

           <h3>Precio de Entradas (Ticket Price)</h3>
           <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.8rem'}}>
             <DollarSign size={18} color="#10b981" />
             <input type="number" value={ticketPrice} onChange={e => setTicketPrice(Number(e.target.value))} className="bb-input" style={{ width: '120px' }} />
             <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Estimado por partido: {formatMoney(estimatedMatchDayIncome)}</span>
           </div>

           <button className="tm-btn-primary" style={{marginTop: '1.5rem', width: '100%', padding: '0.7rem'}} onClick={saveFinances}>
             Guardar Ajustes Financieros
           </button>
        </div>
      </div>
    </div>
  );
}
