// nextjs-app/app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import { toPlainText } from "next-sanity";

import { PostBody } from "@/components/PostBody"; // Assumed to exist
import { sanityFetch } from "@/sanity/lib/live"; // Assuming public fetch client
import { client } from "@/sanity/lib/client"; // This should be your public Sanity client
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { defineMetadata } from "@/sanity/lib/utils"; // Assumed to exist

type Props = {
  params: { slug: string }; // Corrected type: params is object, not promise
};

// Revalidate for ISR for individual post pages too
export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { slug } = params; // No await needed for params
  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
    stega: false,
    // client: publicSanityClient, // Consider explicit client here too
  });

  if (!post) {
    return {}; // Return empty object for metadata if post not found
  }

  return defineMetadata({
    title: post.title,
    description: post.excerpt ? toPlainText(post.excerpt) : "", // Using post.excerpt
  });
}

export async function generateStaticParams() {
  const slugs = await client.fetch(postSlugsQuery); // Ensure 'client' here is public client
  return slugs?.map(({ slug }: { slug: { current: string } }) => ({ slug: slug.current })) || [];
}

export default async function PostPage({ params }: Props) {
  const { slug } = params; // No await needed for params
  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
    // client: publicSanityClient, // Consider explicit client here too
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="p-4 md:p-8">
      <article>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
        {post.content ? ( // Assuming your post schema has a 'content' field for Portable Text
          <PostBody content={post.content} />
        ) : (
          <p>This post has no content.</p>
        )}
      </article>
    </div>
  );
}