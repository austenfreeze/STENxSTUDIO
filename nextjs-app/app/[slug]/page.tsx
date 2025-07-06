import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { CustomPortableText } from '@/components/CustomPortableText'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client' // <-- Import the base client
import { pageBySlugQuery, pageSlugsQuery } from '@/sanity/lib/queries'
import type { Page } from '@/sanity.types'
import { defineMetadata } from '@/sanity/lib/utils'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const page = await sanityFetch<Page | null>({
    query: pageBySlugQuery,
    params,
    stega: false,
  })
  if (!page) return {}
  return defineMetadata({
    title: page.title,
    description: page.subheading ? toPlainText(page.subheading) : '',
  })
}

// This function now uses the base client.fetch for build-time data
export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(pageSlugsQuery)
  return slugs?.map(({ slug }) => ({ slug })) || []
}

export default async function PageSlugRoute({ params }: Props) {
  const page = await sanityFetch<Page | null>({
    query: pageBySlugQuery,
    params,
  })

  if (!page) {
    return notFound()
  }

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