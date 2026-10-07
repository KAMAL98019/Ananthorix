import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Breadcrumbs from "../components/site/blocks/Breadcrumbs";
import JsonLd from "../components/site/blocks/JsonLd";
import CosmicBanner, { CosmicEyebrow, cosmicPrimary, cosmicSecondary } from "../components/site/blocks/CosmicBanner";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import { COMPANY_CONTACT } from "../content/contact";
import { breadcrumbJsonLd, pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Anantorix Technologies by email or phone, or share your project brief.",
  path: "/contact",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const channels = [
  {
    id: "call",
    icon: Phone,
    title: "Call us",
    body: "Talk through your project directly. Calls are the quickest way to book a conversation.",
    value: COMPANY_CONTACT.phoneDisplay,
    href: COMPANY_CONTACT.phoneHref,
  },
  {
    id: "email",
    icon: Mail,
    title: "Email",
    body: "Send a short note or attach what you have. We read every message.",
    value: COMPANY_CONTACT.email,
    href: `mailto:${COMPANY_CONTACT.email}`,
  },
  {
    id: "location",
    icon: MapPin,
    title: "Location",
    body: `Working with businesses across ${COMPANY_CONTACT.market}.`,
    value: COMPANY_CONTACT.locationDisplay,
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      <section aria-labelledby="contact-heading" className="bg-canvas pt-4 pb-6 md:pt-6">
        <Container>
          <CosmicBanner>
            <div className="max-w-3xl">
              <CosmicEyebrow>Contact</CosmicEyebrow>
              <h1 id="contact-heading" className="type-h1 mt-6 text-starlight">
                Let&apos;s talk about what your business needs.
              </h1>
              <p className="type-lead mt-6 text-starlight/75!">
                Call or email us directly, or share a project brief in four short steps.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/start-a-project" className={cosmicPrimary}>
                  Start a Project <span aria-hidden="true">→</span>
                </Link>
                <a href={COMPANY_CONTACT.phoneHref} className={cosmicSecondary}>
                  Call {COMPANY_CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </CosmicBanner>
        </Container>
      </section>

      <Section tone="surface1" labelledBy="contact-details-heading">
        <Container>
          <h2 id="contact-details-heading" className="type-h2 text-fg-primary">Contact details</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {channels.map(({ id, icon: Icon, title, body, value, href }) => (
              <li key={id} id={id} className="scroll-mt-28">
                <div className="hover-lift flex h-full flex-col rounded-card border border-line bg-canvas p-6 shadow-raised md:p-8">
                  <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-button bg-gradient-to-br from-purple to-deep-blue text-starlight shadow-raised">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="type-h4 mt-6 text-fg-primary">{title}</h3>
                  <p className="type-small mt-2 text-fg-secondary">{body}</p>
                  <div className="mt-auto pt-6">
                    {href ? (
                      <a href={href} className="inline-flex min-h-11 items-center break-all font-semibold text-deep-blue underline underline-offset-4">
                        {value}
                      </a>
                    ) : (
                      <p className="inline-flex min-h-11 items-center font-semibold text-deep-blue">{value}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="contact-brief-heading">
        <Container>
          <div className="grid items-center gap-8 rounded-panel border border-line bg-canvas p-8 shadow-raised md:p-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 id="contact-brief-heading" className="type-h2 text-fg-primary">Share your project brief</h2>
              <p className="type-lead mt-4 max-w-2xl">Four short steps. Tell us what you need and how to reach you, and we will review the details.</p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/start-a-project"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-deep-blue px-6 font-semibold text-canvas shadow-raised hover:bg-indigo"
              >
                Start a Project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
