import FadeIn from "../components/FadeIn";
import Image from "next/image";
import { Zap, ShieldCheck, Cpu, Globe, Infinity, Box } from "lucide-react";

export const metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const values = [
    {
      icon: <Cpu className="w-8 h-8 text-[#A6C8FF]" />,
      title: "Technical Excellence",
      description: "We refuse to compromise on architecture. We build robust, scalable systems that serve as long-term assets, not technical debt.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#A6C8FF]" />,
      title: "Unwavering Integrity",
      description: "Transparency and honesty guide every client interaction. We treat your digital infrastructure as if it were our own.",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#A6C8FF]" />,
      title: "Rapid Innovation",
      description: "Pioneering the bleeding edge of AI and cloud architecture to ensure you are always two steps ahead of the competition.",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#A6C8FF]" />,
      title: "Infinite Scale",
      description: "Designing solutions specifically engineered to seamlessly scale from tens of users to tens of millions without skipping a beat.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#030b1a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-10 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#187BDD] rounded-full blur-[250px] opacity-10 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#3b82f6] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- DYNAMIC ISOMETRIC HERO SECTION (The "Different" Change) --- */}
        <section className="mb-24 sm:mb-32 pt-16 lg:pt-20">
          <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">

            {/* Left Column: Copy with Enhanced Typography */}
            <FadeIn direction="right" className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left flex-1">
              <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.3em] uppercase mb-5 drop-shadow-[0_0_8px_rgba(166,200,255,0.6)] block">
                The Anantorix Collective
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
                Architecting<br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A6C8FF] to-[#187BDD]">Technical</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#187BDD] to-transparent opacity-60"></span>
                </span><br />
                Limitlessness
              </h1>
              <p className="text-[#C1C6D5] text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Anantorix is a specialized collective of software architects, AI researchers, and digital strategists, unified by the belief that enterprise engineering should serve as a launchpad for infinite growth, not a constraint.
              </p>
            </FadeIn>

            {/* Right Column: The "Infinite Engineering" Kinetic Sculpture */}
            <FadeIn direction="left" delay={300} className="relative w-full lg:w-[450px] shrink-0 h-[400px] sm:h-[450px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">

                {/* Visual Perspective Container */}
                <div className="absolute inset-0 [perspective:1000px] flex items-center justify-center">

                  {/* Rotating 'Infinite' Möbius Loop Visual */}
                  <div className="relative w-full h-full animate-[spin_30s_linear_infinite] [transform-style:preserve-3d]">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-[#187BDD]/40 opacity-50"
                        style={{
                          background: 'radial-gradient(circle at center, transparent 30%, #187BDD10 70%)',
                          transform: `rotateX(${i * 60}deg) rotateY(${i * 60}deg)`,
                          boxShadow: '0 0 30px #187BDD50, inset 0 0 20px #187BDD30',
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Central Scalability Cube (The engineered core) */}
                  <div className="absolute flex items-center justify-center w-24 h-24 rounded-3xl bg-[#07152D] border border-white/10 shadow-[0_0_50px_rgba(24,123,221,0.7)] z-20 group">
                    <Box className="w-12 h-12 text-[#187BDD] animate-pulse-slow group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 rounded-3xl bg-[#187BDD] blur-3xl opacity-20"></div>
                  </div>

                  {/* Floating Tech Orbits */}
                  {[
                    { icon: Cpu, delay: '0s', pos: 'top-[10%] left-[10%]' },
                    { icon: Infinity, delay: '2s', pos: 'bottom-[15%] right-[5%]' },
                    { icon: Zap, delay: '4s', pos: 'top-[60%] left-[80%]' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`absolute w-14 h-14 rounded-2xl bg-[#07152D] border border-[#187BDD]/30 flex items-center justify-center animate-multiverse-float z-30 shadow-lg ${item.pos}`}
                      style={{
                        animationDelay: item.delay,
                        boxShadow: '0 0 20px rgba(24,123,221,0.3)',
                      }}
                    >
                      <item.icon className="w-7 h-7 text-[#A6C8FF]" />
                    </div>
                  ))}

                  {/* Engineered Connecting Lines (Faint Grid) */}
                  <div className="absolute inset-[-50px] border border-dashed border-[#187BDD]/10 opacity-30 animate-pulse-slow z-[-1]"></div>
                </div>

              </div>
            </FadeIn>
          </div>
        </section>
        {/* --- END DYNAMIC ISOMETRIC HERO SECTION --- */}

        {/* Our Story / Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 sm:mb-32 relative">
          <div className="absolute left-[-100px] w-[2px] h-full bg-gradient-to-b from-[#187BDD10] via-[#187BDD50] to-[#187BDD10] opacity-50 hidden xl:block"></div>
          <FadeIn direction="right" className="relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(24,123,221,0.2)] group">
              <Image
                src="/images/innovatingfuture.png"
                alt="Anantorix Mission"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030b1a] via-transparent to-transparent opacity-80"></div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={200}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white tracking-tight">Our Philosophy</h2>
            <div className="space-y-6 text-[#8896AB] text-base sm:text-lg leading-relaxed">
              <p>
                Founded on the principle that superior engineering unlocks infinite possibilities, Anantorix was created to bridge the gap between ambitious business goals and raw technical execution.
              </p>
              <p>
                We don't just write code; we architect ecosystems. Whether you need a hyper-scalable cloud backend, a bespoke generative AI integration, or a pixel-perfect user interface, our multidisciplinary team treats every project as a masterpiece of modern computer science.
              </p>
              <p>
                Our name, derived from "Anant" (Infinite), reflects our commitment to delivering solutions that grow seamlessly alongside your vision.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Core Values */}
        <section>
          <FadeIn direction="up" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Our Core Values</h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 150}>
                <div className="h-full bg-[#07152D] border border-white/5 p-8 rounded-3xl hover:border-[#187BDD]/30 hover:bg-[#0a1e3f] transition-all duration-300 shadow-xl group">
                  <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#187BDD]/10 group-hover:scale-110 group-hover:bg-[#187BDD]/20 transition-transform duration-500">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{val.title}</h3>
                  <p className="text-[#8896AB] leading-relaxed text-sm">
                    {val.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}