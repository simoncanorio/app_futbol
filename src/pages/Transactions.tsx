import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, type Transaction } from '../db/db';

interface TransactionView {
  id: number;
  text: string;
  season: number;
  week: number;
}

export function Transactions() {
  const { leagueId } = useParams();
  const [transactions, setTransactions] = useState<TransactionView[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      if (!leagueId) return;

      const rawTrans = await db.transactions
        .where('leagueId')
        .equals(Number(leagueId))
        .reverse()
        .limit(100)
        .toArray();

      const teamIds = new Set<number>();
      const playerIds = new Set<number>();

      rawTrans.forEach(t => {
        playerIds.add(t.playerId);
        if (t.fromTeamId) teamIds.add(t.fromTeamId);
        if (t.toTeamId) teamIds.add(t.toTeamId);
      });

      const teams = await db.teams.where('id').anyOf([...teamIds]).toArray();
      const players = await db.players.where('id').anyOf([...playerIds]).toArray();

      const teamMap = new Map(teams.map(t => [t.id, t.name]));
      const playerMap = new Map(players.map(p => [p.id, p.name]));

      const views: TransactionView[] = rawTrans.map(t => {
        const pName = playerMap.get(t.playerId) || 'Jugador Desconocido';
        const fromName = t.fromTeamId ? teamMap.get(t.fromTeamId) : 'Agencia Libre';
        const toName = t.toTeamId ? teamMap.get(t.toTeamId) : 'Agencia Libre';
        
        let text = '';
        if (t.type === 'transfer') {
          text = `El ${toName} fichó a ${pName} del ${fromName} por $${t.amount}M.`;
        } else if (t.type === 'loan') {
          text = `El ${toName} incorporó a ${pName} a préstamo desde ${fromName}.`;
        } else if (t.type === 'loan_buy') {
          text = `El ${toName} incorporó a ${pName} a préstamo desde ${fromName} con opción de compra por $${t.amount}M.`;
        } else if (t.type === 'release') {
          text = `El ${fromName} dejó en libertad de acción a ${pName}.`;
        } else if (t.type === 'sign') {
          text = `El ${toName} firmó a ${pName} desde la ${fromName} por $${t.amount}M/año.`;
        }

        return {
          id: t.id!,
          text,
          season: t.season,
          week: t.week
        };
      });

      setTransactions(views);
    }

    loadTransactions();
  }, [leagueId]);

  return (
    <div className="panel">
      <h2>Traspasos</h2>
      <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '16px' }}>
        Registro de transferencias, préstamos y firmas en la liga.
      </p>

      {transactions.length === 0 ? (
        <p>No hay traspasos registrados aún.</p>
      ) : (
        <table className="table-container">
          <thead>
            <tr>
              <th>Temporada</th>
              <th>Semana</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td>{t.season}</td>
                <td>{t.week}</td>
                <td>{t.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
