"use client"

import type React from "react"
import { LiveQueryProvider } from "next-sanity/preview"
import { useMemo } from "react"
import { client } from "@/lib/sanity.client"

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode
  token: string
}) {
  const liveQueryClient = useMemo(() => {
    if (!token) {
      console.warn("No token provided to PreviewProvider")
      return client
    }

    try {
      return client.withConfig({
        token,
        useCdn: false,
        perspective: "previewDrafts",
      })
    } catch (error) {
      console.error("Error creating preview client:", error)
      return client
    }
  }, [token])

  return <LiveQueryProvider client={liveQueryClient}>{children}</LiveQueryProvider>
}
