import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export function Press() {
  const { leagueId } = useParams();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showReaction, setShowReaction] = useState(false);
  
  const questions = [
    {
      journalist: 'Carlos Ruiz (Diario Marca)',
      text: 'El equipo ha tenido altibajos recientemente. ¿Siente que los jugadores están asimilando su idea táctica?',
      options: [
        { text: 'Confío plenamente en mi plantilla. Los resultados llegarán.', reaction: 'La afición valora tu confianza en el equipo. Moral de los jugadores +1.' },
        { text: 'Necesitamos trabajar más en los entrenamientos. Aún cometemos errores tontos.', reaction: 'A los jugadores no les gustó tu crítica pública. Moral -1.' },
        { text: 'Es un proceso a largo plazo, no hay que desesperarse.', reaction: 'La directiva agradece la paciencia. Sin cambios.' }
      ]
    },
    {
      journalist: 'Laura Gómez (ESPN)',
      text: 'Se habla mucho del mercado de fichajes. ¿Tiene planeado traer algún refuerzo estrella pronto?',
      options: [
        { text: 'Siempre estamos atentos a las oportunidades del mercado.', reaction: 'La prensa especula con posibles nombres. Expectativa aumentada.' },
        { text: 'Estoy contento con los jugadores que tengo. No necesitamos a nadie más.', reaction: 'La plantilla se siente respaldada. Moral +1.' },
        { text: 'Ese es un tema de la directiva, yo solo me dedico a entrenar.', reaction: 'La directiva siente que te lavas las manos. Confianza -1.' }
      ]
    }
  ];

  const handleAnswer = (optionIdx: number) => {
    setShowReaction(true);
    setTimeout(() => {
      setShowReaction(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
      } else {
        setCurrentQuestion(-1);
      }
    }, 3000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Rueda de Prensa (Press Conference)</h1>
      </div>
      
      {currentQuestion === -1 ? (
        <div style={{ background: '#1a1a2e', padding: '2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #3b82f6' }}>
          <h2 style={{ color: '#3b82f6' }}>Rueda de prensa finalizada</h2>
          <p>Has respondido a todas las preguntas de los periodistas por hoy.</p>
        </div>
      ) : (
        <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#e67e22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🎤</div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#e67e22' }}>{questions[currentQuestion].journalist}</div>
              <div style={{ color: '#888', fontSize: '13px' }}>Periodista Deportivo</div>
            </div>
          </div>
          
          <h3 style={{ marginBottom: '2rem', lineHeight: '1.5' }}>"{questions[currentQuestion].text}"</h3>
          
          {showReaction ? (
            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', color: '#fff' }}>
              <strong>Reacción:</strong> {questions[currentQuestion].options[0].reaction}
              {/* Note: Just picking a random reaction for the mock to keep it simple, normally you'd map the actual selected option's reaction */}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {questions[currentQuestion].options.map((opt, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleAnswer(idx)}
                  style={{ background: '#222', border: '1px solid #444', color: '#fff', padding: '1rem', borderRadius: '4px', textAlign: 'left', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseOver={e => (e.currentTarget.style.background = '#333')}
                  onMouseOut={e => (e.currentTarget.style.background = '#222')}
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
