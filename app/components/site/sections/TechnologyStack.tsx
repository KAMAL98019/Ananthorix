import { Bot, BrainCircuit, ScanSearch, type LucideIcon } from "lucide-react";
import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import TechnologyExplorer from "./TechnologyExplorer";
import { LAYER_ORDER, technologyCategories, technologyIntro, type TechnologyCategory } from "../../../content/technologies";
import { TECH_LOGOS } from "../../../content/techLogos";

// Technology We Use. Panels (with brand marks) render on the server and are handed to the small client explorer,
// so the logo paths never ship in client JavaScript. Concepts that are not brands get a plain icon; a technology
// without a published mark keeps a text monogram rather than an invented logo.
const CONCEPT_ICONS: Record<string, LucideIcon> = {
  "AI Agents": Bot,
  LLMs: BrainCircuit,
  "RAG / Vector Search": ScanSearch,
};

// Two-letter monogram: two capitals when the name has them (OpenAI -> OA), else the first two letters.
function monogram(name: string) {
  const caps = name.match(/[A-Z]/g) ?? [];
  if (caps.length >= 2) return caps.slice(0, 2).join("");
  const letters = name.replace(/[^A-Za-z]/g, "");
  return letters.charAt(0).toUpperCase() + letters.charAt(1).toLowerCase();
}

// Very dark brand colours (black marks) would vanish on the dark panel, so those stay white on hover.
function hoverColour(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const luminance = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return luminance < 0.35 ? "#F5F7FA" : hex;
}

function TechMark({ name }: { name: string }) {
  const logo = TECH_LOGOS[name];
  const Concept = CONCEPT_ICONS[name];
  const box = "inline-flex size-12 items-center justify-center rounded-button border border-white/10 bg-white/[0.07] text-starlight transition-colors duration-200";
  if (logo) {
    return (
      <span aria-hidden="true" className={`${box} group-hover/tile:text-[var(--brand)]`} style={{ "--brand": hoverColour(logo.hex) } as React.CSSProperties}>
        <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" focusable="false">
          <path d={logo.path} />
        </svg>
      </span>
    );
  }
  if (Concept) {
    return (
      <span aria-hidden="true" className={`${box} group-hover/tile:text-gold`}>
        <Concept className="size-6" strokeWidth={1.6} />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={`${box} font-heading text-[15px] font-bold group-hover/tile:text-gold`}>
      {monogram(name)}
    </span>
  );
}

function LayerPanel({ layer, index, total }: { layer: TechnologyCategory; index: number; total: number }) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
          Layer {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <p className="rounded-chip border border-white/15 bg-white/5 px-3 py-1 text-[12px] text-starlight/80">{layer.items.length} technologies</p>
      </div>
      <h3 className="type-h3 mt-4 text-starlight">{layer.title}</h3>
      <p className="type-body mt-2 max-w-xl text-starlight/70">{layer.summary}</p>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {layer.items.map((tech, i) => (
          <li
            key={tech.name}
            style={{ animationDelay: `${i * 70}ms` }}
            className="tech-tile group/tile relative rounded-card border border-white/10 bg-white/[0.05] p-4 transition-colors duration-200 hover:border-gold/50 hover:bg-white/[0.09]"
          >
            <span aria-hidden="true" className="absolute right-3 top-3 font-mono text-[10px] text-starlight/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <TechMark name={tech.name} />
            <p className="mt-3 text-sm font-semibold text-starlight">{tech.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function TechnologyStack({ categories = technologyCategories }: { categories?: TechnologyCategory[] }) {
  const layers = LAYER_ORDER.map((id) => categories.find((c) => c.id === id)).filter((c): c is TechnologyCategory => Boolean(c));
  return (
    <Section labelledBy="technology-heading">
      <Container>
        <SectionHeading id="technology-heading" eyebrow={technologyIntro.eyebrow} title={technologyIntro.title} lead={technologyIntro.lead} />
        <div className="mt-14">
          <TechnologyExplorer
            layers={layers.map((l) => ({ id: l.id, title: l.title, count: l.items.length }))}
            panels={layers.map((l, i) => (
              <LayerPanel key={l.id} layer={l} index={i} total={layers.length} />
            ))}
          />
        </div>
        <p className="type-small mt-8 text-fg-secondary">{technologyIntro.note}</p>
      </Container>
    </Section>
  );
}
