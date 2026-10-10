import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import Container from "../../layout/Container";
import { breadcrumbJsonLd } from "../../../lib/seo";

// Readable legal page: a short header, a sticky contents list on large screens, and numbered sections.
export type LegalSection = { id: string; title: string; body: React.ReactNode };

export default function LegalPage({
  title,
  path,
  updated,
  intro,
  sections,
}: {
  title: string;
  path: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Container className="pt-8">
        <Breadcrumbs items={crumbs} />
      </Container>

      <section aria-labelledby="legal-heading" className="relative overflow-hidden bg-canvas pt-10 pb-12 md:pt-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-[radial-gradient(ellipse_at_top,rgb(91_63_209/0.08),transparent_70%)]" />
        <Container className="relative">
          <p className="type-eyebrow">Legal</p>
          <h1 id="legal-heading" className="type-h1 mt-5 text-fg-primary">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[12px] text-fg-secondary">Last updated: {updated}</p>
          <div className="type-lead mt-6 max-w-3xl">{intro}</div>
        </Container>
      </section>

      <section className="bg-surface-1 py-section-sm md:py-section-md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <nav aria-label="Contents" className="lg:col-span-4">
              <div className="rounded-card border border-line bg-canvas p-6 shadow-raised lg:sticky lg:top-28">
                <p className="type-eyebrow text-fg-secondary">Contents</p>
                <ol className="mt-4 space-y-1">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="flex min-h-11 items-center gap-3 rounded-input px-2 text-small font-medium text-deep-blue hover:bg-surface-1">
                        <span className="font-mono text-[11px] text-fg-secondary">{String(i + 1).padStart(2, "0")}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
            <div className="space-y-6 lg:col-span-8">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 rounded-card border border-line bg-canvas p-6 shadow-raised md:p-8">
                  <h2 id={`${s.id}-h`} className="type-h4 text-fg-primary">
                    <span className="mr-3 font-mono text-[13px] text-purple">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="type-body mt-4 space-y-3 text-fg-secondary [&_a]:font-semibold [&_a]:text-deep-blue [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-fg-primary [&_ul]:space-y-1.5">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
