// Client-side form model. Mirrors the server rules for fast feedback. The server validates again.
import type { StartContext } from "../../../lib/leads/context";

export type FormValues = {
  needs: string[];
  description: string;
  situation: string;
  timeline: string;
  budget: string;
  companySize: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  contactMethod: string;
  language: string;
  consent: boolean;
  website: string; // honeypot
};

export type Errors = Partial<Record<keyof FormValues | "form", string>>;

export const STEPS = [
  { id: "needs", label: "What you need" },
  { id: "situation", label: "Your situation" },
  { id: "context", label: "Business context" },
  { id: "contact", label: "Contact" },
] as const;

export function initialValues(context: StartContext): FormValues {
  return {
    needs: context.needs,
    description: "",
    situation: "",
    timeline: "",
    budget: "",
    companySize: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    contactMethod: "",
    language: "",
    consent: false,
    website: "",
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Validates only the fields on one step. Returns an empty object when the step is valid.
export function validateStep(step: number, v: FormValues): Errors {
  const e: Errors = {};
  if (step === 0 && v.needs.length === 0) e.needs = "Choose at least one option.";
  if (step === 1) {
    if (v.description.trim().length < 10) e.description = "Describe the project in at least 10 characters.";
    if (!v.situation) e.situation = "Choose the situation that fits best.";
    if (!v.timeline) e.timeline = "Choose a timeline.";
  }
  if (step === 2) {
    if (!v.companySize) e.companySize = "Choose a company size.";
  }
  if (step === 3) {
    if (v.name.trim().length < 2) e.name = "Enter your name.";
    if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid work email address.";
    if (v.company.trim().length < 2) e.company = "Enter your company name.";
    if (!v.contactMethod) e.contactMethod = "Choose how you would like us to contact you.";
    if ((v.contactMethod === "phone" || v.contactMethod === "whatsapp") && !v.phone.trim()) {
      e.phone = "Add a phone number so we can reach you that way.";
    }
    if (!v.language) e.language = "Choose a call language.";
    if (!v.consent) e.consent = "Please agree before sending your brief.";
  }
  return e;
}
