import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { resolveMediaUrl } from "../lib/publicUrl";
import { type BlogPost } from "../data/blogPosts";
import { getAllBlogPosts } from "../services/blogService";

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const cmsPosts = await getAllBlogPosts();
        if (!isMounted) return;
        setPosts(cmsPosts);
      } catch {
        if (isMounted) setPosts([]);
      } finally {
        if (isMounted) setLoading(false);
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
    <>
      <Header variant="dark" />
      <div className="relative bg-white min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)] selection:bg-purple-100 font-sans flex flex-col overflow-x-hidden">
      <div className="absolute inset-0 flex pointer-events-none opacity-[0.03]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-full flex-1 border-r border-black" />
        ))}
      </div>

      <main className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 w-full pt-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest bg-white">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            Blog
          </div>
          <h1 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Stories that Inspire Action
          </h1>
          <p className="text-base sm:text-xl text-gray-500 font-medium max-w-3xl leading-snug">
            Explore stories from our community, programs, and impact journey.
          </p>
        </div>

        {loading ? (
          <div className="mb-20 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-16 text-center">
            <p className="text-gray-500 font-medium">Loading stories…</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="mb-20 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-16 text-center">
            <p className="text-gray-500 font-medium leading-snug">
              New stories are on the way. Check back soon.
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {paginatedPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <Link to={`/blog/${post.slug ?? post.id}`}>
                <div className="aspect-[16/10] overflow-hidden bg-slate-50">
                  <img src={resolveMediaUrl(post.image)} alt={post.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  {post.category ? (
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">{post.category}</p>
                  ) : null}
                  <h2 className="!text-xl font-bold text-gray-900 !leading-snug mb-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm !leading-[1.35] mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-black text-purple-600">
                      Read article
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        )}

        {posts.length > 0 && (
        <div className="mt-14 mb-20 flex flex-wrap items-center justify-center gap-3 px-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              aria-label={`Go to blog page ${num}`}
              aria-current={page === num ? "page" : undefined}
              className={`w-11 h-11 rounded-full text-sm font-black transition-all ${
                page === num ? "bg-purple-600 text-white shadow-lg shadow-purple-200" : "bg-white border border-gray-200 text-gray-600 hover:border-purple-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        )}
        {posts.length === 0 && !loading && <div className="mb-10" />}
      </main>

      <Footer />
    </div>
    </>
  );
}

