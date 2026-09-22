import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin/auth";
import { getResource } from "@/lib/admin/resources";
import { revalidatePaths } from "@/lib/admin/revalidate";
import { normalizeRowMedia } from "@/lib/admin/media-server";

// GET    /api/admin/[resource]/[id]              -> single row
// PATCH  /api/admin/[resource]/[id]               -> partial update
//         body may include any subset of the resource's editable fields,
//         plus { is_archived } to archive/restore (hides from the public
//         site without deleting the row).
// DELETE /api/admin/[resource]/[id]               -> permanent delete.
//         Only allowed once a row is already archived — archive it first,
//         then delete from the Archived tab. This is a deliberate
//         two-step guard against accidental permanent loss; it is not a
//         technical restriction (the row is fully gone from the database
//         either way, unlike archiving).

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const slug = String(req.query.resource);
  const resource = getResource(slug);
  if (!resource) {
    return res.status(404).json({ detail: `Unknown resource "${slug}".` });
  }

  const id = Number(req.query.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ detail: "Invalid id." });
  }

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from(resource.table)
      .select(resource.formSelect)
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(`[admin] get ${resource.table} failed`, error);
      return res.status(500).json({ detail: "Failed to load." });
    }
    if (!data) return res.status(404).json({ detail: "Not found." });

    return res.status(200).json({ data: normalizeRowMedia(resource, data) });
  }

  if (req.method === "PATCH") {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const { is_archived, ...rest } = body;

    const updates: Record<string, any> = {};
    if (typeof is_archived === "boolean") {
      updates.is_archived = is_archived;
    }

    if (Object.keys(rest).length > 0) {
      if (resource.readOnly) {
        return res.status(405).json({ detail: `${resource.label} cannot be edited.` });
      }
      const parsed = resource.schema.partial().safeParse(rest);
      if (!parsed.success) {
        return res.status(400).json({ detail: "Validation failed.", errors: parsed.error.flatten() });
      }
      Object.assign(updates, parsed.data);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ detail: "Nothing to update." });
    }

    const { data, error } = await supabaseAdmin
      .from(resource.table)
      .update(updates)
      .eq("id", id)
      .select(resource.formSelect)
      .maybeSingle();

    if (error) {
      console.error(`[admin] update ${resource.table} failed`, error);
      return res.status(500).json({ detail: "Failed to update." });
    }
    if (!data) return res.status(404).json({ detail: "Not found." });

    await revalidatePaths(res, resource.revalidatePaths(data));

    return res.status(200).json({ data: normalizeRowMedia(resource, data) });
  }

  if (req.method === "DELETE") {
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from(resource.table)
      .select("id, is_archived")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) {
      console.error(`[admin] fetch before delete ${resource.table} failed`, fetchError);
      return res.status(500).json({ detail: "Failed to delete." });
    }
    if (!existing) return res.status(404).json({ detail: "Not found." });
    if (!existing.is_archived) {
      return res.status(409).json({ detail: "Archive this item before deleting it permanently." });
    }

    const { error } = await supabaseAdmin.from(resource.table).delete().eq("id", id);
    if (error) {
      console.error(`[admin] delete ${resource.table} failed`, error);
      return res.status(500).json({ detail: "Failed to delete." });
    }

    await revalidatePaths(res, resource.revalidatePaths({ id }));

    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PATCH, DELETE");
  return res.status(405).json({ detail: `Method "${req.method}" not allowed.` });
}
