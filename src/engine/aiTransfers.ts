import { db, type Team, type Player, type League } from '../db/db';

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

  // Difficulty multiplier
  let difficultyFactor = 1.1;
  if (league.difficulty === 'Hard') difficultyFactor = 1.35;
  if (league.difficulty === 'Insane') difficultyFactor = 1.6;

  // 1-3 AI transactions per week in transfer window
  const transferCount = Math.floor(Math.random() * 3) + 1;

  for (let tIdx = 0; tIdx < transferCount; tIdx++) {
    const buyer = aiTeams[Math.floor(Math.random() * aiTeams.length)];
    const buyerPlayers = playerMap.get(buyer.id!) || [];

    const isRealMadrid = buyer.name.toLowerCase().includes('madrid') || buyer.name.toLowerCase().includes('real');
    const isBarca = buyer.name.toLowerCase().includes('catalunya') || buyer.name.toLowerCase().includes('barca') || buyer.name.toLowerCase().includes('barcelona');
    const isPrem = buyer.domesticLeague === 'Premier League';

    // 1. Check positional gaps in buyer team
    const gks = buyerPlayers.filter(p => p.position === 'POR').length;
    const defs = buyerPlayers.filter(p => p.position === 'DEF').length;
    const meds = buyerPlayers.filter(p => p.position === 'MED').length;
    const fwds = buyerPlayers.filter(p => p.position === 'DEL').length;

    let targetPosition: 'POR' | 'DEF' | 'MED' | 'DEL' | null = null;
    if (gks < 2) targetPosition = 'POR';
    else if (fwds < 3) targetPosition = 'DEL';
    else if (defs < 5) targetPosition = 'DEF';
    else if (meds < 5) targetPosition = 'MED';

    // 2. Try signing Free Agent if squad is small
    const freeAgents = allPlayers.filter(p => !p.teamId);
    if (buyerPlayers.length < 20 && freeAgents.length > 0) {
      let faCandidates = targetPosition ? freeAgents.filter(p => p.position === targetPosition) : freeAgents;
      if (faCandidates.length === 0) faCandidates = freeAgents;

      faCandidates.sort((a, b) => b.overall - a.overall);
      const topFA = faCandidates[0];

      if (topFA && topFA.overall >= 68) {
        topFA.teamId = buyer.id!;
        topFA.lineupStatus = 'reserve';
        await db.players.put(topFA);

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

    // 3. Trade/Transfer candidate targets from other AI teams
    let candidatePlayers = allPlayers.filter(p => p.teamId && p.teamId !== buyer.id! && p.teamId !== userTeamId);

    if (targetPosition) {
      const posFiltered = candidatePlayers.filter(p => p.position === targetPosition);
      if (posFiltered.length > 0) candidatePlayers = posFiltered;
    }

    if (isRealMadrid) {
      candidatePlayers = candidatePlayers.filter(p => p.overall >= 82);
    } else if (isBarca) {
      candidatePlayers = candidatePlayers.filter(p => p.age <= 23 && p.potential >= 80);
    } else {
      const currentAvg = buyerPlayers.length > 0 ? buyerPlayers.reduce((a, b) => a + b.overall, 0) / buyerPlayers.length : 70;
      candidatePlayers = candidatePlayers.filter(p => p.overall >= currentAvg - 2);
    }

    if (candidatePlayers.length === 0) continue;

    // Pick top target from best available candidates
    candidatePlayers.sort((a, b) => b.overall - a.overall);
    const target = candidatePlayers[Math.floor(Math.random() * Math.min(5, candidatePlayers.length))];

    const sellerTeamId = target.teamId!;
    const seller = aiTeams.find(x => x.id === sellerTeamId);

    // Player Personality, Prestige & Morale Checks (Task 1 & Task 3)
    if (seller) {
      const buyerPrestige = buyer.prestige || 70;
      const sellerPrestige = seller.prestige || 70;
      const playerMorale = target.morale || 85;

      // Unhappy players (morale < 40 or transfer listed) WANT to leave!
      // Otherwise, players hesitation check if buyer prestige is significantly lower
      if (buyerPrestige < sellerPrestige - 12 && playerMorale > 40 && !target.unhappy && !target.isTransferListed) {
        continue; // Refuses transfer to lower prestige club unless unhappy!
      }

      if ((target.personality === 'Ambicioso' || target.overall >= 84) && buyer.overall < seller.overall - 4 && !target.isTransferListed) {
        continue; // Ambicious player refuses transfer to smaller club!
      }
    }

    // Loyal players refuse to leave unless transfer listed
    if (target.personality === 'Leal' && !target.isTransferListed && Math.random() < 0.75) {
      continue;
    }

    // Real Madrid vs Barcelona Rivalry Lock Check (Task 3)
    let rivalryMultiplier = 1.0;
    if (seller) {
      const sellerIsReal = seller.name.toLowerCase().includes('madrid') || seller.name.toLowerCase().includes('real');
      const sellerIsBarca = seller.name.toLowerCase().includes('catalunya') || seller.name.toLowerCase().includes('barca') || seller.name.toLowerCase().includes('barcelona');

      if ((isRealMadrid && sellerIsBarca) || (isBarca && sellerIsReal)) {
        rivalryMultiplier = 2.5; // Exorbitant anti-rivalry release clause fee!
      }
    }

    // Greedy personality increases fee
    const greedyMultiplier = target.personality === 'Avaricioso' ? 1.35 : 1.0;

    const fee = Math.round(target.contract * (isPrem ? 1.4 : 1.2) * difficultyFactor * rivalryMultiplier * greedyMultiplier);
    if (buyer.budget < fee) continue;

    // Transfer execution
    target.teamId = buyer.id!;
    buyer.budget -= fee;

    if (seller) {
      seller.budget += fee;
      await db.teams.put(seller);
    }

    await db.players.put(target);
    await db.teams.put(buyer);

    // 5. Transfer list surplus management: if buyer now has surplus in target position, list lowest OVR player
    const updatedBuyerPlayers = [...buyerPlayers, target];
    const samePosSurplus = updatedBuyerPlayers.filter(p => p.position === target.position).sort((a, b) => a.overall - b.overall);
    if (samePosSurplus.length > 5) {
      const surplus = samePosSurplus[0];
      if (surplus.id !== target.id) {
        surplus.isTransferListed = true;
        await db.players.put(surplus);
      }
    }

    // Record Transaction
    await db.transactions.add({
      leagueId: league.id!,
      type: 'transfer',
      playerId: target.id!,
      fromTeamId: sellerTeamId,
      toTeamId: buyer.id!,
      amount: fee,
      season: league.season,
      week: league.currentWeek,
      date: Date.now()
    });

    // Generate news note if high-profile move
    if (target.overall >= 84 || rivalryMultiplier > 1.5) {
      await db.notes.add({
        leagueId: league.id!,
        entityType: 'general',
        text: `🔥 TRASPASO BOMBA: ${buyer.name} fichó a ${target.name} (${target.position}, OVR ${target.overall}) por $${(fee / 1_000_000).toFixed(2)}M.`,
        createdAt: Date.now()
      });
    }
  }
}
