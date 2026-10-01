import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, type League } from '../db/db';
import { exportDB, importInto } from "dexie-export-import";
import './Home.css';
import { Trash2, Download, Upload } from 'lucide-react';
import { CustomModal } from '../components/common/CustomModal';

export function Home() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teamNamesMap, setTeamNamesMap] = useState<Map<number, string>>(new Map());
  const [deletingLeagueId, setDeletingLeagueId] = useState<number | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadLeagues();
  }, []);

  async function loadLeagues() {
    const l = await db.leagues.orderBy('lastPlayedAt').reverse().toArray();
    setLeagues(l);

    const teamIds = l.map(x => x.userTeamId).filter(Boolean) as number[];
    if (teamIds.length > 0) {
      const teams = await db.teams.where('id').anyOf(teamIds).toArray();
      setTeamNamesMap(new Map(teams.map(t => [t.id!, t.name])));
    }
  }

  function formatLastPlayed(ts: number) {
    if (!ts) return 'Reciente';
    const diffMin = Math.floor((Date.now() - ts) / 60000);
    if (diffMin < 2) return 'Hace un momento';
    if (diffMin < 60) return `Hace ${diffMin} min`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `Hace ${diffHours} h`;
    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays} d`;
  }

  const handleExport = async () => {
    try {
      const blob = await exportDB(db, { prettyJson: true });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FootballGM_Save_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      try {
        const parsed = JSON.parse(text);
        if (parsed && parsed.league && parsed.teams && parsed.players) {
          await db.leagues.put(parsed.league);
          await db.teams.bulkPut(parsed.teams);
          await db.players.bulkPut(parsed.players);
          if (parsed.matches) await db.matches.bulkPut(parsed.matches);
          if (parsed.history) await db.history.bulkPut(parsed.history);
          if (parsed.transactions) await db.transactions.bulkPut(parsed.transactions);
          if (parsed.notes) await db.notes.bulkPut(parsed.notes);
          if (parsed.scoutMissions) await db.scoutMissions.bulkPut(parsed.scoutMissions);
          if (parsed.gmHistory) await db.gmHistory.bulkPut(parsed.gmHistory);
          await loadLeagues();
          alert('¡Partida importada con éxito!');
          return;
        }
      } catch {
        // Not a single-league json save, fallback to full Dexie import
      }
      await importInto(db, file, { clearTablesBeforeImport: true });
      await loadLeagues();
      alert('¡Base de datos importada con éxito!');
    } catch (error) {
      console.error(error);
      alert('Error al importar la partida o base de datos.');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const confirmDelete = async () => {
    if (!deletingLeagueId) return;
    const id = deletingLeagueId;
    await db.transaction('rw', [db.leagues, db.teams, db.players, db.matches, db.history, db.transactions, db.notes, db.scoutMissions, db.gmHistory], async () => {
      await db.leagues.delete(id);
      await db.teams.where('leagueId').equals(id).delete();
      await db.players.where('leagueId').equals(id).delete();
      await db.matches.where('leagueId').equals(id).delete();
      await db.history.where('leagueId').equals(id).delete();
      await db.transactions.where('leagueId').equals(id).delete();
      await db.notes.where('leagueId').equals(id).delete();
      await db.scoutMissions.where('leagueId').equals(id).delete();
      await db.gmHistory.where('leagueId').equals(id).delete();
    });
    setDeletingLeagueId(null);
    await loadLeagues();
  };

  return (
    <div className="home-container">
      <div className="hero-cards">
        <div className="card new-league-card" onClick={() => navigate('/new_league')}>
          <h2>New league</h2>
          <p>» Jugadores Ficticios</p>
        </div>
        <div className="card new-league-card active-card" onClick={() => navigate('/new_league')}>
          <h2>New league</h2>
          <p>» Jugadores Reales (EA FC & TM)</p>
        </div>
        <div className="card new-league-card" onClick={() => navigate('/new_league')}>
          <h2>New league</h2>
          <p>» Eras Históricas</p>
        </div>
        <div className="card exhibition-card" onClick={() => navigate('/new_league')}>
          <h2>Partida Rápida</h2>
        </div>
      </div>

      <div className="leagues-header">
         <h2>Partidas Guardadas</h2>
         <div className="leagues-actions">
           <button className="tool-btn" onClick={handleExport}><Download size={14}/> Exportar Ligas</button>
           <button className="tool-btn" onClick={() => fileInputRef.current?.click()}><Upload size={14}/> Importar Ligas</button>
           <input type="file" ref={fileInputRef} style={{display: 'none'}} accept=".json" onChange={handleImport} />
         </div>
      </div>

      <div className="leagues-table-container">
        <table className="table-container bb-table">
          <thead>
            <tr>
              <th></th>
              <th>Liga</th>
              <th>Equipo</th>
              <th>Fase</th>
              <th>Dificultad</th>
              <th>Última vez jugado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leagues.map(l => (
              <tr key={l.id}>
                <td>
                  <button className="play-btn-sm" onClick={() => navigate(`/l/${l.id}`)}>Play</button>
                </td>
                <td><span className="league-name">{l.name}</span></td>
                <td><strong>{l.userTeamId ? (teamNamesMap.get(l.userTeamId) || `Equipo ${l.userTeamId}`) : 'Sin Club'}</strong></td>
                <td>{l.currentWeek === 1 ? `Pretemporada (${l.season})` : `Jornada ${l.currentWeek} (${l.season})`}</td>
                <td>{l.difficulty}</td>
                <td>{formatLastPlayed(l.lastPlayedAt)}</td>
                <td style={{textAlign: 'right'}}>
                  <button className="delete-btn-sm" onClick={() => setDeletingLeagueId(l.id!)} title="Eliminar Liga">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {leagues.length === 0 && (
              <tr><td colSpan={7} style={{textAlign: 'center', padding: '2rem'}}>No tienes ligas guardadas. ¡Crea una nueva liga arriba para comenzar!</td></tr>
            )}
          </tbody>
        </table>
      </div>


      {deletingLeagueId && (
        <CustomModal
          isOpen={true}
          title="Eliminar Liga Guardada"
          message="¿Estás seguro de que quieres eliminar esta liga? Se borrarán todos los datos irremediablemente."
          confirmText="Sí, Eliminar Liga"
          cancelText="Cancelar"
          type="danger"
          onConfirm={confirmDelete}
          onCancel={() => setDeletingLeagueId(null)}
        />
      )}
    </div>
  );
}
