// Indicative pricing and commercial terms for Anantorix Technologies.
// Preserves brand identity: Cosmic Deep Blue, Cosmic Indigo, Divine Gold, Starlight White, Nebula Purple.
// All prices are indicative and subject to specific project requirements.

export type CurrencyCode = "INR" | "USD" | "SGD" | "MYR";

export type CurrencyInfo = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  country: string;
};

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  INR: { code: "INR", label: "India (₹)", symbol: "₹", country: "India" },
  USD: { code: "USD", label: "USD ($)", symbol: "$", country: "United States" },
  SGD: { code: "SGD", label: "Singapore (S$)", symbol: "S$", country: "Singapore" },
  MYR: { code: "MYR", label: "Malaysia (RM)", symbol: "RM", country: "Malaysia" },
};

export type PricingTier = {
  name: string;
  price: string;
  prices?: Record<CurrencyCode, string>;
  period?: string;
  popular?: boolean;
  tagline: string;
  inclusions: string[];
  ctaLabel?: string;
  // Where the card's button goes. Defaults to the quote form on the pricing page.
  href?: string;
};

export type PricingCategory = {
  id: string;
  title: string;
  eyebrow: string;
  lead: string;
  disclaimer?: string;
  tiers: PricingTier[];
  featuresOrModulesTitle?: string;
  featuresOrModules?: { title: string; description: string }[];
  relatedServiceHref: string;
  relatedServiceLabel: string;
};

export const WEBSITE_PRICING: PricingCategory = {
  id: "website-development",
  title: "Website Development",
  eyebrow: "Web Presence & Growth",
  lead: "High-performance, modern business websites engineered with fast load times, clean responsive layouts, and conversion-focused architecture.",
  disclaimer: "Indicative pricing for design, development, and launch. Hosting, domain registration, and third-party services are quoted separately.",
  relatedServiceHref: "/services/web-application-development",
  relatedServiceLabel: "Explore Web Engineering",
  featuresOrModulesTitle: "Key Inclusions Across All Website Packages",
  featuresOrModules: [
    { title: "Responsive Design", description: "Flawless rendering and touch-optimized navigation across desktop, tablet, and mobile screens." },
    { title: "Custom UI/UX", description: "Bespoke design aligned with your brand identity, typography, and customer expectations—never generic templates." },
    { title: "Contact & Lead Forms", description: "Direct lead capture with validation, spam filtering, and instant notifications to your inbox." },
    { title: "WhatsApp Integration", description: "Click-to-chat integration allowing prospective clients to initiate direct WhatsApp conversations." },
    { title: "SEO-Friendly Structure", description: "Clean semantic HTML, schema metadata, fast Core Web Vitals, and search-crawler indexability." },
    { title: "Performance Optimization", description: "Optimized image compression, asset minification, and caching for sub-second page loads." },
    { title: "Deployment Assistance", description: "End-to-end setup and launch on your preferred cloud or hosting environment with SSL." },
  ],
  tiers: [
    {
      name: "Business Website",
      price: "₹25,000–₹30,000",
      prices: {
        INR: "₹25,000–₹30,000",
        USD: "$300–$360",
        SGD: "S$400–S$480",
        MYR: "RM 1,300–RM 1,600",
      },
      tagline: "Ideal for growing businesses and professional practices establishing a credible digital footprint.",
      inclusions: [
        "Up to 5 custom-designed pages",
        "Responsive mobile & tablet layout",
        "Lead capture contact form",
        "WhatsApp click-to-chat integration",
        "Core on-page SEO setup",
        "Performance & security optimization",
        "Deployment on your hosting server",
      ],
    },
    {
      name: "Professional Website",
      price: "₹30,000–₹40,000",
      prices: {
        INR: "₹30,000–₹40,000",
        USD: "$360–$480",
        SGD: "S$480–S$620",
        MYR: "RM 1,600–RM 2,100",
      },
      popular: true,
      tagline: "Engineered for established companies requiring multi-page service catalogues and rich content.",
      inclusions: [
        "Up to 10 custom-designed pages",
        "Custom interactive components & UI animations",
        "Multi-service showcase & portfolio galleries",
        "Dynamic inquiry forms with routing",
        "Technical SEO & schema structured data",
        "Google Analytics 4 & Search Console setup",
        "Content delivery assistance & launch support",
      ],
    },
    {
      name: "Premium Website",
      price: "₹40,000–₹50,000+",
      prices: {
        INR: "₹40,000–₹50,000+",
        USD: "$480–$600+",
        SGD: "S$620–S$780+",
        MYR: "RM 2,100–RM 2,600+",
      },
      tagline: "Tailored digital experiences with advanced custom interactions, portals, or extensive catalogues.",
      inclusions: [
        "15+ custom pages or dynamic layouts",
        "Bespoke motion design & micro-interactions",
        "Advanced lead triage & CRM integration hook",
        "Multi-location or multi-service routing",
        "Deep technical SEO & accessibility audit",
        "Speed optimization for 95+ PageSpeed scores",
        "Dedicated handover session & documentation",
      ],
    },
  ],
};

export const CRM_ERP_PRICING: PricingCategory = {
  id: "crm-erp-development",
  title: "CRM & ERP Development",
  eyebrow: "Operational Systems",
  lead: "Tailored operational software that connects your sales pipelines, customer interactions, inventory, billing, and team workflows in one unified system.",
  disclaimer: "Indicative investment based on scope and module count. Final quote provided after technical workflow mapping.",
  relatedServiceHref: "/services/crm-development",
  relatedServiceLabel: "Explore CRM & ERP Solutions",
  featuresOrModulesTitle: "Available Business Modules & Workflow Capabilities",
  featuresOrModules: [
    { title: "Customer Management", description: "Centralized account records, conversation history, customer profiles, and custom data fields." },
    { title: "Lead Management & Pipelines", description: "Multi-stage pipeline tracking, deal assignment, follow-up alerts, and conversion metrics." },
    { title: "Inventory Management", description: "Stock tracking across warehouses or branches, reorder alerts, batch numbers, and stock movements." },
    { title: "Sales & Purchase Cycles", description: "Order creation, purchase requisitions, supplier tracking, and fulfillment tracking in one flow." },
    { title: "Billing & Quotations", description: "Generate PDF quotes, proforma invoices, GST-compliant tax invoices, and payment status updates." },
    { title: "Employee & Role Management", description: "Granular role-based permissions, staff directory, shift notes, and activity audit trails." },
    { title: "Analytics & Reporting", description: "Executive KPI dashboards, sales velocity reports, operational throughput, and data exports." },
    { title: "Workflow Automation", description: "Automated status transitions, notification triggers, reminder emails, and task assignments." },
  ],
  tiers: [
    {
      name: "Starter Business System",
      price: "₹75,000–₹90,000",
      prices: {
        INR: "₹75,000–₹90,000",
        USD: "$900–$1,100",
        SGD: "S$1,180–S$1,400",
        MYR: "RM 3,900–RM 4,700",
      },
      tagline: "Custom CRM or single-workflow business tool to replace scattered spreadsheets and manual work.",
      inclusions: [
        "Customer & lead management database",
        "Visual sales pipeline & deal stages",
        "Quotation generation & basic billing",
        "Role-based access (Admins & Staff)",
        "WhatsApp & email notification triggers",
        "Data import from existing spreadsheets",
        "Staff training & deployment assistance",
      ],
    },
    {
      name: "Professional Business System",
      price: "₹90,000–₹1,20,000",
      prices: {
        INR: "₹90,000–₹1,20,000",
        USD: "$1,100–$1,450",
        SGD: "S$1,400–S$1,900",
        MYR: "RM 4,700–RM 6,300",
      },
      popular: true,
      tagline: "Multi-module operational system connecting sales, inventory, purchase orders, and customer management.",
      inclusions: [
        "Everything in Starter System",
        "Inventory tracking & multi-location stock",
        "Purchase orders & supplier management",
        "GST-compliant invoicing & payment tracking",
        "Executive operational dashboard & reports",
        "Custom business workflow automations",
        "User role permissions & audit logging",
      ],
    },
    {
      name: "Advanced Enterprise System",
      price: "₹1,20,000–₹1,50,000+",
      prices: {
        INR: "₹1,20,000–₹1,50,000+",
        USD: "$1,450–$1,800+",
        SGD: "S$1,900–S$2,350+",
        MYR: "RM 6,300–RM 7,900+",
      },
      tagline: "Comprehensive end-to-end ERP orchestrating operations, production, employee workflows, and deep analytics.",
      inclusions: [
        "Full ERP modular suite (Sales, Stock, Purchase, HR, Finance)",
        "Multi-tier approval workflows & departmental access",
        "Accounting system data sync & API connectors",
        "Employee records, attendance, and shift inputs",
        "Advanced custom analytics, charts & automated exports",
        "High-concurrency database architecture & daily backups",
        "Phased rollout strategy & dedicated change-management support",
      ],
    },
  ],
};

export const AI_AUTOMATION_PRICING: PricingCategory = {
  id: "ai-automation",
  title: "AI & Business Automation",
  eyebrow: "Intelligent Systems",
  lead: "Practical AI assistants, conversational chatbots, and automated workflows designed to solve specific operational bottlenecks and accelerate customer response.",
  disclaimer: "Third-party LLM API and usage charges (such as OpenAI, Anthropic, or cloud compute) are separate and billed directly to your account unless specified in the project proposal.",
  relatedServiceHref: "/services/ai-solutions",
  relatedServiceLabel: "Explore AI Solutions",
  featuresOrModulesTitle: "Implementation Standards & Architecture",
  featuresOrModules: [
    { title: "Grounded on Your Data", description: "Custom retrieval and context grounding using your internal product catalogues, FAQs, or manuals." },
    { title: "Human-in-the-Loop Safeguards", description: "Actions affecting orders, payments, or sensitive data always require human verification." },
    { title: "Multi-Channel Connectivity", description: "Seamless deployment across your website, WhatsApp Business API, email, or internal tools." },
    { title: "Privacy & Data Boundaries", description: "Strict isolation ensuring your business data remains confidential and is never used for model training." },
  ],
  tiers: [
    {
      name: "AI Chatbot Integration",
      price: "₹20,000–₹35,000",
      prices: {
        INR: "₹20,000–₹35,000",
        USD: "$240–$420",
        SGD: "S$310–S$550",
        MYR: "RM 1,050–RM 1,850",
      },
      tagline: "Intelligent conversational bot embedded on your website to answer visitor inquiries 24/7.",
      inclusions: [
        "Grounded on your company knowledge base & FAQs",
        "Polite, on-brand conversational flow",
        "Lead contact capture & email notification",
        "Website widget with branded design",
        "Handover to human agent fallback",
        "Initial prompt tuning & testing",
      ],
    },
    {
      name: "AI Customer Support",
      price: "₹30,000–₹60,000",
      prices: {
        INR: "₹30,000–₹60,000",
        USD: "$360–$720",
        SGD: "S$480–S$940",
        MYR: "RM 1,600–RM 3,150",
      },
      tagline: "Automated support system handling tier-1 inquiries, order questions, and ticket triage.",
      inclusions: [
        "Deep knowledge base integration (PDFs, docs, tables)",
        "Ticket classification & sentiment routing",
        "WhatsApp Business or web chat deployment",
        "Order status & inquiry lookups via API",
        "Admin dashboard to review chat transcripts",
        "Continuous accuracy tuning in first 30 days",
      ],
    },
    {
      name: "AI Lead Automation",
      price: "₹25,000–₹50,000",
      prices: {
        INR: "₹25,000–₹50,000",
        USD: "$300–$600",
        SGD: "S$390–S$780",
        MYR: "RM 1,300–RM 2,600",
      },
      popular: true,
      tagline: "Automate inbound inquiry triage, lead scoring, and instant WhatsApp/email qualification.",
      inclusions: [
        "Multi-channel lead ingestion (Website, WhatsApp, Forms)",
        "Intelligent intent classification & budget scoring",
        "Automated personalized qualification questions",
        "Instant routing to right sales rep or meeting scheduler",
        "CRM data insertion & pipeline update",
        "Daily qualification digest for sales leadership",
      ],
    },
    {
      name: "Custom AI Assistant",
      price: "₹50,000–₹1,50,000+",
      prices: {
        INR: "₹50,000–₹1,50,000+",
        USD: "$600–$1,800+",
        SGD: "S$780–S$2,350+",
        MYR: "RM 2,600–RM 7,900+",
      },
      tagline: "Bespoke AI agent custom-engineered to automate multi-step internal tasks and document workflows.",
      inclusions: [
        "Autonomous multi-step task execution with human controls",
        "Document parsing, extraction & reconciliation (invoices, bids)",
        "Internal system & database querying in natural language",
        "Custom workflow orchestration & API tool-use",
        "Strict enterprise security boundaries & role permissions",
        "Dedicated architectural review & proof-of-concept pilot",
      ],
    },
  ],
};

export type MaintenancePlan = {
  name: string;
  price: string;
  prices?: Record<CurrencyCode, string>;
  period: string;
  popular?: boolean;
  idealFor: string;
  scope: string[];
  exclusions: string[];
};

export const MAINTENANCE_PRICING: MaintenancePlan[] = [
  {
    name: "Website Care",
    price: "₹1,499",
    prices: {
      INR: "₹1,499",
      USD: "$19",
      SGD: "S$25",
      MYR: "RM 79",
    },
    period: "/month",
    idealFor: "Standard business websites needing reliability, regular security updates, and peace of mind.",
    scope: [
      "Uptime & availability monitoring",
      "Core framework & security patch updates",
      "Monthly scheduled cloud backup",
      "SSL certificate renewal verification",
      "Small text & image updates (up to 2 hrs/month)",
      "Broken link & performance checks",
    ],
    exclusions: [
      "New feature development or redesigns",
      "Third-party hosting/domain fee renewals",
      "Major page architectural rewrites",
    ],
  },
  {
    name: "Business Care",
    price: "₹2,999",
    prices: {
      INR: "₹2,999",
      USD: "$39",
      SGD: "S$49",
      MYR: "RM 159",
    },
    period: "/month",
    popular: true,
    idealFor: "Active corporate websites, portals, and lead-generation platforms with frequent updates.",
    scope: [
      "Automated uptime monitoring",
      "Weekly automated encrypted cloud backups",
      "Security scanning & patch management",
      "Database optimization & log cleanup",
      "Routine content & UI updates (up to 5 hrs/month)",
      "Form submission & WhatsApp link monitoring",
      "Quarterly performance & Core Web Vitals review",
    ],
    exclusions: [
      "Major custom module engineering",
      "Third-party API subscription costs",
      "Unscheduled out-of-scope feature builds",
    ],
  },
  {
    name: "Application Care",
    price: "₹5,999",
    prices: {
      INR: "₹5,999",
      USD: "$75",
      SGD: "S$95",
      MYR: "RM 315",
    },
    period: "/month",
    idealFor: "Mission-critical CRMs, ERPs, SaaS products, and custom software systems running daily operations.",
    scope: [
      "Real-time health, error & API latency monitoring",
      "Daily automated database and asset backups",
      "Proactive security, dependency, and CVE patching",
      "Database indexing & query performance tuning",
      "Minor feature refinements & bug fixes (up to 10 hrs/month)",
      "Issue resolution & direct developer communication",
      "Monthly health report with infrastructure recommendations",
    ],
    exclusions: [
      "Large-scale software redesign or new system builds",
      "Direct cloud hosting/server charges (AWS, VPS, etc.)",
      "Third-party messaging or API consumption overages",
    ],
  },
];

export const COMMERCIAL_TERMS = [
  {
    title: "Milestone-Based Payment Schedule",
    description: "Standard project payment structure: 50% advance to initiate architecture and design, 30% upon completion of core development milestones for client review, and 20% upon final user acceptance before deployment and final code handover.",
  },
  {
    title: "Third-Party & Infrastructure Charges",
    description: "Hosting servers, domain name registrations, paid third-party APIs (e.g. OpenAI, WhatsApp Business API, SMS gateways), and external software subscriptions are additional and billed directly to the client unless explicitly bundled in the formal proposal.",
  },
  {
    title: "Scope Adjustments & Additional Features",
    description: "The proposal defines the exact deliverable scope. Any additional functionality, third-party integrations, or modifications requested outside the agreed specification are estimated transparently and quoted separately before implementation.",
  },
  {
    title: "Finalized Proposals & Delivery Timelines",
    description: "Indicative pricing helps you assess investment feasibility. Exact fixed budgets, milestones, and delivery timelines are formally established in a detailed statement of work (SOW) after the initial discovery consultation.",
  },
  {
    title: "Defined Maintenance & Support Limits",
    description: "Monthly maintenance packages cover defined operational scope, updates, and hours per month. Unused hours do not roll over. Urgent emergency fixes outside regular hours or major feature expansions are quoted separately.",
  },
  {
    title: "Taxes & Regulatory Compliance",
    description: "All prices are quoted exclusive of applicable statutory taxes (such as GST or local VAT), which will be charged as legally required at the time of invoicing.",
  },
];

export const PRICING_FAQS = [
  {
    q: "Why do project prices vary?",
    a: "Every business has unique operational needs. While a 5-page informational website requires standard design and setup, a custom portal with multi-role permissions, complex database schemas, third-party ERP integrations, or bespoke AI workflows requires substantially deeper architectural engineering, testing, and security hardening. Our indicative pricing gives you a realistic benchmark, and we provide an exact, itemized quotation after mapping your specific requirements.",
  },
  {
    q: "Can I get a custom quotation for my specific project?",
    a: "Yes, absolutely. We encourage you to share your requirements using our Quote Enquiry Form or discuss them on a consultation call. We will review your workflows, recommend the most cost-effective technical approach, and provide a clear, fixed-price proposal with milestone breakdowns and delivery timelines.",
  },
  {
    q: "Are hosting and domain included in the quoted prices?",
    a: "Our pricing covers professional UI/UX design, custom software engineering, testing, and deployment assistance. Domain registration and hosting infrastructure (e.g., VPS, cloud hosting, or managed platforms) are separate costs paid directly to your chosen provider, ensuring you retain 100% direct ownership of your digital assets. We guide you in selecting the most reliable, cost-efficient infrastructure for your scale.",
  },
  {
    q: "Do you offer milestone-based payments?",
    a: "Yes. All custom development projects follow a transparent milestone structure: typically 50% advance upon project kickoff, 30% upon completion and staging of core features for review, and 20% upon final acceptance before production launch and source code handover. For larger enterprise systems, we can tailor a 4-milestone schedule based on sprint deliverables.",
  },
  {
    q: "Can additional features be added during or after development?",
    a: "Yes. We engineer all systems modularly so they can scale smoothly as your business grows. If you need new capabilities during development, we assess the timeline impact and provide a transparent change-order quote. After launch, you can add new features anytime under an ad-hoc sprint or through our ongoing application care plans.",
  },
  {
    q: "Do you provide ongoing maintenance and post-launch support?",
    a: "Yes. Every project includes a post-launch warranty period for bug fixes. Following that, we offer monthly care packages—Website Care (₹1,499/mo | $19/mo), Business Care (₹2,999/mo | $39/mo), and Application Care (₹5,999/mo | $75/mo)—to handle regular updates, security monitoring, cloud backups, and proactive optimizations.",
  },
  {
    q: "Do you use AI in development?",
    a: "We leverage state-of-the-art AI developer tooling internally to accelerate coding, boilerplate scaffolding, and test coverage—passing on speed and cost efficiencies to you. More importantly, every line of production code is rigorously designed, architected, reviewed, and tested by experienced software engineers to ensure enterprise-grade security, clean architecture, and maintainability.",
  },
];
