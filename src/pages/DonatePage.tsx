import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, HeartHandshake, Lock, ShieldCheck, Sparkles, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteImages } from "../assets/siteImages";
import { resolveMediaUrl } from "../lib/publicUrl";
import HoverFillButton from "../components/HoverFillButton";
import HoverFillLink from "../components/HoverFillLink";

const ONE_TIME_AMOUNTS = [25, 50, 100, 250];
const MONTHLY_AMOUNTS = [15, 30, 60, 100];
const DONOR_STORIES = [
  {
    quote:
      "I donated because I wanted real proof that help was reaching families. The updates showed exactly where support went and what changed.",
    name: "Sarah J.",
    role: "Recurring Donor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
  },
  {
    quote:
      "Monthly giving made it easy for me to stay consistent. It feels meaningful knowing my support helps programs run every single month.",
    name: "David R.",
    role: "Community Sponsor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
  },
  {
    quote:
      "I started with a one-time donation and quickly saw impact stories that felt honest and transparent. That trust is why I kept giving.",
    name: "Amina K.",
    role: "First-time to Ongoing Donor",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
  },
  {
    quote:
      "What stood out most was how fast support reached people in need. The organization combines compassion with real execution.",
    name: "Michael T.",
    role: "Monthly Donor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  },
];

type Frequency = "monthly" | "onetime";

export default function DonatePage() {
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number>(MONTHLY_AMOUNTS[1]);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const amountOptions = frequency === "monthly" ? MONTHLY_AMOUNTS : ONE_TIME_AMOUNTS;

  const finalAmount = useMemo(() => {
    const parsedCustom = Number(customAmount);
    if (!Number.isNaN(parsedCustom) && parsedCustom > 0) {
      return parsedCustom;
    }
    return selectedAmount;
  }, [customAmount, selectedAmount]);

  const ctaText =
    frequency === "monthly"
      ? `Donate $${finalAmount}/month`
      : `Donate $${finalAmount} now`;
  const activeStory = DONOR_STORIES[activeStoryIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % DONOR_STORIES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-[#f8f5ff] min-h-screen selection:bg-purple-100 font-sans flex flex-col">
      <Header variant="dark" />

      <main className="w-full">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
            <div className="absolute inset-0 flex">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-full flex-1 border-r border-black" />
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-1 md:py-3 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-purple-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white mb-6">
                <Sparkles size={12} className="text-purple-600" />
                Give Hope Today
              </div>
              <h1 className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-6">
                Your generosity turns compassion into real, measurable impact.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">
                Every donation helps us fund education support, health initiatives, and community care for families who need it most. Choose a gift that feels right for you and help us continue this work.
              </p>

              <div className="relative rounded-[1.75rem] overflow-hidden border border-purple-100 shadow-sm mb-8 max-w-2xl">
                <img
                  src={siteImages.donation}
                  alt="Community support through donations"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                <div className="absolute left-5 bottom-5 text-white">
                  <p className="text-[11px] uppercase tracking-widest font-black text-purple-200 mb-1">Why Donate Today</p>
                  <p className="text-lg md:text-xl font-bold max-w-md">Because a timely gift can fund real help for a family this week.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white border border-gray-100 p-5">
                  <p className="text-2xl font-black text-gray-900">8,000+</p>
                  <p className="text-sm text-gray-500 font-medium">Volunteers activated</p>
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 p-5">
                  <p className="text-2xl font-black text-gray-900">120+</p>
                  <p className="text-sm text-gray-500 font-medium">Community events hosted</p>
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 p-5">
                  <p className="text-2xl font-black text-gray-900">501(c)(3)</p>
                  <p className="text-sm text-gray-500 font-medium">Tax-deductible giving</p>
                </div>
              </div>
            </div>

            <div id="top-donate-card" className="bg-white rounded-[2rem] border border-gray-100 shadow-md p-7 md:p-8 lg:min-h-[620px] flex flex-col">
              <div>
              <div className="mb-5">
                <h2 className="text-xl font-black text-gray-900">Choose your gift</h2>
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Most supporters choose monthly giving for steady, year-round support that helps families consistently.
              </p>

              <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setFrequency("monthly");
                    setSelectedAmount(MONTHLY_AMOUNTS[1]);
                    setCustomAmount("");
                  }}
                  className={`rounded-lg py-2.5 text-sm font-black transition-all ${
                    frequency === "monthly" ? "bg-white text-purple-600 shadow-sm" : "text-gray-500"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFrequency("onetime");
                    setSelectedAmount(ONE_TIME_AMOUNTS[1]);
                    setCustomAmount("");
                  }}
                  className={`rounded-lg py-2.5 text-sm font-black transition-all ${
                    frequency === "onetime" ? "bg-white text-purple-600 shadow-sm" : "text-gray-500"
                  }`}
                >
                  One-Time
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {amountOptions.map((amount) => {
                  const isActive = !customAmount && selectedAmount === amount;
                  const isRecommended = amount === amountOptions[1];
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setCustomAmount("");
                        setSelectedAmount(amount);
                      }}
                      className={`relative rounded-xl border px-4 py-3 text-left transition-all ${
                        isActive
                          ? "border-purple-400 bg-purple-50"
                          : "border-gray-200 bg-white hover:border-purple-200"
                      }`}
                    >
                      <p className="text-lg font-black text-gray-900">${amount}</p>
                      {isRecommended && (
                        <span className="absolute -top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-purple-600 text-white font-black uppercase tracking-wide">
                          Most Impact
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <label className="block text-xs uppercase tracking-widest font-black text-gray-400 mb-2">
                Custom amount
              </label>
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">$</span>
                <input
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value.replace(/[^\d]/g, ""))}
                  inputMode="numeric"
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-9 pr-4 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              </div>

              <div className="pt-4">
                <HoverFillButton
                  type="button"
                  variant="purple"
                  className="w-full py-4 font-black text-sm uppercase tracking-wider"
                >
                  {ctaText}
                </HoverFillButton>

                <p className="mt-3 text-center text-xs text-gray-500">
                  {frequency === "monthly"
                    ? "You can pause or update your monthly gift anytime."
                    : "One-time gifts provide immediate support where needed most."}
                </p>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                  <Lock size={14} className="text-purple-500" />
                  Secure donation form - payment integration coming next
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mt-4 mb-10 py-4 md:py-6">
          <div className="rounded-[2rem] border border-purple-100 bg-white p-7 md:p-8 grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-purple-600 mt-0.5" size={20} />
              <div>
                <p className="font-black text-gray-900">Trusted nonprofit</p>
                <p className="text-sm text-gray-500">Registered 501(c)(3), EIN 99-2690459.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="text-purple-600 mt-0.5" size={20} />
              <div>
                <p className="font-black text-gray-900">Community-powered</p>
                <p className="text-sm text-gray-500">Local teams deliver support where it matters most.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <HeartHandshake className="text-purple-600 mt-0.5" size={20} />
              <div>
                <p className="font-black text-gray-900">Transparent impact</p>
                <p className="text-sm text-gray-500">Clear outcomes and regular impact reporting.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-10 md:py-12 mb-10">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Where your donation goes</h2>
            <p className="text-gray-500 mt-3 max-w-2xl">
              We direct every contribution to practical programs that deliver immediate help and long-term resilience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Education Access",
                percent: "40%",
                desc: "School materials, mentorship, and learning support for youth.",
                image: siteImages.heroWheelchair,
              },
              {
                title: "Health & Wellbeing",
                percent: "35%",
                desc: "Community wellness initiatives and essential care access.",
                image: siteImages.wheelchairMeeting,
              },
              {
                title: "Community Relief",
                percent: "25%",
                desc: "Direct aid, emergency response, and family stabilization.",
                image: siteImages.donation,
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-widest text-purple-600 font-black mb-3">{item.percent}</p>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-14">
          <div className="bg-[#270E32] rounded-[2.5rem] p-9 md:p-12 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
              <div className="grid md:grid-cols-[88px_1fr] gap-4 items-start">
                <img
                  src={resolveMediaUrl(activeStory.image)}
                  alt="Donor portrait"
                  className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-2xl object-cover border border-white/20"
                />
                <div>
                <p className="text-[11px] uppercase tracking-widest font-black text-purple-200 mb-3">Donor Story</p>
                <blockquote className="text-lg sm:text-xl md:text-2xl leading-snug font-bold mb-4">
                  “{activeStory.quote}”
                </blockquote>
                <p className="text-purple-100 font-medium">— {activeStory.name}, {activeStory.role}</p>
                <div className="mt-5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStoryIndex((prev) =>
                        prev === 0 ? DONOR_STORIES.length - 1 : prev - 1
                      )
                    }
                    className="w-8 h-8 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                    aria-label="Previous donor story"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStoryIndex((prev) => (prev + 1) % DONOR_STORIES.length)
                    }
                    className="w-8 h-8 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                    aria-label="Next donor story"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/15">
                <p className="text-sm text-purple-100 mb-4">When you donate today, your support helps us reach more families this month.</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-purple-200 mt-0.5" />
                    <span>Fast deployment to active community programs</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-purple-200 mt-0.5" />
                    <span>Tax-deductible contribution receipt</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-purple-200 mt-0.5" />
                    <span>Impact updates from the field</span>
                  </li>
                </ul>
                <HoverFillLink
                  href="#top-donate-card"
                  variant="white"
                  className="w-full py-3 font-black"
                >
                  Donate Now
                </HoverFillLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer className="mt-20 pb-10" topPaddingClass="pt-[80px]" />
    </div>
  );
}
