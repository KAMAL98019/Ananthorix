// Indexing audit for specific URLs against a running site (read-only).
// Usage: node scripts/index-audit.mjs <base> <path> [path...]
// For each URL: status, canonical, robots, sitemap membership, inbound internal links from every other sitemap page
// (split into in-content links vs site header/footer links), word count, and the share of the page's main-content
// sentences that do not appear on any other sitemap page (a rough uniqueness measure).
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const targets = process.argv.slice(3);
const SITE = "https://www.anantorix.com";
const UA = { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" };
const get = (p) => fetch(base + p, { headers: UA, redirect: "manual" });
const decode = (s) => (s ?? "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");

const sm = await (await get("/sitemap.xml")).text();
const sitemapPaths = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

// Fetch every sitemap page once.
const pages = new Map();
for (const p of sitemapPaths) pages.set(p, await (await get(p)).text());

const mainOnly = (html) => html.replace(/<head[\s\S]*?<\/head>/, "").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<header[\s\S]*?<\/header>/g, "").replace(/<footer[\s\S]*?<\/footer>/g, ""); // site chrome only: in-content <nav> blocks (e.g. related links) count as content
const sentences = (html) =>
  decode(mainOnly(html).replace(/<[^>]+>/g, "\n"))
    .split(/\n|(?<=[.!?])\s+/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s.split(" ").length >= 5);
const sentenceSets = new Map([...pages].map(([p, h]) => [p, new Set(sentences(h))]));

for (const path of targets) {
  const res = await get(path);
  const html = res.status === 200 ? await res.text() : "";
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const robots = (html.match(/<meta name="robots" content="([^"]+)"/) || [])[1];
  const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, ""));
  const words = decode(mainOnly(html).replace(/<[^>]+>/g, " ")).split(/\s+/).filter(Boolean).length;
  let content = 0, chrome = 0;
  const from = [];
  for (const [p, h] of pages) {
    if (p === path) continue;
    const re = new RegExp(`href="${path.replace(/[/.*+?^${}()|[\]\\]/g, "\\$&")}(?:[?#][^"]*)?"`, "g");
    const inMain = (mainOnly(h).match(re) || []).length;
    const total = (h.match(re) || []).length;
    content += inMain;
    chrome += total - inMain;
    if (inMain) from.push(p);
  }
  const own = sentenceSets.get(path) ?? new Set(sentences(html));
  const others = new Set([...sentenceSets].filter(([p]) => p !== path).flatMap(([, s]) => [...s]));
  const unique = own.size ? Math.round((100 * [...own].filter((s) => !others.has(s)).length) / own.size) : 0;
  console.log(`\n${path}`);
  console.log(`  status ${res.status} | canonical ${canonical === `${SITE}${path}` ? "self" : canonical} | robots ${robots} | in sitemap ${sitemapPaths.includes(path)}`);
  console.log(`  H1: ${h1}`);
  console.log(`  main-content words ${words} | unique sentences ${unique}% of ${own.size}`);
  console.log(`  inbound links: ${content} in page content (from ${from.length} pages${from.length ? ": " + from.slice(0, 6).join(", ") + (from.length > 6 ? ", …" : "") : ""}), ${chrome} in site header/footer`);
}
