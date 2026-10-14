/**
 * A life page whose text names a help line (the Hotline, SAMHSA) carries that
 * line in its help block, so the reader never has to search for the number.
 */
import { describe, it, expect } from "vitest";
import { LIFE_TOPICS, SENSITIVE_LIFE } from "@/lib/needs";
import { crisisLines } from "@/components/CrisisBlock";

describe("life page help lines", () => {
  it("names extra lines only for pages that show the help block", () => {
    for (const slug of Object.keys(LIFE_TOPICS)) expect(SENSITIVE_LIFE.has(slug)).toBe(true);
  });

  it("gives the anger page the Domestic Violence Hotline", () => {
    const ids = crisisLines(["suicide", ...(LIFE_TOPICS["anger-and-the-hot-heart"] ?? [])]).map((r) => r.id);
    expect(ids).toContain("dv-hotline");
  });
});
