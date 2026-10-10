"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import PlayWhenVisible from "../../motion/PlayWhenVisible";
import { useMotion } from "../../motion/MotionProvider";
import { cx } from "../../ui/cx";
import { showcaseProjects, type ShowcaseProject } from "../../../content/projects";
import { Label, Select } from "../../ui/Field";
import DecoText from "../../ui/DecoText";

// Real-project showcase. Left: compact project selectors, two visible at a time, looping automatically,
// with Previous, pause/play and Next. Right: the active project, which collapses to a short preview with a
// fade and an expand button. Only the active logo is rendered. Advances every 6 seconds. Pauses offscreen,
// when paused, or under reduced motion.
const INTERVAL_MS = 6000;
const TRANSITION_MS = 600;
const ITEM_PX = 96; // one selector row, including its gap
const VIEW_PX = ITEM_PX * 3; // three rows visible
const COUNT = showcaseProjects.length;
const COLLAPSED_PX = 200; // preview height when collapsed

// The list is repeated so the loop never shows an empty gap. The middle copy is the "real" one; the others
// are buffers, so several quick moves in a row still land on rendered rows before the position is normalised.
const COPIES = 9;
const MID = Math.floor(COPIES / 2) * COUNT;
const loopItems = Array.from({ length: COPIES }, () => showcaseProjects).flat();
// Non-negative modulo: JavaScript's % keeps the sign, so -1 % 3 is -1, not 2.
const wrap = (p: number) => ((p % COUNT) + COUNT) % COUNT;
// Keep one rendered row above and below the active row, however fast the moves come.
const clampPos = (p: number) => Math.min(Math.max(p, 1), loopItems.length - 2);

export default function ProjectShowcase() {
  const [pos, setPos] = useState(MID);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [inView, setInView] = useState(true);
  const { reducedMotion } = useMotion();
  const baseId = useId();
  const sectionRef = useRef<HTMLDivElement>(null);
  const active = wrap(pos);
  const project = showcaseProjects[active];
  const autoPlaying = !reducedMotion;

  // Pause when the section is offscreen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance. Each move restarts the timer, so every project stays for the full interval.
  useEffect(() => {
    if (paused || reducedMotion || !inView) return;
    const timer = window.setTimeout(() => setPos((p) => clampPos(p + 1)), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [pos, paused, reducedMotion, inView]);

  // When the position leaves the middle copy, jump back into it without animating once the slide has
  // finished. The rows are identical, so nothing visibly moves. This runs on a timer, not on transitionend,
  // because transitionend is skipped in background tabs, under reduced motion and when moves overlap;
  // missing it let the position run past the rendered rows and the list disappeared.
  useEffect(() => {
    if (pos >= MID && pos < MID + COUNT) return;
    const timer = window.setTimeout(
      () => {
        setAnimate(false);
        setPos((p) => wrap(p) + MID);
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => setAnimate(true)));
      },
      reducedMotion ? 0 : TRANSITION_MS + 50,
    );
    return () => window.clearTimeout(timer);
  }, [pos, reducedMotion]);

  const goTo = (target: number) => setPos(clampPos(target));

  const listStyle = {
    transform: `translate3d(0, ${-(pos - 1) * ITEM_PX}px, 0)`,
    transition: animate && !reducedMotion ? `transform ${TRANSITION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1)` : "none",
  };

  return (
    <Section tone="surface1" labelledBy="projects-heading" id="projects">
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="Built for real businesses"
          title="Software that works in the real world."
          lead="We build digital products and business systems around real operational needs."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: compact selectors, two visible, looping, with navigation */}
          <div className="min-w-0 lg:col-span-4 lg:self-center">
            <div
              className="relative overflow-hidden"
              style={{
                height: VIEW_PX,
                maskImage: "linear-gradient(to bottom, transparent 0%, #000 34%, #000 66%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 34%, #000 66%, transparent 100%)",
              }}
            >
              <ul
                style={listStyle}
                className="absolute inset-x-0 top-0 m-0 list-none p-0"
                aria-label="Projects"
              >
                {loopItems.map((item, index) => {
                  const current = index === pos;
                  const copy = index < MID || index >= MID + COUNT;
                  return (
                    <li key={`${item.id}-${index}`} aria-hidden={copy || undefined} style={{ height: ITEM_PX }} className="pb-3">
                      <button
                        type="button"
                        tabIndex={copy ? -1 : 0}
                        aria-current={current ? "true" : undefined}
                        aria-controls={`${baseId}-panel`}
                        onClick={() => goTo(index)}
                        onKeyDown={(event) => {
                          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                            event.preventDefault();
                            goTo(pos + 1);
                          }
                          if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                            event.preventDefault();
                            goTo(pos - 1);
                          }
                        }}
                        className={cx(
                          "relative flex h-full w-full items-center gap-4 overflow-hidden rounded-card px-5 text-left transition-all duration-300",
                          current ? "bg-deep-blue text-canvas shadow-floating" : "text-fg-secondary hover:bg-canvas hover:text-deep-blue",
                        )}
                      >
                        <span className={cx("font-mono text-[12px] tracking-wide", current ? "text-gold" : "text-fg-secondary")}>
                          {String((index % COUNT) + 1).padStart(2, "0")}
                        </span>
                        {/* Loop copies show the same names decoratively, so each project name is page text once. */}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-base font-semibold">{copy ? <DecoText text={item.name} /> : item.name}</span>
                          <span className={cx("type-small mt-0.5 block truncate", current ? "text-canvas/70" : "text-fg-secondary")}>
                            {copy ? <DecoText text={item.category.split(" · ")[0]} /> : item.category.split(" · ")[0]}
                          </span>
                        </span>
                        {/* Countdown to the next project. Restarts on each move, freezes when paused. */}
                        {current && autoPlaying && (
                          <span
                            key={pos}
                            aria-hidden="true"
                            className="showcase-progress absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gold"
                            style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: paused || !inView ? "paused" : "running" }}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={cx("mt-2 grid gap-3", autoPlaying ? "grid-cols-3" : "grid-cols-2")}>
              <button
                type="button"
                onClick={() => goTo(pos - 1)}
                aria-label="Previous project"
                className="min-h-11 rounded-button border border-line-strong bg-canvas px-3 font-semibold text-deep-blue hover:bg-surface-1"
              >
                <span aria-hidden="true">←</span>
                <span className="hidden min-[400px]:inline"> Previous</span>
              </button>
              {autoPlaying && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-pressed={paused}
                  aria-label={paused ? "Resume automatic rotation" : "Pause automatic rotation"}
                  className="inline-flex min-h-11 items-center justify-center rounded-button border border-line-strong bg-canvas text-deep-blue hover:bg-surface-1"
                >
                  {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => goTo(pos + 1)}
                aria-label="Next project"
                className="min-h-11 rounded-button border border-line-strong bg-canvas px-3 font-semibold text-deep-blue hover:bg-surface-1"
              >
                <span className="hidden min-[400px]:inline">Next </span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* Right: active project, collapsible with a fade */}
          <div ref={sectionRef} id={`${baseId}-panel`} className="min-w-0 lg:col-span-8">
            <ActiveProject project={project} expanded={expanded} onToggleExpanded={() => setExpanded((e) => !e)} baseId={baseId} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ActiveProject({
  project,
  expanded,
  onToggleExpanded,
  baseId,
}: {
  project: ShowcaseProject;
  expanded: boolean;
  onToggleExpanded: () => void;
  baseId: string;
}) {
  const detailsId = `${baseId}-details`;
  return (
    <article className="rounded-panel border border-line bg-canvas p-6 shadow-raised md:p-10">
      <div key={project.id} className="project-enter">
        <div className="flex items-center justify-start rounded-card bg-surface-1 p-4" style={{ minHeight: project.displayHeight + 32 }}>
          {/* Width follows the logo's aspect ratio. The sizes hint lets the optimizer serve a 2x file on retina screens. */}
          <Image
            src={project.logo.src}
            alt={project.logo.alt}
            width={project.logo.width}
            height={project.logo.height}
            sizes={`${Math.round((project.displayHeight * project.logo.width) / project.logo.height)}px`}
            style={{ height: project.displayHeight, width: "auto" }}
            className="max-w-full object-contain"
          />
        </div>
        <p className="type-eyebrow mt-6">{project.category}</p>
        <h3 className="type-h3 mt-3 text-fg-primary">{project.name}</h3>

        {/* Collapsed: a short preview that fades at the bottom. Expanded: everything. */}
        <div id={detailsId} className="relative mt-4">
          <div style={expanded ? undefined : { maxHeight: COLLAPSED_PX, overflow: "hidden" }}>
            <p className="type-body text-fg-secondary">{project.description}</p>
            <PlayWhenVisible label={`${project.visualNote}: ${project.name}`} className="project-stage mt-8">
              <FlowVisual project={project} />
            </PlayWhenVisible>
          </div>
          {!expanded && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas via-canvas/85 to-transparent"
            />
          )}
        </div>

        <div className={cx("flex justify-center", expanded ? "mt-6" : "relative -mt-14")}>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={onToggleExpanded}
            className="inline-flex min-h-11 items-center gap-2 rounded-chip border border-line-strong bg-canvas px-5 font-semibold text-deep-blue shadow-raised hover:bg-surface-1"
          >
            {expanded ? "Collapse details" : "Expand details"}
            <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

// Business data flow: each step shows its status. A dot travels the connector (CSS only).
function FlowVisual({ project }: { project: ShowcaseProject }) {
  return (
    <div className="rounded-card border border-line bg-surface-1 p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <p className="font-semibold text-fg-primary">{project.visualNote}</p>
        <p className="rounded-tag bg-gold/20 px-2 py-1 font-mono text-[11px] font-semibold text-fg-primary">ILLUSTRATIVE</p>
      </div>
      <ol className="mt-5 flex flex-col gap-2">
        {project.flow.map((step, index) => (
          <li key={step.label} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 rounded-card border border-line bg-canvas px-4 py-3">
              <span className="font-mono text-[12px] tracking-wide text-deep-blue">{step.label}</span>
              <span className="rounded-chip bg-surface-2 px-3 py-1 text-small font-medium text-fg-primary">{step.status}</span>
            </div>
            {index < project.flow.length - 1 && (
              <div aria-hidden="true" className="ml-6 flex h-5 w-px flex-col items-center bg-line-strong">
                <span className="flow-dot size-1.5 rounded-full bg-purple" />
              </div>
            )}
          </li>
        ))}
      </ol>
      {project.visual === "clinic" && <ClinicExtras />}
      {project.visual === "furniture" && <FurnitureExtras />}
    </div>
  );
}

// Real product categories the business manufactures, shown as the system's own "Product Name" field.
// A free "Custom" entry covers one-off orders outside the standard list. No prices, dates, model
// numbers or payment totals: that ledger is private between the business and its workshop.
const FURNITURE_PRODUCT_NAMES = [
  "Bottom Cot",
  "Head Box",
  "Full Box",
  "Dining Set",
  "Wooden Sofa",
  "Office Table",
  "Lamp Box",
  "Diwan",
  "Custom",
];

function FurnitureExtras() {
  return (
    <div className="mt-6 rounded-card border border-line bg-canvas p-4">
      <Label htmlFor="furniture-product-name">Product Name</Label>
      <div className="mt-2">
        <Select
          id="furniture-product-name"
          disabled
          defaultValue={FURNITURE_PRODUCT_NAMES[0]}
          aria-label="Product name, illustrative only"
        >
          {FURNITURE_PRODUCT_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

// Generic clinic structure only: no patient data, no real names, no counts.
function ClinicExtras() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-card border border-line bg-canvas p-4">
        <p className="type-eyebrow">Appointment</p>
        <p className="type-small mt-2 text-fg-primary">Date and time slot</p>
        <p className="type-small text-fg-secondary">Illustrative card, not a live booking</p>
      </div>
      <div className="rounded-card border border-line bg-canvas p-4">
        <p className="type-eyebrow">Service discovery</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {["Consultation", "Treatments", "Doctor profile", "Services"].map((chip) => (
            <li key={chip} className="rounded-chip bg-surface-1 px-3 py-1 text-small text-fg-primary">
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
