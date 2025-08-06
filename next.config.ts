import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "deifkwefumgah.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui.shadcn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    viewTransition: true,
  },
}

export default nextConfig
