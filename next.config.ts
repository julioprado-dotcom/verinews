import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // NOTE: Do NOT use serverExternalPackages — EdgeOne's serverless runtime
  // cannot resolve externalized packages. Both @libsql/client and
  // z-ai-web-dev-sdk must be bundled into the SSR function.
};

export default nextConfig;
