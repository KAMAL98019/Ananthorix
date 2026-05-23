import {
  Code2,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Server,
  PenTool,
  Cpu,
  Shield
} from "lucide-react";
import FadeIn from "./FadeIn";

// define technology universes with distinct colors and sizes
const universes = [
  { icon: Code2, size: "w-28 h-28", color: "#187BDD", glow: "rgba(24,123,221,0.5)", delay: "0s", label: "Core" },
  { icon: Database, size: "w-20 h-20", color: "#38bdf8", glow: "rgba(56,189,248,0.4)", delay: "2s", label: "Data" },
  { icon: Smartphone, size: "w-16 h-16", color: "#a78bfa", glow: "rgba(167,139,250,0.4)", delay: "4s", label: "Mobile" },
  { icon: Cloud, size: "w-24 h-24", color: "#60a5fa", glow: "rgba(96,165,250,0.4)", delay: "1s", label: "Cloud" },
  { icon: Server, size: "w-18 h-18", color: "#4ade80", glow: "rgba(74,222,128,0.4)", delay: "5s", label: "DevOps" },
  { icon: PenTool, size: "w-14 h-14", color: "#f472b6", glow: "rgba(244,114,182,0.4)", delay: "3s", label: "Design" },
  { icon: Shield, size: "w-20 h-20", color: "#34d399", glow: "rgba(52,211,153,0.4)", delay: "6s", label: "Security" },
];

export default function MultiverseTechnologies() {
  return (
    <section className="relative w-full py-22  overflow-hidden">

      {/* 1. The Causal Ocean Background (Deep Space/Nebula) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e3a8a]/30 via-[#030b1a] to-[#030b1a]"></div>

      </div>

      {/* 2. Floating Cosmic Dust/Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        {[...Array(20)].map((_, i) => (
          <img
            key={i}
            src="/images/herobannerstar.png" // Reusing your star image
            alt="star"
            className="absolute  opacity-60"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Column: Text Content */}
        <FadeIn direction="left" delay={100} className="flex flex-col w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-[0_0_8px_rgba(166,200,255,0.6)]">
            Empowering Businesses Through Innovation
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            We deliver <span className="text-[#187BDD] drop-shadow-[0_0_15px_rgba(24,123,221,0.6)]">powerful software solutions and modern technologies.</span>
          </h2>
          <p className="text-[#C1C6D5] text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            that help businesses grow faster, improve efficiency, and stay ahead in an evolving digital world.          </p>
        </FadeIn>

        {/* Right Column: Mahavishnu Multiverse Animation */}
        <FadeIn direction="none" delay={300} className="relative w-full h-[500px] sm:h-[600px] flex items-center justify-center mt-10 lg:mt-0">

          {/* Central Source Energy (Where universes are 'exhaled') */}
          <div className="absolute w-10 h-10 bg-white rounded-full blur-md opacity-80 animate-pulse-fast z-0"></div>
          <div className="absolute w-32 h-32 bg-[#187BDD] rounded-full blur-3xl opacity-30 animate-pulse-slow z-0"></div>

          {/* The Floating 'Universe' Bubbles */}
          <div className="relative w-full h-full">
            {universes.map((uni, index) => {
              // Calculate random initial positions to look natural
              const top = [10, 25, 60, 75, 20, 55, 70][index];
              const left = [45, 15, 20, 50, 75, 80, 10][index];

              const UniIcon = uni.icon;

              return (
                <div
                  key={index}
                  className={`absolute flex flex-col items-center justify-center animate-multiverse-float`}
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    animationDelay: uni.delay,
                  }}
                >
                  {/* The Bubble/Universe Sphere */}
                  <div
                    className={`${uni.size} rounded-full border border-white/20 flex items-center justify-center relative group overflow-hidden animate-pulse-slow`}
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${uni.color}20, #000000)`,
                      boxShadow: `0 0 20px ${uni.color}30, inset 0 0 15px ${uni.color}20`,
                      animationDelay: uni.delay, // staggered pulse
                    }}
                  >
                    {/* Inner Iridescent Sheen (Bubble effect) */}
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_70%,_#ffffff10,_transparent_70%)]"></div>

                    {/* The Icon (The technology within the universe) */}
                    <UniIcon
                      className="w-1/2 h-1/2 transition-transform duration-500 group-hover:scale-110"
                      style={{
                        color: uni.color,
                        filter: `drop-shadow(0 0 10px ${uni.color})`
                      }}
                    />

                    {/* Hover Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `0 0 40px 10px ${uni.glow}` }}
                    ></div>
                  </div>

                  {/* Optional Label floating below */}
                  <span className="text-xs mt-2 text-[#C1C6D5]/70 font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {uni.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Faint connecting 'energy lines' implying interoperability */}
          <svg className="absolute inset-0 w-full h-full opacity-10 z-[-1]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M45,15 C30,30 20,40 15,60" stroke="#187BDD" strokeWidth="0.2" fill="none" strokeDasharray="1 2" />
            <path d="M45,15 C60,30 70,20 80,55" stroke="#187BDD" strokeWidth="0.2" fill="none" strokeDasharray="1 2" />
            <path d="M15,60 C20,70 40,80 50,75" stroke="#187BDD" strokeWidth="0.2" fill="none" strokeDasharray="1 2" />
            <path d="M50,75 C60,80 75,70 80,55" stroke="#187BDD" strokeWidth="0.2" fill="none" strokeDasharray="1 2" />
          </svg>
        </FadeIn>
      </div>
    </section>
  );
}