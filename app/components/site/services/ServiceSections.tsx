import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import Card from "../../ui/Card";
import type { ServiceDef } from "../../../content/services";

// Problems, offerings, outcomes and use cases for the service template.
// Each exported component takes its data from the service record and renders nothing if its list is empty.

export function ProblemsSection({ service }: { service: ServiceDef }) {
  return (
    <Section tone="surface1" labelledBy={`${service.slug}-problems`}>
      <Container>
        <SectionHeading id={`${service.slug}-problems`} eyebrow="Problems we solve" title="The problems behind the search." />
        <Grid className="mt-14 gap-y-6">
          {service.problems.map((item) => (
            <div key={item.problem} className="col-span-4 md:col-span-4 lg:col-span-4">
              <Card kind="service" as="article">
                <h3 className="type-h4 text-fg-primary">{item.problem}</h3>
                <p className="type-small mt-3">{item.answer}</p>
              </Card>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export function WhatWeBuildSection({ service }: { service: ServiceDef }) {
  return (
    <Section labelledBy={`${service.slug}-build`}>
      <Container>
        <SectionHeading id={`${service.slug}-build`} eyebrow="What we build" title="What we build." />
        <Grid className="mt-14 gap-y-6">
          {service.offerings.map((item) => (
            <div key={item.name} className="col-span-4 md:col-span-4 lg:col-span-4">
              <Card kind="service" as="article">
                <h3 className="type-h4 text-fg-primary">{item.name}</h3>
                <p className="type-small mt-3">{item.summary}</p>
              </Card>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export function OutcomesSection({ service }: { service: ServiceDef }) {
  return (
    <Section tone="starlight" labelledBy={`${service.slug}-outcomes`}>
      <Container>
        <SectionHeading id={`${service.slug}-outcomes`} eyebrow="Outcomes" title="What changes when it works." />
        <Grid className="mt-14 gap-y-6">
          {service.outcomes.map((item) => (
            <div key={item.title} className="col-span-4 md:col-span-4 lg:col-span-4">
              <Card kind="metric" as="article" className="shadow-floating">
                <h3 className="type-h3 text-fg-primary">{item.title}</h3>
                <p className="type-body mt-4 text-fg-secondary">{item.body}</p>
              </Card>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export function UseCasesSection({ service }: { service: ServiceDef }) {
  return (
    <Section labelledBy={`${service.slug}-usecases`}>
      <Container>
        <SectionHeading id={`${service.slug}-usecases`} eyebrow="Use cases" title="Where businesses start." />
        <ul className="mt-14 grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-5 lg:grid-cols-12 lg:gap-6">
          {service.useCases.map((item) => (
            <li key={item.title} className="col-span-4 md:col-span-4 lg:col-span-3">
              <Card kind="service" as="div">
                <h3 className="type-h4 text-fg-primary">{item.title}</h3>
                <p className="type-small mt-3">{item.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
