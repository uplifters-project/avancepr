import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin/auth";
import {
  MEDIA_FOLDERS,
  buildObjectPath,
  isAllowedFileSize,
  isAllowedImageType,
  publicMediaUrl,
} from "@/lib/admin/storage";

// POST /api/admin/upload-url  body: { folder, filename, contentType, size }
// -> { path, token, publicUrl }
//
// Mints a signed Storage upload URL server-side (createSignedUploadUrl
// requires `objects: insert` RLS permission, which only the service-role
// client has — RLS has no policies at all on this project). The browser
// then uploads the file directly to Storage with that token
// (ImageField / src/lib/admin/upload.ts), never through this server, so a
// multi-MB image never touches a Vercel function's request body limit.

const bodySchema = z.object({
  folder: z.enum(
    Object.values(MEDIA_FOLDERS) as [string, ...string[]]
  ),
  filename: z.string().trim().min(1).max(200),
  contentType: z.string(),
  size: z.number().int().positive(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ detail: `Method "${req.method}" not allowed.` });
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ detail: "Validation failed.", errors: parsed.error.flatten() });
  }
  const { folder, filename, contentType, size } = parsed.data;

  if (!isAllowedImageType(contentType)) {
    return res.status(400).json({ detail: "Only JPEG, PNG, WEBP or GIF images are allowed." });
  }
  if (!isAllowedFileSize(size)) {
    return res.status(400).json({ detail: "Image must be 5 MB or smaller." });
  }

  const path = buildObjectPath(folder as any, filename, contentType);

  const { data, error } = await supabaseAdmin.storage.from("media").createSignedUploadUrl(path);
  if (error || !data) {
    console.error("[admin] createSignedUploadUrl failed", error);
    return res.status(500).json({ detail: "Failed to prepare upload." });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!;

  return res.status(200).json({
    path: data.path,
    token: data.token,
    publicUrl: publicMediaUrl(supabaseUrl, data.path),
  });
}
