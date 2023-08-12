import type { TeamDetails } from "~/utils/team.server";
import TeamCard from "./team-card";

interface TeamsProps {
  teams: TeamDetails[];
}

const Teams: React.FC<TeamsProps> = ({ teams }) => {
  return (
    <section>
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </section>
  );
}

export default Teams;