import { describe, it, expect } from "vitest";
import { DISCUSSION_GUIDES } from "../client/src/data/discussion-guides";
import { DISCUSSION_GUIDE_SLUGS } from "../client/src/data/discussion-guide-slugs";
import { ARGUMENT_CASES } from "../client/src/data/argumentCases";
import { ARGUMENT_CASE_SLUGS } from "../client/src/data/argument-case-slugs";

// The essay page decides from a slug set whether to offer a discussion guide
// or an argument case, and only then downloads the data (250 KB together).
// If the sets drift from the data, an essay silently loses its guide or offers
// one that does not exist. This pins them together.

describe("the lazy essay-data slug sets", () => {
  it("name exactly the essays that have a discussion guide", () => {
    expect(Array.from(DISCUSSION_GUIDE_SLUGS).sort()).toEqual(Object.keys(DISCUSSION_GUIDES).sort());
  });

  it("name exactly the essays an argument case is built on", () => {
    const fromData = new Set<string>();
    for (const c of ARGUMENT_CASES) for (const s of c.essaySlugs) fromData.add(s);
    expect(Array.from(ARGUMENT_CASE_SLUGS).sort()).toEqual(Array.from(fromData).sort());
  });
});
