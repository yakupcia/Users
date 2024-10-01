/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'http://localhost:3000/:path*', // Backend API'nizin URL'sini buraya yazın
            },
        ];
    },
};

export default nextConfig;
