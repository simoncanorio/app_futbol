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

  // 1-3 AI transactions per week in transfer window
  const transferCount = Math.floor(Math.random() * 3) + 1;

  for (let tIdx = 0; tIdx < transferCount; tIdx++) {
    // Pick buyer team randomly
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

    // 2. Try signing Free Agent if squad is small or needs gap filled
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

    // Filter by position if gap identified
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

    const fee = Math.round(target.contract * (isPrem ? 1.4 : 1.2));
    if (buyer.budget < fee) continue;

    const sellerTeamId = target.teamId!;
    const seller = aiTeams.find(x => x.id === sellerTeamId);

    // Transfer execution
    target.teamId = buyer.id!;
    buyer.budget -= fee;

    if (seller) {
      seller.budget += fee;
      await db.teams.put(seller);
    }

    await db.players.put(target);
    await db.teams.put(buyer);

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

    // Generate news note if high-profile move (overall >= 84)
    if (target.overall >= 84) {
      await db.notes.add({
        leagueId: league.id!,
        entityType: 'general',
        text: `🔥 TRASPASO BOMBA: ${buyer.name} fichó a ${target.name} (${target.position}, OVR ${target.overall}) por $${(fee / 1_000_000).toFixed(2)}M.`,
        createdAt: Date.now()
      });
    }
  }
}
