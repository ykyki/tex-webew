/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: '/tex-web-preview/v1',
    assetPrefix: '/tex-web-preview/v1',
    webpack: (config, { isServer }) => {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        config.output.webassemblyModuleFilename =
            (isServer ? '../' : '') + 'static/wasm/webassembly.wasm';
        return config;
    },
};

module.exports = nextConfig;
