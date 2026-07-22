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
  { to: "/volunteer", label: "Volunteer", isActive: (pathname: string) => pathname.startsWith("/volunteer") },
  { to: "/blog", label: "Blogs", isActive: (pathname: string) => pathname.startsWith("/blog") },
] as const;

export default function Header({ variant = "light" }: HeaderProps) {
  const isDark = variant === "dark";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, hash } = useLocation();

  const logoDotClass = isDark ? "bg-[#990FFA]" : "bg-white";
  const logoTextClass = isDark ? "text-gray-900" : "text-white";

  const glassFull = isDark
    ? "bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/60 shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
    : "bg-white/30 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.1)]";
  const glassPill = isDark
    ? "bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/70 shadow-[0_8px_32px_rgba(15,23,42,0.1)]"
    : "bg-white/35 backdrop-blur-2xl backdrop-saturate-150 border border-white/45 shadow-[0_10px_40px_rgba(0,0,0,0.18)]";
  const glassMobileOnly = isDark
    ? "max-lg:bg-white/70 max-lg:backdrop-blur-2xl max-lg:backdrop-saturate-150 max-lg:border-b max-lg:border-white/60 max-lg:shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
    : "max-lg:bg-white/30 max-lg:backdrop-blur-2xl max-lg:backdrop-saturate-150 max-lg:border-b max-lg:border-white/40 max-lg:shadow-[0_4px_24px_rgba(0,0,0,0.1)]";
  const mobileMenuButtonClass = isDark
    ? "border border-slate-200/80 bg-white/80 backdrop-blur-md text-gray-900"
    : "border border-white/50 bg-white/20 backdrop-blur-md text-white";

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

  const LogoMark = ({ size = "md" }: { size?: "sm" | "md" }) => (
    <div
      className={`grid grid-cols-2 gap-0.5 group-hover:rotate-12 transition-transform duration-500 shrink-0 ${
        size === "sm" ? "" : ""
      }`}
    >
      <div className={`${size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} ${logoDotClass} rounded-full`} />
      <div className={`${size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} ${logoDotClass} rounded-full`} />
      <div className={`${size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} ${logoDotClass} rounded-full`} />
      <div className={`${size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} ${logoDotClass} rounded-full`} />
    </div>
  );

  const donateClass =
    "h-10 px-6 text-sm font-black whitespace-nowrap uppercase tracking-wide !bg-white !text-[#990FFA] !border !border-[#990FFA] shadow-[0_2px_10px_rgba(153,15,250,0.15)]";

  return (
    <>
      <div className="h-[52px] sm:h-[60px] md:h-[68px] lg:h-[104px]" aria-hidden="true" />
      <header
        className={`fixed top-0 left-0 w-full z-50 pointer-events-none h-[52px] sm:h-[60px] md:h-[68px] lg:h-auto px-3 sm:px-4 lg:px-6 lg:py-0 md:px-12 lg:pt-4 flex items-center transition-[background-color,backdrop-filter,box-shadow,padding] duration-300 ${
          isScrolled ? glassMobileOnly : glassFull
        } ${isScrolled ? "lg:pb-3" : "lg:pb-5"}`}
      >
        <div
          className={`flex items-center w-full min-w-0 gap-3 pointer-events-auto max-w-7xl mx-auto h-full lg:h-auto transition-all duration-300 ${
            isScrolled ? "justify-between lg:justify-center" : "justify-between"
          }`}
        >
          <Link
            to="/"
            className={`flex items-center gap-2.5 min-w-0 flex-1 sm:flex-initial sm:max-w-none max-w-[calc(100%-8.5rem)] group ${
              isScrolled ? "lg:hidden" : ""
            }`}
          >
            <LogoMark />
            <span
              className={`${logoTextClass} font-bold text-sm sm:text-base md:text-xl tracking-tight truncate min-w-0 drop-shadow-sm`}
            >
              Light Upon Light
            </span>
          </Link>

          <nav
            className={`hidden lg:flex items-center w-fit transition-all duration-300 ${
              isScrolled
                ? `gap-1.5 pl-4 pr-2.5 py-3.5 rounded-full ${glassPill}`
                : "gap-1.5 px-1 py-1 rounded-full bg-transparent"
            }`}
          >
            {isScrolled && (
              <>
                <Link
                  to="/"
                  className="flex items-center group shrink-0 pr-2"
                  aria-label="Light Upon Light — Home"
                >
                  <LogoMark size="sm" />
                </Link>
                <span className="w-px h-6 bg-white/35 shrink-0 mr-1" aria-hidden />
              </>
            )}
            <ul className="flex items-center gap-1.5 text-[14px]">
              {NAV_LINKS.map((link) => {
                const active = link.isActive(pathname, hash);
                return (
                  <li key={link.to}>
                    <HoverFillLink
                      to={link.to}
                      variant="outline"
                      active={active}
                      className={`px-4 py-2.5 ${isDark && !active ? "!border-[#990FFA]/50" : ""}`}
                      labelClassName={active ? "font-black" : "font-semibold"}
                    >
                      {link.label}
                    </HoverFillLink>
                  </li>
                );
              })}
            </ul>
            {isScrolled && (
              <>
                <span className="w-px h-6 bg-white/35 shrink-0 mx-1" aria-hidden />
                <HoverFillLink
                  to="/donate"
                  variant="outline"
                  active
                  className={donateClass}
                  labelClassName="!text-[#990FFA]"
                >
                  Donate Now
                </HoverFillLink>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
            <HoverFillLink
              to="/donate"
              variant="outline"
              active
              className={`${donateClass} h-8 sm:h-9 md:h-10 px-3 sm:px-5 md:px-7 text-[10px] sm:text-xs md:text-sm ${
                isScrolled ? "lg:hidden" : ""
              }`}
              labelClassName="!text-[#990FFA]"
            >
              <span className="sm:hidden">Donate</span>
              <span className="hidden sm:inline">Donate Now</span>
            </HoverFillLink>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className={`lg:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-colors shrink-0 ${mobileMenuButtonClass}`}
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
        className={`fixed top-[52px] sm:top-[60px] md:top-[68px] left-3 right-3 sm:left-4 sm:right-4 z-50 lg:hidden rounded-2xl bg-white shadow-2xl border border-gray-100 p-3 sm:p-4 transition-all duration-300 origin-top max-h-[calc(100dvh-3.25rem)] overflow-y-auto ${
          mobileOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => {
            const active = link.isActive(pathname, hash);
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex w-full items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-base font-semibold transition-colors ${
                    active
                      ? "bg-white text-[#990FFA] border-[#990FFA]"
                      : "bg-transparent text-slate-800 hover:bg-[#990FFA]/5 hover:text-[#990FFA] hover:border-[#990FFA]/40"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2 mt-1 border-t border-gray-100">
            <Link
              to="/donate"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-full border border-[#990FFA] bg-white text-[#990FFA] h-11 text-sm font-black uppercase tracking-wider hover:bg-[#990FFA]/5 transition-colors"
            >
              Donate Now
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
