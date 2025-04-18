import { PortableText as SanityPortableText } from "@portabletext/react"
import SanityImage from "@/components/sanity-image"
import Link from "next/link"

const components = {
  types: {
    image: ({ value }) => (
      <div className="my-8">
        <SanityImage image={value} alt={value.alt || ""} width={800} height={600} className="rounded-md" />
        {value.caption && <p className="text-center text-gray-500 mt-2">{value.caption}</p>}
      </div>
    ),
    code: ({ value }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto my-6">
        <code>{value.code}</code>
        {value.filename && <p className="text-xs text-gray-400 mt-2">{value.filename}</p>}
      </pre>
    ),
    youtube: ({ value }) => (
      <div className="my-8">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${getYouTubeId(value.url)}`}
          title={value.caption || "YouTube video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md"
        ></iframe>
        {value.caption && <p className="text-center text-gray-500 mt-2">{value.caption}</p>}
      </div>
    ),
    callout: ({ value }) => (
      <div className={`my-6 p-4 border rounded-md ${getCalloutStyles(value.type).bg}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">{getCalloutStyles(value.type).icon}</div>
          <div className="ml-3">
            {value.heading && <h4 className="text-lg font-medium">{value.heading}</h4>}
            <div className="mt-2 text-sm">{value.text && <SanityPortableText value={value.text} />}</div>
          </div>
        </div>
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = value.href.startsWith("/") ? undefined : "noopener noreferrer"
      const target = value.blank ? "_blank" : undefined
      return (
        <Link href={value.href} rel={rel} target={target} className="text-blue-600 hover:underline">
          {children}
        </Link>
      )
    },
  },
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 italic my-6">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
}

// Helper function to extract YouTube ID
function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url?.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Helper function to get callout styles
function getCalloutStyles(type) {
  switch (type) {
    case "info":
      return {
        bg: "bg-blue-50 border-blue-200",
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-blue-500">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        ),
      }
    case "warning":
      return {
        bg: "bg-yellow-50 border-yellow-200",
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-yellow-500">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ),
      }
    case "success":
      return {
        bg: "bg-green-50 border-green-200",
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-green-500">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      }
    case "error":
      return {
        bg: "bg-red-50 border-red-200",
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-red-500">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ),
      }
    default:
      return {
        bg: "bg-blue-50 border-blue-200",
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-blue-500">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        ),
      }
  }
}

export function PortableText({ value }) {
  if (!value) return null
  return <SanityPortableText value={value} components={components} />
}
