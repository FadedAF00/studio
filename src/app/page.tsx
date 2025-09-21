import { LinkInBioPage } from '@/components/client/link-in-bio-page';
import { AppConfig, defaultConfig } from '@/lib/config';

async function getConfig(): Promise<AppConfig> {
  // In a static site, we return the hardcoded default config.
  // You can edit the content in src/lib/config.ts
  return defaultConfig;
}

export default async function Home() {
  const config = await getConfig();

  return (
    <div className="flex min-h-screen w-full justify-center bg-gradient-to-b from-background to-primary/10 p-4 sm:p-6 md:p-8">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <LinkInBioPage config={config} />
      </div>
    </div>
  );
}
