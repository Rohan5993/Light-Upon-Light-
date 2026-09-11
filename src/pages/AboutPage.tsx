import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
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
  Linkedin,
  Facebook,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { PAGE_SEO } from "../data/seo";
import { siteImages } from "../assets/siteImages";
import { resolveMediaUrl } from "../lib/publicUrl";
import storyCoverImage from "../assets/images/ourstory.webp";
import boardMember8793 from "../assets/board-members/IMG_8793.webp";
import boardMember8990 from "../assets/board-members/IMG_8990.webp";
import boardMember9354 from "../assets/board-members/IMG_9354.webp";
import boardMember9397 from "../assets/board-members/IMG_9397.webp";
import boardMember9405 from "../assets/board-members/IMG_9405.webp";

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

const BOARD_MEMBERS: {
  name: string;
  designation: string;
  image: string;
  blurb: string[];
  linkedin?: string;
  facebook?: string;
}[] = [
  {
    name: "Megan Brown",
    designation: "Treasurer",
    image: boardMember9354,
    blurb: [
      "Megan Brown is an entrepreneur and business leader with experience in operations, sales, product development, project management, and marketing. She is the founder of Alida's Bakery, which she grew from a garage-based startup into a successful retail bakery and wholesale distribution business.",
      "Her professional background also includes sales, marketing, client relations, and writing, giving her a broad understanding of both business operations and organizational growth. As Light Upon Light's Board Treasurer, Megan helps provide financial oversight, support responsible financial planning, and guide the organization toward sustainable growth as we continue expanding our programs and impact.",
    ],
    linkedin: "https://www.linkedin.com/in/megan-b-zebari",
  },
  {
    name: "William Phillips",
    designation: "Strategic Partnerships & Business Development",
    image: boardMember8990,
    blurb: [
      "William Phillips is an entrepreneur and business leader with more than 25 years of experience in supply chain, logistics, operations, and business development. He is the founder of W Phillips Enterprises and has extensive experience building relationships and developing opportunities across the private and public sectors.",
      "As Light Upon Light's Board Member — Strategic Partnerships & Business Development, William helps cultivate strategic relationships, identify partnership opportunities, and strengthen connections with businesses, foundations, and philanthropic organizations. His experience and relationship-building expertise support Light Upon Light's continued growth and help expand the resources and partnerships behind our mission.",
    ],
    linkedin: "https://www.linkedin.com/in/william-phillips-53834718b",
  },
  {
    name: "Meenakshi “Meena” Das",
    designation: "Accessibility & Technology Advisor",
    image: boardMember9397,
    blurb: [
      "Meenakshi “Meena” Das is a software engineer at Microsoft, disability advocate, and accessibility thought leader working at the intersection of technology, accessibility, and inclusion. She combines her technical expertise and lived experience to help create more accessible products, workplaces, and communities.",
      "Meena has been recognized as a Disability:IN NextGen Leader of the Year, a Stevie Social Change Maker of the Year, a University of Washington DO-IT Trailblazer, and an inductee into the Susan M. Daniels Disability Mentoring Hall of Fame. As Light Upon Light's Accessibility & Technology Advisor, she brings her expertise to strengthening accessibility across our programs, technology, and organizational work.",
    ],
    linkedin: "https://www.linkedin.com/in/meena11",
  },
  {
    name: "Sarah Bekins Tompkins",
    designation: "Community Outreach & Participant Engagement",
    image: boardMember9405,
    blurb: [
      "Sarah Bekins Tompkins is a rare disease advocate and community leader with extensive experience in advocacy, public engagement, and elevating the perspectives of people with lived experience. Her work includes serving on the boards of the Northwest Rare Disease Coalition and Connective Strength, as well as contributing as a consumer reviewer for the Congressionally Directed Medical Research Programs and as a PCORI Ambassador.",
      "As Light Upon Light's Board Director — Community Outreach & Participant Engagement, Sarah helps strengthen relationships with the communities we serve, engage participants in our programs, and ensure their experiences and perspectives remain an important part of our work.",
    ],
    linkedin: "https://www.linkedin.com/in/sarah-bekins-tompkins-a6663b160",
  },
  {
    name: "Dr. Muhammad Salah",
    designation: "Communications & Outreach",
    image: boardMember8793,
    blurb: [
      "Dr. Muhammad Salah is an internationally recognized educator, scholar, speaker, and media professional with decades of experience connecting with audiences around the world. He holds a PhD in Comparative Fiqh, a degree in Shari'ah and Islamic Law from Al-Azhar University, and a bachelor's degree in pharmacology.",
      "Throughout his career, he has taught at universities and educational institutions and produced more than 1,500 hours of television and educational programming. As Light Upon Light's Board Director — Communications & Outreach, Dr. Salah brings his extensive experience in media, public speaking, and community engagement to help share our story, spread our mission, and expand awareness of our work.",
    ],
    facebook: "https://www.facebook.com/share/1BpUEkJX8t/?mibextid=wwXIfr",
  },
];

const GET_INVOLVED = [
  {
    title: "Donate",
    desc: "Fund advocacy, accessibility, and programs that open real doors for differently-abled people.",
    to: "/donate",
    cta: "Give Today",
    image: siteImages.getInvolvedDonate,
  },
  {
    title: "Explore Programs",
    desc: "See how we turn compassion into action through education, wellness, and community support.",
    to: "/programs",
    cta: "View Programs",
    image: siteImages.getInvolvedExplorePrograms,
  },
  {
    title: "Read Our Stories",
    desc: "Follow updates, insights, and voices from the communities we serve every day.",
    to: "/blog",
    cta: "Read Stories",
    image: siteImages.getInvolvedReadOurStories,
  },
];

export default function AboutPage() {
  const { hash } = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [flippedBoard, setFlippedBoard] = useState<number | null>(null);
  const storyVideoRef = useRef<HTMLVideoElement>(null);
  const [showStoryCover, setShowStoryCover] = useState(true);
  const [storyVideoSrc, setStoryVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const loadVideo = () => {
      void import("../assets/lul.mp4").then((mod) => {
        if (!cancelled) setStoryVideoSrc(mod.default);
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadVideo, { timeout: 4000 });
    } else {
      timeoutId = setTimeout(loadVideo, 1500);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const video = storyVideoRef.current;
    if (!video || !storyVideoSrc) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = false;

    let coverTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const clearCoverTimer = () => {
      if (coverTimer) {
        clearTimeout(coverTimer);
        coverTimer = null;
      }
    };

    const showCoverThenPlay = () => {
      if (cancelled) return;
      clearCoverTimer();
      video.pause();
      setShowStoryCover(true);
      coverTimer = setTimeout(() => {
        if (cancelled) return;
        setShowStoryCover(false);
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 3000);
    };

    const handleEnded = () => {
      showCoverThenPlay();
    };

    video.addEventListener("ended", handleEnded);
    showCoverThenPlay();

    return () => {
      cancelled = true;
      clearCoverTimer();
      video.removeEventListener("ended", handleEnded);
      video.pause();
    };
  }, [storyVideoSrc]);

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
    <>
      <Seo {...PAGE_SEO.about} includeOrganizationSchema />
      <Header variant="dark" />
      <div className="relative bg-white min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)] selection:bg-purple-100 font-sans flex flex-col overflow-x-hidden">

      {/* 1) Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="px-4 sm:px-6 pt-10 pb-12 sm:pb-16 relative overflow-hidden"
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
            <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl">
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
        className="px-4 sm:px-6 py-14 sm:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-br from-violet-50 via-sky-50 to-amber-50 border border-violet-100 p-6 md:p-10 lg:p-14">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full">
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

            <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-none">
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white h-[20rem] sm:h-[24rem] lg:h-[30rem] bg-slate-900">
                <video
                  ref={storyVideoRef}
                  src={storyVideoSrc ?? undefined}
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover object-center"
                  aria-label="Light Upon Light origin story"
                />
                <img
                  src={storyCoverImage}
                  alt="Light Upon Light our story"
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                    showStoryCover ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
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
        className="px-4 sm:px-6 py-14 sm:py-20 bg-[#FAFCFF]"
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
        className="px-4 sm:px-6 py-14 sm:py-20 bg-[#f8f5ff]"
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

      {/* 6) Our Approach */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="px-4 sm:px-6 py-14 sm:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500 mb-3">How We Create Change</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Creating Lasting Change Takes
              <br />
              <span className="text-sky-500">All of Us.</span>
            </h2>
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

      {/* 7) Our Board Members */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="relative px-4 sm:px-6 py-16 sm:py-24 overflow-hidden bg-white"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 8% 20%, rgba(113,7,231,0.06) 0%, transparent 50%), radial-gradient(ellipse at 92% 80%, rgba(56,189,248,0.07) 0%, transparent 48%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4">
                Leadership
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-[-0.04em] leading-[1.05]">
                Our Board
                <span className="block text-slate-300">Members</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-md lg:text-right">
              Guiding Light Upon Light with lived experience, care, and a commitment to dignity for every differently-abled individual.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {BOARD_MEMBERS.map((member, index) => {
              const isFlipped = flippedBoard === index;
              return (
              <motion.article
                key={`${member.image}-${index}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group [perspective:1200px]"
              >
                <div
                  className={`relative aspect-square w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-2xl bg-slate-200 [backface-visibility:hidden]">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.designation}`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    <button
                      type="button"
                      onClick={() => setFlippedBoard(isFlipped ? null : index)}
                      className="absolute inset-0 z-0"
                      aria-label={`${isFlipped ? "Hide" : "Show"} blurb for ${member.name}`}
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4 pointer-events-none">
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-normal sm:tracking-[0.06em] leading-tight text-white/90">
                        {member.designation}
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7107E7] to-[#4c05a0] p-3 sm:p-4 flex flex-col text-white [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setFlippedBoard(isFlipped ? null : index)}
                      className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 space-y-2.5 text-left"
                      aria-label={`Hide blurb for ${member.name}`}
                    >
                      {member.blurb.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)} className="text-[11px] sm:text-xs font-medium leading-relaxed text-white/95">
                          {paragraph}
                        </p>
                      ))}
                    </button>
                  </div>
                </div>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center justify-center gap-1.5 w-full rounded-full border border-slate-200 bg-white py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin size={13} />
                    LinkedIn
                  </a>
                )}
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center justify-center gap-1.5 w-full rounded-full border border-slate-200 bg-white py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
                    aria-label={`${member.name} on Facebook`}
                  >
                    <Facebook size={13} />
                    Facebook
                  </a>
                )}
              </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 8) FAQ */}
      <section
        id="faq"
        className="px-4 sm:px-6 py-14 sm:py-20 bg-[#eef5ff] scroll-mt-24"
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
        className="px-4 sm:px-6 py-14 sm:py-20 bg-white"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {GET_INVOLVED.map((item) => (
              <Link key={item.title} to={item.to} className="group block h-full">
                <article className="h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={resolveMediaUrl(item.image)}
                      alt={item.title}
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

      <Footer topPaddingClass="pt-[42px] md:pt-[50px]" />
    </div>
    </>
  );
}
