# Architecture (free forever)

```
┌──────────────────────────┐
│  thelightuponlight.org   │  GitHub Pages (free)
│  (static Vite + React)   │
└────────────┬─────────────┘
             │
     ┌───────┴────────┐
     ▼                ▼
 Blog posts        Forms
 (in repo JSON     (FormSubmit → org email)
  + /public/blog)  free forever
```

No Render / Strapi hosting required for the public site.

### Final links

| What | URL |
| --- | --- |
| Website | https://thelightuponlight.org/ |
| GitHub Pages mirror | https://rohan5993.github.io/Light-Upon-Light-/ |
| Blog | https://thelightuponlight.org/blog |

### Optional (not required)

| Variable | Purpose |
| --- | --- |
| `VITE_PAYPAL_CLIENT_ID` | Donate buttons |
| `VITE_EMAILJS_*` | Donation thank-you emails |

Blog content lives in `content/blog/*.json` (edit via **https://thelightuponlight.org/admin/**).
Images live in `public/blog/`.
See `SETUP-CHECKLIST.md` for the non-technical editor guide.
