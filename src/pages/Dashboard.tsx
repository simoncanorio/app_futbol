import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type League, type Team, type Player } from '../db/db';
import './Dashboard.css';

export function Dashboard() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [standings, setStandings] = useState<Team[]>([]);
  const [starters, setStarters] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const l = await db.leagues.get(lid);
      if(!l) return;
      setLeague(l);

      if(l.userTeamId) {
        const t = await db.teams.get(l.userTeamId);
        setTeam(t!);

        const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
        allTeams.sort((a, b) => b.wins - a.wins || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));
        setStandings(allTeams);

        const players = await db.players.where('teamId').equals(l.userTeamId).toArray();
        players.sort((a, b) => b.overall - a.overall);
        setStarters(players.slice(0, 11)); 
      }
      setLoading(false);
    }
    load();
  }, [leagueId]);

  if(loading) return <div style={{padding: '2rem'}}>Cargando...</div>;

  const teamPosition = standings.findIndex(t => t.id === team?.id) + 1;

  return (
    <div className="dashboard-container">
      <div className="dash-header">
        <h1>{team?.name} Dashboard <span style={{fontSize: '0.8rem', color: '#888'}}>⚽</span></h1>
      </div>

      <div className="dash-grid">
        <div className="col-standings">
          <table className="table-container bb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((t, i) => {
                const pts = (t.wins * 3) + t.draws;
                return (
                  <tr key={t.id} style={{fontWeight: t.id === team?.id ? 'bold' : 'normal', background: t.id === team?.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent'}}>
                    <td style={{color: '#888'}}>{i + 1}</td>
                    <td>
                      <Link to={`/l/${leagueId}/team/${t.id}`} style={{color: t.id === team?.id ? '#3b82f6' : '#e67e22', textDecoration: 'none'}}>
                        {t.name.substring(0,10)}
                      </Link>
                    </td>
                    <td>{t.wins}</td>
                    <td>{t.draws}</td>
                    <td>{t.losses}</td>
                    <td style={{fontWeight: 'bold', color: '#eab308'}}>{pts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to={`/l/${leagueId}/standings`} className="link-more" style={{display: 'block', textDecoration: 'none'}}>» Clasificación Completa</Link>
        </div>

        <div className="col-center">
          <div className="record-banner">
            <h2>{team?.wins}-{team?.draws}-{team?.losses}</h2>
            <h3>{teamPosition}º en la Liga</h3>
          </div>

          <div className="stats-grid">
            <div>
              <h4>Líderes del Equipo</h4>
              <ul className="leader-list">
                <li><span className="name">{starters[0]?.name}</span> <span className="stat">{starters[0]?.stats.goals} gol</span></li>
                <li><span className="name">{starters[1]?.name}</span> <span className="stat">{starters[1]?.stats.goals} gol</span></li>
                <li><span className="name">{starters[2]?.name}</span> <span className="stat">{starters[2]?.stats.assists} ast</span></li>
              </ul>
              <Link to={`/l/${leagueId}/roster`} className="link-more" style={{display: 'block', textDecoration: 'none'}}>» Plantilla Completa</Link>
            </div>
            
            <div>
              <h4>Estadísticas de Equipo</h4>
              <ul className="leader-list">
                <li>Goles: {team?.goalsFor} (1º)</li>
                <li>Contra: {team?.goalsAgainst} (3º)</li>
                <li>Dif: {team!.goalsFor - team!.goalsAgainst}</li>
              </ul>
              <Link to={`/l/${leagueId}/team_stats`} className="link-more" style={{display: 'block', textDecoration: 'none'}}>» Estadísticas del Equipo</Link>
            </div>

            <div>
              <h4>Finanzas</h4>
              <ul className="leader-list">
                <li>Presupuesto: ${(team!.budget / 1000000).toFixed(2)}M</li>
                <li>Ingresos (YTD): $0</li>
                <li>Beneficio (YTD): $0</li>
                <li>Efectivo: $10M</li>
              </ul>
              <Link to={`/l/${leagueId}/finances`} className="link-more" style={{display: 'block', textDecoration: 'none'}}>» Finanzas del Equipo</Link>
            </div>
          </div>
        </div>

        <div className="col-right">
           <div className="panel" style={{backgroundColor: '#111', padding: '1rem', border: '1px solid #333'}}>
              <h4 style={{margin: '0 0 10px 0', color: '#ccc'}}>Titulares de la Liga</h4>
              <p style={{fontSize: '0.85rem', margin: 0, color: '#999'}}>¡Bienvenido a tu nueva liga!</p>
           </div>
        </div>
      </div>

      <div className="starting-lineup">
        <h3>Once Inicial</h3>
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Pos</th>
              <th>Edad</th>
              <th>Ovr</th>
              <th>Pot</th>
              <th>Contrato</th>
              <th>G</th>
              <th>A</th>
            </tr>
          </thead>
          <tbody>
            {starters.map(p => (
              <tr key={p.id}>
                <td>
                  <Link to={`/l/${leagueId}/player/${p.id}`} style={{color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold'}}>
                    {p.name}
                  </Link>
                </td>
                <td>{p.position}</td>
                <td>{p.age}</td>
                <td>{p.overall}</td>
                <td style={{color: '#28a745'}}>{p.potential}</td>
                <td>${(p.contract / 1000).toFixed(0)}k</td>
                <td>{p.stats.goals}</td>
                <td>{p.stats.assists}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
