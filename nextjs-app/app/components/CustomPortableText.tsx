import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/app/components/portableTextComponents'

type Props = {
  content: any[]
}

export function CustomPortableText({ content }: Props) {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  )
}