/**
 * A visitor who types the name of a section is handed that section. The
 * committed index (public/search-index.json, scripts/build-search-index.mjs)
 * is read as the search page reads it, and the queries are the ones the
 * November 2026 audit found answering with unrelated pages.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { indexEntries, rankEntries } from "./siteSearch";

const ENTRIES = indexEntries(
  JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/search-index.json"), "utf8"))
);
const first = (q: string) => rankEntries(ENTRIES, q)[0]?.href;
const top = (q: string, n = 5) => rankEntries(ENTRIES, q).slice(0, n).map((e) => e.href);

describe("search finds the site's own main things", () => {
  it.each([
    ["church history", "/theology/history"],
    ["study bible", "/study/bible"],
    ["the study bible", "/study/bible"],
    ["books", "/books"],
    ["contact", "/contact"],
    ["catechism", "/family/catechism"],
    ["tools", "/tools"],
    ["essays", "/writing"],
    ["family devotions", "/family/devotions"],
  ])("%s opens %s first", (query, href) => {
    expect(first(query)).toBe(href);
  });

  it("offers the family page and tonight's devotion for family devotions", () => {
    expect(top("family devotions")).toEqual(expect.arrayContaining(["/family/devotions", "/family/tonight", "/family"]));
  });

  it("finds the people and councils of church history by name", () => {
    expect(first("augustine")).toMatch(/^\/theology\/history#person-augustine/);
    expect(first("nicaea")).toMatch(/^\/theology\/history#council-/);
  });

  it("finds a doctrine by its plain name, and the answer whose question never uses the word", () => {
    expect(first("trinity")).toBe("/study/bible/doctrines/trinity");
    expect(rankEntries(ENTRIES, "trinity").map((e) => e.href)).toContain("/answers/how-can-god-be-three-and-one");
  });

  it("finds a book's introduction by who wrote it", () => {
    expect(first("who wrote romans")).toBe("/study/bible/romans");
  });

  it("finds the Advent devotions", () => {
    const hrefs = rankEntries(ENTRIES, "advent").map((e) => e.href);
    expect(hrefs).toContain("/family/devotions");
    expect(hrefs).toContain("/family/devotions?tab=advent&day=1");
  });

  it("names James's pages for his name", () => {
    expect(top("James Bell")).toEqual(expect.arrayContaining(["/about", "/writing", "/books"]));
  });

  it("never shows a false teaching's own claim as the result line", () => {
    const heresies = ENTRIES.filter((e) => e.href.startsWith("/theology/history#heresy-"));
    expect(heresies.length).toBeGreaterThan(0);
    for (const h of heresies) expect(h.blurb).toMatch(/^A teaching the church answered and rejected/);
  });
});
