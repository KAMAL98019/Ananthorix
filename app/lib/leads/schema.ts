// Allowed values for the Start a Project brief. Server validation rejects anything outside these lists.
// Budget ranges are not approved for public display, so only "Prefer to discuss" is offered.

export const NEEDS = [
  { value: "ai-agent", label: "AI Agent" },
  { value: "ai-automation", label: "AI Automation" },
  { value: "analytics", label: "Analytics" },
  { value: "crm", label: "CRM" },
  { value: "erp", label: "ERP / Business Software" },
  { value: "web-app", label: "Web App" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "saas", label: "SaaS" },
  { value: "desktop-app", label: "Desktop App" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const SITUATIONS = [
  { value: "new-build", label: "New build" },
  { value: "improve-existing", label: "Improve an existing system" },
  { value: "replace-old", label: "Replace an old system" },
] as const;

export const TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "exploring", label: "Exploring" },
] as const;

export const BUDGETS = [
  { value: "below-25k", label: "Below ₹25,000" },
  { value: "25k-50k", label: "₹25,000–₹50,000" },
  { value: "50k-75k", label: "₹50,000–₹75,000" },
  { value: "75k-150k", label: "₹75,000–₹1,50,000" },
  { value: "above-150k", label: "₹1,50,000+" },
  { value: "need-consultation", label: "Need consultation" },
  { value: "prefer-to-discuss", label: "Prefer to discuss" },
] as const;

export const QUOTE_SERVICES = [
  { value: "website-development", label: "Website Development" },
  { value: "ecommerce-development", label: "E-commerce Development" },
  { value: "crm-development", label: "CRM Development" },
  { value: "erp-development", label: "ERP Development" },
  { value: "ai-automation", label: "AI Automation" },
  { value: "custom-software", label: "Custom Software" },
  { value: "other", label: "Other" },
] as const;

export const QUOTE_BUDGETS = [
  { value: "below-25k", label: "Below ₹25,000" },
  { value: "25k-50k", label: "₹25,000–₹50,000" },
  { value: "50k-75k", label: "₹50,000–₹75,000" },
  { value: "75k-150k", label: "₹75,000–₹1,50,000" },
  { value: "above-150k", label: "₹1,50,000+" },
  { value: "need-consultation", label: "Need consultation" },
] as const;

// Same budget bands as QUOTE_BUDGETS, labelled in the currency the visitor chose on the pricing page.
const QUOTE_BUDGETS_BY_CURRENCY: Record<string, readonly Option[]> = {
  INR: QUOTE_BUDGETS,
  USD: [
    { value: "below-25k", label: "Below $400" },
    { value: "25k-50k", label: "$400–$800" },
    { value: "50k-75k", label: "$800–$1,200" },
    { value: "75k-150k", label: "$1,200–$2,400" },
    { value: "above-150k", label: "$2,400+" },
    { value: "need-consultation", label: "Need consultation" },
  ],
  SGD: [
    { value: "below-25k", label: "Below S$515" },
    { value: "25k-50k", label: "S$515–S$1,025" },
    { value: "50k-75k", label: "S$1,025–S$1,550" },
    { value: "75k-150k", label: "S$1,550–S$3,075" },
    { value: "above-150k", label: "S$3,075+" },
    { value: "need-consultation", label: "Need consultation" },
  ],
  MYR: [
    { value: "below-25k", label: "Below RM 1,625" },
    { value: "25k-50k", label: "RM 1,625–RM 3,250" },
    { value: "50k-75k", label: "RM 3,250–RM 4,875" },
    { value: "75k-150k", label: "RM 4,875–RM 9,750" },
    { value: "above-150k", label: "RM 9,750+" },
    { value: "need-consultation", label: "Need consultation" },
  ],
};

export const QUOTE_CURRENCIES = ["INR", "USD", "SGD", "MYR"] as const;

export function quoteBudgetOptions(currency?: string): readonly Option[] {
  return (currency && QUOTE_BUDGETS_BY_CURRENCY[currency]) || QUOTE_BUDGETS;
}

export const QUOTE_TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "flexible", label: "Flexible" },
  { value: "exploring", label: "Exploring" },
] as const;

export const COMPANY_SIZES = [
  { value: "1-10", label: "1–10 people" },
  { value: "11-50", label: "11–50 people" },
  { value: "51-200", label: "51–200 people" },
  { value: "200-plus", label: "More than 200 people" },
] as const;

export const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "tamil", label: "Tamil" },
] as const;

type Option = { readonly value: string; readonly label: string };

export function allowed(options: readonly Option[]): Set<string> {
  return new Set(options.map((o) => o.value));
}

export function labelFor(options: readonly Option[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export const LIMITS = {
  description: 2000,
  requirements: 3000,
  name: 100,
  email: 254,
  phone: 20,
  company: 150,
  utm: 100,
  referrer: 300,
  sourcePage: 200,
  landingPage: 200,
} as const;

export type QuoteInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  currency?: string;
  timeline: string;
  requirements: string;
  website: string; // Honeypot
  sourcePage: string;
  landingPage: string;
  referrer: string;
  utm: Record<string, string>;
};

export type QuoteRecord = {
  id: string;
  formType: "quote-enquiry";
  timestamp: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  currency?: string;
  timeline: string;
  requirements: string;
  market: string;
  sourcePage: string;
  landingPage: string;
  referrer: string;
  utm: Record<string, string>;
};

export type LeadInput = {
  needs: string[];
  description: string;
  situation: string;
  timeline: string;
  budget: string;
  companySize: string;
  market: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  contactMethod: string;
  language: string;
  consent: boolean;
  // Hidden honeypot. Real users leave it empty.
  website: string;
  sourcePage: string;
  // First page of the visitor's session (first-touch attribution).
  landingPage: string;
  referrer: string;
  utm: Record<string, string>;
  contextService: string;
  contextAgent: string;
};

export type LeadRecord = {
  id: string;
  formType: "start-a-project";
  timestamp: string;
  needs: string[];
  description: string;
  situation: string;
  timeline: string;
  budget: string;
  companySize: string;
  market: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  contactMethod: string;
  language: string;
  consent: boolean;
  sourcePage: string;
  // First page of the visitor's session (first-touch attribution).
  landingPage: string;
  referrer: string;
  utm: Record<string, string>;
  contextService: string;
  contextAgent: string;
};
