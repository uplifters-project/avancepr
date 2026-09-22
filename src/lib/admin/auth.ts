import type { NextApiRequest, NextApiResponse } from "next";
import type { GetServerSidePropsContext } from "next";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { ADMIN_BASE_PATH } from "@/lib/constants";

// Single-admin allowlist. Supabase Auth handles credentials/sessions; this
// just decides whether a *valid, signed-in* Supabase user is allowed into
// the panel. Public sign-ups must stay disabled in the Supabase dashboard
// (Authentication -> Providers -> Email -> "Allow new users to sign up" off)
// — this allowlist is defence in depth, not the only gate.
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export type AdminUser = { id: string; email: string };

function isAllowed(email: string | null | undefined): email is string {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * For API routes (pages/api/admin/**). Returns the admin user, or writes a
 * 401 JSON response and returns null — callers should `return` immediately
 * when this returns null.
 */
export async function requireAdmin(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<AdminUser | null> {
  const supabase = createSupabaseServerClient(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAllowed(user?.email)) {
    res.status(401).json({ detail: "Not authenticated." });
    return null;
  }

  return { id: user!.id, email: user!.email! };
}

/**
 * For getServerSideProps on admin pages. Returns the admin user, or a
 * redirect-to-login props object — callers should `return` it directly:
 *
 *   const admin = await requireAdminSSP(ctx);
 *   if ("redirect" in admin) return admin;
 */
export async function requireAdminSSP(
  ctx: GetServerSidePropsContext
): Promise<AdminUser | { redirect: { destination: string; permanent: false } }> {
  const supabase = createSupabaseServerClient(ctx.req, ctx.res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAllowed(user?.email)) {
    const next = encodeURIComponent(ctx.resolvedUrl || ADMIN_BASE_PATH);
    return { redirect: { destination: `${ADMIN_BASE_PATH}/login?next=${next}`, permanent: false } };
  }

  return { id: user!.id, email: user!.email! };
}
