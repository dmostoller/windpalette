import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/shadcn",
        destination: `${process.env.SHADCN_DOMAIN}/`,
      },
      {
        source: "/shadcn/:path*",
        destination: `${process.env.SHADCN_DOMAIN}/:path*`,
      },
    ];
  },
};

export default nextConfig;
