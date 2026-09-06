import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import type { DonationReceipt } from "../lib/sendDonationThankYou";

export type PayPalDonateButtonsProps = {
  amount: number;
  frequency: "monthly" | "onetime";
  disabled?: boolean;
  onSuccess: (receipt: DonationReceipt) => void;
  onError?: (message: string) => void;
};

export function PayPalDonateButtons({
  amount,
  frequency,
  disabled,
  onSuccess,
  onError,
}: PayPalDonateButtonsProps) {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined;
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  if (!clientId) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900 font-medium leading-relaxed">
        PayPal is not configured yet. Add{" "}
        <code className="font-mono text-xs">VITE_PAYPAL_CLIENT_ID</code> to your environment to
        enable donations.
      </div>
    );
  }
  const value = amount.toFixed(2);
  const description =
    frequency === "monthly"
      ? `Light Upon Light monthly gift of $${value}`
      : `Light Upon Light one-time gift of $${value}`;

  if (isRejected) {
    return (
      <p className="text-sm text-red-600 font-medium text-center">
        PayPal could not load. Check your client ID and try again.
      </p>
    );
  }

  if (isPending) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 py-4 text-center text-sm font-medium text-slate-500">
        Loading PayPal…
      </div>
    );
  }

  return (
    <div className={disabled ? "pointer-events-none opacity-50" : undefined}>
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "donate",
          height: 48,
        }}
        disabled={disabled}
        forceReRender={[value, frequency]}
        createOrder={(_data, actions) =>
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description,
                amount: {
                  currency_code: "USD",
                  value,
                },
              },
            ],
          })
        }
        onApprove={async (_data, actions) => {
          if (!actions.order) {
            onError?.("PayPal did not return an order to capture.");
            return;
          }

          try {
            const details = await actions.order.capture();
            const unit = details.purchase_units?.[0];
            const capturedValue = Number(unit?.amount?.value ?? value);
            const payerName = [details.payer?.name?.given_name, details.payer?.name?.surname]
              .filter(Boolean)
              .join(" ");
            const payerEmail = details.payer?.email_address ?? "";
            const transactionId =
              unit?.payments?.captures?.[0]?.id || details.id || "unknown";

            onSuccess({
              amount: Number.isFinite(capturedValue) ? capturedValue : amount,
              frequency,
              payerName: payerName || "Friend",
              payerEmail,
              transactionId,
            });
          } catch {
            onError?.("We could not complete your PayPal payment. Please try again.");
          }
        }}
        onError={() => {
          onError?.("PayPal reported an error. Please try again in a moment.");
        }}
        onCancel={() => {
          onError?.("Payment was cancelled before it was completed.");
        }}
      />
    </div>
  );
}

export default PayPalDonateButtons;
