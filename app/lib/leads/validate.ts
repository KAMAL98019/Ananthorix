import {
  allowed,
  BUDGETS,
  COMPANY_SIZES,
  CONTACT_METHODS,
  LANGUAGES,
  LIMITS,
  NEEDS,
  SITUATIONS,
  TIMELINES,
  type LeadInput,
} from "./schema";

// Server-side validation is authoritative. Client checks are only for UX.
// Inputs are checked against allowlists and length limits, then cleaned to plain text.
// Output is never placed into HTML by this module. Email templates escape it separately.

export type ValidationResult =
  | { ok: true; data: LeadInput }
  | { ok: false; errors: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Anantorix is India-only for now, so every brief is recorded against India. Not user-selectable.
const MARKET = "india";

// Removes control characters (keeps newlines in long text), collapses runs of spaces, trims.
export function cleanText(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  const pattern = multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;
  const stripped = value.replace(pattern, "").replace(/[ \t]+/g, " ").trim();
  return stripped.slice(0, max);
}

function cleanList(value: unknown, options: Set<string>, max = 10): string[] {
  if (!Array.isArray(value)) return [];
  const unique = new Set<string>();
  for (const item of value) {
    if (typeof item === "string" && options.has(item)) unique.add(item);
  }
  return [...unique].slice(0, max);
}

function cleanEnum(value: unknown, options: Set<string>): string {
  return typeof value === "string" && options.has(value) ? value : "";
}

function cleanUtm(value: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!value || typeof value !== "object") return out;
  for (const key of ["source", "medium", "campaign", "term", "content"]) {
    const v = (value as Record<string, unknown>)[key];
    const cleaned = cleanText(v, LIMITS.utm);
    if (cleaned) out[key] = cleaned;
  }
  return out;
}

export function validateLead(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: { form: "Please complete the brief and try again." } };
  }
  const input = raw as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const needs = cleanList(input.needs, allowed(NEEDS));
  if (needs.length === 0) errors.needs = "Choose at least one option.";

  const description = cleanText(input.description, LIMITS.description, true);
  if (description.length < 10) errors.description = "Describe the project in at least 10 characters.";

  const situation = cleanEnum(input.situation, allowed(SITUATIONS));
  if (!situation) errors.situation = "Choose the situation that fits best.";

  const timeline = cleanEnum(input.timeline, allowed(TIMELINES));
  if (!timeline) errors.timeline = "Choose a timeline.";

  const budget = cleanEnum(input.budget, allowed(BUDGETS)) || "";

  const companySize = cleanEnum(input.companySize, allowed(COMPANY_SIZES));
  if (!companySize) errors.companySize = "Choose a company size.";

  const name = cleanText(input.name, LIMITS.name);
  if (name.length < 2) errors.name = "Enter your name.";

  const email = cleanText(input.email, LIMITS.email).toLowerCase();
  if (!EMAIL.test(email)) errors.email = "Enter a valid work email address.";

  const phone = cleanText(input.phone, LIMITS.phone);
  if (phone && !/^\+?[0-9\s()-]{7,20}$/.test(phone)) errors.phone = "Enter a valid phone number, or leave it empty.";

  const company = cleanText(input.company, LIMITS.company);
  if (company.length < 2) errors.company = "Enter your company name.";

  const contactMethod = cleanEnum(input.contactMethod, allowed(CONTACT_METHODS));
  if (!contactMethod) errors.contactMethod = "Choose how you would like us to contact you.";
  if ((contactMethod === "phone" || contactMethod === "whatsapp") && !phone) {
    errors.phone = "Add a phone number so we can reach you that way.";
  }

  const language = cleanEnum(input.language, allowed(LANGUAGES));
  if (!language) errors.language = "Choose a call language.";

  if (input.consent !== true) errors.consent = "Please agree before sending your brief.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      needs,
      description,
      situation,
      timeline,
      budget,
      companySize,
      market: MARKET,
      name,
      email,
      phone,
      company,
      contactMethod,
      language,
      consent: true,
      website: cleanText(input.website, 200),
      sourcePage: cleanText(input.sourcePage, LIMITS.sourcePage),
      referrer: cleanText(input.referrer, LIMITS.referrer),
      utm: cleanUtm(input.utm),
      contextService: cleanText(input.contextService, 100),
      contextAgent: cleanText(input.contextAgent, 100),
    },
  };
}
