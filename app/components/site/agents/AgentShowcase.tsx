"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import LiveChat from "./LiveChat";
import { cx } from "../../ui/cx";

// Large screens: WAI-ARIA tabs with roving tabindex (arrow keys, Home/End); only the selected panel shows.
// Small screens: the panels become a horizontal swipe carousel (scroll-snap), with the next card peeking in.
// Tabs and dots stay in sync with the swipe, and tapping a tab scrolls to its card. Vertical page scrolling passes
// straight through the carousel, so the section is quick to scroll past on a phone.
export type AgentTab = {
  id: string;
  tab: string;
  headline: string;
  body: string;
  href: string;
  transcript: { speaker: string; text: string }[];
  jobs?: string[];
};

export default function AgentShowcase({ agents }: { agents: AgentTab[] }) {
  const [selected, setSelected] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frame = useRef(0);

  // True when the carousel layout is active (the track scrolls sideways).
  const isCarousel = () => {
    const track = trackRef.current;
    return Boolean(track && track.scrollWidth > track.clientWidth + 1);
  };

  const scrollToPanel = (index: number) => {
    const track = trackRef.current;
    const panel = panelRefs.current[index];
    if (!track || !panel || !isCarousel()) return;
    track.scrollTo({ left: panel.offsetLeft - track.offsetLeft - (track.clientWidth - panel.clientWidth) / 2, behavior: "smooth" });
  };

  const choose = (index: number, focus = false) => {
    setSelected(index);
    scrollToPanel(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  // Swiping updates the selected tab to the card nearest the centre.
  const onTrackScroll = () => {
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      const track = trackRef.current;
      if (!track || !isCarousel()) return;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        const mid = panel.offsetLeft - track.offsetLeft + panel.clientWidth / 2;
        const distance = Math.abs(mid - centre);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      });
      setSelected((current) => (current === nearest ? current : nearest));
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = agents.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next !== null) {
      event.preventDefault();
      choose(next, true);
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="AI Agents" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
        {agents.map((agent, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={agent.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${agent.id}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${agent.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => choose(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cx(
                "min-h-11 shrink-0 whitespace-nowrap rounded-chip px-4 text-[13px] font-semibold transition-colors sm:px-5 sm:text-small",
                isSelected ? "bg-deep-blue text-canvas shadow-raised" : "bg-canvas text-deep-blue ring-1 ring-inset ring-line-strong hover:bg-surface-1",
              )}
            >
              {agent.tab}
            </button>
          );
        })}
      </div>

      <div
        ref={trackRef}
        onScroll={onTrackScroll}
        className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:mt-8 lg:block lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {agents.map((agent, index) => {
          const isSelected = index === selected;
          return (
            <div
              key={agent.id}
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              role="tabpanel"
              id={`${baseId}-panel-${agent.id}`}
              aria-labelledby={`${baseId}-tab-${agent.id}`}
              tabIndex={0}
              className={cx(
                "grid w-[86%] shrink-0 snap-center gap-6 rounded-panel border border-line bg-canvas p-5 shadow-raised sm:w-[78%] sm:p-8 md:p-10 lg:w-auto lg:grid-cols-12 lg:gap-10",
                !isSelected && "lg:hidden",
              )}
            >
              <div className="min-w-0 lg:col-span-5">
                <h3 className="type-h3 text-fg-primary">{agent.headline}</h3>
                <p className="type-body mt-3 text-fg-secondary lg:mt-4">{agent.body}</p>
                {agent.jobs && agent.jobs.length > 0 && (
                  <ul className="mt-6 hidden space-y-3 sm:block">
                    {agent.jobs.map((job) => (
                      <li key={job} className="flex items-start gap-3 type-small text-fg-primary">
                        <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-purple/10 text-purple">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {job}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={agent.href} className="mt-4 inline-flex min-h-11 items-center font-semibold text-deep-blue underline underline-offset-4 hover:text-indigo lg:mt-6">
                  Explore {agent.tab}
                </Link>
              </div>
              <div className="min-w-0 lg:col-span-7">
                <LiveChat title={agent.tab} transcript={agent.transcript} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe position (small screens only). Decorative: the tabs carry the same information. */}
      <div aria-hidden="true" className="mt-4 flex justify-center gap-2 lg:hidden">
        {agents.map((agent, index) => (
          <span key={agent.id} className={cx("h-1.5 rounded-full transition-all duration-300", index === selected ? "w-6 bg-deep-blue" : "w-1.5 bg-line-strong")} />
        ))}
      </div>
    </div>
  );
}
