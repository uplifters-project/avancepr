// Server-only. Imports src/lib/supabase.ts (service-role client init), so
// this must never be imported from a component render body or anything
// else that ends up in the client bundle — only from API routes and
// getServerSideProps functions (Next.js tree-shakes gSSP-only imports out
// of the client bundle, the same way src/lib/supabase.ts's own
// `supabaseAdmin` already gets imported directly in admin gSSP functions).
import { mediaUrl } from "@/lib/supabase";
import type { ResourceDef } from "@/lib/admin/resources";

// Existing rows can hold a bare relative Azure Blob path (e.g.
// "blog_photo/x.jpg") — see src/lib/supabase.ts's mediaUrl() docstring.
// The public site always normalizes through mediaUrl() before rendering;
// the admin dashboard's list thumbnails and ImageField previews need the
// same treatment, or a not-yet-re-uploaded legacy image just renders blank.
export function normalizeRowMedia<T extends Record<string, any>>(
  resource: ResourceDef,
  row: T | null | undefined
): T | null {
  if (!row) return row ?? null;
  const imageFieldNames = resource.fields
    .filter((f) => f.type === "image")
    .map((f) => f.name);
  if (imageFieldNames.length === 0) return row;

  const out = { ...row };
  for (const name of imageFieldNames) {
    if (name in out) (out as any)[name] = mediaUrl(out[name]) ?? null;
  }
  return out;
}

export function normalizeRowsMedia<T extends Record<string, any>>(
  resource: ResourceDef,
  rows: T[]
): T[] {
  return rows.map((row) => normalizeRowMedia(resource, row) as T);
}
