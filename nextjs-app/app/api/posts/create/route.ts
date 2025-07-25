// nextjs-app/app/api/posts/create/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { sanityClient } from "../../../../lib/sanity"; // Sanity client with write token
import { NextResponse } from "next/server";
import { Session } from "next-auth";

export async function POST(req: Request) {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    console.error("API Error: Session, user, or user ID not found for post creation.");
    return NextResponse.json({ message: "Authentication required to create posts." }, { status: 401 });
  }

  // Ensure user has a role that can create posts
  if (session.user.role !== "admin" && session.user.role !== "editor" && session.user.role !== "contributor") {
    console.error(`API Error: User ${session.user.email} with role ${session.user.role} attempted post creation. Insufficient role.`);
    return NextResponse.json({ message: "Forbidden - Insufficient role to create posts." }, { status: 403 });
  }

  try {
    const { title, excerpt, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required." }, { status: 400 });
    }

    const slugValue = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .trim();

    const portableTextContent = [
      {
        _key: Math.random().toString(36).substring(2, 9),
        _type: 'block',
        children: [
          {
            _key: Math.random().toString(36).substring(2, 9),
            _type: 'span',
            marks: [],
            text: content,
          },
        ],
        markDefs: [],
      },
    ];

    const newPost = {
      _type: "post",
      title,
      slug: {
        _type: "slug",
        current: slugValue,
      },
      excerpt: excerpt || null,
      content: portableTextContent,
      publishedAt: new Date().toISOString(),
      author: {
        _ref: session.user.id, // This needs to be a valid _id of an 'admin' document in Sanity
        _type: "reference",
      },
    };

    const createdPost = await sanityClient.create(newPost);

    return NextResponse.json({ message: "Post published successfully!", post: createdPost }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating post in Sanity:", error);
    return NextResponse.json({ message: "Failed to publish post.", error: error.message }, { status: 500 });
  }
}