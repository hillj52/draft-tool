import type { TeamDetails } from "~/utils/team.server";
import Card from "../UI/card";
import TeamCardPlayer from "./team-card-player";
import type { PlayerProjection } from "~/utils/player.server";

interface TeamCardProps {
  team: TeamDetails;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  function renderBench() {
    if (!team.roster.bench || team.roster.bench.length === 0) {
      return [
        <TeamCardPlayer key="b0" player={undefined} position="Bench" />,
        <TeamCardPlayer key="b1" player={undefined} position="Bench" />,
        <TeamCardPlayer key="b2" player={undefined} position="Bench" />,
        <TeamCardPlayer key="b3" player={undefined} position="Bench" />,
        <TeamCardPlayer key="b4" player={undefined} position="Bench" />,
        <TeamCardPlayer key="b5" player={undefined} position="Bench" />,
        <TeamCardPlayer key="b6" player={undefined} position="Bench" />,
      ];
    }
    const bench: (PlayerProjection | undefined)[] = [...team.roster.bench];
      while (bench.length < 6) {
        bench.push(undefined);
      }
      return bench.map((benchPlayer, index) => (
        <TeamCardPlayer
          key={`b${index}`}
          player={benchPlayer}
          position="Bench"
        />
      ));
  }

  return (
    <section className='team-card'>
      <Card onClick={() => console.log(team.id)}>
        <header className='team-header'>
          <div>{team.name}</div>
          <div>{team.owner}</div>
        </header>
        <hr className='border' />
        <TeamCardPlayer player={team.roster.qb} position="QB" />
        <TeamCardPlayer player={team.roster.rb1} position="RB" />
        <TeamCardPlayer player={team.roster.rb2} position="RB" />
        <TeamCardPlayer player={team.roster.wr1} position="WR" />
        <TeamCardPlayer player={team.roster.wr2} position="WR" />
        <TeamCardPlayer player={team.roster.flex} position="Flex" />
        <TeamCardPlayer player={team.roster.op} position="OP" />
        <TeamCardPlayer player={team.roster.te} position="TE" />
        <TeamCardPlayer player={team.roster.k} position="K" />
        <TeamCardPlayer player={team.roster.dst} position="DST" />
        <br />
        {renderBench()}
      </Card>
    </section>
  );
}

export default TeamCard;