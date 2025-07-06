'use client'

import { VisualEditing } from 'next-sanity'
import type { ComponentType } from 'react'

// This component now accepts SanityLive as a prop
export function LiveVisualEditing({ SanityLive }: { SanityLive: ComponentType }) {
  return (
    <>
      {/* It renders the component passed down from the server */}
      <SanityLive />
      <VisualEditing />
    </>
  )
}
