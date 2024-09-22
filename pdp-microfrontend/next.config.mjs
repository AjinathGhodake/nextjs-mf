import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    optimizeFonts: true,
    images: {
        unoptimized: true,
        domains: ['via.placeholder.com', 'picsum.photos'],
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