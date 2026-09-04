import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Player, type Team } from '../db/db';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

type StatKey = 'age' | 'overall' | 'potential' | 'goals' | 'assists' | 'gamesPlayed' | 'yellowCards' | 'redCards' | 'pace' | 'shooting' | 'passing' | 'dribbling' | 'defending' | 'physical' | 'contract';

const statOptions: { label: string, key: StatKey }[] = [
  { label: 'Valoración (OVR)', key: 'overall' },
  { label: 'Potencial (POT)', key: 'potential' },
  { label: 'Edad', key: 'age' },
  { label: 'Salario (Contrato)', key: 'contract' },
  { label: 'Goles', key: 'goals' },
  { label: 'Asistencias', key: 'assists' },
  { label: 'Partidos Jugados', key: 'gamesPlayed' },
  { label: 'Tarjetas Amarillas', key: 'yellowCards' },
  { label: 'Tarjetas Rojas', key: 'redCards' },
  { label: 'Ritmo (PAC)', key: 'pace' },
  { label: 'Tiro (SHO)', key: 'shooting' },
  { label: 'Pase (PAS)', key: 'passing' },
  { label: 'Regate (DRI)', key: 'dribbling' },
  { label: 'Defensa (DEF)', key: 'defending' },
  { label: 'Físico (PHY)', key: 'physical' },
];

export function PlayerGraphs() {
  const { leagueId } = useParams();
  const [players, setPlayers] = useState<(Player & { teamObj?: Team })[]>([]);
  
  const [xAxis, setXAxis] = useState<StatKey>('overall');
  const [yAxis, setYAxis] = useState<StatKey>('goals');

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

  const getStatValue = (p: Player, key: StatKey) => {
    if (key === 'contract') return p.contract;
    if (key === 'age' || key === 'overall' || key === 'potential') return p[key as 'age' | 'overall' | 'potential'];
    if (['goals', 'assists', 'gamesPlayed', 'yellowCards', 'redCards'].includes(key)) {
      return (p.stats as any)[key] || 0;
    }
    if (['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'].includes(key)) {
      return p.attributes ? (p.attributes as any)[key] : 0;
    }
    return 0;
  };

  const data = players.map(p => ({
    name: p.name,
    team: p.teamObj?.name || 'FA',
    x: getStatValue(p, xAxis),
    y: getStatValue(p, yAxis),
  }));

  const xLabel = statOptions.find(o => o.key === xAxis)?.label || '';
  const yLabel = statOptions.find(o => o.key === yAxis)?.label || '';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ background: '#222', border: '1px solid #444', padding: '10px', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>{data.name} <span style={{color: '#888'}}>({data.team})</span></p>
          <p style={{ margin: 0, color: '#3b82f6' }}>{xLabel}: {data.x}</p>
          <p style={{ margin: 0, color: '#e67e22' }}>{yLabel}: {data.y}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-container" style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <h1>Gráficos de Jugadores (Player Graphs)</h1>
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
            <ZAxis type="number" range={[50, 50]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Scatter name="Jugadores" data={data} fill="#3b82f6" opacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
