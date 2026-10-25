// Technical SEO check against a running site (local build or production). Read-only.
// Usage: npm run check:seo                      (http://localhost:3000)
//        npm run check:seo -- https://www.anantorix.com
// Checks: sitemap XML and every listed URL (200, self-canonical, indexable), robots.txt, unique titles and
// descriptions, one H1 per page, valid JSON-LD, noindex utility pages, legacy redirects, internal links, code
// artifacts in page text, and banned positioning terms (IoT, Singapore, Malaysia). Exits 1 on any failure.
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://www.anantorix.com";
const UA = { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" };
const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => console.log(`  ok  ${msg}`);
const get = (path, init = {}) => fetch(path.startsWith("http") ? path : base + path, { headers: UA, ...init });
const pick = (h, re) => (h.match(re) || [])[1];
const decode = (s) => (s ?? "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const toLocal = (url) => url.replace(SITE, base);

// 1. Sitemap
console.log("Sitemap");
const smRes = await get("/sitemap.xml");
const sm = await smRes.text();
if (smRes.status !== 200) fail(`sitemap status ${smRes.status}`);
if (!/xml/.test(smRes.headers.get("content-type") ?? "")) fail(`sitemap content-type ${smRes.headers.get("content-type")}`);
if (!sm.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) fail("sitemap XML declaration");
if (!sm.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">') || !sm.trim().endsWith("</urlset>")) fail("sitemap urlset");
if ((sm.match(/<url>/g) || []).length !== (sm.match(/<\/url>/g) || []).length) fail("sitemap unbalanced <url>");
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (new Set(locs).size !== locs.length) fail("sitemap duplicate URLs");
for (const loc of locs) if (!loc.startsWith(`${SITE}/`)) fail(`sitemap URL not on ${SITE}: ${loc}`);
ok(`${locs.length} URLs, status ${smRes.status}, ${smRes.headers.get("content-type")}`);

// 2. robots.txt
console.log("robots.txt");
const robots = await (await get("/robots.txt")).text();
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt missing sitemap line");
if (/Disallow: \/\s*$/m.test(robots)) fail("robots.txt blocks the whole site");
for (const path of locs.map((l) => new URL(l).pathname)) {
  for (const rule of [...robots.matchAll(/^Disallow: (\S+)/gm)].map((m) => m[1])) if (path.startsWith(rule)) fail(`robots blocks sitemap URL ${path}`);
}
ok("sitemap declared; no sitemap URL disallowed");

// 3. Pages
console.log("Pages");
const titles = new Map(), descs = new Map(), internal = new Set();
for (const loc of locs) {
  const res = await get(toLocal(loc), { redirect: "manual" });
  if (res.status !== 200) { fail(`${loc} status ${res.status}`); continue; }
  const html = await res.text();
  const title = decode(pick(html, /<title>([\s\S]*?)<\/title>/));
  const desc = decode(pick(html, /<meta name="description" content="([^"]*)"/));
  const canonical = pick(html, /<link rel="canonical" href="([^"]+)"/);
  const robotsMeta = pick(html, /<meta name="robots" content="([^"]+)"/) ?? "";
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (!title) fail(`${loc} missing title`);
  if (!desc) fail(`${loc} missing description`);
  if ((canonical ?? "").replace(/\/$/, "") !== loc.replace(/\/$/, "")) fail(`${loc} canonical is ${canonical}`);
  if (/noindex/.test(robotsMeta)) fail(`${loc} is noindex but listed in the sitemap`);
  if (h1s !== 1) fail(`${loc} has ${h1s} H1 elements`);
  titles.set(title, [...(titles.get(title) ?? []), loc]);
  descs.set(desc, [...(descs.get(desc) ?? []), loc]);
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(block[1]);
      for (const item of Array.isArray(data) ? data : [data]) if (!item["@context"] || !item["@type"]) fail(`${loc} JSON-LD missing @context/@type`);
      if (/aggregateRating|"review"/.test(block[1])) fail(`${loc} JSON-LD contains ratings/reviews`);
    } catch {
      fail(`${loc} invalid JSON-LD`);
    }
  }
  const text = decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<head[\s\S]*?<\/head>/g, "").replace(/<[^>]+>/g, " "));
  for (const artifact of ["</>", "{ }", "fn()", "undefined", "NaN", "[object Object]", "[PENDING", "Lorem"]) if (text.includes(artifact)) fail(`${loc} text contains "${artifact}"`);
  const visibleAndMeta = text + " " + title + " " + desc + " " + html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)?.join(" ");
  for (const banned of [/\bIoT\b/, /Singapore/i, /Malaysia/i]) if (banned.test(visibleAndMeta)) fail(`${loc} mentions ${banned}`);
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) internal.add(m[1]);
}
for (const [t, pages] of titles) if (pages.length > 1) fail(`duplicate title "${t}" on ${pages.join(", ")}`);
for (const pages of descs.values()) if (pages.length > 1) fail(`duplicate description on ${pages.join(", ")}`);
ok(`${locs.length} pages: titles, descriptions, canonicals, H1, JSON-LD, text artifacts, positioning checked`);

// 4. Utility pages must be noindex and outside the sitemap
console.log("Utility pages");
for (const path of ["/start-a-project/thank-you"]) {
  const html = await (await get(path)).text();
  if (!/<meta name="robots" content="noindex/.test(html)) fail(`${path} should be noindex`);
  if (locs.some((l) => l.endsWith(path))) fail(`${path} should not be in the sitemap`);
}
const nf = await get("/this-page-does-not-exist-seo-check");
if (nf.status !== 404) fail(`unknown URL returns ${nf.status}, expected 404`);
ok("thank-you noindex and excluded; unknown URLs return 404");

// 5. Legacy redirects: permanent, single hop, to an indexable sitemap URL
console.log("Redirects");
for (const [from, to] of [
  ["/services/custom-software", "/services/custom-software-development"],
  ["/services/mobile-apps", "/services/mobile-app-development"],
  ["/services/desktop-application", "/services/desktop-application-development"],
]) {
  const res = await get(from, { redirect: "manual" });
  const location = res.headers.get("location") ?? "";
  if (res.status !== 308 && res.status !== 301) fail(`${from} returns ${res.status}, expected a permanent redirect`);
  if (!location.endsWith(to)) fail(`${from} redirects to ${location}, expected ${to}`);
  const hop = await get(new URL(location, base).href, { redirect: "manual" });
  if (hop.status !== 200) fail(`${from} redirect target returns ${hop.status}`);
  if (!locs.some((l) => l.endsWith(to))) fail(`${to} missing from sitemap`);
}
ok("legacy service URLs: permanent, single hop, target in sitemap");

// 6. Internal links
console.log("Internal links");
for (const path of [...internal].sort()) {
  const res = await get(path);
  if (res.status !== 200) fail(`internal link ${path} returns ${res.status}`);
}
ok(`${internal.size} distinct internal links resolve`);

console.log(failures.length ? `\nFAILED (${failures.length}):\n - ${failures.join("\n - ")}` : "\nAll SEO checks passed.");
process.exit(failures.length ? 1 : 0);
