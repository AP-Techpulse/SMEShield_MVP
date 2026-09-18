import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard/settings',
        destination: '/dashboard/profile',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
