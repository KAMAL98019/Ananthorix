import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import OutcomeCard from "../cards/OutcomeCard";
import { outcomes } from "../../../content/home";

// 4. Sell More / Run Smarter / Decide Faster
export default function OutcomePillars() {
  return (
    <Section labelledBy="outcomes-heading">
      <Container>
        <SectionHeading id="outcomes-heading" eyebrow="Outcomes" title="Sell more. Run smarter. Decide faster." />
        <Grid className="mt-14 gap-y-6">
          {outcomes.map((item) => (
            <div key={item.title} className="col-span-4 md:col-span-4 lg:col-span-4">
              <OutcomeCard title={item.title} body={item.body} links={item.links} />
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
