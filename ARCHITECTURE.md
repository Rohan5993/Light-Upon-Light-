# Architecture (free forever)

```
┌──────────────────────────┐
│  thelightuponlight.org   │  Vercel (primary) + GitHub Pages mirror
│  (Vite + React)          │
└────────────┬─────────────┘
             │
     ┌───────┴────────┐
     ▼                ▼
 Blog posts        Forms
 (Supabase         (FormSubmit → org email)
  Postgres +       free forever
  Storage +
  Google Auth
  for /admin)
```

No Render / Strapi / Decap required for the public site or blog editing.

### Final links

| What | URL |
| --- | --- |
| Website | https://thelightuponlight.org/ |
| Blog | https://thelightuponlight.org/blog |
| Admin (Google login) | https://thelightuponlight.org/admin |
| GitHub Pages mirror | https://rohan5993.github.io/Light-Upon-Light-/ |

### Required env (site)

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |

### Optional

| Variable | Purpose |
| --- | --- |
| `VITE_PAYPAL_CLIENT_ID` | Donate buttons |
| `VITE_EMAILJS_*` | Donation thank-you emails |

Editors are allowlisted in Supabase table `cms_blog_editors`. Schema: `supabase/schema.sql`.
