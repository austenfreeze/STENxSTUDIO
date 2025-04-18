"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Loader2, Edit, Eye } from "lucide-react"
import Link from "next/link"

interface PreviewWrapperProps {
  children: React.ReactNode
  documentId?: string
  documentType?: string
  preview?: boolean
}

export function PreviewWrapper({ children, documentId, documentType = "post", preview = false }: PreviewWrapperProps) {
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only show the preview UI if we're in preview mode and on the client
  if (!isClient || !preview) {
    return <>{children}</>
  }

  // Default to homepage if no document ID is provided
  const docId = documentId || (documentType === "homepage" ? "homepage" : undefined)

  // Create studio URL based on document type and ID
  const studioUrl = docId ? `/studio/desk/${documentType};${docId}` : `/studio/desk/${documentType}`

  return (
    <div className="relative">
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-sm text-white shadow-lg">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Preview Mode</span>
        <div className="ml-2 h-4 w-[1px] bg-white/30" />
        <Link
          href={studioUrl}
          className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-white/20"
          title="Edit in Sanity Studio"
        >
          <Edit className="h-3.5 w-3.5" />
          <span>Edit</span>
        </Link>
        <Link
          href={`/api/disable-preview?redirect=${pathname}`}
          className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-white/20"
          title="Exit Preview Mode"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Exit</span>
        </Link>
      </div>
      {children}
    </div>
  )
}
