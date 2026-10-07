"use client";

import FadeIn from "../FadeIn";
import Image from "next/image";

export default function MvpHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <FadeIn direction="right" className="flex flex-col">
            <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-[0_0_8px_rgba(166,200,255,0.6)]">
              MVP Development Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Rapid Prototyping to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6C8FF] to-[#187BDD]">Validate Your Product</span>
            </h1>
            <p className="text-[#C1C6D5] text-lg sm:text-xl leading-relaxed max-w-lg">
              Don't spend months building something nobody wants. We design and engineer Minimum Viable Products (MVPs) in weeks, allowing you to test the market, gather user feedback, and secure funding fast.
            </p>
          </FadeIn>

          {/* Image Placeholder */}
          <FadeIn direction="left" delay={200}>
            {/* Hero Image */}
            <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(24,123,221,0.15)] overflow-hidden relative group">
              <Image 
                src="/images/services/mvp/hero.webp"
                alt="MVP Development Services"
                fill
                priority
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#187BDD]/20 to-transparent mix-blend-overlay"></div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
