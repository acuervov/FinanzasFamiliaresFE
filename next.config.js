/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
      return [
          {
              source: '/apps/mail',
              destination: '/apps/mail/inbox',
              permanent: true
          }
      ];
  }
};

module.exports = nextConfig;