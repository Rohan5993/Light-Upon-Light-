import { motion } from "motion/react";
import { ArrowUpRight, Heart, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { PROGRAMS } from "../data/programs";
import { BLOG_POSTS, type BlogPost } from "../data/blogPosts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllBlogPosts } from "../services/blogService";


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
  const [progress, setProgress] = useState(0);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const programsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const scrollToProgram = useCallback((index: number) => {
    if (programsRef.current) {
      const isMobile = window.innerWidth < 768;
      const cardWidth = programsRef.current.scrollWidth / (PROGRAMS.length + 2);
      const j = index + 1;
      const scrollPos = isMobile ? j * cardWidth : (j - 1) * cardWidth;

      programsRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
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
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 0.4;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setActiveProgram(curr => (curr + 1) % PROGRAMS.length);
      setProgress(0);
    }
  }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
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
      <div className="relative h-screen overflow-hidden selection:bg-purple-100 font-sans flex flex-col">
        <Header variant="light" />
        {/* Background Hero Image with Vertical Ribbon Effect */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-wheelchair.png"
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
        <main className="relative z-10 px-6 md:px-16 flex-1 flex flex-col justify-center max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8">
              Igniting Hope,<br />
              Radiating Impact.
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-14 max-w-2xl font-medium">
              Cultivating resilience and hope through radiant action. We provide sustainable support to communities facing adversity, turning small acts into global transformations.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-5 bg-white pl-10 pr-3 py-3 rounded-full text-slate-900 font-bold shadow-2xl hover:shadow-white/20 transition-all"
            >
              <span className="text-lg">Join The Movement</span>
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white group-hover:bg-purple-700 transition-colors">
                <ArrowUpRight size={24} strokeWidth={2.5} />
              </div>
            </motion.button>
          </motion.div>
        </main>

        {/* Impact Blur Decorative Element */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] impact-blur pointer-events-none opacity-50" />
      </div>


      {/* Purpose-Driven Platform Section */}
      <section className="bg-white py-24 px-6 relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 flex pointer-events-none opacity-[0.03]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full flex-1 border-r border-black" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 text-[10px] font-bold text-gray-400 mb-8 uppercase tracking-widest bg-white">
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                About
              </div>
              <h2 className="font-medium text-gray-900 leading-[1.3] tracking-tight max-w-2xl">
                Light Upon Light is a purpose-driven platform that creates impactful charity events, bringing people together to support causes that truly matter.
              </h2>
            </div>
            <div className="pt-14">
              <p className="text-lg text-gray-500 font-medium leading-relaxed mb-12">
                Social good thrives when people unite and contribute together. We create simple ways for anyone to be part of meaningful change.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-5xl font-bold text-gray-900 mb-2">120<span className="text-purple-600">+</span></p>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider leading-snug">Charity Events <br /> Organized</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-gray-900 mb-2">8,000<span className="text-purple-600">+</span></p>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider leading-snug">Active <br /> Volunteers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl mb-16 border border-gray-100">
            <img
              src="/wheelchair-meeting.jpg"
              alt="Community Action"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-10">
              <h4 className="text-lg font-bold text-gray-900">01. Community</h4>
              <p className="text-gray-500 font-medium leading-relaxed">People are at the heart of every change we create.</p>
            </div>
            <div className="space-y-7">
              <h4 className="text-lg font-bold text-gray-900">02. Transparency</h4>
              <p className="text-gray-500 font-medium leading-relaxed">Open actions, honest reporting, clear results.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900">03. Collaboration</h4>
              <p className="text-gray-500 font-medium leading-relaxed">Strong partnerships create stronger impact.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900">04. Impact-Driven</h4>
              <p className="text-gray-500 font-medium leading-relaxed">Every effort leads to measurable good.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Narrative of Light Section */}
      <section id="our-mission" className="bg-[#e6f1fe] py-24 px-6 relative overflow-hidden">
        {/* Subtle Vertical Lines Background */}
        <div className="absolute inset-0 flex pointer-events-none opacity-[0.05]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full flex-1 border-r border-blue-900/10" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-[auto_1fr] gap-20 items-center relative z-10">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 max-w-sm">
              <img
                src="/founder.png"
                alt="Radiant Founder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Heart className="w-6 h-6 fill-purple-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Founded in</p>
                <p className="text-xl font-black text-gray-900">2024</p>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest bg-white">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              About Us
            </div>
            <h2 className="font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              The Narrative of <span className="text-purple-600">Light</span>
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                What began as a personal journey through adversity evolved into a global movement of empowerment. Our founder believed that every individual, regardless of their path, deserves access to a community that fosters strength and radiates hope.
              </p>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Through "Light Upon Light," we've transformed physical spaces into sanctuaries of innovation, ensuring that the light of opportunity reaches every corner of our community.
              </p>
            </div>

            <a
              href="#journey"
              className="inline-flex items-center gap-2 mt-10 text-gray-900 font-black hover:gap-3 transition-all group uppercase text-xs tracking-widest"
            >
              Explore More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Our Radiant Programs Section */}
      <section id="programs" className="bg-white py-24 px-6 relative overflow-hidden">
        {/* Subtle Vertical Lines Background */}
        <div className="absolute inset-0 flex pointer-events-none opacity-[0.03]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full flex-1 border-r border-black" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative mb-16 flex flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest bg-white">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                Programs
              </div>
              <h2 className="font-bold text-gray-900 tracking-tight leading-tight">Our Radiant Programs</h2>
            </div>

            <div className="md:absolute right-0 bottom-0 flex gap-3 mt-8 md:mt-0">
              <button
                onClick={() => {
                  setActiveProgram(prev => (prev - 1 + PROGRAMS.length) % PROGRAMS.length);
                  setProgress(0);
                }}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setActiveProgram(prev => (prev + 1) % PROGRAMS.length);
                  setProgress(0);
                }}
                className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative group/scroll overflow-hidden">
            <div
              ref={programsRef}
              className="flex items-start overflow-x-hidden scroll-smooth pb-6"
            >
              {/* Infinite-like feel by padding with clones */}
              {[PROGRAMS[PROGRAMS.length - 1], ...PROGRAMS, PROGRAMS[0]].map((event, i) => {
                const originalIndex = (i - 1 + PROGRAMS.length) % PROGRAMS.length;
                const isActive = activeProgram === originalIndex;
                const cardBgClass =
                  originalIndex % 3 === 0
                    ? "bg-sky-50/90"
                    : originalIndex % 3 === 1
                      ? "bg-purple-50/90"
                      : "bg-amber-50/90";

                return (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="min-w-full md:min-w-[33.333%] group cursor-pointer flex flex-col px-6 origin-top"
                  >
                    <Link to={`/programs/${event.id}`}>
                      <div
                        className={`rounded-2xl p-5 md:p-6 border border-white/60 shadow-sm ${cardBgClass} transition-colors duration-500`}
                      >
                        <div className={`rounded-2xl overflow-hidden mb-6 shadow-md transition-all duration-700 ease-in-out ${isActive ? 'aspect-[4/3.6]' : 'aspect-[4/3.1]'}`}>
                          <img
                            src={event.img}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex items-center justify-start mb-4">
                          <span className="px-2 py-1 rounded bg-white/80 text-gray-500 border border-gray-100/80 text-[9px] uppercase tracking-wider font-bold">{event.tag}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-all duration-500 text-lg">{event.title}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{event.desc}</p>
                        <div className={`group/btn mt-8 flex items-center gap-2 uppercase text-[10px] tracking-widest transition-all duration-500 hover:gap-3 w-fit ${isActive ? 'text-purple-600 font-semibold' : 'text-gray-900 font-bold hover:text-purple-600'}`}>
                          Explore
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/programs"
              className="inline-flex items-center gap-3 px-10 py-4 bg-purple-600 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 group"
            >
              View All Programs
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>


      {/* Voices from Our Community Section */}
      <section id="stories" className="bg-[#ede7fe] py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-20 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 text-[10px] font-bold text-gray-900 mb-6 uppercase tracking-widest bg-white/50">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              Testimonials
            </div>
            <h2 className="font-bold text-gray-900 tracking-tight leading-tight">Voices from Our Community</h2>

            <div className="md:absolute right-0 bottom-0 flex gap-3 mt-8 md:mt-0">
              <button
                onClick={() => {
                  setActiveTestimonial(prev => (prev === 0 ? 1 : 0));
                }}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-all shadow-sm bg-white/50"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setActiveTestimonial(prev => (prev === 0 ? 1 : 0));
                }}
                className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={testimonialsRef}
            className="flex items-start overflow-x-hidden scroll-smooth pb-6 gap-8"
          >
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="min-w-full md:min-w-[45%] bg-white p-10 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-8 shadow-xl shadow-black/5 hover:scale-[1.01] transition-all border border-white/10 group">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-full border-4 border-[#A788FA]/20 shadow-lg overflow-hidden transition-transform group-hover:scale-105">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#A788FA] fill-[#A788FA]" />)}
                  </div>
                  <p className="text-[17px] text-gray-600 font-medium italic mb-6 leading-relaxed">"{item.quote}"</p>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-[10px] font-bold text-[#A788FA] tracking-widest mt-1 uppercase">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Blog Section - Layout from Screenshot */}
      <section id="blog" className="bg-white pt-20 pb-32 px-6 relative overflow-hidden">
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

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12">
            {/* Featured Post (Left) */}
            <div>
              {[featuredBlogPost].filter(Boolean).map(post => (
                <motion.div
                  key={post!.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="group"
                >
                  <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-6 border border-gray-100 shadow-sm">
                    <img
                      src={post!.image}
                      alt={post!.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-4">
                      {post!.category}
                    </span>
                    <h3 className="text-[1.5rem] font-bold text-slate-900 mb-6 group-hover:text-purple-600 transition-colors tracking-tight leading-snug">
                      {post!.title}
                    </h3>
                    <p className="text-gray-400 font-medium leading-relaxed mb-3 text-[1rem]">
                      {post!.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                        {post!.date}
                      </span>
                      <Link to={`/blog/${post!.id}`} className="flex items-center gap-3 text-purple-600 font-black text-sm hover:gap-4 transition-all">
                        Read More <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar Posts (Right) */}
            <div className="space-y-4">
              {homepageSidebarPosts.map((post, i) => (
                (() => {
                  const cardBgClass =
                    i % 3 === 0
                      ? "bg-amber-50/90"
                      : i % 3 === 1
                        ? "bg-purple-50/90"
                        : "bg-sky-50/90";

                  return (
                <Link key={post.id} to={`/blog/${post.slug ?? post.id}`} className="block mb-5 last:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className={`relative overflow-hidden flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-xl hover:shadow-purple-500/5 transition-all group cursor-pointer ${cardBgClass}`}
                >
                  <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
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
                })()
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branding Banner / CTA */}
      <section className="relative px-6 -mb-24 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-100 via-white to-purple-100 rounded-2xl p-16 md:p-24 text-center shadow-2xl shadow-purple-900/10 overflow-hidden relative border border-purple-200/50"
          >
            {/* Ambient light effects inside white box */}
            <div className="absolute inset-0 opacity-50 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-widest mb-0 flex flex-col items-center gap-4">
              <span className="text-gray-300 text-[10px] md:text-xs tracking-[1em] mb-4">THE GLOBAL MISSION OF</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                LIGHT UPON LIGHT
              </span>
            </h2>

            <div className="mt-12 flex flex-wrap justify-center gap-6 relative z-10">
              <button className="px-10 py-4 bg-purple-600 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-xl shadow-purple-200">
                Join our Global Community
              </button>
              <button className="px-10 py-4 bg-white text-purple-600 border border-purple-100 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-purple-50 transition-all">
                Partner with us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

