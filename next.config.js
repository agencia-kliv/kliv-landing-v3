/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  trailingSlash: true,
  compress: true,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.agenciakliv.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimize production builds
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
