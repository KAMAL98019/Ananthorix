"use client";

import FadeIn from "../FadeIn";
import { Search, PenTool, Code, Rocket } from "lucide-react";

export default function MobileAppsCapabilities() {
  const capabilities = [
    {
      icon: <Search className="w-8 h-8 text-[#187BDD]" />,
      title: "1. Strategy & Discovery",
      description: "Defining the product scope, target audience, and technical roadmap for a successful launch."
    },
    {
      icon: <PenTool className="w-8 h-8 text-[#187BDD]" />,
      title: "2. UI/UX Prototyping",
      description: "Designing intuitive user interfaces and wireframing user journeys to ensure maximum engagement."
    },
    {
      icon: <Code className="w-8 h-8 text-[#187BDD]" />,
      title: "3. App Development",
      description: "Writing clean, scalable code using modern native and cross-platform frameworks."
    },
    {
      icon: <Rocket className="w-8 h-8 text-[#187BDD]" />,
      title: "4. Testing & Deployment",
      description: "Rigorous QA testing across devices, followed by seamless App Store and Google Play deployment."
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative bg-[#050b14] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            How We Build for <span className="text-[#187BDD]">Mobile</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {capabilities.map((cap, index) => (
            <FadeIn key={index} direction="up" delay={index * 150}>
              <div className="bg-[#0a1628] rounded-3xl p-8 sm:p-12 border border-white/5 hover:border-[#187BDD]/30 transition-colors group h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-[#030b1a] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(24,123,221,0.3)] transition-all duration-300">
                  {cap.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{cap.title}</h3>
                <p className="text-[#8896AB] leading-relaxed text-lg flex-grow">
                  {cap.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        
      </div>
    </section>
  );
}
