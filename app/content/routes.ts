// Confirmed routes from the Phase 2 brief. Single source for links across the site.

export type RouteLink = { label: string; href: string };

export const companyRoutes: RouteLink[] = [
  { label: "About", href: "/about" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Security and data", href: "/security-and-data" },
  { label: "Contact", href: "/contact" },
];

export const services: RouteLink[] = [
  { label: "AI Solutions", href: "/services/ai-solutions" },
  { label: "AI Automation", href: "/services/ai-automation" },
  { label: "Business Analytics", href: "/services/business-analytics" },
  { label: "CRM Development", href: "/services/crm-development" },
  { label: "ERP & Business Software", href: "/services/erp-software-development" },
  { label: "Custom Software Development", href: "/services/custom-software-development" },
  { label: "Web Application Development", href: "/services/web-application-development" },
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
  { label: "SaaS Development", href: "/services/saas-development" },
  { label: "Desktop Application Development", href: "/services/desktop-application-development" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "MVP Development", href: "/services/mvp-development" },
];

export const agentRoutes: RouteLink[] = [
  { label: "Sales AI Agent", href: "/ai-agents/sales-ai-agent" },
  { label: "CRM AI Agent", href: "/ai-agents/crm-ai-agent" },
  { label: "Business AI Agent", href: "/ai-agents/business-ai-agent" },
];

export const START_PROJECT = { label: "Start a Project", href: "/start-a-project" } as const;
export const SEE_AGENTS = { label: "See AI Agents", href: "/ai-agents" } as const;
