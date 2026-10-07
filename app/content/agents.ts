// AI Agent product content. Presentation lives in components.
// Copy is draft until approved by Anantorix. No client names, metrics, logos, testimonials or guarantees.
// Business-impacting actions always require human approval. Keep it that way in every edit.

export type AgentFaq = { q: string; a: string };

export type AgentDef = {
  slug: string;
  name: string;
  // Page name. The root layout appends " | Anantorix Technologies".
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lead: string;
  problem: string;
  // One-line outcome used on the hub card.
  outcomeLine: string;
  // Short plain-language explanation used on the hub card.
  explanation: string;
  jobs: string[];
  dayInLife: { title: string; text: string }[];
  outcomes: { title: string; body: string }[];
  idealFor: string;
  // Human-control rules for this agent. The steps describe how an action is handled end to end.
  humanControl: { approvalFor: string[]; steps: string[] };
  // Scripted example. Always labelled as an illustrative example in the UI.
  example: { title: string; transcript: { speaker: string; text: string }[] };
  setupSteps: { title: string; summary: string; deliverables: string[] }[];
  faq: AgentFaq[];
  // Services this agent connects to. Only live routes are rendered.
  relatedServices: { label: string; href: string }[];
};

// Shared categories from the V2 specification. Shown as categories, never as logos.
export const integrationCategories = ["Website chat", "WhatsApp", "Email", "CRM", "Spreadsheets", "ERP"];

export const integrationNote = "Can connect with the tools your business already uses. Connections are agreed during setup, based on the tools you run.";

export const pricingApproach = "Pricing is tailored to the workflow, integrations and level of support required.";

export const setupSteps = [
  {
    title: "Connect",
    summary: "We agree which tools the agent can use, and what access it needs to do so.",
    deliverables: ["Tool list agreed", "Access scope written down", "Connection plan"],
  },
  {
    title: "Configure",
    summary: "We set the rules, tone, approval points and the work the agent is allowed to do.",
    deliverables: ["Rules and approval points", "Reply and summary templates", "Test scenarios"],
  },
  {
    title: "Launch",
    summary: "We start with a limited group of enquiries or records, watch the results, and widen gradually.",
    deliverables: ["Limited launch", "Review with your team", "Rollout plan"],
  },
  {
    title: "Improve",
    summary: "We review what the agent handled, refine the rules, and extend the work when it is ready.",
    deliverables: ["Regular review", "Rule updates", "Next-job roadmap"],
  },
];

export const agents: AgentDef[] = [
  {
    slug: "sales-ai-agent",
    name: "Sales AI Agent",
    metaTitle: "Sales AI Agent for Business",
    metaDescription: "A Sales AI Agent that replies to enquiries, qualifies and scores leads, books meetings and hands hot leads to your team.",
    eyebrow: "AI Agent · Sales",
    headline: "Never miss a lead again.",
    lead: "The Sales AI Agent answers every enquiry straight away, qualifies the lead, books the meeting and hands the hot ones to a person at the right moment.",
    problem: "Enquiries arrive at all hours. A small team cannot reply to each one quickly, so good leads go cold while they wait.",
    outcomeLine: "Faster replies and fewer enquiries left waiting.",
    explanation: "Responds to new enquiries, qualifies and scores them, and keeps follow-up going until a person takes over.",
    jobs: [
      "Replies to enquiries straight away",
      "Qualifies leads with your questions",
      "Scores leads so the best ones surface first",
      "Books meetings in your team's calendar",
      "Follows up on quiet leads",
      "Hands hot leads to a person",
    ],
    dayInLife: [
      { title: "Incoming enquiry", text: "A website or WhatsApp enquiry arrives outside working hours." },
      { title: "Understands the request", text: "The agent reads what the customer is asking for." },
      { title: "Qualifies", text: "It asks the questions your team would ask and scores the lead." },
      { title: "Takes the permitted action", text: "It replies, shares the information you have approved, and offers meeting times." },
      { title: "Escalates when needed", text: "A pricing or commitment question goes to a person with the context attached." },
      { title: "Records and reports", text: "The lead, its score and the next step are recorded for the team's morning review." },
    ],
    outcomes: [
      { title: "Faster lead response", body: "Enquiries get a reply while the customer is still interested." },
      { title: "Better qualification", body: "Your team spends time on the leads most likely to buy." },
      { title: "Consistent follow-up", body: "Quiet leads are followed up on a schedule, not forgotten." },
      { title: "More booked conversations", body: "Meeting times are offered and booked without a back-and-forth." },
    ],
    idealFor: "Businesses with inbound enquiries and small sales teams.",
    humanControl: {
      approvalFor: ["Pricing or discount offers", "Commitments to delivery dates or terms", "Any change to a customer's account"],
      steps: ["Reads the enquiry and the approved information", "Prepares a reply or booking", "Sends routine replies within your rules", "Asks your team before any commitment"],
    },
    example: {
      title: "Sales AI Agent: enquiry handling",
      transcript: [
        { speaker: "Lead", text: "Hi, do you work with small teams?" },
        { speaker: "Agent", text: "Yes. Roughly how many people would use it?" },
        { speaker: "Lead", text: "About ten people." },
        { speaker: "Agent", text: "Thanks. Which of these times suits a short call?" },
      ],
    },
    setupSteps,
    faq: [
      { q: "What does the Sales AI Agent actually do?", a: "It replies to new enquiries, asks the questions you choose, scores the lead, offers meeting times and follows up. Anything that needs a decision goes to your team." },
      { q: "Which tools can it work with?", a: integrationNote },
      { q: "How long does setup take?", a: "Setup depends on the tools connected and how the replies and rules are configured. We agree the scope and timeline before setup begins." },
      { q: "Does a person stay in control?", a: "Yes. The agent can prepare replies and recommendations. Your team approves pricing, commitments and any change to a customer account." },
      { q: "How is customer data used?", a: "Only the systems you connect are used, and access is agreed with you during setup." },
      { q: "Can it reply in our tone and with our rules?", a: "Yes. Replies, questions, scoring rules and approval points are configured for your business." },
      { q: "What support is there after launch?", a: "Ongoing support and improvements are available as an engagement model, and the scope is agreed per project." },
      { q: "How is it priced?", a: pricingApproach },
    ],
    relatedServices: [
      { label: "CRM Development", href: "/services/crm-development" },
      { label: "AI Automation", href: "/services/ai-automation" },
    ],
  },
  {
    slug: "crm-ai-agent",
    name: "CRM AI Agent",
    metaTitle: "CRM AI Agent for Sales Teams",
    metaDescription: "A CRM AI Agent that summarises customers, prioritises today's leads, drafts follow-ups, flags at-risk deals and writes a weekly pipeline brief.",
    eyebrow: "AI Agent · CRM",
    headline: "Your CRM, finally working for you.",
    lead: "The CRM AI Agent keeps customer records current, tells your team who to contact today, drafts the follow-up and flags the deals that are drifting.",
    problem: "Customer history is scattered, the CRM is out of date, and follow-ups depend on who remembers to do them.",
    outcomeLine: "A CRM your team trusts and uses every day.",
    explanation: "Summarises each customer, sets today's priorities, drafts follow-ups and flags risks, with the pipeline brief ready each week.",
    jobs: [
      "Summarises each customer's history",
      "Prioritises today's leads",
      "Drafts follow-up messages",
      "Updates records within agreed rules",
      "Flags at-risk deals",
      "Creates a weekly pipeline brief",
    ],
    dayInLife: [
      { title: "Morning review", text: "The agent reviews open leads and recent activity." },
      { title: "Understands the account", text: "It summarises each customer from the history in your CRM." },
      { title: "Prioritises", text: "Today's leads are ordered by how urgent and how valuable they look." },
      { title: "Takes the permitted action", text: "It drafts follow-ups and updates the records you have allowed it to change." },
      { title: "Escalates when needed", text: "A deal showing risk is flagged to the owner with the reasons listed." },
      { title: "Reports back", text: "The week ends with a pipeline brief for the sales lead." },
    ],
    outcomes: [
      { title: "Clearer pipeline", body: "Every open deal has a current summary and a next step." },
      { title: "Less CRM admin", body: "Routine record updates happen within the rules you set." },
      { title: "Better follow-up discipline", body: "Follow-ups are drafted on time, ready for review." },
      { title: "Earlier risk visibility", body: "Deals showing signs of drift are flagged before they go cold." },
    ],
    idealFor: "Sales teams with an under-used CRM.",
    humanControl: {
      approvalFor: ["Changes to deal value or stage on key deals", "Sending messages that commit to terms", "Deleting or merging records"],
      steps: ["Reads the account history and recent activity", "Prepares the summary, follow-up or update", "Applies routine updates within agreed rules", "Asks the owner before any key change"],
    },
    example: {
      title: "CRM AI Agent: morning review",
      transcript: [
        { speaker: "Agent", text: "Two deals have had no activity this month." },
        { speaker: "Agent", text: "Suggested next step for the first deal: send the pricing follow-up." },
        { speaker: "You", text: "Draft it and show me before it goes out." },
        { speaker: "Agent", text: "Draft ready for your review." },
      ],
    },
    setupSteps,
    faq: [
      { q: "What does the CRM AI Agent do?", a: "It summarises customers, sets the day's priorities, drafts follow-ups, keeps routine records current within your rules and flags at-risk deals." },
      { q: "Which CRM can it work with?", a: integrationNote },
      { q: "Will it change our CRM records on its own?", a: "It can update records you have allowed it to change. Changes to key fields, such as deal value or stage on important deals, can require approval." },
      { q: "Does a person stay in control?", a: "Yes. Your team approves anything that commits the business or changes key records." },
      { q: "How is customer data used?", a: "Only the systems you connect are used, and the access the agent has is agreed with you during setup." },
      { q: "Can it follow our sales process?", a: "Yes. The stages, fields, risk signals and follow-up rules are configured to match how your team sells." },
      { q: "What support is there after launch?", a: "Ongoing support and improvements are available as an engagement model, and the scope is agreed per project." },
      { q: "How is it priced?", a: pricingApproach },
    ],
    relatedServices: [
      { label: "CRM Development", href: "/services/crm-development" },
      { label: "Business Analytics", href: "/services/business-analytics" },
    ],
  },
  {
    slug: "business-ai-agent",
    name: "Business AI Agent",
    metaTitle: "Business AI Agent for Operations",
    metaDescription: "A Business AI Agent that answers questions about sales, stock, orders and finances, builds reports and prepares routine actions for your approval.",
    eyebrow: "AI Agent · Business",
    headline: "Ask your business anything.",
    lead: "Ask a question in plain language and get an answer from your own business data. The agent can prepare routine actions, but anything that changes money, stock or documents waits for your approval.",
    problem: "Simple questions wait for someone to pull a report, and preparing those reports takes time from people who have other work to do.",
    outcomeLine: "Answers without waiting for someone to pull a report.",
    explanation: "Answers questions about sales, stock, orders and finances, builds reports, and prepares routine actions for approval.",
    jobs: [
      "Answers questions about sales",
      "Answers questions about stock",
      "Answers questions about orders",
      "Answers questions about finances",
      "Builds reports on request",
      "Drafts documents",
      "Performs routine actions, only with approval",
    ],
    dayInLife: [
      { title: "Question asked", text: "A manager asks which orders are waiting for stock." },
      { title: "Understands the request", text: "The agent identifies the data it needs." },
      { title: "Reads information", text: "It reads the connected sales, stock and order records." },
      { title: "Prepares the action", text: "If an action is needed, such as a purchase order draft, it prepares it." },
      { title: "Requests approval", text: "The action waits for the approver. Nothing is executed yet." },
      { title: "Executes and records", text: "After approval, the action runs and the outcome is recorded." },
    ],
    outcomes: [
      { title: "Faster answers", body: "Questions about stock, sales or orders answered without waiting for a report." },
      { title: "Simpler reporting", body: "Reports built on request, from the same data your team already uses." },
      { title: "Less manual preparation", body: "Draft documents and summaries ready for review." },
      { title: "Controlled routine actions", body: "Routine actions are prepared, approved and then executed, with a record kept." },
    ],
    idealFor: "Owners and managers who need answers without waiting for reports.",
    humanControl: {
      approvalFor: ["Payments, invoices or refunds", "Purchase orders and stock adjustments", "Contracts, legal or financial documents", "Any action that cannot be easily reversed"],
      steps: ["Reads the information it has been given access to", "Prepares the action or document", "Requests approval from the named approver", "Executes only after approval", "Records the outcome for the team"],
    },
    example: {
      title: "Business AI Agent: a question and an approval",
      transcript: [
        { speaker: "You", text: "Which product line grew fastest this quarter?" },
        { speaker: "Agent", text: "Product line B led growth this quarter. Here is the breakdown by region." },
        { speaker: "You", text: "Prepare a purchase order for the stock it needs." },
        { speaker: "Agent", text: "Draft ready. It is waiting for approval from your operations lead." },
      ],
    },
    setupSteps,
    faq: [
      { q: "What can the Business AI Agent answer?", a: "Questions about sales, stock, orders and finances, using the business data you connect to it." },
      { q: "Can it take actions in our systems?", a: "It can prepare routine actions and documents. Anything that changes money, stock or legal documents runs only after your approval." },
      { q: "Which systems can it work with?", a: integrationNote },
      { q: "Does a person stay in control?", a: "Yes. The agent reads information, prepares the action, requests approval, executes only after approval and records the outcome." },
      { q: "How is business data used?", a: "Only the systems you connect are used, and the access the agent has is agreed with you during setup." },
      { q: "Can it build reports?", a: "Yes. Reports can be requested in plain language and built from the connected data." },
      { q: "What support is there after launch?", a: "Ongoing support and improvements are available as an engagement model, and the scope is agreed per project." },
      { q: "How is it priced?", a: pricingApproach },
    ],
    relatedServices: [
      { label: "Business Analytics", href: "/services/business-analytics" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "ERP & Business Software", href: "/services/erp-software-development" },
    ],
  },
];

export const agentSlugs = agents.map((a) => a.slug);

export function getAgent(slug: string): AgentDef | undefined {
  return agents.find((a) => a.slug === slug);
}

// Hub copy: what an agent does, in plain language.
export const hub = {
  headline: "AI agents that work alongside your team.",
  lead: "An AI agent is a piece of software that takes on a defined part of your work. It understands the request, acts within the rules you set, and reports back. Your team stays in charge of decisions.",
  verbs: [
    { title: "Understands", body: "It reads the enquiry, question or record and works out what needs to happen." },
    { title: "Acts", body: "It takes the steps you have allowed, and asks for approval before anything that matters." },
    { title: "Reports", body: "It records what it did and what needs a decision, so your team knows where things stand." },
  ],
  controlStatement: "AI can prepare and recommend. Your team stays in control of business-impacting actions.",
  customNote: "Custom agents for workflows beyond these three are a later addition.",
  faq: [
    { q: "What is an AI agent?", a: "Software that takes on a defined part of your work. It understands the request, acts within the rules you set, and reports back." },
    { q: "Which agents are available?", a: "Three agents: the Sales AI Agent, the CRM AI Agent and the Business AI Agent. Each has its own job and its own rules." },
    { q: "Which tools can they work with?", a: integrationNote },
    { q: "How long does setup take?", a: "Setup depends on the tools connected and the rules configured. We agree the scope and timeline before setup begins." },
    { q: "Does a person stay in control?", a: "Yes. The agents can prepare and recommend. Your team approves anything that is business-impacting." },
    { q: "Can they be customised?", a: "Yes. Rules, tone, approval points and the tools used are configured for your business." },
    { q: "What support is there after launch?", a: "Ongoing support and improvements are available as an engagement model, and the scope is agreed per project." },
    { q: "How is it priced?", a: pricingApproach },
  ],
};
