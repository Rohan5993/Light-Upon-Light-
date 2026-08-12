import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowLeft, ArrowRight, Scale, Accessibility, BookOpen, Equal, Megaphone, Handshake, Globe, Youtube } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { PROGRAMS } from "../data/programs";
import { BLOG_POSTS, type BlogPost } from "../data/blogPosts";
import Header from "../components/Header";
import { siteImages } from "../assets/siteImages";
import { resolveMediaUrl } from "../lib/publicUrl";
import Footer from "../components/Footer";
import HoverFillLink from "../components/HoverFillLink";
import { getAllBlogPosts } from "../services/blogService";
import AnimatedText, { AnimatedWords, FadeIn } from "../components/motion/AnimatedText";
import AnimatedImage from "../components/motion/AnimatedImage";
import ScrollColorWords from "../components/motion/ScrollColorWords";
import { TestimonialCard } from "../components/TestimonialCard";

const PILLARS = [
  {
    step: "01",
    title: "Advocacy",
    desc: "Fighting for their rights, dignity, and equal treatment — always.",
    icon: Scale,
    accent: "from-sky-400 to-sky-300",
    glow: "shadow-sky-100",
  },
  {
    step: "02",
    title: "Accessibility",
    desc: "Breaking barriers so they access the care they deserve.",
    icon: Accessibility,
    accent: "from-violet-500 to-violet-400",
    glow: "shadow-violet-100",
  },
  {
    step: "03",
    title: "Education",
    desc: "Shifting how the world sees, treats, and values them.",
    icon: BookOpen,
    accent: "from-amber-400 to-amber-300",
    glow: "shadow-amber-100",
  },
  {
    step: "04",
    title: "Equality",
    desc: "Same rights. Same dignity. No one left behind.",
    icon: Equal,
    accent: "from-sky-500 to-violet-400",
    glow: "shadow-sky-100",
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
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "David Chen",
    role: "PROGRAM MENTOR",
    quote: "The mentorship program helped me navigate the corporate world with confidence. Now, I'm helping others do the same. This is how the light spreads.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Maria Rodriguez",
    role: "COMMUNITY LEADER",
    quote: "Being part of Light Upon Light has been a transformative experience. I've witnessed firsthand how small acts of kindness create ripples of change.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "James Wilson",
    role: "YOUTH AMBASSADOR",
    quote: "The digital inclusion workshop opened doors I never knew existed. I'm now studying computer science and giving back to my community.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Elena Petrova",
    role: "VOLUNTEER COORDINATOR",
    quote: "Witnessing the growth of our programs and the smiles on people's faces is the most rewarding experience. We are truly shining a light.",
    img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200"
  }
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

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const testimonialsRef = useRef<HTMLDivElement>(null);
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

    (async () => {
      try {
        const cmsPosts = await getAllBlogPosts();
        if (!isMounted || !cmsPosts.length) return;
        setBlogPosts((prev) => {
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
        // Keep local fallback posts when CMS is unavailable.
      }
    })();

    return () => {
      isMounted = false;
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
          <AnimatedImage
            src={siteImages.heroWheelchair}
            alt="Young girl smiling in a wheelchair outdoors"
            className="w-full h-full object-cover object-[72%_center] md:object-right"
            containerClassName="absolute inset-0"
            parallax={false}
            kenBurns
            animateOnMount
          />
          {/* Vertical ribbon overlay - matching the image's distinct strips */}
          <div className="absolute inset-0 flex">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="h-full flex-1 border-r border-white/10"
                style={{
                  backdropFilter: (i >= 11 && i <= 20) ? 'none' : (i % 4 === 0 ? 'blur(8px)' : i % 2 === 0 ? 'blur(2px)' : 'none'),
                  backgroundColor: i % 5 === 0 ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                }}
              />
            ))}
          </div>
          {/* Left-side dark gradient for text readability */}
          <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Hero Content */}
        <main className="relative z-10 px-6 md:px-16 flex-1 flex flex-col justify-center max-w-7xl pt-20 pb-16 md:pt-0 md:pb-0">
          <div className="max-w-4xl">
            <h1 className="text-[2rem] md:text-[3.5rem] font-bold text-white leading-[1.2] md:leading-[1.25] tracking-tight mb-8">
              <AnimatedText
                lines={[
                  "Their Light Is",
                  "Already There.",
                  "Help Us Let It Shine.",
                ]}
                animateOnMount
              />
            </h1>
            <AnimatedWords
              text="Differently-abled individuals carry greatness within them but an unequal world of barriers and silence dims it. Your donation funds advocacy, accessibility, and equality - giving them the rights, dignity, and opportunities they've always deserved."
              animateOnMount
              delay={0.35}
              className="text-base md:text-xl text-white/90 leading-[1.75] md:leading-[1.8] mb-10 md:mb-14 max-w-2xl font-medium"
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
              </motion.div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="mt-5 text-sm md:text-base text-white/80 font-medium max-w-2xl"
            >
              Your generosity = real access, real equality, real change
            </motion.p>
          </div>
        </main>

        {/* Our Pillars — hero bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-20 bottom-5 right-5 md:bottom-8 md:right-8 w-[min(100%-2.5rem,30rem)] sm:w-[32rem]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/90 mb-3 drop-shadow-sm">
            Our Pillars
          </p>
          <div className="grid grid-cols-2 gap-3">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.06 }}
                  className="rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/30 px-4 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.18)] ring-1 ring-white/15 cursor-default origin-center"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white shrink-0">
                      <Icon size={13} strokeWidth={2.4} className="text-white" />
                    </div>
                    <p className="text-base font-bold text-white leading-tight drop-shadow-sm">{pillar.title}</p>
                  </div>
                  <p className="text-sm text-white/85 font-medium leading-snug line-clamp-3">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Impact Blur Decorative Element */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] impact-blur pointer-events-none opacity-50" />
      </div>

      {/* What We Do */}
      <section className="relative px-6 py-20 md:py-28 overflow-hidden bg-[#F7FBFF]">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-slate-200/80" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-[1.75rem] px-7 py-12 md:px-16 lg:px-20 md:py-16 shadow-[0_24px_80px_rgba(15,23,42,0.06)] text-center overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-5"
            >
              Our Work
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-bold text-slate-900 tracking-[-0.03em] leading-[1.05] mb-10 md:mb-12"
            >
              What We Do?
            </motion.h2>

            <ScrollColorWords
              text="Our work includes inclusive education, mentorship, accessible baking and workforce development, accessibility evaluations, mobility aid distribution, and an in-person, at-your-door donation service. Through classroom programs, peer mentorship, and hands-on life skills training, we help differently-abled individuals build confidence, independence, and real opportunities to thrive. We also work with schools, businesses, and public spaces to remove barriers and create environments where everyone can belong. From restoring mobility and freedom through refurbished aids, to bringing supporters face-to-face with the people behind our mission, every program is rooted in lived experience — because lasting change starts with dignity, access, and connection."
              className="max-w-4xl mx-auto text-lg md:text-[1.35rem] font-medium leading-[1.85] tracking-[-0.01em]"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.35 }}
              className="mt-12 md:mt-14 pt-10 border-t border-slate-100"
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
                          <span
                            className={`px-3 md:px-4 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 cursor-default hover:text-[#7107E7] ${
                              isActive ? "text-[#7107E7]" : "text-slate-500"
                            }`}
                          >
                            {label}
                          </span>
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
          </motion.div>
        </div>
      </section>

      {/* Program Cards */}
      <section id="programs" className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <FadeIn>
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4">
                Programs
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-[-0.03em]">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/programs/${program.id}`}
                  className="group block h-full rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_50px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={resolveMediaUrl(program.img)}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 inline-flex px-2.5 py-1 rounded-full bg-white/95 text-[9px] font-bold uppercase tracking-widest text-slate-600 border border-white shadow-sm">
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
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Light in Action */}
      <section className="relative px-6 py-20 md:py-28 overflow-hidden bg-[#FBFAFF]">
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
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-[-0.03em] leading-tight">
              Your Light in Action
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-medium leading-relaxed">
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
            <p className="text-xl md:text-2xl font-bold text-slate-900 leading-snug tracking-tight max-w-xl">
              Together, we&apos;re building a future where every person has the opportunity to shine.
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 shrink-0 px-8 py-4 rounded-full bg-[#7107E7] text-white font-bold text-sm hover:bg-[#5f06c4] transition-colors shadow-[0_10px_28px_rgba(113,7,231,0.28)]"
            >
              Donate & Shine a Light
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Voices from Our Community Section */}
      <section id="stories" className="px-6 py-20 md:py-28 relative overflow-hidden">
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
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-all shadow-sm bg-white/50"
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

      {/* Our Language */}
      <section className="relative px-6 py-20 md:py-28 overflow-hidden bg-[#F7F7F8]">
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
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-[-0.03em] leading-[1.12]">
                Words Matter.
                <br />
                <span className="text-[#7107E7]">Choice Matters More.</span>
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="text-base md:text-lg text-slate-600 font-medium leading-[1.85] tracking-[-0.01em]">
                Whether someone uses &ldquo;disabled,&rdquo; &ldquo;person with a disability,&rdquo; &ldquo;differently-abled,&rdquo; or another term, the language they choose is shaped by their lived experience and what they believe best represents them. We respect and support each person&apos;s choice of language.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3">
                {["disabled", "person with a disability", "differently-abled"].map((term, index, arr) => (
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
      <section className="relative px-6 py-20 md:py-28 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="rounded-[1.75rem] overflow-hidden aspect-[16/10] md:aspect-[21/9] ring-1 ring-slate-200/60">
              <img
                src={siteImages.wheelchairMeeting}
                alt="Light Upon Light community gathering"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2 lg:right-10 md:max-w-xl mt-6 md:mt-0">
              <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 p-7 md:p-10 min-h-[280px] md:min-h-[320px] flex flex-col justify-center shadow-[0_16px_50px_rgba(15,23,42,0.08)]">
                <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4">
                  Our Vision
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-[-0.03em] leading-[1.2] mb-5">
                  We envision a future where Light Upon Light no longer needs to exist.
                </h2>
                <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed mb-6">
                  A future where differently-abled people are seen, heard, and supported — with accessible communities and public spaces, the same opportunities to contribute and belong, and a society that sees them for who they are, not just their disability or diagnosis.
                </p>
                <p className="text-sm md:text-base font-semibold text-slate-900 leading-snug pl-4 border-l-2 border-[#7107E7]">
                  Because every life deserves dignity, opportunity, and belonging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Diary */}
      <section id="our-mission" className="px-6 py-20 md:py-28 relative overflow-hidden bg-[#F7FBFF]">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <FadeIn className="lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7107E7] mb-5">
              Founder&apos;s Diary
            </p>

            <h2 className="text-3xl md:text-[2.35rem] font-bold text-slate-900 tracking-[-0.03em] leading-[1.2] mb-6 max-w-md">
              Hear the story behind the movement in her own words.
            </h2>

            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-md">
              Watch our Founder &amp; CEO share the journey from one denied cup of tea to building an organization that fights for dignity, access, and equality every single day.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0">
                <img
                  src={siteImages.founder}
                  alt="Founder & CEO of Light Upon Light"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Founder &amp; CEO</p>
                <p className="text-sm text-slate-500">Light Upon Light</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/80 aspect-video bg-slate-900">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ls7bEYWfP9w"
                title="I Was Denied a Cup of Tea Because of My Disability — The Founder's Diary"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <a
              href="https://www.youtube.com/@TheFoundersDiary24"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors"
            >
              <Youtube size={18} className="text-red-600" />
              Visit YouTube Channel
              <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Blog Section - Layout from Screenshot */}
      <section id="blog" className="bg-white pt-20 pb-8 md:pt-28 md:pb-10 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 mb-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gray-100 text-[9px] font-bold text-gray-400 mb-6 uppercase tracking-widest bg-gray-50/50">
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                Blog
              </div>
              <h2 className="font-bold text-slate-900 tracking-tight leading-tight">
                Stories that Inspires Action
              </h2>
            </div>
            <div className="pt-6">
              <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
                Insights, updates, and stories from our events and communities.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-8">
            {/* Featured Post (Left) */}
            <div ref={blogFeaturedRef} className="bg-[#FBFAFF] rounded-2xl p-5 md:p-6">
              {[featuredBlogPost].filter(Boolean).map(post => (
                <div key={post!.id} className="group">
                  <motion.div
                    style={{ opacity: blogBlock1Opacity, y: blogBlock1Y }}
                    className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-6 border border-gray-100"
                  >
                    <img
                      src={resolveMediaUrl(post!.image)}
                      alt={post!.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>

                  <motion.div style={{ opacity: blogBlock2Opacity, y: blogBlock2Y }}>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-4">
                      {post!.category}
                    </span>
                    <h3 className="text-[1.5rem] font-bold text-slate-900 mb-6 tracking-tight leading-snug group-hover:text-purple-600 transition-colors">
                      {post!.title}
                    </h3>
                  </motion.div>

                  <motion.div style={{ opacity: blogBlock3Opacity, y: blogBlock3Y }}>
                    <p className="text-gray-400 font-medium leading-relaxed mb-3 text-[1rem]">
                      {post!.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/70">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                        {post!.date}
                      </span>
                      <Link to={`/blog/${post!.id}`} className="flex items-center gap-3 text-purple-600 font-black text-sm hover:gap-4 transition-all">
                        Read More <ArrowRight size={20} />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Sidebar Posts (Right) */}
            <div
              ref={blogSidebarRef}
              className="space-y-4 bg-[#FBFAFF] rounded-2xl p-5 md:p-6 overflow-hidden"
            >
              {homepageSidebarPosts.map((post, i) => {
                const motionStyle = blogSidebarMotion[i] ?? blogSidebarMotion[blogSidebarMotion.length - 1];
                return (
                  <Link key={post.id} to={`/blog/${post.slug ?? post.id}`} className="block mb-5 last:mb-0">
                    <motion.div
                      style={{ x: motionStyle.x, opacity: motionStyle.opacity }}
                      className="relative overflow-hidden flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white border border-gray-100 hover:border-purple-100 transition-all group cursor-pointer will-change-transform"
                    >
                      <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={resolveMediaUrl(post.image)} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                          {post.category}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-gray-400 text-xs font-medium mb-4 line-clamp-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">
                            {post.date}
                          </span>
                          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-slate-900 group-hover:text-purple-600">
                            Read More <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Branding Banner / CTA */}
      <section className="relative px-6 pt-4 pb-12 md:pt-6 md:pb-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2rem] border border-slate-200/80 bg-[#FBFAFF] px-8 py-12 md:px-14 md:py-16">
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

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 md:min-w-[220px]">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#7107E7] text-white font-bold text-sm hover:bg-[#5f06c4] transition-colors"
                >
                  Donate Now
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/programs"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-slate-300 bg-white text-slate-700 font-bold text-sm hover:border-[#7107E7] hover:text-[#7107E7] transition-colors"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer topPaddingClass="pt-24 md:pt-28" />
    </>
  );
}

