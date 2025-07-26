// app/layout.tsx

import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = draftMode();

  return (
    <html lang="en">
      <body className="bg-bg-stone-950 dark:bg-stone-950 min-h-screen">
        {children}
        {/*
          This is the correct pattern for Visual Editing.
          It ensures VisualEditing and live preview features are only
          rendered when draft mode is enabled.
        */}
        {isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        {/*
          The SanityLive component is for live query subscriptions.
          It should be rendered on every page, regardless of draft mode,
          to handle real-time updates.
        */}
        <SanityLive />
      </body>
    </html>
  );
}