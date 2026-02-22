export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface DiscordProfile {
  user: DiscordUser;
  user_profile: UserProfile;
  connected_accounts: ConnectedAccount[];
  badges: DiscordBadge[];
  cached: boolean;
}

export interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
  avatar_decoration_data: AvatarDecorationData | null;
  collectibles: Collectibles | null;
  discriminator: string;
  display_name_styles: DisplayNameStyles | null;
  public_flags: number;
  primary_guild: PrimaryGuild | null;
  clan: string | null;
  flags: number;
  banner: string | null;
  banner_color: string | null;
  accent_color: number | null;
  bio: string;
}

export interface PrimaryGuild {
  identity_guild_id: string;
  identity_enabled: boolean;
  tag: string;
  badge: string;
}

export interface AvatarDecorationData {
  asset: string;
  sku_id: string;
  expires_at: string | null;
}

export interface Collectibles {
  nameplate: Nameplate | null;
}

export interface Nameplate {
  asset: string;
  palette: string;
  label: string;
  sku_id: string;
  expires_at: string | null;
}

export interface DisplayNameStyles {
  font_id: number;
  effect_id: number;
  colors: number[];
}

export interface UserProfile {
  bio: string;
  accent_color: number | null;
  pronouns: string;
  profile_effect: ProfileEffect | null;
  banner: string | null;
  theme_colors: number[];
  popout_animation_particle_type: string | null;
  emoji: string | null;
}

export interface ProfileEffect {
  id: string;
  sku_id: string;
  expires_at: string | null;
}

export interface ConnectedAccount {
  type: string;
  id: string;
  name: string;
  verified: boolean;
}

export interface DiscordBadge {
  id: string;
  description: string;
  icon: string;
  link?: string;
}
