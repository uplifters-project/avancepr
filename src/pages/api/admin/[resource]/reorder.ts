import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin/auth";
import { getResource } from "@/lib/admin/resources";
import { revalidatePaths } from "@/lib/admin/revalidate";

const bodySchema = z.array(z.object({ id: z.number().int(), order: z.number().int().min(0) })).min(1);

// PATCH /api/admin/[resource]/reorder  body: [{ id, order }, ...]
// Applied one row at a time (Supabase's JS client has no multi-row CASE
// update); the list is short for every orderable resource here (tens of
// rows, not thousands), so this stays well within a single request.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    return res.status(405).json({ detail: `Method "${req.method}" not allowed.` });
  }

  const slug = String(req.query.resource);
  const resource = getResource(slug);
  if (!resource) {
    return res.status(404).json({ detail: `Unknown resource "${slug}".` });
  }
  if (!resource.orderable) {
    return res.status(405).json({ detail: `${resource.label} cannot be reordered.` });
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ detail: "Validation failed.", errors: parsed.error.flatten() });
  }

  const results = await Promise.all(
    parsed.data.map(({ id, order }) =>
      supabaseAdmin.from(resource.table).update({ order }).eq("id", id)
    )
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) {
    console.error(`[admin] reorder ${resource.table} failed`, failed.error);
    return res.status(500).json({ detail: "Failed to reorder." });
  }

  await revalidatePaths(res, resource.revalidatePaths({}));

  return res.status(200).json({ ok: true });
}
