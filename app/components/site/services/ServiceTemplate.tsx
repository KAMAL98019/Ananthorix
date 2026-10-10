import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import Breadcrumbs from "../blocks/Breadcrumbs";
import CtaBand from "../blocks/CtaBand";
import FaqList from "../blocks/FaqList";
import JsonLd from "../blocks/JsonLd";
import ProcessSteps, { type ProcessStep } from "../blocks/ProcessSteps";
import Card from "../../ui/Card";
import RelatedLinks from "../blocks/RelatedLinks";
import ServiceHero from "./ServiceHero";
import { ProblemsSection, WhatWeBuildSection, OutcomesSection, UseCasesSection } from "./ServiceSections";
import UniqueSection from "./UniqueSection";
import { faqFor, isLive, services, type ServiceDef } from "../../../content/services";
import { startProjectHref } from "../../../lib/leads/context";
import { breadcrumbJsonLd, ORGANIZATION_ID, SITE_NAME, SITE_URL } from "../../../lib/seo";

// The one reusable service page. Every confirmed service route renders through this template.
// Section order follows the V2 specification. Content comes only from the service record.

const stageSummaries = [
  "We learn how the business works today, where value is lost and what success looks like.",
  "We design flows, architecture and scope before anything is built.",
  "We build in tested increments and review each one with you.",
  "We deploy, hand over and improve based on real use.",
];

export default function ServiceTemplate({ service }: { service: ServiceDef }) {
  const faqs = faqFor(service);
  const steps: ProcessStep[] = [
    { title: "Discover", summary: stageSummaries[0], deliverables: service.delivery.discover },
    { title: "Design", summary: stageSummaries[1], deliverables: service.delivery.design },
    { title: "Build", summary: stageSummaries[2], deliverables: service.delivery.build },
    { title: "Launch & Grow", summary: stageSummaries[3], deliverables: service.delivery.launch },
  ];
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.metaTitle, path: `/services/${service.slug}` },
  ];
  const related = service.related.filter((slug) => isLive(`/services/${slug}`));
  const relatedLinks = related.map((slug) => {
    const s = services.find((x) => x.slug === slug);
    return { label: s?.metaTitle ?? slug, href: `/services/${slug}` };
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(faqs)} />

      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* 1. Hero */}
      <ServiceHero service={service} />

      {/* 2. Problems we solve */}
      <ProblemsSection service={service} />

      {/* 3. What we build */}
      <WhatWeBuildSection service={service} />

      {/* 4. Outcomes */}
      <OutcomesSection service={service} />

      {/* 5. Use cases */}
      <UseCasesSection service={service} />

      {/* 6. Related projects: hidden until approved projects exist. See RelatedProjects. */}
      <RelatedProjects />

      {/* Service-specific section (in-depth) */}
      <UniqueSection service={service} />

      {/* 7. How we deliver */}
      <Section labelledBy={`${service.slug}-delivery`}>
        <Container>
          <SectionHeading
            id={`${service.slug}-delivery`}
            eyebrow="How we deliver"
            title="A clear path from first conversation to growth."
            lead="Four stages. Each ends with something you can review before the next one starts."
          />
          <div className="mt-14">
            <ProcessSteps steps={steps} />
          </div>
        </Container>
      </Section>

      {/* 8. Why Anantorix */}
      <WhySection service={service} />

      {/* 9. Related capabilities (live routes only) */}
      <RelatedCapabilities
        service={service}
        links={[...relatedLinks, ...(service.agentLinks ?? []).filter((link) => isLive(link.href))]}
      />

      {/* 10. FAQ */}
      <Section tone="surface1" labelledBy={`${service.slug}-faq`}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <SectionHeading id={`${service.slug}-faq`} eyebrow="FAQ" title={`Questions about ${service.metaTitle}.`} />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={faqs} idPrefix={`${service.slug}-faq`} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 11. Final CTA */}
      <CtaBand
        headingId={`${service.slug}-cta`}
        headline="Tell us what your business needs."
        body="Start with a short brief. We will tell you what is possible and how we would approach it."
        primary={{ label: "Start a Project", href: startProjectHref({ service: service.slug }) }}
        secondary={{ label: "See all services", href: "/services" }}
      />
    </>
  );
}

function WhySection({ service }: { service: ServiceDef }) {
  return (
    <Section tone="surface2" labelledBy={`${service.slug}-why`}>
      <Container>
        <SectionHeading
          id={`${service.slug}-why`}
          eyebrow="Why Anantorix"
          title="Why work with us on this."
          lead="Anantorix builds intelligent digital systems for modern businesses."
        />
        <Grid className="mt-14 gap-y-6">
          {service.differentiators.map((item) => (
            <div key={item.title} className="col-span-4 md:col-span-4 lg:col-span-4">
              <Card kind="service" as="article">
                <h3 className="type-h4 text-fg-primary">{item.title}</h3>
                <p className="type-small mt-3">{item.body}</p>
              </Card>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

// Renders nothing until approved projects exist. Never shows empty cards or invented clients.
function RelatedProjects() {
  const approvedProjects: { title: string }[] = [];
  if (approvedProjects.length === 0) return null;
  return (
    <Section labelledBy="related-projects-heading">
      <Container>
        <SectionHeading id="related-projects-heading" eyebrow="Related projects" title="Related work." />
      </Container>
    </Section>
  );
}

function RelatedCapabilities({
  service,
  links,
}: {
  service: ServiceDef;
  links: { label: string; href: string }[];
}) {
  if (links.length === 0) return null;
  return (
    <Section labelledBy={`${service.slug}-related`}>
      <Container>
        <SectionHeading id={`${service.slug}-related`} eyebrow="Related capabilities" title="Often combined with this service." />
        <div className="mt-10">
          <RelatedLinks heading="Related services" links={links} />
        </div>
      </Container>
    </Section>
  );
}

function serviceJsonLd(service: ServiceDef) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.metaTitle,
    description: service.metaDescription,
    serviceType: service.metaTitle,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
    areaServed: ["India"],
  };
}

function faqJsonLd(faqs: { q: string; a: string }[]) {
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
