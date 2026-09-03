# Free stack — your click checklist

Do these in order. Repos are already configured.

## 1) Supabase (database) — ~3 min

1. Open https://supabase.com/dashboard → sign in with GitHub.
2. **New project** → name `light-upon-light` → set DB password → Create.
3. **Project Settings → Database → Connection string → URI**.
4. Choose **Session** pooler (**port 5432**).
5. Copy URI and put your real password in place of `[YOUR-PASSWORD]`.
6. Save it somewhere private — this is `DATABASE_URL`.

## 2) Render (Strapi) — ~10 min

1. Open https://dashboard.render.com → sign in with GitHub.
2. **New → Blueprint** → connect `Rohan5993/Light-Upon-Light-Strapi`.
3. Set env vars when asked:
   - `DATABASE_URL` = Supabase Session URI from step 1
   - `PUBLIC_URL` = `https://light-upon-light-strapi.onrender.com` (or the URL Render shows)
4. Wait for deploy → open `/admin` → create admin user.
5. **Settings → Users & Permissions → Roles → Public**:
   - Blog-post: `find`, `findOne`
   - Volunteer-application: `create`
   - Contact-message: `create`
6. Save.

## 3) Vercel (website) — ~5 min

1. Open https://vercel.com → sign in with GitHub.
2. **Add New → Project** → import `Rohan5993/Light-Upon-Light-`.
3. Branch: `version-1.3` (latest work). Framework: Vite. Output: `dist`.
4. Env vars:
   - `VITE_STRAPI_URL` = your Render URL (no trailing slash)
   - Optional: PayPal / EmailJS vars from GitHub Actions secrets
5. Deploy. Copy the `*.vercel.app` URL.

## 4) Verify

```bash
cd "/Users/rohan/Light Upon Light/Light-Upon-Light-"
STRAPI_URL=https://YOUR-SERVICE.onrender.com \
SITE_URL=https://YOUR-SITE.vercel.app \
node scripts/verify-free-stack.mjs
```

Then reply with:
1. Supabase project created? (yes/no)
2. Render Strapi URL
3. Vercel site URL

I will finish permissions checks / CORS / form verification from there.
