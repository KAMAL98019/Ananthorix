import Link from "next/link";
import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import EngagementCard from "../cards/EngagementCard";
import { engagementModels } from "../../../content/home";

// 13. Engagement Models.
export default function EngagementModels() {
  return (
    <Section tone="surface2" labelledBy="engagement-heading">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <SectionHeading id="engagement-heading" eyebrow="Engagement models" title="Four ways to work with us." />
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 type-small font-semibold text-deep-blue hover:text-indigo hover:underline shrink-0"
          >
            Explore Indicative Pricing →
          </Link>
        </div>
        <Grid className="mt-14 gap-y-6">
          {engagementModels.map((model) => (
            <div key={model.title} className="col-span-4 md:col-span-4 lg:col-span-3">
              <EngagementCard title={model.title} body={model.body} bestFor={model.bestFor} />
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
