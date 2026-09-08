function alreadyResolvedAssetUrl(url: string, base: string): boolean {
  if (url.startsWith("data:") || url.startsWith("blob:")) return true;
  if (url.startsWith(base)) return true;
  if (url.startsWith("/assets/")) return true;
  return false;
}

/** Resolve a file from Vite's public/ folder for the current deploy base. */
export function publicUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.BASE_URL || "/";
  if (alreadyResolvedAssetUrl(path, base)) return path;

  const clean = path.replace(/^\//, "");
  return `${base}${clean}`;
}

/** Prefer WebP from Unsplash CDN when possible. */
export function preferWebpUrl(url: string): string {
  if (!/^https?:\/\/(?:images|plus)\.unsplash\.com\//i.test(url)) return url;
  if (/[?&]fm=webp/i.test(url)) return url;
  return url.includes("?") ? `${url}&fm=webp` : `${url}?fm=webp`;
}

/** Resolve any image URL, including bundled local assets and external links. */
export function resolveMediaUrl(url: string | undefined | null): string {
  if (!url) return "";

  if (/^https?:\/\//i.test(url)) return preferWebpUrl(url);
  if (url.startsWith("//")) return preferWebpUrl(`https:${url}`);

  const base = import.meta.env.BASE_URL || "/";
  if (alreadyResolvedAssetUrl(url, base)) return url;

  return publicUrl(url.startsWith("/") ? url : `/${url}`);
}
