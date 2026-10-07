// Technology Anantorix builds with, grouped by area. These are capabilities across Anantorix projects; tools are
// chosen per project, so not every project (or this website) uses every item. No logos: names only.
// Approved list only. Do not add technologies Anantorix does not use, and no IoT.

export type Technology = { name: string; description?: string };

export type TechnologyCategory = {
  id: "frontend" | "backend" | "data" | "ai" | "cloud" | "interactive";
  title: string;
  summary: string;
  items: Technology[];
};

export const technologyIntro = {
  eyebrow: "Technology",
  title: "Built with the technology behind modern digital businesses.",
  lead: "We choose the right tools for performance, scalability, intelligent automation and long-term maintainability.",
  note: "Tools are chosen to fit each project, so not every system uses every tool listed here.",
};

export const technologyCategories: TechnologyCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    summary: "Fast, accessible interfaces for web and product teams.",
    items: [{ name: "Next.js" }, { name: "React" }, { name: "TypeScript" }, { name: "Tailwind CSS" }],
  },
  {
    id: "backend",
    title: "Backend",
    summary: "APIs and services that keep business logic reliable.",
    items: [{ name: "Node.js" }, { name: "NestJS" }, { name: "Express.js" }],
  },
  {
    id: "data",
    title: "Data & infrastructure",
    summary: "Structured, dependable storage for business data.",
    items: [{ name: "PostgreSQL" }, { name: "MySQL" }, { name: "MongoDB" }, { name: "Prisma" }, { name: "Redis" }],
  },
  {
    id: "ai",
    title: "AI & automation",
    summary: "Intelligence built into everyday workflows.",
    items: [{ name: "OpenAI" }, { name: "Google Gemini" }, { name: "AI Agents" }, { name: "LLMs" }, { name: "RAG / Vector Search" }],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    summary: "Deployment and delivery that scale with the business.",
    items: [{ name: "Docker" }, { name: "Kubernetes" }, { name: "Vercel" }, { name: "Hostinger" }, { name: "Cloudinary" }],
  },
  {
    id: "interactive",
    title: "Interactive experience",
    summary: "3D and immersive interfaces where they add real value.",
    items: [{ name: "Three.js" }, { name: "React Three Fiber" }, { name: "Drei" }],
  },
];

// Top to bottom, the order a request travels through a system: what people see, down to where it runs.
export const LAYER_ORDER: TechnologyCategory["id"][] = ["interactive", "frontend", "ai", "backend", "data", "cloud"];
