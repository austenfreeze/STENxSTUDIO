// app/api/posts/create/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { sanityClient } from "../../../../lib/sanity";
import { NextResponse } from "next/server";
import { Session } from "next-auth"; // Import Session type

export async function POST(req: Request) { // Type for Request object
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  if (session.user.role !== "admin" && session.user.role !== "editor") {
    return NextResponse.json({ message: "Forbidden - Insufficient role" }, { status: 403 });
  }

  try {
    const { title, body, imageUrl } = await req.json(); // req.json() to parse body

    if (!title || !body) {
      return NextResponse.json({ message: "Title and body are required." }, { status: 400 });
    }

    const newPost = {
      _type: "post",
      title,
      body: [{ _type: "block", children: [{ _type: "span", text: body }] }],
      slug: {
        _type: "slug",
        current: title.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
      publishedAt: new Date().toISOString(),
      author: {
        _ref: session.user.id,
        _type: "reference",
      },
      mainImage: imageUrl ? { _type: "image", asset: { _ref: imageUrl } } : undefined,
    };

    const createdPost = await sanityClient.create(newPost);

    return NextResponse.json({ message: "Post published successfully!", post: createdPost }, { status: 200 });
  } catch (error: any) { // Type error as any for simplicity, better to refine
    console.error("Error creating post in Sanity:", error);
    return NextResponse.json({ message: "Failed to publish post.", error: error.message }, { status: 500 });
  }
}