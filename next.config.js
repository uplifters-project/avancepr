/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // WAT-05: stop advertising the framework/version via X-Powered-By.
  poweredByHeader: false,
  env: {
    WHATSAPP_NO: process.env.WHATSAPP_NO,
    EMAIL: process.env.EMAIL,
  },
  images: {
    // `images.domains` was removed in Next 16 — every previously allowed
    // host (from both the `remotePatterns` and legacy `domains` entries)
    // is listed explicitly below instead, unrestricted by path like the
    // old `domains` config was.
    remotePatterns: [
      { protocol: "https", hostname: "avancepr.azurewebsites.net" },
      { protocol: "https", hostname: "avanceprstorage.blob.core.windows.net" },
      { protocol: "https", hostname: "ambitious-hill-028cf7800.3.azurestaticapps.net" },
      { protocol: "https", hostname: "uplifters.azurewebsites.net" },
      { protocol: "https", hostname: "upliftersstorage.blob.core.windows.net" },
      { protocol: "https", hostname: "dummyimage.com" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
  // output: "standalone",
};

module.exports = nextConfig;
