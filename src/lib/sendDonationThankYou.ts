import emailjs from "@emailjs/browser";

export type DonationReceipt = {
  amount: number;
  frequency: "monthly" | "onetime";
  payerName: string;
  payerEmail: string;
  transactionId: string;
};

const ORG_EMAIL = "lightuponlight1408@gmail.com";

function amountLabel(receipt: DonationReceipt) {
  return receipt.frequency === "monthly"
    ? `$${receipt.amount.toFixed(2)}/month`
    : `$${receipt.amount.toFixed(2)}`;
}

function frequencyLabel(frequency: DonationReceipt["frequency"]) {
  return frequency === "monthly" ? "Monthly" : "One-time";
}

function thankYouMessage(receipt: DonationReceipt) {
  const gift = amountLabel(receipt);
  return [
    `Dear ${receipt.payerName || "Friend"},`,
    "",
    `Thank you for your generous gift of ${gift} to Light Upon Light.`,
    "",
    "Your contribution helps us advance advocacy, accessibility, education, and equality for differently-abled people. We are deeply grateful for your support.",
    "",
    `Transaction ID: ${receipt.transactionId}`,
    "",
    "With love and light,",
    "Light Upon Light",
    ORG_EMAIL,
  ].join("\n");
}

function getEmailJsConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const orgTemplateId = import.meta.env.VITE_EMAILJS_ORG_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  if (!serviceId || !templateId || !publicKey) return null;
  return { serviceId, templateId, orgTemplateId, publicKey };
}

type EmailParams = Record<string, string>;

async function sendTemplate(
  config: NonNullable<ReturnType<typeof getEmailJsConfig>>,
  templateId: string,
  params: EmailParams,
) {
  await emailjs.send(config.serviceId, templateId, params, { publicKey: config.publicKey });
}

/**
 * Sends a thank-you email to the donor and optionally notifies the organization.
 * Uses EmailJS (works on static hosting like GitHub Pages).
 */
export async function sendDonationThankYouEmail(receipt: DonationReceipt): Promise<boolean> {
  if (!receipt.payerEmail) return false;

  const config = getEmailJsConfig();
  if (!config) {
    console.warn(
      "EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.",
    );
    return false;
  }

  const gift = amountLabel(receipt);
  const frequency = frequencyLabel(receipt.frequency);
  const donorName = receipt.payerName || "Friend";

  const donorParams: EmailParams = {
    to_email: receipt.payerEmail,
    to_name: donorName,
    from_name: "Light Upon Light",
    reply_to: ORG_EMAIL,
    org_email: ORG_EMAIL,
    amount: gift,
    frequency,
    transaction_id: receipt.transactionId,
    message: thankYouMessage(receipt),
    subject: `Thank you for your ${gift} gift to Light Upon Light`,
  };

  try {
    await sendTemplate(config, config.templateId, donorParams);
  } catch (error) {
    console.error("Donation thank-you email failed:", error);
    return false;
  }

  if (config.orgTemplateId) {
    const orgParams: EmailParams = {
      to_email: ORG_EMAIL,
      to_name: "Light Upon Light Team",
      donor_email: receipt.payerEmail,
      from_name: "Light Upon Light Donations",
      reply_to: receipt.payerEmail,
      org_email: ORG_EMAIL,
      amount: gift,
      frequency,
      transaction_id: receipt.transactionId,
      message: `New donation received from ${donorName} (${receipt.payerEmail}) for ${gift}.`,
      subject: `New donation: ${gift} from ${donorName}`,
    };

    try {
      await sendTemplate(config, config.orgTemplateId, orgParams);
    } catch (error) {
      console.error("Donation organization notification failed:", error);
    }
  }

  return true;
}

export function isDonationEmailConfigured() {
  return Boolean(getEmailJsConfig());
}
