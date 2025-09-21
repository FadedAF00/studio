import { LinkInBioPage } from '@/components/client/link-in-bio-page';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AppConfig, defaultConfig } from '@/lib/config';
import { FamousQuote } from '@/components/client/famous-quote';

// This is the default user ID for the single-user version of this app.
// In a multi-user scenario, you would fetch this dynamically.
const STATIC_USER_ID = 'z36iT5mZq8a8y5Y2R0aZ';

async function getConfig(): Promise<AppConfig> {
  if (!STATIC_USER_ID) {
    return defaultConfig;
  }
  try {
    const docRef = doc(db, 'users', STATIC_USER_ID, 'settings', 'appConfig');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as AppConfig;
    }
  } catch (error) {
    console.error('Error fetching config, returning default:', error);
  }
  return defaultConfig;
}

export default async function Home() {
  const config = await getConfig();

  return (
    <div className="flex min-h-screen w-full justify-center bg-gradient-to-b from-background to-primary/10 p-4 sm:p-6 md:p-8">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <LinkInBioPage config={config} />
        <FamousQuote />
      </div>
    </div>
  );
}
