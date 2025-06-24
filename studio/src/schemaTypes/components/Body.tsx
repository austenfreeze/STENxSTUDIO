import { PortableText, PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import { HighlightDecorator } from '@/components/BlockDecorators'

type BodyProps = {
  content: any[]
  imgWidth: number
  imgHeight: number
}

const Body: React.FC<BodyProps> = ({ content, imgWidth, imgHeight }) => {
  const customBlockComponents: PortableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => {
        if (!value?.asset) return null
        const imgUrl = urlForImage(value.asset).width(imgWidth).height(imgHeight).url()
        return (
          <Image
            src={imgUrl}
            alt={value.alt || 'Image'}
            width={imgWidth}
            height={imgHeight}
            sizes="100vw"
            priority={false}
          />
        )
      },
    },
    marks: {
      link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} target="_blank" rel={rel}>
            {children}
          </a>
        )
      },
      internalLink: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => (
        <a href={value.href}>{children}</a>
      ),
      highlight: ({ children }: { children: React.ReactNode }) => (
        <HighlightDecorator>{children}</HighlightDecorator>
      ),
    },
  }

  return <PortableText value={content} components={customBlockComponents} />
}

export default Body
