import type { Metadata } from "next";
import dynamic from "next/dynamic";
import GenAiHero from "../../components/gen-ai/GenAiHero";

// Lazy load below-the-fold content to optimize initial page load (FCP/LCP)
const GenAiOverview = dynamic(() => import("../../components/gen-ai/GenAiOverview"));
const GenAiCapabilities = dynamic(() => import("../../components/gen-ai/GenAiCapabilities"));
const GenAiApproach = dynamic(() => import("../../components/gen-ai/GenAiApproach"));
const GenAiCTA = dynamic(() => import("../../components/gen-ai/GenAiCTA"));

export const metadata: Metadata = {
  alternates: { canonical: "/services/generative-ai" },
  title: "Generative AI Development | Anantorix Technologies",
  description: "Enterprise AI integration, custom LLM fine-tuning, RAG, and machine learning solutions.",
  keywords: "Generative AI development, custom AI model training, enterprise AI integration, LLM development, machine learning solutions",
};

export default function GenAiPage() {
  return (
    <main className="min-h-screen bg-[#030b1a] overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#187BDD]/10 via-[#030b1a] to-[#030b1a]"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {/* Hero loads immediately */}
        <GenAiHero />
        
        {/* Sections lazy load */}
        <GenAiOverview />
        <GenAiCapabilities />
        <GenAiApproach />
        <GenAiCTA />
      </div>
    </main>
  );
}
