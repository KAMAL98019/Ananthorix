import { Check } from "lucide-react";

// "Path to Infinity" process block. Each stage is one card: a numbered node in its header, the summary,
// and a deliverables panel pinned to the card's foot so the panels line up across a row. On large screens a
// gradient path runs behind the cards at node height and shows in the gaps, linking the stages.
export type ProcessStep = { title: string; summary: string; deliverables: string[] };

export default function ProcessSteps({ steps, headingLevel = 3 }: { steps: ProcessStep[]; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const total = String(steps.length).padStart(2, "0");
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[52px] hidden h-0.5 rounded-full bg-gradient-to-r from-deep-blue via-purple to-gold lg:block"
      />
      <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const number = String(index + 1).padStart(2, "0");
          return (
            <li key={step.title} className="flex">
              <div className="hover-lift group relative flex w-full flex-col overflow-hidden rounded-card border border-line bg-canvas shadow-raised">
                {/* Decorative watermark drawn by a pseudo-element, so it is not treated as page text. */}
                <span
                  aria-hidden="true"
                  data-watermark={number}
                  className="pointer-events-none absolute -right-2 -top-6 select-none font-heading text-[112px] font-bold leading-none text-purple/[0.06] before:content-[attr(data-watermark)]"
                />

                <div className="flex items-center justify-between px-6 pt-6 md:px-7">
                  <span
                    aria-hidden="true"
                    className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-purple to-deep-blue font-mono text-[15px] font-semibold text-starlight shadow-[0_10px_24px_rgba(91,63,209,0.35)] ring-4 ring-canvas"
                  >
                    {number}
                  </span>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-fg-secondary">
                    STAGE {number}/{total}
                  </span>
                </div>

                <div className="px-6 pt-6 md:px-7">
                  <Heading className="type-h4 text-fg-primary">{step.title}</Heading>
                  <p className="type-small mt-3 text-fg-secondary">{step.summary}</p>
                </div>

                <div className="mt-auto p-3 pt-6">
                  <div className="rounded-[16px] bg-surface-1 p-4 md:p-5">
                    <p className="type-eyebrow text-fg-secondary">Deliverables</p>
                    <ul className="mt-3 space-y-2">
                      {step.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 type-small text-fg-primary">
                          <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-purple/10 text-purple">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-deep-blue via-purple to-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
