import { describe, it, expect } from "vitest";

import { buildIndex, formatBytes, lengthBand, normalize, queryTokens, search, type CatalogueItem } from "./catalogue";

const ITEMS: CatalogueItem[] = [
  { kind: "Essay", title: "The Slow Drift That Ends Marriages", href: "/writing/the-slow-drift-that-ends-marriages", summary: "No one signs the papers over a single argument.", group: "Living Well", minutes: 10, date: "2026-05-01" },
  { kind: "Essay", title: "What Silence Costs a Marriage", href: "/writing/what-silence-costs-a-marriage", summary: "The marriage rarely dies in the fight.", minutes: 11, date: "2026-06-01" },
  { kind: "Study guide", title: "Anxiety", href: "/studyguides/anxiety", summary: "Eight sessions on fear and trust.", scripture: ["Philippians 4:6-7", "Matthew 6:25-34"] },
  { kind: "Wisdom", title: "Anger", href: "/wisdom/anger", summary: "What Proverbs says about a hot temper.", scripture: ["Proverbs 15:1"], terms: "temper rage" },
  { kind: "Church history", title: "First Council of Nicaea", href: "/theology/history", group: "Councils", period: "325" },
  { kind: "Book", title: "Believe", href: "/books/believe", summary: "The rational case for Christian faith." },
];

describe("catalogue search", () => {
  const index = buildIndex(ITEMS);

  it("finds by title and ranks title matches first", () => {
    const { results } = search(index, "marriage");
    expect(results.map((r) => r.href)).toEqual(["/writing/what-silence-costs-a-marriage", "/writing/the-slow-drift-that-ends-marriages"]);
  });

  it("requires every meaningful word, ignoring question words", () => {
    expect(search(index, "what does the bible say about anger").results[0].href).toBe("/wisdom/anger");
    expect(search(index, "silence marriage").results.map((r) => r.href)).toEqual(["/writing/what-silence-costs-a-marriage"]);
  });

  it("ranks a whole reference above its words scattered", () => {
    const idx = buildIndex([
      { kind: "Study guide", title: "Church and Empire: An 8-Week Study", href: "/studyguides/empire", scripture: ["Romans 13:1-7"] },
      { kind: "Wisdom", title: "Suffering", href: "/wisdom/suffering", scripture: ["Romans 8:18-28"] },
    ]);
    expect(search(idx, "Romans 8").results[0].href).toBe("/wisdom/suffering");
  });

  it("matches Scripture references, chapter and verse", () => {
    expect(search(index, "Philippians 4").results[0].href).toBe("/studyguides/anxiety");
    expect(search(index, "proverbs 15:1").results[0].href).toBe("/wisdom/anger");
  });

  it("matches hidden search terms and periods", () => {
    expect(search(index, "temper").results[0].href).toBe("/wisdom/anger");
    expect(search(index, "nicaea 325").results[0].title).toBe("First Council of Nicaea");
  });

  it("corrects a misspelled word to one the library contains", () => {
    const r = search(index, "marrige");
    expect(r.corrected).toEqual([{ from: "marrige", to: "marriage" }]);
    expect(r.results.length).toBe(2);
  });

  it("falls back to partial matches instead of an empty page", () => {
    const r = search(index, "anxiety zzzzzz");
    expect(r.partial).toBe(true);
    expect(r.results[0].href).toBe("/studyguides/anxiety");
  });

  it("returns everything for an empty query", () => {
    expect(search(index, "   ").results.length).toBe(ITEMS.length);
  });
});

describe("catalogue helpers", () => {
  it("normalizes accents, punctuation, and verse colons", () => {
    expect(normalize("Nicæa’s Créed — John 3:16!")).toBe("nicaeas creed john 3:16");
    expect(queryTokens("How do I forgive?")).toEqual(["forgive"]);
  });

  it("formats sizes and bands lengths", () => {
    expect(formatBytes(116544)).toBe("114 KB");
    expect(formatBytes(2.5 * 1024 * 1024)).toBe("2.5 MB");
    expect(lengthBand(9)).toBe("short");
    expect(lengthBand(15)).toBe("medium");
    expect(lengthBand(25)).toBe("long");
    expect(lengthBand(undefined)).toBeUndefined();
  });
});
