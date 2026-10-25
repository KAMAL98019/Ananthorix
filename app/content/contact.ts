// Verified company contact details. Source: the owner's latest contact page (git commit 735b435,
// app/contact/page.tsx: "anantorix@gmail.com", "Tiruchengode, Tamil nadu", "tel:+919842744566").
// info@anantorix.com is the intended business email, but on 25 Oct 2026 that mailbox did not exist yet (mail to it
// bounced with 550 5.1.1). Switch email to "info@anantorix.com" (and set leadBackupEmail) once it receives mail.
// Do not add values here that are not confirmed by the owner. Social profiles are not approved and are not listed.

export const COMPANY_CONTACT = {
  name: "Anantorix Technologies",
  email: "anantorix@gmail.com",
  // Optional copy of every lead notification. Set to "anantorix@gmail.com" when email moves to info@, as a safety
  // net while the new mailbox is confirmed. Empty means no copy.
  leadBackupEmail: "",
  phoneDisplay: "9842744566",
  phoneHref: "tel:+919842744566",
  phoneE164: "+919842744566",
  locality: "Tiruchengode",
  region: "Tamil Nadu",
  country: "IN",
  locationDisplay: "Tiruchengode, Tamil nadu",
  market: "India",
} as const;
