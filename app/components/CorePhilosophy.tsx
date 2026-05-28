import Image from "next/image";
import FadeIn from "./FadeIn";
import { ShieldCheck, Zap } from "lucide-react";

export default function CorePhilosophy() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#187BDD]/10  overflow-hidden">
      {/* Background Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden sm:block">
        {/* eslint-disable @next/next/no-img-element */}
        <img src="/images/herobannerstar.png" alt="star" className="absolute top-[10%] left-[12%] w-3 opacity-80" />
        <img src="/images/herobannerstar.png" alt="star" className="absolute top-[22%] left-[48%] w-2 opacity-60" />
        <img src="/images/herobannerstar.png" alt="star" className="absolute top-[12%] right-[8%] w-3 opacity-90" />
        <img src="/images/herobannerstar.png" alt="star" className="absolute bottom-[15%] right-[12%] w-2 opacity-80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Left Column: Image with Frame & Floating Card */}
        <div className="relative w-full mx-auto max-w-[486px]">
          {/* Subtle Outer Frame */}
          <FadeIn direction="left" delay={200} className="p-2 sm:p-3 rounded-3xl border border-slate-700/50 bg-gradient-to-br from-white/5 to-transparent">
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[5/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/innovatingfuture.png"
                alt="Modern Server Room and Office"
                fill
                className="object-cover"
                fetchPriority="high"
                priority

              />
            </div>
          </FadeIn>

          {/* Floating Glassmorphic Card */}
          {/* <div className="absolute -bottom-8 sm:-bottom-10 right-4 sm:-right-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-7 shadow-2xl">
            <h3 className="text-4xl sm:text-5xl font-bold text-white mb-1">150+</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
              Architects & Engineers
            </p>
          </div> */}
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col mt-8 sm:mt-0">
          <FadeIn direction="right">
            <span className="text-[#A6C8FF] text-sm sm:text-base font-medium tracking-wider mb-3">
              Core Philosophy
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Innovating the Future<br className="hidden sm:block" /> with Technology
            </h2>
            <p className="text-[#C1C6D5] text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              At ANANTORIX, we don&apos;t just build software; we engineer growth.
              Our multidisciplinary team combines technical rigor with creative
              vision to solve the most complex challenges of the digital age.
            </p>
          </FadeIn>

          {/* Feature Cards */}
          <FadeIn direction="up" delay={400} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-2xl bg-[#131d30] border border-white/5 p-6 transition-colors hover:bg-[#1a253a]">
              <ShieldCheck className="text-[#A6C8FF] w-6 h-6 mb-4" />
              <h4 className="text-lg font-semibold text-white">Integrity First</h4>
            </div>
            <div className="rounded-2xl bg-[#131d30] border border-white/5 p-6 transition-colors hover:bg-[#1a253a]">
              <Zap className="text-[#A6C8FF] w-6 h-6 mb-4" />
              <h4 className="text-lg font-semibold text-white">Rapid Scalability</h4>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
