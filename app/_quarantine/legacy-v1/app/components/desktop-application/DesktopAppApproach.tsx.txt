"use client";

import FadeIn from "../FadeIn";
import Image from "next/image";

export default function DesktopAppApproach() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <FadeIn direction="right" className="order-2 lg:order-1">
            <div className="w-full aspect-[4/3] rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(24,123,221,0.15)] relative overflow-hidden group">
              <Image 
                src="/images/services/desktop/section3.webp"
                alt="Security and Hardware Integration"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-[#187BDD]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
            </div>
          </FadeIn>

          {/* Text Content */}
          <FadeIn direction="left" className="order-1 lg:order-2 flex flex-col">
            <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4 block">
              Security and Hardware Integration
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Deep System Access, <span className="text-[#187BDD] drop-shadow-[0_0_15px_rgba(24,123,221,0.5)]">Safely Handled</span>
            </h2>
            <div className="space-y-6 text-[#C1C6D5] text-lg leading-relaxed max-w-lg">
              <p>
                Desktop apps provide unparalleled access to hardware peripherals (like specialized printers, scanners, or scientific equipment).
              </p>
              <p>
                We ensure this access is handled securely, building software that meets strict enterprise compliance and data protection standards.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
