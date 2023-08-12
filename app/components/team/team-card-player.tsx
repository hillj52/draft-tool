import type { Position } from "@prisma/client";
import type { PlayerProjection } from "~/utils/player.server";

interface TeamCardPlayerProps {
  player?: PlayerProjection;
  position: Position | 'OP' | 'Flex' | 'Bench';
}

const TeamCardPlayer: React.FC<TeamCardPlayerProps> = ({ player, position }) => (
  <div>
    <div>
      <span className='position'>{position}</span>
      <span className='name'>{player ? player.name : ''}</span>
      {player && position === 'Bench' && <span> - {player.position}</span>}
    </div>
    <div>
      <span className='team'>{player ? player.team : ''}</span>
      <span className='bye-week'>{player ? player.byeWeek : ''}</span>
      <span className='price'>{player ? '0.00' : ''}</span>
    </div>
  </div>
);

export default TeamCardPlayer