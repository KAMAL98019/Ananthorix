"use client";

import type { CurrencyCode } from "../../../content/pricing";
import { useCurrency } from "./CurrencyContext";
import { cx } from "../../ui/cx";
import { Coins } from "lucide-react";

export default function CurrencySwitcher({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  const options: { code: CurrencyCode; label: string; symbol: string; flag: string }[] = [
    { code: "INR", label: "India", symbol: "₹", flag: "🇮🇳" },
    { code: "USD", label: "USD", symbol: "$", flag: "🇺🇸" },
    { code: "SGD", label: "Singapore", symbol: "S$", flag: "🇸🇬" },
    { code: "MYR", label: "Malaysia", symbol: "RM", flag: "🇲🇾" },
  ];

  return (
    <div
      role="group"
      aria-label="Currency selection"
      className={cx(
        "inline-flex flex-wrap items-center gap-1.5 rounded-panel border border-line-strong bg-canvas p-1.5 shadow-raised",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 type-small font-semibold text-fg-secondary">
        <Coins className="size-4 text-purple" aria-hidden="true" />
        <span className="hidden sm:inline">Currency:</span>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {options.map((opt) => {
          const isSelected = currency === opt.code;
          return (
            <button
              key={opt.code}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setCurrency(opt.code)}
              className={cx(
                "inline-flex min-h-10 items-center gap-1.5 rounded-chip px-3.5 py-1.5 text-small font-semibold transition-all duration-200",
                isSelected
                  ? "bg-deep-blue text-starlight shadow-raised ring-1 ring-gold/40"
                  : "text-fg-secondary hover:bg-surface-2 hover:text-fg-primary",
              )}
            >
              <span aria-hidden="true">{opt.flag}</span>
              <span>{opt.label}</span>
              <span className={cx("text-xs", isSelected ? "text-gold" : "text-fg-secondary")}>
                ({opt.symbol})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
