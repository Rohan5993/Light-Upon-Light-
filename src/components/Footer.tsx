import { Instagram, Facebook, Linkedin, Youtube, Music2, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../data/socialLinks";

const SOCIAL_ICONS = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  TikTok: Music2,
} as const;

type FooterProps = {
  className?: string;
  topPaddingClass?: string;
};

export default function Footer({ className = "", topPaddingClass = "pt-48" }: FooterProps) {
  return (
    <footer className={`relative bg-[#270E32] ${topPaddingClass} pb-6 px-4 sm:px-6 md:px-16 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
          {/* Logo & Description */}
          <div className="space-y-4 md:max-w-[280px] lg:max-w-[320px] shrink-0">
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-3 h-3 bg-white rounded-md" />
                <div className="w-3 h-3 bg-white rounded-md" />
                <div className="w-3 h-3 bg-white rounded-md" />
                <div className="w-3 h-3 bg-white rounded-md" />
              </div>
              <span className="text-white font-bold text-xl sm:text-2xl tracking-tight">Light Upon Light</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[15px] font-medium">
              Uniting hearts and actions to create positive change that lasts beyond a single moment.
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
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 shrink-0">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Programs', path: '/programs' },
                { label: 'About Us', path: '/about' },
                { label: 'Blogs', path: '/blog' },
                { label: 'Volunteer', path: '/volunteer' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Donate', path: '/donate' },
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
          <div className="space-y-4 md:max-w-[260px] shrink-0">
            <h4 className="text-white font-bold text-lg">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 text-white" />
                <span className="text-[15px] font-medium leading-tight pt-0.5">Greater Seattle Area</span>
              </li>
              <li className="flex items-start gap-4 text-gray-400 min-w-0">
                <Mail className="w-5 h-5 flex-shrink-0 text-white mt-0.5" />
                <a href="mailto:lightuponlight1408@gmail.com" className="text-[15px] font-medium break-all hover:text-white transition-colors">
                  lightuponlight1408@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <Phone className="w-5 h-5 flex-shrink-0 text-white" />
                <a href="tel:2067660884" className="text-[15px] font-medium hover:text-white transition-colors">
                  206-766-0884
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 text-center text-[13px] text-gray-500 font-medium space-y-2">
          <p>© 2026 Light Upon Light. All rights reserved.</p>
          <p className="text-[11px] opacity-60 max-w-3xl mx-auto">
            A 501(c)(3) nonprofit organization (EIN 99-2690459). Donations are tax-deductible as allowed by law. Verify our status on the IRS website.
          </p>
        </div>
      </div>
    </footer>
  );
}
