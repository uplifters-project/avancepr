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
    // `images.domains` was removed in Next 16 — every previously allowed
    // host (from both the `remotePatterns` and legacy `domains` entries)
    // is listed below.
    //
    // Optimization was previously disabled entirely (`unoptimized: true`)
    // because Next 16's optimizer has a hardcoded 7s fetch timeout that the
    // old Azure blob origin (upliftersstorage.blob.core.windows.net)
    // regularly exceeded under concurrent requests, producing 500s from
    // /_next/image. The large static assets that used to hotlink that
    // origin now live in public/ (served from disk, no external fetch, no
    // timeout risk), so optimization is safe to re-enable. The remaining
    // external origins below (Supabase Storage for admin-uploaded media,
    // plus a couple of still-referenced legacy hosts) are lower-volume and
    // generally more reliable than the old blob storage, but if 500s from
    // /_next/image reappear, that's the first thing to check.
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
