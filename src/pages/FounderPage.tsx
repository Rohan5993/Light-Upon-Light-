import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { PAGE_SEO, SITE_ORIGIN } from "../data/seo";
import { siteImages } from "../assets/siteImages";
import { resolveMediaUrl } from "../lib/publicUrl";

export default function FounderPage() {
  const seo = PAGE_SEO.founder;
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ronahi Zebari",
    jobTitle: "Founder and CEO",
    worksFor: {
      "@type": "NGO",
      name: "Light Upon Light",
      url: `${SITE_ORIGIN}/`,
      taxID: "99-2690459",
    },
    url: `${SITE_ORIGIN}/about/ronahi-zebari`,
    sameAs: ["https://www.linkedin.com/in/ronahi-zebari-a7831b35b/"],
    description:
      "Ronahi Zebari is the Founder & CEO of Light Upon Light, a Redmond, Washington 501(c)(3) nonprofit advancing advocacy, accessibility, education, and equality for differently-abled people.",
  };

  return (
    <>
      <Seo {...seo} includeOrganizationSchema jsonLd={personLd} />
      <Header variant="dark" />
      <main className="bg-white min-h-[70vh]">
        <section className="px-4 sm:px-6 pt-12 pb-16 md:pt-16 md:pb-24">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/5] bg-slate-100">
              <img
                src={resolveMediaUrl(siteImages.ronahi)}
                alt="Ronahi Zebari, Founder and CEO of Light Upon Light"
                className="w-full h-full object-cover object-top"
                width={560}
                height={700}
                decoding="async"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7107E7] mb-4">Founder</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                Ronahi Zebari
              </h1>
              <p className="text-lg font-semibold text-[#7107E7] mb-6">Founder &amp; CEO, Light Upon Light</p>
              <div className="space-y-4 text-slate-700 font-medium leading-relaxed">
                <p>
                  Ronahi Zebari is the Founder and CEO of{" "}
                  <Link to="/about" className="text-[#7107E7] font-semibold hover:underline">
                    Light Upon Light
                  </Link>
                  , a 501(c)(3) nonprofit organization based in Redmond, Washington (EIN 99-2690459).
                </p>
                <p>
                  After being denied a cup of tea because of her disability, Ronahi built Light Upon Light from lived
                  experience—not observation—to restore dignity, belonging, and opportunity for differently-abled
                  people.
                </p>
                <p>
                  Under her leadership, Light Upon Light advances advocacy, accessibility, education, and equality
                  through programs such as Enlighten, Big Light Little Light, Signs of Our Light, and community
                  initiatives across Washington and beyond.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center rounded-full bg-[#7107E7] text-white px-5 py-2.5 text-sm font-bold hover:bg-[#5c06bb] transition-colors"
                >
                  About Light Upon Light
                </Link>
                <Link
                  to="/press"
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 hover:border-[#7107E7] transition-colors"
                >
                  Press kit
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer topPaddingClass="pt-[42px] md:pt-[50px]" />
    </>
  );
}
