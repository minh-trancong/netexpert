import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['via.placeholder.com', 'blog.nperf.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.nperf.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    console.log('BACKEND_URL:', process.env.BACKEND_URL);
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${process.env.BACKEND_URL}/api/:path*`,
          has: [
            {
              type: 'header',
              key: 'content-type',
              value: '(.*)'
            }
          ]
        }
      ],
      afterFiles: [],
      fallback: []
    }
  }
};

export default nextConfig;