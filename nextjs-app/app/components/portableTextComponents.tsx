import { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import type React from 'react'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null
      const imgUrl = urlFor(value.asset).width(800).height(600).url()
      return (
        <div className="my-6">
          <Image
            src={imgUrl || '/placeholder.svg'} // Note: You had this in PostBody, so I included it here for consistency
            alt={value.alt || 'Content image'}
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => {
      const rel = value?.href && !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value?.href} rel={rel} className="text-blue-400 hover:underline">
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold my-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold my-4">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4">{children}</blockquote>
    ),
  },
}