import type { PlayerProjection } from "~/utils/player.server";
import { Position } from "@prisma/client";
import PlayerList from "./player-list";
import { useContext } from 'react';
import { PlayerContext } from './player-context';

interface AvailablePlayersProps {
  availablePlayers: PlayerProjection[];
}

const AvailablePlayers: React.FC<AvailablePlayersProps> = ({
  availablePlayers,
}) => {
  const { featuredPlayer } = useContext(PlayerContext);
  return (
    <>
      <div>Player Search Bar!</div>
      <span>Featured Player ID: {featuredPlayer}</span>
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
