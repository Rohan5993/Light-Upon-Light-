# How to add or edit blog posts (non-technical)

## Easiest way

1. Open **https://thelightuponlight.org/admin**
2. Click **Login with Google**
3. Click **New post** (or **Edit** on an existing one)
4. Fill in title, excerpt, date label, cover image, and body
5. Click **Create post** / **Save changes**

The live site updates immediately (no redeploy needed).

### Who can log in?

Anyone whose **Google email** is listed in the Supabase table `blog_editors`.

Ask a tech person to add a teammate’s email there (Table Editor → `cms_blog_editors` → Insert).

## One-time setup (tech person only)

1. Supabase project → run [`supabase/schema.sql`](supabase/schema.sql) in **SQL Editor**
2. Enable **Google** under Authentication → Providers (Google Cloud OAuth client)
3. Auth → URL Configuration: add redirect `https://thelightuponlight.org/admin`
4. Set on Vercel (and GitHub Actions secrets for Pages):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Seed editors: insert emails into `cms_blog_editors`
6. Optional: `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` →  
   `node scripts/migrate-blog-to-supabase.mjs` to import existing JSON posts

## Backup method (no admin)

Edit rows directly in Supabase → Table Editor → `cms_blog_posts`, or upload images in Storage → `blog`.

## Forms (contact / volunteer)

Those go by email through FormSubmit to `lightuponlight1408@gmail.com`.  
No CMS needed for forms.
