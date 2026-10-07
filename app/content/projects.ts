// Real Anantorix projects shown on the homepage. Facts come only from the live sites and approved copy.
// Illustrative UI is labelled as such. No metrics, results or testimonials are stated.

export type ShowcaseProject = {
  id: string;
  name: string;
  logo: { src: string; alt: string; width: number; height: number };
  category: string;
  description: string;
  flow: { label: string; status: string }[];
  visual: "order" | "clinic" | "furniture";
  visualNote: string;
  // Rendered logo height in CSS pixels. Width follows the logo aspect ratio.
  displayHeight: number;
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "sss-furniture",
    name: "SSS Furniture",
    logo: { src: "/images/clients/sss-furniture.png", alt: "SSS Furniture logo", width: 505, height: 180 },
    category: "Business Operations · Admin Platform · Workflow",
    description: "A business operations system designed around furniture orders, production and operational workflows.",
    flow: [
      { label: "ORDER RECEIVED", status: "Processing" },
      { label: "PRODUCTION", status: "In Production" },
      { label: "STOCK UPDATED", status: "Stock Updated" },
      { label: "READY FOR DISPATCH", status: "Ready" },
    ],
    visual: "furniture",
    visualNote: "Illustrative system view",
    displayHeight: 72,
  },
  {
    id: "sairam-homeopathy",
    name: "Sai Ram Homeopathy Clinic",
    logo: { src: "/images/clients/sairam-homeopathy-clinic.png", alt: "Sai Ram Homeo Clinic logo", width: 234, height: 63 },
    category: "Healthcare · Website · Patient Experience",
    description: "A digital healthcare experience for discovering treatments, services and appointment information.",
    flow: [
      { label: "PATIENT REQUEST", status: "Requested" },
      { label: "APPOINTMENT", status: "Booked" },
      { label: "CONFIRMATION", status: "Confirmed" },
      { label: "FOLLOW-UP", status: "Follow-up" },
    ],
    visual: "clinic",
    visualNote: "Illustrative interface",
    displayHeight: 56,
  },
  {
    id: "talking-spaces",
    name: "Talking Spaces",
    logo: { src: "/images/clients/talking-spaces.png", alt: "Talking Spaces Interiors logo", width: 260, height: 320 },
    category: "Interior Design · Website · Portfolio",
    description: "A visual digital experience for presenting interior design projects and services.",
    flow: [
      { label: "PROJECT", status: "Illustrative" },
      { label: "PORTFOLIO", status: "Illustrative" },
      { label: "SERVICE", status: "Illustrative" },
      { label: "ENQUIRY", status: "Illustrative" },
    ],

    visualNote: "Illustrative interface.",
    visual: "order",
    displayHeight: 110,
  },
];
