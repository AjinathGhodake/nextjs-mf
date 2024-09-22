import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const remotes = (isServer) => {
    const location = isServer ? 'ssr' : 'chunks';
    return {
        remoteApp: `remoteApp@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    };
};

const nextConfig = {
    webpack: (config, options) => {
        const { isServer } = options;
        config.plugins.push(
            new NextFederationPlugin({
                name: 'home',
                filename: 'static/chunks/remoteEntry.js',
                remotes: remotes(isServer),
                shared: {
                    react: { singleton: true, requiredVersion: false },
                    'react-dom': { singleton: true, requiredVersion: false },
                },
                extraOptions: {
                    automaticAsyncBoundary: true,
                },
            })
        );

        return config;
    },
};

export default nextConfig;