'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FamousQuote } from '@/components/client/famous-quote';
import { NowPlaying } from '@/components/client/now-playing';
import { SocialLinks } from '@/components/client/social-links';
import { SpotifyEmbeds } from '@/components/client/spotify-embed';
import { Separator } from '@/components/ui/separator';

export function LinkInBioPage() {
  const profilePic = PlaceHolderImages.find((img) => img.id === 'profile-picture');

  return (
    <div className="flex min-h-screen w-full justify-center bg-gradient-to-b from-background to-primary/10 p-4 sm:p-6 md:p-8">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="relative h-32 w-32">
            <Image
              src={profilePic?.imageUrl || 'https://picsum.photos/seed/101/200/200'}
              alt="Profile Picture"
              fill
              priority
              className="rounded-full border-4 border-primary object-cover shadow-lg"
              data-ai-hint={profilePic?.imageHint || 'profile portrait'}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">ConnectVerse</h1>
            <p className="text-md text-muted-foreground">
              Your universe of connections, all in one place.
            </p>
          </div>
        </header>

        <FamousQuote />

        <div className="w-full space-y-6">
          <NowPlaying />
          <SocialLinks />
        </div>

        <Separator className="my-4" />

        <SpotifyEmbeds />
      </div>
    </div>
  );
}
