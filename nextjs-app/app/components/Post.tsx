import { Author } from "@/components/Author"
import { components } from "@/sanity/portableTextComponents"
import { PortableText } from "next-sanity"
import { PublishedAt } from "@/components/PublishedAt"
import { Title } from "@/components/Title"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { RelatedPosts } from "@/components/RelatedPosts"
import { client } from "@/sanity/lib/client"

type PostProps = {
  postId: string
}

export default async function Post({ postId }: PostProps) {
  const post = await client.fetch(
    `*[_type == "post" && _id == $postId][0]{
      _id,
      title,
      author->{name, image},
      mainImage,
      body,
      publishedAt,
      categories[]->{title},
      "relatedPosts": *[_type == "post" && references(^._id)]{_id, title}
    }`,
    { postId }
  )

  if (!post) {
    return <div>Post not found</div>
  }

  const {
    _id,
    title,
    author,
    mainImage,
    body,
    publishedAt,
    relatedPosts,
  } = post

  return (
    <article className="grid lg:grid-cols-12 gap-y-12">
      <header className="lg:col-span-12 flex flex-col gap-4 items-start">
        <div className="flex gap-4 items-center">
          <PublishedAt publishedAt={publishedAt} />
        </div>
        <Title>{title}</Title>
        <Author author={author} />
      </header>
      {mainImage ? (
        <figure className="lg:col-span-4 flex flex-col gap-2 items-start">
          <Image
            src={urlFor(mainImage).width(400).height(400).url()}
            width={400}
            height={400}
            alt=""
          />
        </figure>
      ) : null}
      {body ? (
        <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg">
          <PortableText value={body} components={components} />
          <RelatedPosts
            relatedPosts={relatedPosts}
            documentId={_id}
            documentType="post"
          />
        </div>
      ) : null}
    </article>
  )
}
