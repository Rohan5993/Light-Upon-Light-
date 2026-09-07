# How to add or edit blog posts (non-technical)

## Easiest way (after one-time admin setup)

1. Open **https://thelightuponlight.org/admin/**
2. Click **Login with GitHub**
3. Click **Blog Posts → New Blog Post** (or edit an existing one)
4. Fill in:
   - Title
   - Excerpt (short summary)
   - Date label (example: `SEPTEMBER 07, 2026`)
   - Cover image (upload)
   - Body (the full story)
5. Click **Publish** / **Save**

The site updates after GitHub Pages finishes deploying (usually 1–2 minutes).

### Who can log in?

Anyone invited as a **collaborator** on the GitHub repo  
`Rohan5993/Light-Upon-Light-` (Write access).

They do **not** need to know code.

### One-time setup (tech person only)

1. GitHub → **Settings → Developer settings → OAuth Apps** (edit the existing app)
2. Homepage URL: `https://thelightuponlight.org`
3. Authorization callback URL must be exactly:  
   `https://thelightuponlight.org/api/callback`
4. Copy **Client ID** and **Client Secret**
5. In Vercel project env vars, set:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
6. Redeploy the Vercel site
7. Invite editors as repo collaborators (Write access)

## Backup method (no admin login)

1. Open the GitHub repo in a browser
2. Go to folder `content/blog`
3. Click **Add file → Create new file**
4. Name it like `my-new-story-title.json`
5. Paste this template and fill it in:

```json
{
  "title": "Your story title",
  "excerpt": "One or two sentences for the card.",
  "date": "SEPTEMBER 07, 2026",
  "category": "",
  "image": "/blog/your-image.png",
  "isFeatured": false,
  "body": "Paragraph one.\n\nParagraph two.\n\nWith love and light,\n\nRonahi Zebari"
}
```

6. Upload the image into `public/blog/` first (same GitHub website)
7. Commit to `main`

## Forms (contact / volunteer)

Those go by email through FormSubmit to `lightuponlight1408@gmail.com`.  
No CMS needed for forms.
