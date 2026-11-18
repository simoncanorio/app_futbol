import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, formatMoney } from '../db/db';
import { ArrowLeftRight } from 'lucide-react';

interface TransactionView {
  id: number;
  type: string;
  playerId?: number;
  playerName: string;
  fromTeamId?: number;
  fromName: string;
  toTeamId?: number;
  toName: string;
  amountFormatted: string;
  season: number;
  week: number;
}

export function Transactions() {
  const { leagueId } = useParams();
  const [transactions, setTransactions] = useState<TransactionView[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  useEffect(() => {
    async function loadTransactions() {
      if (!leagueId) return;

      const rawTrans = await db.transactions
        .where('leagueId')
        .equals(Number(leagueId))
        .reverse()
        .limit(150)
        .toArray();

      const teamIds = new Set<number>();
      const playerIds = new Set<number>();

      rawTrans.forEach(t => {
        if (t.playerId) playerIds.add(t.playerId);
        if (t.fromTeamId) teamIds.add(t.fromTeamId);
        if (t.toTeamId) teamIds.add(t.toTeamId);
      });

      const teams = teamIds.size > 0 ? await db.teams.where('id').anyOf([...teamIds]).toArray() : [];
      const players = playerIds.size > 0 ? await db.players.where('id').anyOf([...playerIds]).toArray() : [];

      const teamMap = new Map(teams.map(t => [t.id, t.name]));
      const playerMap = new Map(players.map(p => [p.id, p.name]));

      const formatTxAmount = (amt?: number) => {
        if (!amt || amt <= 0) return 'Gratis';
        // Support both raw currency (e.g. 45000000) and legacy million-scale (< 1000)
        if (amt < 1000) return `€${amt.toFixed(1)}M`;
        return formatMoney(amt);
      };

      const views: TransactionView[] = rawTrans.map((t: any) => {
        const pName = (t.playerId ? playerMap.get(t.playerId) : undefined) || t.playerName || 'Jugador';
        const fromName = (t.fromTeamId ? teamMap.get(t.fromTeamId) : undefined) || t.fromTeamName || 'Agencia Libre';
        const toName = (t.toTeamId ? teamMap.get(t.toTeamId) : undefined) || t.toTeamName || 'Agencia Libre';

        return {
          id: t.id!,
          type: t.type || 'transfer',
          playerId: t.playerId,
          playerName: pName,
          fromTeamId: t.fromTeamId,
          fromName,
          toTeamId: t.toTeamId,
          toName,
          amountFormatted: formatTxAmount(t.amount),
          season: t.season || 2026,
          week: t.week || 1
        };
      });

      setTransactions(views);
    }

    loadTransactions();
  }, [leagueId]);

  const filtered = typeFilter === 'ALL'
    ? transactions
    : transactions.filter(t => t.type === typeFilter);

  const getBadge = (t: TransactionView) => {
    if (t.type === 'transfer' || t.type === 'buy') {
      return <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 'bold' }}>💰 Traspaso</span>;
    }
    if (t.type === 'loan' || t.type === 'loan_buy') {
      return <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 'bold' }}>🔄 Cesión</span>;
    }
    if (t.type === 'release') {
      return <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 'bold' }}>📄 Rescisión</span>;
    }
    return <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 'bold' }}>✍️ Firma / Renovación</span>;
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
            <ArrowLeftRight color="#38bdf8" /> Registro Oficial de Traspasos y Operaciones
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: '4px 0 0 0' }}>
            Historial de transferencias, préstamos, agentes libres y renovaciones en la liga.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: 'Todas' },
            { id: 'transfer', label: '💰 Traspasos' },
            { id: 'loan', label: '🔄 Cesiones' },
            { id: 'sign', label: '✍️ Firmas / Libres' },
            { id: 'release', label: '📄 Rescisiones' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id)}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: typeFilter === tab.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                background: typeFilter === tab.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)',
                color: typeFilter === tab.id ? '#38bdf8' : '#94a3b8',
                fontSize: '0.78rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '1.2rem', overflowX: 'auto' }}>
        {filtered.length === 0 ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No hay operaciones registradas para este filtro aún.</p>
        ) : (
          <table className="table-container bb-table">
            <thead>
              <tr>
                <th>Temp.</th>
                <th>Jornada</th>
                <th>Tipo</th>
                <th>Jugador</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Importe / Salario</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.season}</strong></td>
                  <td>Jor. {t.week}</td>
                  <td>{getBadge(t)}</td>
                  <td style={{ fontWeight: 'bold' }}>
                    {t.playerId ? (
                      <Link to={`/l/${leagueId}/player/${t.playerId}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                        {t.playerName}
                      </Link>
                    ) : t.playerName}
                  </td>
                  <td>
                    {t.fromTeamId ? (
                      <Link to={`/l/${leagueId}/team/${t.fromTeamId}`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                        {t.fromName}
                      </Link>
                    ) : <span style={{ color: '#64748b' }}>{t.fromName}</span>}
                  </td>
                  <td>
                    {t.toTeamId ? (
                      <Link to={`/l/${leagueId}/team/${t.toTeamId}`} style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>
                        {t.toName}
                      </Link>
                    ) : <span style={{ color: '#64748b' }}>{t.toName}</span>}
                  </td>
                  <td style={{ fontWeight: 'bold', color: '#fbbf24' }}>{t.amountFormatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
