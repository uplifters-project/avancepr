import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Newspaper,
  Quote,
  Users,
  Briefcase,
  Award,
  Mail,
  Menu,
  X,
  LogOut,
  RefreshCw,
} from "lucide-react";

import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/work", label: "Our Work", icon: Briefcase },
  { href: "/admin/news", label: "Latest News", icon: Newspaper },
  { href: "/admin/awards", label: "Awards", icon: Award },
  { href: "/admin/enquiries", label: "Enquiries", icon: Mail },
];

const AdminLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  email: string;
  actions?: React.ReactNode;
}> = ({ children, title, email, actions }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rebuilding, setRebuilding] = useState(false);

  const signOut = async () => {
    await getSupabaseBrowser().auth.signOut();
    window.location.assign("/admin/login");
  };

  const rebuildSite = async () => {
    setRebuilding(true);
    try {
      const res = await fetch("/api/admin/revalidate", { method: "POST" });
      if (!res.ok) throw new Error();
      toast({ title: "Site rebuilt", description: "Core pages have been refreshed." });
    } catch {
      toast({
        title: "Rebuild failed",
        description: "Could not refresh the site. Try again shortly.",
        variant: "destructive",
      });
    } finally {
      setRebuilding(false);
    }
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? router.pathname === href : router.pathname.startsWith(href);

  return (
    <TooltipProvider delayDuration={300}>
      <Head>
        <title>{title} — Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-muted/20 lg:grid lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 border-r bg-background transition-transform lg:static lg:z-auto lg:w-auto lg:translate-x-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-14 items-center justify-between border-b px-4">
            <Link href="/admin" className="font-semibold">
              Avance PR admin
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="lg:hidden"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Close menu</TooltipContent>
            </Tooltip>
          </div>
          <nav className="flex flex-col gap-1 p-3">
            {NAV.map(({ href, label, icon: Icon, exact }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(href, exact)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main */}
        <div className="flex min-h-screen flex-col">
          <header className="flex h-14 items-center justify-between border-b bg-background px-4">
            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="lg:hidden"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Open menu</TooltipContent>
              </Tooltip>
              <h1 className="text-sm font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              {actions}
              <Button
                variant="outline"
                size="sm"
                onClick={rebuildSite}
                disabled={rebuilding}
              >
                <RefreshCw className={cn("h-3.5 w-3.5", rebuilding && "animate-spin")} />
                Rebuild site
              </Button>
              <span className="hidden text-sm text-muted-foreground sm:inline">{email}</span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AdminLayout;
