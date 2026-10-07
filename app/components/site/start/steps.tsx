"use client";

import { Checkbox, FieldError, Input, Label, Radio, Select, Textarea } from "../../ui/Field";
import { NEEDS, SITUATIONS, TIMELINES, BUDGETS, COMPANY_SIZES, CONTACT_METHODS, LANGUAGES } from "../../../lib/leads/schema";
import type { Errors, FormValues } from "./formModel";

// Each step receives values, errors and an onChange setter. Labels stay visible; colour is never the only signal.
type StepProps = {
  values: FormValues;
  errors: Errors;
  onChange: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
};

function Fieldset({ legend, error, children, errorId }: { legend: string; error?: string; errorId: string; children: React.ReactNode }) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="space-y-3">
      <legend className="type-small mb-3 font-semibold text-fg-primary">{legend}</legend>
      {children}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </fieldset>
  );
}

export function NeedsStep({ values, errors, onChange }: StepProps) {
  const toggle = (value: string, checked: boolean) => {
    const next = checked ? [...values.needs, value] : values.needs.filter((n) => n !== value);
    onChange("needs", next);
  };
  return (
    <Fieldset legend="Choose everything that applies." error={errors.needs} errorId="needs-error">
      <div className="grid gap-3 sm:grid-cols-2">
        {NEEDS.map((need) => (
          <div key={need.value} className="rounded-input border border-line-strong bg-canvas px-4 has-[:checked]:border-deep-blue has-[:checked]:bg-surface-1">
            <Checkbox
              id={`need-${need.value}`}
              name="needs"
              value={need.value}
              checked={values.needs.includes(need.value)}
              onChange={(e) => toggle(need.value, e.target.checked)}
              label={need.label}
            />
          </div>
        ))}
      </div>
    </Fieldset>
  );
}

export function SituationStep({ values, errors, onChange }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="description" required>Describe the project</Label>
        <p id="description-hint" className="type-small text-fg-secondary">A few sentences is enough. What should be better, and by when?</p>
        <Textarea
          id="description"
          name="description"
          rows={5}
          maxLength={2000}
          value={values.description}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error description-hint" : "description-hint"}
          onChange={(e) => onChange("description", e.target.value)}
        />
        {errors.description && <FieldError id="description-error">{errors.description}</FieldError>}
      </div>

      <Fieldset legend="Which situation fits best?" error={errors.situation} errorId="situation-error">
        <div className="grid gap-3 sm:grid-cols-3">
          {SITUATIONS.map((s) => (
            <div key={s.value} className="rounded-input border border-line-strong bg-canvas px-4 has-[:checked]:border-deep-blue has-[:checked]:bg-surface-1">
              <Radio id={`situation-${s.value}`} name="situation" value={s.value} checked={values.situation === s.value} onChange={() => onChange("situation", s.value)} label={s.label} />
            </div>
          ))}
        </div>
      </Fieldset>

      <Fieldset legend="When do you need to start?" error={errors.timeline} errorId="timeline-error">
        <div className="grid gap-3 sm:grid-cols-2">
          {TIMELINES.map((t) => (
            <div key={t.value} className="rounded-input border border-line-strong bg-canvas px-4 has-[:checked]:border-deep-blue has-[:checked]:bg-surface-1">
              <Radio id={`timeline-${t.value}`} name="timeline" value={t.value} checked={values.timeline === t.value} onChange={() => onChange("timeline", t.value)} label={t.label} />
            </div>
          ))}
        </div>
      </Fieldset>
    </div>
  );
}

export function ContextStep({ values, errors, onChange }: StepProps) {
  return (
    <div className="space-y-8">
      <Fieldset legend="Budget range (optional)" errorId="budget-error">
        <div className="grid gap-3 sm:grid-cols-2">
          {BUDGETS.map((b) => (
            <div key={b.value} className="rounded-input border border-line-strong bg-canvas px-4 has-[:checked]:border-deep-blue has-[:checked]:bg-surface-1">
              <Radio id={`budget-${b.value}`} name="budget" value={b.value} checked={values.budget === b.value} onChange={() => onChange("budget", b.value)} label={b.label} />
            </div>
          ))}
          <div className="rounded-input border border-line-strong bg-canvas px-4 has-[:checked]:border-deep-blue has-[:checked]:bg-surface-1">
            <Radio id="budget-none" name="budget" value="" checked={values.budget === ""} onChange={() => onChange("budget", "")} label="Skip this question" />
          </div>
        </div>
      </Fieldset>

      <div className="space-y-2">
        <Label htmlFor="companySize" required>Company size</Label>
        <Select
          id="companySize"
          name="companySize"
          value={values.companySize}
          aria-invalid={Boolean(errors.companySize)}
          aria-describedby={errors.companySize ? "companySize-error" : undefined}
          onChange={(e) => onChange("companySize", e.target.value)}
        >
          <option value="">Choose one</option>
          {COMPANY_SIZES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </Select>
        {errors.companySize && <FieldError id="companySize-error">{errors.companySize}</FieldError>}
      </div>

    </div>
  );
}

export function ContactStep({ values, errors, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" required>Full name</Label>
          <Input id="name" name="name" type="text" autoComplete="name" value={values.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} onChange={(e) => onChange("name", e.target.value)} />
          {errors.name && <FieldError id="name-error">{errors.name}</FieldError>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" required>Work email</Label>
          <Input id="email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={values.email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onChange={(e) => onChange("email", e.target.value)} />
          {errors.email && <FieldError id="email-error">{errors.email}</FieldError>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" required>Company</Label>
          <Input id="company" name="company" type="text" autoComplete="organization" value={values.company} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} onChange={(e) => onChange("company", e.target.value)} />
          {errors.company && <FieldError id="company-error">{errors.company}</FieldError>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone or WhatsApp (optional)</Label>
          <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} onChange={(e) => onChange("phone", e.target.value)} />
          {errors.phone && <FieldError id="phone-error">{errors.phone}</FieldError>}
        </div>
      </div>

      <Fieldset legend="How should we contact you?" error={errors.contactMethod} errorId="contactMethod-error">
        <div className="grid gap-3 sm:grid-cols-3">
          {CONTACT_METHODS.map((m) => (
            <div key={m.value} className="rounded-input border border-line-strong bg-canvas px-4 has-[:checked]:border-deep-blue has-[:checked]:bg-surface-1">
              <Radio id={`contact-${m.value}`} name="contactMethod" value={m.value} checked={values.contactMethod === m.value} onChange={() => onChange("contactMethod", m.value)} label={m.label} />
            </div>
          ))}
        </div>
      </Fieldset>

      <Fieldset legend="Language for a call" error={errors.language} errorId="language-error">
        <div className="grid gap-3 sm:grid-cols-2">
          {LANGUAGES.map((l) => (
            <div key={l.value} className="rounded-input border border-line-strong bg-canvas px-4 has-[:checked]:border-deep-blue has-[:checked]:bg-surface-1">
              <Radio id={`language-${l.value}`} name="language" value={l.value} checked={values.language === l.value} onChange={() => onChange("language", l.value)} label={l.label} />
            </div>
          ))}
        </div>
      </Fieldset>

      <div className="rounded-input border border-line-strong bg-canvas p-4">
        <Checkbox
          id="consent"
          name="consent"
          checked={values.consent}
          onChange={(e) => onChange("consent", e.target.checked)}
          label="I agree that Anantorix can contact me about this project brief. I can ask for my details to be removed at any time."
        />
        {errors.consent && <FieldError id="consent-error">{errors.consent}</FieldError>}
      </div>

      {/* Honeypot: hidden from people and assistive technology. Real users leave it empty. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="website">Website (leave empty)</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => onChange("website", e.target.value)} />
      </div>
    </div>
  );
}
