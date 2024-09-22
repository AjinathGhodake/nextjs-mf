import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    optimizeFonts: true,
    images: {
        domains: ['picsum.photos'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'],
    },
    webpack: (config, options) => {
        const { dev, isServer } = options;
        config.plugins.push(
            new NextFederationPlugin({
                name: 'remoteApp',
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    './PDPPage': './components/PDPPage',
                },
                shared: {
                    react: {
                        singleton: true,
                        requiredVersion: false,
                        eager: true,
                    },
                    'react-dom': {
                        singleton: true,
                        requiredVersion: false,
                        eager: true,
                    },
                },
                extraOptions: {
                    automaticAsyncBoundary: true,
                },
            })
        );

        if (!dev && !isServer) {
            config.optimization.minimize = true;
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 10000,
                maxSize: 244000,
            };
        }

        return config;
    },
};

export default nextConfig;