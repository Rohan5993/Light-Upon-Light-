export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  contentSeed: string;
  isFeatured?: boolean;
}

/** Demo posts removed — blog content comes from Strapi only. */
export const BLOG_POSTS: BlogPost[] = [];
