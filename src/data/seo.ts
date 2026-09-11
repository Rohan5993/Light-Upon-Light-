export const SITE_ORIGIN = "https://thelightuponlight.org";

export const ORGANIZATION_SAME_AS = [
  "https://www.linkedin.com/company/light-upon-light-org",
  "https://www.instagram.com/light_upon_light14/",
  "https://www.facebook.com/people/Light-Upon-Light/61576724334985/",
  "https://www.youtube.com/@TheFoundersDiary24",
  "https://www.tiktok.com/@lightuponlight08",
] as const;

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  robots?: string;
  type?: "website" | "article";
};

export const DEFAULT_DESCRIPTION =
  "Light Upon Light is a 501(c)(3) nonprofit in Redmond, Washington, led by Ronahi Zebari. We advance advocacy, accessibility, education, and equality for differently-abled people. EIN 99-2690459.";

export const PAGE_SEO: Record<string, PageSeo> = {
  home: {
    title: "Light Upon Light | Official Website — Disability Advocacy Nonprofit",
    description: DEFAULT_DESCRIPTION,
    path: "/",
    ogTitle: "Light Upon Light | Official Website",
  },
  about: {
    title: "About Light Upon Light | Our Mission, Founder & Board",
    description:
      "Learn about Light Upon Light (EIN 99-2690459), a Washington 501(c)(3) nonprofit founded by Ronahi Zebari for advocacy, accessibility, education, and equality for differently-abled people.",
    path: "/about",
  },
  founder: {
    title: "Ronahi Zebari | Founder & CEO of Light Upon Light",
    description:
      "Ronahi Zebari is the Founder & CEO of Light Upon Light, a Redmond, Washington 501(c)(3) nonprofit advancing dignity and inclusion for differently-abled people.",
    path: "/about/ronahi-zebari",
  },
  press: {
    title: "Press & Media Kit | Light Upon Light",
    description:
      "Official boilerplate, facts, and media contacts for Light Upon Light, a 501(c)(3) disability advocacy nonprofit in Redmond, Washington. Website: https://thelightuponlight.org/",
    path: "/press",
  },
  programs: {
    title: "Programs | Light Upon Light",
    description:
      "Explore Light Upon Light programs for education, mentorship, accessibility, workforce development, and community support for differently-abled people in Washington and beyond.",
    path: "/programs",
  },
  blog: {
    title: "Blog & Stories | Light Upon Light",
    description:
      "Stories and insights from Light Upon Light on disability inclusion, accessibility, advocacy, and the communities we serve.",
    path: "/blog",
  },
  volunteer: {
    title: "Volunteer | Light Upon Light",
    description:
      "Volunteer with Light Upon Light and help advance advocacy, accessibility, education, and equality for differently-abled people.",
    path: "/volunteer",
  },
  contact: {
    title: "Contact Light Upon Light | Redmond, WA",
    description:
      "Contact Light Upon Light at 16305 NE 87th St, Redmond, WA 98052 or Info@thelightuponlight.org. Phone 206-766-0884.",
    path: "/contact",
  },
  appointment: {
    title: "Book an Appointment | Light Upon Light",
    description: "Schedule a time to meet with the Light Upon Light team.",
    path: "/contact/appointment",
  },
  donate: {
    title: "Donate | Light Upon Light 501(c)(3)",
    description:
      "Support Light Upon Light, a tax-deductible 501(c)(3) nonprofit (EIN 99-2690459) creating real access and opportunity for differently-abled people.",
    path: "/donate",
  },
  admin: {
    title: "Blog Admin | Light Upon Light",
    description: "Private blog administration for Light Upon Light.",
    path: "/admin",
    robots: "noindex, nofollow",
  },
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized === "/" ? "/" : normalized.replace(/\/$/, "") || "/"}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: "Light Upon Light",
        alternateName: [
          "LightUponLight",
          "lightuponlight",
          "Light Upon Light Nonprofit",
          "LUL",
          "luul",
        ],
        url: `${SITE_ORIGIN}/`,
        logo: `${SITE_ORIGIN}/icon-512.png`,
        email: "Info@thelightuponlight.org",
        telephone: "+1-206-766-0884",
        foundingDate: "2024",
        taxID: "99-2690459",
        nonprofitStatus: "Nonprofit501c3",
        slogan: "Their light is already there. Help us let it shine.",
        knowsAbout: [
          "disability advocacy",
          "accessibility",
          "inclusive education",
          "differently-abled people",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "16305 NE 87th St",
          addressLocality: "Redmond",
          addressRegion: "WA",
          postalCode: "98052",
          addressCountry: "US",
        },
        areaServed: "Washington",
        description:
          "A 501(c)(3) nonprofit advancing advocacy, accessibility, education, and equality for differently-abled people.",
        founder: {
          "@type": "Person",
          name: "Ronahi Zebari",
          jobTitle: "Founder and CEO",
          url: `${SITE_ORIGIN}/about/ronahi-zebari`,
        },
        sameAs: [...ORGANIZATION_SAME_AS],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: "Light Upon Light",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}
