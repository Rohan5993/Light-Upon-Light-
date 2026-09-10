import { motion } from "motion/react";
import { Calendar, MapPin, House, ChevronRight, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PROGRAMS, type ProgramCta } from "../data/programs";
import { useEffect } from "react";
import Header from "../components/Header";
import Seo from "../components/Seo";
import Footer from "../components/Footer";
import { resolveMediaUrl } from "../lib/publicUrl";
import HoverFillLink from "../components/HoverFillLink";

function CtaLink({
  cta,
  variant,
}: {
  cta: ProgramCta;
  variant: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-colors"
      : "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-white border border-violet-200 text-slate-800 font-bold text-sm hover:bg-violet-50 transition-colors";

  if (cta.external) {
    return (
      <a href={cta.to} className={className}>
        {cta.label}
        <ArrowRight size={16} />
      </a>
    );
  }

  return (
    <Link to={cta.to} className={className}>
      {cta.label}
      <ArrowRight size={16} />
    </Link>
  );
}

export default function ProgramDetailPage() {
  const { id } = useParams();
  const program = PROGRAMS.find((p) => p.id === id);
  const programIndex = PROGRAMS.findIndex((p) => p.id === id);
  const nextProgram = PROGRAMS[(programIndex + 1) % PROGRAMS.length];
  const prevProgram =
    PROGRAMS[(programIndex - 1 + PROGRAMS.length) % PROGRAMS.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center bg-white">
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Program Not Found</h2>
          <p className="text-gray-500 mb-8">The program you are looking for does not exist.</p>
          <HoverFillLink to="/programs" variant="purple" className="px-8 py-3 font-bold">
            Back to Programs
          </HoverFillLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${program.title} | Light Upon Light`}
        description={`${program.title} is a Light Upon Light program advancing advocacy, accessibility, education, and equality for differently-abled people.`}
        path={`/programs/${program.id}`}
      />
      <Header variant="dark" />
      <div className="relative bg-white min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)] selection:bg-purple-100 font-sans flex flex-col overflow-x-hidden">

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 mb-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500 font-medium">
          <Link to="/" className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors">
            <House size={16} />
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link to="/programs" className="hover:text-slate-800 transition-colors">
            Programs
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-800 font-semibold line-clamp-1">{program.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-[10px] font-bold text-violet-600 uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {program.tag}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                {program.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-8 max-w-xl">
                {program.headline}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Calendar size={16} className="text-violet-500" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Schedule</p>
                    <p className="text-sm font-bold text-slate-800">{program.date}</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <MapPin size={16} className="text-sky-500" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Location</p>
                    <p className="text-sm font-bold text-slate-800">{program.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <CtaLink cta={program.ctaPrimary} variant="primary" />
                <CtaLink cta={program.ctaSecondary} variant="secondary" />
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-[2rem] p-[3px] bg-gradient-to-br from-sky-200 via-violet-200 to-amber-200 shadow-[0_12px_48px_rgba(139,92,246,0.12)]">
              <div className="rounded-[1.1rem] sm:rounded-[1.85rem] overflow-hidden aspect-[4/3]">
                <img
                  src={resolveMediaUrl(program.img)}
                  alt={program.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-violet-50/40 to-white pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3 mb-10 md:mb-12">
              <span className="w-10 h-0.5 rounded-full bg-violet-400" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-500">
                About the Program
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-[1.75rem] bg-white/80 backdrop-blur-sm border border-white shadow-[0_8px_40px_rgba(100,80,160,0.06)] p-5 sm:p-8 md:p-12 lg:p-14">
              {/* Lead paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="text-lg md:text-xl lg:text-[1.35rem] text-slate-800 leading-[1.85] font-medium border-l-[3px] border-violet-400 pl-5 md:pl-6 mb-10 md:mb-12"
              >
                {program.paragraphs[0]}
              </motion.p>

              {program.paragraphs.length > 1 && (
                <div className="space-y-0 divide-y divide-slate-100">
                  {program.paragraphs.slice(1).map((paragraph, index) => (
                    <motion.p
                      key={paragraph.slice(0, 48)}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
                      className="text-[1.05rem] text-slate-600 leading-[1.9] py-8 md:py-9 first:pt-0 last:pb-0"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA band */}
      <section className="px-4 sm:px-6 py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-br from-violet-50 via-sky-50 to-amber-50 border border-violet-100 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                Ready to support {program.title}?
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Every action helps Light Upon Light advance advocacy, accessibility, education, and equality for differently-abled individuals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <CtaLink cta={program.ctaPrimary} variant="primary" />
              <CtaLink cta={program.ctaSecondary} variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Next / Prev */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-4">
          <Link
            to={`/programs/${prevProgram.id}`}
            className="group rounded-2xl border border-slate-100 bg-white p-6 hover:border-violet-200 hover:shadow-md transition-all"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Previous</p>
            <p className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
              {prevProgram.title}
            </p>
          </Link>
          <Link
            to={`/programs/${nextProgram.id}`}
            className="group rounded-2xl border border-slate-100 bg-white p-6 hover:border-violet-200 hover:shadow-md transition-all sm:text-right"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Next</p>
            <p className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
              {nextProgram.title}
            </p>
          </Link>
        </div>
      </section>

      <Footer topPaddingClass="pt-[42px] md:pt-[50px]" />
    </div>
    </>
  );
}
