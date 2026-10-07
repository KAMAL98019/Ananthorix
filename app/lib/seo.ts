import { COMPANY_CONTACT } from "../content/contact";
import type { Metadata } from "next";

// Shared SEO utilities. Keep this small. Pages use these instead of hand-writing tags.

export const SITE_NAME = "Anantorix Technologies";
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.anantorix.com";
export const POSITIONING = "Anantorix builds intelligent digital systems for modern businesses.";
const SHARE_IMAGE = "/socialicon.png";

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
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/companylogo.png`,
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
    name: SITE_NAME,
    url: SITE_URL,
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
