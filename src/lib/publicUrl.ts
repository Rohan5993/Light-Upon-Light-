import { siteImages } from "../assets/siteImages";

const LOCAL_IMAGE_ALIASES: Record<string, string> = {
  "/donation.png": siteImages.donation,
  "/donation.webp": siteImages.donation,
  "/founder.png": siteImages.founder,
  "/founder.webp": siteImages.founder,
  "/hero-wheelchair-right.png": siteImages.heroWheelchairRight,
  "/hero-wheelchair-right.webp": siteImages.heroWheelchairRight,
  "/hero-wheelchair.png": siteImages.heroWheelchair,
  "/hero-wheelchair.webp": siteImages.heroWheelchair,
  "/wheelchair-meeting.jpg": siteImages.wheelchairMeeting,
  "/wheelchair-meeting.webp": siteImages.wheelchairMeeting,
  "/founders-diary.png": siteImages.foundersDiary,
  "/founders-diary.webp": siteImages.foundersDiary,
};

/** Resolve a file from Vite's public/ folder for the current deploy base. */
export function publicUrl(path: string): string {
  const alias = LOCAL_IMAGE_ALIASES[path];
  if (alias) return alias;

  if (/^https?:\/\//i.test(path)) return path;

  const clean = path.replace(/^\//, "");
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${clean}`;
}

/** Prefer WebP from Unsplash CDN when possible. */
export function preferWebpUrl(url: string): string {
  if (!/^https?:\/\/images\.unsplash\.com\//i.test(url)) return url;
  if (/[?&]fm=webp/i.test(url)) return url;
  return url.includes("?") ? `${url}&fm=webp` : `${url}?fm=webp`;
}

/** Resolve any image URL, including bundled local assets and external links. */
export function resolveMediaUrl(url: string | undefined | null): string {
  if (!url) return "";

  const alias = LOCAL_IMAGE_ALIASES[url];
  if (alias) return alias;

  if (/^https?:\/\//i.test(url)) return preferWebpUrl(url);
  if (url.startsWith("//")) return preferWebpUrl(`https:${url}`);

  return publicUrl(url.startsWith("/") ? url : `/${url}`);
}
