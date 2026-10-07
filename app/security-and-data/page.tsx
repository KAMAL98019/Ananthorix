import type { Metadata } from "next";
import Link from "next/link";
import { Eye, FileCheck2, KeyRound, Lock, ShieldCheck, UserCheck } from "lucide-react";
import Breadcrumbs from "../components/site/blocks/Breadcrumbs";
import CosmicBanner, { CosmicEyebrow, cosmicPrimary, cosmicSecondary } from "../components/site/blocks/CosmicBanner";
import CtaBand from "../components/site/blocks/CtaBand";
import JsonLd from "../components/site/blocks/JsonLd";
import SectionHeading from "../components/site/blocks/SectionHeading";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import { breadcrumbJsonLd, pageMetadata } from "../lib/seo";

// Security and data. Describes practices Anantorix follows when designing systems, in plain language.
// No certifications, audits or compliance claims: specific requirements are agreed in writing per project.
export const metadata: Metadata = pageMetadata({
  title: "Security and Data",
  description: "How Anantorix handles data, access and AI in the systems it builds: agreed data boundaries, least access, human approval and clear ownership.",
  path: "/security-and-data",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Security and data", path: "/security-and-data" },
];

const practices = [
  { icon: ShieldCheck, title: "Data boundaries first", body: "What data a system may use, and what it may not, is agreed before anything is built." },
  { icon: KeyRound, title: "Least access", body: "Each system and person gets only the access their job needs, through roles you control." },
  { icon: UserCheck, title: "People approve what matters", body: "AI can prepare and recommend. Business-impacting actions wait for a named person to approve." },
  { icon: Lock, title: "Secrets stay on the server", body: "Credentials and keys are kept in server configuration, never in code shipped to browsers." },
  { icon: Eye, title: "A record of every action", body: "Agents record what they did and what needs a decision, so your team can review it." },
  { icon: FileCheck2, title: "Ownership in writing", body: "Ownership of code and deliverables is set out in writing before work begins." },
];

const aiSteps = [
  "Reads only the information it has been given access to.",
  "Prepares the reply, record change or document.",
  "Requests approval where your rules require it.",
  "Acts only within the rules you set.",
  "Records the outcome for your team.",
];

export default function SecurityAndDataPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      <section aria-labelledby="sec-heading" className="bg-canvas pt-4 pb-6 md:pt-6">
        <Container>
          <CosmicBanner>
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <CosmicEyebrow>Security and data</CosmicEyebrow>
                <h1 id="sec-heading" className="type-h1 mt-6 text-starlight">
                  Your data, your rules.
                </h1>
                <p className="type-lead mt-6 max-w-2xl text-starlight/75!">
                  How we handle data, access and AI in the systems we build. Clear boundaries, people in control, and nothing hidden.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href="/start-a-project" className={cosmicPrimary}>
                    Start a Project <span aria-hidden="true">→</span>
                  </Link>
                  <Link href="/privacy" className={cosmicSecondary}>
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div aria-hidden="true" className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center lg:col-span-5">
                <div className="scene-pulse absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(91,63,209,0.45),transparent)]" />
                <div className="absolute inset-[6%] rounded-full border border-dashed border-white/15" />
                <div className="scene-spin-slow absolute inset-[18%] rounded-full border border-gold/30">
                  <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_14px_#D4AF37]" />
                </div>
                <div className="relative flex size-[38%] items-center justify-center rounded-[28%] bg-gradient-to-br from-purple to-deep-blue shadow-[0_20px_60px_rgba(91,63,209,0.5)]">
                  <ShieldCheck className="size-1/2 text-starlight" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </CosmicBanner>
        </Container>
      </section>

      <Section tone="surface1" labelledBy="practices-heading">
        <Container>
          <SectionHeading id="practices-heading" eyebrow="Our practices" title="How we protect the systems we build." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map(({ icon: Icon, title, body }) => (
              <li key={title} className="hover-lift card-glow rounded-card border border-line bg-canvas p-6 shadow-raised md:p-7">
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

      <Section labelledBy="ai-data-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionHeading id="ai-data-heading" eyebrow="AI and your data" title="How an AI agent handles an action." lead="Every agent we build follows the same path. Your team stays in charge of business-impacting decisions." />
            </div>
            <ol className="space-y-3 lg:col-span-7">
              {aiSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-4 rounded-card border border-line bg-canvas p-4 shadow-raised md:p-5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-deep-blue font-mono text-[13px] font-semibold text-gold">{i + 1}</span>
                  <span className="type-body text-fg-primary">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="surface1" labelledBy="site-data-heading">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-panel border border-line bg-canvas p-8 shadow-raised">
              <h2 id="site-data-heading" className="type-h3 text-fg-primary">
                On this website
              </h2>
              <p className="type-body mt-4 text-fg-secondary">
                A project brief is sent by email to our inbox, checked on our server first and limited against repeated submissions. Email credentials never
                reach your browser. Full details are in our <Link href="/privacy" className="font-semibold text-deep-blue underline underline-offset-4">Privacy Policy</Link>.
              </p>
            </div>
            <div className="rounded-panel border border-line bg-canvas p-8 shadow-raised">
              <h2 className="type-h3 text-fg-primary">Your project&apos;s requirements</h2>
              <p className="type-body mt-4 text-fg-secondary">
                If your business has specific security or regulatory requirements, tell us during discovery. We agree how they will be met, in writing, before
                the build begins.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        headingId="sec-cta-heading"
        headline="Have a question about your data?"
        body="Ask us before you start. We will explain how your system would handle it."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "How we work", href: "/how-we-work" }}
      />
    </>
  );
}
