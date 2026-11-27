import { CRM_ERP_PRICING } from "./pricing";

// Content for /industries/poultry-software. Describes what we build for poultry businesses.
// No client names, results or case studies: none are approved for publication yet.

const tiers = CRM_ERP_PRICING.tiers;
const fromPrice = tiers[0].price.split("–")[0];

export const poultry = {
  path: "/industries/poultry-software",
  metaTitle: "Poultry Farm Management Software & Poultry ERP",
  seoTitle: "Poultry Farm Software & ERP in Namakkal, Tamil Nadu",
  metaDescription:
    "Custom poultry farm management software and poultry ERP for layer, broiler and hatchery businesses in Namakkal and Tamil Nadu: flocks, feed, eggs, sales and GST billing.",
  eyebrow: "Poultry software",
  h1: "Poultry farm management software built around how your farm runs",
  lead:
    "We build poultry software for layer farms, broiler integrators, hatcheries and egg traders: daily shed records, feed and medicine stock, egg and bird sales, and GST billing in one system. We are based in Tiruchengode, in Namakkal district.",

  problems: [
    {
      problem: "Shed supervisors write daily figures in notebooks, and the office types them into Excel days later.",
      answer: "Supervisors enter mortality, feed, water and egg counts on a phone at the shed. The office sees them the same day.",
    },
    {
      problem: "Nobody knows the real feed cost per egg or per kilo of bird until the batch is over.",
      answer: "Feed issued to each shed is recorded against the flock, so feed conversion and cost are visible while the batch is still running.",
    },
    {
      problem: "Egg and bird sales, credit and lorry dispatches are spread across books and WhatsApp messages.",
      answer: "Every sale, dispatch and payment is recorded once, with the customer's balance and a GST invoice produced from the same entry.",
    },
  ],

  modules: [
    { title: "Layer farm records", body: "Daily egg collection per shed, hen-day production percentage, mortality, culls and tray counts by grade." },
    { title: "Broiler batches", body: "Placement, daily mortality, weight sampling, feed issued and FCR for each batch, from chick-in to lifting." },
    { title: "Contract growing", body: "Chicks, feed and medicine supplied to each grower, lifting weights and grower payment calculation." },
    { title: "Hatchery", body: "Egg setting, candling, transfer and hatch results by batch and breeder flock." },
    { title: "Feed and feed mill", body: "Raw material purchases and stock, feed formulas, production runs and feed issued to each shed." },
    { title: "Health and vaccination", body: "Vaccination schedules per flock, medicine stock and treatment records, with reminders before each due date." },
    { title: "Egg and bird sales", body: "Daily rates you set, orders, lorry dispatch, delivery notes, customer credit and GST invoices." },
    { title: "Owner dashboard", body: "Production, mortality, feed stock and outstanding payments across every farm, on one screen." },
  ],

  explainer: {
    title: "Custom poultry software or a ready-made poultry ERP?",
    intro:
      "Several ready-made poultry ERP packages are sold in India, and for many farms they are a good choice. Custom software makes more sense when your farm, trading or contract-growing process does not fit a standard package. This is how the two usually compare.",
    labels: ["Custom poultry software", "Ready-made poultry ERP"] as [string, string],
    rows: [
      { aspect: "Time to start", first: "Weeks, because screens and reports are built for your process.", second: "Often days, if your process matches the package." },
      { aspect: "Fit", first: "Built around your sheds, records, grower terms and billing.", second: "You follow the package's way of working, with the settings it offers." },
      { aspect: "Reports", first: "The exact daily and monthly reports your owners and managers ask for.", second: "The reports the package provides, plus exports." },
      { aspect: "Changes later", first: "Changed when your business changes, at the cost of development time.", second: "Depends on the vendor's roadmap and what settings allow." },
      { aspect: "Cost profile", first: `One-time build from ${fromPrice} excluding GST, plus optional support.`, second: "Usually a licence or subscription, sometimes per user or per module." },
      { aspect: "Data and code", first: "Ownership of the code and data agreed in writing before work begins.", second: "Data stays in the vendor's system. Check export options before you commit." },
    ],
  },

  metrics: [
    { title: "Hen-day production %", body: "Eggs collected in a day divided by hens alive that day, times 100. Calculated per shed, every day." },
    { title: "Feed conversion ratio (FCR)", body: "Feed consumed divided by live weight gained. Tracked per broiler batch while it is growing, not only after lifting." },
    { title: "Mortality %", body: "Birds lost divided by birds placed, by day, week and batch, so problems in one shed show up early." },
    { title: "Feed and medicine stock", body: "Stock on hand at each farm and the mill, with days of feed left at the current consumption rate." },
  ],

  steps: [
    { title: "Visit and map", summary: "We visit your farm or office, see how records are kept today and list the reports you need.", deliverables: ["Farm and shed walkthrough", "Current registers and Excel files", "Priority reports"] },
    { title: "Design", summary: "We design the shed entry screens, the office screens and the reports before building anything.", deliverables: ["Entry screens for supervisors", "Office and owner screens", "Written scope and price"] },
    { title: "Build", summary: "We build in parts and show each one working, starting with the module that saves the most time.", deliverables: ["Modules in tested increments", "Import of existing data", "Reviews with your team"] },
    { title: "Launch and support", summary: "We train supervisors and office staff, run alongside the old registers for a period you choose, then support you.", deliverables: ["Staff training", "Parallel run", "Support and changes"] },
  ],

  faq: [
    {
      q: "How much does poultry farm management software cost?",
      a: `Our custom business software packages start from ${fromPrice}, excluding GST. A single-farm system covering daily records, feed stock and billing fits the first tier (${tiers[0].price}). Multi-farm systems with feed mill, contract growing or hatchery modules fall in the higher tiers (${tiers[1].price} and ${tiers[2].price}). We give a fixed quote after we have seen how your farm works.`,
    },
    {
      q: "Can shed supervisors enter data on a mobile phone?",
      a: "Yes. Supervisors can enter daily figures on an Android phone with simple screens. If the farm has a weak mobile signal, the app can save entries on the phone and send them when the connection returns.",
    },
    {
      q: "Can the software be in Tamil?",
      a: "Yes. Supervisor screens can be built in Tamil, English or both, and the office and owner screens can use a different language from the shed screens.",
    },
    {
      q: "Does it handle layer, broiler and hatchery operations together?",
      a: "It can. We build only the modules your business runs. A layer farm with egg trading needs different screens from a broiler integrator with contract growers, and both can share one customer, stock and billing system.",
    },
    {
      q: "Can it work with Tally or our existing accounts?",
      a: "Sales, purchases and payments can be exported in a format your accountant can import, or sent to your accounting software where it allows. We confirm the method once we know which software and version you use.",
    },
    {
      q: "Can we bring in our existing Excel records?",
      a: "Yes. We import existing flock, customer, stock and balance records from Excel during setup and check the totals with you before you switch over.",
    },
    {
      q: "Where is Anantorix based?",
      a: "Anantorix is based in Tiruchengode, Namakkal district, Tamil Nadu. We work with poultry businesses in Namakkal and across Tamil Nadu, and with businesses elsewhere in India. Calls can be in English or Tamil.",
    },
  ],

  related: [
    { label: "ERP & Business Software", href: "/services/erp-software-development" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
    { label: "Business Analytics", href: "/services/business-analytics" },
    { label: "Pricing", href: "/pricing" },
  ],
};
