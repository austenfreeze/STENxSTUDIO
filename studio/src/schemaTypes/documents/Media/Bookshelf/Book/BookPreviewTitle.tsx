// src/schemaTypes/documents/BookPreviewTitle.tsx
import React from 'react'

export const PreviewTitle = ({title, subtitle}: {title: string; subtitle?: string}) => (
  <span>
    <strong>{title}</strong>
    {subtitle && <em style={{marginLeft: '0.4em', opacity: 0.85}}>{subtitle}</em>}
  </span>
)