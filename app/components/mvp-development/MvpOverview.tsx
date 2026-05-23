"use client";

import FadeIn from "../FadeIn";

export default function MvpOverview() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Placeholder */}
          <FadeIn direction="right" className="order-2 lg:order-1">
            <div className="w-full aspect-[4/3] bg-[#0b1a30] rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(24,123,221,0.15)] flex flex-col items-center justify-center text-slate-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#187BDD]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Note: User will put an image here later */}
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium tracking-widest uppercase">Overview Placeholder</span>
            </div>
          </FadeIn>

          {/* Text Content */}
          <FadeIn direction="left" className="order-1 lg:order-2 flex flex-col">
            <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4 block">
              Speed to Market
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Launch Fast, <span className="text-[#187BDD] drop-shadow-[0_0_15px_rgba(24,123,221,0.5)]">Learn Faster</span>
            </h2>
            <div className="space-y-6 text-[#C1C6D5] text-lg leading-relaxed max-w-lg">
              <p>
                The biggest risk in software development is building the wrong thing. Our MVP development service is designed for founders and enterprise innovation labs who need to prove a concept quickly.
              </p>
              <p>
                We strip away the unnecessary fluff and focus purely on your core value proposition, getting a functional, polished product into the hands of real users as fast as possible.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
