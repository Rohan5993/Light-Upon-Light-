/** Update this to your organization Cal.com booking link. */
export const CAL_COM_URL = "https://cal.com/lightuponlight";

export function buildCalComEmbedUrl(params?: { name?: string; email?: string }) {
  const url = new URL(CAL_COM_URL);
  if (params?.name?.trim()) url.searchParams.set("name", params.name.trim());
  if (params?.email?.trim()) url.searchParams.set("email", params.email.trim());
  return url.toString();
}
