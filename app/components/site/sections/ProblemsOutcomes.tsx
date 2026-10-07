import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import ProblemCard from "../cards/ProblemCard";
import { manifesto, problems } from "../../../content/home";

// 3. Problems → Outcomes. Customer-language problems, each with an Anantorix answer and a route.
export default function ProblemsOutcomes() {
  return (
    <Section tone="surface1" labelledBy="problems-heading">
      <Container>
        <SectionHeading
          id="problems-heading"
          eyebrow="Where growth gets stuck"
          title="The problems we solve, in your words."
          lead={manifesto}
        />
        <Grid className="mt-14 gap-y-6">
          {problems.map((item) => (
            <div key={item.problem} className="col-span-4 md:col-span-4 lg:col-span-4">
              <ProblemCard
                problem={item.problem}
                answer={item.answer}
                href={item.href}
                linkLabel={item.linkLabel}
              />
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
