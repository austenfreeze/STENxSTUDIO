import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    SC_DISABLE_SPEEDY: "false",
  },
  experimental: {
    serverActions: {}, // ✅ must be an object, not a boolean
  },
}

export default nextConfig
