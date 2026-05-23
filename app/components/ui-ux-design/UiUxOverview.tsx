"use client";

import FadeIn from "../FadeIn";
import Image from "next/image";

export default function UiUxOverview() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative rounded-3xl bg-[#07152D] border border-white/5 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#187BDD] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            
            <FadeIn direction="up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                Design That Drives <span className="text-[#187BDD]">Adoption and ROI</span>
              </h2>
              <p className="text-[#8896AB] text-base sm:text-lg leading-relaxed mb-6">
                In today's digital landscape, user experience is the primary differentiator. We don't just make things look pretty; we engineer interfaces based on deep user research, behavioral psychology, and modern design systems.
              </p>
              <p className="text-[#8896AB] text-base sm:text-lg leading-relaxed">
                From enterprise dashboards to consumer-facing apps, we design digital products that reduce friction and boost user retention.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={200}>
              <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(24,123,221,0.1)] relative overflow-hidden group">
                <Image
                  src="/images/services/uiux/adoptionroi.webp"
                  alt="Design That Drives Adoption and ROI"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#187BDD]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
}
