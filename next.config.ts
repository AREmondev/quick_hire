import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Allow both Cloudinary and localhost images
    remotePatterns: [
      // 1️⃣ Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // 2️⃣ Localhost dev images (port 4000)
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1", // in case the system resolves localhost to 127.0.0.1
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60,
  },
  // Optional: in dev, allow localhost private IPs (fixes "resolved to private ip" warning)
  // experimental: {},
};

export default nextConfig;
