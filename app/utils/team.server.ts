import { db } from "./db.server";
import type { PlayerProjection } from "./player.server";

export interface TeamRoster {
  qb?: PlayerProjection;
  rb1?: PlayerProjection;
  rb2?: PlayerProjection;
  wr1?: PlayerProjection;
  wr2?: PlayerProjection;
  flex?: PlayerProjection;
  op?: PlayerProjection;
  te?: PlayerProjection;
  k?: PlayerProjection;
  dst?: PlayerProjection;
  bench: PlayerProjection[];
}

export interface TeamDetails {
  id: string;
  name: string;
  owner: string;
  roster: TeamRoster;
}

export async function getTeams(): Promise<TeamDetails[]> {
  const teams = await db.team.findMany({ include: { drafted: true }});
  //TODO: Need to set rosters once I work out draft records
  return teams.map(({ id, name, owner, drafted }) => ({
    id,
    name,
    owner,
    roster: {
      bench: []
    }
  }));
}