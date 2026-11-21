/**
 * The search's second and third tries (lib/searchMend.ts), over the real
 * index the site ships (client/public/search-index.json): a misspelling is
 * mended, a question with a word too many still lands near its subject, and a
 * query that already works is left alone.
 */
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { indexEntries, rankEntries } from "./siteSearch";
import { findEntries } from "./searchMend";

const ENTRIES = indexEntries(JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/search-index.json"), "utf8")));

describe("findEntries", () => {
  it("leaves a search that works exactly as it was", () => {
    for (const q of ["how do i pray", "is the bible true", "church history", "anxiety"]) {
      const found = findEntries(ENTRIES, q);
      expect(found.mended, q).toBeUndefined();
      expect(found.nearest, q).toBeUndefined();
      expect(found.items, q).toEqual(rankEntries(ENTRIES, q));
      expect(found.items.length, q).toBeGreaterThan(0);
    }
  });

  it("mends one misspelled word to the word the site uses, and says which", () => {
    const cases: [string, string, RegExp][] = [
      ["forgivness", "forgiveness", /forgiv/i],
      ["anxeity", "anxiety", /anxiety/i],
      ["ressurection", "resurrection", /resurrection/i],
      ["baptisim", "baptism", /baptism/i],
      ["depresion", "depression", /depression/i],
    ];
    for (const [typed, mended, title] of cases) {
      expect(rankEntries(ENTRIES, typed), typed).toEqual([]);
      const found = findEntries(ENTRIES, typed);
      expect(found.mended, typed).toBe(mended);
      expect(found.items[0].title, typed).toMatch(title);
    }
  });

  it("offers the nearest pages when no page holds every word", () => {
    const found = findEntries(ENTRIES, "something for my kids tonight");
    expect(found.nearest).toBe(true);
    expect(found.items[0].href).toBe("/family/tonight");
  });

  it("finds a hub by its menu name, since every catalogue page is indexed", () => {
    expect(findEntries(ENTRIES, "case for the faith").items[0].href).toBe("/questions");
    expect(findEntries(ENTRIES, "for skeptics").items[0].href).toBe("/skeptics");
    expect(findEntries(ENTRIES, "how to study the bible").items[0].href).toBe("/study/how-to-study");
    expect(findEntries(ENTRIES, "bible explorer").items[0].href).toBe("/study/explorer");
  });

  it("returns nothing for nonsense, so the page can offer the doors", () => {
    expect(findEntries(ENTRIES, "zzqqxx")).toEqual({ items: [] });
    expect(findEntries(ENTRIES, "")).toEqual({ items: [] });
  });
});
