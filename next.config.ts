import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Favor common mobile widths so LCP picks a small candidate quickly
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xcell.fund",
      },
      {
        protocol: "https",
        hostname: "www.xcell.fund",
      },
      {
        protocol: "https",
        hostname: "xcellfund.com",
      },
      {
        protocol: "https",
        hostname: "www.xcellfund.com",
      },
    ],
  },

  async headers() {
    const security = [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];

    // Long-lived caching breaks CSS/JS updates in local Next.js/Turbopack dev.
    if (process.env.NODE_ENV !== "production") {
      return security;
    }

    return [
      ...security,
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/styles/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  experimental: {
    optimizePackageImports: [
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
  },
};

export default nextConfig;
