// Verified company contact details. Source: the owner's latest contact page (git commit 735b435,
// app/contact/page.tsx: "anantorix@gmail.com", "Tiruchengode, Tamil nadu", "tel:+919842744566").
// Business email info@anantorix.com: Hostinger mailbox created 25 Oct 2026 (MX mx1/mx2.hostinger.com, SPF
// _spf.mail.hostinger.com). Leads are also copied to the Gmail backup until the new mailbox is confirmed in use.
// Do not add values here that are not confirmed by the owner. Social profiles are not approved and are not listed.

export const COMPANY_CONTACT = {
  name: "Anantorix Technologies",
  email: "info@anantorix.com",
  // Optional copy of every lead notification. Set to "anantorix@gmail.com" when email moves to info@, as a safety
  // net while the new mailbox is confirmed. Empty means no copy.
  leadBackupEmail: "anantorix@gmail.com",
  phoneDisplay: "9842744566",
  phoneHref: "tel:+919842744566",
  phoneE164: "+919842744566",
  locality: "Tiruchengode",
  region: "Tamil Nadu",
  country: "IN",
  locationDisplay: "Tiruchengode, Tamil nadu",
  market: "India",
} as const;
