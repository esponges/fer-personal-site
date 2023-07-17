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
    // not required after 13.4.0
    // appDir: true,
    // clientRouterFilter: false,
  },
  reactStrictMode: true,
  swcMinify: true,
  // this was breaking dynamic routes in deployments (Vercel, Netflify, etc.)
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },
  webpack(conf) {
    conf.experiments = {
      ...conf.experiments,
      topLevelAwait: true,
    };
    conf.externals = [...conf.externals, "hnswlib-node"];
    return conf;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.to",
        pathname: "/social_previews/article/*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default config;
