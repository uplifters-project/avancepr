-- Blog drafts for the Next.js admin panel (src/pages/admin/blogs/*).
--
-- The old Django admin had no draft state — a post was live as soon as it was
-- saved unless `is_archived` was ticked. The admin panel needs to save
-- in-progress posts without publishing them, so blogs get an `is_draft` flag:
--
--   is_draft = true   -> saved, editable in the admin, hidden from the site
--   is_archived = true -> hidden from the site (was published once, now retired)
--
-- Public queries (src/lib/queries.ts getBlogs/getBlogById) exclude both.
-- Existing rows default to false, so nothing currently live is affected.
--
-- Run once in the Supabase project: SQL Editor -> paste this file -> Run.

alter table main_blog
  add column if not exists is_draft boolean not null default false;
