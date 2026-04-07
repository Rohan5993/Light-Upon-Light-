/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowUpRight, Heart, Star, Calendar, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const NAV_LINKS = ["Home", "Our Mission", "Impact", "Programs", "Stories"];

const PROGRAMS = [
  { 
    title: "Community Health Awareness Fair", 
    desc: "A public event offering free health screenings and educational resources to encourage healthier lifestyles.", 
    date: "May 08, 2030", 
    location: "Montreal", 
    tag: "Wellness",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Hope for Education Drive", 
    desc: "A fundraising and donation event providing school supplies and scholarships for underprivileged children.", 
    date: "May 12, 2030", 
    location: "Toronto", 
    tag: "Youth Support",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Share a Meal Food Drive", 
    desc: "A community food drive collecting non-perishable items and groceries for families facing food insecurity.", 
    date: "May 14, 2030", 
    location: "Ottawa", 
    tag: "Charity",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Digital Inclusion Workshop", 
    desc: "Empowering seniors and low-income families with essential digital skills and hardware access.", 
    date: "June 02, 2030", 
    location: "Vancouver", 
    tag: "Technology",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Senior Care Outreach", 
    desc: "Providing companionship and essential care services to elderly community members living alone.", 
    date: "June 15, 2030", 
    location: "Calgary", 
    tag: "Social Care",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Clean Water Initiative", 
    desc: "Developing sustainable water filtration systems for remote communities facing water scarcity.", 
    date: "July 10, 2030", 
    location: "Global", 
    tag: "Sustainability",
    img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800"
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeProgram, setActiveProgram] = useState(0);
  const [progress, setProgress] = useState(0);
  const programsRef = useRef<HTMLDivElement>(null);

  const scrollToProgram = useCallback((index: number) => {
    if (programsRef.current) {
      const containerWidth = programsRef.current.offsetWidth;
      const isMobile = window.innerWidth < 768;
      const cardWidth = containerWidth / (isMobile ? 1 : 3);
      
      // The card we want to center is at (index + 1) in our padded array [P5, P0, P1, P2, P3, P4, P5, P0]
      // On desktop (3 visible), to center index 'j', we scroll to (j-1) * cardWidth
      // On mobile (1 visible), to center index 'j', we scroll to j * cardWidth
      const j = index + 1;
      const scrollPos = isMobile ? j * cardWidth : (j - 1) * cardWidth;
      
      programsRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 0.4; // ~6.25 seconds for a full cycle (100 / 0.4 * 25ms)
      });
    }, 25);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setActiveProgram(curr => (curr + 1) % PROGRAMS.length);
      setProgress(0);
    }
  }, [progress]);

  useEffect(() => {
    scrollToProgram(activeProgram);
  }, [activeProgram, scrollToProgram]);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* Vertical Slice Background */}
      <div className="absolute inset-0 flex pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="h-full flex-1 relative overflow-hidden"
            style={{
              opacity: 0.85 + (i % 2) * 0.1, // Subtle variation
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=2070')`,
                width: "100vw",
                left: `-${i * 5}vw`,
                filter: i % 2 === 0 ? "brightness(1.05)" : "brightness(0.95)", // Shutter effect
                transform: `scale(${1 + (i % 3) * 0.005})`, // Very subtle zoom variation
              }}
            />
            {/* Subtle vertical line between slices */}
            <div className="absolute inset-y-0 right-0 w-[1px] bg-white/5" />
          </div>
        ))}
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300 ${
          isScrolled ? "bg-black/40 backdrop-blur-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500">
              <Heart className="w-6 h-6 text-black -rotate-45 group-hover:-rotate-90 transition-transform duration-500 fill-black" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Light Upon Light</span>
          </div>

          {/* Centered Nav Pill */}
          <div className="hidden md:flex items-center bg-white rounded-full px-2 py-1.5 shadow-lg shadow-black/20">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  link === "Home"
                    ? "bg-black text-white"
                    : "text-black/60 hover:text-black hover:bg-black/5"
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Donate Button */}
          <button className="px-6 py-2.5 border border-brand-purple/30 text-brand-purple rounded-full text-sm font-medium hover:bg-brand-purple hover:text-white transition-all duration-300">
            Donate Now
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col justify-center min-h-screen px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8"
            >
              Igniting Hope, <br />
              Radiating Impact.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-xl"
            >
              Cultivating resilience and hope through radiant action. We provide
              sustainable support to communities facing adversity, turning small
              acts into global transformations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <button className="group flex items-center gap-3 bg-white text-black px-6 py-4 rounded-full font-semibold transition-all hover:pr-4">
                Join The Movement
                <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Bottom Gradient for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </div>

    {/* Empowering Beyond Boundaries Section */}
    <section id="our-mission" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" 
              alt="Empowering people" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Quote Box */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl max-w-xs border border-gray-100"
          >
            <p className="text-gray-600 italic mb-4">"True ability is not just physical, it's the resilience to rise beyond."</p>
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
                alt="John Doe" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-bold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Program Lead</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Empowering Beyond Boundaries
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Light Upon Light is more than a foundation - it's a sanctuary. We believe that every individual possesses a unique resilience that deserves to shine. Our purpose-driven platform bridges the gap between ambition and accessibility.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-brand-purple" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Community First</h4>
                <p className="text-gray-500">Building connections that foster belonging and shared growth.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Radiant Inclusivity</h4>
                <p className="text-gray-500">Ensuring participation for every ability level.</p>
              </div>
            </div>
          </div>
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Programs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Our Radiant <br /> Programs</h2>
        </div>

        <div className="relative mb-16 group/scroll overflow-hidden">
          <div 
            ref={programsRef}
            className="flex items-start overflow-x-hidden scroll-smooth pb-12"
          >
            {/* Infinite-like feel by padding with clones */}
            {[PROGRAMS[PROGRAMS.length - 1], ...PROGRAMS, PROGRAMS[0]].map((event, i) => {
              const originalIndex = (i - 1 + PROGRAMS.length) % PROGRAMS.length;
              const isActive = activeProgram === originalIndex;
              
              return (
                <motion.div 
                  key={i}
                  animate={{ 
                    opacity: 1,
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-full md:min-w-[33.333%] group cursor-pointer flex flex-col px-4 origin-top"
                >
                  <div className={`rounded-xl overflow-hidden mb-6 shadow-lg transition-all duration-700 ease-in-out ${isActive ? 'aspect-[4/4.8]' : 'aspect-[4/3.8]'}`}>
                    <img 
                      src={event.img} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center justify-start mb-4">
                    <span className="px-2 py-1 rounded bg-gray-50 text-gray-400 border border-gray-100 text-[9px] uppercase tracking-wider font-bold">{event.tag}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-all duration-500 text-lg">{event.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{event.desc}</p>
                  <button className="group/btn flex items-center gap-2 text-brand-blue font-bold text-[10px] uppercase tracking-wider mt-6 w-fit">
                    Explore More
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-x-1" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            {PROGRAMS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveProgram(i);
                  setProgress(0);
                }}
                className="group relative py-4"
              >
                <div className="h-1.5 w-10 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-blue transition-all duration-100 ease-linear"
                    style={{ width: activeProgram === i ? `${progress}%` : '0%' }}
                  />
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                setActiveProgram(prev => (prev - 1 + PROGRAMS.length) % PROGRAMS.length);
                setProgress(0);
              }}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setActiveProgram(prev => (prev + 1) % PROGRAMS.length);
                setProgress(0);
              }}
              className="w-12 h-12 rounded-full bg-[#0F172A] flex items-center justify-center text-white hover:bg-black transition-all shadow-lg shadow-black/20"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Voices from Our Community Section */}
    <section id="stories" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Voices from Our Community</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
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
            }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50/50 p-8 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start gap-8 border border-gray-100/50">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#7C5CFF] fill-[#7C5CFF]" />)}
                </div>
                <p className="text-[15px] text-gray-600 italic mb-6 leading-relaxed">"{item.quote}"</p>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest mt-1">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Blog Section */}
    <section id="blog" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Blog
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Stories that Inspires Action</h2>
          </div>
          <p className="text-gray-500 max-w-xs text-sm leading-relaxed font-medium">
            Insights, updates, and stories from our events and communities.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Featured Post */}
          <div className="lg:col-span-7">
            <div className="group cursor-pointer h-full flex flex-col">
              <div className="aspect-[16/7.5] rounded-[2.5rem] overflow-hidden mb-6 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Featured story" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="inline-block w-fit px-3 py-1 rounded-lg bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Youth Support</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">Why Community-Led Charity Creates Lasting Impact</h3>
                <p className="text-gray-500 mb-6 leading-relaxed text-sm font-medium">Discover how community-driven initiatives foster deeper engagement, build lasting trust, and create sustainable impact that continues to benefit...</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" alt="Maya Thompson" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                    <div className="text-[11px]">
                      <p className="font-bold text-gray-900">Maya Thompson</p>
                      <p className="text-gray-400 font-medium">March 8, 2030</p>
                    </div>
                  </div>
                  <button className="bg-[#0F172A] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-black transition-all hover:shadow-lg shadow-black/10">Read More</button>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Posts */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {[
              { 
                title: "The Power of Community-Led Charity", 
                tag: "Community Impact", 
                desc: "How community-driven initiatives build trust and...", 
                author: "John Weasley", 
                date: "March 1, 2030",
                img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400"
              },
              { 
                title: "Inside a Charity Clean-Up Event", 
                tag: "Environment", 
                desc: "A behind-the-scenes look at the teamwork and...", 
                author: "Daniel Lee", 
                date: "February 8, 2030",
                img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=400"
              },
              { 
                title: "How Volunteering Transforms Lives", 
                tag: "Volunteers", 
                desc: "Discover how giving your time not only helps...", 
                author: "Sofia Martinez", 
                date: "February 4, 2030",
                img: "https://images.unsplash.com/photo-1559027615-cd26714e93af?auto=format&fit=crop&q=80&w=400"
              }
            ].map((post, i) => (
              <div key={i} className="flex gap-6 group cursor-pointer bg-white p-6 rounded-[2rem] hover:shadow-xl transition-all border border-gray-100 shadow-sm">
                <div className="w-40 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="inline-block w-fit px-2 py-0.5 rounded-md bg-gray-50 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">{post.tag}</span>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                  <p className="text-gray-400 text-[11px] mb-3 line-clamp-1 font-medium">{post.desc}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-gray-400 font-bold">{post.author} • {post.date}</p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-900 uppercase tracking-tighter group-hover:gap-2 transition-all">
                      Read More <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="bg-white px-6 pb-24">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-brand-purple via-brand-blue to-blue-500 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-blue/30">
        <img 
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=2070" 
          alt="Community" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Illuminate a Life?</h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            Your support provides more than just resources—it provides the spark of hope that changes everything. Get involved today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-white text-brand-purple px-10 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all w-full sm:w-auto shadow-lg shadow-black/5">
              Get Involved Now
            </button>
            <button className="bg-transparent border-2 border-white/40 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all w-full sm:w-auto">
              Volunteer With Us
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-white py-12 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-black rounded-lg rotate-45">
            <Heart className="w-4 h-4 text-white -rotate-45 fill-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Light Upon Light</span>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Cookie Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
        </div>

        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-50 text-center text-xs text-gray-400">
        © 2026 Light Upon Light. All Rights Reserved. Empowering Every Ability.
      </div>
    </footer>
    </>
  );
}
