import { siteImages } from "../assets/siteImages";

const LOCAL_IMAGE_ALIASES: Record<string, string> = {
  "/donation.png": siteImages.donation,
  "/founder.png": siteImages.founder,
  "/hero-wheelchair-right.png": siteImages.heroWheelchairRight,
  "/hero-wheelchair.png": siteImages.heroWheelchair,
  "/wheelchair-meeting.jpg": siteImages.wheelchairMeeting,
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

/** Resolve any image URL, including bundled local assets and external links. */
export function resolveMediaUrl(url: string | undefined | null): string {
  if (!url) return "";

  const alias = LOCAL_IMAGE_ALIASES[url];
  if (alias) return alias;

  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;

  return publicUrl(url.startsWith("/") ? url : `/${url}`);
}
