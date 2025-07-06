import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { CustomPortableText } from '@/components/CustomPortableText'
import { sanityFetch } from '@/sanity/lib/live'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import type { Post } from '@/sanity.types'
import { defineMetadata } from '@/sanity/lib/utils'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const { data: post } = await sanityFetch<{ data: Post | null }>({
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

// This function tells Next.js which post pages to pre-build
export async function generateStaticParams() {
  // THE FIX: Destructure the 'data' property from the fetch result
  const { data: slugs } = await sanityFetch<{ data: { slug: string }[] }>({
    query: postSlugsQuery,
    perspective: 'published',
    stega: false,
  })

  // Now, 'slugs' is the array we can map over
  return slugs?.map(({ slug }) => ({ slug })) || []
}

export default async function PostPage({ params }: Props) {
  const { data: post } = await sanityFetch<{ data: Post | null }>({
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
          <CustomPortableText content={post.content} />
        ) : (
          <p>This post has no content.</p>
        )}
      </article>
    </div>
  )
}