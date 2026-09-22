import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "10.0.102.57" },
      { protocol: "https", hostname: "10.0.102.57" },
      { protocol: "http", hostname: "196.189.119.89" },
      { protocol: "https", hostname: "196.189.119.89" },
      { protocol: "https", hostname: "shegerbusinessgroup.com" },
      { protocol: "https", hostname: "www.shegerbusinessgroup.com" },
    ],
  },
};

export default nextConfig;
