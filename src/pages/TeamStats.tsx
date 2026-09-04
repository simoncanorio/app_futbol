import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Team, type League } from '../db/db';

export function TeamStats() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [sortKey, setSortKey] = useState<string>('pts');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      setLeague(l || null);
      
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      setTeams(allTeams);
    }
    load();
  }, [leagueId]);

  const stats = teams.map(t => {
    const pts = (t.wins * 3) + (t.draws * 1);
    const gd = t.goalsFor - t.goalsAgainst;
    const gp = t.wins + t.draws + t.losses;
    const winPct = gp > 0 ? (t.wins / gp).toFixed(3) : '.000';
    return { ...t, pts, gd, gp, winPct };
  });

  stats.sort((a, b) => {
    if (sortKey === 'pts') return b.pts - a.pts || b.gd - a.gd;
    if (sortKey === 'gp') return b.gp - a.gp;
    if (sortKey === 'w') return b.wins - a.wins;
    if (sortKey === 'l') return b.losses - a.losses;
    if (sortKey === 'd') return b.draws - a.draws;
    if (sortKey === 'gf') return b.goalsFor - a.goalsFor;
    if (sortKey === 'ga') return b.goalsAgainst - a.goalsAgainst;
    if (sortKey === 'gd') return b.gd - a.gd;
    if (sortKey === 'ovr') return b.overall - a.overall;
    if (sortKey === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const SortHeader = ({ label, sortValue }: { label: string, sortValue: string }) => (
    <th 
      onClick={() => setSortKey(sortValue)} 
      style={{cursor: 'pointer', color: sortKey === sortValue ? '#3b82f6' : 'inherit', textDecoration: sortKey === sortValue ? 'underline' : 'none'}}
      title="Click to sort"
    >
      {label}
    </th>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Estadísticas de Equipo (Team Stats)</h1>
      </div>
      
      <p style={{color: '#ccc', marginBottom: '1rem', fontSize: '13px'}}>
        Haz clic en los encabezados de las columnas para ordenar. Tu equipo se destaca en <span style={{color: '#3b82f6'}}>azul</span>.
      </p>

      <div className="standings-content" style={{overflowX: 'auto'}}>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>#</th>
              <SortHeader label="Team" sortValue="name" />
              <SortHeader label="GP" sortValue="gp" />
              <SortHeader label="W" sortValue="w" />
              <SortHeader label="D" sortValue="d" />
              <SortHeader label="L" sortValue="l" />
              <SortHeader label="W%" sortValue="winpct" />
              <SortHeader label="GF" sortValue="gf" />
              <SortHeader label="GA" sortValue="ga" />
              <SortHeader label="GD" sortValue="gd" />
              <SortHeader label="PTS" sortValue="pts" />
              <SortHeader label="OVR" sortValue="ovr" />
            </tr>
          </thead>
          <tbody>
            {stats.map((t, idx) => {
              const isMyTeam = league && t.id === league.userTeamId;
              return (
                <tr key={t.id} style={{background: isMyTeam ? 'rgba(59, 130, 246, 0.1)' : 'transparent'}}>
                  <td style={{color: '#888'}}>{idx + 1}</td>
                  <td style={{fontWeight: 'bold'}}>
                    <Link to={`/l/${leagueId}/team/${t.id}`} style={{color: isMyTeam ? '#3b82f6' : 'white', textDecoration: 'none'}}>
                      {t.name}
                    </Link>
                  </td>
                  <td>{t.gp}</td>
                  <td>{t.wins}</td>
                  <td>{t.draws}</td>
                  <td>{t.losses}</td>
                  <td>{t.winPct}</td>
                  <td>{t.goalsFor}</td>
                  <td>{t.goalsAgainst}</td>
                  <td style={{color: t.gd > 0 ? '#4ade80' : t.gd < 0 ? '#ef4444' : 'inherit'}}>{t.gd > 0 ? `+${t.gd}` : t.gd}</td>
                  <td style={{fontWeight: 'bold', color: '#e67e22'}}>{t.pts}</td>
                  <td>{t.overall}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
