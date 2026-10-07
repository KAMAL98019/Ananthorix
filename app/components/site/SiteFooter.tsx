import Image from "next/image";
import Link from "next/link";
import Container from "../layout/Container";
import Grid from "../layout/Grid";
import { COMPANY_CONTACT } from "../../content/contact";
import { footerExploreNav, legalNav } from "./navigation";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-1">
      <Container className="py-16 lg:py-20">
        <Grid className="gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Link href="/" aria-label="Anantorix Technologies, home" className="inline-flex rounded-tag">
              <Image src="/images/companylogo.png" alt="" width={209} height={43} className="h-auto w-[180px]" />
            </Link>
            <p className="type-body mt-6 max-w-sm text-fg-secondary">
              Anantorix builds intelligent digital systems for modern businesses.
            </p>
          </div>

          <nav aria-label="Explore" className="col-span-4 md:col-span-4 lg:col-span-3">
            <h2 className="type-h4 mb-4">Explore</h2>
            <ul className="flex flex-col">
              {footerExploreNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-fg-secondary hover:text-deep-blue">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-4 md:col-span-4 lg:col-span-3">
            <h2 className="type-h4 mb-4">Contact</h2>
            <ul className="flex flex-col gap-3 type-small text-fg-secondary">
              <li>
                <a href={`mailto:${COMPANY_CONTACT.email}`} className="inline-flex min-h-11 items-center break-all text-fg-primary hover:text-deep-blue">
                  {COMPANY_CONTACT.email}
                </a>
              </li>
              <li>
                <a href={COMPANY_CONTACT.phoneHref} className="inline-flex min-h-11 items-center text-fg-primary hover:text-deep-blue">
                  {COMPANY_CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="min-h-11 py-3">{COMPANY_CONTACT.locationDisplay}</li>
            </ul>
          </div>

          <nav aria-label="Legal" className="col-span-4 md:col-span-8 lg:col-span-2">
            <h2 className="type-h4 mb-4">Legal</h2>
            <ul className="flex flex-col">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-fg-secondary hover:text-deep-blue">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Grid>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 type-small text-fg-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Anantorix Technologies. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
