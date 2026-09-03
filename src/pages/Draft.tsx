import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type League, type Team } from '../db/db';

export function Draft() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [prospects, setProspects] = useState<Player[]>([]);

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
      
      // Si no hay candidatos generados para este año, generarlos (simulación)
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
      const p: Player = {
        leagueId: lid,
        teamId: null,
        name: `${firstNames[Math.floor(Math.random()*firstNames.length)]} ${lastNames[Math.floor(Math.random()*lastNames.length)]}`,
        age: 16 + Math.floor(Math.random() * 3), // 16-18
        overall: 30 + Math.floor(Math.random() * 20), // 30-50
        potential: 60 + Math.floor(Math.random() * 35), // 60-95
        position: positions[Math.floor(Math.random()*positions.length)],
        contract: 100000, // Salario mínimo canterano
        stats: { goals: 0, assists: 0 },
        isDraftProspect: true,
        draftYear: year
      };
      newProspects.push(p);
    }
    
    await db.players.bulkAdd(newProspects);
    
    // Recargar de la base de datos para obtener los IDs
    const all = await db.players.where('leagueId').equals(lid).toArray();
    return all.filter(p => p.isDraftProspect && p.draftYear === year);
  };

  const handleDraft = async (p: Player) => {
    if (!team) return;
    
    // Check si ya reclutamos demasiados este año (opcional), omitido para simplicidad
    
    if (window.confirm(`¿Reclutar a ${p.name} para el filial?`)) {
      p.teamId = team.id!;
      p.isDraftProspect = false;
      p.lineupStatus = 'youth';
      p.recruitedYear = league?.season || 2026;
      await db.players.put(p);
      
      setProspects(prospects.filter(pr => pr.id !== p.id));
      alert(`${p.name} ha sido añadido a tu Filial.`);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Draft de Canteranos (Undrafted Players)</h1>
      </div>
      
      <p style={{color: '#ccc', marginBottom: '2rem'}}>
        Año de reclutamiento: {league?.season}. Aquí aparecen los jóvenes talentos que buscan equipo. Puedes reclutarlos para tu Filial.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Pos</th>
              <th>Age</th>
              <th>OVR</th>
              <th>POT</th>
              <th>Draft</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((p, index) => (
              <tr key={p.id}>
                <td style={{color: '#888'}}>{index + 1}</td>
                <td style={{fontWeight: 'bold', color: '#e67e22'}}>{p.name}</td>
                <td>{p.position}</td>
                <td>{p.age}</td>
                <td>{p.overall}</td>
                <td>{p.potential}</td>
                <td>
                  <button onClick={() => handleDraft(p)} style={{background: '#e67e22', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}>
                    Draft
                  </button>
                </td>
              </tr>
            ))}
            {prospects.length === 0 && (
              <tr><td colSpan={7} style={{textAlign: 'center', padding: '2rem'}}>No hay candidatos disponibles.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
