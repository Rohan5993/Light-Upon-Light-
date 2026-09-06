import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const env = {};
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function required(env, key) {
  const value = env[key]?.trim();
  if (!value) {
    console.error(`Missing ${key}`);
    return null;
  }
  return value;
}

const env = {
  ...loadEnvFile(resolve(process.cwd(), ".env")),
  ...loadEnvFile(resolve(process.cwd(), ".env.local")),
  ...process.env,
};

const serviceId = required(env, "VITE_EMAILJS_SERVICE_ID");
const templateId = required(env, "VITE_EMAILJS_TEMPLATE_ID");
const publicKey = required(env, "VITE_EMAILJS_PUBLIC_KEY");
const testEmail = env.TEST_DONATION_EMAIL?.trim() || env.VITE_TEST_DONATION_EMAIL?.trim();

if (!serviceId || !templateId || !publicKey) {
  console.error("\nEmailJS is not fully configured in .env yet.");
  console.error("Follow the setup steps in .env.example, then run this script again.");
  process.exit(1);
}

if (!testEmail) {
  console.error("\nAdd TEST_DONATION_EMAIL=your@email.com to .env to choose where the test email goes.");
  process.exit(1);
}

const payload = {
  service_id: serviceId,
  template_id: templateId,
  user_id: publicKey,
  template_params: {
    to_email: testEmail,
    to_name: "Test Donor",
    from_name: "Light Upon Light",
    reply_to: "lightuponlight1408@gmail.com",
    org_email: "lightuponlight1408@gmail.com",
    amount: "$25.00",
    frequency: "One-time",
    transaction_id: "TEST-TRANSACTION-123",
    subject: "Thank you for your $25.00 gift to Light Upon Light",
    message:
      "This is a test thank-you email from the Light Upon Light donation flow. If you received this, EmailJS is configured correctly.",
  },
};

const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await response.text();

if (!response.ok) {
  console.error(`EmailJS test failed (${response.status}): ${body}`);
  process.exit(1);
}

console.log(`EmailJS test succeeded. Check ${testEmail} for the thank-you email.`);
