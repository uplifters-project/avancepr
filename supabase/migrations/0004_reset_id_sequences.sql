-- Data repair, not a schema change — recorded here so the fix survives and
-- is documented, and can be re-run if the database is ever restored from a
-- backup that has the same issue again.
--
-- Every main_* table's identity sequence was stuck at 1 while the tables
-- themselves already held rows with much higher ids (found while building
-- the admin dashboard: creating a new blog failed with
-- "duplicate key value violates unique constraint main_blog_pkey" because
-- Postgres tried to insert id=1, which already existed). Root cause: the
-- pg_dump/pg_restore migration in migrate_supabase.sh (old Supabase project
-- -> this one, see the script's own header) restores rows with their
-- original explicit ids via `--format=custom`, which does not advance the
-- identity sequence to match — pg_restore only fixes this automatically for
-- a plain-SQL dump that includes a `setval()` call, which a custom-format
-- dump used with --schema=public --clean --if-exists does not emit here.
--
-- This resets every sequence to the current max(id), so the next insert
-- gets max(id)+1 instead of colliding. Safe to run again any time (it's
-- idempotent — setval to the same value is a no-op) and safe even if a
-- table is empty (greatest(...,1) avoids setval'ing to NULL/0).
--
-- Run once in the Supabase project: SQL Editor -> paste this file -> Run.

select setval('main_testimonial_id_seq', greatest((select max(id) from main_testimonial), 1));
select setval('main_ourclient_id_seq', greatest((select max(id) from main_ourclient), 1));
select setval('main_ourwork_id_seq', greatest((select max(id) from main_ourwork), 1));
select setval('main_latestnews_id_seq', greatest((select max(id) from main_latestnews), 1));
select setval('main_awardsrecognition_id_seq', greatest((select max(id) from main_awardsrecognition), 1));
select setval('main_blog_id_seq', greatest((select max(id) from main_blog), 1));
select setval('main_enquiry_id_seq', greatest((select max(id) from main_enquiry), 1));
