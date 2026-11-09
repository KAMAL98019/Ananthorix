import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import PricingTierCard from "./PricingTierCard";
import type { PricingCategory } from "../../../content/pricing";

export default function PricingCategorySection({
  category,
  tone = "canvas",
}: {
  category: PricingCategory;
  tone?: "canvas" | "surface1" | "surface2";
}) {
  return (
    <Section id={category.id} tone={tone} labelledBy={`${category.id}-heading`} className="scroll-mt-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <SectionHeading
            id={`${category.id}-heading`}
            eyebrow={category.eyebrow}
            title={category.title}
            lead={category.lead}
          />
          <Link
            href={category.relatedServiceHref}
            className="inline-flex items-center gap-1.5 type-small font-semibold text-deep-blue hover:text-indigo hover:underline shrink-0"
          >
            {category.relatedServiceLabel} <ArrowRight className="size-4" />
          </Link>
        </div>

        {category.disclaimer && (
          <div className="mt-6 rounded-input border border-line bg-surface-1 px-4 py-3 type-small text-fg-secondary">
            <span className="font-semibold text-fg-primary">Note:</span> {category.disclaimer}
          </div>
        )}

        {/* Pricing Tiers Grid */}
        <Grid className="mt-12 gap-y-8">
          {category.tiers.map((tier) => (
            <div key={tier.name} className="col-span-4 md:col-span-4 lg:col-span-4">
              <PricingTierCard tier={tier} categoryServiceId={category.id} />
            </div>
          ))}
        </Grid>

        {/* Key Inclusions or Modules Showcase */}
        {category.featuresOrModules && category.featuresOrModules.length > 0 && (
          <div className="mt-14 rounded-card border border-line bg-surface-1 p-6 md:p-10">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex size-8 items-center justify-center rounded-button bg-purple/10 text-purple">
                <Layers className="size-4" />
              </div>
              <h4 className="type-h4 text-fg-primary">
                {category.featuresOrModulesTitle ?? "Included Capabilities & Standards"}
              </h4>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.featuresOrModules.map((item) => (
                <div key={item.title} className="rounded-input border border-line bg-canvas p-4">
                  <h5 className="type-small font-semibold text-fg-primary">{item.title}</h5>
                  <p className="type-small mt-1.5 text-fg-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

