import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, type League, type Team } from '../db/db';
import { getRivalryMultiplier } from '../engine/valuationEngine';
import { Mic, Award, CheckCircle, RotateCcw } from 'lucide-react';

interface PressQuestion {
  journalist: string;
  text: string;
  options: {
    text: string;
    reaction: string;
    repChange: number;
    moraleChange: number;
    boardChange?: number;
  }[];
}

export function Press() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [questions, setQuestions] = useState<PressQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [managerReputation, setManagerReputation] = useState(60);

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      if (!lid) return;
      const l = await db.leagues.get(lid);
      if (!l) return;
      setLeague(l);
      setManagerReputation(l.managerReputation || 60);

      if (l.userTeamId) {
        const [t, allTeams, teamPlayers, allMatches] = await Promise.all([
          db.teams.get(l.userTeamId),
          db.teams.where('leagueId').equals(lid).toArray(),
          db.players.where('teamId').equals(l.userTeamId).toArray(),
          db.matches.where('leagueId').equals(lid).toArray()
        ]);

        if (t) {
          setTeam(t);
          const teamMap = new Map(allTeams.map(tm => [tm.id!, tm]));
          const myMatches = allMatches.filter(m => m.homeTeamId === t.id || m.awayTeamId === t.id);
          const played = myMatches.filter(m => m.isPlayed).sort((a, b) => b.week - a.week);
          const upcoming = myMatches.filter(m => !m.isPlayed).sort((a, b) => a.week - b.week);

          const lastM = played[0];
          const nextM = upcoming[0];

          const topScorer = [...teamPlayers].sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0))[0];
          const unhappyP = teamPlayers.find(p => p.unhappy || (p.morale || 80) < 48);

          const dynamicQs: PressQuestion[] = [];

          // Q1: Contextual Last Match or Season Start
          if (lastM) {
            const isHome = lastM.homeTeamId === t.id;
            const myGoals = isHome ? lastM.homeScore : lastM.awayScore;
            const oppGoals = isHome ? lastM.awayScore : lastM.homeScore;
            const oppName = teamMap.get(isHome ? lastM.awayTeamId : lastM.homeTeamId)?.name || 'el rival';
            const won = myGoals > oppGoals;
            const drew = myGoals === oppGoals;

            dynamicQs.push({
              journalist: 'Carlos Ruiz (Diario Marca)',
              text: won
                ? `Mánager, tras la victoria ${myGoals}-${oppGoals} frente a ${oppName} en la Jornada ${lastM.week}, ¿cuál fue la clave táctica para imponerse?`
                : drew
                ? `El empate ${myGoals}-${oppGoals} ante ${oppName} dejó sensaciones encontradas. ¿Considera que se escaparon dos puntos?`
                : `La derrota ${myGoals}-${oppGoals} contra ${oppName} ha generado críticas en la prensa. ¿Qué falló en el planteamiento?`,
              options: [
                {
                  text: won
                    ? 'El mérito es 100% de los futbolistas; ejecutaron la presión y el plan de partido a la perfección.'
                    : 'Asumo toda la responsabilidad. Mis jugadores lo dieron todo y corregiremos los detalles en la pizarra.',
                  reaction: 'El vestuario agradece tu respaldo público. Moral de plantilla +3 y Reputación +2.',
                  repChange: 2,
                  moraleChange: 3,
                  boardChange: 2
                },
                {
                  text: won
                    ? 'Dominamos desde el pizarrón táctico, aunque no debemos relajarnos ni un segundo.'
                    : 'Nos faltó contundencia en las áreas. Quien no compita al 100% perderá su puesto en el once.',
                  reaction: 'Mensaje de máxima exigencia competitiva. La directiva aprueba tu firmeza (+3 Directiva).',
                  repChange: 1,
                  moraleChange: won ? 1 : -2,
                  boardChange: 3
                },
                {
                  text: 'El arbitraje y el estado del césped condicionaron el ritmo de nuestras transiciones.',
                  reaction: 'Tus declaraciones generan polémica en los titulares deportivos. Reputación -1.',
                  repChange: -1,
                  moraleChange: 1,
                  boardChange: -2
                }
              ]
            });
          }

          // Q2: Contextual Next Match & Rivalry Check
          if (nextM) {
            const oppId = nextM.homeTeamId === t.id ? nextM.awayTeamId : nextM.homeTeamId;
            const oppTeam = teamMap.get(oppId);
            const oppName = oppTeam?.name || 'el próximo rival';
            const rivalry = getRivalryMultiplier(t.name, oppName);

            dynamicQs.push({
              journalist: 'Laura Gómez (ESPN Internacional)',
              text: rivalry.isHistoricRivalry
                ? `🔥 Se avecina una nueva edición de ${rivalry.rivalryName} frente a ${oppName} (OVR ${oppTeam?.overall || 80}). ¿Cómo se vive esta semana especial en el vestuario?`
                : `En la Jornada ${nextM.week} se enfrentan a ${oppName} (OVR ${oppTeam?.overall || 78}). ¿Habrá rotaciones o saldrá con el once de gala?`,
              options: [
                {
                  text: rivalry.isHistoricRivalry
                    ? `Los clásicos no se juegan, se ganan. Saldremos a morder desde el minuto uno por nuestra gente.`
                    : `Respetamos a ${oppName}, pero saldremos a imponer nuestro estilo y llevar la iniciativa.`,
                  reaction: 'La afición y el plantel se contagian de tu ambición competitiva. Moral +3, Reputación +2.',
                  repChange: 2,
                  moraleChange: 3,
                  boardChange: 2
                },
                {
                  text: 'Analizaremos las cargas físicas tras la última sesión para elegir a los once más frescos.',
                  reaction: 'Los suplentes ven una puerta abierta para demostrar su valía. Moral +2.',
                  repChange: 1,
                  moraleChange: 2,
                  boardChange: 1
                },
                {
                  text: `Ellos tienen la presión por su presupuesto; nosotros iremos a cerrar espacios y aprovechar algún error.`,
                  reaction: 'Un enfoque pragmático que rebaja la presión mediática.',
                  repChange: 0,
                  moraleChange: 0
                }
              ]
            });
          }

          // Q3: Star Player / Dressing Room Situation
          if (unhappyP) {
            dynamicQs.push({
              journalist: 'Martín Barrenechea (Cadena SER)',
              text: `Se rumorea que ${unhappyP.name} (OVR ${unhappyP.overall}) no está cómodo con sus minutos actuales. ¿Cuenta con él o podría salir en el mercado?`,
              options: [
                {
                  text: `${unhappyP.name} es una pieza valiosa del club y tendrá oportunidades importantes muy pronto.`,
                  reaction: `${unhappyP.name} recupera la sonrisa tras tus palabras. Moral del jugador +12.`,
                  repChange: 2,
                  moraleChange: 3
                },
                {
                  text: 'Nadie tiene el puesto regalado por decreto. El que quiera jugar tiene que hablar en el campo.',
                  reaction: 'El resto del grupo respalda la meritocracia del vestuario.',
                  repChange: 1,
                  moraleChange: 1
                },
                {
                  text: 'Si llega una oferta que satisfaga las exigencias económicas del club, la estudiaremos.',
                  reaction: 'Los clubes rivales toman nota de su disponibilidad en el mercado.',
                  repChange: 0,
                  moraleChange: -1
                }
              ]
            });
          } else if (topScorer) {
            dynamicQs.push({
              journalist: 'Martín Barrenechea (Cadena SER)',
              text: `El rendimiento de ${topScorer.name} (${topScorer.stats?.goals || 0} goles y ${topScorer.stats?.assists || 0} asistencias) acapara elogios. ¿Hasta dónde puede llegar este año?`,
              options: [
                {
                  text: `${topScorer.name} está al nivel de los mejores del mundo, pero es el trabajo colectivo el que le permite brillar.`,
                  reaction: 'Elogio equilibrado que refuerza la unión del grupo. Moral +3, Reputación +2.',
                  repChange: 2,
                  moraleChange: 3
                },
                {
                  text: 'Tiene talento de sobra para pelear por el Balón de Oro y la Bota de Oro si mantiene esta hambre.',
                  reaction: 'Titular de portada en toda la prensa internacional. Reputación +3.',
                  repChange: 3,
                  moraleChange: 2
                },
                {
                  text: 'Prefiero no individualizar para que nadie pierda la humildad.',
                  reaction: 'Discurso sobrio de vieja escuela.',
                  repChange: 1,
                  moraleChange: 1
                }
              ]
            });
          }

          setQuestions(dynamicQs);
        }
      }
    }
    load();
  }, [leagueId]);

  const handleAnswer = async (optionIdx: number) => {
    const q = questions[currentQuestion];
    if (!q) return;
    const opt = q.options[optionIdx];
    setSelectedReaction(opt.reaction);

    const lid = Number(leagueId);
    if (lid) {
      const curRep = managerReputation;
      const nextRep = Math.min(100, Math.max(10, curRep + opt.repChange));
      await db.leagues.update(lid, { managerReputation: nextRep });
      setManagerReputation(nextRep);
    }

    if (team?.id) {
      if (opt.boardChange) {
        team.boardConfidence = Math.min(100, Math.max(10, (team.boardConfidence ?? 85) + opt.boardChange));
        await db.teams.put(team);
      }

      const teamPlayers = await db.players.where('teamId').equals(team.id).toArray();
      for (const p of teamPlayers) {
        p.morale = Math.min(100, Math.max(20, (p.morale || 80) + opt.moraleChange));
        if (p.morale >= 60) p.unhappy = false;
      }
      await db.players.bulkPut(teamPlayers);
    }

    setTimeout(() => {
      setSelectedReaction(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
      } else {
        setCurrentQuestion(-1);
      }
    }, 2200);
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.2)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#f8fafc', margin: 0 }}>
            <Mic color="#38bdf8" size={30} /> Sala de Rueda de Prensa Oficial ({league ? `Jornada ${league.currentWeek}` : ''})
          </h1>
          <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '0.9rem' }}>
            Preguntas contextuales en tiempo real según tus últimos resultados, rivales y estado del vestuario.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(56, 189, 248, 0.1)',
          padding: '6px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}>
          <Award size={18} color="#38bdf8" />
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Reputación de Mánager:</span>
          <strong style={{ fontSize: '1.05rem', color: '#38bdf8' }}>{managerReputation} / 100</strong>
        </div>
      </div>

      {currentQuestion === -1 || questions.length === 0 ? (
        <div style={{
          background: 'linear-gradient(145deg, #1e293b, #0f172a)',
          padding: '3rem',
          borderRadius: '16px',
          textAlign: 'center',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          maxWidth: '650px',
          margin: '2rem auto'
        }}>
          <CheckCircle size={52} color="#10b981" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: '#f8fafc', margin: '0 0 0.5rem 0' }}>Rueda de Prensa Concluida</h2>
          <p style={{ color: '#94a3b8', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>
            Has respondido a todas las preguntas de los medios acreditados en esta jornada.
          </p>
          <button
            onClick={() => setCurrentQuestion(0)}
            className="tm-btn-primary"
            style={{
              padding: '10px 20px',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#0284c7'
            }}
          >
            <RotateCcw size={16} /> Volver a Comparecer
          </button>
        </div>
      ) : (
        <div className="glass-panel" style={{ borderRadius: '14px', padding: '2rem', maxWidth: '800px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.85)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mic size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#38bdf8', fontSize: '1.05rem' }}>{questions[currentQuestion].journalist}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Pregunta {currentQuestion + 1} de {questions.length}</div>
            </div>
          </div>

          <h3 style={{ marginBottom: '1.75rem', lineHeight: '1.45', color: '#f8fafc', fontSize: '1.15rem' }}>
            "{questions[currentQuestion].text}"
          </h3>

          {selectedReaction ? (
            <div style={{ padding: '1.25rem', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid #38bdf8', borderRadius: '8px', color: '#f1f5f9', lineHeight: '1.4' }}>
              <strong>Impacto en el Entorno:</strong> {selectedReaction}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {questions[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  style={{
                    background: 'rgba(30, 41, 59, 0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#e2e8f0',
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    lineHeight: '1.4',
                    transition: 'all 0.2s',
                    fontWeight: 500
                  }}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
