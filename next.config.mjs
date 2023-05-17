/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // webpack(conf) {
  //   conf.experiments = {
  //     ...conf.experiments,
  //     topLevelAwait: true,
  //   };
  //   return conf;
  // },
  webpack: (conf) => {
    conf.experiments = {
      ...conf.experiments,
      topLevelAwait: true,
    };
    return conf;
  },
  // resolves time out issue when building pages
  staticPageGenerationTimeout: 100,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reactnative.dev',
        pathname: '/img/*',
      },
      {
        protocol: 'https',
        hostname: 'reactjs.org',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/600/*',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'dev.to',
        pathname: '/social_previews/article/*',
      },
    ],
  },
};
export default config;
