// Verified company contact details. Source: the owner's latest contact page (git commit 735b435,
// app/contact/page.tsx: "Tiruchengode, Tamil nadu", "tel:+919842744566"). The business email was changed to
// info@anantorix.com by the owner on 25 Oct 2026.
// Do not add values here that are not confirmed by the owner. Social profiles are not approved and are not listed.

export const COMPANY_CONTACT = {
  name: "Anantorix Technologies",
  email: "info@anantorix.com",
  // Lead notifications are also copied here, so no enquiry is lost while the info@ mailbox is being set up.
  // Remove (set to "") once leads are confirmed arriving at info@anantorix.com.
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
