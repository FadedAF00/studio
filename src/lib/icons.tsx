import {
  Twitter,
  Youtube,
  Twitch,
  Link,
  Gamepad2,
  Home,
} from 'lucide-react';
import { Discord } from '@/components/icons/discord';
import { Tiktok } from '@/components/icons/tiktok';
import { Bluesky } from '@/components/icons/bluesky';
import { Spotify } from '@/components/icons/spotify';
import React from 'react';

export const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  discord: Discord,
  twitter: Twitter,
  youtube: Youtube,
  tiktok: Tiktok,
  twitch: Twitch,
  bluesky: Bluesky,
  spotify: Spotify,
  sunk: Link,
  activision: Gamepad2,
  epic: Gamepad2,
  riot: Gamepad2,
  home: Home,
  default: Link,
};

export const GetIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = iconMap[name] || iconMap.default;
  return <IconComponent className={className} />;
};
