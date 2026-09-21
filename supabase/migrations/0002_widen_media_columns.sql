-- The image/banner columns were created as varchar(100), sized for the old
-- Django ImageField's relative paths (e.g. "blog_photo/x.png"). The new
-- Supabase Storage public URLs are much longer
-- (https://<project-ref>.supabase.co/storage/v1/object/public/media/...)
-- and some source filenames are themselves long, so several rows exceed 100
-- characters once migrated. Widen to text (unbounded, same type already used
-- for content/description/body columns) to match.
--
-- Run once in the Supabase project: SQL Editor -> paste this file -> Run.

alter table main_testimonial alter column image type text;
alter table main_ourclient alter column image type text;
alter table main_ourwork alter column image type text;
alter table main_ourwork alter column banner type text;
alter table main_latestnews alter column image type text;
alter table main_blog alter column image type text;
alter table main_awardsrecognition alter column image type text;
