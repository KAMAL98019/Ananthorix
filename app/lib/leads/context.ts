import { NEEDS, allowed } from "./schema";
import { agents } from "../../content/agents";
import { getService } from "../../content/services";

// Context pass-through for Start a Project. Query values are matched against allowlists only.
// Unknown values are ignored. Direct navigation to /start-a-project still works without any params.

type SearchParams = Record<string, string | string[] | undefined>;

// Aliases from CTAs and service/agent pages to the form's need values.
const NEED_ALIASES: Record<string, string> = {
  "ai-agent": "ai-agent",
  "sales-ai-agent": "ai-agent",
  "crm-ai-agent": "ai-agent",
  "business-ai-agent": "ai-agent",
  "ai-automation": "ai-automation",
  analytics: "analytics",
  crm: "crm",
  erp: "erp",
  "web-app": "web-app",
  "mobile-app": "mobile-app",
  saas: "saas",
  "desktop-app": "desktop-app",
  "not-sure": "not-sure",
};

// Service slugs passed as ?service= map to the closest need. "Not sure" where no option fits exactly.
export const SERVICE_NEED: Record<string, string> = {
  "ai-solutions": "not-sure",
  "ai-automation": "ai-automation",
  "business-analytics": "analytics",
  "crm-development": "crm",
  "erp-software-development": "erp",
  "custom-software-development": "not-sure",
  "web-application-development": "web-app",
  "mobile-app-development": "mobile-app",
  "saas-development": "saas",
  "desktop-application-development": "desktop-app",
  "ui-ux-design": "not-sure",
  "mvp-development": "not-sure",
};

export type StartContext = {
  needs: string[];
  service: string;
  agent: string;
};

function values(params: SearchParams, key: string): string[] {
  const raw = params[key];
  if (raw === undefined) return [];
  return (Array.isArray(raw) ? raw : [raw]).map((v) => v.slice(0, 80));
}

function first(params: SearchParams, key: string): string {
  return values(params, key)[0] ?? "";
}

export function parseStartContext(params: SearchParams): StartContext {
  const needs = new Set<string>();
  let agent = "";

  for (const raw of values(params, "need")) {
    const mapped = NEED_ALIASES[raw];
    if (mapped && allowed(NEEDS).has(mapped)) needs.add(mapped);
    if (agents.some((a) => a.slug === raw)) agent = raw;
  }

  const service = first(params, "service");
  if (service && SERVICE_NEED[service] && getService(service)) {
    needs.add(SERVICE_NEED[service]);
  }

  return {
    needs: [...needs],
    service: service && getService(service) ? service : "",
    agent: agents.some((a) => a.slug === agent) ? agent : "",
  };
}

// Builds a Start a Project URL for a CTA, carrying context safely.
export function startProjectHref(options: { need?: string; service?: string; agent?: string } = {}) {
  const params = new URLSearchParams();
  if (options.need) params.append("need", options.need);
  if (options.service) params.set("service", options.service);
  if (options.agent) params.set("agent", options.agent);
  const query = params.toString();
  return query ? `/start-a-project?${query}` : "/start-a-project";
}
