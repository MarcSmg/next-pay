import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Only apply this fix on the server-side compilation
    if (isServer) {
      // Treat the Prisma client library as external so Webpack doesn't try to bundle it
      // This is crucial for fixing the "require() style import is forbidden" error
      config.externals.push('@prisma/client', '.prisma/client');
    }
        return config;
    },
};

export default nextConfig;
