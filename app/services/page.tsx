import ServicesHub from "../components/site/services/ServicesHub";
import JsonLd from "../components/site/blocks/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "../lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "AI solutions, automation, business analytics, CRM, ERP, custom software, web, mobile, SaaS, desktop, UI/UX and MVP development from Anantorix Technologies.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <ServicesHub />
    </>
  );
}
