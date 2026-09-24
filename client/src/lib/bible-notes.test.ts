import { describe, it, expect } from "vitest";

import type { BibleBook } from "./bible";
import type { CatalogueItem } from "./catalogue";
import { flattenStory, itemsForPassage, paragraphs, refChapters, spreadKinds, storyPlace, translationHref, verseRange, type Story } from "./bible-notes";

const BOOKS: BibleBook[] = [
  { code: "Gen", slug: "genesis", name: "Genesis", testament: "OT", chapters: 50 },
  { code: "Psa", slug: "psalms", name: "Psalms", testament: "OT", chapters: 150 },
  { code: "Sng", slug: "song-of-solomon", name: "Song of Solomon", testament: "OT", chapters: 8 },
  { code: "Dan", slug: "daniel", name: "Daniel", testament: "OT", chapters: 12 },
  { code: "Rom", slug: "romans", name: "Romans", testament: "NT", chapters: 16 },
  { code: "1Co", slug: "1-corinthians", name: "1 Corinthians", testament: "NT", chapters: 16 },
];

describe("refChapters", () => {
  it("reads the site's reference styles, including singular Psalm and Song of Songs", () => {
    expect(refChapters("Psalm 139:1-4", BOOKS)).toEqual({ slug: "psalms", chapters: [139] });
    expect(refChapters("Song of Songs 2", BOOKS)).toEqual({ slug: "song-of-solomon", chapters: [2] });
    expect(refChapters("1 Cor. 13", BOOKS)).toEqual({ slug: "1-corinthians", chapters: [13] });
    expect(refChapters("Genesis 3:19", BOOKS)).toEqual({ slug: "genesis", chapters: [3] });
  });

  it("expands chapter ranges and 'and', but not verse ranges", () => {
    expect(refChapters("Romans 8–9", BOOKS)?.chapters).toEqual([8, 9]);
    expect(refChapters("Romans 8:18-28", BOOKS)?.chapters).toEqual([8]);
    expect(refChapters("Romans 7:24-8:2", BOOKS)?.chapters).toEqual([7, 8]);
    expect(refChapters("Daniel 1 and 6", BOOKS)?.chapters).toEqual([1, 6]);
  });

  it("returns null for anything that isn't a Bible reference", () => {
    expect(refChapters("Chapter 3", BOOKS)).toBeNull();
    expect(refChapters("Genesis 51", BOOKS)).toBeNull();
    expect(refChapters("Genesis", BOOKS)).toBeNull();
  });
});

describe("the story path", () => {
  const story: Story = {
    intro: "",
    acts: [
      { id: "one", dates: "", world: "", watch: "", people: [], path: [{ book: "genesis", from: 1, to: 2 }] },
      { id: "two", dates: "", world: "", watch: "", people: [], path: [{ book: "psalms", from: 90, to: 90 }, { book: "genesis", from: 3, to: 3 }] },
    ],
  };

  it("walks every chapter in story order and finds its neighbors", () => {
    const steps = flattenStory(story);
    expect(steps.map((s) => `${s.slug}/${s.chapter}`)).toEqual(["genesis/1", "genesis/2", "psalms/90", "genesis/3"]);
    const place = storyPlace(steps, "psalms", 90);
    expect(place?.step.act).toBe("two");
    expect(place?.prev).toMatchObject({ slug: "genesis", chapter: 2 });
    expect(place?.next).toMatchObject({ slug: "genesis", chapter: 3 });
    expect(storyPlace(steps, "romans", 1)).toBeNull();
  });
});

describe("related writing", () => {
  const item = (kind: string, title: string, scripture?: string[]): CatalogueItem => ({ kind, title, href: `/${title}`, scripture });

  it("finds items by the chapters their references touch", () => {
    const items = [item("Essay", "a", ["Psalm 23:1"]), item("Essay", "b", ["Psalms 22"]), item("Wisdom", "c", ["Romans 8:28"])];
    expect(itemsForPassage(items, BOOKS, "psalms", 23).map((i) => i.title)).toEqual(["a"]);
    expect(itemsForPassage(items, BOOKS, "psalms").map((i) => i.title)).toEqual(["a", "b"]);
  });

  it("keeps at most two of a kind and drops duplicates", () => {
    const items = [item("Essay", "a"), item("Essay", "a"), item("Essay", "b"), item("Essay", "c"), item("Wisdom", "d")];
    expect(spreadKinds(items, 6).map((i) => i.title)).toEqual(["a", "b", "d"]);
  });
});

describe("small helpers", () => {
  it("splits paragraphs, reads verse ranges, and links translations out", () => {
    expect(paragraphs("One.\n\nTwo.\n \nThree.")).toEqual(["One.", "Two.", "Three."]);
    expect(verseRange("3-9")).toEqual([3, 9]);
    expect(verseRange("12")).toEqual([12, 12]);
    expect(translationHref("1 John", 4, "ESV")).toBe("https://www.biblegateway.com/passage/?search=1%20John%204&version=ESV");
  });
});
