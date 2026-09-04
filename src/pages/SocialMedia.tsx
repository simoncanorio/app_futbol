import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';

export function SocialMedia() {
  const { leagueId } = useParams();
  const [tweets, setTweets] = useState<{ handle: string, name: string, content: string, likes: number, rt: number, time: string, isVerified: boolean }[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      
      if (allPlayers.length > 0 && allTeams.length > 0) {
        const p1 = allPlayers[Math.floor(Math.random() * allPlayers.length)];
        const p2 = allPlayers[Math.floor(Math.random() * allPlayers.length)];
        const t1 = allTeams[Math.floor(Math.random() * allTeams.length)];
        
        setTweets([
          {
            handle: '@FabrizioRomano',
            name: 'Fabrizio Romano',
            isVerified: true,
            content: `🚨 EXCLUSIVE: Se espera que ${p1.name} deje su equipo pronto. Las negociaciones están avanzando rápido. Here we go pronto. ⏳⚽`,
            likes: 14500,
            rt: 3200,
            time: '2h'
          },
          {
            handle: `@${t1.name.replace(/\s+/g, '')}Oficial`,
            name: `${t1.name}`,
            isVerified: true,
            content: `¡Entrenamiento a tope! Preparando el próximo encuentro con la mejor energía 💪💙 #VamosEquipo`,
            likes: 450,
            rt: 23,
            time: '5h'
          },
          {
            handle: '@FutbolAnalytics',
            name: 'Fútbol Analytics',
            isVerified: false,
            content: `Dato: El xG de ${p2.name} en los últimos 3 partidos es el más alto de la liga (3.4). Está encontrando los espacios perfectamente. 📊`,
            likes: 120,
            rt: 15,
            time: '6h'
          },
          {
            handle: '@FanEnfurecido',
            name: 'Juan Perez',
            isVerified: false,
            content: `No puedo creer lo mal que jugamos el finde. Si el entrenador no cambia el esquema, nos vamos al descenso directo 😡📉`,
            likes: 5,
            rt: 1,
            time: '12h'
          }
        ]);
      }
    }
    load();
  }, [leagueId]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Redes Sociales</h1>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '600px', margin: '0 auto', background: '#000', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden' }}>
        {tweets.map((t, idx) => (
          <div key={idx} style={{ padding: '1rem', borderBottom: '1px solid #333', display: 'flex', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3b82f6', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {t.name.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold' }}>{t.name}</span>
                {t.isVerified && <span style={{ color: '#3b82f6' }}>✓</span>}
                <span style={{ color: '#888', fontSize: '14px' }}>{t.handle}</span>
                <span style={{ color: '#888', fontSize: '14px' }}>· {t.time}</span>
              </div>
              <p style={{ margin: '0 0 1rem 0', lineHeight: '1.5' }}>{t.content}</p>
              <div style={{ display: 'flex', gap: '3rem', color: '#888', fontSize: '13px' }}>
                <span style={{ cursor: 'pointer' }}>💬</span>
                <span style={{ cursor: 'pointer' }}>🔁 {t.rt}</span>
                <span style={{ cursor: 'pointer' }}>❤️ {t.likes}</span>
                <span style={{ cursor: 'pointer' }}>📊</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
