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

---

## Brand SEO — required manual steps (do these once)

Site technical SEO (meta, schema, sitemap, prerender, robots) is already implemented on **https://thelightuponlight.org/**. These steps still require your logins:

### A) Google Search Console (indexation)

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property → **Domain** → `thelightuponlight.org`
3. Verify with the DNS TXT record Google shows (at your domain registrar)
4. Sitemaps → submit: `https://thelightuponlight.org/sitemap.xml`
5. URL Inspection → request indexing for:
   - `https://thelightuponlight.org/`
   - `/about`
   - `/about/ronahi-zebari`
   - `/press`
   - `/programs`
   - `/donate`
   - `/blog`
6. Also add the property in [Bing Webmaster Tools](https://www.bing.com/webmasters) (import from GSC or submit the same sitemap)

After each production deploy you can run: `npm run seo:ping` (IndexNow).

### B) Domain consolidation (critical)

External profiles still teach Google that the homepage is **luul.org**. Fix in this order:

1. **LinkedIn Company Page** (`light-upon-light-org`) → Edit → Website = `https://thelightuponlight.org/`
2. **Idealist** org profile → website + public email → `https://thelightuponlight.org/` and `Info@thelightuponlight.org`
3. **Wix site `luul.org` / `www.luul.org`** → set **301 redirects** of all URLs to `https://thelightuponlight.org/` (at minimum homepage → homepage). Do not keep two active official sites.
4. Update Instagram, Facebook, YouTube, TikTok bios, email signatures, PayPal/org docs to `.org` only

### C) Citations / directories

Claim or update with identical NAP + EIN `99-2690459` + website `.org`:

- GuideStar / Candid
- Google Business Profile (if public visiting address)
- VolunteerMatch / Catchafire (optional)
- Ask podcast hosts and school/partner pages to link `https://thelightuponlight.org/`

### NAP to use everywhere

- Name: Light Upon Light  
- Address: 16305 NE 87th St, Redmond, WA 98052  
- Phone: 206-766-0884  
- Email: Info@thelightuponlight.org  
- EIN: 99-2690459  
- Website: https://thelightuponlight.org/
