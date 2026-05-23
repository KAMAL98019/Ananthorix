import type { Metadata } from "next";
import dynamic from "next/dynamic";
import MvpHero from "../../components/mvp-development/MvpHero";

// Lazy load below-the-fold content to optimize initial page load (FCP/LCP)
const MvpOverview = dynamic(() => import("../../components/mvp-development/MvpOverview"));
const MvpCapabilities = dynamic(() => import("../../components/mvp-development/MvpCapabilities"));
const MvpApproach = dynamic(() => import("../../components/mvp-development/MvpApproach"));
const MvpCTA = dynamic(() => import("../../components/mvp-development/MvpCTA"));

export const metadata: Metadata = {
  title: "MVP Development | Anantorix Technologies",
  description: "Rapid prototyping, startup software development, and agile MVP building to validate your product idea fast.",
  keywords: "MVP development services, rapid prototyping, startup software development, validate product idea, agile MVP builder",
};

export default function MvpPage() {
  return (
    <main className="min-h-screen bg-[#030b1a] overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#187BDD]/10 via-[#030b1a] to-[#030b1a]"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {/* Hero loads immediately */}
        <MvpHero />
        
        {/* Sections lazy load */}
        <MvpOverview />
        <MvpCapabilities />
        <MvpApproach />
        <MvpCTA />
      </div>
    </main>
  );
}
