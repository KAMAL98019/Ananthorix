import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceTemplate from "../../components/site/services/ServiceTemplate";
import { getService, serviceSlugs } from "../../content/services";
import { pageMetadata } from "../../lib/seo";

// One template for all 12 confirmed service routes. Only the listed slugs exist:
// any other slug returns 404. Old renamed URLs are handled by permanent redirects in next.config.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}
