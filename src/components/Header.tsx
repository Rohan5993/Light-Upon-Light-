import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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

export default function Header(_props: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, hash } = useLocation();

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

  const navLinkClass = (active: boolean) =>
    [
      "relative inline-flex items-center px-3 py-2 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors duration-200",
      active ? "text-[#7107E7]" : "text-black hover:text-[#7107E7]",
      "after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:origin-left after:rounded-full after:bg-[#7107E7] after:transition-transform after:duration-200",
      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
    ].join(" ");

  return (
    <>
      <div className="h-[56px] sm:h-[64px] lg:h-[72px]" aria-hidden="true" />
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-100 transition-shadow duration-300 ${
          isScrolled ? "shadow-[0_4px_20px_rgba(15,23,42,0.06)]" : ""
        }`}
      >
        <div className="flex items-center justify-between w-full min-w-0 gap-3 max-w-7xl mx-auto h-[56px] sm:h-[64px] lg:h-[72px] px-3 sm:px-4 md:px-8 lg:px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 min-w-0 flex-1 sm:flex-initial max-w-[calc(100%-8.5rem)] sm:max-w-none group"
          >
            <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-12 transition-transform duration-500 shrink-0">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#7107E7] rounded-full" />
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#7107E7] rounded-full" />
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#7107E7] rounded-full" />
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#7107E7] rounded-full" />
            </div>
            <span className="text-black font-bold text-sm sm:text-base md:text-xl tracking-tight truncate min-w-0">
              Light Upon Light
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = link.isActive(pathname, hash);
                return (
                  <li key={link.to}>
                    <Link to={link.to} className={navLinkClass(active)}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center h-8 sm:h-9 lg:h-10 px-3 sm:px-5 lg:px-6 text-[10px] sm:text-xs lg:text-sm font-black uppercase tracking-wide rounded-full border border-[#7107E7] bg-[#7107E7] text-white hover:bg-[#5c06bb] hover:border-[#5c06bb] transition-colors"
            >
              <span className="sm:hidden">Donate</span>
              <span className="hidden sm:inline">Donate Now</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white text-black transition-colors shrink-0"
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
        className={`fixed top-[56px] sm:top-[64px] left-3 right-3 sm:left-4 sm:right-4 z-50 lg:hidden rounded-2xl bg-white shadow-2xl border border-gray-100 p-3 sm:p-4 transition-all duration-300 origin-top max-h-[calc(100dvh-3.5rem)] overflow-y-auto ${
          mobileOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = link.isActive(pathname, hash);
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex w-full items-center justify-center px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] transition-colors ${
                    active
                      ? "text-[#7107E7]"
                      : "text-black hover:text-[#7107E7]"
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
              className="flex w-full items-center justify-center rounded-full border border-[#7107E7] bg-[#7107E7] text-white h-11 text-sm font-black uppercase tracking-wider hover:bg-[#5c06bb] transition-colors"
            >
              Donate Now
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
