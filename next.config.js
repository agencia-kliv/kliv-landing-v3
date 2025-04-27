/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "www.agenciakliv.com"],
  },
};

module.exports = nextConfig;
