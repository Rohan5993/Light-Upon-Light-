import { useEffect, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarHeart,
  HandHeart,
  Megaphone,
  Users,
  HeartHandshake,
  Mail,
  Phone,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteImages } from "../assets/siteImages";

const OPPORTUNITIES = [
  {
    title: "Event & Program Support",
    desc: "Help bring our programs to life by supporting community events, workshops, resource drives, and activities that directly serve differently-abled individuals, their families, and the broader community.",
    icon: CalendarHeart,
    accent: "sky" as const,
  },
  {
    title: "Advocacy & Public Education",
    desc: "Help educate the public, raise awareness, and encourage conversations that promote dignity, accessibility, and inclusion.",
    icon: Megaphone,
    accent: "amber" as const,
  },
  {
    title: "Mentorship & Companionship",
    desc: "Build meaningful relationships by offering encouragement, friendship, and support to differently-abled individuals and their families.",
    icon: HandHeart,
    accent: "violet" as const,
  },
  {
    title: "Community Partnerships",
    desc: "Represent Light Upon Light at schools, businesses, community events, and local organizations while helping expand our impact.",
    icon: Users,
    accent: "violet" as const,
  },
];

const opportunityAccent = {
  sky: { icon: "bg-sky-100 text-sky-600", border: "border-sky-100", stripe: "bg-sky-400" },
  violet: { icon: "bg-violet-100 text-violet-600", border: "border-violet-100", stripe: "bg-violet-500" },
  amber: { icon: "bg-amber-100 text-amber-700", border: "border-amber-100", stripe: "bg-amber-400" },
};

const STEPS = [
  {
    title: "Complete the Volunteer Form",
    desc: "Tell us a little about yourself and why you'd like to volunteer with Light Upon Light.",
  },
  {
    title: "Meet With Our Team",
    desc: "We'll schedule a brief in-person or virtual meeting to get to know you, discuss your interests and availability, and answer any questions you may have.",
  },
  {
    title: "Find Your Place & Make a Difference",
    desc: "We'll connect you with the volunteer opportunity that's the best fit for you. Then you'll become part of the Light Upon Light family and start making a meaningful impact.",
  },
];

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent("Volunteer Inquiry — Light Upon Light");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}`,
    );
    window.location.href = `mailto:lightuponlight1408@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative bg-white min-h-screen selection:bg-purple-100 font-sans flex flex-col">
      <Header variant="dark" />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-6 pt-10 pb-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-sky-50" />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest bg-white">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Volunteer
            </div>
            <h1 className="text-[1.875rem] sm:text-[2.5rem] md:text-[3rem] font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Your Time Can Change Someone&apos;s World.
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
              Join the Light Upon Light movement and become part of a family dedicated to creating a future where differently-abled people are valued, included, and given the same opportunities as everyone else. Every act of service helps create lasting change.
            </p>
          </div>
          <div className="rounded-[2rem] p-[3px] bg-gradient-to-br from-sky-200 via-violet-200 to-amber-200 shadow-lg">
            <div className="rounded-[1.85rem] overflow-hidden aspect-[4/3]">
              <img
                src={siteImages.wheelchairMeeting}
                alt="Light Upon Light volunteers at a community event"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Opportunities */}
      <section className="px-6 py-20 bg-[#FAFCFF]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500 mb-3">Ways to Help</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Find a Role That Fits Your Gifts.
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Whether you have a few hours each month or want to make a long-term commitment, there&apos;s a meaningful place for you in the Light Upon Light family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OPPORTUNITIES.map((item) => {
              const accent = opportunityAccent[item.accent];
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`flex gap-5 rounded-2xl bg-white border ${accent.border} p-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
                >
                  <div className={`w-1 shrink-0 rounded-full self-stretch ${accent.stripe}`} />
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${accent.icon}`}>
                    <Icon size={22} strokeWidth={2.25} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works + form */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Get Started</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              Three Simple Steps to Join the Movement
            </h2>
            <ol className="space-y-5 mb-10">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-slate-900 font-bold leading-snug mb-1">{step.title}</p>
                    <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6 space-y-4">
              <p className="text-sm font-bold text-slate-800">Prefer to reach out directly?</p>
              <a
                href="mailto:lightuponlight1408@gmail.com"
                className="flex items-center gap-3 text-slate-600 hover:text-violet-600 transition-colors text-sm font-medium"
              >
                <Mail size={18} className="text-violet-500 shrink-0" />
                lightuponlight1408@gmail.com
              </a>
              <a
                href="tel:2067660884"
                className="flex items-center gap-3 text-slate-600 hover:text-violet-600 transition-colors text-sm font-medium"
              >
                <Phone size={18} className="text-violet-500 shrink-0" />
                206-766-0884
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] p-[3px] bg-gradient-to-br from-sky-200 via-violet-200 to-amber-200 shadow-[0_12px_48px_rgba(139,92,246,0.1)]">
            <form
              onSubmit={handleSubmit}
              className="rounded-[calc(2rem-3px)] bg-white p-7 md:p-8 space-y-5"
            >
              <div className="flex items-center gap-2 mb-1">
                <HeartHandshake size={18} className="text-violet-500" />
                <h3 className="text-xl font-bold text-slate-900">Volunteer interest form</h3>
              </div>
              <p className="text-sm text-slate-500 font-medium -mt-2">
                Share a little about yourself and we&apos;ll be in touch.
              </p>

              <div>
                <label htmlFor="volunteer-name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Full name
                </label>
                <input
                  id="volunteer-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
                />
              </div>

              <div>
                <label htmlFor="volunteer-email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Email
                </label>
                <input
                  id="volunteer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
                />
              </div>

              <div>
                <label htmlFor="volunteer-interest" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Area of interest
                </label>
                <select
                  id="volunteer-interest"
                  required
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 bg-white"
                >
                  <option value="">Select an option</option>
                  {OPPORTUNITIES.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="volunteer-message" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="volunteer-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 resize-none"
                  placeholder="Tell us about your availability and what draws you to this mission..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#990FFA] text-white font-bold text-sm py-3.5 hover:bg-[#8800e0] transition-colors"
              >
                Send Volunteer Inquiry
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-br from-violet-50 via-sky-50 to-amber-50 border border-violet-100 p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Explore Our Programs</h2>
            <p className="text-slate-600 font-medium max-w-lg">
              Discover the programs your time and talents will help bring to life, and see the impact you&apos;ll make in the lives of the people we serve.
            </p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center justify-center gap-2 shrink-0 px-6 py-3 rounded-full bg-[#990FFA] text-white font-bold text-sm hover:bg-[#8800e0] transition-colors group"
          >
            Explore Programs
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer topPaddingClass="pt-24" />
    </div>
  );
}
