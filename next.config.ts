import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3333',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                pathname: '/seed/**',
            },
            {
                protocol: 'http',
                hostname: 'picsum.photos',
                pathname: '/seed/**',
            }
        ],
    }
};

export default nextConfig;
