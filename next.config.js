/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // WAT-05: stop advertising the framework/version via X-Powered-By.
  poweredByHeader: false,
  // Next 16's `next dev` otherwise auto-writes generic AGENTS.md/CLAUDE.md
  // files into the repo root on first run.
  agentRules: false,
  env: {
    WHATSAPP_NO: process.env.WHATSAPP_NO,
    EMAIL: process.env.EMAIL,
  },
  images: {
    // Next.js 16's built-in image optimizer added a hardcoded, non-
    // configurable 7s fetch timeout for the source image (absent in the
    // Next 13.3.0 this app previously ran). Against this app's blob
    // storage origin that timeout is regularly exceeded under concurrent
    // requests, producing 500s from /_next/image that never happened
    // before the upgrade. Optimization is disabled entirely so next/image
    // falls back to serving the original URL directly (no resize/format
    // conversion, but no server-side fetch/timeout risk either).
    unoptimized: true,
    // `images.domains` was removed in Next 16 — every previously allowed
    // host (from both the `remotePatterns` and legacy `domains` entries)
    // is listed below (currently inert while unoptimized:true, kept so
    // it's ready if optimization is ever re-enabled).
    remotePatterns: [
      { protocol: "https", hostname: "avanceprstorage.blob.core.windows.net" },
      { protocol: "https", hostname: "ambitious-hill-028cf7800.3.azurestaticapps.net" },
      { protocol: "https", hostname: "upliftersstorage.blob.core.windows.net" },
      // Supabase Storage — new image uploads (see src/lib/supabase.ts mediaUrl()).
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "dummyimage.com" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
  // output: "standalone",
};

module.exports = nextConfig;
