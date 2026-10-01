/**
 * The plan booklets and Bible reading plans keep their promises: every care
 * plan prints as a tagged booklet (a cover, then one page per week), and every
 * reading plan covers each chapter in scope exactly once, in order, across the
 * number of days it names, with no day empty.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
// @ts-expect-error: a plain .mjs build module without types
import { planBookletPdf } from "../scripts/lib/help-printables.mjs";
// @ts-expect-error: a plain .mjs build module without types
import { chaptersFor, splitDays, labelFor, planDays, readingPlanPdf } from "../scripts/lib/reading-plans.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const crisis = JSON.parse(fs.readFileSync(path.join(ROOT, "client/src/data/crisis-resources.json"), "utf8"));
const pages = (b: Buffer) => (b.toString("latin1").match(/\/Type \/Page\b/g) || []).length;
const tagged = (b: Buffer) => b.toString("latin1").includes("/StructTreeRoot") && b.toString("latin1").includes("/Lang");

const PLANS = path.join(ROOT, "client/public/plans");
const carePlans = fs.readdirSync(PLANS)
  .filter((f) => f.endsWith(".json") && !f.includes("index"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(PLANS, f), "utf8")));
const readingPlans: { id: string; title: string; days: number; scope: string | string[] }[] =
  JSON.parse(fs.readFileSync(path.join(ROOT, "client/src/data/bible-reading-plans.json"), "utf8")).plans;

describe("plan booklets", () => {
  for (const plan of carePlans) {
    it(`${plan.slug}: a tagged booklet with a page for every week`, async () => {
      const b: Buffer = await planBookletPdf(plan, crisis, "LETTER");
      expect(tagged(b)).toBe(true);
      expect(pages(b)).toBeGreaterThanOrEqual(plan.weeks.length + 1);
    });
  }
});

describe("Bible reading plans", () => {
  it("labels ranges the way people write them", () => {
    const ch = (book: string, slug: string, chapters: number, c: number) => ({ book, slug, chapters, c, verses: 10 });
    expect(labelFor([ch("Genesis", "genesis", 50, 1), ch("Genesis", "genesis", 50, 2)])).toBe("Genesis 1-2");
    expect(labelFor([ch("Psalms", "psalms", 150, 23)])).toBe("Psalm 23");
    expect(labelFor([ch("Psalms", "psalms", 150, 1), ch("Psalms", "psalms", 150, 8)])).toBe("Psalms 1-8");
    expect(labelFor([ch("Obadiah", "obadiah", 1, 1)])).toBe("Obadiah");
    expect(labelFor([ch("Genesis", "genesis", 50, 50), ch("Exodus", "exodus", 40, 1)])).toBe("Genesis 50 to Exodus 1");
  });

  for (const plan of readingPlans) {
    it(`${plan.id}: every chapter once, in order, over ${plan.days} days`, async () => {
      const chapters = chaptersFor(ROOT, plan.scope);
      const groups: { slug: string; c: number }[][] = splitDays(chapters, plan.days);
      expect(groups).toHaveLength(plan.days);
      expect(groups.every((g) => g.length > 0)).toBe(true);
      expect(groups.flat().map((x) => `${x.slug} ${x.c}`)).toEqual(chapters.map((x: { slug: string; c: number }) => `${x.slug} ${x.c}`));
      const days = planDays(ROOT, plan);
      const pdf: Buffer = await readingPlanPdf(plan, days, "A4");
      expect(tagged(pdf)).toBe(true);
    });
  }
});
