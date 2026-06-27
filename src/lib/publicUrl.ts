/** Resolve a file from Vite's public/ folder for the current deploy base. */
export function publicUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;

  const clean = path.replace(/^\//, "");
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${clean}`;
}
