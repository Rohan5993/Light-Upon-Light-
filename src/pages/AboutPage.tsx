import { motion } from "motion/react";
import { useState } from "react";
import { Youtube, Sparkles, Target } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HISTORY = [
  { year: "2020", title: "Spark of Purpose", text: "A small volunteer circle began hosting support meetups and neighborhood drives." },
  { year: "2022", title: "Program Expansion", text: "Mentorship, youth leadership, and community health initiatives launched in parallel." },
  { year: "2024", title: "Formal Foundation", text: "Light Upon Light was established as a nonprofit with a long-term impact roadmap." },
  { year: "2026", title: "Global Partnerships", text: "Cross-border collaborations started to scale sustainable, community-led solutions." },
];

const GALLERY = [
  "/wheelchair-meeting.jpg",
  "/hero-wheelchair.png",
  "/founder.png",
  "/hero-wheelchair.png",
  "/wheelchair-meeting.jpg",
  "/founder.png",
];

/** Eight members — each card has a headshot and a hobby image shown on hover. */
const TEAM_COLLABORATIONS = [
  {
    name: "Rohan Z.",
    role: "Founder & Community Lead",
    organization: "Light Upon Light",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    hobbyImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    name: "Sara M.",
    role: "Program Strategist",
    organization: "Education Partner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    hobbyImage: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
  },
  {
    name: "David C.",
    role: "Mentor Network Lead",
    organization: "Volunteer Alliance",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    hobbyImage: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    name: "Maria R.",
    role: "Community Partnerships",
    organization: "Regional Nonprofit Network",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    hobbyImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    name: "James W.",
    role: "Youth Ambassador Coordinator",
    organization: "Youth Volunteer Networks",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    hobbyImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    name: "Elena P.",
    role: "Outreach & Communications",
    organization: "Healthcare Collaboration Team",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    hobbyImage: "https://images.pexels.com/photos/4151887/pexels-photo-4151887.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
  },
  {
    name: "Amir H.",
    role: "Operations & Logistics",
    organization: "Light Upon Light",
    image: "https://randomuser.me/api/portraits/men/53.jpg",
    hobbyImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    name: "Priya K.",
    role: "Grants & Partnerships",
    organization: "Philanthropy Circle",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    hobbyImage: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&h=800&q=85",
  },
] as const;

export default function AboutPage() {
  const [revealedMember, setRevealedMember] = useState<string | null>(null);

  return (
    <div className="relative bg-white min-h-screen selection:bg-purple-100 font-sans flex flex-col">
      <Header variant="dark" />

      {/* 1) Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="px-6 pt-10 pb-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest bg-white">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              About Light Upon Light
            </div>
            <h1 className="text-[1.875rem] sm:text-[2.5rem] md:text-[3rem] font-bold text-gray-900 tracking-tight leading-tight mb-6">
              A movement built on dignity, hope, and action.
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl">
              We bring people, resources, and compassion together to create practical pathways for long-term change.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white">
            <img src="/hero-wheelchair.png" alt="Light Upon Light community work" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.section>

      {/* 2) Our Story */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our Story</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Light Upon Light started with one core belief: no one should have to navigate hardship alone. What began as direct support for neighbors evolved into a wider mission to strengthen communities from within.
            </p>
            <p>
              We focus on trust, consistency, and collaboration. Every initiative is co-shaped with the people it serves so programs stay relevant, respectful, and sustainable over time.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 3) History */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-[#f8f5ff]"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">History</h2>
          <p className="text-gray-500 font-medium max-w-2xl mb-12">
            A timeline of key moments that shaped our mission and expanded our impact.
          </p>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-sky-200 via-purple-300 to-amber-200" />
            <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-sky-200 via-purple-300 to-amber-200" />

            <div className="space-y-8 md:space-y-10">
              {HISTORY.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 12 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className={`relative md:grid md:grid-cols-2 md:gap-10 ${isLeft ? "" : ""}`}
                  >
                    <div className={`md:contents`}>
                      <div className={`${isLeft ? "md:col-start-1" : "md:col-start-2"} pl-10 md:pl-0`}>
                        <article className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-purple-500 font-black mb-3">{item.year}</p>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{item.text}</p>
                        </article>
                      </div>
                    </div>

                    <div
                      className={`absolute top-8 w-4 h-4 rounded-full bg-white border-4 shadow-sm ${
                        index % 3 === 0
                          ? "border-sky-400"
                          : index % 3 === 1
                            ? "border-purple-400"
                            : "border-amber-400"
                      } ${
                        "left-1 md:left-1/2 md:-translate-x-1/2"
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4) Mission + Vision */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative grid lg:grid-cols-2 gap-7">
            <article className="relative overflow-hidden rounded-[2rem] p-[1px] bg-gradient-to-br from-sky-200 via-blue-100 to-purple-100 shadow-sm">
              <div className="relative h-full rounded-[2rem] bg-gradient-to-br from-sky-50 via-white to-blue-50 p-8 md:p-10">
                <div className="absolute top-0 right-0 w-56 h-56 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 text-sky-600 bg-white/80 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    <Target size={12} />
                    Mission
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                    Equip communities with practical support and shared leadership.
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We create inclusive programs that reduce barriers and unlock opportunities through mentorship, collaboration, and care.
                  </p>
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[2rem] p-[1px] bg-gradient-to-br from-purple-200 via-fuchsia-100 to-sky-100 shadow-sm">
              <div className="relative h-full rounded-[2rem] bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8 md:p-10">
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 text-purple-600 bg-white/80 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    <Sparkles size={12} />
                    Vision
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                    A world where compassion and structure create lasting impact.
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We envision resilient communities where people lead change locally and collectively shape a more hopeful future.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </motion.section>

      {/* 5) About Founder */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-[#eef5ff]"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[340px_1fr] gap-10 items-center">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-white">
            <img src="/founder.png" alt="Founder portrait" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-5">About Founder</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Our founder transformed personal adversity into a mission of collective empowerment, creating spaces where people feel seen, supported, and capable of building their future.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Their leadership centers on humility, accountability, and community ownership, ensuring the work remains human and impact-driven.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 6) Youtube */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Youtube</h2>
            <a
              href="https://www.youtube.com/@TheFoundersDiary24"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-black hover:bg-red-700 transition-colors"
            >
              <Youtube size={16} />
              Visit Channel
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[16/9]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/rZTNZ8mUCxY"
              title="Light Upon Light YouTube"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </motion.section>

      {/* 7) Team / Partners / Collaborations — 4×2 grid (md+), headshots + hover interests */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Team / Partners / Collaborations
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mb-10">
            Tap or hover each headshot to view an image of what they like.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TEAM_COLLABORATIONS.map((person) => {
              const isRevealed = revealedMember === person.name;

              return (
              <article
                key={person.name}
                tabIndex={0}
                role="button"
                onClick={() => setRevealedMember(isRevealed ? null : person.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setRevealedMember(isRevealed ? null : person.name);
                  }
                }}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${person.name.replace(/\s+/g, "+")}&size=600&background=ede9fe&color=6d28d9`;
                    }}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
                      isRevealed ? "opacity-0" : "opacity-100 group-hover:opacity-0 group-focus-within:opacity-0"
                    }`}
                  />
                  <img
                    src={person.hobbyImage}
                    alt={`${person.name} hobby`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = person.image;
                    }}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                      isRevealed ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                    }`}
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight">{person.name}</h3>
                  <p className="text-[11px] md:text-xs text-purple-600 font-semibold mt-0.5">{person.role}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{person.organization}</p>
                </div>
              </article>
            );
            })}
          </div>
        </div>
      </motion.section>

      {/* 8) Image Gallery */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-[#f8f5ff]"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-10">Image Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((src, i) => (
              <div key={`${src}-${i}`} className="aspect-[4/3] rounded-xl overflow-hidden border border-white shadow-sm">
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer topPaddingClass="pt-24" />
    </div>
  );
}
