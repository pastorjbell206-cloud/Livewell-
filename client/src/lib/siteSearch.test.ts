/**
 * On-site search finds a tool by its name, a care page by the words people
 * actually type, and puts the closest title first.
 */
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { LIBRARY_SOURCES } from "./catalog";
import {
  crisisTopicsFor,
  essayEntries,
  findHref,
  hasWordStarts,
  indexEntries,
  libraryEntries,
  loadPassageParser,
  normalizeText,
  passageFor,
  queryWords,
  rankEntries,
  scoreEntry,
  searchWords,
} from "./siteSearch";

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

describe("plain questions", () => {
  it("drops the small words of a question and keeps what is asked", () => {
    expect(searchWords("how to talk to my kids about God")).toEqual(["talk", "kids", "god"]);
    expect(searchWords("is america a christian nation")).toEqual(["america", "christian", "nation"]);
    // Negatives change the question, so they stay.
    expect(searchWords("I can't forgive")).toEqual(["cant", "forgive"]);
    // A query of nothing but small words is still searched.
    expect(searchWords("who am I")).toEqual(["who", "am"]);
  });

  it("lets kids find children, and a plural find its singular", () => {
    const study = { title: "Raising Children Who Pray", blurb: "", sourceLabel: "Study Guides" };
    expect(scoreEntry(study, "praying with my kids")).toBeGreaterThan(0);
    expect(scoreEntry({ title: "One Nation Under God", blurb: "" }, "nations")).toBeGreaterThan(0);
  });

  it("matches those family words whole, so mom does not find moment", () => {
    expect(scoreEntry({ title: "A Moment of Quiet", blurb: "" }, "mom")).toBe(0);
    expect(scoreEntry({ title: "When Your Mother Has Died", blurb: "" }, "my mom died")).toBeGreaterThan(0);
    expect(scoreEntry({ title: "The Children's Sermon", blurb: "" }, "kids sermon")).toBeGreaterThan(0);
  });

  it("puts a whole word of the title ahead of a word it only starts", () => {
    const question = { title: "Was America Founded as a Christian Nation?", blurb: "" };
    const history = { title: "How We Got Here: A History of Christian Nationalism in America", blurb: "" };
    expect(rankEntries([history, question], "is america a christian nation")).toEqual([question, history]);
  });
});

describe("the sources", () => {
  const source = { url: "/x.json", listKey: "items", label: "How-To Library", type: "How-To", buildHref: (s: string) => `/how-tos/${s}`, indexHref: "/how-tos" };

  it("reads a library manifest and skips what is malformed", () => {
    const entries = libraryEntries(source, { items: [{ slug: "pray", title: "How to Pray", excerpt: "Start small.", askedAs: ["prayer", 4] }, { title: "no slug" }, null] });
    expect(entries).toEqual([{ title: "How to Pray", blurb: "Start small.", facet: "", keywords: "prayer", sourceLabel: "How-To Library", href: "/how-tos/pray", indexHref: "/how-tos" }]);
    expect(libraryEntries(source, null)).toEqual([]);
  });

  it("reads the search index and skips entries with no title or an outside link", () => {
    const entries = indexEntries({ sources: [{ label: "Honest Answers", indexHref: "/answers", entries: [{ title: "Q?", href: "/answers#q" }, { title: "", href: "/answers" }, { title: "Out", href: "https://example.com" }] }, { label: "Bad" }] });
    expect(entries).toEqual([{ title: "Q?", blurb: "", facet: "", keywords: "", sourceLabel: "Honest Answers", href: "/answers#q", indexHref: "/answers" }]);
    expect(indexEntries("nonsense")).toEqual([]);
  });

  it("finds a rewritten essay by its own title, only while it is public", () => {
    const overrides = [{ slug: "a", title: "Why Does God Feel So Far Away?", excerpt: "Silence is not absence." }, { slug: "b", title: "Retired", excerpt: "" }];
    const entries = essayEntries(overrides, (slug) => slug === "a");
    expect(entries.map((e) => e.href)).toEqual(["/writing/a"]);
    expect(rankEntries(entries, "god feel far away")[0]?.title).toBe("Why Does God Feel So Far Away?");
  });
});

describe("passages", () => {
  it("opens a reference at its verse or chapter, and a book named alone at the book", async () => {
    const p = await loadPassageParser();
    expect(passageFor("John 3:16", p)).toEqual({ label: "John 3:16", href: "/study/bible/john/3#v16", book: false });
    expect(passageFor("jn 3 16", p)).toEqual({ label: "John 3:16", href: "/study/bible/john/3#v16", book: false });
    expect(passageFor("Romans 13", p)).toEqual({ label: "Romans 13", href: "/study/bible/romans/13", book: false });
    expect(passageFor("ps 23:1-3", p)?.href).toBe("/study/bible/psalms/23#v1");
    expect(passageFor("Romans", p)).toEqual({ label: "Romans", href: "/study/bible/romans", book: true });
    expect(passageFor("1 John", p)?.href).toBe("/study/bible/1-john");
    expect(passageFor("psalm", p)?.href).toBe("/study/bible/psalms");
  });

  it("leaves everything else to search, abbreviations on their own included", async () => {
    const p = await loadPassageParser();
    for (const q of ["ps", "mk", "how to talk to my kids about God", "is america a christian nation", "Romans 13 and the state", "Hezekiah 1:1", ""]) {
      expect(passageFor(q, p), q).toBeNull();
    }
  });

  it("sends a chapter or verse straight to the Study Bible and anything else to /search", async () => {
    expect(await findHref("John 3:16")).toBe("/study/bible/john/3#v16");
    expect(await findHref(" jn 3 16 ")).toBe("/study/bible/john/3#v16");
    expect(await findHref("Romans 13")).toBe("/study/bible/romans/13");
    expect(await findHref("Romans")).toBe("/search?q=Romans");
    expect(await findHref("is america a christian nation")).toBe("/search?q=is%20america%20a%20christian%20nation");
  });
});

describe("the whole site, as a reader searches it", () => {
  const ROOT = path.resolve(__dirname, "../../..");
  const readPublic = (url: string) => JSON.parse(fs.readFileSync(path.join(ROOT, "client/public", url), "utf8"));
  // The same sources /search reads, from the committed files.
  const entries = [
    ...LIBRARY_SOURCES.flatMap((s) => libraryEntries(s, readPublic(s.url))),
    ...indexEntries(readPublic("/search-index.json")),
  ];
  const top = (q: string) => rankEntries(entries, q)[0]?.href;

  it("lists a page once for a question it asks twice", () => {
    const keys = indexEntries(readPublic("/search-index.json")).map((e) => `${e.title}|${e.href}`);
    expect(keys.length).toBe(new Set(keys).size);
  });

  it("holds every source the search index promises", () => {
    const labels = new Set(entries.map((e) => e.sourceLabel));
    for (const l of ["What the Bible Says", "Honest Answers", "Family Devotions", "Family Catechism", "Christ and the Nation", "Find Help"]) expect(labels, l).toContain(l);
  });

  it("answers a parent's plain question with the page on faith at home", () => {
    expect(top("how to talk to my kids about God")).toBe("/help/family-devotions");
    expect(top("how do I talk to my children about God")).toBe("/help/family-devotions");
  });

  it("answers the Christian-nation question with the essay that asks it", () => {
    expect(top("is america a christian nation")).toBe("/nation/christian-nation");
  });

  it("finds a wisdom topic, an Honest Answer, a devotion, and a catechism question by their own words", () => {
    expect(top("wayward child")).toBe("/wisdom/wayward-child");
    expect(top("did the resurrection actually happen")).toBe("/answers#did-the-resurrection-actually-happen");
    expect(rankEntries(entries, "made on purpose").some((e) => e.sourceLabel === "Family Devotions")).toBe(true);
    expect(rankEntries(entries, "who made you").some((e) => e.sourceLabel === "Family Catechism")).toBe(true);
  });
});
