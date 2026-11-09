import { cleanText } from "./validate";
import { allowed, LIMITS } from "./schema";
import { SEO_BUDGET_OPTIONS, SEO_PACKAGES_OPTIONS, type SeoEnquiryInput } from "./seoSchema";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

export type SeoValidationResult =
  | { ok: true; data: SeoEnquiryInput }
  | { ok: false; errors: Record<string, string> };

export function validateSeoEnquiry(raw: unknown): SeoValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: { form: "Please complete the SEO consultation form and try again." } };
  }
  const input = raw as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = cleanText(input.name, LIMITS.name);
  if (name.length < 2) errors.name = "Enter your full name.";

  const company = cleanText(input.company, LIMITS.company);
  if (company.length < 2) errors.company = "Enter your company or business name.";

  const email = cleanText(input.email, LIMITS.email).toLowerCase();
  if (!EMAIL.test(email)) errors.email = "Enter a valid work email address.";

  const phone = cleanText(input.phone, LIMITS.phone);
  if (!phone || !/^\+?[0-9\s()-]{7,20}$/.test(phone)) {
    errors.phone = "Enter a valid phone number for SEO consultation.";
  }

  const websiteUrl = cleanText(input.websiteUrl, 250);
  if (!websiteUrl || websiteUrl.length < 4) {
    errors.websiteUrl = "Enter your website URL (e.g., example.com).";
  }

  const industry = cleanText(input.industry, 100);
  if (industry.length < 2) {
    errors.industry = "Enter your business industry or sector.";
  }

  const targetLocation = cleanText(input.targetLocation, 150);
  if (targetLocation.length < 2) {
    errors.targetLocation = "Enter your target locations (e.g., Namakkal, Salem, Erode, Tamil Nadu).";
  }

  const preferredPackage = cleanEnum(input.preferredPackage, allowed(SEO_PACKAGES_OPTIONS));
  if (!preferredPackage) {
    errors.preferredPackage = "Select your preferred SEO package or recommendation.";
  }

  const budget = cleanEnum(input.budget, allowed(SEO_BUDGET_OPTIONS));
  if (!budget) {
    errors.budget = "Select your monthly SEO budget range.";
  }

  const challenges = cleanText(input.challenges, 2000, true);
  if (challenges.length < 10) {
    errors.challenges = "Describe your current SEO challenges or organic goals in at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      company,
      email,
      phone,
      websiteUrl,
      industry,
      targetLocation,
      challenges,
      preferredPackage,
      budget,
      website: cleanText(input.website, 200),
      sourcePage: cleanText(input.sourcePage, LIMITS.sourcePage),
      landingPage: cleanText(input.landingPage, LIMITS.landingPage),
      referrer: cleanText(input.referrer, LIMITS.referrer),
      utm: cleanUtm(input.utm),
    },
  };
}

