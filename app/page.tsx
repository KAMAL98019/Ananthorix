import dynamic from "next/dynamic";
import HeroBanner from "./components/HeroBanner";

// Dynamically import components that are below the fold to optimize initial load
const SpecializedTechnologies = dynamic(() => import("./components/SpecializedTechnologies"));
const CorePhilosophy = dynamic(() => import("./components/CorePhilosophy"));
const PathToInfinity = dynamic(() => import("./components/PathToInfinity"));
const EngineeredSection = dynamic(() => import("./components/EngineeredSection"));
const CallToAction = dynamic(() => import("./components/CallToAction"));

export const metadata = {
  title: "Home",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#07152D] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
      ></div>

      {/* Above the fold (loads immediately) */}
      <HeroBanner />
      
      {/* Below the fold (lazy loaded) */}
      <SpecializedTechnologies />
      <CorePhilosophy />
      <PathToInfinity />
      <EngineeredSection />
      <CallToAction />
    </main>
  );
}
