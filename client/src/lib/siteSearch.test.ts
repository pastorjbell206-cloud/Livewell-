/**
 * On-site search finds a tool by its name, a care page by the words people
 * actually type, and puts the closest title first.
 */
import { describe, expect, it } from "vitest";
import { normalizeText, queryWords, rankEntries, scoreEntry } from "./siteSearch";

const worryJournal = { title: "The Worry Journal", blurb: "Five minutes before bed.", sourceLabel: "Tools" };
const anxietyCare = { title: "I can't stop worrying", blurb: "For the worry that won't switch off.", keywords: "anxiety worry can't sleep Philippians 4:6", sourceLabel: "Find Help" };
const howTo = { title: "How to Pray When You Do Not Feel Like It", blurb: "Prayer is not a mood.", sourceLabel: "How-To Library" };

describe("normalizing a query", () => {
  it("drops apostrophes and punctuation, and one-letter words", () => {
    expect(normalizeText("Can't  sleep!")).toBe("cant sleep");
    expect(queryWords("I feel so alone")).toEqual(["feel", "so", "alone"]);
  });
});

describe("ranking", () => {
  it("finds a tool by its name in any word order", () => {
    expect(rankEntries([howTo, anxietyCare, worryJournal], "worry journal")[0]).toBe(worryJournal);
    expect(rankEntries([howTo, worryJournal], "journal worry")).toEqual([worryJournal]);
  });

  it("finds a care page by the everyday words in its askedAs list", () => {
    expect(rankEntries([howTo, worryJournal, anxietyCare], "cant sleep")).toEqual([anxietyCare]);
  });

  it("needs every word, so unrelated entries drop out", () => {
    expect(scoreEntry(howTo, "worry journal")).toBe(0);
  });

  it("puts a whole-phrase title match first", () => {
    const ranked = rankEntries([anxietyCare, howTo], "pray");
    expect(ranked[0]).toBe(howTo);
  });

  it("returns nothing for an empty query", () => {
    expect(rankEntries([howTo], "  ")).toEqual([]);
  });
});
