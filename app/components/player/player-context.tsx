import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";

type PlayerContextType = {
  featuredPlayer: string | null,
  featurePlayer: (id: string) => void,
  unfeaturePlayer: () => void,
}

const initialContext: PlayerContextType = {
  featuredPlayer: null,
  featurePlayer: () => {},
  unfeaturePlayer: () => {},
}

export const PlayerContext = createContext<PlayerContextType>(initialContext);

const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [featuredPlayer, setFeaturedPlayer] = useState<string | null>(null);
  const featurePlayer = (id: string) => setFeaturedPlayer(id);
  const unfeaturePlayer = () => setFeaturedPlayer(null);
  
  return (
    <PlayerContext.Provider value={{ featuredPlayer, featurePlayer, unfeaturePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;