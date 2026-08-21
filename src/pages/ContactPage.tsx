import { useEffect, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail, MapPin, Phone, Send, Instagram, Facebook, Linkedin, Youtube, Music2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteImages } from "../assets/siteImages";
import { SOCIAL_LINKS } from "../data/socialLinks";

const SOCIAL_ICONS = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  TikTok: Music2,
} as const;

const ADDRESS = "16305 NE 87th St, Redmond, WA 98052";
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=15&output=embed`;

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "lightuponlight1408@gmail.com",
    href: "mailto:lightuponlight1408@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "206-766-0884",
    href: "tel:2067660884",
    icon: Phone,
  },
  {
    label: "Address",
    value: "Together Center, 16305 NE 87th St, Redmond, WA 98052",
    href: `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`,
    icon: MapPin,
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(subject || "Contact — Light Upon Light");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:lightuponlight1408@gmail.com?subject=${mailSubject}&body=${body}`;
  };

  return (
    <>
      <Header variant="dark" />
      <div className="relative bg-white min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)] selection:bg-purple-100 font-sans flex flex-col overflow-x-hidden">

        <section className="relative px-4 sm:px-6 pt-10 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E0F2FE] via-white to-[#F3E8FF]" />
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-5">
                Contact Us
              </p>
              <h1 className="text-[1.875rem] sm:text-[2.6rem] md:text-[3.15rem] font-bold text-slate-900 tracking-[-0.04em] leading-[1.08] mb-6">
                We would love to
                <span className="block text-[#38BDF8]">hear from you.</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                Whether you want to volunteer, partner, bring a program to your school, or simply ask a question, reach out. A real person on our team will get back to you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden aspect-[16/10] ring-1 ring-slate-200/70">
                <img
                  src={siteImages.ourStory}
                  alt="Light Upon Light community"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-6 min-w-0">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4">
                  Get in touch
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.03em] mb-4">
                  Let&apos;s start a conversation.
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Based in the Greater Seattle Area, with programs and community events at our Redmond location.
                </p>
              </div>

              <div className="space-y-3">
                {CONTACT_DETAILS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.label === "Address" ? "_blank" : undefined}
                      rel={item.label === "Address" ? "noopener noreferrer" : undefined}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-[#FBFAFF] p-5 hover:border-violet-200 transition-colors"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white text-[#7107E7] flex items-center justify-center shrink-0 ring-1 ring-violet-100">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">
                          {item.label}
                        </p>
                        <p className="text-slate-800 font-semibold text-sm leading-relaxed break-words">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                  Follow us
                </p>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((item) => {
                    const Icon = SOCIAL_ICONS[item.label];
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="w-11 h-11 rounded-full bg-[#FBFAFF] border border-slate-100 text-[#7107E7] flex items-center justify-center hover:bg-[#7107E7] hover:text-white hover:border-[#7107E7] transition-colors"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 min-w-0 rounded-2xl sm:rounded-[1.75rem] bg-[#F7FBFF] border border-slate-100 p-5 sm:p-7 md:p-9 space-y-5"
            >
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Send a message</h3>
                <p className="text-sm text-slate-500 font-medium mt-2">
                  Share a little context and we will reply as soon as we can.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
                  placeholder="Partnership, programs, volunteering..."
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#7107E7] text-white font-bold text-sm py-3.5 hover:bg-[#5c06bb] transition-colors"
              >
                <Send size={16} />
                Send Message
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-16 sm:pb-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#38BDF8] mb-3">
                  Find us
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-[-0.03em]">
                  Redmond, Washington
                </h2>
              </div>
              <p className="text-slate-500 font-medium text-sm md:text-right max-w-md">
                Together Center · 16305 NE 87th St, Redmond, WA 98052
              </p>
            </div>
            <div className="rounded-2xl sm:rounded-[1.75rem] overflow-hidden ring-1 ring-slate-200/80 aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-slate-100">
              <iframe
                title="Light Upon Light location in Redmond, Washington"
                src={MAP_SRC}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <Footer topPaddingClass="pt-10" />
      </div>
    </>
  );
}
