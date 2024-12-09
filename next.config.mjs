/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  swcMinify: false,
  images: {
    domains: ["firebasestorage.googleapis.com", "via.placeholder.com", "randomuser.me"],
  },
};

export default nextConfig;
