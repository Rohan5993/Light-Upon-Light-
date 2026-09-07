/**
 * Free-forever form delivery via FormSubmit (no paid hosting).
 * Activates once via confirmation email to the org inbox.
 */
const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/lightuponlight1408@gmail.com";

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

export type VolunteerApplicationInput = {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  availability: string;
  message: string;
};

export function isVolunteerFormConfigured() {
  return true;
}

export async function submitVolunteerApplication(
  input: VolunteerApplicationInput,
): Promise<void> {
  await submitViaFormSubmit({
    _subject: `Volunteer application — ${input.name.trim()}`,
    form_type: "volunteer",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || "",
    interest: input.interest,
    availability: input.availability,
    message: input.message.trim(),
  });
}
