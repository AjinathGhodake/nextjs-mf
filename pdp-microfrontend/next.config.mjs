import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, options) => {
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
                    },
                    'react-dom': {
                        singleton: true,
                        requiredVersion: false,
                    },
                },
            })
        );
        return config;
    },
};

export default nextConfig;