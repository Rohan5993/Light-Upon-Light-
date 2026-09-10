import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Header from "../components/Header";
import Seo from "../components/Seo";
import { PAGE_SEO } from "../data/seo";
import Footer from "../components/Footer";
import { buildCalComEmbedUrl } from "../data/booking";

export default function AppointmentPage() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const email = searchParams.get("email") ?? "";

  const embedUrl = useMemo(
    () => buildCalComEmbedUrl({ name, email }),
    [name, email],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo {...PAGE_SEO.appointment} />
      <Header variant="dark" />
      <div className="relative bg-white min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)] selection:bg-purple-100 font-sans flex flex-col overflow-x-hidden">
        <section className="relative px-4 sm:px-6 pt-10 pb-8 sm:pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E0F2FE] via-white to-[#F3E8FF]" />
          <div className="relative max-w-5xl mx-auto">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#7107E7] transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Back to Contact
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7107E7] mb-4 inline-flex items-center gap-2">
                <CalendarDays size={14} />
                Book an Appointment
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.03em] mb-3">
                Choose a time that works for you.
              </h1>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
                Pick a slot below and we will confirm your appointment. If you need to send a written message instead, you can return to the contact form anytime.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="max-w-5xl mx-auto rounded-2xl sm:rounded-[1.75rem] overflow-hidden border border-slate-100 bg-[#F7FBFF] shadow-sm max-w-full">
            <iframe
              title="Book an appointment with Light Upon Light"
              src={embedUrl}
              className="w-full min-h-[560px] sm:min-h-[720px] md:min-h-[820px] border-0 bg-white"
              loading="lazy"
              allow="camera; microphone; fullscreen"
            />
          </div>
        </section>

        <Footer topPaddingClass="pt-[50px]" />
      </div>
    </>
  );
}
