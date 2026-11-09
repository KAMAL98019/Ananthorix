import { FileText } from "lucide-react";
import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import Card from "../../ui/Card";
import { COMMERCIAL_TERMS } from "../../../content/pricing";

export default function CommercialTermsSection() {
  return (
    <Section id="terms" tone="surface1" labelledBy="commercial-terms-heading" className="scroll-mt-20">
      <Container>
        <SectionHeading
          id="commercial-terms-heading"
          eyebrow="Clear & Transparent"
          title="Commercial Terms & Engagement Policy"
          lead="We believe in complete transparency from the first conversation. These standard terms govern our project delivery, billing milestones, and scope boundaries."
        />

        <Grid className="mt-12 gap-y-6">
          {COMMERCIAL_TERMS.map((term, index) => (
            <div key={term.title} className="col-span-4 md:col-span-4 lg:col-span-4">
              <Card kind="pricing" as="article" className="h-full bg-canvas border-line">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-7 items-center justify-center rounded-full bg-deep-blue text-gold text-xs font-bold">
                    {index + 1}
                  </div>
                  <h3 className="type-h4 text-fg-primary">{term.title}</h3>
                </div>
                <p className="type-small text-fg-secondary leading-relaxed">{term.description}</p>
              </Card>
            </div>
          ))}
        </Grid>

        <div className="mt-10 rounded-card border border-line bg-canvas p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-button bg-gold/15 text-gold mt-1">
              <FileText className="size-5" />
            </div>
            <div>
              <h4 className="type-small font-semibold text-fg-primary">Need an Enterprise NDA or Custom SOW?</h4>
              <p className="type-small mt-1 text-fg-secondary">
                For corporate projects and multi-phase software implementations, we provide customized Statements of Work (SOW) and bilateral non-disclosure agreements before commencing architecture review.
              </p>
            </div>
          </div>
          <a
            href="#quote-form"
            className="inline-flex min-h-11 items-center justify-center rounded-button bg-deep-blue px-5 text-small font-semibold text-canvas hover:bg-indigo transition-colors shrink-0"
          >
            Request Enterprise Proposal
          </a>
        </div>
      </Container>
    </Section>
  );
}
