import { describe, it, expect } from "vitest";
import {
  PILLARS_V2,
  SUBTHEMES,
  PILLAR_BY_ID,
  pillarForPost,
  subThemesForPost,
} from "@/lib/taxonomy";
import { PILLAR_ASSIGNMENTS } from "@/lib/pillar-assignments";

/**
 * Taxonomy spine integrity (Option B — see docs/TAXONOMY-PROPOSAL.md).
 * Six-pillar PILLARS_V2 is the single public/code spine. This guards it: every
 * per-essay assignment must resolve to a real pillar and real sub-themes, so an
 * essay can't silently rot into a bad filing or fall through to the default.
 */
describe("taxonomy spine (PILLARS_V2)", () => {
  it("has exactly six pillars with unique ids 1..6 and unique slugs", () => {
    expect(PILLARS_V2).toHaveLength(6);
    const ids = PILLARS_V2.map((p) => p.id).sort((a, b) => a - b);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6]);
    expect(new Set(PILLARS_V2.map((p) => p.slug)).size).toBe(6);
  });

  it("keeps Pillar 6 as the formation door (Living Well After Christendom)", () => {
    const six = PILLAR_BY_ID.get(6);
    expect(six?.movement).toBe("formation");
    expect(six?.slug).toBe("living-well-after-christendom");
  });

  it("files every essay assignment to a real pillar, sub-theme, and confidence", () => {
    const validSubThemes = new Set<string>(SUBTHEMES);
    const validConfidence = new Set(["high", "med", "LOW"]);
    for (const [slug, a] of Object.entries(PILLAR_ASSIGNMENTS)) {
      expect(Number.isInteger(a.pillar), `${slug}: pillar must be an integer`).toBe(true);
      expect(PILLAR_BY_ID.has(a.pillar), `${slug}: pillar ${a.pillar} must exist`).toBe(true);
      expect(Array.isArray(a.subThemes), `${slug}: subThemes must be an array`).toBe(true);
      for (const st of a.subThemes) {
        expect(validSubThemes.has(st), `${slug}: unknown sub-theme "${st}"`).toBe(true);
      }
      expect(validConfidence.has(a.confidence), `${slug}: bad confidence "${a.confidence}"`).toBe(true);
    }
  });

  it("resolves assigned, legacy, and unknown posts predictably", () => {
    const [slug, a] = Object.entries(PILLAR_ASSIGNMENTS)[0];
    expect(pillarForPost({ slug })?.id).toBe(a.pillar); // assigned wins
    expect(pillarForPost({ pillar: "Integrated Life" })?.id).toBe(6); // legacy fallback
    expect(pillarForPost({ slug: "nope-does-not-exist" })?.id).toBe(5); // default: pastoral
    expect(subThemesForPost({ slug })).toEqual(a.subThemes);
  });
});
