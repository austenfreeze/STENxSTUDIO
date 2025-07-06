import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

// Correctly import your PostBody component
import { PostBody } from '@/app/components/PostBody'
import { sanityFetch } from '@/sanity/lib/live'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import type { Post } from '@/sanity.types'
import { defineMetadata } from '@/sanity/lib/utils'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const post = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params,
    stega: false,
  })

  if (!post) {
    return {}
  }

  return defineMetadata({
    title: post.title,
    description: post.excerpt ? toPlainText(post.excerpt) : '',
  })
}

export async function generateStaticParams() {
  // THE FIX: Use the fetched array directly, without destructuring 'data'
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: postSlugsQuery,
    perspective: 'published',
    stega: false,
  })

  return slugs?.map(({ slug }) => ({ slug })) || []
}

export default async function PostPage({ params }: Props) {
  // THE FIX: Use the fetched post object directly
  const post = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params,
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="p-4 md:p-8">
      <article>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
        {post.content ? (
          // Use your PostBody component here
          <PostBody content={post.content} />
        ) : (
          <p>This post has no content.</p>
        )}
      </article>
    </div>
  )
}
