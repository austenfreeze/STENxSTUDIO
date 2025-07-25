// @ts-check
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      minify: true,
    },
  },
  experimental: {
    serverActions: {},
  },
  env: {
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    SC_DISABLE_SPEEDY: "false",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  poweredByHeader: false,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), Browse-topics=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/old-blog/:slug",
        destination: "/posts/:slug",
        permanent: true, // 308 permanent redirect
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://xsten.co/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
