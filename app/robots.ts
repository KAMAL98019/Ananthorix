import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

// Production crawl rules. Staging deployments set NEXT_PUBLIC_SITE_ENV=staging and block everything.
// The thank-you page is also blocked here, and must carry noindex metadata once it exists.
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_SITE_ENV === "staging") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/start-a-project/thank-you"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
