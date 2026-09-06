#!/usr/bin/env node
/**
 * Verify free-stack wiring after deploy:
 *   GitHub Pages site → Render Strapi → Supabase Postgres
 *
 * Usage:
 *   STRAPI_URL=https://light-upon-light-strapi.onrender.com node scripts/verify-free-stack.mjs
 *   STRAPI_URL=... SITE_URL=https://rohan5993.github.io/Light-Upon-Light- node scripts/verify-free-stack.mjs
 */

const STRAPI_URL = (process.env.STRAPI_URL || process.env.VITE_STRAPI_URL || "")
  .replace(/\/$/, "");
const SITE_URL = (process.env.SITE_URL || "").replace(/\/$/, "");

if (!STRAPI_URL) {
  console.error("Set STRAPI_URL (or VITE_STRAPI_URL) to your Render Strapi URL.");
  process.exit(1);
}

async function check(label, url, init) {
  const started = Date.now();
  try {
    const res = await fetch(url, init);
    const ms = Date.now() - started;
    let body = "";
    try {
      body = await res.text();
    } catch {
      // ignore
    }
    const ok = res.ok;
    console.log(`${ok ? "OK" : "FAIL"} ${label} [${res.status}] ${ms}ms`);
    if (!ok && body) console.log(`  ${body.slice(0, 240)}`);
    return ok;
  } catch (err) {
    console.log(`FAIL ${label}: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

async function main() {
  console.log(`Strapi: ${STRAPI_URL}`);
  if (SITE_URL) console.log(`Site:   ${SITE_URL}`);
  console.log("");

  const results = [];

  results.push(await check("health", `${STRAPI_URL}/_health`));
  results.push(
    await check("blog find (public)", `${STRAPI_URL}/api/blog-posts?pagination[pageSize]=1`),
  );

  const stamp = Date.now();
  results.push(
    await check("volunteer create", `${STRAPI_URL}/api/volunteer-applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          name: `Verify Bot ${stamp}`,
          email: `verify+${stamp}@example.com`,
          phone: "",
          interest: "Event & Program Support",
          availability: "Weekends",
          message: "Automated free-stack verification.",
        },
      }),
    }),
  );

  results.push(
    await check("contact message create", `${STRAPI_URL}/api/contact-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          inquiryType: "message",
          name: `Verify Contact ${stamp}`,
          email: `contact+${stamp}@example.com`,
          phone: "",
          subject: "Free stack verify",
          message: "Automated contact message verification.",
        },
      }),
    }),
  );

  results.push(
    await check("appointment create", `${STRAPI_URL}/api/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          name: `Verify Appt ${stamp}`,
          email: `appt+${stamp}@example.com`,
          phone: "2065550100",
          subject: "Appointment request",
          message: "This person chose Book an Appointment on the contact form.",
        },
      }),
    }),
  );

  if (SITE_URL) {
    results.push(await check("site home", SITE_URL));
  }

  const failed = results.filter((r) => !r).length;
  console.log("");
  if (failed) {
    console.error(`${failed} check(s) failed.`);
    process.exit(1);
  }
  console.log("All checks passed.");
}

main();
