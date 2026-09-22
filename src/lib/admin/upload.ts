// Client-safe: runs in the browser from ImageField. Talks to
// /api/admin/upload-url (service-role key, server-only) to get a signed
// Storage upload URL, then uploads the file directly to Supabase Storage
// with the anon/publishable client — the signed token itself is what
// authorizes the upload, not the caller's own permissions.
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { MEDIA_BUCKET, type MediaFolder } from "@/lib/admin/storage";

export class UploadError extends Error {}

// Uploads (blog covers, inline blog-body images) have no server-side
// processing — the browser talks to Supabase Storage directly via a signed
// URL (see the note above), so this is the only place left to keep an
// admin's raw phone-camera photo from landing in Storage untouched. Skips
// small files outright, and skips PNGs that are already within the
// dimension cap (no lossy quality knob to fall back on there — only
// resizing helps, and re-encoding risks bloating an already-small PNG).
const MAX_DIMENSION_PX = 2000;
const JPEG_WEBP_QUALITY = 0.82;
const SKIP_COMPRESSION_UNDER_BYTES = 300 * 1024;

async function compressImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file; // canvas would collapse the animation to one frame
  if (file.size <= SKIP_COMPRESSION_UNDER_BYTES) return file;

  const isPng = file.type === "image/png";

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION_PX / Math.max(bitmap.width, bitmap.height));

    if (isPng && scale === 1) {
      bitmap.close();
      return file;
    }

    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, file.type, isPng ? undefined : JPEG_WEBP_QUALITY)
    );
    if (!blob || blob.size >= file.size) return file; // re-encode didn't actually help

    return new File([blob], file.name, { type: file.type });
  } catch {
    return file; // never let a compression failure block the upload
  }
}

export async function uploadImage(
  file: File,
  folder: MediaFolder,
  onProgress?: (pct: number) => void
): Promise<string> {
  const upload = await compressImage(file);

  const prepRes = await fetch("/api/admin/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      folder,
      filename: file.name,
      contentType: upload.type,
      size: upload.size,
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
    .from(MEDIA_BUCKET)
    .uploadToSignedUrl(path, token, upload, { contentType: upload.type });

  if (error) {
    throw new UploadError(error.message ?? "Upload failed.");
  }

  onProgress?.(100);

  return publicUrl as string;
}
