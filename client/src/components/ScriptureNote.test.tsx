/**
 * Integrity contract for ScriptureNote — the line that tells a reader what the
 * verse text on a page actually is.
 *
 * The contract, from CLAUDE.md's Scripture rule (verbatim ESV by default, the
 * translation named when the choice does work, paraphrase offered as
 * paraphrase):
 *  - a named translation  → says so, by full name, not an initialism alone
 *  - paraphrase           → says it is a paraphrase, and does not say "quoted"
 *  - abridged             → says the text is shortened, not the whole verse
 *  - unverified           → admits it has not been checked against one translation
 *  - every rendering      → points the reader to the whole passage
 *
 * The last one is the load-bearing part: whatever the label, a reader must be
 * told how to go check it.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ScriptureNote, { type ScriptureRendering } from "./ScriptureNote";

const ALL: ScriptureRendering[] = [
  "esv",
  "kjv",
  "niv",
  "nasb",
  "unverified",
  "abridged",
  "paraphrase",
];

describe("ScriptureNote", () => {
  it("names the translation in full when one is claimed", () => {
    render(<ScriptureNote rendering="esv" />);
    expect(
      screen.getByText(/English Standard Version/i)
    ).toBeInTheDocument();
  });

  it("offers a paraphrase as a paraphrase, and never as a quotation", () => {
    render(<ScriptureNote rendering="paraphrase" />);
    expect(screen.getByText(/is a paraphrase, not a quotation/i)).toBeInTheDocument();
    expect(screen.queryByText(/Scripture quoted from/i)).not.toBeInTheDocument();
  });

  it("says plainly when the text is shortened rather than whole", () => {
    render(<ScriptureNote rendering="abridged" />);
    expect(screen.getByText(/shortened to the line in view/i)).toBeInTheDocument();
  });

  it("admits when the text has not been checked against one translation", () => {
    render(<ScriptureNote rendering="unverified" />);
    expect(
      screen.getByText(/has not been checked word for word/i)
    ).toBeInTheDocument();
  });

  it.each(ALL)("sends the reader to the whole passage (%s)", (rendering) => {
    render(<ScriptureNote rendering={rendering} />);
    expect(
      screen.getByText(/Follow any reference to read the passage in full/i)
    ).toBeInTheDocument();
  });
});
