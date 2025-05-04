'use client'

import Link from 'next/link'

export default function SafeExternalLink({
  href,
  children,
  className = 'underline',
}: {
  href?: string
  children: React.ReactNode
  className?: string
}) {
  if (!href || typeof href !== 'string') {
    return <span className="text-gray-400 italic">Not available</span>
  }

  return (
    <Link href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  )
}
