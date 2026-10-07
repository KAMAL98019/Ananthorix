import { Bot, ClipboardCheck, Target, TrendingUp, Users, type LucideIcon } from "lucide-react";
import Container from "../../layout/Container";
import CosmicBanner, { CosmicEyebrow } from "../blocks/CosmicBanner";
import Reveal from "../../motion/Reveal";
import { differentiators } from "../../../content/home";

// 11. Why Anantorix. Outcome-first differentiators. No metrics. A dark band breaks the run of light sections.
const ICONS: LucideIcon[] = [Target, Bot, ClipboardCheck, Users, TrendingUp];

export default function WhyAnantorix() {
  return (
    <section aria-labelledby="why-heading" className="bg-surface-1 py-section-sm md:py-section-md">
      <Container>
        <Reveal>
          <CosmicBanner>
            <div className="max-w-3xl">
              <CosmicEyebrow>Why Anantorix</CosmicEyebrow>
              <h2 id="why-heading" className="type-h2 mt-6 text-starlight">
                Engineering judgement, pointed at business results.
              </h2>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {differentiators.map((item, index) => {
                const Icon = ICONS[index % ICONS.length];
                return (
                  <li
                    key={item.title}
                    className="group rounded-card border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-gold/40 hover:bg-white/[0.08]"
                  >
                    <span aria-hidden="true" className="inline-flex size-11 items-center justify-center rounded-button bg-gradient-to-br from-purple to-indigo text-starlight shadow-[0_8px_24px_rgba(91,63,209,0.45)]">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="type-h4 mt-5 text-starlight">{item.title}</h3>
                    <p className="type-small mt-2 text-starlight/70">{item.body}</p>
                  </li>
                );
              })}
            </ul>
          </CosmicBanner>
        </Reveal>
      </Container>
    </section>
  );
}
