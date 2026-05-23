"use client";

import FadeIn from "../FadeIn";
import { Search, PenTool, LayoutTemplate, Activity } from "lucide-react";

const capabilities = [
  {
    icon: Search,
    title: "User Research & Testing",
    description: "Data-driven insights to understand your audience's core needs and behaviors before designing.",
  },
  {
    icon: PenTool,
    title: "Wireframing & Prototyping",
    description: "Rapid visual mapping to align on structure, flow, and layout before a single line of code is written.",
  },
  {
    icon: LayoutTemplate,
    title: "Design Systems",
    description: "Scalable, reusable component libraries that keep your brand consistent and accelerate development.",
  },
  {
    icon: Activity,
    title: "UI/UX Audits",
    description: "Identifying bottlenecks, usability issues, and drop-off points in your existing digital products.",
  },
];

export default function UiUxCapabilities() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4 block">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Our UI/UX Design Offerings
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={idx} direction="up" delay={idx * 150}>
                <div className="h-full bg-[#07152D]/50 border border-white/5 p-8 sm:p-10 rounded-3xl hover:border-[#187BDD]/30 hover:bg-[#0a1e3f] transition-all duration-300 group">
                  <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-[#187BDD]/10 text-[#187BDD] group-hover:bg-[#187BDD] group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#8896AB] leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
