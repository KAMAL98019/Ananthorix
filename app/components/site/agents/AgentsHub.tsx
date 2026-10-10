import Link from "next/link";
import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import Breadcrumbs from "../blocks/Breadcrumbs";
import CtaBand from "../blocks/CtaBand";
import FaqList from "../blocks/FaqList";
import JsonLd from "../blocks/JsonLd";
import ProcessSteps from "../blocks/ProcessSteps";
import HumanControl from "./HumanControl";
import CosmicBanner, { CosmicEyebrow, cosmicPrimary, cosmicSecondary } from "../blocks/CosmicBanner";
import Tilt3D from "../../motion/Tilt3D";
import DecoText from "../../ui/DecoText";
import Card from "../../ui/Card";
import { agents, hub, setupSteps, type AgentDef } from "../../../content/agents";
import { START_PROJECT } from "../../../content/routes";
import { breadcrumbJsonLd } from "../../../lib/seo";
import { faqJsonLd } from "./AgentPageTemplate";

// AI Agents hub: plain-language explanation, the three products, deployment, human control, FAQ and CTA.
export default function AgentsHub() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "AI Agents", path: "/ai-agents" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(hub.faq)} />

      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      <section aria-labelledby="agents-hub-heading" className="bg-canvas pt-4 pb-6 md:pt-6">
        <Container>
          <CosmicBanner>
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <CosmicEyebrow>AI Agents</CosmicEyebrow>
                <h1 id="agents-hub-heading" className="type-h1 mt-6 text-starlight">
                  {hub.headline}
                </h1>
                <p className="type-lead mt-6 max-w-2xl text-starlight/75!">{hub.lead}</p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href={START_PROJECT.href} className={cosmicPrimary}>
                    {START_PROJECT.label} <span aria-hidden="true">→</span>
                  </Link>
                  <a href="#agent-products" className={cosmicSecondary}>
                    Explore the agents
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6">
                <Tilt3D className="scene-stage mx-auto w-full max-w-[520px]" max={8}>
                  <AgentStack />
                </Tilt3D>
              </div>
            </div>
          </CosmicBanner>
        </Container>
      </section>

      {/* What an agent does */}
      <Section tone="surface1" labelledBy="agents-verbs-heading">
        <Container>
          <SectionHeading id="agents-verbs-heading" eyebrow="What an agent does" title="Understands. Acts. Reports." />
          <Grid className="mt-14 gap-y-6">
            {hub.verbs.map((item) => (
              <div key={item.title} className="col-span-4 md:col-span-4 lg:col-span-4">
                <Card kind="service" as="article">
                  <h3 className="type-h3 text-fg-primary">{item.title}</h3>
                  <p className="type-body mt-4 text-fg-secondary">{item.body}</p>
                </Card>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Products */}
      <Section id="agent-products" labelledBy="agent-products-heading">
        <Container>
          <SectionHeading id="agent-products-heading" eyebrow="The agents" title="Three agents, each built around one job." />
          <Grid className="mt-14 gap-y-6">
            {agents.map((agent) => (
              <div key={agent.slug} className="col-span-4 md:col-span-8 lg:col-span-4">
                <AgentProductCard agent={agent} />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Deployment */}
      <Section tone="surface2" labelledBy="agents-setup-heading">
        <Container>
          <SectionHeading id="agents-setup-heading" eyebrow="How it is deployed" title="Connect, configure, launch, improve." />
          <div className="mt-14">
            <ProcessSteps steps={setupSteps} />
          </div>
        </Container>
      </Section>

      {/* Human control */}
      <HumanControl
        id="agents-control"
        statement={hub.controlStatement}
        approvalFor={["Pricing, discounts and commitments", "Changes to key customer or deal records", "Payments, stock changes and legal or financial documents"]}
        steps={["Reads the information it has been given access to", "Prepares the reply, record change or document", "Requests approval where the rules require it", "Acts only within the rules you set", "Records the outcome for your team"]}
      />

      {/* Custom agents note (later addition) */}
      <Section labelledBy="agents-custom-heading">
        <Container>
          <SectionHeading id="agents-custom-heading" eyebrow="Beyond these three" title="Custom agents." lead={hub.customNote} />
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="surface1" labelledBy="agents-faq-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <SectionHeading id="agents-faq-heading" eyebrow="FAQ" title="Questions about AI agents." />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={hub.faq} idPrefix="agents-faq" />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        headingId="agents-cta"
        headline="Tell us which part of your work should run better."
        body="Start with a short brief. We will tell you which agent fits, and how we would set it up."
        primary={{ label: START_PROJECT.label, href: START_PROJECT.href }}
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}

function AgentProductCard({ agent }: { agent: AgentDef }) {
  return (
    <Card kind="agent" as="article">
      <p className="type-eyebrow">{agent.eyebrow}</p>
      <h3 className="type-h3 mt-3 text-fg-primary">{agent.name}</h3>
      <p className="type-body mt-4 font-semibold text-indigo">{agent.outcomeLine}</p>
      <p className="type-small mt-3">{agent.explanation}</p>
      <p className="type-small mt-5 font-semibold text-fg-primary">Key jobs</p>
      <ul className="type-small mt-2 list-disc space-y-1 pl-5 text-fg-secondary">
        {agent.jobs.slice(0, 3).map((job) => (
          <li key={job}>{job}</li>
        ))}
      </ul>
      <p className="type-small mt-5 font-semibold text-fg-primary">Ideal for</p>
      <p className="type-small text-fg-secondary">{agent.idealFor}</p>
      <Link
        href={`/ai-agents/${agent.slug}`}
        className="mt-6 inline-flex min-h-11 items-center font-semibold text-deep-blue underline underline-offset-4 hover:text-indigo"
      >
        Explore the {agent.name}
      </Link>
    </Card>
  );
}

// Hero scene: the three agents as glass cards floating at different depths, each showing what it is doing.
// Decorative; the agents are described in full further down the page.
const AGENT_STATUS: Record<string, { status: string; tone: string }> = {
  "sales-ai-agent": { status: "Replying to a new enquiry", tone: "bg-purple" },
  "crm-ai-agent": { status: "Updating today's priorities", tone: "bg-gold" },
  "business-ai-agent": { status: "Preparing the weekly report", tone: "bg-[#8EA2FF]" },
};

function AgentStack() {
  const layout = [
    { left: "0%", top: "6%", z: 20, bob: "scene-bob" },
    { left: "22%", top: "36%", z: 60, bob: "scene-bob-late" },
    { left: "8%", top: "66%", z: 30, bob: "scene-bob" },
  ];
  return (
    <div aria-hidden="true" className="relative aspect-square w-full [transform-style:preserve-3d]">
      <div className="scene-pulse absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgba(91,63,209,0.4),transparent)]" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" focusable="false">
        <path d="M30 22 C 70 22, 80 40, 62 50 S 30 72, 52 82" fill="none" stroke="#9C8BFF" strokeOpacity="0.4" strokeWidth="0.4" strokeDasharray="1.5 1.5" className="scene-dash" />
      </svg>
      {agents.map((agent, index) => {
        const pos = layout[index % layout.length];
        const meta = AGENT_STATUS[agent.slug] ?? { status: agent.outcomeLine, tone: "bg-purple" };
        return (
          <div key={agent.slug} className="absolute w-[72%]" style={{ left: pos.left, top: pos.top, transform: `translateZ(${pos.z}px)` }}>
            <div className={`${pos.bob} rounded-card border border-white/15 bg-white/[0.07] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)]`}>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-purple to-indigo font-mono text-[11px] font-semibold text-starlight">
                  {agent.name.split(" ")[0].slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-starlight">
                    <DecoText text={agent.name} />
                  </p>
                  <p className="flex items-center gap-1.5 text-[12px] text-starlight/70">
                    <span className={`size-1.5 rounded-full ${meta.tone} shadow-[0_0_8px_currentColor]`} />
                    <DecoText text={meta.status} />
                  </p>
                </div>
              </div>
              <div className="typing mt-3 flex items-center gap-1.5 rounded-input bg-white/[0.06] px-3 py-2">
                <span className="size-1.5 rounded-full bg-starlight/70" />
                <span className="size-1.5 rounded-full bg-starlight/70" />
                <span className="size-1.5 rounded-full bg-starlight/70" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
