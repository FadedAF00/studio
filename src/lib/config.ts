export type SocialLink = {
  id: string;
  label: string;
  icon: string;
  url: string;
  visible: boolean;
};

export type CopyButton = {
  id: string;
  label: string;
  icon: string;
  value: string;
  visible: boolean;
};

export type SpotifyPlaylist = {
  id: string;
  url: string;
  visible: boolean;
};

export type AppConfig = {
  profile: {
    name: string;
    bio: string;
    imageUrl: string;
  };
  socials: SocialLink[];
  copyButtons: CopyButton[];
  playlists: SpotifyPlaylist[];
};

export const defaultConfig: AppConfig = {
  profile: {
    name: 'ConnectVerse',
    bio: 'Your universe of connections, all in one place.',
    imageUrl: 'https://picsum.photos/seed/101/200/200',
  },
  socials: [
    { id: 'discord', label: 'Discord', icon: 'discord', url: '#', visible: true },
    { id: 'x', label: 'X (Twitter)', icon: 'twitter', url: '#', visible: true },
    { id: 'youtube', label: 'YouTube', icon: 'youtube', url: '#', visible: true },
    { id: 'tiktok', label: 'TikTok', icon: 'tiktok', url: '#', visible: true },
    { id: 'twitch', label: 'Twitch', icon: 'twitch', url: '#', visible: true },
    { id: 'bluesky', label: 'BlueSky', icon: 'bluesky', url: '#', visible: true },
    { id: 'spotify', label: 'Spotify Profile', icon: 'spotify', url: '#', visible: true },
  ],
  copyButtons: [
    { id: 'discord-user', label: 'Discord Username', icon: 'discord', value: 'your_user#0000', visible: true },
    { id: 'activision-id', label: 'Activision ID', icon: 'activision', value: 'YourActivisionID', visible: true },
    { id: 'epic-id', label: 'Epic Games ID', icon: 'epic', value: 'YourEpicID', visible: true },
    { id: 'riot-id', label: 'Riot ID', icon: 'riot', value: 'YourRiotID', visible: true },
  ],
  playlists: [
    { id: 'playlist1', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M', visible: true },
    { id: 'playlist2', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui02dT8', visible: true },
  ],
};
