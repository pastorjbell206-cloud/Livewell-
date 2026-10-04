/**
 * /downloads groups each card's files by document, one line each, so a care
 * page's eight files read as four documents in two paper sizes rather than a
 * wall of links.
 */
import { describe, it, expect } from "vitest";
import { fileLines } from "./Downloads";

const f = (label: string) => ({ label, href: `/downloads/${label.replace(/\W+/g, "-")}.pdf` });

describe("fileLines", () => {
  it("joins a document's paper sizes on one line", () => {
    const lines = fileLines([f("One-page guide (Letter)"), f("One-page guide (A4)"), f("Prayer cards (Letter)"), f("Prayer cards (A4)")]);
    expect(lines.map((l) => [l.name, l.files.map((x) => x.label)])).toEqual([
      ["One-page guide", ["Letter", "A4"]],
      ["Prayer cards", ["Letter", "A4"]],
    ]);
  });

  it("keeps files without a paper size together on one unnamed line", () => {
    expect(fileLines([f("Leader's guide"), f("Participant handout")])).toEqual([
      { name: "", files: [{ label: "Leader's guide", file: f("Leader's guide") }, { label: "Participant handout", file: f("Participant handout") }] },
    ]);
    expect(fileLines([f("Letter"), f("A4")]).map((l) => l.files.map((x) => x.label))).toEqual([["Letter", "A4"]]);
  });
});
