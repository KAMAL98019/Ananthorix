"use client";

import { Check, ShieldCheck, X } from "lucide-react";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import { cx } from "../../ui/cx";
import { MAINTENANCE_PRICING } from "../../../content/pricing";
import { useCurrency } from "./CurrencyContext";

export default function MaintenanceSection() {
  const { formatTierPrice } = useCurrency();

  return (
    <Section id="maintenance" tone="surface2" labelledBy="maintenance-heading" className="scroll-mt-20">
      <Container>
        <SectionHeading
          id="maintenance-heading"
          eyebrow="Continuous Reliability"
          title="Monthly Website & Application Care"
          lead="One simple monthly fee for monitoring, security updates, backups and support, so your website or application keeps running reliably."
        />

        <div className="mt-6 rounded-input border border-line bg-canvas px-4 py-3 type-small text-fg-secondary">
          <span className="font-semibold text-fg-primary">Simple monthly fee:</span> Care plans have a defined scope and monthly maintenance limits. Major new feature builds or redesigns are quoted separately.
        </div>

        <Grid className="mt-12 gap-y-8">
          {MAINTENANCE_PRICING.map((plan) => {
            const displayedPrice = formatTierPrice(plan);
            return (
              <div key={plan.name} className="col-span-4 md:col-span-4 lg:col-span-4">
                <Card
                  kind="pricing"
                  as="article"
                  className={cx(
                    "relative flex flex-col justify-between h-full transition-all duration-300",
                    plan.popular
                      ? "border-purple/50 ring-2 ring-purple/20 bg-gradient-to-b from-canvas to-surface-1 shadow-floating"
                      : "border-line bg-canvas hover:border-line-strong hover:shadow-floating",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-chip bg-gradient-to-r from-deep-blue via-indigo to-purple px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-starlight shadow-raised">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <h3 className="type-h4 text-fg-primary">{plan.name}</h3>
                      <p className="type-small mt-1.5 text-fg-secondary min-h-[40px]">{plan.idealFor}</p>
                    </div>

                    <div className="my-6 border-y border-line py-5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="type-h2 font-bold text-deep-blue transition-all duration-200">
                          {displayedPrice}
                        </span>
                        <span className="type-small text-fg-secondary">{plan.period}</span>
                      </div>
                    </div>

                    {/* Scope */}
                    <div>
                      <p className="type-small font-semibold uppercase tracking-wider text-purple flex items-center gap-1.5">
                        <ShieldCheck className="size-4" /> Included Support Scope:
                      </p>
                      <ul className="mt-3.5 space-y-2.5">
                        {plan.scope.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 type-small text-fg-primary">
                            <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-purple/10 text-purple mt-0.5">
                              <Check className="size-3" aria-hidden="true" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div className="mt-6 pt-5 border-t border-line/70">
                      <p className="type-small font-semibold uppercase tracking-wider text-fg-secondary">Exclusions & Limits:</p>
                      <ul className="mt-2.5 space-y-1.5">
                        {plan.exclusions.map((item) => (
                          <li key={item} className="flex items-start gap-2 type-small text-fg-secondary">
                            <X className="size-3.5 shrink-0 text-fg-secondary/60 mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-line">
                    <Button
                      variant={plan.popular ? "primary" : "secondary"}
                      href="#quote-form"
                      className="w-full justify-center"
                    >
                      Subscribe to {plan.name}
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
