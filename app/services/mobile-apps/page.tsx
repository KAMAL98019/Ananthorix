import type { Metadata } from "next";
import dynamic from "next/dynamic";
import MobileAppsHero from "../../components/mobile-apps/MobileAppsHero";

// Lazy load below-the-fold content to optimize initial page load (FCP/LCP)
const MobileAppsOverview = dynamic(() => import("../../components/mobile-apps/MobileAppsOverview"));
const MobileAppsCapabilities = dynamic(() => import("../../components/mobile-apps/MobileAppsCapabilities"));
const MobileAppsApproach = dynamic(() => import("../../components/mobile-apps/MobileAppsApproach"));
const MobileAppsCTA = dynamic(() => import("../../components/mobile-apps/MobileAppsCTA"));

export const metadata: Metadata = {
  title: "Mobile App Development | Anantorix Technologies",
  description: "High-performance iOS and Android app development, cross-platform mobile apps, and native mobile solutions.",
  keywords: "iOS and Android app development, cross-platform mobile apps, high-performance mobile solutions, native app development",
};

export default function MobileAppsPage() {
  return (
    <main className="min-h-screen bg-[#030b1a] overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#187BDD]/10 via-[#030b1a] to-[#030b1a]"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {/* Hero loads immediately */}
        <MobileAppsHero />
        
        {/* Sections lazy load */}
        <MobileAppsOverview />
        <MobileAppsCapabilities />
        <MobileAppsApproach />
        <MobileAppsCTA />
      </div>
    </main>
  );
}
