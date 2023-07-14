// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
// !process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    // not required after 14.4.0
    appDir: true,
    clientRouterFilter: false,
  },
  reactStrictMode: true,
  swcMinify: true,
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.to',
        pathname: '/social_previews/article/*',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

module.exports = config;
