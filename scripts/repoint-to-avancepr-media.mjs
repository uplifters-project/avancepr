// One-off: rewrites every stored image/banner URL that still points at the
// old `media` bucket (on either this project or the foreign
// wkmsmkaokahxhmkzbqow.supabase.co project some rows were seeded from — see
// scripts/seed-from-cache.mjs) to this project's `avancepr_media` bucket
// (src/lib/admin/storage.ts MEDIA_BUCKET), keeping the same folder/filename
// — the compressed files were uploaded there path-for-path.
//
// Verifies the target file actually exists (HEAD 200) before rewriting each
// row, so a row is only changed once we know the new URL actually resolves.
//
// Usage:
//   node --env-file=.env.local scripts/repoint-to-avancepr-media.mjs           # do it
//   node --env-file=.env.local scripts/repoint-to-avancepr-media.mjs --dry-run # report only, no writes

import { createClient } from "@supabase/supabase-js";

const DRY_RUN = process.argv.includes("--dry-run");

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run with: node --env-file=.env.local scripts/repoint-to-avancepr-media.mjs"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

const NEW_BUCKET = "avancepr_media";
const OLD_BUCKET_PATH_MARKER = "/storage/v1/object/public/media/";

const TABLES = [
  { table: "main_testimonial", columns: ["image"] },
  { table: "main_ourclient", columns: ["image"] },
  { table: "main_ourwork", columns: ["image", "banner"] },
  { table: "main_latestnews", columns: ["image"] },
  { table: "main_blog", columns: ["image"] },
  { table: "main_awardsrecognition", columns: ["image"] },
];

function relativePathFromOldUrl(value) {
  const idx = value.indexOf(OLD_BUCKET_PATH_MARKER);
  if (idx === -1) return null;
  return value.slice(idx + OLD_BUCKET_PATH_MARKER.length);
}

const stats = { updated: 0, skipped: 0, missing: 0, failed: 0 };
const missing = [];
const failures = [];

async function processOne(table, id, column, value) {
  const relativePath = relativePathFromOldUrl(value);
  if (!relativePath) {
    stats.skipped++;
    return;
  }

  const newUrl = `${supabaseUrl}/storage/v1/object/public/${NEW_BUCKET}/${relativePath}`;

  const head = await fetch(newUrl, { method: "HEAD" });
  if (!head.ok) {
    stats.missing++;
    missing.push({ table, id, column, relativePath, status: head.status });
    console.warn(`? ${table}.${column}#${id}: ${relativePath} -> ${head.status} at new bucket, left as-is`);
    return;
  }

  if (DRY_RUN) {
    console.log(`[dry-run] ${table}.${column}#${id}: ${value} -> ${newUrl}`);
    stats.updated++;
    return;
  }

  const { error } = await supabase.from(table).update({ [column]: newUrl }).eq("id", id);
  if (error) {
    stats.failed++;
    failures.push({ table, id, column, error: error.message });
    console.error(`✗ ${table}.${column}#${id}:`, error.message);
    return;
  }

  console.log(`✓ ${table}.${column}#${id}: ${relativePath}`);
  stats.updated++;
}

async function main() {
  if (DRY_RUN) console.log("--- DRY RUN: no DB writes will happen ---\n");

  for (const { table, columns } of TABLES) {
    const { data, error } = await supabase.from(table).select(["id", ...columns].join(","));
    if (error) {
      console.error(`✗ ${table}: failed to read rows —`, error.message);
      continue;
    }
    for (const row of data) {
      for (const column of columns) {
        const value = row[column];
        if (!value) {
          stats.skipped++;
          continue;
        }
        await processOne(table, row.id, column, value);
      }
    }
  }

  console.log("\n--- Summary ---");
  console.log(stats);
  if (missing.length) {
    console.log("\nRows left unchanged (target file not found at avancepr_media — check the path):");
    for (const m of missing) console.log(" ", m);
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
