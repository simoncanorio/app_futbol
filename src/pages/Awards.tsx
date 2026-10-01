import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';
import { PlayerAvatar } from '../components/common/PlayerAvatar';
import { Trophy, Award, Sparkles, Shield, Flame, Star, Crown } from 'lucide-react';

export function Awards() {
  const { leagueId } = useParams();
  const [players, setPlayers] = useState<(Player & { teamObj?: Team })[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      const teamMap = new Map<number, Team>();
      allTeams.forEach(t => teamMap.set(t.id!, t));
      
      const p = allPlayers.map(pl => ({
        ...pl,
        teamObj: pl.teamId ? teamMap.get(pl.teamId) : undefined
      }));
      setPlayers(p);
    }
    load();
  }, [leagueId]);

  // Calculations for Awards
  const getMVPScore = (p: Player) => ((p.stats?.goals || 0) * 3) + ((p.stats?.assists || 0) * 1.5) + (p.overall * 0.1);
  const mvpCandidates = [...players].sort((a, b) => getMVPScore(b) - getMVPScore(a)).slice(0, 10);

  // Best Defender
  const defCandidates = [...players].filter(p => p.position === 'DEF')
                                   .sort((a, b) => (b.overall * 0.5 + (b.attributes?.defending || 0)) - (a.overall * 0.5 + (a.attributes?.defending || 0)))
                                   .slice(0, 10);

  // Best GK
  const gkCandidates = [...players].filter(p => p.position === 'POR')
                                   .sort((a, b) => ((b.stats?.cleanSheets || 0) * 2 + b.overall) - ((a.stats?.cleanSheets || 0) * 2 + a.overall))
                                   .slice(0, 10);

  // Golden Boy (U-21)
  const youthCandidates = [...players].filter(p => p.age <= 21)
                                      .sort((a, b) => getMVPScore(b) - getMVPScore(a))
                                      .slice(0, 10);

  // Golden Boot (Top Scorer)
  const botaCandidates = [...players].sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0)).slice(0, 10);

  const top1 = mvpCandidates[0];
  const top2 = mvpCandidates[1];
  const top3 = mvpCandidates[2];

  const AwardGrid = ({ title, icon, candidates }: { title: string; icon: any; candidates: any[] }) => (
    <div style={{
      flex: '1 1 calc(50% - 1rem)',
      minWidth: '380px',
      background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '14px',
      padding: '1.25rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '2px solid rgba(234, 179, 8, 0.4)', paddingBottom: '0.6rem', marginBottom: '0.8rem' }}>
        {icon}
        <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.05rem', fontWeight: 700 }}>{title}</h3>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <th style={{ textAlign: 'left', padding: '6px' }}>#</th>
            <th style={{ textAlign: 'left', padding: '6px' }}>Jugador</th>
            <th style={{ textAlign: 'left', padding: '6px' }}>Club</th>
            <th style={{ textAlign: 'center', padding: '6px' }}>Edad</th>
            <th style={{ textAlign: 'center', padding: '6px' }}>OVR</th>
            <th style={{ textAlign: 'center', padding: '6px' }}>Goles</th>
            <th style={{ textAlign: 'center', padding: '6px' }}>Asist.</th>
            <th style={{ textAlign: 'center', padding: '6px' }}>Vallas</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((p, idx) => (
            <tr
              key={p.id}
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                background: idx === 0 ? 'rgba(234, 179, 8, 0.12)' : 'transparent',
                transition: 'background 0.15s ease'
              }}
            >
              <td style={{ padding: '7px 6px', color: idx === 0 ? '#fbbf24' : '#64748b', fontWeight: idx === 0 ? 800 : 500 }}>
                {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : `${idx + 1}`}
              </td>
              <td style={{ padding: '7px 6px', fontWeight: 600 }}>
                <Link to={`/l/${leagueId}/player/${p.id}`} style={{ color: idx === 0 ? '#fbbf24' : '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <PlayerAvatar player={p} size={22} />
                  {p.name}
                </Link>
              </td>
              <td style={{ padding: '7px 6px', color: '#94a3b8' }}>{p.teamObj?.name || 'Agente Libre'}</td>
              <td style={{ padding: '7px 6px', textAlign: 'center', color: '#94a3b8' }}>{p.age}</td>
              <td style={{ padding: '7px 6px', textAlign: 'center', fontWeight: 700, color: '#f1f5f9' }}>{p.overall}</td>
              <td style={{ padding: '7px 6px', textAlign: 'center', color: p.stats?.goals ? '#ef4444' : '#64748b', fontWeight: p.stats?.goals ? 700 : 400 }}>
                {p.stats?.goals || 0}
              </td>
              <td style={{ padding: '7px 6px', textAlign: 'center', color: p.stats?.assists ? '#10b981' : '#64748b', fontWeight: p.stats?.assists ? 700 : 400 }}>
                {p.stats?.assists || 0}
              </td>
              <td style={{ padding: '7px 6px', textAlign: 'center', color: p.stats?.cleanSheets ? '#38bdf8' : '#64748b' }}>
                {p.position === 'POR' ? (p.stats?.cleanSheets || 0) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="page-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, color: '#f8fafc' }}>
            <Trophy size={32} color="#fbbf24" /> Gala de Premios Oficial: Balón de Oro
          </h1>
          <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '0.92rem' }}>
            La ceremonia mundial que condecora a las mayores estrellas del planeta según su rendimiento.
          </p>
        </div>
      </div>

      {/* GALA PODIUM ANIMATED HERO */}
      {top1 && (
        <div style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.45) 0%, rgba(15, 23, 42, 0.95) 75%)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          borderRadius: '20px',
          padding: '2.5rem 1.5rem 1.5rem',
          marginBottom: '2.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(234, 179, 8, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              background: 'linear-gradient(135deg, #fbbf24, #d97706)',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.8rem',
              padding: '4px 14px',
              borderRadius: '999px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              ✨ Podium Oficial del Balón de Oro
            </span>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '0.6rem 0 0.2rem', fontWeight: 800 }}>
              Favoritos al Máximo Galardón Mundial
            </h2>
            <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
              Votación ponderada por goles, asistencias, títulos y valoración mediática.
            </span>
          </div>

          {/* 3 Podiums: 2nd (Left), 1st (Center), 3rd (Right) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '1.5rem',
            maxWidth: '750px',
            margin: '0 auto',
            paddingTop: '1rem'
          }}>
            {/* 2nd Place (Silver) */}
            {top2 && (
              <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PlayerAvatar player={top2} size={65} />
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                  {top2.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{top2.teamObj?.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>OVR {top2.overall}</div>

                <div style={{
                  width: '100%',
                  height: '110px',
                  background: 'linear-gradient(180deg, #94a3b8 0%, #475569 100%)',
                  borderRadius: '12px 12px 0 0',
                  marginTop: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)'
                }}>
                  <span style={{ fontSize: '1.8rem' }}>🥈</span>
                  <strong style={{ fontSize: '1.1rem' }}>2º Puesto</strong>
                  <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>Balón de Plata</span>
                </div>
              </div>
            )}

            {/* 1st Place (Gold - Winner!) */}
            <div style={{ flex: 1.2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{ position: 'relative' }}>
                <Crown size={32} color="#fbbf24" style={{ position: 'absolute', top: '-24px', left: 'calc(50% - 16px)' }} />
                <PlayerAvatar player={top1} size={85} />
              </div>
              <div style={{ fontWeight: 800, color: '#fbbf24', marginTop: '0.5rem', fontSize: '1.15rem' }}>
                {top1.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#f1f5f9', fontWeight: 600 }}>{top1.teamObj?.name}</div>
              <div style={{ fontSize: '0.85rem', color: '#fde047', fontWeight: 700 }}>OVR {top1.overall} • {top1.stats?.goals || 0} Goles</div>

              <div style={{
                width: '100%',
                height: '150px',
                background: 'linear-gradient(180deg, #fbbf24 0%, #b45309 100%)',
                borderRadius: '14px 14px 0 0',
                marginTop: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 12px 30px rgba(251, 191, 36, 0.4)'
              }}>
                <span style={{ fontSize: '2.4rem' }}>🏆</span>
                <strong style={{ fontSize: '1.25rem', color: '#000', fontWeight: 900 }}>GANADOR</strong>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#78350f' }}>Balón de Oro</span>
              </div>
            </div>

            {/* 3rd Place (Bronze) */}
            {top3 && (
              <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PlayerAvatar player={top3} size={65} />
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                  {top3.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{top3.teamObj?.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>OVR {top3.overall}</div>

                <div style={{
                  width: '100%',
                  height: '85px',
                  background: 'linear-gradient(180deg, #d97706 0%, #78350f 100%)',
                  borderRadius: '12px 12px 0 0',
                  marginTop: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)'
                }}>
                  <span style={{ fontSize: '1.6rem' }}>🥉</span>
                  <strong style={{ fontSize: '1rem' }}>3º Puesto</strong>
                  <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>Balón de Bronce</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid of Other Categories */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem' }}>
        <AwardGrid title="Balón de Oro (Mejor Jugador del Mundo)" icon={<Trophy size={20} color="#fbbf24" />} candidates={mvpCandidates} />
        <AwardGrid title="Bota de Oro (Máximo Goleador)" icon={<Flame size={20} color="#ef4444" />} candidates={botaCandidates} />
        <AwardGrid title="Guante de Oro (Mejor Portero)" icon={<Shield size={20} color="#38bdf8" />} candidates={gkCandidates} />
        <AwardGrid title="Mejor Defensor del Año" icon={<Award size={20} color="#a855f7" />} candidates={defCandidates} />
        <AwardGrid title="Golden Boy (Mejor Promesa Sub-21)" icon={<Sparkles size={20} color="#10b981" />} candidates={youthCandidates} />
      </div>
    </div>
  );
}

