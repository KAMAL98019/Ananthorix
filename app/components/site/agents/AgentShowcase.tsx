"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import LiveChat from "./LiveChat";
import { cx } from "../../ui/cx";

// WAI-ARIA tabs with roving tabindex. Arrow keys move between tabs, Home and End jump to the ends.
// Tab moves focus into the active panel. Only one panel is visible at a time.
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

  const select = (index: number) => {
    setSelected(index);
    tabRefs.current[index]?.focus();
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
      select(next);
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="AI Agents" className="flex flex-wrap gap-2">
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
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cx(
                "min-h-11 rounded-chip px-5 text-small font-semibold transition-colors",
                isSelected
                  ? "bg-deep-blue text-canvas shadow-raised"
                  : "bg-canvas text-deep-blue ring-1 ring-inset ring-line-strong hover:bg-surface-1",
              )}
            >
              {agent.tab}
            </button>
          );
        })}
      </div>

      {agents.map((agent, index) => {
        const isSelected = index === selected;
        return (
          <div
            key={agent.id}
            role="tabpanel"
            id={`${baseId}-panel-${agent.id}`}
            aria-labelledby={`${baseId}-tab-${agent.id}`}
            tabIndex={0}
            hidden={!isSelected}
            className="mt-8 grid gap-8 rounded-panel border border-line bg-canvas p-6 shadow-raised md:p-10 lg:grid-cols-12 lg:gap-10"
          >
            <div className="min-w-0 lg:col-span-5">
              <h3 className="type-h3 text-fg-primary">{agent.headline}</h3>
              <p className="type-body mt-4 text-fg-secondary">{agent.body}</p>
              {agent.jobs && agent.jobs.length > 0 && (
                <ul className="mt-6 space-y-3">
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
              <Link
                href={agent.href}
                className="mt-6 inline-flex min-h-11 items-center font-semibold text-deep-blue underline underline-offset-4 hover:text-indigo"
              >
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
  );
}
