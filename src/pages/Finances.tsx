import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team, type League } from '../db/db';

export function Finances() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  
  // States for sliders
  const [scouting, setScouting] = useState(100);
  const [coaching, setCoaching] = useState(100);
  const [health, setHealth] = useState(100);
  const [facilities, setFacilities] = useState(100);
  const [ticketPrice, setTicketPrice] = useState(50);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);
      
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
      alert('Finanzas guardadas!');
    }
  };

  const formatMoney = (val: number) => {
    if(val >= 1000000 || val <= -1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if(val >= 1000 || val <= -1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="page-container" style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      <div className="page-header">
        <h1>Team Finances</h1>
      </div>
      
      <div style={{display: 'flex', gap: '2rem'}}>
        {/* Gráficos simulados */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem'}}>
           <div className="glass-panel">
             <h3>Ingresos (Revenue)</h3>
             <div style={{height: '20px', background: '#28a745', width: '80%', margin: '4px 0'}}></div>
             <small>{formatMoney(team?.revenue || 0)}</small>
           </div>
           <div className="glass-panel">
             <h3>Gastos (Expenses)</h3>
             <div style={{height: '20px', background: '#dc3545', width: '50%', margin: '4px 0'}}></div>
             <small>Scouting, Coaching, Health, Facilities</small>
           </div>
           <div className="glass-panel">
             <h3>Beneficio (Profit)</h3>
             <div style={{height: '20px', background: (team?.profit || 0) >= 0 ? '#28a745' : '#dc3545', width: '30%', margin: '4px 0'}}></div>
             <small>{formatMoney(team?.profit || 0)}</small>
           </div>
           <div className="glass-panel">
             <h3>Efectivo (Cash)</h3>
             <div style={{height: '20px', background: '#007bff', width: '90%', margin: '4px 0'}}></div>
             <small>{formatMoney(team?.budget || 0)}</small>
           </div>
        </div>

        {/* Controles */}
        <div style={{flex: 1}} className="glass-panel">
           <h3>Expense levels</h3>
           
           <div style={{marginTop: '1rem'}}>
             <label>Scouting expense level</label>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
               <input type="range" min="0" max="200" value={scouting} onChange={e => setScouting(Number(e.target.value))} />
               <span>{scouting}</span>
             </div>
             <small style={{color: '#28a745'}}>Afecta el error al ver potenciales.</small>
           </div>
           
           <div style={{marginTop: '1rem'}}>
             <label>Coaching expense level</label>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
               <input type="range" min="0" max="200" value={coaching} onChange={e => setCoaching(Number(e.target.value))} />
               <span>{coaching}</span>
             </div>
             <small style={{color: '#28a745'}}>Afecta la progresión de los jugadores.</small>
           </div>

           <div style={{marginTop: '1rem'}}>
             <label>Health expense level</label>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
               <input type="range" min="0" max="200" value={health} onChange={e => setHealth(Number(e.target.value))} />
               <span>{health}</span>
             </div>
             <small style={{color: '#28a745'}}>Reduce la duración de las lesiones.</small>
           </div>

           <div style={{marginTop: '1rem'}}>
             <label>Facilities expense level</label>
             <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
               <input type="range" min="0" max="200" value={facilities} onChange={e => setFacilities(Number(e.target.value))} />
               <span>{facilities}</span>
             </div>
             <small style={{color: '#28a745'}}>Mejora el humor de los jugadores y la demanda de entradas.</small>
           </div>

           <hr style={{margin: '2rem 0', borderColor: '#333'}} />

           <h3>Ticket price</h3>
           <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '1rem'}}>
             <span>$</span>
             <input type="number" value={ticketPrice} onChange={e => setTicketPrice(Number(e.target.value))} style={{background: '#1a1a2e', color: 'white', border: '1px solid #444', padding: '4px'}} />
           </div>

           <button style={{marginTop: '2rem', padding: '8px 16px', background: '#e67e22', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}} onClick={saveFinances}>
             Save expense levels and ticket price
           </button>
        </div>
      </div>
    </div>
  );
}
