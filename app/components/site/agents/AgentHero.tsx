import Container from "../../layout/Container";
import Button from "../../ui/Button";
import Eyebrow from "../../ui/Eyebrow";
import AgentMockup from "./AgentMockup";
import Magnetic from "../../motion/Magnetic";
import Parallax from "../../motion/Parallax";
import PlayWhenVisible from "../../motion/PlayWhenVisible";
import { startProjectHref } from "../../../lib/leads/context";
import { START_PROJECT } from "../../../content/routes";
import type { AgentDef } from "../../../content/agents";

// Agent hero: eyebrow, H1, lead, CTAs, and a product-style workspace.
// The workspace plays a short approval sequence only while it is on screen. All content is readable without motion.
export default function AgentHero({ agent }: { agent: AgentDef }) {
  return (
    <section aria-labelledby="agent-hero-heading" className="relative overflow-hidden bg-canvas pt-8 pb-20 md:pt-12 md:pb-24 lg:pt-16 lg:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgb(91_63_209/0.08),transparent_70%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <Eyebrow>{agent.eyebrow}</Eyebrow>
            <h1 id="agent-hero-heading" className="type-h1 mt-5 text-fg-primary">
              {agent.headline}
            </h1>
            <p className="type-lead mt-6 max-w-2xl">{agent.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <Button variant="primary" href={startProjectHref({ need: agent.slug, agent: agent.slug })}>
                  {START_PROJECT.label}
                </Button>
              </Magnetic>
              <Button variant="secondary" href="/ai-agents">
                All AI Agents
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Parallax speed={0.1}>
              <AgentWorkspace agent={agent} />
            </Parallax>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Product-style workspace. The transcript is illustrative and labelled as such.
// The approval cards and the typing indicator animate only while visible and only when motion is allowed.
export function AgentWorkspace({ agent }: { agent: AgentDef }) {
  return (
    <PlayWhenVisible
      label={`Illustrative example of the ${agent.name} workspace`}
      className="agent-stage rounded-panel border border-line bg-surface-1 p-4 shadow-raised md:p-6"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <p className="font-semibold text-fg-primary">{agent.name}</p>
        <p className="rounded-chip bg-canvas px-3 py-1 text-small font-medium text-deep-blue shadow-raised">Human approval on</p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="md:col-span-3">
          <AgentMockup title="Conversation" transcript={agent.example.transcript.slice(0, 3)} />
          <div className="typing mt-3 flex items-center gap-1.5 px-2" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-fg-secondary" />
            <span className="size-1.5 rounded-full bg-fg-secondary" />
            <span className="size-1.5 rounded-full bg-fg-secondary" />
          </div>
        </div>
        <div className="space-y-4 md:col-span-2">
          <div className="agent-appear rounded-card border border-line bg-canvas p-4 shadow-raised" style={{ "--agent-delay": "400ms" } as React.CSSProperties}>
            <p className="type-eyebrow text-fg-secondary">Prepared</p>
            <p className="type-small mt-2 text-fg-primary">{agent.humanControl.steps[1]}</p>
          </div>
          <div className="agent-appear rounded-card border border-dashed border-gold bg-canvas p-4" style={{ "--agent-delay": "900ms" } as React.CSSProperties}>
            <p className="type-eyebrow text-fg-secondary">Needs your approval</p>
            <p className="type-small mt-2 text-fg-primary">{agent.humanControl.approvalFor[0]}</p>
          </div>
        </div>
      </div>
      <p className="mt-4 font-mono text-[11px] text-fg-secondary">ILLUSTRATIVE EXAMPLE, NOT CUSTOMER DATA</p>
    </PlayWhenVisible>
  );
}
