import { useEffect, useState } from "react";
import type { DiscordProfile } from "@/types/discord";

export function useDiscordProfile(userId: string) {
  const [profile, setProfile] = useState<DiscordProfile | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          `https://discord-api-shit.k0am0.workers.dev/api/v69/${userId}`,
        );
        if (!res.ok) {
          return;
        }

        const data = await res.json();
        setProfile(data || null);
      } catch (err) {
        console.error("failed to fetch user:", err);
      }
    }

    fetchUser();
  }, [userId]);

  return {
    profile,
  };
}
