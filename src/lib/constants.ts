export const WHATSAPP_NO = process.env.WHATSAPP_NO;
export const EMAIL = process.env.EMAIL;

export const REVALIDATE_TIME = {
  TESTIMONIALS_PAGE: 60 * 60 * 24,
  CLIENT_PAGE: 60 * 60 * 24,
  WORK_PAGE: 60 * 60 * 24,
  FEATURED_PAGE: 60 * 60 * 24,
  FAQPAGE: 60 * 60 * 24 * 7,
  BLOG_PAGES: 60 * 60 * 24,
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

  SERVICES: {
    PUBLIC_RELATIONS: "/services/public-relations",
    CONTENT_MARKETING: "/services/content-marketing",
    SOCIAL_MEDIA_MARKETING: "/services/social-media-marketing",
    INFLUENCER_MARKETING: "/services/influencer-marketing",
    EVENT_MANAGEMENT: "/services/event-pr",
  },
};

export const EXTERNAL_LINKS = {
  INSTAGRAM: "",
  TWITTER: "",
  LINKEDIN: "",

  PHONE: "+919899707349",
  EMAIL_AVANCEPR: "info@avancepr.in",
  EMAIL_PERSONAL: "ritika@avancepr.in",
};
