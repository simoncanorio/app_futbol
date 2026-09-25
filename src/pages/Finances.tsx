import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team } from '../db/db';
import { DollarSign, ShieldCheck, Award } from 'lucide-react';

export function Finances() {
  const { leagueId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  
  const [scouting, setScouting] = useState(100);
  const [coaching, setCoaching] = useState(100);
  const [health, setHealth] = useState(100);
  const [facilities, setFacilities] = useState(100);
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
          setScouting(userTeam.scoutingExpense || 100);
          setCoaching(userTeam.coachingExpense || 100);
          setHealth(userTeam.healthExpense || 100);
          setFacilities(userTeam.facilitiesExpense || 100);
          setTicketPrice(userTeam.ticketPrice || 50);
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
      alert('¡Ajustes financieros y precio de entradas guardados con éxito!');
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
    alert(`¡Contrato de patrocinio firmado con ${s.name}! Se han ingresado $${(s.payout/1000000).toFixed(1)}M al presupuesto.`);
  };

  const formatMoney = (val: number) => {
    if(val >= 1000000 || val <= -1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if(val >= 1000 || val <= -1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="page-container" style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      <div className="page-header">
        <h1>Finanzas del Club & Patrocinios</h1>
        <p style={{ color: '#94a3b8' }}>Gestiona los niveles de inversión, precios de entradas y contratos de patrocinio principal.</p>
      </div>

      {/* FFP & Sponsor Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3><ShieldCheck size={20} color="#10b981" /> Fair Play Financiero (FFP)</h3>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Estado de salud financiera y control de masa salarial del club.</p>
          
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
              <span>Ratio Salarios/Ingresos</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>CUMPLIDO (45%)</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '45%', height: '100%', background: '#10b981' }} />
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
        {/* Balance Panel */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem'}}>
           <div className="glass-panel">
             <h3>Ingresos Temporada (Revenue)</h3>
             <div style={{height: '14px', background: '#10b981', width: '80%', margin: '8px 0', borderRadius: '4px'}}></div>
             <small>{formatMoney(team?.revenue || 0)}</small>
           </div>
           <div className="glass-panel">
             <h3>Beneficio Neto (Profit)</h3>
             <div style={{height: '14px', background: (team?.profit || 0) >= 0 ? '#10b981' : '#ef4444', width: '35%', margin: '8px 0', borderRadius: '4px'}}></div>
             <small>{formatMoney(team?.profit || 0)}</small>
           </div>
           <div className="glass-panel">
             <h3>Presupuesto / Efectivo (Cash)</h3>
             <div style={{height: '14px', background: '#3b82f6', width: '90%', margin: '8px 0', borderRadius: '4px'}}></div>
             <small>{formatMoney(team?.budget || 0)}</small>
           </div>
        </div>

        {/* Expense Sliders Controls */}
        <div style={{flex: 1}} className="glass-panel">
           <h3>Niveles de Inversión Semanal</h3>
           
           <div style={{marginTop: '1rem'}}>
             <label>Ojeo y Scouting</label>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
               <input type="range" min="0" max="200" value={scouting} onChange={e => setScouting(Number(e.target.value))} />
               <span>{scouting}</span>
             </div>
             <small style={{color: '#10b981'}}>Precisión al ojeadores y reporte de jóvenes talentos.</small>
           </div>
           
           <div style={{marginTop: '1rem'}}>
             <label>Cuerpo Técnico y Entrenadores</label>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
               <input type="range" min="0" max="200" value={coaching} onChange={e => setCoaching(Number(e.target.value))} />
               <span>{coaching}</span>
             </div>
             <small style={{color: '#10b981'}}>Acelera el desarrollo de potencial en promesas.</small>
           </div>

           <div style={{marginTop: '1rem'}}>
             <label>Servicios Médicos y Fisioterapia</label>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
               <input type="range" min="0" max="200" value={health} onChange={e => setHealth(Number(e.target.value))} />
               <span>{health}</span>
             </div>
             <small style={{color: '#10b981'}}>Previene lesiones y acelera la recuperación.</small>
           </div>

           <div style={{marginTop: '1rem'}}>
             <label>Instalaciones y Estadio</label>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
               <input type="range" min="0" max="200" value={facilities} onChange={e => setFacilities(Number(e.target.value))} />
               <span>{facilities}</span>
             </div>
             <small style={{color: '#10b981'}}>Mejora el humor del plantel y la venta de entradas.</small>
           </div>

           <hr style={{margin: '1.5rem 0', borderColor: 'rgba(255,255,255,0.1)'}} />

           <h3>Precio de Entradas (Ticket Price)</h3>
           <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.8rem'}}>
             <DollarSign size={18} color="#10b981" />
             <input type="number" value={ticketPrice} onChange={e => setTicketPrice(Number(e.target.value))} className="bb-input" style={{ width: '120px' }} />
           </div>

           <button className="tm-btn-primary" style={{marginTop: '1.5rem', width: '100%', padding: '0.7rem'}} onClick={saveFinances}>
             Guardar Ajustes Financieros
           </button>
        </div>
      </div>
    </div>
  );
}
