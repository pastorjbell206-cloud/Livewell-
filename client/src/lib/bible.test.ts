import { describe, it, expect } from "vitest";

import { chapterHref, editionSplit, expandGrammar, parseRef, safeDefinition, type BibleBook } from "./bible";

const BOOKS: BibleBook[] = [
  { code: "Gen", slug: "genesis", name: "Genesis", testament: "OT", chapters: 50 },
  { code: "1Jn", slug: "1-john", name: "1 John", testament: "NT", chapters: 5 },
];

describe("study bible helpers", () => {
  it("parses references and ranges into links and labels", () => {
    expect(parseRef("Gen.1.1", BOOKS)).toEqual({ slug: "genesis", chapter: 1, verse: 1, label: "Genesis 1:1" });
    expect(parseRef("1Jn.4.7-8", BOOKS)?.label).toBe("1 John 4:7–8");
    expect(parseRef("Xyz.1.1", BOOKS)).toBeNull();
    expect(chapterHref("genesis", 1, 3)).toBe("/study/bible/genesis/1#v3");
  });

  it("expands Hebrew segmented grammar and Greek codes", () => {
    const dict = { HR: "Preposition", HNcfsa: "Noun, feminine singular absolute", "V-AAI-3S": "Verb, aorist active indicative, third singular" };
    expect(expandGrammar("H", "HR/Ncfsa", dict)).toEqual(["Preposition", "Noun, feminine singular absolute"]);
    expect(expandGrammar("G", "V-AAI-3S", dict)).toEqual(["Verb, aorist active indicative, third singular"]);
    expect(expandGrammar("G", "X-UNKNOWN", dict)).toEqual(["X-UNKNOWN"]);
  });

  it("keeps only bold, italic, and line breaks in definitions", () => {
    expect(safeDefinition('<b>love</b><script>x</script><img src=x onerror=y><br><i>n.</i>')).toBe("<b>love</b>x<br><i>n.</i>");
  });

  it("names the editions a variant word is in and missing from", () => {
    expect(editionSplit("NA28+NA27+SBL+WH")).toEqual({
      in: ["Nestle-Aland 28", "Nestle-Aland 27", "SBL Greek NT", "Westcott-Hort"],
      out: ["Tyndale House", "Tregelles", "Textus Receptus", "Byzantine"],
    });
    expect(editionSplit(undefined)).toBeNull();
  });
});
