'use client'

import { useState, useEffect } from 'react'

export const CurrentYear = () => {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This guarantees it won't cause a hydration mismatch.
    setYear(new Date().getFullYear())
  }, [])

  // Render the year only after it has been set on the client.
  // You can return null or a placeholder while waiting.
  return <>{year || new Date().getFullYear()}</>
}
