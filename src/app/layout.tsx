import type { Metadata } from 'next';
import './globals.css';
import { AppContextProvider } from '@/context/app-context';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Cog } from 'lucide-react';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'ConnectVerse',
  description: 'Your universe of connections, all in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-headline antialiased">
        <AuthProvider>
          <AppContextProvider>
            <main>{children}</main>
            <footer className="fixed bottom-4 right-4">
              <Link href="/admin">
                <Cog className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
                <span className="sr-only">Admin Settings</span>
              </Link>
            </footer>
            <Toaster />
          </AppContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
