import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LayoutContact from "./components/LayoutContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.anantorix.com"),
  title: {
    default: "Anantorix Technologies | AI, Software & Mobile App Development Company",
    template: "%s | Anantorix Technologies",
  },
  description: "Anantorix Technologies provides AI solutions, custom software development, mobile app development, IoT solutions, SaaS products, and enterprise applications.",
  keywords: [
    "AI development company",
    "SaaS development India",
    "React development",
    "Node.js development",
    "Flutter app development",
    "IoT solutions",
    "custom software development"
  ],
  authors: [{ name: "Anantorix Technologies" }],
  creator: "Anantorix Technologies",
  publisher: "Anantorix Technologies",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Anantorix Technologies",
    description: "AI, Software, Mobile Apps & IoT Solutions",
    url: "https://www.anantorix.com",
    siteName: "Anantorix Technologies",
    images: [
      {
        url: "/socialicon.png",
        width: 1200,
        height: 630,
        alt: "Anantorix Technologies Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anantorix Technologies",
    description: "AI, Software, Mobile Apps & IoT Solutions",
    images: ["/socialicon.png"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      {/* Add suppressHydrationWarning to the body tag */}
      <body className="flex min-h-full flex-col bg-[#07152D]" suppressHydrationWarning>
        {/* Google Analytics (GA4) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
            `}
          </Script>
        )}

        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <LayoutContact />
        <Footer />
      </body>
    </html>
  );
}