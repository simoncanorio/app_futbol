import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team, type League } from '../db/db';
import './Standings.css';

export function Standings() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedDomestic, setSelectedDomestic] = useState<string>('LaLiga');
  const [domesticLeagues, setDomesticLeagues] = useState<string[]>([]);
  
  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);

      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      const domLeagues = Array.from(new Set(allTeams.map(t => t.domesticLeague)));
      setDomesticLeagues(domLeagues);
      if(domLeagues.length > 0 && !domLeagues.includes(selectedDomestic)) {
        setSelectedDomestic(domLeagues[0]);
      }

      setTeams(allTeams);
    }
    load();
  }, [leagueId]);

  const displayedTeams = teams
    .filter(t => t.domesticLeague === selectedDomestic)
    .sort((a, b) => b.wins - a.wins || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));

  return (
    <div className="page-container standings-page">
      <div className="page-header">
        <h1>Standings</h1>
        <div className="header-controls">
          <select 
            className="bb-select" 
            value={selectedDomestic} 
            onChange={(e) => setSelectedDomestic(e.target.value)}
          >
            {domesticLeagues.map(dl => (
              <option key={dl} value={dl}>{dl}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="standings-content">
        <table className="table-container bb-table standings-table">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GC</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {displayedTeams.map((t, i) => {
              const pos = i + 1;
              let rowClass = '';
              let mark = '';
              if (pos <= 4) { rowClass = 'champions-pos'; mark = 'c'; }
              else if (pos <= 6) { rowClass = 'europa-pos'; mark = 'e'; }
              else if (pos >= displayedTeams.length - 2) { rowClass = 'relegation-pos'; mark = 'r'; }

              const pts = (t.wins * 3) + t.draws;
              const gd = t.goalsFor - t.goalsAgainst;

              return (
                <tr key={t.id} className={rowClass}>
                  <td>
                     {pos} {mark && <span className="pos-mark">{mark}</span>}
                     <span className="team-name">{t.name}</span>
                  </td>
                  <td>{t.wins}</td>
                  <td>{t.draws}</td>
                  <td>{t.losses}</td>
                  <td>{t.goalsFor}</td>
                  <td>{t.goalsAgainst}</td>
                  <td>{gd > 0 ? `+${gd}` : gd}</td>
                  <td style={{fontWeight: 'bold'}}>{pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="standings-legend">
          <p>c - Clasificado para Champions League</p>
          <p>e - Clasificado para Europa League</p>
          <p>r - Zona de Descenso</p>
        </div>
      </div>
    </div>
  );
}
