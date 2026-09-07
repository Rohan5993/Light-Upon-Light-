<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Light Upon Light

Nonprofit site for **Light Upon Light**.

## Live Site

**https://thelightuponlight.org/**

| Page | URL |
| --- | --- |
| Home | https://thelightuponlight.org/ |
| Blog | https://thelightuponlight.org/blog |
| Admin (Google login) | https://thelightuponlight.org/admin |
| Donate | https://thelightuponlight.org/donate |

Blog posts live in **Supabase** (free). Editors sign in with Google at `/admin`.  
See [SETUP-CHECKLIST.md](SETUP-CHECKLIST.md) and [ARCHITECTURE.md](ARCHITECTURE.md).

## Run Locally

1. `npm install`
2. Copy `.env.example` → `.env.local` and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. `npm run dev` (http://localhost:3001)

## Deploy

- **Vercel** hosts `thelightuponlight.org` (set the same `VITE_SUPABASE_*` env vars).
- Push to `main` also deploys the GitHub Pages mirror via Actions.
