"use client";

import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import type { CurrencyCode } from "../../../content/pricing";
import { useCurrency } from "./CurrencyContext";
import { cx } from "../../ui/cx";

interface FloatingCurrencySwitcherProps {
  anchorId?: string;
  className?: string;
}

export default function FloatingCurrencySwitcher({
  anchorId = "currency-hero-anchor",
  className,
}: FloatingCurrencySwitcherProps) {
  const { currency, setCurrency } = useCurrency();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const anchor = document.getElementById(anchorId);
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      // Become floating when the anchor's bottom edge has scrolled above the viewport top
      setIsVisible(rect.bottom < 0);
    };

    // Run on mount
    checkVisibility();

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [anchorId]);

  const options: { code: CurrencyCode; label: string; symbol: string; flag: string; short: string }[] = [
    { code: "INR", label: "India", symbol: "₹", flag: "🇮🇳", short: "INR" },
    { code: "USD", label: "USD", symbol: "$", flag: "🇺🇸", short: "USD" },
    { code: "SGD", label: "Singapore", symbol: "S$", flag: "🇸🇬", short: "SGD" },
    { code: "MYR", label: "Malaysia", symbol: "RM", flag: "🇲🇾", short: "MYR" },
  ];

  return (
    <aside
      aria-label="Floating currency selector"
      aria-hidden={!isVisible}
      className={cx(
        "fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ease-out",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 rounded-full border border-purple/40 bg-canvas/95 p-1.5 shadow-2xl backdrop-blur-md ring-1 ring-line-strong/60">
        <div className="flex items-center gap-1.5 pl-3 pr-2 py-1 text-small font-semibold text-fg-secondary">
          <Coins className="size-4 text-purple" aria-hidden="true" />
          <span className="hidden sm:inline text-xs font-semibold text-fg-primary uppercase tracking-wider">
            Currency
          </span>
        </div>

        <div className="flex items-center gap-1">
          {options.map((opt) => {
            const isSelected = currency === opt.code;
            return (
              <button
                key={opt.code}
                type="button"
                tabIndex={isVisible ? 0 : -1}
                aria-pressed={isSelected}
                onClick={() => setCurrency(opt.code)}
                className={cx(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200",
                  isSelected
                    ? "bg-deep-blue text-starlight shadow-raised ring-1 ring-gold/50 scale-[1.02]"
                    : "text-fg-secondary hover:bg-surface-2 hover:text-fg-primary",
                )}
                title={`Switch currency to ${opt.label} (${opt.symbol})`}
              >
                <span aria-hidden="true">{opt.flag}</span>
                <span className="hidden md:inline">{opt.label}</span>
                <span className="md:hidden">{opt.short}</span>
                <span className={cx(isSelected ? "text-gold font-bold" : "text-fg-secondary")}>
                  {opt.symbol}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

