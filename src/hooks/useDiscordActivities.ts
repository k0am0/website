import { useLanyard } from "react-use-lanyard";
import { useEffect, useState } from "react";

export function useGetDiscordActivities(userId: string) {
  const { loading, status } = useLanyard({
    userId,
    socket: true,
  });

  const [spotifyProgress, setSpotifyProgress] = useState<number>(0);

  useEffect(() => {
    if (!status?.listening_to_spotify || !status?.spotify?.timestamps) {
      return;
    }

    const { start, end } = status?.spotify?.timestamps;

    const update = () => {
      const now = Date.now();
      const percent = ((now - start) / (end - start)) * 100;
      setSpotifyProgress(Math.min(100, Math.max(0, percent)));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [status?.listening_to_spotify, status?.spotify?.timestamps]);

  return {
    loading,
    status,
    spotify: status?.spotify,
    listeningToSpotify: status?.listening_to_spotify ?? false,
    spotifyProgress,
    activity: status?.activities?.find((a) => a.type === 0),
  };
}
