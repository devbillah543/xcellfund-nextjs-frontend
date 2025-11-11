import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // adjust if your Strapi or dev server uses a different port
      },
      {
        protocol: "https",
        hostname: "xcellfund-strapi-backend.onrender.com",
      },
    ],
  },
};

export default nextConfig;
