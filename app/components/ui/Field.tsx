import { cx } from "./cx";

// Form primitives. Pass an `id` to every field. Connect errors with
// aria-describedby, and set aria-invalid when a field is invalid.

export function Label({
  htmlFor,
  required = false,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="type-small font-semibold text-fg-primary">
      {children}
      {required && (
        <>
          <span aria-hidden="true" className="ml-1 text-error">*</span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  );
}

const control =
  "w-full min-h-11 rounded-input border border-line-strong bg-canvas px-4 py-3 text-base text-fg-primary placeholder:text-fg-secondary aria-invalid:border-error disabled:bg-surface-2 disabled:text-fg-secondary";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(control, className)} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cx(control, "min-h-32 resize-y", className)} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cx(control, "pr-10", className)}>
      {children}
    </select>
  );
}

// The whole label row is the touch target (at least 44px tall).
export function Checkbox({
  id,
  label,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { id: string; label: React.ReactNode }) {
  return (
    <div className="flex min-h-11 items-start gap-3">
      <input id={id} type="checkbox" {...props} className="mt-1 size-5 shrink-0 accent-deep-blue" />
      <label htmlFor={id} className="type-small cursor-pointer text-fg-primary">
        {label}
      </label>
    </div>
  );
}

export function Radio({
  id,
  label,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { id: string; label: React.ReactNode }) {
  return (
    <div className="flex min-h-11 items-start gap-3">
      <input id={id} type="radio" {...props} className="mt-1 size-5 shrink-0 accent-deep-blue" />
      <label htmlFor={id} className="type-small cursor-pointer text-fg-primary">
        {label}
      </label>
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="type-small text-error">
      {children}
    </p>
  );
}

// Form-level message. Errors use role="alert"; success uses role="status".
export function FormMessage({
  variant,
  children,
}: {
  variant: "error" | "success";
  children: React.ReactNode;
}) {
  const isError = variant === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={cx(
        "rounded-input px-4 py-3 type-small",
        isError ? "bg-error-surface text-error" : "bg-surface-2 text-deep-blue",
      )}
    >
      {children}
    </div>
  );
}
