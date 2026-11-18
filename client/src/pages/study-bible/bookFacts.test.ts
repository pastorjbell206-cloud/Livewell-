/**
 * The facts the Study Bible's front page and book pages draw from: every one
 * of the 66 outlines becomes a band that runs the whole book once, in order,
 * with no gap; the sections of the canon cover the 66 books once; and the
 * "who wrote it" and "when" lines are the notes' own first sentences.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { CANON_SECTIONS, KIND_OF, firstSentence, outlineBand } from "./bookFacts";

const ROOT = path.resolve(__dirname, "../../../..");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
const BOOKS: { slug: string; name: string; chapters: number }[] = json("client/public/bible/books.json");
const intro = (slug: string) => json(`client/public/bible/notes/${slug}/intro.json`);

describe("the 66 books", () => {
  it("are covered once by the seven sections of the canon", () => {
    const seen = CANON_SECTIONS.flatMap((s) => Array.from({ length: s.to - s.from + 1 }, (_, i) => s.from + i));
    expect(seen).toEqual(Array.from({ length: 66 }, (_, i) => i));
    expect(BOOKS[CANON_SECTIONS[4].from].slug).toBe("matthew");
    expect(BOOKS[CANON_SECTIONS[6].from].slug).toBe("revelation");
  });

  it("each have a kind of writing the shelf can colour", () => {
    const meta: { books: { book: string; genre: string }[] } = json("client/public/theology/bible-books.json");
    for (const b of BOOKS) {
      const m = meta.books.find((x) => x.book === b.name);
      expect(m, b.name).toBeTruthy();
      expect(KIND_OF[m!.genre], b.name).toBeTruthy();
    }
  });
});

describe("a book's outline as a band", () => {
  it.each(BOOKS.map((b) => [b.slug, b.chapters] as const))("%s runs the whole book once, in order", (slug, chapters) => {
    const parts = outlineBand(intro(slug).structure, chapters);
    expect(parts.length).toBe(intro(slug).structure.length);
    expect(parts[0].start).toBe(0);
    for (let i = 0; i < parts.length; i++) {
      expect(parts[i].share, `${slug} part ${i + 1}`).toBeGreaterThan(0);
      expect(parts[i].chapter).toBeGreaterThanOrEqual(1);
      expect(parts[i].chapter).toBeLessThanOrEqual(chapters);
      if (i > 0) expect(parts[i].start).toBeCloseTo(parts[i - 1].start + parts[i - 1].share, 9);
    }
    const last = parts[parts.length - 1];
    expect(last.start + last.share).toBeCloseTo(1, 9);
  });

  it("reads a part that starts inside a chapter, and a one-chapter book's verses", () => {
    const gen = outlineBand(intro("genesis").structure, 50);
    expect(gen.find((p) => p.range === "11:10-26")).toMatchObject({ chapter: 11, verse: 10 });
    expect(gen.find((p) => p.range === "37:2-50:26")).toMatchObject({ chapter: 37, verse: 2 });
    expect(gen[0]).toMatchObject({ chapter: 1, verse: undefined });
    const ps = outlineBand(intro("psalms").structure, 150);
    expect(ps.map((p) => p.chapter)).toEqual([1, 3, 42, 73, 90, 107, 146]);
    const phm = outlineBand(intro("philemon").structure, 1);
    expect(phm.map((p) => [p.chapter, p.verse])).toEqual([[1, 1], [1, 4], [1, 8], [1, 23]]);
    const jude = outlineBand(intro("jude").structure, 1);
    expect(jude.map((p) => p.verse)).toEqual([1, 3, 5, 17, 24]);
  });
});

describe("who wrote it, and when", () => {
  it("is the first sentence of the note, word for word", () => {
    expect(firstSentence(intro("genesis").author)).toBe("Genesis never names its author.");
    expect(firstSentence(intro("revelation").date)).toBe("Two main dates are proposed.");
    for (const b of BOOKS) {
      for (const field of ["author", "date"] as const) {
        const text: string = intro(b.slug)[field];
        const s = firstSentence(text);
        expect(text.replace(/\s+/g, " ").startsWith(s), `${b.slug} ${field}`).toBe(true);
        expect(s.length, `${b.slug} ${field}`).toBeGreaterThan(10);
        expect(s.split(" ").length, `${b.slug} ${field}`).toBeLessThanOrEqual(60);
      }
    }
  });
});
