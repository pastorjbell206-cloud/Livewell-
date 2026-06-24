/**
 * Verifies the reading-paths source of truth (client/src/lib/readingPaths.ts):
 *   - every `available: true` entry has a slug that actually exists in
 *     content-data.json (so it links to a real /writing/:slug, never a 404);
 *   - every `available: false` entry has NO slug (it renders as "Coming soon");
 *   - the six definitive paths are present with unique slugs.
 *
 * This is the same guard the lib/series pattern relies on: catch a typo'd or
 * unpublished slug at test time, not in production.
 */
import { describe, expect, it } from "vitest";
import { READING_PATHS, getReadingPathBySlug } from "@/lib/readingPaths";
import contentData from "@/data/content-data.json";

const knownSlugs = new Set(
  (contentData as { posts: { slug: string }[] }).posts.map(p => p.slug)
);

describe("reading paths source of truth", () => {
  it("defines the six definitive paths with unique slugs", () => {
    const slugs = READING_PATHS.map(p => p.slug);
    expect(slugs).toHaveLength(6);
    expect(new Set(slugs).size).toBe(6);
    expect(slugs).toContain("start-here-blind-spots");
    expect(slugs).toContain("capture-by-the-right");
    expect(slugs).toContain("capture-by-the-left");
    expect(slugs).toContain("reading-scripture-past-our-politics");
    expect(slugs).toContain("the-church-after-christendom");
    expect(slugs).toContain("the-pastoral-angle");
  });

  it("every available entry links to a slug that exists in content-data", () => {
    for (const path of READING_PATHS) {
      for (const entry of path.entries) {
        if (!entry.available) continue;
        expect(entry.slug, `path "${path.slug}" entry "${entry.title}"`).toBeTruthy();
        expect(
          knownSlugs.has(entry.slug as string),
          `path "${path.slug}" entry "${entry.title}" -> /writing/${entry.slug} does not exist`
        ).toBe(true);
      }
    }
  });

  it("every planned (coming soon) entry omits a slug so it never links", () => {
    for (const path of READING_PATHS) {
      for (const entry of path.entries) {
        if (entry.available) continue;
        expect(entry.slug, `path "${path.slug}" entry "${entry.title}"`).toBeUndefined();
      }
    }
  });

  it("the start-here path points at /start and has no detail entries", () => {
    const start = getReadingPathBySlug("start-here-blind-spots");
    expect(start?.externalHref).toBe("/start");
    expect(start?.entries).toHaveLength(0);
  });

  it("each non-external path wires at least two real essays", () => {
    for (const path of READING_PATHS) {
      if (path.externalHref) continue;
      const available = path.entries.filter(e => e.available).length;
      expect(available, `path "${path.slug}"`).toBeGreaterThanOrEqual(2);
    }
  });
});
