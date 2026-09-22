export const WHATSAPP_NO = process.env.WHATSAPP_NO;
export const EMAIL = process.env.EMAIL;

// Canonical origin, used to build absolute canonical/og:url tags and the
// sitemap. Must match the production domain exactly (no trailing slash).
export const SITE_URL = "https://www.avancepr.in";

// Base path for the admin panel (src/pages/staff-console/**). Deliberately
// not "/admin" — automated scanners and bots probe that path constantly.
// Changing this only relocates the URL; requireAdmin/requireAdminSSP
// (src/lib/admin/auth.ts) still gate every page and API route behind
// Supabase Auth + the ADMIN_EMAILS allowlist regardless of path.
export const ADMIN_BASE_PATH = "/staff-console";

export const REVALIDATE_TIME = {
  TESTIMONIALS_PAGE: 60 * 60 * 24,
  CLIENT_PAGE: 60 * 60 * 24,
  WORK_PAGE: 60 * 60 * 24,
  FEATURED_PAGE: 60 * 60 * 24,
  FAQPAGE: 60 * 60 * 24 * 7,
  BLOG_PAGES: 60 * 60 * 24,
  WORK_PAGES: 60 * 60 * 24,
  HOME_PAGE: 60 * 60 * 24,
};

export const APP_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  ALL_BLOGS: "/blogs",
  FAQ: "/faq",

  WORK: "/#work",
  CLIENTS: "/#clients",
  CAREERS: "#",
  TESTIMONIALS: "/#testimonials",
  OUR_SERVICES: "/#services",
  NEWS: "/#featured",
  PRIVACY_POLICY: "/privacy-policy",

  SERVICES: {
    STARTUPS_PR: "/services/startup-pr",
    SOCIAL_MEDIA_MARKETING: "/services/social-media-marketing",
    INFLUENCER_MARKETING: "/services/influencer-marketing",
    CRISIS_MANAGEMENT: "/services/crisis-management",
    CORPORATE_COMMUNICATION: "/services/corporate-communication",
    PERSONAL_BRANDING: "/services/personal-branding"
  },
};

export const EXTERNAL_LINKS = {
  INSTAGRAM: "https://www.instagram.com/avance.pr/",
  TWITTER: "https://twitter.com/Avancepr_",
  LINKEDIN: "https://www.linkedin.com/company/avancepr/",

  PHONE: "+919899707349",
  EMAIL_AVANCEPR: "info@avancepr.in",
  EMAIL_PERSONAL: "ritika@avancepr.in",
};

// Previously hotlinked from the legacy Azure blob origin at full
// camera/export resolution (some over 6 MB per image, 11 MB for the video).
// Re-encoded to WebP/H.264 at web-appropriate sizes and served locally from
// public/ so they're optimized by next/image (or served directly, for the
// video) instead of fetched from an external, unoptimized origin.
export const EXTERNAL_IMAGES = {
  CONTENT_MARKETING: "/images/services/content-marketing.webp",
  EVENT_PR: "/images/services/event-pr.webp",
  PUBLIC_RELATION: "/images/public-relation.webp",
  SOCIAL_MEDIA_MARKETING: "/images/services/social-media-marketing.webp",
  INFLUENCER_MARKETING: "/images/services/influencer-marketing.webp",
  CREATIVE: "/video/creative.mp4",
  CORPORATE_COMMUNICATION: "/images/services/corporate-communication.webp",
  CRISIS_MANAGEMENT: "/images/services/crisis-management.webp",
  STARTUPS_PR: "/images/services/pr-for-startup.webp",
  PERSONAL_BRANDING: "/images/services/personal-branding.webp",
};
