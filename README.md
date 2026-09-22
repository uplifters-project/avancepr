This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Backend: Supabase

Content (testimonials, blogs, work, clients, news, awards, enquiries) is stored in
Supabase Postgres instead of the old Django/Azure backend. Setup:

1. Create a project at [supabase.com](https://supabase.com) (free tier).
2. Supabase Dashboard → SQL Editor → run `supabase/migrations/0001_initial.sql`.
   This creates the `main_*` tables (matching the old Django schema exactly) and
   a public `media` storage bucket for new image uploads.
3. Dashboard → Project Settings → API: copy the Project URL and the
   `service_role` key into `.env.local` as `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` (see `.env.example`). The service-role key
   bypasses Row Level Security and must stay server-only — never expose it
   with a `NEXT_PUBLIC_` prefix.
4. Content is managed through the **admin dashboard** at `/staff-console` (see below)
   instead of the Table Editor now — the Table Editor still works if you need
   to fix something by hand, but `/staff-console` handles validation, image uploads,
   revalidation, drafts and archiving.
5. (Optional, dev only) Seed from previously cached live data:
   `node --env-file=.env.local scripts/seed-from-cache.mjs`. Do a real
   migration from the old Postgres database separately for production data.

The enquiry form posts to `src/pages/api/enquiry.ts`, which inserts into
`main_enquiry` and sends a Telegram notification via `TG_BOT_TOKEN`/`TG_CHAT_ID`.

## Admin dashboard (`/staff-console`)

Replaces the old Django admin (`advancepr_backend`, decommissioned) for
managing blogs, testimonials, clients, work items, news, awards and viewing
enquiries. Single admin, gated by Supabase Auth + an email allowlist.

**One-time setup:**

1. Supabase Dashboard → SQL Editor → run `supabase/migrations/0003_blog_drafts.sql`
   (adds the `is_draft` column blogs use; `0001`/`0002` must already be applied).
2. Supabase Dashboard → Authentication → Providers → Email → turn **off**
   "Allow new users to sign up". The admin account is created manually in the
   next step, not through a public form.
3. Supabase Dashboard → Authentication → Users → **Add user** → create the
   admin's email + password (skip "send invite email" and set the password
   directly, or use "send invite email" if you'd rather they set their own).
4. Set `ADMIN_EMAILS` in `.env.local` (and in Vercel for production) to that
   same email — comma-separated if there's ever more than one admin. Only
   Supabase Auth users whose email is in this list can reach `/staff-console`, even
   if someone else's Supabase Auth session is somehow valid.
5. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   (Dashboard → Project Settings → API → Project URL / anon public key) must
   also be set — the admin login page and image uploads run in the browser
   and need the public key, separate from the server-only service-role key.

**Using it:** sign in at `/staff-console`. Blogs get a Tiptap rich-text editor
(saves as markdown to `body_md`, the same field the public blog page
already renders); everything else is a plain form with image upload. Every
resource supports **archive** (hides it from the public site immediately,
row stays in the database) and, once archived, **permanent delete**
(irreversible — removes the row from the database entirely). Saving
triggers on-demand ISR revalidation for the affected public page(s)
instead of waiting for the normal 24h refresh; the "Rebuild site" button in
the header refreshes every core page at once.

`/staff-console/*` and `/api/admin/*` are protected by `src/proxy.ts` (redirect) and
by `requireAdmin`/`requireAdminSSP` (`src/lib/admin/auth.ts`) on every page
and API route — the redirect is a UX shortcut, not the only check.

## Deploy on Vercel

1. Import the `uplifters-project/avancepr` repo in [Vercel](https://vercel.com/new) — framework preset Next.js.
2. Add the env vars from `.env.example` (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
   `ADMIN_EMAILS`, `TG_BOT_TOKEN`, `TG_CHAT_ID`, `WHATSAPP_NO`, `EMAIL`) in
   the Vercel project settings.
3. Deploy, verify the preview URL, then point `avancepr.in`/`www` DNS at Vercel.
4. Once cut over, decommission the old Azure App Service, its Postgres database,
   and the Azure Static Web App.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
