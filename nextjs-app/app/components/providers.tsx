// nextjs-app/app/components/providers.tsx
'use client'; // This must be a Client Component

// import { SessionProvider } from 'next-auth/react'; // No longer needed, can be safely removed

import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <> {/* Use a React Fragment if no single parent element is desired */}
      {children}
      <Toaster position="bottom-right" />
      <SpeedInsights />
      <Analytics />
    </>
  );
}