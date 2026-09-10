import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROGRAMS } from "../data/programs";
import Header from "../components/Header";
import Seo from "../components/Seo";
import { PAGE_SEO } from "../data/seo";
import Footer from "../components/Footer";
import { resolveMediaUrl } from "../lib/publicUrl";
import { useEffect } from "react";

const stripeClasses = ["bg-sky-400", "bg-violet-400", "bg-amber-400"] as const;

export default function ProgramsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo {...PAGE_SEO.programs} />
      <Header variant="dark" />
      <div className="relative bg-white min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)] selection:bg-purple-100 font-sans flex flex-col overflow-x-hidden">

      <section className="px-4 sm:px-6 pt-10 pb-14 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-sky-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 text-[10px] font-bold text-violet-600 mb-6 uppercase tracking-widest bg-white">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            Our Radiant Programs
          </div>
          <h1 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-tight max-w-3xl">
            Our Radiant Programs
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-500 font-medium mt-5 max-w-3xl leading-relaxed">
            Every program at Light Upon Light was developed from lived experience to remove barriers, educate society, and build a future where differently-abled people are valued, included, and given the same opportunities as everyone else.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PROGRAMS.map((program, i) => (
            <Link
              key={program.id}
              to={`/programs/${program.id}`}
              className="block rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="group h-full flex flex-col bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <div className={`h-1.5 w-full ${stripeClasses[i % 3]}`} />
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={resolveMediaUrl(program.img)}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-violet-600 border border-white text-[10px] uppercase tracking-wider font-bold shadow-sm">
                      {program.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1.5 group-hover:text-violet-600 transition-colors leading-snug">
                    {program.title}
                  </h3>
                  <p className="text-slate-800 font-semibold text-sm leading-snug mb-2">
                    {program.headline}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {program.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-violet-600 group-hover:gap-3 transition-all">
                    Learn about this program
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>

      <Footer className="mt-4" topPaddingClass="pt-[42px] md:pt-[50px]" />
    </div>
    </>
  );
}
