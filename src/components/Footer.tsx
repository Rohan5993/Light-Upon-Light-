import { Instagram, Facebook, Linkedin, Youtube, Music2, MapPin, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

type FooterProps = {
  className?: string;
  topPaddingClass?: string;
};

export default function Footer({ className = "", topPaddingClass = "pt-48" }: FooterProps) {
  return (
    <footer className={`relative bg-[#270E32] ${topPaddingClass} pb-14 px-6 md:px-16 overflow-hidden ${className}`}>
      {/* Vertical ribbon overlay */}
      <div className="absolute inset-0 flex pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="h-full flex-1 border-r border-white/5"
            style={{
              backgroundColor: i % 3 === 0 ? 'rgba(139, 92, 246, 0.03)' : 'transparent',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-12">
          {/* Logo & Description */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-3 h-3 bg-white rounded-md" />
                <div className="w-3 h-3 bg-white rounded-md" />
                <div className="w-3 h-3 bg-white rounded-md" />
                <div className="w-3 h-3 bg-white rounded-md" />
              </div>
              <span className="text-white font-bold text-3xl tracking-tight">Light Upon Light</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[15px] font-medium max-w-xs">
              Uniting hearts and actions to create positive change that lasts beyond a single moment.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/light_upon_light14/?igsh=MXZsbHhtc3N1aGFnZA%3D%3D&utm_source=qr#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/people/Light-Upon-Light/61576724334985/?name=xhp_nt__fb__action__open_user" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.linkedin.com/in/ronahi-zebari-a7831b35b/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://www.youtube.com/@TheFoundersDiary24" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                <Youtube size={18} />
              </a>
              <a href="https://www.tiktok.com/@lightuponlight08?_t=ZT-903BJ5tKo3R&_r=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                <Music2 size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Programs', path: '/programs' },
                { label: 'Blogs', path: '/#stories' },
                { label: 'Get Involved', path: '/programs' }
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-[15px] font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-white font-bold text-lg">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 text-white" />
                <span className="text-[15px] font-medium leading-tight pt-0.5">Greater Seattle Area</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <Heart className="w-5 h-5 flex-shrink-0 text-white" />
                <span className="text-[15px] font-medium">lightuponlight1408@gmail.com</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <Star className="w-5 h-5 flex-shrink-0 text-white" />
                <span className="text-[15px] font-medium">206-766-0884</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-[13px] text-gray-500 font-medium space-y-2">
          <p>© 2026 Light Upon Light. All rights reserved.</p>
          <p className="text-[11px] opacity-60 max-w-3xl mx-auto">
            A 501(c)(3) nonprofit organization (EIN 99-2690459). Donations are tax-deductible as allowed by law. Verify our status on the IRS website.
          </p>
        </div>
      </div>
    </footer>
  );
}
