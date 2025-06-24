import React from 'react'

export const TitleStyle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontFamily: 'Garamond', fontSize: '2em' }}>
    {children}
  </span>
)

export const HighlightDecorator: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ backgroundColor: '#e94f58' }}> {/* Light red highlight */}
    {children}
  </span>
)
