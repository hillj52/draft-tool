import type { Position } from "@prisma/client";
import type { PlayerProjection } from "~/utils/player.server";
import PlayerCard from "./player-card";

interface PlayerListProps {
  players: PlayerProjection[];
  position: Position
}

const PlayerList: React.FC<PlayerListProps> = ({ players, position }) => (
  <section className="player-list">
    <h1>{position}</h1>
    <div className="players">
      {players
        .sort((p1, p2) => p2.projectedPoints - p1.projectedPoints)
        .map(player => (
          <PlayerCard key={player.id} player={player} />
        ))
      }
    </div>
  </section>
);

export default PlayerList;