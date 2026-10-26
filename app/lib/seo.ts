import { COMPANY_CONTACT } from "../content/contact";
import { manifesto as MANIFESTO } from "../content/home";
import type { Metadata } from "next";

// Shared SEO utilities. Keep this small. Pages use these instead of hand-writing tags.

export const SITE_NAME = "Anantorix Technologies";
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.anantorix.com";
export const POSITIONING = "Anantorix builds intelligent digital systems for modern businesses.";
// 1200x630 branded share image. The declared size must match the file.
const SHARE_IMAGE = "/og-image.png";

type PageMetaInput = {
  // Page name only. The root layout template appends " | Anantorix Technologies".
  title: string;
  description: string;
  // Path from the site root, e.g. "/about". Used for canonical and Open Graph URL.
  path: string;
  // Set false for placeholder or non-indexable pages.
  indexable?: boolean;
};

export function pageMetadata({ title, description, path, indexable = true }: PageMetaInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: indexable, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
  };
}

// Schema.org builders.
// India-only. Contact values come from the verified contact source only. No social profiles.
// Stable id so Service and other schema can reference the same organization.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
// Square brand mark for search engines (Google requires at least 112x112; the header wordmark is only 43px tall).
export const LOGO = { url: `${SITE_URL}/images/brand/anantorix-logo-512.png`, width: 512, height: 512 };

// One Organization entity, defined on the homepage. Other pages refer to it by ORGANIZATION_ID.
// No sameAs: no official social profiles have been confirmed. Add only verified company profiles.
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: "Anantorix",
    url: `${SITE_URL}/`,
    slogan: MANIFESTO,
    // Languages match the call-language options offered in the Start a Project form.
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: COMPANY_CONTACT.phoneE164,
      email: COMPANY_CONTACT.email,
      areaServed: COMPANY_CONTACT.country,
      availableLanguage: ["English", "Tamil"],
    },
    knowsAbout: [
      "Artificial intelligence development",
      "AI automation",
      "AI agents",
      "Custom software development",
      "CRM software development",
      "ERP software development",
      "Business analytics and dashboards",
      "Web application development",
      "Mobile app development",
      "SaaS product development",
    ],
    logo: { "@type": "ImageObject", "@id": `${SITE_URL}/#logo`, url: LOGO.url, contentUrl: LOGO.url, width: LOGO.width, height: LOGO.height, caption: SITE_NAME },
    image: { "@id": `${SITE_URL}/#logo` },
    description: POSITIONING,
    email: COMPANY_CONTACT.email,
    telephone: COMPANY_CONTACT.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY_CONTACT.locality,
      addressRegion: COMPANY_CONTACT.region,
      addressCountry: COMPANY_CONTACT.country,
    },
    areaServed: { "@type": "Country", name: COMPANY_CONTACT.market },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: "Anantorix",
    url: `${SITE_URL}/`,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
