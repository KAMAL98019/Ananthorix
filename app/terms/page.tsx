import FadeIn from "../components/FadeIn";

export const metadata = {
  title: "Terms",
  alternates: { canonical: "/terms" },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#030b1a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-10 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <FadeIn direction="up" className="mb-16 border-b border-white/10 pb-10">
          <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4 block">
            Legal Information
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-[#8896AB] text-sm">
            Last Updated: May 23, 2026
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={200} className="space-y-10 text-[#C1C6D5] leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Anantorix website and our associated services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services or access our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Services Description</h2>
            <p>
              Anantorix Technologies provides custom software engineering, generative AI development, and cloud architecture consulting. The specifics of any project, including deliverables, timelines, and payment structures, will be governed by a separate Master Services Agreement (MSA) or Statement of Work (SOW) mutually agreed upon by both parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
            <p>
              The content, design, graphics, and code of this website are the intellectual property of Anantorix Technologies and are protected by applicable copyright and trademark laws. Client-specific IP resulting from our development services is transferred according to the terms defined in the respective project SOW.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p>
              In no event shall Anantorix Technologies, its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@anantorix.com" className="text-[#187BDD] hover:underline">legal@anantorix.com</a>.
            </p>
          </section>

        </FadeIn>
      </div>
    </main>
  );
}
