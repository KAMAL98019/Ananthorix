"use client";

import FadeIn from "../FadeIn";
import { Monitor, Cpu, WifiOff, ShieldCheck } from "lucide-react";

export default function DesktopAppCapabilities() {
  const capabilities = [
    {
      icon: <Monitor className="w-8 h-8 text-[#187BDD]" />,
      title: "Electron & Tauri Apps",
      description: "Delivering cross-platform desktop experiences using modern web technologies to save time and budget."
    },
    {
      icon: <Cpu className="w-8 h-8 text-[#187BDD]" />,
      title: "Native OS Development",
      description: "C++, C#, and Swift development for applications requiring maximum hardware optimization."
    },
    {
      icon: <WifiOff className="w-8 h-8 text-[#187BDD]" />,
      title: "Offline-First Architecture",
      description: "Ensuring full functionality without an internet connection, with seamless cloud-syncing when reconnected."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#187BDD]" />,
      title: "Enterprise Distribution",
      description: "Managing secure deployment, licensing, and auto-updates across corporate fleets."
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative bg-[#050b14] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Cross-Platform & <span className="text-[#187BDD]">Native Development</span>
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
