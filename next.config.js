/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dummyimage.com"],
  },
  env: {
    WHATSAPP_NO: process.env.WHATSAPP_NO,
    EMAIL: process.env.EMAIL,
  },
};

module.exports = nextConfig;
