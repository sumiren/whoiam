/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["pages", "lib", "layouts", "components"]
  }
};

module.exports = nextConfig;
