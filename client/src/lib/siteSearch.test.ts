/**
 * On-site search finds a tool by its name, a care page by the words people
 * actually type, and puts the closest title first.
 */
import { describe, expect, it } from "vitest";
import { crisisTopicsFor, hasWordStarts, normalizeText, queryWords, rankEntries, scoreEntry } from "./siteSearch";

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

  it("matches at the start of a word, never inside one", () => {
    expect(scoreEntry({ title: "Eight Weeks Toward Being Known", blurb: "For the lonely." }, "war")).toBe(0);
    expect(hasWordStarts("I can't stop drinking or using", ["sin"])).toBe(false);
    expect(hasWordStarts("The Worry Journal", ["worr"])).toBe(true);
  });

  it("meets an everyday phrasing short words and all", () => {
    const divorce = { title: "My marriage has ended", blurb: "", keywords: "is divorce a sin", sourceLabel: "Find Help" };
    expect(scoreEntry(divorce, "is divorce a sin")).toBe(10 + 40 + 3);
  });
});

describe("crisis words", () => {
  it("names the help lines what a reader typed calls for", () => {
    expect(crisisTopicsFor("I want to die")).toEqual(["suicide"]);
    expect(crisisTopicsFor("thinking about killing myself")).toEqual(["suicide"]);
    expect(crisisTopicsFor("my husband hits me")).toEqual(["suicide", "abuse"]);
    expect(crisisTopicsFor("I was raped")).toEqual(["suicide", "sexual-assault"]);
  });

  it("stays quiet for everything else", () => {
    expect(crisisTopicsFor("grief after a death")).toEqual([]);
    expect(crisisTopicsFor("the war in Ukraine")).toEqual([]);
    expect(crisisTopicsFor("Deuteronomy")).toEqual([]);
  });
});
