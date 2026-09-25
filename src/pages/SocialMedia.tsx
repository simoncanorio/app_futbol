import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team, type Match } from '../db/db';
import { Heart, Repeat2, MessageCircle, BarChart2, CheckCircle2, Flame } from 'lucide-react';

interface TweetItem {
  id: string;
  handle: string;
  name: string;
  content: string;
  likes: number;
  rt: number;
  time: string;
  isVerified: boolean;
  avatarColor: string;
  isLiked?: boolean;
  isRetweeted?: boolean;
}

export function SocialMedia() {
  const { leagueId } = useParams();
  const [tweets, setTweets] = useState<TweetItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'fans'>('all');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      if (!lid) return;

      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      const recentMatches = await db.matches.where('leagueId').equals(lid).filter(m => m.isPlayed).reverse().toArray();
      const l = await db.leagues.get(lid);
      const userTeam = l?.userTeamId ? allTeams.find(t => t.id === l.userTeamId) : null;

      const generated: TweetItem[] = [];

      if (allPlayers.length > 0 && allTeams.length > 0) {
        const topStar = [...allPlayers].sort((a, b) => b.overall - a.overall)[0];
        const randomPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
        const topTeam = [...allTeams].sort((a, b) => b.overall - a.overall)[0];
        const targetTeam = userTeam || allTeams[0];

        // 1. Fabrizio Romano breaking transfer tweet
        generated.push({
          id: 't-1',
          handle: '@FabrizioRomano',
          name: 'Fabrizio Romano',
          isVerified: true,
          content: `🚨 EXCLUSIVE: Varios clubes de Champions League monitorean de cerca a ${topStar.name}. Las negociaciones por su contrato están en punto clave. Here we go pronto. ⏳⚽`,
          likes: 24300,
          rt: 4120,
          time: '1h',
          avatarColor: '#0284c7'
        });

        // 2. Official Club Tweet
        generated.push({
          id: 't-2',
          handle: `@${targetTeam.name.replace(/[^a-zA-Z0-9]/g, '')}Oficial`,
          name: targetTeam.name,
          isVerified: true,
          content: `¡Entrenamiento matutino completado! Enfocados al 100% en la Jornada ${l?.currentWeek || 1}. Todos unidos por el escudo. 💪💙 #VamosEquipo`,
          likes: 1250,
          rt: 180,
          time: '3h',
          avatarColor: targetTeam.kit?.primaryColor || '#38bdf8'
        });

        // 3. Match reaction tweet (if recent match exists)
        if (recentMatches.length > 0) {
          const rm = recentMatches[0];
          const hTeam = allTeams.find(t => t.id === rm.homeTeamId);
          const aTeam = allTeams.find(t => t.id === rm.awayTeamId);
          if (hTeam && aTeam) {
            generated.push({
              id: 't-3',
              handle: '@DiarioMarca',
              name: 'Diario MARCA',
              isVerified: true,
              content: `Final en el marcador: ${hTeam.name} ${rm.homeScore} - ${rm.awayScore} ${aTeam.name}. Partidazo de alta intensidad que deja la tabla de clasificación al rojo vivo. 🔥⚽`,
              likes: 4200,
              rt: 620,
              time: '4h',
              avatarColor: '#ef4444'
            });
          }
        }

        // 4. Analytics tweet
        generated.push({
          id: 't-4',
          handle: '@FutbolTacticoLab',
          name: 'Fútbol Táctico Lab',
          isVerified: false,
          content: `📊 Análisis de Rendimiento: ${randomPlayer.name} lidera las recuperaciones en campo contrario y pases clave esta semana. Nivel élite.`,
          likes: 380,
          rt: 54,
          time: '6h',
          avatarColor: '#10b981'
        });

        // 5. Fan reaction tweet
        generated.push({
          id: 't-5',
          handle: '@HinchaApasionado',
          name: 'Carlos M. (Socio)',
          isVerified: false,
          content: `Qué partidazo se viene este fin de semana. Como socio no me pierdo un partido en el estadio. ¡A darlo todo por estos colores! 🏟️🙌`,
          likes: 95,
          rt: 12,
          time: '8h',
          avatarColor: '#f59e0b'
        });
      }

      setTweets(generated);
    }
    load();
  }, [leagueId]);

  const handleToggleLike = (id: string) => {
    setTweets(prev => prev.map(t => {
      if (t.id === id) {
        const isLiked = !t.isLiked;
        return {
          ...t,
          isLiked,
          likes: isLiked ? t.likes + 1 : t.likes - 1
        };
      }
      return t;
    }));
  };

  const handleToggleRetweet = (id: string) => {
    setTweets(prev => prev.map(t => {
      if (t.id === id) {
        const isRetweeted = !t.isRetweeted;
        return {
          ...t,
          isRetweeted,
          rt: isRetweeted ? t.rt + 1 : t.rt - 1
        };
      }
      return t;
    }));
  };

  const filtered = tweets.filter(t => {
    if (activeFilter === 'verified') return t.isVerified;
    if (activeFilter === 'fans') return !t.isVerified;
    return true;
  });

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '720px', margin: '0 auto' }}>
      <div className="page-header" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.2)', paddingBottom: '1rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#f8fafc', margin: 0 }}>
          <span>📱</span> Feed de Redes Sociales (X / Twitter)
        </h1>
        <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '0.9rem' }}>
          Trending topics, opiniones de la afición, filtraciones de periodistas y reacciones en directo.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { id: 'all', label: 'Todo el Feed' },
          { id: 'verified', label: '✓ Periodistas & Clubes Oficiales' },
          { id: 'fans', label: '🗣️ Opinión de Aficionados' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: activeFilter === tab.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
              background: activeFilter === tab.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)',
              color: activeFilter === tab.id ? '#38bdf8' : '#94a3b8',
              fontSize: '0.82rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tweet Feed */}
      <div style={{ background: '#0a0f1d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', overflow: 'hidden' }}>
        {filtered.map(t => (
          <div
            key={t.id}
            style={{
              padding: '1.25rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              gap: '1rem',
              transition: 'background 0.2s'
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: t.avatarColor,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#ffffff',
              fontSize: '1.1rem'
            }}>
              {t.name.charAt(0)}
            </div>

            {/* Tweet Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 'bold', color: '#f8fafc', fontSize: '0.95rem' }}>{t.name}</span>
                {t.isVerified && <span style={{ color: '#38bdf8', fontSize: '0.9rem' }}>✓</span>}
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{t.handle}</span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>• {t.time}</span>
              </div>

              <p style={{ margin: '0 0 1rem 0', color: '#e2e8f0', lineHeight: '1.45', fontSize: '0.92rem' }}>
                {t.content}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '2.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <button
                  style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <MessageCircle size={15} /> 18
                </button>

                <button
                  onClick={() => handleToggleRetweet(t.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: t.isRetweeted ? '#10b981' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontWeight: t.isRetweeted ? 'bold' : 'normal'
                  }}
                >
                  <Repeat2 size={16} /> {t.rt}
                </button>

                <button
                  onClick={() => handleToggleLike(t.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: t.isLiked ? '#ef4444' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontWeight: t.isLiked ? 'bold' : 'normal'
                  }}
                >
                  <Heart size={15} fill={t.isLiked ? '#ef4444' : 'none'} /> {t.likes}
                </button>

                <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <BarChart2 size={15} /> {(t.likes * 14).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
