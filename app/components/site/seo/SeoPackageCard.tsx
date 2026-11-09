"use client";

import { Check, Info } from "lucide-react";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import { cx } from "../../ui/cx";
import type { SeoPackage } from "../../../content/seo-services";
import { useCurrency } from "../pricing/CurrencyContext";

export default function SeoPackageCard({ pkg }: { pkg: SeoPackage }) {
  const { currency } = useCurrency();
  const displayedPrice = pkg.prices?.[currency] ?? pkg.price;

  return (
    <Card
      kind="pricing"
      as="article"
      id={pkg.id}
      className={cx(
        "relative flex flex-col justify-between transition-all duration-300",
        pkg.popular
          ? "border-purple ring-2 ring-purple/30 bg-gradient-to-b from-canvas via-surface-1 to-surface-2 shadow-floating"
          : "border-line bg-canvas hover:border-line-strong hover:shadow-floating",
      )}
    >
      {pkg.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-chip bg-gradient-to-r from-deep-blue via-indigo to-purple px-4 py-1 text-xs font-bold uppercase tracking-wider text-starlight shadow-raised ring-1 ring-gold/40">
            Recommended
          </span>
        </div>
      )}

      <div>
        <div className="mb-4">
          <p className="type-eyebrow text-purple">{pkg.id.toUpperCase()}</p>
          <h3 className="type-h3 mt-1 text-fg-primary">{pkg.name}</h3>
          <p className="type-small mt-2 text-fg-secondary min-h-[44px]">{pkg.tagline}</p>
        </div>

        <div className="my-6 rounded-card bg-surface-1 p-4 border border-line">
          <div className="flex items-baseline gap-1.5">
            <span className="type-h2 font-bold text-deep-blue transition-colors duration-200">
              {displayedPrice}
            </span>
            <span className="type-small text-fg-secondary">{pkg.period}</span>
          </div>
          <p className="type-small mt-1 text-fg-secondary">
            Indicative monthly retainer · Based on scope
          </p>
        </div>

        <div className="mb-6 rounded-card border border-line bg-canvas p-3.5">
          <p className="type-small font-semibold text-fg-primary">Ideal For:</p>
          <p className="type-small mt-1 text-fg-secondary">{pkg.idealFor}</p>
        </div>

        <div>
          <p className="type-small font-semibold uppercase tracking-wider text-purple">
            Monthly Inclusions:
          </p>
          <ul className="mt-3.5 space-y-2.5">
            {pkg.inclusions.map((inclusion) => (
              <li key={inclusion} className="flex items-start gap-2.5 text-small text-fg-secondary">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{inclusion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-line space-y-4">
        <div className="flex items-start gap-2 text-xs text-fg-secondary bg-surface-1 rounded-card p-3 border border-line">
          <Info className="size-4 shrink-0 text-indigo mt-0.5" aria-hidden="true" />
          <p>{pkg.monthlyLimitNote}</p>
        </div>

        <Button
          href="#seo-enquiry"
          variant={pkg.popular ? "primary" : "secondary"}
          className="w-full justify-center"
        >
          {pkg.ctaLabel}
        </Button>
      </div>
    </Card>
  );
}
