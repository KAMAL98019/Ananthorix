"use client";

import { useId, useRef, useState } from "react";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import { FieldError, Input, Label, Select, Textarea } from "../../ui/Field";
import { SEO_BUDGET_OPTIONS, SEO_PACKAGES_OPTIONS } from "../../../lib/leads/seoSchema";
import { getAttribution } from "../../../lib/attribution";
import { COMPANY_CONTACT } from "../../../content/contact";
import { CheckCircle2, MessageSquare, PhoneCall } from "lucide-react";

export type SeoFormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  websiteUrl: string;
  industry: string;
  targetLocation: string;
  preferredPackage: string;
  budget: string;
  challenges: string;
  website: string; // Honeypot
};

const initialFormValues: SeoFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  websiteUrl: "",
  industry: "",
  targetLocation: "",
  preferredPackage: "seo-growth",
  budget: "8k-15k",
  challenges: "",
  website: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function SeoEnquiryForm({
  defaultPackage,
}: {
  defaultPackage?: string;
}) {
  const formId = useId();
  const inFlight = useRef(false);

  const [values, setValues] = useState<SeoFormValues>({
    ...initialFormValues,
    preferredPackage: defaultPackage || "seo-growth",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!values.name.trim() || values.name.trim().length < 2) {
      nextErrors.name = "Enter your full name.";
    }
    if (!values.company.trim() || values.company.trim().length < 2) {
      nextErrors.company = "Enter your company or business name.";
    }
    if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = "Enter a valid work email address.";
    }
    if (!values.phone.trim() || !/^\+?[0-9\s()-]{7,20}$/.test(values.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!values.websiteUrl.trim() || values.websiteUrl.trim().length < 4) {
      nextErrors.websiteUrl = "Enter your website URL (e.g. example.com).";
    }
    if (!values.industry.trim() || values.industry.trim().length < 2) {
      nextErrors.industry = "Enter your business industry or sector.";
    }
    if (!values.targetLocation.trim() || values.targetLocation.trim().length < 2) {
      nextErrors.targetLocation = "Enter your primary target locations (e.g. Namakkal, Salem, Erode).";
    }
    if (!values.preferredPackage) {
      nextErrors.preferredPackage = "Select an SEO package.";
    }
    if (!values.budget) {
      nextErrors.budget = "Select your estimated monthly budget.";
    }
    if (!values.challenges.trim() || values.challenges.trim().length < 10) {
      nextErrors.challenges = "Please describe your current SEO challenges or goals in at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;
    setGeneralError(null);

    if (!validate()) {
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError instanceof HTMLElement) {
        firstError.focus();
      }
      return;
    }

    inFlight.current = true;
    setSubmitting(true);

    try {
      const attribution = getAttribution();
      const payload = {
        name: values.name.trim(),
        company: values.company.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        websiteUrl: values.websiteUrl.trim(),
        industry: values.industry.trim(),
        targetLocation: values.targetLocation.trim(),
        preferredPackage: values.preferredPackage,
        budget: values.budget,
        challenges: values.challenges.trim(),
        website: values.website,
        sourcePage: window.location.pathname,
        landingPage: attribution.landingPage || window.location.pathname,
        referrer: attribution.referrer || document.referrer || "",
        utm: attribution.utm || {},
      };

      const res = await fetch("/api/seo-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        id?: string;
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          setGeneralError("Please review the highlighted fields below.");
        } else {
          setGeneralError(data.error || "Submission failed. Please try again or reach us directly via WhatsApp.");
        }
        return;
      }

      setSubmittedRef(data.id || "SEO-" + Date.now().toString().slice(-6));
    } catch {
      setGeneralError("Network connection interrupted. Please try again or message our team directly.");
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  const selectedPkg = SEO_PACKAGES_OPTIONS.find((p) => p.value === values.preferredPackage)?.label ?? "SEO Growth";
  const whatsappUrl = `https://wa.me/${COMPANY_CONTACT.phoneE164.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello Anantorix, I just submitted an SEO consultation enquiry for ${values.company || "my business"}. Ref: ${
      submittedRef || "SEO"
    }. Package: ${selectedPkg}.`,
  )}`;

  if (submittedRef) {
    return (
      <Card kind="quote" className="border-gold/40 bg-canvas p-6 md:p-10 text-center shadow-floating">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </div>

        <h3 className="type-h3 mt-5 text-fg-primary">SEO Consultation Request Received</h3>
        <p className="type-lead mt-2 text-fg-secondary">
          Thank you, <span className="font-semibold text-fg-primary">{values.name}</span>. Our technical SEO team has received your enquiry for{" "}
          <span className="font-semibold text-fg-primary">{values.company}</span>.
        </p>

        <div className="my-6 inline-flex items-center gap-2 rounded-panel border border-line bg-surface-1 px-4 py-2">
          <span className="type-small font-semibold text-fg-secondary">Enquiry Reference:</span>
          <span className="font-mono text-small font-bold text-deep-blue">{submittedRef}</span>
        </div>

        <div className="mx-auto max-w-xl text-left rounded-card border border-line bg-surface-1 p-5 text-small text-fg-secondary space-y-2">
          <p className="font-semibold text-fg-primary">What happens next?</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Our SEO specialists will run a preliminary crawl and audit of <strong className="text-fg-primary">{values.websiteUrl}</strong>.</li>
            <li>We evaluate competitor search rankings in <strong className="text-fg-primary">{values.targetLocation}</strong>.</li>
            <li>We share a prioritized initial audit report and tailored proposal within 3 working days.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-deep-blue px-6 font-semibold text-canvas shadow-raised hover:bg-indigo w-full sm:w-auto transition-colors"
          >
            <MessageSquare className="size-4" aria-hidden="true" />
            <span>Connect on WhatsApp</span>
          </a>
          <a
            href={COMPANY_CONTACT.phoneHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-canvas px-6 font-semibold text-deep-blue ring-1 ring-inset ring-line-strong hover:bg-surface-1 w-full sm:w-auto transition-colors"
          >
            <PhoneCall className="size-4" aria-hidden="true" />
            <span>Call Technical Team</span>
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card kind="quote" className="border-line-strong bg-canvas p-6 md:p-10 shadow-floating">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${formId}-website-trap`}>Leave this empty</label>
          <input
            id={`${formId}-website-trap`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={handleChange}
          />
        </div>

        {generalError && (
          <div
            role="alert"
            className="rounded-card border border-rose-300 bg-rose-50 p-4 text-small text-rose-800"
          >
            {generalError}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Full Name */}
          <div>
            <Label htmlFor={`${formId}-name`} required>
              Full Name
            </Label>
            <Input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-err` : undefined}
              placeholder="e.g. Senthil Kumar"
              required
            />
            {errors.name && <FieldError id={`${formId}-name-err`}>{errors.name}</FieldError>}
          </div>

          {/* Company Name */}
          <div>
            <Label htmlFor={`${formId}-company`} required>
              Company / Business Name
            </Label>
            <Input
              id={`${formId}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={handleChange}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? `${formId}-company-err` : undefined}
              placeholder="e.g. Kongu Textiles Ltd"
              required
            />
            {errors.company && (
              <FieldError id={`${formId}-company-err`}>{errors.company}</FieldError>
            )}
          </div>

          {/* Work Email */}
          <div>
            <Label htmlFor={`${formId}-email`} required>
              Work Email Address
            </Label>
            <Input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${formId}-email-err` : undefined}
              placeholder="e.g. senthil@company.com"
              required
            />
            {errors.email && <FieldError id={`${formId}-email-err`}>{errors.email}</FieldError>}
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <Label htmlFor={`${formId}-phone`} required>
              Phone / WhatsApp Number
            </Label>
            <Input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
              placeholder="e.g. +91 98765 43210"
              required
            />
            {errors.phone && <FieldError id={`${formId}-phone-err`}>{errors.phone}</FieldError>}
          </div>

          {/* Website URL */}
          <div>
            <Label htmlFor={`${formId}-websiteUrl`} required>
              Current Website URL
            </Label>
            <Input
              id={`${formId}-websiteUrl`}
              name="websiteUrl"
              type="url"
              value={values.websiteUrl}
              onChange={handleChange}
              aria-invalid={Boolean(errors.websiteUrl)}
              aria-describedby={errors.websiteUrl ? `${formId}-websiteUrl-err` : undefined}
              placeholder="e.g. https://mybusiness.com"
              required
            />
            {errors.websiteUrl && (
              <FieldError id={`${formId}-websiteUrl-err`}>{errors.websiteUrl}</FieldError>
            )}
          </div>

          {/* Industry */}
          <div>
            <Label htmlFor={`${formId}-industry`} required>
              Business Industry / Sector
            </Label>
            <Input
              id={`${formId}-industry`}
              name="industry"
              type="text"
              value={values.industry}
              onChange={handleChange}
              aria-invalid={Boolean(errors.industry)}
              aria-describedby={errors.industry ? `${formId}-industry-err` : undefined}
              placeholder="e.g. Manufacturing, Healthcare, Real Estate, Retail"
              required
            />
            {errors.industry && (
              <FieldError id={`${formId}-industry-err`}>{errors.industry}</FieldError>
            )}
          </div>

          {/* Target Location */}
          <div>
            <Label htmlFor={`${formId}-targetLocation`} required>
              Target Locations
            </Label>
            <Input
              id={`${formId}-targetLocation`}
              name="targetLocation"
              type="text"
              value={values.targetLocation}
              onChange={handleChange}
              aria-invalid={Boolean(errors.targetLocation)}
              aria-describedby={errors.targetLocation ? `${formId}-targetLocation-err` : undefined}
              placeholder="e.g. Namakkal, Salem, Erode, Tamil Nadu, Pan-India"
              required
            />
            {errors.targetLocation && (
              <FieldError id={`${formId}-targetLocation-err`}>{errors.targetLocation}</FieldError>
            )}
          </div>

          {/* Preferred SEO Package */}
          <div>
            <Label htmlFor={`${formId}-package`} required>
              Preferred SEO Package
            </Label>
            <Select
              id={`${formId}-package`}
              name="preferredPackage"
              value={values.preferredPackage}
              onChange={handleChange}
              aria-invalid={Boolean(errors.preferredPackage)}
              aria-describedby={errors.preferredPackage ? `${formId}-package-err` : undefined}
              required
            >
              {SEO_PACKAGES_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            {errors.preferredPackage && (
              <FieldError id={`${formId}-package-err`}>{errors.preferredPackage}</FieldError>
            )}
          </div>

          {/* Monthly Budget */}
          <div className="md:col-span-2">
            <Label htmlFor={`${formId}-budget`} required>
              Estimated Monthly SEO Budget
            </Label>
            <Select
              id={`${formId}-budget`}
              name="budget"
              value={values.budget}
              onChange={handleChange}
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={errors.budget ? `${formId}-budget-err` : undefined}
              required
            >
              {SEO_BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            {errors.budget && <FieldError id={`${formId}-budget-err`}>{errors.budget}</FieldError>}
          </div>
        </div>

        {/* Current Challenges / Goals */}
        <div>
          <Label htmlFor={`${formId}-challenges`} required>
            Current SEO Challenges &amp; Organic Goals
          </Label>
          <Textarea
            id={`${formId}-challenges`}
            name="challenges"
            rows={4}
            value={values.challenges}
            onChange={handleChange}
            aria-invalid={Boolean(errors.challenges)}
            aria-describedby={errors.challenges ? `${formId}-challenges-err` : undefined}
            placeholder="Tell us about your current organic visibility, target search terms, top competitors, or specific problems like low Google impressions or lack of inbound enquiries..."
            required
          />
          {errors.challenges && (
            <FieldError id={`${formId}-challenges-err`}>{errors.challenges}</FieldError>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-line">
          <p className="type-small text-fg-secondary">
            Confidential · Free preliminary site audit · No long-term lock-in
          </p>
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {submitting ? "Analyzing & Sending..." : "Request SEO Consultation"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
