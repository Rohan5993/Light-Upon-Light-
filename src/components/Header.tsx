import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import HoverFillLink from "./HoverFillLink";

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
  const logoDotClass = useLightChrome ? "bg-purple-600" : "bg-white";
  const logoTextClass = useLightChrome ? "text-gray-900" : "text-white";
  const mobileHeaderGlass = isDark
    ? "bg-white/55 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/50 shadow-[0_8px_32px_rgba(15,23,42,0.08)]"
    : "bg-white/20 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.12)]";
  const mobileMenuButtonClass = useLightChrome
    ? "border border-white/60 bg-white/50 backdrop-blur-md text-gray-900"
    : "border border-white/35 bg-white/15 backdrop-blur-md text-white";
  const donateChromeClass = useLightChrome
    ? "border-2 border-purple-600 max-lg:border-purple-600 max-lg:text-purple-600"
    : "border-2 max-lg:border-white lg:border-purple-600 max-lg:text-white max-lg:!bg-transparent max-lg:shadow-none";

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
      <div className="h-[50px] sm:h-[88px] md:h-[148px] lg:h-[132px]" aria-hidden="true" />
      <header
        className={`fixed top-0 left-0 w-full z-50 pointer-events-none h-[50px] lg:h-auto px-4 sm:px-6 md:px-16 lg:py-0 lg:pt-[20px] flex items-center ${mobileHeaderGlass} lg:bg-transparent lg:backdrop-blur-none lg:backdrop-saturate-100 lg:border-b-0 lg:shadow-none ${
          isScrolled ? "lg:pb-3" : "lg:pb-8"
        }`}
      >
        {/* Mobile / tablet: keep split layout */}
        <div className="flex lg:hidden items-center w-full min-w-0 gap-2 pointer-events-auto max-w-7xl mx-auto h-full justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 min-w-0 flex-1 max-w-[calc(100%-8.5rem)] group"
          >
            <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-12 transition-transform duration-500 shrink-0">
              <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${logoDotClass} rounded-full`} />
              <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${logoDotClass} rounded-full`} />
              <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${logoDotClass} rounded-full`} />
              <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${logoDotClass} rounded-full`} />
            </div>
            <span className={`${logoTextClass} font-bold text-xs sm:text-base md:text-xl tracking-tight whitespace-nowrap leading-none min-w-0`}>
              Light Upon Light
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <HoverFillLink
              to="/donate"
              variant="white"
              className={`h-9 sm:h-10 md:h-11 px-3 sm:px-5 md:px-8 text-[10px] sm:text-xs md:text-sm font-black whitespace-nowrap uppercase tracking-wide sm:tracking-wider max-lg:!bg-transparent max-lg:shadow-none ${donateChromeClass}`}
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
            <Link to="/" className="flex items-center gap-2.5 group justify-self-start">
              <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-12 transition-transform duration-500 shrink-0">
                <div className={`w-3.5 h-3.5 ${logoDotClass} rounded-full`} />
                <div className={`w-3.5 h-3.5 ${logoDotClass} rounded-full`} />
                <div className={`w-3.5 h-3.5 ${logoDotClass} rounded-full`} />
                <div className={`w-3.5 h-3.5 ${logoDotClass} rounded-full`} />
              </div>
              <span className={`${logoTextClass} font-bold text-xl tracking-tight whitespace-nowrap leading-none`}>
                Light Upon Light
              </span>
            </Link>
          )}

          <nav className="flex items-center bg-white px-3 py-3 rounded-full shadow-xl gap-1 justify-self-center">
            {isScrolled && (
              <Link to="/" className="flex items-center gap-2 pl-2 pr-2 group shrink-0" aria-label="Light Upon Light home">
                <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-12 transition-transform duration-500 shrink-0">
                  <div className="w-3 h-3 bg-purple-600 rounded-full" />
                  <div className="w-3 h-3 bg-purple-600 rounded-full" />
                  <div className="w-3 h-3 bg-purple-600 rounded-full" />
                  <div className="w-3 h-3 bg-purple-600 rounded-full" />
                </div>
                <span className="text-gray-900 font-bold text-sm tracking-tight whitespace-nowrap">
                  Light Upon Light
                </span>
              </Link>
            )}

            <ul className="flex items-center gap-1 text-[12px]">
              {NAV_LINKS.map((link) => {
                const active = link.isActive(pathname);
                return (
                  <li key={link.to}>
                    <HoverFillLink
                      to={link.to}
                      variant={navVariant(active)}
                      className="px-5 py-2.5"
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
                className="h-10 px-6 text-xs font-black whitespace-nowrap uppercase tracking-wider border-2 border-purple-600 ml-1"
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
        className={`fixed top-[50px] sm:top-[4.25rem] left-3 right-3 sm:left-4 sm:right-4 z-50 lg:hidden rounded-2xl bg-white shadow-2xl border border-gray-100 p-3 sm:p-4 transition-all duration-300 origin-top max-h-[calc(100dvh-3.125rem)] overflow-y-auto ${
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
              className="w-full h-11 text-sm font-black uppercase tracking-wider border-2 border-purple-600"
              labelClassName="w-full text-center"
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
