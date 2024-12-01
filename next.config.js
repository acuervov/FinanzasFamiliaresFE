/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/apps/mail',
                destination: '/apps/mail/inbox',
                permanent: true
            }
        ];
    },
    experimental: {
        missingSuspenseWithCSRBailout: false
    }
};

module.exports = nextConfig;
