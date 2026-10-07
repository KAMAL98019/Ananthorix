import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import Breadcrumbs from "../blocks/Breadcrumbs";
import CtaBand from "../blocks/CtaBand";
import FaqList from "../blocks/FaqList";
import JsonLd from "../blocks/JsonLd";
import ProcessSteps from "../blocks/ProcessSteps";
import RelatedLinks from "../blocks/RelatedLinks";
import Card from "../../ui/Card";
import AgentHero from "./AgentHero";
import DayInLife from "./DayInLife";
import HumanControl from "./HumanControl";
import IntegrationsBlock from "./IntegrationsBlock";
import { hub, pricingApproach, type AgentDef } from "../../../content/agents";
import { startProjectHref } from "../../../lib/leads/context";
import { START_PROJECT } from "../../../content/routes";
import { isLive } from "../../../content/services";
import { breadcrumbJsonLd, SITE_NAME, SITE_URL } from "../../../lib/seo";

// The one reusable AI Agent product page. Section order follows the Phase 4 structure.
export default function AgentPageTemplate({ agent }: { agent: AgentDef }) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "AI Agents", path: "/ai-agents" },
    { name: agent.name, path: `/ai-agents/${agent.slug}` },
  ];
  const relatedServices = agent.relatedServices.filter((link) => isLive(link.href));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={softwareApplicationJsonLd(agent)} />
      <JsonLd data={faqJsonLd(agent.faq)} />

      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* 1. Hero */}
      <AgentHero agent={agent} />

      {/* 2. Problem */}
      <Section tone="surface1" labelledBy={`${agent.slug}-problem`}>
        <Container>
          <SectionHeading id={`${agent.slug}-problem`} eyebrow="The problem" title="Where time and leads get lost." lead={agent.problem} />
        </Container>
      </Section>

      {/* 3. What it does */}
      <Section labelledBy={`${agent.slug}-jobs`}>
        <Container>
          <SectionHeading id={`${agent.slug}-jobs`} eyebrow="What it does" title="The jobs it takes on." />
          <ul className="mt-14 grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-5 lg:grid-cols-12 lg:gap-6">
            {agent.jobs.map((job) => (
              <li key={job} className="col-span-4 md:col-span-4 lg:col-span-4">
                <Card kind="agent" as="div">
                  <p className="type-body font-semibold text-fg-primary">{job}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4. A normal day */}
      <DayInLife agent={agent} />

      {/* Human control, prominent */}
      <HumanControl
        id={`${agent.slug}-control`}
        statement={hub.controlStatement}
        approvalFor={agent.humanControl.approvalFor}
        steps={agent.humanControl.steps}
      />

      {/* 5. Outcomes */}
      <Section tone="starlight" labelledBy={`${agent.slug}-outcomes`}>
        <Container>
          <SectionHeading id={`${agent.slug}-outcomes`} eyebrow="Outcomes" title="What changes for your team." />
          <Grid className="mt-14 gap-y-6">
            {agent.outcomes.map((item) => (
              <div key={item.title} className="col-span-4 md:col-span-4 lg:col-span-3">
                <Card kind="metric" as="article" className="shadow-floating">
                  <h3 className="type-h4 text-fg-primary">{item.title}</h3>
                  <p className="type-small mt-3">{item.body}</p>
                </Card>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 6. Integrations */}
      <IntegrationsBlock labelledBy={`${agent.slug}-integrations`} />

      {/* 7. Ideal for */}
      <Section tone="surface1" labelledBy={`${agent.slug}-ideal`}>
        <Container>
          <SectionHeading id={`${agent.slug}-ideal`} eyebrow="Ideal for" title={agent.idealFor} />
        </Container>
      </Section>

      {/* 8. Setup */}
      <Section labelledBy={`${agent.slug}-setup`}>
        <Container>
          <SectionHeading id={`${agent.slug}-setup`} eyebrow="Setup" title="Four steps, from first connection to improvement." />
          <div className="mt-14">
            <ProcessSteps steps={agent.setupSteps} />
          </div>
        </Container>
      </Section>

      {/* 9. Pricing approach (no prices shown) */}
      <Section tone="surface2" labelledBy={`${agent.slug}-pricing`}>
        <Container>
          <SectionHeading id={`${agent.slug}-pricing`} eyebrow="Pricing" title="Priced for your workflow." lead={pricingApproach} />
        </Container>
      </Section>

      {/* 10. FAQ */}
      <Section labelledBy={`${agent.slug}-faq`}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <SectionHeading id={`${agent.slug}-faq`} eyebrow="FAQ" title={`Questions about the ${agent.name}.`} />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={agent.faq} idPrefix={`${agent.slug}-faq`} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Connected services (live routes only) */}
      {relatedServices.length > 0 && (
        <Section tone="surface1" labelledBy={`${agent.slug}-related`}>
          <Container>
            <SectionHeading id={`${agent.slug}-related`} eyebrow="Related services" title="Often built alongside this agent." />
            <div className="mt-10">
              <RelatedLinks heading="Related services" links={relatedServices} />
            </div>
          </Container>
        </Section>
      )}

      {/* 11. Agent CTA */}
      <CtaBand
        headingId={`${agent.slug}-cta`}
        headline="Tell us which enquiries, records or questions matter most."
        body="Start with a short brief. We will tell you whether this agent is the right fit and how we would set it up."
        primary={{ label: START_PROJECT.label, href: startProjectHref({ need: agent.slug, agent: agent.slug }) }}
        secondary={{ label: "All AI Agents", href: "/ai-agents" }}
      />
    </>
  );
}

function softwareApplicationJsonLd(agent: AgentDef) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: agent.name,
    description: agent.metaDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/ai-agents/${agent.slug}`,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
