import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { TopNavbar } from './components/layout/TopNavbar';
import { Sidebar } from './components/layout/Sidebar';
import { Ticker } from './components/layout/Ticker';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { NewLeague } from './pages/NewLeague';
import { Standings } from './pages/Standings';
import { Playoffs } from './pages/Playoffs';
import { DailySchedule } from './pages/DailySchedule';
import { Schedule } from './pages/Schedule';
import { Roster } from './pages/Roster';
import { Finances } from './pages/Finances';
import { History } from './pages/History';
import { PowerRankings } from './pages/PowerRankings';
import { Transactions } from './pages/Transactions';
import { Notes } from './pages/Notes';
import { FreeAgents } from './pages/FreeAgents';
import { Trades } from './pages/Trades';
import { ComparePlayers } from './pages/ComparePlayers';
import { WatchList } from './pages/WatchList';
import { HallOfFame } from './pages/HallOfFame';
import { Draft } from './pages/Draft';
import { YouthAcademy } from './pages/YouthAcademy';
import { GameLog } from './pages/GameLog';
import { LeagueLeaders } from './pages/LeagueLeaders';
import { PlayerRatings } from './pages/PlayerRatings';
import { PlayerStats } from './pages/PlayerStats';
import { PlayerBios } from './pages/PlayerBios';
import { PlayerGraphs } from './pages/PlayerGraphs';
import { AdvancedSearch } from './pages/AdvancedSearch';
import { TeamStats } from './pages/TeamStats';
import { TeamGraphs } from './pages/TeamGraphs';
import { LeagueStats } from './pages/LeagueStats';
import { Awards } from './pages/Awards';
import { News } from './pages/News';
import { SocialMedia } from './pages/SocialMedia';
import { Press } from './pages/Press';
import { Relations } from './pages/Relations';
import { PlayerProfile } from './pages/PlayerProfile';
import { Tactics } from './pages/Tactics';
import { GMHistory } from './pages/GMHistory';
import { SeasonSummary } from './pages/SeasonSummary';
import './App.css';

function LeagueLayout({ children }: { children: React.ReactNode }) {
  const { leagueId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <TopNavbar 
        leagueId={Number(leagueId)} 
        season={2026} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <div className="app-layout">
        <Sidebar leagueId={Number(leagueId)} isOpen={isSidebarOpen} />
        <div className="main-wrapper">
          <Ticker leagueId={Number(leagueId)} season={2026} />
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavbar />
      <div className="app-layout">
        <div className="main-wrapper">
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/new_league" element={<DefaultLayout><NewLeague /></DefaultLayout>} />
        <Route path="/l/:leagueId" element={<LeagueLayout><Dashboard /></LeagueLayout>} />
        <Route path="/l/:leagueId/standings" element={<LeagueLayout><Standings /></LeagueLayout>} />
        <Route path="/l/:leagueId/season_summary" element={<LeagueLayout><SeasonSummary /></LeagueLayout>} />
        <Route path="/l/:leagueId/playoffs" element={<LeagueLayout><Playoffs /></LeagueLayout>} />
        <Route path="/l/:leagueId/daily_schedule" element={<LeagueLayout><DailySchedule /></LeagueLayout>} />
        <Route path="/l/:leagueId/schedule" element={<LeagueLayout><Schedule /></LeagueLayout>} />
        <Route path="/l/:leagueId/roster" element={<LeagueLayout><Roster /></LeagueLayout>} />
        <Route path="/l/:leagueId/team/:teamId" element={<LeagueLayout><Roster /></LeagueLayout>} />
        <Route path="/l/:leagueId/finances" element={<LeagueLayout><Finances /></LeagueLayout>} />
        <Route path="/l/:leagueId/history" element={<LeagueLayout><History /></LeagueLayout>} />
        <Route path="/l/:leagueId/power_rankings" element={<LeagueLayout><PowerRankings /></LeagueLayout>} />
        <Route path="/l/:leagueId/transactions" element={<LeagueLayout><Transactions /></LeagueLayout>} />
        <Route path="/l/:leagueId/notes" element={<LeagueLayout><Notes /></LeagueLayout>} />
        <Route path="/l/:leagueId/tactics" element={<LeagueLayout><Tactics /></LeagueLayout>} />
        <Route path="/l/:leagueId/gm_history" element={<LeagueLayout><GMHistory /></LeagueLayout>} />
        <Route path="/l/:leagueId/free_agents" element={<LeagueLayout><FreeAgents /></LeagueLayout>} />
        <Route path="/l/:leagueId/trades" element={<LeagueLayout><Trades /></LeagueLayout>} />
        <Route path="/l/:leagueId/compare_players" element={<LeagueLayout><ComparePlayers /></LeagueLayout>} />
        <Route path="/l/:leagueId/watch_list" element={<LeagueLayout><WatchList /></LeagueLayout>} />
        <Route path="/l/:leagueId/hall_of_fame" element={<LeagueLayout><HallOfFame /></LeagueLayout>} />
        <Route path="/l/:leagueId/draft" element={<LeagueLayout><Draft /></LeagueLayout>} />
        <Route path="/l/:leagueId/youth_academy" element={<LeagueLayout><YouthAcademy /></LeagueLayout>} />
        
        <Route path="/l/:leagueId/game_log" element={<LeagueLayout><GameLog /></LeagueLayout>} />
        <Route path="/l/:leagueId/leaders" element={<LeagueLayout><LeagueLeaders /></LeagueLayout>} />
        <Route path="/l/:leagueId/player_ratings" element={<LeagueLayout><PlayerRatings /></LeagueLayout>} />
        <Route path="/l/:leagueId/player_stats" element={<LeagueLayout><PlayerStats /></LeagueLayout>} />
        <Route path="/l/:leagueId/player_bios" element={<LeagueLayout><PlayerBios /></LeagueLayout>} />
        <Route path="/l/:leagueId/player/:playerId" element={<LeagueLayout><PlayerProfile /></LeagueLayout>} />
        <Route path="/l/:leagueId/player_graphs" element={<LeagueLayout><PlayerGraphs /></LeagueLayout>} />
        <Route path="/l/:leagueId/advanced_search" element={<LeagueLayout><AdvancedSearch /></LeagueLayout>} />
        <Route path="/l/:leagueId/team_stats" element={<LeagueLayout><TeamStats /></LeagueLayout>} />
        <Route path="/l/:leagueId/team_graphs" element={<LeagueLayout><TeamGraphs /></LeagueLayout>} />
        <Route path="/l/:leagueId/league_stats" element={<LeagueLayout><LeagueStats /></LeagueLayout>} />
        <Route path="/l/:leagueId/awards" element={<LeagueLayout><Awards /></LeagueLayout>} />
        <Route path="/l/:leagueId/news" element={<LeagueLayout><News /></LeagueLayout>} />
        <Route path="/l/:leagueId/social_media" element={<LeagueLayout><SocialMedia /></LeagueLayout>} />
        <Route path="/l/:leagueId/press" element={<LeagueLayout><Press /></LeagueLayout>} />
        <Route path="/l/:leagueId/relations" element={<LeagueLayout><Relations /></LeagueLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
