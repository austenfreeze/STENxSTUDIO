// components/providers.tsx
"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner"; // Assuming Toaster is a client component
import { SpeedInsights } from "@vercel/speed-insights/next"; // Assuming SpeedInsights is client component
import { Analytics } from "@vercel/analytics/react"; // Assuming Analytics is client component

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      {/* Any other client-side providers or global wrappers */}
      <Toaster /> {/* Toaster should be inside the client component boundary */}
      {children}
      <SpeedInsights /> {/* Vercel components often need to be within client boundaries */}
      <Analytics /> {/* Vercel components often need to be within client boundaries */}
    </SessionProvider>
  );
}