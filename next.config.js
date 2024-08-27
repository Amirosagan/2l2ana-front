/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dropbox.com',
      },
      {
        protocol: 'https',
        hostname: 'previews.dropbox.com',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
 
};

module.exports = nextConfig;
