/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
    runtimeCaching,
    buildExcludes: [
        /\/*server\/middleware-chunks\/[0-9]*[a-z]*[A-Z]*\.js$/,
        /middleware-manifest\.json$/,
        /middleware-runtime\.js$/,
        /_middleware\.js$/,
        /^.+\\_middleware\.js$/,
    ],
    publicExcludes: ["!robots.txt"],
});
const path = require("path");

module.exports = withPWA({
    reactStrictMode: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.(svg)$/,
            include: path.resolve(__dirname, "src/assets/svgs"),
            loader: "svg-react-loader",
        });

        return config;
    },
});

const nextConfig = {
    env: {
        WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    },
};
module.exports = nextConfig;

module.exports = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};
