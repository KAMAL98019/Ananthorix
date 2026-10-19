"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { captureAttribution } from "../../lib/attribution";

// Records first-touch attribution on the first page of a session (and on later campaign clicks). Renders nothing.
export default function AttributionCapture() {
  const pathname = usePathname();
  useEffect(() => {
    captureAttribution();
  }, [pathname]);
  return null;
}
