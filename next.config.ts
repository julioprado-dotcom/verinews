import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [
    '@prisma/client',
    '@prisma/adapter-libsql',
    '@libsql/client',
    'z-ai-web-dev-sdk',
  ],
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client',
      '@prisma/adapter-libsql',
      '@libsql/client',
      'z-ai-web-dev-sdk',
    ],
  },
};

export default nextConfig;
