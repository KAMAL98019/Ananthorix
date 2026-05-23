import type { Metadata } from "next";
import UiUxHero from "../../components/ui-ux-design/UiUxHero";
import UiUxOverview from "../../components/ui-ux-design/UiUxOverview";
import UiUxCapabilities from "../../components/ui-ux-design/UiUxCapabilities";
import UiUxApproach from "../../components/ui-ux-design/UiUxApproach";
import UiUxCTA from "../../components/ui-ux-design/UiUxCTA";

export const metadata: Metadata = {
  title: "Enterprise UI/UX Design | Anantorix Technologies",
  description: "Anantorix is a premier user experience agency offering enterprise UI/UX design, intuitive interface design, and user-centric software design.",
  keywords: "Enterprise UI/UX design, user experience agency, intuitive interface design, user-centric software design",
};

export default function UiUxDesignPage() {
  return (
    <main className="min-h-screen bg-[#030b1a] overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#187BDD]/10 via-[#030b1a] to-[#030b1a]"></div>
      </div>

      {/* Page Content (Components stack) */}
      <div className="relative z-10">
        <UiUxHero />
        <UiUxOverview />
        <UiUxCapabilities />
        <UiUxApproach />
        <UiUxCTA />
      </div>
    </main>
  );
}
