// Client-safe: runs in the browser from ImageField. Talks to
// /api/admin/upload-url (service-role key, server-only) to get a signed
// Storage upload URL, then uploads the file directly to Supabase Storage
// with the anon/publishable client — the signed token itself is what
// authorizes the upload, not the caller's own permissions.
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import type { MediaFolder } from "@/lib/admin/storage";

export class UploadError extends Error {}

export async function uploadImage(
  file: File,
  folder: MediaFolder,
  onProgress?: (pct: number) => void
): Promise<string> {
  const prepRes = await fetch("/api/admin/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      folder,
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }),
  });

  if (!prepRes.ok) {
    const body = await prepRes.json().catch(() => ({}));
    throw new UploadError(body.detail ?? "Failed to prepare upload.");
  }

  const { path, token, publicUrl } = await prepRes.json();

  onProgress?.(10);

  const supabase = getSupabaseBrowser();
  const { error } = await supabase.storage
    .from("media")
    .uploadToSignedUrl(path, token, file, { contentType: file.type });

  if (error) {
    throw new UploadError(error.message ?? "Upload failed.");
  }

  onProgress?.(100);

  return publicUrl as string;
}
