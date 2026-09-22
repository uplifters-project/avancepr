import type { NextApiResponse } from "next";

/**
 * Best-effort ISR revalidation after an admin write. Never throws — a
 * revalidation failure (e.g. a path that isn't a known static page) must
 * not fail the write that already succeeded in the database. The affected
 * page simply stays stale until its normal 24h revalidate window, same as
 * before this call existed.
 */
export async function revalidatePaths(res: NextApiResponse, paths: string[]) {
  for (const path of paths) {
    try {
      await res.revalidate(path);
    } catch (err) {
      console.error(`[admin] revalidate failed for ${path}`, err);
    }
  }
}

// All static paths the admin's "Rebuild site" button refreshes in one go.
// Dynamic blog/work detail pages beyond the ids listed here stay on their
// normal 24h ISR schedule (revalidating every one would mean loading every
// row from every table just to build this list).
export const CORE_REVALIDATE_PATHS = [
  "/",
  "/about",
  "/blogs",
  "/work",
  "/testimonials",
  "/featured",
];
