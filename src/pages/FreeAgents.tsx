import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type League, type Team } from '../db/db';

export function FreeAgents() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [freeAgents, setFreeAgents] = useState<Player[]>([]);
  const [teamPlayersCount, setTeamPlayersCount] = useState(0);
  const [teamPayroll, setTeamPayroll] = useState(0);

  const SALARY_CAP = 150000000;
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
      
      // Free agents have teamId === null (or maybe 0 depending on implementation, let's use a filter)
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

  const handleSign = async (p: Player) => {
    if(!team) return;
    if(teamPlayersCount >= MAX_ROSTER) {
      alert("Plantilla llena. Tienes que despedir a alguien antes.");
      return;
    }
    
    // Check cap space if asking for > minimum
    if(teamPayroll + p.contract > SALARY_CAP) {
      alert("No hay suficiente espacio salarial.");
      return;
    }
    
    if(window.confirm(`¿Firmar a ${p.name} por $${(p.contract/1000000).toFixed(2)}M?`)) {
      p.teamId = team.id!;
      p.lineupStatus = 'reserve';
      await db.players.put(p);
      
      // Update UI state
      setFreeAgents(freeAgents.filter(fa => fa.id !== p.id));
      setTeamPlayersCount(c => c + 1);
      setTeamPayroll(c => c + p.contract);
      alert(`${p.name} firmado exitosamente.`);
    }
  };

  const capSpace = SALARY_CAP - teamPayroll;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Agentes Libres (Free Agents)</h1>
      </div>
      
      <div style={{marginBottom: '1rem', fontSize: '14px', lineHeight: '1.6'}}>
        Tienes actualmente {MAX_ROSTER - teamPlayersCount} lugares disponibles en la plantilla y <strong style={{color: capSpace >= 0 ? '#28a745' : '#dc3545'}}>${(capSpace/1000000).toFixed(2)}M</strong> en espacio salarial.<br/>
        Límite Salarial: ${(SALARY_CAP/1000000).toFixed(2)}M
      </div>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Pos</th>
              <th>Age</th>
              <th>OVR</th>
              <th>POT</th>
              <th>Asking For</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {freeAgents.map(p => (
              <tr key={p.id}>
                <td style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => toggleWatch(p)}>
                  <span style={{color: p.isWatched ? '#e67e22' : '#555', fontSize: '18px'}}>★</span>
                </td>
                <td style={{fontWeight: 'bold'}}>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#3b82f6', textDecoration: 'none'}}>
                    {p.name}
                  </Link>
                </td>
                <td>{p.position}</td>
                <td>{p.age}</td>
                <td>{p.overall}</td>
                <td>{p.potential}</td>
                <td>${(p.contract / 1000000).toFixed(2)}M</td>
                <td>
                  <div style={{display: 'flex', gap: '5px'}}>
                    <button style={{background: 'transparent', color: '#aaa', border: '1px solid #444', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer'}}>
                      Negotiate
                    </button>
                    <button onClick={() => handleSign(p)} style={{background: 'transparent', color: '#aaa', border: '1px solid #444', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer'}}>
                      Sign
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {freeAgents.length === 0 && (
              <tr><td colSpan={8} style={{textAlign: 'center', padding: '2rem'}}>No hay agentes libres disponibles.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
