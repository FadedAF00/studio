'use client';
import Image from 'next/image';
import { NowPlaying } from '@/components/client/now-playing';
import { SocialLinks } from '@/components/client/social-links';
import { SpotifyEmbeds } from '@/components/client/spotify-embed';
import { Separator } from '@/components/ui/separator';
import type { AppConfig } from '@/lib/config';

export function LinkInBioPage({ config }: { config: AppConfig }) {
  const { name, bio, imageUrl } = config.profile;

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <div className="relative h-32 w-32">
          <Image
            src={imageUrl}
            alt="Profile Picture"
            width={128}
            height={128}
            priority
            className="rounded-full border-4 border-primary object-cover shadow-lg"
            data-ai-hint={'profile portrait'}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{name}</h1>
          <p className="text-md text-muted-foreground">{bio}</p>
        </div>
      </header>

      <div className="w-full space-y-6">
        <NowPlaying />
        <SocialLinks socials={config.socials} copyButtons={config.copyButtons} />
      </div>

      <Separator className="my-4" />

      <SpotifyEmbeds playlists={config.playlists} />
    </>
  );
}
