/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dummyimage.com", "127.0.0.1", "127.0.0.1:8000"],
  },
  env: {
    WHATSAPP_NO: process.env.WHATSAPP_NO,
    EMAIL: process.env.EMAIL,
  },
};

module.exports = nextConfig;
