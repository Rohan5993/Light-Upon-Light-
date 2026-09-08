import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import HoverFillLink from "./HoverFillLink";
import { siteImages } from "../assets/siteImages";
import { resolveMediaUrl } from "../lib/publicUrl";

interface HeaderProps {
  variant?: "light" | "dark";
}

const NAV_LINKS = [
  { to: "/programs", label: "Programs", isActive: (pathname: string) => pathname.startsWith("/programs") },
  { to: "/about", label: "About Us", isActive: (pathname: string) => pathname.startsWith("/about") },
  { to: "/blog", label: "Blogs", isActive: (pathname: string) => pathname.startsWith("/blog") },
  { to: "/volunteer", label: "Volunteer", isActive: (pathname: string) => pathname.startsWith("/volunteer") },
  { to: "/contact", label: "Contact", isActive: (pathname: string) => pathname.startsWith("/contact") },
] as const;

export default function Header({ variant = "light" }: HeaderProps) {
  const isDark = variant === "dark";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, hash } = useLocation();

  const navVariant = (active: boolean) => (active ? "purple" as const : "ghost" as const);
  const useLightChrome = isDark || isScrolled;
  const brandLogo = useLightChrome ? siteImages.logoLulLight : siteImages.logoLulDark;
  const isHeroLogo = !useLightChrome;
  // Mobile/tablet: larger, readable mark that fills the bar
  const logoMobileClass = isHeroLogo
    ? "h-[58px] sm:h-[72px] md:h-[80px] w-auto max-w-full object-contain object-left bg-transparent group-hover:scale-[1.02] transition-transform duration-300"
    : "h-[54px] sm:h-[64px] md:h-[72px] w-auto max-w-full object-contain object-left bg-transparent group-hover:scale-[1.02] transition-transform duration-300";
  const logoDesktopClass = isHeroLogo
    ? "h-16 xl:h-20 2xl:h-24 w-auto max-w-[min(28vw,320px)] xl:max-w-[min(36vw,400px)] 2xl:max-w-[min(42vw,480px)] object-contain object-left bg-transparent group-hover:scale-[1.02] transition-transform duration-300"
    : "h-14 xl:h-16 2xl:h-20 w-auto max-w-[min(26vw,280px)] xl:max-w-[min(32vw,360px)] 2xl:max-w-[min(36vw,400px)] object-contain object-left bg-transparent group-hover:scale-[1.02] transition-transform duration-300";
  const mobileHeaderGlass = isDark
    ? "bg-white/95 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/70 shadow-[0_8px_32px_rgba(15,23,42,0.08)]"
    : "bg-white/30 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/35 shadow-[0_8px_32px_rgba(0,0,0,0.12)]";
  const mobileLogoWrapClass = "inline-flex items-center max-w-full";
  const mobileMenuButtonClass = useLightChrome
    ? "border border-white/60 bg-white/50 backdrop-blur-md text-gray-900"
    : "border border-white/35 bg-white/15 backdrop-blur-md text-white";
  // Mobile/tablet: white chip + thin 0.5px purple border; hover text white via fill animation
  const donateChromeClass =
    "border-[0.5px] max-lg:!border-[0.5px] max-lg:!border-[#7107E7] max-lg:!bg-white max-lg:!text-[#7107E7] max-lg:shadow-sm max-lg:hover:!border-[#7107E7] lg:border-2 lg:border-purple-600";
  const donateMobileLabelClass =
    "max-lg:!text-[#7107E7] max-lg:group-hover:!text-white";

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div
        className={
          !isDark
            ? "h-20 sm:h-24 lg:h-[160px]"
            : "h-20 sm:h-24 lg:h-[128px]"
        }
        aria-hidden="true"
      />
      <header
        className={`fixed top-0 left-0 w-full z-50 pointer-events-none h-20 sm:h-24 lg:h-auto px-3 sm:px-6 md:px-10 lg:px-16 lg:py-0 lg:pt-[16px] flex items-center ${
          useLightChrome ? mobileHeaderGlass : "bg-transparent border-b-0 shadow-none"
        } lg:bg-transparent lg:backdrop-blur-none lg:backdrop-saturate-100 lg:border-b-0 lg:shadow-none ${
          isScrolled ? "lg:pb-3" : "lg:pb-8"
        }`}
      >
        {/* Mobile / tablet: keep split layout */}
        <div className="flex lg:hidden items-center w-full min-w-0 gap-2 pointer-events-auto max-w-7xl mx-auto h-full justify-between">
          <Link
            to="/"
            className="flex items-center min-w-0 flex-1 max-w-[calc(100%-6.75rem)] sm:max-w-[calc(100%-9rem)] group"
            aria-label="Light Upon Light home"
          >
            <span className={mobileLogoWrapClass}>
              <img
                src={resolveMediaUrl(brandLogo)}
                alt="Light Upon Light"
                className={logoMobileClass}
              />
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <HoverFillLink
              to="/donate"
              variant="white"
              className={`h-9 sm:h-10 md:h-11 px-2.5 sm:px-5 md:px-8 text-[10px] sm:text-xs md:text-sm font-black whitespace-nowrap uppercase tracking-wide sm:tracking-wider max-lg:shadow-none ${donateChromeClass}`}
              labelClassName={donateMobileLabelClass}
            >
              <span className="sm:hidden">Donate</span>
              <span className="hidden sm:inline">Donate Now</span>
            </HoverFillLink>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className={`flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full transition-colors shrink-0 ${mobileMenuButtonClass}`}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop */}
        <div
          className={`hidden lg:grid items-center w-full min-w-0 pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled ? "grid-cols-1 justify-items-center max-w-7xl mx-auto" : "grid-cols-[1fr_auto_1fr]"
          }`}
        >
          {!isScrolled && (
            <Link
              to="/"
              className="flex items-center group justify-self-start"
              aria-label="Light Upon Light home"
            >
              <img
                src={resolveMediaUrl(brandLogo)}
                alt="Light Upon Light"
                className={logoDesktopClass}
              />
            </Link>
          )}

          <nav className="flex items-center bg-white px-2 xl:px-3 py-2.5 xl:py-3 rounded-full shadow-xl gap-0.5 xl:gap-1 justify-self-center max-w-[calc(100vw-2rem)] overflow-hidden">
            {isScrolled && (
              <Link to="/" className="flex items-center pl-1 pr-1.5 xl:pr-2 group shrink-0" aria-label="Light Upon Light home">
                <img
                  src={resolveMediaUrl(siteImages.logoLulLight)}
                  alt="Light Upon Light"
                  className="h-9 xl:h-11 w-auto max-w-[120px] xl:max-w-[180px] object-contain object-left bg-transparent group-hover:scale-[1.02] transition-transform duration-300"
                />
              </Link>
            )}

            <ul className="flex items-center gap-0.5 xl:gap-1 text-[11px] xl:text-[12px]">
              {NAV_LINKS.map((link) => {
                const active = link.isActive(pathname);
                return (
                  <li key={link.to}>
                    <HoverFillLink
                      to={link.to}
                      variant={navVariant(active)}
                      className="px-2.5 xl:px-5 py-2 xl:py-2.5"
                      labelClassName={`uppercase tracking-wider ${active ? "font-black" : "font-bold"}`}
                    >
                      {link.label}
                    </HoverFillLink>
                  </li>
                );
              })}
            </ul>

            {isScrolled && (
              <HoverFillLink
                to="/donate"
                variant="white"
                className="h-9 xl:h-10 px-3 xl:px-6 text-[10px] xl:text-xs font-black whitespace-nowrap uppercase tracking-wider border-2 border-purple-600 ml-0.5 xl:ml-1"
              >
                Donate Now
              </HoverFillLink>
            )}
          </nav>

          {!isScrolled && (
            <HoverFillLink
              to="/donate"
              variant="white"
              className={`h-11 px-8 text-sm font-black whitespace-nowrap uppercase tracking-wider justify-self-end ${donateChromeClass}`}
              labelClassName={donateMobileLabelClass}
            >
              Donate Now
            </HoverFillLink>
          )}
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        id="mobile-nav-menu"
        className={`fixed top-20 sm:top-24 left-3 right-3 sm:left-4 sm:right-4 z-50 lg:hidden rounded-2xl bg-white shadow-2xl border border-gray-100 p-3 sm:p-4 transition-all duration-300 origin-top max-h-[calc(100dvh-6rem)] overflow-y-auto ${
          mobileOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = link.isActive(pathname);
            return (
              <li key={link.to}>
                <HoverFillLink
                  to={link.to}
                  variant={navVariant(active)}
                  className="w-full px-4 py-3 text-[12px]"
                  labelClassName={`w-full text-center uppercase tracking-wider ${active ? "font-black" : "font-bold"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </HoverFillLink>
              </li>
            );
          })}
          <li className="pt-2 mt-1 border-t border-gray-100">
            <HoverFillLink
              to="/donate"
              variant="white"
              className="w-full h-11 text-sm font-black uppercase tracking-wider !border-[0.5px] !border-[#7107E7] !bg-white !text-[#7107E7] shadow-sm"
              labelClassName="w-full text-center !text-[#7107E7] group-hover:!text-white"
              onClick={() => setMobileOpen(false)}
            >
              Donate Now
            </HoverFillLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
