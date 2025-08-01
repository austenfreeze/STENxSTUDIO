// nextjs-app/components/providers.tsx
'use client'; // This must be a Client Component

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner'; // If you're using sonner
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster position="bottom-right" />
      <SpeedInsights />
      <Analytics />
    </SessionProvider>
  );
}