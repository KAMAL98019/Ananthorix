import Image from "next/image";
import { Shield, Layers, Check } from "lucide-react";
import FadeIn from "./FadeIn";

const features = [
  {
    icon: <Shield className="text-white w-5 h-5" />,
    title: "Enterprise-Grade Security",
    description: "Military-grade encryption and SOC2 compliance out of the box.",
  },
  {
    icon: <Layers className="text-white w-5 h-5" />,
    title: "Scalable Architecture",
    description: "Cloud-native designs that grow seamlessly from 1k to 1M users.",
  },
  {
    icon: <Check className="text-white w-5 h-5" />,
    title: "24/7 Expert Support",
    description: "A dedicated team of site reliability engineers at your disposal.",
  },
];

export default function EngineeredSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#187BDD]/10 overflow-hidden">
      {/* Background Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden sm:block">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="/images/herobannerstar.png"
          alt="star"
          className="absolute top-[10%] left-[8%] w-2 opacity-80"
        />
        <img
          src="/images/herobannerstar.png"
          alt="star"
          className="absolute top-[18%] left-[45%] w-2 opacity-60"
        />
        <img
          src="/images/herobannerstar.png"
          alt="star"
          className="absolute top-[48%] right-[5%] w-3 opacity-90"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Left Column: Text & Features */}
        <FadeIn direction="right" className="flex flex-col w-full max-w-xl mx-auto lg:mx-0">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-10 leading-[1.15] tracking-tight text-center lg:text-left">
            Engineered for the<br className="hidden sm:block" /> Uncompromising
          </h2>

          <div className="flex flex-col space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center rounded-2xl bg-[#131d30]/50 border border-slate-700/50 p-5 transition-colors hover:bg-[#1a253a]/80"
              >
                <div className="flex w-12 h-12 shrink-0 items-center justify-center rounded-full bg-[#187BDD] mr-5">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-[#8896AB] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Right Column: Image with Frame */}
        <FadeIn direction="left" delay={200} className="relative w-full mx-auto max-w-[486px]">
          {/* Subtle Outer Frame */}
          <div className="p-2 sm:p-3 rounded-3xl border border-slate-700/50 bg-gradient-to-br from-white/5 to-transparent">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/engineered.png"
                alt="Engineered For the Uncompromising"
                fill
                className="object-cover"
                fetchPriority="high"
                priority
              />
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
