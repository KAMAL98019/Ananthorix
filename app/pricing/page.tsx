import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Breadcrumbs from "../components/site/blocks/Breadcrumbs";
import CtaBand from "../components/site/blocks/CtaBand";
import FaqList from "../components/site/blocks/FaqList";
import JsonLd from "../components/site/blocks/JsonLd";
import SectionHeading from "../components/site/blocks/SectionHeading";
import PricingCategorySection from "../components/site/pricing/PricingCategorySection";
import MaintenanceSection from "../components/site/pricing/MaintenanceSection";
import CommercialTermsSection from "../components/site/pricing/CommercialTermsSection";
import QuoteEnquiryForm from "../components/site/pricing/QuoteEnquiryForm";
import CurrencySwitcher from "../components/site/pricing/CurrencySwitcher";
import FloatingCurrencySwitcher from "../components/site/pricing/FloatingCurrencySwitcher";
import { CurrencyProvider } from "../components/site/pricing/CurrencyContext";
import {
  AI_AUTOMATION_PRICING,
  CRM_ERP_PRICING,
  PRICING_FAQS,
  WEBSITE_PRICING,
} from "../content/pricing";
import { SEO_PRICING } from "../content/seo-services";
import { breadcrumbJsonLd, pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing & Investment Plans",
  description:
    "Indicative pricing for websites, custom software, CRM, ERP and AI business automation in India from Anantorix Technologies. Transparent milestone schedules.",
  path: "/pricing",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
];

function pricingFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export default function PricingPage() {
  return (
    <CurrencyProvider>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={pricingFaqJsonLd()} />

      {/* Breadcrumbs */}
      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      {/* Hero Section */}
      <section aria-labelledby="pricing-hero-heading" className="bg-canvas pt-10 pb-12 md:pt-16 md:pb-16">
        <Container>
          <div className="max-w-4xl">
            <p className="type-eyebrow text-purple">Transparent Indicative Pricing</p>
            <h1 id="pricing-hero-heading" className="type-h1 mt-4 text-fg-primary">
              Technology Investment That Scales With Your Business.
            </h1>
            <p className="type-lead mt-6 text-fg-secondary">
              Explore our indicative pricing for websites, custom software and AI-powered business automation. Every solution is tailored to your goals, requirements and growth plans.
            </p>

            {/* Currency Switcher: USD, Malaysia (MYR), Singapore (SGD), India (INR) */}
            <div
              id="currency-hero-anchor"
              className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-card border border-line bg-surface-1 p-4 md:p-5"
            >
              <div>
                <p className="type-small font-semibold text-fg-primary">Display Currency</p>
                <p className="type-small text-fg-secondary">Switch prices between India, US, Malaysia, and Singapore rates.</p>
              </div>
              <CurrencySwitcher />
            </div>

            {/* Floating currency selector when scrolled past the hero anchor */}
            <FloatingCurrencySwitcher anchorId="currency-hero-anchor" />

            {/* Quick jump navigation pills */}
            <div className="mt-6 flex flex-wrap gap-2.5 pt-2">
              <a
                href="#website-development"
                className="inline-flex items-center rounded-chip border border-line bg-surface-1 px-4 py-2 text-small font-medium text-fg-primary hover:border-deep-blue hover:bg-canvas transition-colors"
              >
                Website Development
              </a>
              <a
                href="#crm-erp-development"
                className="inline-flex items-center rounded-chip border border-line bg-surface-1 px-4 py-2 text-small font-medium text-fg-primary hover:border-deep-blue hover:bg-canvas transition-colors"
              >
                CRM & ERP Systems
              </a>
              <a
                href="#ai-automation"
                className="inline-flex items-center rounded-chip border border-line bg-surface-1 px-4 py-2 text-small font-medium text-fg-primary hover:border-deep-blue hover:bg-canvas transition-colors"
              >
                AI & Automation
              </a>
              <a
                href="#seo-services"
                className="inline-flex items-center rounded-chip border border-line bg-surface-1 px-4 py-2 text-small font-medium text-fg-primary transition-colors hover:border-purple hover:text-purple"
              >
                SEO Services
              </a>
              <a
                href="#maintenance"
                className="inline-flex items-center rounded-chip border border-line bg-surface-1 px-4 py-2 text-small font-medium text-fg-primary hover:border-deep-blue hover:bg-canvas transition-colors"
              >
                Monthly Care
              </a>
              <a
                href="#quote-form"
                className="inline-flex items-center rounded-chip bg-deep-blue px-4 py-2 text-small font-semibold text-canvas hover:bg-indigo transition-colors"
              >
                Request a Quote →
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 1. Website Development */}
      <PricingCategorySection category={WEBSITE_PRICING} tone="surface1" />

      {/* 2. CRM & ERP Development */}
      <PricingCategorySection category={CRM_ERP_PRICING} tone="canvas" />

      {/* 3. AI & Business Automation */}
      <PricingCategorySection category={AI_AUTOMATION_PRICING} tone="surface1" />

      {/* SEO Services */}
      <PricingCategorySection category={SEO_PRICING} tone="canvas" />

      {/* 4. Monthly Maintenance & Care Plans */}
      <MaintenanceSection />

      {/* 5. Commercial Terms */}
      <CommercialTermsSection />

      {/* 6. Quote Enquiry Form Section */}
      <Section id="quote-form" tone="canvas" labelledBy="quote-form-heading" className="scroll-mt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                id="quote-form-heading"
                eyebrow="Direct Enquiry"
                title="Tell Us What You Want to Build."
                lead="Get a clear, itemized proposal based on your business requirements, timeline, and budget."
              />

              <div className="mt-8 space-y-4">
                <div className="rounded-input border border-line bg-surface-1 p-5">
                  <h4 className="type-small font-semibold text-fg-primary">Why Anantorix?</h4>
                  <ul className="mt-2.5 space-y-2 type-small text-fg-secondary">
                    <li>✓ Complete code ownership with zero proprietary lock-in.</li>
                    <li>✓ Transparent milestone payments: 50% / 30% / 20%.</li>
                    <li>✓ Direct communication with senior software engineers.</li>
                    <li>✓ Post-launch warranty and continuous maintenance options.</li>
                  </ul>
                </div>

                <div className="rounded-input border border-line bg-surface-1 p-5">
                  <h4 className="type-small font-semibold text-fg-primary">Prefer to talk directly?</h4>
                  <p className="type-small mt-1 text-fg-secondary">
                    Call our technical team directly or schedule an exploratory phone consultation.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/contact#call"
                      className="inline-flex min-h-11 items-center justify-center rounded-button bg-deep-blue px-4 text-small font-semibold text-canvas hover:bg-indigo"
                    >
                      Book a Call
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex min-h-11 items-center justify-center rounded-button border border-line bg-canvas px-4 text-small font-semibold text-deep-blue hover:bg-surface-2"
                    >
                      All Contact Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <QuoteEnquiryForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Pricing FAQs */}
      <Section id="faqs" tone="surface1" labelledBy="pricing-faq-heading" className="scroll-mt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeading
                id="pricing-faq-heading"
                eyebrow="Pricing FAQs"
                title="Frequently Asked Questions"
                lead="Everything you need to know about our pricing model, payments, timelines, and technical scope."
              />
              <div className="mt-6">
                <p className="type-small text-fg-secondary">
                  Have a question not listed here?{" "}
                  <Link href="/contact" className="font-semibold text-deep-blue hover:underline">
                    Reach out to our team
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <FaqList items={PRICING_FAQS} idPrefix="pricing-faq" />
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Final CTA Band */}
      <CtaBand
        headingId="pricing-final-cta"
        headline="Ready to invest in software that drives measurable business growth?"
        body="Start with a short project brief or request an indicative quotation. We will evaluate what is possible and how we would engineer it."
        primary={{ label: "Request a Quote", href: "#quote-form" }}
        secondary={{ label: "Book a Consultation", href: "/contact#call" }}
      />
    </CurrencyProvider>
  );
}
