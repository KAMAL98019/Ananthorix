import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import Card from "../../ui/Card";
import type { AgentDef } from "../../../content/agents";

// Static sequence showing one normal business day. Scroll-friendly and motion-free.
export default function DayInLife({ agent }: { agent: AgentDef }) {
  const id = `${agent.slug}-day`;
  return (
    <Section tone="surface1" labelledBy={id}>
      <Container>
        <SectionHeading id={id} eyebrow="A normal day" title="How the agent works through a business day." />
        <p className="mt-6 inline-flex rounded-tag bg-gold/20 px-2 py-1 font-mono text-[12px] font-semibold text-fg-primary">
          ILLUSTRATIVE EXAMPLE
        </p>
        <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agent.dayInLife.map((step, index) => (
            <li key={step.title}>
              <Card kind="service" as="div">
                <p className="font-mono text-[12px] text-purple">STEP {index + 1}</p>
                <h3 className="type-h4 mt-3 text-fg-primary">{step.title}</h3>
                <p className="type-small mt-3">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
