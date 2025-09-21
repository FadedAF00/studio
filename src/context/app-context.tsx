'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AppConfig, defaultConfig } from '@/lib/config';
import { useAuth } from '@/lib/auth';
import { Skeleton } from '@/components/ui/skeleton';

type AppContextType = {
  config: AppConfig;
  setConfig: Dispatch<SetStateAction<AppConfig>>;
  saveConfig: (newConfig: AppConfig) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [config, setConfig] = useState<AppConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      setLoading(true);
      let loadedConfig = defaultConfig;
      if (user) {
        const docRef = doc(db, 'users', user.uid, 'settings', 'appConfig');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Merge fetched config with default config to ensure all keys are present
          loadedConfig = {
            ...defaultConfig,
            ...(docSnap.data() as Partial<AppConfig>),
          };
        } else {
          // If no config exists, create one with the default values
          await setDoc(docRef, defaultConfig);
        }
      }
      setConfig(loadedConfig);
      setLoading(false);
    };

    if (user) {
      loadConfig();
    } else {
      // If there's no user, we're not in an authenticated context, so stop loading.
      setLoading(false);
    }
  }, [user]);

  const saveConfig = async (newConfig: AppConfig) => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid, 'settings', 'appConfig');
    await setDoc(docRef, newConfig, { merge: true });
    setConfig(newConfig);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ config, setConfig, saveConfig }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
