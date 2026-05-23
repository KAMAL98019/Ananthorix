import { Search, Share2, Code, TrendingUp } from "lucide-react";
import FadeIn from "./FadeIn";

const steps = [
  {
    icon: <Search className="text-white w-6 h-6" />,
    title: "Discovery & Strategy",
    description:
      "Deep diving into your business ecosystem to map out a technical blueprint.",
  },
  {
    icon: <Share2 className="text-white w-6 h-6" />,
    title: "Architecture & Design",
    description:
      "Creating robust, high-availability systems with aesthetic precision.",
  },
  {
    icon: <Code className="text-white w-6 h-6" />,
    title: "Development & QA",
    description:
      "Agile sprints followed by rigorous automated testing cycles.",
  },
  {
    icon: <TrendingUp className="text-white w-6 h-6" />,
    title: "Launch & Growth",
    description:
      "Deployment with ongoing optimization and scaling as you expand.",
  },
];

export default function PathToInfinity() {
  return (
    <section className="relative w-full py-24 bg-[#07152D] overflow-hidden">
      {/* Background Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden sm:block">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="/images/herobannerstar.png"
          alt="star"
          className="absolute top-[15%] left-[8%] w-3 opacity-80"
        />
        <img
          src="/images/herobannerstar.png"
          alt="star"
          className="absolute bottom-[20%] left-[45%] w-2 opacity-60"
        />
        <img
          src="/images/herobannerstar.png"
          alt="star"
          className="absolute top-[30%] right-[12%] w-2 opacity-70"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-20 text-center">
        <FadeIn direction="up" className="mb-16 sm:mb-24">
          <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-[0_0_8px_rgba(166,200,255,0.6)] block">
            Our Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            The Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#187BDD]">Infinity</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 text-left">
          {steps.map((step, index) => (
            <FadeIn key={index} direction="up" delay={index * 150} className="flex flex-col items-start">
              {/* Icon Circle with Glow */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#187BDD] shadow-[0_0_25px_rgba(24,123,221,0.6)] mb-8 transition-transform hover:scale-110 cursor-default">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#8896AB] text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
