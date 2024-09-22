import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    optimizeFonts: true,
    images: {
        unoptimized: true, // Required for static export
        domains: ['example.com', 'via.placeholder.com'], // Add your image domains here
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
                minSize: 20000,
                maxSize: 244000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                automaticNameDelimiter: '~',
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            };
        }

        return config;
    },
    output: 'export',
};

export default nextConfig;