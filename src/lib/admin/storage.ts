// Folder names match the old Django ImageField `upload_to=` values exactly
// (see advancepr_backend/main/models.py), so both legacy Azure paths and new
// Supabase Storage uploads sort into the same logical buckets in the
// `media` Storage bucket's file browser.
export const MEDIA_FOLDERS = {
  testimonial: "testimonial",
  ourClient: "our_client",
  ourWork: "our_work",
  ourWorkBanner: "our_work_banner",
  latestNews: "latest_news",
  awards: "awards",
  blogPhoto: "blog_photo",
  // New: images inserted inline into a blog body via the Tiptap editor.
  // Django's TinyMCE setup allowed inline images too, but had nowhere
  // structured to put them; this keeps them out of blog_photo (the cover
  // image folder) so the two don't get mixed up in the Storage browser.
  blogBody: "blog_body",
} as const;

export type MediaFolder = (typeof MEDIA_FOLDERS)[keyof typeof MEDIA_FOLDERS];

const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

export function isAllowedImageType(contentType: string): boolean {
  return ALLOWED_CONTENT_TYPES.has(contentType);
}

export function isAllowedFileSize(bytes: number): boolean {
  return bytes > 0 && bytes <= MAX_FILE_BYTES;
}

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

/**
 * Builds a collision-safe object path for a new upload: <folder>/<timestamp>-<slug>.<ext>.
 * The original filename is slugified (not trusted verbatim) and the
 * extension is derived from the validated content type, not the client's
 * filename, so a mislabeled upload can't smuggle in an unexpected extension.
 */
export function buildObjectPath(
  folder: MediaFolder,
  originalFilename: string,
  contentType: string
): string {
  const ext = EXT_BY_TYPE[contentType] ?? "bin";
  const base = originalFilename
    .replace(/\.[^./\\]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  const slug = base || "image";
  return `${folder}/${Date.now()}-${slug}.${ext}`;
}

export function publicMediaUrl(supabaseUrl: string, path: string): string {
  return `${supabaseUrl}/storage/v1/object/public/media/${path}`;
}
