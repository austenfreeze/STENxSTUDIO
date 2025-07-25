// CustomRichTextEditor.tsx
import React from 'react'
import { PortableTextInput, PortableTextInputProps } from 'sanity'
import renderCustomMarkers from './renderCustomMarkers'

export default function ArticleBlockEditor(props: PortableTextInputProps) {
  // FIX: Provide a default empty array for markers
  const { value, markers = [] } = props

  // Create a custom marker (only if there's a block value with a _key)
  const customMarkers =
    value && value[0]?._key
      ? [
          {
            type: 'comment',
            path: [{ _key: value[0]._key }],
            value: 'This must be written better!',
          },
        ]
      : []

  // This line is now safe because markers is guaranteed to be an array
  const allMarkers = markers.concat(customMarkers)

  return (
    <PortableTextInput
      {...props}
      markers={allMarkers}
      renderCustomMarkers={renderCustomMarkers}
    />
  )
}