import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, type League } from '../db/db';
import { exportDB, importInto } from "dexie-export-import";
import './Home.css';
import { Trash2, Download, Upload } from 'lucide-react';
import { CustomModal } from '../components/common/CustomModal';

export function Home() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [deletingLeagueId, setDeletingLeagueId] = useState<number | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadLeagues();
  }, []);

  async function loadLeagues() {
    const l = await db.leagues.orderBy('lastPlayedAt').reverse().toArray();
    setLeagues(l);
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
      await importInto(db, file, { clearTablesBeforeImport: true });
      await loadLeagues();
    } catch (error) {
      console.error(error);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const confirmDelete = async () => {
    if (!deletingLeagueId) return;
    const id = deletingLeagueId;
    await db.transaction('rw', db.leagues, db.teams, db.players, db.matches, async () => {
      await db.leagues.delete(id);
      await db.teams.where('leagueId').equals(id).delete();
      await db.players.where('leagueId').equals(id).delete();
      await db.matches.where('leagueId').equals(id).delete();
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
        <div className="card new-league-card disabled">
          <h2>New league</h2>
          <p>» Jugadores Reales</p>
        </div>
        <div className="card new-league-card disabled">
          <h2>New league</h2>
          <p>» Personalizada</p>
        </div>
        <div className="card exhibition-card">
          <h2>Exhibition game</h2>
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
              <th>Temporadas</th>
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
                <td>Equipo {l.userTeamId}</td>
                <td>Pretemporada {l.season}</td>
                <td>1</td>
                <td>{l.difficulty}</td>
                <td>Hace un momento</td>
                <td style={{textAlign: 'right'}}>
                  <button className="delete-btn-sm" onClick={() => setDeletingLeagueId(l.id!)} title="Eliminar Liga">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {leagues.length === 0 && (
              <tr><td colSpan={8} style={{textAlign: 'center'}}>No tienes ligas guardadas.</td></tr>
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
