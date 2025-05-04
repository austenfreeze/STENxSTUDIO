// nextjs-app/app/api/draft-mode/enable/route.ts
import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { NextRequest, NextResponse } from 'next/server'

export const GET = defineEnableDraftMode<NextRequest, NextResponse>(async (req) => {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  return {
    client: client.withConfig({ token }),
  }
})
