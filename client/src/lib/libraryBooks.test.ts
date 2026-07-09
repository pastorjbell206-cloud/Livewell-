import { describe, it, expect } from "vitest";
import { pillarPageFor, booksForPillars, PILLAR_PAGES, type LibraryBook } from "./libraryBooks";

const book = (slug: string, title: string, pillar?: string): LibraryBook => ({ slug, title, chapters: 5, pillar });

describe("pillarPageFor — the one pillar-string resolver", () => {
  it("resolves every pillar string the book manifests actually use", () => {
    // These are the distinct pillar values in client/public/books/index.json.
    const used = [
      "Integrated Life", "Theological Depth", "Pastoral Ministry", "Prophetic Justice",
      "Prophetic Disruption", "After Christendom", "Leadership Formation", "The Table",
    ];
    for (const p of used) {
      expect(PILLAR_PAGES[p], `"${p}" must resolve to a real page`).toBeTruthy();
      expect(pillarPageFor(p).href).not.toBe("/read"); // not the fallback
    }
  });

  it("falls back to the library for an unknown or missing pillar", () => {
    expect(pillarPageFor("Nonexistent").href).toBe("/read");
    expect(pillarPageFor(undefined).href).toBe("/read");
    expect(pillarPageFor("").label).toBe("The Library");
  });
});

describe("booksForPillars", () => {
  const shelf = [
    book("b", "Beta", "Integrated Life"),
    book("a", "Alpha", "Integrated Life"),
    book("c", "Gamma", "Theological Depth"),
    book("d", "Delta", undefined),
  ];

  it("returns only matching books, title-sorted", () => {
    const r = booksForPillars(shelf, ["Integrated Life"]);
    expect(r.map((b) => b.title)).toEqual(["Alpha", "Beta"]);
  });

  it("can union multiple pillar strings (e.g. a hub that anchors two)", () => {
    const r = booksForPillars(shelf, ["Integrated Life", "Theological Depth"]);
    expect(r.map((b) => b.slug).sort()).toEqual(["a", "b", "c"]);
  });

  it("never includes a book with no pillar", () => {
    const r = booksForPillars(shelf, ["Integrated Life", "Theological Depth"]);
    expect(r.find((b) => b.slug === "d")).toBeUndefined();
  });
});
