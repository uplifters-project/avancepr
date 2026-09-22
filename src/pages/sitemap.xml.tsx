import type { GetServerSideProps } from "next";
import { getBlogs, getOurWork } from "@/lib/queries";
import { SITE_URL } from "@/lib/constants";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/faq", changefreq: "monthly", priority: "0.5" },
  { path: "/work", changefreq: "weekly", priority: "0.7" },
  { path: "/testimonials", changefreq: "monthly", priority: "0.5" },
  { path: "/featured", changefreq: "weekly", priority: "0.5" },
  { path: "/blogs", changefreq: "weekly", priority: "0.7" },
  { path: "/services/startup-pr", changefreq: "monthly", priority: "0.8" },
  { path: "/services/social-media-marketing", changefreq: "monthly", priority: "0.8" },
  { path: "/services/influencer-marketing", changefreq: "monthly", priority: "0.8" },
  { path: "/services/crisis-management", changefreq: "monthly", priority: "0.8" },
  { path: "/services/corporate-communication", changefreq: "monthly", priority: "0.8" },
  { path: "/services/personal-branding", changefreq: "monthly", priority: "0.8" },
];

function buildUrlEntry(loc: string, changefreq: string, priority: string) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function buildSitemap(blogIds: number[], workIds: number[]): string {
  const staticEntries = STATIC_ROUTES.map((route) =>
    buildUrlEntry(`${SITE_URL}${route.path}`, route.changefreq, route.priority)
  );

  const blogEntries = blogIds.map((id) =>
    buildUrlEntry(`${SITE_URL}/blogs/${id}`, "monthly", "0.6")
  );

  const workEntries = workIds.map((id) =>
    buildUrlEntry(`${SITE_URL}/work/${id}`, "monthly", "0.6")
  );

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ...staticEntries,
    ...blogEntries,
    ...workEntries,
  ].join("\n")}\n</urlset>`;
}

// This page renders nothing — getServerSideProps writes the XML response
// directly and returns notFound so Next never tries to render a component.
export default function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [blogs, workItems] = await Promise.all([
    getBlogs().catch(() => []),
    getOurWork().catch(() => []),
  ]);

  const sitemap = buildSitemap(
    blogs.map((b) => b.id),
    workItems.map((w) => w.id)
  );

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
};
