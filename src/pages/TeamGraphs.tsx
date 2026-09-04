import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Team } from '../db/db';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

type StatKey = 'overall' | 'wins' | 'losses' | 'draws' | 'goalsFor' | 'goalsAgainst' | 'budget' | 'population' | 'attendance' | 'revenue' | 'profit' | 'pts' | 'gd';

const statOptions: { label: string, key: StatKey }[] = [
  { label: 'Valoración Promedio (OVR)', key: 'overall' },
  { label: 'Partidos Ganados (W)', key: 'wins' },
  { label: 'Partidos Empatados (D)', key: 'draws' },
  { label: 'Partidos Perdidos (L)', key: 'losses' },
  { label: 'Puntos (PTS)', key: 'pts' },
  { label: 'Goles a Favor (GF)', key: 'goalsFor' },
  { label: 'Goles en Contra (GA)', key: 'goalsAgainst' },
  { label: 'Diferencia de Goles (GD)', key: 'gd' },
  { label: 'Presupuesto', key: 'budget' },
  { label: 'Población', key: 'population' },
  { label: 'Asistencia Promedio', key: 'attendance' },
  { label: 'Ingresos', key: 'revenue' },
  { label: 'Beneficio', key: 'profit' },
];

export function TeamGraphs() {
  const { leagueId } = useParams();
  const [teams, setTeams] = useState<Team[]>([]);
  
  const [xAxis, setXAxis] = useState<StatKey>('goalsFor');
  const [yAxis, setYAxis] = useState<StatKey>('goalsAgainst');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      setTeams(allTeams);
    }
    load();
  }, [leagueId]);

  const getStatValue = (t: Team, key: StatKey) => {
    if (key === 'pts') return (t.wins * 3) + (t.draws * 1);
    if (key === 'gd') return t.goalsFor - t.goalsAgainst;
    return t[key] || 0;
  };

  const data = teams.map(t => ({
    name: t.name,
    x: getStatValue(t, xAxis),
    y: getStatValue(t, yAxis),
  }));

  const xLabel = statOptions.find(o => o.key === xAxis)?.label || '';
  const yLabel = statOptions.find(o => o.key === yAxis)?.label || '';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ background: '#222', border: '1px solid #444', padding: '10px', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>{data.name}</p>
          <p style={{ margin: 0, color: '#4ade80' }}>{xLabel}: {data.x.toLocaleString()}</p>
          <p style={{ margin: 0, color: '#f43f5e' }}>{yLabel}: {data.y.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-container" style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <h1>Gráficos de Equipo (Team Graphs)</h1>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ color: '#aaa' }}>Eje X:</label>
          <select value={xAxis} onChange={(e) => setXAxis(e.target.value as StatKey)} style={{ background: '#222', color: 'white', border: '1px solid #444', padding: '4px 8px', borderRadius: '4px' }}>
            {statOptions.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ color: '#aaa' }}>Eje Y:</label>
          <select value={yAxis} onChange={(e) => setYAxis(e.target.value as StatKey)} style={{ background: '#222', color: 'white', border: '1px solid #444', padding: '4px 8px', borderRadius: '4px' }}>
            {statOptions.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
        
        <button onClick={() => {
          const temp = xAxis;
          setXAxis(yAxis);
          setYAxis(temp);
        }} style={{ padding: '4px 12px', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer' }}>
          Invertir Ejes
        </button>
      </div>

      <div style={{ flex: 1, background: '#1a1a2e', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis type="number" dataKey="x" name={xLabel} stroke="#888" 
                   label={{ value: xLabel, position: 'bottom', fill: '#888' }} 
                   domain={['auto', 'auto']} />
            <YAxis type="number" dataKey="y" name={yLabel} stroke="#888" 
                   label={{ value: yLabel, angle: -90, position: 'left', fill: '#888' }} 
                   domain={['auto', 'auto']} />
            <ZAxis type="number" range={[100, 100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Scatter name="Equipos" data={data} fill="#4ade80" opacity={0.8} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
