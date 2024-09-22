import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const remotes = (isServer) => {
    const location = isServer ? 'ssr' : 'chunks';
    return {
        remoteApp: `remoteApp@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    };
};

const nextConfig = {
    reactStrictMode: true,
    optimizeFonts: true,
    images: {
        domains: ['picsum.photos'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'],
        minimumCacheTTL: 60,
    },
    webpack: (config, options) => {
        const { dev, isServer } = options;
        config.plugins.push(
            new NextFederationPlugin({
                name: 'home',
                filename: 'static/chunks/remoteEntry.js',
                remotes: remotes(isServer),
                shared: {},
            })
        );

        if (!dev && !isServer) {
            config.optimization.minimize = true;
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 5000,
                maxSize: 200000,
            };
        }

        config.output.hashFunction = 'xxhash64';

        return config;
    },
};

export default nextConfig;