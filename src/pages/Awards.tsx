import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type League } from '../db/db';
import { getLeagueMaxWeeks } from '../engine/gameLoop';
import { PlayerAvatar } from '../components/common/PlayerAvatar';
import { Trophy, Award, Sparkles, Shield, Flame, Crown, Lock } from 'lucide-react';

export function Awards() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [maxWeeks, setMaxWeeks] = useState<number>(38);
  const [ceremonyRevealed, setCeremonyRevealed] = useState<boolean>(false);
  const [players, setPlayers] = useState<(Player & { teamObj?: Team })[]>([]);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const [l, mw, allPlayers, allTeams] = await Promise.all([
        db.leagues.get(lid),
        getLeagueMaxWeeks(lid),
        db.players.where('leagueId').equals(lid).toArray(),
        db.teams.where('leagueId').equals(lid).toArray()
      ]);
      setLeague(l || null);
      setMaxWeeks(mw || 38);
      if (l && l.currentWeek > (mw || 38)) {
        setCeremonyRevealed(true);
      }

      const teamMap = new Map<number, Team>();
      allTeams.forEach(t => teamMap.set(t.id!, t));
      
      const p = allPlayers.filter(pl => !pl.isRetired).map(pl => ({
        ...pl,
        teamObj: pl.teamId ? teamMap.get(pl.teamId) : undefined
      }));
      setPlayers(p);
    }
    load();
  }, [leagueId]);

  const anyMatchesPlayed = players.some(p => (p.stats?.gamesPlayed || 0) > 0);
  const canRevealCeremony = league ? league.currentWeek >= Math.max(1, maxWeeks - 2) : false;

  // Calculations for Awards based on actual season performance (not just static OVR on Day 1)
  const getMVPScore = (p: Player & { teamObj?: Team }) => {
    if ((p.stats?.gamesPlayed || 0) === 0) return 0;
    const ratingBonus = Math.max(0, ((p.stats?.averageRating || 6.5) - 6.4) * 14);
    const teamWinsBonus = (p.teamObj?.wins || 0) * 0.45;
    return ((p.stats?.goals || 0) * 3.2) + ((p.stats?.assists || 0) * 2.1) + ((p.stats?.manOfTheMatch || 0) * 2.5) + ratingBonus + teamWinsBonus + (p.overall * 0.08);
  };

  const activePlayers = players.filter(p => (p.stats?.gamesPlayed || 0) > 0);
  const mvpCandidates = [...activePlayers].sort((a, b) => getMVPScore(b) - getMVPScore(a)).slice(0, 10);

  // Best Defender
  const defCandidates = [...activePlayers]
    .filter(p => p.position === 'DEF')
    .sort((a, b) => {
      const scoreA = ((a.stats?.tackles || 0) + (a.stats?.interceptions || 0)) * 0.8 + ((a.stats?.averageRating || 6.5) - 6.3) * 15 + (a.teamObj?.wins || 0) * 0.6 + a.overall * 0.2;
      const scoreB = ((b.stats?.tackles || 0) + (b.stats?.interceptions || 0)) * 0.8 + ((b.stats?.averageRating || 6.5) - 6.3) * 15 + (b.teamObj?.wins || 0) * 0.6 + b.overall * 0.2;
      return scoreB - scoreA;
    })
    .slice(0, 10);

  // Best GK
  const gkCandidates = [...activePlayers]
    .filter(p => p.position === 'POR')
    .sort((a, b) => (((b.stats?.cleanSheets || 0) * 3.5 + (b.stats?.saves || 0) * 0.3 + b.overall * 0.3) - ((a.stats?.cleanSheets || 0) * 3.5 + (a.stats?.saves || 0) * 0.3 + a.overall * 0.3)))
    .slice(0, 10);

  // Golden Boy (U-21)
  const youthCandidates = [...activePlayers]
    .filter(p => p.age <= 21)
    .sort((a, b) => getMVPScore(b) - getMVPScore(a))
    .slice(0, 10);

  // Golden Boot (Top Scorer)
  const botaCandidates = [...activePlayers]
    .filter(p => (p.stats?.goals || 0) > 0)
    .sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0) || (b.stats?.assists || 0) - (a.stats?.assists || 0))
    .slice(0, 10);

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

      {/* GALA PODIUM ANIMATED HERO (Concealed until Ceremony at end of season!) */}
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
            background: ceremonyRevealed ? 'linear-gradient(135deg, #fbbf24, #d97706)' : 'rgba(245, 158, 11, 0.2)',
            border: ceremonyRevealed ? 'none' : '1px solid #f59e0b',
            color: ceremonyRevealed ? '#000' : '#fbbf24',
            fontWeight: 800,
            fontSize: '0.8rem',
            padding: '4px 14px',
            borderRadius: '999px',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            {ceremonyRevealed ? '✨ Ceremonia Oficial del Balón de Oro' : `🔒 Sobre Sellado hasta la Gala Final (Jornada ${league?.currentWeek || 1}/${maxWeeks})`}
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '0.6rem 0 0.2rem', fontWeight: 800 }}>
            {ceremonyRevealed ? 'Podio Oficial del Balón de Oro' : 'Ganador y Podio Ocultos Bajo Secreto de Votación'}
          </h2>
          <span style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'block' }}>
            {ceremonyRevealed
              ? 'Galardonados oficiales según goles, asistencias, nota media, MVP y victorias de la temporada.'
              : `La ceremonia oficial de premiación se celebra al cierre de la temporada (Jornada ${maxWeeks}). Mientras tanto puedes consultar debajo el seguimiento estadístico.`}
          </span>

          {!ceremonyRevealed && canRevealCeremony && top1 && (
            <button
              onClick={() => setCeremonyRevealed(true)}
              style={{
                marginTop: '1rem',
                padding: '10px 22px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                color: '#000',
                fontWeight: 900,
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                boxShadow: '0 8px 25px rgba(251, 191, 36, 0.4)'
              }}
            >
              ✨ Abrir Sobre Oficial y Celebrar Gala del Balón de Oro
            </button>
          )}
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
          <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {ceremonyRevealed && top2 ? (
              <>
                <PlayerAvatar player={top2} size={65} />
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginTop: '0.5rem', fontSize: '0.95rem' }}>{top2.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{top2.teamObj?.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>OVR {top2.overall} • {top2.stats?.goals || 0}G / {top2.stats?.assists || 0}A</div>
              </>
            ) : (
              <>
                <div style={{ width: 65, height: 65, borderRadius: '50%', background: 'rgba(148, 163, 184, 0.15)', border: '2px dashed #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={26} color="#94a3b8" />
                </div>
                <div style={{ fontWeight: 700, color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.95rem' }}>???</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Finalista Oculto</div>
              </>
            )}

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

          {/* 1st Place (Gold - Winner!) */}
          <div style={{ flex: 1.2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            {ceremonyRevealed && top1 ? (
              <>
                <div style={{ position: 'relative' }}>
                  <Crown size={32} color="#fbbf24" style={{ position: 'absolute', top: '-24px', left: 'calc(50% - 16px)' }} />
                  <PlayerAvatar player={top1} size={85} />
                </div>
                <div style={{ fontWeight: 800, color: '#fbbf24', marginTop: '0.5rem', fontSize: '1.15rem' }}>{top1.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#f1f5f9', fontWeight: 600 }}>{top1.teamObj?.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#fde047', fontWeight: 700 }}>OVR {top1.overall} • {top1.stats?.goals || 0} Goles • {top1.stats?.assists || 0} Asist.</div>
              </>
            ) : (
              <>
                <div style={{ position: 'relative' }}>
                  <Crown size={32} color="#fbbf24" style={{ position: 'absolute', top: '-24px', left: 'calc(50% - 16px)', opacity: 0.6 }} />
                  <div style={{ width: 85, height: 85, borderRadius: '50%', background: 'rgba(251, 191, 36, 0.12)', border: '2px dashed #fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lock size={34} color="#fbbf24" />
                  </div>
                </div>
                <div style={{ fontWeight: 800, color: '#fbbf24', marginTop: '0.5rem', fontSize: '1.15rem' }}>🔒 Secreto hasta la Gala</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Se revela en la Jornada {maxWeeks}</div>
              </>
            )}

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
          <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {ceremonyRevealed && top3 ? (
              <>
                <PlayerAvatar player={top3} size={65} />
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginTop: '0.5rem', fontSize: '0.95rem' }}>{top3.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{top3.teamObj?.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>OVR {top3.overall} • {top3.stats?.goals || 0}G / {top3.stats?.assists || 0}A</div>
              </>
            ) : (
              <>
                <div style={{ width: 65, height: 65, borderRadius: '50%', background: 'rgba(217, 119, 6, 0.15)', border: '2px dashed #d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={26} color="#d97706" />
                </div>
                <div style={{ fontWeight: 700, color: '#d97706', marginTop: '0.5rem', fontSize: '0.95rem' }}>???</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Finalista Oculto</div>
              </>
            )}

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
        </div>
      </div>

      {!anyMatchesPlayed ? (
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', color: '#94a3b8' }}>
          <Trophy size={40} color="#fbbf24" style={{ marginBottom: '0.5rem', opacity: 0.7 }} />
          <h3 style={{ color: '#f8fafc', margin: '0 0 0.5rem 0' }}>Carrera por los Premios Oficiales Pendiente de Inicio</h3>
          <p style={{ margin: 0 }}>
            Aún no se ha disputado la Jornada 1 de la temporada. Simula el primer partido oficial para que comience el seguimiento estadístico de candidatos al Balón de Oro, Bota de Oro, Guante de Oro y Golden Boy.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem' }}>
          <AwardGrid title="Carrera hacia el Balón de Oro (Top 10)" icon={<Trophy size={20} color="#fbbf24" />} candidates={mvpCandidates} />
          <AwardGrid title="Bota de Oro (Máximo Goleador)" icon={<Flame size={20} color="#ef4444" />} candidates={botaCandidates} />
          <AwardGrid title="Guante de Oro (Mejor Portero)" icon={<Shield size={20} color="#38bdf8" />} candidates={gkCandidates} />
          <AwardGrid title="Mejor Defensor del Año" icon={<Award size={20} color="#a855f7" />} candidates={defCandidates} />
          <AwardGrid title="Golden Boy (Mejor Promesa Sub-21)" icon={<Sparkles size={20} color="#10b981" />} candidates={youthCandidates} />
        </div>
      )}
    </div>
  );
}

