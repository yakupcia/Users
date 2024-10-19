/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, 
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'http://localhost:3000/:path*', 
            },
        ];
    },
};

export default nextConfig;
