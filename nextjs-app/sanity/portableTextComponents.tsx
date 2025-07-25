// nextjs-app/sanity/portableTextComponents.tsx
import Image from "next/image"
import Link from "next/link"

export const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null
      const { asset, alt } = value
      const imageUrl = asset.url || asset._ref
      return (
        <div className="my-4">
          <Image
            src={imageUrl}
            alt={alt || ""}
            width={800}
            height={600}
            className="rounded shadow"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noopener noreferrer" : undefined
      return (
        <Link href={value.href}>
          <span target="_blank" rel={rel} className="underline text-blue-600">
            {children}
          </span>
        </Link>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-semibold">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-medium">{children}</h3>,
    normal: ({ children }: any) => <p className="my-2">{children}</p>,
  },
}
