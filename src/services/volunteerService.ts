import { getStrapiUrl } from "../lib/strapiUrl";

export type VolunteerApplicationInput = {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  availability: string;
  message: string;
};

const STRAPI_URL = getStrapiUrl();

export function isVolunteerFormConfigured() {
  return Boolean(STRAPI_URL);
}

export async function submitVolunteerApplication(
  input: VolunteerApplicationInput,
): Promise<void> {
  const response = await fetch(`${STRAPI_URL}/api/volunteer-applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        name: input.name.trim(),
        email: input.email.trim(),
        phone: input.phone?.trim() || "",
        interest: input.interest,
        availability: input.availability,
        message: input.message.trim(),
      },
    }),
  });

  if (!response.ok) {
    let detail = "";
    try {
      const payload = (await response.json()) as { error?: { message?: string } };
      detail = payload.error?.message ?? "";
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(
      detail || `Volunteer form submission failed (${response.status})`,
    );
  }
}
