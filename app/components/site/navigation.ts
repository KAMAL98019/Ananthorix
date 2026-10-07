import { agentRoutes, companyRoutes, services, START_PROJECT, type RouteLink } from "../../content/routes";

export type NavItem = {
  label: string;
  href: string;
  // Items with children open a disclosure panel on click. Hover does nothing.
  children?: RouteLink[];
  // Label for the link at the end of the panel. Defaults to "All <label>".
  allLabel?: string;
};

// Confirmed routes only. Industries and Insights are hidden until real content exists.
export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/services", children: services },
  { label: "AI Agents", href: "/ai-agents", children: agentRoutes, allLabel: "All AI Agents" },
  { label: "Company", href: "/about", children: companyRoutes, allLabel: "Company overview" },
];

export const headerCtas = {
  primary: START_PROJECT,
  // No calendar tool yet: Book a Call goes to the phone and email details on the contact page.
  secondary: { label: "Book a Call", href: "/contact#call" },
} as const;

export const footerExploreNav: RouteLink[] = [
  { label: "Solutions", href: "/services" },
  { label: "AI Agents", href: "/ai-agents" },
  { label: "About", href: "/about" },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;
