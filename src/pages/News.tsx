import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';

export function News() {
  const { leagueId } = useParams();
  const [news, setNews] = useState<{ title: string, body: string, date: string, category: string }[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      
      if (allPlayers.length > 0 && allTeams.length > 0) {
        const topPlayer = allPlayers.sort((a,b) => b.overall - a.overall)[0];
        const topTeam = allTeams.sort((a,b) => b.overall - a.overall)[0];
        const randomTeam = allTeams[Math.floor(Math.random() * allTeams.length)];
        
        setNews([
          {
            title: `¡${topPlayer.name} está imparable!`,
            body: `El rendimiento del jugador en los últimos partidos ha sido excepcional, los analistas lo consideran un fuerte candidato al Balón de Oro de esta temporada.`,
            date: 'Hace 2 horas',
            category: 'Jugadores'
          },
          {
            title: `Rumores en ${randomTeam.name}`,
            body: `Fuentes cercanas al club aseguran que la directiva está preparando un cambio táctico importante para las próximas jornadas. ¿Será suficiente para escalar posiciones?`,
            date: 'Hace 5 horas',
            category: 'Equipos'
          },
          {
            title: `¿Es ${topTeam.name} el mejor equipo de la liga?`,
            body: `Con una valoración promedio por las nubes, la plantilla de ${topTeam.name} parece no tener rival en el campo de juego. Los fanáticos están eufóricos.`,
            date: 'Ayer',
            category: 'Análisis'
          },
          {
            title: `Mercado de fichajes: Se acercan movimientos`,
            body: `Varios agentes libres han sido vistos reuniéndose con directores deportivos. Se espera que en la próxima ventana haya sorpresas.`,
            date: 'Ayer',
            category: 'Traspasos'
          }
        ]);
      }
    }
    load();
  }, [leagueId]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Noticias de la Liga (News Feed)</h1>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        {news.map((item, idx) => (
          <div key={idx} style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '12px', color: '#888' }}>
              <span style={{ background: '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>{item.category}</span>
              <span>{item.date}</span>
            </div>
            <h2 style={{ marginTop: '0', color: '#e67e22' }}>{item.title}</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6', margin: 0 }}>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
