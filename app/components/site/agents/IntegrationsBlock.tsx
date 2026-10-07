import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import { integrationCategories, integrationNote } from "../../../content/agents";

// Integration categories only. No third-party logos, and no claim that a specific integration exists.
export default function IntegrationsBlock({ labelledBy = "integrations-heading" }: { labelledBy?: string }) {
  return (
    <Section labelledBy={labelledBy}>
      <Container>
        <SectionHeading id={labelledBy} eyebrow="Integrations" title="Works with the tools you already use." lead={integrationNote} />
        <ul className="mt-10 flex flex-wrap gap-3" aria-label="Integration categories">
          {integrationCategories.map((category) => (
            <li key={category} className="rounded-chip border border-line-strong bg-canvas px-5 py-3 text-small font-semibold text-deep-blue">
              {category}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
