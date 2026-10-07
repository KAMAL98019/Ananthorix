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

export const BUDGETS = [{ value: "prefer-to-discuss", label: "Prefer to discuss" }] as const;

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
  name: 100,
  email: 254,
  phone: 20,
  company: 150,
  utm: 100,
  referrer: 300,
  sourcePage: 200,
} as const;

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
  referrer: string;
  utm: Record<string, string>;
  contextService: string;
  contextAgent: string;
};
