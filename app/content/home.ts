// Homepage copy. Presentation lives in components; content lives here.
// Copy is draft until approved by Anantorix. It contains no client names, metrics, testimonials or certifications.
import { agentRoutes, services } from "./routes";

export const positioning = "Anantorix builds intelligent digital systems for modern businesses.";
export const manifesto = "We don't just build software. We build intelligent businesses.";
export const heroOutcomes = "Sell more · Run smarter · Decide faster";

export const hero = {
  eyebrow: "Intelligent digital systems",
  headline: "Intelligent AI & Custom Software Solutions for Modern Businesses",
  lead: positioning,
};

export const trust = [
  "Built for sales, operations, finance and leadership teams",
  "Built for businesses across India.",
  "AI, automation, analytics, CRM, ERP, web, mobile and SaaS",
];

export const problems = [
  {
    problem: "Leads come in and slip through the cracks.",
    answer: "AI sales agents respond, qualify and keep follow-up moving until your team takes over.",
    href: "/ai-agents/sales-ai-agent",
    linkLabel: "Sales AI Agent",
  },
  {
    problem: "Your CRM is full of data nobody trusts or acts on.",
    answer: "We build CRM systems and an AI agent that keep records current and point to the next action.",
    href: "/ai-agents/crm-ai-agent",
    linkLabel: "CRM AI Agent",
  },
  {
    problem: "Reports arrive late, so decisions wait.",
    answer: "Business analytics puts the numbers you need in front of the people who decide.",
    href: "/services/business-analytics",
    linkLabel: "Business Analytics",
  },
  {
    problem: "Important work depends on manual, repeated steps.",
    answer: "AI automation takes repeatable steps out of your daily workflow, with people still in control.",
    href: "/services/ai-automation",
    linkLabel: "AI Automation",
  },
  {
    problem: "Off-the-shelf software does not fit how your business works.",
    answer: "Custom software is designed around your processes instead of forcing them into someone else's.",
    href: "/services/custom-software-development",
    linkLabel: "Custom Software",
  },
  {
    problem: "A new product idea needs proof before a large build.",
    answer: "An MVP tests the core idea with real users, so you learn before you commit.",
    href: "/services/mvp-development",
    linkLabel: "MVP Development",
  },
];

export const outcomes = [
  {
    title: "Sell more",
    body: "Faster responses to enquiries, better follow-up and a CRM your team uses.",
    links: [
      { label: "Sales AI Agent", href: "/ai-agents/sales-ai-agent" },
      { label: "CRM Development", href: "/services/crm-development" },
    ],
  },
  {
    title: "Run smarter",
    body: "Repeatable work automated, and business systems that connect instead of sitting in silos.",
    links: [
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "ERP & Business Software", href: "/services/erp-software-development" },
    ],
  },
  {
    title: "Decide faster",
    body: "Answers in plain language and analytics your leaders can act on the same day.",
    links: [
      { label: "Business Analytics", href: "/services/business-analytics" },
      { label: "Business AI Agent", href: "/ai-agents/business-ai-agent" },
    ],
  },
];

// Illustrative scripted content. Not customer data. Labelled as such in the UI.
export const agents = [
  {
    id: "sales",
    tab: "Sales AI Agent",
    headline: "Never miss a lead again.",
    body: "Responds to new enquiries, qualifies them and keeps the follow-up moving until a person takes over.",
    href: "/ai-agents/sales-ai-agent",
    transcript: [
      { speaker: "Lead", text: "Hi, I'm interested in automating our client onboarding." },
      { speaker: "Agent", text: "Thanks for reaching out. What size is your team?" },
      { speaker: "Lead", text: "Around forty people." },
      { speaker: "Agent", text: "Thanks. Which of these times suits a short call?" },
    ],
  },
  {
    id: "crm",
    tab: "CRM AI Agent",
    headline: "Your CRM, finally working for you.",
    body: "Keeps customer records current and points your team to the next best action.",
    href: "/ai-agents/crm-ai-agent",
    transcript: [
      { speaker: "Agent", text: "Two deals have had no activity this month." },
      { speaker: "Agent", text: "Suggested next step for the first deal: send the pricing follow-up." },
      { speaker: "You", text: "Draft it and show me before it goes out." },
      { speaker: "Agent", text: "Draft ready for your review." },
    ],
  },
  {
    id: "business",
    tab: "Business AI Agent",
    headline: "Ask your business anything.",
    body: "Ask questions in plain language and get answers from your own business data.",
    href: "/ai-agents/business-ai-agent",
    transcript: [
      { speaker: "You", text: "Which product line grew fastest this quarter?" },
      { speaker: "Agent", text: "Product line B led growth this quarter. Here is the breakdown by region." },
      { speaker: "You", text: "Why did region two drop?" },
      { speaker: "Agent", text: "Region two had fewer renewals. The renewal data is shown below." },
    ],
  },
];

export const capabilities = [
  { label: "AI Solutions", href: "/services/ai-solutions", summary: "Intelligent features and systems built on AI." },
  { label: "AI Automation", href: "/services/ai-automation", summary: "Repeatable work handled by software, with people in control." },
  { label: "Business Analytics", href: "/services/business-analytics", summary: "Clear numbers for faster decisions." },
  { label: "CRM", href: "/services/crm-development", summary: "Customer systems your team uses every day." },
  { label: "ERP & Business Software", href: "/services/erp-software-development", summary: "Operations software that connects your business." },
  { label: "Custom Software", href: "/services/custom-software-development", summary: "Software built around your processes." },
  { label: "Web Applications", href: "/services/web-application-development", summary: "Browser-based products and internal tools." },
  { label: "Mobile Applications", href: "/services/mobile-app-development", summary: "iOS and Android apps for customers and teams." },
  { label: "SaaS", href: "/services/saas-development", summary: "Subscription products built to scale." },
  { label: "Desktop Applications", href: "/services/desktop-application-development", summary: "Desktop software for demanding workflows." },
];

export const processSteps = [
  {
    title: "Discover",
    summary: "We map how work moves today and where value is lost.",
    deliverables: ["Process map", "Scope and success criteria", "Prioritised list of opportunities"],
  },
  {
    title: "Design",
    summary: "We design workflows, screens and data flows before anything is built.",
    deliverables: ["Workflow and journey designs", "Interface designs", "Technical plan"],
  },
  {
    title: "Build",
    summary: "We build in working increments and review each one with you.",
    deliverables: ["Working software in tested increments", "Integrations", "Documentation"],
  },
  {
    title: "Launch & Grow",
    summary: "We launch, measure and improve based on real use.",
    deliverables: ["Launch plan", "Monitoring and reporting", "Improvement roadmap"],
  },
];


export const differentiators = [
  { title: "Outcomes first", body: "Every build starts from the decision, revenue or workflow you need to improve." },
  { title: "AI inside the workflow", body: "Agents and automation designed into how your team already works." },
  { title: "Clear scope before build", body: "Discovery and a written plan come before production code." },
  { title: "Built for the people using it", body: "Interfaces designed for daily use on desktop and mobile." },
  { title: "Ready to grow", body: "Systems designed to extend as your business and data grow." },
];

export const engagementModels = [
  { title: "Fixed-scope project", body: "A defined outcome, scope and plan agreed before work starts.", bestFor: "A clear product or system with a known goal." },
  { title: "Dedicated team", body: "A small team working as an extension of yours on an ongoing product.", bestFor: "Long-running products with a steady roadmap." },
  { title: "AI pilot", body: "A focused, time-boxed test of one AI workflow before any wider rollout.", bestFor: "Proving value before committing to a larger build." },
  { title: "Ongoing support", body: "Maintenance, improvements and monitoring after launch.", bestFor: "Systems already live that need steady care." },
];

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "Cost depends on scope. We scope the work first and agree the plan in writing before build starts.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines depend on scope and team size. A discovery phase gives a realistic plan before the build begins.",
  },
  {
    q: "Who owns the code?",
    a: "Ownership of the code and deliverables is set out in writing before work begins, so you know exactly what you own at handover.",
  },
  {
    q: "How is AI used with my data?",
    a: "We design AI systems around the data boundaries you set, and agree what data each system can access before anything is built.",
  },
  {
    q: "What support is available after launch?",
    a: "Ongoing support is available as an engagement model, covering maintenance, improvements and monitoring.",
  },
  {
    q: "Can you work across countries?",
    a: "Anantorix is currently focused on businesses across India. Tell us where your business is based in your brief and we will confirm whether we can work with you.",
  },
];

export const finalCta = {
  headline: "Tell us what your business needs to run better.",
  body: "Start with a short brief. We will tell you what is possible and how we would approach it.",
};

export const agentRouteList = agentRoutes;
export const serviceRouteList = services;
