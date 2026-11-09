// Brand identity structured data. Run: npm test
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { LOGO, ORGANIZATION_ID, SITE_NAME, SITE_URL, WEBSITE_ID, organizationJsonLd, webSiteJsonLd } from "../app/lib/seo";

describe("brand structured data", () => {
  const org = organizationJsonLd() as Record<string, unknown>;
  const site = webSiteJsonLd() as Record<string, unknown>;

  test("Organization has a stable id, the exact brand name and the canonical homepage", () => {
    assert.equal(org["@id"], "https://www.anantorix.com/#organization");
    assert.equal(org.name, "Anantorix Technologies");
    assert.equal(org.alternateName, "Anantorix");
    assert.equal(org.url, "https://www.anantorix.com/");
  });

  test("WebSite links to the Organization as publisher", () => {
    assert.equal(site["@id"], WEBSITE_ID);
    assert.equal(site.name, SITE_NAME);
    assert.deepEqual(site.publisher, { "@id": ORGANIZATION_ID });
  });

  test("logo meets Google's minimum size and matches the real file", () => {
    assert.ok(LOGO.width >= 112 && LOGO.height >= 112);
    const file = `public${new URL(LOGO.url).pathname}`;
    assert.ok(existsSync(file), `${file} is missing`);
    const png = readFileSync(file);
    assert.equal(png.readUInt32BE(16), LOGO.width);
    assert.equal(png.readUInt32BE(20), LOGO.height);
    assert.ok(LOGO.url.startsWith(SITE_URL));
  });

  test("no unverified claims: no sameAs, ratings, reviews or awards", () => {
    const json = JSON.stringify([org, site]);
    for (const key of ["sameAs", "aggregateRating", "review", "award", "hasCredential"]) assert.ok(!json.includes(`"${key}"`), key);
  });

  test("no other company's identity anywhere in the data", () => {
    assert.ok(!/anantax/i.test(JSON.stringify([org, site])));
  });
});
