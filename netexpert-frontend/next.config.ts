import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['blog.nperf.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.nperf.com',
        pathname: '/**',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL + '/api/:path*'
      }
    ]
  }
};

export default nextConfig;
