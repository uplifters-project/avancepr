export const WHATSAPP_NO = process.env.WHATSAPP_NO;
export const EMAIL = process.env.EMAIL;

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

export const APP_CONSTANTS = {
  BACKEND_URL: "https://avancepr.azurewebsites.net",
  UPLIFTERS_BACKEND_URL: "https://uplifters.azurewebsites.net",
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

export const EXTERNAL_IMAGES = {
  CONTENT_MARKETING:
    "https://upliftersstorage.blob.core.windows.net/avanceprmedia/static_images_for_web/content.jpg",
  EVENT_PR:
    "https://upliftersstorage.blob.core.windows.net/avanceprmedia/static_images_for_web/event.jpg",
  PUBLIC_RELATION:
    "https://upliftersstorage.blob.core.windows.net/avanceprmedia/static_images_for_web/final_public_relation.png",
  SOCIAL_MEDIA_MARKETING:
    "https://upliftersstorage.blob.core.windows.net/avanceprmedia/static_images_for_web/social_media.jpg",
  INCLUENCER_MARKETING:
    "https://upliftersstorage.blob.core.windows.net/avanceprmedia/static_images_for_web/likes-social-media.jpg",
  CREATIVE:
    "https://upliftersstorage.blob.core.windows.net/avanceprmedia/static_images_for_web/creative.mp4",
};
