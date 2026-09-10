import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { PAGE_SEO } from "../data/seo";

const BOILERPLATE = `Light Upon Light is a 501(c)(3) nonprofit (EIN 99-2690459) based in Redmond, Washington. Founded in 2024 by Ronahi Zebari, the organization advances advocacy, accessibility, education, and equality for differently-abled people. Website: https://thelightuponlight.org/`;

export default function PressPage() {
  const seo = PAGE_SEO.press;

  return (
    <>
      <Seo {...seo} includeOrganizationSchema />
      <Header variant="dark" />
      <main className="bg-white min-h-[70vh]">
        <section className="px-4 sm:px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7107E7] mb-4">Press</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              Press &amp; Media Kit
            </h1>
            <p className="text-slate-600 font-medium leading-relaxed mb-10">
              Use this page for accurate naming, facts, and contact details when covering{" "}
              <Link to="/about" className="text-[#7107E7] font-semibold hover:underline">
                Light Upon Light
              </Link>
              .
            </p>

            <div className="space-y-8">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Official boilerplate</h2>
                <p className="text-slate-700 leading-relaxed">{BOILERPLATE}</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-3">Quick facts</h2>
                <ul className="space-y-2 text-slate-700 font-medium">
                  <li>Legal name: Light Upon Light</li>
                  <li>EIN: 99-2690459</li>
                  <li>Status: 501(c)(3) nonprofit organization</li>
                  <li>Founded: 2024</li>
                  <li>Founder &amp; CEO: Ronahi Zebari</li>
                  <li>Headquarters: 16305 NE 87th St, Redmond, WA 98052</li>
                  <li>Additional location: Everett, WA</li>
                  <li>Website: https://thelightuponlight.org/</li>
                  <li>Email: Info@thelightuponlight.org</li>
                  <li>Phone: 206-766-0884</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-3">About this Light Upon Light</h2>
                <p className="text-slate-700 leading-relaxed">
                  Light Upon Light (EIN 99-2690459) is a Washington State 501(c)(3) nonprofit founded by Ronahi Zebari.
                  We are a disability advocacy and accessibility organization based in Redmond and Everett, Washington.
                  We are not affiliated with similarly named conference, religious, or international event brands that
                  also use the phrase “Light Upon Light.”
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-3">Media contact</h2>
                <p className="text-slate-700 leading-relaxed">
                  Email{" "}
                  <a className="text-[#7107E7] font-semibold hover:underline" href="mailto:Info@thelightuponlight.org">
                    Info@thelightuponlight.org
                  </a>{" "}
                  or call{" "}
                  <a className="text-[#7107E7] font-semibold hover:underline" href="tel:2067660884">
                    206-766-0884
                  </a>
                  . Founder bio:{" "}
                  <Link to="/about/ronahi-zebari" className="text-[#7107E7] font-semibold hover:underline">
                    Ronahi Zebari
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer topPaddingClass="pt-[42px] md:pt-[50px]" />
    </>
  );
}
