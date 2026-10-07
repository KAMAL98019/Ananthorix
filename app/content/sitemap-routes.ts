// Explicit sitemap registry. Only valid, indexable, production pages belong here.
// When a page is built and indexable, add it. Never add a route that returns a placeholder.
//
// Deliberately excluded:
// - /start-a-project/thank-you (non-indexable)
// - /industries, /insights, /careers (Phase 2 hidden / P2)
// - /industries, /projects, /markets until built
// - redirected legacy URLs (/services/custom-software, /services/mobile-apps, /services/desktop-application)

export type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
};

export const indexableRoutes: SitemapRoute[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/ai-solutions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/ai-automation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/business-analytics", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/crm-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/erp-software-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/custom-software-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/web-application-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/mobile-app-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/saas-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/desktop-application-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/ui-ux-design", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/mvp-development", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ai-agents", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ai-agents/sales-ai-agent", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ai-agents/crm-ai-agent", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ai-agents/business-ai-agent", priority: 0.8, changeFrequency: "monthly" },
  { path: "/start-a-project", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/how-we-work", priority: 0.6, changeFrequency: "monthly" },
  { path: "/security-and-data", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
];
