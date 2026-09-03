# Architecture (free stack)

```
┌──────────────────┐
│      Vercel      │  Vite + React website
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

See the Strapi repo `DEPLOY.md` for full setup steps:
https://github.com/Rohan5993/Light-Upon-Light-Strapi/blob/main/DEPLOY.md

### Website env (Vercel)

| Variable | Purpose |
| --- | --- |
| `VITE_STRAPI_URL` | Render Strapi URL |
| `VITE_PAYPAL_CLIENT_ID` | Donate buttons |
| `VITE_EMAILJS_*` | Donation thank-you emails |

Do not set `VITE_BASE_PATH` on Vercel.
