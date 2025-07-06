import './globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'
import { toPlainText } from 'next-sanity'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'

import { sanityFetch, SanityLive } from '@/sanity/lib/live' // <-- Import SanityLive here
import { settingsQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { LiveVisualEditing } from '@/components/LiveVisualEditing'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })

  const title = settings?.title || 'STENxSTUDIO'
  const description =
    settings?.description || 'A barebones Next.js and Sanity project.'

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDraftMode = draftMode().isEnabled

  return (
    <html lang="en" className={`${inter.variable} bg-zinc-900 text-zinc-50`}>
      <body>
        <Toaster />
        {/* Pass the SanityLive component as a prop to the client component */}
        {isDraftMode && <LiveVisualEditing SanityLive={SanityLive} />}

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

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}