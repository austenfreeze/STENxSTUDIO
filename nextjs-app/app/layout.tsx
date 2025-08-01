// app/layout.tsx (No changes from previous version, kept for context)
import type React from "react"
import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { draftMode } from "next/headers"
import { toPlainText } from "next-sanity"
import { Suspense } from "react"

import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { settingsQuery } from "@/sanity/lib/queries"
import { resolveOpenGraphImage } from "@/sanity/lib/utils"
import { LiveVisualEditing } from "@/components/LiveVisualEditing"
import AppProviders from "@/components/providers" // This import stays

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })

  const title = settings?.title || "STENxSTUDIO"
  const description = settings?.description || "A barebones Next.js and Sanity project."

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase ? new URL(settings.ogImage.metadataBase) : undefined
  } catch {
    metadataBase = undefined
  }

  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const draftModeData = await draftMode()
  const isDraftMode = draftModeData.isEnabled

  return (
    <html lang="en" className={`${inter.variable} bg-zinc-900 text-zinc-50`}>
      <body>
        {/* AppProviders (now without SessionProvider) still wraps children */}
        <AppProviders>
          <Suspense fallback={<div>Loading...</div>}>
            {/* LiveVisualEditing remains active for Sanity Visual Editing */}
            {isDraftMode && <LiveVisualEditing />}
          </Suspense>

          <header className="border-b border-zinc-800 p-4">
            <div className="container mx-auto">
              <h1 className="text-xl font-bold">My Sanity Project</h1>
            </div>
          </header>

          <main className="min-h-screen container mx-auto p-4">{children}</main>

          <footer className="border-t border-zinc-800 p-4 mt-12">
            <div className="container mx-auto text-center text-zinc-500">
              <p>&copy; 2025 My Project. All rights reserved.</p>
            </div>
          </footer>
        </AppProviders>
      </body>
    </html>
  )
}