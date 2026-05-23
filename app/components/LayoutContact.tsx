"use client";

import { usePathname } from "next/navigation";
import ContactCTA from "./ContactCTA";

export default function LayoutContact() {
  const pathname = usePathname();
  
  // Don't show the layout contact form on the dedicated contact page to avoid rendering it twice
  if (pathname === "/contact") {
    return null;
  }

  return <ContactCTA />;
}
