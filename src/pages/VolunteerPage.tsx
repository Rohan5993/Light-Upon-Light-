import { useEffect, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarHeart,
  HandHeart,
  Megaphone,
  Users,
  Handshake,
  Clock3,
} from "lucide-react";
import Header from "../components/Header";
import Seo from "../components/Seo";
import { PAGE_SEO } from "../data/seo";
import Footer from "../components/Footer";
import { siteImages } from "../assets/siteImages";
import {
  submitVolunteerApplication,
} from "../services/volunteerService";

const OPPORTUNITIES = [
  {
    title: "Event & Program Support",
    desc: "Help bring our programs to life by supporting community events, workshops, resource drives, and activities that directly serve differently-abled individuals, their families, and the broader community.",
    icon: CalendarHeart,
    accent: "violet" as const,
  },
  {
    title: "Advocacy & Public Education",
    desc: "Help educate the public, raise awareness, and encourage conversations that promote dignity, accessibility, and inclusion.",
    icon: Megaphone,
    accent: "sky" as const,
  },
  {
    title: "Mentorship & Companionship",
    desc: "Build meaningful relationships by offering encouragement, friendship, and support to differently-abled individuals and their families.",
    icon: HandHeart,
    accent: "amber" as const,
  },
  {
    title: "Community Partnerships",
    desc: "Represent Light Upon Light at schools, businesses, community events, and local organizations while helping expand our impact.",
    icon: Users,
    accent: "violet" as const,
  },
];

const OPPORTUNITY_ACCENT = {
  violet: {
    card: "bg-[#FBFAFF] border-violet-100",
    icon: "bg-white text-[#7107E7] ring-violet-100",
    number: "text-[#7107E7]",
  },
  sky: {
    card: "bg-[#F7FBFF] border-sky-100",
    icon: "bg-white text-[#38BDF8] ring-sky-100",
    number: "text-[#38BDF8]",
  },
  amber: {
    card: "bg-[#FFFDF5] border-amber-100",
    icon: "bg-white text-amber-500 ring-amber-100",
    number: "text-amber-500",
  },
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
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [availability, setAvailability] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      await submitVolunteerApplication({
        name,
        email,
        phone,
        interest,
        availability,
        message,
      });

      setSubmitSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setInterest("");
      setAvailability("");
      setMessage("");
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Something went wrong.";
      setSubmitError(
        `${detail} Please try again, or email us at lightuponlight1408@gmail.com.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo {...PAGE_SEO.volunteer} />
      <Header variant="dark" />
      <div className="relative bg-white min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)] selection:bg-purple-100 font-sans flex flex-col overflow-x-hidden">

        <section className="relative px-4 sm:px-6 pt-10 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3E8FF] via-white to-[#E0F2FE]" />
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 min-w-0"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-5">
                Volunteer
              </p>
              <h1 className="text-[1.75rem] sm:text-[2.15rem] md:text-[2.75rem] lg:text-[3.15rem] font-bold text-slate-900 tracking-[-0.04em] leading-[1.08] mb-6">
                Your Time Can Change
                <span className="block text-[#7107E7]">Someone&apos;s World.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed max-w-xl mb-8">
                Join the Light Upon Light movement and become part of a family dedicated to creating a future where differently-abled people are valued, included, and given the same opportunities as everyone else. Every act of service helps create lasting change.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#7107E7] text-white font-bold text-sm hover:bg-[#5c06bb] transition-colors"
                >
                  Complete the Volunteer Form
                  <ArrowRight size={16} />
                </a>
                <Link
                  to="/programs"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:border-[#7107E7] hover:text-[#7107E7] transition-colors"
                >
                  Explore Programs
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 min-w-0"
            >
              <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden aspect-[4/3] ring-1 ring-slate-200/70">
                <img
                  src={siteImages.volunteerHero}
                  alt="Light Upon Light community and volunteers together outdoors"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-10 md:mb-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4">
                Ways to Help
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.03em] leading-tight mb-4">
                Find a Role That Fits Your Gifts.
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Whether you have a few hours each month or want to make a long-term commitment, there&apos;s a meaningful place for you in the Light Upon Light family.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {OPPORTUNITIES.map((item, index) => {
                const Icon = item.icon;
                const accent = OPPORTUNITY_ACCENT[item.accent];
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className={`rounded-2xl sm:rounded-[1.5rem] border p-6 sm:p-7 ${accent.card}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ring-1 ${accent.icon}`}>
                        <Icon size={22} />
                      </div>
                      <span className={`text-[11px] font-bold tracking-[0.22em] ${accent.number}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-14 sm:py-20 bg-[#F7FBFF]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-10 md:mb-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#38BDF8] mb-4">
                Get started
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.03em] leading-tight">
                Three Simple Steps to Join the Movement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {STEPS.map((step, index) => (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative rounded-2xl bg-white border border-slate-100 p-6 sm:p-7"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#7107E7] text-white text-sm font-bold mb-5">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{step.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="register" className="px-4 sm:px-6 py-14 sm:py-20 bg-[#FBFAFF] scroll-mt-28">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4">
                Volunteer Form
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.03em] mb-3">
                Complete the Volunteer Form
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Tell us a little about yourself and why you&apos;d like to volunteer with Light Upon Light.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl sm:rounded-[1.75rem] bg-white border border-slate-100 p-5 sm:p-7 md:p-9 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
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
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="volunteer-phone" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Phone
                  </label>
                  <input
                    id="volunteer-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
                  />
                </div>
                <div>
                  <label htmlFor="volunteer-availability" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Availability
                  </label>
                  <select
                    id="volunteer-availability"
                    required
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 bg-white"
                  >
                    <option value="">Select an option</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Evenings">Evenings</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
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
                  Why do you want to volunteer?
                </label>
                <textarea
                  id="volunteer-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 resize-none"
                  placeholder="Share a little about yourself and why you'd like to volunteer..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#7107E7] text-white font-bold text-sm py-3.5 hover:bg-[#5c06bb] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Handshake size={16} />
                {isSubmitting ? "Submitting..." : "Submit Volunteer Form"}
                <ArrowRight size={16} />
              </button>
              {submitSuccess && (
                <p className="text-sm text-emerald-600 font-medium text-center">
                  Thank you! Your volunteer application was received. We&apos;ll be in touch soon.
                </p>
              )}
              {submitError && (
                <p className="text-sm text-red-600 font-medium text-center">
                  {submitError}
                </p>
              )}
              <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
                <Clock3 size={13} />
                We typically respond within few hours.
              </p>
            </form>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-10 sm:py-14 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-gradient-to-br from-[#F3E8FF] to-[#E0F2FE] border border-violet-100 px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-[-0.03em] mb-3">
                  Explore Our Programs
                </h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Discover the programs your time and talents will help bring to life, and see the impact you&apos;ll make in the lives of the people we serve.
                </p>
              </div>
              <Link
                to="/programs"
                className="inline-flex items-center justify-center gap-2 shrink-0 px-7 py-3.5 rounded-full bg-[#7107E7] text-white font-bold text-sm hover:bg-[#5c06bb] transition-colors"
              >
                Explore
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <Footer topPaddingClass="pt-[50px]" />
      </div>
    </>
  );
}
