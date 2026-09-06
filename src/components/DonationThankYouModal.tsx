import { useEffect } from "react";
import { CheckCircle2, HeartHandshake, X } from "lucide-react";

type DonationThankYouModalProps = {
  open: boolean;
  amount: number;
  frequency: "monthly" | "onetime";
  payerName?: string;
  emailStatus?: "idle" | "sending" | "sent" | "failed";
  onClose: () => void;
};

export default function DonationThankYouModal({
  open,
  amount,
  frequency,
  payerName,
  emailStatus = "idle",
  onClose,
}: DonationThankYouModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const amountLabel =
    frequency === "monthly" ? `$${amount.toFixed(2)}/month` : `$${amount.toFixed(2)}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-thank-you-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        aria-label="Close thank you dialog"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-[1.75rem] bg-white border border-slate-100 shadow-[0_24px_80px_rgba(15,23,42,0.25)] overflow-hidden">
        <div className="bg-gradient-to-br from-sky-50 via-violet-50 to-amber-50 px-6 pt-6 pb-5 border-b border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 border border-slate-200 text-slate-500 flex items-center justify-center hover:text-slate-800 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
          <div className="w-14 h-14 rounded-2xl bg-white text-sky-500 flex items-center justify-center shadow-sm mb-4">
            <CheckCircle2 size={28} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sky-600 mb-2">
            Donation received
          </p>
          <h2 id="donation-thank-you-title" className="text-2xl font-black text-slate-900 tracking-tight">
            Thank you{payerName ? `, ${payerName.split(" ")[0]}` : ""}!
          </h2>
        </div>

        <div className="px-6 py-6 space-y-4">
          <p className="text-slate-600 font-medium leading-relaxed">
            Your contribution of{" "}
            <span className="font-black text-slate-900">{amountLabel}</span> to Light Upon Light
            means the world. You are helping differently-abled people access dignity, opportunity,
            and belonging.
          </p>
          <div className="rounded-2xl bg-[#F7FBFF] border border-sky-100 px-4 py-3 flex items-start gap-3">
            <HeartHandshake size={18} className="text-[#7107E7] shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              {emailStatus === "sending" &&
                "Sending your thank-you email now. PayPal will also send a payment receipt."}
              {emailStatus === "sent" &&
                "A thank-you email is on its way to you. PayPal will also send a payment receipt for your records."}
              {emailStatus === "failed" &&
                "Your payment succeeded. PayPal will send a payment receipt. If a custom thank-you email does not arrive, our email service still needs to be connected."}
              {emailStatus === "idle" &&
                "A thank-you email is on its way to you. PayPal will also send a payment receipt for your records."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl py-3.5 font-black text-sm uppercase tracking-wider bg-sky-500 hover:bg-sky-600 text-white transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
