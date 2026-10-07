import { Boxes, ChartColumn, Cloud, CodeXml, Globe, Monitor, PenTool, Rocket, Smartphone, Sparkles, Users, Workflow, type LucideIcon } from "lucide-react";

// One icon per service slug, shared by every card that links to a service.
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "ai-solutions": Sparkles,
  "ai-automation": Workflow,
  "business-analytics": ChartColumn,
  "crm-development": Users,
  "erp-software-development": Boxes,
  "custom-software-development": CodeXml,
  "web-application-development": Globe,
  "mobile-app-development": Smartphone,
  "saas-development": Cloud,
  "desktop-application-development": Monitor,
  "ui-ux-design": PenTool,
  "mvp-development": Rocket,
};

