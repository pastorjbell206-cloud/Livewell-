import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { indexRecord, liteRecord } from "../scripts/build-public-essays.mjs";
import { pillarToTrack, pillarForPost, subThemesForPost } from "@/lib/taxonomy";
import { SUBPATHWAY_BY_SLUG } from "@/lib/subpathwayMap.generated";

// The writing hub paints and filters from /essays/index-lite.json, the full
// index being what search reads on a query. Every filter the hub offers has
// to select exactly the same essays from the light records as from the full
// ones, or a reader filtering by track or pillar would be shown a different
// library than the count promises. The filters' own helpers are used here, so
// the test follows the hub's logic rather than restating it.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const library = JSON.parse(readFileSync(path.join(repoRoot, "content/static-library.generated.json"), "utf8"));
const moved = new Set<string>(JSON.parse(readFileSync(path.join(repoRoot, "content/pcn-moved.json"), "utf8")).slugs);
const records = library.filter((r: any) => r && r.published !== false && !moved.has(r.slug));
const full = records.map(indexRecord);
const lite = records.map(liteRecord);

const resolveSub = (p: any) => (p?.subPathway as string | null) || (SUBPATHWAY_BY_SLUG as any)[p?.slug]?.sub || null;
const resolveSeries = (p: any) => !!(p?.isSeries || (SUBPATHWAY_BY_SLUG as any)[p?.slug]?.series);
const slugs = (rows: any[], pred: (p: any) => boolean) => rows.filter(pred).map((p) => p.slug).sort();
const distinct = (rows: any[], key: string) => [...new Set(rows.map((p) => p[key]).filter(Boolean))] as string[];

describe("the light essay index", () => {
  it("has one record per essay, with no body and none of the search-only fields", () => {
    expect(lite.length).toBe(full.length);
    for (const r of lite) {
      expect(typeof r.slug).toBe("string");
      expect(typeof r.title).toBe("string");
      expect((r as any).body).toBeUndefined();
      expect((r as any).metaDescription).toBeUndefined();
      expect((r as any).qa).toBeUndefined();
      expect(r.excerpt.length).toBeLessThanOrEqual(141);
    }
  });

  it("is well under the full index, and under 300 KB before compression", () => {
    // The full index here carries no search layer (metaDescription, qa), so
    // the shipped index.json is larger still; the light file measured 231 KB
    // against 487 KB shipped, 56 KB against 84 KB gzipped, on 587 essays.
    const liteBytes = Buffer.byteLength(JSON.stringify(lite));
    const fullBytes = Buffer.byteLength(JSON.stringify(full));
    expect(liteBytes).toBeLessThan(fullBytes * 0.75);
    expect(liteBytes).toBeLessThan(300 * 1024);
  });

  it("keeps the card's ellipsis honest: a cut excerpt is longer than 140 characters", () => {
    for (let i = 0; i < full.length; i++) {
      const long = String(full[i].excerpt || "").length > 140;
      expect(lite[i].excerpt.length > 140).toBe(long);
    }
  });

  it("selects the same essays for every track, pillar, sub-theme, audience, format, sub-pathway and series filter", () => {
    for (const track of distinct(full.map((p: any) => ({ t: pillarToTrack(p.pillar) })), "t")) {
      expect(slugs(lite, (p) => pillarToTrack(p.pillar) === track)).toEqual(slugs(full, (p) => pillarToTrack(p.pillar) === track));
    }
    for (const pillarSlug of distinct(full.map((p: any) => ({ s: pillarForPost(p)?.slug })), "s")) {
      expect(slugs(lite, (p) => pillarForPost(p)?.slug === pillarSlug)).toEqual(slugs(full, (p) => pillarForPost(p)?.slug === pillarSlug));
    }
    for (const theme of [...new Set(full.flatMap((p: any) => subThemesForPost(p)))]) {
      expect(slugs(lite, (p) => subThemesForPost(p).includes(theme))).toEqual(slugs(full, (p) => subThemesForPost(p).includes(theme)));
    }
    for (const audience of distinct(full, "audience")) {
      expect(slugs(lite, (p) => p.audience === audience)).toEqual(slugs(full, (p) => p.audience === audience));
    }
    for (const format of distinct(full, "format")) {
      expect(slugs(lite, (p) => p.format === format)).toEqual(slugs(full, (p) => p.format === format));
    }
    for (const sub of [...new Set(full.map((p: any) => resolveSub(p)).filter(Boolean))]) {
      expect(slugs(lite, (p) => resolveSub(p) === sub)).toEqual(slugs(full, (p) => resolveSub(p) === sub));
    }
    expect(slugs(lite, resolveSeries)).toEqual(slugs(full, resolveSeries));
  });

  it("matches the hub's search on titles exactly, and on excerpts up to the cut", () => {
    for (const term of ["marriage", "doubt", "church", "father"]) {
      const inTitle = (p: any) => String(p.title).toLowerCase().includes(term);
      expect(slugs(lite, inTitle)).toEqual(slugs(full, inTitle));
      const inCut = (p: any) => String(p.excerpt || "").slice(0, 141).toLowerCase().includes(term);
      expect(slugs(lite, inCut)).toEqual(slugs(full, inCut));
    }
  });
});
