import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Note } from '../db/db';

export function Notes() {
  const { leagueId } = useParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    loadNotes();
  }, [leagueId]);

  async function loadNotes() {
    if (!leagueId) return;
    const n = await db.notes
      .where('leagueId')
      .equals(Number(leagueId))
      .reverse()
      .toArray();
    setNotes(n);
  }

  const handleSaveNote = async () => {
    if (!leagueId || !newNote.trim()) return;
    
    await db.notes.add({
      leagueId: Number(leagueId),
      entityType: 'general',
      text: newNote.trim(),
      createdAt: Date.now()
    });

    setNewNote('');
    loadNotes();
  };

  const handleDeleteNote = async (id?: number) => {
    if(!id) return;
    await db.notes.delete(id);
    loadNotes();
  };

  return (
    <div className="panel">
      <h2>Notas</h2>
      <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '16px' }}>
        Agrega notas o recordatorios para la liga.
      </p>

      <div style={{ marginBottom: '20px' }}>
        <textarea 
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Escribe una nueva nota..."
          style={{ width: '100%', height: '80px', padding: '8px', borderRadius: '4px', backgroundColor: '#2b2b2b', color: '#fff', border: '1px solid #444', marginBottom: '8px' }}
        />
        <button 
          onClick={handleSaveNote}
          style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
        >
          Guardar Nota
        </button>
      </div>

      {notes.length === 0 ? (
        <p>No tienes notas registradas.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notes.map(n => (
            <div key={n.id} style={{ backgroundColor: '#2b2b2b', padding: '12px', borderRadius: '4px', border: '1px solid #444', position: 'relative' }}>
              <button 
                onClick={() => handleDeleteNote(n.id)}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '18px' }}
                title="Eliminar"
              >
                &times;
              </button>
              <div style={{ whiteSpace: 'pre-wrap', paddingRight: '24px' }}>
                {n.text}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '8px' }}>
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
