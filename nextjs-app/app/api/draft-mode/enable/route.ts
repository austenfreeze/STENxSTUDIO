// /app/api/draft-mode/enable/route.ts (App Router style)

import { defineEnableDraftMode } from "next-sanity/draft-mode"
import { client } from "@/sanity/lib/client"
import { token } from "@/sanity/lib/token"
import { NextRequest } from "next/server"

export const GET = defineEnableDraftMode(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  return {
    client: client.withConfig({ token }),
  }
})
