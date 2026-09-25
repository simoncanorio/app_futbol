import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, type League, type Team } from '../db/db';
import { Mic, Award, CheckCircle, RotateCcw } from 'lucide-react';

export function Press() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
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
        const t = await db.teams.get(l.userTeamId);
        if (t) setTeam(t);
      }
    }
    load();
  }, [leagueId]);

  const teamName = team?.name || 'nuestro club';

  const questions = [
    {
      journalist: 'Carlos Ruiz (Diario Marca)',
      text: `Mánager, la afición de ${teamName} exige resultados inmediatos en cada jornada. ¿Siente que el vestuario asimila su propuesta táctica?`,
      options: [
        { text: 'Confío ciegamente en mis jugadores. La plantilla trabaja con enorme compromiso.', reaction: 'La plantilla valora tu lealtad pública. Moral alta y Reputación de Mánager +3.', repChange: 3 },
        { text: 'Aún nos falta intensidad en los entrenamientos. Hay errores que no podemos repetir.', reaction: 'A los pesos pesados del vestuario no les agradó la crítica. Reputación -2.', repChange: -2 },
        { text: 'Estamos en una transición táctica. El éxito requiere paciencia y constancia.', reaction: 'La directiva respalda tu serenidad y templanza. Reputación +1.', repChange: 1 }
      ]
    },
    {
      journalist: 'Laura Gómez (ESPN Internacional)',
      text: 'El periodo de transferencias siempre genera rumores. ¿Contempla la directiva traer un fichaje bomba?',
      options: [
        { text: 'La dirección deportiva siempre está alerta para reforzar posiciones clave.', reaction: 'La prensa deportiva se entusiasma con nuevos nombres. Reputación +2.', repChange: 2 },
        { text: 'Tengo plena fe en el grupo actual. No necesitamos gastar de más.', reaction: 'El grupo celebra tu respaldo financiero y deportivo. Reputación +3.', repChange: 3 },
        { text: 'Ese tema corresponde exclusivamente al presidente del club.', reaction: 'La junta directiva considera evasiva tu respuesta. Reputación -1.', repChange: -1 }
      ]
    },
    {
      journalist: 'Martín Barrenechea (Cadena SER)',
      text: 'Se habla del gran potencial de los jóvenes de la cantera. ¿Dará minutos a los juveniles en los próximos partidos?',
      options: [
        { text: 'La cantera es la columna vertebral de nuestro proyecto. Tendrán oportunidades reales.', reaction: 'La hinchada ovaciona tu apuesta por el talento joven. Reputación +3.', repChange: 3 },
        { text: 'Los jóvenes deben ganarse cada minuto en el filial antes de debutar.', reaction: 'Un mensaje prudente pero exigente para la academia. Reputación +1.', repChange: 1 },
        { text: 'Ahora mismo priorizamos la experiencia y los puntos inmediatos.', reaction: 'La afición lamenta la falta de minutos para los canteranos. Reputación -1.', repChange: -1 }
      ]
    }
  ];

  const handleAnswer = async (optionIdx: number) => {
    const opt = questions[currentQuestion].options[optionIdx];
    setSelectedReaction(opt.reaction);

    const lid = Number(leagueId);
    if (lid) {
      const curRep = managerReputation;
      const nextRep = Math.min(100, Math.max(10, curRep + opt.repChange));
      await db.leagues.update(lid, { managerReputation: nextRep });
      setManagerReputation(nextRep);
    }

    setTimeout(() => {
      setSelectedReaction(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
      } else {
        setCurrentQuestion(-1);
      }
    }, 2500);
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.2)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#f8fafc', margin: 0 }}>
            <Mic color="#38bdf8" size={30} /> Sala de Rueda de Prensa Oficial
          </h1>
          <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '0.9rem' }}>
            Tus declaraciones ante los medios moldean la confianza de la directiva y la reputación de tu cuerpo técnico.
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
      
      {currentQuestion === -1 ? (
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
            Has respondido a todas las preguntas de los medios de comunicación por esta jornada. Tus declaraciones han sido publicadas en la prensa deportiva.
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
            <RotateCcw size={16} /> Atender Otra Rueda de Prensa
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
              <strong>Reacción de la Prensa:</strong> {selectedReaction}
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
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#38bdf8';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(56, 189, 248, 0.1)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(30, 41, 59, 0.7)';
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
