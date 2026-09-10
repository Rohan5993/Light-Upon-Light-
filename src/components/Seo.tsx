import { useEffect } from "react";
import { absoluteUrl, organizationJsonLd, SITE_ORIGIN, type PageSeo } from "../data/seo";

const ORG_SCRIPT_ID = "lul-organization-jsonld";
const PAGE_SCRIPT_ID = "lul-page-jsonld";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/icon-512.png`;

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

type SeoProps = PageSeo & {
  includeOrganizationSchema?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export default function Seo({
  title,
  description,
  path,
  ogTitle,
  robots = "index, follow",
  type = "website",
  includeOrganizationSchema = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const url = absoluteUrl(path);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", ogTitle ?? title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", "Light Upon Light");
    upsertMeta("property", "og:image", DEFAULT_IMAGE);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", ogTitle ?? title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", DEFAULT_IMAGE);

    if (includeOrganizationSchema) {
      upsertJsonLd(ORG_SCRIPT_ID, organizationJsonLd());
    } else {
      document.getElementById(ORG_SCRIPT_ID)?.remove();
    }

    if (jsonLd) {
      upsertJsonLd(PAGE_SCRIPT_ID, Array.isArray(jsonLd) ? jsonLd : jsonLd);
    } else {
      document.getElementById(PAGE_SCRIPT_ID)?.remove();
    }
  }, [title, description, path, ogTitle, robots, type, includeOrganizationSchema, jsonLd]);

  return null;
}
