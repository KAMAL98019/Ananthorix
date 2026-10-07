import type { MetadataRoute } from "next";
import { indexableRoutes } from "./content/sitemap-routes";
import { SITE_URL } from "./lib/seo";

export const dynamic = "force-static";

// Built from the explicit registry, not from the file system.
// lastModified is omitted: no real modification dates are tracked yet, so none are invented.
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({
    url: route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
