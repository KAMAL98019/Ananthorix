// GA4 events. gtag is loaded by the root layout only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set; without it these
// calls do nothing. Never send personal data (name, email, phone, message) to analytics.

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;

function gtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  const fn = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof fn === "function" ? fn : null;
}

// GA4 recommended conversion event. Call only after the server confirms the lead was delivered.
// lead_id is the server's random reference: it lets a lead be matched to its email without any personal data.
export function trackLeadGenerated(params: { leadId: string; needs: string[]; utmSource?: string; landingPage?: string }): boolean {
  const send = gtag();
  if (!send) return false;
  send("event", "generate_lead", {
    form_name: "start_a_project",
    lead_id: params.leadId,
    lead_needs: params.needs.join(","),
    lead_utm_source: params.utmSource ?? "",
    lead_landing_page: params.landingPage ?? "",
  });
  return true;
}
