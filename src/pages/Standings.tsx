import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Team, type League, type Match } from '../db/db';
import { sortStandingsWithTiebreakers } from '../utils/standingsUtils';
import './Standings.css';

export function Standings() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [playedMatches, setPlayedMatches] = useState<Match[]>([]);
  const [selectedDomestic, setSelectedDomestic] = useState<string>('LaLiga');
  const [domesticLeagues, setDomesticLeagues] = useState<string[]>([]);
  
  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);

      const [allTeams, allPlayed] = await Promise.all([
        db.teams.where('leagueId').equals(lid).toArray(),
        db.matches.where('leagueId').equals(lid).filter(m => m.type === 'league' && m.isPlayed).toArray()
      ]);
      setPlayedMatches(allPlayed);
      const domLeagues = Array.from(new Set(allTeams.map(t => t.domesticLeague)));
      setDomesticLeagues(domLeagues);
      if (l.userTeamId) {
        const uTeam = allTeams.find(t => t.id === l.userTeamId);
        if (uTeam?.domesticLeague) {
          setSelectedDomestic(uTeam.domesticLeague);
        } else if (domLeagues.length > 0) {
          setSelectedDomestic(domLeagues[0]);
        }
      } else if (domLeagues.length > 0 && !domLeagues.includes(selectedDomestic)) {
        setSelectedDomestic(domLeagues[0]);
      }

      setTeams(allTeams);
    }
    load();
  }, [leagueId]);

  const displayedTeams = sortStandingsWithTiebreakers(
    teams.filter(t => t.domesticLeague === selectedDomestic),
    playedMatches,
    selectedDomestic
  );

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
              <th>#</th>
              <th>Equipo</th>
              <th>PJ</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>PTS</th>
              <th>Últimos 5</th>
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

              const isUserTeam = league && t.id === league.userTeamId;
              const gp = t.wins + t.draws + t.losses;
              const pts = (t.wins * 3) + t.draws;
              const gd = t.goalsFor - t.goalsAgainst;
              const recentForm = (t.form || []).slice(-5);

              return (
                <tr key={t.id} className={rowClass} style={isUserTeam ? { background: 'rgba(56, 189, 248, 0.14)' } : undefined}>
                  <td style={{ fontWeight: 'bold', width: '48px' }}>
                    {pos} {mark && <span className="pos-mark">{mark}</span>}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <Link to={`/l/${leagueId}/team/${t.id}`} className="team-name" style={{color: isUserTeam ? '#38bdf8' : 'inherit', textDecoration: 'none', fontWeight: 'bold'}}>
                        {t.name} {isUserTeam && <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>(Tú)</span>}
                      </Link>
                      {t.coach?.name && (
                        <small style={{ color: '#64748b', fontSize: '0.72rem' }}>DT: {t.coach.name}</small>
                      )}
                    </div>
                  </td>
                  <td>{gp}</td>
                  <td>{t.wins}</td>
                  <td>{t.draws}</td>
                  <td>{t.losses}</td>
                  <td>{t.goalsFor}</td>
                  <td>{t.goalsAgainst}</td>
                  <td style={{ color: gd > 0 ? '#10b981' : gd < 0 ? '#ef4444' : 'inherit', fontWeight: 600 }}>{gd > 0 ? `+${gd}` : gd}</td>
                  <td style={{fontWeight: 'bold', color: '#fbbf24'}}>{pts}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
                      {recentForm.length > 0 ? recentForm.map((f, fIdx) => (
                        <span
                          key={fIdx}
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.68rem',
                            fontWeight: 'bold',
                            background: f === 'W' ? '#10b981' : f === 'D' ? '#64748b' : '#ef4444',
                            color: '#fff'
                          }}
                        >
                          {f === 'W' ? 'V' : f === 'D' ? 'E' : 'D'}
                        </span>
                      )) : <span style={{ color: '#64748b', fontSize: '0.75rem' }}>-</span>}
                    </div>
                  </td>
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
