import Link from "next/link";
import { ArrowUpRight, Bot, Globe, LifeBuoy, Search, Workflow, type LucideIcon } from "lucide-react";
import Container from "../../layout/Container";
import Section from "../../layout/Section";
import CosmicBanner, { CosmicEyebrow, cosmicPrimary, cosmicSecondary } from "../blocks/CosmicBanner";
import { AI_AUTOMATION_PRICING, CRM_ERP_PRICING, MAINTENANCE_PRICING, WEBSITE_PRICING } from "../../../content/pricing";
import { SEO_PACKAGES } from "../../../content/seo-services";

// Homepage teaser for the pricing pages. Amounts are read from the pricing content, so they cannot drift from it.
const startingAt = (price: string) => price.split("–")[0];

const GLIMPSES: { label: string; detail: string; from: string; period?: string; href: string; Icon: LucideIcon }[] = [
  { label: "Business websites", detail: "Custom design, lead forms, WhatsApp and SEO-ready.", from: startingAt(WEBSITE_PRICING.tiers[0].price), href: "/pricing#website-development", Icon: Globe },
  { label: "CRM & ERP systems", detail: "Sales, stock, billing and teams in one system.", from: startingAt(CRM_ERP_PRICING.tiers[0].price), href: "/pricing#crm-erp-development", Icon: Workflow },
  { label: "AI & automation", detail: "Chatbots, lead automation and custom assistants.", from: startingAt(AI_AUTOMATION_PRICING.tiers[0].price), href: "/pricing#ai-automation", Icon: Bot },
  { label: "SEO packages", detail: "Audits, on-page work, local SEO and monthly reports.", from: startingAt(SEO_PACKAGES[0].price), period: "/month", href: "/seo-services#seo-packages", Icon: Search },
  { label: "Monthly care", detail: "Monitoring, backups, updates and support.", from: MAINTENANCE_PRICING[0].price, period: "/month", href: "/pricing#maintenance", Icon: LifeBuoy },
];

export default function PricingGlimpse() {
  return (
    <Section tone="canvas" labelledBy="pricing-glimpse-heading">
      <Container>
        <CosmicBanner>
          <div className="max-w-2xl">
            <CosmicEyebrow>Clear pricing</CosmicEyebrow>
            <h2 id="pricing-glimpse-heading" className="type-h2 mt-5 text-starlight">
              Know the investment before you call us.
            </h2>
            <p className="type-lead mt-4 text-starlight/75!">
              No hidden numbers and no &ldquo;contact us for pricing&rdquo;. See where your project is likely to start.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {GLIMPSES.map(({ label, detail, from, period, href, Icon }) => (
              <li key={label} className="min-w-0">
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-card border border-white/15 bg-white/5 p-5 transition-colors duration-300 hover:border-gold/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <span className="flex items-center justify-between text-gold">
                    <Icon aria-hidden="true" className="size-5" />
                    <ArrowUpRight aria-hidden="true" className="size-4 text-starlight/50 transition-colors group-hover:text-gold" />
                  </span>
                  <span className="mt-4 font-semibold text-starlight">{label}</span>
                  <span className="mt-1 text-[14px] leading-snug text-starlight/70">{detail}</span>
                  <span className="mt-auto pt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-starlight/60">From</span>
                  <span className="mt-1 whitespace-nowrap font-heading text-[26px] font-bold leading-none text-starlight">
                    {from}
                    {period && <span className="ml-1 text-[13px] font-medium text-starlight/60">{period}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/pricing" className={cosmicPrimary}>
              View full pricing <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact#call" className={cosmicSecondary}>
              Book a consultation
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-starlight/60">Indicative prices. Final quote depends on your project requirements. Taxes extra.</p>
        </CosmicBanner>
      </Container>
    </Section>
  );
}
