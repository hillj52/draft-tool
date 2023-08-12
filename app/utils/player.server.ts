import type {
  PassingStats,
  RecievingStats,
  RushingStats,
} from "@prisma/client";
import { Position } from "@prisma/client";
import { db } from "./db.server";

export interface PlayerProjection {
  id: string;
  name: string;
  team: string;
  position: Position;
  projectedPoints: number;
  byeWeek: number;
  value: number;
}

export async function getAvailablePlayers(): Promise<PlayerProjection[]> {
  const players = await db.player.findMany({
    where: {
      drafted: false,
    },
    include: {
      passingStats: true,
      rushingStats: true,
      recievingStats: true,
    },
  });

  const kickers = await db.kicker.findMany({ where: { drafted: false } });

  const defenses = await db.defense.findMany({ where: { drafted: false } });

  const availablePlayers = [
    ...players.map(
      ({
        id,
        name,
        team,
        position,
        byeWeek,
        value,
        passingStats,
        rushingStats,
        recievingStats,
      }) => ({
        id,
        name,
        team,
        byeWeek,
        value,
        position,
        projectedPoints: +(
          (passingStats ? calculatePassingPoints(passingStats) : 0) +
          (rushingStats ? calculateRushingPoints(rushingStats) : 0) +
          (recievingStats ? calculateRecievingPoints(recievingStats) : 0)
        ).toFixed(2),
      })
    ),
    ...kickers.map(({ id, name, team, projectedPoints, byeWeek, value }) => ({
      id,
      name,
      team,
      projectedPoints,
      byeWeek,
      value,
      position: Position.K,
    })),
    ...defenses.map(({ id, name, team, projectedPoints, byeWeek, value }) => ({
      id,
      name,
      team,
      projectedPoints,
      byeWeek,
      value,
      position: Position.DST,
    })),
  ];

  return availablePlayers;
}

export function calculatePassingPoints({
  yards,
  touchdowns,
  interceptions,
}: PassingStats) {
  return yards / 25 + touchdowns * 6 - interceptions * 2;
}

export function calculateRushingPoints({
  yards,
  touchdowns,
  fumblesLost,
}: RushingStats) {
  return yards / 10 + touchdowns * 6 - fumblesLost * 2;
}

export function calculateRecievingPoints({
  yards,
  receptions,
  touchdowns,
}: RecievingStats) {
  return yards / 10 + touchdowns * 6 + receptions;
}
