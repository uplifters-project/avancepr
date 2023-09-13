/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WHATSAPP_NO: process.env.WHATSAPP_NO,
    EMAIL: process.env.EMAIL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upliftersstorage.blob.core.windows.net",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "avanceprstorage.blob.core.windows.net",
        port: "",
        pathname: "/media/**",
      },
    ],
    domains: [
      "avancepr.azurewebsites.net",
      "avanceprstorage.blob.core.windows.net",
      "ambitious-hill-028cf7800.3.azurestaticapps.net",
      "uplifters.azurewebsites.net",
      "upliftersstorage.blob.core.windows.net",
      "dummyimage.com",
      "127.0.0.1",
      "127.0.0.1:8000",
    ],
  },
  // output: "standalone",
};

module.exports = nextConfig;
