import { createBrowserClient } from "@supabase/ssr";

// Browser-side client for the admin panel, authenticated with the public
// (publishable/anon) key. RLS has no policies, so this client can NOT read or
// write any main_* table — it is used only for:
//   - Supabase Auth (sign in / sign out; the session is stored in cookies that
//     src/lib/supabase-server.ts and src/proxy.ts read)
//   - uploading files to Storage with a signed upload URL minted server-side
//     by src/pages/api/admin/upload-url.ts
// All data reads/writes go through /api/admin/* with the service-role key.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowser() {
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }
  if (!client) client = createBrowserClient(url, key);
  return client;
}
