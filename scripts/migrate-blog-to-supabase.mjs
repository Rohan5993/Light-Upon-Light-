#!/usr/bin/env node
/**
 * Apply schema + migrate content/blog/*.json and public/blog images into Supabase.
 *
 * Requires env:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (Dashboard → Settings → API → service_role)
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/migrate-blog-to-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const url = process.env.SUPABASE_URL?.trim();
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!url || !serviceKey) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function runSchema() {
  console.log(
    "Ensure supabase/schema.sql has been run in the Supabase SQL Editor before migrating.",
  );
}

async function uploadImage(localPath, destName) {
  const bytes = readFileSync(localPath);
  const contentType = destName.endsWith(".png")
    ? "image/png"
    : destName.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";

  const { error } = await supabase.storage.from("blog").upload(destName, bytes, {
    contentType,
    upsert: true,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("blog").getPublicUrl(destName);
  return data.publicUrl;
}

async function migratePosts() {
  const dir = join(root, "content/blog");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  console.log(`Migrating ${files.length} posts…`);

  for (const file of files) {
    const slug = file.replace(/\.json$/i, "");
    const raw = JSON.parse(readFileSync(join(dir, file), "utf8"));
    let imageUrl = raw.image || "";

    if (imageUrl.startsWith("/blog/")) {
      const localName = imageUrl.replace(/^\/blog\//, "");
      const localPath = join(root, "public/blog", localName);
      if (existsSync(localPath)) {
        imageUrl = await uploadImage(localPath, localName);
        console.log(`  uploaded ${localName}`);
      } else {
        // Keep site-relative path as fallback for still-hosted public assets
        imageUrl = `https://thelightuponlight.org${imageUrl}`;
      }
    }

    const row = {
      slug,
      title: raw.title,
      excerpt: raw.excerpt || "",
      date_label: raw.date || "",
      category: raw.category || "",
      body: raw.body || "",
      image_url: imageUrl,
      is_featured: Boolean(raw.isFeatured),
      published: true,
    };

    const { error } = await supabase.from("cms_blog_posts").upsert(row, {
      onConflict: "slug",
    });
    if (error) {
      console.error(`  FAIL ${slug}:`, error.message);
    } else {
      console.log(`  ok ${slug}`);
    }
  }
}

await runSchema();
await migratePosts();
console.log("Done.");
