import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowLeft, ArrowRight, Scale, Accessibility, BookOpen, Megaphone, Handshake, Globe, Youtube } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { PROGRAMS } from "../data/programs";
import { type BlogPost } from "../data/blogPosts";
import Header from "../components/Header";
import logoLul from "../assets/images/logo-lul.webp";
import ronahi from "../assets/images/Ronahi.webp";
import programMeetOurLight from "../assets/images/program-meet-our-light.webp";
import { resolveMediaUrl } from "../lib/publicUrl";
import Footer from "../components/Footer";
import HoverFillLink from "../components/HoverFillLink";
import AnimatedText, { FadeIn } from "../components/motion/AnimatedText";
import ScrollColorWords from "../components/motion/ScrollColorWords";
import { TestimonialCard } from "../components/TestimonialCard";

const HERO_MOBILE = "/hero-mobile.webp";
const HERO_DESKTOP = "/hero-desktop.webp";

function avatarDataUri(initials: string, color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" fill="${color}"/><text x="64" y="72" text-anchor="middle" font-family="system-ui,sans-serif" font-size="44" font-weight="700" fill="#fff">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const PILLARS = [
  {
    step: "01",
    title: "Advocacy",
    headline: "Every voice deserves to be heard.",
    desc: "We stand beside differently-abled individuals and families, ensuring they are seen, respected, and represented. We challenge barriers, confront ableism, and work to create lasting change that protects dignity and expands opportunity.",
    icon: Megaphone,
    border: "#7107E7",
  },
  {
    step: "02",
    title: "Accessibility",
    headline: "Opportunity begins with access.",
    desc: "True inclusion begins when every school, business, park, public space, and community is designed so everyone can participate. We work to make these spaces more accessible by removing physical, social, and attitudinal barriers, creating environments where differently-abled individuals can belong, contribute, and thrive.",
    icon: Accessibility,
    border: "#38BDF8",
  },
  {
    step: "03",
    title: "Education",
    headline: "Understanding changes everything.",
    desc: "Inclusion begins long before adulthood, it begins in classrooms, conversations, and communities. Through education, we replace fear with understanding, misconceptions with knowledge, and judgment with compassion.",
    icon: BookOpen,
    border: "#FACC15",
  },
  {
    step: "04",
    title: "Equality",
    headline: "Every person deserves the same dignity, respect, and opportunity.",
    desc: "Every voice matters. Every future matters. Every life matters. We believe differently-abled individuals deserve the same opportunities to pursue their dreams, contribute to their communities, and live fulfilling lives as everyone else.",
    icon: Scale,
    border: "#7107E7",
  },
];
const IMPACT_ACTIONS = [
  {
    text: "Advance accessibility in schools, businesses, and public spaces.",
    icon: Accessibility,
  },
  {
    text: "Educate communities and challenge misconceptions.",
    icon: BookOpen,
  },
  {
    text: "Advocate for dignity, respect, and equal opportunity.",
    icon: Megaphone,
  },
  {
    text: "Build partnerships that strengthen communities and expand opportunity.",
    icon: Handshake,
  },
  {
    text: "Create opportunities for differently-abled individuals to thrive.",
    icon: Globe,
  },
];


const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "CREATIVE SCHOLAR",
    quote: "Light Upon Light gave me the tools to pursue my passion for photography. I didn't just find a program; I found a family that sees my potential, not my limitations.",
    img: avatarDataUri("SJ", "#7107E7"),
  },
  {
    name: "David Chen",
    role: "PROGRAM MENTOR",
    quote: "The mentorship program helped me navigate the corporate world with confidence. Now, I'm helping others do the same. This is how the light spreads.",
    img: avatarDataUri("DC", "#38BDF8"),
  },
  {
    name: "Maria Rodriguez",
    role: "COMMUNITY LEADER",
    quote: "Being part of Light Upon Light has been a transformative experience. I've witnessed firsthand how small acts of kindness create ripples of change.",
    img: avatarDataUri("MR", "#0F766E"),
  },
  {
    name: "James Wilson",
    role: "YOUTH AMBASSADOR",
    quote: "The digital inclusion workshop opened doors I never knew existed. I'm now studying computer science and giving back to my community.",
    img: avatarDataUri("JW", "#7C3AED"),
  },
  {
    name: "Elena Petrova",
    role: "VOLUNTEER COORDINATOR",
    quote: "Witnessing the growth of our programs and the smiles on people's faces is the most rewarding experience. We are truly shining a light.",
    img: avatarDataUri("EP", "#CA8A04"),
  },
];

const WORK_LABELS = [
  "Inclusive Education",
  "Mentorship",
  "Accessible Baking",
  "Workforce Development",
  "Accessibility Evaluations",
  "Mobility Aid Distribution",
  "At-Your-Door Donations",
] as const;

const getVisibleProgramCount = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

function HomepageBlogGrid({
  featured,
  sidebar,
}: {
  featured: BlogPost;
  sidebar: BlogPost[];
}) {
  const blogFeaturedRef = useRef<HTMLDivElement>(null);
  const blogSidebarRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: blogFeaturedProgress } = useScroll({
    target: blogFeaturedRef,
    offset: ["start 0.92", "center 0.4"],
  });

  const blogBlock1Opacity = useTransform(blogFeaturedProgress, [0, 0.3], [0, 1]);
  const blogBlock1Y = useTransform(blogFeaturedProgress, [0, 0.3], [56, 0]);
  const blogBlock2Opacity = useTransform(blogFeaturedProgress, [0.22, 0.55], [0, 1]);
  const blogBlock2Y = useTransform(blogFeaturedProgress, [0.22, 0.55], [44, 0]);
  const blogBlock3Opacity = useTransform(blogFeaturedProgress, [0.48, 0.8], [0, 1]);
  const blogBlock3Y = useTransform(blogFeaturedProgress, [0.48, 0.8], [36, 0]);

  const { scrollYProgress: blogSidebarProgress } = useScroll({
    target: blogSidebarRef,
    offset: ["start 0.9", "end 0.55"],
  });

  const blogSidebar1X = useTransform(blogSidebarProgress, [0, 0.32], [140, 0]);
  const blogSidebar1Opacity = useTransform(blogSidebarProgress, [0, 0.28], [0, 1]);
  const blogSidebar2X = useTransform(blogSidebarProgress, [0.28, 0.58], [140, 0]);
  const blogSidebar2Opacity = useTransform(blogSidebarProgress, [0.28, 0.54], [0, 1]);
  const blogSidebar3X = useTransform(blogSidebarProgress, [0.54, 0.84], [140, 0]);
  const blogSidebar3Opacity = useTransform(blogSidebarProgress, [0.54, 0.8], [0, 1]);

  const blogSidebarMotion = [
    { x: blogSidebar1X, opacity: blogSidebar1Opacity },
    { x: blogSidebar2X, opacity: blogSidebar2Opacity },
    { x: blogSidebar3X, opacity: blogSidebar3Opacity },
  ];

  return (
    <>
      <div ref={blogFeaturedRef} className="bg-[#FBFAFF] rounded-2xl p-5 md:p-6">
        <div className="group">
          <motion.div
            style={{ opacity: blogBlock1Opacity, y: blogBlock1Y }}
            className="relative aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-6 border border-gray-100 bg-slate-50"
          >
            <img
              src={resolveMediaUrl(featured.image)}
              alt={featured.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          <motion.div style={{ opacity: blogBlock2Opacity, y: blogBlock2Y }}>
            {featured.category ? (
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-4">
                {featured.category}
              </span>
            ) : null}
            <h3 className="text-[1.5rem] font-bold text-slate-900 mb-6 tracking-tight leading-snug group-hover:text-purple-600 transition-colors">
              {featured.title}
            </h3>
          </motion.div>

          <motion.div style={{ opacity: blogBlock3Opacity, y: blogBlock3Y }}>
            <p className="text-slate-600 font-medium leading-relaxed mb-3 text-[1rem]">
              {featured.excerpt}
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-gray-200/70">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                {featured.date}
              </span>
              <Link to={`/blog/${featured.slug ?? featured.id}`} className="flex items-center gap-3 text-purple-600 font-black text-sm hover:gap-4 transition-all" aria-label={`Read article: ${featured.title}`}>
                Read article <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        ref={blogSidebarRef}
        className="space-y-4 bg-[#FBFAFF] rounded-2xl p-5 md:p-6 overflow-hidden"
      >
        {sidebar.map((post, i) => {
          const motionStyle = blogSidebarMotion[i] ?? blogSidebarMotion[blogSidebarMotion.length - 1];
          return (
            <Link key={post.id} to={`/blog/${post.slug ?? post.id}`} className="block mb-5 last:mb-0">
              <motion.div
                style={{ x: motionStyle.x, opacity: motionStyle.opacity }}
                className="relative overflow-hidden flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white border border-gray-100 hover:border-purple-100 transition-all group cursor-pointer will-change-transform"
              >
                <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50">
                  <img src={resolveMediaUrl(post.image)} alt={post.title} className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-700" />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  {post.category ? (
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2">
                      {post.category}
                    </span>
                  ) : null}
                  <h4 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-slate-600 text-xs font-medium mb-4 line-clamp-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                      {post.date}
                    </span>
                    <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-slate-900 group-hover:text-purple-600">
                      Read article <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [activeProgramIndex, setActiveProgramIndex] = useState(0);
  const [visibleProgramCount, setVisibleProgramCount] = useState(3);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  const scrollToTestimonial = useCallback((index: number) => {
    if (testimonialsRef.current) {
      const container = testimonialsRef.current;
      const card = container.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(container).gap || "0") || 24;
      const step = card.offsetWidth + gap;
      container.scrollTo({
        left: index * step,
        behavior: "smooth",
      });
    }
  }, []);

  const maxTestimonialIndex = Math.max(0, TESTIMONIALS.length - 2);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev >= maxTestimonialIndex ? 0 : prev + 1));
  }, [maxTestimonialIndex]);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev <= 0 ? maxTestimonialIndex : prev - 1));
  }, [maxTestimonialIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkIndex((prev) => (prev + 1) % WORK_LABELS.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const maxProgramIndex = Math.max(0, PROGRAMS.length - visibleProgramCount);

  const scrollToProgram = useCallback((index: number) => {
    if (programsRef.current) {
      const container = programsRef.current;
      const card = container.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(container).gap || "0") || 24;
      const step = card.offsetWidth + gap;
      container.scrollTo({
        left: index * step,
        behavior: "smooth",
      });
    }
  }, []);

  const nextProgram = useCallback(() => {
    setActiveProgramIndex((prev) => (prev >= maxProgramIndex ? 0 : prev + 1));
  }, [maxProgramIndex]);

  const prevProgram = useCallback(() => {
    setActiveProgramIndex((prev) => (prev <= 0 ? maxProgramIndex : prev - 1));
  }, [maxProgramIndex]);

  useEffect(() => {
    const updateVisibleCount = () => setVisibleProgramCount(getVisibleProgramCount());
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    setActiveProgramIndex((prev) => Math.min(prev, maxProgramIndex));
  }, [maxProgramIndex]);

  useEffect(() => {
    scrollToProgram(activeProgramIndex);
  }, [activeProgramIndex, visibleProgramCount, scrollToProgram]);

  useEffect(() => {
    const interval = setInterval(nextProgram, 4500);
    return () => clearInterval(interval);
  }, [nextProgram]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev >= maxTestimonialIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxTestimonialIndex]);

  useEffect(() => {
    scrollToTestimonial(activeTestimonial);
  }, [activeTestimonial, scrollToTestimonial]);

  useEffect(() => {
    let isMounted = true;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const loadPosts = () => {
      void (async () => {
        setBlogsLoading(true);
        try {
          const { getAllBlogPosts } = await import("../services/blogService");
          const cmsPosts = await getAllBlogPosts();
          if (!isMounted) return;
          setBlogPosts(cmsPosts);
        } catch {
          if (isMounted) setBlogPosts([]);
        } finally {
          if (isMounted) setBlogsLoading(false);
        }
      })();
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadPosts, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(loadPosts, 1200);
    }

    return () => {
      isMounted = false;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  const featuredBlogPost = blogPosts.find((post) => post.isFeatured) ?? blogPosts[0];
  const homepageSidebarPosts = blogPosts.filter((post) => post.id !== featuredBlogPost?.id).slice(0, 3);

  return (
    <>
      <div className="relative min-h-screen min-h-[100dvh] overflow-hidden selection:bg-purple-100 font-sans flex flex-col">
        <Header variant="light" />
        {/* Background Hero Image with Vertical Ribbon Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <picture>
            <source media="(min-width: 768px)" srcSet={HERO_DESKTOP} type="image/webp" />
            <img
              src={HERO_MOBILE}
              alt="Young girl smiling in a wheelchair by a fountain"
              width={768}
              height={484}
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover object-[center_40%]"
            />
          </picture>
          {/* Static ribbon strips — avoid backdrop-filter (main-thread / compositor cost) */}
          <div className="absolute inset-0 flex pointer-events-none" aria-hidden>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-full flex-1 border-r border-white/5"
                style={{
                  backgroundColor:
                    i % 3 === 0
                      ? "rgba(255, 255, 255, 0.05)"
                      : i % 2 === 0
                        ? "rgba(0, 0, 0, 0.04)"
                        : "transparent",
                }}
              />
            ))}
          </div>
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[60%] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.08) 80%, transparent 100%)",
            }}
          />
        </div>

        {/* Hero Content */}
        <main className="relative z-10 px-4 sm:px-6 md:px-16 flex-1 flex flex-col justify-center max-w-7xl pt-6 sm:pt-8 pb-12 md:pt-0 md:pb-0">
          <div className="max-w-4xl">
            <h1 className="text-[1.75rem] sm:text-[2rem] md:text-[3.5rem] font-bold text-white leading-[1.2] md:leading-[1.25] tracking-tight mb-6 sm:mb-8">
              <span className="block">Their Light Is Already There.</span>
              <span className="block">Help Us Let It Shine</span>
            </h1>
            <p className="text-base md:text-xl text-white/90 leading-[1.75] md:leading-[1.8] mb-10 md:mb-14 max-w-2xl font-medium">
              We exist to help differently-abled people through advocacy, accessibility, and equality while changing society&apos;s perceptions through education.
            </p>

            <div>
              <Link
                to="/donate"
                className="group inline-flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-5 bg-white pl-4 sm:pl-10 pr-2 sm:pr-3 py-2 sm:py-3 rounded-full text-slate-900 font-bold shadow-2xl hover:shadow-white/20 transition-all max-w-full"
              >
                <span className="text-sm sm:text-lg">Donate & Shine a Light</span>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-purple-600 flex items-center justify-center text-white group-hover:bg-purple-700 transition-colors shrink-0">
                  <ArrowUpRight size={20} strokeWidth={2.5} className="sm:hidden" />
                  <ArrowUpRight size={24} strokeWidth={2.5} className="hidden sm:block" />
                </div>
              </Link>
            </div>
            <p className="mt-5 text-sm md:text-base text-white/80 font-medium max-w-2xl">
              Your generosity creates real access, greater opportunity, and lasting change.
            </p>
          </div>
        </main>
      </div>

      {/* Our Pillars */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-28 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4">
              Our Pillars
            </p>
            <h2 className="text-xl sm:text-[2rem] font-bold text-slate-900 tracking-[-0.03em] mb-12 md:mb-16">
              How we let their light shine.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:auto-rows-fr">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              const wide = index === 0 || index === 3;
              return (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.24) }}
                  className={`h-full rounded-2xl bg-white p-6 md:p-7 flex flex-col ${
                    wide ? "md:col-span-7" : "md:col-span-5"
                  }`}
                  style={{
                    border: `0.5px solid ${pillar.border}73`,
                    boxShadow: `0 0 18px ${pillar.border}33`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-5"
                    style={{
                      color: pillar.border,
                      border: `0.5px solid ${pillar.border}73`,
                    }}
                  >
                    <Icon size={20} strokeWidth={2.1} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7107E7] mb-2">
                    {pillar.step}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-sm font-semibold text-slate-800 leading-snug mb-3">
                    {pillar.headline}
                  </p>
                  <p className="text-sm md:text-[15px] text-slate-500 font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-28 overflow-hidden bg-[#F7FBFF]">
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-5">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-[-0.03em] leading-[1.1] mb-10 md:mb-12 max-w-2xl">
            What We Do?
          </h2>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <ScrollColorWords
                text={`At Light Upon Light, we create opportunities for differently-abled people while helping build a more accessible and understanding society. Our work includes inclusive education, mentorship, accessible baking and workforce development, accessibility evaluations, mobility aid distribution, and an at-your-door donation service that makes giving easier and more accessible.

Through each of these efforts, we work to remove barriers, create meaningful opportunities, and strengthen connection within our communities. We bring differently-abled and able-bodied people together through education and shared experiences. Every program reflects our commitment to advocacy, accessibility, education, and equality.`}
                className="text-base md:text-lg font-medium leading-[1.85] tracking-[-0.01em]"
              />
            </div>

            <FadeIn className="lg:col-span-6" delay={0.08}>
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] ring-1 ring-slate-200/70">
                <img
                  src={programMeetOurLight}
                  alt="Light Upon Light team visiting a community member at their door"
                  width={960}
                  height={600}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-12 md:mt-14 pt-8 border-t border-slate-100"
          >
            <div className="flex flex-col items-center gap-5 md:gap-6">
              {[
                WORK_LABELS.slice(0, 4),
                WORK_LABELS.slice(4),
              ].map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex flex-wrap items-center justify-center gap-y-3"
                >
                  {row.map((label, index) => {
                    const itemIndex = rowIndex === 0 ? index : 4 + index;
                    const isActive = activeWorkIndex === itemIndex;
                    return (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.45 + itemIndex * 0.04 }}
                        className="flex items-center"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveWorkIndex(itemIndex)}
                          className={`px-3 md:px-4 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 hover:text-[#7107E7] ${
                            isActive ? "text-[#7107E7]" : "text-slate-500"
                          }`}
                        >
                          {label}
                        </button>
                        {index < row.length - 1 && (
                          <span
                            className="hidden sm:block w-1 h-1 rounded-full bg-[#7107E7]/45 mx-1 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Cards */}
      <section id="programs" className="bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <FadeIn>
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4">
                Programs
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-[-0.03em]">
                Our Radiant Programs
              </h2>
              <p className="mt-4 text-slate-500 font-medium leading-relaxed max-w-xl">
                Hands-on initiatives that turn lived experience into real access, dignity, and opportunity.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <HoverFillLink
                to="/programs"
                variant="purple"
                className="gap-2 px-7 py-3.5 font-bold text-xs uppercase tracking-widest shrink-0"
                labelClassName="inline-flex items-center gap-2"
              >
                View All
                <ArrowUpRight size={16} />
              </HoverFillLink>
            </FadeIn>
          </div>

          <div className="w-full overflow-hidden">
            <div
              ref={programsRef}
              className="flex gap-6 items-stretch overflow-x-hidden scroll-smooth"
            >
              {PROGRAMS.map((program) => (
                <div
                  key={program.id}
                  className="w-full min-w-full max-w-full sm:w-[calc((100%-1.5rem)/2)] sm:min-w-[calc((100%-1.5rem)/2)] sm:max-w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] lg:min-w-[calc((100%-3rem)/3)] lg:max-w-[calc((100%-3rem)/3)] shrink-0 flex"
                >
                  <Link
                    to={`/programs/${program.id}`}
                    className="group block h-full w-full rounded-2xl border border-slate-200/80 overflow-hidden hover:-translate-y-1 transition-all duration-400"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={resolveMediaUrl(program.img)}
                        alt={program.title}
                        width={960}
                        height={720}
                        decoding="async"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-4 left-4 inline-flex px-2.5 py-1 rounded-full bg-white/95 text-[9px] font-bold uppercase tracking-widest text-slate-600 border border-white">
                        {program.tag}
                      </span>
                    </div>
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#7107E7] transition-colors leading-snug mb-2">
                        {program.title}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 mb-5">
                        {program.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#7107E7] group-hover:gap-3 transition-all">
                        Learn about this program <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-5 mt-8">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevProgram}
                  className="w-11 h-11 rounded-full bg-[#F5F0E8] text-slate-600 flex items-center justify-center hover:bg-[#8023FF] hover:text-white transition-colors"
                  aria-label="Previous programs"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextProgram}
                  className="w-11 h-11 rounded-full bg-[#8023FF] text-white flex items-center justify-center hover:bg-[#6d1de0] transition-colors"
                  aria-label="Next programs"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: maxProgramIndex + 1 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveProgramIndex(i)}
                    aria-label={`Show programs starting at ${i + 1}`}
                    className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-full"
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeProgramIndex ? "w-6 bg-violet-600" : "w-2 bg-violet-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Light in Action */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-28 overflow-hidden bg-[#FBFAFF]">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#7107E7]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7107E7]">
                Impact
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-[-0.03em] leading-tight">
              Your Light in Action
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
              Every act of generosity creates lasting change.
            </p>
          </motion.div>

          <p className="relative text-sm font-bold text-slate-800 mb-6 tracking-tight">
            Every donation helps us:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {IMPACT_ACTIONS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.text}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.28) }}
                  className="group relative rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#7107E7]" />
                  <div className="p-6 pl-7 flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-violet-50 text-[#7107E7] border border-violet-100 group-hover:bg-violet-100 transition-colors duration-300">
                      <Icon size={22} strokeWidth={2.1} />
                    </div>
                    <p className="text-slate-600 text-[0.95rem] font-medium leading-relaxed pt-2">
                      {item.text}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative rounded-2xl border border-slate-200/80 bg-white px-7 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
          >
            <p className="text-base sm:text-xl md:text-2xl font-bold text-slate-900 leading-snug tracking-tight max-w-xl">
              Together, we&apos;re building a future where every person has the opportunity to shine.
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 px-8 py-4 rounded-full bg-[#7107E7] text-white font-bold text-sm hover:bg-[#5f06c4] transition-colors shadow-[0_10px_28px_rgba(113,7,231,0.28)]"
            >
              Donate & Shine a Light
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Voices from Our Community Section — hidden for now */}
      {false && (
      <section id="stories" className="px-4 sm:px-6 py-16 sm:py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-12 flex flex-col items-center text-center">
            <FadeIn className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 text-[10px] font-bold text-violet-700 mb-6 uppercase tracking-widest bg-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                Testimonials
              </div>
              <AnimatedText
                lines={["Voices from Our Community"]}
                className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight"
              />
            </FadeIn>

            <div className="md:absolute right-0 bottom-0 flex gap-3 mt-8 md:mt-0">
              <button
                type="button"
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-slate-600 hover:bg-white hover:text-gray-900 transition-all shadow-sm bg-white/50"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <div
              ref={testimonialsRef}
              className="flex gap-6 items-stretch overflow-x-hidden scroll-smooth"
            >
              {TESTIMONIALS.map((item) => (
                <div
                  key={item.name}
                  data-testimonial-card
                  className="w-[85%] min-w-[85%] sm:w-[calc((100%-1.5rem)/2.25)] sm:min-w-[calc((100%-1.5rem)/2.25)] max-w-[85%] sm:max-w-[calc((100%-1.5rem)/2.25)] shrink-0 flex"
                >
                  <TestimonialCard
                    quote={item.quote}
                    name={item.name}
                    role={item.role}
                    img={resolveMediaUrl(item.img)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxTestimonialIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Show testimonials ${i + 1} and ${i + 2}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? "w-6 bg-violet-600" : "w-2 bg-violet-200 hover:bg-violet-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Our Language */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-28 overflow-hidden bg-[#F7F7F8]">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
          >
            <div className="lg:col-span-5">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-5">
                Our Language
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-[-0.03em] leading-[1.12]">
                Words Matter.
                <br />
                <span className="text-[#7107E7]">Choice Matters More.</span>
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="text-base md:text-lg text-slate-600 font-medium leading-[1.85] tracking-[-0.01em]">
                Whether someone uses &ldquo;disabled,&rdquo; &ldquo;handicap,&rdquo; &ldquo;person with a disability,&rdquo; &ldquo;differently-abled,&rdquo; or another term, the language they choose is shaped by their lived experience and what they believe best represents them. We respect and support each person&apos;s choice of language.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3">
                {["disabled", "person with a disability", "differently-abled", "handicap"].map((term, index, arr) => (
                  <motion.div
                    key={term}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-sm md:text-[15px] font-semibold text-slate-500 tracking-tight">
                      {term}
                    </span>
                    {index < arr.length - 1 && (
                      <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" aria-hidden="true" />
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.25 }}
                className="mt-8 pl-5 border-l-2 border-[#7107E7] text-base md:text-lg font-semibold text-slate-900 leading-snug"
              >
                At Light Upon Light, we use &ldquo;differently-abled.&rdquo;
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Vision */}
      <section
        aria-label="Our Vision"
        className="relative min-h-[20rem] sm:min-h-[24rem] md:min-h-[48vh] flex items-center overflow-hidden bg-[#c8daf2]"
      >
        <img
          src={logoLul}
          alt=""
          aria-hidden
          width={1200}
          height={800}
          decoding="async"
          loading="lazy"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center pointer-events-none select-none"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
          <div className="max-w-xl md:max-w-lg lg:max-w-xl">
            <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 p-5 sm:p-7 md:p-10 flex flex-col justify-center shadow-[0_16px_50px_rgba(15,23,42,0.08)]">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4">
                Our Vision
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-[-0.03em] leading-[1.2] mb-5">
                We envision a future where Light Upon Light no longer exists because our mission has been achieved.
              </h2>
              <ScrollColorWords
                text="A future where differently-abled people are seen, heard, and supported; with accessible and welcoming communities and public spaces; the same opportunities to contribute, thrive, and belong as everyone else; and a society that sees them for who they are, not just their disability or diagnosis."
                className="text-sm md:text-base font-medium leading-relaxed mb-6"
              />
              <ScrollColorWords
                text="Because every life deserves dignity, opportunity, and belonging."
                color="#7107E7"
                className="text-sm md:text-base font-semibold leading-snug pl-4 border-l-2 border-[#7107E7]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Diary */}
      <section id="our-mission" className="px-4 sm:px-6 py-12 md:py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 0% 0%, rgba(113, 7, 231, 0.06) 0%, transparent 55%),
              radial-gradient(ellipse at 100% 20%, rgba(56, 189, 248, 0.07) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%, rgba(250, 204, 21, 0.08) 0%, transparent 55%),
              linear-gradient(135deg, #FBFAFF 0%, #F7FBFF 52%, #FFFDF5 100%)
            `,
          }}
        />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <FadeIn className="lg:col-span-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7107E7] mb-4">
              Founder&apos;s Diary
            </p>

            <h2 className="text-xl md:text-[1.5rem] font-bold text-slate-900 tracking-[-0.03em] leading-[1.3] mb-10">
              Hear the story behind the movement in her own words.
            </h2>

            <ScrollColorWords
              text={`Our Founder and CEO isn't just passionate about this cause. She has lived it. As a differently-abled woman herself, she knows the pain, the overlooked moments, and what it feels like to be denied basic dignity.

It started when she was denied something as simple as a cup of tea. That one small, deeply unfair moment sparked everything. And she made sure it would never happen to anyone else.

From her wheelchair she rises, leading Light Upon Light with a fire that cannot be dimmed, fighting every single day so that no differently-abled individual ever feels unseen, unheard, or unworthy again.`}
              highlights={["sparked everything"]}
              className="text-[15px] md:text-base font-medium leading-[1.75] tracking-[-0.01em] mb-8"
            />

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0">
                <img
                  src={ronahi}
                  alt="Founder & CEO of Light Upon Light"
                  width={88}
                  height={88}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-semibold text-[#7107E7] text-sm">Founder &amp; CEO</p>
                <p className="text-sm text-slate-400">Light Upon Light</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 aspect-[16/10] bg-slate-900">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ls7bEYWfP9w?autoplay=1&mute=1&playsinline=1&rel=0"
                title="I Was Denied a Cup of Tea Because of My Disability — The Founder's Diary"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <a
              href="https://www.youtube.com/@TheFoundersDiary24"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#7107E7] hover:text-[#5a06b8] transition-colors"
            >
              <Youtube size={18} className="text-red-600" />
              Visit YouTube Channel
              <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Blog Section - Layout from Screenshot */}
      <section id="blog" className="bg-white pt-16 sm:pt-20 pb-8 md:pt-28 md:pb-10 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 mb-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gray-100 text-[9px] font-bold text-slate-600 mb-6 uppercase tracking-widest bg-gray-50/50">
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                Blog
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Stories that Inspires Action
              </h2>
            </div>
            <div className="pt-6">
              <p className="text-slate-600 font-medium leading-relaxed max-w-sm">
                Insights, updates, and stories from our events and communities.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-8">
            {blogsLoading ? (
              <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-[#FBFAFF] px-6 py-16 text-center">
                <p className="text-slate-600 font-medium">
                  Loading stories… this can take a moment if the server is waking up.
                </p>
              </div>
            ) : blogPosts.length === 0 || !featuredBlogPost ? (
              <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-[#FBFAFF] px-6 py-16 text-center">
                <p className="text-slate-600 font-medium">
                  New stories are on the way. Check back soon.
                </p>
              </div>
            ) : (
              <HomepageBlogGrid
                featured={featuredBlogPost}
                sidebar={homepageSidebarPosts}
              />
            )}
          </div>
        </div>
      </section>

      {/* Branding Banner / CTA */}
      <section className="relative px-4 sm:px-6 pt-4 pb-12 md:pt-6 md:pb-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-[2rem] border border-slate-200/80 px-8 py-12 md:px-14 md:py-16"
            style={{
              backgroundImage: "linear-gradient(135deg, #F3E8FF 0%, #E0F2FE 100%)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-[#7107E7]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7107E7]">
                    Light Upon Light
                  </p>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 tracking-[-0.03em] leading-[1.2]">
                  Together, we can build a future where every person has the chance to shine.
                </h2>

                <p className="mt-5 text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                  Your support fuels dignity, access, and opportunity for differently-abled communities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto md:min-w-[220px]">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-full bg-[#7107E7] text-white font-bold text-sm hover:bg-[#5f06c4] transition-colors"
                >
                  Donate Now
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/volunteer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-full border border-slate-300 bg-white text-slate-700 font-bold text-sm hover:border-[#7107E7] hover:text-[#7107E7] transition-colors"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer topPaddingClass="pt-8 md:pt-10" />
    </>
  );
}

