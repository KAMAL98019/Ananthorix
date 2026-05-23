"use client";

import FadeIn from "../FadeIn";
import Image from "next/image";

export default function CustomSoftwareApproach() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Placeholder */}
          <FadeIn direction="right" className="order-2 lg:order-1">
            <div className="w-full aspect-[4/3] rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(24,123,221,0.15)] relative overflow-hidden group">
              <Image 
                src="/images/services/customsoftware/agile.webp"
                alt="Agile Execution"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-[#187BDD]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
            </div>
          </FadeIn>

          {/* Text Content */}
          <FadeIn direction="left" className="order-1 lg:order-2 flex flex-col">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Agile Execution Meets <span className="text-[#187BDD] drop-shadow-[0_0_15px_rgba(24,123,221,0.5)]">Rigid Quality</span>
            </h2>
            <div className="space-y-6 text-[#C1C6D5] text-lg leading-relaxed max-w-lg">
              <p>
                We operate in rapid, iterative sprints to ensure you see tangible progress early and often. Yet, we never compromise on quality. 
              </p>
              <p>
                Every release undergoes rigorous automated testing, security audits, and peer code reviews. We build software meant to last, ensuring your investment becomes a foundational asset for your enterprise.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
