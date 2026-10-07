import PageHero from "../blocks/PageHero";
import { hero, heroOutcomes } from "../../../content/home";
import { SEE_AGENTS, START_PROJECT } from "../../../content/routes";

// 1. Hero
export default function HeroSection() {
  return (
    <PageHero
      variant="home"
      eyebrow={hero.eyebrow}
      headline={hero.headline}
      lead={hero.lead}
      outcomes={heroOutcomes}
      primary={{ label: START_PROJECT.label, href: START_PROJECT.href }}
      secondary={{ label: SEE_AGENTS.label, href: SEE_AGENTS.href }}
    />
  );
}
