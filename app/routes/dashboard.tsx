import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AvailablePlayers from "~/components/player/available-players";
import Teams from "~/components/team/teams";
import { getAvailablePlayers } from "~/utils/player.server";
import { getTeams } from "~/utils/team.server";

export const loader = async () => {
  const availablePlayer = await getAvailablePlayers();
  const valueRemaining = availablePlayer.reduce((acc, { value }) => acc + value, 0);
  const teams = await getTeams();
  return json({ availablePlayer, teams, valueRemaining });
}

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();
  //const [featuredPlayer, setFeaturedPlayer] = useState<Player | null>(null);
  //const [featuredTeam, setFeaturedTeam] = useState<Team | null>(null);
  
  console.log(data.availablePlayer);

  return (
    <main>
      <span>
        Total Money Remaining: Not yet Implemented
        Total Value Remaining: ${data.valueRemaining}
      </span>
      <Teams teams={data.teams}/>
      <br />
      <AvailablePlayers availablePlayers={data.availablePlayer}/>
    </main>
  );
}