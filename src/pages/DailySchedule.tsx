import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Match, type Team, type League } from '../db/db';
import { advanceWeek } from '../engine/gameLoop';
import './DailySchedule.css';

interface MatchView extends Match {
  homeName: string;
  awayName: string;
  homeOvr: number;
  awayOvr: number;
  homeScorer: string; // Mockup
  awayScorer: string; // Mockup
}

export function DailySchedule() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [matches, setMatches] = useState<MatchView[]>([]);

  const loadMatches = async () => {
    const lid = Number(leagueId);
    const l = await db.leagues.get(lid);
    if(!l) return;
    setLeague(l);

    // Get last week's matches
    const recentMatches = await db.matches
      .where('leagueId')
      .equals(lid)
      .reverse()
      .limit(20) // About a week's worth of matches (2 leagues * 10 matches)
      .toArray();

    if(recentMatches.length === 0) return;

    const teamIds = new Set<number>();
    recentMatches.forEach(m => { teamIds.add(m.homeTeamId); teamIds.add(m.awayTeamId); });
    
    const teams = await db.teams.where('id').anyOf([...teamIds]).toArray();
    const teamMap = new Map(teams.map(t => [t.id, t]));

    const mockScorers = ['J. Pérez', 'L. Messi (regen)', 'C. Ronaldo (regen)', 'K. Mbappé', 'E. Haaland'];

    const views: MatchView[] = recentMatches.map(m => {
      const h = teamMap.get(m.homeTeamId)!;
      const a = teamMap.get(m.awayTeamId)!;
      return {
        ...m,
        homeName: h.name,
        awayName: a.name,
        homeOvr: h.overall,
        awayOvr: a.overall,
        homeScorer: m.homeScore > 0 ? mockScorers[Math.floor(Math.random() * mockScorers.length)] : '',
        awayScorer: m.awayScore > 0 ? mockScorers[Math.floor(Math.random() * mockScorers.length)] : '',
      }
    });

    setMatches(views);
  };

  useEffect(() => {
    loadMatches();
  }, [leagueId]);

  const handleSimulate = async () => {
    if(!leagueId) return;
    await advanceWeek(Number(leagueId));
    loadMatches();
  };

  return (
    <div className="page-container ds-page">
      <div className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Calendario Diario</h1>
        <div>
          <button className="play-btn-lg" onClick={handleSimulate}>Simular Semana</button>
        </div>
      </div>

      <div className="ds-grid">
        {matches.map(m => (
          <div key={m.id} className="match-card">
            <div className="mc-left">
              <div className="mc-team">
                <div className="mc-team-info">
                  <span className="mc-name" style={{color: m.homeScore > m.awayScore ? '#fff' : '#aaa', fontWeight: m.homeScore > m.awayScore ? 'bold' : 'normal'}}>{m.homeName}</span>
                  <span className="mc-ovr">{m.homeOvr} OVR</span>
                </div>
                <div className="mc-score">{m.homeScore}</div>
              </div>
              <div className="mc-team">
                <div className="mc-team-info">
                  <span className="mc-name" style={{color: m.awayScore > m.homeScore ? '#fff' : '#aaa', fontWeight: m.awayScore > m.homeScore ? 'bold' : 'normal'}}>{m.awayName}</span>
                  <span className="mc-ovr">{m.awayOvr} OVR</span>
                </div>
                <div className="mc-score">{m.awayScore}</div>
              </div>
            </div>
            
            <div className="mc-right">
              {m.homeScorer && <div className="mc-scorer">⚽ {m.homeScorer} (H)</div>}
              {m.awayScorer && <div className="mc-scorer">⚽ {m.awayScorer} (A)</div>}
            </div>
            
            <div className="mc-boxscore">
               Box<br/>Score
            </div>
          </div>
        ))}
        {matches.length === 0 && (
          <div style={{color: '#aaa', marginTop: '2rem'}}>Aún no hay partidos jugados. Haz clic en "Simular Semana".</div>
        )}
      </div>
    </div>
  );
}
