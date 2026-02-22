import { useDiscordProfile } from "@/hooks/useDiscordProfile";
import { useGetDiscordActivities } from "@/hooks/useDiscordActivities";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Gamepad2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import CardComponent from "@/components/card";
import type { DiscordStatus } from "@/types/discord";

const DiscordStatusConfig: Record<
  DiscordStatus,
  { label: string; icon: string }
> = {
  online: {
    label: "Online",
    icon: "/online.png",
  },
  idle: {
    label: "Idle",
    icon: "/idle.png",
  },
  dnd: {
    label: "Do Not Disturb",
    icon: "/dnd.png",
  },
  offline: {
    label: "Offline",
    icon: "/offline.png",
  },
};

const formatBio = (bio?: string | null): string => {
  if (!bio) {
    return "";
  }

  return bio
    .replace(/\r?\n/g, "<br />")
    .replace(/<(?:(a):)?([a-zA-Z0-9_]+):(\d+)>/g, (_, animated, name, id) => {
      const ext = animated ? "gif" : "png";
      const url = `https://cdn.discordapp.com/emojis/${id}.${ext}`;

      return `<img
            src="${url}"
            alt=":${name}:"
            class="inline-block h-4 w-4 align-text-bottom"
            draggable="false"
          />`;
    });
};

const resolveDiscordAsset = (image?: string | null): string => {
  if (!image) {
    return "";
  }

  if (image.startsWith("mp:external/")) {
    const httpsIndex = image.indexOf("/https/");
    if (httpsIndex !== -1) {
      const after = image.slice(httpsIndex + "/https/".length);
      return `https://${after}`;
    }
  }

  return image;
};

const formatElapsedTime = (startTimestamp: number): string => {
  const elapsedMs = Date.now() - startTimestamp;
  if (elapsedMs <= 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(elapsedMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `0:${seconds.toString().padStart(2, "0")}`;
  }
};

const formatDuration = (start: number, end: number): string => {
  if (!start || !end || end <= start) {
    return "0:00";
  }

  const totalSeconds = Math.floor((end - start) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function DiscordComponent() {
  const userId = "180300895764873216";
  const { profile } = useDiscordProfile(userId);
  const {
    loading,
    status,
    spotify,
    listeningToSpotify,
    spotifyProgress,
    activity,
  } = useGetDiscordActivities(userId);

  if (loading || !status) {
    return null;
  }

  const discordStatus: DiscordStatus = status?.discord_status;

  return (
    <CardComponent className="overflow-hidden">
      {profile?.user.banner ? (
        <div className="h-32">
          <img
            src={`https://cdn.discordapp.com/banners/${profile?.user.id}/${profile?.user.banner}.png?size=4096`}
            className="h-32 w-full"
            draggable={false}
          />
        </div>
      ) : (
        <div
          style={{
            backgroundColor: profile?.user.banner_color ?? "",
          }}
          className="h-32 w-full"
        ></div>
      )}

      <div className="relative p-4 space-y-3 -mt-14">
        <div className="relative bg-accent rounded-full p-2 w-22 h-22">
          <img
            src={`https://cdn.discordapp.com/avatars/${profile?.user.id}/${profile?.user.avatar}.png?size=64`}
            alt={profile?.user.username}
            className="rounded-full w-22 h-auto"
            draggable={false}
          />
          {profile?.user.avatar_decoration_data?.asset && (
            <img
              src={`https://cdn.discordapp.com/avatar-decoration-presets/${profile?.user.avatar_decoration_data?.asset}.png`}
              className="absolute inset-0 size-full scale-100"
              draggable={false}
            />
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute bottom-1 right-0 h-5 w-5 bg-accent rounded-full p-1">
                <img
                  src={DiscordStatusConfig[discordStatus].icon}
                  draggable={false}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{DiscordStatusConfig[discordStatus].label}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-bold truncate">
            {profile?.user.global_name ?? profile?.user.username}
          </h1>
          <div className="flex items-center gap-2">
            <p className="truncate text-muted-foreground">
              {profile?.user.username}
            </p>
            {profile?.user.primary_guild && (
              <div className="border bg-background shadow-xs dark:bg-input/30 dark:border-input px-2 py-0.5 rounded-md flex items-center gap-1">
                <img
                  src={`https://cdn.discordapp.com/clan-badges/${profile?.user.primary_guild.identity_guild_id}/${profile?.user.primary_guild.badge}.png`}
                  className="h-3 w-3"
                  draggable={false}
                />
                <p className="text-xs text-muted-foreground truncate">
                  {profile?.user.primary_guild.tag}
                </p>
              </div>
            )}
            <div className="flex items-center gap-1">
              {profile?.badges.map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger asChild>
                    <img
                      src={`https://cdn.discordapp.com/badge-icons/${badge.icon}.png`}
                      alt={badge.description}
                      className="h-5 w-5"
                      draggable={false}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p
            className="text-xs text-muted-foreground whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: formatBio(profile?.user_profile.bio || "No bio yet..."),
            }}
          ></p>
        </div>

        {listeningToSpotify ? (
          <CardComponent className="text-xs space-y-2 p-2">
            <p className="text-muted-foreground">Listening to Spotify</p>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  {spotify?.album_art_url && (
                    <img
                      src={spotify?.album_art_url}
                      className="h-18 w-18 rounded-md object-cover"
                      draggable={false}
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{spotify?.album}</p>
                </TooltipContent>
              </Tooltip>

              <div className="flex flex-col justify-center min-w-0 w-full">
                <a
                  href={`https://open.spotify.com/track/${spotify?.track_id}`}
                  target="_blank"
                  className="font-medium truncate hover:underline cursor-pointer"
                >
                  {spotify?.song}
                </a>
                <p className="text-muted-foreground truncate">
                  {spotify?.artist}
                </p>
                <div className="mt-2">
                  <Progress
                    value={spotifyProgress}
                    indicatorColor="bg-green-500"
                    className="h-1"
                  />
                </div>
                {spotify?.timestamps && (
                  <div className="flex justify-between text-muted-foreground mt-1">
                    <span>{formatElapsedTime(spotify?.timestamps.start)}</span>
                    <span>
                      {formatDuration(
                        spotify?.timestamps.start,
                        spotify?.timestamps.end,
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardComponent>
        ) : (
          <CardComponent className="text-xs space-y-2 p-2">
            <p className="text-muted-foreground">
              Not listening to anything...
            </p>
          </CardComponent>
        )}

        {activity ? (
          <CardComponent className="text-xs space-y-2 p-2">
            <p className="text-muted-foreground">Playing</p>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  {activity?.assets?.large_image && (
                    <img
                      src={resolveDiscordAsset(activity?.assets?.large_image)}
                      alt={activity?.name}
                      className="h-18 w-18 rounded-md object-cover"
                      draggable={false}
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{activity?.assets?.large_text}</p>
                </TooltipContent>
              </Tooltip>

              <div className="flex flex-col justify-center min-w-0">
                <p className="font-medium truncate">{activity?.name}</p>
                <p className="text-muted-foreground truncate">
                  {activity?.details ?? ""}
                </p>
                <p className="text-muted-foreground truncate">
                  {activity?.state ?? ""}
                </p>
                {activity?.timestamps?.start && (
                  <p className="text-green-500 truncate flex items-center gap-1 mt-2">
                    <Gamepad2 size={14} />
                    {formatElapsedTime(activity?.timestamps.start)}
                  </p>
                )}
              </div>
            </div>
          </CardComponent>
        ) : (
          <CardComponent className="text-xs space-y-2 p-2">
            <p className="text-muted-foreground">Not playing anything...</p>
          </CardComponent>
        )}
      </div>
    </CardComponent>
  );
}
