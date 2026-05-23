"use client";

import FadeIn from "../FadeIn";
import { Server, Combine, Shuffle, Database } from "lucide-react";

export default function CustomSoftwareCapabilities() {
  const capabilities = [
    {
      icon: <Server className="w-8 h-8 text-[#187BDD]" />,
      title: "Enterprise Architecture",
      description: "Designing cloud-native, scalable systems built for high availability and security."
    },
    {
      icon: <Combine className="w-8 h-8 text-[#187BDD]" />,
      title: "API & System Integration",
      description: "Seamlessly connecting your disparate legacy systems and third-party tools to create unified workflows."
    },
    {
      icon: <Shuffle className="w-8 h-8 text-[#187BDD]" />,
      title: "Legacy Modernization",
      description: "Upgrading outdated monolithic software into agile, modern microservices without disrupting your business."
    },
    {
      icon: <Database className="w-8 h-8 text-[#187BDD]" />,
      title: "Data Engineering",
      description: "Building robust data pipelines and architecture to help you harness and analyze your enterprise data at scale."
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative bg-[#050b14] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Our Software Engineering <span className="text-[#187BDD]">Offerings</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {capabilities.map((cap, index) => (
            <FadeIn key={index} direction="up" delay={index * 150}>
              <div className="bg-[#0a1628] rounded-3xl p-8 sm:p-12 border border-white/5 hover:border-[#187BDD]/30 transition-colors group h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-[#030b1a] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(24,123,221,0.3)] transition-all duration-300">
                  {cap.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{cap.title}</h3>
                <p className="text-[#8896AB] leading-relaxed text-lg flex-grow">
                  {cap.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        
      </div>
    </section>
  );
}
