/**
 * The Find Help printables keep their promises: the one-page guide is one
 * page in both paper sizes for every care page, the Scripture cards hold four
 * passages to a sheet, and every file is a tagged PDF with a language. The
 * section-wide printables (a prayer journal, a rule of life, Scripture to
 * carry, family table cards) and the workbooks hold their shape too.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
// @ts-expect-error: a plain .mjs build module without types
import { guidePdf, scripturePdf, prayerPdf, weekPdf, prayerJournalPdf, ruleOfLifePdf, memoryCardsPdf, familyCardsPdf, MEMORY_VERSES } from "../scripts/lib/help-printables.mjs";
// @ts-expect-error: a plain .mjs build module without types
import { workbookPdf, listWorkbooks } from "../scripts/lib/workbooks.mjs";
// @ts-expect-error: a plain .mjs build module without types
import { readingText, quotesPassage } from "../scripts/lib/bsb.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "client/public/needs");
const crisis = JSON.parse(fs.readFileSync(path.join(ROOT, "client/src/data/crisis-resources.json"), "utf8"));
const pages = (b: Buffer) => (b.toString("latin1").match(/\/Type \/Page\b/g) || []).length;
const tagged = (b: Buffer) => b.toString("latin1").includes("/StructTreeRoot") && b.toString("latin1").includes("/Lang");

const needs = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "index.json")
      .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
      .filter((n) => n.page === true)
  : [];

describe("help printables", () => {
  it.skipIf(needs.length === 0)("has care pages to build from", () => {
    expect(needs.length).toBeGreaterThan(0);
  });

  for (const need of needs) {
    for (const size of ["LETTER", "A4"]) {
      it(`${need.slug} (${size}): the guide is one tagged page`, async () => {
        const g: Buffer = await guidePdf(need, crisis, size);
        expect(pages(g)).toBe(1);
        expect(tagged(g)).toBe(true);
      });
      it(`${need.slug} (${size}): cards and worksheet build`, async () => {
        const s: Buffer = await scripturePdf(need, size);
        expect(pages(s)).toBe(Math.ceil(need.scripture.passages.length / 4));
        expect(pages(await prayerPdf(need, size))).toBe(1);
        expect(pages(await weekPdf(need, crisis, size))).toBeGreaterThanOrEqual(1);
      });
    }
  }
});

describe("section-wide printables", () => {
  const verses = MEMORY_VERSES as Record<string, string>;

  it("every live care page has a verse to carry, and every verse is the BSB", () => {
    for (const need of needs) expect(verses[need.slug], `no memory verse for ${need.slug}`).toBeTruthy();
    for (const [slug, ref] of Object.entries(verses)) {
      const text: string = readingText(ref);
      expect(quotesPassage(text, ref), `${slug}: ${ref}`).toBe(true);
    }
  });

  it("the prayer journal is a pattern page, thirty days, and a page for answers", async () => {
    const b: Buffer = await prayerJournalPdf("LETTER", readingText("Matthew 6:9-13"));
    expect(tagged(b)).toBe(true);
    expect(pages(b)).toBe(32);
  });

  for (const size of ["LETTER", "A4"]) {
    it(`the rule of life fits one page (${size})`, async () => {
      const b: Buffer = await ruleOfLifePdf(size);
      expect(tagged(b)).toBe(true);
      expect(pages(b)).toBe(1);
    });
  }

  it("Scripture to carry: an intro page, then four cards to a page", async () => {
    const cards = needs.map((n) => ({ slug: n.slug, title: n.title, ref: verses[n.slug], text: readingText(verses[n.slug]) }));
    const b: Buffer = await memoryCardsPdf(cards, "LETTER");
    expect(tagged(b)).toBe(true);
    expect(pages(b)).toBe(1 + Math.ceil(cards.length / 4));
  });

  it("family table cards: an intro page, then two cards to a page", async () => {
    const devotions = ["family-devotions.json", "family-devotions-2.json"].flatMap((f) => JSON.parse(fs.readFileSync(path.join(ROOT, "client/public", f), "utf8")));
    const b: Buffer = await familyCardsPdf(devotions, "A4");
    expect(tagged(b)).toBe(true);
    expect(pages(b)).toBe(1 + Math.ceil(devotions.length / 2));
  });

  for (const wb of listWorkbooks(ROOT) as { id: string; sessions: unknown[] }[]) {
    it(`workbook ${wb.id}: tagged, with a page or more for every session`, async () => {
      const b: Buffer = await workbookPdf(wb, crisis, "LETTER");
      expect(tagged(b)).toBe(true);
      expect(pages(b)).toBeGreaterThanOrEqual(wb.sessions.length + 2);
    });
  }
});
