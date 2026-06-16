import { motion } from "motion/react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { PROGRAMS } from "../data/programs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";


export default function ProgramsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white min-h-screen selection:bg-purple-100 font-sans flex flex-col">
      <Header variant="dark" />
      {/* Subtle Vertical Lines Background */}
      <div className="absolute inset-0 flex pointer-events-none opacity-[0.03]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-full flex-1 border-r border-black" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6">
        <div className="mb-16">
          <div className="flex flex-col">

            <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest bg-white">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              Impactful Initiatives
            </div>
            <h1 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-bold text-gray-900 tracking-tight leading-tight">
              Our Radiant Programs
            </h1>
            <p className="text-xl text-gray-500 font-medium mt-6 max-w-3xl">
              Explore our diverse range of programs designed to empower communities, foster health, and ignite hope through sustainable action.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROGRAMS.map((program, i) => (
            <Link
              key={program.id}
              to={`/programs/${program.id}`}
              className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full"
              >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={program.img}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-purple-600 border border-white/20 text-[10px] uppercase tracking-wider font-black shadow-lg">
                    {program.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-purple-400" />
                    {program.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-purple-400" />
                    {program.location}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {program.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed mb-8 flex-1">
                  {program.desc}
                </p>
                
                <span className="inline-flex items-center gap-2 text-gray-900 font-black uppercase text-[10px] tracking-widest hover:text-purple-600 group/btn transition-all hover:gap-3">
                  View Program Details
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </span>
              </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <Footer className="mt-20 pb-10" topPaddingClass="pt-[80px]" />
    </div>
  );
}

