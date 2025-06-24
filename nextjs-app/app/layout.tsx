import "./globals.css"

import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { draftMode } from "next/headers"
import { VisualEditing, toPlainText } from "next-sanity"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/react"

import DraftModeToast from "@/app/components/DraftModeToast"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import { DisableDraftMode } from "@/components/DisableDraftMode"

import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { settingsQuery } from "@/sanity/lib/queries"
import { resolveOpenGraphImage } from "@/sanity/lib/utils"
import { handleError } from "./client-utils"

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
  const description =
    settings?.description ||
    "Developer control center for managing and auditing integrations."

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body>
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        <SanityLive onError={handleError} />

        {/* HEADER */}
        <Header />

        {/* MAIN CONTENT */}
        <main className="min-h-screen pt-24">{children}</main>

        {/* FOOTER */}
        <Footer />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
