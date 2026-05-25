import type { Metadata } from "next";
import dynamic from "next/dynamic";
import DesktopAppHero from "../../components/desktop-application/DesktopAppHero";

// Lazy load below-the-fold content to optimize initial page load (FCP/LCP)
const DesktopAppOverview = dynamic(() => import("../../components/desktop-application/DesktopAppOverview"));
const DesktopAppCapabilities = dynamic(() => import("../../components/desktop-application/DesktopAppCapabilities"));
const DesktopAppApproach = dynamic(() => import("../../components/desktop-application/DesktopAppApproach"));
const DesktopAppCTA = dynamic(() => import("../../components/desktop-application/DesktopAppCTA"));

export const metadata: Metadata = {
  alternates: { canonical: "/services/desktop-application" },
  title: "Desktop Application Development | Anantorix Technologies",
  description: "Cross-platform desktop software for macOS, Windows, and Linux. Enterprise desktop solutions.",
  keywords: "Desktop app development, cross-platform desktop software, macOS and Windows app development, enterprise desktop solutions",
};

export default function DesktopAppPage() {
  return (
    <main className="min-h-screen bg-[#030b1a] overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#187BDD]/10 via-[#030b1a] to-[#030b1a]"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {/* Hero loads immediately */}
        <DesktopAppHero />
        
        {/* Sections lazy load */}
        <DesktopAppOverview />
        <DesktopAppCapabilities />
        <DesktopAppApproach />
        <DesktopAppCTA />
      </div>
    </main>
  );
}
