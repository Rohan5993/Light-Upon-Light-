import { motion } from "motion/react";
import { Calendar, MapPin, HandHeart, Users, Download, House, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PROGRAMS } from "../data/programs";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function ProgramDetailPage() {
  const { id } = useParams();
  const program = PROGRAMS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const buildSharePayload = () => {
    const pageUrl = window.location.href;
    const caption = `Support ${program?.title} by Light Upon Light.\n\n${program?.desc}\n\nLearn more: ${pageUrl}\nImage: ${program?.img}`;
    return { pageUrl, caption };
  };

  const handleFacebookShare = () => {
    const { pageUrl, caption } = buildSharePayload();
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(caption)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const { pageUrl } = buildSharePayload();
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Program Not Found</h2>
          <p className="text-gray-500 mb-8">The program you are looking for does not exist.</p>
          <Link to="/programs" className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold shadow-lg hover:bg-purple-700 transition-all">
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#f5f9ff] min-h-screen selection:bg-blue-100 font-sans flex flex-col">
      <Header variant="dark" />
      <div className="max-w-7xl mx-auto w-full pl-0 pr-6 -mt-1 mb-6">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 font-bold">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors">
            <House size={16} />
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link to="/programs" className="text-gray-900 hover:underline transition-colors">
            Programs
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-500 line-clamp-1">{program.title}</span>
        </nav>
      </div>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={program.img}
          alt={program.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/30 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white mb-4 uppercase tracking-widest">
              {program.tag}
            </div>

            
            <h1 className="text-[2.5rem] font-bold text-white tracking-tight leading-tight max-w-4xl">
              {program.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap gap-8 mb-12 py-8 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                    <p className="text-lg font-black text-gray-900">{program.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                    <p className="text-lg font-black text-gray-900">{program.location}</p>
                  </div>
                </div>

                <div className="ml-auto flex items-center gap-3">
                  <button
                    aria-label="Donate Now"
                    title="Donate Now"
                    className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
                  >
                    <HandHeart size={20} />
                  </button>
                  <button
                    aria-label="Volunteer"
                    title="Volunteer"
                    className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
                  >
                    <Users size={20} />
                  </button>
                </div>
              </div>

              <div className="prose prose-xl prose-purple max-w-none">
                <h2 className="font-bold text-gray-900 mb-6">About the Program</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {program.longDesc}
                </p>
                <p className="text-lg text-gray-500 leading-relaxed italic">
                  Join us as we continue to shine a light into the darkest corners of our community. Your participation makes all the difference in turning small acts into global transformations.
                </p>
              </div>

              <div className="mt-16 bg-blue-900 rounded-[2.5rem] p-10 md:p-16 text-white overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                 <div className="relative z-10">
                   <h3 className="text-3xl font-bold mb-6">Ready to make an impact?</h3>
                   <p className="text-blue-200 text-lg mb-10 max-w-xl">
                     Whether you want to volunteer, donate, or partner with us, there's a place for you in our mission to ignite hope.
                   </p>
                   <div className="flex flex-wrap gap-4">
                     <button className="px-10 py-4 bg-white text-blue-900 rounded-full font-black hover:bg-blue-50 transition-all shadow-xl">
                       Volunteer
                     </button>
                     <button className="px-10 py-4 border border-white/20 text-white rounded-full font-black hover:bg-white/10 transition-all">
                       Donate to this Cause
                     </button>
                   </div>
                 </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-10">
              <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
                <h4 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest">Program Materials</h4>
                <div className="space-y-4">
                  {[
                    { title: "Impact Report 2024", size: "2.4 MB" },
                    { title: "Program Guide", size: "1.1 MB" },
                    { title: "Volunteer Handbook", size: "3.5 MB" }
                  ].map((doc, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                          <Download size={18} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm text-gray-900">{doc.title}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{doc.size}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#e7f0fe] rounded-[2.5rem] p-10 overflow-hidden relative">
                <div className="relative z-10">
                  <h4 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-widest">Support this Program</h4>
                  <p className="text-gray-600 text-sm mb-8">
                    Help us spread the word about our programs and the impact we're making together.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleLinkedInShare}
                      className="py-3 bg-white rounded-2xl font-bold text-gray-900 text-sm shadow-sm hover:shadow-md transition-all"
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={handleFacebookShare}
                      className="py-3 bg-white rounded-2xl font-bold text-gray-900 text-sm shadow-sm hover:shadow-md transition-all"
                    >
                      Facebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

