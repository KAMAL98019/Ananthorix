"use client";

import FadeIn from "../FadeIn";
import { ArrowRight } from "lucide-react";

export default function GenAiCTA() {
  return (
    <section className="py-20 lg:py-32 relative px-4 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#112a52] to-[#07152D] border border-white/10 shadow-2xl">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#187BDD] rounded-full blur-[200px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <FadeIn direction="up" className="relative z-10 px-6 py-20 sm:px-16 sm:py-24 text-center flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight tracking-tight max-w-3xl">
              Ready to Leverage Generative AI?
            </h2>
            <p className="text-[#C1C6D5] text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              Discover how custom AI can cut costs and multiply your team's output.
            </p>
            
            <a 
              href="#contact-cta" 
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-[#187BDD] transition-all hover:scale-105 hover:bg-[#A6C8FF] hover:text-[#07152D] focus:outline-none focus:ring-4 focus:ring-white/20 shadow-xl"
            >
              Schedule an AI Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
