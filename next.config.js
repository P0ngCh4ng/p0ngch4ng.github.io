/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.GITHUB_ACTIONS && "/p0ngch4ng.github.io",
  trailingSlash: true,
};
module.exports = nextConfig;
