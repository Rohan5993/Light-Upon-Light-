# Free stack — checklist

## Final links

| What | URL |
| --- | --- |
| Website (GitHub Pages) | https://rohan5993.github.io/Light-Upon-Light-/ |
| Strapi (Render) | https://light-upon-light-strapi.onrender.com |
| Strapi Admin | https://light-upon-light-strapi.onrender.com/admin |

## 1) Supabase (database)

1. https://supabase.com/dashboard → project with Postgres.
2. Use **Session** pooler URI (**port 5432**) as `DATABASE_URL` on Render.

## 2) Render (Strapi)

1. Service from `Rohan5993/Light-Upon-Light-Strapi`.
2. Env: `DATABASE_URL` (Supabase Session URI), `PUBLIC_URL=https://light-upon-light-strapi.onrender.com`
3. Open `/admin` → create admin user.
4. **Public** role permissions:
   - Blog-post: `find`, `findOne`
   - Volunteer-application: `create`
   - Contact-message: `create`
   - Appointment: `create`

## 3) Website (GitHub Pages)

1. Repo secret: `VITE_STRAPI_URL=https://light-upon-light-strapi.onrender.com`
2. Push to `main` → Actions deploys `gh-pages`.

## 4) Verify

```bash
cd "/Users/rohan/Light Upon Light/Light-Upon-Light-"
STRAPI_URL=https://light-upon-light-strapi.onrender.com \
SITE_URL=https://rohan5993.github.io/Light-Upon-Light- \
node scripts/verify-free-stack.mjs
```
