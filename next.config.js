/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.dropbox.com','previews.dropbox.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
