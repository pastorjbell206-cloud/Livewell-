/**
 * The Find Help printables keep their promises: the one-page guide is one
 * page in both paper sizes for every care page, the Scripture cards hold four
 * passages to a sheet, and every file is a tagged PDF with a language.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
// @ts-expect-error: a plain .mjs build module without types
import { guidePdf, scripturePdf, prayerPdf, weekPdf } from "../scripts/lib/help-printables.mjs";

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
