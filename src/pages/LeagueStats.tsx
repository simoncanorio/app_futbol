import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type League } from '../db/db';

export function LeagueStats() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      setLeague(l || null);
      
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      
      if (allTeams.length === 0 || !l) return;
      
      const totalMatchesPlayedByAll = allTeams.reduce((acc, t) => acc + t.wins + t.losses + t.draws, 0);
      const totalMatches = totalMatchesPlayedByAll / 2; // Since each match has 2 teams
      
      const totalGoals = allTeams.reduce((acc, t) => acc + t.goalsFor, 0);
      const totalAttendance = allTeams.reduce((acc, t) => acc + t.attendance, 0);
      const avgOvr = allTeams.reduce((acc, t) => acc + t.overall, 0) / allTeams.length;
      
      const avgAge = allPlayers.reduce((acc, p) => acc + p.age, 0) / (allPlayers.length || 1);
      const totalYellows = allPlayers.reduce((acc, p) => acc + (p.stats?.yellowCards || 0), 0);
      const totalReds = allPlayers.reduce((acc, p) => acc + (p.stats?.redCards || 0), 0);
      
      setStats({
        season: l.season,
        teamsCount: allTeams.length,
        matchesPlayed: totalMatches,
        goalsPerMatch: totalMatches > 0 ? (totalGoals / totalMatches).toFixed(2) : '0.00',
        avgAttendance: Math.round(totalAttendance / allTeams.length).toLocaleString(),
        avgTeamOvr: Math.round(avgOvr),
        avgPlayerAge: avgAge.toFixed(1),
        yellowCards: totalYellows,
        redCards: totalReds,
        totalGoals
      });
    }
    load();
  }, [leagueId]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Estadísticas de Liga (League Stats)</h1>
      </div>
      
      <p style={{color: '#ccc', marginBottom: '1rem', fontSize: '13px'}}>
        Promedios e hitos globales de la liga por temporada.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Temporada</th>
              <th>Equipos</th>
              <th>Partidos (Total)</th>
              <th>Goles (Total)</th>
              <th>Goles/Partido</th>
              <th>Tarjetas Amarillas</th>
              <th>Tarjetas Rojas</th>
              <th>OVR Promedio</th>
              <th>Edad Promedio</th>
              <th>Asistencia Promedio</th>
            </tr>
          </thead>
          <tbody>
            {stats && (
              <tr>
                <td style={{fontWeight: 'bold', color: '#3b82f6'}}>{stats.season}</td>
                <td>{stats.teamsCount}</td>
                <td>{stats.matchesPlayed}</td>
                <td style={{color: '#4ade80'}}>{stats.totalGoals}</td>
                <td>{stats.goalsPerMatch}</td>
                <td style={{color: '#eab308'}}>{stats.yellowCards}</td>
                <td style={{color: '#ef4444'}}>{stats.redCards}</td>
                <td>{stats.avgTeamOvr}</td>
                <td>{stats.avgPlayerAge}</td>
                <td>{stats.avgAttendance}</td>
              </tr>
            )}
            {!stats && (
              <tr><td colSpan={10} style={{textAlign: 'center', padding: '2rem'}}>No hay datos.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
