import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import EngagementCard from "../cards/EngagementCard";
import { engagementModels } from "../../../content/home";

// 13. Engagement Models. No pricing is shown, because pricing is pending.
export default function EngagementModels() {
  return (
    <Section tone="surface2" labelledBy="engagement-heading">
      <Container>
        <SectionHeading id="engagement-heading" eyebrow="Engagement models" title="Four ways to work with us." />
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
