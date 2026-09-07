#!/usr/bin/env node
/**
 * Smoke-test public CMS blog API + live site admin HTML.
 * Uses VITE_SUPABASE_* from env or .supabase-setup.env / .env.local
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const fileEnv = {
  ...loadEnvFile(join(root, ".supabase-setup.env")),
  ...loadEnvFile(join(root, ".env.local")),
};

const url = (process.env.VITE_SUPABASE_URL || fileEnv.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const anon = process.env.VITE_SUPABASE_ANON_KEY || fileEnv.VITE_SUPABASE_ANON_KEY;

if (!url || !anon) {
  console.error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY");
  process.exit(1);
}

const fails = [];

async function check(name, fn) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (err) {
    console.error(`FAIL ${name}:`, err instanceof Error ? err.message : err);
    fails.push(name);
  }
}

await check("supabase cms_blog_posts readable", async () => {
  const res = await fetch(`${url}/rest/v1/cms_blog_posts?select=slug,title&published=eq.true`, {
    headers: { apikey: anon, Authorization: `Bearer ${anon}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const rows = await res.json();
  if (!Array.isArray(rows) || rows.length < 1) throw new Error("expected posts");
});

await check("live /blog HTML", async () => {
  const res = await fetch("https://thelightuponlight.org/blog");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  // Vite SPA shell — post list hydrates client-side from Supabase
  if (!html.includes("id=\"root\"") && !html.includes("Light Upon Light")) {
    throw new Error("unexpected blog HTML shell");
  }
});

await check("live /admin shell", async () => {
  const res = await fetch("https://thelightuponlight.org/admin");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  // SPA shell — React hydrates Login with Google
  if (!html.includes("root") && !html.includes("Light Upon Light")) {
    throw new Error("unexpected admin HTML");
  }
});

await check("supabase google auth enabled", async () => {
  const res = await fetch(`${url}/auth/v1/settings`, {
    headers: { apikey: anon },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const google = data?.external?.google;
  if (!google) throw new Error("google provider missing in auth settings");
});

if (fails.length) {
  console.error(`\n${fails.length} check(s) failed`);
  process.exit(1);
}
console.log("\nAll smoke checks passed.");
