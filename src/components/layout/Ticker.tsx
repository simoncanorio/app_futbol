import React, { useEffect, useState } from 'react';
import { db, type Match, type Team } from '../../db/db';
import './Ticker.css';

interface TickerProps {
  leagueId?: number;
  season?: number;
}

interface MatchDisplay {
  id: number;
  home: string;
  away: string;
  hScore: number;
  aScore: number;
}

export function Ticker({ leagueId, season }: TickerProps) {
  const [matches, setMatches] = useState<MatchDisplay[]>([]);

  useEffect(() => {
    async function loadLatestMatches() {
      if(!leagueId) return;
      // Get the latest matches for the ticker
      const latestMatches = await db.matches
        .where('leagueId')
        .equals(leagueId)
        .reverse()
        .limit(100)
        .toArray();

      if(latestMatches.length === 0) return;

      const teamIds = new Set<number>();
      latestMatches.forEach(m => {
        teamIds.add(m.homeTeamId);
        teamIds.add(m.awayTeamId);
      });

      const teams = await db.teams.where('id').anyOf([...teamIds]).toArray();
      const teamMap = new Map(teams.map(t => [t.id, t.name]));

      const displayData: MatchDisplay[] = latestMatches.map(m => ({
        id: m.id!,
        home: teamMap.get(m.homeTeamId)?.substring(0,3).toUpperCase() || 'UNK',
        away: teamMap.get(m.awayTeamId)?.substring(0,3).toUpperCase() || 'UNK',
        hScore: m.homeScore,
        aScore: m.awayScore
      }));

      setMatches(displayData);
    }

    loadLatestMatches();
    
    // Set up an interval or a custom event to refresh the ticker.
    // Since IndexedDB doesn't have live bindings here, we poll every 2 seconds if leagueId exists.
    const interval = setInterval(loadLatestMatches, 2000);
    return () => clearInterval(interval);
  }, [leagueId, season]);

  if(!leagueId || matches.length === 0) return null;

  return (
    <div className="ticker-wrapper">
      <div className="ticker-scroll">
        {matches.map(m => (
          <div key={m.id} className="ticker-item">
            <span className={m.hScore > m.aScore ? 'winner' : ''}>{m.home} {m.hScore}</span>
            <span className="ticker-sep">-</span>
            <span className={m.aScore > m.hScore ? 'winner' : ''}>{m.aScore} {m.away}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
