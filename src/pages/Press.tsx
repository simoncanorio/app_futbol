import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../db/db';
import { Mic, Award, CheckCircle } from 'lucide-react';

export function Press() {
  const { leagueId } = useParams();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  
  const questions = [
    {
      journalist: 'Carlos Ruiz (Diario Marca)',
      text: 'El equipo ha tenido altibajos recientemente. ¿Siente que los jugadores están asimilando su idea táctica?',
      options: [
        { text: 'Confío plenamente en mi plantilla. Los resultados llegarán.', reaction: 'La afición valora tu confianza en el equipo. Reputación de Mánager +3.', repChange: 3 },
        { text: 'Necesitamos trabajar más en los entrenamientos. Aún cometemos errores tontos.', reaction: 'A los jugadores no les gustó tu crítica pública. Reputación -2.', repChange: -2 },
        { text: 'Es un proceso a largo plazo, no hay que desesperarse.', reaction: 'La directiva agradece la paciencia. Reputación +1.', repChange: 1 }
      ]
    },
    {
      journalist: 'Laura Gómez (ESPN)',
      text: 'Se habla mucho del mercado de fichajes. ¿Tiene planeado traer algún refuerzo estrella pronto?',
      options: [
        { text: 'Siempre estamos atentos a las oportunidades del mercado.', reaction: 'La prensa especula con posibles nombres. Expectativa aumentada. Reputación +2.', repChange: 2 },
        { text: 'Estoy contento con los jugadores que tengo. No necesitamos a nadie más.', reaction: 'La plantilla se siente respaldada. Reputación +3.', repChange: 3 },
        { text: 'Ese es un tema de la directiva, yo solo me dedico a entrenar.', reaction: 'La directiva siente que te lavas las manos. Reputación -1.', repChange: -1 }
      ]
    }
  ];

  const handleAnswer = async (optionIdx: number) => {
    const opt = questions[currentQuestion].options[optionIdx];
    setSelectedReaction(opt.reaction);

    const lid = Number(leagueId);
    if (lid) {
      const l = await db.leagues.get(lid);
      if (l) {
        const curRep = l.managerReputation || 60;
        await db.leagues.update(lid, { managerReputation: Math.min(100, Math.max(0, curRep + opt.repChange)) });
      }
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
      <div className="page-header">
        <h1>Rueda de Prensa Interactiva</h1>
        <p style={{ color: '#94a3b8' }}>Tus declaraciones ante la prensa afectan la moral del vestuario y tu reputación como DT.</p>
      </div>
      
      {currentQuestion === -1 ? (
        <div style={{ background: '#1a1a2e', padding: '3rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #3b82f6' }}>
          <CheckCircle size={48} color="#38bdf8" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: '#38bdf8' }}>Rueda de prensa finalizada</h2>
          <p style={{ color: '#cbd5e1' }}>Has respondido a todas las preguntas de los medios de comunicación por hoy.</p>
        </div>
      ) : (
        <div className="glass-panel" style={{ borderRadius: '12px', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mic size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#38bdf8', fontSize: '1.1rem' }}>{questions[currentQuestion].journalist}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Periodista Deportivo</div>
            </div>
          </div>
          
          <h3 style={{ marginBottom: '2rem', lineHeight: '1.5', color: '#f8fafc' }}>"{questions[currentQuestion].text}"</h3>
          
          {selectedReaction ? (
            <div style={{ padding: '1.2rem', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid #38bdf8', borderRadius: '8px', color: '#f1f5f9' }}>
              <strong>Reacción de la Prensa:</strong> {selectedReaction}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {questions[currentQuestion].options.map((opt, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleAnswer(idx)}
                  style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '1rem', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.2s' }}
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
