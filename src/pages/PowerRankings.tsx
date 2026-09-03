import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team } from '../db/db';

interface PowerRankingRow {
  team: Team;
  powerScore: number;
}

export function PowerRankings() {
  const { leagueId } = useParams();
  const [rankings, setRankings] = useState<PowerRankingRow[]>([]);

  useEffect(() => {
    async function loadData() {
      if (!leagueId) return;
      const teams = await db.teams.where('leagueId').equals(Number(leagueId)).toArray();
      
      const rows = teams.map(team => {
        const matchesPlayed = team.wins + team.draws + team.losses;
        const winRate = matchesPlayed > 0 ? (team.wins + team.draws * 0.5) / matchesPlayed : 0.5;
        const goalDiff = team.goalsFor - team.goalsAgainst;
        
        // Power Score formula: Base overall + form adjustment + goal diff adjustment
        const powerScore = team.overall + (winRate * 20 - 10) + (goalDiff * 0.5);
        
        return {
          team,
          powerScore
        };
      });

      rows.sort((a, b) => b.powerScore - a.powerScore);
      setRankings(rows);
    }

    loadData();
  }, [leagueId]);

  return (
    <div className="panel">
      <h2>Power Rankings</h2>
      <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '16px' }}>
        El Power Ranking es una combinación del rendimiento reciente, el margen de goles y la valoración general del equipo.
      </p>

      <table className="table-container">
        <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>Liga Doméstica</th>
            <th>Rating (OVR)</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>GF</th>
            <th>GC</th>
            <th>DIF</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((row, index) => (
            <tr key={row.team.id}>
              <td>{index + 1}</td>
              <td>{row.team.name}</td>
              <td>{row.team.domesticLeague}</td>
              <td>{row.team.overall}</td>
              <td>{row.team.wins}</td>
              <td>{row.team.draws}</td>
              <td>{row.team.losses}</td>
              <td>{row.team.goalsFor}</td>
              <td>{row.team.goalsAgainst}</td>
              <td style={{ color: (row.team.goalsFor - row.team.goalsAgainst) > 0 ? '#4caf50' : ((row.team.goalsFor - row.team.goalsAgainst) < 0 ? '#f44336' : 'inherit') }}>
                {(row.team.goalsFor - row.team.goalsAgainst) > 0 ? '+' : ''}{row.team.goalsFor - row.team.goalsAgainst}
              </td>
            </tr>
          ))}
          {rankings.length === 0 && (
            <tr>
              <td colSpan={10} style={{ textAlign: 'center' }}>No hay datos disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
