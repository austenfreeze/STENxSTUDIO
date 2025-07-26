// app/[slug]/page.tsx

import { notFound } from "next/navigation"
import { toPlainText } from "next-sanity"
import { draftMode } from "next/headers"

import { CustomPortableText } from "@/components/CustomPortableText"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { pageBySlugQuery, pageSlugsQuery } from "@/sanity/lib/queries"
import { defineMetadata } from "@/sanity/lib/utils"
import { SanityLiveProvider } from "@/sanity/lib/live"
import { LiveQuery } from "next-sanity/preview"
import { pageBySlugQueryWithLiveEdit } from "@/sanity/lib/queries" // You will need to create this query file

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: page } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug },
    stega: false,
  })
  if (!page) return {}
  return defineMetadata({
    title: page.heading, // Use 'heading' for metadata title for consistency
    description: page.subheading ? toPlainText(page.subheading) : "",
  })
}

export async function generateStaticParams() {
  const slugs = await client.fetch(pageSlugsQuery)
  return slugs?.map(({ slug }: { slug: string }) => ({ slug })) || []
}

export default async function PageSlugRoute({ params }: Props) {
  const { slug } = await params
  const { isEnabled } = draftMode()

  // Fetch initial data, with or without drafts
  const { data: page } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug },
  })

  if (!page) {
    return notFound()
  }

  // If draft mode is enabled, wrap the content in a live query provider
  if (isEnabled) {
    return (
      <SanityLiveProvider token={process.env.SANITY_VIEWER_TOKEN}>
        <LiveQuery
          query={pageBySlugQueryWithLiveEdit}
          params={{ slug }}
          initialData={page}
          Component={PageContent}
        />
      </SanityLiveProvider>
    )
  }

  // If not in draft mode, render the content directly from the server-fetched data
  return <PageContent page={page} />
}

// A separate component to render the page content, allowing it to be
// used by both the live query and the static render.
function PageContent({ page }: { page: any }) {
  return (
    <div className="p-4 md:p-8">
      <article>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">{page.heading}</h1>
        {page.subheading && <p className="text-xl text-gray-400 mb-8">{page.subheading}</p>}
        {page.pageBuilder && <CustomPortableText content={page.pageBuilder} />}
      </article>
    </div>
  )
}