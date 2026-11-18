import { describe, it, expect } from "vitest";

import { chapterHref, editionSplit, expandGrammar, glossParts, grammarRows, isPoetry, occurrenceLine, outlineTarget, parseRef, plainGloss, poetryLines, safeDefinition, verseCopyText, type BibleBook } from "./bible";

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

  it("reads a Hebrew verb's grammar as rows, the brackets kept with their own row", () => {
    const qal = "Function=Verb; Stem=Qal (hence Action=Simple; Voice=Active); Form=Perfect (hence Tense=Past/present; Mood=Indicative); Person=Third; Gender=Masculine; Number=Singular";
    expect(grammarRows(qal)).toEqual([
      { k: "Function", v: "Verb" },
      { k: "Stem", v: "Qal", hence: "action: simple; voice: active" },
      { k: "Form", v: "Perfect", hence: "tense: past/present; mood: indicative" },
      { k: "Person", v: "Third" },
      { k: "Gender", v: "Masculine" },
      { k: "Number", v: "Singular" },
    ]);
    expect(grammarRows("Function=Conjunction; Form=Consecutive;")).toEqual([{ k: "Function", v: "Conjunction" }, { k: "Form", v: "Consecutive" }]);
    expect(grammarRows("Function=Particle; Form=Definite article (Hebrew)")[1]).toEqual({ k: "Form", v: "Definite article (Hebrew)" });
    expect(grammarRows("Function=Adjective; Case=Accusative")).toEqual([{ k: "Function", v: "Adjective" }, { k: "Case", v: "Accusative" }]);
    for (const row of grammarRows(qal)) expect(`${row.v}${row.hence ?? ""}`).not.toMatch(/[()]/);
  });

  it("takes the source's marks out of a meaning and flags what they held", () => {
    expect(glossParts("<the>")).toEqual([{ text: "the", supplied: true }]);
    expect(glossParts("and <obj.>")).toEqual([{ text: "and ", supplied: false }, { text: "obj.", supplied: true }]);
    expect(glossParts("[was] over")).toEqual([{ text: "was", supplied: true }, { text: " over", supplied: false }]);
    expect(glossParts("[is [the] one] who")).toEqual([{ text: "is the one", supplied: true }, { text: " who", supplied: false }]);
    expect(glossParts("created")).toEqual([{ text: "created", supplied: false }]);
    expect(plainGloss("heaven<s>")).toBe("heavens");
    expect(plainGloss("[the] deep")).toBe("the deep");
  });

  it("says how often a word appears without calling a complete list cut short", () => {
    expect(occurrenceLine(53, 45, "H")).toBe("53 times in 45 verses of the Hebrew Old Testament.");
    expect(occurrenceLine(1, 1, "G")).toBe("Once in the Greek New Testament.");
    expect(occurrenceLine(3, 1, "G")).toBe("3 times in one verse of the Greek New Testament.");
    expect(occurrenceLine(60, 60, "H")).toBe("60 times in 60 verses of the Hebrew Old Testament.");
    expect(occurrenceLine(2600, 60, "H")).toBe("2,600 times in the Hebrew Old Testament. The first 60 verses are listed.");
  });

  it("sets poetry in lines at the translation's own punctuation", () => {
    expect(isPoetry("psalms", 23)).toBe(true);
    expect(isPoetry("job", 1)).toBe(false);
    expect(isPoetry("job", 3)).toBe(true);
    expect(isPoetry("job", 42)).toBe(false);
    expect(isPoetry("john", 3)).toBe(false);
    expect(poetryLines("A Psalm of David. The LORD is my shepherd; I shall not want.")).toEqual(["A Psalm of David.", "The LORD is my shepherd;", "I shall not want."]);
    expect(poetryLines("Many say of me, “God will not deliver him.” Selah")).toEqual(["Many say of me, “God will not deliver him.”", "Selah"]);
    // Every word survives, in order.
    const v = "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.";
    expect(poetryLines(v).join(" ")).toBe(v);
  });

  it("opens an outline range at the right place, verses in a one-chapter book", () => {
    expect(outlineTarget("3-4", 1)).toEqual({ chapter: 1, verse: 3 });
    expect(outlineTarget("1:10-14", 1)).toEqual({ chapter: 1, verse: 10 });
    expect(outlineTarget("5-7", 28)).toEqual({ chapter: 5 });
    expect(outlineTarget("12", 50)).toEqual({ chapter: 12 });
  });

  it("copies a verse with its reference and the translation's name", () => {
    expect(verseCopyText("Jesus wept.", "John", 11, 35)).toBe("Jesus wept.\nJohn 11:35, Berean Standard Bible");
  });
});
