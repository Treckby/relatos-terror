import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  allowedDevOrigins: ['10.10.10.223'],
  /* config options here */
};

export default nextConfig;
