import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Next 16's proxy.ts (replaces middleware.ts). Runs before every /admin/*
// and /api/admin/* request.
//
// Its two jobs:
//  1. Refresh the Supabase Auth session cookie on every request. Without
//     this, an access token that expires mid-session never gets refreshed
//     (getServerSideProps/API routes only *read* cookies, they don't have a
//     reliable place to write refreshed ones back), and the admin gets
//     silently logged out. See https://supabase.com/docs/guides/auth/server-side/nextjs
//  2. Redirect signed-out visitors away from /admin/* pages before any
//     server render happens. This is a UX shortcut only — every admin page
//     also calls requireAdminSSP and every /api/admin/* route calls
//     requireAdmin (src/lib/admin/auth.ts), so a request that somehow skips
//     the proxy is still rejected there.
//
// The allowlist check itself (which signed-in email is "the admin") lives
// only in src/lib/admin/auth.ts, not here — this file only knows "signed in
// or not".

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!url || !key) {
    // Misconfigured env — fail closed on admin routes rather than letting
    // requests through with no auth check at all.
    if (isAdminPath(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (!user && isAdminPath(pathname) && !isLoginPage && !pathname.startsWith("/api/admin")) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

function isAdminPath(pathname: string) {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
