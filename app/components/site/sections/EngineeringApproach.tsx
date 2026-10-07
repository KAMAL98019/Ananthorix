import { Plus, Rocket, ShieldCheck, Sparkles, UserCheck, Wrench } from "lucide-react";
import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import { approach } from "../../../content/approach";

// Built by engineers. Accelerated by AI. A server-rendered process diagram: Engineering (primary, owns decisions)
// + AI-assisted development (supporting) converge into intelligent systems, then production. No client JS.
// The only motion is a soft light on the connectors (transform/opacity, started after load, static under
// reduced motion) and a 3px hover lift on the blocks. The diagram reads fully without colour or motion.
export default function EngineeringApproach() {
  const { engineering, ai, result } = approach;
  return (
    <Section tone="surface1" labelledBy="approach-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Copy */}
          <div className="min-w-0 lg:col-span-5">
            <SectionHeading id="approach-heading" eyebrow={approach.eyebrow} title={approach.title} lead={approach.lead} />
            <figure className="mt-8 flex items-start gap-4 rounded-card border border-gold/40 bg-canvas p-5 shadow-raised">
              <span aria-hidden="true" className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-deep-blue text-gold">
                <UserCheck className="size-5" />
              </span>
              <blockquote className="font-heading text-lg font-semibold leading-snug text-deep-blue md:text-xl">{approach.statement}</blockquote>
            </figure>
          </div>

          {/* Diagram */}
          <div className="min-w-0 lg:col-span-7">
            <div className="relative isolate overflow-hidden rounded-panel bg-[#070D22] p-5 text-starlight shadow-[0_30px_80px_rgba(10,31,68,0.3)] sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-[20%] -top-[40%] aspect-square w-[70%] bg-[radial-gradient(closest-side,rgba(91,63,209,0.4),transparent)]" />
                <div className="absolute -bottom-[45%] -right-[15%] aspect-square w-[60%] bg-[radial-gradient(closest-side,rgba(212,175,55,0.14),transparent)]" />
              </div>

              <ol aria-label="How a system is built" className="relative">
                {/* Inputs: engineering + AI assistance */}
                <li className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
                  <div className="approach-block rounded-card border border-gold/40 bg-gradient-to-br from-deep-blue to-indigo p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="inline-flex size-9 items-center justify-center rounded-button bg-gold text-deep-blue">
                        <Wrench className="size-[18px]" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-starlight">{engineering.title}</h3>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">{engineering.role}</p>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {engineering.items.map((item) => (
                        <li key={item} className="rounded-chip bg-white/10 px-2.5 py-1 text-[12px] font-medium text-starlight">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div aria-hidden="true" className="flex items-center justify-center">
                    <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-starlight/80">
                      <Plus className="size-4" />
                    </span>
                  </div>

                  <div className="approach-block rounded-card border border-white/15 bg-white/[0.05] p-5">
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="inline-flex size-9 items-center justify-center rounded-button bg-purple/80 text-starlight">
                        <Sparkles className="size-[18px]" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-starlight">{ai.title}</h3>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-starlight/70">{ai.role}</p>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {ai.items.map((item) => (
                        <li key={item} className="rounded-chip border border-white/15 px-2.5 py-1 text-[12px] text-starlight/85">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Converging connector */}
                <li aria-hidden="true" className="relative mx-auto h-14 w-[70%] max-w-[360px]">
                  <svg viewBox="0 0 360 56" preserveAspectRatio="none" className="absolute inset-0 size-full" focusable="false">
                    <path d="M40 0 C 40 30, 180 26, 180 56" fill="none" stroke="#D4AF37" strokeOpacity="0.6" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    <path d="M320 0 C 320 30, 180 26, 180 56" fill="none" stroke="#9C8BFF" strokeOpacity="0.5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span className="approach-flow absolute inset-y-0 left-1/2 w-0">
                    <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_#D4AF37]" />
                  </span>
                </li>

                {/* Result */}
                <li className="approach-block flex flex-col gap-4 rounded-card border border-white/15 bg-gradient-to-r from-white/[0.08] to-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-[#F1D778] text-deep-blue">
                      <ShieldCheck className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-starlight">{result.title}</h3>
                      <p className="type-small text-starlight/70">{result.body}</p>
                    </div>
                  </div>
                  <p className="inline-flex items-center gap-2 self-start rounded-chip border border-gold/50 bg-gold/15 px-3 py-1.5 text-[12px] font-semibold text-[#FBE9A8] sm:self-auto">
                    <Rocket aria-hidden="true" className="size-3.5" />
                    {result.stage}
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
