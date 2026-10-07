"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import { cx } from "../../ui/cx";
import { FormMessage } from "../../ui/Field";
import { ContactStep, ContextStep, NeedsStep, SituationStep } from "./steps";
import { initialValues, STEPS, validateStep, type Errors, type FormValues } from "./formModel";
import { labelFor, NEEDS, SITUATIONS, TIMELINES } from "../../../lib/leads/schema";
import type { StartContext } from "../../../lib/leads/context";

// Guided 4-step brief. One question group per step. Step changes animate (opacity and translateX)
// unless the visitor prefers reduced motion. Server validation is authoritative.

const STEP_FOR_FIELD: Record<string, number> = {
  needs: 0,
  description: 1, situation: 1, timeline: 1,
  budget: 2, companySize: 2,
  name: 3, email: 3, phone: 3, company: 3, contactMethod: 3, language: 3, consent: 3,
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export default function StartProjectForm({ context, contextLabel }: { context: StartContext; contextLabel: string | null }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [leaving, setLeaving] = useState(false);
  const [values, setValues] = useState<FormValues>(() => initialValues(context));
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const skipFocus = useRef(true);

  // Move focus to the new step heading so screen readers announce it. Skipped on first render.
  useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const onChange = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goTo = (next: number, dir: "forward" | "back") => {
    setErrors({});
    setServerError("");
    setDirection(dir);
    if (reducedMotion()) {
      setStep(next);
      return;
    }
    setLeaving(true);
    window.setTimeout(() => {
      setLeaving(false);
      setStep(next);
    }, 200);
  };

  const focusFirstInvalid = () => {
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    });
  };

  const submit = async () => {
    setSubmitting(true);
    setServerError("");
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const v = params.get(key);
      if (v) utm[key.replace("utm_", "")] = v;
    }
    const payload = {
      ...values,
      sourcePage: `${window.location.pathname}${window.location.search}`.slice(0, 200),
      referrer: document.referrer.slice(0, 300),
      utm,
      contextService: context.service,
      contextAgent: context.agent,
    };
    try {
      const res = await fetch("/api/start-a-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/start-a-project/thank-you");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { errors?: Errors; error?: string };
      if (data.errors) {
        setErrors(data.errors);
        const firstField = Object.keys(data.errors)[0];
        const target = STEP_FOR_FIELD[firstField] ?? 0;
        goTo(target, "back");
        setServerError("Some answers need another look. Please check the highlighted fields.");
      } else {
        setServerError(data.error ?? "We could not send your brief. Please try again.");
      }
    } catch {
      setServerError("We could not reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    const stepErrors = validateStep(step, values);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstInvalid();
      return;
    }
    if (step === STEPS.length - 1) {
      void submit();
      return;
    }
    goTo(step + 1, "forward");
  };

  const back = () => goTo(step - 1, "back");

  const isLast = step === STEPS.length - 1;
  const stepErrorCount = Object.keys(errors).length;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-8">
        {/* Progress */}
        <nav aria-label="Form progress" className="mb-8">
          <ol className="grid grid-cols-4 gap-2">
            {STEPS.map((s, index) => {
              const done = index < step;
              const isCurrent = index === step;
              return (
                <li key={s.id} className="min-w-0">
                  <div aria-hidden="true" className={cx("h-1.5 rounded-chip", done || isCurrent ? "bg-deep-blue" : "bg-line-strong")} />
                  <p
                    aria-current={isCurrent ? "step" : undefined}
                    className={cx("mt-2 truncate type-small", isCurrent ? "font-semibold text-fg-primary" : "text-fg-secondary")}
                  >
                    <span className="sr-only">{done ? "Completed: " : isCurrent ? "Current: " : "Upcoming: "}</span>
                    {s.label}
                  </p>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 type-small text-fg-secondary">Step {step + 1} of {STEPS.length}</p>
        </nav>

        <Card kind="service" as="div" className="p-6 md:p-10">
          <form
            noValidate
            aria-labelledby="start-step-heading"
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
          >
            <h2 id="start-step-heading" ref={headingRef} tabIndex={-1} className="type-h2 text-fg-primary focus:outline-none">
              {stepTitle(step)}
            </h2>
            <p className="type-small mt-3 text-fg-secondary">{stepIntro(step)}</p>

            <div
              key={step}
              className={cx(
                "mt-8",
                leaving
                  ? "start-step-exit"
                  : direction === "forward"
                    ? "start-step-enter-forward"
                    : "start-step-enter-back",
              )}
            >
              {step === 0 && <NeedsStep values={values} errors={errors} onChange={onChange} />}
              {step === 1 && <SituationStep values={values} errors={errors} onChange={onChange} />}
              {step === 2 && <ContextStep values={values} errors={errors} onChange={onChange} />}
              {step === 3 && <ContactStep values={values} errors={errors} onChange={onChange} />}
            </div>

            {stepErrorCount > 0 && (
              <div className="mt-6">
                <FormMessage variant="error">
                  {stepErrorCount === 1 ? "One answer needs your attention." : `${stepErrorCount} answers need your attention.`}
                </FormMessage>
              </div>
            )}
            {serverError && (
              <div className="mt-6">
                <FormMessage variant="error">{serverError}</FormMessage>
              </div>
            )}

            {/* Controls: sticky at the bottom on small screens */}
            <div className="sticky bottom-0 mt-10 -mx-6 flex items-center justify-between gap-3 border-t border-line bg-canvas px-6 py-4 md:-mx-10 md:px-10 md:static md:border-0 md:bg-transparent md:py-0">
              {step > 0 ? (
                <Button variant="secondary" onClick={back} disabled={submitting}>
                  Back
                </Button>
              ) : (
                <span />
              )}
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? "Sending your brief…" : isLast ? "Send my brief" : "Continue"}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Summary panel: desktop only, keeps the brief in view */}
      <aside aria-label="Your brief so far" className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-32 rounded-card border border-line bg-surface-1 p-6">
          <p className="type-eyebrow">Your brief so far</p>
          {contextLabel && (
            <p className="type-small mt-3 text-fg-secondary">
              You came from: <span className="font-semibold text-fg-primary">{contextLabel}</span>
            </p>
          )}
          <dl className="mt-5 space-y-4 type-small">
            <div>
              <dt className="font-semibold text-fg-primary">Needs</dt>
              <dd className="text-fg-secondary">
                {values.needs.length ? values.needs.map((n) => labelFor(NEEDS, n)).join(", ") : "Not chosen yet"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-fg-primary">Situation</dt>
              <dd className="text-fg-secondary">{values.situation ? labelFor(SITUATIONS, values.situation) : "Not chosen yet"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-fg-primary">Timeline</dt>
              <dd className="text-fg-secondary">{values.timeline ? labelFor(TIMELINES, values.timeline) : "Not chosen yet"}</dd>
            </div>
          </dl>
          <p className="type-small mt-6 text-fg-secondary">We scope each project to your requirements. Pricing is not shown until the scope is clear.</p>
        </div>
      </aside>
    </div>
  );
}

function stepTitle(step: number) {
  return ["What do you need?", "Tell us about your project", "A little business context", "How do we reach you?"][step];
}

function stepIntro(step: number) {
  return [
    "Choose everything that applies. You can change this later.",
    "The more specific you are, the more useful our first reply.",
    "Budget is optional. You can prefer to discuss it on a call.",
    "We only use these details to reply to your brief.",
  ][step];
}
