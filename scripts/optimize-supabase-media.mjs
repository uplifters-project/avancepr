// One-off maintenance: re-compresses every image already sitting in the
// Supabase `avancepr_media` Storage bucket (src/lib/admin/storage.ts
// MEDIA_BUCKET) in place (same path, same public URL — nothing in the DB or
// any blog body HTML needs to change). Uploads went straight from the
// browser to Storage with only a flat 5 MB cap and (as of the admin
// upload.ts change that prompted this script) client-side compression, so
// this is for anything that slips past that or was uploaded before it.
//
// Fetches over the bucket's public URL rather than the storage client's
// download() — download() turned out to be unreliable against the old
// `media` bucket (returned 404 for objects that clearly existed and were
// servable via the public URL); fetching the same way the site does avoids
// that.
//
// Uses sharp (already a project dependency) to downscale anything above a
// sane display size and re-encode at a reasonable quality (PNGs via
// palette/libimagequant quantization — see optimize-local-media.mjs for why),
// keeping the original format/extension so no reference anywhere needs to
// change.
//
// Idempotent-ish: re-running just re-checks every file and skips whatever
// no longer shrinks meaningfully, so it's safe to re-run after new uploads
// land.
//
// Usage:
//   node --env-file=.env.local scripts/optimize-supabase-media.mjs           # do it
//   node --env-file=.env.local scripts/optimize-supabase-media.mjs --dry-run # report only, no writes

import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const DRY_RUN = process.argv.includes("--dry-run");

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run with: node --env-file=.env.local scripts/optimize-supabase-media.mjs"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

const MEDIA_BUCKET = "avancepr_media"; // keep in sync with src/lib/admin/storage.ts

// Matches src/lib/admin/storage.ts MEDIA_FOLDERS — the bucket is one level
// deep (folder/file), no nested subfolders.
const FOLDERS = [
  "testimonial",
  "our_client",
  "our_work",
  "our_work_banner",
  "latest_news",
  "awards",
  "blog_photo",
  "blog_body",
];

const MAX_DIMENSION_PX = 2000;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 82;
const PNG_COMPRESSION_LEVEL = 9;
const MIN_SAVINGS_RATIO = 0.05; // skip the upload if it barely helps

const EXT_TO_CONTENT_TYPE = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

function extOf(name) {
  const m = /\.([a-z0-9]+)$/i.exec(name);
  return m ? m[1].toLowerCase() : "";
}

async function recompress(buffer, ext) {
  const image = sharp(buffer, { animated: ext === "gif" });
  const meta = await image.metadata();

  if (ext === "gif") return null; // don't collapse animated GIFs to a single frame

  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
  const resized =
    longEdge > MAX_DIMENSION_PX
      ? image.resize({
          width: meta.width >= meta.height ? MAX_DIMENSION_PX : undefined,
          height: meta.height > meta.width ? MAX_DIMENSION_PX : undefined,
          withoutEnlargement: true,
        })
      : image;

  switch (ext) {
    case "jpg":
    case "jpeg":
      return resized.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
    case "png":
      return resized.png({ compressionLevel: PNG_COMPRESSION_LEVEL, palette: true }).toBuffer();
    case "webp":
      return resized.webp({ quality: WEBP_QUALITY }).toBuffer();
    default:
      return null; // unknown extension, leave untouched
  }
}

const stats = { checked: 0, optimized: 0, skipped: 0, failed: 0, bytesBefore: 0, bytesAfter: 0 };
const failures = [];

async function processFile(folder, name) {
  const path = `${folder}/${name}`;
  const ext = extOf(name);
  stats.checked++;

  if (!EXT_TO_CONTENT_TYPE[ext]) {
    stats.skipped++;
    return;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  const res = await fetch(publicUrl);
  if (!res.ok) {
    stats.failed++;
    failures.push({ path, error: `fetch -> ${res.status}` });
    console.error(`✗ ${path}: fetch failed —`, res.status);
    return;
  }
  const original = Buffer.from(await res.arrayBuffer());

  let optimized;
  try {
    optimized = await recompress(original, ext);
  } catch (err) {
    stats.failed++;
    failures.push({ path, error: err.message });
    console.error(`✗ ${path}: recompress failed —`, err.message);
    return;
  }

  if (!optimized || optimized.length >= original.length * (1 - MIN_SAVINGS_RATIO)) {
    stats.skipped++;
    console.log(`- ${path}: no meaningful savings, left as-is (${original.length} bytes)`);
    return;
  }

  const savedPct = (100 * (1 - optimized.length / original.length)).toFixed(0);
  if (DRY_RUN) {
    console.log(
      `[dry-run] ${path}: ${original.length} -> ${optimized.length} bytes (-${savedPct}%)`
    );
  } else {
    const { error: uploadError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(path, optimized, { contentType: EXT_TO_CONTENT_TYPE[ext], upsert: true });
    if (uploadError) {
      stats.failed++;
      failures.push({ path, error: uploadError.message });
      console.error(`✗ ${path}: upload failed —`, uploadError.message);
      return;
    }
    console.log(`✓ ${path}: ${original.length} -> ${optimized.length} bytes (-${savedPct}%)`);
  }

  stats.optimized++;
  stats.bytesBefore += original.length;
  stats.bytesAfter += optimized.length;
}

async function main() {
  if (DRY_RUN) console.log("--- DRY RUN: no uploads will happen ---\n");

  for (const folder of FOLDERS) {
    const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(folder, { limit: 1000 });
    if (error) {
      console.error(`✗ list ${folder}: failed —`, error.message);
      continue;
    }
    for (const entry of data) {
      if (!entry.id) continue; // sub-folder placeholder, shouldn't happen given the flat layout
      await processFile(folder, entry.name);
    }
  }

  console.log("\n--- Summary ---");
  console.log(stats);
  if (stats.bytesBefore > 0) {
    const totalSavedPct = (100 * (1 - stats.bytesAfter / stats.bytesBefore)).toFixed(0);
    console.log(
      `Total: ${stats.bytesBefore} -> ${stats.bytesAfter} bytes (-${totalSavedPct}%)`
    );
  }
  if (failures.length) {
    console.log("\nFailures (re-run this script to retry):");
    for (const f of failures) console.log(" ", f);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
