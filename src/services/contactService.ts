/**
 * Free-forever form delivery via FormSubmit (no paid hosting / Render).
 */
const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/lightuponlight1408@gmail.com";

export type ContactInquiryType = "message" | "appointment";

export type ContactMessageInput = {
  inquiryType: ContactInquiryType;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
};

async function submitViaFormSubmit(payload: Record<string, string>): Promise<void> {
  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    let detail = "";
    try {
      const body = (await response.json()) as { message?: string };
      detail = body.message ?? "";
    } catch {
      // ignore
    }
    throw new Error(detail || `Form submission failed (${response.status})`);
  }
}

export async function submitContactMessage(
  input: ContactMessageInput,
): Promise<void> {
  const inquiryType = input.inquiryType;
  const subject =
    input.subject?.trim() ||
    (inquiryType === "appointment" ? "Appointment request" : "Contact message");
  const message =
    input.message?.trim() ||
    (inquiryType === "appointment"
      ? "This person chose Book an Appointment on the contact form."
      : "");

  await submitViaFormSubmit({
    _subject: `${inquiryType === "appointment" ? "Appointment" : "Contact"} — ${input.name.trim()}`,
    form_type: inquiryType,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || "",
    subject,
    message,
  });
}
