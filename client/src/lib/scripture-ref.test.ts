/**
 * One Scripture reference parser, in two runtimes: the site's
 * (lib/scripture-ref.ts) and the build scripts' (scripts/lib/bsb.mjs readRef).
 * Both read data/scripture-books.json; these tests hold them to one answer on
 * one fixture list and on the references the site's data already carries (the
 * shelf.ts and scripts/lib/shelf.mjs precedent). A grammar change goes in both
 * files and passes here, or it does not land.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import BOOK_TABLE from "@/data/scripture-books.json";
import { SCRIPTURE_BOOKS, bookKey, findBook, formatRef, parseScriptureRef, refHref, type ScriptureRef } from "./scripture-ref";
import { bookKey as nodeBookKey, readRef, passage } from "../../../scripts/lib/bsb.mjs";

const ROOT = path.resolve(__dirname, "../../..");
const readJson = (p: string) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

/** What a parse names, in a form both runtimes can be compared on. */
const shape = (r: { book: { slug: string }; parts: ScriptureRef["parts"] } | null) =>
  r && { slug: r.book.slug, parts: r.parts };
const both = (ref: string) => ({ site: shape(parseScriptureRef(ref)), scripts: shape(readRef(ref)) });

const WHOLE = Infinity;

/** The card's references (master plan U09), then the edges of the grammar, then things that are not references. */
const FIXTURES = [
  "John 3:16", "jn 3 16", "1 cor 13", "Romans 13", "Ps 23:1-3", "Philippians 4:6-7",
  "JOHN 3:16", "  John   3 : 16 ", "John 3.16", "Jn 3:16-18", "jn 3 16-18", "1Cor 13:4-7", "1 Cor. 13:4",
  "I Corinthians 13", "First Corinthians 13:13", "2nd Timothy 3:16", "III John 4", "Song of Songs 2:1",
  "Song of Solomon 8:6", "song 2", "Psalm 23", "Psalms 23", "Ps. 23:1", "psa 119:105", "Qoheleth 3:1",
  "Revelations 21:4", "Philem 6", "Gen 1:1", "Ex 20:1-17", "Deut 6:4-9", "Matt 5:3", "mk 1:15", "lk 15:20",
  "Rom 8:28", "Gal 5:22-23", "Eph 2:8-9", "1 Thess 5:16-18", "Heb 11:1", "Jas 1:2", "1 Pet 3:15", "1 Jn 4:8",
  "Rev 21:4", "Jhn.3.16",
  "Romans 8–9", "Romans 8 - 9", "Romans 8\u20149", "Genesis 1:1-2:3", "Romans 7:24-8:1, 5", "Psalm 71:9, 17-18",
  "Psalm 73:2-3,13,16-17,21-23", "Romans 5:1; 8:28", "Psalm 23; 139", "Job 1-2", "John 3:16 ",
  "Jude 3", "Jude 1", "Jude 1:3", "Jude 24-25", "Philemon 15-16", "3 John 1:4", "Obadiah 1",
  "Hezekiah 1:1", "Wisdom 2:12-20", "2 Maccabees 12:39-45", "Genesis", "Genesis 51", "Genesis 0", "John 0:1",
  "John 3:0", "John 3:18-16", "John 4-3", "Jude 2:1", "John 3:16 and 17", "Acts 2 (Pentecost)", "John 3:16.",
  "John 3:16,", "3:16", "", "not a reference", "is 53", "1 Corinthians (Christ crucified)", "4 John 1:1",
  "Romans 3:23b", "John 18:36a", "Luke 22:19b-20", "Mark 1:35a-b", "Matthew 5:13c, 14", "John 3:16ab", "John 3:16A",
  "Psalm 23a", "John 3:16 b",
];

describe("the two parsers", () => {
  it("read the card's references the same way, and exactly", () => {
    const expected: Record<string, { slug: string; parts: ScriptureRef["parts"] }> = {
      "John 3:16": { slug: "john", parts: [{ c1: 3, v1: 16, c2: 3, v2: 16 }] },
      "jn 3 16": { slug: "john", parts: [{ c1: 3, v1: 16, c2: 3, v2: 16 }] },
      "1 cor 13": { slug: "1-corinthians", parts: [{ c1: 13, v1: 1, c2: 13, v2: WHOLE }] },
      "Romans 13": { slug: "romans", parts: [{ c1: 13, v1: 1, c2: 13, v2: WHOLE }] },
      "Ps 23:1-3": { slug: "psalms", parts: [{ c1: 23, v1: 1, c2: 23, v2: 3 }] },
      "Philippians 4:6-7": { slug: "philippians", parts: [{ c1: 4, v1: 6, c2: 4, v2: 7 }] },
    };
    for (const [ref, want] of Object.entries(expected)) {
      expect(both(ref), ref).toEqual({ site: want, scripts: want });
    }
  });

  it("read a part of a verse as the whole verse", () => {
    expect(both("Romans 3:23b")).toEqual({ site: { slug: "romans", parts: [{ c1: 3, v1: 23, c2: 3, v2: 23 }] }, scripts: { slug: "romans", parts: [{ c1: 3, v1: 23, c2: 3, v2: 23 }] } });
    expect(both("Luke 22:19b-20").site).toEqual({ slug: "luke", parts: [{ c1: 22, v1: 19, c2: 22, v2: 20 }] });
    for (const ref of ["John 3:16ab", "John 3:16A", "Psalm 23a", "John 3:16 b"]) expect(both(ref), ref).toEqual({ site: null, scripts: null });
  });

  it("return null for an unknown book", () => {
    for (const ref of ["Hezekiah 1:1", "Wisdom 2:12-20", "2 Maccabees 12:39-45", "4 John 1:1"]) {
      expect(both(ref), ref).toEqual({ site: null, scripts: null });
    }
  });

  it("agree on every fixture", () => {
    for (const ref of FIXTURES) {
      const { site, scripts } = both(ref);
      expect(site, ref).toEqual(scripts);
    }
  });

  it("agree on every reference the Study Bible's guides, doctrine studies, and Find Help pages carry", () => {
    const refs = new Set<string>();
    const dir = (p: string) => fs.readdirSync(path.join(ROOT, p)).filter((f) => f.endsWith(".json") && f !== "index.json");
    for (const f of dir("client/public/bible/guides"))
      for (const s of readJson(`client/public/bible/guides/${f}`).sections ?? []) for (const r of s.refs ?? []) refs.add(r);
    for (const f of dir("client/public/bible/doctrines"))
      for (const k of readJson(`client/public/bible/doctrines/${f}`).keyTexts ?? []) refs.add(k.ref);
    for (const f of dir("client/public/needs"))
      for (const p of readJson(`client/public/needs/${f}`).scripture?.passages ?? []) refs.add(p.ref);
    expect(refs.size).toBeGreaterThan(100);
    for (const ref of Array.from(refs)) {
      const { site, scripts } = both(ref);
      expect(site, ref).toEqual(scripts);
      expect(site, `${ref} should read as a reference`).not.toBeNull();
    }
  });

  it("store book names the same way", () => {
    for (const s of ["1 Cor.", "1cor", "I Corinthians", "II Kings", "iii john", "First Peter", "2nd Timothy", "Song  of Songs", "PS"]) {
      expect(bookKey(s), s).toBe(nodeBookKey(s));
    }
  });

  it("keep what the scripts quote: a parse names verses the Bible text has", () => {
    expect(passage("jn 3 16").verses.map((v: { c: number; v: number }) => `${v.c}:${v.v}`)).toEqual(["3:16"]);
    expect(passage("Jude 3").verses).toHaveLength(1);
    expect(() => passage("Hezekiah 1:1")).toThrow(/Cannot read reference/);
  });
});

describe("the book table", () => {
  it("is the Study Bible's table of contents, in order", () => {
    expect(SCRIPTURE_BOOKS).toEqual(readJson("client/public/bible/books.json"));
  });

  it("gives every name and abbreviation to exactly one book", () => {
    const owner = new Map<string, string>();
    for (const row of BOOK_TABLE) {
      for (const a of [row.name, row.slug.replace(/-/g, " "), row.code, ...row.aliases]) {
        const k = bookKey(a);
        expect(owner.get(k) ?? row.slug, `"${a}" names ${owner.get(k)} and ${row.slug}`).toBe(row.slug);
        owner.set(k, row.slug);
      }
    }
  });

  it("knows the abbreviations people write", () => {
    const cases: Record<string, string> = {
      Gen: "genesis", Ex: "exodus", Lev: "leviticus", Num: "numbers", Deut: "deuteronomy", Josh: "joshua", Judg: "judges",
      "1 Sam": "1-samuel", "2 Kgs": "2-kings", "1 Chr": "1-chronicles", Neh: "nehemiah", Esth: "esther", Ps: "psalms",
      Prov: "proverbs", Eccl: "ecclesiastes", Song: "song-of-solomon", Isa: "isaiah", Jer: "jeremiah", Lam: "lamentations",
      Ezek: "ezekiel", Dan: "daniel", Hos: "hosea", Obad: "obadiah", Mic: "micah", Nah: "nahum", Hab: "habakkuk",
      Zeph: "zephaniah", Hag: "haggai", Zech: "zechariah", Mal: "malachi", Matt: "matthew", Mt: "matthew", Mk: "mark",
      Lk: "luke", Jn: "john", Rom: "romans", "1 Cor": "1-corinthians", "2 Cor": "2-corinthians", Gal: "galatians",
      Eph: "ephesians", Phil: "philippians", Col: "colossians", "1 Thess": "1-thessalonians", "2 Tim": "2-timothy",
      Titus: "titus", Philem: "philemon", Heb: "hebrews", Jas: "james", "1 Pet": "1-peter", "1 Jn": "1-john",
      "3 Jn": "3-john", Jude: "jude", Rev: "revelation",
    };
    for (const [abbr, slug] of Object.entries(cases)) expect(findBook(abbr)?.slug, abbr).toBe(slug);
    expect(findBook("Hezekiah")).toBeNull();
  });
});

describe("formatRef", () => {
  it("prints a parse the way the site cites Scripture", () => {
    const f = (ref: string) => formatRef(parseScriptureRef(ref)!);
    expect(f("jn 3 16")).toBe("John 3:16");
    expect(f("Ps 23:1-3")).toBe("Psalm 23:1–3");
    expect(f("psalms 23-24")).toBe("Psalms 23–24");
    expect(f("1 cor 13")).toBe("1 Corinthians 13");
    expect(f("Romans 7:24-8:1, 5")).toBe("Romans 7:24–8:1, 5");
    expect(f("Romans 5:1; 8:28")).toBe("Romans 5:1; 8:28");
    expect(f("Psalm 71:9, 17-18")).toBe("Psalm 71:9, 17–18");
    expect(f("Psalm 23; 139")).toBe("Psalms 23; 139");
    expect(f("Jude 3")).toBe("Jude 1:3");
  });
});

describe("refHref", () => {
  it("opens the Study Bible at the chapter, and the verse when there is one", () => {
    expect(refHref("Romans 3:21-26")).toBe("/study/bible/romans/3#v21");
    expect(refHref("Psalm 23")).toBe("/study/bible/psalms/23");
    expect(refHref("1 Corinthians 13:4")).toBe("/study/bible/1-corinthians/13#v4");
    expect(refHref("Song of Solomon 2:1")).toBe("/study/bible/song-of-solomon/2#v1");
    expect(refHref("jn 3 16")).toBe("/study/bible/john/3#v16");
    expect(refHref("Jude 3")).toBe("/study/bible/jude/1#v3");
    expect(refHref("Hezekiah 1:1")).toBeNull();
  });

  it("opens the chapter's top for 'Read the whole chapter'", () => {
    expect(refHref("Psalm 23:4", { verse: false })).toBe("/study/bible/psalms/23");
    expect(refHref("1 John 4:18", { verse: false })).toBe("/study/bible/1-john/4");
    expect(refHref("Song of Songs 8:6", { verse: false })).toBe("/study/bible/song-of-solomon/8");
    expect(refHref("not a reference", { verse: false })).toBeNull();
  });
});
