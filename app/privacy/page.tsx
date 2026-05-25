import FadeIn from "../components/FadeIn";

export const metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#030b1a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-10 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <FadeIn direction="up" className="mb-16 border-b border-white/10 pb-10">
          <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4 block">
            Legal Information
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-[#8896AB] text-sm">
            Last Updated: May 23, 2026
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={200} className="space-y-10 text-[#C1C6D5] leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Anantorix Technologies ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website anantorix.com (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect several types of information from and about users of our Website, including information:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#8896AB]">
              <li><strong className="text-white">Personal Data:</strong> By which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by which you may be contacted online or offline.</li>
              <li><strong className="text-white">Usage Data:</strong> About your internet connection, the equipment you use to access our Website, and usage details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use information that we collect about you or that you provide to us, including any personal information:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#8896AB]">
              <li>To present our Website and its contents to you.</li>
              <li>To provide you with information, products, or services that you request from us.</li>
              <li>To fulfill any other purpose for which you provide it (e.g., responding to contact form submissions).</li>
              <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p>
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. The safety and security of your information also depends on you. Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Information</h2>
            <p>
              To ask questions or comment about this privacy policy and our privacy practices, contact us at: <a href="mailto:privacy@anantorix.com" className="text-[#187BDD] hover:underline">privacy@anantorix.com</a>.
            </p>
          </section>

        </FadeIn>
      </div>
    </main>
  );
}
