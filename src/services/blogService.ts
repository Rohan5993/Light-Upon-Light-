import { type BlogPost } from "../data/blogPosts";
import {
  getSupabase,
  isSupabaseConfigured,
  type BlogPostRow,
} from "../lib/supabase";

type ContentBlogFile = {
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  image: string;
  isFeatured?: boolean;
  body: string;
};

const modules = import.meta.glob("../../content/blog/*.json", {
  eager: true,
  import: "default",
}) as Record<string, ContentBlogFile>;

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? "post";
  return file.replace(/\.json$/i, "");
}

function staticFileToBlogPost(slug: string, data: ContentBlogFile): BlogPost {
  return {
    id: slug,
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    category: data.category ?? "",
    image: data.image,
    contentSeed: data.body,
    isFeatured: Boolean(data.isFeatured),
  };
}

const STATIC_FALLBACK_POSTS: BlogPost[] = Object.entries(modules).map(
  ([path, data]) => staticFileToBlogPost(slugFromPath(path), data),
);

function rowToBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date_label,
    category: row.category ?? "",
    image: row.image_url,
    contentSeed: row.body,
    isFeatured: Boolean(row.is_featured),
  };
}

function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Live blog source: Supabase `blog_posts` (published rows).
 * Falls back to local content/blog JSON if Supabase is unset or empty.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) {
    return sortPosts(STATIC_FALLBACK_POSTS.map((post) => ({ ...post })));
  }

  try {
    const { data, error } = await getSupabase()
      .from("cms_blog_posts")
      .select("*")
      .eq("published", true)
      .order("is_featured", { ascending: false })
      .order("title", { ascending: true });

    if (error) throw error;

    const posts = (data as BlogPostRow[] | null)?.map(rowToBlogPost) ?? [];
    if (posts.length === 0) {
      return sortPosts(STATIC_FALLBACK_POSTS.map((post) => ({ ...post })));
    }
    return sortPosts(posts);
  } catch (err) {
    console.error("Failed to load blog posts from Supabase:", err);
    return sortPosts(STATIC_FALLBACK_POSTS.map((post) => ({ ...post })));
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await getSupabase()
        .from("cms_blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      if (data) return rowToBlogPost(data as BlogPostRow);
    } catch (err) {
      console.error("Failed to load blog post from Supabase:", err);
    }
  }

  return (
    STATIC_FALLBACK_POSTS.find((post) => post.id === slug || post.slug === slug) ??
    null
  );
}

export async function listAllPostsForAdmin(): Promise<BlogPostRow[]> {
  const { data, error } = await getSupabase()
    .from("cms_blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data as BlogPostRow[]) ?? [];
}

export async function getPostByIdForAdmin(
  id: string,
): Promise<BlogPostRow | null> {
  const { data, error } = await getSupabase()
    .from("cms_blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return (data as BlogPostRow | null) ?? null;
}

export type BlogPostInput = {
  slug: string;
  title: string;
  excerpt: string;
  date_label: string;
  category: string;
  body: string;
  image_url: string;
  is_featured: boolean;
  published: boolean;
};

export async function createBlogPost(input: BlogPostInput): Promise<BlogPostRow> {
  const { data, error } = await getSupabase()
    .from("cms_blog_posts")
    .insert(input)
    .select("*")
    .single();

  if (error) throw error;
  return data as BlogPostRow;
}

export async function updateBlogPost(
  id: string,
  input: Partial<BlogPostInput>,
): Promise<BlogPostRow> {
  const { data, error } = await getSupabase()
    .from("cms_blog_posts")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as BlogPostRow;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await getSupabase().from("cms_blog_posts").delete().eq("id", id);
  if (error) throw error;
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function uploadBlogImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await getSupabase().storage.from("blog").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;

  const { data } = getSupabase().storage.from("blog").getPublicUrl(path);
  return data.publicUrl;
}

export async function isCurrentUserBlogEditor(): Promise<boolean> {
  const supabase = getSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email?.trim().toLowerCase();
  if (!email) return false;

  const { data, error } = await supabase
    .from("cms_blog_editors")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Editor check failed:", error.message);
    return false;
  }
  return Boolean(data);
}
