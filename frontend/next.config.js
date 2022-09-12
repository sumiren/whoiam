/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["pages", "lib", "layouts", "components"],
  },
  images: {
    domains: ["t.co", "twitter.com", "pic.twitter.com", "pbs.twimg.com"],
  },
};

module.exports = nextConfig;
