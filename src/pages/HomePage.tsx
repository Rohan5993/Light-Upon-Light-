import { motion } from "motion/react";
import { ArrowUpRight, Heart, Star, ArrowLeft, ArrowRight, Scale, Accessibility, BookOpen, Equal, Megaphone, Handshake, Globe } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { PROGRAMS } from "../data/programs";
import { BLOG_POSTS, type BlogPost } from "../data/blogPosts";
import Header from "../components/Header";
import { siteImages } from "../assets/siteImages";
import { resolveMediaUrl } from "../lib/publicUrl";
import Footer from "../components/Footer";
import HoverFillButton from "../components/HoverFillButton";
import HoverFillLink from "../components/HoverFillLink";
import { getAllBlogPosts } from "../services/blogService";


const PILLARS = [
  {
    step: "01",
    title: "Advocacy",
    tagline: "Every voice deserves to be heard.",
    desc: "We stand beside differently-abled individuals and families, ensuring they are seen, respected, and represented. We challenge barriers, confront ableism, and work to create lasting change that protects dignity and expands opportunity.",
    icon: Scale,
    accent: "sky" as const,
  },
  {
    step: "02",
    title: "Accessibility",
    tagline: "Opportunity begins with access.",
    desc: "True inclusion begins when every school, business, park, public space, and community is designed so everyone can participate. We work to make these spaces more accessible by removing physical, social, and attitudinal barriers, creating environments where differently-abled individuals can belong, contribute, and thrive.",
    icon: Accessibility,
    accent: "violet" as const,
  },
  {
    step: "03",
    title: "Education",
    tagline: "Understanding changes everything.",
    desc: "Inclusion begins long before adulthood, it begins in classrooms, conversations, and communities. Through education, we replace fear with understanding, misconceptions with knowledge, and judgment with compassion.",
    icon: BookOpen,
    accent: "amber" as const,
  },
  {
    step: "04",
    title: "Equality",
    tagline: "Every person deserves the same dignity, respect, and opportunity.",
    desc: "Every voice matters. Every future matters. Every life matters. We believe differently-abled individuals deserve the same opportunities to pursue their dreams, contribute to their communities, and live fulfilling lives as everyone else.",
    icon: Equal,
    accent: "sky" as const,
  },
];

const pillarAccent = {
  sky: { icon: "bg-sky-100 text-sky-600", border: "border-sky-100" },
  violet: { icon: "bg-violet-100 text-violet-600", border: "border-violet-100" },
  amber: { icon: "bg-amber-100 text-amber-700", border: "border-amber-100" },
};

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

function SectionBadge({
  label,
  dotClass = "bg-violet-400",
}: {
  label: string;
  dotClass?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white">
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
}

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

export default function HomePage() {
  const [activeProgram, setActiveProgram] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const programsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const scrollToProgram = useCallback((index: number) => {
    if (programsRef.current) {
      const isMobile = window.innerWidth < 768;
      const containerWidth = programsRef.current.offsetWidth;
      const cardWidth = isMobile ? containerWidth : containerWidth / 3;

      programsRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollToTestimonial = useCallback((index: number) => {
    if (testimonialsRef.current) {
      const containerWidth = testimonialsRef.current.offsetWidth;
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? containerWidth : containerWidth / 2;
      const scrollPos = index * cardWidth;

      testimonialsRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProgram((prev) => (prev + 1) % PROGRAMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToProgram(activeProgram);
  }, [activeProgram, scrollToProgram]);

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
        <div className="absolute inset-0 z-0">
          <img
            src={siteImages.heroWheelchair}
            alt="Radiant Hope"
            className="w-full h-full object-cover object-[10%_center]"
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
          <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />

          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Hero Content */}
        <main className="relative z-10 px-6 md:px-16 flex-1 flex flex-col justify-center max-w-7xl pt-20 pb-16 md:pt-0 md:pb-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-[2rem] md:text-[3.5rem] font-bold text-white leading-[1.2] md:leading-[1.25] tracking-tight mb-8">
              Their Light Is<br />
              Already There.<br />
              Help Us Let It Shine
            </h1>
            <p className="text-base md:text-xl text-white/90 leading-[1.75] md:leading-[1.8] mb-10 md:mb-14 max-w-2xl font-medium">
              We exist to help differently-abled people through advocacy, accessibility, equality, and education while changing society&apos;s perception.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
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
            <p className="mt-5 text-sm md:text-base text-white/80 font-medium max-w-2xl">
              Your generosity creates real access, greater opportunity, and lasting change.
            </p>
          </motion.div>
        </main>

        {/* Impact Blur Decorative Element */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] impact-blur pointer-events-none opacity-50" />
      </div>


      {/* Our Vision + Pillars */}
      <section className="bg-[#FAFCFF] py-14 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-10 items-stretch">
            <div className="rounded-[2rem] bg-white border border-slate-100 p-6 md:p-8 shadow-[0_4px_32px_rgba(148,163,184,0.08)] flex flex-col justify-center">
              <SectionBadge label="Our Vision" dotClass="bg-sky-400" />
              <div className="mt-6 space-y-4">
                <p className="text-lg font-bold text-slate-800 leading-relaxed">
                  We envision a future where Light Upon Light no longer exists because our mission has been achieved.
                </p>
                <p className="text-base text-slate-500 font-medium leading-relaxed">
                  A future where differently-abled people are seen, heard, and supported; with accessible and welcoming communities and public spaces; the same opportunities to contribute, thrive, and belong as everyone else; and a society that sees them for who they are, not just their disability or diagnosis.
                </p>
                <p className="text-base font-bold text-slate-800 leading-relaxed pt-2 border-t border-slate-100">
                  Because every life deserves dignity, opportunity, and belonging.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] p-[3px] bg-gradient-to-br from-sky-200 via-violet-200 to-amber-200 shadow-[0_12px_48px_rgba(139,92,246,0.1)]">
              <div className="rounded-[1.85rem] overflow-hidden h-full min-h-[280px] lg:min-h-0">
                <img
                  src={siteImages.wheelchairMeeting}
                  alt="Community Action"
                  className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px]"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 pt-14 border-t border-slate-200/80">
            <SectionBadge label="Pillars" dotClass="bg-amber-400" />
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              The Four Rays of Light
            </h2>
            <p className="text-slate-500 font-medium max-w-3xl mt-3 mb-10 leading-relaxed">
              Just as four rays of light shine brighter together, these four guiding principles fuel everything we do. They shape every program we create, strengthen every partnership we build, and guide every decision we make as we carry out our mission.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PILLARS.map((pillar) => {
                const accent = pillarAccent[pillar.accent];
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.title}
                    className={`rounded-2xl bg-white border ${accent.border} p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accent.icon}`}>
                        <Icon size={20} strokeWidth={2.25} />
                      </div>
                      <span className="text-[11px] font-black tracking-[0.2em] text-slate-300">
                        {pillar.step}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1">{pillar.title}</h4>
                    <p className="text-slate-800 font-semibold text-sm leading-relaxed mb-3">
                      {pillar.tagline}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="our-mission" className="px-6 py-14 md:py-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-br from-violet-50 via-sky-50 to-amber-50 border border-violet-100 p-6 md:p-10 lg:p-12">
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
            <div className="relative mx-auto lg:mx-0 w-full max-w-xs">
              <div className="rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white aspect-[4/5]">
                <img
                  src={siteImages.founder}
                  alt="Founder and CEO of Light Upon Light"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white px-5 py-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <Heart className="w-5 h-5 fill-violet-600" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Founded in</p>
                  <p className="text-lg font-black text-slate-800">2024</p>
                </div>
              </div>
            </div>

            <div>
              <SectionBadge label="Founder" dotClass="bg-violet-500" />
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight leading-tight">
                Led by Someone Who Truly Understands.
              </h2>
              <div className="space-y-5">
                <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                  Our Founder and CEO isn&apos;t just passionate about this cause. She has lived it. As a differently-abled woman herself, she knows the pain, the overlooked moments, and what it feels like to be denied basic dignity.
                </p>
                <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                  It started when she was denied something as simple as a cup of tea. That one small, deeply unfair moment sparked everything. And she made sure it would never happen to anyone else.
                </p>
                <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                  From her wheelchair she rises, leading Light Upon Light with a fire that cannot be dimmed, fighting every single day so that no differently-abled individual ever feels unseen, unheard, or unworthy again.
                </p>
                <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed pt-2 border-t border-violet-100">
                  Because everyone deserves a cup of tea.
                </p>
              </div>
              <Link
                to="/about#youtube"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-white border border-violet-200 text-slate-800 font-bold text-sm hover:bg-violet-50 hover:border-violet-300 transition-colors group"
              >
                Watch Her Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="bg-white py-14 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <SectionBadge label="Programs" dotClass="bg-sky-400" />
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                Our Radiant Programs
              </h2>
              <p className="mt-3 text-slate-500 font-medium max-w-2xl leading-relaxed">
                Every program at Light Upon Light was developed from lived experience to remove barriers, educate society, and build a future where differently-abled people are valued, included, and given the same opportunities as everyone else.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveProgram((prev) => (prev - 1 + PROGRAMS.length) % PROGRAMS.length)}
                className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-800 transition-all bg-white shadow-sm"
                aria-label="Previous program"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveProgram((prev) => (prev + 1) % PROGRAMS.length)}
                className="w-11 h-11 rounded-full bg-violet-600 flex items-center justify-center text-white hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
                aria-label="Next program"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50/40 p-3 md:p-4">
            <div ref={programsRef} className="flex overflow-x-hidden scroll-smooth">
            {PROGRAMS.map((event, i) => {
              const stripeClass =
                i % 3 === 0
                  ? "bg-sky-400"
                  : i % 3 === 1
                    ? "bg-violet-400"
                    : "bg-amber-400";

              return (
                <Link key={event.id} to={`/programs/${event.id}`} className="group min-w-full md:min-w-[33.333%] p-1.5">
                  <article className="h-full rounded-[1.25rem] bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-300">
                    <div className={`h-1.5 w-full ${stripeClass}`} />
                    <div className="p-5">
                      <div className="rounded-xl overflow-hidden mb-4 aspect-[4/3]">
                        <img
                          src={resolveMediaUrl(event.img)}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="inline-block px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-3">
                        {event.tag}
                      </span>
                      <h3 className="font-bold text-slate-800 mb-1.5 group-hover:text-violet-600 transition-colors text-lg leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-slate-800 font-semibold text-sm leading-snug mb-2 line-clamp-2">
                        {event.headline}
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 overflow-hidden text-ellipsis min-h-[3.75rem]">
                        {event.desc}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-violet-600 group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
            </div>
          </div>

          <div className="mt-8 text-center">
            <HoverFillLink
              to="/programs"
              variant="purple"
              className="gap-3 px-10 py-4 font-black text-sm uppercase tracking-widest"
              labelClassName="inline-flex items-center gap-3"
            >
              View All Programs
              <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </HoverFillLink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="px-6 py-14 md:py-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-br from-violet-50 via-sky-50 to-amber-50 border border-violet-100 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <SectionBadge label="Testimonials" dotClass="bg-violet-500" />
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                Voices from Our Community
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="w-9 h-9 rounded-full border-2 border-violet-200 bg-white text-violet-600 flex items-center justify-center hover:bg-violet-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
                className="w-9 h-9 rounded-full border-2 border-violet-200 bg-white text-violet-600 flex items-center justify-center hover:bg-violet-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div ref={testimonialsRef} className="flex overflow-x-hidden scroll-smooth gap-6">
            {TESTIMONIALS.map((item, i) => (
              <div
                key={i}
                className="min-w-full md:min-w-[calc(50%-12px)] rounded-2xl bg-white border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col sm:flex-row gap-5 items-start"
              >
                <img
                  src={resolveMediaUrl(item.img)}
                  alt={item.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-violet-100 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-5">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                  <p className="text-[10px] font-bold text-violet-500 tracking-widest mt-1 uppercase">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Light in Action */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f0ff] via-[#f8faff] to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(90%,48rem)] h-64 bg-violet-300/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-violet-400" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-500">
                Impact
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.28) }}
                  className="group relative rounded-[1.35rem] bg-white/90 backdrop-blur-sm border border-white shadow-[0_8px_30px_rgba(100,80,160,0.06)] hover:shadow-[0_16px_40px_rgba(100,80,160,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-400 to-sky-400 opacity-80" />
                  <div className="p-6 pl-7 flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-violet-50 to-sky-50 text-violet-600 border border-violet-100/80 group-hover:from-violet-100 group-hover:to-sky-100 transition-colors duration-300">
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
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-[1.75rem] p-[1px] bg-gradient-to-r from-violet-200 via-sky-200 to-violet-200"
          >
            <div className="relative rounded-[calc(1.75rem-1px)] bg-white px-7 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-violet-50/80 to-transparent pointer-events-none" />
              <div className="relative">
                <p className="text-xl md:text-2xl font-bold text-slate-900 leading-snug tracking-tight max-w-xl">
                  Together, we&apos;re building a future where every person has the opportunity to shine.
                </p>
              </div>
              <Link
                to="/donate"
                className="relative inline-flex items-center justify-center gap-2 shrink-0 px-8 py-4 rounded-full bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-colors shadow-[0_10px_28px_rgba(124,58,237,0.28)]"
              >
                Donate & Shine a Light
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="bg-white py-12 md:py-16 px-6 mb-10 md:mb-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <SectionBadge label="Blog" dotClass="bg-amber-400" />
              <h2 className="mt-3 text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                Stories that Inspire Action
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-500 font-medium max-w-md">
                Insights, updates, and stories from our events and communities.
              </p>
            </div>
            <HoverFillLink
              to="/blog"
              variant="purple"
              className="gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest shrink-0"
              labelClassName="inline-flex items-center gap-2"
            >
              View All Stories
              <ArrowUpRight size={16} />
            </HoverFillLink>
          </div>

          <div className="grid lg:grid-cols-12 gap-4 lg:h-[460px]">
            {featuredBlogPost && (
              <Link
                to={`/blog/${featuredBlogPost.id}`}
                className="group lg:col-span-7 block h-full min-h-[320px] md:min-h-[360px] lg:min-h-0"
              >
                <div className="rounded-2xl p-[3px] bg-gradient-to-br from-sky-200 via-violet-200 to-amber-200 h-full shadow-[0_12px_40px_rgba(139,92,246,0.12)]">
                  <article className="rounded-[1.35rem] bg-white h-full overflow-hidden flex flex-col sm:flex-row">
                    <div className="relative sm:w-[44%] min-h-[200px] sm:min-h-0 shrink-0 overflow-hidden">
                      <img
                        src={resolveMediaUrl(featuredBlogPost.image)}
                        alt={featuredBlogPost.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold text-violet-600 uppercase tracking-widest shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {featuredBlogPost.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center flex-1 p-6 md:p-8 bg-gradient-to-br from-white via-white to-violet-50/40">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-500 mb-3">
                        Featured Story
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug tracking-tight mb-4 group-hover:text-violet-600 transition-colors line-clamp-3">
                        {featuredBlogPost.title}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed line-clamp-3 mb-6 text-sm md:text-base">
                        {featuredBlogPost.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {featuredBlogPost.date}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 group-hover:gap-3 transition-all">
                          Read Story
                          <span className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors">
                            <ArrowRight size={16} />
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              </Link>
            )}

            <div className="lg:col-span-5 flex flex-col gap-3 h-full min-h-0">
              {homepageSidebarPosts.map((post, i) => {
                const accent =
                  i % 3 === 0
                    ? { ring: "ring-sky-200", tag: "text-sky-600 bg-sky-50" }
                    : i % 3 === 1
                      ? { ring: "ring-violet-200", tag: "text-violet-600 bg-violet-50" }
                      : { ring: "ring-amber-200", tag: "text-amber-700 bg-amber-50" };

                return (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug ?? post.id}`}
                    className="group block flex-1 min-h-0"
                  >
                    <article
                      className={`h-full min-h-[120px] rounded-xl overflow-hidden bg-[#FAFCFF] border border-slate-100 ring-1 ${accent.ring} hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300 flex flex-row`}
                    >
                      <div className="w-28 sm:w-32 shrink-0 self-stretch overflow-hidden">
                        <img
                          src={resolveMediaUrl(post.image)}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex flex-col justify-center py-4 px-4 flex-1 min-w-0">
                        <span
                          className={`inline-flex w-fit px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest mb-2 ${accent.tag}`}
                        >
                          {post.category}
                        </span>
                        <h4 className="text-sm md:text-base font-bold text-slate-800 leading-snug mb-1.5 group-hover:text-violet-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-1 mb-2 hidden sm:block">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between gap-2 mt-auto">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {post.date}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read <ArrowUpRight size={12} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pt-4 pb-6 -mb-16 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-gradient-to-br from-sky-100 via-violet-50 to-amber-100 border border-violet-200/60 p-8 md:p-12 text-center shadow-xl shadow-violet-200/20 overflow-hidden relative"
          >
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

            <p className="text-[10px] font-bold text-violet-500 uppercase tracking-[0.3em] mb-4 relative">
              The global mission of
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight relative">
              Light Upon <span className="text-violet-600">Light</span>
            </h2>
            <p className="mt-5 text-slate-600 font-medium max-w-xl mx-auto relative">
              Join a community committed to advocacy, accessibility, and equality for differently-abled individuals everywhere.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4 relative">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-black text-sm uppercase tracking-widest transition-colors"
              >
                Donate Now
                <ArrowUpRight size={18} />
              </Link>
              <HoverFillButton
                variant="purple"
                rounded="2xl"
                className="px-8 py-3.5 font-black text-sm uppercase tracking-widest"
              >
                Partner With Us
              </HoverFillButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

