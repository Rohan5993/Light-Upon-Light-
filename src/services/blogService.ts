import { BLOG_POSTS, type BlogPost } from "../data/blogPosts";

type StrapiRecord = Record<string, unknown>;

const STRAPI_URL =
  (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:1337";
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;

function toDateLabel(value: string | undefined): string {
  if (!value) return "DATE TBA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "DATE TBA";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}

function asNonEmptyString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).trim();
  }
  return "";
}

function pickImageUrl(rawImage: unknown): string | undefined {
  if (!rawImage || typeof rawImage !== "object") return undefined;
  const imageObj = rawImage as StrapiRecord;

  const unwrap = (value: unknown): StrapiRecord | undefined => {
    if (!value || typeof value !== "object") return undefined;
    const rec = value as StrapiRecord;
    if (rec.data && typeof rec.data === "object") {
      return rec.data as StrapiRecord;
    }
    return rec;
  };

  const candidate = unwrap(imageObj) ?? imageObj;
  const attrs = (candidate.attributes as StrapiRecord | undefined) ?? candidate;
  const formats = attrs.formats as StrapiRecord | undefined;

  const fromFormat =
    (formats?.large as StrapiRecord | undefined)?.url ??
    (formats?.medium as StrapiRecord | undefined)?.url ??
    (formats?.small as StrapiRecord | undefined)?.url ??
    (formats?.thumbnail as StrapiRecord | undefined)?.url;

  const url = (fromFormat as string | undefined) ?? (attrs.url as string | undefined);
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function pickCategory(raw: StrapiRecord): string {
  const direct = raw.category;
  if (typeof direct === "string" && direct.trim()) return direct.toUpperCase();

  if (direct && typeof direct === "object") {
    const categoryData = (direct as StrapiRecord).data as StrapiRecord | undefined;
    const categoryAttrs =
      ((categoryData?.attributes as StrapiRecord | undefined) ?? categoryData) ||
      (direct as StrapiRecord);
    const name = categoryAttrs?.name as string | undefined;
    if (name?.trim()) return name.toUpperCase();
  }

  return "GENERAL";
}

function mapRecordToBlogPost(record: StrapiRecord): BlogPost {
  const attrs = (record.attributes as StrapiRecord | undefined) ?? record;
  const title =
    (attrs.title as string | undefined)?.trim() ||
    (attrs.Title as string | undefined)?.trim() ||
    "Untitled Post";
  const excerpt =
    (attrs.excerpt as string | undefined)?.trim() ||
    (attrs.Excerpt as string | undefined)?.trim() ||
    (attrs.summary as string | undefined)?.trim() ||
    "Read this story from Light Upon Light.";

  const publishedAt =
    (attrs.publishedAt as string | undefined) ||
    (attrs.Published as string | undefined) ||
    (attrs.date as string | undefined) ||
    (attrs.createdAt as string | undefined);

  const slugFromApi =
    asNonEmptyString(attrs.slug) ||
    asNonEmptyString(attrs.Slug) ||
    asNonEmptyString(attrs.documentId) ||
    asNonEmptyString(record.documentId) ||
    asNonEmptyString(attrs.Id) ||
    asNonEmptyString(attrs.id) ||
    asNonEmptyString(record.id);

  const safeSlug =
    slugFromApi ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const image =
    pickImageUrl(attrs.image) ||
    pickImageUrl(attrs.Image) ||
    pickImageUrl(attrs.coverImage) ||
    pickImageUrl(attrs.thumbnail) ||
    BLOG_POSTS[0]?.image ||
    "";

  const contentFromBlocks = (() => {
    const blocks = attrs.Content;
    if (!Array.isArray(blocks)) return "";
    const lines = blocks
      .map((block) => {
        if (!block || typeof block !== "object") return "";
        const children = (block as StrapiRecord).children;
        if (!Array.isArray(children)) return "";
        return children
          .map((child) => {
            if (!child || typeof child !== "object") return "";
            return ((child as StrapiRecord).text as string | undefined) ?? "";
          })
          .join("")
          .trim();
      })
      .filter(Boolean);
    return lines.join("\n\n");
  })();

  const richText =
    (attrs.content as string | undefined)?.trim() ||
    contentFromBlocks ||
    (attrs.body as string | undefined)?.trim() ||
    (attrs.longContent as string | undefined)?.trim() ||
    "";

  return {
    id: safeSlug,
    slug: safeSlug,
    title,
    excerpt,
    date: toDateLabel(publishedAt),
    category: pickCategory(attrs),
    image,
    contentSeed: richText || excerpt,
    isFeatured: Boolean(attrs.isFeatured),
  };
}

async function fetchStrapi(path: string): Promise<unknown> {
  const headers: HeadersInit = {};
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

  const response = await fetch(`${STRAPI_URL}${path}`, { headers });
  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status}`);
  }
  return response.json();
}

function extractDataArray(payload: unknown): StrapiRecord[] {
  if (!payload || typeof payload !== "object") return [];
  const data = (payload as StrapiRecord).data;
  if (Array.isArray(data)) return data as StrapiRecord[];
  if (data && typeof data === "object") return [data as StrapiRecord];
  return [];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const query =
    "/api/blog-posts?populate=*&sort=publishedAt:desc";
  const payload = await fetchStrapi(query);
  const records = extractDataArray(payload);
  if (!records.length) return [];
  return records.flatMap((rec) => {
    try {
      return [mapRecordToBlogPost(rec)];
    } catch {
      return [];
    }
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const escaped = encodeURIComponent(slug);
  const orParams: string[] = [
    `filters[$or][0][slug][$eq]=${escaped}`,
    `filters[$or][1][Slug][$eq]=${escaped}`,
  ];
  let next = 2;
  if (/^\d+$/.test(slug)) {
    orParams.push(`filters[$or][${next++}][id][$eq]=${escaped}`);
  }
  if (slug.length >= 10 && /^[a-z0-9]+$/i.test(slug)) {
    orParams.push(`filters[$or][${next++}][documentId][$eq]=${escaped}`);
  }
  const filteredQuery = `/api/blog-posts?${orParams.join("&")}&populate=*`;

  try {
    const filteredPayload = await fetchStrapi(filteredQuery);
    const filteredRecords = extractDataArray(filteredPayload);
    if (filteredRecords.length) return mapRecordToBlogPost(filteredRecords[0]);
  } catch {
    // Filter shape may be rejected or token missing; fall back to full list.
  }

  try {
    const allPosts = await getAllBlogPosts();
    return (
      allPosts.find(
        (post) => post.id === slug || post.slug === slug,
      ) ?? null
    );
  } catch {
    return null;
  }
}

