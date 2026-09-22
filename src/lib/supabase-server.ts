import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import type { IncomingMessage, ServerResponse } from "http";

// Server-side Supabase Auth client for the admin panel — reads/writes the
// session cookie pair (@supabase/ssr's own cookies, not Django's). Used from
// getServerSideProps and from /api/admin/* route handlers to find out who is
// signed in. This is NOT the service-role client (src/lib/supabase.ts) — it
// is authenticated as the signed-in user via the anon/publishable key, and is
// only ever used to read auth.getUser(); it never queries main_* tables
// (RLS has no policies, so it couldn't anyway).
//
// Works with both Pages Router (req/res: IncomingMessage/ServerResponse or
// NextApiRequest/NextApiResponse, which extend them) contexts:
// getServerSideProps and API routes.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function createSupabaseServerClient(
  req: IncomingMessage,
  res: ServerResponse
) {
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return parseCookieHeader(req.headers.cookie ?? "");
      },
      setAll(cookiesToSet) {
        const existing = res.getHeader("Set-Cookie");
        const prior = Array.isArray(existing)
          ? existing
          : existing
          ? [String(existing)]
          : [];
        const next = cookiesToSet.map(({ name, value, options }) =>
          serializeCookieHeader(name, value, options)
        );
        res.setHeader("Set-Cookie", [...prior, ...next]);
      },
    },
  });
}
