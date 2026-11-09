import { COMPANY_CONTACT } from "../../content/contact";
import { SITE_URL } from "../seo";
import {
  BUDGETS,
  COMPANY_SIZES,
  CONTACT_METHODS,
  LANGUAGES,
  labelFor,
  NEEDS,
  quoteBudgetOptions,
  QUOTE_SERVICES,
  QUOTE_TIMELINES,
  SITUATIONS,
  TIMELINES,
  type LeadRecord,
  type QuoteRecord,
} from "./schema";
import { SEO_BUDGET_OPTIONS, SEO_PACKAGES_OPTIONS, type SeoEnquiryRecord } from "./seoSchema";

// Branded email templates for the Start a Project flow.
// - leadConfirmation: sent to the person who submitted the brief.
// - internalNotification: received by Anantorix.
// Email-safe HTML: table layout, inline styles, no images or web fonts (remote images are often blocked and raise
// spam scores). Every user-supplied value is HTML-escaped. Each email also has a plain-text version.

export type EmailContent = { subject: string; text: string; html: string };

const C = {
  deepBlue: "#0A1F44",
  indigo: "#3B2F7A",
  purple: "#5B3FD1",
  gold: "#D4AF37",
  text: "#0A1020",
  muted: "#5F6675",
  line: "#E3E6EE",
  surface: "#F5F7FA",
};
const FONT = "Arial,Helvetica,sans-serif";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const listOf = (values: readonly string[], options: readonly { value: string; label: string }[]) =>
  values.map((v) => labelFor(options, v)).join(", ") || "Not specified";

export function shortReference(id: string): string {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? "";
}

function istTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return `${new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(date)} IST`;
}

// Shared layout: dark header with the wordmark and a gold rule, white card, contact footer.
function layout({ preheader, eyebrow, title, body }: { preheader: string; eyebrow: string; title: string; body: string }): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${C.surface};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surface};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${C.line};">
  <tr><td style="background:${C.deepBlue};padding:24px 32px;">
    <p style="margin:0;font-family:${FONT};font-size:18px;font-weight:bold;letter-spacing:2px;color:#ffffff;">ANANTORIX</p>
    <p style="margin:2px 0 0;font-family:${FONT};font-size:10px;letter-spacing:4px;color:${C.gold};">TECHNOLOGIES</p>
  </td></tr>
  <tr><td style="height:3px;background:${C.gold};font-size:0;line-height:0;">&nbsp;</td></tr>
  <tr><td style="padding:32px;font-family:${FONT};color:${C.text};font-size:15px;line-height:1.6;">
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.purple};font-weight:bold;">${escapeHtml(eyebrow)}</p>
    <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;color:${C.text};">${escapeHtml(title)}</h1>
    ${body}
  </td></tr>
  <tr><td style="padding:20px 32px;background:${C.surface};border-top:1px solid ${C.line};font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted};">
    ${escapeHtml(COMPANY_CONTACT.name)}, ${escapeHtml(COMPANY_CONTACT.locationDisplay)}<br>
    <a href="mailto:${escapeHtml(COMPANY_CONTACT.email)}" style="color:${C.deepBlue};">${escapeHtml(COMPANY_CONTACT.email)}</a> &middot;
    <a href="${escapeHtml(COMPANY_CONTACT.phoneHref)}" style="color:${C.deepBlue};">${escapeHtml(COMPANY_CONTACT.phoneDisplay)}</a> &middot;
    <a href="${escapeHtml(SITE_URL)}" style="color:${C.deepBlue};">${escapeHtml(SITE_URL.replace(/^https?:\/\//, ""))}</a>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function detailTable(rows: { label: string; value: string; html?: string }[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 20px;">${rows
    .map(
      (r) =>
        `<tr><td style="padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font-size:13px;color:${C.muted};vertical-align:top;white-space:nowrap;width:38%;">${escapeHtml(r.label)}</td>` +
        `<td style="padding:10px 0;border-bottom:1px solid ${C.line};font-size:14px;color:${C.text};white-space:pre-wrap;">${r.html ?? escapeHtml(r.value)}</td></tr>`,
    )
    .join("")}</table>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 8px 4px 0;display:inline-table;"><tr><td style="background:${C.deepBlue};border-radius:10px;">
<a href="${escapeHtml(href)}" style="display:inline-block;padding:11px 20px;font-family:${FONT};font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">${escapeHtml(label)}</a></td></tr></table>`;
}

const NEXT_STEPS = [
  "We review your brief and the details you shared.",
  "We contact you by your preferred method to talk it through.",
  "If the fit is right, we agree the scope and the next step with you.",
];

// Sent to the person who submitted the brief.
export function leadConfirmation(r: LeadRecord): EmailContent {
  const name = firstName(r.name);
  const ref = shortReference(r.id);
  const summary = [
    { label: "What you need", value: listOf(r.needs, NEEDS) },
    { label: "Situation", value: labelFor(SITUATIONS, r.situation) },
    { label: "Timeline", value: labelFor(TIMELINES, r.timeline) },
    { label: "Preferred contact", value: labelFor(CONTACT_METHODS, r.contactMethod) },
    { label: "Reference", value: ref },
  ];

  const html = layout({
    preheader: "We have received your project brief and will review the details.",
    eyebrow: "Project brief received",
    title: `Thank you, ${name}.`,
    body: `
<p style="margin:0 0 16px;">We have received your project brief and will review the details you shared. Here is a summary for your records.</p>
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Your brief</p>
${detailTable(summary)}
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">What happens next</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">${NEXT_STEPS.map(
      (step, i) =>
        `<tr><td style="width:32px;padding:6px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:11px;background:${C.deepBlue};color:${C.gold};font-size:12px;font-weight:bold;line-height:22px;text-align:center;">${i + 1}</span></td><td style="padding:6px 0;font-size:14px;color:${C.text};">${escapeHtml(step)}</td></tr>`,
    ).join("")}</table>
<p style="margin:0 0 16px;">Want to add something? Just reply to this email.</p>
<p style="margin:0;">Regards,<br><strong>The Anantorix team</strong></p>`,
  });

  const text = [
    `Thank you, ${name}.`,
    "",
    "We have received your project brief and will review the details you shared.",
    "",
    "YOUR BRIEF",
    ...summary.map((s) => `${s.label}: ${s.value}`),
    "",
    "WHAT HAPPENS NEXT",
    ...NEXT_STEPS.map((s, i) => `${i + 1}. ${s}`),
    "",
    "Want to add something? Just reply to this email.",
    "",
    "Regards,",
    "The Anantorix team",
    `${COMPANY_CONTACT.name}, ${COMPANY_CONTACT.locationDisplay}`,
    `${COMPANY_CONTACT.email} | ${COMPANY_CONTACT.phoneDisplay} | ${SITE_URL}`,
  ].join("\n");

  // Fixed subject: no user-supplied text in headers.
  return { subject: "Your project brief for Anantorix Technologies", text, html };
}

// Received by Anantorix.
export function internalNotification(r: LeadRecord): EmailContent {
  const needs = listOf(r.needs, NEEDS);
  const ref = shortReference(r.id);
  const contact = [
    { label: "Name", value: r.name },
    { label: "Email", value: r.email, html: `<a href="mailto:${escapeHtml(r.email)}" style="color:${C.purple};">${escapeHtml(r.email)}</a>` },
    ...(r.phone ? [{ label: "Phone", value: r.phone, html: `<a href="tel:${escapeHtml(r.phone.replace(/[^\d+]/g, ""))}" style="color:${C.purple};">${escapeHtml(r.phone)}</a>` }] : []),
    { label: "Company", value: r.company || "Not given" },
    { label: "Prefers", value: `${labelFor(CONTACT_METHODS, r.contactMethod)} in ${labelFor(LANGUAGES, r.language)}` },
  ];
  const project = [
    { label: "Needs", value: needs },
    { label: "Situation", value: labelFor(SITUATIONS, r.situation) },
    { label: "Timeline", value: labelFor(TIMELINES, r.timeline) },
    { label: "Budget", value: r.budget ? labelFor(BUDGETS, r.budget) : "Not specified" },
    { label: "Company size", value: labelFor(COMPANY_SIZES, r.companySize) },
  ];
  const source = [
    { label: "Landing page", value: r.landingPage || "Not captured" },
    { label: "Form page", value: r.sourcePage || "Not captured" },
    { label: "Referrer", value: r.referrer || "Not captured" },
    ...Object.entries(r.utm).map(([k, v]) => ({ label: `UTM ${k}`, value: v })),
    ...(r.contextService ? [{ label: "From service", value: r.contextService }] : []),
    ...(r.contextAgent ? [{ label: "From agent", value: r.contextAgent }] : []),
    { label: "Received", value: istTime(r.timestamp) },
    { label: "Reference", value: `${ref} (${r.id})` },
  ];

  const callButton = r.phone ? button(`tel:${r.phone.replace(/[^\d+]/g, "")}`, "Call") : "";
  const html = layout({
    preheader: `${r.name} sent a project brief: ${needs}`,
    eyebrow: `New project brief · ${ref}`,
    title: `${r.name}${r.company ? ` from ${r.company}` : ""}`,
    body: `
<p style="margin:0 0 18px;">${button(`mailto:${r.email}`, `Reply to ${firstName(r.name)}`)}${callButton}</p>
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Contact</p>
${detailTable(contact)}
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Project</p>
${detailTable(project)}
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Their message</p>
<div style="margin:0 0 20px;padding:16px;border-left:3px solid ${C.gold};background:${C.surface};border-radius:8px;font-size:14px;white-space:pre-wrap;color:${C.text};">${escapeHtml(r.description || "No description given.")}</div>
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Source</p>
${detailTable(source)}`,
  });

  const text = [
    `NEW PROJECT BRIEF (${ref})`,
    "",
    "CONTACT",
    ...contact.map((c) => `${c.label}: ${c.value}`),
    "",
    "PROJECT",
    ...project.map((p) => `${p.label}: ${p.value}`),
    "",
    "THEIR MESSAGE",
    r.description || "No description given.",
    "",
    "SOURCE",
    ...source.map((s) => `${s.label}: ${s.value}`),
  ].join("\n");

  // Fixed labels only in the subject (need labels come from the allowlist, never free text).
  return { subject: `New project brief: ${needs} (${ref})`, text, html };
}

// Sent to the person who submitted a quote enquiry.
export function quoteConfirmation(r: QuoteRecord): EmailContent {
  const name = firstName(r.name);
  const ref = shortReference(r.id);
  const serviceLabel = labelFor(QUOTE_SERVICES, r.service);
  const budgetLabel = labelFor(quoteBudgetOptions(r.currency), r.budget);
  const timelineLabel = labelFor(QUOTE_TIMELINES, r.timeline);

  const summary = [
    { label: "Service requested", value: serviceLabel },
    { label: "Estimated budget", value: budgetLabel },
    { label: "Expected timeline", value: timelineLabel },
    { label: "Company", value: r.company },
    { label: "Phone / WhatsApp", value: r.phone },
    { label: "Reference", value: ref },
  ];

  const html = layout({
    preheader: "We have received your project quote enquiry and will prepare an indicative estimate.",
    eyebrow: "Quote enquiry received",
    title: `Thank you, ${name}.`,
    body: `
<p style="margin:0 0 16px;">We have received your quote enquiry for <strong>${escapeHtml(serviceLabel)}</strong>. Our team is reviewing your project requirements and will reach out with an indicative estimate and technical breakdown.</p>
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Your enquiry summary</p>
${detailTable(summary)}
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">What happens next</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr><td style="width:32px;padding:6px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:11px;background:${C.deepBlue};color:${C.gold};font-size:12px;font-weight:bold;line-height:22px;text-align:center;">1</span></td><td style="padding:6px 0;font-size:14px;color:${C.text};">We review your project requirements against our indicative pricing tiers.</td></tr>
  <tr><td style="width:32px;padding:6px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:11px;background:${C.deepBlue};color:${C.gold};font-size:12px;font-weight:bold;line-height:22px;text-align:center;">2</span></td><td style="padding:6px 0;font-size:14px;color:${C.text};">A technical lead contacts you via email, phone, or WhatsApp to clarify specifics.</td></tr>
  <tr><td style="width:32px;padding:6px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:11px;background:${C.deepBlue};color:${C.gold};font-size:12px;font-weight:bold;line-height:22px;text-align:center;">3</span></td><td style="padding:6px 0;font-size:14px;color:${C.text};">We present a tailored, fixed-price proposal with milestone schedule and delivery plan.</td></tr>
</table>
<p style="margin:0 0 16px;">Have urgent specifications to share? Simply reply directly to this email or call us at <strong>${escapeHtml(COMPANY_CONTACT.phoneDisplay)}</strong>.</p>
<p style="margin:0;">Regards,<br><strong>The Anantorix team</strong></p>`,
  });

  const text = [
    `Thank you, ${name}.`,
    "",
    `We have received your quote enquiry for ${serviceLabel}.`,
    "",
    "YOUR ENQUIRY SUMMARY",
    ...summary.map((s) => `${s.label}: ${s.value}`),
    "",
    "WHAT HAPPENS NEXT",
    "1. We review your project requirements against our indicative pricing tiers.",
    "2. A technical lead contacts you via email, phone, or WhatsApp to clarify specifics.",
    "3. We present a tailored, fixed-price proposal with milestone schedule and delivery plan.",
    "",
    `Have urgent questions? Contact us at ${COMPANY_CONTACT.email} or ${COMPANY_CONTACT.phoneDisplay}.`,
    "",
    "Regards,",
    "The Anantorix team",
    `${COMPANY_CONTACT.name}, ${COMPANY_CONTACT.locationDisplay}`,
    `${COMPANY_CONTACT.email} | ${COMPANY_CONTACT.phoneDisplay} | ${SITE_URL}`,
  ].join("\n");

  return { subject: `Your quote enquiry for Anantorix Technologies (${ref})`, text, html };
}

// Received by Anantorix when someone submits a quote enquiry.
export function quoteInternalNotification(r: QuoteRecord): EmailContent {
  const ref = shortReference(r.id);
  const serviceLabel = labelFor(QUOTE_SERVICES, r.service);
  const budgetLabel = labelFor(quoteBudgetOptions(r.currency), r.budget);
  const timelineLabel = labelFor(QUOTE_TIMELINES, r.timeline);

  const contact = [
    { label: "Name", value: r.name },
    { label: "Company", value: r.company },
    { label: "Email", value: r.email, html: `<a href="mailto:${escapeHtml(r.email)}" style="color:${C.purple};">${escapeHtml(r.email)}</a>` },
    { label: "Phone / WhatsApp", value: r.phone, html: `<a href="tel:${escapeHtml(r.phone.replace(/[^\d+]/g, ""))}" style="color:${C.purple};">${escapeHtml(r.phone)}</a>` },
  ];

  const project = [
    { label: "Service", value: serviceLabel },
    { label: "Estimated budget", value: budgetLabel },
    { label: "Expected timeline", value: timelineLabel },
  ];

  const source = [
    { label: "Landing page", value: r.landingPage || "Not captured" },
    { label: "Form page", value: r.sourcePage || "Not captured" },
    { label: "Referrer", value: r.referrer || "Not captured" },
    ...Object.entries(r.utm).map(([k, v]) => ({ label: `UTM ${k}`, value: v })),
    { label: "Received", value: istTime(r.timestamp) },
    { label: "Reference", value: `${ref} (${r.id})` },
  ];

  const callButton = r.phone ? button(`tel:${r.phone.replace(/[^\d+]/g, "")}`, "Call Client") : "";
  const waButton = r.phone ? button(`https://wa.me/${r.phone.replace(/[^\d]/g, "")}`, "WhatsApp") : "";

  const html = layout({
    preheader: `New quote enquiry from ${r.name} (${r.company}) for ${serviceLabel} [${budgetLabel}]`,
    eyebrow: `New quote enquiry · ${ref}`,
    title: `${r.name} (${r.company})`,
    body: `
<p style="margin:0 0 18px;">${button(`mailto:${r.email}`, `Reply to ${firstName(r.name)}`)}${callButton}${waButton}</p>
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Contact Information</p>
${detailTable(contact)}
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Project Scope & Budget</p>
${detailTable(project)}
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Project Requirements</p>
<div style="margin:0 0 20px;padding:16px;border-left:3px solid ${C.gold};background:${C.surface};border-radius:8px;font-size:14px;white-space:pre-wrap;color:${C.text};">${escapeHtml(r.requirements || "No details provided.")}</div>
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Attribution & Source</p>
${detailTable(source)}`,
  });

  const text = [
    `NEW QUOTE ENQUIRY (${ref})`,
    "",
    "CONTACT",
    ...contact.map((c) => `${c.label}: ${c.value}`),
    "",
    "PROJECT",
    ...project.map((p) => `${p.label}: ${p.value}`),
    "",
    "PROJECT REQUIREMENTS",
    r.requirements || "No details provided.",
    "",
    "SOURCE & ATTRIBUTION",
    ...source.map((s) => `${s.label}: ${s.value}`),
  ].join("\n");

  return { subject: `New Quote Enquiry: ${serviceLabel} · ${budgetLabel} (${ref})`, text, html };
}

// Sent to the person who submitted an SEO enquiry.
export function seoConfirmation(r: SeoEnquiryRecord): EmailContent {
  const name = firstName(r.name);
  const ref = shortReference(r.id);
  const packageLabel = labelFor(SEO_PACKAGES_OPTIONS, r.preferredPackage);
  const budgetLabel = labelFor(SEO_BUDGET_OPTIONS, r.budget);

  const summary = [
    { label: "Website URL", value: r.websiteUrl },
    { label: "Company", value: r.company },
    { label: "Preferred package", value: packageLabel },
    { label: "Monthly budget", value: budgetLabel },
    { label: "Target location", value: r.targetLocation },
    { label: "Reference", value: ref },
  ];

  const html = layout({
    preheader: "We have received your SEO consultation request and will audit your website.",
    eyebrow: "SEO consultation request received",
    title: `Thank you, ${name}.`,
    body: `
<p style="margin:0 0 16px;">We have received your SEO enquiry for <strong>${escapeHtml(r.company)}</strong> (${escapeHtml(r.websiteUrl)}). Our search strategists are reviewing your website crawlability and target local keywords.</p>
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Your enquiry summary</p>
${detailTable(summary)}
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">What happens next</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr><td style="width:32px;padding:6px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:11px;background:${C.deepBlue};color:${C.gold};font-size:12px;font-weight:bold;line-height:22px;text-align:center;">1</span></td><td style="padding:6px 0;font-size:14px;color:${C.text};">We conduct an initial technical and on-page crawl of your website.</td></tr>
  <tr><td style="width:32px;padding:6px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:11px;background:${C.deepBlue};color:${C.gold};font-size:12px;font-weight:bold;line-height:22px;text-align:center;">2</span></td><td style="padding:6px 0;font-size:14px;color:${C.text};">We evaluate search competition in ${escapeHtml(r.targetLocation || "your target markets")}.</td></tr>
  <tr><td style="width:32px;padding:6px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:11px;background:${C.deepBlue};color:${C.gold};font-size:12px;font-weight:bold;line-height:22px;text-align:center;">3</span></td><td style="padding:6px 0;font-size:14px;color:${C.text};">We reach out via phone or WhatsApp to present our prioritized SEO roadmap and proposal.</td></tr>
</table>
<p style="margin:0 0 16px;">Have urgent questions? Reply directly to this email or call us at <strong>${escapeHtml(COMPANY_CONTACT.phoneDisplay)}</strong>.</p>
<p style="margin:0;">Regards,<br><strong>The Anantorix SEO team</strong></p>`,
  });

  const text = [
    `Thank you, ${name}.`,
    "",
    `We have received your SEO consultation request for ${r.company} (${r.websiteUrl}).`,
    "",
    "YOUR ENQUIRY SUMMARY",
    ...summary.map((s) => `${s.label}: ${s.value}`),
    "",
    "WHAT HAPPENS NEXT",
    "1. We conduct an initial technical and on-page crawl of your website.",
    `2. We evaluate search competition in ${r.targetLocation || "your target markets"}.`,
    "3. We reach out via phone or WhatsApp to present our prioritized SEO roadmap and proposal.",
    "",
    `Have urgent questions? Contact us at ${COMPANY_CONTACT.email} or ${COMPANY_CONTACT.phoneDisplay}.`,
    "",
    "Regards,",
    "The Anantorix SEO team",
    `${COMPANY_CONTACT.name}, ${COMPANY_CONTACT.locationDisplay}`,
    `${COMPANY_CONTACT.email} | ${COMPANY_CONTACT.phoneDisplay} | ${SITE_URL}`,
  ].join("\n");

  return { subject: `Your SEO Consultation Request for Anantorix Technologies (${ref})`, text, html };
}

// Received by Anantorix when someone submits an SEO enquiry.
export function seoInternalNotification(r: SeoEnquiryRecord): EmailContent {
  const ref = shortReference(r.id);
  const packageLabel = labelFor(SEO_PACKAGES_OPTIONS, r.preferredPackage);
  const budgetLabel = labelFor(SEO_BUDGET_OPTIONS, r.budget);

  const contact = [
    { label: "Name", value: r.name },
    { label: "Company", value: r.company },
    { label: "Email", value: r.email, html: `<a href="mailto:${escapeHtml(r.email)}" style="color:${C.purple};">${escapeHtml(r.email)}</a>` },
    { label: "Phone", value: r.phone, html: `<a href="tel:${escapeHtml(r.phone.replace(/[^\d+]/g, ""))}" style="color:${C.purple};">${escapeHtml(r.phone)}</a>` },
    { label: "Website URL", value: r.websiteUrl, html: `<a href="${escapeHtml(r.websiteUrl.startsWith("http") ? r.websiteUrl : `https://${r.websiteUrl}`)}" target="_blank" rel="noopener noreferrer" style="color:${C.purple};">${escapeHtml(r.websiteUrl)}</a>` },
  ];

  const project = [
    { label: "Industry", value: r.industry },
    { label: "Target Location", value: r.targetLocation },
    { label: "Preferred Package", value: packageLabel },
    { label: "Monthly Budget", value: budgetLabel },
  ];

  const source = [
    { label: "Landing page", value: r.landingPage || "Not captured" },
    { label: "Form page", value: r.sourcePage || "Not captured" },
    { label: "Referrer", value: r.referrer || "Not captured" },
    ...Object.entries(r.utm).map(([k, v]) => ({ label: `UTM ${k}`, value: v })),
    { label: "Received", value: istTime(r.timestamp) },
    { label: "Reference", value: `${ref} (${r.id})` },
  ];

  const callButton = r.phone ? button(`tel:${r.phone.replace(/[^\d+]/g, "")}`, "Call Client") : "";
  const waButton = r.phone ? button(`https://wa.me/${r.phone.replace(/[^\d]/g, "")}`, "WhatsApp") : "";

  const html = layout({
    preheader: `New SEO Enquiry from ${r.name} (${r.company}) for ${packageLabel} [${budgetLabel}]`,
    eyebrow: `New SEO enquiry · ${ref}`,
    title: `${r.name} (${r.company})`,
    body: `
<p style="margin:0 0 18px;">${button(`mailto:${r.email}`, `Reply to ${firstName(r.name)}`)}${callButton}${waButton}</p>
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Contact Information</p>
${detailTable(contact)}
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">SEO Scope & Budget</p>
${detailTable(project)}
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Current Challenges & Goals</p>
<div style="margin:0 0 20px;padding:16px;border-left:3px solid ${C.gold};background:${C.surface};border-radius:8px;font-size:14px;white-space:pre-wrap;color:${C.text};">${escapeHtml(r.challenges || "No details provided.")}</div>
<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${C.text};">Attribution & Source</p>
${detailTable(source)}`,
  });

  const text = [
    `NEW SEO ENQUIRY (${ref})`,
    "",
    "CONTACT",
    ...contact.map((c) => `${c.label}: ${c.value}`),
    "",
    "SEO SCOPE & TARGETS",
    ...project.map((p) => `${p.label}: ${p.value}`),
    "",
    "CHALLENGES & GOALS",
    r.challenges || "No details provided.",
    "",
    "SOURCE & ATTRIBUTION",
    ...source.map((s) => `${s.label}: ${s.value}`),
  ].join("\n");

  return { subject: `New SEO Enquiry: ${r.company} · ${packageLabel} (${ref})`, text, html };
}
