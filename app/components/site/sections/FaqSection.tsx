import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import FaqList from "../blocks/FaqList";
import { faqs } from "../../../content/home";

// 15. FAQ. Native details/summary. Answers make no unsupported legal or security claims.
export default function FaqSection() {
  return (
    <Section labelledBy="faq-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-heading" eyebrow="FAQ" title="Questions we hear often." />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs} idPrefix="faq" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
