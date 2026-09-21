// One-off migration: copies every image still referenced from the legacy
// Azure Blob Storage account (upliftersstorage/avanceprmedia) into the
// Supabase `media` storage bucket, and rewrites each row's image/banner
// column to the new Supabase public URL.
//
// Idempotent and resumable: any column that already holds a supabase.co URL
// is skipped, so a partial run (network blip, one bad file, etc.) can just
// be re-run.
//
// Usage:
//   node --env-file=.env.local scripts/migrate-blob-images.mjs           # do it
//   node --env-file=.env.local scripts/migrate-blob-images.mjs --dry-run # report only, no writes
//
// Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (same vars the app uses).
// Does NOT require any Azure credentials — avanceprmedia is a public-read
// blob container, so images are fetched over plain HTTPS.

import { createClient } from "@supabase/supabase-js";

const DRY_RUN = process.argv.includes("--dry-run");

const LEGACY_MEDIA_PREFIX =
  "https://upliftersstorage.blob.core.windows.net/avanceprmedia/";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run with: node --env-file=.env.local scripts/migrate-blob-images.mjs"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

const TABLES = [
  { table: "main_testimonial", columns: ["image"] },
  { table: "main_ourclient", columns: ["image"] },
  { table: "main_ourwork", columns: ["image", "banner"] },
  { table: "main_latestnews", columns: ["image"] },
  { table: "main_blog", columns: ["image"] },
  { table: "main_awardsrecognition", columns: ["image"] },
];

function isLegacyPath(value) {
  if (!value) return false;
  return !/^https?:\/\//i.test(value) || value.startsWith(LEGACY_MEDIA_PREFIX);
}

function toRelativePath(value) {
  return value.startsWith(LEGACY_MEDIA_PREFIX)
    ? value.slice(LEGACY_MEDIA_PREFIX.length)
    : value;
}

const stats = { migrated: 0, skipped: 0, failed: 0 };
const failures = [];

async function migrateOne(table, id, column, value) {
  const relativePath = toRelativePath(value);
  const sourceUrl = LEGACY_MEDIA_PREFIX + relativePath;

  if (DRY_RUN) {
    console.log(`[dry-run] ${table}.${column}#${id}: ${relativePath}`);
    stats.migrated++;
    return;
  }

  const res = await fetch(sourceUrl);
  if (!res.ok) {
    throw new Error(`fetch ${sourceUrl} -> ${res.status}`);
  }
  const contentType = res.headers.get("content-type") ?? "application/octet-stream";
  const bytes = Buffer.from(await res.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(relativePath, bytes, { contentType, upsert: true });
  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(relativePath);

  const { error: updateError } = await supabase
    .from(table)
    .update({ [column]: publicUrl })
    .eq("id", id);
  if (updateError) throw updateError;

  console.log(`✓ ${table}.${column}#${id}: ${relativePath} (${bytes.length} bytes)`);
  stats.migrated++;
}

async function main() {
  if (DRY_RUN) console.log("--- DRY RUN: no uploads or DB writes will happen ---\n");

  for (const { table, columns } of TABLES) {
    const { data, error } = await supabase.from(table).select(["id", ...columns].join(","));
    if (error) {
      console.error(`✗ ${table}: failed to read rows —`, error.message);
      continue;
    }

    for (const row of data) {
      for (const column of columns) {
        const value = row[column];
        if (!isLegacyPath(value)) {
          stats.skipped++;
          continue;
        }
        try {
          await migrateOne(table, row.id, column, value);
        } catch (err) {
          stats.failed++;
          failures.push({ table, id: row.id, column, value, error: err.message });
          console.error(`✗ ${table}.${column}#${row.id}:`, err.message);
        }
      }
    }
  }

  console.log("\n--- Summary ---");
  console.log(stats);
  if (failures.length) {
    console.log("\nFailures (re-run this script to retry — it's safe/idempotent):");
    for (const f of failures) console.log(" ", f);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
