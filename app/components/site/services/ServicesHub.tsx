import Link from "next/link";
import Breadcrumbs from "../blocks/Breadcrumbs";
import CosmicBanner, { CosmicEyebrow, cosmicPrimary, cosmicSecondary } from "../blocks/CosmicBanner";
import Container from "../../layout/Container";
import Section from "../../layout/Section";
import Card from "../../ui/Card";
import Tilt3D from "../../motion/Tilt3D";
import ServiceScene from "./ServiceScene";
import { SERVICE_ICONS } from "../cards/serviceIcons";
import { serviceFamilies, services } from "../../../content/services";
import { START_PROJECT } from "../../../content/routes";

// Services hub: introduces the full capability set, grouped into the three approved families plus supporting
// capabilities. The hero scene stacks one slab per family. Each family is a row: a sticky intro on the left and
// its services on the right, so no row is left half empty. Routes to every service page.
export default function ServicesHub() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      <section aria-labelledby="services-hero-heading" className="bg-canvas pt-4 pb-6 md:pt-6">
        <Container>
          <CosmicBanner>
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <CosmicEyebrow>Services</CosmicEyebrow>
                <h1 id="services-hero-heading" className="type-h1 mt-6 text-starlight">
                  Build the system your business actually needs.
                </h1>
                <p className="type-lead mt-6 max-w-2xl text-starlight/75!">
                  Most businesses need more than one tool. Anantorix combines AI, business systems and product engineering, so the software fits how your
                  business runs and connects the parts that matter.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href={START_PROJECT.href} className={cosmicPrimary}>
                    {START_PROJECT.label} <span aria-hidden="true">→</span>
                  </Link>
                  <Link href="/ai-agents" className={cosmicSecondary}>
                    See AI Agents
                  </Link>
                </div>
                <nav aria-label="Service families" className="mt-10">
                  <ul className="flex flex-wrap gap-2">
                    {serviceFamilies.map((family) => (
                      <li key={family.title}>
                        <a
                          href={`#family-${slugify(family.title)}`}
                          className="inline-flex min-h-11 items-center rounded-chip border border-white/15 bg-white/5 px-4 text-small text-starlight/85 transition-colors hover:border-gold/50 hover:text-starlight"
                        >
                          {family.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="lg:col-span-6">
                <Tilt3D className="scene-stage mx-auto w-full max-w-[520px]" max={7}>
                  <ServiceScene kind="stack" labels={serviceFamilies.map((f) => f.title)} />
                </Tilt3D>
              </div>
            </div>
          </CosmicBanner>
        </Container>
      </section>

      {serviceFamilies.map((family, index) => {
        const id = `family-${slugify(family.title)}`;
        return (
          <Section key={family.title} tone={index % 2 ? "surface1" : "canvas"} labelledBy={id} id={`${id}-section`}>
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <p className="font-mono text-[12px] font-semibold text-purple">{String(index + 1).padStart(2, "0")} / {String(serviceFamilies.length).padStart(2, "0")}</p>
                    <h2 id={id} className="type-h2 mt-3 scroll-mt-28 text-fg-primary">
                      {family.title}
                    </h2>
                    <p className="type-lead mt-4">{family.description}</p>
                    {family.agentLink && (
                      <Link
                        href={family.agentLink.href}
                        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-chip border border-purple/30 bg-purple/5 px-4 font-semibold text-deep-blue transition-colors hover:bg-purple/10"
                      >
                        {family.agentLink.label} <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </div>
                <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
                  {family.slugs.map((slug) => {
                    const service = services.find((s) => s.slug === slug);
                    if (!service) return null;
                    const Icon = SERVICE_ICONS[slug];
                    return (
                      <li key={slug}>
                        <Link href={`/services/${slug}`} className="group block h-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
                          <Card kind="service" as="div" className="hover-lift flex flex-col group-hover:shadow-floating">
                            <span
                              aria-hidden="true"
                              className="inline-flex size-12 items-center justify-center rounded-button bg-gradient-to-br from-purple to-deep-blue text-starlight shadow-[0_10px_24px_rgba(91,63,209,0.3)]"
                            >
                              {Icon && <Icon className="size-5" />}
                            </span>
                            <h3 className="type-h4 mt-5 text-fg-primary group-hover:text-indigo">{service.metaTitle}</h3>
                            <p className="type-small mt-2">{service.summary}</p>
                            <ul className="mt-5 flex flex-wrap gap-1.5">
                              {service.heroChips.slice(0, 3).map((chip) => (
                                <li key={chip} className="rounded-chip bg-surface-1 px-2.5 py-1 text-[12px] text-fg-secondary">
                                  {chip}
                                </li>
                              ))}
                            </ul>
                            <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold text-purple">
                              View service <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </span>
                          </Card>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
