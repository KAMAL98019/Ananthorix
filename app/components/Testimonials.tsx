import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "ANANTORIX rebuilt our entire logistics platform using AI. Our throughput increased by 40% in just six months.",
    name: "Marcus Chen",
    title: "CTO, NexaLogistics",
  },
  {
    quote: "The level of technical depth their team possesses is unmatched. They don't just solve problems; they anticipate them.",
    name: "Sarah Williams",
    title: "Head of Product, VeloBank",
  },
  {
    quote: "From UI design to cloud migration, the transition was flawless. They are our go-to partner for all things tech.",
    name: "James T. Kirk",
    title: "Founder, Nebula Systems",
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#07152D] overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 text-center">
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16 tracking-tight">
          Voices of the Infinite
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl bg-[#0e1b33]/50 border border-slate-700/50 p-8 transition-colors hover:bg-[#13223e]"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#A6C8FF] fill-[#A6C8FF]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#C1C6D5] italic text-base leading-relaxed mb-8 flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-700 mr-4 shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {testimonial.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
