import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We are keeping the TypeScript ignore just in case, 
  // but removing the invalid ESLint block entirely.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;