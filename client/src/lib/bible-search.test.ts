/**
 * The Bible word search over the committed files: "born again" finds verses,
 * whole words only, the verses holding the words together first.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { buildCorpus, highlightParts, normalizeVerse, searchCorpus, searchWordsOf } from "./bible-search";

const DIR = path.resolve(__dirname, "../../public/bible");
const json = (p: string) => JSON.parse(fs.readFileSync(path.join(DIR, p), "utf8"));
const books = json("books.json") as { slug: string; name: string; chapters: number }[];
const index = json("search/index.json") as { shards: { file: string; books: string[] }[] };
const corpus = buildCorpus(index.shards.map((s) => json(`search/${s.file}`)), books);
const refs = (q: string) => searchCorpus(corpus, q).hits.map((h) => `${h.slug} ${h.chapter}:${h.verse}`);

describe("the Bible word search", () => {
  it("holds every book, in the Bible's order", () => {
    expect(index.shards.flatMap((s) => s.books)).toEqual(books.map((b) => b.slug));
    expect(corpus.slug).toEqual(books.map((b) => b.slug));
    expect(corpus.text.length).toBeGreaterThan(31000);
  });

  it("finds the verses that say \"born again\"", () => {
    const r = searchCorpus(corpus, "born again");
    const found = r.hits.filter((h) => h.phrase).map((h) => `${h.slug} ${h.chapter}:${h.verse}`);
    expect(found).toContain("john 3:3");
    expect(found).toContain("john 3:7");
    expect(found).toContain("1-peter 1:23");
    expect(r.phraseCount).toBe(found.length);
    // The verses with the words together come before the ones with them apart.
    expect(r.hits.slice(0, r.phraseCount).every((h) => h.phrase)).toBe(true);
    expect(r.hits.slice(r.phraseCount).some((h) => h.phrase)).toBe(false);
  });

  it("matches whole words, whatever the capitals or the punctuation", () => {
    expect(searchCorpus(corpus, "Jesus wept").phraseCount).toBe(1);
    expect(refs("Jesus wept")[0]).toBe("john 11:35");
    expect(refs("JESUS WEPT.")).toEqual(refs("Jesus wept"));
    const love = searchCorpus(corpus, "love").hits;
    expect(love.length).toBeGreaterThan(100);
    expect(love.every((h) => / love /.test(` ${normalizeVerse(h.text)} `))).toBe(true);
    expect(refs("zzyzx")).toEqual([]);
    expect(searchCorpus(corpus, "  ").hits).toEqual([]);
  });

  it("gives each hit the text of its own verse", () => {
    const [hit] = searchCorpus(corpus, "Jesus wept").hits;
    expect(hit.text).toBe(json("text/john/11.json").verses[34].t);
    expect(books[hit.book].name).toBe("John");
  });

  it("sets the matched words apart in the printed verse", () => {
    expect(searchWordsOf("Born  again!")).toEqual(["born", "again"]);
    expect(highlightParts("unless he is born again.", ["born", "again"])).toEqual([
      { text: "unless he is ", hit: false },
      { text: "born", hit: true },
      { text: " ", hit: false },
      { text: "again", hit: true },
      { text: ".", hit: false },
    ]);
    expect(highlightParts("The LORD’s name", ["lords"]).filter((p) => p.hit).map((p) => p.text)).toEqual(["LORD’s"]);
    expect(highlightParts("glove", ["love"]).some((p) => p.hit)).toBe(false);
  });
});
