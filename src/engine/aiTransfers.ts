import { db, type Team, type Player, type League } from '../db/db';
import { calculateTransferAskingPrice, calculateExpectedAnnualWage } from './valuationEngine';
import { autoSelectLineupForTeam } from '../utils/lineupUtils';

export async function processAITransfers(league: League, allTeams: Team[]) {
  const userTeamId = league.userTeamId;
  const aiTeams = allTeams.filter(t => t.id !== userTeamId);
  if (aiTeams.length === 0) return;

  const allPlayers = await db.players.where('leagueId').equals(league.id!).toArray();
  const playerMap = new Map<number, Player[]>();

  for (const p of allPlayers) {
    if (p.teamId) {
      if (!playerMap.has(p.teamId)) playerMap.set(p.teamId, []);
      playerMap.get(p.teamId)!.push(p);
    }
  }

  // 1. AI Contract Renewals for expiring key players (Week 1 or Week 19)
  if (league.currentWeek === 1 || league.currentWeek === 19) {
    const renewedPlayers: Player[] = [];
    for (const aiTeam of aiTeams) {
      const squad = playerMap.get(aiTeam.id!) || [];
      for (const p of squad) {
        if ((p.contractYears ?? 2) <= 1 && !p.unhappy && !p.isOnLoan) {
          const isImportant = p.overall >= aiTeam.overall - 3 || (p.age <= 22 && p.potential >= aiTeam.overall);
          if (isImportant && Math.random() < 0.82) {
            const newYears = p.age >= 31 ? 2 : 4;
            p.contractYears = newYears;
            p.contractEndSeason = league.season + newYears;
            p.contract = calculateExpectedAnnualWage(p, aiTeam.prestige || 70);
            renewedPlayers.push(p);
          }
        }
      }
    }
    if (renewedPlayers.length > 0) {
      await db.players.bulkPut(renewedPlayers);
    }
  }

  // 2. Process 2 to 4 AI Market Operations per week during open transfer windows
  const transferCount = Math.floor(Math.random() * 3) + 2;
  const touchedTeamIds = new Set<number>();

  for (let tIdx = 0; tIdx < transferCount; tIdx++) {
    const buyer = aiTeams[Math.floor(Math.random() * aiTeams.length)];
    const buyerPlayers = (playerMap.get(buyer.id!) || []).filter(p => p.lineupStatus !== 'youth');

    const nameLow = buyer.name.toLowerCase();
    const isGalacticoBuyer = nameLow.includes('real madrid') || nameLow.includes('manchester city') || nameLow.includes('paris saint') || nameLow.includes('bayern');
    const isYouthDeveloper = nameLow.includes('barcelona') || nameLow.includes('dortmund') || nameLow.includes('benfica') || nameLow.includes('sporting') || nameLow.includes('river') || nameLow.includes('boca') || nameLow.includes('brighton');

    // Check positional needs
    const gks = buyerPlayers.filter(p => p.position === 'POR');
    const defs = buyerPlayers.filter(p => p.position === 'DEF');
    const meds = buyerPlayers.filter(p => p.position === 'MED');
    const fwds = buyerPlayers.filter(p => p.position === 'DEL');

    let targetPosition: 'POR' | 'DEF' | 'MED' | 'DEL' | null = null;
    if (gks.length < 2) targetPosition = 'POR';
    else if (fwds.length < 3) targetPosition = 'DEL';
    else if (defs.length < 6) targetPosition = 'DEF';
    else if (meds.length < 6) targetPosition = 'MED';
    else {
      // Find weakest starter position to upgrade
      const starters = buyerPlayers.filter(p => p.lineupStatus === 'starter');
      if (starters.length > 0) {
        const weakest = [...starters].sort((a, b) => a.overall - b.overall)[0];
        if (weakest) targetPosition = weakest.position;
      }
    }

    // Option A: Sign Free Agent if squad is thin or good FA available
    const freeAgents = allPlayers.filter(p => !p.teamId && !p.isScouted);
    if (buyerPlayers.length < 21 && freeAgents.length > 0) {
      let faCandidates = targetPosition ? freeAgents.filter(p => p.position === targetPosition) : freeAgents;
      if (faCandidates.length === 0) faCandidates = freeAgents;

      faCandidates.sort((a, b) => b.overall - a.overall);
      const topFA = faCandidates.find(p => p.overall >= buyer.overall - 5);

      if (topFA) {
        topFA.teamId = buyer.id!;
        topFA.lineupStatus = 'reserve';
        topFA.contract = calculateExpectedAnnualWage(topFA, buyer.prestige || 70);
        topFA.contractYears = topFA.age >= 31 ? 2 : 3;
        topFA.contractEndSeason = league.season + topFA.contractYears;
        await db.players.put(topFA);
        playerMap.get(buyer.id!)?.push(topFA);
        touchedTeamIds.add(buyer.id!);

        await db.transactions.add({
          leagueId: league.id!,
          type: 'sign',
          playerId: topFA.id!,
          fromTeamId: undefined,
          toTeamId: buyer.id!,
          amount: 0,
          season: league.season,
          week: league.currentWeek,
          date: Date.now()
        });
        continue;
      }
    }

    // Option B: Permanent Transfer or Loan from another AI club
    let candidatePlayers = allPlayers.filter(
      p => p.teamId && p.teamId !== buyer.id! && p.teamId !== userTeamId && p.lineupStatus !== 'youth' && !p.isOnLoan
    );

    if (targetPosition) {
      const posFiltered = candidatePlayers.filter(p => p.position === targetPosition);
      if (posFiltered.length > 0) candidatePlayers = posFiltered;
    }

    if (isGalacticoBuyer) {
      candidatePlayers = candidatePlayers.filter(p => p.overall >= 82 || (p.age <= 22 && p.potential >= 87));
    } else if (isYouthDeveloper) {
      candidatePlayers = candidatePlayers.filter(p => (p.age <= 24 && p.potential >= buyer.overall) || p.overall >= buyer.overall - 1);
    } else {
      candidatePlayers = candidatePlayers.filter(p => p.overall >= buyer.overall - 2 && p.overall <= buyer.overall + 5);
    }

    if (candidatePlayers.length === 0) continue;

    // Prioritize transfer-listed or unhappy players, then highest OVR/potential
    candidatePlayers.sort((a, b) => {
      const scoreA = a.overall + (a.isTransferListed ? 4 : 0) + (a.unhappy ? 3 : 0);
      const scoreB = b.overall + (b.isTransferListed ? 4 : 0) + (b.unhappy ? 3 : 0);
      return scoreB - scoreA;
    });

    const target = candidatePlayers[Math.floor(Math.random() * Math.min(6, candidatePlayers.length))];
    const sellerTeamId = target.teamId!;
    const seller = aiTeams.find(x => x.id === sellerTeamId);
    if (!seller) continue;

    // Don't let seller drop below minimum squad size (16 senior players)
    const sellerSenior = (playerMap.get(seller.id!) || []).filter(p => p.lineupStatus !== 'youth');
    if (sellerSenior.length <= 16) continue;

    // Check if this should be a loan deal (young reserve player at bigger club -> smaller club)
    const isLoanDeal = target.age <= 22 && target.lineupStatus !== 'starter' && seller.overall >= buyer.overall + 3;

    // Prestige, Ambition & Loyalty checks (for permanent transfers)
    if (!isLoanDeal) {
      const buyerPrestige = buyer.prestige || 70;
      const sellerPrestige = seller.prestige || 70;
      const playerMorale = target.morale || 85;

      if (buyerPrestige < sellerPrestige - 10 && playerMorale > 45 && !target.unhappy && !target.isTransferListed) {
        continue;
      }
      if ((target.personality === 'Ambicioso' || target.overall >= 84) && buyer.overall < seller.overall - 3 && !target.isTransferListed) {
        continue;
      }
      if (target.personality === 'Leal' && !target.isTransferListed && Math.random() < 0.78) {
        continue;
      }
    }

    const valuation = calculateTransferAskingPrice(target, seller, buyer, league.difficulty);
    const fee = isLoanDeal ? Math.round(valuation.marketValue * 0.08) : valuation.askingPrice;

    if (buyer.budget < fee) continue;

    // Execute Transfer or Loan
    target.teamId = buyer.id!;
    target.isTransferListed = false;
    target.unhappy = false;
    target.transferRequest = false;
    target.morale = Math.min(100, (target.morale || 80) + 10);

    if (isLoanDeal) {
      target.isOnLoan = true;
      target.loanedFromTeamId = sellerTeamId;
      target.buyOptionFee = Math.round(valuation.marketValue * 1.15);
    } else {
      target.contract = calculateExpectedAnnualWage(target, buyer.prestige || 70);
      target.contractYears = target.age >= 30 ? 2 : 4;
      target.contractEndSeason = league.season + target.contractYears;
      target.releaseClause = Math.round(valuation.marketValue * 2.8);
    }

    buyer.budget -= fee;
    seller.budget += fee;

    await db.players.put(target);
    await db.teams.bulkPut([buyer, seller]);

    // Update in-memory map
    const sList = playerMap.get(sellerTeamId) || [];
    playerMap.set(sellerTeamId, sList.filter(p => p.id !== target.id));
    if (!playerMap.has(buyer.id!)) playerMap.set(buyer.id!, []);
    playerMap.get(buyer.id!)!.push(target);

    touchedTeamIds.add(buyer.id!);
    touchedTeamIds.add(sellerTeamId);

    // Surplus management
    const updatedBuyerPos = (playerMap.get(buyer.id!) || []).filter(p => p.position === target.position && p.lineupStatus !== 'youth');
    if (updatedBuyerPos.length > 6) {
      const surplus = [...updatedBuyerPos].sort((a, b) => a.overall - b.overall)[0];
      if (surplus && surplus.id !== target.id && !surplus.isOnLoan) {
        surplus.isTransferListed = true;
        await db.players.put(surplus);
      }
    }

    await db.transactions.add({
      leagueId: league.id!,
      type: isLoanDeal ? 'loan' : 'transfer',
      playerId: target.id!,
      fromTeamId: sellerTeamId,
      toTeamId: buyer.id!,
      amount: fee,
      season: league.season,
      week: league.currentWeek,
      date: Date.now(),
      buyOptionPrice: isLoanDeal ? target.buyOptionFee : undefined
    });

    if (target.overall >= 83 || valuation.rivalryMultiplier > 1.5) {
      await db.notes.add({
        leagueId: league.id!,
        entityType: 'general',
        text: `🔥 ${valuation.rivalryName ? `¡BOMBAZO EN ${valuation.rivalryName.toUpperCase()}!` : 'FICHAJE ESTELAR:'} ${buyer.name} incorpora a ${target.name} (${target.position}, OVR ${target.overall}) desde ${seller.name} por $${(fee / 1_000_000).toFixed(2)}M.`,
        createdAt: Date.now()
      });
    }
  }

  // Re-select optimal lineups and recalculate team overall for clubs that made transfers
  for (const tid of touchedTeamIds) {
    await autoSelectLineupForTeam(tid);
  }

  // 3. Bidirectional Market: Generate Incoming AI Offers for User's Players!
  if (userTeamId && Math.random() < 0.70) {
    const userTeam = allTeams.find(t => t.id === userTeamId);
    const userSquad = (playerMap.get(userTeamId) || []).filter(p => p.lineupStatus !== 'youth' && !p.isOnLoan);

    if (userTeam && userSquad.length >= 16) {
      // Prioritize transfer-listed, unhappy, or standout players
      const candidates = [...userSquad].sort((a, b) => {
        const sA = (a.isTransferListed ? 25 : 0) + (a.unhappy ? 18 : 0) + (a.stats?.goals || 0) * 1.5 + a.overall * 0.4;
        const sB = (b.isTransferListed ? 25 : 0) + (b.unhappy ? 18 : 0) + (b.stats?.goals || 0) * 1.5 + b.overall * 0.4;
        return sB - sA;
      });

      const targetPlayer = candidates[Math.floor(Math.random() * Math.min(4, candidates.length))];
      if (targetPlayer && targetPlayer.id) {
        const existingPending = await db.transferOffers
          .where('playerId')
          .equals(targetPlayer.id)
          .filter(o => o.status === 'pending')
          .count();

        if (existingPending === 0) {
          const suitorPool = aiTeams.filter(t => t.overall >= targetPlayer.overall - 5 && t.budget >= 8_000_000);
          const suitor = suitorPool.length > 0
            ? suitorPool[Math.floor(Math.random() * suitorPool.length)]
            : aiTeams[Math.floor(Math.random() * aiTeams.length)];

          if (suitor && suitor.id) {
            const val = calculateTransferAskingPrice(targetPlayer, userTeam, suitor, 'Normal');
            const isYoungReserve = targetPlayer.age <= 21 && targetPlayer.lineupStatus !== 'starter';
            const clause = targetPlayer.releaseClause || val.marketValue * 2.8;
            const triggersClause =
              !isYoungReserve &&
              !targetPlayer.isTransferListed &&
              targetPlayer.overall >= 82 &&
              suitor.budget >= clause * 1.15 &&
              clause <= val.marketValue * 1.5;

            const offerType = triggersClause ? 'release_clause' : isYoungReserve ? 'loan' : 'transfer';
            const offeredAmount = triggersClause
              ? clause
              : isYoungReserve
              ? Math.round(val.marketValue * 0.1)
              : Math.min(suitor.budget, Math.round(val.marketValue * (0.9 + Math.random() * 0.25)));

            const wageOffered = calculateExpectedAnnualWage(targetPlayer, suitor.prestige || 75);

            await db.transferOffers.add({
              leagueId: league.id!,
              playerId: targetPlayer.id,
              playerName: targetPlayer.name,
              playerPosition: targetPlayer.position,
              playerOverall: targetPlayer.overall,
              fromAiTeamId: suitor.id,
              fromAiTeamName: suitor.name,
              toUserTeamId: userTeamId,
              offerType,
              amount: offeredAmount,
              wageOffered,
              week: league.currentWeek,
              season: league.season,
              status: 'pending'
            });

            await db.notes.add({
              leagueId: league.id!,
              entityType: 'team',
              entityId: userTeamId,
              text: triggersClause
                ? `🚨 ¡ALERTA DE CLÁUSULA! ${suitor.name} ha depositado la cláusula de rescisión de $${(offeredAmount / 1_000_000).toFixed(1)}M por ${targetPlayer.name}. Ve a Transferencias para intentar renovarle de emergencia.`
                : `📩 OFERTA RECIBIDA: ${suitor.name} ha presentado una oferta formal de ${offerType === 'loan' ? 'cesión' : `$${(offeredAmount / 1_000_000).toFixed(2)}M`} por ${targetPlayer.name}.`,
              createdAt: Date.now()
            });
          }
        }
      }
    }
  }
}
