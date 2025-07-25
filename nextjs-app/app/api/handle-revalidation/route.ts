// app/api/handle-revalidation/route.ts
import { createClient } from "@sanity/client"
import { parseBody } from "next-sanity/webhook"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Configuration for the Sanity client on the server
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-25",
  useCdn: false,
  // This token needs write permissions for the function to update documents
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// The new App Router syntax for an API POST request
export async function POST(req: NextRequest) {
  try {
    // Use the next-sanity helper to parse the request body and verify the secret
    const { body, isValidSignature } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET)

    if (!isValidSignature) {
      // Use NextResponse for responses in the App Router
      return new NextResponse("Invalid signature", { status: 401 })
    }

    // Check if body exists
    if (!body) {
      return NextResponse.json({ message: "No body received" }, { status: 400 })
    }

    // Check that the webhook is for a timelineEvent document
    if (body._type !== "timelineEvent") {
      return NextResponse.json({ message: "Not a timeline event, skipping." })
    }

    const sourceEventId = body._id

    // Fetch the full source document to get its 'relatedEvents' array
    const sourceEvent = await client.fetch(`*[_id == $sourceEventId][0]`, { sourceEventId })

    if (!sourceEvent || !sourceEvent.relatedEvents || sourceEvent.relatedEvents.length === 0) {
      return NextResponse.json({ message: "No related events to process." })
    }

    // --- The Core Logic for Bidirectional Linking ---

    for (const relation of sourceEvent.relatedEvents) {
      const targetEventId = relation.event._ref
      const relationshipType = relation.relationshipType

      // Fetch the target event to check its current relations
      const targetEvent = await client.fetch(`*[_id == $targetEventId][0]`, { targetEventId })

      // Check if the return link already exists to prevent duplicates and infinite loops
      const linkExists = targetEvent.relatedEvents?.some((e: any) => e.event._ref === sourceEventId)

      if (!linkExists) {
        console.log(`Adding link from ${targetEventId} back to ${sourceEventId}`)

        // Create the return relationship object
        const returnRelation = {
          _key: `${sourceEventId}-${Math.random().toString(36).substring(2, 15)}`,
          _type: "object",
          event: {
            _type: "reference",
            _ref: sourceEventId,
          },
          relationshipType: `(Auto) Related to: ${relationshipType}`,
        }

        // Use the Sanity client to patch the target document
        await client
          .patch(targetEventId)
          .setIfMissing({ relatedEvents: [] })
          .append("relatedEvents", [returnRelation])
          .commit()
      } else {
        console.log(`Link from ${targetEventId} to ${sourceEventId} already exists.`)
      }
    }

    return NextResponse.json({ message: `Processed relations for ${sourceEventId}` })
  } catch (err: any) {
    console.error("Error in webhook handler:", err)
    return new NextResponse(err.message, { status: 500 })
  }
}
