import type { Metadata } from "next";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Breadcrumbs from "../components/site/blocks/Breadcrumbs";
import CtaBand from "../components/site/blocks/CtaBand";
import JsonLd from "../components/site/blocks/JsonLd";
import SectionHeading from "../components/site/blocks/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { CurrencyProvider } from "../components/site/pricing/CurrencyContext";
import CurrencySwitcher from "../components/site/pricing/CurrencySwitcher";
import FloatingCurrencySwitcher from "../components/site/pricing/FloatingCurrencySwitcher";
import SeoPackageCard from "../components/site/seo/SeoPackageCard";
import SeoEnquiryForm from "../components/site/seo/SeoEnquiryForm";
import {
  SEO_ADDONS,
  SEO_PACKAGES,
  SEO_PROCESS_STEPS,
  SEO_RESULTS_DISCLAIMER,
  SEO_SERVICES_OFFERED,
} from "../content/seo-services";
import { breadcrumbJsonLd, pageMetadata } from "../lib/seo";
import {
  CheckCircle2,
  FileSearch,
  Search,
  Sliders,
  TrendingUp,
  BarChart3,
  Globe2,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "SEO Services in Namakkal, Salem & Erode",
  description:
    "Grow your business with professional SEO services in Namakkal, Salem and Erode. Explore local SEO, technical SEO, on-page optimisation and monthly SEO packages from Anantorix Technologies.",
  path: "/seo-services",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "SEO Services", path: "/seo-services" },
];

function seoServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Strategic SEO Services & Monthly Packages",
    provider: {
      "@type": "Organization",
      name: "Anantorix Technologies",
      url: "https://www.anantorix.com",
    },
    serviceType: "Search Engine Optimization",
    areaServed: [
      { "@type": "City", name: "Namakkal" },
      { "@type": "City", name: "Salem" },
      { "@type": "City", name: "Erode" },
      { "@type": "State", name: "Tamil Nadu" },
      { "@type": "Country", name: "India" },
    ],
    description:
      "Data-driven SEO strategies including technical audits, local SEO, on-page optimisation, schema markup, and transparent monthly performance reporting.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Monthly SEO Retainer Packages",
      itemListElement: SEO_PACKAGES.map((pkg, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: pkg.name,
          description: pkg.tagline,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: pkg.price,
          priceCurrency: "INR",
          unitCode: "MON",
        },
        position: idx + 1,
      })),
    },
  };
}

export default function SeoServicesPage() {
  const serviceIcons = [FileSearch, Sliders, Globe2, Search, TrendingUp, BarChart3];

  return (
    <CurrencyProvider>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={seoServiceJsonLd()} />

      {/* Breadcrumbs */}
      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* Hero Section */}
      <section aria-labelledby="seo-hero-heading" className="bg-canvas pt-10 pb-12 md:pt-16 md:pb-16">
        <Container>
          <div className="max-w-4xl">
            <p className="type-eyebrow text-purple">Organic Search Engineering</p>
            <h1 id="seo-hero-heading" className="type-h1 mt-4 text-fg-primary">
              Grow Your Business With Strategic SEO
            </h1>
            <p className="type-lead mt-5 font-semibold text-deep-blue">
              Improve your search visibility, attract qualified organic traffic and turn Google searches into business enquiries with data-driven SEO strategies.
            </p>
            <p className="type-body mt-4 text-fg-secondary">
              We help businesses strengthen their online presence through technical SEO, on-page optimisation, local SEO and content strategy. Whether you are an industrial exporter in Namakkal, a retail enterprise in Salem, or a service provider across Tamil Nadu, our white-hat methods produce sustainable visibility.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#seo-enquiry" variant="primary">
                Get an SEO Consultation
              </Button>
              <Button href="#seo-packages" variant="secondary">
                View SEO Packages
              </Button>
            </div>

            {/* Currency Switcher */}
            <div
              id="currency-seo-anchor"
              className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-card border border-line bg-surface-1 p-4 md:p-5"
            >
              <div>
                <p className="type-small font-semibold text-fg-primary">Display Currency</p>
                <p className="type-small text-fg-secondary">
                  Toggle pricing between India (INR), US (USD), Singapore (SGD), and Malaysia (MYR).
                </p>
              </div>
              <CurrencySwitcher />
            </div>

            {/* Floating currency switcher when scrolled past this hero anchor */}
            <FloatingCurrencySwitcher anchorId="currency-seo-anchor" />
          </div>
        </Container>
      </section>

      {/* 3 Tiered SEO Packages */}
      <Section id="seo-packages" className="bg-surface-1 py-16 md:py-20 border-y border-line">
        <Container>
          <SectionHeading
            id="seo-packages-heading"
            eyebrow="Monthly SEO Packages"
            title="Transparent, Deliverable-Driven Retainers"
            lead="Clear monthly work limits, structured deliverables, and zero hidden lock-in. Indicative pricing tailored to your website size and regional competition."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {SEO_PACKAGES.map((pkg) => (
              <SeoPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div className="mt-10 rounded-card border border-line bg-canvas p-5 text-center text-small text-fg-secondary">
            <p>
              <strong className="text-fg-primary">Need a customized scope?</strong> We offer bespoke campaigns for multi-lingual websites, multi-location brands, and e-commerce stores with 1,000+ products.{" "}
              <a href="#seo-enquiry" className="font-semibold text-purple underline hover:text-indigo">
                Request a custom SEO scope →
              </a>
            </p>
          </div>
        </Container>
      </Section>

      {/* SEO Services We Offer */}
      <Section className="bg-canvas py-16 md:py-20">
        <Container>
          <SectionHeading
            id="seo-capabilities-heading"
            eyebrow="Capabilities &amp; Specialisations"
            title="SEO Services We Offer"
            lead="From resolving deep crawling bottlenecks in Next.js to winning top local Google Map placements across Namakkal, Salem, and Erode."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SEO_SERVICES_OFFERED.map((svc, idx) => {
              const Icon = serviceIcons[idx % serviceIcons.length];
              return (
                <Card key={svc.id} kind="service" className="border-line bg-surface-1 hover:border-line-strong transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-panel bg-canvas border border-line text-purple shadow-sm">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="type-h4 text-fg-primary">{svc.title}</h3>
                  </div>
                  <p className="type-small mt-3 text-fg-secondary">{svc.summary}</p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-4">
                    {svc.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-small text-fg-secondary">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Optional SEO Add-on Services */}
      <Section className="bg-surface-1 py-16 md:py-20 border-t border-line">
        <Container>
          <SectionHeading
            id="seo-addons-heading"
            eyebrow="Specialized Add-Ons"
            title="Optional SEO Add-on Services"
            lead="Shown separately to preserve transparent retainer limits. Add targeted firepower to your organic growth strategy when needed."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SEO_ADDONS.map((addon) => (
              <Card key={addon.title} kind="service" className="border-line bg-canvas hover:border-line-strong flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="type-h4 text-fg-primary">{addon.title}</h3>
                    <span className="shrink-0 rounded-chip bg-surface-2 border border-line px-2.5 py-1 text-xs font-semibold text-deep-blue">
                      {addon.pricing}
                    </span>
                  </div>
                  <p className="type-small mt-3 text-fg-secondary">{addon.description}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-line">
                  <a
                    href="#seo-enquiry"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple hover:text-indigo uppercase tracking-wider"
                  >
                    <span>Enquire About Add-on</span>
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6-Step SEO Process */}
      <Section className="bg-canvas py-16 md:py-20">
        <Container>
          <SectionHeading
            id="seo-process-heading"
            eyebrow="Structured Execution"
            title="Our 6-Step SEO Process"
            lead="A repeatable, transparent workflow designed to systematically elevate your organic rankings and conversion rates."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SEO_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative rounded-card border border-line bg-surface-1 p-6 hover:border-purple/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="type-h3 font-mono font-bold text-deep-blue/40">{step.step}</span>
                  <span className="type-eyebrow text-purple">{step.title}</span>
                </div>
                <h3 className="type-h4 mt-2 text-fg-primary">{step.summary}</h3>
                <p className="type-small mt-2 text-fg-secondary">{step.details}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Transparent SEO Results & Ethics Disclaimer */}
      <Section className="bg-surface-2 py-16 md:py-20 border-y border-line">
        <Container>
          <div className="mx-auto max-w-4xl rounded-card border border-line-strong bg-canvas p-6 md:p-10 shadow-raised">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/30">
                <ShieldAlert className="size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="type-eyebrow text-amber-700">Expectations &amp; Ethics</p>
                <h2 className="type-h3 text-fg-primary">{SEO_RESULTS_DISCLAIMER.headline}</h2>
              </div>
            </div>

            <p className="type-body mt-4 text-fg-secondary">{SEO_RESULTS_DISCLAIMER.intro}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SEO_RESULTS_DISCLAIMER.commitments.map((item) => (
                <div key={item.title} className="rounded-card border border-line bg-surface-1 p-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <h3 className="type-small font-bold text-fg-primary">{item.title}</h3>
                  </div>
                  <p className="type-small mt-1.5 text-fg-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* SEO Consultation Inquiry Form */}
      <Section id="seo-enquiry" className="bg-canvas py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="type-eyebrow text-purple">Get Started Today</p>
            <h2 className="type-h2 mt-2 text-fg-primary">
              Let&apos;s Build Your Organic Growth Strategy
            </h2>
            <p className="type-lead mt-3 text-fg-secondary">
              Share your website and target market. We will audit your current visibility and provide a free preliminary roadmap and custom proposal.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <SeoEnquiryForm />
          </div>
        </Container>
      </Section>

      {/* Final CTA Band */}
      <CtaBand
        headingId="seo-cta-heading"
        headline="Ready to turn Google searches into consistent qualified leads?"
        body="Book a technical discovery session with our SEO engineering team in Namakkal, Salem, and Tamil Nadu."
        primary={{
          label: "Request SEO Consultation",
          href: "#seo-enquiry",
        }}
        secondary={{
          label: "Explore General Pricing",
          href: "/pricing",
        }}
      />
    </CurrencyProvider>
  );
}
