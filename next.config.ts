import type { NextConfig } from "next";

// Permanent redirects for renamed V2 service URLs. Each destination is a final URL (no chains).
// Security headers for every route. No CSP yet: GA4 and Clarity load inline and external scripts, so a CSP
// needs nonces (see the Next.js content-security-policy guide) before it can be enforced.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/services/custom-software", destination: "/services/custom-software-development", permanent: true },
      { source: "/services/mobile-apps", destination: "/services/mobile-app-development", permanent: true },
      { source: "/services/desktop-application", destination: "/services/desktop-application-development", permanent: true },
    ];
  },
};

export default nextConfig;
