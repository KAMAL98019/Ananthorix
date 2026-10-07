import Container from "../../layout/Container";
import Section from "../../layout/Section";
import Card from "../../ui/Card";

// Prominent human-control block. Used on the hub (generic flow) and on each agent page (its own rules).
export default function HumanControl({
  statement,
  approvalFor,
  steps,
  heading = "Your team stays in control.",
  id = "human-control",
}: {
  statement: string;
  approvalFor: string[];
  steps: string[];
  heading?: string;
  id?: string;
}) {
  return (
    <Section tone="starlight" labelledBy={id}>
      <Container>
        <div className="rounded-panel border border-line bg-canvas p-8 shadow-spotlight md:p-12">
          <h2 id={id} className="type-h2 text-fg-primary">
            {heading}
          </h2>
          <p className="type-lead mt-5 max-w-3xl">{statement}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Card kind="service" as="div">
                <h3 className="type-h4 text-fg-primary">Needs your approval</h3>
                <ul className="type-small mt-4 list-disc space-y-2 pl-5">
                  {approvalFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </div>
            <div className="lg:col-span-7">
              <Card kind="service" as="div">
                <h3 className="type-h4 text-fg-primary">How an action is handled</h3>
                <ol className="type-small mt-4 list-decimal space-y-2 pl-5">
                  {steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
