import type { PlayerProjection } from "~/utils/player.server";
import { Position } from "@prisma/client";
import PlayerList from "./player-list";

interface AvailablePlayersProps {
  availablePlayers: PlayerProjection[];
}

const AvailablePlayers: React.FC<AvailablePlayersProps> = ({
  availablePlayers,
}) => {
  return (
    <>
      <div>Player Search Bar!</div>
      <span>Featured Player ID: {}</span>
      {Object.keys(Position).map((position) => (
        <PlayerList
          key={position}
          position={position as Position}
          players={availablePlayers.filter(
            (player) => player.position === position
          )}
        />
      ))}
    </>
)
};

export default AvailablePlayers;
