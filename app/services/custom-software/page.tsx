import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CustomSoftwareHero from "../../components/custom-software/CustomSoftwareHero";

// Lazy load below-the-fold content to optimize initial page load (FCP/LCP)
const CustomSoftwareOverview = dynamic(() => import("../../components/custom-software/CustomSoftwareOverview"));

const CustomSoftwareCapabilities = dynamic(() => import("../../components/custom-software/CustomSoftwareCapabilities"));
const CustomSoftwareApproach = dynamic(() => import("../../components/custom-software/CustomSoftwareApproach"));
const CustomSoftwareCTA = dynamic(() => import("../../components/custom-software/CustomSoftwareCTA"));

export const metadata: Metadata = {
  title: "Custom Software Development | Anantorix Technologies",
  description: "Engineering bespoke software solutions, robust enterprise applications, and scalable architecture for modern businesses.",
  keywords: "Custom software development, enterprise software solutions, scalable architecture, bespoke software engineering",
};

export default function CustomSoftwarePage() {
  return (
    <main className="min-h-screen bg-[#030b1a] overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#187BDD]/10 via-[#030b1a] to-[#030b1a]"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {/* Hero loads immediately */}
        <CustomSoftwareHero />
        
        {/* Sections lazy load */}
        <CustomSoftwareOverview />
        <CustomSoftwareCapabilities />
        <CustomSoftwareApproach />
        <CustomSoftwareCTA />
      </div>
    </main>
  );
}
