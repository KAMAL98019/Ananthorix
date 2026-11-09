import { randomUUID } from "node:crypto";
import type { LeadInput, LeadRecord, QuoteInput, QuoteRecord } from "./schema";
import type { SeoEnquiryInput, SeoEnquiryRecord } from "./seoSchema";

// Lead, quote and SEO delivery abstraction.
export interface LeadSubmissionService<T = LeadRecord> {
  submit(record: T): Promise<void>;
}

export function buildLeadRecord(input: LeadInput): LeadRecord {
  return {
    id: randomUUID(),
    formType: "start-a-project",
    timestamp: new Date().toISOString(),
    needs: input.needs,
    description: input.description,
    situation: input.situation,
    timeline: input.timeline,
    budget: input.budget,
    companySize: input.companySize,
    market: input.market,
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    contactMethod: input.contactMethod,
    language: input.language,
    consent: input.consent,
    sourcePage: input.sourcePage,
    landingPage: input.landingPage,
    referrer: input.referrer,
    utm: input.utm,
    contextService: input.contextService,
    contextAgent: input.contextAgent,
  };
}

export function buildQuoteRecord(input: QuoteInput): QuoteRecord {
  return {
    id: randomUUID(),
    formType: "quote-enquiry",
    timestamp: new Date().toISOString(),
    name: input.name,
    company: input.company,
    email: input.email,
    phone: input.phone,
    service: input.service,
    budget: input.budget,
    currency: input.currency,
    timeline: input.timeline,
    requirements: input.requirements,
    market: "India",
    sourcePage: input.sourcePage,
    landingPage: input.landingPage,
    referrer: input.referrer,
    utm: input.utm,
  };
}

export function buildSeoRecord(input: SeoEnquiryInput): SeoEnquiryRecord {
  return {
    id: randomUUID(),
    formType: "seo-enquiry",
    timestamp: new Date().toISOString(),
    name: input.name,
    company: input.company,
    email: input.email,
    phone: input.phone,
    websiteUrl: input.websiteUrl,
    industry: input.industry,
    targetLocation: input.targetLocation,
    challenges: input.challenges,
    preferredPackage: input.preferredPackage,
    budget: input.budget,
    market: "India",
    sourcePage: input.sourcePage,
    landingPage: input.landingPage,
    referrer: input.referrer,
    utm: input.utm,
  };
}
