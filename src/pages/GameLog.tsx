import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Match, type Team, type Player, type League } from '../db/db';

export function GameLog() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [matches, setMatches] = useState<(Match & { opponent: Team, isHome: boolean })[]>([]);
  const [teams, setTeams] = useState<Record<number, Team>>({});
  const [players, setPlayers] = useState<Record<number, Player>>({});
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l || !l.userTeamId) return;
      setLeague(l);
      
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      const teamMap: Record<number, Team> = {};
      allTeams.forEach(t => teamMap[t.id!] = t);
      setTeams(teamMap);
      
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const playerMap: Record<number, Player> = {};
      allPlayers.forEach(p => playerMap[p.id!] = p);
      setPlayers(playerMap);
      
      const allMatches = await db.matches.where('leagueId').equals(lid).toArray();
      
      // Filter played matches involving the user team
      const myMatches = allMatches.filter(m => m.isPlayed && (m.homeTeamId === l.userTeamId || m.awayTeamId === l.userTeamId));
      
      const mapped = myMatches.map(m => {
        const isHome = m.homeTeamId === l.userTeamId;
        return {
          ...m,
          isHome,
          opponent: isHome ? teamMap[m.awayTeamId] : teamMap[m.homeTeamId]
        };
      });
      
      setMatches(mapped.sort((a, b) => b.week - a.week)); // Most recent first
    }
    load();
  }, [leagueId]);

  const getResult = (m: Match & { isHome: boolean }) => {
    const myScore = m.isHome ? m.homeScore : m.awayScore;
    const oppScore = m.isHome ? m.awayScore : m.homeScore;
    if (myScore > oppScore) return <span style={{color: '#4ade80', fontWeight: 'bold'}}>W</span>;
    if (myScore < oppScore) return <span style={{color: '#ef4444', fontWeight: 'bold'}}>L</span>;
    return <span style={{color: '#eab308', fontWeight: 'bold'}}>D</span>;
  };

  const getScoreString = (m: Match & { isHome: boolean }) => {
    const myScore = m.isHome ? m.homeScore : m.awayScore;
    const oppScore = m.isHome ? m.awayScore : m.homeScore;
    return `${myScore} - ${oppScore}`;
  };

  return (
    <div className="page-container" style={{display: 'flex', gap: '2rem'}}>
      <div style={{flex: 1}}>
        <div className="page-header">
          <h1>Registro de Partidos (Game Log)</h1>
        </div>
        
        <p style={{color: '#ccc', marginBottom: '1rem'}}>Haz clic en un partido para ver las estadísticas (Box Score).</p>
        
        <div className="standings-content" style={{overflowX: 'auto'}}>
          <table className="table-container bb-table" style={{width: '100%'}}>
            <thead>
              <tr>
                <th>Semana</th>
                <th>Opp</th>
                <th>W/L/D</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(m => (
                <tr key={m.id} style={{background: selectedMatch?.id === m.id ? '#333' : 'transparent'}}>
                  <td>{m.week}</td>
                  <td>{m.isHome ? m.opponent.name : `@${m.opponent.name}`}</td>
                  <td>{getResult(m)}</td>
                  <td>{getScoreString(m)}</td>
                  <td>
                    <button onClick={() => setSelectedMatch(m)} style={{background: 'transparent', color: '#3b82f6', border: 'none', cursor: 'pointer', textDecoration: 'underline'}}>
                      Box Score
                    </button>
                  </td>
                </tr>
              ))}
              {matches.length === 0 && (
                <tr><td colSpan={5} style={{textAlign: 'center', padding: '2rem'}}>No se han jugado partidos aún.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Box Score Sidebar */}
      {selectedMatch && (
        <div style={{width: '400px', background: '#1a1a2e', border: '1px solid #444', borderRadius: '8px', padding: '1.5rem', height: 'fit-content'}}>
          <h2 style={{marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '0.5rem', textAlign: 'center'}}>
            {teams[selectedMatch.homeTeamId]?.name} {selectedMatch.homeScore} - {selectedMatch.awayScore} {teams[selectedMatch.awayTeamId]?.name}
          </h2>
          
          <h4 style={{color: '#e67e22', borderBottom: '1px solid #333', paddingBottom: '4px'}}>Goles</h4>
          <ul style={{listStyle: 'none', padding: 0, margin: '0 0 1rem 0', fontSize: '14px'}}>
            {selectedMatch.events?.filter(e => e.type === 'goal').map((e, idx) => (
              <li key={idx} style={{marginBottom: '4px'}}>
                ⚽ {e.minute}' - {players[e.playerId]?.name} 
                {e.assistId ? <span style={{color: '#aaa', fontSize: '12px'}}> (Asist: {players[e.assistId]?.name})</span> : ''}
                <span style={{color: '#666', fontSize: '12px', marginLeft: '8px'}}>({teams[e.teamId]?.name})</span>
              </li>
            ))}
            {(!selectedMatch.events || selectedMatch.events.filter(e => e.type === 'goal').length === 0) && (
              <li style={{color: '#888'}}>No hubo goles (o no se registraron).</li>
            )}
          </ul>

          <h4 style={{color: '#eab308', borderBottom: '1px solid #333', paddingBottom: '4px'}}>Tarjetas</h4>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '14px'}}>
            {selectedMatch.events?.filter(e => e.type === 'yellow_card' || e.type === 'red_card').map((e, idx) => (
              <li key={idx} style={{marginBottom: '4px'}}>
                {e.type === 'yellow_card' ? '🟨' : '🟥'} {e.minute}' - {players[e.playerId]?.name}
                <span style={{color: '#666', fontSize: '12px', marginLeft: '8px'}}>({teams[e.teamId]?.name})</span>
              </li>
            ))}
            {(!selectedMatch.events || selectedMatch.events.filter(e => e.type === 'yellow_card' || e.type === 'red_card').length === 0) && (
              <li style={{color: '#888'}}>Sin tarjetas.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
