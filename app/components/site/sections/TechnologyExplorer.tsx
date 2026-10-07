"use client";

import { Box, BrainCircuit, CloudCog, Database, PanelsTopLeft, Server, type LucideIcon } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useMotion } from "../../motion/MotionProvider";
import { cx } from "../../ui/cx";
import type { TechnologyCategory } from "../../../content/technologies";

// Interactive "system stack" (client island: tab state only). Left: the six areas as layers of one system
// (WAI-ARIA tabs: click, tap, arrow keys, Home/End; on fine pointers hovering a layer also selects it).
// Right: the selected layer's panel, rendered on the server and passed in. Every panel stays in the DOM, so all
// technologies are readable by crawlers and assistive tech. Re-keying the active panel replays the tile entrance.
const ICONS: Record<TechnologyCategory["id"], LucideIcon> = {
  frontend: PanelsTopLeft,
  backend: Server,
  data: Database,
  ai: BrainCircuit,
  cloud: CloudCog,
  interactive: Box,
};

type LayerMeta = { id: TechnologyCategory["id"]; title: string; count: number };

export default function TechnologyExplorer({ layers, panels }: { layers: LayerMeta[]; panels: ReactNode[] }) {
  const [selected, setSelected] = useState(1); // Frontend first: the layer most visitors recognise.
  const { finePointer, reducedMotion } = useMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    setSelected(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = layers.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next !== null) {
      event.preventDefault();
      select(next, true);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Layers */}
      <div className="relative min-w-0 lg:col-span-5">
        <div aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 hidden w-px bg-gradient-to-b from-purple/40 via-gold/50 to-deep-blue/30 lg:block">
          {/* The track is the full line height, so a transform moves the dot from top to bottom (compositor only). */}
          <span className="tech-flow absolute inset-0">
            <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]" />
          </span>
        </div>
        <div role="tablist" aria-label="Technology layers" aria-orientation="vertical" className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3">
          {layers.map((layer, index) => {
            const Icon = ICONS[layer.id];
            const active = index === selected;
            return (
              <button
                key={layer.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${layer.id}`}
                aria-selected={active}
                aria-controls={`${baseId}-panel-${layer.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => select(index)}
                onMouseEnter={finePointer ? () => select(index) : undefined}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cx(
                  "group relative flex min-h-14 items-center gap-3 rounded-card border px-3 py-2.5 text-left transition-all duration-300 ease-out lg:px-4 lg:py-3",
                  active
                    ? "border-transparent bg-gradient-to-r from-deep-blue to-indigo text-starlight shadow-[0_14px_34px_rgba(10,31,68,0.28)] lg:translate-x-3"
                    : "border-line bg-canvas text-fg-primary hover:border-purple/40",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    "relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 lg:size-10",
                    active ? "bg-gold text-deep-blue" : "bg-surface-1 text-purple ring-4 ring-canvas",
                  )}
                >
                  <Icon className="size-4 lg:size-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold leading-tight lg:truncate lg:text-base">{layer.title}</span>
                  <span className={cx("hidden text-[12px] lg:block", active ? "text-starlight/70" : "text-fg-secondary")}>{layer.count} technologies</span>
                </span>
                <span aria-hidden="true" className={cx("hidden font-mono text-[11px] lg:block", active ? "text-gold" : "text-fg-secondary")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panels */}
      <div className="min-w-0 lg:col-span-7">
        {layers.map((layer, index) => {
          const active = index === selected;
          const Icon = ICONS[layer.id];
          return (
            <div
              key={layer.id}
              role="tabpanel"
              id={`${baseId}-panel-${layer.id}`}
              aria-labelledby={`${baseId}-tab-${layer.id}`}
              hidden={!active}
              tabIndex={0}
              className="relative isolate h-full overflow-hidden rounded-panel bg-[#070D22] p-6 text-starlight shadow-[0_30px_80px_rgba(10,31,68,0.3)] md:p-10"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -right-[20%] -top-[40%] aspect-square w-[80%] bg-[radial-gradient(closest-side,rgba(91,63,209,0.45),transparent)]" />
                <div className="absolute -bottom-[50%] -left-[10%] aspect-square w-[60%] bg-[radial-gradient(closest-side,rgba(212,175,55,0.14),transparent)]" />
                <Icon className="absolute -bottom-8 -right-8 size-56 text-white/[0.04]" strokeWidth={1} />
              </div>
              <div key={active && !reducedMotion ? `on-${selected}` : "static"}>{panels[index]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
