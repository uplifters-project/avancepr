import { createClient } from "@supabase/supabase-js";

// The project URL is not secret (the admin panel's browser client needs it
// too), so it may be provided as NEXT_PUBLIC_SUPABASE_URL only. The service
// role key is secret and must never be NEXT_PUBLIC_.
const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY " +
      "environment variables. The service role key is server-only (never prefix " +
      "with NEXT_PUBLIC_) — see .env.example."
  );
}

// Server-only client authenticated with the service-role key. RLS on every
// table has no policies, so only this client (never a browser) can read/write.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

const LEGACY_MEDIA_PREFIX =
  "https://upliftersstorage.blob.core.windows.net/avanceprmedia/";

/**
 * Existing rows store a relative Azure Blob path (e.g. "blog_photo/x.jpg"),
 * matching what the old Django ImageField columns held. New uploads via
 * Supabase Storage store a full URL instead. This normalizes both to an
 * absolute URL the frontend can render directly.
 */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${LEGACY_MEDIA_PREFIX}${path}`;
}
