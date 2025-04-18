import { enableDraftMode } from "@/lib/draft-mode"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    // Check the secret
    if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
      return new Response("Invalid token", { status: 401 })
    }

    // Enable draft mode using our utility function
    const success = await enableDraftMode()

    if (!success) {
      return new Response("Error enabling preview mode", { status: 500 })
    }

    // Return a redirect response to the homepage
    return new Response(null, {
      status: 307,
      headers: {
        Location: "/",
      },
    })
  } catch (error) {
    console.error("Error enabling preview:", error)
    return new Response("Error enabling preview", { status: 500 })
  }
}
