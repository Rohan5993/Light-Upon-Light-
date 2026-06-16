import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import HoverFillLink from "./HoverFillLink";

interface HeaderProps {
  variant?: "light" | "dark";
}

const NAV_LINKS = [
  { to: "/", label: "Home", isActive: (pathname: string, hash: string) => pathname === "/" && hash !== "#our-mission" },
  { to: "/about", label: "About Us", isActive: (pathname: string) => pathname.startsWith("/about") },
  { to: "/programs", label: "Programs", isActive: (pathname: string) => pathname.startsWith("/programs") },
  { to: "/blog", label: "Blogs", isActive: (pathname: string) => pathname.startsWith("/blog") },
] as const;

export default function Header({ variant = "light" }: HeaderProps) {
  const isDark = variant === "dark";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, hash } = useLocation();

  const navVariant = (active: boolean) => (active ? "purple" as const : "ghost" as const);
  const logoDotClass = isDark ? "bg-purple-600" : "bg-white";
  const logoTextClass = isDark ? "text-gray-900" : "text-white";
  const mobileHeaderGlass = isDark
    ? "bg-white/55 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/50 shadow-[0_8px_32px_rgba(15,23,42,0.08)]"
    : "bg-white/20 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.12)]";
  const mobileMenuButtonClass = isDark
    ? "border border-white/60 bg-white/50 backdrop-blur-md text-gray-900"
    : "border border-white/35 bg-white/15 backdrop-blur-md text-white";

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
      <div className="h-14 sm:h-[88px] md:h-[148px] lg:h-[132px]" aria-hidden="true" />
      <header
        className={`fixed top-0 left-0 w-full z-50 pointer-events-none px-3 py-2.5 sm:px-6 sm:py-3 md:px-16 lg:px-6 lg:pt-[20px] ${mobileHeaderGlass} lg:bg-transparent lg:backdrop-blur-none lg:backdrop-saturate-100 lg:border-b-0 lg:shadow-none ${
          isScrolled ? "lg:pb-3" : "lg:pb-8"
        }`}
      >
        <div
          className={`flex items-center w-full min-w-0 gap-2 pointer-events-auto max-w-7xl mx-auto ${
            isScrolled ? "justify-between lg:justify-center" : "justify-between"
          }`}
        >
          <Link
            to="/"
            className={`flex items-center gap-2 min-w-0 flex-1 sm:flex-initial sm:max-w-none max-w-[calc(100%-8.5rem)] group ${isScrolled ? "lg:hidden" : ""}`}
          >
            <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-12 transition-transform duration-500 shrink-0">
              <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${logoDotClass} rounded-full`} />
              <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${logoDotClass} rounded-full`} />
              <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${logoDotClass} rounded-full`} />
              <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${logoDotClass} rounded-full`} />
            </div>
            <span
              className={`${logoTextClass} font-bold text-sm sm:text-base md:text-xl tracking-tight truncate min-w-0`}
            >
              Light Upon Light
            </span>
          </Link>

          <nav className="hidden lg:flex items-center bg-white px-3 py-3 rounded-full shadow-xl gap-1">
            {isScrolled && (
              <Link
                to="/"
                className="flex items-center group shrink-0 px-2 py-1"
                aria-label="Light Upon Light — Home"
              >
                <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-12 transition-transform duration-500">
                  <div className="w-3.5 h-3.5 bg-purple-600 rounded-full" />
                  <div className="w-3.5 h-3.5 bg-purple-600 rounded-full" />
                  <div className="w-3.5 h-3.5 bg-purple-600 rounded-full" />
                  <div className="w-3.5 h-3.5 bg-purple-600 rounded-full" />
                </div>
              </Link>
            )}
            <ul className="flex items-center gap-1 text-[15px]">
              {NAV_LINKS.map((link) => {
                const active = link.isActive(pathname, hash);
                return (
                  <li key={link.to}>
                    <HoverFillLink
                      to={link.to}
                      variant={navVariant(active)}
                      className={`${link.to === "/" ? "px-6" : "px-5"} py-2.5`}
                      labelClassName={active ? "font-black" : "font-bold"}
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
                className="px-6 py-2 ml-1 text-sm font-black whitespace-nowrap"
              >
                Donate Now
              </HoverFillLink>
            )}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto lg:ml-0">
            <HoverFillLink
              to="/donate"
              variant="white"
              className={`px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-8 md:py-3 text-[11px] sm:text-xs md:text-sm font-black whitespace-nowrap lg:px-8 lg:py-3 ${isScrolled ? "lg:hidden" : ""}`}
            >
              <span className="sm:hidden">Donate</span>
              <span className="hidden sm:inline">Donate Now</span>
            </HoverFillLink>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className={`lg:hidden flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full transition-colors shrink-0 ${mobileMenuButtonClass}`}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>
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
        className={`fixed top-14 sm:top-[4.25rem] left-3 right-3 sm:left-4 sm:right-4 z-50 lg:hidden rounded-2xl bg-white shadow-2xl border border-gray-100 p-3 sm:p-4 transition-all duration-300 origin-top max-h-[calc(100dvh-4rem)] overflow-y-auto ${
          mobileOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = link.isActive(pathname, hash);
            return (
              <li key={link.to}>
                <HoverFillLink
                  to={link.to}
                  variant={navVariant(active)}
                  className="w-full px-4 py-3 text-base"
                  labelClassName={`w-full text-center ${active ? "font-black" : "font-bold"}`}
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
              className="w-full py-3 text-sm font-black"
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
