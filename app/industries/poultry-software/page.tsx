import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/site/blocks/Breadcrumbs";
import ComparisonTable from "../../components/site/blocks/ComparisonTable";
import CtaBand from "../../components/site/blocks/CtaBand";
import FaqList from "../../components/site/blocks/FaqList";
import JsonLd from "../../components/site/blocks/JsonLd";
import PageHero from "../../components/site/blocks/PageHero";
import ProcessSteps from "../../components/site/blocks/ProcessSteps";
import RelatedLinks from "../../components/site/blocks/RelatedLinks";
import SectionHeading from "../../components/site/blocks/SectionHeading";
import { faqJsonLd } from "../../components/site/agents/AgentPageTemplate";
import Container from "../../components/layout/Container";
import Grid from "../../components/layout/Grid";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import { poultry } from "../../content/poultry";
import { startProjectHref } from "../../lib/leads/context";
import { breadcrumbJsonLd, ORGANIZATION_ID, pageMetadata, SITE_NAME, SITE_URL } from "../../lib/seo";

// Industry page: poultry farm management software and poultry ERP, aimed at Namakkal district.
export const metadata: Metadata = pageMetadata({
  title: poultry.seoTitle,
  description: poultry.metaDescription,
  path: poultry.path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "ERP & Business Software", path: "/services/erp-software-development" },
  { name: "Poultry farm software", path: poultry.path },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: poultry.metaTitle,
  description: poultry.metaDescription,
  serviceType: "Poultry farm management software development",
  url: `${SITE_URL}${poultry.path}`,
  provider: { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
  areaServed: [
    { "@type": "City", name: "Namakkal" },
    { "@type": "City", name: "Salem" },
    { "@type": "City", name: "Erode" },
    { "@type": "State", name: "Tamil Nadu" },
    { "@type": "Country", name: "India" },
  ],
};

export default function PoultrySoftwarePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd(poultry.faq)} />

      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      <PageHero
        eyebrow={poultry.eyebrow}
        headline={poultry.h1}
        lead={poultry.lead}
        primary={{ label: "Start a Project", href: startProjectHref({ need: "erp" }) }}
        secondary={{ label: "See ERP pricing", href: "/pricing#crm-erp-development" }}
      />

      {/* Problems */}
      <Section tone="surface1" labelledBy="poultry-problems">
        <Container>
          <SectionHeading id="poultry-problems" eyebrow="The problem" title="Where records, feed and money get lost." />
          <Grid className="mt-14 gap-y-6">
            {poultry.problems.map((item) => (
              <div key={item.problem} className="col-span-4 md:col-span-8 lg:col-span-4">
                <Card kind="service" as="article">
                  <h3 className="type-h4 text-fg-primary">{item.problem}</h3>
                  <p className="type-small mt-3">{item.answer}</p>
                </Card>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Modules */}
      <Section labelledBy="poultry-modules">
        <Container>
          <SectionHeading
            id="poultry-modules"
            eyebrow="What we build"
            title="Poultry ERP modules, built only where you need them."
            lead="Start with the module that saves the most time, usually daily shed records or sales and billing, and add the rest as you grow."
          />
          <Grid className="mt-14 gap-y-6">
            {poultry.modules.map((item) => (
              <div key={item.title} className="col-span-4 md:col-span-4 lg:col-span-3">
                <Card kind="service" as="article">
                  <h3 className="type-h4 text-fg-primary">{item.title}</h3>
                  <p className="type-small mt-3">{item.body}</p>
                </Card>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Metrics */}
      <Section tone="starlight" labelledBy="poultry-metrics">
        <Container>
          <SectionHeading
            id="poultry-metrics"
            eyebrow="The numbers"
            title="The figures the software works out for you."
            lead="Each figure comes from the daily entries your team already makes, so nobody has to calculate it by hand."
          />
          <Grid className="mt-14 gap-y-6">
            {poultry.metrics.map((item) => (
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

      {/* Custom vs ready-made */}
      <Section tone="surface2" labelledBy="poultry-compare">
        <Container>
          <SectionHeading id="poultry-compare" eyebrow="Choosing" title={poultry.explainer.title} lead={poultry.explainer.intro} />
          <div className="mt-12">
            <ComparisonTable
              caption={`${poultry.explainer.labels[0]} compared with ${poultry.explainer.labels[1]}`}
              labels={poultry.explainer.labels}
              rows={poultry.explainer.rows}
            />
          </div>
          <p className="type-small mt-6 text-fg-secondary">
            Prices for custom builds are on our{" "}
            <Link href="/pricing#crm-erp-development" className="font-semibold text-deep-blue hover:underline">
              pricing page
            </Link>
            . All prices are indicative and exclude GST.
          </p>
        </Container>
      </Section>

      {/* Process */}
      <Section labelledBy="poultry-process">
        <Container>
          <SectionHeading
            id="poultry-process"
            eyebrow="How we deliver"
            title="From your registers to a working system."
            lead="Four stages. Each ends with something you can check before the next one starts."
          />
          <div className="mt-14">
            <ProcessSteps steps={poultry.steps} />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="surface1" labelledBy="poultry-faq">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <SectionHeading id="poultry-faq" eyebrow="FAQ" title="Questions about poultry farm software." />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={poultry.faq} idPrefix="poultry-faq" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Related */}
      <Section labelledBy="poultry-related">
        <Container>
          <SectionHeading id="poultry-related" eyebrow="Related" title="Services behind this software." />
          <div className="mt-10">
            <RelatedLinks heading="Related services" links={poultry.related} />
          </div>
        </Container>
      </Section>

      <CtaBand
        headingId="poultry-cta"
        headline="Tell us how your farm keeps records today."
        body="Send a short brief or call us. We will tell you which modules would help first and what they would cost."
        primary={{ label: "Start a Project", href: startProjectHref({ need: "erp" }) }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
