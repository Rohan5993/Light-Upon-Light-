/** Live Strapi on Render (Supabase Postgres). Override with VITE_STRAPI_URL. */
export const PRODUCTION_STRAPI_URL =
  "https://light-upon-light-strapi.onrender.com";

export function getStrapiUrl(): string {
  const fromEnv = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(
    /\/$/,
    "",
  );
  if (fromEnv) return fromEnv;
  return import.meta.env.PROD ? PRODUCTION_STRAPI_URL : "http://localhost:1337";
}
