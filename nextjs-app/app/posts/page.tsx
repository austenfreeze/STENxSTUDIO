// nextjs-app/app/posts/page.tsx
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live"; // Assuming this is your client that does public reads
import { postsQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity.types"; // Ensure you have this type defined, maybe in sanity-codegen


// It's good practice to add revalidate for ISR for public content
export const revalidate = 60; // Revalidate every 60 seconds (or more/less frequent as needed)

export default async function PostsIndexPage() {
  const { data: posts } = await sanityFetch({
    query: postsQuery,
    perspective: "published", // This is correct for public content
    // You might want to explicitly use your 'publicSanityClient' here if you have one defined without a write token
    // For example:
    // client: publicSanityClient, // if you created it in lib/sanity.ts
  });

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">All Posts</h1>
      {posts && posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post: Post) => (
            <li key={post._id}>
              {/* Ensure post.slug is an object with a 'current' property or directly the string */}
              <Link href={`/posts/${post.slug?.current || post.slug}`}>
                <span className="text-2xl font-bold hover:underline">{post.title}</span>
              </Link>
              {post.excerpt && <p className="text-gray-400 mt-2">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}