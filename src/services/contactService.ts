import { getStrapiUrl } from "../lib/strapiUrl";

export type ContactInquiryType = "message" | "appointment";

export type ContactMessageInput = {
  inquiryType: ContactInquiryType;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
};

const STRAPI_URL = getStrapiUrl();

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

  const endpoint =
    inquiryType === "appointment"
      ? `${STRAPI_URL}/api/appointments`
      : `${STRAPI_URL}/api/contact-messages`;

  const payload =
    inquiryType === "appointment"
      ? {
          name: input.name.trim(),
          email: input.email.trim(),
          phone: input.phone?.trim() || "",
          subject,
          message,
        }
      : {
          inquiryType: "message" as const,
          name: input.name.trim(),
          email: input.email.trim(),
          phone: input.phone?.trim() || "",
          subject,
          message,
        };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: payload }),
  });

  if (!response.ok) {
    let detail = "";
    try {
      const body = (await response.json()) as { error?: { message?: string } };
      detail = body.error?.message ?? "";
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(
      detail || `Contact form submission failed (${response.status})`,
    );
  }
}
