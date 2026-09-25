import { db, type Player } from '../db/db';

export async function autoSelectLineupForTeam(teamId: number): Promise<Player[]> {
  const players = await db.players.where('teamId').equals(teamId).toArray();
  if (players.length === 0) return [];

  // Reset non-youth players
  for (const p of players) {
    if (p.lineupStatus !== 'youth') {
      p.lineupStatus = 'reserve';
      p.pitchPosition = undefined;
    }
  }

  // 1. GK (POR)
  const gks = players.filter(p => p.position === 'POR').sort((a, b) => b.overall - a.overall);
  const starterGK = gks[0] || players.sort((a, b) => b.overall - a.overall)[0];
  if (starterGK) {
    starterGK.lineupStatus = 'starter';
    starterGK.pitchPosition = 'GK';
  }

  // 2. DEF (4)
  const defs = players.filter(p => p.position === 'DEF' && p.id !== starterGK?.id).sort((a, b) => b.overall - a.overall);
  const defSlots = ['LB', 'CB1', 'CB2', 'RB'];
  defs.slice(0, 4).forEach((p, idx) => {
    p.lineupStatus = 'starter';
    p.pitchPosition = defSlots[idx];
  });

  // 3. MED (4)
  const meds = players.filter(p => p.position === 'MED' && p.lineupStatus !== 'starter').sort((a, b) => b.overall - a.overall);
  const medSlots = ['CM1', 'CDM', 'CM2', 'CAM'];
  meds.slice(0, 4).forEach((p, idx) => {
    p.lineupStatus = 'starter';
    p.pitchPosition = medSlots[idx];
  });

  // 4. DEL (2)
  const fwds = players.filter(p => p.position === 'DEL' && p.lineupStatus !== 'starter').sort((a, b) => b.overall - a.overall);
  const fwdSlots = ['LW', 'ST'];
  fwds.slice(0, 2).forEach((p, idx) => {
    p.lineupStatus = 'starter';
    p.pitchPosition = fwdSlots[idx];
  });

  // Fill up to 11 starters if any position lacked players
  let starters = players.filter(p => p.lineupStatus === 'starter');
  if (starters.length < 11) {
    const remaining = players.filter(p => p.lineupStatus !== 'starter' && p.lineupStatus !== 'youth').sort((a, b) => b.overall - a.overall);
    const needed = 11 - starters.length;
    remaining.slice(0, needed).forEach(p => {
      p.lineupStatus = 'starter';
    });
  }

  // Set next 7 best remaining as bench
  const remainingNonStarters = players.filter(p => p.lineupStatus !== 'starter' && p.lineupStatus !== 'youth').sort((a, b) => b.overall - a.overall);
  remainingNonStarters.slice(0, 7).forEach(p => {
    p.lineupStatus = 'bench';
  });

  await db.players.bulkPut(players);
  return players;
}

export async function checkLineupReady(teamId: number): Promise<boolean> {
  const players = await db.players.where('teamId').equals(teamId).toArray();
  const starters = players.filter(p => p.lineupStatus === 'starter');
  return starters.length === 11;
}
