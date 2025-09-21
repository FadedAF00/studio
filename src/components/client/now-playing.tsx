'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { GetIcon } from '@/lib/icons';

const SoundWave = () => (
  <div className="flex items-center gap-0.5">
    {[12, 18, 12, 10, 15].map((height, i) => (
      <div
        key={i}
        className="w-1 bg-primary"
        style={{
          height: `${height}px`,
          animation: `sound-wave 1.2s ease-in-out ${i * 0.2}s infinite alternate`,
        }}
      ></div>
    ))}
    <style jsx>{`
      @keyframes sound-wave {
        0% {
          transform: scaleY(0.3);
        }
        100% {
          transform: scaleY(1);
        }
      }
    `}</style>
  </div>
);

export function NowPlaying() {
  const albumArt = PlaceHolderImages.find((img) => img.id === 'album-art');
  const nowPlaying = {
    artist: 'Lana Del Rey',
    title: 'Summertime Sadness',
    albumArt: albumArt?.imageUrl || 'https://picsum.photos/seed/102/200/200',
    imageHint: albumArt?.imageHint || 'album cover',
  };

  return (
    <Card className="w-full bg-secondary/50 border-0">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={nowPlaying.albumArt}
              alt="Album art"
              fill
              className="rounded-md object-cover"
              data-ai-hint={nowPlaying.imageHint}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate font-bold">{nowPlaying.title}</p>
            <p className="truncate text-sm text-muted-foreground">
              {nowPlaying.artist}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <GetIcon name="spotify" className="h-6 w-6 text-green-500" />
            <SoundWave />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
