import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import CapabilityLink from "../cards/CapabilityLink";
import { capabilities } from "../../../content/home";

// 6. Capabilities Universe. Each capability links to its confirmed service route.
// Ten capabilities sit in an even 5 x 2 grid on large screens, so no row is left half empty.
export default function CapabilitiesUniverse() {
  return (
    <Section tone="canvas" labelledBy="capabilities-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(91,63,209,0.08),transparent)]"
      />
      <Container className="relative">
        <SectionHeading
          id="capabilities-heading"
          eyebrow="Capabilities"
          title="Capabilities built around how your business runs."
          lead="From AI and automation to the software your teams use every day."
        />
        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {capabilities.map((item) => (
            <li key={item.href}>
              <CapabilityLink label={item.label} summary={item.summary} href={item.href} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
