// nextjs-app/app/api/posts/create/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { sanityClient } from "../../../../lib/sanity";
import { NextResponse } from "next/server";
import { Session } from "next-auth";

export async function POST(req: Request) {
  // It's good to log the session status
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

    // Generate a basic slug from the title
    const slugValue = title
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .trim(); // Trim leading/trailing -

    // Convert plain text content to basic Portable Text block
    const portableTextContent = [
      {
        _key: Math.random().toString(36).substring(2, 9), // Unique key for the block
        _type: 'block',
        children: [
          {
            _key: Math.random().toString(36).substring(2, 9), // Unique key for the span
            _type: 'span',
            marks: [],
            text: content,
          },
        ],
        markDefs: [],
      },
    ];

    // Prepare the new post document for Sanity
    const newPost = {
      _type: "post", // Your Sanity schema type for posts
      title,
      slug: {
        _type: "slug",
        current: slugValue,
      },
      excerpt: excerpt || null, // Use excerpt if provided, otherwise null
      content: portableTextContent, // The Portable Text content
      publishedAt: new Date().toISOString(), // Set publish date immediately
      // Link the author to the authenticated user (admin schema)
      // This assumes session.user.id (from NextAuth) matches an existing admin._id in Sanity
      author: {
        _ref: session.user.id,
        _type: "reference",
      },
      // You can add other fields here (e.g., categories, tags, mainImage - which would require file upload logic)
    };

    const createdPost = await sanityClient.create(newPost);

    return NextResponse.json({ message: "Post published successfully!", post: createdPost }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating post in Sanity:", error);
    return NextResponse.json({ message: "Failed to publish post.", error: error.message }, { status: 500 });
  }
}