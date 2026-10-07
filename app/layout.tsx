import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteHeader from "./components/site/SiteHeader";
import SiteFooter from "./components/site/SiteFooter";
import { MotionProvider } from "./components/motion/MotionProvider";
import ScrollProgress from "./components/motion/ScrollProgress";

// Typography per the Luminous White brief: Manrope headings, Inter body/UI, JetBrains Mono data labels.
// next/font self-hosts these at build time.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Mono is only used for small labels, so it is not preloaded: it stays off the critical path for the first render.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.anantorix.com"),
  title: {
    default: "Anantorix Technologies | Intelligent digital systems for modern businesses",
    template: "%s | Anantorix Technologies",
  },
  description: "Anantorix builds intelligent digital systems for modern businesses.",
  authors: [{ name: "Anantorix Technologies" }],
  creator: "Anantorix Technologies",
  publisher: "Anantorix Technologies",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Anantorix Technologies",
    description: "Anantorix builds intelligent digital systems for modern businesses.",
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
    description: "Anantorix builds intelligent digital systems for modern businesses.",
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
      className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-fg-primary" suppressHydrationWarning>
        <MotionProvider>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />

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

        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
