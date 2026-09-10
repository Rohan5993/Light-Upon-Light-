import { useEffect, useMemo, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
  HeartHandshake,
} from "lucide-react";
import Header from "../components/Header";
import Seo from "../components/Seo";
import { PAGE_SEO } from "../data/seo";
import Footer from "../components/Footer";
import { siteImages } from "../assets/siteImages";
import { resolveMediaUrl } from "../lib/publicUrl";
import PayPalDonateButtons from "../components/PayPalDonateButtons";
import DonationThankYouModal from "../components/DonationThankYouModal";
import {
  sendDonationThankYouEmail,
  type DonationReceipt,
} from "../lib/sendDonationThankYou";

const ONE_TIME_AMOUNTS = [25, 50, 100, 250];
const MONTHLY_AMOUNTS = [15, 30, 60, 100];
const DONOR_STORIES = [
  {
    quote:
      "I donated because I wanted real proof that help was reaching families. The updates showed exactly where support went and what changed.",
    name: "Sarah J.",
    role: "Recurring Donor",
  },
  {
    quote:
      "Monthly giving made it easy for me to stay consistent. It feels meaningful knowing my support helps programs run every single month.",
    name: "David R.",
    role: "Community Sponsor",
  },
  {
    quote:
      "I started with a one-time donation and quickly saw impact stories that felt honest and transparent. That trust is why I kept giving.",
    name: "Amina K.",
    role: "First-time to Ongoing Donor",
  },
  {
    quote:
      "What stood out most was how fast support reached people in need. The organization combines compassion with real execution.",
    name: "Michael T.",
    role: "Monthly Donor",
  },
];

const ALLOCATION = [
  {
    title: "Education",
    percent: "40%",
    percentValue: 40,
    desc: "Inclusive education that helps students better understand and include differently-abled people.",
    image: siteImages.education,
    color: "blue" as const,
  },
  {
    title: "Workforce Development",
    percent: "35%",
    percentValue: 35,
    desc: "Accessible baking experiences that help differently-abled people build practical skills, confidence, and pathways to employment.",
    image: siteImages.workforce,
    color: "purple" as const,
  },
  {
    title: "Mobility Aid Distribution",
    percent: "25%",
    percentValue: 25,
    desc: "Providing wheelchairs and other mobility aids to differently-abled people in need abroad.",
    image: siteImages.mobility,
    color: "yellow" as const,
  },
];

const palette = {
  blue: {
    chip: "bg-sky-100 text-sky-700 border-sky-200",
    dot: "bg-sky-400",
    heading: "text-sky-600",
    card: "bg-sky-50 border-sky-100",
    icon: "bg-sky-100 text-sky-600",
  },
  purple: {
    chip: "bg-violet-100 text-violet-700 border-violet-200",
    dot: "bg-violet-400",
    heading: "text-violet-600",
    card: "bg-violet-50 border-violet-100",
    icon: "bg-violet-100 text-violet-600",
  },
  yellow: {
    chip: "bg-amber-100 text-amber-800 border-amber-200",
    dot: "bg-amber-400",
    heading: "text-amber-600",
    card: "bg-amber-50 border-amber-100",
    icon: "bg-amber-100 text-amber-700",
  },
};

type Frequency = "monthly" | "onetime";

export default function DonatePage() {
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number>(MONTHLY_AMOUNTS[1]);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [thankYou, setThankYou] = useState<DonationReceipt | null>(null);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const amountOptions = frequency === "monthly" ? MONTHLY_AMOUNTS : ONE_TIME_AMOUNTS;

  const finalAmount = useMemo(() => {
    const parsedCustom = Number(customAmount);
    if (!Number.isNaN(parsedCustom) && parsedCustom > 0) return parsedCustom;
    return selectedAmount;
  }, [customAmount, selectedAmount]);

  const canDonate = finalAmount >= 1;
  const activeStory = DONOR_STORIES[activeStoryIndex];
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID?.trim();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % DONOR_STORIES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDonationSuccess = async (receipt: DonationReceipt) => {
    setPaymentError(null);
    setThankYou(receipt);
    setEmailStatus("sending");
    const sent = await sendDonationThankYouEmail(receipt);
    setEmailStatus(sent ? "sent" : "failed");
  };

  return (
    <>
      <Seo {...PAGE_SEO.donate} />
      <Header variant="dark" />
      <PayPalScriptProvider
        options={{
          clientId: paypalClientId ?? "",
          currency: "USD",
          intent: "capture",
          components: "buttons",
        }}
        deferLoading={!paypalClientId}
      >
      <div className="min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)] font-sans flex flex-col bg-[#FAFCFF] selection:bg-violet-100 overflow-x-hidden">

      <main className="flex-1">
        {/* Bento hero */}
        <section className="px-4 sm:px-6 pt-10 pb-16 md:pt-14 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-5 md:gap-6 items-start">
              <div className="lg:col-span-7 flex flex-col gap-5 md:gap-6 min-w-0">
              {/* Headline block */}
              <div className="rounded-2xl sm:rounded-[2rem] bg-white border border-slate-100 p-5 sm:p-8 md:p-10 shadow-[0_4px_32px_rgba(148,163,184,0.1)] relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-violet-100/60 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-sky-100/70 rounded-full blur-2xl pointer-events-none" />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFBEA] border border-[#F3E8C8] text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-6">
                    <Sparkles size={11} className="text-violet-500" />
                    Give Hope Today
                  </span>
                  <h1 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.65rem] font-bold text-slate-800 leading-[1.12] tracking-tight mb-5">
                    Turn your{" "}
                    <span className="text-violet-500">compassion</span> into{" "}
                    <span className="text-sky-500">real change</span> for families who need it.
                  </h1>
                  <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl mb-8">
                    Every gift funds education, health, and community care. Pick an amount that feels right, monthly or one-time.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "8K+", label: "Volunteers", key: "blue" as const },
                      { value: "120+", label: "Events", key: "purple" as const },
                      { value: "501(c)(3)", label: "Tax-deductible", key: "yellow" as const },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className={`rounded-2xl border px-5 py-3 ${palette[stat.key].card}`}
                      >
                        <p
                          className={`text-xl font-black ${stat.value === "501(c)(3)" ? "text-black" : palette[stat.key].heading}`}
                        >
                          {stat.value}
                        </p>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image bento */}
              <div className="rounded-[2rem] overflow-hidden border-2 border-sky-100 bg-sky-50/50 relative aspect-[16/10] md:aspect-[2/1] lg:aspect-[16/9]">
                <img
                  src={siteImages.donationPage}
                  alt="Community support"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200 mb-1">
                    Why give today
                  </p>
                  <p className="text-white font-bold text-lg md:text-xl max-w-md leading-snug">
                    A single gift can put real help in a family&apos;s hands this week.
                  </p>
                </div>
              </div>
              </div>

              {/* Donate form */}
              <div
                id="top-donate-card"
                className="lg:col-span-5 lg:sticky lg:top-28 xl:top-32 rounded-2xl sm:rounded-[2rem] p-[3px] bg-gradient-to-br from-sky-200 via-violet-200 to-amber-200 shadow-[0_12px_48px_rgba(139,92,246,0.12)]"
              >
                <div className="rounded-[calc(1rem-3px)] sm:rounded-[calc(2rem-3px)] bg-white h-full flex flex-col overflow-hidden">
                  <div className="px-5 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-slate-100 bg-gradient-to-r from-sky-50/80 via-white to-amber-50/80">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <span className="w-2 h-2 rounded-full bg-violet-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">Make a gift</h2>
                    <p className="text-sm text-slate-500 mt-1">Select frequency and amount below.</p>
                  </div>

                  <div className="p-5 sm:p-7 md:p-8 flex flex-col flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                      Gift frequency
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {(["monthly", "onetime"] as const).map((mode) => {
                        const active = frequency === mode;
                        const isMonthly = mode === "monthly";
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => {
                              setFrequency(mode);
                              setSelectedAmount(isMonthly ? MONTHLY_AMOUNTS[1] : ONE_TIME_AMOUNTS[1]);
                              setCustomAmount("");
                              setPaymentError(null);
                            }}
                            className={`rounded-2xl border-2 px-4 py-4 text-left transition-all ${
                              active
                                ? isMonthly
                                  ? "border-sky-300 bg-sky-50 shadow-sm"
                                  : "border-violet-300 bg-violet-50 shadow-sm"
                                : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                            }`}
                          >
                            <p
                              className={`text-sm font-black ${
                                active
                                  ? isMonthly
                                    ? "text-sky-600"
                                    : "text-violet-600"
                                  : "text-slate-500"
                              }`}
                            >
                              {isMonthly ? "Monthly" : "One-Time"}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {isMonthly ? "Steady year-round support" : "Give once today"}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                      Select amount
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {amountOptions.map((amount) => {
                        const active = !customAmount && selectedAmount === amount;
                        return (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => {
                              setCustomAmount("");
                              setSelectedAmount(amount);
                              setPaymentError(null);
                            }}
                            className={`relative min-w-[3.75rem] sm:min-w-[4.5rem] flex-1 rounded-full border-2 px-3 sm:px-4 py-2.5 font-black text-sm sm:text-base transition-all ${
                              active
                                ? "border-[#F3E8C8] bg-[#FFFBEA] text-amber-900"
                                : "border-slate-100 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50"
                            }`}
                          >
                            ${amount}
                          </button>
                        );
                      })}
                    </div>

                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                      Or enter custom amount
                    </label>
                    <div className="relative mb-6">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 font-black text-lg">
                        $
                      </span>
                      <input
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value.replace(/[^\d]/g, ""));
                          setPaymentError(null);
                        }}
                        inputMode="numeric"
                        placeholder="0"
                        className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-3.5 pl-10 pr-4 text-xl font-black text-slate-800 focus:outline-none focus:border-violet-300 focus:bg-white"
                      />
                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-violet-50 to-amber-50 border border-violet-100 px-5 py-4 mb-5 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500 mb-1">
                        Your gift total
                      </p>
                      <p className="text-3xl font-black text-slate-800">
                        ${finalAmount}
                        {frequency === "monthly" && (
                          <span className="text-lg font-bold text-violet-500">/month</span>
                        )}
                      </p>
                    </div>

                    {!canDonate && (
                      <p className="mb-3 text-center text-xs font-medium text-amber-700">
                        Enter at least $1 to continue with PayPal.
                      </p>
                    )}

                    <div className="min-h-[150px]">
                    <PayPalDonateButtons
                      amount={finalAmount}
                      frequency={frequency}
                      disabled={!canDonate}
                      onSuccess={handleDonationSuccess}
                      onError={(message) => {
                        if (message.includes("cancelled")) {
                          setPaymentError(null);
                          return;
                        }
                        setPaymentError(message);
                      }}
                    />
                    </div>

                    {paymentError && (
                      <p className="mt-3 text-center text-xs font-medium text-red-600">{paymentError}</p>
                    )}

                    <p className="mt-3 text-center text-xs text-slate-400">
                      {frequency === "monthly"
                        ? "PayPal will charge your selected monthly amount now. You can set up automatic renewals in your PayPal account after checkout."
                        : "Goes where help is needed most."}
                    </p>
                    <div className="mt-3 inline-flex items-center justify-center gap-2 mx-auto px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
                      <Lock size={12} className="text-sky-500" />
                      Secure checkout powered by PayPal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust band */}
        <section className="bg-gradient-to-r from-sky-50 via-violet-50 to-amber-50 border-y border-white py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Trusted nonprofit", desc: "501(c)(3), EIN 99-2690459.", color: "blue" as const },
              { icon: Users, title: "Community-powered", desc: "Local teams where it matters.", color: "purple" as const },
              { icon: HeartHandshake, title: "Transparent impact", desc: "Clear outcomes, regular updates.", color: "yellow" as const },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className={`flex items-start gap-4 rounded-2xl border p-5 bg-white/70 backdrop-blur-sm ${palette[color].card}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${palette[color].icon}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{title}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Allocation */}
        <section className="px-4 sm:px-6 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500 mb-2">Your impact</p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Where your donation goes</h2>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                Practical programs with immediate help and long-term resilience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {ALLOCATION.map((item) => {
                const c = palette[item.color];
                return (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-2 w-full bg-slate-100">
                      <div
                        className={`h-full ${c.dot}`}
                        style={{ width: `${item.percentValue}%` }}
                      />
                    </div>
                    <img
                      src={resolveMediaUrl(item.image)}
                      alt={item.title}
                      className={`w-full h-44 object-cover ${
                        item.title === "Education"
                          ? "object-[center_28%]"
                          : "object-center"
                      }`}
                    />
                    <div className="p-6">
                      <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border mb-3 ${c.chip}`}>
                        {item.percent}
                      </span>
                      <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Donor story */}
        <section className="px-4 sm:px-6 pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-violet-50 via-sky-50 to-amber-50 border border-violet-100 p-5 sm:p-8 md:p-12">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-10 items-start">
              <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500 mb-3">Donor story</p>
                  <blockquote className="text-base sm:text-lg md:text-xl font-bold text-slate-700 leading-snug mb-4">
                    &ldquo;{activeStory.quote}&rdquo;
                  </blockquote>
                  <p className="text-sm font-semibold text-violet-600">
                    {activeStory.name}, {activeStory.role}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStoryIndex((prev) => (prev === 0 ? DONOR_STORIES.length - 1 : prev - 1))
                      }
                      className="w-9 h-9 rounded-full border-2 border-violet-200 bg-white text-violet-600 flex items-center justify-center hover:bg-violet-50 transition-colors"
                      aria-label="Previous story"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStoryIndex((prev) => (prev + 1) % DONOR_STORIES.length)}
                      className="w-9 h-9 rounded-full border-2 border-violet-200 bg-white text-violet-600 flex items-center justify-center hover:bg-violet-50 transition-colors"
                      aria-label="Next story"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
              </div>

              <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm w-full md:w-auto md:min-w-[260px] max-w-full">
                <ul className="space-y-3 mb-6">
                  {[
                    "Fast deployment to programs",
                    "Tax-deductible receipt",
                    "Field impact updates",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-sky-500 shrink-0 mt-0.5" />
                      {text}
                    </li>
                  ))}
                </ul>
                <a
                  href="#top-donate-card"
                  className="block w-full text-center rounded-2xl py-3.5 font-black text-sm bg-[#38BDF8] hover:bg-sky-500 text-white transition-colors"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer className="mt-0" topPaddingClass="pt-[42px]" />

      <DonationThankYouModal
        open={Boolean(thankYou)}
        amount={thankYou?.amount ?? finalAmount}
        frequency={thankYou?.frequency ?? frequency}
        payerName={thankYou?.payerName}
        emailStatus={emailStatus}
        onClose={() => {
          setThankYou(null);
          setEmailStatus("idle");
        }}
      />
    </div>
      </PayPalScriptProvider>
    </>
  );
}
