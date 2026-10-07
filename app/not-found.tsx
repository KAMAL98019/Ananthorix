import type { Metadata } from "next";
import Button from "./components/ui/Button";
import Container from "./components/layout/Container";
import Section from "./components/layout/Section";

// Returned for any unknown URL (HTTP 404). Unknown URLs are not redirected to the homepage.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <p className="type-eyebrow">Error 404</p>
          <h1 className="type-h1 mt-4">This page does not exist.</h1>
          <p className="type-lead mt-5">
            The link may be out of date, or the page may not be published yet.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" href="/">
              Go to homepage
            </Button>
            <Button variant="secondary" href="/about">
              About Anantorix
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
