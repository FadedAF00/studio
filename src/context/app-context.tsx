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
      let loadedConfig = defaultConfig;
      if (user) {
        const docRef = doc(db, 'users', user.uid, 'settings', 'appConfig');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          loadedConfig = docSnap.data() as AppConfig;
        }
      }
      setConfig(loadedConfig);
      setLoading(false);
    };

    loadConfig();
  }, [user]);

  const saveConfig = async (newConfig: AppConfig) => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid, 'settings', 'appConfig');
    await setDoc(docRef, newConfig);
    setConfig(newConfig);
  };

  if (loading) {
    return null; // Or a loading spinner
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
