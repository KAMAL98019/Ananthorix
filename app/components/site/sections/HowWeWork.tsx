import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import ProcessSteps from "../blocks/ProcessSteps";
import { processSteps } from "../../../content/home";

// 8. How We Work: "Path to Infinity"
export default function HowWeWork() {
  return (
    <Section tone="surface2" labelledBy="process-heading">
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="How we work"
          title="A clear path from first conversation to growth."
          lead="Four stages. Each ends with something you can review before the next one starts."
        />
        <div className="mt-14">
          <ProcessSteps steps={processSteps} />
        </div>
      </Container>
    </Section>
  );
}
