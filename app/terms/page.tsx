import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "../components/site/blocks/LegalPage";
import { COMPANY_CONTACT } from "../content/contact";
import { pageMetadata } from "../lib/seo";

// Website terms of use. These cover use of this website only; project work is governed by a separate written
// agreement. Draft for Anantorix's legal review.
export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms for using the Anantorix Technologies website.",
  path: "/terms",
});

const mail = <a href={`mailto:${COMPANY_CONTACT.email}`}>{COMPANY_CONTACT.email}</a>;

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <p>
        These terms apply to your use of this website, run by {COMPANY_CONTACT.name}, {COMPANY_CONTACT.locationDisplay}, India. By using the site you agree to
        them. If you do not agree, please do not use the site.
      </p>
    ),
  },
  {
    id: "information",
    title: "Information on this site",
    body: (
      <p>
        The content on this site describes our services in general terms. It is not an offer, quote or guarantee of any result. Interfaces marked
        &ldquo;Illustrative&rdquo; are examples, not live systems or real data.
      </p>
    ),
  },
  {
    id: "projects",
    title: "Project work",
    body: (
      <p>
        Sending a brief does not create an agreement. Any project is governed by a separate written agreement that sets out its scope, price, timeline, ownership
        and responsibilities. If that agreement conflicts with these terms, the agreement applies.
      </p>
    ),
  },
  {
    id: "use",
    title: "Acceptable use",
    body: (
      <>
        <p>When using the site, you agree not to:</p>
        <ul>
          <li>send false, misleading or unlawful information through our forms;</li>
          <li>try to disrupt, overload or gain unauthorised access to the site or its systems;</li>
          <li>use automated tools to submit forms or collect content from the site.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        The Anantorix name, logo, design and content of this site belong to {COMPANY_CONTACT.name}. Client names and logos belong to their owners and are shown
        with reference to work we have done. You may not copy or reuse site content for commercial purposes without our written permission.
      </p>
    ),
  },
  {
    id: "links",
    title: "Links to other sites",
    body: <p>Links to other websites are provided for convenience. We are not responsible for their content or practices.</p>,
  },
  {
    id: "liability",
    title: "Liability",
    body: (
      <p>
        We work to keep the site accurate and available, but it is provided &ldquo;as is&rdquo;. To the extent the law allows, we are not liable for any loss
        arising from your use of the site or reliance on its content.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        How we handle personal data is described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: <p>These terms are governed by the laws of India. Courts in Tamil Nadu have jurisdiction over any dispute about them.</p>,
  },
  {
    id: "contact",
    title: "Changes and contact",
    body: <p>We may update these terms from time to time; the date at the top shows the latest version. Questions about these terms: {mail}.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      updated="7 October 2026"
      intro={<p>The terms for using this website. Project work is covered by a separate written agreement.</p>}
      sections={sections}
    />
  );
}
