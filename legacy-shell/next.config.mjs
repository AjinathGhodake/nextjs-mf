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
    },
    webpack: (config, options) => {
        const { dev, isServer } = options;
        config.plugins.push(
            new NextFederationPlugin({
                name: 'home',
                filename: 'static/chunks/remoteEntry.js',
                remotes: remotes(isServer),
                shared: {
                    react: { singleton: true, requiredVersion: false, eager: true },
                    'react-dom': { singleton: true, requiredVersion: false, eager: true },
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