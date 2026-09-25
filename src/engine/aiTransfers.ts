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

  // 1-2 AI transactions per week in transfer window
  const transferCount = Math.floor(Math.random() * 2) + 1;

  for (let tIdx = 0; tIdx < transferCount; tIdx++) {
    // Pick buyer team
    const buyer = aiTeams[Math.floor(Math.random() * aiTeams.length)];
    const buyerPlayers = playerMap.get(buyer.id!) || [];

    const isRealMadrid = buyer.name.toLowerCase().includes('madrid') || buyer.name.toLowerCase().includes('real');
    const isBarca = buyer.name.toLowerCase().includes('catalunya') || buyer.name.toLowerCase().includes('barca') || buyer.name.toLowerCase().includes('barcelona');
    const isPrem = buyer.domesticLeague === 'Premier League';

    // Find candidate targets from other AI teams
    let candidatePlayers = allPlayers.filter(p => p.teamId && p.teamId !== buyer.id! && p.teamId !== userTeamId);

    if (isRealMadrid) {
      // Real Madrid buys stars (OVR >= 82)
      candidatePlayers = candidatePlayers.filter(p => p.overall >= 82);
    } else if (isBarca) {
      // Barca prefers young talents (Age <= 23, Potential >= 80)
      candidatePlayers = candidatePlayers.filter(p => p.age <= 23 && p.potential >= 80);
    } else {
      // General team buys player who improves their average overall
      const currentAvg = buyerPlayers.length > 0 ? buyerPlayers.reduce((a,b)=>a+b.overall, 0)/buyerPlayers.length : 70;
      candidatePlayers = candidatePlayers.filter(p => p.overall >= currentAvg - 2);
    }

    if (candidatePlayers.length === 0) continue;

    // Pick top target
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
  }
}
