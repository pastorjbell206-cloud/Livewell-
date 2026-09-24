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
 * PILLARS_V2 is the single public/code spine. This guards it: every per-essay
 * assignment must resolve to a real pillar and real sub-themes, so an essay
 * can't silently rot into a bad filing or fall through to the default.
 *
 * Five pillars since 2026: id 4 (After Christendom) was merged into id 6
 * (Living Well After Christendom) — the two named the same arc, one asking what
 * ended and the other what to build once it had. The ids are deliberately NOT
 * renumbered: they are the keys in PILLAR_ASSIGNMENTS, so closing the gap would
 * silently re-file every essay on the site. A gap is the safe state; the
 * assertion below pins it so the next edit is a decision, not an accident.
 */
describe("taxonomy spine (PILLARS_V2)", () => {
  it("has five pillars with unique ids [1,2,3,5,6] and unique slugs", () => {
    expect(PILLARS_V2).toHaveLength(5);
    const ids = PILLARS_V2.map((p) => p.id).sort((a, b) => a - b);
    expect(ids).toEqual([1, 2, 3, 5, 6]);
    expect(new Set(PILLARS_V2.map((p) => p.slug)).size).toBe(5);
  });

  it("has no essay still filed under the merged pillar 4", () => {
    const orphans = Object.entries(PILLAR_ASSIGNMENTS).filter(([, a]) => a.pillar === 4);
    expect(orphans, `essays still on the merged pillar: ${orphans.map(([s]) => s).join(", ")}`).toHaveLength(0);
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
