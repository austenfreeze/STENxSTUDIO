import { notFound } from "next/navigation"
import { toPlainText } from "next-sanity"

import { CustomPortableText } from "@/components/CustomPortableText"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { pageBySlugQuery, pageSlugsQuery } from "@/sanity/lib/queries"
import { defineMetadata } from "@/sanity/lib/utils"

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
    title: page.title,
    description: page.subheading ? toPlainText(page.subheading) : "",
  })
}

export async function generateStaticParams() {
  const slugs = await client.fetch(pageSlugsQuery)
  return slugs?.map(({ slug }: { slug: string }) => ({ slug })) || []
}

export default async function PageSlugRoute({ params }: Props) {
  const { slug } = await params
  const { data: page } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug },
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
