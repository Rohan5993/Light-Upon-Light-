import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";

const ProgramsPage = lazy(() => import("./pages/ProgramsPage"));
const ProgramDetailPage = lazy(() => import("./pages/ProgramDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const DonatePage = lazy(() => import("./pages/DonatePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const FounderPage = lazy(() => import("./pages/FounderPage"));
const PressPage = lazy(() => import("./pages/PressPage"));
const VolunteerPage = lazy(() => import("./pages/VolunteerPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AppointmentPage = lazy(() => import("./pages/AppointmentPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-slate-500 font-medium bg-white" role="status">
      Loading…
    </div>
  );
}

function BootHeroCleanup() {
  const { pathname } = useLocation();

  useEffect(() => {
    const boot = document.getElementById("boot-hero");
    if (!boot) return;
    if (pathname !== "/") {
      boot.remove();
      return;
    }
    // Keep the pre-React LCP image long enough for mobile Lighthouse, then hand off.
    const timer = window.setTimeout(() => boot.remove(), 2800);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router basename={routerBasename || undefined}>
      <BootHeroCleanup />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:id" element={<ProgramDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/ronahi-zebari" element={<FounderPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/appointment" element={<AppointmentPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
