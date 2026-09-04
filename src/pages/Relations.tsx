import React from 'react';

export function Relations() {
  // Static mock for now. In a full game, these would be derived from Team/League state (e.g. wins vs expectations).
  const boardConfidence = 75; 
  const fanConfidence = 82;
  const playerMorale = 90;

  const getBarColor = (val: number) => {
    if (val >= 80) return '#4ade80'; // green
    if (val >= 50) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getStatusText = (val: number) => {
    if (val >= 80) return 'Excelente';
    if (val >= 50) return 'Aceptable';
    return 'En peligro';
  };

  const RelationItem = ({ title, value, description }: { title: string, value: number, description: string }) => (
    <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, color: '#fff' }}>{title}</h3>
        <span style={{ fontWeight: 'bold', color: getBarColor(value) }}>{getStatusText(value)} ({value}%)</span>
      </div>
      <div style={{ width: '100%', background: '#333', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
        <div style={{ width: `${value}%`, background: getBarColor(value), height: '100%', transition: 'width 0.5s ease-in-out' }}></div>
      </div>
      <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>{description}</p>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Relaciones Institucionales (Relations)</h1>
      </div>
      
      <p style={{ color: '#ccc', marginBottom: '2rem' }}>El estado actual de tus relaciones con los diferentes pilares del club. Si la confianza de la directiva cae demasiado bajo, podrías ser despedido.</p>
      
      <div style={{ maxWidth: '800px' }}>
        <RelationItem 
          title="Confianza de la Directiva" 
          value={boardConfidence} 
          description="La directiva está satisfecha con los resultados recientes, aunque esperan que mejores la rentabilidad financiera a largo plazo. Tu puesto está seguro por el momento."
        />
        
        <RelationItem 
          title="Aprobación de la Afición" 
          value={fanConfidence} 
          description="Los hinchas están entusiasmados con el juego del equipo. Las victorias recientes y el estilo ofensivo han disparado la venta de camisetas."
        />
        
        <RelationItem 
          title="Moral del Vestuario" 
          value={playerMorale} 
          description="Los jugadores confían ciegamente en tu proyecto. El ambiente en los entrenamientos es inmejorable y no hay problemas de ego."
        />
      </div>
    </div>
  );
}
