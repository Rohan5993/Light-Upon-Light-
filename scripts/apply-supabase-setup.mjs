#!/usr/bin/env node
/**
 * Reads .supabase-setup.env and:
 * - writes VITE_* into .env.local
 * - migrates blog posts (needs service role)
 * - prints remaining Google Auth checklist
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const setupPath = join(root, ".supabase-setup.env");

function parseEnv(text) {
  const out = {};
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

if (!existsSync(setupPath)) {
  console.error("Missing .supabase-setup.env — copy from .supabase-setup.env.example");
  process.exit(1);
}

const env = parseEnv(readFileSync(setupPath, "utf8"));
const url = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
const anon = env.VITE_SUPABASE_ANON_KEY;
const service = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anon || anon.includes("YOUR_") || anon.length < 20) {
  console.error("Fill VITE_SUPABASE_ANON_KEY in .supabase-setup.env first.");
  process.exit(2);
}

const localEnv = `VITE_SUPABASE_URL=${url}\nVITE_SUPABASE_ANON_KEY=${anon}\n`;
writeFileSync(join(root, ".env.local"), localEnv, "utf8");
console.log("Wrote .env.local");

if (service && service.length > 20) {
  console.log("Running blog migration…");
  const result = spawnSync(
    process.execPath,
    [join(root, "scripts/migrate-blog-to-supabase.mjs")],
    {
      cwd: root,
      env: {
        ...process.env,
        SUPABASE_URL: url,
        SUPABASE_SERVICE_ROLE_KEY: service,
      },
      stdio: "inherit",
    },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
} else {
  console.warn("No SUPABASE_SERVICE_ROLE_KEY — skip migration (run schema + migrate later).");
}

console.log(`
Next (Google login):
1. Run supabase/schema.sql in SQL Editor (if not done).
2. Google Cloud Console → OAuth Web client
   Redirect URI: ${url}/auth/v1/callback
3. Supabase → Auth → Providers → Google → paste Client ID + Secret
4. Auth → URL Configuration → Redirect URLs add:
   https://thelightuponlight.org/admin
   http://localhost:3001/admin
`);
