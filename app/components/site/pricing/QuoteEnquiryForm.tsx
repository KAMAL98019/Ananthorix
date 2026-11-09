"use client";

import { useId, useRef, useState } from "react";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import { FieldError, FormMessage, Input, Label, Select, Textarea } from "../../ui/Field";
import { QUOTE_SERVICES, QUOTE_TIMELINES, quoteBudgetOptions } from "../../../lib/leads/schema";
import { getAttribution } from "../../../lib/attribution";
import { trackQuoteGenerated } from "../../../lib/analytics";
import { COMPANY_CONTACT } from "../../../content/contact";
import { CheckCircle2, MessageSquare, PhoneCall } from "lucide-react";
import { useCurrency } from "./CurrencyContext";

export type QuoteFormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  requirements: string;
  website: string; // Honeypot
};

const initialFormValues: QuoteFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  timeline: "",
  requirements: "",
  website: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function QuoteEnquiryForm({
  defaultService,
  defaultBudget,
}: {
  defaultService?: string;
  defaultBudget?: string;
}) {
  const formId = useId();
  const inFlight = useRef(false);
  const { currency } = useCurrency();
  const budgetOptions = quoteBudgetOptions(currency);

  const [values, setValues] = useState<QuoteFormValues>(() => ({
    ...initialFormValues,
    service: defaultService ?? "",
    budget: defaultBudget ?? "",
  }));

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormValues | "form", string>>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const onChange = (field: keyof QuoteFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setServerError("");
  };

  const validateFrontend = (): boolean => {
    const nextErrors: Partial<Record<keyof QuoteFormValues, string>> = {};

    if (!values.name.trim() || values.name.trim().length < 2) {
      nextErrors.name = "Enter your full name.";
    }
    if (!values.company.trim() || values.company.trim().length < 2) {
      nextErrors.company = "Enter your company name.";
    }
    if (!values.email.trim() || !EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = "Enter a valid work email address.";
    }
    if (!values.phone.trim() || !/^\+?[0-9\s()-]{7,20}$/.test(values.phone.trim())) {
      nextErrors.phone = "Enter a valid phone or WhatsApp number.";
    }
    if (!values.service) {
      nextErrors.service = "Select the service required.";
    }
    if (!values.budget) {
      nextErrors.budget = "Select an estimated budget range.";
    }
    if (!values.timeline) {
      nextErrors.timeline = "Select your expected timeline.";
    }
    if (!values.requirements.trim() || values.requirements.trim().length < 10) {
      nextErrors.requirements = "Please describe your project requirements in at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inFlight.current) return;

    if (!validateFrontend()) {
      const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setServerError("");

    const attribution = getAttribution();
    const payload = {
      currency,
      ...values,
      sourcePage: typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}`.slice(0, 200) : "/pricing",
      landingPage: attribution.landingPage,
      referrer: attribution.referrer,
      utm: attribution.utm,
    };

    try {
      const res = await fetch("/api/quote-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = (await res.json().catch(() => ({}))) as { id?: string };
        const quoteId = data.id || "CONFIRMED";
        trackQuoteGenerated({
          quoteId,
          service: values.service,
          budget: values.budget,
          utmSource: attribution.utm.source,
          landingPage: attribution.landingPage,
        });
        setSubmittedRef(quoteId.replace(/-/g, "").slice(0, 8).toUpperCase());
        return;
      }

      inFlight.current = false;
      const data = (await res.json().catch(() => ({}))) as { errors?: Record<string, string>; error?: string };
      if (data.errors) {
        setErrors(data.errors);
        setServerError("Please review the highlighted fields and submit again.");
      } else {
        setServerError(data.error ?? "We could not send your quote enquiry. Please try again or contact us directly.");
      }
    } catch {
      inFlight.current = false;
      setServerError("Network connection issue. Please check your internet connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <Card kind="quote" className="p-8 md:p-12 border-gold/40 shadow-floating text-left">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-button bg-gold/15 text-gold">
            <CheckCircle2 className="size-6" />
          </div>
          <div>
            <span className="type-eyebrow text-gold">Quote Enquiry Received</span>
            <h3 className="type-h3 text-fg-primary">Thank you, {values.name}!</h3>
          </div>
        </div>

        <p className="type-body mt-4 text-fg-secondary">
          We have received your enquiry for <strong>{values.company}</strong>. Reference:{" "}
          <span className="font-mono font-semibold text-deep-blue">{submittedRef}</span>. A confirmation has been sent to{" "}
          <span className="font-medium text-fg-primary">{values.email}</span>.
        </p>

        <div className="mt-6 rounded-input border border-line bg-surface-1 p-5">
          <h4 className="type-small font-semibold text-fg-primary">Next Steps:</h4>
          <ol className="mt-3 list-decimal pl-5 space-y-1.5 type-small text-fg-secondary">
            <li>Our engineering leads will evaluate your requirements and indicative budget.</li>
            <li>We will reach out via WhatsApp / phone to schedule a focused technical discussion.</li>
            <li>You will receive an itemized proposal with clear milestone schedules.</li>
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 pt-4 border-t border-line">
          <a
            href={`https://wa.me/${COMPANY_CONTACT.phoneE164.replace(/[^\d]/g, "")}?text=Hi%20Anantorix,%20I%20just%20submitted%20a%20quote%20request%20(Ref:%20${submittedRef}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-button bg-[#25D366] px-5 py-2.5 text-small font-semibold text-white hover:bg-[#20bd5a] transition-colors"
          >
            <MessageSquare className="size-4" /> Message on WhatsApp
          </a>
          <a
            href={COMPANY_CONTACT.phoneHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-button border border-line-strong bg-canvas px-5 py-2.5 text-small font-semibold text-deep-blue hover:bg-surface-2 transition-colors"
          >
            <PhoneCall className="size-4" /> Call {COMPANY_CONTACT.phoneDisplay}
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card kind="quote" className="p-6 md:p-10 border-line-strong shadow-floating">
      <div className="mb-6">
        <span className="type-eyebrow text-purple">Get an Indicative Quote</span>
        <h3 className="type-h3 mt-1 text-fg-primary">Request a Tailored Project Quotation</h3>
        <p className="type-small mt-2 text-fg-secondary">
          Share your requirements. We will analyze scope, provide indicative estimates, and schedule a technical walkthrough.
        </p>
      </div>

      {serverError && (
        <div className="mb-6">
          <FormMessage variant="error">{serverError}</FormMessage>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot field (hidden offscreen) */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => onChange("website", e.target.value)}
          />
        </div>

        {/* Name and Company */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor={`${formId}-name`} required>
              Full name
            </Label>
            <div className="mt-1.5">
              <Input
                id={`${formId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Ramesh Krishnan"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                onChange={(e) => onChange("name", e.target.value)}
                disabled={submitting}
              />
              {errors.name && (
                <div className="mt-1">
                  <FieldError id={`${formId}-name-error`}>{errors.name}</FieldError>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor={`${formId}-company`} required>
              Company name
            </Label>
            <div className="mt-1.5">
              <Input
                id={`${formId}-company`}
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="e.g. Bright Horizon Pvt Ltd"
                value={values.company}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? `${formId}-company-error` : undefined}
                onChange={(e) => onChange("company", e.target.value)}
                disabled={submitting}
              />
              {errors.company && (
                <div className="mt-1">
                  <FieldError id={`${formId}-company-error`}>{errors.company}</FieldError>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor={`${formId}-email`} required>
              Work email
            </Label>
            <div className="mt-1.5">
              <Input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                value={values.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                onChange={(e) => onChange("email", e.target.value)}
                disabled={submitting}
              />
              {errors.email && (
                <div className="mt-1">
                  <FieldError id={`${formId}-email-error`}>{errors.email}</FieldError>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor={`${formId}-phone`} required>
              Phone / WhatsApp
            </Label>
            <div className="mt-1.5">
              <Input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={values.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                onChange={(e) => onChange("phone", e.target.value)}
                disabled={submitting}
              />
              {errors.phone && (
                <div className="mt-1">
                  <FieldError id={`${formId}-phone-error`}>{errors.phone}</FieldError>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service and Budget */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor={`${formId}-service`} required>
              Service required
            </Label>
            <div className="mt-1.5">
              <Select
                id={`${formId}-service`}
                name="service"
                value={values.service}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? `${formId}-service-error` : undefined}
                onChange={(e) => onChange("service", e.target.value)}
                disabled={submitting}
              >
                <option value="">Select a service</option>
                {QUOTE_SERVICES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
              {errors.service && (
                <div className="mt-1">
                  <FieldError id={`${formId}-service-error`}>{errors.service}</FieldError>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor={`${formId}-budget`} required>
              Estimated budget
            </Label>
            <div className="mt-1.5">
              <Select
                id={`${formId}-budget`}
                name="budget"
                value={values.budget}
                aria-invalid={Boolean(errors.budget)}
                aria-describedby={errors.budget ? `${formId}-budget-error` : undefined}
                onChange={(e) => onChange("budget", e.target.value)}
                disabled={submitting}
              >
                <option value="">Select budget range</option>
                {budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
              {errors.budget && (
                <div className="mt-1">
                  <FieldError id={`${formId}-budget-error`}>{errors.budget}</FieldError>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <Label htmlFor={`${formId}-timeline`} required>
            Expected timeline
          </Label>
          <div className="mt-1.5">
            <Select
              id={`${formId}-timeline`}
              name="timeline"
              value={values.timeline}
              aria-invalid={Boolean(errors.timeline)}
              aria-describedby={errors.timeline ? `${formId}-timeline-error` : undefined}
              onChange={(e) => onChange("timeline", e.target.value)}
              disabled={submitting}
            >
              <option value="">Select timeline</option>
              {QUOTE_TIMELINES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            {errors.timeline && (
              <div className="mt-1">
                <FieldError id={`${formId}-timeline-error`}>{errors.timeline}</FieldError>
              </div>
            )}
          </div>
        </div>

        {/* Project requirements */}
        <div>
          <Label htmlFor={`${formId}-requirements`} required>
            Project requirements
          </Label>
          <div className="mt-1.5">
            <Textarea
              id={`${formId}-requirements`}
              name="requirements"
              placeholder="Tell us about the key features, workflows, users, or systems you want to build or integrate..."
              value={values.requirements}
              aria-invalid={Boolean(errors.requirements)}
              aria-describedby={errors.requirements ? `${formId}-requirements-error` : undefined}
              onChange={(e) => onChange("requirements", e.target.value)}
              disabled={submitting}
              rows={4}
            />
            {errors.requirements && (
              <div className="mt-1">
                <FieldError id={`${formId}-requirements-error`}>{errors.requirements}</FieldError>
              </div>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="w-full justify-center md:w-auto"
          >
            {submitting ? "Submitting Quotation Request..." : "Request Tailored Quotation"}
          </Button>
          <p className="type-small mt-3 text-fg-secondary">
            No obligation. We review all requests and keep your project data strictly confidential under NDA standards.
          </p>
        </div>
      </form>
    </Card>
  );
}
