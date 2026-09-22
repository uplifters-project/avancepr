// One-off: recompresses the local backup of the Supabase `media` bucket
// (../media relative to this repo, i.e. /Users/apple/Desktop/avancepr/media)
// in place, keeping every filename/extension exactly as-is so the folder
// can still be uploaded path-for-path to match existing DB references
// (main_blog.image etc. store these exact relative paths/filenames).
//
// PNGs are palette-quantized (a pngquant-style lossy re-encode via sharp's
// libimagequant binding) since plain deflate recompression barely shrinks
// the AI-generated illustration PNGs in blog_photo/ (they're graphic/flat-
// color, not photos, so 256-color palette quantization is visually
// lossless at web sizes while cutting size by ~70-90%). JPEGs are
// re-encoded with mozjpeg. Each folder gets a max-dimension cap matching
// how it's actually displayed on the site (logos/thumbnails smaller,
// blog covers/banners larger).
//
// Usage:
//   node scripts/optimize-local-media.mjs           # do it
//   node scripts/optimize-local-media.mjs --dry-run  # report only, no writes

import { readdir, readFile, writeFile, stat } from "fs/promises";
import path from "path";
import sharp from "sharp";

const DRY_RUN = process.argv.includes("--dry-run");
const MEDIA_DIR = path.resolve(process.cwd(), "..", "media");

// Max long-edge dimension per folder, matched to how each is actually
// rendered on the site (see src/lib/data.ts, admin/blog cover images,
// testimonial/client-logo grids, case-study banners).
const FOLDER_MAX_DIMENSION = {
  testimonial: 800,
  our_client: 500,
  our_work: 500,
  our_work_banner: 1600,
  latest_news: 500,
  awards: 1200,
  blog_photo: 1200,
  blog_body: 1200,
};

const JPEG_QUALITY = 82;
const PNG_QUALITY = 80; // libimagequant quality target, not deflate level
const PNG_COLORS = 256;
const MIN_SAVINGS_RATIO = 0.05;

function extOf(name) {
  const m = /\.([a-z0-9]+)$/i.exec(name);
  return m ? m[1].toLowerCase() : "";
}

async function recompress(buffer, ext, maxDimension) {
  const image = sharp(buffer);
  const meta = await image.metadata();
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);

  const resized =
    longEdge > maxDimension
      ? image.resize({
          width: (meta.width ?? 0) >= (meta.height ?? 0) ? maxDimension : undefined,
          height: (meta.height ?? 0) > (meta.width ?? 0) ? maxDimension : undefined,
          withoutEnlargement: true,
        })
      : image;

  switch (ext) {
    case "jpg":
    case "jpeg":
      return resized.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
    case "png":
      return resized
        .png({ palette: true, quality: PNG_QUALITY, colors: PNG_COLORS, compressionLevel: 9 })
        .toBuffer();
    case "webp":
      return resized.webp({ quality: JPEG_QUALITY }).toBuffer();
    default:
      return null;
  }
}

const stats = { checked: 0, optimized: 0, skipped: 0, failed: 0, bytesBefore: 0, bytesAfter: 0 };

async function processFile(folder, name) {
  const ext = extOf(name);
  if (!["jpg", "jpeg", "png", "webp"].includes(ext)) return;

  const filePath = path.join(MEDIA_DIR, folder, name);
  const original = await readFile(filePath);
  stats.checked++;

  let optimized;
  try {
    optimized = await recompress(original, ext, FOLDER_MAX_DIMENSION[folder] ?? 1200);
  } catch (err) {
    stats.failed++;
    console.error(`✗ ${folder}/${name}: recompress failed —`, err.message);
    return;
  }

  if (!optimized || optimized.length >= original.length * (1 - MIN_SAVINGS_RATIO)) {
    stats.skipped++;
    console.log(`- ${folder}/${name}: no meaningful savings, left as-is (${original.length} bytes)`);
    return;
  }

  const savedPct = (100 * (1 - optimized.length / original.length)).toFixed(0);
  if (DRY_RUN) {
    console.log(`[dry-run] ${folder}/${name}: ${original.length} -> ${optimized.length} bytes (-${savedPct}%)`);
  } else {
    await writeFile(filePath, optimized);
    console.log(`✓ ${folder}/${name}: ${original.length} -> ${optimized.length} bytes (-${savedPct}%)`);
  }

  stats.optimized++;
  stats.bytesBefore += original.length;
  stats.bytesAfter += optimized.length;
}

async function main() {
  if (DRY_RUN) console.log("--- DRY RUN: no files will be modified ---\n");
  console.log("Media dir:", MEDIA_DIR, "\n");

  const folders = Object.keys(FOLDER_MAX_DIMENSION);
  for (const folder of folders) {
    const dirPath = path.join(MEDIA_DIR, folder);
    let entries;
    try {
      entries = await readdir(dirPath);
    } catch {
      console.warn(`skip ${folder}: not found`);
      continue;
    }
    for (const name of entries) {
      const full = path.join(dirPath, name);
      const s = await stat(full);
      if (!s.isFile()) continue;
      await processFile(folder, name);
    }
  }

  console.log("\n--- Summary ---");
  console.log(stats);
  if (stats.bytesBefore > 0) {
    const totalSavedPct = (100 * (1 - stats.bytesAfter / stats.bytesBefore)).toFixed(0);
    console.log(`Total: ${stats.bytesBefore} -> ${stats.bytesAfter} bytes (-${totalSavedPct}%)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
