import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Enable analyzer only when ANALYZE=true
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Define your config
const nextConfig: NextConfig = {
  env: {
    SC_DISABLE_SPEEDY: "false",
  },
};

// Export combined config
export default withAnalyzer(nextConfig);
