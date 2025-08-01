// nextjs-app/app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import { toPlainText } from "next-sanity";
import { PortableText } from '@portabletext/react';
import { PostBody } from "@/components/PostBody";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { defineMetadata } from "@/sanity/lib/utils";
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>; // params is a Promise
};

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  // Await params once
  const params = await paramsPromise;
  const slug = params.slug; // Access slug after awaiting params

  // No need for typeof params.slug !== 'string' if params is properly awaited and destructured
  // The error handling below now uses the resolved `slug`
  if (!slug || typeof slug !== 'string') { // Check the resolved slug
    console.error("generateMetadata: Invalid slug received:", params);
    return {};
  }

  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
    stega: false,
  });

  if (!post) {
    return {};
  }

  return defineMetadata({
    title: post.title,
    description: post.excerpt ? toPlainText(post.excerpt) : "",
  });
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery);
  return slugs?.map((slug) => ({ slug })) || [];
}

export default async function PostPage({ params: paramsPromise }: Props) {
  // Await params once
  const params = await paramsPromise;
  const slug = params.slug; // Access slug after awaiting params

  // No need for typeof params.slug !== 'string' if params is properly awaited and destructured
  // The error handling below now uses the resolved `slug`
  if (!slug || typeof slug !== 'string') { // Check the resolved slug
    console.error("PostPage: Invalid slug received:", params);
    return notFound();
  }

  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="p-4 md:p-8">
      <article>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
        {post.content ? (
          <PostBody content={post.content} />
        ) : (
          <p>This post has no content.</p>
        )}
      </article>
    </div>
  );
}