import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/site/blocks/Breadcrumbs";
import CalendarSlot from "../../components/site/start/CalendarSlot";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import { agents } from "../../content/agents";
import { services } from "../../content/services";

// Confirmation page. Not indexable. Disallowed in robots.txt as well.
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

const nextSteps = [
  "We have received your brief and will review the details you shared.",
  "Check your inbox for a confirmation email. If it has not arrived, check your spam folder or email anantorix@gmail.com.",
  "If the fit is right, we will agree the scope and the next step with you.",
];

export default function ThankYouPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Start a Project", path: "/start-a-project" },
            { name: "Thank you", path: "/start-a-project/thank-you" },
          ]}
        />
      </Container>

      <section aria-labelledby="thanks-heading" className="bg-canvas pt-10 pb-12 md:pt-14">
        <Container>
          <div className="max-w-3xl">
            <p className="type-eyebrow">Received</p>
            <h1 id="thanks-heading" className="type-h1 mt-5 text-fg-primary">
              Thanks for sharing your project brief.
            </h1>
            <p className="type-lead mt-6">Thank you for taking the time to describe your project.</p>
          </div>
        </Container>
      </section>

      <Section tone="surface1" labelledBy="next-heading">
        <Container>
          <h2 id="next-heading" className="type-h2 text-fg-primary">What happens next</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {nextSteps.map((step, index) => (
              <li key={step}>
                <Card kind="service" as="div">
                  <p className="font-mono text-[12px] text-purple">STEP {index + 1}</p>
                  <p className="type-body mt-3">{step}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section labelledBy="thanks-links-heading">
        <Container>
          <h2 id="thanks-links-heading" className="type-h2 text-fg-primary">While you wait</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="type-h4 text-fg-primary">AI Agents</h3>
              <ul className="mt-3 flex flex-col">
                {agents.map((agent) => (
                  <li key={agent.slug}>
                    <Link href={`/ai-agents/${agent.slug}`} className="inline-flex min-h-11 items-center font-medium text-deep-blue underline underline-offset-4">
                      {agent.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="type-h4 text-fg-primary">Services</h3>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2">
                {services.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="inline-flex min-h-11 items-center font-medium text-deep-blue underline underline-offset-4">
                      {service.metaTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface1" labelledBy="calendar-heading">
        <Container>
          <CalendarSlot />
        </Container>
      </Section>
    </>
  );
}
