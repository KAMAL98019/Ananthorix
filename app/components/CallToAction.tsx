import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

export default function CallToAction() {
  return (
    <section className="relative w-full pb-5  py-10 sm:pb-18 sm:py-20 bg-[#07152D] px-4 sm:px-6 lg:px-10">
      <div className="relative mx-auto max-w-7xl">
        {/* Background Gradient Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#112a52] to-[#07152D] border border-white/5 shadow-2xl">
          {/* Foreground Content */}
          <FadeIn direction="up" className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-20 sm:py-28 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight max-w-4xl">
              Let's Build the Future Together
            </h2>
            <p className="text-[#C1C6D5] text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Ready to accelerate your business with cutting-edge technology? Our team
              of experts is standing by to help you engineer your vision.
            </p>
            <a href="#contact-cta" className="inline-block cursor-pointer rounded-full bg-white px-8 py-4 text-base font-bold text-[#187BDD] transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20 shadow-lg">
              Start Your Journey
            </a>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
