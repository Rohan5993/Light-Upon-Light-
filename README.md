<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/87fd0d22-f9a4-487f-99c0-d1a8d8389af7

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Create `.env.local` and set:
   - `VITE_STRAPI_URL=http://localhost:1337`
   - `VITE_STRAPI_TOKEN=your_strapi_read_token` (optional if your Strapi API is public)
3. Run the app:
   `npm run dev`

## Deploy to Netlify

This frontend is ready to deploy on Netlify with `netlify.toml`.

1. Push this project to GitHub.
2. In Netlify, create a new site from your GitHub repo.
3. Use these settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify site settings:
   - `VITE_STRAPI_URL=https://your-strapi-domain`
   - `VITE_STRAPI_TOKEN=your_strapi_read_token` (if required)
5. Deploy.

If you use client-side routing (like `/blog/:id`), Netlify SPA redirects are already configured in `netlify.toml`.
