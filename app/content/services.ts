// Service content for the 12 confirmed service routes. Presentation lives in components.
// Copy is draft until approved by Anantorix. No client names, metrics, testimonials or guarantees.
// Routes are confirmed in the V2 specification. Do not add alternative URLs for these services.

export type UniqueSection =
  | { kind: "list"; title: string; intro: string; items: { title: string; body: string }[] }
  | { kind: "beforeAfter"; title: string; intro: string; before: string[]; after: string[] }
  | { kind: "comparison"; title: string; intro: string; rows: { aspect: string; custom: string; offTheShelf: string }[] }
  | { kind: "dashboard"; title: string; intro: string; panels: { label: string; bars: number[] }[] }
  | { kind: "lifecycle"; title: string; intro: string; stages: { name: string; body: string }[] };

export type ServiceDef = {
  slug: string;
  // Page name. The root layout appends " | Anantorix Technologies".
  metaTitle: string;
  metaDescription: string;
  // Short line used on the services hub.
  summary: string;
  eyebrow: string;
  h1: string;
  lead: string;
  // Labels shown in the hero capability visual.
  heroChips: string[];
  problems: { problem: string; answer: string }[];
  offerings: { name: string; summary: string }[];
  outcomes: { title: string; body: string }[];
  useCases: { title: string; body: string }[];
  unique: UniqueSection;
  delivery: { discover: string[]; design: string[]; build: string[]; launch: string[] };
  differentiators: { title: string; body: string }[];
  // Slugs of related services. Only live routes are rendered.
  related: string[];
  // AI Agent links relevant to this service. Only live routes are rendered.
  agentLinks?: { label: string; href: string }[];
  // Optional extra FAQ entry specific to the service.
  extraFaq?: { q: string; a: string };
};

export const services: ServiceDef[] = [
  {
    slug: "ai-solutions",
    metaTitle: "AI Solutions & Development Company",
    metaDescription: "AI solutions for businesses: readiness workshops, pilots, AI features in existing software, custom assistants and agents.",
    summary: "AI features, assistants and agents built around real business work.",
    eyebrow: "AI & Intelligence",
    h1: "AI solutions that solve real business problems",
    lead: "We start with where AI can help your business most, prove it with a focused pilot, then build the features, assistants and agents that earn their place.",
    heroChips: ["AI readiness", "Pilots", "AI features", "Custom assistants", "Agents", "Data privacy setup"],
    problems: [
      { problem: "Everyone talks about AI, but nobody knows where to start.", answer: "A readiness workshop maps where AI fits, what data you have and what to try first." },
      { problem: "Big AI projects stall before they prove anything.", answer: "A 2–4 week pilot tests one workflow with real users before any wider investment." },
      { problem: "Your existing software has no intelligence in it.", answer: "We add AI features to the tools your team already uses, instead of replacing them." },
    ],
    offerings: [
      { name: "AI readiness workshop", summary: "A structured session to find the best AI opportunities and the data you need." },
      { name: "2–4 week pilot", summary: "One use case built and tested with your team before you scale it." },
      { name: "AI features in existing software", summary: "Intelligence added to your current products and internal tools." },
      { name: "Custom assistants", summary: "Assistants that answer questions and complete tasks using your business context." },
      { name: "Agents", summary: "Software agents that handle a defined job end to end, with people in control." },
      { name: "AI data-privacy setup", summary: "Data boundaries and access rules agreed before any AI system touches your data." },
    ],
    outcomes: [
      { title: "Sell more", body: "Faster responses and better qualification for the enquiries that matter most." },
      { title: "Run smarter", body: "Repeatable decisions and tasks handled with consistency, and reviewed by your team." },
      { title: "Decide faster", body: "Answers from your own business data, available when a decision is due." },
    ],
    useCases: [
      { title: "Lead qualification", body: "Triage incoming enquiries and route the best ones to the right person." },
      { title: "Knowledge assistants", body: "Let staff ask questions about policies, products and procedures in plain language." },
      { title: "Document understanding", body: "Extract the fields your team needs from documents that arrive in volume." },
      { title: "Decision support", body: "Summaries and recommendations that a manager reviews before acting." },
    ],
    unique: {
      kind: "list",
      title: "Where AI fits in your business, by department",
      intro: "The best AI opportunities usually sit in everyday work. Here is where we most often look first.",
      items: [
        { title: "Sales", body: "Lead triage, follow-up drafts and pipeline summaries." },
        { title: "Operations", body: "Exception handling, scheduling checks and status updates." },
        { title: "Finance", body: "Invoice and document processing, with reconciliation checks." },
        { title: "Customer support", body: "Answer suggestions, ticket categorisation and handover notes." },
        { title: "HR", body: "Policy questions, onboarding checklists and document requests." },
        { title: "Leadership", body: "Plain-language answers from business data and weekly summaries." },
      ],
    },
    delivery: {
      discover: ["Readiness workshop notes", "Opportunity shortlist", "Data inventory"],
      design: ["Pilot scope", "Data-access and privacy plan", "Success criteria"],
      build: ["Working pilot", "Evaluation with your team", "Integration plan"],
      launch: ["Production rollout", "Monitoring and review", "Improvement roadmap"],
    },
    differentiators: [
      { title: "Pilot before scale", body: "We prove value on one workflow before committing to a larger build." },
      { title: "Your data, your rules", body: "Data boundaries are agreed before AI touches any business information." },
      { title: "AI inside your tools", body: "Intelligence added to software your team already uses." },
    ],
    related: ["ai-automation", "business-analytics", "custom-software-development"],
    agentLinks: [{ label: "AI Agents", href: "/ai-agents" }],
    extraFaq: {
      q: "How is AI used with my data?",
      a: "We design AI systems around the data boundaries you set, and agree access rules before any system uses your data.",
    },
  },
  {
    slug: "ai-automation",
    metaTitle: "AI Automation Services",
    metaDescription: "AI automation for document processing, enquiry triage, reports, approvals and integrations that remove repetitive work.",
    summary: "Repetitive work handled by software, with your team in control.",
    eyebrow: "AI & Intelligence",
    h1: "Automate the work that slows your business down",
    lead: "We find the repeatable steps that eat your team's time, automate them with AI where it helps, and keep people in control of every decision that matters.",
    heroChips: ["Workflow automation", "Documents", "Enquiry triage", "Reports", "Approvals", "Integrations"],
    problems: [
      { problem: "Your team retypes the same information between systems.", answer: "Integrations move data between tools, so people stop copying it by hand." },
      { problem: "Documents and invoices pile up waiting to be processed.", answer: "Document processing reads the fields your team needs and flags what needs review." },
      { problem: "Approvals and reports wait on one busy person.", answer: "Automated routing and scheduled reports keep work moving without a bottleneck." },
    ],
    offerings: [
      { name: "Workflow automation", summary: "Multi-step processes automated end to end, with checkpoints for people." },
      { name: "Document and invoice processing", summary: "Fields extracted, checked and passed on for review." },
      { name: "Enquiry triage", summary: "Incoming requests sorted, prioritised and routed automatically." },
      { name: "Reports", summary: "Scheduled reports delivered where your team already works." },
      { name: "Approvals", summary: "Requests routed to the right approver, with reminders and an audit trail." },
      { name: "Integrations", summary: "Connections between the systems your business already uses." },
    ],
    outcomes: [
      { title: "Sell more", body: "Enquiries answered and routed faster, so fewer opportunities go cold." },
      { title: "Run smarter", body: "Repetitive steps removed, freeing your team for work that needs judgement." },
      { title: "Decide faster", body: "Reports and status updates arrive on time, without someone chasing them." },
    ],
    useCases: [
      { title: "Invoice processing", body: "Read supplier invoices, check the fields and queue exceptions for review." },
      { title: "Approval workflows", body: "Route purchase or leave requests to the right approver, with reminders." },
      { title: "Lead routing", body: "Send each enquiry to the right owner based on rules your team agrees." },
      { title: "Operations reporting", body: "Compile the weekly numbers automatically and share them on schedule." },
    ],
    unique: {
      kind: "beforeAfter",
      title: "How a workflow changes",
      intro: "A typical invoice-to-payment flow, before and after automation. People still approve; software does the repetitive work.",
      before: [
        "Invoice arrives by email",
        "Someone types the details into the accounts system",
        "A manager is chased for approval",
        "Payment is scheduled by hand",
      ],
      after: [
        "Invoice is read and the fields are extracted",
        "Exceptions are flagged for a person to check",
        "Approval request is routed with reminders",
        "Approved invoices are queued for payment",
      ],
    },
    delivery: {
      discover: ["Process map of the current workflow", "Automation candidates ranked", "Scope and success criteria"],
      design: ["Target workflow design", "Integration map", "Exception and approval rules"],
      build: ["Automated workflow in tested increments", "Integrations", "Operator guide"],
      launch: ["Rollout to one team first", "Monitoring and exception review", "Next automation roadmap"],
    },
    differentiators: [
      { title: "People stay in control", body: "Automation handles the routine. Exceptions and decisions stay with your team." },
      { title: "Built on your systems", body: "We connect to the tools you already use rather than asking you to change them." },
      { title: "Start with one process", body: "We automate one workflow first, prove it, then widen the scope." },
    ],
    related: ["erp-software-development", "custom-software-development", "business-analytics"],
    agentLinks: [{ label: "Business AI Agent", href: "/ai-agents/business-ai-agent" }],
  },
  {
    slug: "business-analytics",
    metaTitle: "Business Analytics Solutions",
    metaDescription: "Business analytics for management dashboards, sales pipeline, inventory and finance reporting, data integration and forecasting.",
    summary: "Clear, current numbers that help leaders decide faster.",
    eyebrow: "AI & Intelligence",
    h1: "See your whole business clearly, every day",
    lead: "We connect the data across your business, build the dashboards leaders actually use, and add forecasting where it will help you plan.",
    heroChips: ["Management dashboards", "Sales pipeline", "Inventory", "Finance reporting", "Data integration", "Forecasting"],
    problems: [
      { problem: "Reports are built by hand and arrive too late to act on.", answer: "Dashboards refresh from your source systems, so the numbers are current when leaders need them." },
      { problem: "Each department has a different version of the truth.", answer: "Data integration brings sales, inventory and finance onto one set of definitions." },
      { problem: "Planning relies on gut feel and last year's spreadsheet.", answer: "Forecasting uses your own history to show likely outcomes and the assumptions behind them." },
    ],
    offerings: [
      { name: "Management dashboards", summary: "The handful of measures leaders review each day, on one screen." },
      { name: "Sales and pipeline analytics", summary: "Where deals stand, where they stall, and what needs attention." },
      { name: "Inventory and finance reporting", summary: "Stock levels, cash position and margin, updated on schedule." },
      { name: "Data integration", summary: "Your systems connected so the same data feeds every report." },
      { name: "Forecasting", summary: "Projections built from your history, with the assumptions shown." },
    ],
    outcomes: [
      { title: "Sell more", body: "Pipeline visibility that shows which deals to focus on this week." },
      { title: "Run smarter", body: "Inventory and finance tracked continuously, not reconciled at month end." },
      { title: "Decide faster", body: "Leaders see current numbers and can act the same day." },
    ],
    useCases: [
      { title: "Sales pipeline review", body: "See stage movement and stalled deals before the weekly meeting." },
      { title: "Inventory planning", body: "Spot slow-moving and low-stock items early." },
      { title: "Monthly finance close", body: "Reconcile the numbers continuously instead of at the end of the month." },
      { title: "Demand forecasting", body: "Plan purchasing and staffing from your own history." },
    ],
    unique: {
      kind: "dashboard",
      title: "A management dashboard, sample layout",
      intro: "Illustrative layout only. The bars show shape, not real figures. Your dashboard is designed around the measures you choose.",
      panels: [
        { label: "Pipeline by stage", bars: [88, 72, 56, 34, 20] },
        { label: "Stock health by category", bars: [64, 90, 42, 28] },
        { label: "Revenue trend by month", bars: [40, 52, 47, 63, 71, 79] },
      ],
    },
    delivery: {
      discover: ["Measures leaders need", "Data source inventory", "Definitions agreed across teams"],
      design: ["Dashboard wireframes", "Data model", "Refresh and access plan"],
      build: ["Integrated data pipeline", "Dashboards in tested increments", "Forecast model with assumptions"],
      launch: ["Rollout to leadership", "Data quality checks", "Improvement roadmap"],
    },
    differentiators: [
      { title: "One version of the truth", body: "Shared definitions so every department reads the same numbers." },
      { title: "Built around decisions", body: "We start with the decisions leaders make, then design the view." },
      { title: "Forecasts you can inspect", body: "Projections show their assumptions, so leaders can challenge them." },
    ],
    related: ["crm-development", "erp-software-development", "ai-solutions"],
    agentLinks: [{ label: "Business AI Agent", href: "/ai-agents/business-ai-agent" }],
  },
  {
    slug: "crm-development",
    metaTitle: "Custom CRM Development",
    metaDescription: "Custom CRM development: pipeline, customization, integrations with WhatsApp and email, customer portals and data migration.",
    summary: "A CRM shaped around how your team sells and serves customers.",
    eyebrow: "Business Systems",
    h1: "A CRM built around how your team actually sells",
    lead: "We design a CRM around your sales process, connect it to the channels your customers use, and migrate your data without losing history.",
    heroChips: ["Custom CRM", "Pipeline", "Customer portals", "WhatsApp and email", "Migration"],
    problems: [
      { problem: "Your CRM was set up for a process you no longer follow.", answer: "We rebuild the pipeline around how your team really works today." },
      { problem: "Customer conversations happen in WhatsApp and email, not the CRM.", answer: "Integrations bring those conversations into the customer record." },
      { problem: "Moving off a spreadsheet or an old system feels too risky.", answer: "A planned migration keeps history, owners and open deals intact." },
    ],
    offerings: [
      { name: "Custom CRM", summary: "A CRM built for your sales and service process, not a generic template." },
      { name: "Customization and integration", summary: "Fields, stages and connections to the tools you already run." },
      { name: "Pipeline", summary: "Stages, owners and follow-ups that match how deals move." },
      { name: "Customer portals", summary: "Secure customer access to orders, documents and status." },
      { name: "WhatsApp and email integration", summary: "Customer messages linked to the right record automatically." },
      { name: "Migration", summary: "Data moved from your current system with checks at every step." },
    ],
    outcomes: [
      { title: "Sell more", body: "Every lead has an owner and a next step, so fewer deals slip away." },
      { title: "Run smarter", body: "Customer history in one place, so no one repeats questions." },
      { title: "Decide faster", body: "Pipeline and activity data your leaders can trust." },
    ],
    useCases: [
      { title: "Lead management", body: "Capture, assign and follow up on every enquiry." },
      { title: "Customer portals", body: "Let customers check order status and documents without calling." },
      { title: "Renewals and service", body: "Track contracts and service requests against each account." },
      { title: "Field and partner visibility", body: "Give partners the customer information they need, and nothing more." },
    ],
    unique: {
      kind: "comparison",
      title: "Custom CRM or off-the-shelf?",
      intro: "Off-the-shelf CRMs are a good fit for common processes. A custom CRM is a better fit when your process is part of your advantage.",
      rows: [
        { aspect: "Fit to your process", custom: "Built around your stages and rules", offTheShelf: "Adapted to the vendor's model" },
        { aspect: "Integrations", custom: "Connected to the tools you use", offTheShelf: "Depends on available connectors" },
        { aspect: "Changes over time", custom: "Changed as your business changes", offTheShelf: "Limited to vendor roadmap" },
        { aspect: "Cost profile", custom: "Scoped to your requirements", offTheShelf: "Per-user subscription" },
      ],
    },
    delivery: {
      discover: ["Sales process map", "Current data and systems review", "Migration risks identified"],
      design: ["Pipeline and data model", "Screens and roles", "Integration plan"],
      build: ["CRM in tested increments", "Integrations", "Migration with reconciliation checks"],
      launch: ["Team training", "Cut-over and support", "Improvement roadmap"],
    },
    differentiators: [
      { title: "Your process, not ours", body: "We configure the CRM around how your team sells, not the reverse." },
      { title: "Conversations in context", body: "Messages and emails attached to the customer, not lost in inboxes." },
      { title: "Migration without loss", body: "Checks at every step so history and open deals come across intact." },
    ],
    related: ["business-analytics", "custom-software-development", "web-application-development"],
    agentLinks: [
      { label: "CRM AI Agent", href: "/ai-agents/crm-ai-agent" },
      { label: "Sales AI Agent", href: "/ai-agents/sales-ai-agent" },
    ],
  },
  {
    slug: "erp-software-development",
    metaTitle: "ERP & Business Software Development",
    metaDescription: "Custom ERP and business software: inventory, purchase and sales, production, HR, accounting integration, billing and modernization.",
    summary: "Operations software that connects inventory, sales, production and finance.",
    eyebrow: "Business Systems",
    h1: "Business software that connects every part of your operations",
    lead: "We build modular business software that matches how your operations really run, and connect it to the accounting and reporting you already depend on.",
    heroChips: ["Custom ERP", "Inventory", "Purchase and sales", "Production", "HR", "Accounting"],
    problems: [
      { problem: "Inventory, sales and accounting live in separate tools.", answer: "A connected system keeps stock, orders and invoices in step automatically." },
      { problem: "Off-the-shelf ERP forces your operations into its shape.", answer: "We build modules around your processes, and add only what you need." },
      { problem: "Your legacy system works, but nobody wants to touch it.", answer: "We modernise it in stages, keeping the parts that work and replacing the ones that don't." },
    ],
    offerings: [
      { name: "Custom ERP", summary: "A business system built around your operations." },
      { name: "Inventory", summary: "Stock tracked across locations, with reorder rules." },
      { name: "Purchase and sales", summary: "Orders, purchases and invoicing connected to stock." },
      { name: "Production", summary: "Work orders, bills of materials and production status." },
      { name: "HR", summary: "Employee records, attendance and payroll inputs." },
      { name: "Accounting integration and billing", summary: "Invoices and ledgers that flow into your accounting system." },
    ],
    outcomes: [
      { title: "Sell more", body: "Orders and quotes handled faster, with stock checked before promises are made." },
      { title: "Run smarter", body: "One system for operations, so data is entered once and used everywhere." },
      { title: "Decide faster", body: "Operational numbers current enough to act on the same day." },
    ],
    useCases: [
      { title: "Multi-location inventory", body: "See stock and movements across warehouses or branches." },
      { title: "Order-to-invoice", body: "Take an order, reserve stock, dispatch and invoice in one flow." },
      { title: "Production tracking", body: "Follow work orders from materials through to finished goods." },
      { title: "Modernising legacy systems", body: "Replace one module at a time without stopping daily operations." },
    ],
    unique: {
      kind: "list",
      title: "Modular ERP: build the modules you need",
      intro: "You do not need every module on day one. We build the ones that remove your biggest bottlenecks and connect the rest as you grow.",
      items: [
        { title: "Inventory", body: "Stock, locations and reorder rules." },
        { title: "Purchase and sales", body: "Orders, quotes and invoices tied to stock." },
        { title: "Production", body: "Work orders and material tracking." },
        { title: "HR", body: "Employee records and attendance." },
        { title: "Accounting integration", body: "Ledger and tax data sent to your accounts system." },
        { title: "Billing", body: "Recurring and one-off invoices, with reminders." },
      ],
    },
    delivery: {
      discover: ["Operations walkthrough", "Current systems and data review", "Module priorities"],
      design: ["Module architecture", "Data model and integration plan", "Roles and approval rules"],
      build: ["Modules in tested increments", "Accounting integration", "Data migration with checks"],
      launch: ["Phased rollout by department", "Support and training", "Module roadmap"],
    },
    differentiators: [
      { title: "Modules, not a monolith", body: "Add capabilities as you need them, without a big-bang replacement." },
      { title: "Works with your accounts", body: "Integrated with the accounting system you already use." },
      { title: "Modernisation in stages", body: "Keep what works and replace what doesn't, one part at a time." },
    ],
    related: ["business-analytics", "ai-automation", "desktop-application-development"],
  },
  {
    slug: "custom-software-development",
    metaTitle: "Custom Software Development",
    metaDescription: "Custom software development: architecture, API integration, legacy modernization and data engineering for growing businesses.",
    summary: "Software designed around your processes, not forced into a template.",
    eyebrow: "Business Systems",
    h1: "Custom software built around your business",
    lead: "When off-the-shelf tools don't fit how you work, we design and build software around your processes, connect it to what you already run, and plan it to grow.",
    heroChips: ["Architecture", "API integration", "Legacy modernization", "Data engineering"],
    problems: [
      { problem: "Your processes are forced into a tool built for someone else.", answer: "We design software around your processes, so the tool serves the work." },
      { problem: "Systems don't talk to each other.", answer: "API integration connects them, so data is entered once and reused." },
      { problem: "An old system holds critical data and nobody can change it.", answer: "We modernise in stages and keep the data safe while the new system takes over." },
    ],
    offerings: [
      { name: "Architecture", summary: "A sound structure for your software, planned to grow." },
      { name: "API integration", summary: "Connections between your systems and third-party services." },
      { name: "Legacy modernization", summary: "Old systems updated or replaced in planned stages." },
      { name: "Data engineering", summary: "Data pipelines that collect, clean and organise business data." },
    ],
    outcomes: [
      { title: "Sell more", body: "Software that supports the sales and service process you actually run." },
      { title: "Run smarter", body: "Systems connected so work flows without manual transfers." },
      { title: "Decide faster", body: "Clean, consistent data available for reporting and analysis." },
    ],
    useCases: [
      { title: "Internal operations tools", body: "Purpose-built tools for the way your team works." },
      { title: "Partner and supplier portals", body: "Secure exchange of orders, documents and status." },
      { title: "System consolidation", body: "Several tools replaced by one system that fits." },
      { title: "Data pipelines", body: "Reliable movement of data from operations into reporting." },
    ],
    unique: {
      kind: "list",
      title: "What custom software involves",
      intro: "Every engagement starts with how the business works, then builds the technical foundations to support it.",
      items: [
        { title: "Architecture", body: "Structure, security and scalability planned from the start." },
        { title: "API integration", body: "Reliable connections to the systems you depend on." },
        { title: "Legacy modernization", body: "Gradual replacement that protects daily operations." },
        { title: "Data engineering", body: "Pipelines that keep data clean and ready for use." },
      ],
    },
    delivery: {
      discover: ["Business requirements", "Current-system review", "Goals and constraints"],
      design: ["Architecture plan", "Flows and interfaces", "Scope and milestones"],
      build: ["Implementation in tested increments", "Integrations", "Testing and documentation"],
      launch: ["Deployment and handover", "Improvements based on use", "Ongoing support options"],
    },
    differentiators: [
      { title: "Designed around your work", body: "We start with how your business operates, not with a technology choice." },
      { title: "Planned to grow", body: "Architecture chosen so the software can extend as your business does." },
      { title: "Careful with what works", body: "Legacy systems are modernised in stages, protecting data and operations." },
    ],
    related: ["erp-software-development", "web-application-development", "ai-automation", "saas-development"],
  },
  {
    slug: "web-application-development",
    metaTitle: "Web Application Development",
    metaDescription: "Web application development: customer and partner portals, dashboards, booking systems, e-commerce, internal tools and APIs.",
    summary: "Browser-based applications for customers, partners and your own team.",
    eyebrow: "Product Engineering",
    h1: "Web applications built to run your business and scale with it",
    lead: "We build browser-based applications for customers, partners and your own team, designed for daily use and built to grow with your business.",
    heroChips: ["Portals", "Dashboards", "Booking", "E-commerce", "Internal tools", "PWAs", "APIs"],
    problems: [
      { problem: "Customers and partners rely on email and phone calls for everything.", answer: "A portal gives them secure access to orders, documents and status." },
      { problem: "Internal tools are spreadsheets that break as you grow.", answer: "A purpose-built internal application replaces the spreadsheet with shared, controlled data." },
      { problem: "Your online experience doesn't match your business.", answer: "We build the booking, catalogue or account features your customers expect." },
    ],
    offerings: [
      { name: "Portals", summary: "Secure customer and partner access to the information they need." },
      { name: "Dashboards", summary: "Live views of operations for managers and teams." },
      { name: "Booking systems", summary: "Availability, reservations and reminders in one place." },
      { name: "E-commerce", summary: "Catalogue, checkout and order management built for your products." },
      { name: "Internal tools", summary: "Applications that replace spreadsheets and manual workarounds." },
      { name: "Progressive web apps and APIs", summary: "Installable web experiences and the interfaces that connect systems." },
    ],
    outcomes: [
      { title: "Sell more", body: "Customers can book, buy or check status at any hour." },
      { title: "Run smarter", body: "Internal work moves into one shared system, not scattered files." },
      { title: "Decide faster", body: "Dashboards show the state of operations as it changes." },
    ],
    useCases: [
      { title: "Customer self-service", body: "Orders, invoices and account details available without a phone call." },
      { title: "Partner onboarding", body: "Partners submit and track documents through a controlled portal." },
      { title: "Appointment booking", body: "Real availability, confirmations and reminders." },
      { title: "Operations dashboards", body: "Live queues and status for the team on shift." },
    ],
    unique: {
      kind: "list",
      title: "Types of business web applications",
      intro: "Most business web applications fall into one of these families. We often combine two or three.",
      items: [
        { title: "Portals", body: "Secure access for customers, partners or suppliers." },
        { title: "Dashboards", body: "Live operational views for managers." },
        { title: "Booking", body: "Scheduling with availability and reminders." },
        { title: "E-commerce", body: "Catalogue, cart and order management." },
        { title: "Internal tools", body: "Workflows and records for your own team." },
        { title: "PWAs and APIs", body: "Installable web apps and the interfaces behind them." },
      ],
    },
    delivery: {
      discover: ["User and workflow mapping", "Feature priorities", "Integration requirements"],
      design: ["User flows and screens", "Architecture and data model", "Security and access rules"],
      build: ["Application in tested increments", "Integrations and APIs", "Performance and accessibility checks"],
      launch: ["Deployment and handover", "Monitoring and improvements", "Support options"],
    },
    differentiators: [
      { title: "Designed for daily use", body: "Screens built around the tasks people do every day." },
      { title: "Secure by design", body: "Access rules and data boundaries planned from the start." },
      { title: "Grows with you", body: "Architecture planned so new features don't need a rewrite." },
    ],
    related: ["saas-development", "ui-ux-design", "mobile-app-development"],
  },
  {
    slug: "mobile-app-development",
    metaTitle: "Mobile App Development",
    metaDescription: "Mobile app development for iOS and Android: customer apps, field-team apps, cross-platform builds and ongoing maintenance.",
    summary: "iOS and Android apps for customers and field teams.",
    eyebrow: "Product Engineering",
    h1: "Mobile apps your customers and teams will actually use",
    lead: "We build iOS and Android apps for customers and field teams, designed around real tasks on a phone and maintained as the platforms change.",
    heroChips: ["iOS", "Android", "Cross-platform", "Field teams", "Customer apps", "Maintenance"],
    problems: [
      { problem: "Customers want to order or book from their phone, and you have no app.", answer: "A customer app built around the few tasks people do most on mobile." },
      { problem: "Field teams rely on paper, calls and delayed updates.", answer: "A field app that works on the job, with updates synced when connectivity returns." },
      { problem: "A mobile app was built once and now doesn't keep up.", answer: "Maintenance keeps the app compatible with new OS versions and devices." },
    ],
    offerings: [
      { name: "iOS and Android apps", summary: "Native-quality apps for both major platforms." },
      { name: "Cross-platform apps", summary: "One codebase for both platforms where it fits the product." },
      { name: "Field-team apps", summary: "Tools for teams working away from the office." },
      { name: "Customer apps", summary: "Ordering, booking and account features on the phone." },
      { name: "Maintenance", summary: "Updates for platform changes, bugs and new features." },
    ],
    outcomes: [
      { title: "Sell more", body: "Customers can order or book at the moment they decide to." },
      { title: "Run smarter", body: "Field work recorded where it happens, not later on paper." },
      { title: "Decide faster", body: "Field data arrives while it is still current." },
    ],
    useCases: [
      { title: "Field inspections", body: "Checklists and photos captured on site and synced later." },
      { title: "Sales visits", body: "Customer records and orders available while visiting." },
      { title: "Customer ordering", body: "Reorders and account status on the phone." },
      { title: "Service requests", body: "Customers raise and track requests from the app." },
    ],
    unique: {
      kind: "list",
      title: "When mobile is the right business interface",
      intro: "A mobile app is worth it when the work or the customer is on the move. It is not always the right answer.",
      items: [
        { title: "Work happens on site", body: "Inspections, deliveries and visits need a device in the hand." },
        { title: "Customers order often", body: "Frequent repeat tasks justify a dedicated app." },
        { title: "Offline work matters", body: "Data is captured without signal and synced later." },
        { title: "Camera and location matter", body: "Photos, signatures and location are part of the process." },
      ],
    },
    delivery: {
      discover: ["User task analysis", "Device and platform decisions", "Offline and data requirements"],
      design: ["Mobile flows and screens", "Architecture and sync design", "Release plan"],
      build: ["App in tested builds", "Backend and integrations", "Store-ready releases"],
      launch: ["Store release and rollout", "Maintenance and updates", "Feature roadmap"],
    },
    differentiators: [
      { title: "Built for the phone", body: "Flows designed for one-handed use on the move." },
      { title: "Works offline", body: "Sync planned so field work is not lost without a signal." },
      { title: "Maintained over time", body: "Platform changes and updates handled after launch." },
    ],
    related: ["web-application-development", "ui-ux-design"],
  },
  {
    slug: "saas-development",
    metaTitle: "SaaS Development Company",
    metaDescription: "SaaS development from idea to scalable product: discovery, multi-tenant setup, subscriptions, admin tools and AI features.",
    summary: "Subscription products built from idea to scale.",
    eyebrow: "Product Engineering",
    h1: "From SaaS idea to scalable product",
    lead: "We help you define the product, build the first version, and set up the foundations for subscriptions, multiple customers and growth.",
    heroChips: ["Discovery", "Multi-tenant", "Subscriptions", "Admin", "AI features", "Scaling"],
    problems: [
      { problem: "You have a product idea but no clear first version.", answer: "Discovery defines the core problem, the users and the smallest useful release." },
      { problem: "Each customer needs a separate installation, which doesn't scale.", answer: "Multi-tenant architecture lets many customers share one well-run platform, with data kept separate." },
      { problem: "Billing and admin are an afterthought.", answer: "Subscriptions, plans and admin tools are planned from the first release." },
    ],
    offerings: [
      { name: "Discovery and MVP", summary: "Problem, users and first release defined and built." },
      { name: "Multi-tenant setup", summary: "One platform serving many customers, with data separation." },
      { name: "Subscriptions and billing", summary: "Plans, invoices and renewals handled in the product." },
      { name: "Admin", summary: "Tools for your team to manage customers, plans and support." },
      { name: "AI features", summary: "Intelligent features added where they serve the product." },
      { name: "Scaling", summary: "Architecture and operations planned for growth." },
    ],
    outcomes: [
      { title: "Sell more", body: "A product customers can sign up for and pay for without a sales call." },
      { title: "Run smarter", body: "Customer accounts and support managed from one admin area." },
      { title: "Decide faster", body: "Usage and subscription data that show what is working." },
    ],
    useCases: [
      { title: "Vertical software", body: "A product built for one industry's workflow." },
      { title: "Team tools", body: "Subscription software for teams to share and track work." },
      { title: "Marketplace or portal", body: "A platform connecting customers with providers." },
      { title: "Internal platform productised", body: "An internal tool packaged for other companies to use." },
    ],
    unique: {
      kind: "lifecycle",
      title: "Idea → MVP → Launch → Scale",
      intro: "Each stage ends with a decision. You keep control over what comes next.",
      stages: [
        { name: "Idea", body: "Define the problem, the user and the smallest useful release." },
        { name: "MVP", body: "Build the first version and test it with real users." },
        { name: "Launch", body: "Release with subscriptions, onboarding and support in place." },
        { name: "Scale", body: "Improve the product and its architecture as customers grow." },
      ],
    },
    delivery: {
      discover: ["Problem and user definition", "Market and competitor review", "Smallest useful release scope"],
      design: ["Product flows", "Multi-tenant architecture", "Billing and admin design"],
      build: ["Platform in tested increments", "Subscriptions and admin", "Security and access controls"],
      launch: ["Launch and onboarding", "Usage and performance monitoring", "Roadmap for growth"],
    },
    differentiators: [
      { title: "Product-first thinking", body: "We help define what to build before building it." },
      { title: "Architecture for many customers", body: "Multi-tenancy designed in, not bolted on later." },
      { title: "Billing built in", body: "Subscriptions and admin treated as core product features." },
    ],
    related: ["mvp-development", "web-application-development", "ui-ux-design"],
  },
  {
    slug: "desktop-application-development",
    metaTitle: "Desktop Application Development",
    metaDescription: "Desktop application development for Windows, macOS and cross-platform use, including offline work, billing, POS and hardware integration.",
    summary: "Reliable desktop software for offline, billing and hardware-heavy work.",
    eyebrow: "Product Engineering",
    h1: "Reliable desktop software for serious business work",
    lead: "Some business work belongs on the desktop: it runs offline, talks to hardware, or handles heavy data. We build that software to be reliable every day.",
    heroChips: ["Windows", "macOS", "Cross-platform", "Offline", "Billing and POS", "Hardware", "Migration"],
    problems: [
      { problem: "Your work must continue when the internet drops.", answer: "Desktop software can run offline and sync when a connection returns." },
      { problem: "Billing or point-of-sale hardware doesn't work with your software.", answer: "We build integrations with printers, scanners and terminals you use." },
      { problem: "An old desktop application is hard to maintain.", answer: "We plan a migration that keeps your data and daily work running." },
    ],
    offerings: [
      { name: "Windows and macOS applications", summary: "Desktop software for the platforms your team uses." },
      { name: "Cross-platform applications", summary: "One codebase for multiple desktop platforms where it fits." },
      { name: "Offline operation", summary: "Local data and sync for work without a connection." },
      { name: "Billing and point of sale", summary: "Counter and billing software for daily transactions." },
      { name: "Hardware integration", summary: "Printers, scanners, readers and other peripherals." },
      { name: "Migration", summary: "Moving from an older desktop application without losing data." },
    ],
    outcomes: [
      { title: "Sell more", body: "Counter and billing work stays fast and reliable at the busiest times." },
      { title: "Run smarter", body: "Hardware and software working together, without manual steps." },
      { title: "Decide faster", body: "Local data available immediately, with reports that stay current." },
    ],
    useCases: [
      { title: "Retail billing", body: "Fast checkout with receipts and stock updates." },
      { title: "Production line software", body: "Machine data and job tracking on the shop floor." },
      { title: "Lab or clinic systems", body: "Records and device integration in controlled environments." },
      { title: "Warehouse operations", body: "Scanning and stock movement with offline resilience." },
    ],
    unique: {
      kind: "list",
      title: "When desktop software is the right choice",
      intro: "Desktop is the right interface when the work depends on local hardware, offline operation or heavy local data.",
      items: [
        { title: "Offline is essential", body: "Work continues without a connection, then syncs." },
        { title: "Hardware is central", body: "Printers, scanners and readers are part of the process." },
        { title: "Speed matters at the counter", body: "Local processing keeps transactions fast." },
        { title: "Data stays local", body: "Some businesses need local control over their records." },
      ],
    },
    delivery: {
      discover: ["Workflow and hardware review", "Offline requirements", "Migration risks"],
      design: ["Application architecture", "Local data and sync design", "Hardware integration plan"],
      build: ["Application in tested builds", "Hardware integrations", "Migration with checks"],
      launch: ["Installation and rollout", "Support and updates", "Improvement roadmap"],
    },
    differentiators: [
      { title: "Works without a connection", body: "Offline operation designed in from the start." },
      { title: "Works with your hardware", body: "Integration with the devices your work depends on." },
      { title: "Safe migration", body: "Data and daily operations protected during change." },
    ],
    related: ["erp-software-development", "custom-software-development"],
  },
  {
    slug: "ui-ux-design",
    metaTitle: "UI/UX Design Services",
    metaDescription: "UI/UX design services: user flows, information architecture, interface design, design systems and usability for business software.",
    summary: "Interfaces that make complex software easier to use.",
    eyebrow: "Supporting capability",
    h1: "Interfaces that make complex software easier to use",
    lead: "Good software is only as good as the experience of using it. We design the flows, structure and interfaces that make complex business work feel clear.",
    heroChips: ["User flows", "Information architecture", "Interface design", "Design systems", "Usability"],
    problems: [
      { problem: "Your software works, but people avoid using it.", answer: "We redesign the flows around the tasks people actually do." },
      { problem: "New staff take weeks to learn the system.", answer: "Clear structure and consistent patterns shorten the learning curve." },
      { problem: "Every screen looks and behaves differently.", answer: "A design system keeps components and patterns consistent across the product." },
    ],
    offerings: [
      { name: "User flows", summary: "The steps people take to complete each task, mapped and tested." },
      { name: "Information architecture", summary: "How content and features are organised and found." },
      { name: "Interface design", summary: "Screens designed for clarity, speed and accessibility." },
      { name: "Design systems", summary: "Reusable components and rules for consistent products." },
      { name: "Usability", summary: "Checks with real users to find where people get stuck." },
    ],
    outcomes: [
      { title: "Sell more", body: "Clear journeys that help customers complete a purchase or request." },
      { title: "Run smarter", body: "Fewer errors and less training when tasks are easy to follow." },
      { title: "Decide faster", body: "Information placed where decisions are made." },
    ],
    useCases: [
      { title: "Redesigning a complex workflow", body: "Simplify a multi-step process people find hard." },
      { title: "Onboarding new users", body: "Guided first-use experience that teaches the system." },
      { title: "Consolidating products", body: "One consistent experience across several tools." },
      { title: "Accessible interfaces", body: "Screens designed to work for more people, including keyboard users." },
    ],
    unique: {
      kind: "list",
      title: "What we design",
      intro: "Design work covers the whole experience, from structure to the final screen.",
      items: [
        { title: "User flows", body: "Tasks mapped step by step." },
        { title: "Information architecture", body: "Navigation and content structure." },
        { title: "Interface design", body: "Screens for clarity and speed." },
        { title: "Design systems", body: "Reusable components and rules." },
        { title: "Usability", body: "Testing with real users." },
        { title: "Product clarity", body: "Language and hierarchy that make the product obvious." },
      ],
    },
    delivery: {
      discover: ["User and task research", "Current experience review", "Goals and constraints"],
      design: ["Flows and structure", "Interface designs", "Design system components"],
      build: ["Prototypes tested with users", "Handover to development", "Accessibility review"],
      launch: ["Rollout support", "Usability review after launch", "Iteration plan"],
    },
    differentiators: [
      { title: "Designed around tasks", body: "We start with what people need to do, not with decoration." },
      { title: "Consistent by default", body: "Design systems keep the product coherent as it grows." },
      { title: "Tested with users", body: "Decisions checked against real behaviour before build." },
    ],
    related: ["web-application-development", "mobile-app-development", "saas-development", "mvp-development"],
  },
  {
    slug: "mvp-development",
    metaTitle: "MVP Development Services",
    metaDescription: "MVP development: discovery, scope definition, prototypes and a usable first release built to validate your product idea.",
    summary: "A usable first release that tests your product idea with real users.",
    eyebrow: "Supporting capability",
    h1: "Turn your product idea into something people can use",
    lead: "An MVP is the smallest version of your product that people can really use. We define it tightly, build it quickly, and use real feedback to decide what comes next.",
    heroChips: ["Discovery", "Scope", "Prototype", "First release", "Validation", "Iteration"],
    problems: [
      { problem: "You have an idea, but a full build feels like a big risk.", answer: "An MVP tests the core idea before you commit to the full product." },
      { problem: "Everything feels essential, so the first version never ships.", answer: "Scope definition sets the smallest release that still solves the core problem." },
      { problem: "You don't know whether users will adopt it.", answer: "Early users test the release, and their feedback shapes the next iteration." },
    ],
    offerings: [
      { name: "Discovery", summary: "The problem, the users and the riskiest assumptions, clarified." },
      { name: "Scope definition", summary: "The smallest useful release, agreed and written down." },
      { name: "Prototype", summary: "A clickable version to test the idea before building it." },
      { name: "Usable first release", summary: "A working product for real users, built in tested increments." },
      { name: "Validation and iteration", summary: "Feedback gathered and turned into the next priorities." },
    ],
    outcomes: [
      { title: "Sell more", body: "A working product to show customers, not just a presentation." },
      { title: "Run smarter", body: "Only the features users need, so effort is not wasted." },
      { title: "Decide faster", body: "Real usage data to decide whether to invest further." },
    ],
    useCases: [
      { title: "Testing a new product idea", body: "Find out whether people want it before building the full product." },
      { title: "Internal tool pilot", body: "Prove a new internal workflow with one team first." },
      { title: "Investor or partner demo", body: "A working product that shows the idea in use." },
      { title: "Replacing a manual process", body: "Start with the most painful step and expand from there." },
    ],
    unique: {
      kind: "list",
      title: "How an MVP gets built",
      intro: "The goal is learning as much as possible for the least effort. Each step narrows the risk.",
      items: [
        { title: "Discovery", body: "Riskiest assumptions identified first." },
        { title: "Scope", body: "The smallest release that solves the core problem." },
        { title: "Prototype", body: "Test the idea before writing production code." },
        { title: "First release", body: "A usable product, built in tested increments." },
        { title: "Validation", body: "Real users give feedback on the release." },
        { title: "Iteration", body: "The next priorities chosen from evidence." },
      ],
    },
    delivery: {
      discover: ["Problem and assumption list", "Users and use cases", "Scope agreed in writing"],
      design: ["Clickable prototype", "Core flows", "Build plan and milestones"],
      build: ["First release in tested increments", "Analytics and feedback capture", "Deployment"],
      launch: ["Release to early users", "Feedback review", "Next iteration plan"],
    },
    differentiators: [
      { title: "Smallest useful release", body: "Scope cut to what tests your core idea, nothing more." },
      { title: "Learning first", body: "Decisions guided by evidence from real users." },
      { title: "Ready to grow", body: "The first release is built so it can become the full product." },
    ],
    related: ["saas-development", "web-application-development", "mobile-app-development", "ui-ux-design"],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

// Routes that are live (rendered and not 404). Related links only render for live routes.
export const liveRoutes = new Set<string>([
  "/",
  "/services",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/ai-agents",
  "/ai-agents/sales-ai-agent",
  "/ai-agents/crm-ai-agent",
  "/ai-agents/business-ai-agent",
  ...serviceSlugs.map((slug) => `/services/${slug}`),
]);

export function isLive(href: string): boolean {
  return liveRoutes.has(href);
}

export const serviceFamilies: {
  title: string;
  description: string;
  slugs: string[];
  agentLink?: { label: string; href: string };
}[] = [
  {
    title: "AI & Intelligence",
    description: "Systems that learn from your data, automate decisions and show you what is happening.",
    slugs: ["ai-solutions", "ai-automation", "business-analytics"],
    agentLink: { label: "Explore the AI Agents", href: "/ai-agents" },
  },
  {
    title: "Business Systems",
    description: "The core software that runs sales, operations and customer work.",
    slugs: ["crm-development", "erp-software-development", "custom-software-development"],
  },
  {
    title: "Product Engineering",
    description: "Applications and products for your customers, your team and the devices they use.",
    slugs: ["web-application-development", "mobile-app-development", "saas-development", "desktop-application-development"],
  },
  {
    title: "Supporting capabilities",
    description: "Design and product thinking that shape everything above.",
    slugs: ["ui-ux-design", "mvp-development"],
  },
];

// Generic FAQ, written so it applies to every service. Service name is inserted where useful.
export function faqFor(service: ServiceDef): { q: string; a: string }[] {
  const items = [
    {
      q: "How much does it cost?",
      a: "We scope each project based on requirements. If you have a budget range, you can share it during the project enquiry.",
    },
    {
      q: "How long does it take?",
      a: "Timelines depend on scope. A discovery phase gives you a realistic plan before the build starts.",
    },
    {
      q: "Can you work with our existing systems?",
      a: "We review what you already use first, then plan how the new work connects to it.",
    },
    {
      q: "Do we own the source code?",
      a: "Ownership of the code and deliverables is set out in writing before work begins, so you know exactly what you own at handover.",
    },
    {
      q: "Do you provide support after launch?",
      a: "Ongoing support is available as an engagement model. Support scope is agreed per project.",
    },
    {
      q: "Can you work with businesses outside India?",
      a: "Anantorix is currently focused on businesses across India. Tell us where your business is based in your brief and we will confirm whether we can work with you.",
    },
  ];
  if (service.extraFaq) items.splice(3, 0, service.extraFaq);
  return items;
}
