import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Facebook, Linkedin, House, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogAudioPlayer from "../components/BlogAudioPlayer";
import HoverFillLink from "../components/HoverFillLink";
import { useBlogNarration } from "../hooks/useBlogNarration";
import { BLOG_POSTS, type BlogPost } from "../data/blogPosts";
import { getAllBlogPosts, getBlogPostBySlug } from "../services/blogService";

function buildLongContent(seed: string, title: string) {
  const blocks = [
    `${seed} At Light Upon Light, we have learned that meaningful progress begins with listening. Every program starts by understanding what people are already doing well, what obstacles they are facing, and what kind of support feels useful in real life. This approach helps us design solutions with communities instead of for communities. Over time, this shared ownership makes the work stronger, more adaptive, and easier to sustain even when resources change.`,
    `In practice, ${title.toLowerCase()} requires small systems that work consistently. Teams coordinate schedules, define responsibilities, document outcomes, and communicate openly about what is and is not working. Volunteers are trained to serve with empathy and clarity, while local leaders are equipped to make decisions quickly. The result is not just a one-day success, but a framework that can be repeated and improved. That repeatability is what turns a good effort into reliable impact.`,
    `We also pay close attention to dignity and trust. People should never feel invisible when they seek support. The way we welcome participants, explain options, and follow up after each activity matters just as much as the activity itself. Trust grows when commitments are kept and when feedback leads to visible changes. In many communities, this trust becomes the foundation for deeper collaboration across schools, families, local organizations, and neighborhood groups.`,
    `Another important lesson is that storytelling and measurement should work together. Stories show the human meaning behind a program, while data shows where progress is accelerating or slowing down. When both are shared clearly, supporters and partners can see how their contributions create real outcomes. This transparency improves decision-making, attracts sustained engagement, and keeps teams focused on what matters most: people experiencing practical, positive change.`,
    `Looking ahead, we believe long-term impact comes from combining compassion with structure. Compassion keeps us grounded in human needs, and structure helps us deliver results with consistency. As we continue to grow, we are committed to building programs that invite participation, strengthen local leadership, and scale responsibly. With each cycle of learning and action, we move closer to communities that are more connected, resilient, and full of opportunity.`,
  ];

  return blocks.join("\n\n");
}

function mergeBlogLists(cmsPosts: BlogPost[], localPosts: BlogPost[]): BlogPost[] {
  const merged = [...cmsPosts, ...localPosts];
  const seen = new Set<string>();
  return merged.filter((p) => {
    const key = p.slug ?? p.id ?? p.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function postMatchesRouteParam(p: BlogPost, routeId: string): boolean {
  const href = p.slug ?? p.id;
  return href === routeId || p.id === routeId || p.slug === routeId;
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mergedPosts, setMergedPosts] = useState<BlogPost[]>(() => [...BLOG_POSTS]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const userScrollingRef = useRef(false);
  const scrollIdleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const cmsPosts = await getAllBlogPosts();
        if (!isMounted || !cmsPosts.length) return;
        setMergedPosts((prev) => mergeBlogLists(cmsPosts, prev));
      } catch {
        // Keep local posts only.
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!id) {
      setPost(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    (async () => {
      try {
        const cmsPost = await getBlogPostBySlug(id);
        if (isMounted && cmsPost) {
          setPost(cmsPost);
          return;
        }
      } catch {
        // Ignore and fallback to local data below.
      }

      const fallback =
        BLOG_POSTS.find((item) => item.id === id || item.slug === id) ?? null;
      if (isMounted) {
        setPost(fallback);
      }
    })().finally(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const content = useMemo(() => {
    if (!post) return "";
    const seed = post.contentSeed?.trim() ?? "";
    if (seed.length > 400 && seed.includes("\n\n")) {
      return seed;
    }
    return buildLongContent(seed || post.excerpt, post.title);
  }, [post]);

  const paragraphs = useMemo(
    () => content.split("\n\n").map((p) => p.trim()).filter(Boolean),
    [content],
  );

  const postId = post?.slug ?? post?.id ?? id ?? "blog";
  const narration = useBlogNarration(paragraphs, postId);

  const activeWordIndex =
    narration.status === "playing" || narration.status === "paused"
      ? narration.activeWordIndex
      : -1;

  useEffect(() => {
    const onScroll = () => {
      userScrollingRef.current = true;
      if (scrollIdleTimerRef.current !== null) {
        window.clearTimeout(scrollIdleTimerRef.current);
      }
      scrollIdleTimerRef.current = window.setTimeout(() => {
        userScrollingRef.current = false;
      }, 1200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollIdleTimerRef.current !== null) {
        window.clearTimeout(scrollIdleTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (narration.status !== "playing" || activeWordIndex < 0 || userScrollingRef.current) return;
    const el = wordRefs.current[activeWordIndex];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const margin = 80;
    const inView = rect.top >= margin && rect.bottom <= window.innerHeight - margin;
    if (!inView) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeWordIndex, narration.status]);

  const wordOffsetForParagraph = (paragraphIndex: number) =>
    paragraphs
      .slice(0, paragraphIndex)
      .reduce((sum, p) => sum + p.split(/\s+/).filter(Boolean).length, 0);

  const handleParagraphClick = (paragraphIndex: number) => {
    const wordIndex = wordOffsetForParagraph(paragraphIndex);
    narration.seekToWord(wordIndex);
    if (narration.status !== "playing") {
      narration.play(wordIndex);
    }
  };

  const moreBlogs = useMemo(() => {
    if (!id) return [];
    return mergedPosts.filter((p) => !postMatchesRouteParam(p, id)).slice(0, 3);
  }, [mergedPosts, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
        <p className="text-gray-500 font-medium">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Post Not Found</h1>
          <p className="text-gray-500 mb-8">This blog post does not exist.</p>
          <HoverFillLink
            to="/blog"
            variant="purple"
            className="gap-2 px-6 py-3 font-bold"
            labelClassName="inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </HoverFillLink>
        </div>
      </div>
    );
  }

  const shareText = `${post.title}\n\n${post.excerpt}\n\n${window.location.href}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;

  return (
    <div className="relative bg-[#f8f5ff] min-h-screen selection:bg-purple-100 font-sans flex flex-col">
      <Header variant="dark" />
      <main className="max-w-7xl mx-auto w-full px-6 pb-24 md:pb-0">
        <div className="mt-8 mb-10">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 font-bold">
            <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              <House size={16} />
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to="/blog" className="text-gray-900 hover:underline transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-500 line-clamp-1">{post.title}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-[1.7fr_0.8fr] gap-8 lg:gap-14">
          <article>
            <img src={post.image} alt={post.title} className="w-full h-48 sm:h-64 md:h-[360px] object-cover rounded-2xl mb-10" />
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-black mb-4">{post.category} • {post.date}</p>
            <h1 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-bold text-gray-900 tracking-tight leading-tight mb-6">{post.title}</h1>

            <p className="text-xs text-gray-400 mb-6">
              Tap any section below to jump there while listening.
            </p>

            <div className="space-y-7 text-base text-gray-600 leading-relaxed">
              {paragraphs.map((paragraph, paragraphIndex) => {
                let wordCursor = wordOffsetForParagraph(paragraphIndex);

                return (
                  <p
                    key={paragraphIndex}
                    id={`blog-paragraph-${paragraphIndex}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleParagraphClick(paragraphIndex)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleParagraphClick(paragraphIndex);
                      }
                    }}
                    className="rounded-lg -mx-2 px-2 py-1 cursor-pointer hover:bg-purple-50/80 transition-colors"
                    aria-label={`Listen from section ${paragraphIndex + 1}`}
                  >
                    {paragraph.split(/(\s+)/).map((token, tokenIndex) => {
                      if (!token.trim()) {
                        return <span key={tokenIndex}>{token}</span>;
                      }

                      const globalWordIndex = wordCursor;
                      wordCursor += 1;

                      return (
                        <span
                          key={tokenIndex}
                          ref={(el) => {
                            wordRefs.current[globalWordIndex] = el;
                          }}
                          className={`transition-colors duration-150 rounded px-0.5 box-decoration-clone ${
                            activeWordIndex === globalWordIndex
                              ? "bg-[#E2D6FF] text-gray-900 font-medium"
                              : ""
                          }`}
                        >
                          {token}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 h-fit space-y-6">
            <div className="bg-[#e2d6ff] rounded-2xl p-8 border border-purple-200">
              <h2 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-widest">Share this Post</h2>
              <p className="text-gray-600 text-sm mb-6">Help others discover this story and amplify the impact.</p>
              <div className="space-y-3">
                <a href={facebookShare} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-gray-900 font-bold border border-gray-100 hover:border-purple-200">
                  <Facebook size={16} />
                  Share on Facebook
                </a>
                <a href={linkedInShare} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-gray-900 font-bold border border-gray-100 hover:border-purple-200">
                  <Linkedin size={16} />
                  Share on LinkedIn
                </a>
              </div>
            </div>

            <BlogAudioPlayer
              title={post.title}
              paragraphCount={paragraphs.length}
              narration={narration}
              variant="sidebar"
            />
          </aside>
        </div>

        {moreBlogs.length > 0 ? (
          <section className="mt-20 pt-16 pb-4 border-t border-purple-200/60" aria-labelledby="more-blogs-heading">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <h2 id="more-blogs-heading" className="text-2xl font-bold text-gray-900 tracking-tight">
                More blogs
              </h2>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-black text-purple-600 hover:text-purple-700 transition-colors shrink-0"
              >
                View more
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {moreBlogs.map((item) => (
                <article
                  key={item.slug ?? item.id}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <Link to={`/blog/${item.slug ?? item.id}`}>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{item.category}</p>
                      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{item.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{item.date}</span>
                        <span className="inline-flex items-center gap-1 text-sm font-black text-purple-600">
                          Read
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer className="mt-20" topPaddingClass="pt-[80px]" />
    </div>
  );
}

