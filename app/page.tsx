import type { Metadata } from "next";
import { organizationJsonLd, webSiteJsonLd } from "./lib/seo";
import HeroSection from "./components/site/sections/HeroSection";
import TrustStrip from "./components/site/sections/TrustStrip";
import ProblemsOutcomes from "./components/site/sections/ProblemsOutcomes";
import OutcomePillars from "./components/site/sections/OutcomePillars";
import AgentsShowcase from "./components/site/sections/AgentsShowcase";
import CapabilitiesUniverse from "./components/site/sections/CapabilitiesUniverse";
import ProjectShowcase from "./components/site/projects/ProjectShowcase";
import TechnologyStack from "./components/site/sections/TechnologyStack";
import EngineeringApproach from "./components/site/sections/EngineeringApproach";
import HowWeWork from "./components/site/sections/HowWeWork";
import WhyAnantorix from "./components/site/sections/WhyAnantorix";
import EngagementModels from "./components/site/sections/EngagementModels";
import FaqSection from "./components/site/sections/FaqSection";
import FinalCta from "./components/site/sections/FinalCta";

// Hidden until real content exists (Phase 2 brief):
// 10. Industries (P2), 12. Testimonials (until real testimonials exist), 14. Insights (P2).

// Search-facing title and description (SEO brief, Oct 2026). On-page positioning copy is unchanged.
const homeTitle = "Anantorix Technologies | AI & Software Development";
const homeDescription =
  "AI development, custom software, CRM and ERP systems, analytics dashboards, web applications and SaaS product development for businesses in India and worldwide.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: "Anantorix Technologies",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Anantorix Technologies: AI and software development" }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/og-image.png"],
  },
};

// Organization and WebSite schema from the shared SEO utilities. India-only. No social profiles.
const structuredData = [organizationJsonLd(), webSiteJsonLd()];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <TrustStrip />
      <ProblemsOutcomes />
      <OutcomePillars />
      <AgentsShowcase />
      <CapabilitiesUniverse />
      <ProjectShowcase />
      <TechnologyStack />
      <EngineeringApproach />
      <HowWeWork />
      <WhyAnantorix />
      <EngagementModels />
      <FaqSection />
      <FinalCta />
    </>
  );
}
