import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.ananthorix.com"),
  title: {
    default: "Ananthorix - Intelligent Technology and Infrastructure",
    template: "%s | Ananthorix",
  },
  description: "Ananthorix is an intelligent technology and infrastructure company. We engineer infinite possibilities with enterprise software solutions tailored for the digital-centric era.",
  keywords: ["Ananthorix", "Software Development", "Generative AI", "Enterprise Solutions", "Desktop Applications", "UI/UX Design", "Custom Software"],
  authors: [{ name: "Ananthorix" }],
  creator: "Ananthorix",
  publisher: "Ananthorix",
  robots: {
    index: true,
    follow: true,
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