// SEO Enquiry schema and allowed values

export const SEO_PACKAGES_OPTIONS = [
  { value: "seo-starter", label: "SEO Starter (₹5,000–₹8,000/mo)" },
  { value: "seo-growth", label: "SEO Growth (₹8,000–₹15,000/mo)" },
  { value: "seo-advanced", label: "SEO Advanced (₹15,000–₹30,000+/mo)" },
  { value: "custom", label: "Custom SEO Plan" },
  { value: "not-sure", label: "Need Recommendation" },
] as const;

export const SEO_BUDGET_OPTIONS = [
  { value: "below-5k", label: "Below ₹5,000" },
  { value: "5k-8k", label: "₹5,000–₹8,000" },
  { value: "8k-15k", label: "₹8,000–₹15,000" },
  { value: "15k-30k", label: "₹15,000–₹30,000" },
  { value: "above-30k", label: "₹30,000+" },
  { value: "need-consultation", label: "Need Consultation" },
] as const;

export type SeoEnquiryInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  websiteUrl: string;
  industry: string;
  targetLocation: string;
  challenges: string;
  preferredPackage: string;
  budget: string;
  website: string; // Honeypot
  sourcePage: string;
  landingPage: string;
  referrer: string;
  utm: Record<string, string>;
};

export type SeoEnquiryRecord = {
  id: string;
  formType: "seo-enquiry";
  timestamp: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  websiteUrl: string;
  industry: string;
  targetLocation: string;
  challenges: string;
  preferredPackage: string;
  budget: string;
  market: string;
  sourcePage: string;
  landingPage: string;
  referrer: string;
  utm: Record<string, string>;
};

