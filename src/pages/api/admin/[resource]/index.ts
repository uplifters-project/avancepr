import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin/auth";
import { getResource } from "@/lib/admin/resources";
import { revalidatePaths } from "@/lib/admin/revalidate";
import { normalizeRowMedia, normalizeRowsMedia } from "@/lib/admin/media-server";

// GET  /api/admin/[resource]?status=active|archived|all&q=search  -> list
// POST /api/admin/[resource]                                      -> create
//
// Shared by every table in the registry, including blogs (the admin UI page
// is custom for blogs, this API route isn't) and enquiries (GET/status only
// — POST is rejected via readOnly).

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const slug = String(req.query.resource);
  const resource = getResource(slug);
  if (!resource) {
    return res.status(404).json({ detail: `Unknown resource "${slug}".` });
  }

  if (req.method === "GET") {
    const status = String(req.query.status ?? "active");
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

    let query = supabaseAdmin.from(resource.table).select(resource.listSelect);

    if (status === "active") query = query.eq("is_archived", false);
    else if (status === "archived") query = query.eq("is_archived", true);
    // status === "all" -> no filter

    if (q && resource.searchColumns.length > 0) {
      const orFilter = resource.searchColumns
        .map((col) => `${col}.ilike.%${q.replace(/[%,]/g, "")}%`)
        .join(",");
      query = query.or(orFilter);
    }

    if (resource.orderable) {
      query = query.order("order", { ascending: true }).order("id", { ascending: true });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) {
      console.error(`[admin] list ${resource.table} failed`, error);
      return res.status(500).json({ detail: "Failed to load." });
    }

    return res.status(200).json({ data: normalizeRowsMedia(resource, data ?? []) });
  }

  if (req.method === "POST") {
    if (resource.readOnly) {
      return res.status(405).json({ detail: `${resource.label} cannot be created here.` });
    }

    const parsed = resource.schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ detail: "Validation failed.", errors: parsed.error.flatten() });
    }

    const { data, error } = await supabaseAdmin
      .from(resource.table)
      .insert(parsed.data)
      .select(resource.formSelect)
      .single();

    if (error) {
      console.error(`[admin] create ${resource.table} failed`, error);
      return res.status(500).json({ detail: "Failed to create." });
    }

    await revalidatePaths(res, resource.revalidatePaths(data));

    return res.status(201).json({ data: normalizeRowMedia(resource, data) });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ detail: `Method "${req.method}" not allowed.` });
}
