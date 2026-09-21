// Dev-only helper: seeds a Supabase project from the live-data snapshots
// already sitting in .data-cache/ (written by the old fetchWithCache
// wrapper before it was removed) so you can smoke-test the whole site
// against Supabase before doing the real production data migration later.
//
// Usage:
//   node --env-file=.env.local scripts/seed-from-cache.mjs
//
// Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (same vars the app
// uses) in .env.local. Safe to re-run — rows are upserted by id.
//
// NOT the production migration: this only seeds whatever happened to be
// cached in .data-cache/ on this machine, and does not reset the identity
// sequence afterwards (explicit ids are inserted directly). Do the real
// migration from the source Postgres database separately.

import { readFile, readdir } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const CACHE_DIR = path.join(process.cwd(), ".data-cache");
const LEGACY_MEDIA_PREFIX =
  "https://upliftersstorage.blob.core.windows.net/avanceprmedia/";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run with: node --env-file=.env.local scripts/seed-from-cache.mjs"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

// Strip the legacy Azure Blob prefix back to the relative path the DB
// column expects (src/lib/supabase.ts mediaUrl() re-adds it at read time).
function toRelative(url) {
  if (!url) return null;
  return url.startsWith(LEGACY_MEDIA_PREFIX)
    ? url.slice(LEGACY_MEDIA_PREFIX.length)
    : url;
}

async function readJson(file) {
  const raw = await readFile(path.join(CACHE_DIR, file), "utf8");
  return JSON.parse(raw);
}

async function seedSimpleTable(cacheFile, table, mapRow) {
  let rows;
  try {
    rows = await readJson(cacheFile);
  } catch {
    console.warn(`skip ${table}: no .data-cache/${cacheFile}`);
    return;
  }

  const mapped = rows.map(mapRow);
  const { error } = await supabase.from(table).upsert(mapped, { onConflict: "id" });
  if (error) {
    console.error(`✗ ${table}:`, error.message);
  } else {
    console.log(`✓ ${table}: ${mapped.length} rows`);
  }
}

async function seedBlogs() {
  let files;
  try {
    files = (await readdir(CACHE_DIR)).filter(
      (f) => f.startsWith("blog-") && f.endsWith(".json")
    );
  } catch {
    console.warn("skip main_blog: no .data-cache dir");
    return;
  }

  if (files.length === 0) {
    console.warn("skip main_blog: no blog-*.json snapshots found");
    return;
  }

  const rows = [];
  for (const file of files) {
    const blog = await readJson(file);
    rows.push({
      id: blog.id,
      order: blog.order ?? 0,
      author: blog.author,
      title: blog.title,
      body: blog.body ?? null,
      body_md: blog.body_md ?? null,
      image: toRelative(blog.image),
      credits: blog.credits ?? null,
      is_archived: blog.is_archived ?? false,
      created_at: blog.created_at,
      updated_at: blog.updated_at,
    });
  }

  const { error } = await supabase.from("main_blog").upsert(rows, { onConflict: "id" });
  if (error) {
    console.error("✗ main_blog:", error.message);
  } else {
    console.log(`✓ main_blog: ${rows.length} rows`);
  }
}

async function main() {
  await seedSimpleTable("testimonials.json", "main_testimonial", (r) => ({
    id: r.id,
    order: r.order ?? 0,
    name: r.name,
    designation: r.designation,
    content: r.content,
    image: toRelative(r.image),
    is_archived: r.is_archived ?? false,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  await seedSimpleTable("our_client.json", "main_ourclient", (r) => ({
    id: r.id,
    order: r.order ?? 0,
    image: toRelative(r.image),
    name: r.name ?? "Unnamed Client",
    is_archived: r.is_archived ?? false,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  await seedSimpleTable("our_work.json", "main_ourwork", (r) => ({
    id: r.id,
    order: r.order ?? 0,
    content: r.content,
    image: toRelative(r.image),
    banner: toRelative(r.banner),
    description: r.description ?? null,
    is_archived: r.is_archived ?? false,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  await seedSimpleTable("latest_news.json", "main_latestnews", (r) => ({
    id: r.id,
    order: r.order ?? 0,
    content: r.content,
    image: toRelative(r.image),
    link: r.link ?? null,
    is_archived: r.is_archived ?? false,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  await seedSimpleTable("awards.json", "main_awardsrecognition", (r) => ({
    id: r.id,
    order: r.order ?? 0,
    content: r.content,
    image: toRelative(r.image),
    link: r.link ?? null,
    is_archived: r.is_archived ?? false,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  await seedBlogs();

  console.log("\nDone. Note: identity sequences were not reset — fine for");
  console.log("dev seeding, but do a real migration for production data.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
