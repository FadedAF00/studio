'use client';
import { useAppContext } from '@/context/app-context';
import { Card } from '@/components/ui/card';

export function SpotifyEmbeds() {
  const { config } = useAppContext();
  const visiblePlaylists = config.playlists.filter((p) => p.visible);

  if (visiblePlaylists.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-center text-2xl font-bold">My Playlists</h2>
      {visiblePlaylists.map((playlist) => (
        <Card key={playlist.id} className="overflow-hidden border-0">
          <iframe
            style={{ borderRadius: '12px' }}
            src={playlist.url}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </Card>
      ))}
    </div>
  );
}
