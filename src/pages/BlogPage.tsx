import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BLOG_POSTS } from "../data/blogPosts";
import { getAllBlogPosts } from "../services/blogService";

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(BLOG_POSTS);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const cmsPosts = await getAllBlogPosts();
        if (!isMounted || !cmsPosts.length) return;

        setPosts((prev) => {
          const merged = [...cmsPosts, ...prev];
          const seen = new Set<string>();
          return merged.filter((post) => {
            const key = post.slug ?? post.id ?? post.title;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        });
      } catch {
        // Keep local fallback posts if Strapi is unreachable.
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [page, posts]);

  return (
    <div className="relative bg-white min-h-screen selection:bg-purple-100 font-sans flex flex-col">
      <Header variant="dark" />
      <div className="absolute inset-0 flex pointer-events-none opacity-[0.03]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-full flex-1 border-r border-black" />
        ))}
      </div>

      <main className="max-w-7xl mx-auto relative z-10 px-6 w-full">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest bg-white">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            Blog
          </div>
          <h1 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Stories that Inspire Action
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-3xl">
            Explore 10 stories from our community, programs, and impact journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <Link to={`/blog/${post.slug ?? post.id}`}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{post.category}</p>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-black text-purple-600">
                      Read
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 mb-20 flex flex-wrap items-center justify-center gap-3 px-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`w-11 h-11 rounded-full text-sm font-black transition-all ${
                page === num ? "bg-purple-600 text-white shadow-lg shadow-purple-200" : "bg-white border border-gray-200 text-gray-600 hover:border-purple-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

