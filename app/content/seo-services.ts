// SEO Services and Pricing Content for Anantorix Technologies
// Route: /seo-services
// Target markets: Namakkal, Salem, Erode, Tamil Nadu & growing digital businesses.

import type { CurrencyCode, PricingCategory } from "./pricing";

export type SeoPackage = {
  id: string;
  name: string;
  price: string;
  prices: Record<CurrencyCode, string>;
  period: string;
  popular?: boolean;
  tagline: string;
  idealFor: string;
  inclusions: string[];
  deliverablesSummary: string;
  monthlyLimitNote: string;
  ctaLabel: string;
};

export const SEO_PACKAGES: SeoPackage[] = [
  {
    id: "seo-starter",
    name: "SEO Starter",
    price: "₹5,000–₹8,000",
    prices: {
      INR: "₹5,000–₹8,000",
      USD: "$80–$130",
      SGD: "S$105–S$165",
      MYR: "RM 325–RM 520",
    },
    period: "/month",
    tagline: "For small businesses and independent practices establishing their organic search presence.",
    idealFor: "Local businesses, service providers, clinics, and startups launching their first organic presence.",
    inclusions: [
      "Initial website SEO audit & health check",
      "Keyword research (up to 10 target keywords)",
      "On-page SEO optimisation (up to 5 key pages)",
      "Title tag and meta description optimisation",
      "Heading structure (H1–H3) improvements",
      "Image alt text optimisation & file compression audit",
      "Basic technical SEO checks (sitemap & robots.txt)",
      "Google Search Console setup & verification",
      "Google Analytics 4 setup & event tracking",
      "Monthly SEO performance report with keyword rankings",
    ],
    deliverablesSummary: "Optimisation of up to 5 core landing pages, baseline technical fixes, and monthly ranking tracking.",
    monthlyLimitNote: "Scope covers on-page updates for up to 5 priority URLs per month. Excludes new article writing or external backlinks.",
    ctaLabel: "Get Started",
  },
  {
    id: "seo-growth",
    name: "SEO Growth",
    price: "₹8,000–₹15,000",
    prices: {
      INR: "₹8,000–₹15,000",
      USD: "$130–$240",
      SGD: "S$165–S$310",
      MYR: "RM 520–RM 975",
    },
    period: "/month",
    popular: true,
    tagline: "For growing businesses targeting competitive local and regional searches in Tamil Nadu.",
    idealFor: "Established regional companies, multi-product vendors, and service firms seeking consistent enquiry flow.",
    inclusions: [
      "Detailed website SEO audit & technical triage",
      "Keyword research (up to 25 target search terms)",
      "Competitor SEO analysis (top 3 local competitors)",
      "Advanced on-page optimisation (up to 12 pages)",
      "Technical SEO monitoring & crawl issue resolution",
      "Local SEO optimisation for Namakkal, Salem & Erode",
      "Google Business Profile optimisation & review setup",
      "Internal linking architecture improvements",
      "Content optimisation recommendations & topic clusters",
      "Continuous search performance & index monitoring",
      "Comprehensive monthly SEO report with insights",
      "Monthly 30-minute strategy review call",
    ],
    deliverablesSummary: "Continuous on-page tuning across 12 URLs, Google Business Profile management, local citations, and competitor benchmarking.",
    monthlyLimitNote: "Includes strategic content briefs for up to 2 articles/month (writing can be added as an optional add-on).",
    ctaLabel: "Grow My Business",
  },
  {
    id: "seo-advanced",
    name: "SEO Advanced",
    price: "₹15,000–₹30,000+",
    prices: {
      INR: "₹15,000–₹30,000+",
      USD: "$240–$480+",
      SGD: "S$310–S$615+",
      MYR: "RM 975–RM 1,950+",
    },
    period: "/month",
    tagline: "For established businesses targeting multiple locations, comprehensive services and competitive search markets.",
    idealFor: "Enterprises, multi-location brands, e-commerce stores, and high-volume B2B software companies.",
    inclusions: [
      "Comprehensive technical SEO audit & log analysis",
      "Advanced keyword research, intent mapping & clustering",
      "In-depth competitor & market share gap analysis",
      "Advanced on-page SEO across core product/service suites",
      "Technical SEO improvements (Core Web Vitals & schema)",
      "Local and regional multi-city SEO strategy",
      "Content strategy & landing page SEO recommendations",
      "Conversion rate optimisation (CRO) recommendations",
      "Internal linking & page-rank distribution strategy",
      "Organic enquiry tracking & conversion path attribution",
      "Monthly in-depth executive performance report",
      "Monthly strategic consultation & prioritized quarterly roadmap",
    ],
    deliverablesSummary: "Multi-location optimization, full technical Core Web Vitals remediation, schema architecture, and conversion-focused page improvements.",
    monthlyLimitNote: "Defined monthly allocation for 20+ URLs and ongoing technical remediation. Custom copywriting or software redesign quoted separately.",
    ctaLabel: "Request Custom SEO Proposal",
  },
];

// The same packages as a category on the main pricing page. Full details and the enquiry form are on /seo-services.
export const SEO_PRICING: PricingCategory = {
  id: "seo-services",
  title: "SEO Services",
  eyebrow: "Search Visibility",
  lead: "Monthly SEO packages covering technical fixes, on-page optimisation, local search and clear performance reporting.",
  disclaimer: "Indicative monthly pricing based on website size and competition. SEO results depend on many factors, and rankings are not guaranteed.",
  relatedServiceHref: "/seo-services",
  relatedServiceLabel: "Explore SEO Services",
  tiers: SEO_PACKAGES.map((pkg) => ({
    name: pkg.name,
    price: pkg.price,
    prices: pkg.prices,
    period: pkg.period,
    popular: pkg.popular,
    tagline: pkg.tagline,
    inclusions: pkg.inclusions.slice(0, 7),
    ctaLabel: pkg.ctaLabel,
    href: "/seo-services#seo-enquiry",
  })),
};

export const SEO_SERVICES_OFFERED = [
  {
    id: "technical-seo",
    title: "Technical SEO",
    summary: "Ensure search engine crawlers can index and render your digital experience without roadblocks.",
    points: [
      "Website crawlability & error triage",
      "Indexing checks & coverage monitoring",
      "XML sitemap generation & optimization",
      "Robots.txt configuration & directive checks",
      "Canonical URL implementation to prevent duplicate content",
      "Broken link identification & 301 redirect mapping",
      "Core Web Vitals performance recommendations",
      "Schema.org structured data implementation",
    ],
  },
  {
    id: "on-page-seo",
    title: "On-Page SEO",
    summary: "Align page content, heading hierarchy, and meta signals with real search queries.",
    points: [
      "High-intent keyword research & keyword mapping",
      "Title tag and meta description optimization",
      "Semantic heading structure (H1, H2, H3) alignment",
      "Targeted body copy optimization & keyword density checks",
      "Image optimization, compression & descriptive alt text",
      "Strategic contextual internal linking",
    ],
  },
  {
    id: "local-seo",
    title: "Local SEO",
    summary: "Dominate local searches in Namakkal, Salem, Erode and nearby business corridors.",
    points: [
      "Google Business Profile (GBP) setup & verification",
      "Local keyword targeting (geo-modified searches)",
      "NAP consistency (Name, Address, Phone) across directories",
      "Local landing page architecture & localized content",
      "Local search visibility monitoring & Google Maps ranking",
    ],
  },
  {
    id: "content-seo",
    title: "Content SEO",
    summary: "Create and optimize authoritative content that answers real buyer questions and earns organic traffic.",
    points: [
      "Keyword-based editorial content planning",
      "Search intent analysis (informational vs. commercial)",
      "Blog post & case study search optimization",
      "Service & solution page commercial copy optimization",
      "Content gap analysis against primary competitors",
    ],
  },
  {
    id: "ecommerce-seo",
    title: "E-commerce SEO",
    summary: "Boost visibility for your online store, product pages, category catalogs, and brand searches.",
    points: [
      "Product page title, description & spec optimization",
      "Category page SEO & faceted navigation review",
      "Product metadata, SKU identifiers & availability tags",
      "Product Schema markup (Price, InStock, Currency)",
      "Internal breadcrumb & related product linking",
      "Technical e-commerce crawl budget optimization",
    ],
  },
  {
    id: "seo-reporting",
    title: "SEO Reporting & Analytics",
    summary: "Transparent, actionable measurement showing real organic impressions, clicks, rankings, and inquiries.",
    points: [
      "Organic search traffic monitoring in Google Analytics 4",
      "Keyword position tracking for high-intent queries",
      "Google Search Console click, impression & CTR analysis",
      "Indexing status & crawl error monitoring",
      "Organic lead and enquiry conversion tracking",
      "Monthly performance reports with actionable next-month goals",
    ],
  },
];

export const SEO_ADDONS = [
  {
    title: "Additional SEO Landing Page",
    pricing: "Custom quotation",
    description: "Design, copywriting, and search optimization for specialized niche or industry-specific service pages.",
  },
  {
    title: "Blog Content Writing",
    pricing: "Quoted per article",
    description: "Deeply researched, human-written, search-optimized articles (1,200–2,000 words) tailored to target keywords.",
  },
  {
    title: "E-commerce SEO Overhaul",
    pricing: "Custom quotation",
    description: "Comprehensive catalog optimization, product schema, and faceted navigation indexing for 100+ SKUs.",
  },
  {
    title: "Advanced Technical SEO Implementation",
    pricing: "Custom quotation",
    description: "Hands-on code fixes for Core Web Vitals, server response times, JavaScript rendering, and Next.js optimization.",
  },
  {
    title: "Website Redesign & Development",
    pricing: "Separate quotation",
    description: "Complete full-stack website rebuild engineered from the ground up for speed, modern design, and search architecture.",
  },
  {
    title: "Link Acquisition Campaigns",
    pricing: "Separately scoped & approved",
    description: "White-hat digital PR and high-authority industry editorial mentions vetted for genuine domain quality.",
  },
  {
    title: "Multi-Location SEO Expansion",
    pricing: "Custom quotation",
    description: "Dedicated localized landing pages and Google Business Profile management for multi-branch organizations.",
  },
];

export const SEO_PROCESS_STEPS = [
  {
    step: "01",
    title: "SEO Audit",
    summary: "Understand the current website.",
    details: "We analyze technical health, mobile responsiveness, existing rankings, indexing hurdles, and search visibility bottlenecks.",
  },
  {
    step: "02",
    title: "Keyword Research",
    summary: "Identify valuable search opportunities.",
    details: "We research high-intent search terms your prospective clients use in Namakkal, Salem, Erode, and broader target markets.",
  },
  {
    step: "03",
    title: "Strategy",
    summary: "Prepare a prioritised SEO roadmap.",
    details: "We formulate an actionable 3-month roadmap balancing quick technical fixes, priority landing page improvements, and content gaps.",
  },
  {
    step: "04",
    title: "Implementation",
    summary: "Execute agreed SEO improvements.",
    details: "We optimize title tags, heading structure, schema markup, image alt attributes, and on-page copy according to the plan.",
  },
  {
    step: "05",
    title: "Monitoring",
    summary: "Track indexing, traffic and keyword performance.",
    details: "Continuous surveillance of crawl health in Google Search Console, keyword ranking shifts, and user engagement metrics.",
  },
  {
    step: "06",
    title: "Reporting",
    summary: "Share progress and next-month recommendations.",
    details: "Clear monthly executive reports highlighting organic clicks, search queries, rank movements, and prioritized next steps.",
  },
];

export const SEO_RESULTS_DISCLAIMER = {
  headline: "SEO is a Long-Term Growth Strategy.",
  intro:
    "Results depend on search competition, website quality, domain history, search intent, content quality and implementation consistency.",
  commitments: [
    {
      title: "No False Guarantees",
      description: "We do not offer guaranteed #1 Google rankings or overnight miracles. No legitimate agency can guarantee Google algorithm positions.",
    },
    {
      title: "Realistic Timelines",
      description: "Ranking changes take time—typically 3 to 6 months of steady, ethical white-hat optimization to gain authoritative traction.",
    },
    {
      title: "Enquiry-Focused Measurement",
      description: "We measure success through qualified search visibility, search impressions, organic clicks, and legitimate business enquiries.",
    },
    {
      title: "Transparent Reporting",
      description: "You receive unfiltered monthly reports directly from Google Analytics 4 and Google Search Console showing real completed work.",
    },
    {
      title: "Ethical White-Hat Standards",
      description: "We follow Google Search Essentials guidelines strictly to protect your brand from algorithm penalties or manual actions.",
    },
  ],
};
