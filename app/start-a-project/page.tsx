import type { Metadata } from "next";
import Breadcrumbs from "../components/site/blocks/Breadcrumbs";
import JsonLd from "../components/site/blocks/JsonLd";
import StartProjectForm from "../components/site/start/StartProjectForm";
import Container from "../components/layout/Container";
import { agents } from "../content/agents";
import { getService } from "../content/services";
import { parseStartContext } from "../lib/leads/context";
import { breadcrumbJsonLd, pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Start a Project",
  description: "Share your project brief in four guided steps. We reply with what is possible and how we would approach it.",
  path: "/start-a-project",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Start a Project", path: "/start-a-project" },
];

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function StartProjectPage({ searchParams }: Props) {
  const params = await searchParams;
  const context = parseStartContext(params);

  // Label for the summary panel only. Direct navigation without context shows no label.
  const agent = agents.find((a) => a.slug === context.agent);
  const service = getService(context.service);
  const contextLabel = agent?.name ?? service?.metaTitle ?? null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      <section aria-labelledby="start-hero-heading" className="bg-canvas pt-10 pb-12 md:pt-14 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <p className="type-eyebrow">Start a Project</p>
            <h1 id="start-hero-heading" className="type-h1 mt-5 text-fg-primary">
              Tell us what your business needs.
            </h1>
            <p className="type-lead mt-6">
              Four short steps. Answer what you can, and we will review your brief.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Project brief form" className="bg-surface-1 pb-24 pt-10 md:pb-32">
        <Container>
          <StartProjectForm context={context} contextLabel={contextLabel} />
        </Container>
      </section>
    </>
  );
}
