import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League } from '../db/db';
import { Download } from 'lucide-react';

export function PlayerStats() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [players, setPlayers] = useState<(Player & { teamObj?: Team })[]>([]);
  const [page, setPage] = useState(0);
  const pageSize = 50;

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      setLeague(l || null);
      
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      
      const teamMap = new Map<number, Team>();
      allTeams.forEach(t => teamMap.set(t.id!, t));
      
      const p = allPlayers.map(pl => ({
        ...pl,
        teamObj: pl.teamId ? teamMap.get(pl.teamId) : undefined
      }));
      
      // Mostrar solo a los que hayan jugado al menos 1 partido
      const played = p.filter(pl => (pl.stats?.gamesPlayed || 0) > 0);
      setPlayers(played.sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0)));
    }
    load();
  }, [leagueId]);

  const visiblePlayers = players.slice(page * pageSize, (page + 1) * pageSize);

  const exportToCSV = () => {
    if (players.length === 0) return;
    
    const headers = [
      'Name', 'Age', 'Position', 'Team', 'Ovr', 'GamesPlayed', 'MinsPlayed', 
      'Goals', 'xG', 'Shots', 'ShotsOnTarget', 'Assists', 'xA', 'KeyPasses', 'PassesAttempted', 'PassesCompleted',
      'Touches', 'DribblesAttempted', 'DribblesCompleted', 'Tackles', 'Interceptions', 'DuelsWon', 'DuelsLost',
      'CleanSheets', 'Fouls', 'YellowCards', 'RedCards'
    ];

    const rows = players.map(p => {
      const s = p.stats;
      return [
        `"${p.name}"`, p.age, p.position, `"${p.teamObj?.name || 'FA'}"`, p.overall,
        s.gamesPlayed, s.minutesPlayed,
        s.goals, s.xG || 0,
        s.shotsTotal, s.shotsOnTarget, s.assists, s.xA, s.keyPasses, s.passesAttempted, s.passesCompleted,
        s.touches, s.dribblesAttempted, s.dribblesCompleted, s.tackles, s.interceptions, s.duelsWon, s.duelsLost,
        s.cleanSheets, s.foulsCommitted, s.yellowCards, s.redCards
      ].join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `player_stats_s${league?.season || 2026}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Estadísticas Avanzadas (Player Stats)</h1>
        <button 
          onClick={exportToCSV}
          style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
        >
          <Download size={16} /> Exportar CSV
        </button>
      </div>
      
      <p style={{color: '#ccc', marginBottom: '1rem', fontSize: '13px'}}>
        Se muestran solo los jugadores que han disputado al menos 1 partido. Haz scroll lateral para ver más columnas.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table" style={{minWidth: '1200px'}}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Pos</th>
              <th>Eq</th>
              <th>PJ</th>
              <th title="Goles">Gls</th>
              <th title="Expected Goals (Simulado)">xG</th>
              <th title="Tiros Totales / A Puerta">Tir/Pta</th>
              <th title="Asistencias">Ast</th>
              <th title="Expected Assists">xA</th>
              <th title="Pases Clave">P.Clv</th>
              <th title="Pases Completados %">Pas%</th>
              <th title="Regates Completados">Reg</th>
              <th title="Duelos Ganados">Duel</th>
              <th title="Entradas / Intercepciones">Ent/Int</th>
              <th>TA</th>
              <th>TR</th>
            </tr>
          </thead>
          <tbody>
            {visiblePlayers.map(p => {
              const isMyTeam = league && p.teamId === league.userTeamId;
              const s = p.stats;
              const passPct = s.passesAttempted > 0 ? Math.round((s.passesCompleted / s.passesAttempted) * 100) : 0;
              const xG = s.xG?.toFixed(2) || '0.00';
              
              return (
                <tr key={p.id}>
                  <td style={{fontWeight: 'bold'}}>
                     <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: isMyTeam ? '#3b82f6' : '#e67e22', textDecoration: 'none'}}>
                       {p.name}
                     </Link>
                  </td>
                  <td>{p.position}</td>
                  <td>
                     <Link to={`/l/${leagueId}/team/${p.teamId}`} style={{color: '#aaa', textDecoration: 'none'}}>
                       {p.teamObj?.name.substring(0,3).toUpperCase() || 'FA'}
                     </Link>
                  </td>
                  <td>{s.gamesPlayed || 0}</td>
                  <td style={{fontWeight: 'bold'}}>{s.goals || 0}</td>
                  <td style={{color: '#888'}}>{xG}</td>
                  <td>{s.shotsTotal || 0} / {s.shotsOnTarget || 0}</td>
                  <td style={{fontWeight: 'bold'}}>{s.assists || 0}</td>
                  <td style={{color: '#888'}}>{s.xA?.toFixed(2) || '0.00'}</td>
                  <td>{s.keyPasses || 0}</td>
                  <td>{s.passesCompleted}/{s.passesAttempted} ({passPct}%)</td>
                  <td>{s.dribblesCompleted || 0}</td>
                  <td>{s.duelsWon || 0}</td>
                  <td>{s.tackles || 0} / {s.interceptions || 0}</td>
                  <td>{s.yellowCards || 0}</td>
                  <td>{s.redCards || 0}</td>
                </tr>
              )
            })}
            {players.length === 0 && (
              <tr><td colSpan={16} style={{textAlign: 'center', padding: '2rem'}}>Nadie ha jugado partidos aún. Avanza en el calendario.</td></tr>
            )}
          </tbody>
        </table>
        
        {players.length > pageSize && (
          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem'}}>
             <button 
               disabled={page === 0} 
               onClick={() => setPage(p => p - 1)}
               style={{padding: '4px 12px', background: '#111', color: 'white', border: '1px solid #444', cursor: page === 0 ? 'not-allowed' : 'pointer'}}
             >Anterior</button>
             <span style={{padding: '4px 0'}}>Página {page + 1} de {Math.ceil(players.length / pageSize)}</span>
             <button 
               disabled={(page + 1) * pageSize >= players.length} 
               onClick={() => setPage(p => p + 1)}
               style={{padding: '4px 12px', background: '#111', color: 'white', border: '1px solid #444', cursor: (page + 1) * pageSize >= players.length ? 'not-allowed' : 'pointer'}}
             >Siguiente</button>
          </div>
        )}
      </div>
    </div>
  );
}
