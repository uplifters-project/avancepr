import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { Newspaper, Quote, Users, Briefcase, Award, Mail } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdminSSP } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase";

interface Counts {
  blogs: number;
  testimonials: number;
  clients: number;
  work: number;
  news: number;
  awards: number;
  enquiries: number;
}

interface RecentEnquiry {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
}

const TILES: { key: keyof Counts; label: string; href: string; icon: React.ElementType }[] = [
  { key: "blogs", label: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { key: "testimonials", label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { key: "clients", label: "Clients", href: "/admin/clients", icon: Users },
  { key: "work", label: "Work items", href: "/admin/work", icon: Briefcase },
  { key: "news", label: "News items", href: "/admin/news", icon: Newspaper },
  { key: "awards", label: "Awards", href: "/admin/awards", icon: Award },
  { key: "enquiries", label: "Enquiries", href: "/admin/enquiries", icon: Mail },
];

const OverviewPage: NextPage<{
  email: string;
  counts: Counts;
  recentEnquiries: RecentEnquiry[];
}> = ({ email, counts, recentEnquiries }) => {
  return (
    <AdminLayout title="Overview" email={email}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {TILES.map(({ key, label, href, icon: Icon }) => (
          <Link key={key} href={href}>
            <Card className="transition-colors hover:border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{counts[key]}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Recent enquiries
        </h2>
        {recentEnquiries.length === 0 ? (
          <p className="text-sm text-muted-foreground">No enquiries yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border bg-background">
            {recentEnquiries.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between gap-4 border-b px-4 py-3 text-sm last:border-b-0"
              >
                <div>
                  <div className="font-medium">{e.full_name}</div>
                  <div className="text-muted-foreground">{e.email}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(e.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          href="/admin/enquiries"
          className="mt-3 inline-block text-sm text-primary hover:underline"
        >
          View all enquiries →
        </Link>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const admin = await requireAdminSSP(ctx);
  if ("redirect" in admin) return admin;

  const [blogs, testimonials, clients, work, news, awards, enquiries, recent] =
    await Promise.all([
      supabaseAdmin.from("main_blog").select("id", { count: "exact", head: true }).eq("is_archived", false),
      supabaseAdmin.from("main_testimonial").select("id", { count: "exact", head: true }).eq("is_archived", false),
      supabaseAdmin.from("main_ourclient").select("id", { count: "exact", head: true }).eq("is_archived", false),
      supabaseAdmin.from("main_ourwork").select("id", { count: "exact", head: true }).eq("is_archived", false),
      supabaseAdmin.from("main_latestnews").select("id", { count: "exact", head: true }).eq("is_archived", false),
      supabaseAdmin.from("main_awardsrecognition").select("id", { count: "exact", head: true }).eq("is_archived", false),
      supabaseAdmin.from("main_enquiry").select("id", { count: "exact", head: true }).eq("is_archived", false),
      supabaseAdmin
        .from("main_enquiry")
        .select("id, full_name, email, created_at")
        .eq("is_archived", false)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const counts: Counts = {
    blogs: blogs.count ?? 0,
    testimonials: testimonials.count ?? 0,
    clients: clients.count ?? 0,
    work: work.count ?? 0,
    news: news.count ?? 0,
    awards: awards.count ?? 0,
    enquiries: enquiries.count ?? 0,
  };

  return {
    props: {
      email: admin.email,
      counts,
      recentEnquiries: recent.data ?? [],
    },
  };
};

export default OverviewPage;
