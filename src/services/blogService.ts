import { type BlogPost } from "../data/blogPosts";
import staticBlogPosts from "../data/staticBlogPosts.json";

/**
 * Free-forever blog source: posts are baked into the site (GitHub Pages).
 * No Render/Strapi required for the public blog to work.
 */
const STATIC_POSTS = staticBlogPosts as BlogPost[];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return STATIC_POSTS.map((post) => ({ ...post }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return (
    STATIC_POSTS.find((post) => post.id === slug || post.slug === slug) ?? null
  );
}
