import { PortableText } from "@/components/portable-text"
import SanityImage from "@/components/sanity-image"
import Link from "next/link"

interface SectionProps {
  section: any
  preview?: boolean
}

export function SectionRenderer({ section, preview = false }: SectionProps) {
  if (!section) return null

  const { type } = section

  switch (type) {
    case "hero":
      return <HeroSection section={section} preview={preview} />
    case "features":
      return <FeaturesSection section={section} preview={preview} />
    case "content":
      return <ContentSection section={section} preview={preview} />
    case "gallery":
      return <GallerySection section={section} preview={preview} />
    case "cta":
      return <CTASection section={section} preview={preview} />
    default:
      return (
        <div className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            {section.content && <PortableText value={section.content} />}
          </div>
        </div>
      )
  }
}

function HeroSection({ section, preview }: SectionProps) {
  const bgColor = section.backgroundColor?.hex || "#3b82f6" // Default blue color
  const textColor = section.textColor?.hex || "#ffffff" // Default white color

  return (
    <section className="py-20" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">{section.title}</h1>
            {section.content && (
              <div className="text-xl opacity-90 mb-8">
                <PortableText value={section.content} />
              </div>
            )}
            <Link
              href="/posts"
              className="inline-block bg-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              style={{ color: bgColor }}
            >
              Explore Posts
            </Link>
          </div>
          {section.media && section.media[0] && (
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
              <SanityImage
                image={section.media[0]}
                alt={section.title}
                width={800}
                height={600}
                priority
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection({ section, preview }: SectionProps) {
  const bgColor = section.backgroundColor?.hex || "#f9fafb" // Default light gray
  const textColor = section.textColor?.hex || "#111827" // Default dark text

  return (
    <section className="py-16" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">{section.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {section.media?.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <SanityImage image={image} alt="" width={40} height={40} />
              </div>
              {section.content && <PortableText value={section.content} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContentSection({ section, preview }: SectionProps) {
  const bgColor = section.backgroundColor?.hex || "#ffffff" // Default white
  const textColor = section.textColor?.hex || "#111827" // Default dark text

  return (
    <section className="py-16" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>
        {section.content && (
          <div className="prose prose-lg mx-auto">
            <PortableText value={section.content} />
          </div>
        )}
        {section.media && section.media[0] && (
          <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
            <SanityImage
              image={section.media[0]}
              alt={section.title}
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </section>
  )
}

function GallerySection({ section, preview }: SectionProps) {
  const bgColor = section.backgroundColor?.hex || "#f9fafb" // Default light gray
  const textColor = section.textColor?.hex || "#111827" // Default dark text

  return (
    <section className="py-16" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.media?.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md">
              <SanityImage
                image={image}
                alt={image.alt || `Gallery image ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection({ section, preview }: SectionProps) {
  const bgColor = section.backgroundColor?.hex || "#3b82f6" // Default blue
  const textColor = section.textColor?.hex || "#ffffff" // Default white

  return (
    <section className="py-16" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
        {section.content && (
          <div className="max-w-2xl mx-auto mb-8">
            <PortableText value={section.content} />
          </div>
        )}
        <Link
          href="/contact"
          className="inline-block bg-white px-8 py-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          style={{ color: bgColor }}
        >
          Get Started
        </Link>
      </div>
    </section>
  )
}
