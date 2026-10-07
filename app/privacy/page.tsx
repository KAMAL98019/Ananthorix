import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/site/blocks/LegalPage";
import { COMPANY_CONTACT } from "../content/contact";
import { pageMetadata } from "../lib/seo";

// Describes what this website actually does with personal data (the Start a Project form, email delivery,
// rate limiting and optional analytics). Draft for Anantorix's legal review; written with India's Digital
// Personal Data Protection Act, 2023 in mind. Update it whenever the site's data handling changes.
export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Anantorix Technologies collects, uses and protects personal data shared through this website.",
  path: "/privacy",
});

const email = COMPANY_CONTACT.email;
const mail = <a href={`mailto:${email}`}>{email}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        This website is run by {COMPANY_CONTACT.name}, based in {COMPANY_CONTACT.locationDisplay}, India. For any privacy question, email {mail} or call{" "}
        <a href={COMPANY_CONTACT.phoneHref}>{COMPANY_CONTACT.phoneDisplay}</a>.
      </p>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <p>When you send a project brief through the Start a Project form, we collect what you enter:</p>
        <ul>
          <li>Your name, email address, and optionally your phone number and company name.</li>
          <li>Your project details: what you need, your current situation, timeline, budget preference, company size and description.</li>
          <li>How you prefer to be contacted and your preferred language.</li>
          <li>Your consent to be contacted about your brief.</li>
        </ul>
        <p>
          With the brief we also record the page you sent it from, the referring page and any campaign tags in the link (UTM parameters), so we know how you
          found us.
        </p>
        <p>If you email or call us, we receive the details you share in that message or call.</p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use it",
    body: (
      <>
        <p>We use your details only to:</p>
        <ul>
          <li>review your brief and reply to you about it;</li>
          <li>send you an email confirming that we received your brief;</li>
          <li>plan and agree a possible engagement with you.</li>
        </ul>
        <p>We do not sell your personal data, and we do not use it for unrelated marketing.</p>
      </>
    ),
  },
  {
    id: "how-it-is-handled",
    title: "How your brief is handled",
    body: (
      <>
        <p>
          A submitted brief is sent by email to our company inbox, and a confirmation is sent to the email address you gave. Email is delivered through Google
          (Gmail), which processes the message on our behalf.
        </p>
        <p>
          To protect the form from abuse, our server briefly uses your IP address to limit repeated submissions. It is held in memory for a short time and is not
          stored with your brief.
        </p>
      </>
    ),
  },
  {
    id: "analytics",
    title: "Analytics and cookies",
    body: (
      <p>
        We may use Google Analytics and Microsoft Clarity to understand how visitors use the site, such as which pages are viewed and how people move between
        them. These services may set cookies or similar technologies. You can block or delete cookies in your browser settings; the site still works without
        them.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep your brief and our related correspondence for as long as needed to respond to you and, if we work together, for the duration of the engagement
        and any period required by law. You can ask us to delete your details at any time.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under India&apos;s Digital Personal Data Protection Act, 2023, you can ask us to:</p>
        <ul>
          <li>tell you what personal data we hold about you and how we use it;</li>
          <li>correct or complete inaccurate data;</li>
          <li>erase your data, unless we must keep it by law;</li>
          <li>withdraw your consent for us to contact you.</li>
        </ul>
        <p>To make a request or raise a grievance, email {mail}. We will respond within a reasonable time.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        The site is served over HTTPS. Form submissions are checked on our server, and email credentials are kept on the server and never sent to your browser. No
        method of transmission or storage is completely secure, but we take reasonable steps to protect your data.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We may update this policy when our website or practices change. The date at the top shows when it was last updated.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="7 October 2026"
      intro={<p>This policy explains what personal data we collect through this website, why we collect it and how you can control it.</p>}
      sections={sections}
    />
  );
}
