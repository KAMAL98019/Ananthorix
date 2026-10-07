import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, FileText, MessagesSquare, UserCheck } from "lucide-react";
import Breadcrumbs from "../components/site/blocks/Breadcrumbs";
import CosmicBanner, { CosmicEyebrow, cosmicPrimary, cosmicSecondary } from "../components/site/blocks/CosmicBanner";
import CtaBand from "../components/site/blocks/CtaBand";
import JsonLd from "../components/site/blocks/JsonLd";
import ProcessSteps from "../components/site/blocks/ProcessSteps";
import SectionHeading from "../components/site/blocks/SectionHeading";
import EngagementCard from "../components/site/cards/EngagementCard";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import { differentiators, engagementModels, processSteps } from "../content/home";
import { breadcrumbJsonLd, pageMetadata } from "../lib/seo";

// How we work. Built from the approved process, engagement models and principles. No timelines, prices or
// guarantees: those are agreed per project.
export const metadata: Metadata = pageMetadata({
  title: "How We Work",
  description: "How Anantorix delivers software and AI projects: discover, design, build, launch and grow, with a written plan and regular reviews.",
  path: "/how-we-work",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "How we work", path: "/how-we-work" },
];

// What each stage needs from the client. Keeps the process honest about shared work.
const fromYou = [
  "Time with the people who do the work today, and access to the tools and sample data involved.",
  "Feedback on flows and screens before anything is built.",
  "A short review of each working increment as it is delivered.",
  "Real use and feedback after launch, so improvements follow what people need.",
];

const workingTogether = [
  { icon: FileText, title: "Scope in writing", body: "Scope, plan and ownership are agreed in writing before production work starts." },
  { icon: CalendarCheck, title: "Regular reviews", body: "Work is shown in increments, on a review rhythm agreed at the start." },
  { icon: UserCheck, title: "One clear contact", body: "You always know who to talk to about the project and its decisions." },
  { icon: MessagesSquare, title: "Plain language", body: "Updates explain what changed and why, without jargon." },
];

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      <section aria-labelledby="hww-heading" className="bg-canvas pt-4 pb-6 md:pt-6">
        <Container>
          <CosmicBanner>
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <CosmicEyebrow>How we work</CosmicEyebrow>
                <h1 id="hww-heading" className="type-h1 mt-6 text-starlight">
                  A clear path from first conversation to growth.
                </h1>
                <p className="type-lead mt-6 max-w-2xl text-starlight/75!">
                  Four stages. Each one ends with something you can review before the next one starts, so you always know where your project stands.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href="/start-a-project" className={cosmicPrimary}>
                    Start a Project <span aria-hidden="true">→</span>
                  </Link>
                  <a href="#stages" className={cosmicSecondary}>
                    See the stages
                  </a>
                </div>
              </div>
              <ol className="grid grid-cols-2 gap-3 lg:col-span-5" aria-label="Stages">
                {processSteps.map((step, i) => (
                  <li key={step.title} className="rounded-card border border-white/10 bg-white/5 p-5">
                    <span className="font-mono text-[11px] font-semibold text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-2 text-lg font-semibold text-starlight">{step.title}</p>
                  </li>
                ))}
              </ol>
            </div>
          </CosmicBanner>
        </Container>
      </section>

      {/* Stages */}
      <Section tone="surface2" labelledBy="stages-heading" id="stages">
        <Container>
          <SectionHeading id="stages-heading" eyebrow="The process" title="What happens at each stage." />
          <div className="mt-12">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      {/* Shared work */}
      <Section labelledBy="from-you-heading">
        <Container>
          <SectionHeading id="from-you-heading" eyebrow="Working together" title="What each stage needs from you." lead="Good software comes from the people who use it. These are the moments your input matters most." />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <li key={step.title} className="card-glow rounded-card border border-line bg-canvas p-6 shadow-raised">
                <p className="font-mono text-[12px] font-semibold text-purple">
                  {String(i + 1).padStart(2, "0")} · {step.title}
                </p>
                <p className="type-small mt-3 text-fg-primary">{fromYou[i]}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Ways of working */}
      <Section tone="surface1" labelledBy="ways-heading">
        <Container>
          <SectionHeading id="ways-heading" eyebrow="How we communicate" title="No surprises." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workingTogether.map(({ icon: Icon, title, body }) => (
              <li key={title} className="hover-lift card-glow rounded-card border border-line bg-canvas p-6 shadow-raised">
                <span aria-hidden="true" className="inline-flex size-11 items-center justify-center rounded-button bg-gradient-to-br from-purple to-deep-blue text-starlight">
                  <Icon className="size-5" />
                </span>
                <h3 className="type-h4 mt-5 text-fg-primary">{title}</h3>
                <p className="type-small mt-2 text-fg-secondary">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Engagement models */}
      <Section labelledBy="hww-models-heading">
        <Container>
          <SectionHeading id="hww-models-heading" eyebrow="Engagement models" title="Four ways to work with us." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((m) => (
              <li key={m.title}>
                <EngagementCard title={m.title} body={m.body} bestFor={m.bestFor} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Principles */}
      <Section tone="surface1" labelledBy="hww-principles-heading">
        <Container>
          <SectionHeading id="hww-principles-heading" eyebrow="Principles" title="What guides every decision." />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {differentiators.map((d, i) => (
              <li key={d.title} className="relative rounded-card border border-line bg-canvas p-6 shadow-raised">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-t-card bg-gradient-to-r from-deep-blue via-purple to-gold" />
                <span className="font-mono text-[12px] font-semibold text-fg-secondary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="type-h4 mt-3 text-fg-primary">{d.title}</h3>
                <p className="type-small mt-2 text-fg-secondary">{d.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        headingId="hww-cta-heading"
        headline="Start with a short brief."
        body="Tell us what you need. We will review it and suggest how we would approach it."
        primary={{ label: "Start a Project", href: "/start-a-project" }}
        secondary={{ label: "Security and data", href: "/security-and-data" }}
      />
    </>
  );
}
