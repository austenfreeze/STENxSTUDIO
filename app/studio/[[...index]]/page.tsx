"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/studio-stenstudio/sanity.config"

export default function StudioPage() {
  return <NextStudio config={config} />
}
