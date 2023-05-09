/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
    loader: "custom",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
