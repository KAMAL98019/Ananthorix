"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import { CURRENCIES, type CurrencyCode } from "../../../content/pricing";

type CurrencyContextType = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatTierPrice: (tier: { price: string; prices?: Record<CurrencyCode, string> }) => string;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  setCurrency: () => {},
  formatTierPrice: (tier) => tier.price,
});

const STORAGE_KEY = "anantorix_currency_pref";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("currencychange", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("currencychange", callback);
  };
}

function getSnapshot(): CurrencyCode {
  if (typeof window === "undefined") return "INR";
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (stored && stored in CURRENCIES) return stored;
  } catch {
    // Ignore
  }
  return "INR";
}

function getServerSnapshot(): CurrencyCode {
  return "INR";
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setCurrency = (c: CurrencyCode) => {
    try {
      localStorage.setItem(STORAGE_KEY, c);
      window.dispatchEvent(new Event("currencychange"));
    } catch {
      // Ignore
    }
  };

  const formatTierPrice = (tier: { price: string; prices?: Record<CurrencyCode, string> }): string => {
    if (tier.prices && tier.prices[currency]) {
      return tier.prices[currency];
    }
    return tier.price;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatTierPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
