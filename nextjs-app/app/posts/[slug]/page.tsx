import { notFound } from "next/navigation"
import { toPlainText } from "next-sanity"

import { PostBody } from "@/components/PostBody"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries"
import { defineMetadata } from "@/sanity/lib/utils"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
    stega: false,
  })

  if (!post) {
    return {}
  }

  return defineMetadata({
    title: post.title,
    description: post.excerpt ? toPlainText(post.excerpt) : "",
  })
}

export async function generateStaticParams() {
  const slugs = await client.fetch(postSlugsQuery)
  return slugs?.map(({ slug }: { slug: string }) => ({ slug })) || []
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="p-4 md:p-8">
      <article>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
        {post.content ? <PostBody content={post.content} /> : <p>This post has no content.</p>}
      </article>
    </div>
  )
}
