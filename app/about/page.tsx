import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "../components/site/blocks/Breadcrumbs";
import JsonLd from "../components/site/blocks/JsonLd";
import CosmicBanner, { CosmicEyebrow, cosmicPrimary, cosmicSecondary } from "../components/site/blocks/CosmicBanner";
import ProcessSteps from "../components/site/blocks/ProcessSteps";
import SectionHeading from "../components/site/blocks/SectionHeading";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import { COMPANY_CONTACT } from "../content/contact";
import { differentiators, manifesto, processSteps } from "../content/home";
import { showcaseProjects } from "../content/projects";
import { getService, serviceFamilies } from "../content/services";
import { breadcrumbJsonLd, pageMetadata, POSITIONING } from "../lib/seo";

// Company page. Only verified facts: the name's meaning, location, focus market, services, real client
// projects and how we work. No team, founding year, client counts or metrics until Anantorix approves them.
export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "Anantorix Technologies builds intelligent digital systems for businesses across India, from Tiruchengode, Tamil Nadu.",
  path: "/about",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* Hero */}
      <section aria-labelledby="about-heading" className="bg-canvas pt-4 pb-6 md:pt-6">
        <Container>
          <CosmicBanner>
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <CosmicEyebrow>About Anantorix</CosmicEyebrow>
                <h1 id="about-heading" className="type-h1 mt-6 text-starlight">
                  Software built to keep growing with your business.
                </h1>
                <p className="type-lead mt-6 max-w-2xl text-starlight/75!">{POSITIONING}</p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href="/start-a-project" className={cosmicPrimary}>
                    Start a Project <span aria-hidden="true">→</span>
                  </Link>
                  <Link href="/services" className={cosmicSecondary}>
                    Explore our solutions
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    { k: "Name", v: "Anant means infinite" },
                    { k: "Based in", v: `${COMPANY_CONTACT.locality}, ${COMPANY_CONTACT.region}` },
                    { k: "Serving", v: `Businesses across ${COMPANY_CONTACT.market}` },
                  ].map((item) => (
                    <div key={item.k} className="rounded-card border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">{item.k}</dt>
                      <dd className="mt-2 text-lg font-semibold text-starlight">{item.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </CosmicBanner>
        </Container>
      </section>

      {/* The name */}
      <Section labelledBy="name-heading">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative mx-auto flex aspect-square max-w-[360px] items-center justify-center">
                <div aria-hidden="true" className="scene-pulse absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(91,63,209,0.22),transparent)]" />
                <div aria-hidden="true" className="absolute inset-[14%] rounded-full border border-dashed border-purple/25" />
                <div aria-hidden="true" className="absolute inset-[26%] rounded-full border border-gold/40" />
                <Image src="/images/brand/anantorix-mark.png" alt="Anantorix infinity mark" width={256} height={256} className="relative w-[36%] drop-shadow-[0_16px_30px_rgba(91,63,209,0.3)]" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <SectionHeading id="name-heading" eyebrow="The name" title="Anant means infinite." />
              <div className="type-body mt-6 space-y-4 text-fg-secondary">
                <p>
                  The name carries one idea: what we build should not stop at launch. A good system keeps working, keeps learning from your data and keeps growing
                  with the business that runs on it.
                </p>
                <p>
                  Our mark joins the A of Anantorix with the infinity sign. It stands for the work we care about most: systems that run quietly every day, connect the
                  parts of a business and give its people time back.
                </p>
              </div>
              <p className="mt-8 border-l-2 border-gold pl-5 font-heading text-xl font-semibold text-deep-blue md:text-2xl">{manifesto}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* What we build */}
      <Section tone="surface1" labelledBy="build-heading">
        <Container>
          <SectionHeading id="build-heading" eyebrow="What we build" title="Four areas of work, one goal." lead="Every engagement aims at the same outcomes: sell more, run smarter and decide faster." />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {serviceFamilies.map((family, index) => (
              <li key={family.title}>
                <div className="hover-lift flex h-full flex-col rounded-card border border-line bg-canvas p-6 shadow-raised md:p-8">
                  <span className="font-mono text-[12px] font-semibold text-purple">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="type-h4 mt-3 text-fg-primary">{family.title}</h3>
                  <p className="type-small mt-2 text-fg-secondary">{family.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {family.slugs.map((slug) => {
                      const service = getService(slug);
                      if (!service) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/services/${slug}`}
                            className="inline-flex min-h-11 items-center rounded-chip border border-line bg-surface-1 px-4 text-small font-medium text-deep-blue transition-colors hover:border-purple hover:bg-canvas"
                          >
                            {service.metaTitle}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Principles */}
      <Section labelledBy="principles-heading">
        <Container>
          <SectionHeading id="principles-heading" eyebrow="How we think" title="Principles behind every build." />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {differentiators.map((d, index) => (
              <li key={d.title} className="relative rounded-card border border-line bg-canvas p-6 shadow-raised">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-t-card bg-gradient-to-r from-deep-blue via-purple to-gold" />
                <span className="font-mono text-[12px] font-semibold text-fg-secondary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="type-h4 mt-3 text-fg-primary">{d.title}</h3>
                <p className="type-small mt-2 text-fg-secondary">{d.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Work */}
      <Section tone="surface1" labelledBy="work-heading">
        <Container>
          <SectionHeading id="work-heading" eyebrow="Our work" title="Built for real businesses." lead="A few of the businesses we have built for." />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {showcaseProjects.map((project) => (
              <li key={project.id}>
                <div className="hover-lift flex h-full flex-col rounded-card border border-line bg-canvas p-6 shadow-raised">
                  <div className="flex h-28 items-center justify-center rounded-[16px] bg-surface-1 p-4">
                    <Image
                      src={project.logo.src}
                      alt={project.logo.alt}
                      width={project.logo.width}
                      height={project.logo.height}
                      sizes="200px"
                      className="max-h-full w-auto object-contain"
                      style={{ height: Math.min(project.displayHeight, 80) }}
                    />
                  </div>
                  <p className="type-eyebrow mt-6">{project.category}</p>
                  <h3 className="type-h4 mt-2 text-fg-primary">{project.name}</h3>
                  <p className="type-small mt-2 text-fg-secondary">{project.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="surface2" labelledBy="about-process-heading">
        <Container>
          <SectionHeading id="about-process-heading" eyebrow="How we work" title="A clear path from first conversation to growth." />
          <div className="mt-12">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section labelledBy="about-cta-heading">
        <Container>
          <CosmicBanner>
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 id="about-cta-heading" className="type-h2 text-starlight">
                  Tell us what your business needs.
                </h2>
                <p className="type-lead mt-4 text-starlight/75!">
                  Based in {COMPANY_CONTACT.locationDisplay}. Call {COMPANY_CONTACT.phoneDisplay} or email {COMPANY_CONTACT.email}.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <Link href="/start-a-project" className={cosmicPrimary}>
                  Start a Project <span aria-hidden="true">→</span>
                </Link>
                <Link href="/contact" className={cosmicSecondary}>
                  Contact us
                </Link>
              </div>
            </div>
          </CosmicBanner>
        </Container>
      </Section>
    </>
  );
}
