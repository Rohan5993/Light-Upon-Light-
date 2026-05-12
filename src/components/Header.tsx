import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface HeaderProps {
  variant?: "light" | "dark";
}

export default function Header({ variant = "light" }: HeaderProps) {
  const isDark = variant === "dark";
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  const menuItemClass = (isActive: boolean) =>
    `px-5 py-2.5 transition-colors ${isActive ? "text-purple-600 font-black" : "text-slate-600 hover:text-slate-900 font-bold"}`;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="h-[132px] md:h-[148px]" aria-hidden="true" />
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 flex items-center justify-between pointer-events-none bg-transparent pt-[20px] ${
          isScrolled ? "pb-3" : "pb-8"
        }`}
      >
      <div
        className={`flex items-center w-full pointer-events-auto max-w-7xl mx-auto ${
          isScrolled ? "justify-between lg:justify-center" : "justify-between"
        }`}
      >
        {/* Logo — hidden on large screens when scrolled (moves into center pill) */}
        <Link
          to="/"
          className={`flex items-center gap-2.5 group shrink-0 ${isScrolled ? "lg:hidden" : ""}`}
        >
          <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-12 transition-transform duration-500">
            <div className={`w-3.5 h-3.5 ${isDark ? "bg-purple-600" : "bg-white"} rounded-full`} />
            <div className={`w-3.5 h-3.5 ${isDark ? "bg-purple-600" : "bg-white"} rounded-full`} />
            <div className={`w-3.5 h-3.5 ${isDark ? "bg-purple-600" : "bg-white"} rounded-full`} />
            <div className={`w-3.5 h-3.5 ${isDark ? "bg-purple-600" : "bg-white"} rounded-full`} />
          </div>
          <span className={`${isDark ? "text-gray-900" : "text-white"} font-bold text-xl tracking-tight`}>
            Light Upon Light
          </span>
        </Link>

        {/* Center Nav Pill — desktop; when scrolled, logo + Donate live here */}
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
            <li>
              <Link to="/" className={`px-6 py-2.5 rounded-full transition-all ${pathname === "/" && hash !== "#our-mission" ? "bg-purple-600 text-white font-black" : "text-slate-600 hover:bg-purple-600 hover:text-white font-bold"}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={menuItemClass(pathname.startsWith("/about"))}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/programs" className={menuItemClass(pathname.startsWith("/programs"))}>
                Programs
              </Link>
            </li>
            <li>
              <Link to="/blog" className={menuItemClass(pathname.startsWith("/blog"))}>
                Blogs
              </Link>
            </li>
          </ul>
          {isScrolled && (
            <Link
              to="/donate"
              className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 text-sm font-black transition-all shadow-lg hover:shadow-purple-200 whitespace-nowrap ml-1 shrink-0"
            >
              Donate Now
            </Link>
          )}
        </nav>

        {/* Donate — hidden on large screens when scrolled (moves into center pill) */}
        <Link
          to="/donate"
          className={`shrink-0 px-8 py-3 rounded-full ${
            isDark ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-white text-purple-600 hover:bg-purple-50"
          } text-sm font-black transition-all shadow-lg hover:shadow-purple-200 ${isScrolled ? "lg:hidden" : ""}`}
        >
          Donate Now
        </Link>
      </div>
      </header>
    </>
  );
}
