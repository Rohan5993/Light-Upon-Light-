import { type BlogPost } from "../data/blogPosts";

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

function toBlogPost(slug: string, data: ContentBlogFile): BlogPost {
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

const STATIC_POSTS: BlogPost[] = Object.entries(modules).map(([path, data]) =>
  toBlogPost(slugFromPath(path), data),
);

/**
 * Free-forever blog source: JSON files in /content/blog.
 * Non-tech editors can change these via /admin (Decap CMS) or GitHub.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return STATIC_POSTS.map((post) => ({ ...post })).sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return a.title.localeCompare(b.title);
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return (
    STATIC_POSTS.find((post) => post.id === slug || post.slug === slug) ?? null
  );
}
