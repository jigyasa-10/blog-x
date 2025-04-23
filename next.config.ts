// import type { NextConfig } from "next";
//
// const nextConfig: NextConfig = {
//   /* config options here */
//   experimental: {
//     serverActions: {
//       bodySizeLimit: "10mb", // Adjust as needed (e.g., "5mb", "10mb")
//     },
//
//   },
//   images: {
//     domains: ['localhost'],
//   },
//
// };
//
// export default nextConfig;
//


import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/school-x/uploads/**',
      },
    ],
  },
}

export default nextConfig

