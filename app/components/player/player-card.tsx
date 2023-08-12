import type { PlayerProjection } from "~/utils/player.server"
import Card from "../UI/card";

interface PlayerCardProps {
  player: PlayerProjection;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const clickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('Feature Player:', player.id);
  }

  return (
    <Card key={player.id} className={'player ' + player.position} onClick={clickHandler}>
      <div className='name'>{player.name}</div>
      <div className='team'>{player.team}</div>
      <div className='position'>{player.position}</div>
      <div className='bye'>{player.byeWeek}</div>
      <div className='price'>
        Value: {player.value} Max Bid: 0.00
      </div>
    </Card>
  );
}

export default PlayerCard;