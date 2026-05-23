"use client";

import FadeIn from "../FadeIn";

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
            {/* Note: The aspect ratio is strictly set here to prevent Layout Shifts (LCP/CLS optimization) */}
            <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] bg-[#0b1a30] rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(24,123,221,0.15)] flex flex-col items-center justify-center text-slate-500 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#187BDD]/5 to-transparent"></div>
              {/* Note: When adding Next.js <Image>, ensure you set priority={true} and sizes prop on this Hero image for optimal LCP! */}
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium tracking-widest uppercase">Hero Image Placeholder</span>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
