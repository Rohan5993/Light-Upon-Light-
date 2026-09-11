import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const indexPath = join(distDir, "index.html");

const ROUTES = [
  {
    path: "/",
    file: "index.html",
    title: "Light Upon Light | Disability Advocacy Nonprofit in WA",
    description:
      "Light Upon Light is a 501(c)(3) nonprofit in Redmond, Washington, led by Ronahi Zebari. We advance advocacy, accessibility, education, and equality for differently-abled people. EIN 99-2690459.",
    h1: "Their Light Is Already There. Help Us Let It Shine",
    body: "We exist to help differently-abled people through advocacy, accessibility, and equality while changing society's perceptions through education.",
  },
  {
    path: "/about",
    file: "about/index.html",
    title: "About Light Upon Light | Our Mission, Founder & Board",
    description:
      "Learn about Light Upon Light (EIN 99-2690459), a Washington 501(c)(3) nonprofit founded by Ronahi Zebari for advocacy, accessibility, education, and equality for differently-abled people.",
    h1: "About Light Upon Light",
    body: "Light Upon Light (EIN 99-2690459) is a Washington State 501(c)(3) nonprofit founded by Ronahi Zebari. We are a disability advocacy and accessibility organization based in Redmond and Everett, Washington. We are not affiliated with similarly named conference, religious, or international event brands that also use the phrase Light Upon Light.",
  },
  {
    path: "/about/ronahi-zebari",
    file: "about/ronahi-zebari/index.html",
    title: "Ronahi Zebari | Founder & CEO of Light Upon Light",
    description:
      "Ronahi Zebari is the Founder & CEO of Light Upon Light, a Redmond, Washington 501(c)(3) nonprofit advancing dignity and inclusion for differently-abled people.",
    h1: "Ronahi Zebari, Founder & CEO of Light Upon Light",
    body: "Ronahi Zebari is the Founder and CEO of Light Upon Light, a 501(c)(3) nonprofit based in Redmond, Washington. After being denied a cup of tea because of her disability, she built Light Upon Light to advance advocacy, accessibility, education, and equality for differently-abled people.",
  },
  {
    path: "/press",
    file: "press/index.html",
    title: "Press & Media Kit | Light Upon Light",
    description:
      "Official boilerplate, facts, and media contacts for Light Upon Light, a 501(c)(3) disability advocacy nonprofit in Redmond, Washington.",
    h1: "Press & Media Kit",
    body: "Light Upon Light is a 501(c)(3) nonprofit (EIN 99-2690459) based in Redmond, Washington. Website: https://thelightuponlight.org/. Media contact: Info@thelightuponlight.org. Phone: 206-766-0884.",
  },
  {
    path: "/programs",
    file: "programs/index.html",
    title: "Programs | Light Upon Light",
    description:
      "Explore Light Upon Light programs for education, mentorship, accessibility, workforce development, and community support for differently-abled people.",
    h1: "Our Radiant Programs",
    body: "Light Upon Light programs include Enlighten, Big Light Little Light, Light Desserts, Signs of Our Light, Sending Light Abroad, and Meet Our Light—hands-on initiatives for differently-abled people and inclusive communities.",
  },
  {
    path: "/programs/enlighten",
    file: "programs/enlighten/index.html",
    title: "Enlighten Program | Light Upon Light",
    description: "Enlighten is Light Upon Light’s in-school program helping students understand and include differently-abled people.",
    h1: "Enlighten",
    body: "Enlighten is Light Upon Light’s in-school educational program designed to help primary and secondary students better understand differently-abled people through education, empathy, and meaningful conversation.",
  },
  {
    path: "/programs/big-light-little-light",
    file: "programs/big-light-little-light/index.html",
    title: "Big Light, Little Light | Light Upon Light",
    description: "Mentorship connecting differently-abled mentors and youth through Light Upon Light.",
    h1: "Big Light, Little Light",
    body: "Big Light, Little Light is Light Upon Light’s mentorship program connecting experienced differently-abled individuals with differently-abled youth.",
  },
  {
    path: "/programs/light-desserts",
    file: "programs/light-desserts/index.html",
    title: "Light Desserts | Light Upon Light",
    description: "Accessible baking and workforce development through Light Upon Light.",
    h1: "Light Desserts",
    body: "Light Desserts is Light Upon Light’s accessible baking and workforce development experience for differently-abled people.",
  },
  {
    path: "/programs/signs-of-our-light",
    file: "programs/signs-of-our-light/index.html",
    title: "Signs of Our Light | Light Upon Light",
    description: "Accessibility evaluations and ADA-aligned recommendations from Light Upon Light.",
    h1: "Signs of Our Light",
    body: "Signs of Our Light is Light Upon Light’s accessibility evaluation initiative for schools, businesses, and public spaces.",
  },
  {
    path: "/programs/sending-light-abroad",
    file: "programs/sending-light-abroad/index.html",
    title: "Sending Light Abroad | Light Upon Light",
    description: "Mobility aid distribution abroad through Light Upon Light.",
    h1: "Sending Light Abroad",
    body: "Sending Light Abroad provides wheelchairs and other mobility aids to differently-abled people in need through Light Upon Light.",
  },
  {
    path: "/programs/meet-our-light",
    file: "programs/meet-our-light/index.html",
    title: "Meet Our Light | Light Upon Light",
    description: "At-your-door donation and community connection through Light Upon Light.",
    h1: "Meet Our Light",
    body: "Meet Our Light is Light Upon Light’s at-your-door donation service that makes giving easier and more accessible.",
  },
  {
    path: "/volunteer",
    file: "volunteer/index.html",
    title: "Volunteer | Light Upon Light",
    description: "Volunteer with Light Upon Light and help advance inclusion for differently-abled people.",
    h1: "Volunteer with Light Upon Light",
    body: "Volunteer with Light Upon Light, a Redmond, Washington 501(c)(3) nonprofit, and help bring advocacy, accessibility, education, and equality to life.",
  },
  {
    path: "/donate",
    file: "donate/index.html",
    title: "Donate | Light Upon Light 501(c)(3)",
    description: "Support Light Upon Light, a tax-deductible 501(c)(3) nonprofit (EIN 99-2690459).",
    h1: "Donate to Light Upon Light",
    body: "Donate to Light Upon Light, a 501(c)(3) nonprofit (EIN 99-2690459) based in Redmond, Washington. Donations support advocacy, accessibility, education, and equality for differently-abled people.",
  },
  {
    path: "/contact",
    file: "contact/index.html",
    title: "Contact Light Upon Light | Redmond, WA",
    description: "Contact Light Upon Light at 16305 NE 87th St, Redmond, WA 98052 or Info@thelightuponlight.org.",
    h1: "Contact Light Upon Light",
    body: "Contact Light Upon Light at 16305 NE 87th St, Redmond, WA 98052. Email Info@thelightuponlight.org. Phone 206-766-0884. Official website https://thelightuponlight.org/.",
  },
  {
    path: "/blog",
    file: "blog/index.html",
    title: "Blog & Stories | Light Upon Light",
    description: "Stories and insights from Light Upon Light on disability inclusion and accessibility.",
    h1: "Stories that Inspire Action",
    body: "Read stories from Light Upon Light about differently-abled communities, accessibility, advocacy, and the founding of our Washington nonprofit.",
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function applyRoute(html, route) {
  const canonical = route.path === "/" ? "https://thelightuponlight.org/" : `https://thelightuponlight.org${route.path}`;
  let next = html;
  next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
  );
  next = next.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${canonical}" />`,
  );
  next = next.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
  );
  next = next.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
  );
  next = next.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  next = next.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
  );
  next = next.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
  );

  const seoBlock = `<div id="seo-static"><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.body)}</p><p><a href="https://thelightuponlight.org/">Light Upon Light</a> · <a href="https://thelightuponlight.org/about">About Light Upon Light</a> · <a href="https://thelightuponlight.org/programs">Programs</a> · <a href="https://thelightuponlight.org/donate">Donate</a> · <a href="https://thelightuponlight.org/contact">Contact</a></p></div>`;
  if (next.includes('id="seo-static"')) {
    next = next.replace(/<div id="seo-static">[\s\S]*?<\/div>/i, seoBlock);
  } else {
    next = next.replace("<body>", `<body>\n  ${seoBlock}`);
  }
  return next;
}

if (!existsSync(indexPath)) {
  console.error("dist/index.html missing. Run vite build first.");
  process.exit(1);
}

const baseHtml = readFileSync(indexPath, "utf8");

for (const route of ROUTES) {
  const outPath = join(distDir, route.file);
  mkdirSync(dirname(outPath), { recursive: true });
  const html = applyRoute(baseHtml, route);
  writeFileSync(outPath, html);
  console.log(`Prerendered ${route.path} -> ${route.file}`);
}

console.log(`Prerendered ${ROUTES.length} routes.`);
