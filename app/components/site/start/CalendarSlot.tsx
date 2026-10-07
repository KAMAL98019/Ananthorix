import { Mail, Phone } from "lucide-react";
import { COMPANY_CONTACT } from "../../../content/contact";

// "Prefer to talk?" block on the thank-you page. There is no calendar tool yet, so it offers a direct call
// or email. If a scheduling tool is added later, replace the body of this component and keep the id.
export default function CalendarSlot() {
  return (
    <div id="calendar-slot" className="grid items-center gap-8 rounded-panel border border-line bg-canvas p-8 shadow-raised md:p-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <h2 id="calendar-heading" className="type-h2 text-fg-primary">
          Prefer to talk?
        </h2>
        <p className="type-lead mt-4">Call us to talk through your brief, or email anything you would like to add.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
        <a
          href={COMPANY_CONTACT.phoneHref}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-deep-blue px-6 font-semibold text-canvas shadow-raised hover:bg-indigo"
        >
          <Phone aria-hidden="true" className="size-4" />
          Call {COMPANY_CONTACT.phoneDisplay}
        </a>
        <a
          href={`mailto:${COMPANY_CONTACT.email}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-canvas px-6 font-semibold text-deep-blue ring-1 ring-inset ring-line-strong hover:bg-surface-1"
        >
          <Mail aria-hidden="true" className="size-4" />
          Email us
        </a>
      </div>
    </div>
  );
}
