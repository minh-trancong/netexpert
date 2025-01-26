import type { NextConfig } from "next";

console.log(process.env.BACKEND_URL);

const nextConfig: NextConfig = {
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
