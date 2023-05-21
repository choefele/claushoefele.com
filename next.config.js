/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/newsletter/:path*',
        destination: '/d2l/:path*',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
