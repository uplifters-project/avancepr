import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "@/lib/admin/auth";
import { revalidatePaths, CORE_REVALIDATE_PATHS } from "@/lib/admin/revalidate";

// POST /api/admin/revalidate — the admin dashboard's "Rebuild site" button.
// Refreshes every core static page immediately instead of waiting for the
// normal 24h ISR window. See CORE_REVALIDATE_PATHS for what's covered.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ detail: `Method "${req.method}" not allowed.` });
  }

  await revalidatePaths(res, CORE_REVALIDATE_PATHS);

  return res.status(200).json({ ok: true, paths: CORE_REVALIDATE_PATHS });
}
