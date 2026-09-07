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

/** Demo posts removed — blog content comes from Supabase (with local JSON fallback). */
export const BLOG_POSTS: BlogPost[] = [];
