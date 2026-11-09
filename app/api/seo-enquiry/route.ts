import { handleSeoEnquiry } from "../../lib/leads/seoHandler";
import { nodemailerLeadDelivery } from "../../lib/leads/mail";
import { isAllowed } from "../../lib/leads/rateLimit";

// SEO Enquiry submission endpoint with spam protection, rate limiting, and email dispatch.
export async function POST(request: Request) {
  return handleSeoEnquiry(request, { delivery: nodemailerLeadDelivery, allow: isAllowed });
}

