// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reactnative.dev",
        pathname:  "/img/*",
      },
      {
        protocol: "https",
        hostname: "reactjs.org",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/600/*",
      },
    ],
  },
};
export default config;
