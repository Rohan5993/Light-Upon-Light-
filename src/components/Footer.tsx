import { Instagram, Facebook, Linkedin, Youtube, Music2, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../data/socialLinks";
import { siteImages } from "../assets/siteImages";
import { resolveMediaUrl } from "../lib/publicUrl";

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

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map((item) => {
        const Icon = SOCIAL_ICONS[item.label];
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}

export default function Footer({ className = "", topPaddingClass = "pt-12 md:pt-16" }: FooterProps) {
  return (
    <footer className={`relative bg-[#270E32] ${topPaddingClass} pb-6 px-4 sm:px-6 md:px-16 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
          {/* Logo & Description */}
          <div className="space-y-4 md:max-w-[280px] lg:max-w-[320px] shrink-0">
            <Link to="/" className="inline-flex items-center" aria-label="Light Upon Light home">
              <img
                src={resolveMediaUrl(siteImages.logoLulDark)}
                alt="Light Upon Light"
                className="h-14 sm:h-16 md:h-20 w-auto max-w-[min(100%,320px)] object-contain object-left bg-transparent"
              />
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-[15px] font-medium">
              Uniting hearts and actions to create positive change that lasts beyond a single moment.
            </p>
            <SocialLinks className="hidden md:flex flex-wrap gap-3" />
          </div>

          {/* Quick Links & Contact — stack on very small screens, 2-col from sm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:contents">
            <div className="space-y-4 shrink-0">
              <h2 className="text-white font-bold text-lg">Quick Links</h2>
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
                    <Link to={link.path} className="text-gray-300 hover:text-white transition-colors text-[15px] font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 md:max-w-[260px] shrink-0">
              <h2 className="text-white font-bold text-lg">Contact</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-2 sm:gap-4 text-gray-300">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-white" />
                  <span className="text-sm sm:text-[15px] font-medium leading-tight pt-0.5">Greater Seattle Area</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-4 text-gray-300 min-w-0">
                  <Mail className="w-5 h-5 flex-shrink-0 text-white mt-0.5" />
                  <a href="mailto:lightuponlight1408@gmail.com" className="text-sm sm:text-[15px] font-medium break-all hover:text-white transition-colors">
                    lightuponlight1408@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2 sm:gap-4 text-gray-300">
                  <Phone className="w-5 h-5 flex-shrink-0 text-white" />
                  <a href="tel:2067660884" className="text-sm sm:text-[15px] font-medium hover:text-white transition-colors">
                    206-766-0884
                  </a>
                </li>
              </ul>
              <SocialLinks className="flex md:hidden flex-wrap gap-2 sm:gap-3 pt-1" />
            </div>
          </div>
        </div>

        <div className="pt-4 text-center text-[13px] text-gray-400 font-medium space-y-2">
          <p>© 2026 Light Upon Light. All rights reserved.</p>
          <p className="text-[11px] text-gray-400 max-w-3xl mx-auto">
            A 501(c)(3) nonprofit organization (EIN 99-2690459). Donations are tax-deductible as allowed by law. Verify our status on the IRS website.
          </p>
        </div>
      </div>
    </footer>
  );
}
