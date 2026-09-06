# Architecture (free stack)

```
┌──────────────────┐
│  GitHub Pages    │  Vite + React website
│  (live site)     │
└────────┬─────────┘
         │ API calls
         ▼
┌──────────────────┐
│      Render      │  Strapi CMS (free)
└────────┬─────────┘
         │ PostgreSQL
         ▼
┌──────────────────┐
│    Supabase      │  Postgres (free)
└──────────────────┘
```

### Final links

| What | URL |
| --- | --- |
| Website | https://rohan5993.github.io/Light-Upon-Light-/ |
| Strapi API / Admin | https://light-upon-light-strapi.onrender.com |
| Strapi Admin UI | https://light-upon-light-strapi.onrender.com/admin |
| Strapi repo | https://github.com/Rohan5993/Light-Upon-Light-Strapi |

See the Strapi repo `DEPLOY.md` for full setup steps:
https://github.com/Rohan5993/Light-Upon-Light-Strapi/blob/main/DEPLOY.md

### Website env (GitHub Pages / Actions)

| Variable | Purpose |
| --- | --- |
| `VITE_STRAPI_URL` | `https://light-upon-light-strapi.onrender.com` |
| `VITE_PAYPAL_CLIENT_ID` | Donate buttons |
| `VITE_EMAILJS_*` | Donation thank-you emails |

Set `VITE_STRAPI_URL` as a repo secret so Pages builds talk to Render (not localhost).
