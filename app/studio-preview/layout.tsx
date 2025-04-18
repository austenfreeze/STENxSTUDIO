import type React from "react"
import { getDraftMode } from "@/lib/draft-mode"
import PreviewProvider from "@/components/preview-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

export default async function StudioPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get draft mode status
  const { isEnabled } = await getDraftMode()

  if (!isEnabled) {
    notFound()
  }

  return (
    <PreviewProvider token={process.env.SANITY_API_TOKEN || ""}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </PreviewProvider>
  )
}
