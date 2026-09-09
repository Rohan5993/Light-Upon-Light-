import { Instagram, Facebook, Linkedin, Youtube, Music2, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../data/socialLinks";
import { brandLogos } from "../assets/brandLogos";
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
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}

export default function Footer({ className = "", topPaddingClass = "pt-[42px] md:pt-[50px]" }: FooterProps) {
  return (
    <footer className={`relative bg-[#270E32] ${topPaddingClass} pb-4 px-4 sm:px-6 md:px-16 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5 mb-4">
          {/* Logo & Description */}
          <div className="space-y-3 md:max-w-[340px] lg:max-w-[380px] shrink-0">
            <Link to="/" className="inline-flex items-center" aria-label="Light Upon Light home">
              <img
                src={resolveMediaUrl(brandLogos.logoLulDark)}
                alt="Light Upon Light"
                width={380}
                height={168}
                decoding="async"
                loading="lazy"
                className="h-[4.75rem] sm:h-20 md:h-24 w-auto max-w-[min(100%,360px)] object-contain object-left bg-transparent"
              />
            </Link>
            <p className="text-gray-300 leading-snug text-sm font-medium">
              Uniting hearts and actions to create positive change that lasts beyond a single moment.
            </p>
            <SocialLinks className="hidden md:flex flex-wrap gap-2.5 !mt-6" />
          </div>

          {/* Quick Links & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:contents">
            <div className="space-y-3 shrink-0">
              <h2 className="text-white font-bold text-base">Quick Links</h2>
              <ul className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-16 lg:gap-x-20 md:gap-y-2">
                {[
                  { label: "Programs", path: "/programs" },
                  { label: "About Us", path: "/about" },
                  { label: "Blogs", path: "/blog" },
                  { label: "Volunteer", path: "/volunteer" },
                  { label: "Contact Us", path: "/contact" },
                  { label: "Donate", path: "/donate" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 md:max-w-[280px] shrink-0">
              <h2 className="text-white font-bold text-base">Contact</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 sm:gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-white mt-0.5" />
                  <span className="text-sm font-medium leading-snug">
                    16305 NE 87th St, Redmond, WA 98052
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-300 min-w-0">
                  <Mail className="w-4 h-4 flex-shrink-0 text-white mt-0.5" />
                  <a
                    href="mailto:Info@thelightuponlight.org"
                    className="text-sm font-medium break-all hover:text-white transition-colors"
                  >
                    Info@thelightuponlight.org
                  </a>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-gray-300">
                  <Phone className="w-4 h-4 flex-shrink-0 text-white" />
                  <a href="tel:2067660884" className="text-sm font-medium hover:text-white transition-colors">
                    206-766-0884
                  </a>
                </li>
              </ul>
              <SocialLinks className="flex md:hidden flex-wrap gap-2 pt-0.5" />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 text-center text-xs text-gray-400 font-medium space-y-1.5">
          <p>© 2026 Light Upon Light. All rights reserved.</p>
          <p className="text-[11px] text-gray-400 max-w-3xl mx-auto leading-snug">
            A 501(c)(3) nonprofit organization (EIN 99-2690459). Donations are tax-deductible as allowed by law. Verify our status on the IRS website.
          </p>
        </div>
      </div>
    </footer>
  );
}
