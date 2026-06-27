/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import DonatePage from "./pages/DonatePage";
import AboutPage from "./pages/AboutPage";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <Router basename={routerBasename || undefined}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:id" element={<ProgramDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </Router>
  );
}
