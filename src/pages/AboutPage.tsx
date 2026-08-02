import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Youtube,
  ArrowRight,
  HeartHandshake,
  Ear,
  Layers,
  ChevronDown,
  Users,
  GraduationCap,
  Building2,
  HandHeart,
  CircleHelp,
  ShieldCheck,
  Calendar,
  MapPin,
  Compass,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteImages } from "../assets/siteImages";

const HISTORY = [
  {
    year: "2022",
    title: "A Cup of Tea Changed Everything",
    text: "What nearly broke our Founder & CEO became the reason Light Upon Light exists. After being denied a cup of tea because of her disability, she made a promise to change the way the world sees, treats, and values differently-abled people.",
  },
  {
    year: "2023",
    title: "The Vision Took Shape",
    text: "A year of research, planning, and preparation laid the foundation for Light Upon Light. Every application, conversation, and decision brought the vision one step closer to becoming a reality.",
  },
  {
    year: "2024",
    title: "Officially Established",
    text: "Light Upon Light officially became a 501(c)(3) nonprofit organization dedicated to advancing advocacy, accessibility, education, and equality for differently-abled people.",
  },
  {
    year: "2025",
    title: "Building the Foundation",
    text: "Our organization established its infrastructure, expanded its programs, and welcomed a passionate team of volunteers, advisors, and leaders committed to creating lasting change.",
  },
  {
    year: "2026",
    title: "Turning Vision Into Action",
    text: "Light Upon Light brought its mission to life by launching programs, building meaningful partnerships, serving schools and communities, and creating opportunities that empower differently-abled people every day.",
  },
];

const APPROACH = [
  {
    step: "01",
    title: "We Listen",
    desc: "Every initiative begins by listening to differently-abled people, families, and communities so the people most affected help shape the solutions.",
    icon: Ear,
    accent: "violet" as const,
  },
  {
    step: "02",
    title: "We Collaborate",
    desc: "We partner with schools, businesses, organizations, and community leaders to remove barriers and expand opportunities.",
    icon: HeartHandshake,
    accent: "sky" as const,
  },
  {
    step: "03",
    title: "We Take Action",
    desc: "Together, we create practical, lasting solutions that improve accessibility, strengthen inclusion, and help build communities where everyone belongs.",
    icon: Layers,
    accent: "amber" as const,
  },
];

const WHO_WE_SERVE = [
  {
    title: "Differently-Abled Individuals",
    desc: "People navigating physical, sensory, cognitive, or developmental disabilities who deserve dignity, accessibility, and equal opportunity.",
    icon: Users,
    accent: "violet" as const,
  },
  {
    title: "Families & Caregivers",
    desc: "The people who support, advocate for, and roll or walk alongside their loved ones every day.",
    icon: HandHeart,
    accent: "sky" as const,
  },
  {
    title: "Schools & Educators",
    desc: "Creating more inclusive learning environments where every student is valued and supported.",
    icon: GraduationCap,
    accent: "amber" as const,
  },
  {
    title: "Communities & Partners",
    desc: "Businesses, organizations, and community leaders committed to building a more accessible and inclusive future.",
    icon: Building2,
    accent: "violet" as const,
  },
];

const serveAccent = {
  sky: { stripe: "bg-sky-400", icon: "bg-sky-100 text-sky-600", border: "border-sky-100" },
  violet: { stripe: "bg-violet-500", icon: "bg-violet-100 text-violet-600", border: "border-violet-100" },
  amber: { stripe: "bg-amber-400", icon: "bg-amber-100 text-amber-700", border: "border-amber-100" },
};

const ORG_FACTS = [
  { label: "Status", value: "501(c)(3) nonprofit", icon: ShieldCheck, accent: "sky" as const },
  { label: "Founded", value: "2024", icon: Calendar, accent: "violet" as const },
  { label: "Region", value: "Greater Seattle Area", icon: MapPin, accent: "amber" as const },
  {
    label: "Focus",
    value: "Advocacy · Access · Education · Equality",
    icon: Compass,
    accent: "purple" as const,
  },
];

const orgFactAccent = {
  sky: { stripe: "bg-sky-400", chip: "text-sky-600", border: "border-sky-100" },
  violet: { stripe: "bg-violet-500", chip: "text-violet-600", border: "border-violet-100" },
  amber: { stripe: "bg-amber-400", chip: "text-amber-700", border: "border-amber-100" },
  purple: { stripe: "bg-purple-500", chip: "text-purple-600", border: "border-purple-100" },
};

const historyAccent = ["sky", "violet", "amber", "sky", "violet"] as const;
const historyAccentStyles = {
  sky: { year: "text-sky-600", dot: "border-sky-400", border: "border-sky-100" },
  violet: { year: "text-violet-600", dot: "border-violet-400", border: "border-violet-100" },
  amber: { year: "text-amber-700", dot: "border-amber-400", border: "border-amber-100" },
};

const FAQ_ITEMS = [
  {
    question: "What is Light Upon Light?",
    answer:
      "Light Upon Light is a 501(c)(3) organization founded through lived experience, dedicated to building a future where differently-abled people are valued for who they are and given the same opportunities as everyone else.",
  },
  {
    question: "Who does Light Upon Light serve?",
    answer:
      "We serve differently-abled individuals of all ages, along with their families, caregivers, educators, and the communities that support them.",
  },
  {
    question: "Where are you based?",
    answer:
      "Light Upon Light is based in Everett and Redmond, Washington. Our programs and community events are held at our Redmond location.",
    detail: {
      title: "Program & Community Space",
      lines: ["16305 NE 87th St, Suite 110", "Redmond, WA 98052"],
      note: "Visits are by appointment only. Please contact us before stopping by so we can best assist you.",
    },
  },
  {
    question: "How can I get involved?",
    answer:
      "There are many ways to make a difference. You can donate, volunteer, partner with us, attend events, or help spread awareness by sharing our story.",
  },
  {
    question: "Are donations tax-deductible?",
    answer:
      "Yes. Light Upon Light is a registered 501(c)(3) nonprofit organization, and eligible donations are tax-deductible to the fullest extent allowed by law.",
  },
  {
    question: "How do your programs work?",
    answer:
      "Every program at Light Upon Light was developed from lived experience. Behind every program is a personal story our Founder & CEO has lived sharing the experiences, challenges, and unmet needs that led to its creation, so others have the support, opportunities, and resources she wished had been available throughout her own journey.",
  },
  {
    question: "Can I volunteer or partner with you?",
    answer:
      "Absolutely. We welcome individuals, businesses, schools, and community organizations that want to make a difference. Visit our Volunteer or Contact page to learn how you can get involved.",
  },
  {
    question: "Why was Light Upon Light started?",
    answer:
      "Light Upon Light began from a deeply personal, painful, and unjust experience. After our Founder & CEO was denied something as simple as a cup of tea because of her disability, it lit a fire under her tires. That moment became the catalyst for founding Light Upon Light and building a movement dedicated to creating lasting change and a brighter future for differently-abled individuals.",
  },
];

const approachAccent = {
  sky: { stripe: "bg-sky-400", icon: "bg-sky-100 text-sky-600", label: "text-sky-600" },
  violet: { stripe: "bg-violet-500", icon: "bg-violet-100 text-violet-600", label: "text-violet-600" },
  amber: { stripe: "bg-amber-400", icon: "bg-amber-100 text-amber-700", label: "text-amber-600" },
};

const GET_INVOLVED = [
  {
    title: "Donate",
    desc: "Fund advocacy, accessibility, and programs that open real doors for differently-abled people.",
    to: "/donate",
    cta: "Give Today",
    image: siteImages.donation,
  },
  {
    title: "Explore Programs",
    desc: "See how we turn compassion into action through education, wellness, and community support.",
    to: "/programs",
    cta: "View Programs",
    image: siteImages.wheelchairMeeting,
  },
  {
    title: "Read Our Stories",
    desc: "Follow updates, insights, and voices from the communities we serve every day.",
    to: "/blog",
    cta: "Read Stories",
    image: siteImages.heroWheelchair,
  },
];

export default function AboutPage() {
  const { hash } = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash]);

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
              More Than a Nonprofit. A Movement for Change.
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl">
              What began with one moment of exclusion has grown into a movement dedicated to creating a world where differently-abled people are treated with dignity and respect, valued for who they are, and given the same opportunities as everyone else.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white">
            <img
              src={siteImages.aboutHero}
              alt="Young girl smiling in a wheelchair in a classroom"
              className="w-full h-full object-cover object-top"
            />
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
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-br from-violet-50 via-sky-50 to-amber-50 border border-violet-100 p-6 md:p-10 lg:p-14">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500 mb-5">Our Story</p>
              <blockquote className="text-2xl sm:text-3xl md:text-[2rem] font-bold text-slate-800 leading-tight tracking-tight mb-6">
                It started with a cup of tea.
              </blockquote>
              <div className="space-y-4 text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                <p>
                  Our Founder &amp; CEO was denied something that simple because of her disability. That one unfair moment revealed how often differently-abled people are overlooked and denied basic dignity.
                </p>
                <p>
                  What began as personal pain became a movement—fighting for advocacy, accessibility, education, and equality so differently-abled individuals finally get the rights and respect they deserve.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8 w-full">
                {ORG_FACTS.map((fact) => {
                  const accent = orgFactAccent[fact.accent];
                  const Icon = fact.icon;
                  return (
                    <article
                      key={fact.label}
                      className={`rounded-xl border ${accent.border} bg-white/90 backdrop-blur-sm px-4 py-4 min-h-[5.5rem] shadow-sm flex items-center`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-slate-50 ${accent.chip}`}>
                          <Icon size={18} strokeWidth={2.25} />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[9px] font-bold uppercase tracking-widest ${accent.chip}`}>{fact.label}</p>
                          <p className="text-xs md:text-sm font-bold text-slate-800 leading-snug mt-0.5">{fact.value}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                <img
                  src={siteImages.wheelchairMeeting}
                  alt="Light Upon Light community gathering"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3) Who We Serve */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-[#FAFCFF]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500 mb-3">Who We Serve</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              We Stand & Elevate Our Chair With the People We Serve.
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed mt-3">
              Every program and partnership begins with people, putting human dignity first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHO_WE_SERVE.map((item) => {
              const accent = serveAccent[item.accent];
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`group flex gap-5 rounded-2xl bg-white border ${accent.border} p-6 shadow-sm hover:shadow-md transition-all`}
                >
                  <div className={`w-1 shrink-0 rounded-full self-stretch ${accent.stripe}`} />
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${accent.icon}`}>
                    <Icon size={22} strokeWidth={2.25} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-violet-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 4) History */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-[#f8f5ff]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-12 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500 mb-3">History</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Key moments that shaped our mission.
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              From one unfair moment to a growing movement for dignity, access, and change.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-sky-200 via-violet-300 to-amber-200" />
            <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-sky-200 via-violet-300 to-amber-200" />

            <div className="space-y-8 md:space-y-10">
              {HISTORY.map((item, index) => {
                const isLeft = index % 2 === 0;
                const tone = historyAccent[index % historyAccent.length];
                const accent = historyAccentStyles[tone];
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="relative md:grid md:grid-cols-2 md:gap-10"
                  >
                    <div className={`${isLeft ? "md:col-start-1" : "md:col-start-2"} pl-10 md:pl-0`}>
                      <article className={`bg-white rounded-2xl p-6 border ${accent.border} shadow-sm hover:shadow-md transition-shadow`}>
                        <p className={`text-[10px] uppercase tracking-[0.22em] font-black mb-3 ${accent.year}`}>
                          {item.year}
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.text}</p>
                      </article>
                    </div>

                    <div
                      className={`absolute top-8 w-4 h-4 rounded-full bg-white border-4 shadow-sm ${accent.dot} left-1 md:left-1/2 md:-translate-x-1/2`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <div className="bg-[#f8f5ff] pt-10 md:pt-14">
      {/* 6) Founder Story — YouTube */}
      <motion.section
        id="youtube"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="relative px-6 py-16 md:py-20 bg-gradient-to-br from-violet-50 via-sky-50 to-amber-50 scroll-mt-24"
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-300 via-violet-400 to-amber-300" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-300 via-violet-400 to-amber-300" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-200 text-[10px] font-bold text-violet-600 mb-5 uppercase tracking-widest bg-white">
                <Youtube size={12} className="text-red-500" />
                The Founder&apos;s Diary
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
                Hear the story behind the movement in her own words.
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-6">
                Watch our Founder &amp; CEO share the journey from one denied cup of tea to building an organization that fights for dignity, access, and equality every single day.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-lg shrink-0">
                  <img src={siteImages.foundersDiary} alt="Founder and CEO of Light Upon Light" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold">Founder &amp; CEO</p>
                  <p className="text-slate-500 text-sm">Light Upon Light</p>
                </div>
              </div>

              <a
                href="https://www.youtube.com/@TheFoundersDiary24"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-colors shadow-md shadow-red-200/60"
              >
                <Youtube size={18} />
                Visit YouTube Channel
              </a>
            </div>

            <div className="rounded-[1.75rem] p-[3px] bg-gradient-to-br from-sky-200 via-violet-200 to-amber-200 shadow-xl shadow-violet-200/40">
              <div className="rounded-[1.6rem] overflow-hidden bg-white aspect-video">
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube.com/embed/rZTNZ8mUCxY"
                  title="Light Upon Light YouTube"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      </div>
      <div className="bg-white h-10 md:h-14" aria-hidden="true" />

      {/* 7) Our Approach */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Our Approach</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Creating Lasting Change Takes
              <br />
              <span className="text-sky-500">All of Us.</span>
            </h2>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-500">
              How We Create Change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {APPROACH.map((item) => {
              const accent = approachAccent[item.accent];
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
                >
                  <div className={`h-1.5 w-full ${accent.stripe}`} />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent.icon}`}>
                        <Icon size={20} strokeWidth={2.25} />
                      </div>
                      <span className={`text-[11px] font-black tracking-[0.2em] uppercase ${accent.label}`}>
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 8) FAQ */}
      <section
        id="faq"
        className="px-6 py-20 bg-[#eef5ff] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex lg:items-stretch lg:gap-16">
            <aside className="mb-10 lg:mb-0 lg:w-[38%] lg:max-w-md lg:shrink-0">
              <div className="lg:sticky lg:top-32 xl:top-36 z-10 bg-[#eef5ff] lg:pb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-200 text-[10px] font-bold text-amber-700 mb-4 uppercase tracking-widest bg-amber-50">
                  <CircleHelp size={12} />
                  FAQ
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                  Clear answers about who we are, who we serve, and how you can be part of the movement.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Still have questions?{" "}
                  <a
                    href="mailto:lightuponlight1408@gmail.com"
                    className="font-bold text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Email us
                  </a>{" "}
                  or call{" "}
                  <a href="tel:2067660884" className="font-bold text-purple-600 hover:text-purple-700 transition-colors">
                    206-766-0884
                  </a>
                  .
                </p>
              </div>
            </aside>

            <div className="lg:flex-1 min-w-0 space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <article
                    key={item.question}
                    className={`rounded-2xl border transition-colors ${
                      isOpen ? "border-purple-200 bg-purple-50/40 shadow-sm" : "border-gray-100 bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base md:text-lg font-bold text-gray-900 leading-snug">{item.question}</span>
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-purple-500 mt-0.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 space-y-4">
                        <p className="text-gray-600 leading-relaxed text-[15px]">{item.answer}</p>
                        {"detail" in item && item.detail && (
                          <div className="rounded-xl bg-white border border-violet-100 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500 mb-2">
                              {item.detail.title}
                            </p>
                            <div className="flex gap-2 items-start">
                              <MapPin size={16} className="text-sky-500 shrink-0 mt-0.5" />
                              <div>
                                {item.detail.lines.map((line) => (
                                  <p key={line} className="text-slate-800 text-sm font-semibold leading-relaxed">
                                    {line}
                                  </p>
                                ))}
                              </div>
                            </div>
                            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                              {item.detail.note}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 9) Join the Movement */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-6 py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 text-[10px] font-bold text-purple-600 mb-4 uppercase tracking-widest bg-purple-50">
                <HeartHandshake size={12} />
                Get Involved
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Join the Movement
              </h2>
              <p className="text-gray-500 font-medium max-w-xl mt-3">
                There are many ways to stand with differently-abled individuals and help the light reach further.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GET_INVOLVED.map((item) => (
              <Link key={item.title} to={item.to} className="group block h-full">
                <article className="h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{item.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 group-hover:gap-3 transition-all">
                      {item.cta}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer topPaddingClass="pt-24" />
    </div>
  );
}
