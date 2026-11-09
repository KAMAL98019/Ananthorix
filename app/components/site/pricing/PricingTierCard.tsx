"use client";

import { Check } from "lucide-react";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import { cx } from "../../ui/cx";
import type { PricingTier } from "../../../content/pricing";
import { useCurrency } from "./CurrencyContext";

export default function PricingTierCard({
  tier,
  categoryServiceId,
}: {
  tier: PricingTier;
  categoryServiceId: string;
}) {
  const { formatTierPrice } = useCurrency();
  const displayedPrice = formatTierPrice(tier);
  const quoteHref = tier.href ?? "#quote-form";

  return (
    <Card
      kind="pricing"
      as="article"
      data-category={categoryServiceId}
      className={cx(
        "relative flex flex-col justify-between transition-all duration-300",
        tier.popular
          ? "border-purple/50 ring-2 ring-purple/20 bg-gradient-to-b from-canvas to-surface-1 shadow-floating"
          : "border-line bg-canvas hover:border-line-strong hover:shadow-floating",
      )}
    >
      {tier.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-chip bg-gradient-to-r from-deep-blue via-indigo to-purple px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-starlight shadow-raised">
            Most Popular
          </span>
        </div>
      )}

      <div>
        <div className="mb-4">
          <h3 className="type-h4 text-fg-primary">{tier.name}</h3>
          <p className="type-small mt-1.5 text-fg-secondary min-h-[40px]">{tier.tagline}</p>
        </div>

        <div className="my-6 border-y border-line py-5">
          <div className="flex items-baseline gap-1.5">
            <span className="type-h2 font-bold text-deep-blue transition-all duration-200">
              {displayedPrice}
            </span>
            {tier.period && <span className="type-small text-fg-secondary">{tier.period}</span>}
          </div>
          <p className="type-small mt-1 text-fg-secondary">Indicative investment · Tailored scope</p>
        </div>

        <div>
          <p className="type-small font-semibold uppercase tracking-wider text-purple">What&apos;s Included:</p>
          <ul className="mt-4 space-y-3">
            {tier.inclusions.map((inclusion) => (
              <li key={inclusion} className="flex items-start gap-2.5 type-small text-fg-primary">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple/10 text-purple mt-0.5">
                  <Check className="size-3.5" aria-hidden="true" />
                </div>
                <span>{inclusion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-line">
        <Button
          variant={tier.popular ? "primary" : "secondary"}
          href={quoteHref}
          className="w-full justify-center"
        >
          {tier.ctaLabel ?? "Get a Quote"}
        </Button>
      </div>
    </Card>
  );
}
