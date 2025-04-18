import { disableDraftMode } from "@/lib/draft-mode"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const redirectTo = searchParams.get("redirect") || "/"

    // Disable draft mode using our utility function
    const success = await disableDraftMode()

    if (!success) {
      return new Response("Error disabling preview mode", { status: 500 })
    }

    // Return a redirect response
    return new Response(null, {
      status: 307,
      headers: {
        Location: redirectTo,
      },
    })
  } catch (error) {
    console.error("Error disabling preview:", error)
    return new Response("Error disabling preview", { status: 500 })
  }
}
